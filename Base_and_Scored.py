class Base_and_Scored:
    def base(hit_result, base):
        before_base = base
        base_case_dic_1 = {'[0, 0, 0]': [1, 0, 0, 0],
                           '[1, 0, 0]': [1, 1, 0, 0], '[1, 1, 0]': [1, 1, 1, 0], '[1, 1, 1]': [1, 1, 1, 1],
                           '[1, 0, 1]': [1, 1, 0, 1],
                           '[0, 1, 0]': [1, 0, 1, 0], '[0, 1, 1]': [1, 0, 1, 1],
                           '[0, 0, 1]': [1, 0, 0, 1],
                           }
        base_case_dic_2 = {'[0, 0, 0]': [0, 1, 0, 0],
                           '[1, 0, 0]': [0, 1, 1, 0], '[1, 1, 0]': [0, 1, 1, 1], '[1, 1, 1]': [0, 1, 1, 2],
                           '[1, 0, 1]': [0, 1, 1, 1],
                           '[0, 1, 0]': [0, 1, 0, 1], '[0, 1, 1]': [0, 1, 0, 2],
                           '[0, 0, 1]': [0, 1, 0, 1],
                           }
        base_case_dic_b = {'[0, 0, 0]': [1, 0, 0, 0],
                           '[1, 0, 0]': [1, 1, 0, 0], '[1, 1, 0]': [1, 1, 1, 0], '[1, 1, 1]': [1, 1, 1, 1],
                           '[1, 0, 1]': [1, 1, 1, 0],
                           '[0, 1, 0]': [1, 1, 0, 0], '[0, 1, 1]': [1, 1, 1, 0],
                           '[0, 0, 1]': [1, 0, 1, 0],
                           }
        if hit_result == '안타':
            after_base = base_case_dic_1[str(before_base)][0:3]
            scored = base_case_dic_1[str(before_base)][3]
            return after_base, scored
        elif hit_result == '2루타':
            after_base = base_case_dic_2[str(before_base)][0:3]
            scored = base_case_dic_2[str(before_base)][3]
            return after_base, scored
        elif hit_result == '3루타':
            scored = 1
            count = 0
            for i in base:
                if i == 1:
                    count += 1
            scored += count
            base = [0, 0, 1]
            return base, scored
        elif hit_result == '홈런':
            scored = 1
            count = 0
            for i in base:
                if i == 1:
                    count += 1
            scored += count
            base = [0, 0, 0]
            return base, scored
        else:
            after_base = base_case_dic_b[str(before_base)][0:3]
            scored = base_case_dic_b[str(before_base)][3]
            return after_base, scored