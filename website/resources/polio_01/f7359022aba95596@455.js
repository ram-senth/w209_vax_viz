import define1 from "./450051d7f1174df8@255.js";

function _1(md){return(
md`# Polio Timeline

Timeline plot`
)}

function _events(data,date_converter,date_string_converter){return(
data.map(
  (d) => (
    (d.year = date_converter(d.year)),
    (d.height = +d.height),
    (d.year_num = date_string_converter(d.year)),
    d
  )
)
)}

function _date_string_converter(d3){return(
d3.timeFormat("%Y")
)}

function _date_converter(d3){return(
d3.timeParse("%Y")
)}

function _data(FileAttachment){return(
FileAttachment("events_v13@1.csv").csv()
)}

function _title(md){return(
md`### A timeline of the progression of polio and the steps taken to control it`
)}

function _timeline(Plot,chartHeight,events){return(
Plot.plot({
  marginLeft: 110,
  marginRight: 100,
  marginTop: 50,
  marginBottom: 50,
  y: { axis: null },
  x: {
    grid: true,
    axis: "top",
    ticks: 17
  },
  width: 1275,
  height: chartHeight,
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(events, {
      x: "year",
      y: "height",
      stroke: "#e8af58",
      opacity: 0.6,
      strokeWidth: 2,
      dy: 0
    }),
    Plot.dot(events, {
      x: "year",
      y: "height",
      stroke: "black",
      fill: "color",
      r: 8,
      dy: 8
    }),
    Plot.text(events, {
      x: "year",
      y: "height",
      text: "year_num",
      fontWeight: "bold",
      dy: 42
    }),
    Plot.text(events, {
      x: "year",
      y: "height",
      text: "line1",
      dy: 23
    }),
    Plot.text(events, {
      x: "year",
      y: "height",
      text: "line2",
      dy: 32
    })
  ]
})
)}

function _marginTop(){return(
20
)}

function _marginBottom(){return(
30
)}

function _chartHeight(){return(
500
)}

function _minheight(d3,events){return(
d3.min(events, (d) => d.height)
)}

function _maxheight(d3,events){return(
d3.max(events, (d) => d.height)
)}

function _y(chartHeight,marginBottom,marginTop){return(
function y(height) {
  const t = (height - 8) / 16;
  return (
    chartHeight - marginBottom - t * (chartHeight - marginTop - marginBottom)
  );
}
)}

function _years(d3){return(
d3.range(1840, 1995, 10)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["events_v13@1.csv", {url: new URL("./files/85e614790d6d4dea2586508b9aa44caeba6f3b4a2876432b52267e445ae17e8c94bf4245815b7548494a066ea422889a1430aa54739743cb0fb08e1e78335350.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("events")).define("events", ["data","date_converter","date_string_converter"], _events);
  main.variable(observer("date_string_converter")).define("date_string_converter", ["d3"], _date_string_converter);
  main.variable(observer("date_converter")).define("date_converter", ["d3"], _date_converter);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("timeline")).define("timeline", ["Plot","chartHeight","events"], _timeline);
  main.variable(observer("marginTop")).define("marginTop", _marginTop);
  main.variable(observer("marginBottom")).define("marginBottom", _marginBottom);
  main.variable(observer("chartHeight")).define("chartHeight", _chartHeight);
  main.variable(observer("minheight")).define("minheight", ["d3","events"], _minheight);
  main.variable(observer("maxheight")).define("maxheight", ["d3","events"], _maxheight);
  main.variable(observer("y")).define("y", ["chartHeight","marginBottom","marginTop"], _y);
  main.variable(observer("years")).define("years", ["d3"], _years);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
