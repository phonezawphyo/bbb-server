#ifndef PREPROCESS_HPP
#define PREPROCESS_HPP

#include <General.hpp>
#include <opencv2/imgproc/imgproc.hpp>

class Preprocess {
public:
	static void preprocessImage(Mat src, Mat& dst);
};

#endif
