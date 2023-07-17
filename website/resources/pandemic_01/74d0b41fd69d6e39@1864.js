import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./450051d7f1174df8@255.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# VaxViz-Pandemic-01`
)}

function _2(md){return(
md`## Chart`
)}

function _enable_initial_story(){return(
true
)}

function _sel_vaccine(select,vaccines){return(
select({
  options: vaccines,
  title: "Vaccine:  ",
  // description:
  //   "Select the vaccine to focus on. DTP1 is considered the standard to measure overall vaccine coverage.",
  value: "DTP1"
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

function _layout(plotty){return(
plotty()
)}

function _plotty(html,d3,width,height,margin,x,iheight,iwidth,y,yField,sel_vaccine,yFieldD,seriesData,color,story_data,to_story_key,show_tooltip,hide_tooltip,highlight_series,dehighlight_all_series,Legend,regions,enable_initial_story,narrate,story){return(
() => {
  const target = html`<div id="myviz">`;

  const svg = d3
    .select(target)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  // Add the layout for the plot.
  const gDrawing = svg
    .append("g")
    .attr("class", "gDrawing")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Display the axes.
  gDrawing
    .append("g")
    .attr("class", "xAxis")
    .style("font-size", "12px")
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`)
    .append("text")
    .text("Year")
    .attr("class", "axisLabel")
    .style("fill", "black")
    .attr("transform", `translate(${iwidth}, 30)`)
    .style("text-anchor", "end");
  gDrawing
    .append("g")
    .attr("class", "yAxis")
    .style("font-size", "12px")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("class", "axisLabel")
    .text(yField)
    .style("fill", "black")
    .attr("transform", `translate(0, -10)`)
    .style("text-anchor", "middle");

  // Add the placeholder for the title of the plot.
  gDrawing
    .append("text")
    .attr("class", "chartHeader")
    .style("font-size", "21px")
    .style("text-anchor", "middle")
    .attr("transform", `translate(${iwidth / 2}, ${0 - margin.top / 2})`);

  // Add background shade
  gDrawing
    .append("rect")
    .attr("width", iwidth)
    .attr("height", iheight)
    .attr("fill", "#eee");

  // Display the chart title.
  gDrawing
    .select(".chartHeader")
    .text(`Regional ${sel_vaccine} Vaccination - ${yFieldD}`);

  // Add a group element for each series to separately control series level interactions
  const serie = gDrawing
    .selectAll()
    .data(seriesData)
    .join("g")
    .attr("class", (d) => `series_${d[0]}`);

  // Draw the lines.
  serie
    .append("path")
    .attr("fill", "none")
    .attr("stroke", (d) => color(d[0]))
    .attr("class", (d) => `line line_${d[0]}`)
    .attr("stroke-width", 1.5)
    .attr("d", (d) =>
      d3
        .line()
        .x((d) => x(d.Year))
        .y((d) => y(d[yField]))(d[1])
    );

  // Draw two outer circles to highlight just the story points.
  serie
    .append("g")
    .attr("class", (d) => `storypoints_${d[0]}`)
    .selectAll(".point")
    .data((d) => d[1])
    .join("circle")
    .attr("class", (d) => `storypoint strorypoint_${d.region_code}`)
    .attr("cx", (d) => x(d.Year))
    .attr("cy", (d) => y(d[yField]))
    .attr("r", (d) => (story_data.has(to_story_key(d)) ? 3 : 0))
    .attr("fill", (d) => color(d.region_code))
    .style("stroke-width", (d) => (story_data.has(to_story_key(d)) ? 10 : 0))
    .style("stroke", (d) => color(d.region_code))
    .style("stroke-opacity", 0.5);
  serie
    .append("g")
    .attr("class", (d) => `storypoints_${d[0]}`)
    .selectAll(".point")
    .data((d) => d[1])
    .join("circle")
    .attr("class", (d) => `storypoint strorypoint_${d.region_code}`)
    .attr("cx", (d) => x(d.Year))
    .attr("cy", (d) => y(d[yField]))
    .attr("r", (d) => (story_data.has(to_story_key(d)) ? 3 : 0))
    .style("stroke-width", (d) => (story_data.has(to_story_key(d)) ? 20 : 0))
    .style("stroke", (d) => color(d.region_code))
    .style("stroke-opacity", 0.2);

  // Draw circles for all data points.
  serie
    .append("g")
    .attr("class", (d) => `points_${d[0]}`)
    .selectAll(".point")
    .data((d) => d[1])
    .join("circle")
    .attr("class", (d) => `point point_${d.region_code}`)
    .attr("cx", (d) => x(d.Year))
    .attr("cy", (d) => y(d[yField]))
    .attr("r", 3)
    .attr("fill", (d) => color(d.region_code));

  // Add interaction.
  // Add tooltip and story popup at the end to keep it on top of all other layers.
  const tooltip = gDrawing.append("g").attr("class", "ttip");

  const points = gDrawing.selectAll(".point");
  const lines = gDrawing.selectAll(".line");
  const story_points = gDrawing.selectAll(".storypoint");

  // Show tooltip on mouse move.
  points.on("touchmove mousemove", function (event, d) {
    const [x, y] = d3.pointer(event);
    show_tooltip(tooltip, x, y, d);
  });

  story_points.on("touchmove mousemove", function (event, d) {
    const [x, y] = d3.pointer(event);
    show_tooltip(tooltip, x, y, d);
  });

  // Hide tool tip on mouse out
  points.on("touchend mouseleave", () => hide_tooltip(tooltip));
  story_points.on("touchend mouseleave", () => hide_tooltip(tooltip));

  // Highlight series data on mouseover on the points as well as the trend line
  story_points.on("mouseover.highlight", (event, d) =>
    highlight_series(gDrawing, d.region_code)
  );
  points.on("mouseover.highlight", (event, d) =>
    highlight_series(gDrawing, d.region_code)
  );
  lines.on("mouseover.highlight", (event, d) =>
    highlight_series(gDrawing, d[0])
  );

  // De-Highlight series data on mouseout
  story_points.on("mouseout.highlight", (event, d) =>
    dehighlight_all_series(gDrawing)
  );
  points.on("mouseout.highlight", (event, d) =>
    dehighlight_all_series(gDrawing)
  );
  lines.on("mouseout.highlight", (event, d) =>
    dehighlight_all_series(gDrawing)
  );

  // Add legend
  const legendWidth = 500;
  gDrawing
    .append("g")
    .style("font-size", "12px")
    .attr(
      "transform",
      `translate(${width - margin.right - legendWidth - 200}, ${iheight + 15})`
    )
    .append(() =>
      Legend(color, {
        width: legendWidth,
        tickFormat: (v) => regions.get(v)
      })
    );

  if (
    enable_initial_story &&
    sel_vaccine == "DTP1" &&
    yField == "Unvaccinated"
  ) {
    narrate(gDrawing, tooltip, story, true);
  }

  return target;
}
)}

function _hide_tooltip(callout){return(
(tooltip) => {
  tooltip.call(callout, null);
}
)}

function _show_tooltip(callout,tooltip_text){return(
(tooltip, x, y, d) => {
  // tooltip group's .call is used to display county detail.
  tooltip.raise();
  tooltip
    .attr("transform", `translate(${x},${y + 10})`)
    .call(callout, tooltip_text(d));
}
)}

function _narrate(hide_tooltip,show_tooltip,x,y,yField){return(
function narrate(gDrawing, story_popup, cur_story, first) {
  const time_between_events = 1500;
  const transition_time = 2000;
  if (cur_story === null || cur_story === undefined) {
    gDrawing
      .transition()
      .delay(time_between_events)
      .duration(transition_time)
      .call(() => {
        hide_tooltip(story_popup);
      });
    return;
  }
  gDrawing
    .transition()
    .delay(first ? 500 : time_between_events)
    .duration(transition_time)
    .call(() => {
      show_tooltip(
        story_popup,
        x(cur_story.data.Year),
        y(cur_story.data[yField]),
        cur_story.data
      );
    })
    .on("end", () => {
      narrate(gDrawing, story_popup, cur_story.next, false);
    });
}
)}

function _to_story_key(){return(
(d) => `${d.Year.getFullYear()}::${d.region_code}::${d.Vaccine}`
)}

function _dehighlight_all_series(){return(
(gDrawing) => {
  const points = gDrawing.selectAll(".point");
  const lines = gDrawing.selectAll(".line");
  points
    .style("stroke", null)
    .style("fill-opacity", 1)
    .style("stroke-opacity", 1);
  lines.style("stroke-width", 2).style("stroke-opacity", 1);
}
)}

function _highlight_series(color){return(
(gDrawing, region_code) => {
  const points = gDrawing.selectAll(".point");
  const lines = gDrawing.selectAll(".line");
  // Dim all series first.
  points.style("stroke-opacity", 0.3).style("fill-opacity", 0.3);
  lines.style("stroke-opacity", 0.3);

  // Now highlight the selected series
  const parentNode = gDrawing.select(`.series_${region_code}`);
  // Raise all points in this series
  parentNode.raise();
  gDrawing.select(`.points_${region_code}`).raise();

  // Highlight all points in this series
  parentNode
    .selectAll(`.point_${region_code}`)
    .style("stroke-width", 5)
    .style("stroke", color(region_code))
    .style("stroke-opacity", 1)
    .style("fill-opacity", 1);

  // Highlight all lines in this series
  parentNode
    .selectAll(`.line_${region_code}`)
    .style("stroke-width", 3)
    .style("stroke-opacity", 1);
}
)}

function _formatters()
{
  const percent_formatter = (number) =>
    `${Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 3,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(number)}%`;

  const number_formatter = (number) =>
    `${Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(number)}`;

  return {
    Coverage: percent_formatter,
    "Not Covered": percent_formatter,
    Vaccinated: number_formatter,
    Unvaccinated: number_formatter
  };
}


function _tooltip_text(to_story_key,formatters,yField,story_data){return(
(data) => {
  const story_key = to_story_key(data);
  const formatted_val = formatters[yField](data[yField]);

  if (story_data.has(story_key)) {
    // TODO: Support multiple highlights for one point.
    const highlight = story_data.get(story_key)[0].highlight;
    return `${
      data.region_name
    }, ${data.Year.getFullYear()}\n${formatted_val}\n\n${highlight}`;
  } else {
    return `${data.region_name}, ${data.Year.getFullYear()}\n${formatted_val}`;
  }
}
)}

function _callout(){return(
(g, value) => {
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

  const text = g
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
    );

  const { x, y, width: w, height: h } = text.node().getBBox(); // the box that our text is in
  
  // place the text
  text.attr("transform", `translate(${-w / 2},${15 - y})`);

  // Create the box around the text
  path.attr(
    "d",
    `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
  );
  return g;
}
)}

function _line2(d3,x,y){return(
d3
  .line()
  .x((d) => x(d.Year))
  .y((d) => y(d.Coverage))
)}

function _iwidth(width,margin){return(
width - margin.left - margin.right
)}

function _iheight(height,margin){return(
height - margin.top - margin.bottom
)}

function _margin(){return(
{ left: 100, top: 50, right: 60, bottom: 60 }
)}

function _color(d3){return(
d3.scaleOrdinal([
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#a65628",
  "#f781bf",
  "#999999"
])
)}

function _x(d3,chart_data,width,margin){return(
d3
  .scaleTime()
  .domain(d3.extent(chart_data, (d) => d.Year))
  .range([0, width - margin.left - margin.right])
  .nice()
)}

function _23(y){return(
y.domain()
)}

function _y(d3,chart_data,yField,height,margin)
{
  const yExtent = d3.extent(chart_data, (d) => d[yField]);

  return d3
    .scaleLinear()
    .domain(yExtent)
    .range([height - margin.top - margin.bottom, 0])
    .nice();
}


function _height(width){return(
0.45 * width
)}

function _yField(metricNamesMap,yFieldD){return(
metricNamesMap[yFieldD]
)}

function _27(md){return(
md`## Data`
)}

function _28(md){return(
md`### Preprocessing`
)}

function _29(story_data){return(
story_data
)}

function _story(d3,chart_data,story_data)
{
  const regions_data_map = d3.group(
    chart_data,
    (d) => d.region_code,
    (d) => d.Year.getFullYear()
  );
  return {
    region: "REG_GLOBAL",
    year: 2020,
    text: story_data.get("2020::REG_GLOBAL::DTP1")[0].highlight,
    data: regions_data_map.get("REG_GLOBAL").get(2020)[0],
    next: {
      region: "REG_GLOBAL",
      year: 2021,
      text: story_data.get("2021::REG_GLOBAL::DTP1")[0].highlight,
      data: regions_data_map.get("REG_GLOBAL").get(2021)[0],
      next: {
        region: "AFR",
        year: 2019,
        text: story_data.get("2019::AFR::DTP1")[0].highlight,
        data: regions_data_map.get("AFR").get(2019)[0],
        next: {
          region: "SEAR",
          year: 2020,
          text: story_data.get("2020::SEAR::DTP1")[0].highlight,
          data: regions_data_map.get("SEAR").get(2020)[0],
          next: {
            region: "EMR",
            year: 2020,
            text: story_data.get("2020::EMR::DTP1")[0].highlight,
            data: regions_data_map.get("EMR").get(2020)[0]
          }
        }
      }
    }
  };
}


function _seriesData(d3,chart_data){return(
d3.groups(chart_data, (d) => d.region_code)
)}

function _chart_data(regional_vax_number,sel_vaccine){return(
regional_vax_number.filter((v) => v.Vaccine == sel_vaccine)
)}

function _vaccines(regional_vax_number){return(
Array.from(new Set(regional_vax_number.map((v) => v.Vaccine)))
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


function _metricDispNames(){return(
[
  "Vaccinated(%)",
  "Not Vaccinated(%)",
  "Vaccinated(#)",
  "Not Vaccinated(#)"
]
)}

function _36(md){return(
md`### Load Data`
)}

function _story_data(FileAttachment,d3){return(
FileAttachment("regional_stories.csv")
  .csv()
  .then((d) => {
    d.map((row) => {
      row.highlight = row.highlight.replaceAll("\\n", "\n");
    });
    return d3.group(d, (d) => d.key);
  })
)}

function _vaccines_master(FileAttachment){return(
FileAttachment("vaccines_master.csv").csv()
)}

function _regions(FileAttachment){return(
FileAttachment("regions_master.csv")
  .csv()
  .then(
    (regions) =>
      new Map(regions.map((region) => [region.code, region.region_name]))
  )
)}

function _regional_vax_number(FileAttachment,fmt){return(
FileAttachment("unicef_regional_coverage_2015_2021.csv")
  .csv()
  .then((data) => {
    data.map((row) => {
      row.Year = fmt(row.Year);
      row.Coverage = +row.Coverage;
      row.Vaccinated = +row.Vaccinated;
      row.Unvaccinated = +row.Unvaccinated;
      row.Target = +row.Target;
      row["Not Covered"] = +row["Not Covered"];
    });
    return data;
  })
)}

function _fmt(d3){return(
d3.timeParse("%Y")
)}

function _DATA_URL_BASE(){return(
"https://apps-summer.ischool.berkeley.edu/~ram.senth/w209/vaxviz"
)}

function _43(md){return(
md`## Imports`
)}

function _d3Fetch(require){return(
require("d3-fetch")
)}

function _d3(require){return(
require("d3@6")
)}

function _data(require){return(
require("vega-datasets@2")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["vaccines_master.csv", {url: new URL("./files/f5250596cae55df5f198a45fb75edccef41404fdaeb90cf73db91f3e4a1af978448859990b9db172b5dd69a10dbbbda4860913313d005ae40d8171cd1f28e738.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["regions_master.csv", {url: new URL("./files/05d199b4b5b31907d15b326d31d62754a460838de71e4432d0ae1df4512a4f8186539ed67d0fd07a71039820406527d9de6f742f0eb02e06af2c1bee3045a374.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["unicef_regional_coverage_2015_2021.csv", {url: new URL("./files/becd2331310fd5cb391ed25c51d4f17e372ea3b23b1d87a90df2b0ea5cf714887c526bee621bc9ca50647f0f5018955ab55986bb76694d4c34997488e8f638c2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["regional_stories.csv", {url: new URL("./files/777fd8805c230db86e2fd699fec43e95637ca0da771618ae92b38a9daa5d5ba5234fc8eb7493e6ec53deed62ec0ef2a5bd242d9ed1518513dfafee458fa87285.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("enable_initial_story")).define("enable_initial_story", _enable_initial_story);
  main.variable(observer("viewof sel_vaccine")).define("viewof sel_vaccine", ["select","vaccines"], _sel_vaccine);
  main.variable(observer("sel_vaccine")).define("sel_vaccine", ["Generators", "viewof sel_vaccine"], (G, _) => G.input(_));
  main.variable(observer("viewof yFieldD")).define("viewof yFieldD", ["select","metricDispNames"], _yFieldD);
  main.variable(observer("yFieldD")).define("yFieldD", ["Generators", "viewof yFieldD"], (G, _) => G.input(_));
  main.variable(observer("layout")).define("layout", ["plotty"], _layout);
  main.variable(observer("plotty")).define("plotty", ["html","d3","width","height","margin","x","iheight","iwidth","y","yField","sel_vaccine","yFieldD","seriesData","color","story_data","to_story_key","show_tooltip","hide_tooltip","highlight_series","dehighlight_all_series","Legend","regions","enable_initial_story","narrate","story"], _plotty);
  main.variable(observer("hide_tooltip")).define("hide_tooltip", ["callout"], _hide_tooltip);
  main.variable(observer("show_tooltip")).define("show_tooltip", ["callout","tooltip_text"], _show_tooltip);
  main.variable(observer("narrate")).define("narrate", ["hide_tooltip","show_tooltip","x","y","yField"], _narrate);
  main.variable(observer("to_story_key")).define("to_story_key", _to_story_key);
  main.variable(observer("dehighlight_all_series")).define("dehighlight_all_series", _dehighlight_all_series);
  main.variable(observer("highlight_series")).define("highlight_series", ["color"], _highlight_series);
  main.variable(observer("formatters")).define("formatters", _formatters);
  main.variable(observer("tooltip_text")).define("tooltip_text", ["to_story_key","formatters","yField","story_data"], _tooltip_text);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("line2")).define("line2", ["d3","x","y"], _line2);
  main.variable(observer("iwidth")).define("iwidth", ["width","margin"], _iwidth);
  main.variable(observer("iheight")).define("iheight", ["height","margin"], _iheight);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("x")).define("x", ["d3","chart_data","width","margin"], _x);
  main.variable(observer()).define(["y"], _23);
  main.variable(observer("y")).define("y", ["d3","chart_data","yField","height","margin"], _y);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("yField")).define("yField", ["metricNamesMap","yFieldD"], _yField);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["story_data"], _29);
  main.variable(observer("story")).define("story", ["d3","chart_data","story_data"], _story);
  main.variable(observer("seriesData")).define("seriesData", ["d3","chart_data"], _seriesData);
  main.variable(observer("chart_data")).define("chart_data", ["regional_vax_number","sel_vaccine"], _chart_data);
  main.variable(observer("vaccines")).define("vaccines", ["regional_vax_number"], _vaccines);
  main.variable(observer("metricNamesMap")).define("metricNamesMap", _metricNamesMap);
  main.variable(observer("metricDispNames")).define("metricDispNames", _metricDispNames);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("story_data")).define("story_data", ["FileAttachment","d3"], _story_data);
  main.variable(observer("vaccines_master")).define("vaccines_master", ["FileAttachment"], _vaccines_master);
  main.variable(observer("regions")).define("regions", ["FileAttachment"], _regions);
  main.variable(observer("regional_vax_number")).define("regional_vax_number", ["FileAttachment","fmt"], _regional_vax_number);
  main.variable(observer("fmt")).define("fmt", ["d3"], _fmt);
  main.variable(observer("DATA_URL_BASE")).define("DATA_URL_BASE", _DATA_URL_BASE);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("d3Fetch")).define("d3Fetch", ["require"], _d3Fetch);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.import("swatches", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("data")).define("data", ["require"], _data);
  const child2 = runtime.module(define2);
  main.import("Scrubber", child2);
  const child3 = runtime.module(define3);
  main.import("slider", child3);
  main.import("select", child3);
  return main;
}
