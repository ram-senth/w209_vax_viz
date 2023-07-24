import define1 from "./a33468b95d0b15b0@808.js";

function _title(md){return(
md`### Polio cases and deaths in the US in 1900s`
)}

function _leg(swatches,color){return(
swatches({ color })
)}

function _svg(d3,width,height,margin,x,y,groupedData,line2,color,events_data,counts_array)
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g")
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`);

  g.append("g").call(d3.axisLeft(y));

  g.selectAll(".line")
    .data(groupedData)
    .join("path")
    .attr("class", "line")
    .attr("d", (group) => line2(group[1]))
    .style("fill", "none")
    .style("stroke", (group) => color(group[0]))
    .style("stroke-width", 4);

  g.append("line") // attach a line
    .style("stroke", "gray") // colour the line
    .style("stroke-width", "2") // colour the line
    .style("stroke-dasharray", "6, 3") // <== This line here!!
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("x1", x(events_data[0]["Year"])) // x position of the first end of the line
    .attr("y1", y(20)) // y position of the first end of the line
    .attr("x2", x(events_data[0]["Year"])) // x position of the second end of the line
    .attr("y2", y(d3.max(counts_array)));

  g.append("line") // attach a line
    .style("stroke", "gray") // colour the line
    .style("stroke-width", "2") // colour the line
    .style("stroke-dasharray", "6, 3") // <== This line here!!
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("x1", x(events_data[1]["Year"])) // x position of the first end of the line
    .attr("y1", y(20)) // y position of the first end of the line
    .attr("x2", x(events_data[1]["Year"])) // x position of the second end of the line
    .attr("y2", y(d3.max(counts_array)));

  g.append("line") // attach a line
    .style("stroke", "gray") // colour the line
    .style("stroke-width", "2") // colour the line
    .style("stroke-dasharray", "6, 3") // <== This line here!!
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("x1", x(events_data[2]["Year"])) // x position of the first end of the line
    .attr("y1", y(20)) // y position of the first end of the line
    .attr("x2", x(events_data[2]["Year"])) // x position of the second end of the line
    .attr("y2", y(d3.max(counts_array)));

  g.append("line") // attach a line
    .style("stroke", "gray") // colour the line
    .style("stroke-width", "2") // colour the line
    .style("stroke-dasharray", "6, 3") // <== This line here!!
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("x1", x(events_data[3]["Year"])) // x position of the first end of the line
    .attr("y1", y(20)) // y position of the first end of the line
    .attr("x2", x(events_data[3]["Year"])) // x position of the second end of the line
    .attr("y2", y(d3.max(counts_array)));

  g.append("line") // attach a line
    .style("stroke", "gray") // colour the line
    .style("stroke-width", "2") // colour the line
    .style("stroke-dasharray", "6, 3") // <== This line here!!
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("x1", x(events_data[4]["Year"])) // x position of the first end of the line
    .attr("y1", y(20)) // y position of the first end of the line
    .attr("x2", x(events_data[4]["Year"])) // x position of the second end of the line
    .attr("y2", y(d3.max(counts_array)));

  g.append("line") // attach a line
    .style("stroke", "gray") // colour the line
    .style("stroke-width", "2") // colour the line
    .style("stroke-dasharray", "6, 3") // <== This line here!!
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("x1", x(events_data[6]["Year"])) // x position of the first end of the line
    .attr("y1", y(20)) // y position of the first end of the line
    .attr("x2", x(events_data[6]["Year"])) // x position of the second end of the line
    .attr("y2", y(d3.max(counts_array)));

  g.append("text")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("y", y(d3.max(counts_array))) //magic number here
    .attr("x", x(events_data[0]["Year"]) + 5)
    .attr("text-anchor", "right")
    .attr("font-size", 12)
    .attr("font-weight", "bold")
    .text(events_data[0]["Event"]);

  g.append("text")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("y", y(d3.max(counts_array)) + 30) //magic number here
    .attr("x", x(events_data[1]["Year"]) + 5)
    .attr("text-anchor", "right")
    .attr("font-size", 12)
    .attr("font-weight", "bold")
    .text(events_data[1]["Event"]);

  g.append("text")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("y", y(d3.max(counts_array)) + 60) //magic number here
    .attr("x", x(events_data[2]["Year"]) + 5)
    .attr("text-anchor", "right")
    .attr("font-size", 12)
    .attr("font-weight", "bold")
    .text(events_data[2]["Event"]);

  g.append("text")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("y", y(d3.max(counts_array)) + 90) //magic number here
    .attr("x", x(events_data[3]["Year"]) + 5)
    .attr("text-anchor", "right")
    .attr("font-size", 12)
    .attr("font-weight", "bold")
    .text(events_data[3]["Event"]);

  g.append("text")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("y", y(d3.max(counts_array)) + 120) //magic number here
    .attr("x", x(events_data[4]["Year"]) + 5)
    .attr("text-anchor", "right")
    .attr("font-size", 12)
    .attr("font-weight", "bold")
    .text(events_data[4]["Event"]);

  g.append("text")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("y", y(d3.max(counts_array)) + 150) //magic number here
    .attr("x", x(events_data[6]["Year"]) + 5)
    .attr("text-anchor", "right")
    .attr("font-size", 12)
    .attr("font-weight", "bold")
    .text(events_data[6]["Event"]);

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Cases and Deaths in the US in 1900s");

  // svg
  //   .attr("transform", "translate(60, 70)") // appending a G so you can easily position it
  //   .append(() => swatches({ color }));

  return svg.node();
}


function _counts_array(data){return(
Array.from(new Set(data.map((d) => d.Count)).values())
)}

function _groupedData(d3,data){return(
d3.groups(data, (d) => d.case_type)
)}

function _line2(d3,x,y){return(
d3
  .line()
  .x(function (d) {
    return x(d.Year);
  })
  .y(function (d) {
    return y(d.Count);
  })
)}

function _x(d3,data,width,margin){return(
d3
  .scaleTime()
  .domain(d3.extent(data, (d) => d.Year))
  .range([0, width - margin.left - margin.right])
)}

function _y(d3,data,height,margin){return(
d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.Count))
  .range([height - margin.top - margin.bottom, 0])
)}

function _height(){return(
500
)}

function _margin(){return(
{ left: 50, top: 50, right: 70, bottom: 50 }
)}

function _color(d3){return(
d3.scaleOrdinal(d3.schemeSet2)
)}

function _events_data(events,date_converter){return(
events.map((d) => ((d.Year = date_converter(+d.Year)), d))
)}

function _data(cases,date_converter){return(
cases.map(
  (d) => ((d.Year = date_converter(+d.Year)), (d.Count = +d.Count), d)
)
)}

function _date_converter(d3){return(
d3.timeParse("%Y")
)}

function _events(FileAttachment){return(
FileAttachment("polio_events_v1.csv").csv()
)}

function _cases(FileAttachment){return(
FileAttachment("US_polio_cases_deaths@1.csv").csv()
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["US_polio_cases_deaths@1.csv", {url: new URL("./files/a98139b4f6b014263ac6bd39b4e69f62c3a626a39f09235d7ed7cfe0c9fd12e187a8f688658e3086be40948f0d0c4760396d502bed37a7a97daa7c06f2552522.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["polio_events_v1.csv", {url: new URL("./files/bc0f74c365032e1074ed901641c5c75134cd48d8df8e764f8c212e7440175120ee9eec9635bda20c86dcb5b6e58903f0e580bb425f44c5ad0fd92d0c8586d46d.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("leg")).define("leg", ["swatches","color"], _leg);
  main.variable(observer("svg")).define("svg", ["d3","width","height","margin","x","y","groupedData","line2","color","events_data","counts_array"], _svg);
  main.variable(observer("counts_array")).define("counts_array", ["data"], _counts_array);
  main.variable(observer("groupedData")).define("groupedData", ["d3","data"], _groupedData);
  main.variable(observer("line2")).define("line2", ["d3","x","y"], _line2);
  main.variable(observer("x")).define("x", ["d3","data","width","margin"], _x);
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("events_data")).define("events_data", ["events","date_converter"], _events_data);
  main.variable(observer("data")).define("data", ["cases","date_converter"], _data);
  main.variable(observer("date_converter")).define("date_converter", ["d3"], _date_converter);
  main.variable(observer("events")).define("events", ["FileAttachment"], _events);
  main.variable(observer("cases")).define("cases", ["FileAttachment"], _cases);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("swatches", child1);
  return main;
}
