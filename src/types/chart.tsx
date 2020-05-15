type Chart = {
    id: string,
    title : string,
    xValues : Array<Number>,
    yValues : Array<Number>,
    chartType : string 
}

interface ChartAction extends Chart {
    type: string
}