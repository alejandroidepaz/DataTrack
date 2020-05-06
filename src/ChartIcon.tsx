import React from "react";
import { Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const ChartIcon = ({ title, goToChart }) => {
  const windowWidth = useWindowDimensions().width;
  console.info(windowWidth);
  const windowHeight = useWindowDimensions().height;
  const style = styles(windowWidth, windowHeight);
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => {
        goToChart();
      }}
    >
      <FontAwesome5Icon name="chart-line" style={style.chartIcon} solid />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (windowWidth : number, windowHeight : number) => StyleSheet.create({
  container: {
    width: windowWidth * 0.216,
    height: windowWidth * 0.216,
    borderWidth: 3,
    borderColor: "black",
    fontSize: 7,
    padding: 10,
    margin: 0.03 * windowWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartIcon: {
    fontSize: 18,
    color: "black",
    textAlign: "center"
  }
});

export default ChartIcon;
