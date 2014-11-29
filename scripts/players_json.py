import urllib
from bs4 import BeautifulSoup
import json
import time
import string

def getLetterPages():
    letter_pages = []
    for letter in list("a"):
        letter_pages.append("http://www.basketball-reference.com/players/" + letter + "/")
    return letter_pages

def getLinks():
    pageURLs = getLetterPages()
    activePlayers = []

    for page in pageURLs:
        time.sleep(2)
        cur_url = urllib.urlopen(page)
        html = cur_url.read()

        soup = BeautifulSoup(html)

        aEles = soup.findAll("a")

        for aEle in aEles:
            if(aEle.parent.name == 'strong' and aEle.parent.parent.name == 'td'):
                activePlayers.append("http://www.basketball-reference.com" + unicode(aEle['href']).encode('ascii', 'replace'))
    return activePlayers

def makeJson():
    urlList = getLinks()

    playerList = []

    for url in urlList:
        time.sleep(2)

        cur_url = urllib.urlopen(url)
        html = cur_url.read()

        soup = BeautifulSoup(html)
        name = unicode(soup.find("h1").contents[0]).encode('ascii', 'replace')
        print name

        perGame = soup.find("tr", {"id": "per_game.2015"})

        if perGame != None:
            perGameArray = perGame.findAll('td')
            stats = ["POS", "G", "GS", "MP", "FG", "FGA", "FG%", "3P", "3PA", "3P%", "2P", "2PA",
                     "2P%","FT", "FTA", "FT%", "ORB", "DRB", "TRB", "AST", "STL",
                     "BLK", "TOV", "PF", "PTS"]

            statsDict = dict()
            playerDict = dict()
            playerDict["name"] = name


            for i in range(4, len(perGameArray)):
                stat = perGameArray[i]
                category = stats[i-4]
                if(len(stat.contents) == 0):
                    statsDict[category] = 0
                else:
                    statsDict[category] = unicode(stat.contents[0]).encode('ascii', 'replace')

            playerDict["stats"] = statsDict
            playerList.append(playerDict)

    with open('../data/data.json', 'w') as outfile:
        json.dump(playerList, outfile)

def main():
    makeJson()

main()
