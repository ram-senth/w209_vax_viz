import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# VaxViz-Pandemic-05`
)}

function _sel_vaccine(select,vaccines){return(
select({
  options: Array.from(vaccines.keys()),
  title: "Vaccine:  ",
  // description:
  //   "Select the vaccine to focus on. DTP1 is considered the standard to measure overall vaccine coverage.",
  value: "Overall"
})
)}

function _chart(width,d3,countryVaxData,showTooltip,hideTooltip,numberFormatter)
{
  const fillColor = (d) =>
    d.name === "Rest of World" ? "orange" : "steelblue";
  // Declare the chart dimensions and margins.
  // const width = 928;
  const height = 0.35 * width;
  const marginTop = 70;
  const marginRight = 40;
  const marginBottom = 60;
  const marginLeft = 70;
  const iheight = height - marginTop - marginBottom;
  const iwidth = width - marginLeft - marginRight;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleBand()
    .domain(
      d3.groupSort(
        countryVaxData,
        ([d]) => -d.notVaccinatedDelta,
        (d) => d.alpha_3_code
      )
    ) // descending notVaccinatedDelta
    .range([0, iwidth])
    .padding(0.1);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(countryVaxData, (d) => d.notVaccinatedDelta)])
    .range([iheight, 0]);

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("class", "gDrawing")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add title of the plot.
  const title = svg
    .append("text")
    .attr("class", "barChartHeader1")
    .style("text-anchor", "middle")
    .attr("transform", `translate(${width / 2}, 20)`)
    .text(`Number of Unvaccinated Children During COVID Years`);

  const subtitle = svg
    .append("text")
    .attr("class", "barChartHeader2")
    .style("text-anchor", "middle")
    .attr("transform", `translate(${width / 2}, 40)`)
    .text(`Country Level Breakdown`);

  const g = svg
    .append("g")
    .attr("transform", `translate(${marginLeft}, ${marginTop})`);

  const tooltip = g.append("g").attr("class", "ttip");

  // Add a rect for each bar.
  const rects = g
    .append("g")
    .selectAll()
    .data(countryVaxData)
    .join("rect")
    .attr("fill", fillColor)
    .attr("x", (d) => x(d.alpha_3_code))
    .attr("y", (d) => y(d.notVaccinatedDelta))
    .attr("height", (d) => y(0) - y(d.notVaccinatedDelta))
    .attr("width", x.bandwidth());

  rects.on("touchmove mousemove", function (event, d) {
    const [x, y] = d3.pointer(event);
    showTooltip(svg, tooltip, x, y, d);
  });

  // Hide tool tip on mouse out
  rects.on("touchend mouseleave", () => hideTooltip(tooltip));

  // Add the x-axis and label.
  g.append("g")
    .attr("transform", `translate(0,${iheight})`)
    .attr("class", "xAxis")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add the y-axis and label, and remove the domain line.
  g.append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(y).tickFormat((y) => numberFormatter(y)))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", -10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Additional unvaccinated children in 2021 compared to 2019")
    );

  // Return the SVG element.
  return svg.node();
}


function _hideTooltip(callout){return(
(tooltip) => {
  tooltip.lower();
  tooltip.call(callout, null);
}
)}

function _showTooltip(callout,tooltipText){return(
(gDrawing, tooltip, x, y, d) => {
  // tooltip group's .call is used to display county detail.
  tooltip.raise();
  tooltip
    .attr("transform", `translate(${x},${y + 10})`)
    .call(callout, tooltipText(d));
}
)}

function _numberFormatter(){return(
(number) =>
  `${Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(number)}`
)}

function _tooltipText(numberFormatter){return(
(data) => {
  const formatted_val = numberFormatter(data.notVaccinatedDelta);

  return `${data.name}\n${formatted_val}`;
}
)}

function _callout(){return(
(g, value, isHtml = false) => {
  if (!value) {
    return g.style("visibility", "hidden");
  }

  g.style("visibility", "visible")
    .style("display", null)
    .style("pointer-events", "auto")
    .style("font", "10px sans-serif");

  const path = g
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("fill", "white")
    .attr("stroke", "black");
  var text;
  // if (!isHtml) {
  text = g
    .selectAll("text")
    .data([null])
    .join("text")
    .call((text) =>
      text
        .attr("fill", "black")
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .html(function (d) {
          return d;
        })
    )
    .call((text) => {
      const { x, y, width: w, height: h } = text.node().getBBox(); // the box that our text is in

      // place the text
      text.attr("transform", `translate(${-w / 2},${15 - y})`);
      path.attr(
        "d",
        `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
      );
    });
  // } else {

  // }

  // const { x, y, width: w, height: h } = text.node().getBBox(); // the box that our text is in

  // // place the text
  // text.attr("transform", `translate(${-w / 2},${15 - y})`);

  // // Create the box around the text
  // path.attr(
  //   "d",
  //   `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
  // );
  return g;
}
)}

function _9(md){return(
md`## Data`
)}

function _countriesMaster(FileAttachment,d3){return(
FileAttachment("countries_master.csv")
  .csv()
  .then((data) => {
    return d3.group(data, (d) => d.numeric_code.padStart(3, "0"));
  })
)}

function _globalVaxData(countryVaxData){return(
countryVaxData.reduceRight((d1, d2) => ({
  name: "Global",
  vaccine: d1.vaccine,
  notVaccinatedDelta: d1.notVaccinatedDelta + d2.notVaccinatedDelta
}))
)}

function _countryVaxData(rawData,vaccines,sel_vaccine,d3)
{
  const n = 30;
  const covidSummary = rawData
    .filter((row) => row.Vaccine === vaccines.get(sel_vaccine))
    .map((row) => ({
      name: row.Name,
      alpha_3_code: row.alpha_3_code,
      vaccine: row.Vaccine,
      notVaccinatedDelta: +row["Unvaccinated_2021"] - +row["Unvaccinated_2019"]
    }));
  const sorted = d3.sort(
    covidSummary,
    (d1, d2) => d2.notVaccinatedDelta - d1.notVaccinatedDelta
  );
  const selected = sorted.slice(0, n);
  const rest = sorted.slice(n);
  const row = {
    name: "Rest of World",
    alpha_3_code: "RoW",
    vaccine: selected[0].vaccine,
    vaccinatedDelta: rest
      .map((d) => d.vaccinatedDelta)
      .reduceRight((v1, v2) => v1 + v2),
    notVaccinatedDelta: rest
      .map((d) => d.notVaccinatedDelta)
      .reduceRight((v1, v2) => v1 + v2)
  };
  selected.push(row);
  return d3.sort(
    selected,
    (d1, d2) => d2.notVaccinatedDelta - d1.notVaccinatedDelta
  );
}


function _vaccines(rawData)
{
  const list = Array.from(new Set(rawData.map((d) => [d.Vaccine, d.Vaccine])));
  list.push(["Overall", "DTP3"]);
  return new Map(list);
}


function _rawData(FileAttachment){return(
FileAttachment("unicef_national_coverage_2015_2021_pivot.csv").csv()
)}

function _15(md){return(
md`# Imports`
)}

function _d3(require){return(
require("d3@6")
)}

function _18(d3){return(
d3.version
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries_master.csv", {url: new URL("./files/c21156868ca3b76151c8c30dc389be2618b191c7c7abbc5770c9f77ea0b63b2d662afbc84a6e10db0d157505efda5f924e5f90893181c4ec91155a7ba1270e72.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["unicef_national_coverage_2015_2021_pivot.csv", {url: new URL("./files/e25709af580eab8dd60f273830a7e8a2941cf76b252db599187e25b9a82870eeea1c4bd57ac6a1b540bb9fb64ceb8182d5be2e2d5aa2ea54dfbbc3dae4810555.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof sel_vaccine")).define("viewof sel_vaccine", ["select","vaccines"], _sel_vaccine);
  main.variable(observer("sel_vaccine")).define("sel_vaccine", ["Generators", "viewof sel_vaccine"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["width","d3","countryVaxData","showTooltip","hideTooltip","numberFormatter"], _chart);
  main.variable(observer("hideTooltip")).define("hideTooltip", ["callout"], _hideTooltip);
  main.variable(observer("showTooltip")).define("showTooltip", ["callout","tooltipText"], _showTooltip);
  main.variable(observer("numberFormatter")).define("numberFormatter", _numberFormatter);
  main.variable(observer("tooltipText")).define("tooltipText", ["numberFormatter"], _tooltipText);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("countriesMaster")).define("countriesMaster", ["FileAttachment","d3"], _countriesMaster);
  main.variable(observer("globalVaxData")).define("globalVaxData", ["countryVaxData"], _globalVaxData);
  main.variable(observer("countryVaxData")).define("countryVaxData", ["rawData","vaccines","sel_vaccine","d3"], _countryVaxData);
  main.variable(observer("vaccines")).define("vaccines", ["rawData"], _vaccines);
  main.variable(observer("rawData")).define("rawData", ["FileAttachment"], _rawData);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("select", child1);
  main.variable(observer()).define(["d3"], _18);
  return main;
}
