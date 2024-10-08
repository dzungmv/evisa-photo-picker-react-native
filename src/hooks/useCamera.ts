/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {useSharedValue, Worklets} from 'react-native-worklets-core';
import * as Cropper from 'vision-camera-cropper';
import useIsForeground from './useIsForeground';
import {CropRegion} from 'vision-camera-cropper';

export const passportAspectRatio = 85.6 / 53.98;
export const portraitRatio = 2 / 3;

export type EvisaType = 'passport' | 'portrait' | '';
export type GetViewBox = () => string;
export type GetFrameSize = () => {
  width: number;
  height: number;
};

type IProps = {
  type: EvisaType | '';
  visible: boolean;
};

export default function useCamera({type, visible}: IProps) {
  const isForeground = useIsForeground();
  const isFocused = useIsFocused();
  const isActive = isForeground && isFocused;

  const [permission, setPermission] = useState(false);
  const [front, setFront] = useState(false);
  const [photo, setPhoto] = useState('');

  const device = useCameraDevice(front ? 'front' : 'back');

  const [cropRegion, setCropRegion] = useState({
    left: 10,
    top: type === 'portrait' ? 10 : 20,
    width: 80,
    height: type === 'portrait' ? 68 : 30,
  });

  const format = useCameraFormat(device, [
    {
      videoResolution: {
        width: 1920,
        height: 1080,
      },
    },
    {fps: 30},
  ]);

  const cropRegionShared = useSharedValue<CropRegion | undefined>(undefined);
  const shouldTake = useSharedValue(false);

  const onCapture = () => {
    shouldTake.value = true;
  };

  const onSetPhoto = (path: string) => {
    setPhoto(path);
  };

  const onRemovePhoto = () => {
    setPhoto('');
  };

  const adaptCropRegion = () => {
    const size = getFrameSize();
    const regionWidth = 0.8 * size.width;
    const ratio = type === 'portrait' ? portraitRatio : passportAspectRatio;
    const desiredRegionHeight = regionWidth / ratio;

    const height = Math.ceil((desiredRegionHeight / size.height) * 100);

    const region = {
      left: 10,
      width: 80,
      top: type === 'portrait' ? 10 : 20,
      height: Math.min(height, 100),
    };
    setCropRegion(region);
    cropRegionShared.value = region;
  };

  const getViewBox = () => {
    const frameSize = getFrameSize();
    const viewBox = '0 0 ' + frameSize.width + ' ' + frameSize.height;
    return viewBox;
  };

  const getFrameSize = () => {
    let size = {width: 1080, height: 1920};
    return size;
  };

  const onCapturedJS = Worklets.createRunOnJS(onSetPhoto);
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';

    if (shouldTake.value === true && cropRegionShared.value !== undefined) {
      shouldTake.value = false;

      const result = Cropper.crop(frame, {
        cropRegion: {
          ...cropRegionShared.value,
          top: cropRegionShared.value.top,
        },
        includeImageBase64: false,
        saveAsFile: true,
      });

      if (result?.path) {
        console.log('Identify: ', result?.path);

        const path =
          (Platform.OS === 'android' ? 'file://' : '') + result?.path;
        onCapturedJS(path);
      }
    }
  }, []);

  const checkCameraPermission = async () => {
    try {
      const status = await Camera.getCameraPermissionStatus();

      if (status === 'granted') {
        setPermission(true);
      } else {
        const _permission = await Camera.requestCameraPermission();
        console.log('permission camera: ', _permission);
        setPermission(_permission === 'granted');
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
      // Xử lý lỗi tại đây, ví dụ: setPermission(false);
    }
  };

  const onSwithCameraPosition = () => {
    setFront(prev => !prev);
  };

  const onClearState = useCallback(() => {
    setFront(type === 'portrait' ? true : false);
    setPhoto('');
  }, [type]);

  useEffect(() => {
    if (!type) {
      return;
    }

    adaptCropRegion();
    setFront(type === 'portrait' ?? false);
  }, [type]);

  useEffect(() => {
    checkCameraPermission();
    return () => {
      onClearState();
    };
  }, [visible]);

  return {
    format,
    photo,
    device,
    isActive,
    permission,
    cropRegion: {...(cropRegionShared.value ?? cropRegion)},
    frameProcessor,
    onCapture,
    onSetPhoto,
    getViewBox,
    getFrameSize,
    onRemovePhoto,
    onSwithCameraPosition,
  };
}
