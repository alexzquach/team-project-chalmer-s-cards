## Credits 
[this amazing blog from pysource](https://pysource.com/2019/07/08/yolo-real-time-detection-on-cpu/) . 
[this amazing blog from pyimagesearch](https://www.pyimagesearch.com/2018/08/13/opencv-people-counter/) . 


[example tensorflow usage from medium user @@madhawavidanapathirana](https://medium.com/@madhawavidanapathirana/real-time-human-detection-in-computer-vision-part-2-c7eda27115c6) . 


[pretrained models provided by this:](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md#coco-trained-models-coco-models)


## Description
Our application: Our application is a detects and tracks humans from a live or recorded video feed, and keeps track of a counter for the number of times people enter and leave a space.  From an end-user's perspective, our application will be used for counting the number of people coming in and out of a homeless shelter.  This information can then be used to keep track of the occupancy of a shelter by taking the difference of those two figures.  This will be used to ensure that the number of people in a homeless shelter do not go over the fire occupancy limit.

Context: Part of a homeless shelters requirements is to always keep track of the occupancy of the building to keep the number of people within fire code specifications. When a shelter reaches full capacity, clients who unfortunately seek refuge in these shelters need to be deferred to another which is the problem we are trying to solve with this project.  This project looks to aid the shelter referral process by providing a simple solution; a counter that streamlines the process of counting the flow of people in and out of a building. This information is then readily available to other shelters so clients can be referred to shelters with vacancy quickly.  The objective of this project to ensure everyone has a hot meal and a place to sleep on a cold night.

Value: Currently, there is a system in place that does keep track of the occupancy of homeless shelters, but it is insanely slow and inaccurate.  The aim of our application is to improve upon this system and ensure that occupancy counts are accurate, and real-time, as to ensure that everyone is referred quickly to a free shelter.

## Key Features
***Highly parametrized***  
This command-line software has parametrized options:  
object detection framework (OpenCV and Tensorflow)  
pre-trained model and prototxt  
input source: laptop webcam, Real-Time Streaming Protocol and video file,  
output file   
confidece treshold for detection  
skip-frame for detection frequency  
overlay display: on/off.  

***Support of Real-Time Streaming Protocol***  
Our software supports an RTSP stream produced by an IP camera falshed with DaFang Hacks. This allows multiple instances to run and process from the same video stream at the same time; since the detection frameworks are parametrized, these running instances can run different frameworks. For example, this enables clients to have multiple machines monitoring the same homeless shelter.   

Depending on the feature of the IP camera, the support of RTSP allows clients to process video streams produced by different configurations of the IP camera. For example, client can configure their IP camera to produce infrared video streams and process it with our software. 

***Support of video file input***   
When IP camera video streams are not available, which could very likely be the case in many homeless shelters, our software can take a video file (.MOV, .mp4 or .avi) as its input and process as usual. This can also provide valuable insights by running on footage generated prior to the installation of our software to study the effectiveness and progress. 

***Customizable models and detection frameworks***  
Our software don't depend on a single pre-trained model. Client can select different models (caffemodel for OpenCV framework and protobuf for Tensorflow) and have our software utilize.  
It also supports two object detection frameworks: client can choose between using OpenCV to perform a forward pass on the model and using Tensorflow. This gives client better flexibility when access to appropriate models is limited.  

***Performance***  
With the default models our software uses, it is lightweight and fast. MobileNet is designed to be run on resource-limited mobile devices. In our expeirence, when processing RTSP streams, our model yields 29-31+ FPS (which is very close to being sufficient for real-time processing) when using the OpenCV for detection and 15+ FPS when using Tensorflow for detection. 

## Demo
MobileNet tracking test: note that this is not an ideal environment.  
I'm surprised that the program didn't pick up my reflections.

![demo](cvtest.gif)  


Comparison between tensorflow framework and Open CV with mobilenet framework.  

Tensorflow mobilenet:  

![tensorflow](tensorflow.gif)  

MobileNet:  

![openCV](opencv.gif)

## Instructions (assuming python 3 is installed)
clone the repo:
`git clone https://github.com/csc301-fall-2019/team-project-chalmer-s-cards.git`
create and activate your virtual environment:
```
cd team-project-chalmer-s-cards
python3 -m venv .venv
source ./.venv/bin/activate
```

go the group 2 directory:
```cd team-project-chalmer-s-cards/d3/occupancyCounter```

Download dependencies:  
```pip install -requirement requirement``` or alternatively ```pip install tensorflow dlib imutils numpy opencv-python scipy```


run `people_counter.py` with the required arguments (this step will open the default webcam on your laptop. Default object detection framework is with OpenCV. OpenCV requires a prototxt.):
```
python3 people_counter.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt \
--model mobilenet_ssd/MobileNetSSD_deploy.caffemodel
```

To save the output video, add the --output flag:    
```
python3 people_counter.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt \
--model mobilenet_ssd/MobileNetSSD_deploy.caffemodel \
--output <your_output_video.avi>
```


To use a video file instead of your webcam, add the `--input` flag, it supports .MOV, .mp4 and .avi:
```
python3 people_counter.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt --model \
mobilenet_ssd/MobileNetSSD_deploy.caffemodel \
--input <you_input_video.avi> --output <your_output_video.avi>
```

To use the tensorflow detection framework, add the --detectfw flag:
```
python3 people_counter.py --model tfmobilenet/frozen_inference_graph.pb \
--detectfw tensorflow
```

Other optional flags:  
`--confidence` or `-c`: default=0.5, float, minimum confidence level for detection  

`--skip-frames` or `-s`: default=30, int, number of frames to skip between detections. The program will only detect at frame numers that are multiples of `skip-frames`.
`--hieedisplay` or `-hd`: default action=store_true. Normally displays overlay for trackers. If you add this flag(with no arguments) there will be no overlay.


## Program Workflow
This program detects and tracks human from a live or recorded video feed, and keeps track of a counter for the number of times people enter and leave a space. 

The program has 3 states.
***Wating***
When there are no existing objects and not detecting, the program is simply in the waiting state, not doing computations. 
  
***Detecting:***
When the frame number is a multiple of the `skip-frames` parameters, the program detects human only, using MobileNet with OpenCV or Tensorflow depending on command line input.

***Tracking:***
When there are existing obejcts, the program uses centroids for tracking. After detecting the object and determining a bounding box, it finds the centroid of the bounding box and uses the coordinates of it for tracking. We are currently using the simple centroid tracking module implemented by the [pyimagesearch blog](www.pyimagesearch.com).  

***Algorithm for centroid tracking:***
After determining bounding boxes, it calculates the centroid for each box. It then calculates the Euclidean distance between every pair of centroids. The assumption is that pairs with the smallest Euclidean distances must be the same obejct. For every existing centroid, it assigns its object ID to its 1 nearest neighbor. If there is any centroid that is 1) not an existing object, and 2) not a 1 nearest neighbor to any existing centroid, then it will be registered as a new object and added to the list of existing centroids. 

![centroid tracking gif](https://s3-us-west-2.amazonaws.com/static.pyimagesearch.com/people-counting/opencv_people_counter_centroid_tracking.gif) ([credit](https://www.pyimagesearch.com/2018/08/13/opencv-people-counter/))

It works fairly well when the data is not noisy. For example, simple lightning condition (no shadow) and movements (less people, straighforward movements). 


It uses a combination of walking direction and position to determine if a centroid has entered or left a space. Essentially, when the direction is toward the exit of a space and the position of the centroid is on the outside of the exit, then the centroid is considered as "left". Similarly, the the direction is the opposite of the exit of a space and the position of the centroid is on the inside of the exit, then the cnetroid is considered as "left". 

To save computation and achieve a higher processing FPS (frames per second), it counts every object once, when they are in frame. It can made the program more prone to errors when the movements get complicated. For example, when a person corsses the exit but re-enters while still in frame, the program will not capture the re-enter as it has counted the person. 

## OpenCV - just face recognition
Before we created people-counting capabilities, we tried using face recognition package. But we realized that it was unecessarily computationally expensive to do people-counting. We include in in d2 as we do not need it for people-counting at the moment, but we may use it in the future. The product and the readme are included in the folder https://github.com/csc301-fall-2019/team-project-chalmer-s-cards/tree/master/d2/part-2/group-1-humancounter/pureOpenCV. 

## LICENSE - MIT License
Copyright 2019 Chalmers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, 
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
