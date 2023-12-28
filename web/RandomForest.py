from flask import Flask, render_template, request, jsonify
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import HashingVectorizer
import numpy as np
import pandas as pd
import json

app = Flask(__name__)

pickle_in = open('model_api_check_rf.pickle', 'rb')
pac = pickle.load(pickle_in)

SIMPLE_HEADERS = ['request.headers.Accept-Encoding',
                  'request.headers.Connection',
                  'request.headers.Host',
                  'request.headers.Accept',
                  'request.method',
                  'request.headers.Accept-Language',
                  'request.headers.Sec-Fetch-Site',
                  'request.headers.Sec-Fetch-Mode',
                  'request.headers.Sec-Fetch-Dest',
                  'request.headers.Sec-Fetch-User',
                  'response.status']

COMPLEX_HEADERS = ['request.headers.User-Agent',
                   'request.headers.Set-Cookie',
                   'request.headers.Date',
                   'request.url',
                   'response.headers.Content-Type',
                   'response.body',
                   'response.headers.Location',
                   'request.headers.Content-Length',
                   'request.headers.Cookie',
                   'response.headers.Set-Cookie']

COLUMNS_TO_REMOVE = ['request.body',
                    'response.headers.Content-Length',
                    'request.headers.Date']

def load_data(file_path):
    with open(file_path) as file:
        raw_ds = json.load(file)

    input_df = pd.json_normalize(raw_ds, max_level=2)
    return input_df

def preprocess_data(input_df):
    input_df['request.Attack_Tag'] = input_df['request.Attack_Tag'].fillna('Benign')

    input_df['attack_type'] = input_df['request.Attack_Tag']

    def categorize(row):
        if row['request.Attack_Tag'] == 'Benign':
            return 'Benign'
        return 'Malware'

    input_df['label'] = input_df.apply(lambda row: categorize(row), axis=1)

    input_df.drop('request.Attack_Tag', axis=1, inplace=True)

    for column in input_df.columns[input_df.isnull().any()].tolist():
        input_df[column] = input_df[column].fillna('None')

    return input_df

def vectorize_df(input_df):
    le = LabelEncoder()
    h_vec = HashingVectorizer(n_features=4)

    # Run LabelEncoder on the chosen features
    for column in SIMPLE_HEADERS: 
        input_df[column] = input_df[column].astype(str)  # Ensure all values are strings
        input_df[column] = le.fit_transform(input_df[column])
    
    # Run HashingVectorizer on the chosen features
    for column in COMPLEX_HEADERS: 
        input_df[column] = input_df[column].astype(str)  # Ensure all values are strings
        input_df[column] = input_df[column].replace(np.nan, '')  # Replace NaN with an empty string
        newHVec = h_vec.fit_transform(input_df[column])
        input_df[column] = newHVec.todense()

    # Remove some columns that may be needed.. (Or not, you decide)
    for column in COLUMNS_TO_REMOVE: 
        input_df.drop(column, axis=1, inplace=True)
    return input_df

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/Api_check', methods=['GET'])
def Api_check():
    dataset_number = 1
    file_path = f'D:\Programming\ANTOANMANG\Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL\Datasets\dataset_1_train.json'
    
    input_df = load_data(file_path)

    input_df = preprocess_data(input_df)
    input_df = vectorize_df(input_df)

    features_list = input_df.columns.to_list()
    features_list.remove('label')
    features_list.remove('attack_type')

    X_input = input_df.iloc[1][features_list].values.reshape(1, -1)
    prediction_input = pac.predict(X_input)

    return jsonify(result=prediction_input[0])

if __name__ == '__main__':
    app.run(port=4000, debug=True)
