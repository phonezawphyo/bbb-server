#include <FaceDetection.hpp>

FaceDetection::FaceDetection() {
	if(!faceCascade.load("/usr/local/share/OpenCV/haarcascades/haarcascade_frontalface_alt.xml")){
		printf("LOADING ERROR!!!!!!\n\n");
	}
}

FaceDetection::~FaceDetection() {
}

vector<Rect> FaceDetection::detectFaces(Mat img) {
	vector<Rect> faces;
	faceCascade.detectMultiScale( img, faces, 1.1, 2, 0|CV_HAAR_SCALE_IMAGE, Size(30, 30) );
	return faces;
}

void FaceDetection::drawFaces(Mat& img, vector<Rect> faces){
	for(int i=0; i<(int)faces.size(); i++) {
		Point center( faces[i].x + faces[i].width*0.5, faces[i].y + faces[i].height*0.5 );
		ellipse( img, center, Size( faces[i].width*0.5, faces[i].height*0.5), 0, 0, 360, Scalar( 255, 0, 255 ), 4, 8, 0 );
	}
}

