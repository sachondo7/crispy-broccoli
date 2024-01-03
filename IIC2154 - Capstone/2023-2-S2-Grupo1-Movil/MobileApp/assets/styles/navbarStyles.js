import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const navbarHeight = height * 0.1;
const navbarWidth = width;

const homeIconSize = navbarHeight * 0.75;

const navbarStyles = StyleSheet.create({
  container: {
    minHeight: navbarHeight,
    maxHeight: navbarHeight,
    minWidth: navbarWidth,
    maxWidth: navbarWidth,
    
    backgroundColor: '#53536A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIconSize: homeIconSize,
});

export default navbarStyles;