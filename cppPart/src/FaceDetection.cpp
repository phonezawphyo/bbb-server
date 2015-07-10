#include <FaceDetection.hpp>

FaceDetection::FaceDetection() {
	faceCascate.load("haarcascade_frontalface_alt.xml");
}

FaceDetection::~FaceDetection() {
}

Rect FaceDetection::detectFace(Mat img) {
	vector<Rect> faces;
	faceCascade.detectMultiScale( img, faces, 1.1, 2, 0|CV_HAAR_SCALE_IMAGE, Size(30, 30) );
}
