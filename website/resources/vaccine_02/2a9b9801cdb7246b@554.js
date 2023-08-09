import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./450051d7f1174df8@255.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Absolute Number of Vaccinated Children`
)}

function _year2(Scrubber,years){return(
Scrubber(years, {
  initial: years + 1,
  autoplay: false,
  loop: false,
  delay: 1000,
  initial: 1997
})
)}

function _selected_vaccine2(select){return(
select({
  options: [
    "Overall",
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

function _chart2(year_filtered_data,countrymap,d3,topojson,world,largest1,smallest1,centroid)
{
  // Join the geographic shapes and the population data.
  const width = 1200;
  const marginTop = 46;
  const height = 700 + marginTop;

  const data = year_filtered_data.map((d) => ({
    ...d,
    Country: countrymap.get(d.Country),
    country_name: d.Country
  }));

  // Fit the projection.
  const projection = d3.geoEqualEarth().fitExtent(
    [
      [2, marginTop],
      [width, height]
    ],
    { type: "Sphere" }
  );

  const path = d3.geoPath(projection);

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: 650;");

  svg
    .append("path")
    .datum({ type: "Sphere" })
    .attr("fill", "#d0dfff")
    .attr("stroke", "currentColor")
    .attr("d", path);

  svg
    .append("path")
    .datum(topojson.feature(world, world.objects.countries))
    .attr("fill", "white")
    .attr("d", path);

  svg
    .append("path")
    .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

  svg
    .append("g")
    .attr("transform", "translate(350,40)")
    .style("font", "20px sans-serif")
    .style("align", "centre")
    .style("fill", "black")
    .selectAll("text")
    .data(year_filtered_data)
    .join("text")
    .text((d) => `Absolute Number of Vaccinated Children for year ${d.Year}`);

  svg
    .append("g")
    .selectAll("rect")
    .data(largest1)
    .join("rect")
    .attr("x", 295)
    .attr("y", 72)
    .attr("rx", 10)
    .attr("ry", 10)
    .style("fill", "green")
    .style("opacity", "0.5")
    .attr("width", 280)
    .attr("height", 25);

  svg
    .append("g")
    .attr("transform", "translate(300,90)")
    .style("font", "16px sans-serif")
    .style("align", "centre")
    .style("fill", "black")
    .selectAll("text")
    .data(largest1)
    .join("text")
    .text((d) => `Highest: ${d.Country} ${d.ChildrenVaccinated}`);

  svg
    .append("g")
    .selectAll("rect")
    .data(smallest1)
    .join("rect")
    .attr("x", 605)
    .attr("y", 72)
    .attr("rx", 10)
    .attr("ry", 10)
    .style("fill", "red")
    .style("opacity", "0.5")
    .attr("width", 290)
    .attr("height", 25);

  svg
    .append("g")
    .attr("transform", "translate(610,90)")
    .style("font", "16px sans-serif")
    .style("fill", "black")
    .selectAll("text")
    .data(smallest1)
    .join("text")
    .text((d) => `Lowest: ${d.Country} ${d.ChildrenVaccinated}`);

  // Append the legend.

  // Construct the radius scale.
  const radius = d3.scaleSqrt(
    [0, d3.max(data, (d) => d.ChildrenVaccinated)],
    [0, 50]
  );

  // Construct a path generator

  // Create the legend.
  const legend = svg
    .append("g")
    .attr("fill", "black")
    .attr("transform", "translate(215,608)")
    .attr("text-anchor", "middle")
    .style("font", "10px sans-serif")
    .selectAll()
    .data(radius.ticks(4).slice(1))
    .join("g");

  legend
    .append("circle")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("cy", (d) => -radius(d))
    .attr("r", radius);

  legend
    .append("text")
    .attr("y", (d) => -2 * radius(d))
    .attr("dy", "1.3em")
    .text(radius.tickFormat(4, "s"));

  // Add a circle for each county, with a title (tooltip).
  svg
    .append("g")
    .attr("fill", "brown")
    .attr("fill-opacity", 0.5)
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .selectAll()
    .data(data)
    .join("circle")
    .attr("transform", (d) => `translate(${centroid(d.Country)})`)
    .attr("r", (d) => radius(d.ChildrenVaccinated))
    .append("title")
    .text(
      (d) => `${d.country_name}: 
${d.ChildrenVaccinated}`
    );

  const tooltip = svg.append("g").attr("class", "tooltip");

  return svg.node();
}


function _data(year_filtered_data,countrymap){return(
year_filtered_data.map((d) => ({
  ...d,
  Country: countrymap.get("Côte d'Ivoire")
}))
)}

function _largest1(d3,year_filtered_data){return(
d3
  .sort(
    d3.filter(
      year_filtered_data,
      (d) => (d.ChildrenVaccinated > 0)
    ),
    (a, b) => d3.descending(a.ChildrenVaccinated, b.ChildrenVaccinated)
  )
  .slice(0, 1)
)}

function _smallest1(d3,year_filtered_data){return(
d3
  .sort(
    d3.filter(year_filtered_data, (d) => d.ChildrenVaccinated > 0),
    (a, b) => d3.ascending(a.ChildrenVaccinated, b.ChildrenVaccinated)
  )
  .slice(0, 1)
)}

function _8(valuemap1){return(
valuemap1.delete("C�te d'Ivoire")
)}

function _valuemap1(year_filtered_data){return(
new Map(
  year_filtered_data.map((d) => [d.Country, d.ChildrenVaccinated])
)
)}

function _tooltip_string1(valuemap1){return(
(d) => {
  const country_name = d.properties.name;

  const coverage =
    valuemap1.get(d.properties.name) == undefined
      ? "No Data"
      : `${valuemap1.get(d.properties.name)}`;
  return `${country_name}\n${coverage}`;
}
)}

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
newdata.filter(
  (d) =>
    (d.Year == year2) &
    (d.Country != "C�te d'Ivoire") &
    (d.ChildrenVaccinated != 0)
)
)}

function _newdata(cov_data,selected_vaccine2){return(
cov_data.filter((d) => d.Vaccine == selected_vaccine2)
)}

function _cov_data(FileAttachment){return(
FileAttachment("abs_number_2022_final@3.csv").csv({ typed: true })
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

function _countrymap(topojson,world){return(
new Map(
  topojson
    .feature(world, world.objects.countries)
    .features.map((d) => [d.properties.name, d])
)
)}

function _24(countrymap){return(
countrymap.get("C�te d'Ivoire")
)}

function _features(countrymap,largest1){return(
countrymap.get(largest1[0].Country)
)}

function _width(){return(
1200
)}

function _marginTop(){return(
46
)}

function _height(marginTop){return(
700 + marginTop
)}

function _projection(d3,marginTop,width,height){return(
d3.geoEqualEarth().fitExtent(
    [
      [2, marginTop],
      [width, height]
    ],
    { type: "Sphere" }
  )
)}

function _centroid(d3,projection)
{
  const path = d3.geoPath(projection);
  return (feature) => path.centroid(feature);
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/f4afb2d49f0b38843f6d74521b33d41f371246e1acd674ed78016dca816cb1d262b7c54b95d395a4dad7fba5d58ed19db2944698360d19483399c79565806794.json", import.meta.url), mimeType: "application/json", toString}],
    ["abs_number_2022_final@3.csv", {url: new URL("./files/0e5310c5cf8da1d12dd8ef8ad09cbe27809ed980dc726da70a9693223a70e619642eaddf25de9b7cfb8924959322d9c52eb0a9da5b25611d58f58fee72bc9428.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof year2")).define("viewof year2", ["Scrubber","years"], _year2);
  main.variable(observer("year2")).define("year2", ["Generators", "viewof year2"], (G, _) => G.input(_));
  main.variable(observer("viewof selected_vaccine2")).define("viewof selected_vaccine2", ["select"], _selected_vaccine2);
  main.variable(observer("selected_vaccine2")).define("selected_vaccine2", ["Generators", "viewof selected_vaccine2"], (G, _) => G.input(_));
  main.variable(observer("chart2")).define("chart2", ["year_filtered_data","countrymap","d3","topojson","world","largest1","smallest1","centroid"], _chart2);
  main.variable(observer("data")).define("data", ["year_filtered_data","countrymap"], _data);
  main.variable(observer("largest1")).define("largest1", ["d3","year_filtered_data"], _largest1);
  main.variable(observer("smallest1")).define("smallest1", ["d3","year_filtered_data"], _smallest1);
  main.variable(observer()).define(["valuemap1"], _8);
  main.variable(observer("valuemap1")).define("valuemap1", ["year_filtered_data"], _valuemap1);
  main.variable(observer("tooltip_string1")).define("tooltip_string1", ["valuemap1"], _tooltip_string1);
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
  main.variable(observer("countrymap")).define("countrymap", ["topojson","world"], _countrymap);
  main.variable(observer()).define(["countrymap"], _24);
  main.variable(observer("features")).define("features", ["countrymap","largest1"], _features);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("marginTop")).define("marginTop", _marginTop);
  main.variable(observer("height")).define("height", ["marginTop"], _height);
  main.variable(observer("projection")).define("projection", ["d3","marginTop","width","height"], _projection);
  main.variable(observer("centroid")).define("centroid", ["d3","projection"], _centroid);
  return main;
}
