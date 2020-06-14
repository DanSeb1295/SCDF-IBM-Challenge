# <Submission name>
[![Website](https://img.shields.io/badge/View-Website-blue)](https://scdf-ibm-challenge.herokuapp.com/)

![Banner](https://github.com/erntye/SCDF-IBM-Helper/blob/master/SCDF%20banner.png)

Our team's submission for the SCDFxIBM Lifesavers' Innovation Challenge: Call for Code 2020

### Our team
![Team](https://github.com/erntye/SCDF-IBM-Helper/blob/master/Our%20Team.png)

## Contents

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Long description](#long-description)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Running the tests](#running-the-tests)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Contributing](#contributing)
1. [Versioning](#versioning)
1. [Authors](#authors)
1. [License](#license)
1. [Acknowledgments](#acknowledgments)

## Short description

SCDF receives 4000 fire incidents per year, with vegetation fires accounting for 50% of all non-building fires in Singapore, adding on to the already heavy manpower demands for SCDF firefighters and other fire prevention services. 

Our solution creates an end-to-end vegetation fire prevention and detection system based on 3 aspects:

1. Leveraging Smart Lampposts sensors in Smart Districts to identify fire hazards and fire incidents 
2. Streamlining resources by having Red Rhino Robots (3R) reacting to low priority cases and escalating high priority cases to personnel
3. Creating synergy and information sharing between SCDF and other fire prevention services 

## The architecture

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

## Demo video

[![Watch the video](https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/IBM-interview-video-image.png)](https://youtu.be/vOgCOoy_Bx0)


## Long description
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

#### Fire Prevention
To detect fire hazards and prevent them from escalating into actual fire incidents, we developed a video analytics model based on IBM Watson Visual Recognition Service to identify common causes of fires such as leaf litter or cigarette buds from the live video feeds of the cameras on the Smart Lampposts.


Then, we pass in this data together with other relevant environmental sensor data from the Lampposts such as temperature, humidity, and rainfall into a regression model to generate an overall risk score. If the risk score is above a certain threshold, these areas will be identified as fire hazards and highlighted on the dashboard. 

These fire hazards will also be logged and displayed on another portal that Fire Prevention Services can access. This will be elaborated on later below.


#### Fire Detection 
The video analytics model is also able to detect actual fires from the video feeds. 

When a fire is detected from any lamp post sensor, the dashboard immediately informs the SCDF user and automatically schedules a 3R device to attend to the fire while the firefighters are prepared to assess the situation.

[ insert route planning picture ] 

If the 3R is able to extinguish the fire, the firefighters may not need to be deployed, allowing them to be on standby to handle more serious fire emergencies.

#### Efficient Resource Allocation
Being able to predict potential fire hazards, our system is also able to recommend the most efficient resource allocation, allowing SCDF to optimize their limited resources and prioritize high risk areas. The use of autonomous 3R firefighting devices to augment human firefighters has been a rising capability of the SCDF. While it is difficult to fully outsource firefighting to 3R robots in the field, it is much more feasible to utilize 3R robots in our case. Firstly, early onset vegetation fires are usually small and not immediately life threatening, and 3R robots may be able to sufficiently extinguish the fire autonomously. Secondly, in a Smart District, the network of  Lampposts could serve as waypoint beacons for the 3R, significantly reducing the complexity of autonomous navigation for the robots.

#### Collaboration with Prevention Services
Currently, organizations such as NParks conduct patrols and inspections to identify and remedy potential fire hazards. Our solution is able to replace the need for patrols and inspections in the vegetation areas around Smart Districts by utilizing the video feed of Smart lampposts.

Upon identification of such fire hazards, our system automatically logs the hazard into a Fire Hazard Monitoring platform that multiple agencies can use. This serves as a centralized monitoring system that allows agencies to update each other on the identified fire hazards and the status of each fire hazard.

[More detail is available here](DESCRIPTION.md)

## Project roadmap

![Roadmap](roadmap.jpg)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```bash
dnf install wget
wget http://www.example.com/install.sh
bash install.sh
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be, for example

```bash
export TOKEN="fffd0923aa667c617a62f5A_fake_token754a2ad06cc9903543f1e85"
export EMAIL="jane@example.com"
dnf install npm
node samplefile.js
Server running at http://127.0.0.1:3000/
```

And repeat

```bash
curl localhost:3000
Thanks for looking at Code-and-Response!
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why, if you were using something like `mocha` for instnance

```bash
npm install mocha --save-dev
vi test/test.js
./node_modules/mocha/bin/mocha
```

### And coding style tests

Explain what these tests test and why, if you chose `eslint` for example

```bash
npm install eslint --save-dev
npx eslint --init
npx eslint sample-file.js
```

## Live demo

You can find a running system to test at [scdf-ibm-challenge.herokuapp.com](https://scdf-ibm-challenge.herokuapp.com/)

## Built with

* [IBM Watson](https://www.ibm.com/sg-en/watson/products-services) - AI for Analytics Model
* [IBM DB2](https://cloud.ibm.com/catalog?search=cloud%20functions#search_results) - The compute platform for handing logic
* [IBM Hyper Protect Virtual Servers](https://www.ibm.com/cloud/hyper-protect-virtual-servers) - Virtual Servers for Analytics
* [React](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [npm](https://maven.apache.org/) - Dependency management

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

## License

This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
