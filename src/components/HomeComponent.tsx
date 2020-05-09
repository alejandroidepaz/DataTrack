import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native";
import ChartIcon from "../ChartIcon";
import { ScrollView } from "react-native-gesture-handler";
import Chart from "./ChartComponent";

const LOGO = require('../../assets/app_logo.png');

type IProps = {
  charts: Array<Chart>
  navigation: object
}

const Home = ({ navigation, charts } : IProps) => {
  console.info(`In home componenet: ${charts.length}`);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const style = styles(windowWidth, windowHeight);
  const goToChart = (chartId : String) => {
    navigation.navigate('Chart', { id: chartId });
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
        <ChartIcon title={"Create new..."} goToChart={goToChart} key={undefined} id={null}/>
        {
          charts.map(x => {
            return <ChartIcon title={x.title} goToChart={goToChart} key={x.id} id={x.id} />
          })
        }
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
