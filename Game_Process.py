from Batter_vs_Pitcher import Versus
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.project

class process():
    hitter_data = db.kbo_batter_stat.find({'year': 2018, 'team': 'SK', 'name': '로맥'})
    pitcher_data = db.kbo_pitcher_stat.find({'year': 2018, 'team': 'SK', 'name': '김광현'})
    hitter = []
    pitcher = []
    for item in hitter_data:
        hitter.append(item['year'])
        hitter.append(float(item['obp']))
    for item in pitcher_data:
        pitcher.append(item['year'])
        pitcher.append(float(item['obp']))
    hitter_year = hitter[0] - 2000
    pitcher_year = pitcher[0] - 2000
    batter_obp = hitter[1]
    pitcher_obp = pitcher[1]
    batter_league_obp = Versus.obp_dic[str(hitter_year)]
    pitcher_league_obp = Versus.obp_dic[str(pitcher_year)]
    total_league_obp_oz = Versus.total_league_obp_oz
    print(batter_obp, pitcher_obp)
    if Versus.versus(0, batter_obp, pitcher_obp, batter_league_obp, pitcher_league_obp, total_league_obp_oz) == True:
        Versus.out_result(0)
    else:
        Versus.hit_result(0)

