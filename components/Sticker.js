import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Sticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 4)
        scaleImage.value = scaleImage.value * 2;
    });
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });
  const rotate = Gesture.Rotation().onChange((event) => {
    rotation.value = event.rotation;
    console.log("Rotate Called", rotation.value);
  });
  const pinch = Gesture.Pinch().onUpdate((event) => {
    scaleImage.value = imageSize * event.scale;
    console.log("Pinch Called", scaleImage.value);
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
      transform: [{ rotate: `${rotation.value}rad` }],
    };
  });

  const gesturesForContainer = Gesture.Race(drag, rotate, pinch, doubleTap);
  return (
    <GestureDetector gesture={gesturesForContainer}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        {/* <GestureDetector gesture={Gesture.Race(pinch,doubleTap,rotate)}> */}
        <Animated.Image
          source={stickerSource}
          resizeMode="contain"
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
        {/* </GestureDetector> */}
      </Animated.View>
    </GestureDetector>
  );
}
