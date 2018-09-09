from threading import Thread
from toxic import toxic_check
from queue import Queue

import io
import pyaudio
import requests
import time
import wave
import webrtcvad

import context
import Request
import STT

CHUNK = 160
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
RECORD_SECONDS = 6000
WAVE_OUTPUT_FILENAME = "recording {wav_file_num}.wav"
SILENT_FRAME_COUNT = 50



# Thread to run speech to text in the background while listening for audio
class SpeechToText(Thread):
    def __init__(self, filename, last_lines, last_names):
        Thread.__init__(self)
        self.filename = filename
        self.last_lines = last_lines
        self.last_names = last_names

    def run(self):
        speech = STT.speech_to_text(self.filename)
        if speech:
            self.last_lines.put(speech)
            # self.last_names.put(speaker)
            print(speech)
            _, score = toxic_check(speech)
            print(score)
            if score >= 0.8:
                print("Toxic detected")
                with io.open(self.filename, 'rb') as wav_file:
                    wav_data = wav_file.read()
                speaker = Request.recognize_speaker(wav_data)
                print("The speaker is: ", speaker)
                print(list(self.last_lines.queue)[::-1])
                victims = context.context_back(list(self.last_lines.queue)[::-1]) # Use context based checking to find the victim
                print(victims)
                # d = int(datetime.datetime.utcnow().strftime("%s")) * 1000 
                if victims:
                    for victim in victims:
                        data = {
                            "bully" : speaker,
                            "victim" : victim[1],
                            "statement" : speech,
                            "toxicity" : score,
                            "location" : "PennApps",
                            "datetime" : int(round(time.time() * 1000)) + 40000000
                        }
                        print(data)
                        r = requests.post("https://lit-forest-54107.herokuapp.com/api/logBullyingEvent", data=data)
                        print(r.text)
                else:
                    data = {
                        "bully" : speaker,
                        "victim" : "Jennifer",
                        "statement" : speech,
                        "toxicity" : score,
                        "location" : "PennApps",
                        "datetime" : int(round(time.time() * 1000)) + 40000000
                    }
                    print(data)
                    r = requests.post("https://lit-forest-54107.herokuapp.com/api/logBullyingEvent", data=data)
                    print(r.text)


def main():
    # Last 50 lines and speakers for context based analysis
    last_lines = Queue(maxsize=10)
    last_names = Queue(maxsize=10)

    p = pyaudio.PyAudio()
    vad = webrtcvad.Vad()
    vad.set_mode(3)

    stream = p.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        input=True,
        frames_per_buffer=CHUNK
    )

    print("Recording")

    frames = []
    only_voice_frames = []
    silent_frames = 0
    wav_file_num = 0
    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        data = stream.read(CHUNK)
        frames.append(data)
        if (vad.is_speech(data, RATE)):
            # print('Contains speech:' + str(i))
            only_voice_frames.append(data)
            silent_frames = 0
        else:
            # print("No speech")
            silent_frames += 1
        if silent_frames >= SILENT_FRAME_COUNT and len(only_voice_frames) > 40:
            # print(
            #     "{count} frames of silence detected, writing {no_frames} frames so far to new wav file: ".format(
            #         count=SILENT_FRAME_COUNT, no_frames=len(only_voice_frames)
            #     ), WAVE_OUTPUT_FILENAME.format(
            #         wav_file_num=wav_file_num
            #     )
            # )

            # Write audio so far to a wav file
            wf = wave.open(WAVE_OUTPUT_FILENAME.format(wav_file_num=wav_file_num), 'wb')
            wf.setnchannels(CHANNELS)
            wf.setsampwidth(p.get_sample_size(FORMAT))
            wf.setframerate(RATE)
            wf.writeframes(b''.join(only_voice_frames))
            wf.close()

            # Create daemon thread to run speech to text for the wav file just generated
            thread = SpeechToText(WAVE_OUTPUT_FILENAME.format(wav_file_num=wav_file_num), last_lines, last_names)
            thread.daemon = True
            print("Starting thread to perform speech to text")
            thread.start()

            # update necessary values
            only_voice_frames = []
            silent_frames = 0
            wav_file_num += 1


    print("Done recording")
    # print(frames)
    stream.stop_stream()
    stream.close()
    p.terminate()

    wf = wave.open(WAVE_OUTPUT_FILENAME.format(wav_file_num=wav_file_num), 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(only_voice_frames))
    wf.close()

if __name__ == "__main__":
    main()