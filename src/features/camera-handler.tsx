/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../../assets';
import Box from '../components/box';
import CameraPicker, {CameraPickerRef} from '../components/camera';
import {EvisaType} from '../hooks/useCamera';

type EvisaPhoto = {
  portrait: string;
  passport: string;
};

export default function CameraHandler() {
  const cameraRef = React.useRef<CameraPickerRef | null>(null);
  const [photos, setPhotos] = React.useState<EvisaPhoto>({
    passport: '',
    portrait: '',
  });

  const onOpenCamera = (type: EvisaType) => {
    if (!!type && photos?.[type]) {
      return;
    }
    cameraRef?.current && cameraRef?.current?.open(type);
  };

  const onRemovePhoto = (type: EvisaType) => {
    setPhotos(prev => ({
      ...prev,
      [type]: '',
    }));
  };

  return (
    <>
      <CameraPicker
        ref={cameraRef}
        onUsePhoto={({photo, type}) => {
          setPhotos(prev => ({
            ...prev,
            [type]: photo,
          }));
        }}
      />
      <>
        <Text style={styles.title}>Passport photo</Text>
        <Box size={16} />
        {!photos?.passport ? (
          <TouchableOpacity
            style={styles.btnUpload}
            onPress={() => onOpenCamera('passport')}>
            <Image source={Images.upload} style={styles.icUpload} />
            <Text style={[styles.primaryColor, styles.textUpload]}>Upload</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.previewContainer}>
            <TouchableOpacity
              style={styles.btnRemove}
              onPress={() => onRemovePhoto('passport')}>
              <Image source={Images.xmark} style={{width: 25, height: 25}} />
            </TouchableOpacity>
            <Image
              source={{uri: photos.passport}}
              style={[styles.imagePreview, {aspectRatio: '1/.43'}]}
            />
          </View>
        )}

        <Box size={32} />
        <Text style={styles.title}>Portrait photo</Text>
        <Box size={16} />
        {!photos?.portrait ? (
          <TouchableOpacity
            style={styles.btnUpload}
            onPress={() => onOpenCamera('portrait')}>
            <Image source={Images.upload} style={styles.icUpload} />
            <Text style={[styles.primaryColor, styles.textUpload]}>Upload</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.previewContainer}>
            <TouchableOpacity
              style={styles.btnRemove}
              onPress={() => onRemovePhoto('portrait')}>
              <Image source={Images.xmark} style={{width: 25, height: 25}} />
            </TouchableOpacity>
            <Image
              source={{uri: photos.portrait}}
              style={[styles.imagePreview, {aspectRatio: '1/1'}]}
            />
          </View>
        )}
      </>
    </>
  );
}

const styles = StyleSheet.create({
  btnRemove: {
    position: 'absolute',
    top: -20,
    right: 0,
  },
  previewContainer: {
    position: 'relative',
    alignSelf: 'baseline',
  },
  imagePreview: {
    width: Dimensions.get('window').width - 40,
    aspectRatio: '1/0.43',
    resizeMode: 'contain',
  },
  primaryColor: {
    color: '#FF204E',
  },
  textUpload: {
    fontSize: 15,
    fontWeight: '500',
  },
  btnUpload: {
    flexDirection: 'row',
    gap: 8,
    borderColor: '#FF204E',
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'baseline',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  icUpload: {
    width: 20,
    height: 20,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  title: {
    fontWeight: '500',
  },
});
