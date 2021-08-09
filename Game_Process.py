from Batter_vs_Pitcher import Versus

class process():
    def h_vs_p(self):   # 타 vs 투
        if Versus.versus(0, Versus.obp_dic, Versus.total_league_obp_oz) == True:
            result = Versus.out_result(0)[0]
            if result == '삼진':
                ball_count = Versus.pitch_count_case_K(0)
            else:
                ball_count = Versus.pitch_count(0)
        else:
            result = Versus.hit_result(0)[0]
            if result == '볼넷':
                ball_count = Versus.pitch_count_case_BB(0)
            else:
                ball_count = Versus.pitch_count(0)
        print(result, ', 투구 수 : ', ball_count)
        return result, ball_count

    h_vs_p(0)