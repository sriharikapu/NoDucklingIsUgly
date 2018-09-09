import random
import requests

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

for i in range(500):
    bully, _ = random.choice(names)
    victim = bully
    while victim == bully:
        victim, _ = random.choice(names)
    statement = random.choice(insults)
    toxicity = random.uniform(0.8, 1.0)
    # associates = [x[0] for x in random.sample(names, 3)]
    data = {
        "bully" : bully,
        "victim" : victim,
        "statement" : statement,
        "toxicity" : toxicity,
        "location" : "PennApps",
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