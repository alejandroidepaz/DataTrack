import React from "react";
import { View } from "react-native";
import { Svg, G } from "react-native-svg";
import  AbstractChart from "react-native-chart-kit/src/abstract-chart";


class DefaultChart extends AbstractChart {

    constructor(props : any) {
        super(props);
    };

    render() {

        const paddingTop = 16;
        const paddingRight = 64;
        const {
            width,
            height,
            withShadow = true,
            withDots = false,
            style = {},
            transparent
        } = this.props;

        const labels = [0,1,2,3]
        const config = {
            width,
            height
        };

        return (

            <View style={style}>
                <Svg height={height} width={width}>
                    <G>
                        {this.renderHorizontalLines({
                            ...config,
                            count: 4,
                            paddingTop,
                            paddingRight
                        })}

                        {this.renderVerticalLines({
                            ...config,
                            data: [1,2,3,4],
                            paddingTop,
                            paddingRight
                        })}

                    {this.renderHorizontalLabels({
                        ...config,
                        count:3,
                        data: [0,1,2,3],
                        paddingTop,
                        paddingRight
                    })}         
                    {this.renderVerticalLabels({
                        ...config,
                        labels,
                        paddingRight,
                        paddingTop
                    })}
                    </G>
                </Svg>
            </View>
        );
    }
}

export default DefaultChart;