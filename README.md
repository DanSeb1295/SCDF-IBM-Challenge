# <Submission name>
[![Website](https://img.shields.io/badge/View-Website-blue)](https://scdf-ibm-challenge.herokuapp.com/)

<img src="https://github.com/erntye/SCDF-IBM-Helper/blob/master/SCDF%20banner%20large.png">

Team BearBear's submission for the SCDFxIBM Lifesavers' Innovation Challenge: Call for Code 2020

### Our Team
<p align="center">
    <img src="https://github.com/erntye/SCDF-IBM-Helper/blob/master/Our%20Team.png" width="700">
</p>

## Contents

1. [Live App](#live-app)
1. [Short Description](#short-description)
1. [The Architecture](#the-architecture)
1. [Demo video](#demo-video)
1. [Long Description](#long-description)
1. [Project Roadmap](#project-roadmap)
1. [Local Installation](#local-installation)
1. [Built With](#built-with)
1. [Acknowledgements](#acknowledgements)

## Live App

You can experience the dashboard for yourselves at [scdf-ibm-challenge.herokuapp.com](https://scdf-ibm-challenge.herokuapp.com/)

## Short Description

SCDF receives 4000 fire incidents per year, with vegetation fires accounting for 50% of all non-building fires in Singapore, adding on to the already heavy manpower demands for SCDF firefighters and other fire prevention services. 

Our solution creates an end-to-end vegetation fire prevention and detection system based on 3 aspects:

1. Leveraging Smart Lampposts sensors in Smart Districts to identify fire hazards and fire incidents 
2. Streamlining resources by having Red Rhino Robots (3R) reacting to low priority cases and escalating high priority cases to personnel
3. Creating synergy and information sharing between SCDF and other fire prevention services 

## The Architecture

![System Architecture](https://github.com/erntye/SCDF-IBM-Helper/blob/master/System%20Architecture.png)

### Fire Analytics Model
1. Smart Lampposts and sensors collect video and environmental data
2. IBM Watson Visual Recognition detects fires and fire hazards using machine learning
3. Regression model computes an overall fire hazard risk score
4. Results are saved in an IBM DB2 instance

### Fire Management Dashboard
1. Heatmap summarizes the fire hazard risk scores across Singapore and allows personnel to view data at any sensor location
2. In the case of fire, the program automatically routes an available 3R from the nearest remote docking hub
3. System can also make recommendations on optimal 3R distributions across docking hubs
4. System links to a centralized Fire Hazard Monitoring platform to allow multiple agencies to coordinate action

## Demo Video

[![Watch the video](https://github.com/erntye/SCDF-IBM-Helper/blob/master/Youtube%20Video%20Cover%202.png)](https://youtu.be/rkyPSs_EIrw)


## Long Description
### The Problem
According to the Fire, Ambulance and Enforcement Statistics, the SCDF recorded 3871 fire incidents in 2017. Out of these incidents, vegetation fires account for 368 cases, making up approximately 10% of all fires in Singapore. This adds on to the already heavy manpower demands for firefighting from the SCDF and fire prevention from agencies such as the Wildfire Task Force committee. However, with the advent of Smart Infrastructure and the proliferation of IoT sensors, our group has come up with a solution that could potentially nip many vegetation fire hazards in the bud.

### Improvements in Smart Infrastructure
GovTech has recently launched the Smart Nation Sensor Platform (SNSP), a nationwide sensor network that aims to collect and analyze data about our urban environment. Under the SNSP, GovTech has begun trialling the Lamppost as a Platform (LaaP) project, which involves fitting lampposts with a network of wireless sensors and cameras to support urban planning and operations. These lampposts are able to detect and monitor various environmental variables such as the humidity, rainfall and temperature of its surroundings, as well as capture real-time video input to analyze human traffic. 

While these are undoubtedly impactful use cases, our group realized that these IoT Lampposts provide a huge untapped potential for vegetation fire prevention. 

### Proposed Solution
Our solution involves creating an end-to-end vegetation fire prevention and detection system based on 3 aspects:

1. Leveraging Smart Lampposts sensors in Smart Districts to identify fire hazards and fire incidents 
2. Streamlining resources by having Red Rhino Robots (3R) reacting to low priority cases and escalating high priority cases to personnel
3. Creating synergy and information sharing between SCDF and other fire prevention services 

All these functions are integrated together into a single system and represented by a convenient and intuitive dashboard for the end users of the SCDF and other partner fire prevention agencies like the Wildfire Task Force Committee or NParks.

![Dashboard Home](https://github.com/erntye/SCDF-IBM-Helper/blob/master/Dashboard%20Home.jpg)

#### Fire Prevention
To detect fire hazards and prevent them from escalating into actual fire incidents, we developed a video analytics model based on IBM Watson Visual Recognition Service to identify common causes of fires such as leaf litter or cigarette buds from the live video feeds of the cameras on the Smart Lampposts.

<p align="center">
    <img src="https://github.com/erntye/SCDF-IBM-Helper/blob/master/Leaf%20Litter.png" width="700">
</p>

Then, we pass in this data together with other relevant environmental sensor data from the Lampposts such as temperature, humidity, and rainfall into a regression model to generate an overall risk score. If the risk score is above a certain threshold, these areas will be identified as fire hazards and highlighted on the dashboard. 

These fire hazards will also be logged and displayed on another portal that Fire Prevention Services can access. This will be elaborated on later below.


#### Fire Detection 
The video analytics model is also able to detect actual fires from the video feeds. 

<p align="center">
    <img src="https://github.com/erntye/SCDF-IBM-Helper/blob/master/Fire.png" width="500">
</p>

When a fire is detected from any lamp post sensor, the dashboard immediately informs the SCDF user and automatically schedules a 3R device to attend to the fire while the firefighters are prepared to assess the situation.

#### 3Rs Firefighting Devices

The Red Rhino Robot (3R) is the SCDFs' cutting-edge autonomous firefighting devices. The 3Rs provide a huge opportunity for the SCDF to alleviate pressing manpower constraints by handling lower priority firefighting incidents.

<p align="center">
    <img src="https://github.com/erntye/SCDF-IBM-Helper/blob/master/Red%20rhino%20robot.png" width="400">
</p>

To allow the 3Rs to respond rapidly to fire incidents, Docking Hubs can be built across the Smart District. These Docking Hubs provide a secure location to store 3R devices when they are on standby and allows for the 3Rs to recharge battery (perhaps through wireless charging) and refill their water tanks.

<p align="center">
    <img src="https://github.com/erntye/SCDF-IBM-Helper/blob/master/3R%20Docking%20Hub.jpg" width="700">
</p>

If the 3R is able to extinguish the fire, the firefighters may not need to be deployed, allowing them to be on standby to handle more serious fire emergencies.

#### Efficient Resource Allocation
Being able to predict potential fire hazards, our system is also able to recommend the most efficient resource allocation, allowing SCDF to optimize their limited resources and prioritize high risk areas. The use of autonomous 3R firefighting devices to augment human firefighters has been a rising capability of the SCDF. While it is difficult to fully outsource firefighting to 3R robots in the field, it is much more feasible to utilize 3R robots in our case. Firstly, early onset vegetation fires are usually small and not immediately life threatening, and 3R robots may be able to sufficiently extinguish the fire autonomously. Secondly, in a Smart District, the network of Lampposts could serve as waypoint beacons for the 3R, significantly reducing the complexity of autonomous navigation for the robots.

![3R](https://github.com/erntye/SCDF-IBM-Helper/blob/master/3R%20Allocation.jpg)

#### Collaboration with Prevention Services
Currently, organizations such as NParks conduct patrols and inspections to identify and remedy potential fire hazards. Our solution is able to replace the need for patrols and inspections in the vegetation areas around Smart Districts by utilizing the video feed of Smart lampposts.

Upon identification of such fire hazards, our system automatically logs the hazard into a Fire Hazard Monitoring platform that multiple agencies can use. This serves as a centralized monitoring system that allows agencies to update each other on the identified fire hazards and the status of each fire hazard.

![Monitoring System](https://github.com/erntye/SCDF-IBM-Helper/blob/master/Monitoring%20System.png)

## Project Roadmap

![Roadmap](https://github.com/erntye/SCDF-IBM-Helper/blob/master/Roadmap%202.jpg)

## Local Installation

Besides using accessing the live demo website, the app can also be installed locally. These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. Git clone the repository
```
git clone https://github.com/DanSeb1295/SCDF-IBM-Challenge.git
```

### Analytics Model
1. Change Directory using
```
cd SCDF-IBM-Challenge/Analytics\ Model
```
2. Install and create [virtual environment](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)
3. Run 
```
pip install -r requirements.txt
```
4. Set .env file

    | Env Variables | Meaning                            |
    | ------------- |:----------------------------------:|
    | FRAME         | An image or a frame from the video |
    | MODE          | Either set to `train` or `predict` |
5. Run 
```
python model.py
```

### Management Dashboard

1. Install npm as described [here](https://www.npmjs.com/get-npm)

2. Install Dependencies
```
cd SCDF-IBM-Challenge/Management\ Dashboard
npm i && npm run client-install
```
3. Remove Browserlist
```
rm client/browserslist;
```
4. Run App
```
npm run dev
```
5. Open App at the URL
```
http://localhost:3000
```

## Built With

* [IBM Watson](https://www.ibm.com/sg-en/watson/products-services) - AI for Analytics Model
* [IBM DB2](https://www.ibm.com/sg-en/analytics/db2) - Relational Database Storage
* [IBM Hyper Protect Virtual Servers](https://www.ibm.com/cloud/hyper-protect-virtual-servers) - Virtual Servers for Analytics
* [React](https://reactjs.org/) - Frontend Web Framework 
* [scikit-learn](https://scikit-learn.org/stable/) - AI for Regression Model
* [npm](https://www.npmjs.com/) - Dependency Management


## Acknowledgements

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) and the [Code and Response Project Sample](https://github.com/Code-and-Response/Project-Sample)
