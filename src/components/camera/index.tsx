import * as React from 'react';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';
import useCamera, {EvisaType} from '../../hooks/useCamera';
import CameraSection from './camera';
import CameraPreview from './preview';

export type CameraPickerRef = {
  open: (type: EvisaType) => void;
  close: () => void;
};

type UsePhotoCallback = {
  type: EvisaType;
  photo: string;
};

type IProps = {
  onUsePhoto: ({photo, type}: UsePhotoCallback) => void;
};

const CameraPicker = forwardRef<CameraPickerRef, IProps>(
  ({onUsePhoto}, ref) => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<EvisaType | ''>('');

    const cameraProps = useCamera({type, visible});

    const onClose = () => {
      setVisible(false);
    };

    useImperativeHandle(ref, () => ({
      open: _type => {
        setType(_type);
        setVisible(true);
      },
      close: onClose,
    }));

    return (
      <Modal visible={visible} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            {!cameraProps?.photo ? (
              <CameraSection type={type} onClose={onClose} {...cameraProps} />
            ) : (
              <CameraPreview
                type={type}
                photo={cameraProps?.photo}
                onRetake={() => {
                  cameraProps.onRemovePhoto();
                }}
                onUsePhoto={() => {
                  onUsePhoto?.({type, photo: cameraProps?.photo});
                  onClose();
                }}
              />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraPicker;
