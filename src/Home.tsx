import React, { Component } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View
} from "react-native";
import ChartIcon from "./ChartIcon";

const LOGO = require('../assets/app_logo.png');

const Home = ({ setCurrentPage }) => {
  const goToChart = () => {
    setCurrentPage("chart");
  };

  return (
    <ScrollView style={styles.app}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="App Logo"
          source={LOGO}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>DataTrack</Text>
      </View>
      <Text style={styles.text}>
        To get started, please select from the options below:{" "}
      </Text>
      <View style={styles.chartGrid} />
      <ChartIcon title={"Create new..."} goToChart={goToChart} />
      <View />
      <View />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 150,
    alignSelf: "center"
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginVertical: 1,
    textAlign: "center"
  },
  text: {
    fontSize: 25,
    marginVertical: 1,
    textAlign: "center"
  },
  code: {
    fontFamily: "monospace, monospace"
  },
  value_input: {
    margin: 10,
    padding: 5,
    borderColor: "blue",
    borderWidth: 1
  },
  chartGrid: {
    flex: 1,
    flexDirection: "row"
    // display: "inline-block"
    // flexWrap: "wrap"
  }
});

export default Home;
