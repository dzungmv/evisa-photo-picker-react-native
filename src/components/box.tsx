import * as React from 'react';

import {View, ViewProps} from 'react-native';

type IProps = ViewProps & {
  size: number;
};

export default function Box({size, ...props}: IProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
      }}
      {...props}
    />
  );
}
