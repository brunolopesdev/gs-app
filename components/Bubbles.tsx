import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated, Dimensions } from "react-native";
import { Asset } from "expo-asset";

const { width, height } = Dimensions.get("window");

const bottle = Asset.fromModule(
  require("@/assets/images/water-bottle.svg")
).uri;
const fish = Asset.fromModule(require("@/assets/images/dead-fish.png")).uri;

const positions = [
  { top: height * 0.2, left: width * 0.2 },
  { top: height * 0.6, left: width * 0.8 },
  { top: height * 0.4, left: width * 0.4 },
  { top: height * 0.66, left: width * 0.3 },
  { top: height * 0.9, left: width * 0.1 },
  { top: height * 0.3, left: width * 0.6 },
  { top: height * 0.7, left: width * 0.2 },
  { top: height * 0.75, left: width * 0.6 },
  { top: height * 0.5, left: width * 0.5 },
  { top: height * 0.45, left: width * 0.2 },
  { top: height * 0.1, left: width * 0.9 },
  { top: height * 0.2, left: width * 0.7 },
  { top: height * 0.2, left: width * 0.2 },
  { top: height * 0.6, left: width * 0.05 },
  { top: height * 0.9, left: width * 0.8 },
];


const Bubbles: React.FC = () => {
  const animatedValues = useRef(
    positions.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 8000 + index * 500,
            useNativeDriver: true,
          }),
        ])
      )
    );
    Animated.stagger(500, animations).start();
  }, [animatedValues]);

  return (
    <View style={styles.wrapper}>
      {animatedValues.map((anim, index) => {
        const animatedStyle = {
          transform: [
            {
              scale: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1.3],
              }),
            },
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -100],
              }),
            },
            {
              rotate: anim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
          top: positions[index].top,
          left: positions[index].left,
        };

        return (
            <Animated.View key={index} style={[styles.bubble, animatedStyle]}>
                {index === 0 || index === 7 ? (
                    <Image source={{ uri: bottle }} style={styles.image} />
                ) : index === 1 ? (
                    <Image source={{ uri: fish }} style={styles.image} />
                ) : (
                    <View style={styles.dot} />
                )}
            </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  bubble: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 30,
    position: "absolute",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    top: "20%",
    right: "20%",
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Bubbles;
