#include <Screen.hpp>
#include <Camera.hpp>
#include <Preprocess.hpp>
#include <BeagleTracker.hpp>

int main(int argc, char **argv){
	Camera cam(0);
	Screen screen;
	BeagleTracker tracker;
	Mat img;
	Rect2d bounderies = Rect2d(100, 100, 50, 50);
	char c=0;
	bool tracking = false;
	bool initialized = false;
	int skipFrames = 0;
	while(c!=27){
		img = cam.getImage();
		if(c == 'p'){
			tracking = !tracking;
		}
		if(tracking) {
			if(!initialized){
				tracker.initialTraining(img, bounderies);
				initialized = !initialized;
			}else if(skipFrames == 0){
				tracker.update(img, bounderies);
			}
		}
		skipFrames = (skipFrames+1)%12;
		screen.drawRectangle(img, bounderies);
		screen.putImage(img);
		c = waitKey(10);
	}
}
