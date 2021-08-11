from Batter_vs_Pitcher import Versus
from Base_and_Scored import Base_and_Scored

class Game_process():
    def Inning_Process(self, home_line_up, away_line_up):
        innings = range(1, 13)
        home_hitter_num = 1
        away_hitter_num = 1
        home_pitcher_num = 10
        away_pitcher_num = 10
        home_score = 0
        away_score = 0
        home_h = 0
        away_h = 0
        home_bb = 0
        away_bb = 0
        home_pitcher_count = 0
        away_pitcher_count = 0
        home_hitter_report = ''
        away_hitter_report = ''
        live_board = ''
        report = ''

        for inning in innings:
            print('-----------------', inning, '회 초 원정팀 공격 -----------------')
            out = 0
            who_is_attack = 'away'
            base = [0, 0, 0]
            while out != 3:
                if home_pitcher_count > 100:
                    if home_pitcher_num == 12:
                        pass
                    else:
                        home_pitcher_num += 1
                        home_pitcher_count = 0
                        print('투수 교체!!!')
                res = Versus.h_vs_p(home_line_up, away_line_up, away_hitter_num, home_pitcher_num, who_is_attack)
                h_vs_p = res[0]
                ball_count = res[1]
                print('현재 투수 :', res[3])
                print(away_hitter_num, '번 타자 ', res[2])
                if h_vs_p[2:4] == '아웃':
                    out += 1
                    away_hitter_report += str(away_hitter_num) + '번 아웃 + 1 '
                    print(h_vs_p, out, '아웃')
                else:
                    if h_vs_p == '볼넷':
                        away_hitter_report += str(away_hitter_num) + '번 볼넷 + 1 '
                        away_bb += 1
                    else:
                        away_hitter_report += str(away_hitter_num) + '번 안타 + 1 '
                        away_h += 1
                    hit_result = h_vs_p
                    print(hit_result)
                    result = Base_and_Scored.base(hit_result, base)
                    base = result[0]
                    away_score += result[1]
                    home_pitcher_count += ball_count
                    print('away score :', away_score)
                home_pitcher_count += ball_count
                away_hitter_num += 1
                if away_hitter_num == 10:
                    away_hitter_num = 1
                print('현재 투구 수 :', home_pitcher_count)
                print('-----------------------')
            if inning > 8 and home_score > away_score:     # 9회 이상일때, 홈팀 점수가 어웨이 보다 높으면 종료
                print(away_score, " : ", home_score)
                break
            else:
                print(away_score, " : ", home_score)
                print('-----------------', inning, '회 말 홈팀 공격 -----------------')
            out = 0
            who_is_attack = 'home'
            while out != 3:
                if away_pitcher_count > 100:
                    if away_pitcher_num == 12:
                        pass
                    else:
                        away_pitcher_num += 1
                        away_pitcher_count = 0
                        print('투수 교체!!!')
                res = Versus.h_vs_p(home_line_up, away_line_up, home_hitter_num, away_pitcher_num, who_is_attack)
                h_vs_p = res[0]
                ball_count = res[1]
                print('현재 투수 :', res[3])
                print(home_hitter_num, '번 타자')
                if h_vs_p[2:4] == '아웃':
                    out += 1
                    home_hitter_report += str(home_hitter_num) + '번 아웃 + 1 '
                    print(h_vs_p, out, '아웃')
                else:
                    if h_vs_p == '볼넷':
                        home_hitter_report += str(home_hitter_num) + '번 볼넷 + 1 '
                        home_bb += 1
                    else:
                        home_hitter_report += str(home_hitter_num) + '번 안타 + 1 '
                        home_h += 1
                    hit_result = h_vs_p
                    print(hit_result)
                    result = Base_and_Scored.base(hit_result, base)
                    base = result[0]
                    home_score += result[1]
                    print('home score :', home_score)
                away_pitcher_count += ball_count
                home_hitter_num += 1
                if home_hitter_num == 10:
                    home_hitter_num = 1
                away_pitcher_count += ball_count
                print('현재 투구 수 :', away_pitcher_count)
                print('-----------------------')
            print(away_score, " : ", home_score)
            if inning > 8 and (home_score > away_score or home_score < away_score):
                break
        print('game over')
        return 'game over'
