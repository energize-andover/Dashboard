import os

import pandas as pd

from data.cache import Cache
from buildingEnergyAPI.building_data_requests import get_bulk

class DataManager():
    def __init__(self, cache_csv_out, cwd):
        self.cache_csv_out = cache_csv_out
        self.cwd = cwd
        self.cache = None

        self.init_cache()

        ahs_air_csv = os.path.join(cwd, 'csv', 'ahs_air.csv')
        ahs_air_csv_df = pd.read_csv(ahs_air_csv, na_filter=False, comment='#')
        self.ahs_air_bulk_request = []

        # Iterate over the rows of the dataframe, adding elements to the bulk request
        for index, row in ahs_air_csv_df.iterrows():

            # Append facility/instance pairs to bulk request
            if row['Temperature']:
                self.ahs_air_bulk_request.append({'facility': row['Facility'], 'instance': row['Temperature']})
            if row['CO2']:
                self.ahs_air_bulk_request.append({'facility': row['Facility'], 'instance': row['CO2']})



    def init_cache(self):
        if not os.path.exists(self.cache_csv_out):
            os.mkdir(self.cache_csv_out)
        self.cache = Cache(self.cache_csv_out)

    def get_air_data(self):
        response = get_bulk(self.ahs_air_bulk_request)
        map = response['rsp_map']

