import React, { useState } from "react";
import { Text, ScrollView, Button, TextInput } from "react-native";
import ChartDisplay from "./ChartDisplay";
import StatsDisplay from "./StatisticsDisplay";

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

const ChartPage = ({ setCurrentPage }) => {
  const [x_input, set_xInput] = useState("");
  const [y_input, set_yInput] = useState("");
  const [x_axis, set_xAxis] = useState("x");
  const [y_axis, set_yAxis] = useState("y");
  const [chart_title, set_chartTitle] = useState("Your Chart");
  const [chart_type, set_chartType] = useState("line");

  // console.log(x_input);
  //console.log(parseData(y_input));
  return (
    <ScrollView>
      <Button
        onPress={() => {
          setCurrentPage("Home");
        }}
        title="Back"
      />
      <ChartDisplay
        x_values={parseData(x_input)}
        y_values={parseData(y_input)}
        x_axis={x_axis}
        y_axis={y_axis}
        chart_title={chart_title}
        chart_type={chart_type}
      />
      <Text>Please Provide Your Data Below</Text>
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
      />
      <StatsDisplay y_values={parseData(y_input)} />
    </ScrollView>
  );
};
export default ChartPage;
