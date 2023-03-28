# -*- coding: utf-8 -*-
"""
Created on Tue Mar 28 16:49:46 2023

@author: sammi
"""

import json
import pandas as pd
import os.path as op
import json

fname = 'C:/Users/sammi/Downloads/sheety_abilities_base.csv'

abils = pd.read_csv(fname)
abils = abils.loc[:, ['Abilities', 'Adre %', 'Type', 'Style', 'Img Link', 'CD', 'Aliases (max 10)', 'PvME']]
abils.columns = ['ability', 'adren', 'type', 'style', 'icon', 'cooldown', 'aliases', 'pvme']
abils.index = abils.ability
abils.adren = abils.adren.str.strip('%').astype(float)

abiljson = abils.to_json(orient='index')
parsed = json.loads(abiljson)
outname = '/Users/sammi/Desktop/sheetyweb/schekroud.github.io/abilities.json'
with open(outname, 'w') as f:
    json.dump(parsed, f)