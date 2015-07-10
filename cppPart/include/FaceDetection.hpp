#ifndef FACEDETECTION_HPP
#define FACEDETECTION_HPP

#include <General.hpp>
#include <opencv2/objdetect/objdetect.hpp>
#include <opencv2/imgproc/imgproc.hpp>

class FaceDetection {
public:
	FaceDetection();
	~FaceDetection();
	vector<Rect> detectFaces(Mat img);
	void drawFaces(Mat& img, vector<Rect> faces);
private:
	CascadeClassifier faceCascade;
};

#endif
