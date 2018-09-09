import random
import requests

import datetime
# from datetime import timedelta

def random_date(start, end):
    """
    This function will return a random datetime between two datetime 
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start + datetime.timedelta(seconds=random_second)

epoch = datetime.datetime.utcfromtimestamp(0)

def unix_time_millis(dt):
    return (dt - epoch).total_seconds() * 1000.0

d1 = datetime.datetime.strptime('2018-09-02T13:30:00', '%Y-%m-%dT%H:%M:%S')
d2 = datetime.datetime.strptime('2018-09-09T13:30:00', '%Y-%m-%dT%H:%M:%S')

data = {
    "bully" : "Saiyan",
    "victim" : "Pranav",
    "statement" : "I will explode you",
    "toxicity" : 0.90,
    "location" : "PennApps",
    "associates" : ["Jhosh", "Yung Bav"],
}
names = [("Sayan", "Chaudhry"), ("Clark", "Kent"),("Bruce", "Wayne"),("Pablo", "Escobar"),("Wanda", "Maximoff"),("Than", "Os"),("Nick", "Fury"),("Vennu", "Mallesh"),("Pranav", "Kumar"),("Arnav", "Mahajan"),("Josh", "Durham"),("Wonder", "Woman"),("Jennifer", "Lopez"),("Ada", "Lovelace"),("Rachel", "Chu")]
insults = ["You're lame", "You're dumb", "You're stupid", "You're fat", "I will explode you", "I hate you", "You're terrible", "You're disgusting", "Your nose is fat", "Your nose is crooked", "Your mouth smells like rotten fish"]
half_class = [("Sayan", "Chaudhry"), ("Clark", "Kent"),("Bruce", "Wayne"),("Pablo", "Escobar"),("Wanda", "Maximoff"),("Than", "Os"),("Nick", "Fury"),("Vennu", "Mallesh")]
for i in range(100):
    bully, _ = random.choice(names)
    # bully = "Bruce"
    victim = bully
    while victim == bully:
        victim, _ = random.choice(names)
    # victim = random.choice(["Wanda", "Wonder", "Rachel", "Jennifer"])
    statement = random.choice(insults)
    toxicity = random.uniform(0.8, 1.0)
    d = int(unix_time_millis(random_date(d1, d2)))
    data = {
        "bully" : bully,
        "victim" : victim,
        "statement" : statement,
        "toxicity" : toxicity,
        "location" : "PennApps",
        "datetime" : d
        # "associates" : associates,
    }
    print(data)
    r = requests.post("https://lit-forest-54107.herokuapp.com/api/logBullyingEvent", data=data)
    print(r.text)
for i in range(500):
    bully, _ = random.choice(half_class)
    # bully = "Bruce"
    victim = bully
    while victim == bully:
        victim, _ = random.choice(names)
    # victim = random.choice(["Wanda", "Wonder", "Rachel", "Jennifer"])
    statement = random.choice(insults)
    toxicity = random.uniform(0.8, 1.0)
    d = int(unix_time_millis(random_date(d1, d2)))
    data = {
        "bully" : bully,
        "victim" : victim,
        "statement" : statement,
        "toxicity" : toxicity,
        "location" : "PennApps",
        "datetime" : d
        # "associates" : associates,
    }
    print(data)
    r = requests.post("https://lit-forest-54107.herokuapp.com/api/logBullyingEvent", data=data)
    print(r.text)

for i in range(200):
    # bully, _ = random.choice(half_class)
    bully = "Bruce"
    victim = bully
    while victim == bully:
        victim, _ = random.choice(names)
    victim = random.choice(["Wanda", "Wonder", "Rachel", "Jennifer"])
    statement = random.choice(insults)
    toxicity = random.uniform(0.8, 1.0)
    d = int(unix_time_millis(random_date(d1, d2)))
    data = {
        "bully" : bully,
        "victim" : victim,
        "statement" : statement,
        "toxicity" : toxicity,
        "location" : "PennApps",
        "datetime" : d
        # "associates" : associates,
    }
    print(data)
    r = requests.post("https://lit-forest-54107.herokuapp.com/api/logBullyingEvent", data=data)
    print(r.text)
# data = {
#     "firstName" : "Sayan",
#     "lastName" : "Chaudhry",
#     "gender" : "Male",
#     "race" : "Indian",
#     "dateOfBirth" : "1999-05-10T00:01:00"
# }