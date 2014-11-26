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


def main(keyword='source'):
    """Pulls all links and headlines in RSS feed"""

    for url in urls:
        try:
            page = urls[url]
            source_code = opener.open(page).read()

            try:
                for code in source_code:
                    titles = re.findall(r'<title>(.*?)</title>', source_code)
                    links = re.findall(r'<link>(.*?)</link>', source_code)

                    for title in titles:
                        if keyword in title:
                            print title
                    
            except Exception, e:
                print str(e)
        
        except Exception,e:
            print str(e), url
            pass

main()
