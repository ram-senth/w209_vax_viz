import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./450051d7f1174df8@255.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Vaccination Coverage`
)}

function _year(Scrubber,years){return(
Scrubber(years, {
  initial: years + 1,
  autoplay: true,
  delay: 2000,
  default: 1997
})
)}

function _selected_vaccine(select){return(
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

function _chart(d3,year_filtered_data1,Legend,year,largest,smallest,countries,callout,tooltip_string,countrymesh)
{
  // Specify the chart’s dimensions.
  const width = 1200;
  const marginTop = 46;
  const height = 700 + marginTop;

  // Fit the projection.
  const projection = d3.geoEqualEarth().fitExtent(
    [
      [2, marginTop],
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

  const country_color = (d) => {
    if (
      valuemap.get(d.properties.name) == undefined ||
      valuemap.get(d.properties.name) > 100
    ) {
      return "#F5E050";
    } else {
      return color(valuemap.get(d.properties.name));
    }
  };

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: 680;");

  // Append the legend.
  svg
    .append("g")
    .attr("transform", "translate(300,0)")
    .append(() =>
      Legend(color, {
        title: `% Vaccination Coverage for ${year}`,
        style: "28px",
        width: 260
      })
    );

  const legend = svg.append("g").attr("transform", "translate(650,10)");

  const size = 10;
  const border_padding = 8;
  const item_padding = 2;
  const text_offset = 2;

  svg
    .append("g")
    .selectAll("rect")
    .data(largest)
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
    .data(largest)
    .join("text")
    .text((d) => `Highest: ${d.Country} ${d.ReportedCoverage}%`);

  svg
    .append("g")
    .selectAll("rect")
    .data(smallest)
    .join("rect")
    .attr("x", 645)
    .attr("y", 72)
    .attr("rx", 10)
    .attr("ry", 10)
    .style("fill", "red")
    .style("opacity", "0.5")
    .attr("width", 260)
    .attr("height", 25);

  svg
    .append("g")
    .attr("transform", "translate(650,90)")
    .style("font", "16px sans-serif")
    .style("fill", "black")
    .selectAll("text")
    .data(smallest)
    .join("text")
    .text((d) => `Lowest: ${d.Country} ${d.ReportedCoverage}%`);

  // Boxes
  legend
    .selectAll("box")
    .data([year])
    .enter()
    .append("rect")
    .attr("x", border_padding)
    .attr("y", (d, i) => border_padding + i * (size + item_padding))
    .attr("width", size)
    .attr("height", size)
    .style("fill", "#F5E050");
  legend
    .selectAll("labels")
    .data(["Not Reported / Coverage>100%"])
    .enter()
    .append("text")
    .attr("x", border_padding + size + item_padding)
    .attr(
      "y",
      (d, i) =>
        border_padding + i * (size + item_padding) + size / 2 + text_offset
    )
    .text((d) => d)
    .attr("text-anchor", "left")
    .style("font-size", "14px")
    .style("alignment-baseline", "middle");

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
    .attr("fill", country_color)
    .attr("d", path)
    .on("touchmove mousemove", function (event, d) {
      d3.select(this).attr("stroke", "black").attr("stroke-width", 2.8).raise();
      tooltip.raise();
      const [x, y] = d3.pointer(event);
      tooltip
        .attr("transform", `translate(${x}, ${y + 10})`)
        .call(callout, tooltip_string(d));
    })
    .on("touchend mouseleave", function (event, d) {
      // tooltip.call(callout, null);
      d3.select(this).attr("stroke", null).lower();
    })
    .append("title")
    .text((d) => `${d.properties.name}\n${valuemap.get(d.properties.name)}`);

  //const max_coverage = valuemap.
  // Add a white mesh.
  svg
    .append("path")
    .datum(countrymesh)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("d", path);

  const tooltip = svg.append("g").attr("class", "tooltip");

  return svg.node();
}


function _largest(d3,year_filtered_data1){return(
d3
  .sort(
    d3.filter(
      year_filtered_data1,
      (d) => (d.ReportedCoverage > 0) & (d.ReportedCoverage <= 100)
    ),
    (a, b) => d3.descending(a.ReportedCoverage, b.ReportedCoverage)
  )
  .slice(0, 1)
)}

function _smallest(d3,year_filtered_data1){return(
d3
  .sort(
    d3.filter(
      year_filtered_data1,
      (d) => (d.ReportedCoverage > 0) & (d.ReportedCoverage <= 100)
    ),
    (a, b) => d3.ascending(a.ReportedCoverage, b.ReportedCoverage)
  )
  .slice(0, 1)
)}

function _valuemap(year_filtered_data1){return(
new Map(
  year_filtered_data1.map((d) => [d.Country, d.ReportedCoverage])
)
)}

function _tooltip_string(valuemap){return(
(d) => {
  const country_name = d.properties.name;

  const coverage =
    valuemap.get(d.properties.name) == undefined
      ? "No Data"
      : `${valuemap.get(d.properties.name)}%`;
  return `${country_name}\n${coverage}`;
}
)}

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

function _countrymap(topojson,world){return(
new Map(
  topojson
    .feature(world, world.objects.countries)
    .features.map((d) => [d.properties.name, d])
)
)}

function _year_filtered_data1(newdata1,year){return(
newdata1.filter((d) => d.Year == year)
)}

function _newdata1(cov_data,selected_vaccine){return(
cov_data.filter((d) => d.Vaccine == selected_vaccine)
)}

function _cov_data(FileAttachment){return(
FileAttachment("reported_coverage_2022_final@2.csv").csv({
  typed: true
})
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
    ["reported_coverage_2022_final@2.csv", {url: new URL("./files/49ba092b5dd9fad0e2b5f07e44d05ccca3101b866a2e86fdd2e8859e62b126292876cb48f893296ddf996767780b413070c09d85060c56e9d74c308aaeead3f4.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof year")).define("viewof year", ["Scrubber","years"], _year);
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer("viewof selected_vaccine")).define("viewof selected_vaccine", ["select"], _selected_vaccine);
  main.variable(observer("selected_vaccine")).define("selected_vaccine", ["Generators", "viewof selected_vaccine"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","year_filtered_data1","Legend","year","largest","smallest","countries","callout","tooltip_string","countrymesh"], _chart);
  main.variable(observer("largest")).define("largest", ["d3","year_filtered_data1"], _largest);
  main.variable(observer("smallest")).define("smallest", ["d3","year_filtered_data1"], _smallest);
  main.variable(observer("valuemap")).define("valuemap", ["year_filtered_data1"], _valuemap);
  main.variable(observer("tooltip_string")).define("tooltip_string", ["valuemap"], _tooltip_string);
  main.variable(observer("format")).define("format", _format);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("countrymap")).define("countrymap", ["topojson","world"], _countrymap);
  main.variable(observer("year_filtered_data1")).define("year_filtered_data1", ["newdata1","year"], _year_filtered_data1);
  main.variable(observer("newdata1")).define("newdata1", ["cov_data","selected_vaccine"], _newdata1);
  main.variable(observer("cov_data")).define("cov_data", ["FileAttachment"], _cov_data);
  main.variable(observer("years")).define("years", ["d3"], _years);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("countries")).define("countries", ["topojson","world"], _countries);
  main.variable(observer("countrymesh")).define("countrymesh", ["topojson","world"], _countrymesh);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.import("Swatches", child1);
  const child2 = runtime.module(define2);
  main.import("Scrubber", child2);
  const child3 = runtime.module(define3);
  main.import("slider", child3);
  main.import("select", child3);
  return main;
}
