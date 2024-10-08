import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Box from './src/components/box';
import CameraHandler from './src/features/camera-handler';
import Title from './src/features/title';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView style={[styles.wrapper, styles.container]}>
          <Title />
          <Box size={32} />
          <CameraHandler />
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
});

export default App;
