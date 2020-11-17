var mapSvg;

var lineSvg;
var lineWidth;
var lineHeight;
var lineInnerHeight;
var lineInnerWidth;
var lineMargin = { top: 20, right: 60, bottom: 60, left: 100 };
var margin = { top: 20, right: 20, bottom: 30, left: 20 };
var height;
var barHeight = 20;
var mapWidth;
var mapHeight;

var mapData;
var temperatureData;

// This runs when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    mapSvg = d3.select("#map");
    lineSvg = d3.select("#linechart");

    lineWidth = +lineSvg.style("width").replace("px", "");
    lineHeight = +lineSvg.style("height").replace("px", "");
    lineInnerWidth = lineWidth - lineMargin.left - lineMargin.right;
    lineInnerHeight = lineHeight - lineMargin.top - lineMargin.bottom;

    mapWidth = +mapSvg.style("width").replace("px", "");
    mapHeight = +mapSvg.style("height").replace("px", "");
    height = mapHeight - 50;

    // Load both files before doing anything else
    Promise.all([
        d3.json("data/countries2.geojson"),
        d3.csv("data/GlobalLandTemperaturesByCountry.csv"),
    ]).then(function(values) {
        mapData = values[0];
        temperatureData = values[1];

        drawMap();
    });
});

// Get the min/max value for the given year data
function getExtentsForYear(yearData) {
    var max = Number.MIN_VALUE;
    var min = Number.MAX_VALUE;
    for (var key in yearData) {
        if (isNaN(yearData[key].AverageTemperature)) continue;
        let val = +yearData[key].AverageTemperature;

        if (val > max) max = val;
        if (val < min) min = val;
    }
    return [min, max];
}

// Draw the map in the #map svg
function drawMap() {

    // create the map projection and geoPath
    let projection = d3
        .geoMercator()
        .scale(100)
        .center(d3.geoCentroid(mapData))
        .translate([+mapSvg.style("width").replace("px", "") / 2, +mapSvg.style("height").replace("px", "") / 2.3, ]);
    let path = d3.geoPath().projection(projection);

    // get the selected year based on the input box's value
    var year = "2000";

    // console.log(getCountryData(timeData, '2000', '02'));

    // get the temperature values for all countries for a given year and month
    // let yearData = timeData.filter((d) => d.Year == year)[0];
    let yearData = getCountryData(temperatureData, '2000', '02');
    // get the min/max GDP values for the selected year
    let extent = getExtentsForYear(yearData);

    // get the selected color scale based on the dropdown value
    var colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain(extent);

    // draw the map on the #map svg
    let g = mapSvg.append("g");
    g.selectAll("path")
        .data(mapData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", (d) => {
            return d.properties.CNTR_NAME;
        })
        .attr("class", "countrymap")
        .style("fill", (d, i) => {
            if (i >= yearData.length) return "white";
            let val = +yearData[i].AverageTemperature;
            if (isNaN(val)) return "white";
            return colorScale(val);
        })
        .on("mouseover", function(d, i) {

        })
        .on("mousemove", function(d, i) {

        })
        .on("mouseout", function(d, i) {

        })
        .on("click", function(d, i) {

        });

    var axisScale = d3
        .scaleLinear()
        .domain(extent)
        .range([0, mapWidth / 3]);

    const xAxis = d3
        .axisBottom(axisScale)
        .ticks(mapWidth / 100)
        .tickSize(-barHeight);

    const defs = mapSvg.append("defs");

    const linearGradient = defs
        .append("linearGradient")
        .attr("id", "linear-gradient");

    linearGradient
        .selectAll("stop")
        .data(
            colorScale.ticks().map((t, i, n) => ({
                offset: `${(100 * i) / n.length}%`,
                color: colorScale(t),
            }))
        )
        .enter()
        .append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-color", (d) => d.color);

    mapSvg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .append("rect")
        .attr("transform", `translate(${margin.left}, 0)`)
        .attr("width", mapWidth / 3)
        .attr("height", barHeight)
        .style("fill", "url(#linear-gradient)");

    // append color scale to the map 
    mapSvg
        .append("g")
        .call(xAxis)
        .attr("class", "x-axis")
        .attr(
            "transform",
            `translate(${margin.left},${height - margin.bottom + barHeight})`
        )
        .attr("font-size", 8);

}

function getCountryData(data, year, month) {
    let yearData = data.filter((d) => d.dt.startsWith(year + '-' + month));
    return yearData;
}
