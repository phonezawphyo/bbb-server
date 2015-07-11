#include <Screen.hpp>
#include <Camera.hpp>
#include <Preprocess.hpp>
#include <FaceDetection.hpp>
#include <fstream>

#define WITH_SCREEN

int main(int argc, char **argv){
	#ifdef WITH_SCREEN
	Screen screen;
	#endif
	Camera cam(1);
	FaceDetection face;
	Mat img, processed;
	Rect2d target;
	vector<Rect> faces;
	Rect2d selected_face;
	Point center = Point(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2);
	fstream fs;
	char c = 0;
	while(c!=27){
		img = cam.getImage();
		

		int fileX = (center.x - (selected_face.x+selected_face.width/2))/((DEFAULT_WIDTH-selected_face.width)/2)*70;
		int fileY = -(center.y - (selected_face.y+selected_face.height/2))/((DEFAULT_HEIGHT-selected_face.height)/2)*70;
		fileX = ((abs(fileX)<20)||(selected_face.width>DEFAULT_HEIGHT*0.40))?0:fileX;
		fileY = (abs(fileY)<20||(selected_face.height>DEFAULT_HEIGHT*0.40))?0:fileY;
		fs.open("/usr/eye", fstream::out);
		fs << fileX << "," << fileY;
		cout << fileX << "," << fileY << endl;
		fs.close();
		#ifdef WITH_SCREEN
		screen.drawRectangle(img, selected_face);
		#endif
		
		Preprocess::preprocessImage(img,processed);
		faces = face.detectFaces(processed);
		#ifdef WITH_SCREEN
		face.drawFaces( img, faces);
		#endif
		if(faces.size()>0){
			int i = rand()%(int)faces.size();
			selected_face = Rect2d(faces[i].x,faces[i].y,faces[i].width,faces[i].height);
		}else{
			fs << "0,0";
		}
			 
		
		#ifdef WITH_SCREEN
		screen.putImage(img);
		c = waitKey(10);
		#endif	
	}
}
