# handlytics - Final Year Project

**Title:** Pakistan Sign Language Recognition for Word and Sentence Level Signings

**Team:**
- 2019-CE-02 (Abdul Mueez)
- 2019-CE-28 (Shaheer Mustafa)
- 2019-CE-31 (Maryam Nasir)

** Supervisor:** Dr. M. Faisal Hayat (Associate Professor at Computer Engineering Department, UET Lahore)

## Description

Sign language is a boon for people who are deaf or have hearing difficulties. It enables people to express their thoughts, feelings, and ideas in the same way that any
other language does. Due to a lack of knowledge and infrastructure for **Pakistan Sign Language** interpretation, the deaf and hard-of-hearing people in Pakistan
suffer a variety of obstacles. Most people still do not recognize or understand sign language communication, making it difficult for the deaf community to engage in
everyday life activities. In this project, a unique Pakistan Sign Language identification system for recognizing words in Pakistan Sign Language is suggested. The communication lacuna for Pakistan’s deaf and hard-of-hearing people can be bridged with the use of computer vision and deep learning model. The project’s goal is to create an easy-to-use and accurate **sign language recognition system** that has the potential to revolutionize seamless communication for Pakistan’s deaf community so that they can fully participate in daily life activities and gain access to better education and job opportunities.

This application contains a connected **Flask** server to **React** client side.

## Server

-    Make sure you have Python installed on your device.

**Step1:** After cloning the repository, change your directory to server, create and activate your environment:

**create:** `python -m venv env`

**activate:** `.\env\Scripts\activate`


**Step2:** Then install the requirements using:
`pip install -r requirements.txt`

**Step3:** Then start the server:
`python "app copy.py"`


## Client

-    Make sure you have node and npm installed on your device.

**Step1:** After cloning the repository, change your directory to client2 and install the required packages:

**install:** `npm install`


**Step2:** Then start the frontend side:
`npm start`

**Step3:** Then open the site in your browser using [http://localhost:3000](http://localhost:3000)

## Dataset 

A module was written by the team in python to collect dataset.

The dataset was collected and gathered from the students of **Innayat Foundation Academy for the Deaf (Lahore)**.

The final version of collected dataset is available at: [dataset](https://drive.google.com/drive/folders/1XnMB2FQkwz4yH2Gf_hWWjRWo8wxXNssO?usp=sharing)

## Notebook for Model Training

Google Colab was used to create, train and test the model (ConvLSTM) as colab provides free GPU which speeds up the entire trainnig process.



