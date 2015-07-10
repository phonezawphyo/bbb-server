#include <Screen.hpp>
#include <Camera.hpp>
#include <Preprocess.hpp>
#include <FaceDetection.hpp>
#include <BeagleTracker.hpp>

static Point clicked;
static bool clicked_flag = false;

static void onMouse(int event, int x, int y, int, void*)
{

	switch (event)
	{
		case EVENT_LBUTTONUP:
			clicked_flag = true;
			clicked.x = x;
			clicked.y = y;
			break;
	}
}

int main(int argc, char **argv){
	Screen screen;
	setMouseCallback(screen.getScreenName(), onMouse, 0);
	Camera cam(0);
	FaceDetection face;
	BeagleTracker tracker;
	Mat img, processed;
	Rect2d target;
	vector<Rect> faces;
	Rect2d selected_face;
	Point center = Point(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2);
	bool tracking = false;
	bool initialized = false;
	int skipFrame = 0;
	char c = 0;
	while(c!=27){
		img = cam.getImage();
		
		if(tracking) {
			if(!initialized){
				tracker.initialTraining(img, selected_face);
				initialized = !initialized;
			}else if(skipFrame == 0){
				if(!tracker.update(img, selected_face)){
					tracking = false;
				}
				int fileX = (center.x - (selected_face.x+selected_face.width/2))/((DEFAULT_WIDTH-selected_face.width)/2)*100;
				int fileY = (center.y - (selected_face.y+selected_face.height/2))/((DEFAULT_HEIGHT-selected_face.height)/2)*100;
				cout << fileX << "," << fileY << endl;
			}
			screen.drawRectangle(img, selected_face);
		}else{
			Preprocess::preprocessImage(img,processed);
			faces = face.detectFaces(processed);
			face.drawFaces( img, faces);
			if(initialized){
				if(faces.size()>=1){
					tracking = true;
				}
			}else if(clicked_flag){
				clicked_flag = false;
				for(int i=0; i<(int)faces.size(); i++){
					if(	(clicked.x > faces[i].x) &&
						(clicked.y > faces[i].y) &&
						(clicked.x <= faces[i].x+faces[i].width) &&
						(clicked.y <= faces[i].y+faces[i].height)) {
					
						selected_face = Rect2d(faces[i].x,faces[i].y,faces[i].width,faces[i].height);
						tracking = true;
						break;
					}
				} 
			}
		}
		skipFrame = (skipFrame+1)%10;
		screen.putImage(img);
		c = waitKey(10);	
	}
}
