from flask import Flask, render_template
import pandas as pd
import os

app = Flask(__name__)

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
    df = pd.read_csv("w209/data/unicef_dtp_first_shot_coverage_2010_2023.csv")
    df_countries = df[(~df['REF_AREA:Geographic area'].str.startswith('WHO'))  & ((df['TIME_PERIOD:Time period'] == 2019) | (df['TIME_PERIOD:Time period'] == 2020)| (df['TIME_PERIOD:Time period'] == 2021))]
    df_pivoted = df_countries.pivot_table('OBS_VALUE:Observation Value', ['REF_AREA:Geographic area'], 'TIME_PERIOD:Time period')
    df_pivoted['delta'] = df_pivoted[2020] - df_pivoted[2019]
    df_pivoted['delta_rank'] = df_pivoted['delta'].rank()
    return df_pivoted.to_csv()

if __name__ == "__main__":
    app.run()
