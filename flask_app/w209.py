from flask import Flask, render_template, Response, request
import pandas as pd
import os
import json
from flask_cors import CORS
import sys

PROD_BASE_DATA_FOLDER = 'w209/raw_data'
DEV_BASE_DATA_FOLDER = 'raw_data'

app = Flask(__name__)
CORS(app)

if 'FLASK_ENV' in os.environ and os.environ['FLASK_ENV'] == 'development':
    app.config['BASE_DATA_FOLDER'] = DEV_BASE_DATA_FOLDER
else:
    app.config['BASE_DATA_FOLDER'] = PROD_BASE_DATA_FOLDER

UNICEF_VACC_DATA_FILE = 'wuenic2021rev_data_2023-07-13.csv'
COUNTRY_ISO_CODES_FILE = 'wikipedia-iso-country-codes.csv'
WHO_COUNTRIES_FILE = 'who_countries.csv'
WHO_REGIONS_FILE = 'who_regions.csv'
UNICEF_DTP_DATA_FILE = 'unicef_dtp_first_shot_coverage_2010_2023.csv'
VACCINES_MASTER_FILE = 'vaccines_master.csv'

@app.route("/")
def w209():
    file="about9.jpg"
    return render_template("w209.html",file=file)

@app.route("/pandas-api/")
def api():
    d = pd.DataFrame([{"a": "b"}])
    return d.to_dict()

@app.route("/vaxviz/debug_info/")
def debug_info():
    return os.getcwd()

@app.route("/vaxviz/pandemic/v2/vaxrates/whoregions", methods = ['GET'])
def v2_vax_rates_who_regions():
    try:
        df = helper_countries_vax_data_v2(True)
    except Exception as e:
        return json.dumps({ 'error': f'Failed to verify: {e}' }), 500
    df = df.drop(columns=['Coverage', 'name', 'key_0', 'region_number', 'region_subcode', 'numeric_code', 'iso_3166_2'])

    # Create region level summary
    df_regional = df.groupby(['region_code', 'Year', 'Vaccine']).agg({'Vaccinated':'sum','Target':'sum'}).reset_index()


    # Create global summary
    df_global = df_regional.groupby(['Year', 'Vaccine']).agg({'Vaccinated':'sum','Target':'sum'}).reset_index()
    df_global['region_code'] = 'REG_GLOBAL'
    df_merged = pd.concat([df_regional, df_global], ignore_index=True, verify_integrity=True)
    df_merged['Coverage'] = df_merged['Vaccinated'] / df_merged['Target'] * 100
    # df_merged['Coverage'] = df_merged['Coverage'].astype(int)
    df_merged['Not Covered'] = (df_merged['Target'] - df_merged['Vaccinated']) / df_merged['Target'] * 100
    # df_merged['Not Covered'] = df_merged['Not Covered'].astype(int)

    # Add region name.
    df_regions = helper_regions_master()
    df_merged = pd.merge(df_merged, df_regions, left_on=df_merged["region_code"], right_on=df_regions["code"], how='left')
    df_missing_code = df_merged[(df_merged['region_name'].isna())]
    if df_missing_code['region_code'].unique().size > 0:
        return json.dumps({ 'error': f"Could not identify codes for {df_missing_code['region_code'].unique().tolist()}."}), 500
    df_merged = df_merged.drop(columns=['key_0', 'code', 'key_in_data'])
    return df_merged.to_csv();




@app.route("/vaxviz/pandemic/v2/vaxrates/countries", methods = ['GET'])
def v2_vax_rates_countries():
    """
        Returns the annual coverage rate as well as actual numbers for each country against each vaccine from 2015 to 2021.
        Vaccines included: BCG, DTP1, DTP3, Hepb3, Hepbb, Hib3, IPV1, MCV1, MCV2, PCV3, Pol3, Rotac
        Accepts query string parameter pivot_on_year. If value is true then the yearly values are converted to columns.
    """
    if 'pivot_on_year' in request.args:
        pivot_on_year = (request.args['pivot_on_year'].lower() == 'true')
    else:
        pivot_on_year = False

    try:
        df = helper_countries_vax_data_v2(True)
        df = df[['Name', 'alpha_3_code', 'Vaccine', 'Year', 'Coverage', 'Vaccinated', 'Target']]
    except Exception as e:
        return json.dumps({ 'error': f'Failed to verify: {e}' }), 500

    # Use pivot to convert the yearly values to columns.
    if pivot_on_year:
        df = pd.pivot_table(df, index=['Name', 'alpha_3_code', 'Vaccine'], columns=['Year'], values=['Coverage', 'Vaccinated', 'Target'])
        df.columns = [ '_'.join([str(c) for c in c_list]) for c_list in df.columns.values ]
        out_filename = 'unicef_national_coverage_2015_2021_pivot.csv'
    else:
        out_filename = 'unicef_national_coverage_2015_2021.csv'

    return Response(
       df.to_csv(),
       mimetype="text/csv",
       headers={"Content-disposition":
       f"attachment; filename={out_filename}"})



@app.route("/vaxviz/pandemic/v1/national_change/")
def v1_natl_change():
    # Ensure the data folder and its contents are uploaded to server before calling this endpoint
    df = pd.read_csv(f'{app.config["BASE_DATA_FOLDER"]}/{UNICEF_DTP_DATA_FILE}')
    df_countries = df[(~df['REF_AREA:Geographic area'].str.startswith('WHO')) & ((df['TIME_PERIOD:Time period'] >= 2018))]
    df_pivoted = df_countries.pivot_table('OBS_VALUE:Observation Value', ['REF_AREA:Geographic area'], 'TIME_PERIOD:Time period')
    df_pivoted['delta'] = df_pivoted[2020] - df_pivoted[2019]
    df_pivoted['delta_rank'] = df_pivoted['delta'].rank()
    return Response(
       df_pivoted.to_csv(),
       mimetype="text/csv",
       headers={"Content-disposition":
       "attachment; filename=unicef_dtp_first_shot_coverage_2010_2023_summary.csv"})

@app.route("/vaxviz/countries_master/")
def countries_master():
    # Load countries master
    df_countries_with_alpha_3 = helper_countries_master()

    # Verification to ensure that we have all countries covered
    try:
        df_immunization_data = pd.read_csv(f'{app.config["BASE_DATA_FOLDER"]}/{UNICEF_DTP_DATA_FILE}')
        # Extract country code from REF_AREA:Geographic area col in the immunization data
        df_immunization_data['country_code'] = df_immunization_data['REF_AREA:Geographic area'].str.split(": ", expand=True, n=1)[0].astype('string')
        df_merged = pd.merge(df_immunization_data,df_countries_with_alpha_3, left_on=df_immunization_data["country_code"], right_on=df_countries_with_alpha_3["alpha_3_code"], how='left')
        df_missing_code = df_merged[(~df_merged['REF_AREA:Geographic area'].str.startswith('WHO')) & (df_merged['alpha_3_code'].isna())]
        if df_missing_code['REF_AREA:Geographic area'].unique().size > 0:
            return json.dumps({ 'error': f"Could not identify codes for {df_missing_code['REF_AREA:Geographic area'].unique().tolist()}."}), 500
    except Exception as e:
        return json.dumps({ 'error': f'Failed to verify: {e}' }), 500

    # All good, return the generated data as a CSV attachment for browser to download.
    return Response(
       df_countries_with_alpha_3.to_csv(index=False),
       mimetype="text/csv",
       headers={"Content-disposition":"attachment; filename=countries_master.csv"})

@app.route("/vaxviz/vaccines_master/")
def vaccines_master():
    df = pd.read_csv(f'{app.config["BASE_DATA_FOLDER"]}/{VACCINES_MASTER_FILE}')
    return Response(
       df.to_csv(index=False),
       mimetype="text/csv",
       headers={"Content-disposition":"attachment; filename=vaccines_master.csv"})

def helper_countries_vax_data_v2(merge_with_countries_master):
    # Read the raw data
    df = pd.read_csv(f'{app.config["BASE_DATA_FOLDER"]}/{UNICEF_VACC_DATA_FILE}', usecols=['Name', 'Year', 'Vaccine', 'Coverage', 'Vaccinated', 'Target'])

    # Set correct datatype for numeric values
    df['Coverage'] = pd.to_numeric(df['Coverage'])
    df['Vaccinated'] = pd.to_numeric(df['Vaccinated'].str.replace(',', '').str.replace('-', '').str.replace('<', ''))
    df['Target'] = pd.to_numeric(df['Target'].str.replace(',', '').str.replace('-', '').str.replace('<', ''))

    if merge_with_countries_master:
        df_countries = helper_countries_master()
        df_merged = pd.merge(df, df_countries, left_on=df['Name'], right_on=df_countries["name"], how='left')
        df_merged.T.drop_duplicates()
        df_missing_code = df_merged[(df_merged['alpha_3_code'].isna())]
        if df_missing_code['Name'].unique().size > 0:
            raise Exception(f"Could not identify codes for {df_missing_code['Name'].unique().tolist()}")
        return df_merged

    return df

def helper_regions_master():
    df_regions = pd.read_csv(f'{app.config["BASE_DATA_FOLDER"]}/{WHO_REGIONS_FILE}')
    return df_regions


def helper_countries_master():
    df_country_iso_codes = pd.read_csv(f'{app.config["BASE_DATA_FOLDER"]}/{COUNTRY_ISO_CODES_FILE}')
    df_who_countries = pd.read_csv(f'{app.config["BASE_DATA_FOLDER"]}/{WHO_COUNTRIES_FILE}')

    # Add alpha-3 code to who_countries
    df_countries_with_alpha_3 = pd.merge(df_who_countries,df_country_iso_codes, left_on=df_who_countries["name"].str.lower(), right_on=df_country_iso_codes["name"].str.lower(), how='left')
    df_countries_with_alpha_3['name'] = df_countries_with_alpha_3['name_x']
    df_countries_with_alpha_3 = df_countries_with_alpha_3.drop(columns=['key_0', 'name_y', 'name_x'])
    return df_countries_with_alpha_3


if __name__ == "__main__":
    #env should be dev for local work
    app.run()
