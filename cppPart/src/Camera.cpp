/**
*   Implementation of Camera.hpp
*/

#include<Camera.hpp>

Camera::Camera(){
	cameraHandler.open(0);
	if(!cameraHandler.isOpened()){
        return;
    }
    cameraHandler.set(CV_CAP_PROP_FRAME_WIDTH, DEFAULT_WIDTH);
    cameraHandler.set(CV_CAP_PROP_FRAME_HEIGHT, DEFAULT_HEIGHT);
    cameraHandler.set(CV_CAP_PROP_FOURCC ,CV_FOURCC('M', 'J', 'P', 'G'));
    cameraHandler.set(CV_CAP_PROP_CONVERT_RGB , false);
    cameraHandler.set(CV_CAP_PROP_FPS , 60);
}

Camera::Camera(int camera_number){
	cameraHandler.open(camera_number);
	if(!cameraHandler.isOpened()){
        return;
    }
    cameraHandler.set(CV_CAP_PROP_FRAME_WIDTH, DEFAULT_WIDTH);
    cameraHandler.set(CV_CAP_PROP_FRAME_HEIGHT, DEFAULT_HEIGHT);
}
Camera::~Camera(){

}

Mat Camera::getImage(){
	Mat img;
	if(cameraHandler.isOpened()){
		cameraHandler >> img;
	}
	return img;
}

bool Camera::isOpened(){
	return cameraHandler.isOpened();
}


void Camera::reopen(int camera_number=0){
	cameraHandler.open(camera_number);
}

void Camera::release(){
	cameraHandler.release();
}

