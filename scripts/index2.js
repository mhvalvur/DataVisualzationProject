const svg = d3.select('#fireChartSvg');
const width = +svg.style('width').replace('px','');
const height = +svg.style('height').replace('px','');
const margin = { top:40, bottom: 90, right: 20, left: 80 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

d3.csv('GlobalTemperatures.csv').then(data =>{
    data = data.slice(1862,3190);
    data.forEach(d => {
        d.date = d["dt"];
        d.temperature = d["LandAverageTemperature"];
    });

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.date;})])
        .range([0,innerWidth]);
    const yScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.temperature;}))
        .range([0,innerHeight])
        .padding(0.1);
    
    const g = svg.append('g')
        .attr('transform', 'translate(' +margin.left+', '+margin.top+')');
    
    var barchart = g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', d => yScale(d.temperature))
        .attr('height',yScale.bandwidth())
        .attr('width', function(d) {
            return  xScale(d.date);
        });
    
    const yAxis = d3.axisLeft(yScale);
    g.append('g').call(yAxis)
        .selectAll('.domain, .tick line').remove();
    

    g.append('text')
        .attr('class','axis-label')
        .attr('text-anchor','middle')
        .attr('x',innerWidth/2)
        .attr('y',innerHeight+70)
        .text('Date (1905-2015')    
    g.append('text')
        .attr('class','title')
        .attr('y',-10)
        .text('Temperature (Celcius)');
});
