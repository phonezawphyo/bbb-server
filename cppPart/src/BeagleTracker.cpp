#include <BeagleTracker.hpp>

BeagleTracker::BeagleTracker(){
	tracker = Tracker::create("TLD");
	if (tracker == NULL)
	{
		cout << "ERROR WHEN INITIALIZING THE TRACKER\n";
	}
}

BeagleTracker::~BeagleTracker(){
}

void BeagleTracker::initialTraining(Mat img, Rect2d bounderies){
	if(!tracker->init(img, bounderies)){
		cout << "COULD NOT DO THE INITIAL TRAINING\n";
	}
}

bool BeagleTracker::update(Mat img, Rect2d& bounderies){
	return tracker->update(img, bounderies);
}


