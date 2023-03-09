import pandas as pd

column_name = 'species_name'
month = 'february'
year = 2023

# Use path to monthly file here
df = pd.read_csv('../monthly/all_metadata_{}.csv'.format(month))

# Get the unique values of the column you want to split the data by
column_values = df[column_name].unique()

# Loop over the unique values of the column
for value in column_values:

    # Create a dataframe for each unique value
    value_df = df[df[column_name] == value]

    print(f"Creating file for {value_df}...")

    # Write the dataframe to a new csv file
    value_df.to_csv(f"../public/data/{year}/{month}/{value}.csv", index=False)
