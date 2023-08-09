function _title(md){return(
md`### Countries with the highest number of Vaccine derived Polio cases and lowest vax rates`
)}

function _common_countries(){return(
["Central African Republic", "Papua New Guinea", "Somalia", "Chad", "Guinea", "Angola", "Nigeria", "South Sudan", "Yemen", "Madagascar", "Mali", "Ethiopia", "Afghanistan", "Congo", "Pakistan"]
)}

function _chart(d3,width,height,common_countries)
{
  var dummy = [
    ["Central African Republic", 45.5, "Nigeria", 50],
    ["Papua New Guinea", 46, "Afghanistan", 33],
    ["Somalia", 47, "Congo", 24],
    ["Chad", 48, "Pakistan", 23],
    ["Guinea", 49.4, "Angola", 12],
    ["Angola", 52.6, "Chad", 11],
    ["Nigeria", 52.7, "Syria", 6],
    ["Haiti", 60, "Burkina Faso", 6],
    ["South Sudan", 60.4, "South Sudan", 6],
    ["Ukraine", 64.8, "Cote d'Ivoire", 5],
    ["Yemen", 65.6, "Yemen", 5],
    ["Madagascar", 67.8, "Ethiopia", 5],
    ["Mali", 68.3, "Sudan", 5],
    ["Ethiopia", 69.8, "Guinea", 5],
    ["Afghanistan", 70.3, "Mali", 4],
    ["Liberia", 70.6, "Somalia", 3],
    ["Gabon", 70.9, "Niger", 3],
    ["Guinea-Bissau", 72, "Tajikistan", 3],
    ["Mauritania", 73, "Ghana", 2],
    ["Suriname", 73.3, "Papua New Guinea", 2],
    ["Congo", 74, "Madagascar", 2],
    ["Pakistan", 74.4, "Central African Republic", 2]
  ];
  var rowLabel = [
    "Countries with the lowest vax rates for Polio",
    "Vax Rate",
    "Countries with the highest cVDP cases",
    "Case Count"
  ];

  var colorScale = d3.scaleSequential(d3.interpolateGnBu).domain([100, 0]);

  var table = d3
    .create("table")
    .attr("id", "table")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  let thead = table.append("thead");
  let tbody = table.append("tbody");

  thead
    .append("tr")
    .selectAll("th")
    .data(rowLabel)
    .enter()
    .append("th")
    .text(function (d) {
      return d;
    })
    .attr("class", "head");

  var rows = tbody.selectAll("tr").data(dummy).enter().append("tr");

  var cells = rows
    .selectAll("td")
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append("td")
    .style("background-color", function (d, i) {
      if (((i === 0) | (i === 2)) & common_countries.includes(d)) {
        return "pink";
      } else {
        return "lightblue";
      }
    })
    .text(function (d, i) {
      if (i === 1) {
        d = d / 100;
        const f = d3.format(".1%");
        return f(d);
      }
      return d;
    });
  return table.node();
}


function _data(FileAttachment){return(
FileAttachment("penguins.csv").csv({typed: true})
)}

function _height(){return(
400
)}

function _width(){return(
1275
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["penguins.csv", {url: new URL("./files/715db1223e067f00500780077febc6cebbdd90c151d3d78317c802732252052ab0e367039872ab9c77d6ef99e5f55a0724b35ddc898a1c99cb14c31a379af80a.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("common_countries")).define("common_countries", _common_countries);
  main.variable(observer("chart")).define("chart", ["d3","width","height","common_countries"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("width")).define("width", _width);
  return main;
}
