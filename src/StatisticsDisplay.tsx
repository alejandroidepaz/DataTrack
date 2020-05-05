import React from "react";
import { Text, View, StyleSheet } from "react-native";

function median(arr) {
  var median = "None";
  if (arr.length > 0) {
    var sorted_arr = arr.sort();
    var mid_index = Math.floor(sorted_arr.length / 2);

    median =
      sorted_arr.length % 2 !== 0
        ? sorted_arr[mid_index]
        : (sorted_arr[mid_index - 1] + sorted_arr[mid_index]) / 2;
  }
  return median;
}

function mode(arr) {
  var frequency_map = {};
  var modes = new Set();
  var highest_freq = 0;
  if (arr.length > 0) {
    for (const val of arr) {
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
  return modes;
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

  return mean;
}

const StatsDisplay = ({ y_values }) => {
  return (
    <View>
      <Text style={styles.title}>Statistical Summary of Data:</Text>
      <Text style={styles.text}>Mean: {mean(y_values)}</Text>
      <Text style={styles.text}>Median: {median(y_values)}</Text>
      <Text style={styles.text}>Mode(s): {mode(y_values)}</Text>
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
