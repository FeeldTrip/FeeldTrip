from flask import Flask, jsonify, render_template, request

from geopy import geocoders
from geopy.geocoders import Nominatim

import twitter
import math
import re
import sys
import json

reload(sys)
sys.setdefaultencoding('utf-8')

import simplejson
import urllib
import urllib2
import numpy as np

import time
import unicodedata
from pytagcloud import create_tag_image, make_tags
from pytagcloud.lang.counter import get_tag_counts

# Initialize flask applicaiton
app = Flask(__name__)

# Initialize Twitter login credentials
CONSUMER_KEY = 'ovmf1nAOyNz0EBJVXPlrlWv2z'
CONSUMER_SECRET = '5HUT976rX0kxEzDXGd8d9jXKUVYecsuXsUZsbsUPPaWgGgbqsw'
OAUTH_TOKEN = '1119862910-1cVFJhQ60nROW29MK4RSyORMGrWRXNDrQa5tvQu'
OAUTH_TOKEN_SECRET = 'A9nM3sz32n3z9QPpLFEOTB3LxSHJs8AD0Di2Mjlc5YH07'

auth = twitter.oauth.OAuth(OAUTH_TOKEN, OAUTH_TOKEN_SECRET,
                           CONSUMER_KEY, CONSUMER_SECRET)

# Connect to Twitter
twitter_api = twitter.Twitter(auth=auth)


#### SENTIMENT ANALYSIS ####
filenameAFINN = '/Users/ucsf/Documents/Disrupt_Hackathon/FeeldTrip/FeeldTrip/wordlemap/AFINN-111.txt'
afinn = dict(map(lambda (w, s): (w, int(s)), [ ws.strip().split('\t') for ws in open(filenameAFINN) ]))

pattern_split = re.compile(r"\W+")

# Sentiment analysis 
def sentiment(text):
    """
    Returns a float for sentiment strength based on the input text.
    Positive values are positive valence, negative value are negative valence. 
    """
    words = pattern_split.split(text.lower())
    sentiments = map(lambda word: afinn.get(word, 0), words)
    if sentiments:
        # How should you weight the individual word sentiments? 
        # You could do N, sqrt(N) or 1 for example. Here I use sqrt(N)
        sentiment = float(sum(sentiments))/math.sqrt(len(sentiments))
        
    else:
        sentiment = 0
    return sentiment

def convert_format(my_date):
    year='20'+my_date.split('/')[2]
    month=my_date.split('/')[0]
    day=my_date.split('/')[1]
    if int(day)>=7: #deal with other cases later
        days=range(int(day)-6,int(day)+1)   
    days_to_analyze=[year+'-'+month+'-'+'0'+str(day_c) for day_c in days]
    final_date=year+'-'+month+'-'+day
    return days_to_analyze


# Open default URL to select destination 
@app.route('/')
def form():
	return render_template('wordle_select_destination.html')

# Define route of the action of the form
# Define type of requests: POST
@app.route('/', methods=['POST'])
def feeld():
	city = request.form['yourcity']

	# city = 'Detroit'
	geolocator = Nominatim()
	location = geolocator.geocode(city)


	latitude = location.latitude
	longitude = location.longitude
	
	query = "#vacation"
	count = 100
	geocode = str(latitude)+','+str(longitude)+','+'20.0mi'
	
	# search_results = twitter_api.search.tweets(q=query, count=count, lang='en',geocode=geocode)

	# test = [sentiment(element['text']) for element in search_results['statuses'] ]
	
	# print test
	
	# final=np.mean(test)

	# happiness = np.mean(test)

	dates_to_average = convert_format(time.strftime("%x"))

	sentiments_over_the_week=[]
	
	for date in dates_to_average:
		sentiments_over_the_week.append(twitter_api.search.tweets(q=query, count=count, lang='en', geocode = geocode, until = date))

	av_across_7=[]

	for sent in sentiments_over_the_week:
    # print len(sent['statuses'])
	 	value=[]
    
    	for tweet in sent['statuses']:
        	value.append(sentiment(tweet['text']))
    	
    	av_across_7.append(np.mean(value)) #len(value)
    	# print sent['statuses'][0]['text']
	
	happiness = np.mean(av_across_7)  
	print happiness
	
	####THIS PART IS FOR THE WORDLE PLOTTING#######
	all_tweets = []

	for sent in sentiments_over_the_week:
		for tweet in sent['statuses']:
			all_tweets.append(tweet['text'])
	
	all_tweets_text = ', '.join(all_tweets)

	exclude=['!','#',',','@']
	text = ''.join(ch for ch in all_tweets_text if ch not in exclude)
	text2 = re.sub(r'http?:\/\/t\.co\/\w+', ' ', text)
	text3 = re.sub(r"\\U\w+", '', text2)
	text4 = unicodedata.normalize('NFKD', text3).encode('ascii','ignore')
	exclude = ["\\","'",".","-",":"]
	text5 = ''.join(ch for ch in text4 if ch not in exclude)
	text6 = re.sub(r"\d+", '', text5)
	text7 = text6.lower()


	final_list=[]
	for word in text7.split():
	    if word.strip() in afinn:
	        final_list.append(word)

	final_sentence=' '.join(final_list)
	
	tags = make_tags(get_tag_counts(final_sentence), maxsize=120)
	print tags
	
	return render_template('wordle_select_destination.html',  latitude = latitude, longitude = longitude, happiness = happiness, tags = tags )


# run the app
if 	__name__ == '__main__':
	app.run()
