#Import libraries
import pandas as pd
import seaborn as sns
import numpy as np
import json
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, HashingVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.model_selection import GridSearchCV
from collections import Counter
import matplotlib.pyplot as plt
from IPython.display import display



# Set pandas to show all columns when you print a dataframe
pd.set_option('display.max_columns', None)

# Global setting here you choose the dataset number and classification type for the model
dataset_number = 1 # Options are [1, 2, 3, 4]
test_type = 'label' # Options are ['label', 'attack_type']
# Read the json and read it to a pandas dataframe object, you can change these settings
with open(f'D:/Users/Desktop/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/Datasets/dataset_{str(dataset_number)}_train.json') as file:
    raw_ds = json.load(file)
df = pd.json_normalize(raw_ds, max_level=2)

def check_for_Log4j(row):
    """
    The Log4J vulnerability, also known as “Log4Shell,” is a critical vulnerability discovered in the Apache Log4J logging library in November 2021.
    Log4Shell essentially grants hackers total control of devices running unpatched versions of Log4J.
    Malicious actors can use the flaw to run almost any code they want on vulnerable systems.
    """
    
    """
    NDI stands for Java Naming and Directory Interface. 
    It is a Java API that allows Java programs to access naming and directory services, such as LDAP and DNS.
    In the context of Log4j, JNDI can be used to obtain a reference to a Log4j configuration file stored in a directory service.
    This can be malicious if an attacker is able to modify the configuration file to cause Log4j to 
    log sensitive information or to execute arbitrary code. 
    """

    #If 'jndi:' is found in any column, the function returns 1, indicating that Log4j may be being used in that line.
    if row.str.contains('jndi:').any():
        return 1
    else:
        return 0

# Add this line in df and number it based on the code above to execute
df['Log4j'] = df.apply(lambda row: check_for_Log4j(row), axis=1)

def check_for_SQL_injection(row):
    """
    SQL injection (SQLi) is a web security vulnerability that allows an attacker to interfere with 
    the queries that an application makes to its database. 
    This can allow an attacker to view data that they are not normally able to retrieve
    """

    """
    %20or%20" is the equivalent of " or ".
    This can be used in a SQL injection attack by appending it to the end of a query 
    in order to comment out the rest of the query and execute arbitrary SQL commands.
    """
    if 'SELECT' in row["request.url"] or '%20or%20' in row["request.url"]:
        return 1
    else:
        return 0

df['SQL'] = df.apply(lambda row: check_for_SQL_injection(row), axis=1)


def check_for_RCE(row):
    """
    Remote code execution (RCE) attacks allow an attacker to remotely execute malicious code on a computer. 
    The impact of an RCE vulnerability can range from malware execution to an attacker gaining full control over a compromised machine.
    """

    """
    __globals__ attribute refers to a dictionary containing the global variables defined in the current namespace.
    can allow code to access and manipulate global variables in unintended ways.
    __builtins__ attribute refers to a dictionary containing the built-in functions and variables defined in Python.
    can allow code to access and manipulate built-in functions in unintended ways
    %3C/script%3E is a URL-encoded string that represents the characters </script>.
    __import__ attributes to import the os module and execute the system function.
    """

    if '__globals__' in row['request.url']\
        or "%3C/script%3E" in row['request.url']\
            or "__import__('os')" in row['request.url']\
                or '__builtins__' in row['request.url']:
        return 1
    else:
        return 0

df['RCE'] = df.apply(lambda row: check_for_RCE(row), axis=1)

def check_for_Directory_Traversal(row):
    """
    Properly controlling access to web content is crucial for running a secure web server. 
    Directory traversal or Path Traversal is an HTTP attack that allows attackers to 
    access restricted directories and execute commands outside of the web server’s root directory.
    """

    """
    An attacker tries to access sensitive files or a restricted directory on the server.
    "../../../" is a sequence of relative path traversal operators that can be used to 
    navigate up multiple levels in a file system directory tree.
    This can be used to access files or directories that are outside the intended directory structure, 
    potentially leading to sensitive information disclosure or unauthorized access.
    """

    if '../secrets.txt' in row["request.url"]\
            or '../etc/passwd.txt' in row["request.url"]\
                or ('../../../' in row["request.url"] and ('error' in row["response.body"])):
        return 1
    else:
        return 0

df['Directory_Traversal'] = df.apply(lambda row: check_for_Directory_Traversal(row), axis=1)

def check_for_Cookie_injection(row):
    """
    Cookie poisoning is a type of cyber attack in which a bad actor hijacks, forges, alters or manipulates
    a cookie to gain unauthorized access to a user's account, open a new account 
    in the user's name or steal the user's information for purposes such as identity theft.
    """

    if 'cookielogin' in row["request.url"]:
        return 1
    else:
        return 0

df['Cookie_Injection'] = df.apply(lambda row: check_for_Cookie_injection(row), axis=1)

def check_for_Log_Forge(row):
    """
    Log forging or Log Injection attacks. Introduction. 
    Log forging attack is a type of attack that occurs when an attacker tries to log into a server 
    by using the legitimate user's credentials. The attacker responds to login attempts 
    with forged requests, leading the site to authenticate them.
    """

    """
    "%20user%20" is the equivalent of " user ".
    """

    if '%20user%20' in row["request.url"]:
        return 1
    else:
        return 0

df['Log_Forge'] = df.apply(lambda row: check_for_Log_Forge(row), axis=1)

def check_for_XSS(row):
    """
    Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into 
    otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to 
    send malicious code, generally in the form of a browser side script, to a different end user. 
    Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses 
    input from a user within the output it generates without validating or encoding it
    """

    if ('script' in row["request.url"] and 'http://127.0.0.1:5000/forum?message=' in row["request.url"]) or row["request.url"] == 'http://127.0.0.1:5000/forum':
        return 1
    else:
        return 0

df['XSS'] = df.apply(lambda row: check_for_XSS(row), axis=1)

# Fill the black attack tag lines with "Benign" string
df['request.Attack_Tag'] = df['request.Attack_Tag'].fillna('Benign')
df['attack_type'] = df['request.Attack_Tag']

# This function will be used in the lambda below to iterate over the label columns 
# You can use this snippet to run your own lambda on any data with the apply() method
def categorize(row):  
    if row['request.Attack_Tag'] == 'Benign':
        return 'Benign'
    return 'Malware'

df['label'] = df.apply(lambda row: categorize(row), axis=1)

# After finishing the arrangements we delete the irrelevant column, which column has value like xss, sql injection,...
df.drop('request.Attack_Tag', axis=1, inplace=True)

# print(df)

"""
Performing mathematical operations on NaN values may produce unknown results or errors. 
Replacing NaN with 'None' helps avoid these problems.
"""
# Remove all NAN columns or replace with desired string
# This loop iterates over all of the column names which are all NaN
for column in df.columns[df.isna().any()].tolist():
    # df.drop(column, axis=1, inplace=True)
    df[column] = df[column].fillna('None')
    
# If you want to detect columns that may have only some NaN values use this:
# Helps you find the names of columns in the DataFrame that have at least one NaN value
# df.loc[:, df.isna().any()].tolist()

# print(df.head())

# On these headers we will run HashingVectorizer
COMPLEX_HEADERS = [
    'request.headers.Accept-Encoding',
    'request.headers.Accept',
    'request.headers.Accept-Language',
    'request.headers.Sec-Fetch-Site',
    'request.headers.Sec-Fetch-Mode',
    'request.headers.Sec-Fetch-Dest',
    'response.headers.Location',
    'request.headers.Set-Cookie',
    'request.method',
    'request.url',
    'response.status',
    'response.body',
    'request.headers.Content-Length',
    'request.headers.Cookie',
    'response.headers.Set-Cookie',
    'response.headers.Content-Length',
    ]

COLUMNS_TO_REMOVE = [
    'request.headers.Host',
    'request.headers.Date',
    'request.headers.Sec-Fetch-User',
    'response.headers.Content-Type',
    'request.headers.User-Agent',
    'request.headers.Connection',
    'request.body'
    ]

# from sklearn.feature_extraction.text import TfidfVectorizer

# def vectorize_df(df):
#     tfidf_vec = TfidfVectorizer()

#     # Run TfidfVectorizer on the chosen features
#     for column in COMPLEX_HEADERS:
#         newTfidfVec = tfidf_vec.fit_transform(df[column])
#         df[column] = newTfidfVec.todense()

#     # Remove some columns that may be needed.. (Or not, you decide)
#     for column in COLUMNS_TO_REMOVE:
#         df.drop(column, axis=1, inplace=True)

#     return df

# df = vectorize_df(df)
# # print(df.head())


# This is our main preprocessing function that will iterate over all of the chosen 
# columns and run some feature extraction models
def vectorize_df(df):
    h_vec = HashingVectorizer(n_features=4)

    # Run HashingVectorizer on the chosen features
    for column in COMPLEX_HEADERS: 
        newHVec = h_vec.fit_transform(df[column])
        df[column] = newHVec.todense()

    # Remove some columns that may be needed.. (Or not, you decide)
    for column in COLUMNS_TO_REMOVE: 
        df.drop(column, axis=1, inplace=True)
    
    return df

df = vectorize_df(df)
print(df.head())


features_list = df.columns.to_list()
features_list.remove('label')
features_list.remove('attack_type')

# print(features_list)