from selenium import webdriver
import urllib.parse

driver = webdriver.Chrome()
driver.get('http://www.statiz.co.kr/stat.php?opt=0&sopt=0&re=0&ys=2021&ye=2021&se=0&te=SSG&tm=&ty=0&qu=auto&po=0&as=&ae=&hi=&un=&pl=&da=1&o1=WAR_ALL_ADJ&o2=TPA&de=1&lr=0&tr=&cv=&ml=1&sn=30&si=&cn=')
first = driver.find_element_by_css_selector('#fixcol > table > tbody')
# # 포지션
# num = first.find_elements_by_tag_name('tr > td:nth-child(3) > span > span:nth-child(3)')
# for item in num:
#     print(item.text)
# # 이름
# num = first.find_elements_by_tag_name('tr > td:nth-child(2) > a')
# for item in num:
#     print(item.text)

# 기록 크롤링
# second = driver.find_element_by_css_selector('#mytable > tbody > tr:nth-child(3)')
# num = second.find_elements_by_tag_name('td')
# name = num.find
# for item in num:
#     print(item.text)


# for i in range(3, 31):
#     if i == 13:
#         pass
#     elif i == 14:
#         pass
#     elif i == 25:
#         pass
#     elif i == 26:
#         pass
#     else:
#         try:
#             for j in range(2, 32):
#                 second = driver.find_element_by_css_selector('#mytable > tbody > tr:nth-child(%d) > td:nth-child(%d)'% (i, j))
#                 print(second.text)
#         except:
#             pass

trs = driver.find_elements_by_css_selector('#mytable > tbody > tr')
for index, item in enumerate(trs):
    if len(item.text) <= 5:
        continue
    if (item.find_elements_by_css_selector('th')):
        continue

    itemSplit = item.text.split(' ')
    refine = [x for x in itemSplit if x]
    print(refine)



driver.quit()
