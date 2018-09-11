# NoDucklingIsUgly
IoT project to tackle bullying using sentiment analysis - PennApps XVIII

Inspiration
Bullying is an issue prevalent worldwide - regardless of race, age or gender. Having seen it up close in our daily school lives, yet having done nothing about it, we decided to take a stand and try to tackle this issue using the skills at our disposal. We don't believe that bullies always deserve punishment - instead, we should reach out to them and help them overcome whatever reasons may be causing them to bully. Because of this, we decided to implement both a short time as well as a long term solution.

What it does
No Duckling Is Ugly is an IoT system that listens to conversations by students in classrooms, performs real time sentiment analysis on their interactions and displays the most recent and relevant bullying events, identifying the students involved in the interaction. In the short run, teachers are able to see real time when bullying occurs and intervene if necessary - in the long run, data on such events is collected and displayed in a user friendly manner, to help teachers decide on how to guide their class down the healthiest and most peaceful path.

How we built it
Hardware: We used Qualcomm Dragonboard 410c boards to serve as the listening IoT device, and soldered analog microphones onto them (the boards did not come with microphones inbuilt).

Software: We used PyAudio and webrtcvad to read a constant stream of audio and break it into chunks to perform processing on. We then used Google Speech Recognition to convert this speech to text, and performed sentiment analysis using the Perspective API to determine the toxicity of the statement. If toxic, we use Microsoft's Cognitive Services API to determine who said the statement, and use Express to create a REST API, which finally interfaces with the MongoDB Stitch service to store the relevant data.

Challenges we ran into
Audio encoding PCM - The speaker recognition service we use requires audio input in a specific PCM format, with a 16K sampling rate and 16 bit encoding. Figuring out how to convert real time audio to this format was a challenge.

No mic on Dragonboard - The boards we were provided with didn't come with onboard microphones, and the GPIO pins seemed to be dysfunctional, so we ended up soldering the mics directly onto the board after analyzing the chip architecture.

Integrating MongoDB Stitch with Python and Angular - MongoDB Stitch does not have an SDK for either Python or Angular, so we had to create a middleman service (using Express) based on Node.js to act as a REST API, handling requests from Python and interfacing with MongoDB.

Handling streaming audio - None of the services we used supported constantly streaming audio, so we had to determine how exactly to split up the audio into chunks. We eventually used webrtcvad to detect if voices were present in the frames being recorded, creating temporary WAV files with the necessary encodings to send to the necessary APIs

Accomplishments that we're proud of
Being able to work together and distribute work effectively. This project had too many components to seem feasible in 36 hours, especially taking into account the obstacles we faced, yet we are proud that we managed to implement a working project in this time. Not only did we create something we were passionate about, we also managed to create something that will hopefully help people

What we learned
We had never worked with any of the technologies used in this project before, except AngularJS and Python - we learned how to use a Dragonboard, how to set up a MongoDB Stitch service, as well as audio formatting and detection. Most of all, we learned how to work together well as a team.

What's next for No Duckling Is Ugly
The applications for this technology reaches far beyond the classroom - in the future, this could even be applied to detecting crimes happening real time, prompting faster police response times and potentially saving lives. The possibilities are endless

Built With
python
qualcomm
mongodb
express.js
natural-language-processing
heroku
sentiment-analysis-online
azure
angular.js
typescript
