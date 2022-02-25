import os
import glob 
import fileinput as fi
import pandas as pd
import json

allFiles = glob.glob(os.path.join(os.path.dirname('./static/data/csv/rcurve/'), '*.txt'))
#print(files)

mergeFile = (os.path.join(os.path.dirname('./static/data/merge_csv/'), 'rcurve_all.txt'))

# # Open merge.txt in write mode
with open(mergeFile, 'w') as outfile:
    # Iterate through list
    with open(allFiles[0]) as f1:
        for line in f1:
            outfile.write(line)
        #outfile.write("\n")
        for x in allFiles[1:]:
            with open(x) as f1:
                for line in f1:
                    if not line.startswith("Month"):
                        outfile.write(line)
            #outfile.write("\n")

