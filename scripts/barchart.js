
        const svg = d3.select('#barchartSvg');
        const width = 1000;
        const heightBar = 600;

        const marginBar = { top:40, bottom: 90, right: 20, left: 80 };
        const innerWidth = width - marginBar.left - marginBar.right;
        const innerHeight = heightBar - marginBar.top - marginBar.bottom;
        




        d3.csv('data/GlobalLandTemperaturesByMajorCity.csv').then(data => {
            // console.log(data);

            data.sort(function(a,b) {
                return +b["Sorted Temperature"] - +a["Sorted Temperature"];
            });

            data = data.slice(0,10);


            data.forEach(d => {
                d.population = +d["Sorted Temperature"];
                d.country = d["Sorted City"];
            });


            const xScale = d3.scaleLinear()
                                .domain([0, d3.max(data, function(d) {  return d.population; })]) // data space
                                .range([0,innerWidth]); // pixel space
            const yScale = d3.scaleBand()
                                .domain(data.map(function(d) { return d.country;}))
                                .range([0,innerHeight])
                                .padding(0.1);


            const g = svg.append('g')
                        // .attr('transform', `translate(${margin.left}, ${margin.top})`);
                        .attr('transform', 'translate('+marginBar.left+', '+marginBar.top+')');

            var barchart = g.selectAll('rect')
                            .data(data)
                            .enter()
                            .append('rect')
                            .attr('y', d => yScale(d.country))
                            .attr('height',yScale.bandwidth())
                            .attr('width', function(d) {
                                return  xScale(d.population);
                            })

                            .style("fill", "#e25822");
                            

            const yAxis = d3.axisLeft(yScale);
            g.append('g').call(yAxis)
                .style("font", "14px times");
                         //.selectAll('.domain, .tick line').remove();

            

            //Probably change units here           
            const xAxisTickFormat = function(d) { 

                    return d3.format('.3s')(d)
            }
            const xAxis = d3.axisBottom(xScale)
                            //.tickFormat(xAxisTickFormat)
                            .tickSize(-innerHeight);                
            var gXAxis = g.append('g').call(xAxis);
            // remove the x-axis line 
            gXAxis.selectAll('.domain').remove();                   
            gXAxis.attr('transform',`translate(0,${innerHeight})`)
                            .selectAll("text")                   
                                .style("text-anchor", "end")
                                .style("font-size", "25px")     
                                .attr("dx", "-10px")             
                                .attr("dy", "0px")               
                                .attr("transform", "rotate(-45)" );
            
            
            g.append('text')
                .attr('class','axis-label')
                .attr('text-anchor','middle')
                .attr('x',innerWidth/2)
                .attr('y',innerHeight+70)
                .text('Degrees Celsius')    
            g.append('text')
                .attr('class','title')
                .attr('y',-10)
                .text('Average Temperature Increase 1910 to 2010, Worlds Most Populous Cities');


        });

