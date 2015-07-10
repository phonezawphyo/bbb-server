#include <Preprocess.hpp>
#include <Screen.hpp>
#include <Camera.hpp>

int main(int argc, char **argv) {
	Camera cam(0);
	Screen screen;
	char c=0;
	Mat img, processed;
	while(c!=27) {
		img = cam.getImage();
		Preprocess::preprocessImage(img, processed);

		screen.putImage(processed);
		c = waitKey(10);
	}
}
