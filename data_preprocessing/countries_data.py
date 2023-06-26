import pandas as pd

BASE_DATA_FOLDER = '../data'
COUNTRY_ISO_CODES_FILE = 'wikipedia-iso-country-codes.csv'
WHO_REGIONS_FILE = 'who_regions.csv'
WHO_COUNTRIES_FILE = 'who_countries.csv'
UNICEF_DTP_DATA_FILE = 'unicef_dtp_first_shot_coverage_2010_2023_summary.csv'

def generate_country_master():
    """
        Given the three different files with WHO countries, WHO regions and WIKI country codes,
        generate the master file with following fields:
        country_code,country_name,country_in_unicef_reports,who_region_code,who_region_subcode
    """
    df_iso_codes = pd.read_csv(f'{BASE_DATA_FOLDER}/{COUNTRY_ISO_CODES_FILE}')
    df_who_countries = pd.read_csv(f'{BASE_DATA_FOLDER}/{WHO_COUNTRIES_FILE}')
    



if __name__ == "__main__":
    generate_country_master()
