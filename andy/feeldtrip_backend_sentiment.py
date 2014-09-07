from flask import Flask
from flask import render_template
from flask import request

# import plotly.plotly as py
# from plotly.graph_objs import *

from geopy import geocoders
from geopy.geocoders import Nominatim
import twitter
import math
import re
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

import simplejson
import urllib
import urllib2
import numpy as np

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
filenameAFINN = '/Users/jakedouglas/development/FeeldTrip/andy/AFINN-111.txt'
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


# Open default URL to select destination 
@app.route('/')
def form():
	return render_template('select_destination.html')

# Define route of the action of the form
# Define type of requests: POST
@app.route('/feeld/', methods=['POST'])
def feeld():
	city = request.form['yourcity']

	# city = 'Detroit'
	geolocator = Nominatim()
	location = geolocator.geocode(city)


	latitude= location.latitude
	longitude=location.longitude
	
	query = "#vacation"
	count = 100
	geocode = str(latitude)+','+str(longitude)+','+'20.0mi'
	
	#print geocode
	search_results = twitter_api.search.tweets(q=query, count=count, lang='en',geocode=geocode)

	test = [sentiment(element['text']) for element in search_results['statuses'] ]
	
	#print test
	
	# final=np.mean(test)

	happiness = np.mean(test)

	# print final

	# render output html file, pass happiness value
	return render_template('city_happiness.html', happiness = happiness, latitude = latitude, longitude = longitude)

# run the app
if 	__name__ == '__main__':
	app.run()
