import alsaaudio, wave, numpy

inp = alsaaudio.PCM(alsaaudio.PCM_CAPTURE)
inp.setchannels(1)
inp.setrate(44100)
inp.setformat(alsaaudio.PCM_FORMAT_S16_LE)
inp.setperiodsize(1024)

w = wave.open('pcm.wav', 'w')
w.setnchannels(1)
w.setsampwidth(2)
w.setframerate(44100)

while True:
    l, data = inp.read()
    a = numpy.fromstring(data, dtype='int16')
    print(numpy.abs(a).mean())
    w.writeframes(data)