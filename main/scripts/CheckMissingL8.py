# -*- coding: utf-8 -*-
"""
Created on Wed Nov 20 16:17:28 2019

@author: nbiswas
"""
import os
for fn in os.listdir('./static/data/aec'):
    if os.path.exists('./static/data/sarea/L7/' + fn) == False:
        print (fn[:-4])
        
    