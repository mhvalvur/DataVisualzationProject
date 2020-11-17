      var broadbandData;
      var cellPhoneData;
      var countryData;
      var internetData;
      var computerData;


      var width;
      var height;
      var margin = { top:50, bottom: 50, right: 50, left: 60 };
      var innerWidth;
      var innerHeight;

      var svg;



      // This runs when the page is loaded
      document.addEventListener('DOMContentLoaded', function() {

        svg = d3.select('#scatterSvg');
        width = +svg.style('width').replace('px','');
        height = +svg.style('height').replace('px','');
        innerWidth = width - margin.left - margin.right;
        innerHeight = height - margin.top - margin.bottom;


        // Load both files before doing anything else
        Promise.all([d3.csv('data/broadband_subscribers.csv'),
                     d3.csv('data/cell_phones_total.csv'),
                     d3.csv('data/countries_regions.csv'),
                     d3.csv('data/internet_users.csv'),
                     d3.csv('data/personal_computers_total.csv')])
                .then(function(values){
          
          broadbandData = values[0];
          cellPhoneData = values[1];
          countryData = values[2];
          internetData = values[3];
          computerData = values[4];


          
          drawScatterPlot();
        })

      });


  /*


        broadbandData.foreach(d=>{
        d.country = "Country";

      })
*/

      function getExtent(data) {
        var max = Number.MIN_VALUE;
        var i;
        for(i = 0; i < data.length; i++){
          var currentData = data[i];
          for(var key in currentData) {
            let val = +currentData[key];
            if(val > max)
              max = val;
          }
        }
        console.log(max);
        return max;
    }


      
      //4. Draw the scatterPlot.
      function drawScatterPlot() {

          svg.select('g').remove();

          var xAttrib = d3.select('#column-1-select').property('value');
          var yAttrib = d3.select('#column-2-select').property('value');
          var rAttrib = d3.select('#region-select').property('value');

          var year = document.getElementById("year-input").value;
          var country = "country";

          console.log(year)
          
          //Create our x and y scales.
          if(xAttrib == "Broadband"){
            var xScale = d3.scaleLinear()
                           .domain([0, getExtent(broadbandData)]) // data space
                           .range([0, innerWidth]); // pixel space
          }
          else if(xAttrib == "Cell Phones"){
            var xScale = d3.scaleLinear()
                           .domain([0, getExtent(cellPhoneData)]) // data space
                           .range([0, innerWidth]); // pixel space
          }
          else if(xAttrib == "Internet Percentage"){
            var xScale = d3.scaleLinear()
                           .domain([0, getExtent(internetData)]) // data space
                           .range([0, innerWidth]); // pixel space
          }
          else if(xAttrib == "Personal Computers"){
            var xScale = d3.scaleLinear()
                           .domain([0, getExtent(computerData)]) // data space
                           .range([0, innerWidth]); // pixel space
          }


          if(yAttrib == "Broadband"){
            var yScale = d3.scaleLinear()
                           .domain([0, getExtent(broadbandData)]) // data space
                           .range([innerHeight,0]); // pixel space
          }
          else if(yAttrib == "Cell Phones"){
            var yScale = d3.scaleLinear()
                           .domain([0, getExtent(cellPhoneData)]) // data space
                           .range([innerHeight, 0]); // pixel space
          }
          else if(yAttrib == "Internet Percentage"){
            var yScale = d3.scaleLinear()
                           .domain([0, getExtent(internetData)]) // data space
                           .range([innerHeight, 0]); // pixel space
          }
          else if(yAttrib == "Personal Computers"){
            var yScale = d3.scaleLinear()
                           .domain([0, getExtent(computerData)]) // data space
                           .range([innerHeight, 0]); // pixel space
          }




          var data = d3.zip([broadbandData["2000"], cellPhoneData["2000"]]);






          console.log(data);
          console.log(broadbandData);


          //Make circles for scatterplot
          const g = svg.append('g')
                  .attr('transform', 'translate('+margin.left+', '+margin.top+')');

          g.selectAll('circle')
           .data(data)
           .enter()
           .append('circle')
           //.attr('id', d=>d.geo)
           .attr('cx', d=>xScale(d[0]))
           .attr('cy', d=>yScale(d[1]))
           .attr('r', 5)
           .style('opacity',.6)  
           .style('stroke', 'gray')


          
          //Draw the scatterplot's x and y axes and add label axes
          var yAxis = d3.axisLeft(yScale);
          g.append('g').call(yAxis);
          var xAxis = d3.axisBottom(xScale);
          g.append('g').call(xAxis)
                          .attr('transform',`translate(0,${innerHeight})`)
          g.append('text')
              .attr('x',innerWidth/2)
              .attr('y',innerHeight+40)
              .text(xAttrib);
          g.append('text')
              .attr('transform','rotate(-90)')
              .attr('y','-40px')
              .attr('x',-innerHeight/2)
              .attr('text-anchor','middle')
              .text(yAttrib )
      }






                /*
              //8. Draw the scatter plot circles.
          const g = svg.append('g')
                      .attr('transform', 'translate('+margin.left+', '+margin.top+')');
          g.selectAll('circle')
           .data(broadbandData)
           .enter()
           .append('circle')
           .attr('id', d => d.Name.replaceAll(' ','_'))
           .attr('cx', d => xScale(d[xAttrib]))
           .attr('cy', d => yScale(d[yAttrib]))
           .attr('r',3)
          //  .style('opacity',.6)    // you can uncomment this line to make the points semi-opaque
           //.style('fill', d => colorScaleManual(d[rAttrib]))
          //  .style('fill', d => colorScaleProvided(d[cAttrib]))
           .style('stroke','gray');
          */

