import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# VaxViz-Pandemic-03

Click to zoom in or out. Global -> WHO region -> Country`
)}

function _sel_vaccine(select,vaccines){return(
select({
  options: Array.from(vaccines.keys()),
  title: "Vaccine:  ",
  // description:
  //   "Select the vaccine to focus on. DTP3 is considered the standard to measure overall vaccine coverage.",
  value: "Overall"
})
)}

function _leftYear(select,availYears){return(
select({
  options: availYears,
  title: "Beginning year:  ",
  value: "2019"
  // description:
  //   "Select vaccinated vs unvaccinated metrics. You can also look at % values or the actual numbers."
})
)}

function _rightYear(select,availYears){return(
select({
  options: availYears,
  title: "Ending year:  ",
  value: "2021"
  // description:
  //   "Select vaccinated vs unvaccinated metrics. You can also look at % values or the actual numbers."
})
)}

function _sel_metric(select,metrics){return(
select({
  options: [...metrics.keys()],
  title: "Metric to plot:  ",
  value: "Not Vaccinated(#)"
  // description:
  //   "Select vaccinated vs unvaccinated metrics. You can also look at % values or the actual numbers."
})
)}

function _chart(d3,cWidth,cHeight,data,iWidth,iHeight,margin)
{
  // Create the color scale.
  const color = d3
    .scaleLinear()
    .domain([0, 2])
    .range(["#f3f3f3", "#b3cde3", "#fed9a6"]);

  // Compute the layout.
  const pack = (data) =>
    d3.pack().size([cWidth, cHeight]).padding(5)(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value)
    );
  const root = pack(data);

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("viewBox", `-${iWidth / 2} -${iHeight / 2} ${iWidth} ${iHeight}`)
    .attr("width", "100%")
    .attr("height", iHeight)
    .attr("style", `background: ${color(0)}; cursor: pointer;`);
  //max-width: 100%; height: auto; display: block; margin: 0 -14px;

  const gDrawing = svg
    .append("g")
    .attr("class", "gDrawing")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("width", cWidth)
    .attr("height", cHeight)
    .attr("style", `background: ${color(0)}; cursor: pointer;`);

  const innerColorScale = d3.scaleOrdinal(
    [false, true],
    ["#fbb4ae", "#ccebc5"]
  );
  // Append the nodes.
  const node = gDrawing
    .append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
    .attr("fill", (d) =>
      d.children ? color(d.depth) : innerColorScale(d.data.isPositive)
    )
    .attr("pointer-events", (d) => (!d.children ? "none" : null))
    .on("mouseover", function () {
      d3.select(this).attr("stroke", "#000");
    })
    .on("mouseout", function () {
      d3.select(this).attr("stroke", null);
    })
    .on(
      "click",
      (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
    );

  // Append the text labels.
  const label = gDrawing
    .append("g")
    .style("font", "12px sans-serif")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
    .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
    .style("display", (d) => (d.parent === root ? "inline" : "none"))
    .text((d) => `${d.data.name} (${d.data.formattedVal})`);

  // Create the zoom behavior and zoom immediately in to the initial focus node.
  svg.on("click", (event) => zoom(event, root));
  let focus = root;
  let view;
  zoomTo([focus.x, focus.y, focus.r * 2]);

  function zoomTo(v) {
    const k = cWidth / v[2];

    view = v;

    label.attr(
      "transform",
      (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
    );
    node.attr(
      "transform",
      (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
    );
    node.attr("r", (d) => d.r * k);
  }

  function zoom(event, d) {
    const focus0 = focus;

    focus = d;

    const transition = gDrawing
      .transition()
      .duration(event.altKey ? 7500 : 750)
      .tween("zoom", (d) => {
        const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
        return (t) => zoomTo(i(t));
      });

    label
      .filter(function (d) {
        return d.parent === focus || this.style.display === "inline";
      })
      .transition(transition)
      .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
      .on("start", function (d) {
        if (d.parent === focus) this.style.display = "inline";
      })
      .on("end", function (d) {
        if (d.parent !== focus) this.style.display = "none";
      });
  }

  return svg.node();
}


function _cWidth(iWidth,margin){return(
iWidth - margin.left - margin.right
)}

function _cHeight(iHeight,margin){return(
iHeight - margin.top - margin.bottom
)}

function _iWidth(width){return(
width * 0.4
)}

function _iHeight(height){return(
height * 0.4
)}

function _height(width){return(
width
)}

function _margin(){return(
{ left: 0, top: 0, right: 0, bottom: 0 }
)}

function _13(md){return(
md`# Data`
)}

function _number_formatter(){return(
(number) =>
  `${Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(number)}`
)}

function _percent_formatter(){return(
(number) =>
  `${Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(number)}%`
)}

function _data(metrics,sel_metric,rightYear,leftYear,regionalGrouped,vaccines,sel_vaccine,countryGrouped)
{
  const numToShow = 5;
  const [metricPrefix, formatter] = metrics.get(sel_metric);
  const toNode = (row, idGetter, nameGetter) => {
    var value =
      row[`${metricPrefix}_${rightYear}`] - row[`${metricPrefix}_${leftYear}`];
    const formattedVal = formatter(value);
    if (value != null && value != 0) {
      return {
        id: idGetter(row),
        name: nameGetter(row),
        signedVal: value,
        value: Math.abs(value),
        formattedVal: formattedVal,
        isPositive:
          metricPrefix === "Coverage" || metricPrefix == "Vaccinated"
            ? value >= 0
            : value <= 0
      };
    }
    return null;
  };

  var root;
  const regions = [];
  for (let [regionCode, regionData] of regionalGrouped) {
    if (regionData.has(vaccines.get(sel_vaccine))) {
      const data = regionData.get(vaccines.get(sel_vaccine))[0];
      const node = toNode(
        data,
        (d) => d.region_code,
        (d) => d.region_name
      );
      if (node != null) {
        if (regionCode === "REG_GLOBAL") {
          root = node;
        } else {
          // Build countries
          const countriesInRegion = countryGrouped
            .get(regionCode)
            .get(vaccines.get(sel_vaccine))
            .flatMap((country) => {
              const n = toNode(
                country,
                (d) => d.alpha_3_code,
                (d) => d.Name
              );
              return n == null ? [] : [n];
            });
          var finalList;
          if (countriesInRegion.length <= 2 * numToShow) {
            finalList = countriesInRegion;
          } else {
            const topTen = countriesInRegion
              .sort((a, b) => b.signedVal - a.signedVal)
              .slice(0, numToShow);
            const bottomTen = countriesInRegion
              .sort((a, b) => a.signedVal - b.signedVal)
              .slice(0, numToShow);
            finalList = [...topTen, ...bottomTen];
          }
          node.children = finalList;
          regions.push(node);
        }
      }
    }
  }
  root.children = regions;
  return root;
}


function _metrics(percent_formatter,number_formatter)
{
  const map = new Map();
  map.set("Vaccinated(%)", ["Coverage", percent_formatter]);
  map.set("Not Vaccinated(%)", ["Not Covered", percent_formatter]);
  map.set("Vaccinated(#)", ["Vaccinated", number_formatter]);
  map.set("Not Vaccinated(#)", ["Unvaccinated", number_formatter]);
  return map;
}


function _availYears(){return(
["2015", "2016", "2017", "2018", "2019", "2020", "2021"]
)}

function _vaccines(regionalGrouped)
{
  const list = [...regionalGrouped.get("REG_GLOBAL").keys()].map((v) => [v, v]);
  list.push(["Overall", "DTP3"]);
  return new Map(list);
}


function _regions(FileAttachment){return(
FileAttachment("regions_master.csv").csv()
)}

function _countries(FileAttachment){return(
FileAttachment("countries_master.csv").csv()
)}

function _regionalGrouped(d3,regionalData){return(
d3.group(
  regionalData,
  (d) => d.region_code,
  (d) => d.Vaccine
)
)}

function _regionalData(FileAttachment){return(
FileAttachment(
  "unicef_regional_coverage_2015_2021_pivot@1.csv"
).csv()
)}

function _countryGrouped(d3,countryData)
{
  return d3.group(
    countryData,
    (d) => d.region_code,
    (d) => d.Vaccine
  );
}


function _countryData(FileAttachment){return(
FileAttachment(
  "unicef_national_coverage_2015_2021_pivot.csv"
).csv()
)}

function _26(md){return(
md`# Imports`
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["regions_master.csv", {url: new URL("./files/05d199b4b5b31907d15b326d31d62754a460838de71e4432d0ae1df4512a4f8186539ed67d0fd07a71039820406527d9de6f742f0eb02e06af2c1bee3045a374.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["countries_master.csv", {url: new URL("./files/c21156868ca3b76151c8c30dc389be2618b191c7c7abbc5770c9f77ea0b63b2d662afbc84a6e10db0d157505efda5f924e5f90893181c4ec91155a7ba1270e72.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["unicef_national_coverage_2015_2021_pivot.csv", {url: new URL("./files/e25709af580eab8dd60f273830a7e8a2941cf76b252db599187e25b9a82870eeea1c4bd57ac6a1b540bb9fb64ceb8182d5be2e2d5aa2ea54dfbbc3dae4810555.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["unicef_regional_coverage_2015_2021_pivot@1.csv", {url: new URL("./files/e83a1668f06b1953cfdc23981ee1096c87127a324373210422bf5bd90d1ded50098dd455e04614710a16a9dd9fc9a043705314fdd33a85d37b1d888357577ca8.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof sel_vaccine")).define("viewof sel_vaccine", ["select","vaccines"], _sel_vaccine);
  main.variable(observer("sel_vaccine")).define("sel_vaccine", ["Generators", "viewof sel_vaccine"], (G, _) => G.input(_));
  main.variable(observer("viewof leftYear")).define("viewof leftYear", ["select","availYears"], _leftYear);
  main.variable(observer("leftYear")).define("leftYear", ["Generators", "viewof leftYear"], (G, _) => G.input(_));
  main.variable(observer("viewof rightYear")).define("viewof rightYear", ["select","availYears"], _rightYear);
  main.variable(observer("rightYear")).define("rightYear", ["Generators", "viewof rightYear"], (G, _) => G.input(_));
  main.variable(observer("viewof sel_metric")).define("viewof sel_metric", ["select","metrics"], _sel_metric);
  main.variable(observer("sel_metric")).define("sel_metric", ["Generators", "viewof sel_metric"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","cWidth","cHeight","data","iWidth","iHeight","margin"], _chart);
  main.variable(observer("cWidth")).define("cWidth", ["iWidth","margin"], _cWidth);
  main.variable(observer("cHeight")).define("cHeight", ["iHeight","margin"], _cHeight);
  main.variable(observer("iWidth")).define("iWidth", ["width"], _iWidth);
  main.variable(observer("iHeight")).define("iHeight", ["height"], _iHeight);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("number_formatter")).define("number_formatter", _number_formatter);
  main.variable(observer("percent_formatter")).define("percent_formatter", _percent_formatter);
  main.variable(observer("data")).define("data", ["metrics","sel_metric","rightYear","leftYear","regionalGrouped","vaccines","sel_vaccine","countryGrouped"], _data);
  main.variable(observer("metrics")).define("metrics", ["percent_formatter","number_formatter"], _metrics);
  main.variable(observer("availYears")).define("availYears", _availYears);
  main.variable(observer("vaccines")).define("vaccines", ["regionalGrouped"], _vaccines);
  main.variable(observer("regions")).define("regions", ["FileAttachment"], _regions);
  main.variable(observer("countries")).define("countries", ["FileAttachment"], _countries);
  main.variable(observer("regionalGrouped")).define("regionalGrouped", ["d3","regionalData"], _regionalGrouped);
  main.variable(observer("regionalData")).define("regionalData", ["FileAttachment"], _regionalData);
  main.variable(observer("countryGrouped")).define("countryGrouped", ["d3","countryData"], _countryGrouped);
  main.variable(observer("countryData")).define("countryData", ["FileAttachment"], _countryData);
  main.variable(observer()).define(["md"], _26);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("select", child1);
  const child2 = runtime.module(define2);
  main.import("Legend", child2);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
