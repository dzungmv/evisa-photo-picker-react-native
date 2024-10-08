/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableOpacity,
} from 'react-native';
import {EvisaType} from '../../hooks/useCamera';
import Box from '../box';

type IProps = {
  photo: string;
  type: EvisaType;
  onRetake: () => void;
  onUsePhoto: () => void;
};

export default function CameraPreview(props: IProps) {
  const {photo, type, onRetake, onUsePhoto} = props;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Box size={12} />
      <Text style={styles.title}>{type[0].toUpperCase() + type.slice(1)}</Text>

      <Image source={{uri: photo}} style={styles.image} />

      <View style={styles.actions}>
        <TouchableOpacity onPress={onRetake} style={[styles.btn, styles.btn1]}>
          <Text style={styles.btnText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onUsePhoto}
          style={[styles.btn, styles.btn2]}>
          <Text style={[styles.btnText, {color: 'white'}, styles.btn2]}>
            Use
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  btnText: {
    fontWeight: '600',
    color: '#FF204E',
  },
  btn2: {
    borderColor: 'transparent',
    backgroundColor: '#FF204E',
  },
  btn1: {
    borderColor: '#FF204E',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 45,
    borderRadius: 25,
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 32,
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  image: {
    width: Dimensions.get('window').width - 40,
    aspectRatio: '1/1',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
});
