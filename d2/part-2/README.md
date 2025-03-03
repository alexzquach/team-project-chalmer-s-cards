# Chalmers Vision - Team 700 IQ

## Credits
**Credits from group 1:**  [this blog post from pysource](https://pysource.com/2019/07/08/yolo-real-time-detection-on-cpu/), [this blog post from pyimagesearch](https://www.pyimagesearch.com/2018/08/13/opencv-people-counter/) 


**Credits from group 2**:  
Credit to medium user, https://medium.com/@madhawavidanapathirana for providing an extremely intuitive explanation to object detection.
Python Skeleton provided by : https://medium.com/@madhawavidanapathirana/real-time-human-detection-in-computer-vision-part-2-c7eda27115c6
Tensorflow Model provided by : https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md#coco-trained-models-coco-models

## Description 
* Our application is a people counter that counts the number of people coming in and out of a shelter using a camera and a custom vision model that detects / tracks human bodies.  Its value from an end-user's perspective is it allows for a live update to the number of people inside a homeless shelter without the requirement of someone being there to physically count people coming in and out.  It automates the process of counting people coming in and out of homeless shelters.
* The problem we are trying to solve with this application is making sure homeless people in the city have somewhere to sleep on a cold day.  Each shelter has a fire occupancy count and when that count is hit, the shelter must refer the person to another shelter that has space.  The current system in place is very slow at keeping the count updated and accurate. Sometimes, shelters might refer a person to another shelter that is already full.  With our application, we want to make sure that each shelter has a live, quick and accurate count of the number of people in the shelter, so if needed, each shelther can refer a person to a shelter that actually has room for them.  This ensures everyone will have a place to sleep.
 * The only context required to understand why the application solves this problem is knowing how shelter occupancy works, how the shelter referral system works and how slow the current system in place is, all at a very top level. (Only need to know basics of each)

## Key Features
* The key feature of our application that the user can access is the live people counter based on the camera feed / video feed.  The counter uses a model that counts the number of people walking in or out based on if they crossed a line drawn on screen by the model.  The user can view this live counter and the video / camera feed on their personal computer by setting up the program on their computer.
* This is the only feature of our product so far as requested by the partner.  Using the feature consists of running the appropriate python script, and having someone walk in front of the camera or by feeding it a video.  The applicaiton then counts the amount of people coming in and out and shows updates on the output video stream (live and saved).

## Instructions
#### Specific instructions for the groups: 
* For group1: [link to group1 readme](https://github.com/csc301-fall-2019/team-project-chalmer-s-cards/blob/master/d2/part-2/group-1-humancounter/README.md)
* For group 2: [link to group2 readme](https://github.com/csc301-fall-2019/team-project-chalmer-s-cards/blob/yolo/d2/part-2/Group%202%20Tensorflow%20%20Model/README.md) (This is the working product demoed to our nonprofit partner)


* At the moment, to access the application as an end-user, all the end-user needs is access to the github page where the model is located.  The end-user then needs to download the repo and run the python scripts belonging to each individual model (in a virtual python environment) to get the model up and running.  This will probably require some setup from our team as it does get quite technical but after the model is set up, all the user has to do is simply run the scripts each time they want to have the live counter running.  They then can simply point the camera to the area they want to watch, and it should count people.
* Since our product is not the "typical application", the user does not need any "pre-created" accounts other than a possible github account so they have access to our repo where the models are located.
* To use the feature of counting people above, the end-user simply needs to install the dependencies and run the python script on their machine, following the specific instrcutions in the README files from above ([group1](https://github.com/csc301-fall-2019/team-project-chalmer-s-cards/blob/master/d2/part-2/group-1-humancounter/README.md), [group2](https://github.com/csc301-fall-2019/team-project-chalmer-s-cards/blob/yolo/d2/part-2/Group%202%20Tensorflow%20%20Model/README.md)), and point the camera/webcam (if they are using one) in the direction where people will be coming in and out.  The model will then simply update a counter and it will be displayed to the end-user.  The end-user seeing a live update of a people counter on screen is the end-user "using" our application.


