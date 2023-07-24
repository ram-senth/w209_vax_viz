import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./a2e58f97fd5e8d7c@754.js";
import define4 from "./fee7fe5d78621cf6@224.js";

function _1(md){return(
md`# VaxViz-Pandemic-01 - V2`
)}

function _2(md){return(
md`## Chart`
)}

function _enableAutoHighlights(){return(
true
)}

function _replay_button(highlightsByVaccine,sel_vaccine,Button,showHighlights)
{
  const hasNarrative = highlightsByVaccine.has(sel_vaccine);
  return Button(hasNarrative ? "Show Highlights" : "No Highlights To Show", {
    disabled: !hasNarrative,
    value: null,
    reduce: () => {
      showHighlights();
      return "done";
    }
  });
}


function _sel_vaccine(select,vaccines){return(
select({
  options: vaccines,
  title: "Vaccine:  ",
  // description:
  //   "Select the vaccine to focus on. DTP1 is considered the standard to measure overall vaccine coverage.",
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

function _layout(plotty){return(
plotty()
)}

function _vaxInfo(vaccinesMaster,sel_vaccine)
{
  const vaxInfo = vaccinesMaster.get(sel_vaccine.toLowerCase());
  return `${vaxInfo.description}. It provides protection against ${vaxInfo.disease}.`;
}


function _plotty(html,d3,width,height,margin,x,iheight,iwidth,y,yFieldD,sel_vaccine,seriesData,color,yField,highlights,toHighlightKey,showTooltip,hideTooltip,focusOnSeries,defocusSeries,Legend,regions){return(
(spotlight) => {
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

  // Add tooltip and story popup at the end to keep it on top of all other layers.
  const tooltip = gDrawing.append("g").attr("class", "ttip");

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
    .text(yFieldD)
    .style("fill", "black")
    .attr("transform", `translate(0, -10)`)
    .style("text-anchor", "middle");

  // Add the placeholder for the title of the plot.
  gDrawing
    .append("text")
    .attr("class", "chartHeader")
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
  const lines = serie
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
    .attr("r", (d) => (highlights.has(toHighlightKey(d)) ? 3 : 0))
    .attr("fill", (d) => color(d.region_code))
    .style("stroke-width", (d) => (highlights.has(toHighlightKey(d)) ? 10 : 0))
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
    .attr("r", (d) => (highlights.has(toHighlightKey(d)) ? 3 : 0))
    .style("stroke-width", (d) => (highlights.has(toHighlightKey(d)) ? 20 : 0))
    .style("stroke", (d) => color(d.region_code))
    .style("stroke-opacity", 0.2);

  // Draw circles for all data points.
  const points = serie
    .append("g")
    .attr("class", (d) => `points_${d[0]}`)
    .selectAll(".point")
    .data((d) => d[1])
    .join("circle")
    .attr("class", (d) => `point point_${d.region_code}`)
    .attr("cx", (d) => x(d.Year))
    .attr("cy", (d) => y(d[yField]))
    .attr("r", 3)
    .attr("fill", (d) => color(d.region_code))
    .call((d) => {
      // if (spotlight) {
      //   const story = highlights.get(spotlight)[0];
      //   narrate(gDrawing, tooltip, story, true, true);
      // }
      // if (enable_initial_story && narrative_by_vaccine.has(sel_vaccine)) {
      //   tooltip.call((v) => {
      //     narrate(
      //       gDrawing,
      //       tooltip,
      //       narrative_by_vaccine.get(sel_vaccine)[0],
      //       true,
      //       false
      //     );
      //   });
      // }
    });

  // Add interaction.
  // const points = gDrawing.selectAll(".point");
  // const lines = gDrawing.selectAll(".line");
  const story_points = gDrawing.selectAll(".storypoint");

  // Show tooltip on mouse move.
  points.on("touchmove mousemove", function (event, d) {
    const [x, y] = d3.pointer(event);
    showTooltip(gDrawing, tooltip, x, y, d);
  });

  story_points.on("touchmove mousemove", function (event, d) {
    const [x, y] = d3.pointer(event);
    showTooltip(gDrawing, tooltip, x, y, d);
  });

  // Hide tool tip on mouse out
  points.on("touchend mouseleave", () => hideTooltip(tooltip));
  story_points.on("touchend mouseleave", () => hideTooltip(tooltip));

  // Highlight series data on mouseover on the points as well as the trend line
  story_points.on("mouseover.highlight", (event, d) =>
    focusOnSeries(gDrawing, d.region_code)
  );
  points.on("mouseover.highlight", (event, d) =>
    focusOnSeries(gDrawing, d.region_code)
  );
  lines.on("mouseover.highlight", (event, d) => focusOnSeries(gDrawing, d[0]));

  // De-Highlight series data on mouseout
  story_points.on("mouseout.highlight", (event, d) => defocusSeries(gDrawing));
  points.on("mouseout.highlight", (event, d) => defocusSeries(gDrawing));
  lines.on("mouseout.highlight", (event, d) => defocusSeries(gDrawing));

  // Add legend
  const legendWidth = 650;
  gDrawing
    .append("g")
    .style("font-size", "12px")
    .attr("transform", `translate(${iwidth - legendWidth}, ${iheight + 25})`)
    .append(() =>
      Legend(color, {
        width: legendWidth,
        tickFormat: (v) => regions.get(v)
      })
    );

  return target;
}
)}

function _autoHighlight(enableAutoHighlights,d3,layout,showHighlights)
{
  if (enableAutoHighlights) {
    d3.select(layout).call((d) => showHighlights());
    return true;
  } else {
    return false;
  }
}


function _showHighlights(highlightsByVaccine,sel_vaccine,d3,layout,showOneHighlight){return(
() => {
  
  if (highlightsByVaccine.has(sel_vaccine)) {
    const gDrawing = d3.select(layout).select(".gDrawing");
    const tooltip = d3.select(".ttip");
    showOneHighlight(
      gDrawing,
      tooltip,
      highlightsByVaccine.get(sel_vaccine)[0],
      true,
      false
    );
  }
  return "done";
}
)}

function _showOneHighlight(hideTooltip,showTooltip,x,y,yField){return(
function showOneHighlight(
  gDrawing,
  story_popup,
  cur_story,
  first,
  stop_with_one
) {
  const time_between_events = 1500;
  const transition_time = 2000;
  if (cur_story === null || cur_story === undefined) {
    gDrawing
      .transition()
      .delay(time_between_events)
      .duration(transition_time)
      .call(() => {
        hideTooltip(story_popup);
      });
    return;
  }
  gDrawing
    .transition()
    .delay(first ? time_between_events : time_between_events)
    .duration(transition_time)
    .call(() => {
      showTooltip(
        gDrawing,
        story_popup,
        x(cur_story.data.Year),
        y(cur_story.data[yField]),
        cur_story.data
      );
    })
    .on("end", () => {
      if (stop_with_one) {
        showOneHighlight(gDrawing, story_popup, null, false);
      } else {
        showOneHighlight(gDrawing, story_popup, cur_story.next, false);
      }
    });
}
)}

function _hideTooltip(callout){return(
(tooltip) => {
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

function _toHighlightKey(){return(
(d) =>
  `${d.Year.getFullYear()}::${d.region_code}::${d.Vaccine}`
)}

function _defocusSeries(){return(
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

function _focusOnSeries(color){return(
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


function _tooltipText(toHighlightKey,formatters,yField,highlights){return(
(data) => {
  const story_key = toHighlightKey(data);
  const formatted_val = formatters[yField](data[yField]);

  if (highlights.has(story_key)) {
    // TODO: Support multiple highlights for one point.
    const highlight = highlights.get(story_key)[0].highlight;
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
    )
    .call((text) => {
      const { x, y, width: w, height: h } = text.node().getBBox(); // the box that our text is in

      // place the text
      text.attr("transform", `translate(${-w / 2},${15 - y})`);
    });

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
{ left: 100, top: 50, right: 100, bottom: 150 }
)}

function _color(d3){return(
d3.scaleOrdinal([
  "#f781bf",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#a65628",
  "#e41a1c",
  "#999999"
])
)}

function _x(d3,chartData,width,margin){return(
d3
  .scaleTime()
  .domain(d3.extent(chartData, (d) => d.Year))
  .range([0, width - margin.left - margin.right])
  .nice()
)}

function _y(d3,chartData,yField,height,margin)
{
  const yExtent = d3.extent(chartData, (d) => d[yField]);

  return d3
    .scaleLinear()
    .domain(yExtent)
    .range([height - margin.top - margin.bottom, 0])
    .nice();
}


function _height(width){return(
0.35 * width
)}

function _yField(metricNamesMap,yFieldD){return(
metricNamesMap[yFieldD]
)}

function _30(md){return(
md`## Scrubber`
)}

function _Scrubber(html,Inputs){return(
function Scrubber(
  values,
  {
    format = (value) => value,
    initial = 0,
    direction = 1,
    delay = null,
    autoplay = true,
    loop = true,
    loopDelay = null,
    alternate = false,
    startTitle = "Play"
  } = {}
) {
  values = Array.from(values);
  const form = html`<form style="font: 12px var(--sans-serif); font-variant-numeric: tabular-nums; display: flex; height: 33px; align-items: center;">
  <button name=b type=button style="margin-right: 0.4em; width: 5em;"></button>
  <label style="display: flex; align-items: center;">
    <input name=i type=range min=0 max=${
      values.length - 1
    } value=${initial} step=1 style="width: 180px;">
    <output name=o style="margin-left: 0.4em;"></output>
  </label>
</form>`;
  let frame = null;
  let timer = null;
  let interval = null;
  function start() {
    form.b.textContent = "Pause";
    if (delay === null) frame = requestAnimationFrame(tick);
    else interval = setInterval(tick, delay);
  }
  function stop() {
    form.b.textContent = startTitle;
    if (frame !== null) cancelAnimationFrame(frame), (frame = null);
    if (timer !== null) clearTimeout(timer), (timer = null);
    if (interval !== null) clearInterval(interval), (interval = null);
  }
  function running() {
    return frame !== null || timer !== null || interval !== null;
  }
  function tick() {
    if (
      form.i.valueAsNumber ===
      (direction > 0 ? values.length - 1 : direction < 0 ? 0 : NaN)
    ) {
      if (!loop) return stop();
      if (alternate) direction = -direction;
      if (loopDelay !== null) {
        if (frame !== null) cancelAnimationFrame(frame), (frame = null);
        if (interval !== null) clearInterval(interval), (interval = null);
        timer = setTimeout(() => (step(), start()), loopDelay);
        return;
      }
    }
    if (delay === null) frame = requestAnimationFrame(tick);
    step();
  }
  function step() {
    form.i.valueAsNumber =
      (form.i.valueAsNumber + direction + values.length) % values.length;
    form.i.dispatchEvent(new CustomEvent("input", { bubbles: true }));
  }
  form.i.oninput = (event) => {
    if (event && event.isTrusted && running()) stop();
    form.value = values[form.i.valueAsNumber];
    form.o.value = format(form.value, form.i.valueAsNumber, values);
  };
  form.b.onclick = () => {
    if (running()) return stop();
    direction =
      alternate && form.i.valueAsNumber === values.length - 1 ? -1 : 1;
    form.i.valueAsNumber = (form.i.valueAsNumber + direction) % values.length;
    form.i.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    start();
  };
  form.i.oninput();
  if (autoplay) start();
  else stop();
  Inputs.disposal(form).then(stop);
  return form;
}
)}

function _32(md){return(
md`## Data`
)}

function _33(md){return(
md`### Preprocessing`
)}

function _seriesData(d3,chartData){return(
d3.groups(chartData, (d) => d.region_code)
)}

function _chartData(regionalVaxNumbers,sel_vaccine){return(
regionalVaxNumbers.filter((v) => v.Vaccine == sel_vaccine)
)}

function _vaccines(regionalVaxNumbers){return(
Array.from(new Set(regionalVaxNumbers.map((v) => v.Vaccine)))
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

function _highlightsByVaccine(d3,storyMaster){return(
d3.group(storyMaster, (d) => d.data.Vaccine)
)}

function _highlights(d3,storyMaster)
{
  const asMap = d3.group(storyMaster, (d) => d.key);
  for (let [key, stories] of asMap) {
    const story = stories[0];
    if (story.next_key) {
      story.next = asMap.get(story.next_key)[0];
    }
  }
  return asMap;
}


function _41(md){return(
md`### Load Data`
)}

function _storyMaster(FileAttachment,d3,regionalVaxNumbers,toHighlightKey){return(
FileAttachment("regional_stories@5.csv")
  .csv()
  .then((d) => {
    const data_map = d3.group(regionalVaxNumbers, (d) => toHighlightKey(d));
    d.map((row) => {
      row.highlight = row.highlight.replaceAll("\\n", "\n");
      // Add data reference
      const data = data_map.get(row.key)[0];
      row.data = data;
      row.Year = data.Year;
      row.vaccine = data.Vaccine;
      row.region_code = data.region_code;
    });
    return d;
  })
)}

function _vaccinesMaster(FileAttachment){return(
FileAttachment("vaccines_master@8.csv")
  .csv()
  .then((data) => {
    return new Map(data.map((row) => [row.vaccine_code, row]));
  })
)}

function _regions(FileAttachment){return(
FileAttachment("regions_master.csv")
  .csv()
  .then(
    (regions) =>
      new Map(regions.map((region) => [region.code, region.region_name]))
  )
)}

function _regionalVaxNumbers(FileAttachment,fmt){return(
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

function _48(md){return(
md`## Imports`
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["unicef_regional_coverage_2015_2021.csv", {url: new URL("./files/becd2331310fd5cb391ed25c51d4f17e372ea3b23b1d87a90df2b0ea5cf714887c526bee621bc9ca50647f0f5018955ab55986bb76694d4c34997488e8f638c2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["regions_master.csv", {url: new URL("./files/05d199b4b5b31907d15b326d31d62754a460838de71e4432d0ae1df4512a4f8186539ed67d0fd07a71039820406527d9de6f742f0eb02e06af2c1bee3045a374.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["regional_stories@5.csv", {url: new URL("./files/1ae9cee95ef8b233f851d88e93472f555d1391ee53c25a0fd2498ab1aef4e546c9c6ac9c1b15df4751882a08e265a96316a00e9dcafe7024290e19066720d59c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["vaccines_master@8.csv", {url: new URL("./files/24a8bc42908e4d8f8b981adb02bf8f85dba3a090dd0a6f892f4a5527ee9109799a481a61c2efcbe35324d335292c55e8380efa2e4e5bf7c076e311c2dc6b2f2d.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("enableAutoHighlights")).define("enableAutoHighlights", _enableAutoHighlights);
  main.variable(observer("viewof replay_button")).define("viewof replay_button", ["highlightsByVaccine","sel_vaccine","Button","showHighlights"], _replay_button);
  main.variable(observer("replay_button")).define("replay_button", ["Generators", "viewof replay_button"], (G, _) => G.input(_));
  main.variable(observer("viewof sel_vaccine")).define("viewof sel_vaccine", ["select","vaccines"], _sel_vaccine);
  main.variable(observer("sel_vaccine")).define("sel_vaccine", ["Generators", "viewof sel_vaccine"], (G, _) => G.input(_));
  main.variable(observer("viewof yFieldD")).define("viewof yFieldD", ["select","metricDispNames"], _yFieldD);
  main.variable(observer("yFieldD")).define("yFieldD", ["Generators", "viewof yFieldD"], (G, _) => G.input(_));
  main.variable(observer("layout")).define("layout", ["plotty"], _layout);
  main.variable(observer("vaxInfo")).define("vaxInfo", ["vaccinesMaster","sel_vaccine"], _vaxInfo);
  main.variable(observer("plotty")).define("plotty", ["html","d3","width","height","margin","x","iheight","iwidth","y","yFieldD","sel_vaccine","seriesData","color","yField","highlights","toHighlightKey","showTooltip","hideTooltip","focusOnSeries","defocusSeries","Legend","regions"], _plotty);
  main.variable(observer("autoHighlight")).define("autoHighlight", ["enableAutoHighlights","d3","layout","showHighlights"], _autoHighlight);
  main.variable(observer("showHighlights")).define("showHighlights", ["highlightsByVaccine","sel_vaccine","d3","layout","showOneHighlight"], _showHighlights);
  main.variable(observer("showOneHighlight")).define("showOneHighlight", ["hideTooltip","showTooltip","x","y","yField"], _showOneHighlight);
  main.variable(observer("hideTooltip")).define("hideTooltip", ["callout"], _hideTooltip);
  main.variable(observer("showTooltip")).define("showTooltip", ["callout","tooltipText"], _showTooltip);
  main.variable(observer("toHighlightKey")).define("toHighlightKey", _toHighlightKey);
  main.variable(observer("defocusSeries")).define("defocusSeries", _defocusSeries);
  main.variable(observer("focusOnSeries")).define("focusOnSeries", ["color"], _focusOnSeries);
  main.variable(observer("formatters")).define("formatters", _formatters);
  main.variable(observer("tooltipText")).define("tooltipText", ["toHighlightKey","formatters","yField","highlights"], _tooltipText);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("line2")).define("line2", ["d3","x","y"], _line2);
  main.variable(observer("iwidth")).define("iwidth", ["width","margin"], _iwidth);
  main.variable(observer("iheight")).define("iheight", ["height","margin"], _iheight);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("x")).define("x", ["d3","chartData","width","margin"], _x);
  main.variable(observer("y")).define("y", ["d3","chartData","yField","height","margin"], _y);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("yField")).define("yField", ["metricNamesMap","yFieldD"], _yField);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("Scrubber")).define("Scrubber", ["html","Inputs"], _Scrubber);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("seriesData")).define("seriesData", ["d3","chartData"], _seriesData);
  main.variable(observer("chartData")).define("chartData", ["regionalVaxNumbers","sel_vaccine"], _chartData);
  main.variable(observer("vaccines")).define("vaccines", ["regionalVaxNumbers"], _vaccines);
  main.variable(observer("metricNamesMap")).define("metricNamesMap", _metricNamesMap);
  main.variable(observer("metricDispNames")).define("metricDispNames", _metricDispNames);
  main.variable(observer("highlightsByVaccine")).define("highlightsByVaccine", ["d3","storyMaster"], _highlightsByVaccine);
  main.variable(observer("highlights")).define("highlights", ["d3","storyMaster"], _highlights);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("storyMaster")).define("storyMaster", ["FileAttachment","d3","regionalVaxNumbers","toHighlightKey"], _storyMaster);
  main.variable(observer("vaccinesMaster")).define("vaccinesMaster", ["FileAttachment"], _vaccinesMaster);
  main.variable(observer("regions")).define("regions", ["FileAttachment"], _regions);
  main.variable(observer("regionalVaxNumbers")).define("regionalVaxNumbers", ["FileAttachment","fmt"], _regionalVaxNumbers);
  main.variable(observer("fmt")).define("fmt", ["d3"], _fmt);
  main.variable(observer()).define(["md"], _48);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("select", child2);
  const child3 = runtime.module(define3);
  main.import("Button", child3);
  const child4 = runtime.module(define4);
  main.import("wrap_text", child4);
  main.import("wrap_text_nchar", child4);
  return main;
}
