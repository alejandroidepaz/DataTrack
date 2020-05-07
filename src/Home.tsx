import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native";
import ChartIcon from "./ChartIcon";
import { ScrollView } from "react-native-gesture-handler";

const LOGO = require('../assets/app_logo.png');

type IProps = {
  navigation: object
}

const Home = ({ navigation } : IProps) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const style = styles(windowWidth, windowHeight);
  const goToChart = () => {
    navigation.navigate('Chart');
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image
          accessibilityLabel="App Logo"
          source={LOGO}
          resizeMode="contain"
          style={style.logo}
        />
        <Text style={style.title}>DataTrack</Text>
      </View>
      <Text style={style.text}>
        To get started, please select from the options below:{" "}
      </Text>
      <ScrollView style={style.chartGrid} contentContainerStyle={style.chartGridContainer}>
        <ChartIcon title={"Create new..."} goToChart={goToChart} />
        <ChartIcon title={"Chart 1"} goToChart={goToChart} />
        <ChartIcon title={"Chart 2"} goToChart={goToChart} />
        <ChartIcon title={"Chart 3"} goToChart={goToChart} />
      </ScrollView>
    </View>
  );
};

const styles = (windowWidth : number, windowHeight : number) => StyleSheet.create(
  {
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
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
    marginHorizontal: windowWidth / 12,
    marginTop: 0.03 * windowHeight
  },
  chartGridContainer: {
    flexDirection:'row',
    justifyContent: "flex-start",
    flexWrap: 'wrap',
  }
});

export default Home;
