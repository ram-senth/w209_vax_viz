function _1(md){return(
md`# VaxViz-General-01`
)}

function _vaxTable(html,sparkline,globalVaxData){return(
html`<table class="vaxlist" style="width: 98%; max-width: 1200px; border-collapse: collapse; border: 2px solid black;"><thead><tr><th style="text-align: center; border: 1px solid black; padding: 5px; background-color: lightgray; font-weight: bold; text-transform: uppercase;">Vaccine</th><th style="text-align: center; border: 1px solid black; padding: 5px; background-color: lightgray; font-weight: bold; text-transform: uppercase;">Description</th><th style="text-align: center; border: 1px solid black; padding: 5px; background-color: lightgray; font-weight: bold; text-transform: uppercase;">Protects From</th><th style="text-align: center; border: 1px solid black; padding: 5px; background-color: lightgray; font-weight: bold; text-transform: uppercase;">Global Coverage<br>2015 to 2021</th></tr></thead><tbody><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">BCG</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">BCG refers to one dose of Bacillus Calmette Guerin vaccine, given within 24 hours of birth</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Tuberculosis</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "BCG")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">DTP1</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">DTP1 refers to the first dose of diphtheria and tetanus toxoid with pertussis containing vaccine</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Diphtheria, Tetanus and Pertussis (aka whooping cough)</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "DTP1")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">DTP3</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">DTP3 refers to the third dose of diphtheria and tetanus toxoid with pertussis containing vaccine. DTP3 is often used to assess how well countries are doing in providing routine immunization services to children</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Diphtheria, Tetanus and Pertussis (aka whooping cough)</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "DTP3")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Hepb3</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">HepB3 refers to the third dose of hepatitis B containing vaccine following the birth dose</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Hepatitis B</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "Hepb3")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Hepbb</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">HepBB refers to one dose of Hepatitis B vaccine within 24 hours of delivery</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Hepatitis B</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "Hepbb")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Hib3</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Hib3 refers to the third dose of Haemophilus influenzae type b containing vaccine</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Haemophilus influenzae, type b</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "Hib3")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">IPV1</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">IPV1 refers to at least one dose of inactivated polio vaccine</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Polio</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "IPV1")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">MCV1</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">MCV1 refers to the first dose of measles containing vaccine typically given 12 months or later</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Measles</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "MCV1")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">MCV2</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">MCV2 refers to the second dose of measles containing vaccine according to the nationally recommended schedule</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Measles</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "MCV2")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">PCV3</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">PcV3 refers to the third dose of pneumococcal conjugate vaccine</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Pneumococcal Diseases</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "PCV3")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Pol3</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Pol3 refers to the third dose of polio containing vaccine. May be either oral (OPV) or inactivated polio vaccine (IPV)</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Polio</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "Pol3")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">RCV1</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">RCV1 refers to the first dose of rubella containing vaccine</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Rubella</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "RCV1")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Rotac</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">RotaC refers to the final recommended dose of rotavirus vaccine, which can be either the 2nd or the 3rd dose depending on the vaccine</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Rotavirus</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "Rotac")
)}</td></tr><tr><td style="border: 1px solid black; padding: 5px; font-size: 12px;">YFV</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">YFV refers to one dose of yellow fever vaccine in countries where YFV is part of the national immunization schedule for children or is recommended in at risk areas</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">Yellow fever</td><td style="border: 1px solid black; padding: 5px; font-size: 12px;">${sparkline(
  globalVaxData.filter((d) => d.Vaccine === "YFV")
)}</td></tr></tbody></table>`
)}

function _3(md){return(
md`>> Remember to fix the output table html for following:
* Replace all \\$ with $
* Replace all \& gt; with >
* Replace all \& lt; with <`
)}

function _vaxTableHtml(availYears,d3,sparklineData,sparkline)
{
  const headers = [
    "Vaccine",
    "Description",
    "Protects From",
    `Global Coverage<br\>${availYears[0]} to ${
      availYears[availYears.length - 1]
    }`
  ];
  const para = d3.select("body").append("p");
  const table = para
    .append("table")
    .attr("class", "vaxlist")
    .style("width", "98%")
    .style("max-width", "1200px")
    .style("border-collapse", "collapse")
    .style("border", "2px black solid");
  // headers
  table
    .append("thead")
    .append("tr")
    .selectAll("th")
    .data(headers)
    .enter()
    .append("th")
    .style("text-align", "center")
    .text(function (d) {
      return d;
    })
    .style("border", "1px black solid")
    .style("padding", "5px")
    .style("background-color", "lightgray")
    .style("font-weight", "bold")
    .style("text-transform", "uppercase");

  // data
  table
    .append("tbody")
    .selectAll("tr")
    .data(sparklineData)
    .enter()
    .append("tr")
    .selectAll("td")
    .data(function (d) {
      return d;
    })
    .enter()
    .append("td")
    .style("border", "1px black solid")
    .style("padding", "5px")
    .on("mouseover", function () {
      d3.select(this).style("background-color", "powderblue");
    })
    .on("mouseout", function () {
      d3.select(this).style("background-color", "white");
    })
    .text(function (d) {
      if (Array.isArray(d)) {
        console.log(d);
        return sparkline(d);
      } else {
        return d;
      }
    })
    .style("font-size", "12px");
  return para.html();
}


function _sparkline_v3(d3){return(
(data, range = { low: 0, high: 0 }) => {
  // const style = {
  //   line: { stroke: "#444", strokeWidth: 1 },
  //   circle: { fill: "#f00", stroke: "none" },
  //   margin: { left: 5, right: 5, top: 5, bottom: 5 },
  //   dim: { width: 128, height: 37 }
  // };
  const style = {
    line: { stroke: "#444", strokeWidth: 1 },
    circle: { fill: "#f00", stroke: "none" },
    margin: { left: 5, right: 15, top: 5, bottom: 15 },
    dim: { width: 128, height: 37 }
  };

  const width = style.dim.width,
    height = style.dim.height;
  const dateParse = d3.timeParse("%Y");
  const x = d3.scaleLinear();
  const y = d3.scaleLinear();
  const xScale = x
    .range([style.margin.left, width - style.margin.right])
    .domain(d3.extent(data, (d) => dateParse(d.Year)));

  const yScale = y
    .range([height - style.margin.bottom, style.margin.top])
    .domain(d3.extent(data, (d) => d.Coverage));

  const last = {
    x: xScale(dateParse(data[data.length - 1].Year)),
    y: yScale(data[data.length - 1].Coverage)
  };

  const svg = d3
    .create("svg")
    .attr("width", style.dim.width)
    .attr("height", style.dim.height)
    .attr("viewBox", [
      0,
      0,
      width - style.margin.left - style.margin.right,
      style.dim.height
    ]);

  const g = svg.append("g");

  const line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x((d) => xScale(dateParse(d.Year)))
    .y((d) => yScale(d.Coverage));

  const band = g
    .append("rect")
    .attr("x", style.margin.left)
    .attr("y", yScale(range.high))
    .attr("width", width - style.margin.right)
    .attr("fill", style.line.stroke)
    .attr("opacity", 0.3)
    .attr("height", yScale(range.low) - yScale(range.high));

  const path = g
    .append("path")
    .datum(data)
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", style.line.stroke)
    .style("stroke-width", style.line.strokeWidth);

  const current = g
    .append("g")
    .attr("transform", (d) => `translate(${last.x},${last.y})`);

  const curr_circle = current
    .append("circle")
    .attr("r", 1.5)
    .style("fill", style.circle.fill)
    .style("stroke", style.circle.stroke);

  const curr_label_n = current
    .append("text")
    .attr("text-anchor", "right")
    .attr("dy", ".35em")
    .attr("pointer-events", "none")
    .attr("x", 5)
    .style("fill", style.circle.fill)
    .style("font", ".5em sans-serif")
    .text(`${data[data.length - 1].Coverage}`);

  return svg.node();
}
)}

function _percent_formatter(){return(
(number) =>
  `${Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(number)}%`
)}

function _7(sparkline,globalVaxData){return(
sparkline(globalVaxData.filter((d) => d.Vaccine === "Rotac"))
)}

function _8(sparkline,globalVaxData){return(
sparkline(globalVaxData.filter((d) => d.Vaccine === "DTP3"))
)}

function _sparkline(sparkline_style,d3,percent_formatter,DOM){return(
function sparkline(data, style = sparkline_style) {
  const width = style.dim.width,
    height = style.dim.height;
  const x = d3
    .scaleBand()
    .range([
      style.margin.left + style.margin.right,
      width - style.margin.left - style.margin.right
    ])
    .padding(0)
    .domain(data.map((d) => d.Year));

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.Coverage))
    .range([
      height - style.margin.top - style.margin.bottom,
      style.margin.top + style.margin.bottom
    ]);

  const last = {
    x: x(data[data.length - 1].Year),
    y: y(data[data.length - 1].Coverage),
    value: percent_formatter(data[data.length - 1].Coverage)
  };

  const svg = d3.select(DOM.svg(width, height));
  const line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x((d) => x(d.Year))
    .y((d) => y(d.Coverage));

  const path = svg
    .append("path")
    .datum(data)
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", style.line.stroke)
    .style("stroke-width", style.line.strokeWidth);

  const current = svg
    .append("g")
    .attr("transform", (d) => `translate(${last.x},${last.y})`);

  const curr_circle = current
    .append("circle")
    .attr("r", 1.5)
    .style("fill", style.circle.fill)
    .style("stroke", style.circle.stroke);

  const curr_label_n = current
    .append("text")
    .attr("text-anchor", "right")
    .attr("dy", ".35em")
    .attr("pointer-events", "none")
    .attr("x", 5)
    .attr("y", 0)
    .style("fill", style.circle.fill)
    .style("font", ".7em sans-serif")
    .text(last.value);

  return svg.node();
}
)}

function _sparkline_style(){return(
{
  line: { stroke: "#444", strokeWidth: 1 },
  circle: { fill: "#f00", stroke: "none" },
  margin: { left: 2, right: 10, top: 2, bottom: 2 },
  dim: { width: 192, height: 30 }
}
)}

function _11(md){return(
md`## Data`
)}

function _vaccines(FileAttachment,d3){return(
FileAttachment("vaccines_master.csv")
  .csv()
  .then((data) => d3.group(data, (d) => d.vaccine_code))
)}

function _availYears(FileAttachment){return(
FileAttachment("unicef_regional_coverage_2015_2021@1.csv")
  .csv()
  .then((data) => {
    return [...new Set(data.map((d) => d.Year))];
  })
)}

function _sparklineData(FileAttachment,d3,vaccines){return(
FileAttachment("unicef_regional_coverage_2015_2021@1.csv")
  .csv()
  .then((data) => {
    const filtered = data
      .filter((d) => d.region_code === "REG_GLOBAL")
      .map((row) => {
        row.Year = d3.timeParse("%Y")(row.Year);
        row.Coverage = +row.Coverage;
        row.Vaccinated = +row.Vaccinated;
        row.Unvaccinated = +row.Unvaccinated;
        row.Target = +row.Target;
        row["Not Covered"] = +row["Not Covered"];

        return row;
      });
    const list = [];
    for (let [vax, rows] of d3.group(filtered, (d) => d.Vaccine).entries()) {
      const vaxInfo = vaccines.get(vax.toLowerCase())[0];
      const param = `sparkline(globalVaxData.filter((d) => d.Vaccine === "${vax}"))`;
      list.push([vax, vaxInfo.description, vaxInfo.disease, `\${${param}}`]);
      // list.push([vax, vaxInfo.description, vaxInfo.disease, rows]);
    }
    return list;
  })
)}

function _globalVaxData(FileAttachment){return(
FileAttachment("unicef_regional_coverage_2015_2021@1.csv")
  .csv()
  .then((data) => {
    return data
      .filter((d) => d.region_code === "REG_GLOBAL")
      .map((row) => {
        // row.Year = fmt(row.Year);
        row.Coverage = +row.Coverage;
        row.Vaccinated = +row.Vaccinated;
        row.Unvaccinated = +row.Unvaccinated;
        row.Target = +row.Target;
        row["Not Covered"] = +row["Not Covered"];
        return row;
      });
  })
)}

function _16(md){return(
md`# Imports`
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["unicef_regional_coverage_2015_2021@1.csv", {url: new URL("./files/becd2331310fd5cb391ed25c51d4f17e372ea3b23b1d87a90df2b0ea5cf714887c526bee621bc9ca50647f0f5018955ab55986bb76694d4c34997488e8f638c2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["vaccines_master.csv", {url: new URL("./files/24a8bc42908e4d8f8b981adb02bf8f85dba3a090dd0a6f892f4a5527ee9109799a481a61c2efcbe35324d335292c55e8380efa2e4e5bf7c076e311c2dc6b2f2d.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("vaxTable")).define("vaxTable", ["html","sparkline","globalVaxData"], _vaxTable);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("vaxTableHtml")).define("vaxTableHtml", ["availYears","d3","sparklineData","sparkline"], _vaxTableHtml);
  main.variable(observer("sparkline_v3")).define("sparkline_v3", ["d3"], _sparkline_v3);
  main.variable(observer("percent_formatter")).define("percent_formatter", _percent_formatter);
  main.variable(observer()).define(["sparkline","globalVaxData"], _7);
  main.variable(observer()).define(["sparkline","globalVaxData"], _8);
  main.variable(observer("sparkline")).define("sparkline", ["sparkline_style","d3","percent_formatter","DOM"], _sparkline);
  main.variable(observer("sparkline_style")).define("sparkline_style", _sparkline_style);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("vaccines")).define("vaccines", ["FileAttachment","d3"], _vaccines);
  main.variable(observer("availYears")).define("availYears", ["FileAttachment"], _availYears);
  main.variable(observer("sparklineData")).define("sparklineData", ["FileAttachment","d3","vaccines"], _sparklineData);
  main.variable(observer("globalVaxData")).define("globalVaxData", ["FileAttachment"], _globalVaxData);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
