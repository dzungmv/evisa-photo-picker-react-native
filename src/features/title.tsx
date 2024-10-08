import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import Box from '../components/box';

export default function Title() {
  return (
    <>
      <Text style={styles.title}>Evisa photo picker</Text>

      <Box size={12} />
      <Text>Simple Evisa pick photo from camera scanner & device library</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
