/**
*   Implementation of Screen.hpp
*/

#include <Screen.hpp>

Screen::Screen(){
	screenName = string("Window");
	namedWindow(screenName.c_str(), WINDOW_AUTOSIZE);
}

Screen::Screen(string name){
	screenName = name;
	namedWindow(screenName.c_str(), WINDOW_AUTOSIZE);
}

Screen::~Screen(){
}

void Screen::putImage(Mat img){
	currentFrame = img;
	if(img.empty()){
		throw NULL_IMAGE;
	}
	imshow(screenName, currentFrame);
}

string Screen::getScreenName(){
	return screenName;
}
