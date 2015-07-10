#include <Screen.hpp>
#include <Camera.hpp>
#include <Preprocess.hpp>
#include <FaceDetection.hpp>

int main(int argc, char **argv) {
	Camera cam(0);
	Screen screen;
	FaceDetection face;
	Mat img, target;
	vector<Rect> face_rects;
	char c=0;
	while(c!=27){
		img = cam.getImage();
		Preprocess::preprocessImage(img,target);
		face_rects = face.detectFaces(target);
		face.drawFaces( img, face_rects);
		screen.putImage(img);
		c = waitKey(10);
	}
}
