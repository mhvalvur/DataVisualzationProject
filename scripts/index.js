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
    // add a div to the body of the page
    var tooltipDiv = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip-temp")
        .style("opacity", 0);

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
    let yearData = getCountryData(temperatureData, '2000', '01');
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
            tooltipDiv.transition().duration(60).style("opacity", 1);
            let val = 0;
            if (i < yearData.length)
                val = +yearData[i].AverageTemperature.substring(0, 5);

            tooltipDiv
                .html("Country: " + d.properties.CNTR_NAME + "<br>Temperature: " + val)
                .style("left", d3.mouse(this)[0] + 35 + "px")
                .style("top", d3.mouse(this)[1] + 180 + "px");
        })
        .on("mousemove", function(d, i) {
            tooltipDiv
                .style("left", d3.mouse(this)[0] + 35 + "px")
                .style("top", d3.mouse(this)[1] + 180 + "px");
        })
        .on("mouseout", function(d, i) {
            // tooltip disappears
            tooltipDiv.transition().duration(60).style("opacity", 0);
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

    // on change listener for year input select
    d3.select("#year-input").on("change", function() {
        mapSvg.selectAll("*").remove();

        let projection = d3
            .geoMercator()
            .scale(100)
            .center(d3.geoCentroid(mapData))
            .translate([+mapSvg.style("width").replace("px", "") / 2, +mapSvg.style("height").replace("px", "") / 2.3, ]);
        let path = d3.geoPath().projection(projection);

        year = this.value;

        var selectedMonthOption = document.getElementById("month-select");
        var selectedMonth =
            selectedMonthOption.options[selectedMonthOption.selectedIndex].value;

        let yearData = getCountryData(temperatureData, year, selectedMonth);;
        let extent = getExtentsForYear(yearData);

        var selectedOption = document.getElementById("color-scale-select");
        var selectedScale =
            selectedOption.options[selectedOption.selectedIndex].value;

        var colorScale;

        if (selectedScale == "interpolateRdYlGn")
            colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain(extent);
        else if (selectedScale == "interpolateViridis")
            colorScale = d3.scaleSequential(d3.interpolateViridis).domain(extent);
        else if (selectedScale == "interpolateBrBG")
            colorScale = d3.scaleSequential(d3.interpolateBrBG).domain(extent);
        else if (selectedScale == "interpolateTurbo")
            colorScale = d3.scaleSequential(d3.interpolateTurbo).domain(extent);
        else if (selectedScale == "interpolatePlasma")
            colorScale = d3.scaleSequential(d3.interpolatePlasma).domain(extent);

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
                tooltipDiv.transition().duration(60).style("opacity", 1);
                let val = 0;
                if (i < yearData.length)
                    val = +yearData[i].AverageTemperature.substring(0, 5);

                tooltipDiv
                    .html("Country: " + d.properties.CNTR_NAME + "<br>Temperature: " + val)
                    .style("left", d3.mouse(this)[0] + 35 + "px")
                    .style("top", d3.mouse(this)[1] + 180 + "px");
            })
            .on("mousemove", function(d, i) {
                tooltipDiv
                    .style("left", d3.mouse(this)[0] + 35 + "px")
                    .style("top", d3.mouse(this)[1] + 180 + "px");
            })
            .on("mouseout", function(d, i) {
                // tooltip disappears
                tooltipDiv.transition().duration(60).style("opacity", 0);
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

        const defs = mapSvg.append("g");

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

        mapSvg
            .append("g")
            .call(xAxis)
            .attr("class", "x-axis")
            .attr(
                "transform",
                `translate(${margin.left},${height - margin.bottom + barHeight})`
            )
            .attr("font-size", 8);
    });

    d3.select("#color-scale-select").on("change", function() {
        mapSvg.selectAll("*").remove();

        let projection = d3
            .geoMercator()
            .scale(100)
            .center(d3.geoCentroid(mapData))
            .translate([+mapSvg.style("width").replace("px", "") / 2, +mapSvg.style("height").replace("px", "") / 2.3, ]);
        let path = d3.geoPath().projection(projection);

        let year = document.getElementById("year-input").value;

        var selectedMonthOption = document.getElementById("month-select");
        var selectedMonth =
            selectedMonthOption.options[selectedMonthOption.selectedIndex].value;

        let yearData = getCountryData(temperatureData, year, selectedMonth);;
        let extent = getExtentsForYear(yearData);

        var selectedScale = this.value;
        var colorScale;

        if (selectedScale == "interpolateRdYlGn")
            colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain(extent);
        else if (selectedScale == "interpolateViridis")
            colorScale = d3.scaleSequential(d3.interpolateViridis).domain(extent);
        else if (selectedScale == "interpolateBrBG")
            colorScale = d3.scaleSequential(d3.interpolateBrBG).domain(extent);
        else if (selectedScale == "interpolateTurbo")
            colorScale = d3.scaleSequential(d3.interpolateTurbo).domain(extent);
        else if (selectedScale == "interpolatePlasma")
            colorScale = d3.scaleSequential(d3.interpolatePlasma).domain(extent);


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
                tooltipDiv.transition().duration(60).style("opacity", 1);
                let val = 0;
                if (i < yearData.length)
                    val = +yearData[i].AverageTemperature.substring(0, 5);

                tooltipDiv
                    .html("Country: " + d.properties.CNTR_NAME + "<br>Temperature: " + val)
                    .style("left", d3.mouse(this)[0] + 35 + "px")
                    .style("top", d3.mouse(this)[1] + 180 + "px");
            })
            .on("mousemove", function(d, i) {
                tooltipDiv
                    .style("left", d3.mouse(this)[0] + 35 + "px")
                    .style("top", d3.mouse(this)[1] + 180 + "px");
            })
            .on("mouseout", function(d, i) {
                // tooltip disappears
                tooltipDiv.transition().duration(60).style("opacity", 0);
            })
            .on("click", function(d, i) {

            });

        // update the axis scale also 
        var axisScale = d3
            .scaleLinear()
            .domain(colorScale.domain())
            .range([0, mapWidth / 3]);

        const xAxis = d3
            .axisBottom(axisScale)
            .ticks(mapWidth / 100)
            .tickSize(-barHeight);

        const defs = mapSvg.append("g");

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

        mapSvg
            .append("g")
            .call(xAxis)
            .attr("class", "x-axis")
            .attr(
                "transform",
                `translate(${margin.left},${height - margin.bottom + barHeight})`
            )
            .attr("font-size", 8);
    });

    // apply on change listener for the month
    d3.select("#month-select").on("change", function() {
        mapSvg.selectAll("*").remove();

        let projection = d3
            .geoMercator()
            .scale(100)
            .center(d3.geoCentroid(mapData))
            .translate([+mapSvg.style("width").replace("px", "") / 2, +mapSvg.style("height").replace("px", "") / 2.3, ]);
        let path = d3.geoPath().projection(projection);

        let year = document.getElementById("year-input").value;

        var selectedMonth = this.value;

        let yearData = getCountryData(temperatureData, year, selectedMonth);;
        let extent = getExtentsForYear(yearData);

        var selectedOption = document.getElementById("color-scale-select");
        var selectedScale = selectedOption.options[selectedOption.selectedIndex].value;

        var colorScale;

        if (selectedScale == "interpolateRdYlGn")
            colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain(extent);
        else if (selectedScale == "interpolateViridis")
            colorScale = d3.scaleSequential(d3.interpolateViridis).domain(extent);
        else if (selectedScale == "interpolateBrBG")
            colorScale = d3.scaleSequential(d3.interpolateBrBG).domain(extent);
        else if (selectedScale == "interpolateTurbo")
            colorScale = d3.scaleSequential(d3.interpolateTurbo).domain(extent);
        else if (selectedScale == "interpolatePlasma")
            colorScale = d3.scaleSequential(d3.interpolatePlasma).domain(extent);


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
                tooltipDiv.transition().duration(60).style("opacity", 1);
                let val = 0;
                if (i < yearData.length)
                    val = +yearData[i].AverageTemperature.substring(0, 5);

                tooltipDiv
                    .html("Country: " + d.properties.CNTR_NAME + "<br>Temperature: " + val)
                    .style("left", d3.mouse(this)[0] + 35 + "px")
                    .style("top", d3.mouse(this)[1] + 180 + "px");
            })
            .on("mousemove", function(d, i) {
                tooltipDiv
                    .style("left", d3.mouse(this)[0] + 35 + "px")
                    .style("top", d3.mouse(this)[1] + 180 + "px");
            })
            .on("mouseout", function(d, i) {
                // tooltip disappears
                tooltipDiv.transition().duration(60).style("opacity", 0);
            })
            .on("click", function(d, i) {

            });

        // update the axis scale also 
        var axisScale = d3
            .scaleLinear()
            .domain(colorScale.domain())
            .range([0, mapWidth / 3]);

        const xAxis = d3
            .axisBottom(axisScale)
            .ticks(mapWidth / 100)
            .tickSize(-barHeight);

        const defs = mapSvg.append("g");

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

        mapSvg
            .append("g")
            .call(xAxis)
            .attr("class", "x-axis")
            .attr(
                "transform",
                `translate(${margin.left},${height - margin.bottom + barHeight})`
            )
            .attr("font-size", 8);
    });
}

function getCountryData(data, year, month) {
    let yearData = data.filter((d) => d.dt.startsWith(year + '-' + month));
    return yearData;
}
