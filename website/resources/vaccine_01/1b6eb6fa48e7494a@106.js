import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./450051d7f1174df8@255.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Vaccination Coverage`
)}

function _year(slider)
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


function _selected_vaccine(select){return(
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

function _chart(d3,year_filtered_data1,Legend,countries,countrymesh,callout)
{
  // Specify the chart’s dimensions.
  const width = 1200;
  const marginTop = 46;
  const height = (width - 200) / 2 + marginTop;

  // Fit the projection.
  const projection = d3.geoEqualEarth().fitExtent(
    [
      [2, marginTop + 2],
      [width, height]
    ],
    { type: "Sphere" }
  );
  const path = d3.geoPath(projection);

  // Index the values and create the color scale.
  const valuemap = new Map(
    year_filtered_data1.map((d) => [d.Country, d.ReportedCoverage])
  );
  const color = d3.scaleSequential(
    d3.extent(valuemap.values()),
    d3.interpolatePuBuGn
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
        title: "Percentage Vaccination Coverage",
        width: 260
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
        `${year_filtered_data1.get(d.Vaccine)}
${d3.format(".2f")(year_filtered_data1.get(d.ReportedCoverage))}, ${
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
(d) => `${"0.2f"}`
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

function _year_filtered_data1(newdata1,year){return(
newdata1.filter((d) => d.Year == year)
)}

function _newdata1(cov_data,selected_vaccine){return(
cov_data.filter((d) => d.Vaccine == selected_vaccine)
)}

function _cov_data(FileAttachment){return(
FileAttachment("reported_coverage_final.csv").csv({ typed: true })
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
    ["reported_coverage_final.csv", {url: new URL("./files/bf72149a74e198d18c14bd3b07e70f599363c4488a1fd0dee7fc5f9a65a3504bd0ce575f453451b87a92d5a2bd7214c2d2b40fdaea80479bd970eb5c9ba76302.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["countries-50m.json", {url: new URL("./files/f4afb2d49f0b38843f6d74521b33d41f371246e1acd674ed78016dca816cb1d262b7c54b95d395a4dad7fba5d58ed19db2944698360d19483399c79565806794.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof year")).define("viewof year", ["slider"], _year);
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer("viewof selected_vaccine")).define("viewof selected_vaccine", ["select"], _selected_vaccine);
  main.variable(observer("selected_vaccine")).define("selected_vaccine", ["Generators", "viewof selected_vaccine"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","year_filtered_data1","Legend","countries","countrymesh","callout"], _chart);
  main.variable(observer("format")).define("format", _format);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("year_filtered_data1")).define("year_filtered_data1", ["newdata1","year"], _year_filtered_data1);
  main.variable(observer("newdata1")).define("newdata1", ["cov_data","selected_vaccine"], _newdata1);
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
