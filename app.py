from flask import Flask, render_template, jsonify, request
app = Flask(__name__)
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.project
from Game_Process import Game_process

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')

# 연도선택
@app.route('/searchByYear', methods=['POST'])
def searchByYear():
    selectedYear = request.form['year']
    data = db.kbo_batter_stat.distinct('team', {'year': int(selectedYear)})
    print(data)
    return jsonify(data)
# 팀 선택
@app.route('/searchByTeam', methods=['POST'])
def searchByTeam():
    selectedYear = request.form['year']
    selectedTeam = request.form['team']
    print(selectedYear, selectedTeam)
    hitter_data = db.kbo_batter_stat.find({'team': selectedTeam, 'year': int(selectedYear)})
    pitcher_data = db.kbo_pitcher_stat.find({'team': selectedTeam, 'year': int(selectedYear)})
    player = []
    for item in hitter_data:
        player.append(item['name'])
    for item in pitcher_data:
        player.append(item['name'])
    player.sort()
    print(player)
    return jsonify(player)
# 포지션 선택
@app.route('/searchByPosition', methods=['POST'])
def searchByPosition():
    selectedYear = request.form['year']
    selectedTeam = request.form['team']
    selectedPosition = request.form['position']
    print(selectedYear, selectedTeam, selectedPosition)
    print(selectedPosition)
    player = []
    if selectedPosition != '투수':
        if selectedPosition == '포수':
            selectedPosition = 'C'
        if selectedPosition == '1루수':
            selectedPosition = '1B'
        if selectedPosition == '2루수':
            selectedPosition = '2B'
        if selectedPosition == '3루수':
            selectedPosition = '3B'
        if selectedPosition == '유격수':
            selectedPosition = 'SS'
        if selectedPosition == '좌익수':
            selectedPosition = 'LF'
        if selectedPosition == '중견수':
            selectedPosition = 'CF'
        if selectedPosition == '우익수':
            selectedPosition = 'RF'
        if selectedPosition == '지명타자':
            selectedPosition = 'DH'
        hitter_data = db.kbo_batter_stat.find({'team': selectedTeam, 'year': int(selectedYear), 'position': selectedPosition})
        for item in hitter_data:
            player.append(item['name'])
    else:
        pitcher_data = db.kbo_pitcher_stat.find({'team': selectedTeam, 'year': int(selectedYear)})
        for item in pitcher_data:
            player.append(item['name'])
    player.sort()
    print(player)
    return jsonify(player)
# 선수 추가
@app.route('/addPlayer', methods=['POST'])
def addPlayer():
    selectedYear = request.form['year']
    selectedTeam = request.form['team']
    selectedPlayer = request.form['player']
    print(selectedYear, selectedTeam, selectedPlayer)
    hitter_data = db.kbo_batter_stat.find({'year': int(selectedYear), 'team': selectedTeam, 'name': selectedPlayer})
    pitcher_data = db.kbo_pitcher_stat.find({'year': int(selectedYear), 'team': selectedTeam, 'name': selectedPlayer})
    position = []
    for item in hitter_data:
        position.append(item['position'])
    for item in pitcher_data:
        position.append(item['position'])
    print(position)
    return jsonify(position)
# 선수 검색
@app.route('/searchByStr', methods=['POST'])
def searchByStr():
    str = request.form['str']
    print(str)
    hitter_data = list(db.kbo_batter_stat.find({'name': str}, {'_id': False}))
    pitcher_data = list(db.kbo_pitcher_stat.find({'name': str}, {'_id': False}))
    player = []
    for item in hitter_data:
        player.append(item)
    for item in pitcher_data:
        player.append(item)
    print(player)
    return jsonify(player)

# play ball
@app.route('/playBall', methods=['POST'])
def playBall():
    game = Game_process()
    home_list = request.form['home_list']
    home = home_list.split(',')
    home_line_up = []
    away_list = request.form['away_list']
    away = away_list.split(',')
    away_line_up = []
    for i in range(0, home.__len__()-1):
        home_line_up.append(home[i].split('-'))
        away_line_up.append(away[i].split('-'))

    return game.Inning_Process(home_line_up, away_line_up)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
