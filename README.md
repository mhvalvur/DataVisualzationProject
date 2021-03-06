Climate Change: Earth Surface Temperature Since 1750

Dina Bataq
Jacob Schmit
Markus Valvur
![image](https://user-images.githubusercontent.com/70309988/101234748-330a6d80-367f-11eb-8407-ddbf7db57d5b.png)

For this project, we used a Kaggle dataset titled Climate Change: Earth Surface Temperature. The data contained five different sets of data but we chose to go with three .csv files only. The team decided to present the data using three visualizations techniques; Map, Bar Chart and a Fire Bar Chart. The project displays the world map first as a main visualization which has a very interesting feature to represent the data in addition to giving the user the ability to change the colors of the map, the month, and the year. There is a tooltip that displays the average temperature for the country actively hovered over with the cursor. The second visualization is displayed after the user clicks on any country in the world map. The bar chart displays the top five major cities in the world that have the most climate change. The final visualization is the fire chart which starts an animation of changing colors based on the average world temperature during the specified year.

Data description

The data that was used for this project is hosted in tables, organized by attributes and items. It is ordered data, and quantitative in nature meaning that arithmetic is possible (items are typically decimal values). It is also static, meaning that everything is preloaded prior to the creation of the visualizations, and there is no dynamic change in the data. The cardinality for the date attribute is the year 1750 to 2016, and for the temperature attribute -25℃ to 45℃. Our visualizations transform the data by creating derived data, by either splicing sections from the set or doing arithmetic to find average increases over time.
https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data

Goals and Tasks

  The task was to portray temperature data from different sections of the Earth as honestly and accurately as possible. The domain would be the general population that is concerned or at least interested in climate change. These are the potential users, and they will want to view a visualization that succinctly describes the reality of temperate change over the last few hundred years.
  
Idioms

  The interface is essentially three data visualizations resulting from climate change data. The implemented visualizations were a map, a bar chart, and a fire bar chart. With regards to the map, the choice was to have the ability to select the year of data that the user wishes to see as well as the color. These were chosen because they are nice aspects for the user to be able to interact with. The main reason for the choice in year was such that the user could easily look at fragments of the data (year) and easily visualize the climate change in the areas globally. Selecting a country would then prompt our second visualization of a bar chart. This chart would display the top 5 major cities with the largest increases in temperature. This decision was based on having a sort of baseline for what cities are truly being impacted the most by climate change. Lastly, a button from the bar chart would then open up the fire bar chart. The fire bar chart would show the average temperature globally over a 100 year period. In the fire bar chart, there are color variations based on the temperature value as well as a constantly changing tone of these colors. The purpose of the color/color change was to make the bar chart have the appearance of a burning flame, which supports the idea of temperature increases globally. The data for each of the visualizations comes from the same database, however, the data shown in each slightly differs in that the map shows the temperature by country, the bar chart shows the temperature by major city, and the fire chart uses the global average temperature. The algorithms we employed were the d3 visualization algorithms that we have learned from lectures and assignments.

Reflection

  For this project, the team proposed three views to display the climate change dataset (The map, The Bar chart, and The fire chart). The goal  was to have these three views complete as a final project, we tried our best to stick to the plan as much as possible. By the time of work in progress, we had a complete prototype of the project with some of the features already completed. While working toward the final product, we encountered a couple problems and challenges such as adding the interaction between the views and the fire chart was not doing what it was supposed to do. There was some feature that the team wanted to implement in one of the views but it just did not work, so we found an alternative way of implementing the feature in a different way. However,  the team managed to meet and discuss how to have the interaction implemented between the view which ended it up with a success. By the time of the presentation, the final product was developed and ready to be presented. 

Team workload

-Map Visualization: This task was assigned to Dina. Dina was responsible for the entire visualization and it was completed by the due date. 

-Adding the interaction between the map and the bar chart: This task was assigned to Dina and it was completed before the due date.

-Bar Chart: This task was assigned to Jacob and it was completed by the due date.

-Adding the interaction between the Bar Chart and the Fire Chart: This task task was assigned to Jacob and it was completed by the due date.

-Fire Chart: This task was assigned to Markus and it was completed by the due date.

-Putting the whole project together: This task was assigned to Jacob. Jacob put the three visualizations together in one project. 

-Communications: The team used WhatsApp to communicate through the entire time of the project in addition to having couple meetings to discuss the data and the visualization we liked to present.
