/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import PhotoPicker from './picker';
import {Camera} from 'react-native-vision-camera';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CameraMask from './mask';
import useCamera, {EvisaType} from '../../hooks/useCamera';
import {Images} from '../../../assets';
import Box from '../box';

type IProps = ReturnType<typeof useCamera> & {
  type: EvisaType;
  onClose: () => void;
};

export default function CameraSection(props: IProps) {
  const {
    type,
    format,
    device,
    isActive,
    cropRegion,
    permission,
    frameProcessor,
    onClose,
    onCapture,
    getViewBox,
    onSetPhoto,
    getFrameSize,
    onSwithCameraPosition,
  } = props;

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              !device || !permission ? 'rgba(0,0,0,.01)' : 'white',
          },
        ]}>
        {!device && (
          <>
            <Text style={styles.textWhite}>Camera unavailable</Text>
            <Text style={styles.textWhite}>
              Please check your device and try again
            </Text>
          </>
        )}

        {!permission && (
          <>
            <Text style={styles.textWhite}>
              Camera access required to continue
            </Text>
            <TouchableOpacity onPress={() => Linking.openSettings()}>
              <Text style={styles.textLink}>Grant permission in setting</Text>
            </TouchableOpacity>
          </>
        )}

        {device && isActive && permission && (
          <>
            <Camera
              photoQualityBalance="speed"
              style={[StyleSheet.absoluteFill]}
              device={device}
              isActive={isActive}
              photo={true}
              frameProcessor={frameProcessor}
              format={format}
              pixelFormat="yuv"
            />

            <CameraMask {...{type, cropRegion, getFrameSize, getViewBox}} />

            <TouchableOpacity style={styles.btnRemove} onPress={onClose}>
              <Image source={Images.xmark} style={{width: 25, height: 25}} />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.actions}>
        <PhotoPicker type={type} onSetPhoto={onSetPhoto} />

        {isActive && device && permission ? (
          <>
            <View style={styles.captureBtnWrapper}>
              <TouchableOpacity style={styles.captureBtn} onPress={onCapture}>
                <View style={styles.captureB} />
              </TouchableOpacity>
            </View>
            {type === 'portrait' && (
              <TouchableOpacity
                style={styles.reload}
                onPress={onSwithCameraPosition}>
                <Image source={Images.reload} style={styles.reload_icon} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Box size={10} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btnRemove: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  textWhite: {
    color: 'white',
  },
  textLink: {
    color: '#007AFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  reload_icon: {
    width: 28,
    height: 28,
  },
  reload: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.2)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureB: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 9999,
    opacity: 1,
    alignSelf: 'center',
  },
  captureBtn: {
    width: 75,
    height: 75,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
