import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
  Button
} from "react-native";
import ChartIcon from "./ChartIcon";
import { ScrollView } from "react-native-gesture-handler";
import { config } from "../login"
import * as Google from 'expo-google-app-auth';
import { Action } from "redux";

const LOGO = require('../../assets/datatrack_logo.png');

type IProps = {
  charts: object
  navigation: object
  isFetching: boolean
}

const Home = ({ navigation, charts, isFetching } : IProps) => {

  const username = navigation.state.params.username;
  const accessToken = navigation.state.params.accessToken

  const GoogleSignOutAsync = async () => {
    try{
      const result = await Google.logOutAsync({ accessToken, ...config });
      console.info("Logout Successful For: ", username);
      navigation.navigate("Login");
    } catch (e) {
        console.log('Error with logout', e);
        return { error: true };
    }

  }


  //console.info(`In home componenet: ${charts.length}`);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const style = styles(windowWidth, windowHeight);
  const defaultChart : Chart = {id: "", title:"Your Chart", xValues:[], yValues:[], chartType:""}
  const goToChart = (chartObj : Chart) => { // Should this be defined in ChartIcon? We pass the id as the prop to ChartIcon anyway, and then essentially rebuild this function there
    navigation.navigate('Chart', { chart: chartObj}); // passing id allows us to render ChartComponent with data from the corresponding Chart object that's in our 'charts' array from the HomePage state 
  };

  return (
    <View style={style.container}>
      <Button
        title="Sign Out"
        onPress={GoogleSignOutAsync}
      />
      <View style={style.header}>
        <Image
          accessibilityLabel="App Logo"
          source={LOGO}
          resizeMode="contain"
          style={style.logo}
        />
      { /*<Text style={style.title}>DataTrack</Text> */}
      </View>
      <Text style={style.text}>
        To get started, please select from the options below:{" "}
      </Text>
      <ActivityIndicator size="large" color="#000000" animating={isFetching} />
      <ScrollView style={style.chartGrid} contentContainerStyle={style.chartGridContainer}>
        <ChartIcon title={"Create new..."} goToChart={goToChart} key={undefined} chart={defaultChart}/>
        { 
        //{id:charts[key].id, title:charts[key].title, xValues:charts[key].xValues, yValues:charts[key].yValues, chartType:charts[key].chartType}
          Object.keys(charts).map(key => {
            return (
              <ChartIcon title={charts[key].title} goToChart={goToChart} key={charts[key].id} chart={charts[key]} />
            )
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
    height: 200,
    alignSelf: "center"
  },
  header: {
    padding: 20,
    margin: 20
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
