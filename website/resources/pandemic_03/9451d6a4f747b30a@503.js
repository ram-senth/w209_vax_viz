import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./450051d7f1174df8@255.js";

function _1(md){return(
md`# Week 10 Assignment`
)}

function _curState(Scrubber,states_of_interest){return(
Scrubber(states_of_interest, { delay: 2500, repeat: false })
)}

function _chartview(genChart,topojson,us,counties,state_name_to_id,curState){return(
genChart(
  topojson.mesh(us, us.objects.nation),
  topojson.feature(us, us.objects.states),
  counties,
  state_name_to_id.get(curState)
)
)}

function _genChart(color,d3,width,height,margin,Legend,callout,state_features,state_id_to_name)
{
  var isZoomed = false;

  const charter = (country, states, counties, zoom_to) => {
    const tooltip_string = (d) => {
      const county_name = d.properties.name;
      const state_name = d.properties.state_name;
      const formatter = Intl.NumberFormat("en-US", {
        style: "percent",
        maximumSignificantDigits: 2
      });

      const unemp_rate =
        d.properties.unemp_rate == -1
          ? "No Data"
          : formatter.format(d.properties.unemp_rate);
      return `${county_name}\n${state_name}\n${unemp_rate}`;
    };

    const color_matcher = (d) => {
      if (d.properties.unemp_rate == -1) {
        // Missing data
        return "lightgray";
      } else {
        return color(d.properties.unemp_rate);
      }
    };

    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

    // Construct a path generator.
    const path = d3.geoPath();

    // Create the SVG container.
    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
    const g = svg.append("g");
    // g.call(zoom); // Enabling zoom and pan needs more work.
    var curstate = zoom_to;

    // Add chart main title.
    svg
      .append("text")
      .attr("class", "chartMainTitle")
      .attr("id", "chartMainTitle")
      .text("States with High Unemployment Rate")
      .style("font-weight", "bold")
      .style("font-size", "1.5em")
      .style("text-anchor", "middle")
      .attr(
        "transform",
        `translate(${(width - 4 * (margin.left + margin.right)) / 2}, ${
          margin.top
        })`
      );

    function set_sub_title(svg, title) {
      d3.select("#chartTitle").remove();
      svg
        .append("text")
        .attr("class", "chartTitle")
        .attr("id", "chartTitle")
        .text(title)
        .style("font-weight", "bold")
        .style("font-size", "1.2em")
        .style("text-anchor", "middle")
        .attr(
          "transform",
          `translate(${(width - 4 * (margin.left + margin.right)) / 2}, ${
            margin.top + 20
          })`
        );
    }
    // Add legend.
    svg
      .append("g")
      .attr("transform", `translate(550, ${height - margin.bottom - 75})`)
      .append(() =>
        Legend(color, {
          width: 260,
          tickFormat: (v) => {
            const formatter = Intl.NumberFormat("en-US", {
              style: "percent"
            });
            return formatter.format(v.toFixed(2));
          }
        })
      );

    // Create the county layer with unemployment based fill
    if (counties) {
      g.append("g")
        .selectAll("path")
        .data(counties.features)
        .join("path")
        .attr("cursor", "pointer")
        .attr("fill", color_matcher)
        .attr("stroke", "white")
        .attr("stroke-width", "0.5")
        .attr("d", path)
        .on("touchmove mousemove", function (event, d) {
          const [x, y] = d3.pointer(event);
          // tooltip group's .call is used to display county detail.
          tooltip
            .attr("transform", `translate(${x},${y + 10})`)
            .call(callout, tooltip_string(d), isZoomed);
        })
        .on("touchend mouseleave", () => tooltip.call(callout, null))
        .on("click", clicked);
    }

    // Adding state layer after county layer ensure that the state borders are shown over county borders.
    const g_states = g
      .append("path")
      .datum(states)
      .style("fill", "none")
      .style("stroke", "gray")
      .style("stroke-width", "0.7")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

    // Adding country layer after state layer ensure that the country borders are shown over county and state borders.
    if (country) {
      g.append("path")
        .datum(country)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", "0.75")
        .attr("d", path);
    }
    // Add tooltip group at the end to keep it on top of all other layers.
    const tooltip = g.append("g").attr("class", "tooltip");

    function reset(delay) {
      svg
        .transition()
        .duration(750)
        .delay(delay)
        .call(
          zoom.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
    }
    function zoomed(event) {
      const { transform } = event;
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
    }

    function zoom_to_state(state_id, transition_duration, auto_zoom) {
      const state_geo = state_features.get(state_id);
      const [[x0, y0], [x1, y1]] = path.bounds(state_geo);

      var title = zoom_to ? `${state_id_to_name.get(state_id)}` : "";
      set_sub_title(svg, title);

      if (auto_zoom) {
        svg
          .transition()
          .duration(transition_duration)
          .call(
            zoom.transform,
            d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(
                Math.min(
                  5,
                  0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
                )
              )
              .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
          )

          .on("end", () => {
            reset(500);
          });
      } else {
        svg
          .transition()
          .duration(transition_duration)
          .call(
            zoom.transform,
            d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(
                Math.min(
                  5,
                  0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
                )
              )
              .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
          );
      }

      isZoomed = true;
    }

    function clicked(event, d) {
      // if already zoomed in then zoom out else zoom in.
      if (isZoomed) {
        set_sub_title(svg, "");
        reset(0);
        isZoomed = false;
      } else {
        event.stopPropagation();
        zoom_to_state(d.properties.state_id, 700, false);
        d3.pointer(event, svg.node());
      }
    }

    if (zoom_to) {
      zoom_to_state(zoom_to, 1300, true);
    }
    return svg.node();
  };
  return charter;
}


function _callout(){return(
(g, value, isZoomed) => {
  if (!value || isZoomed) {
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

function _colors_reds(){return(
[
  "#ffffcc",
  "#ffeda0",
  "#fed976",
  "#feb24c",
  "#fd8d3c",
  "#fc4e2a",
  "#e31a1c",
  "#bd0026",
  "#800026"
]
)}

function _color(d3,county_unemp_rates,colors_reds){return(
d3.scaleQuantize([0, d3.max(county_unemp_rates.values())], colors_reds)
)}

function _margin(){return(
{ left: 20, right: 10, top: 30, bottom: 0 }
)}

function _height(width){return(
0.6 * width
)}

function _10(md){return(
md`## Data`
)}

function _counties(topojson,us,county_unemp_rates,state_id_to_name)
{
  const counties = topojson.feature(us, us.objects.counties);

  // Augment county geo data with state info and unemployment rate.
  counties.features.forEach((county) => {
    const state_id = county.id.substring(0, 2);
    const county_unemp_rate = county_unemp_rates.has(county.id)
      ? county_unemp_rates.get(county.id)
      : -1; // Missing data indicator.
    county.properties.state_id = state_id;
    county.properties.state_name = state_id_to_name.get(state_id);
    county.properties.unemp_rate = county_unemp_rate;
  });
  return counties;
}


function _states_of_interest(){return(
[
  "Nevada",
  "Hawaii",
  "California",
  "Michigan",
  "Oregon",
  "Alabama",
  "South Carolina",
  "Florida",
  "Arizona",
  "Tennessee",
  "Mississippi",
  "Alaska"
]
)}

function _state_name_to_id(states){return(
new Map(
  states.features.map((state) => [state.properties.name, state.id])
)
)}

function _state_id_to_name(states){return(
new Map(
  states.features.map((state) => [state.id, state.properties.name])
)
)}

function _state_features(states)
{
  const state_features = new Map();
  states.features.map((feat) => {
    state_features.set(feat.id, {
      type: "FeatureCollection",
      features: [feat]
    });
  });
  return state_features;
}


function _states(topojson,us){return(
topojson.feature(us, us.objects.states)
)}

function _us(FileAttachment){return(
FileAttachment("counties-albers-10m.json").json()
)}

function _county_unemp_rates(d3,data){return(
d3.tsv(data["unemployment.tsv"].url).then(
  // The ids need to be padded with 0 if needed to create a consistent 5 character length value.
  (data) => new Map(data.map((r) => [r.id.padStart(5, "0"), +r.rate]))
)
)}

function _19(md){return(
md`## Imports`
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
    ["counties-albers-10m.json", {url: new URL("./files/7cb7baa0d1395a67eac748dbd8e1b8d64c8545d9467ac3129edb596327c0199476f1114914774a604a6d32d784a7c77c2cc55b6a18ff7f8a90b9c38610097709.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof curState")).define("viewof curState", ["Scrubber","states_of_interest"], _curState);
  main.variable(observer("curState")).define("curState", ["Generators", "viewof curState"], (G, _) => G.input(_));
  main.variable(observer("chartview")).define("chartview", ["genChart","topojson","us","counties","state_name_to_id","curState"], _chartview);
  main.variable(observer("genChart")).define("genChart", ["color","d3","width","height","margin","Legend","callout","state_features","state_id_to_name"], _genChart);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("colors_reds")).define("colors_reds", _colors_reds);
  main.variable(observer("color")).define("color", ["d3","county_unemp_rates","colors_reds"], _color);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("counties")).define("counties", ["topojson","us","county_unemp_rates","state_id_to_name"], _counties);
  main.variable(observer("states_of_interest")).define("states_of_interest", _states_of_interest);
  main.variable(observer("state_name_to_id")).define("state_name_to_id", ["states"], _state_name_to_id);
  main.variable(observer("state_id_to_name")).define("state_id_to_name", ["states"], _state_id_to_name);
  main.variable(observer("state_features")).define("state_features", ["states"], _state_features);
  main.variable(observer("states")).define("states", ["topojson","us"], _states);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  main.variable(observer("county_unemp_rates")).define("county_unemp_rates", ["d3","data"], _county_unemp_rates);
  main.variable(observer()).define(["md"], _19);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("data")).define("data", ["require"], _data);
  const child2 = runtime.module(define2);
  main.import("Scrubber", child2);
  return main;
}
