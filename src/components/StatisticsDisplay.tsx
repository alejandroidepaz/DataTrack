import React from "react";
import { Text, View, StyleSheet } from "react-native";

function median(arr : Array<Number>) {
  var median = "N/A";
  if (arr.length > 0) {
    var sorted_arr = arr.sort();
    var mid_index = Math.floor(sorted_arr.length / 2);
    console.log(sorted_arr);
    median =
      sorted_arr.length % 2 !== 0
        ? sorted_arr[mid_index]
        : (sorted_arr[mid_index - 1] + sorted_arr[mid_index]) / 2;

    median = median.toFixed(2)
  }
  return median;
}

function mode(arr : Array<Number>) {
  var frequency_map = {};
  var modes = new Set();
  var highest_freq = 0;
  if (arr.length > 0) {
    for (var val of arr) {
      val = val.toFixed(2);
      if (frequency_map[val] === undefined) {
        frequency_map[val] = 0;
      } else {
        frequency_map[val] += 1;
      }
      if (frequency_map[val] === highest_freq) {
        modes.add(val);
      } else if (frequency_map[val] > highest_freq) {
        modes.clear();
        modes.add(val);
        highest_freq = frequency_map[val];
      }
    }
  }

  return Array.from(modes).join(", ");
}

function mean(arr) {
  var mean = 0;
  if (arr.length > 0) {
    var sum = 0;
    for (const val of arr) {
      sum += val;
    }

    mean = sum / arr.length;
  }

  return mean.toFixed(2);
}

const StatsDisplay = ({ y_values, chart_type }) => {
  return (
    <View>
      <Text style={styles.title}>Statistical Summary of Data:</Text>
      <Text style={styles.text}>Mean: { chart_type === "line" ? mean(y_values) : ""}</Text>
      <Text style={styles.text}>Median: {chart_type === "line" ? median(y_values) : ""}</Text>
      <Text style={styles.text}>Mode(s): { chart_type === "line" ? mode(y_values) : ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 5,
    textAlign: "center"
  },
  text: {
    fontSize: 10,
    marginVertical: 5,
    textAlign: "center"
  }
});
export default StatsDisplay;
