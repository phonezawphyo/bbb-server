CC=g++
CFLAGS=`pkg-config --cflags --libs opencv` -Wall
LDFLAGS= -L/usr/lib -L/usr/local/lib -I include/

VPATH = src:src/
vpath %.cpp	src/
vpath %.cpp	tests/
vpath %.hpp	include/
vpath %.o	build/

OBJECTS = Camera.o Screen.o
SOURCES = $(OBJECTS: .o=.cpp)

$(OBJECTS):	$(SOURCES)
			$(CC) -c $^ $(CFLAGS) $(LDFLAGS)  -o $@
			mv $@ build/
			
manualVersion: BeagleTracker.cpp FaceDetection.cpp Preprocess.cpp Camera.cpp Screen.cpp mainManual.cpp
			$(CC) $^ $(CFLAGS) $(LDFLAGS) -o $@
			mv $@ build/
			./build/$@

autoVersion: BeagleTracker.cpp FaceDetection.cpp Preprocess.cpp Camera.cpp Screen.cpp mainAuto.cpp
			$(CC) $^ $(CFLAGS) $(LDFLAGS) -o $@
			mv $@ build/
			./build/$@

testScreen:	Screen.cpp testScreen.cpp
			$(CC) $^ $(CFLAGS) $(LDFLAGS) -o $@
			mv $@ build/
			./build/$@

testCamera:	Camera.cpp Screen.cpp testCamera.cpp
			$(CC) $^ $(CFLAGS) $(LDFLAGS) -o $@
			mv $@ build/
			./build/$@
			
testPreprocess: Preprocess.cpp Camera.cpp Screen.cpp testPreprocess.cpp
			$(CC) $^ $(CFLAGS) $(LDFLAGS) -o $@
			mv $@ build/
			./build/$@

testFaceDetection: FaceDetection.cpp Preprocess.cpp Camera.cpp Screen.cpp testFaceDetection.cpp
			$(CC) $^ $(CFLAGS) $(LDFLAGS) -o $@
			mv $@ build/
			./build/$@
			
testBeagleTracker: BeagleTracker.cpp Preprocess.cpp Camera.cpp Screen.cpp testBeagleTracker.cpp
			$(CC) $^ $(CFLAGS) $(LDFLAGS) -o $@
			mv $@ build/
			./build/$@
