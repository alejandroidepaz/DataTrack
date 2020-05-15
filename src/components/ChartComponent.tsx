import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView } from "react-native";
  import { Button } from 'react-native-elements';

  import { v4 as uuidv4 } from 'uuid';

import ChartDisplay from "../ChartDisplay";
import StatsDisplay from "../StatisticsDisplay";

function parseData(string : string) {
  // build an array using the ',' as the delimiter, map all elements to
  // integers, removing those which mapped to NaN
  var parsed_arr : Array<Number> = [];
  try {
    parsed_arr = string
      .split(",")
      .map(str => parseInt(str, 10))
      .filter(val => !isNaN(val));
  } catch (err) {
    alert("Data not correctly formatted!");
  }
  return parsed_arr;
}

const Chart = ({ saveChart, deleteChart, navigation }) => {
  let id = navigation.state.params.chart.id;
  let xVals = navigation.state.params.chart.xValues;
  let yVals = navigation.state.params.chart.yValues;
  let title = navigation.state.params.chart.chartTitle;
  let type = navigation.state.params.chart.chartType;
  if (!id) {
    id = uuidv4();
  }

  const [x_input, set_xInput] = useState(xVals.toString());
  const [y_input, set_yInput] = useState(yVals.toString());
  const [x_axis, set_xAxis] = useState("x");
  const [y_axis, set_yAxis] = useState("");
  const [chart_title, set_chartTitle] = useState(title);
  const [chart_type, set_chartType] = useState(type);

  // react-native-chart-kit cannot render a chart without x-axis and y-axis values
  var x_values = parseData(x_input);
  var y_values = parseData(y_input);
  if (x_values.length == 0 || y_values.length == 0){
    x_values = [1,2,3]
    y_values = [1,2,3]
  }

  return (
    <ScrollView style={styles.container}>
      <ChartDisplay
          x_values={x_values}
          y_values={y_values}
          x_axis={x_axis}
          y_axis={y_axis}
          chart_title={chart_title}
          chart_type={chart_type}
      />
      <Text style={{fontWeight:"bold"}}>Please Provide Your Data Below</Text>
        
      <View style={{flexDirection: 'row', justifyContent:"center"}}>
        <TouchableOpacity
          style={[styles.charttype_button, chart_type === "line" ? styles.btn_clicked : styles.btn_not_clicked]}
          onPress={() => set_chartType("line")}
        >
          <Text style={chart_type === "line" ? {color:"black"} : {color:"white"}}> Line </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.charttype_button, chart_type === "bar" ? styles.btn_clicked : styles.btn_not_clicked]}
          onPress={() => set_chartType("bar")}
        >
          <Text style={chart_type === "bar" ? {color:"black"} : {color:"white"}}> Bar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.charttype_button, chart_type === "histogram" ? styles.btn_clicked : styles.btn_not_clicked]}
          onPress={() => set_chartType("histogram")}
        >
          <Text style={chart_type === "histogram" ? {color:"black"} : {color:"white"}}> Histogram </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.data_input}>
        <TextInput
          style={{ height: 40 }}
          placeholder="X Values"
          onChangeText={x_input => set_xInput(x_input)}
          defaultValue={x_input}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Y Values"
          onChangeText={y_input => set_yInput(y_input)}
          defaultValue={y_input}
          editable={parseData(x_input).length > 0 ? true : false}
        />
        <StatsDisplay y_values={parseData(y_input)} />

        <Button
          title="Save Chart"
          style={styles.actionButtons}
          onPress={async () => {
            saveChart({
              id: id,
              title: chart_title,
              xValues: x_values,
              yValues: y_values,
              chartType: chart_type
            });
          }}
        />
        <Button
          title="Delete Chart"
          style={styles.actionButtons}
          buttonStyle={{ backgroundColor: "red" }}
          onPress={async () => {
            deleteChart(id);
            navigation.navigate('Home');
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  data_input: {

    margin: 5
  },

  
  charttype_button: {
    alignItems: 'center',
    padding: 10,
    width:100,
    maxWidth:200,
    maxHeight: 45,
    margin: 2
  },

  btn_clicked: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2
  },

  btn_not_clicked: {
    backgroundColor: "black"
  },

  btn_text_clicked: {
    color: "black"
  },

  btn_text_unclicked: {
    color: "white"
  },
  actionButtons: {
    margin: 10,
  }
})

export default Chart;