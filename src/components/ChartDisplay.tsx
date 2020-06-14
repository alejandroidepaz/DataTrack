import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
  AbstractChart
} from "react-native-chart-kit";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import DefaultChart from "../components/DefaultChart"

const ChartDisplay = ({
    x_values,
    y_values,
    x_axis,
    y_axis,
    chart_title,
    chart_type
  }) => {
  
  var chart_elem;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const user_data = {
    labels: x_values,
    datasets: [
      {
        data: y_values
      }
    ]
  }

  switch (chart_type) {
    case "line":
      chart_elem = (
        <LineChart
        data={user_data}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix={y_axis}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        style={styles.lineChart}
      />
      );
      break;
    case "bar":
      chart_elem = (
        <BarChart
          data={user_data}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel=""
          yAxisSuffix={y_axis}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          style={styles.barChart}
        />
      );
      break;
    case "histogram":
      chart_elem = <View><Text>Histogram Here</Text></View>;
      break;
    default:
      chart_elem = (
      //   <LineChart 
      //   data={{
      //     labels:["1", "2", "3"],
      //     datasets: [
      //       {
      //         data: [1,2,3]
      //       }
      //     ]
      //   }}
      //   width={Dimensions.get("window").width} // from react-native
      //   height={220}
      //   yAxisLabel=""
      //   yAxisSuffix={"kg"}
      //   yAxisInterval={1} // optional, defaults to 1
      //   chartConfig={chartConfig}
      //   style={{
      //     marginVertical: 8,
      //     borderRadius: 16
      //   }}
      // />

        <DefaultChart         
          chartConfig={chartConfig}
          width={Dimensions.get("window").width} // from react-native
          height={220} 
        />
      )

  }

  return (
    <View>
      <Text style={styles.chartTitle}>{chart_title}</Text>
      {chart_elem}
    </View>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    textAlign: "center",
    fontSize: 24
  },

  lineChart: {
    marginVertical: 8,
    borderRadius: 16
  },
  barChart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

export default ChartDisplay;
