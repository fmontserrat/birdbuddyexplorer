import pandas as pd
import json

column_name = 'species_name'
month = 'january'
year = 2023

# Use path to monthly file here
df = pd.read_csv('../monthly/all_metadata_{}.csv'.format(month))

# Get the unique values of the column you want to split the data by
column_values = df[column_name].unique()

with open(f"../public/data/birds/{month}-{year}.csv", "w") as txt_file:

    # Loop over the unique values of the column
    for value in column_values:
        if type(value) is str:
          txt_file.write("".join(value) + ",")

