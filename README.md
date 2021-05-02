## Inspiration

Viruses and germs such as Covid-19 and the Flu pose a major health risk to humans especially in public places such as airports, hotels, malls, offices and parks alike where viruses can spread. Current cleaning standards follow an incredibly inefficient and ineffective systematic timing method. Publicly used objects go through periods of unexpected high usage without being cleaned, or cleaned completely without a single use and need to do so. When overcleaning, time, resources, and energy is wasted and the cleaning personnel have to walk extended lengths across the malls, or travel from park to park, sanitizing items that may have not been used at all.
 
## What it does

SanitizeMe is a live web application through any browser that uses a web camera to track exactly how often an object has been touched in real time. It can detect and track nearly all commonly used objects such as benches, chairs, doors, light switches and others. sanitizeMe calculates interaction frequencies using an object detection algorithm, and that highlights minimally touched objects in green, and highly touched objects in red. The user can also add and remove various items in the frame that they want or don’t want tracked. Finally, there is a sanitize button, which resets the counter and highlights all objects to green again. This data is then stored in the firebase database, showing when each item was cleaned. 

## How we built it

We had to use an image processing and recognition library in order for the app to recognize commonly touched. However, since we wanted to make sanitizeMe as accessible as possible (only requiring a web/security camera and a computer), we decided to go with TensorFlow.js as the image detection library. This allows it to run completely in the browser, making it lightweight and accessible. Additionally, we had to create our own data-model, as the pre-made image models could not recognize objects like switches and doorknobs. Once these two things were in place, we implemented our touch detection algorithm, implemented firebase for log tracking, and developed an accessible UI using html, css and javascript.
 
## Challenges we ran into

There were several problems we ran overcome while building this project. For most of us, we never had much experience with image detection, machine learning and tensorflow. However, we were quick to learn. Additionally, we had to create our own machine learning model in order to detect objects in the frame, as the pre built models did not have the ability to recognize the objects we wanted. Training the model was a long task. Finally, we had to play around with the touch detection algorithm, as we wanted to avoid simple motion detection, and rather implement a smarter and more accurate algorithm, which we were able to achieve. 

## Accomplishments that we are proud of

We are really proud that this project works as we intended it to and that it is released into production via a live web app. Tracking objects in real time using machine learning and object detection in this application can truly help many businesses and public spaces for dealing with Covid-19 and also other viruses. We had some doubts early on if this was even possible, but slowly but surely we made progress and iterated until we got the prototype working beautifully.

## What we learned

There are several things we learned during this weekend at RU hacks. Firstly, we learned how to use tensorflow to detect images and process images. We also learnt how to create a custom image dataset and train the model so that tensorflow could recognize the items we wanted it to.

## What's next for sanitizeMe
Since we really believe in our product, and think that if this was actually implemented in public spaces the spread of germs and viruses, and especially COVID, could be reduced. We will be contacting some local businesses in the future and asking if they would like to try out product out, and gauge their feedback in order to improve the product further. We will also be expanding our model, so that more items can be recognized. 

We also are looking into experimenting with different hardware that was unfortunately unavailable to us at the moment. One of these technologies is known as LiDAR and can be used to detect how far away an object is from a given point. Using this, more accurate detections for actual contact can be made further improving our technology. It is also worth mentioning that LiDAR is included in the iPad Pro’s camera ;).
