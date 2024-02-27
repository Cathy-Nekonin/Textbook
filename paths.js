//Width and height
var w = 800;
var h = 300;
var padding = 40;

var dataset, xScale, yScale, line;  //Empty, for now


var rowConverter = function(d){
    return{
        //Make a new Date object for each year + month
        date: new Date(+d.year, (+d.month - 1)), //will combine the year and month columns into 1 column
        //Convert from string to float
        average: parseFloat(d.average)
    };
}

d3.csv("CO2_data.csv", rowConverter, function(data){
    var dataset = data;

    console.table(dataset, ["date","average"]);


    xScale = d3.scaleTime() //will handle the time values
            .domain([ //zero baseline (low domain value of 0)
                    d3.min(dataset, function(d) { return d.date; }),
                    d3.max(dataset, function(d) { return d.date; })
            ])
            .range([0, w]);

    yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d.average; })])
            .range([h, 0]);

    //Line generator
    var line = d3.line()
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.average); });

    //SVG Element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", w);

    //Create line
    svg.append("path")
        .datum(dataset) //Bbinding a single data value to a single element
        .attr("class", "line") 
        .attr("d", line);

})