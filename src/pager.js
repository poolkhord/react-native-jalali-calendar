import React, { useRef, memo, useImperativeHandle, forwardRef } from "react";
import Animated, { Value, Clock } from "react-native-reanimated";
import { runTiming } from "./utils";
import { StyleSheet } from "react-native";

/**
 * @typedef {object} VerticalSwitchProps
 * @property {number} height
 * @property {number} initialIndex
 */

/**
 * @type {React.FC<VerticalSwitchProps>}
 */
export const ViewPage = memo(
  forwardRef(({ children, initialIndex, height }, ref) => {
    const animState = useRef({
      clock: new Clock(),
      progress: new Value(0),
      animation: new Value(initialIndex * height),
      isAnimated: new Value(1),
    }).current;

    const anim = useRef({
      Y: runTiming(
        animState.clock,
        animState.progress,
        animState.animation,
        animState.isAnimated,
      ),
    }).current;

    useImperativeHandle(
      ref,
      () => ({
        pageToIndex: (index, animate) => {
          animState.isAnimated.setValue(animate ? 1 : 0);
          animState.animation.setValue(index * height);
        },
      }),
      [animState, height],
    );

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: anim.Y }],
          },
        ]}
      >
        {children}
      </Animated.View>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
