import define1 from "./450051d7f1174df8@255.js";

function _1(md){return(
md`# Polio Timeline

Timeline plot`
)}

function _events(data,date_converter,date_string_converter){return(
data.map(
  (d) => (
    (d.year = date_converter(d.year)),
    (d.h = +d.h),
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
FileAttachment("events_v10.csv").csv()
)}

function _title(md){return(
md`## A timeline of the progression of polio and the steps taken to control it`
)}

function _timeline(Plot,events){return(
Plot.plot({
  marginLeft: 100,
  marginRight: 100,
  marginTop: 50,
  y: { axis: null },
  x: { ticks: 22 },
  width: 975,
  height: 610,
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(events, {
      x: "year",
      y: "h",
      stroke: "#eee",
      strokeWidth: 2
    }),
    Plot.dot(events, {
      x: "year",
      y: "h",
      stroke: "black",
      fill: "color",
      r: 8
    }),
    Plot.text(events, {
      x: "year",
      y: "h",
      text: "year_num",
      fontWeight: "bold",
      dy: -39
    }),
    Plot.text(events, {
      x: "year",
      y: "h",
      text: "line1",
      dy: -27
    }),
    Plot.text(events, {
      x: "year",
      y: "h",
      text: "line2",
      dy: -15
    })
  ]
})
)}

function _years(d3){return(
d3.range(1840, 1995, 10)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["events_v10.csv", {url: new URL("./files/772a69e7b117a46901946d8cd94e09c9bb7cb7ce56870c285e7a77262d63f6550d0be35d26a82b96ea6dd351fc93d6ce713f6a4a173ee7023ca627b12846ae67.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("events")).define("events", ["data","date_converter","date_string_converter"], _events);
  main.variable(observer("date_string_converter")).define("date_string_converter", ["d3"], _date_string_converter);
  main.variable(observer("date_converter")).define("date_converter", ["d3"], _date_converter);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("timeline")).define("timeline", ["Plot","events"], _timeline);
  main.variable(observer("years")).define("years", ["d3"], _years);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
