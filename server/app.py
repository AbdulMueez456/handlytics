from subprocess import STDOUT, check_call
import os
check_call(['apt-get', 'update'], stdout=open(os.devnull,'wb'), stderr=STDOUT)
check_call(['apt-get', 'install', '-y', 'libgl1'], stdout=open(os.devnull,'wb'), stderr=STDOUT)
check_call(['apt-get', 'install', '-y', 'libglib2.0-0'], stdout=open(os.devnull,'wb'), stderr=STDOUT)
check_call(['apt-get', 'update'], stdout=open(os.devnull,'wb'), stderr=STDOUT)

from flask import Flask, Response, request,jsonify, make_response
from flask_cors import CORS, cross_origin
import cv2 as cv 
import mediapipe as mp
import numpy as np
import tensorflow as tf
import base64
import json

avg_hand_y=400                                                 
avg_hand_x=400
CLASSES_LIST = ['ہیلو', 'آپ', 'کیسے ہیں', 'نہیں', 'سب', 'میں', 'ہوں', 'طالب علم', 'انجينيئرنگ', 'کا', 'کمپیوٹر']
model = tf.keras.models.load_model('convlstm_model___Date_Time_2023_03_10__15_34_59___Loss_0.062035202980041504___Accuracy_0.989130437374115.h5')
app=Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# cors = CORS(app,resources={r'/predict':{'origins':'https://handlytics-moizeafco126-gmailcom.vercel.app','methods':["OPTIONS","GET","POST"]}})

   
   
    

            
            



@app.route('/predict',methods=['POST','OPTIONS'])
@cross_origin(origins = '*', 
methods = ['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT'], 
allow_headers ='*', 
supports_credentials = False, 
max_age = 86400, 
send_wildcard = True, 
always_send = True, 
automatic_options = False)
def predict():
    if request.method=="OPTIONS":
        print("ma idhr aya")
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        response.headers.add('Access-Control-Max-Age', "86400")
        response.status="200 OK"
        response.status_code=200
        return json.dumps(response)
    elif request.method=="POST":
        frames = request.json['frames']
        # decoded_frames=[]
        # for f in frames:
        #     image_bytes = base64.b64decode(f.split(',')[1])
        #     image_array = np.frombuffer(image_bytes, np.uint8)
        #     image = cv.imdecode(image_array, cv.IMREAD_COLOR)
        #     decoded_frames.append(image)


        # decoded_frames = [bytes.fromhex(f) for f in frames]
        
        queue=[]
        mpHands=mp.solutions.hands                                     
        hands=mpHands.Hands()                                          
        mpDraw=mp.solutions.drawing_utils                              
        mp_drawing_styles = mp.solutions.drawing_styles 
        predicted_class_name = ''
        for frame in frames:
            image_bytes = base64.b64decode(frame)
            image_array = np.frombuffer(image_bytes, np.uint8)
            frame = cv.imdecode(image_array, cv.IMREAD_COLOR)
            h,w,c=frame.shape      
            mask = np.zeros(frame.shape[:2], dtype="uint8")

            x_max = 0
            y_max = 0
            x_min = w
            y_min = h
            imgRGB=cv.cvtColor(frame,cv.COLOR_BGR2RGB)
            results=hands.process(imgRGB)

            if results.multi_hand_landmarks:
                for handLms in results.multi_hand_landmarks:
                    for id,lm in enumerate(handLms.landmark):
                        cx,cy=int(lm.x*w),int(lm.y*h)
                        if cx > x_max:
                            x_max = cx
                        if cx < x_min:
                            x_min = cx
                        if cy > y_max:
                            y_max = cy
                        if cy < y_min:
                            y_min = cy
                    cv.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 1)
                    cv.rectangle(mask, (x_min, y_min), (x_max, y_max), 255, -1)
                    mpDraw.draw_landmarks(frame,handLms,mpHands.HAND_CONNECTIONS)

            masked = cv.bitwise_and(frame, frame, mask=mask)                    
            gray = cv.cvtColor(masked, cv.COLOR_BGR2GRAY)  
            ret,thresh=cv.threshold(gray,215,255,cv.THRESH_BINARY)  #182
            ret, buffer = cv.imencode('.jpg', thresh)
            frame = buffer.tobytes()
        
            cropped_image=thresh[y_min:y_max,x_min:x_max]
            if(cropped_image.size>0):
                if cropped_image.shape[0]<370 or cropped_image.shape[1]<370:
                    if cropped_image.shape[0]<370 and cropped_image.shape[1]<370:
                        pass
                    elif cropped_image.shape[0]<370:
                        cropped_image = cv.resize(cropped_image,(370,cropped_image.shape[0]), interpolation= cv.INTER_LINEAR)
                    elif cropped_image.shape[1]<370:
                        cropped_image = cv.resize(cropped_image,(cropped_image.shape[0],370), interpolation= cv.INTER_LINEAR)

                else:
                    cropped_image = cv.resize(cropped_image,(370,370), interpolation= cv.INTER_LINEAR)
                cropped_y,cropped_x=cropped_image.shape
                padding_y=(avg_hand_y-cropped_y)//2
                padding_x=(avg_hand_x-cropped_x)//2 
                cropped_image=cv.copyMakeBorder(cropped_image,padding_y,(avg_hand_y-cropped_y)-padding_y,padding_x,(avg_hand_x-cropped_x)-padding_x,cv.BORDER_CONSTANT,None,value=1)
                resized_frame = cv.resize(cropped_image, (64, 64))
                queue.append(resized_frame)

        if len(queue) == 30:
            predicted_labels_probabilities = model.predict(np.expand_dims(queue, axis = 0))[0]
            predicted_label = np.argmax(predicted_labels_probabilities)
            predicted_class_name = CLASSES_LIST[predicted_label]
            print(predicted_class_name)

        response=jsonify({'label': predicted_class_name})
        response.status_code=200
        response.status="OK"
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response,200

# @app.before_request
# def basic_authentication():
    
#     request.headers.add('Access-Control-Allow-Origin', 'https://handlytics-moizeafco126-gmailcom.vercel.app/')
#     request.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     request.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#     request.headers.add('Access-Control-Allow-Credentials', 'true')
#     return Response()

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', 'https://handlytics-moizeafco126-gmailcom.vercel.app')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   response.headers.add('Access-Control-Allow-Credentials', 'true')
#   return response
# @app.route('/')
# def hello():
#     return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')




if __name__=="__main__":
    app.run(debug=True)

