import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const ChartIcon = ({ title, goToChart }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        goToChart();
      }}
    >
      <FontAwesome5Icon name="chart-line" style={styles.chartIcon} solid />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: "20%",
    borderWidth: 3,
    borderColor: "black",
    fontSize: 7,
    padding: 10
  },
  chartIcon: {
    fontSize: 20,
    color: "black",
    textAlign: "center"
  }
});

export default ChartIcon;
