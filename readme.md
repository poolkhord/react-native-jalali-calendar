[![NPM](https://nodei.co/npm/react-native-jalali-calendar.png)](https://nodei.co/npm/react-native-jalali-calendar/)

[![install size](https://packagephobia.now.sh/badge?p=react-native-jalali-calendar)](https://packagephobia.now.sh/result?p=react-native-jalali-calendar) [![dependencies](https://david-dm.org/hosseinmd/react-native-jalali-calendar.svg)](https://david-dm.org/hosseinmd/react-native-jalali-calendar.svg)

# react-native-jalali-calendar

Easy state management for react & react-native using hooks.
it's useful for global state management and complex components state

## TOC

- [Install](#Install)

## Install

You should be install react-native-reanimated react-native-vector-icons starkstring moment-jalaali too

```npm
yarn add react-native-jalali-calendar react-native-reanimated react-native-vector-icons starkstring moment-jalaali
```

Add code to root of project

```js
// Generate required css
import MaterialCommunityIcons from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";
const iconFontStyles = `@font-face {
  src: url(${MaterialCommunityIcons});
  font-family: MaterialCommunityIcons;
}`;

// Create stylesheet
const style = document.createElement("style");
style.type = "text/css";
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);
```
