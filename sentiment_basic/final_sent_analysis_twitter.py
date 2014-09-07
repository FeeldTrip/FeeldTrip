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

####SPECIFY THE LOCATION
city = 'Detroit'
geolocator = Nominatim()
location = geolocator.geocode(city)


latitude= location.latitude
longitude=location.longitude


####RUN THE TWITTER SEARCH
CONSUMER_KEY = 'ovmf1nAOyNz0EBJVXPlrlWv2z'
CONSUMER_SECRET = '5HUT976rX0kxEzDXGd8d9jXKUVYecsuXsUZsbsUPPaWgGgbqsw'
OAUTH_TOKEN = '1119862910-1cVFJhQ60nROW29MK4RSyORMGrWRXNDrQa5tvQu'
OAUTH_TOKEN_SECRET = 'A9nM3sz32n3z9QPpLFEOTB3LxSHJs8AD0Di2Mjlc5YH07'

auth = twitter.oauth.OAuth(OAUTH_TOKEN, OAUTH_TOKEN_SECRET,
                           CONSUMER_KEY, CONSUMER_SECRET)

twitter_api = twitter.Twitter(auth=auth)

query = "#vacation"
count = 100
geocode=str(latitude)+','+str(longitude)+','+'20.0mi'
#print geocode
search_results = twitter_api.search.tweets(q=query, count=count, lang='en',geocode=geocode)


####SENTIMENT ANALYSIS####
filenameAFINN = 'AFINN/AFINN-111.txt'
afinn = dict(map(lambda (w, s): (w, int(s)), [ 
            ws.strip().split('\t') for ws in open(filenameAFINN) ]))

pattern_split = re.compile(r"\W+")
 
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


test=[sentiment(element['text']) for element in search_results['statuses'] ]
#print test
final=np.mean(test)
print final



