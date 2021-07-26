from selenium import webdriver
import urllib.parse

driver = webdriver.Chrome()
driver.get('http://www.statiz.co.kr/stat.php?opt=0&sopt=0&re=0&ys=2021&ye=2021&se=0&te=SSG&tm=&ty=0&qu=auto&po=0&as=&ae=&hi=&un=&pl=&da=1&o1=WAR_ALL_ADJ&o2=TPA&de=1&lr=0&tr=&cv=&ml=1&sn=30&si=&cn=')
first = driver.find_element_by_css_selector('#fixcol > table > tbody')
# num = first.find_elements_by_tag_name('tr > td > a')
# for item in num:
#     print(item.text)
num = first.find_elements_by_tag_name('tr > td:nth-child(3) > span > span:nth-child(3)')
for item in num:
    print(item.text)
# i = 3
# j = 2
# name = first.find_element_by_tag_name('tr:nth-child(%d) > td:nth-child(%d) > a'%(i,j)).text
driver.quit()
