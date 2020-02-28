import { AppRegistry, I18nManager, View } from "react-native";
I18nManager.forceRTL(true);
import React, { Suspense, lazy } from "react";
const JalaliCalendar = lazy(() => import("./app"));
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

////  end #1
const App = () => {
  return (
    <Suspense fallback={<View />}>
      <JalaliCalendar onSelect={arg => console.log("action1", arg)} />
      <JalaliCalendar onSelect={arg => console.log("action2", arg)} />
    </Suspense>
  );
};

AppRegistry.registerComponent("examples-web", () => App);
AppRegistry.runApplication("examples-web", {
  rootTag: document.getElementById("root"),
});
