Template = {
    "RotationName":{
        "kind":"check",
        "text":"Rotation Name",
    },
    "RotationTemplate":{
        "kind":"select",
        "text": "Template",
        "labels": {
            "Default":"Default",
            "Blank":"Blank",
            "ragoP1": "Vorago P1",
            "ragoP1Accel":"Vorago P1 - Accel",
            "ragoP2":"Vorago Phase 2",
            "ragoP3Ceils":"Ceiling Collapse",
            "ragoP3Scop":"Scopulus",
            "ragoP3Vit":"Vitalis",
            "ragoP3GB":"Green Bomb",
            "ragoP3TS":"Team Split",
            "ragoP3PB1":"The End (reds 2)",
            "ragoP3PB2":"The End (blues 2)",
            "ragoP3PB3":"The End + P2",
            "ragoP50spec":"Vorago P5 0spec",
            "ragoP5TS":"Vorago P5 TS"
        }

    },
    "CombatStyle":{
      "kind": "select",
      "text": " Combat Style",
      "labels": {
        "mage":"Mage",
        "range":"Range",
        "melee":"Melee"
      }
    }
};

Builder = {
    "initTick":{
        "kind":"select",
        "text":"Initial Tick",
        "labels":{
            "1":"1"
        }
    },
    "initAdren":{
        "kind":"select",
        "text":"Initial Adrenaline",
        "labels":{
            "0":"0",
            "100":"100",
            "120":"120"
        }
    },
    "vigour":{
        "kind":"select",
        "text":"Ring of Vigour",
        "labels":{
            "none":"none",
            "all":"Both / Warped Gem",
            "ults":"Ultimates only",
            "specs":"Specials Only"
        }
    },
    "nextAbilHighlight":{
        "kind":"check",
        "text":"Next Ability Highlight"
    }
};

Damage = {
    "reprisal":{
        "kind":"select",
        "text":"Reprisal",
        "labels": {
            "10k":"10,000"
        }
    },
    "shatter":{
        "kind":"select",
        "text":"Shatter",
        "labels": {
            "10k":"30,000"
        }
    },
    "aura":{
        "kind":"select",
        "text":"Damage Preset",
        "labels": {
            "none":"No Aura",
            "insp":"Inspiration",
            "invig":"Supreme Invigorate",
            "mahj":"Mahjarrat",
            "zerk":"Berserker",
            "reck":"Reckless",
            "mani":"Maniacal",
            "allSmoke":"All + Smoke Cloud"
        }
    }
};

inventionPerks = {
    "energising": {
      "kind":"select",
      "text": "Energising rank",
      "labels":{
        "0":"0",
        "1":"1",
        "2":"2",
        "3":"3",
        "4":"4"}
    },
    "invig":{
      "kind":"select",
      "text":"invigorating rank",
      "labels":{
        "0":"0",
        "1":"1",
        "2":"2",
        "3":"3",
        "4":"4"}
    },
    "planted-feet": {
      "kind":"check",
      "text":"planted feet"
    },
    "reflexes":{
      "kind":"check",
      "text":"reflexes"
    }
  };

archRelics = {
    "fots":{
        "kind":"check",
        "text":"Fury of the Small"
      },
      "hs":{
        "kind":"check",
        "text":"Heightened Senses"
      },
      "coe":{
        "kind":"check",
        "text": "Conservation of Energy"
      }
};

otherParams = {
    "igneousCapes":{
        "kind":"check",
        "text":"Igneous Capes"
      },
      "lengs":{
        "kind":"check",
        "text":"Leng Set bonus"
      },
      "keragloves":{
        "kind":"select",
        "text":"Kerapac Wristwraps",
        "labels":{
            "none":"Not Active",
            "normal":"No Enchantment",
            "enchanted":"Enchantment of Flames"
        }
      },
      "gop":{
        "kind":"select",
        "text":"Gloves of Passage",
        "labels":{
            "none":"Not Active",
            "normal":"No Enchantment",
            "enchanted":"Enchantment of Agony"
        }
      },
      "msoa":{
        "kind":"check",
        "text":"Masterwork Spear"
      },
      "sgbSize":{
        "kind":"select",
        "text":"SGB: NPC size",
        "labels":{
            "1":"1x1",
            "2":"2x2",
            "3":"3x3",
            "4":"4x4",
            "5":"5x5"
        }
      },
      "gsun":{
        "kind":"check",
        "text":"Greater Sunshine"
      },
      "gswift":{
        "kind":"check",
        "text":"Greater Swiftness"
      },
};