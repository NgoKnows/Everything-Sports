#!/usr/bin/env python

import cookielib
import datetime
import re
import string
import sys
import time
import urllib2
import json

URLS = {
    'top': 'http://sports.espn.go.com/espn/rss/news',
    'nfl': 'https://sports.espn.go.com/espn/rss/nfl/news',
    'nba': 'https://sports.espn.go.com/espn/rss/nba/news',
    'mlb': 'https://sports.espn.go.com/espn/rss/mlb/news',
    'nhl': 'https://sports.espn.go.com/espn/rss/nhl/news',
    'golf': 'https://sports.espn.go.com/espn/rss/golf/news',
    'tennis': 'https://sports.espn.go.com/espn/rss/tennis/news',
    'boxing': 'https://sports.espn.go.com/espn/rss/boxing/news'
}

opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookielib.CookieJar()))
opener.addheaders = [('User-agent', 'Mozilla/5.0')]


def main():
    """Pulls all links and headlines in RSS feed"""

    articles = []
    article = {}
    a = 5;
    for key, url in URLS.iteritems():
        try:
            source_code = opener.open(url).read()
            # print '===>', source_code
            try:
            	items = re.findall(r'<item>(.*?)</item>', source_code, re.DOTALL)
            	# print '===>', items

                for item in items:
                    article = {}
                    article['title'] = re.findall(r'<title><!\[CDATA\[(.*?)\]\]\></title>', item)[0]
                    article['description'] = re.findall(r'<description><!\[CDATA\[(.*?)\]\]\></description>', item)[0]
                    article['link'] = re.findall(r'<link>(.*?)</link>', item)[0]
                    article['creator'] = re.findall(r'<dc:creator><!\[CDATA\[(.*?)\]\]\></dc:creator>', item)[0]
                    article['date'] = re.findall(r'<pubDate>(.*?)</pubDate>', item)[0]
                    article['url'] = url

                    articles.append(article)
                    # print '--->', article

                     # for word in keywords:
                     #     if word in article['title'].lower() or word in article['description'].lower() or word in article['link'].lower():
                     #         if article not in articles:
                     #         	articles.append(article)

            except Exception, e:
                # print str(e)
                pass

        except Exception, e:
            # print str(e), key
            pass

    # print '###################################'
    # print articles, len(articles)
    articles_json = json.dumps(articles)
    with open('../data/articles.json', 'w') as outfile:
        json.dump(articles_json, outfile)



if __name__ == "__main__":

    main()

