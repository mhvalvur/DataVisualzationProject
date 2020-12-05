
        const svgFire = d3.select('#firechart');
        const widthFire = +svgFire.style('width').replace('px','');
        const heightFire = +svgFire.style('height').replace('px','');

        const marginFire = { top:20, bottom: 90, right: 20, left: 160 };
        const innerWidthFire = widthFire - marginFire.left - marginFire.right;
        const innerHeightFire = heightFire - marginFire.top - marginFire.bottom;
        
        d3.csv('data/GlobalTemperatures.csv').then(data => {
            data = data.slice(1982,3190);

            data.forEach(d => {
                d.date = d["dt"];
                d.temperature = +d["LandAverageTemperature"];
            });
            
            const yScale = d3.scaleLinear()
                .domain([d3.max(data, function(d) {  return d.temperature; }), 0]) 
                .range([0, innerHeightFire]); 
            const xScale = d3.scaleBand()
                .domain(data.map(function(d) {return d.date;}))
                .range([0, innerWidthFire]);

            const g = svgFire.append('g')
                .attr('transform', 'translate('+marginFire.left+', '+marginFire.top+')');

            

            var barchart = g.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 > d.temperature > 7) {return "orange"};
                    ;
                })
                .attr('y', function(d){return yScale(d.temperature)})
                .attr('height', function(d, i) {
                    return innerHeightFire - yScale(d.temperature);
                })
                .transition()
                .duration(4000)
                .attr('x', d => xScale(d.date))
                .attr('width',xScale.bandwidth())
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "red"}
                    else if(12 >= d.temperature > 7) {return "gold"}
                    else if(7 >= d.temperature) {return "orange"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "gold"}
                    else if(12 >= d.temperature > 7) {return "orange"}
                    else if(7 >= d.temperature) {return "red"}
                })
                .transition()
                .duration(1500)
                .style("fill", function(d){
                    if(d.temperature > 12) {return "orange"}
                    else if(12 >= d.temperature > 7) {return "yellow"}
                    else if(7 >= d.temperature) {return "red"}
                });


            const yAxis = d3.axisLeft(yScale);
            g.append('g').call(yAxis);

            const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(function(d,i){ return !(i%120)}));
            g.append('g').call(xAxis)
                .attr('transform',`translate(0,${innerHeightFire})`)
                .selectAll("text")                   
                .style("text-anchor", "end")     
                .attr("dx", "-10px")             
                .attr("dy", "0px")               
                .attr("transform", "rotate(-45)" );
            
            g.append('text')
                .attr('class', 'graph-title')
                .attr('text-anchor', 'middle')
                .attr('y', 0)
                .attr('x', innerWidthFire/2)
                .text('Fire Bar Chart')
            g.append('text')
                .attr('class','axis-label')
                .attr('transform','rotate(-90)')
                .attr('y','-40px')
                .attr('x',-innerHeightFire/2)
                .attr('text-anchor','middle')
                .text('Average Global Temperature (Celcius)')
            g.append('text')
                .attr('class','axis-label')
                .attr('text-anchor','middle')
                .attr('x',innerWidthFire/2)
                .attr('y',innerHeightFire+80)
                .text('Date (1915-2015)')    
        });




