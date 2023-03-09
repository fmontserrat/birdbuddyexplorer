import pandas as pd
import json
import os

column_name = 'species_name'
directory = '../public/data/birds'
birds = []
import json

for filename in os.listdir(directory):
    filepath = f"{directory}/{filename}"
    print(f"Reading {filepath}")
    df = pd.read_csv(f"{directory}/{filename}", header=None)
    for column in df:
        value = df.loc[0,column]
        if type(value) is str:
            birds.append(value)

dedupedbirds = list( dict.fromkeys(birds) )

with open(f"../public/data/allmonths.json", "w") as txt_file:
          txt_file.write(json.dumps(dedupedbirds))
