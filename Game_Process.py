from Batter_vs_Pitcher import Versus
from Base_and_Scored import Base_and_Scored

class Game_process():
    def Inning_Process(self):
        innings = range(1, 13)
        home_score = 0
        away_score = 0
        home_pitcher_count = 0
        away_pitcher_count = 0
        for inning in innings:
            for top_and_bottom in range(0, 2):
                out = 0
                base = [0, 0, 0]
                print('-----------------', inning, '회 초 원정팀 공격 -----------------')
                while out != 3:
                    h_vs_p = Versus.h_vs_p(0)[0]
                    if h_vs_p[2:4] == '아웃':
                        out += 1
                        print(h_vs_p, out, '아웃')
                    else:
                        hit_result = h_vs_p
                        print(hit_result)
                        result = Base_and_Scored.base(hit_result, base)
                        print(result)
                        base = result[0]
                        away_score += result[1]
                        print('away score : ', away_score)
                print('-----------------', inning, '회 말 홈팀 공격 -----------------')
                out = 0
                while out != 3:
                    h_vs_p = Versus.h_vs_p(0)[0]
                    if h_vs_p[2:4] == '아웃':
                        out += 1
                        print(h_vs_p, out, '아웃')
                    else:
                        hit_result = h_vs_p
                        print(hit_result)
                        result = Base_and_Scored.base(hit_result, base)
                        print(result)
                        base = result[0]
                        home_score += result[1]
                        print('home score : ', home_score)


    Inning_Process(0)