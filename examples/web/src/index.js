import { AppRegistry } from "react-native";
import React from "react";

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

AppRegistry.registerComponent("examples-web", () => () => <div>hello</div>);
AppRegistry.runApplication("examples-web", {
  rootTag: document.getElementById("root"),
});
