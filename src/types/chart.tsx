type Chart = {
    id: String,
    title : String,
    xValues : Array<Number>,
    yValues : Array<Number>,
    chartType : String 
}

interface ChartAction extends Chart {
    type: String
}