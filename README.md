# Showup
This application describe about scan camera or pick photo from camera baseon portrait and passport for eVisa, ratio:
 + Passport: 85.6 / 53.98
 + Portrait: 2 / 3

Base resolution: 1080 x 1920

# Package info
Tip: sometime error difference version around package (RN universal didnt like that :>), recommend work best version below:
```bash
   + "@react-navigation/native": "^6.1.18", // useFocused()
   + "react": "18.3.1",
   + "react-native": "0.75.3",
   + "react-native-image-crop-picker": "0.41.2", // pick photo from library
   + "react-native-reanimated": "3.15.4", // worlkets, navigation required
   + "react-native-safe-area-context": "4.11.0",  // navigation required
   + "react-native-screens": "3.34.0", // navigation required
   + "react-native-svg": "15.7.1", // draw mask, frame on camera preview
   + "react-native-vision-camera": "4.5.3", // capture photo from camera
   + "react-native-worklets-core": "1.3.3", // getup performence on crop x,y image on preview camera
   + "vision-camera-cropper": "1.3.0" // crop image with camera vision
```
    
# Get started
Recommend build app on physical device 

```bash
# ios
yarn
cd ios && pod install
cd .. && yarn start --reset-cache

# android
yarn
cd android && ./gradlew clean
cd .. && yarn start --reset-cache
```

# Demo
Press to capture + crop Passport
![IMG_0671](https://github.com/user-attachments/assets/dfe3586d-9b03-4aee-a2b5-889d4f138aee)

Press to capture + crop Portrait
![IMG_0670](https://github.com/user-attachments/assets/befd69d9-60ae-4195-87b4-8df524794d5a)

Result:
![IMG_0669](https://github.com/user-attachments/assets/a1b58d3d-cba1-4095-957b-882ff6b89337)

Or option pick photo from libary
![IMG_0672](https://github.com/user-attachments/assets/7324d898-e850-4c18-bbff-94f84546b169)


