from flask import Flask, render_template, jsonify, request
app = Flask(__name__)
import json
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.project

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')


## API 역할을 하는 부분
@app.route('/searchByYear', methods=['POST'])
def searchByYear():
    selectedYear = request.form['year']
    data = db.kbo_batter_stat.distinct('team', {'year': int(selectedYear)})
    print(data)
    return jsonify(data)

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
    print(player)
    return jsonify(player)

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
    print(player)
    return jsonify(player)

@app.route('/review', methods=['POST'])
def write_review():
    sample_receive = request.form['sample_give']
    print(sample_receive)
    return jsonify({'msg': '이 요청은 POST!'})


@app.route('/review', methods=['GET'])
def read_reviews():
    sample_receive = request.args.get('sample_give')
    print(sample_receive)
    return jsonify({'msg': ''})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)