from flask import Flask, render_template
import pandas as pd
import os

app = Flask(__name__)

BASE_DATA_FOLDER = 'w209/data'
COUNTRY_ISO_CODES_FILE = 'wikipedia-iso-country-codes.csv'
WHO_REGIONS_FILE = 'who_regions.csv'
WHO_COUNTRIES_FILE = 'who_countries.csv'
UNICEF_DTP_DATA_FILE = 'unicef_dtp_first_shot_coverage_2010_2023.csv'

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

@app.route("/vaxviz/pandemic/v1/national_change/")
def v1_natl_change():
    # Ensure the data folder and its contents are uploaded to server before calling this endpoint
    df = pd.read_csv(f'{BASE_DATA_FOLDER}/{UNICEF_DTP_DATA_FILE}')
    df_countries = df[(~df['REF_AREA:Geographic area'].str.startswith('WHO'))  & ((df['TIME_PERIOD:Time period'] == 2019) | (df['TIME_PERIOD:Time period'] == 2020)| (df['TIME_PERIOD:Time period'] == 2021))]
    df_pivoted = df_countries.pivot_table('OBS_VALUE:Observation Value', ['REF_AREA:Geographic area'], 'TIME_PERIOD:Time period')
    df_pivoted['delta'] = df_pivoted[2020] - df_pivoted[2019]
    df_pivoted['delta_rank'] = df_pivoted['delta'].rank()
    return df_pivoted.to_csv()

@app.route("/vaxviz/countries_csv/")
def countries_csv():
    # Ensure the data folder and its contents are uploaded to server before calling this endpoint
    df_country_iso_codes = pd.read_csv(f'{BASE_DATA_FOLDER}/{COUNTRY_ISO_CODES_FILE}')
    df_who_countries = pd.read_csv(f'{BASE_DATA_FOLDER}/{WHO_COUNTRIES_FILE}')

    # Add alpha-3 code to who_countries
    df_countries_with_alpha_3 = pd.merge(df_who_countries,df_country_iso_codes, left_on=df_who_countries["name"].str.lower(), right_on=df_country_iso_codes["name"].str.lower(), how='left')
    df_countries_with_alpha_3['name'] = df_countries_with_alpha_3['name_x']
    df_countries_with_alpha_3 = df_countries_with_alpha_3.drop(columns=['key_0', 'name_y', 'name_x'])
    return df_countries_with_alpha_3.to_csv(index=False)

if __name__ == "__main__":
    app.run()
