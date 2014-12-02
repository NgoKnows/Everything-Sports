#!/usr/bin/env python


import time
import urllib2
from urllib2 import urlopen
import re
import cookielib, urllib2
from cookielib import CookieJar
import datetime
 

urls = {
    'top': 'http://sports.espn.go.com/espn/rss/news',
    'nfl': 'https://sports.espn.go.com/espn/rss/nfl/news',
    'nba': 'https://sports.espn.go.com/espn/rss/nba/news',
    'mlb': 'https://sports.espn.go.com/espn/rss/mlb/news',
    'nhl': 'https://sports.espn.go.com/espn/rss/nhl/news',
    'golf': 'https://sports.espn.go.com/espn/rss/golf/news',
    'tennis': 'https://sports.espn.go.com/espn/rss/tennis/news',
    'boxing': 'https://sports.espn.go.com/espn/rss/boxing/news'
}

cj = CookieJar()
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
opener.addheaders = [('User-agent', 'Mozilla/5.0')]


def main(keyword='baseball'):
    """Pulls all links and headlines in RSS feed"""

    articles = []
    article = dict()
    for url in urls:
        try:
            page = urls[url]
            source_code = opener.open(page).read()
            print source_code
            try:
                items = re.findall(r'<item>(.*?)</item>', source_code)
                print type(items)
                for item in items:
                    # print item
                    # print re.findall(r'<dc:creator>(.*?)</dc:creator>', item)
                    article['creator'] = re.DOTALL(r'<dc:creator>(.*?)</dc:creator>', item)
                    article['title'] = re.DOTALL(r'<title>(.*?)</title>', item)
                    article['description'] = re.DOTALL(r'<description>(.*?)</description>', item)
                    article['date'] = re.DOTALL(r'<pubDate>(.*?)</pubDate>', item)
                    article['link'] = re.DOTALL(r'<link>(.*?)</link>', item)
                    articles.append(article)

            except Exception, e:
                print str(e)
        
        except Exception,e:
            print str(e), url
            pass

    print articles
    return articles

main()
