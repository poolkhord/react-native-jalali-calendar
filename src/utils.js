import {
  Value,
  block,
  set,
  Easing,
  cond,
  clockRunning,
  stopClock,
  startClock,
  timing,
} from "react-native-reanimated";

export function runTiming(clock, value, dest, animate) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: cond(animate, 300, 0),
    toValue: dest,
    easing: Easing.out(Easing.quad),
  };

  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, [stopClock(clock)]),
    // we made the block return the updated position
    state.position,
  ]);
}
