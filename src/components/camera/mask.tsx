import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Defs, G, Mask, Path, Rect, Svg} from 'react-native-svg';
import {CropRegion} from 'vision-camera-cropper';
import {EvisaType, GetFrameSize, GetViewBox} from '../../hooks/useCamera';

type IProps = {
  type: EvisaType;
  cropRegion: CropRegion;
  getFrameSize: GetFrameSize;
  getViewBox: GetViewBox;
};

export default function CameraMask({
  type,
  cropRegion,
  getFrameSize,
  getViewBox,
}: IProps) {
  return (
    <Svg
      preserveAspectRatio="xMidYMid slice"
      style={[StyleSheet.absoluteFill]}
      viewBox={getViewBox()}>
      <Rect
        x={(cropRegion.left / 100) * getFrameSize().width}
        y={(cropRegion.top / 100) * getFrameSize().height}
        width={(cropRegion.width / 100) * getFrameSize().width}
        height={(cropRegion.height / 100) * getFrameSize().height}
        strokeWidth="2"
        stroke="white"
        fillOpacity={0.0}
      />

      <Defs>
        <Mask id="mask" x="0" y="0" height="120%" width="120%">
          <Rect height="120%" width="120%" fill="#fff" />
          <Rect
            x={(cropRegion.left / 100) * getFrameSize().width}
            y={(cropRegion.top / 100) * getFrameSize().height}
            height={(cropRegion.height / 100) * getFrameSize().height}
            width={(cropRegion.width / 100) * getFrameSize().width}
            fill="#000"
          />
        </Mask>
      </Defs>

      <Rect
        height="120%"
        width="120%"
        fill="rgba(0, 0, 0, 0.5)"
        mask="url(#mask)"
      />

      {type === 'portrait' ? (
        <Path
          d="M2 254C2 254 2 241.271 54.6603 226.926C84.0566 218.919 104.046 211.529 103.434 177.532C95.9575 169.915 86.1605 157.603 82.7594 142.196C82.7594 142.196 65.9495 133.603 64.8 119.692C63.582 104.995 65.4644 97.4156 73.6374 94.5748C73.6374 94.5748 63.0389 50.6728 86.4979 26.2226C109.957 1.77238 129.999 2.00008 139 2.00008C148.001 2.00008 168.043 1.77238 191.502 26.2226C214.961 50.6728 204.363 94.5748 204.363 94.5748C212.536 97.4156 214.418 105 213.2 119.692C212.05 133.603 195.241 142.196 195.241 142.196C191.84 157.609 182.043 169.921 174.566 177.532C173.954 211.529 193.943 218.924 223.34 226.926C276 241.265 276 254 276 254"
          stroke="white"
          stroke-width="3"
          fill="none"
          stroke-miterlimit="10"
          transform={`translate(${
            (cropRegion.left / 100) * getFrameSize().width
          }, ${(cropRegion.top / 50) * getFrameSize().height}) scale(${
            ((cropRegion.width / 100) * getFrameSize().width) / 278
          }, ${((cropRegion.height / 179) * getFrameSize().height) / 255})`}
        />
      ) : (
        <G
          fill="none"
          transform={`translate(${
            (cropRegion.left / 70) * getFrameSize().width
          }, ${(cropRegion.top / 72) * getFrameSize().height}) scale(${
            ((cropRegion.width / 300) * getFrameSize().width) / 107
          }, ${((cropRegion.height / 300) * getFrameSize().height) / 77})`}>
          <Path
            d="M39.1965 11.167C42.6474 11.167 50.3315 11.0798 59.3256 20.4442C68.3197 29.8085 64.2563 48.2642 64.2563 48.2642C67.3898 49.3522 68.5778 52.5306 66.6597 57.884C64.2563 64.5914 60.7589 65.5181 60.7589 65.5181C60.0059 68.927 58.5652 72.72 56.9238 75.1821C56.7975 76.5342 56.7921 77.8331 56.9109 79.2882C57.1958 82.7787 59.7526 85.6072 63.0384 86.8191L77.7698 92.2529"
            stroke="white"
            strokeWidth="1"
            strokeMiterlimit="10"
          />
          <Path
            d="M39.3606 11.167C35.9097 11.167 28.2256 11.0798 19.2315 20.4442C10.2374 29.8085 14.3008 48.2642 14.3008 48.2642C11.1673 49.3522 9.97928 52.5306 11.8975 57.884C14.3008 64.5914 17.7982 65.5181 17.7982 65.5181C18.5512 68.927 19.9919 72.72 21.6333 75.1821C21.7597 76.5342 21.765 77.8331 21.6463 79.2882C21.3613 82.7787 18.8045 85.6072 15.5187 86.8191L0.787366 92.2529"
            stroke="white"
            strokeWidth="1"
            strokeMiterlimit="10"
          />
          <Rect
            x="1.78735"
            y="1.33398"
            width="75.1465"
            height="105.348"
            rx="9"
            stroke="white"
            strokeWidth="1"
          />
        </G>
      )}
    </Svg>
  );
}
