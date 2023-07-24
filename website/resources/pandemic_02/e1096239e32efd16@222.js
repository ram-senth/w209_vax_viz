import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# VaxViz-Pandemic-02`
)}

function _2(md){return(
md`## Chart`
)}

function _sel_vaccine(select,vaccines){return(
select({
  options: vaccines,
  title: "Vaccine:  ",
  // description:
  //   "Select the vaccine to focus on. DTP3 is considered the standard to measure overall vaccine coverage.",
  value: "DTP3"
})
)}

function _yFieldD(select,metricDispNames){return(
select({
  options: metricDispNames,
  title: "Metric to plot:  ",
  value: "Not Vaccinated(#)"
  // description:
  //   "Select vaccinated vs unvaccinated metrics. You can also look at % values or the actual numbers."
})
)}

function _leftYear(select,availYears){return(
select({
  options: availYears,
  title: "Left side year:  ",
  value: "2019"
  // description:
  //   "Select vaccinated vs unvaccinated metrics. You can also look at % values or the actual numbers."
})
)}

function _rightYear(select,availYears){return(
select({
  options: availYears,
  title: "Left side year:  ",
  value: "2021"
  // description:
  //   "Select vaccinated vs unvaccinated metrics. You can also look at % values or the actual numbers."
})
)}

function _chartTitle(yFieldD,leftYear,rightYear){return(
`Compare ${yFieldD} Between ${leftYear} and ${rightYear}`
)}

function _layout(Plot,iheight,iwidth,leftYear,rightYear,chart_data,yField,d3,occlusionY,formatters){return(
Plot.plot({
  height: iheight,
  width: iwidth,
  x: {
    axis: "top",
    type: "ordinal",
    tickFormat: "",
    inset: 300,
    label: null,
    fontSize: 14
  },
  y: { axis: null, inset: 20 },
  color: {
    domain: ["REG_GLOBAL", "SEAR", "AFR", "REST"],
    range: ["red", "orange", "brown", "steelblue"]
  },
  style: {
    backgroundColor: "#eee",
    fontSize: 14
  },
  marks: [
    Plot.ruleX([`${leftYear}`, `${rightYear}`], { stroke: "#ccc" }),
    Plot.line(chart_data, {
      x: "Year",
      y: yField,
      stroke: (d) =>
        d.region_code === "REG_GLOBAL" ||
        d.region_code === "SEAR" ||
        d.region_code === "AFR"
          ? d.region_code
          : "REST",
      sort: { channel: "stroke" },
      z: "region_name",
      strokeWidth: 3
    }),
    d3
      .groups(chart_data, (d) => d.Year === leftYear)
      .map(([left, rows]) =>
        Plot.text(
          rows,
          occlusionY({
            x: "Year",
            y: yField,
            text: left
              ? (d) =>
                  `${d.region_name} ${formatters[yField](
                    d[yField],
                    left,
                    d.region_code
                  )}`
              : (d) =>
                  `${formatters[yField](d[yField], left, d.region_code)} ${
                    d.region_name
                  }`,
            textAnchor: left ? "end" : "start",
            dx: left ? -3 : 3
          })
        )
      )
  ]
})
)}

function _occlusionY(Plot,d3){return(
(options) =>
  Plot.initializer(
    options,
    (
      data,
      facets,
      { y: { value: Y }, text: { value: T } },
      { y: sy },
      dimensions,
      context
    ) => {
      for (const index of facets) {
        const unique = new Set();
        const nodes = Array.from(index, (i) => ({
          fx: 0,
          y: sy(Y[i]),
          i
        }));
        d3.forceSimulation(nodes)
          .force(
            "y",
            d3.forceY(({ y }) => y)
          ) // gravitate towards the original y
          .force("collide", d3.forceCollide().radius(7.5)) // collide
          .stop()
          .tick(20);
        for (const { y, node, i } of nodes) Y[i] = y;
      }
      return { data, facets, channels: { y: { value: Y } } };
    }
  )
)}

function _formatters()
{
  const percent_formatter = (number, left, region_code) =>
    `${Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 3,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(number)}%`;

  const number_formatter = (number, left, region_code) =>
    `${Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(number / 1000000)}${
      left &&
      (region_code === "REG_GLOBAL" ||
        region_code === "SEAR" ||
        region_code === "AFR")
        ? " Million"
        : ""
    }`;

  return {
    Coverage: percent_formatter,
    "Not Covered": percent_formatter,
    Vaccinated: number_formatter,
    Unvaccinated: number_formatter
  };
}


function _yField(metricNamesMap,yFieldD){return(
metricNamesMap[yFieldD]
)}

function _margin(){return(
{ left: 100, top: 50, right: 150, bottom: 50 }
)}

function _iwidth(width,margin){return(
width - margin.left - margin.right
)}

function _iheight(height,margin){return(
height - margin.top - margin.bottom
)}

function _height(width){return(
0.4 * width
)}

function _16(md){return(
md`## Data`
)}

function _metricNamesMap()
{
  const map = new Map();
  map["Vaccinated(%)"] = "Coverage";
  map["Not Vaccinated(%)"] = "Not Covered";
  map["Vaccinated(#)"] = "Vaccinated";
  map["Not Vaccinated(#)"] = "Unvaccinated";
  return map;
}


function _chart_data(regional_vax_number,sel_vaccine,leftYear,rightYear){return(
regional_vax_number.filter(
  (v) =>
    v.Vaccine == sel_vaccine && (v.Year === leftYear || v.Year === rightYear)
)
)}

function _vaccines(regional_vax_number){return(
Array.from(new Set(regional_vax_number.map((v) => v.Vaccine)))
)}

function _metricDispNames(){return(
[
  "Vaccinated(%)",
  "Not Vaccinated(%)",
  "Vaccinated(#)",
  "Not Vaccinated(#)"
]
)}

function _availYears(regional_vax_number){return(
[...new Set(regional_vax_number.map((d) => d.Year))]
)}

function _regional_vax_number(FileAttachment){return(
FileAttachment("unicef_regional_coverage_2015_2021.csv")
  .csv()
  .then((data) => {
    data.map((row) => {
      // row.Year = fmt(row.Year);
      row.Coverage = +row.Coverage;
      row.Vaccinated = +row.Vaccinated;
      row.Unvaccinated = +row.Unvaccinated;
      row.Target = +row.Target;
      row["Not Covered"] = +row["Not Covered"];
    });
    return data;
  })
)}

function _23(md){return(
md`## Imports`
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["unicef_regional_coverage_2015_2021.csv", {url: new URL("./files/becd2331310fd5cb391ed25c51d4f17e372ea3b23b1d87a90df2b0ea5cf714887c526bee621bc9ca50647f0f5018955ab55986bb76694d4c34997488e8f638c2.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof sel_vaccine")).define("viewof sel_vaccine", ["select","vaccines"], _sel_vaccine);
  main.variable(observer("sel_vaccine")).define("sel_vaccine", ["Generators", "viewof sel_vaccine"], (G, _) => G.input(_));
  main.variable(observer("viewof yFieldD")).define("viewof yFieldD", ["select","metricDispNames"], _yFieldD);
  main.variable(observer("yFieldD")).define("yFieldD", ["Generators", "viewof yFieldD"], (G, _) => G.input(_));
  main.variable(observer("viewof leftYear")).define("viewof leftYear", ["select","availYears"], _leftYear);
  main.variable(observer("leftYear")).define("leftYear", ["Generators", "viewof leftYear"], (G, _) => G.input(_));
  main.variable(observer("viewof rightYear")).define("viewof rightYear", ["select","availYears"], _rightYear);
  main.variable(observer("rightYear")).define("rightYear", ["Generators", "viewof rightYear"], (G, _) => G.input(_));
  main.variable(observer("chartTitle")).define("chartTitle", ["yFieldD","leftYear","rightYear"], _chartTitle);
  main.variable(observer("layout")).define("layout", ["Plot","iheight","iwidth","leftYear","rightYear","chart_data","yField","d3","occlusionY","formatters"], _layout);
  main.variable(observer("occlusionY")).define("occlusionY", ["Plot","d3"], _occlusionY);
  main.variable(observer("formatters")).define("formatters", _formatters);
  main.variable(observer("yField")).define("yField", ["metricNamesMap","yFieldD"], _yField);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("iwidth")).define("iwidth", ["width","margin"], _iwidth);
  main.variable(observer("iheight")).define("iheight", ["height","margin"], _iheight);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("metricNamesMap")).define("metricNamesMap", _metricNamesMap);
  main.variable(observer("chart_data")).define("chart_data", ["regional_vax_number","sel_vaccine","leftYear","rightYear"], _chart_data);
  main.variable(observer("vaccines")).define("vaccines", ["regional_vax_number"], _vaccines);
  main.variable(observer("metricDispNames")).define("metricDispNames", _metricDispNames);
  main.variable(observer("availYears")).define("availYears", ["regional_vax_number"], _availYears);
  main.variable(observer("regional_vax_number")).define("regional_vax_number", ["FileAttachment"], _regional_vax_number);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("select", child2);
  return main;
}
