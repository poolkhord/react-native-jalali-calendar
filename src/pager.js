import React, {
  useRef,
  memo,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import Animated, { Value, Clock } from "react-native-reanimated";
import { runTiming } from "./utils";
import { StyleSheet, I18nManager } from "react-native";

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
    const getOffset = useCallback(
      index => {
        return index * height;
      },
      [height],
    );
    const animState = useRef({
      clock: new Clock(),
      progress: new Value(0),
      animation: new Value(getOffset(initialIndex)),
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
          animState.animation.setValue(getOffset(index));
        },
      }),
      [animState, getOffset],
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
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
  },
});
