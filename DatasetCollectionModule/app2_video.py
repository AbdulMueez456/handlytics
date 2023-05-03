#----------------------------------------------------------------------------IMPORTS----------------------------------------------------------
import cv2 as cv
import mediapipe as mp
import numpy as np
import math

#----------------------------------------------------------------------------------------------------------------------------------------------

capture=cv.VideoCapture(0)                                     
mpHands=mp.solutions.hands                                     
hands=mpHands.Hands()                                          
mpDraw=mp.solutions.drawing_utils                              
mp_drawing_styles = mp.solutions.drawing_styles               
avg_hand_y=400                                                 
avg_hand_x=400
i=1 
j=1
videoWriter=None
                                                           
while True:                                                                       
    isuccess,frame=capture.read()                              
    h,w,c=frame.shape                                          
    mask = np.zeros(frame.shape[:2], dtype="uint8")            
    frame = cv.flip(frame, 1)                                  
    k=cv.waitKey(1)
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
    
    cv.imshow("Frame",frame)
    cv.imshow("Mask",thresh)
    # cv.imshow("Gray",gray)
    
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
        if videoWriter:
            videoWriter.write(cropped_image)
            print(f"Frame={j} Recorded.")
        j+=1

    if k== ord('s'):
            if videoWriter:
                print("Error: Press 'R' to stop previous recording!!! Then hit 'S' again!!!!")
            else:
                videoWriter = cv.VideoWriter(f'{i}.avi',cv.VideoWriter_fourcc(*'MJPG'),10,(400,400),False)
                print("Recording Started: Bring hands in front of the camera!")

    elif k== ord('r'):
            if videoWriter:
                videoWriter=None
                i+=1
                j=1
                print("You can take next video for same sign! Hurrayyyyyy! Press 'S' to start recording")
            else:
                print("Recording has not started yet. Press 'S' to start recording!!!")

    elif k== ord('q'): 
            if videoWriter:
                videoWriter.release()
            break

capture.release()
cv.destroyAllWindows()
