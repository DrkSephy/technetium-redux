import requests

# Get the total amount of commits in the repository
req = requests.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/wombat/changesets?limit=0')
count = req.json()['count']
stop = count / 50

# Function for computing all urls that need to be queried
def makeUrl(count):
  urls = []
  page = 1
  stop = count / 30
  start = 0
  while start <= stop:
    url = '%s?%s' % ('https://api.bitbucket.org/2.0/repositories/DrkSephy/wombat/commits/master', 'page=' + str(page))
    urls.append(url)
    page += 1
    start += 1
  return urls

urls = makeUrl(count)
print urls
