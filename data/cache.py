import os
import pandas as pd


class Cache:
    def __init__(self, cache_out_dir):
        self.cache_out_dir = cache_out_dir

        self.air_data = None
        self.electricity_data = None

        self.init_dataframes()

    def init_dataframes(self):
        air_path = os.path.join(self.cache_out_dir, 'air_data.csv')
        electricity_path = os.path.join(self.cache_out_dir, 'electricity_data.csv')

        # TODO: Setup cache importing functionality

        if not os.path.exists(air_path):
            self.air_data = pd.DataFrame()

        if not os.path.exists(electricity_path):
            self.electricity_data = pd.DataFrame()

    def save_cache(self):
        # TODO: Implement saving to files
        pass
