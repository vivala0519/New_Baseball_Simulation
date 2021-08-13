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
        home_pitcher_report = ''
        away_pitcher_report = ''
        inning_report = ''
        score_board = ''
        home_pitcher_k = ''
        away_pitcher_k = ''
        # home_pitcher_bb = ''
        # away_pitcher_bb = ''
        home_pitcher_lost_score = ''
        away_pitcher_lost_score = ''
        end_inning = ''

        for inning in innings:
            # print('-----------------', inning, '회 초 원정팀 공격 -----------------')
            inning_report += '<h3 style="color:#9370DB">' + str(inning) + '회 초 Away 공격</h3>\n-------------------\n'
            out = 0
            who_is_attack = 'away'
            base = [0, 0, 0]
            inning_score = 0
            while out != 3:
                if home_pitcher_count > 100:
                    if home_pitcher_num == 12:
                        pass
                    else:
                        home_pitcher_num += 1
                        home_pitcher_count = 0
                        # print('투수 교체!!!')
                        home_pitcher_report += 'change' + str(home_pitcher_num) + '이닝' + str(inning) + '이닝' + str(out)
                        inning_report += '<p style="color:#9370DB">투수교체!!<p>\n'
                res = Versus.h_vs_p(home_line_up, away_line_up, away_hitter_num, home_pitcher_num, who_is_attack)
                h_vs_p = res[0]
                ball_count = res[1]
                # print('현재 투수 :', res[3])
                # inning_report += '현재 투수 : ' + res[3] + '\n'
                # print(away_hitter_num, '번 타자 ', res[2])
                inning_report += str(away_hitter_num) + '번 타자 : ' + res[2] + '\n'
                if h_vs_p[2:4] == '아웃':
                    out += 1
                    away_hitter_report += str(away_hitter_num) + '번 아웃\n'
                    # print(h_vs_p, out, '아웃')
                    if h_vs_p[0:2] == '삼진':
                        home_pitcher_k += str(home_pitcher_num) + '1'
                    inning_report += str(h_vs_p) + ' <p style="color:#FF6347;">' + str(out) + '아웃<p>' + '\n'
                else:
                    if h_vs_p == '볼넷':
                        away_hitter_report += str(away_hitter_num) + '번 볼넷\n'
                        away_bb += 1
                    # 볼넷이 아닌 안타, 2루타, 3루타, 홈런일 경우
                    else:
                        away_hitter_report += str(away_hitter_num) + '번 안타\n'
                        away_h += 1
                    hit_result = h_vs_p
                    # print(hit_result)
                    inning_report += '<p style="color:#6495ED">' + hit_result + '</p>' +'\n'
                    result = Base_and_Scored.base(hit_result, base)
                    base = result[0]
                    away_score += result[1]
                    if result[1] >= 1:
                        inning_report += '<p style="color:#191970">득점! + ' + str(result[1]) + '</p>'
                        home_pitcher_lost_score += str(home_pitcher_num) + str(result[1]) + ','
                    inning_score += result[1]
                    home_pitcher_count += ball_count
                    # print('away score :', away_score)
                home_pitcher_count += ball_count
                away_hitter_num += 1
                if away_hitter_num == 10:
                    away_hitter_num = 1
                # print('현재 투구 수 :', home_pitcher_count)
                # inning_report += '현재 투구 수 : ' + str(home_pitcher_count) + '\n'
                inning_report += '-------------------\n'
                # print('-----------------------')
            if inning > 8 and home_score > away_score:     # 9회 이상일때, 홈팀 점수가 어웨이 보다 높으면 종료
                # print(away_score, " : ", home_score)
                inning_report += str(away_score) + ' : ' + str(home_score) + '\n' + '-------------------\n'
                score_board += str(inning_score) + ' '
                end_inning = str(inning) + ' 초'
                break
            else:
                # print(away_score, " : ", home_score)
                inning_report += str(away_score) + ' : ' + str(home_score) + '\n' + '-------------------\n'
                score_board += str(inning_score) + ' '
                # print('-----------------', inning, '회 말 홈팀 공격 -----------------')
                inning_report += '<h3 style="color:#9370DB">' + str(inning) + '회 말 Home 공격</h3>\n-------------------\n'
            out = 0
            inning_score = 0
            who_is_attack = 'home'
            while out != 3:
                if away_pitcher_count > 100:
                    if away_pitcher_num == 12:
                        pass
                    else:
                        away_pitcher_num += 1
                        away_pitcher_count = 0
                        # print('투수 교체!!!')
                        away_pitcher_report += 'change' + str(away_pitcher_num) + '이닝' + str(inning) + '이닝' + str(out)
                        inning_report += '<p style="color:#9370DB">투수교체!!<p>\n'
                res = Versus.h_vs_p(home_line_up, away_line_up, home_hitter_num, away_pitcher_num, who_is_attack)
                h_vs_p = res[0]
                ball_count = res[1]
                # print('현재 투수 :', res[3])
                # print(home_hitter_num, '번 타자', res[2])
                # inning_report += '현재 투수 : ' + res[3] + '\n'
                inning_report += str(home_hitter_num) + '번 타자 : ' + res[2] + '\n'
                if h_vs_p[2:4] == '아웃':
                    out += 1
                    home_hitter_report += str(home_hitter_num) + '번 아웃\n'
                    # print(h_vs_p, out, '아웃')
                    if h_vs_p[0:2] == '삼진':
                        away_pitcher_k += str(away_pitcher_num) + '1'
                    inning_report += str(h_vs_p) + ' <p style="color:#FF6347;">' + str(out) + '아웃<p>' + '\n'
                else:
                    if h_vs_p == '볼넷':
                        home_hitter_report += str(home_hitter_num) + '번 볼넷\n'
                        home_bb += 1
                    else:
                        home_hitter_report += str(home_hitter_num) + '번 안타\n'
                        home_h += 1
                    hit_result = h_vs_p
                    # print(hit_result)
                    inning_report += '<p style="color:#6495ED">' + hit_result + '</p>' +'\n'
                    result = Base_and_Scored.base(hit_result, base)
                    base = result[0]
                    home_score += result[1]
                    inning_score += result[1]
                    if result[1] >= 1:
                        inning_report += '<p style="color:#191970">득점! + ' + str(result[1]) + '</p>'
                        away_pitcher_lost_score += str(away_pitcher_num) + str(result[1]) + ','
                    # print('home score :', home_score)
                away_pitcher_count += ball_count
                home_hitter_num += 1
                if home_hitter_num == 10:
                    home_hitter_num = 1
                away_pitcher_count += ball_count
                # print('현재 투구 수 :', away_pitcher_count)
                # print('-----------------------')
                # inning_report += '현재 투구 수 : ' + str(away_pitcher_count) + '\n'
                inning_report += '-------------------\n'
                if inning > 8 and home_score > away_score:  # 끝내기 상황
                    end_inning = str(inning) + ' 말 ' + str(out) + ' 아웃'
                    inning_report += str(away_score) + ' : ' + str(home_score) + '\n' + '-------------------\n'
                    score_board += str(inning_score) + ' '
                    inning_report += 'inning_cut_line'
                    break
            # print(away_score, " : ", home_score)
            if inning > 8 and home_score < away_score:  # 9회 이상에서 어웨이가 이기고 있을 때
                end_inning = str(inning) + ' 말 3 아웃'
                inning_report += str(away_score) + ' : ' + str(home_score) + '\n' + '-------------------\n'
                score_board += str(inning_score) + ' '
                inning_report += 'inning_cut_line'
                break
            else:   # 비기고 있을때
                if inning > 8 and home_score > away_score:
                    break
                else:
                    end_inning = str(inning) + ' 말 3 아웃'
                    inning_report += str(away_score) + ' : ' + str(home_score) + '\n' + '-------------------\n'
                    score_board += str(inning_score) + ' '
                    inning_report += 'inning_cut_line'
        print('game over')
        inning_report += '경기 종료' + 'inning_cut_line'
        # 스코어 붙이기
        inning_report += 'score_board' + score_board + 'score_board' + 'here_total' + str(away_score) + ' ' + str(home_score)
        inning_report += 'here_totalreport' + away_hitter_report + 'home' + home_hitter_report
        # 투수데이터 붙이기
        inning_report += 'score_board here_total pitchers' + str(home_line_up[9:12]) + str(away_line_up[9:12])
        inning_report += 'inhome' + home_pitcher_report + ', away' + away_pitcher_report + 'change이닝은 ' + end_inning + 'in'
        inning_report += 'k home' + home_pitcher_k + 'and away' + away_pitcher_k + ', '
        inning_report += 'lost home' + home_pitcher_lost_score + 'and away' + away_pitcher_lost_score
        print(inning_report)
        return inning_report