import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Bar-Line Chart

This dual-axis chart compares the number of new passenger cars sold each year (blue bars) to the average fuel efficiency of new passenger cars (by model year, black line). Data: [Bureau of Transportation Statistics](https://www.bts.gov/content/average-fuel-efficiency-us-light-duty-vehicles)`
)}

function _selected_country(select,countries){return(
select({
  options: countries,
  title: "Select Country"
})
)}

function _selected_vaccine3(select){return(
select({
  options: [
    "All",
    "bcg",
    "dtp1",
    "dtp3",
    "hepb3",
    "hepbb",
    "hib3",
    "ipv1",
    "mcv1",
    "mcv2",
    "pcv3",
    "pol3",
    "rcv1",
    "rotac",
    "yfv"
  ],
  title: "Select Vaccine Type"
})
)}

function _chart3(d3,width,height,filtered_by_vaccine,x,y1,line,xAxis,y1Axis,y2Axis,margin)
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  svg
    .append("g")
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.8)
    .selectAll("rect")
    .data(filtered_by_vaccine)
    .join("rect")
    .attr("x", (d) => x(d.Year))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y1(d.ReportedCoverage))
    .attr("height", (d) => y1(0) - y1(d.ReportedCoverage));

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-miterlimit", 1)
    .attr("stroke-width", 3)
    .attr("d", line(filtered_by_vaccine));

  svg
    .append("g")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .selectAll("rect")
    .data(filtered_by_vaccine)
    .join("rect")
    .attr("x", (d) => x(d.Year))
    .attr("width", x.bandwidth())
    .attr("y", 0)
    .attr("height", height)
    .append("title")
    .text(
      (d) => `${d.Year}
${d.ReportedCoverage.toLocaleString("en")} % Reported Coverage
${d.ChildrenVaccinated.toLocaleString("en")} Absolute # Children Vaccinated`
    );

  svg.append("g").call(xAxis);

  svg.append("g").call(y1Axis);

  svg.append("g").call(y2Axis);

  svg
    .append("g")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("% Vaccination Coverage Vs # Vaccinated Children");

  return svg.node();
}


function _filtered_by_vaccine(filtered_by_country,selected_vaccine3){return(
filtered_by_country.filter(
  (d) => d.Vaccine == selected_vaccine3
)
)}

function _filtered_by_country(data,selected_country){return(
data.filter((d) => d.Country == selected_country)
)}

function _countries(d3,data){return(
Array.from(new Set(d3.map(data, (d) => d.Country)))
)}

function _data(FileAttachment){return(
FileAttachment("viz3_final.csv").csv({ typed: true })
)}

function _line(d3,x,y2){return(
d3
  .line()
  .x((d) => x(d.Year) + x.bandwidth() / 2)
  .y((d) => y2(d.ChildrenVaccinated))
)}

function _x(d3,filtered_by_vaccine,margin,width){return(
d3
  .scaleBand()
  .domain(filtered_by_vaccine.map((d) => d.Year))
  .rangeRound([margin.left, width - margin.right])
  .padding(0.1)
)}

function _y1(d3,filtered_by_vaccine,height,margin){return(
d3
  .scaleLinear()
  .domain([0, d3.max(filtered_by_vaccine, (d) => d.ReportedCoverage)])
  .rangeRound([height - margin.bottom, margin.top])
)}

function _y2(d3,filtered_by_vaccine,height,margin){return(
d3
  .scaleLinear()
  .domain(d3.extent(filtered_by_vaccine, (d) => d.ChildrenVaccinated))
  .rangeRound([height - margin.bottom, margin.top])
)}

function _xAxis(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickValues(d3.ticks(...d3.extent(x.domain()), width / 40).filter(v => x(v) !== undefined))
        .tickSizeOuter(0))
)}

function _y1Axis(margin,d3,y1){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .style("color", "steelblue")
    .call(d3.axisLeft(y1).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ % Vaccine Coverage"))
)}

function _y2Axis(width,margin,d3,y2){return(
(g) =>
  g
    .attr("transform", `translate(${width - margin.right},0)`)
    .call(d3.axisRight(y2))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", margin.right)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("↑ # Vaccinated Children")
    )
)}

function _height(){return(
500
)}

function _margin(){return(
{ top: 20, right: 80, bottom: 30, left: 20 }
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["viz3_final.csv", {url: new URL("./files/c379bbe925b302e00702fec2782aefb9f047e973e1559cb372f79d01a37b9bec70188d6930cc41d16bfc457470b1f21d12b07b04ddced5cb747833e6b80b57be.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof selected_country")).define("viewof selected_country", ["select","countries"], _selected_country);
  main.variable(observer("selected_country")).define("selected_country", ["Generators", "viewof selected_country"], (G, _) => G.input(_));
  main.variable(observer("viewof selected_vaccine3")).define("viewof selected_vaccine3", ["select"], _selected_vaccine3);
  main.variable(observer("selected_vaccine3")).define("selected_vaccine3", ["Generators", "viewof selected_vaccine3"], (G, _) => G.input(_));
  main.variable(observer("chart3")).define("chart3", ["d3","width","height","filtered_by_vaccine","x","y1","line","xAxis","y1Axis","y2Axis","margin"], _chart3);
  main.variable(observer("filtered_by_vaccine")).define("filtered_by_vaccine", ["filtered_by_country","selected_vaccine3"], _filtered_by_vaccine);
  main.variable(observer("filtered_by_country")).define("filtered_by_country", ["data","selected_country"], _filtered_by_country);
  main.variable(observer("countries")).define("countries", ["d3","data"], _countries);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("line")).define("line", ["d3","x","y2"], _line);
  main.variable(observer("x")).define("x", ["d3","filtered_by_vaccine","margin","width"], _x);
  main.variable(observer("y1")).define("y1", ["d3","filtered_by_vaccine","height","margin"], _y1);
  main.variable(observer("y2")).define("y2", ["d3","filtered_by_vaccine","height","margin"], _y2);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], _xAxis);
  main.variable(observer("y1Axis")).define("y1Axis", ["margin","d3","y1"], _y1Axis);
  main.variable(observer("y2Axis")).define("y2Axis", ["width","margin","d3","y2"], _y2Axis);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("select", child1);
  return main;
}
