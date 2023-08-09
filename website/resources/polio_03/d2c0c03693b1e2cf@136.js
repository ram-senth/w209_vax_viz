import define1 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# Choropleth - v2`
)}

function _title(md){return(
md`### Last decades of Polio around the world`
)}

function _chart(valuemap,d3,legend,countries,callout,tooltip_string,countrymesh)
{
  const country_color = (d) => {
    if (valuemap.get(d.properties.name) == undefined) {
      return "lightgray";
    } else {
      return color(valuemap.get(d.properties.name));
    }
  };

  const color = d3.scaleQuantize(
    [1950, 2030],
    [
      "#9e0142",
      "#d53e4f",
      "#f46d43",
      "#fdae61",
      "#fee08b",
      "#ffffbf",
      "#e6f598",
      "#abdda4",
      "#66c2a5"
    ].reverse()
  );

  const path = d3.geoPath(d3.geoEqualEarth());
  const format = (d) => `${d}`;

  const svg = d3
    .create("svg")
    .attr("width", 1275)
    .attr("height", 500)
    .attr("viewBox", [0, 0, 1275, 500])
    .attr("style", "max-width: 100%; height: auto;");

  svg
    .append("g")
    .attr("transform", "translate(550, 400)")
    .append(() => legend);

  svg
    .append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("fill", country_color)
    .attr("d", path)
    .on("touchmove mousemove", function (event, d) {
      // if (d.properties.name != "Antarctica") {
      d3.select(this).attr("stroke", "black").attr("stroke-width", 3).raise();
      tooltip.raise();
      const [x, y] = d3.pointer(event);
      tooltip
        .attr("transform", `translate(${x}, ${y + 10})`)
        .call(callout, tooltip_string(d));
      // }
    })
    .on("touchend mouseleave", function (event, d) {
      tooltip.call(callout, null);
      d3.select(this).attr("stroke", null).lower();
    });
  // .append("title")
  // .text((d) => `${d.properties.name}, \n${titlemap.get(d.properties.name)}`);

  svg
    .append("path")
    .datum(countrymesh)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

  const tooltip = svg.append("g").attr("class", "tooltip");

  return svg.node();
}


function _colorsArray(){return(
[
      "#9e0142",
      "#d53e4f",
      "#f46d43",
      "#fdae61",
      "#fee08b",
      "#ffffbf",
      "#e6f598",
      "#abdda4",
      "#66c2a5"
    ].reverse()
)}

function _valuemap(hale){return(
new Map(hale.map((d) => [d.Country, d.Value]))
)}

function _titlemap(hale){return(
new Map(hale.map((d) => [d.Country, d.Decade]))
)}

function _tooltip_string(valuemap,titlemap){return(
(d) => {
  const country_name = d.properties.name;

  const decade =
    valuemap.get(d.properties.name) == undefined
      ? "No Data"
      : titlemap.get(d.properties.name);
  return `${country_name}\n${decade}`;
}
)}

function _legend(Legend,d3,colorsArray){return(
Legend(
  d3.scaleOrdinal(
    [
      "1950s",
      "1960s",
      "1970s",
      "1980s",
      "1990s",
      "2000s",
      "2010s",
      "Affected",
      "Endemic"
    ],
    colorsArray
  ),
  {
    title: "Last decades of Polio",
    tickSize: 0,
    width: 500,
    height: 50
  }
)
)}

function _countries(topojson,world){return(
topojson.feature(world, world.objects.countries)
)}

function _countrymesh(topojson,world){return(
topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
)}

function _world(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)}

function _rename(){return(
new Map([
  ["Madagascar(Malagasy)", "Madagascar"],
  ["Germany Fed. Republic", "Germany"],
  ["Antigua and Barbuda", "Antigua and Barb."],
  ["Bolivia (Plurinational State of)", "Bolivia"],
  ["Bosnia and Herzegovina", "Bosnia and Herz."],
  ["Brunei Darussalam", "Brunei"],
  ["RepublicofSouthAfrica", "South Africa"],
  ["IvoryCoast", "Côte d'Ivoire"],
  ["Cote d'Ivoire", "Côte d'Ivoire"],
  ["Central African Republic", "Central African Rep."],
  ["Cook Islands", "Cook Is."],
  ["Democratic Republic of Congo", "Dem. Rep. Congo"],
  ["PapuaNewGuinea", "Papua New Guinea"],
  ["Myanmar(Burma)", "Myanmar"],
  ["SriLanka", "Sri Lanka"],
  ["Democratic People's Republic of Korea", "North Korea"],
  ["Yemen(Sana)", "Yemen"],
  ["Dominican Republic", "Dominican Rep."],
  ["EquatorialGuinea", "Eq. Guinea"],
  ["CostaRica", "Costa Rica"],
  ["Iran", "Iran"],
  ["Laos", "Laos"],
  ["MarshallIslands", "Marshall Is."],
  ["BurkinaFaso", "Burkina Faso"],
  ["CentralAfricanRepublic", "Central African Rep."],
  ["MicronesiaFederatedStates", "Micronesia"],
  ["Republic of Korea", "South Korea"],
  ["NewZealand", "New Zealand"],
  ["Moldova", "Moldova"],
  ["Russia", "Russia"],
  ["Saint Kitts and Nevis", "St. Kitts and Nevis"],
  ["St.Vincent and The Grenadine", "St. Vin. and Gren."],
  ["SaoTomeandPrincipe", "São Tomé and Principe"],
  ["SolomonIslands", "Solomon Is."],
  ["South Sudan", "S. Sudan"],
  ["Swaziland", "eSwatini"],
  ["Syria", "Syria"],
  ["NewCaledonia", "New Caledonia"],
  ["Macedonia(Skopje)", "Macedonia"],
  ["Tanzania", "Tanzania"],
  ["Venezuela", "Venezuela"],
  ["Vietnam", "Vietnam"],
  ["United States", "United States of America"]
])
)}

async function _hale(FileAttachment,rename,d3){return(
(
  await FileAttachment("polio_by_country-v6.csv").csv({ typed: true })
).map(
  (d) => ({
    Country: rename.get(d.Country) || d.Country,
    Decade: d.Decade,
    Year: d.Year_last_recorded,
    Value: d.Value
  }),
  d3.autoType
)
)}

function _callout(){return(
(g, value) => {
  if (!value) return g.style("display", "none");

  g.style("display", null).style("pointer-events", "none");

  const path = g
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("fill", "white")
    .attr("stroke", "lightgrey")
    .attr("stroke-width", "0.5px");

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

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/f4afb2d49f0b38843f6d74521b33d41f371246e1acd674ed78016dca816cb1d262b7c54b95d395a4dad7fba5d58ed19db2944698360d19483399c79565806794.json", import.meta.url), mimeType: "application/json", toString}],
    ["polio_by_country-v6.csv", {url: new URL("./files/aa4de0f2c765f7866a1818c125dfafc2ba4e688597f879e2e90c0ec9f1e7a0e5b6bf86cda314bc643190e8125f4b4eb7298ee672a243897ebc004ee778688c00.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("chart")).define("chart", ["valuemap","d3","legend","countries","callout","tooltip_string","countrymesh"], _chart);
  main.variable(observer("colorsArray")).define("colorsArray", _colorsArray);
  main.variable(observer("valuemap")).define("valuemap", ["hale"], _valuemap);
  main.variable(observer("titlemap")).define("titlemap", ["hale"], _titlemap);
  main.variable(observer("tooltip_string")).define("tooltip_string", ["valuemap","titlemap"], _tooltip_string);
  main.variable(observer("legend")).define("legend", ["Legend","d3","colorsArray"], _legend);
  main.variable(observer("countries")).define("countries", ["topojson","world"], _countries);
  main.variable(observer("countrymesh")).define("countrymesh", ["topojson","world"], _countrymesh);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("rename")).define("rename", _rename);
  main.variable(observer("hale")).define("hale", ["FileAttachment","rename","d3"], _hale);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
