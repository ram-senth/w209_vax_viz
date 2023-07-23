function _1(md){return(
md`# Connected scatterplot

This is a recreation of Hannah Fairfield’s [*Driving Shifts Into Reverse*](http://www.nytimes.com/imagepages/2010/05/02/business/02metrics.html), sans annotations. See also Fairfield’s [*Driving Safety, in Fits and Starts*](http://www.nytimes.com/interactive/2012/09/17/science/driving-safety-in-fits-and-starts.html), [Noah Veltman’s variation](https://bl.ocks.org/veltman/87596f5a256079b95eb9) of this graphic, and [a paper on connected scatterplots](http://steveharoz.com/research/connected_scatterplot/) by Haroz *et al.*`
)}

function _country(Inputs){return(
Inputs.select(
  [
    "World",
    "Afghanistan",
    "Angola",
    "Burkina Faso",
    "Chad",
    "Ethiopia",
    "Ghana",
    "Guinea",
    "Mali",
    "Niger",
    "Nigeria",
    "Pakistan",
    "Papua New Guinea",
    "Somalia",
    "Sudan",
    "South Sudan",
    "Tajikistan",
    "Yemen"
  ],
  {
    label: "Country",
    value: "World"
  }
)
)}

function _replay(Inputs){return(
Inputs.button("Replay")
)}

function _title(md){return(
md`### Vaccine derived polio cases over time`
)}

function _chart(replay,d3,filtered_data,length)
{
  replay;

  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the positional encodings.
  const x = d3
    .scaleLinear()
    .domain(d3.extent(filtered_data, (d) => d.Vaccination_rate))
    .nice()
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(filtered_data, (d) => d.Polio_cases))
    .nice()
    .range([height - marginBottom, marginTop]);

  const line = d3
    .line()
    .curve(d3.curveCatmullRom)
    .x((d) => x(d.Vaccination_rate))
    .y((d) => y(d.Polio_cases));

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  const l = length(line(filtered_data));

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("y2", -height)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", width - 4)
        .attr("y", -12)
        .attr("font-weight", "bold")
        .attr("font-size", "14")
        .attr("text-anchor", "end")
        .attr("fill", "orange")
        .text("Percentage of 1 year olds vaccinated against Polio")
    );

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .select(".tick:last-of-type text")
        .clone()
        .attr("x", 10)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("font-size", "14")
        .attr("fill", "orange")
        .text("Vaccine derived Polio cases")
    );

  svg
    .append("path")
    .datum(filtered_data)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-dasharray", `0,${l}`)
    .attr("d", line)
    .transition()
    .duration(5000)
    .ease(d3.easeLinear)
    .attr("stroke-dasharray", `${l},${l}`);

  svg
    .append("g")
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(filtered_data)
    .join("circle")
    .attr("cx", (d) => x(d.Vaccination_rate))
    .attr("cy", (d) => y(d.Polio_cases))
    .attr("r", 3);

  const label = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold")
    .attr("font-size", 12)
    .selectAll()
    .data(filtered_data)
    .join("text")
    .attr(
      "transform",
      (d) => `translate(${x(d.Vaccination_rate)},${y(d.Polio_cases)})`
    )
    .attr("fill-opacity", 0)
    .text((d) => d.Year)
    .attr("stroke", "white")
    .attr("paint-order", "stroke")
    .attr("fill", "steelblue")
    .each(function (d) {
      const t = d3.select(this);
      switch (d.side) {
        case "top":
          t.attr("text-anchor", "middle").attr("dy", "-0.7em");
          break;
        case "right":
          t.attr("dx", "0.5em")
            .attr("dy", "0.32em")
            .attr("text-anchor", "start");
          break;
        case "bottom":
          t.attr("text-anchor", "middle").attr("dy", "1.4em");
          break;
        case "left":
          t.attr("dx", "-0.5em")
            .attr("dy", "0.32em")
            .attr("text-anchor", "end");
          break;
      }
    });

  label
    .transition()
    .delay(
      (d, i) => (length(line(filtered_data.slice(0, i + 1))) / l) * (5000 - 125)
    )
    .attr("fill-opacity", 1);

  return svg.node();
}


function _filtered_data(cases_vax,country){return(
cases_vax.filter(function (el) {
  return el.Entity == country;
})
)}

function _cases_vax(FileAttachment){return(
FileAttachment("cases_vax_v2.csv").csv({ typed: true })
)}

function _8(md){return(
md`The *length* helper method computes the total length of the given SVG *path* string; this is needed to apply the stroke-dasharray transition across the length of the stroke.`
)}

function _length(d3){return(
(path) => d3.create("svg:path").attr("d", path).node().getTotalLength()
)}

function _10(md){return(
md`Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a similar chart with a [line mark](https://observablehq.com/plot/marks/line) and [markers](https://observablehq.com/plot/features/markers). See [Plot: Connected scatterplot](https://observablehq.com/@observablehq/plot-connected-scatterplot?intent=fork) for a detailed example.`
)}

function _11(Plot,filtered_data){return(
Plot.line(filtered_data, {
  x: "Vaccination_rate",
  y: "Polio_cases",
  marker: true,
  curve: "natural"
}).plot({ grid: true })
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cases_vax_v2.csv", {url: new URL("./files/6307a8c7278ba0a9486eb95d2dff9ef2ab29417a15e3dda0ffb943cd7ef048dd0342b9a73da36a1ed3aa671204b964e039fff3b6ef182d857f15bf5a68bbb790.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof country")).define("viewof country", ["Inputs"], _country);
  main.variable(observer("country")).define("country", ["Generators", "viewof country"], (G, _) => G.input(_));
  main.variable(observer("viewof replay")).define("viewof replay", ["Inputs"], _replay);
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("chart")).define("chart", ["replay","d3","filtered_data","length"], _chart);
  main.variable(observer("filtered_data")).define("filtered_data", ["cases_vax","country"], _filtered_data);
  main.variable(observer("cases_vax")).define("cases_vax", ["FileAttachment"], _cases_vax);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("length")).define("length", ["d3"], _length);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Plot","filtered_data"], _11);
  return main;
}
