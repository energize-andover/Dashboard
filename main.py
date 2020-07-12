import os

import pandas as pd
from flask import Flask

from web.main import build_app

from data.manager import DataManager

cwd = os.path.abspath(os.getcwd())  # The current working directory

# Initialize widgets.json from the CSV
widgets_df = pd.read_csv(os.path.join(cwd, 'csv', 'widgets.csv'), na_filter=False, comment='#')

# Add an ID column
id_column = []

for index, row in widgets_df.iterrows():
    id_column.append(index + 1)

# Insert the ID column as the leftmost column so it ends up first at the top of the JSON data for each widget
widgets_df.insert(0, 'ID', id_column, True)

widgets_json_path = os.path.join(cwd, 'static', 'widgets.json')

if os.path.exists(widgets_json_path):
    os.remove(widgets_json_path)

with open(widgets_json_path, 'w') as file:
    file.write(widgets_df.to_json(orient='records'))
    file.close()

flask_app = build_app(Flask(__name__))
manager = DataManager(os.path.join(cwd, 'cache'), cwd)

manager.get_air_data()

if __name__ == '__main__':
    flask_app.run()
