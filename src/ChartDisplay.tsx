import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Text, View, Dimensions } from "react-native";

const ChartDisplay = ({
  x_values,
  y_values,
  x_axis,
  y_axis,
  chart_title,
  chart_type
}) => {
  
  var chart_elem;

  switch (chart_type) {
    case "line":
      chart_elem = (
        <LineChart
        data={{
          labels: x_values,
          datasets: [
            {
              data: y_values
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      );
      break;
    case "bar_graph":
      chart_elem = <View />;
      break;
    case "histogram":
      chart_elem = <View />;
      break;
    default:
      chart_elem = <View />;
      break;
  }

  return (
    <View>
      <Text>{chart_title}</Text>
      {chart_elem}
    </View>
  );
};
export default ChartDisplay;
