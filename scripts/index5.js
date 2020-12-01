
        const svg = d3.select('#d3-container');
        const width = +svg.style('width').replace('px','');
        const height = +svg.style('height').replace('px','');

        const margin = { top:20, bottom: 90, right: 20, left: 160 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        d3.csv('GlobalTemperatures.csv').then(data => {
            data = data.slice(1982,3190);

            data.forEach(d => {
                d.date = d["dt"];
                d.temperature = +d["LandAverageTemperature"];
            });
            
            const yScale = d3.scaleLinear()
                .domain([d3.max(data, function(d) {  return d.temperature; }), 0]) 
                .range([0, innerHeight]); 
            const xScale = d3.scaleBand()
                .domain(data.map(function(d) {return d.date;}))
                .range([0, innerWidth]);

            const g = svg.append('g')
                .attr('transform', 'translate('+margin.left+', '+margin.top+')');

            

            var barchart = g.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .style("fill", function(d){
                    if(d.temperature > 10) {return "yellow"}
                    else if(10> d.temperature > 7) {return "orange"};
                    ;
                })
                .attr('y', function(d){return yScale(d.temperature)})
                .attr('height', function(d, i) {
                    return innerHeight - yScale(d.temperature);
                })
                .attr('x', d => xScale(d.date))
                .attr('width',xScale.bandwidth());

            const yAxis = d3.axisLeft(yScale);
            g.append('g').call(yAxis);

            const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(function(d,i){ return !(i%120)}));
            g.append('g').call(xAxis)
                .attr('transform',`translate(0,${innerHeight})`)
                .selectAll("text")                   
                .style("text-anchor", "end")     
                .attr("dx", "-10px")             
                .attr("dy", "0px")               
                .attr("transform", "rotate(-45)" );
            
            g.append('text')
                .attr('class', 'graph-title')
                .attr('text-anchor', 'middle')
                .attr('y', 0)
                .attr('x', innerWidth/2)
                .text('Fire Bar Chart')
            g.append('text')
                .attr('class','axis-label')
                .attr('transform','rotate(-90)')
                .attr('y','-40px')
                .attr('x',-innerHeight/2)
                .attr('text-anchor','middle')
                .text('Average Global Temperature (Celcius)')
            g.append('text')
                .attr('class','axis-label')
                .attr('text-anchor','middle')
                .attr('x',innerWidth/2)
                .attr('y',innerHeight+80)
                .text('Date (1915-2015)')    
        });




