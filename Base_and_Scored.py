class Base_and_Scored:
    def base(hit_result, base):
        if hit_result == '안타':
            base[0] = 1
            return base
