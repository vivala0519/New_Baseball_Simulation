from pymongo import MongoClient
client = MongoClient('mongodb://test:test@localhost', 27017)
# client = MongoClient('localhost', 27017)
db = client.project

db.kbo_batter_stat.delete_many({'obp': ''})
db.kbo_pitcher_stat.delete_many({'obp': ''})

obp_zero = db.kbo_pitcher_stat.find({'obp': ''})
for item in obp_zero:
    print(item)