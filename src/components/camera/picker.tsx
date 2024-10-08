import * as React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  EvisaType,
  passportAspectRatio,
  portraitRatio,
} from '../../hooks/useCamera';
import {Images} from '../../../assets';

const windowWidth = Dimensions.get('window').width;

type Iprops = {
  type: EvisaType;
  onSetPhoto: (photo: string) => void;
};

export default function PhotoPicker({onSetPhoto, type}: Iprops) {
  const onImagePicker = () => {
    const height =
      type === 'portrait'
        ? windowWidth / portraitRatio
        : windowWidth / passportAspectRatio;

    ImageCropPicker.openPicker({
      width: windowWidth,
      height: height,
      cropping: true,
      freeStyleCropEnabled: false,
      mediaType: 'photo',
      showCropFrame: true,
    })
      .then(image => {
        console.log('Picker: ', image?.path);

        onSetPhoto(image?.path ?? '');
      })
      .catch(error => {
        if (error?.message?.includes('permission')) {
          Alert.alert(
            'Photos Access Needed',
            'Allow photos access in Settings to open your gallery?',
            [
              {
                text: 'Cancel',
                style: 'destructive',
              },
              {
                text: 'Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
            {cancelable: true},
          );
        }
      });
  };

  return (
    <TouchableOpacity onPress={onImagePicker} style={styles.selectImg}>
      <Image source={Images.photo} style={styles.logo} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 45,
    height: 45,
  },
  colorWhite: {
    color: 'white',
  },
  selectImg: {
    alignItems: 'center',
    gap: 5,
    position: 'relative',
    zIndex: 1,
  },
});
