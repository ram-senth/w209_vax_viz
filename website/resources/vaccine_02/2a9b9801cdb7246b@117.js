import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./450051d7f1174df8@255.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Absolute Number of Vaccinated Children`
)}

function _year2(slider)
{
  const s = slider({
    min: 1997,
    max: 2021,
    step: 1,
    title: "select year (1997-2021)"
  });
  s.querySelector("input").style.width = "30%";
  return s;
}


function _selected_vaccine2(select){return(
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

function _chart2(d3,year_filtered_data,Legend,countries,countrymesh,callout,format)
{
  // Specify the chart’s dimensions.
  const width = 1200;
  const marginTop = 46;
  const height = (width - 200) / 2 + marginTop;

  // Fit the projection.
  const projection = d3.geoEqualEarth().fitExtent(
    [
      [2, marginTop + 2],
      [width - 2, height]
    ],
    { type: "Sphere" }
  );
  const path = d3.geoPath(projection);

  // Index the values and create the color scale.
  const valuemap = new Map(
    year_filtered_data.map((d) => [d.Country, d.ChildrenVaccinated])
  );
  const color = d3.scaleSequential(
    d3.extent(valuemap.values()),
    d3.interpolateWarm
  );

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Append the legend.
  svg
    .append("g")
    .attr("transform", "translate(20,0)")
    .append(() =>
      Legend(color, {
        title: "Absolute Number of Vaccinated Children",
        width: 260,
        tickFormat: "K"
      })
    );

  // Add a white sphere with a black border.
  svg
    .append("path")
    .datum({ type: "Sphere" })
    .attr("fill", "white")
    .attr("stroke", "currentColor")
    .attr("d", path);

  // Add a path for each country and color it according te this data.
  svg
    .append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("fill", (d) => color(valuemap.get(d.properties.name)))
    .attr("d", path)
    .append("title")
    .text((d) => `${d.properties.name}\n${valuemap.get(d.properties.name)}`);

  // Add a white mesh.
  svg
    .append("path")
    .datum(countrymesh)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("d", path);

  const tooltip = svg.append("g");

  svg
    .selectAll(".country")
    .on("touchmove mousemove", function (event, d) {
      tooltip.call(
        callout,
        `${year_filtered_data.get(d.Vaccine)}
${format(year_filtered_data.get(d.ChildrenVaccinated))}, ${
          countries.get(d.id.slice(0, 2)).name
        }`
      );
      tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
      d3.select(this).attr("stroke", "red").raise();
    })
    .on("touchend mouseleave", function () {
      tooltip.call(callout, null);
      d3.select(this).attr("stroke", null).lower();
    });

  return svg.node();
}


function _format(){return(
(d) => `${"~s"}`
)}

function _callout(){return(
(g, value) => {
  if (!value) return g.style("display", "none");

  g.style("display", null)
    .style("pointer-events", "none")
    .style("font", "10px sans-serif");

  const path = g
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("fill", "#b2d8d8")
    .attr("stroke", "#004C4C");

  const text = g
    .selectAll("text")
    .data([null])
    .join("text")
    .call((text) =>
      text
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .text((d) => d)
    );

  const { x, y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr(
    "d",
    `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
  );
}
)}

function _year_filtered_data(newdata,year2){return(
newdata.filter((d) => d.Year == year2)
)}

function _newdata(cov_data,selected_vaccine2){return(
cov_data.filter((d) => d.Vaccine == selected_vaccine2)
)}

function _cov_data(FileAttachment){return(
FileAttachment("abs_number_final@2.csv").csv({ typed: true })
)}

function _years(d3){return(
d3.range(1997, 2022, 1)
)}

function _world(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)}

function _countries(topojson,world){return(
topojson.feature(world, world.objects.countries)
)}

function _countrymesh(topojson,world){return(
topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/f4afb2d49f0b38843f6d74521b33d41f371246e1acd674ed78016dca816cb1d262b7c54b95d395a4dad7fba5d58ed19db2944698360d19483399c79565806794.json", import.meta.url), mimeType: "application/json", toString}],
    ["abs_number_final@2.csv", {url: new URL("./files/84b06ecb77503ea3af80bfc181895403453a07557455e5e86fb4a154c1a8bfbcd2472d3f25cb8298b06bb21aad7fcf57e6eab080e39739011e1c3db453ce8571.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof year2")).define("viewof year2", ["slider"], _year2);
  main.variable(observer("year2")).define("year2", ["Generators", "viewof year2"], (G, _) => G.input(_));
  main.variable(observer("viewof selected_vaccine2")).define("viewof selected_vaccine2", ["select"], _selected_vaccine2);
  main.variable(observer("selected_vaccine2")).define("selected_vaccine2", ["Generators", "viewof selected_vaccine2"], (G, _) => G.input(_));
  main.variable(observer("chart2")).define("chart2", ["d3","year_filtered_data","Legend","countries","countrymesh","callout","format"], _chart2);
  main.variable(observer("format")).define("format", _format);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("year_filtered_data")).define("year_filtered_data", ["newdata","year2"], _year_filtered_data);
  main.variable(observer("newdata")).define("newdata", ["cov_data","selected_vaccine2"], _newdata);
  main.variable(observer("cov_data")).define("cov_data", ["FileAttachment"], _cov_data);
  main.variable(observer("years")).define("years", ["d3"], _years);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("countries")).define("countries", ["topojson","world"], _countries);
  main.variable(observer("countrymesh")).define("countrymesh", ["topojson","world"], _countrymesh);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  const child2 = runtime.module(define2);
  main.import("Scrubber", child2);
  const child3 = runtime.module(define3);
  main.import("slider", child3);
  main.import("select", child3);
  return main;
}
