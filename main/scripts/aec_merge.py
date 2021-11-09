import os
import glob 
import fileinput as fi
import pandas as pd
import json

files = glob.glob(os.path.join(os.path.dirname('./static/data/test/aec/'), '*.txt'))
#print(files)
outputfile = (os.path.join(os.path.dirname('./static/data/test/aec/'), 'merge.txt'))
# with fi.input(files=files) as f:
#     for line in f:
#         print(f'File Name: {f.filename()} | Line No: {f.lineno()} | {line}')

# Open merge.txt in write mode
with open(outputfile, 'w') as outfile:
    # Iterate through list
    with open(files[0]) as f1:
        for line in f1:
            outfile.write(line)
        for x in files[1:]:
            with open(x) as f1:
                for line in f1:
                    if not line.startswith("ID"):
                        outfile.write(line)


# the file to be converted to 
# json format
filename = (os.path.join(os.path.dirname('./static/data/test/aec/'), 'merge.txt'))
  
# dictionary where the lines from
# text will be stored
dict1 = {}
  
# creating dictionary
with open(filename) as fh:
  
    for line in fh:
  
        # reads each line and trims of extra the spaces 
        # and gives only the valid words
        command, description = line.strip().split(None, 1)
  
        dict1[command] = description.strip()
  
# creating json file
# the JSON file is named as test1
outputfile_json = (os.path.join(os.path.dirname('./static/data/test/aec/'), 'merge.json'))
out_file = open(outputfile_json, "w")
json.dump(dict1, out_file, indent = 4, sort_keys = False)
out_file.close()

