#ifndef BEAGLETRACKER_HPP
#define BEAGLETRACKER_HPP

#include <General.hpp>
#include <opencv2/tracking.hpp>


class BeagleTracker {
public:
	BeagleTracker();
	~BeagleTracker();
	void initialTraining(Mat img, Rect2d bounderies);
	void update(Mat img, Rect2d& bounderies);
private:
	Ptr<Tracker> tracker;
};

#endif
