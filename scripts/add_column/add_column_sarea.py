import os
import glob 
import fileinput as fi
import pandas as pd
import json

allFiles = glob.glob(os.path.join(os.path.dirname('./static/data/sarea/'), '*.txt'))
#print(allFiles)

path = os.path.join(os.path.dirname('./static/data/sarea/'))

for file in glob.glob(path+'/*.txt'):
    print(file)

    new_path = './static/data/csv/sarea/'

    if file == path+'/5136.txt':
        df = pd.read_csv(file)
        df["id"] = 5136
        df["name"] = "Nam Ngum 1"
        df["country"] = "Laos"
        df["river"] = "Nam Ngum"
        new_csv = df.to_csv(new_path+"/5136.txt", index=False)

    elif file == path+'/5149.txt':
        df = pd.read_csv(file)
        df["id"] = 5149
        df["name"] = "Ubol Ratana"
        df["country"] = "Thailand"
        df["river"] = "Nam Pong"
        new_csv = df.to_csv(new_path+"/5149.txt", index=False)

    elif file == path+'/5150.txt':
        df = pd.read_csv(file)
        df["id"] = 5150
        df["name"] = "Lam Pao"
        df["country"] = "Thailand"
        df["river"] = "Chi"
        new_csv = df.to_csv(new_path+"/5150.txt", index=False)
    
    elif file == path+'/5796.txt':
        df = pd.read_csv(file)
        df["id"] = 5796
        df["name"] = "Sirindhorn"
        df["country"] = "Thailand"
        df["river"] = "Lam Dom Noi"
        new_csv = df.to_csv(new_path+"/5796.txt", index=False)

    elif file == path+'/6999.txt':
        df = pd.read_csv(file)
        df["id"] = 6999
        df["name"] = "Nam Theun 2"
        df["country"] = "Laos"
        df["river"] = "Nam Theun"
        new_csv = df.to_csv(new_path+"/6999.txt", index=False)

    elif file == path+'/7000.txt':
        df = pd.read_csv(file)
        df["id"] = 7000
        df["name"] = "Nam Mang 3"
        df["country"] = "Laos"
        df["river"] = "Nam Gnong"
        new_csv = df.to_csv(new_path+"/7000.txt", index=False)

    elif file == path+'/7203.txt':
        df = pd.read_csv(file)
        df["id"] = 7203
        df["name"] = "Se San 4"
        df["country"] = "Vietnam"
        df["river"] = "Se San"
        new_csv = df.to_csv(new_path+"/7203.txt", index=False)

    elif file == path+'/7303.txt':
        df = pd.read_csv(file)
        df["id"] = 7303
        df["name"] = "Lower Sesan 2"
        df["country"] = "Cambodia"
        df["river"] = "Sesan"
        new_csv = df.to_csv(new_path+"/7303.txt", index=False)
        