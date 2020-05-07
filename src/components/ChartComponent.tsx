import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import ChartDisplay from "../ChartDisplay";
import StatsDisplay from "../StatisticsDisplay";

function parseData(string) {
  // build an array using the ',' as the delimiter, map all elements to
  // integers, removing those which mapped to NaN
  var parsed_arr = [];
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

const Chart = ({ saveChart }) => {
  const [x_input, set_xInput] = useState("");
  const [y_input, set_yInput] = useState("");
  const [x_axis, set_xAxis] = useState("x");
  const [y_axis, set_yAxis] = useState("");
  const [chart_title, set_chartTitle] = useState("Your Chart");
  const [chart_type, set_chartType] = useState("line");

  // react-native-chart-kit cannot render a chart without x-axis and y-axis values
  var x_values = parseData(x_input);
  var y_values = parseData(y_input);
  if (x_values.length == 0 || y_values.length == 0){
    x_values = [1,2,3]
    y_values = [1,2,3]
  }

  return (
    <View style={styles.container}>
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
        onPress={() => {
          console.log("Save Chart Pressed");
          saveChart({title:chart_title,xValues:x_values, yValues:y_values, chartType:chart_type});
        }}
        />
      </View>
    </View>
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
  }
})

export default Chart;