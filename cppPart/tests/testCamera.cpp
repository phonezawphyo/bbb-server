#include <Camera.hpp>
#include <Screen.hpp>

int main(int argc, char **argv){
	Camera cam(0);
	Screen screen;
	char c = 0;
	while(c!=27){
		Mat img = cam.getImage();
		screen.putImage(img);
		c = waitKey(10);
	}
}
