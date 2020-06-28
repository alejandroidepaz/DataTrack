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

  const piechart_colors = ["#FF0000", "#FF8000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#7F00FF", "#FF00FF", "#FF007F", "#808080", "#000000", "#FFFFFF"]

  if (chart_type === "pie"){
    var user_data : any = [];
    for (var i=0; i<x_values.length; i++){
      
      var color_index = i
      if (i > 12){
        color_index = i % 12
      }

      let metric_obj = 
      {"name": x_values[i], 
      "metric_value": y_values[i], 
      legendFontSize: 15, 
      legendFontColor: "#000000", 
      color: piechart_colors[color_index]};
      user_data.push(metric_obj);
    };
  } else{

    var user_data : any = {
      labels: x_values,
      datasets: [
        {
          data: y_values
        }
      ]
    };

  };

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
          style={styles.barChart}
          fromZero={true}
        />
      );
      break;
    case "pie":
      chart_elem = (
        <PieChart
          data={user_data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          style={styles.pieChart}
          accessor="metric_value"
          paddingLeft="15"
        />

      );
      break;
    default:
      chart_elem = (

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
  },

  pieChart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

export default ChartDisplay;
