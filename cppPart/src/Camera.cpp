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
