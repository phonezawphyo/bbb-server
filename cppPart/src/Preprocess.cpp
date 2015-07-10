#include <Preprocess.hpp>

void Preprocess::preprocessImage(Mat src, Mat& dst) {
	cvtColor( src, dst, COLOR_BGR2GRAY );
	equalizeHist( dst, dst );
}
