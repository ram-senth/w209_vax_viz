import define1 from "./cd89ef62a7430a3c@64.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# VaxViz-Pandemic-03`
)}

function _2(md){return(
md`## First Option`
)}

function _3(md){return(
md`## Second Option`
)}

function _sel_vaccine(select,countryVaxData){return(
select({
  options: countryVaxData.vaccines,
  title: "Vaccine:  ",
  // description:
  //   "Select the vaccine to focus on. DTP1 is considered the standard to measure overall vaccine coverage.",
  value: "DTP3"
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
  title: "Right side year:  ",
  value: "2021"
  // description:
  //   "Select vaccinated vs unvaccinated metrics. You can also look at % values or the actual numbers."
})
)}

function _map3(html,d3,width,height,margin,iwidth,sel_vaccine,leftYear,rightYear,defaultProjection,geoCountries,addCountryLegend,addRegionalLegend,hideTooltip,hideLegend,showLegend,d3Map,colorCountry,showTooltip,geoOutline,geoGraticule,geoLand,geoBorders,regionCoords,regionFeatures)
{
  var isZoomed = false;

  const target = html`<div id="myviz">`;

  const svg = d3
    .select(target)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("display", "block")
    .on("click", clicked);

  const g = svg
    .append("g")
    .attr("class", "gDrawing")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tooltip = g.append("g").attr("class", "ttip");

  // Add the title of the plot.
  g.append("text")
    .attr("class", "chartHeader")
    .style("text-anchor", "middle")
    .attr("transform", `translate(${iwidth / 2}, ${0 - margin.top / 2})`)
    .text(
      `${sel_vaccine} Coverage Change between ${leftYear} and ${rightYear}`
    );

  const gCountries = g.append("g");
  const zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);

  addCountries(gCountries, defaultProjection, geoCountries);

  // Place holder for legend
  const gLegendCountry = g
    .append("g")
    .attr("class", "gLegend")
    .style("font-size", "12px");
  const gLegendRegion = g
    .append("g")
    .attr("class", "gLegend")
    .style("font-size", "12px");
  // Add legend
  addCountryLegend(gLegendCountry);
  addRegionalLegend(gLegendRegion);

  function zoomed(event) {
    const { transform } = event;
    gCountries.attr("transform", transform);
    gCountries.attr("stroke-width", 1 / transform.k);
  }

  function clicked(event, d) {
    // if already zoomed in then zoom out else zoom in.
    if (isZoomed) {
      isZoomed = false;
      reset(0, 500);
    } else {
      if (d && d.properties.region_code) {
        event.stopPropagation();
        isZoomed = true;
        zoomToRegion(event, d.properties.region_code, 700, false);
      }
    }
  }

  function reset(delay, duration) {
    svg
      .call(() => hideTooltip(tooltip))
      .transition()
      .call(defaultProjection)
      .transition()
      .duration(duration / 2)
      .delay(delay)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3
          .zoomTransform(svg.node())
          .invert([(width - margin.left) / 2, (height - margin.top) / 2])
      )
      .transition()
      .duration(duration / 2)
      .call(() => {
        gCountries.selectAll(".country").remove();
        gCountries.selectAll(".borders").remove();
        addCountries(gCountries, defaultProjection, geoCountries);
      });

    hideLegend(gLegendCountry);
    showLegend(gLegendRegion);
  }

  function addCountries(g, projection, geoCountries) {
    const path = d3Map.geoPath(projection);
    const countriesInMap = g
      .selectAll(".country")
      .data(geoCountries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", (d) => colorCountry(d, isZoomed))
      .on("click", clicked);
    countriesInMap.on("touchmove mousemove", function (event, d) {
      const [x, y] = d3.pointer(event, g.node());
      showTooltip(g, tooltip, x, y, d, isZoomed);
    });
    g.append("path")
      .attr("id", "outline")
      .attr("class", "borders")
      .style("stroke", "#ccc")
      .style("fill", "none")
      .attr("d", `${path(geoOutline)}`);
    g.append("path")
      .style("stroke", "#ccc")
      .attr("class", "borders")
      .style("fill", "none")
      .attr("d", `${path(geoGraticule)}`);
    g.append("path")
      .attr("class", "borders")
      .style("fill", "none")
      .style("stroke", "black")
      .attr("d", path(geoLand));
    g.append("path")
      .attr("class", "borders")
      .style("stroke", "gray")
      .style("fill", "none")
      .attr("d", path(geoBorders));
    countriesInMap.on("touchend mouseleave", () => hideTooltip(tooltip));
    return countriesInMap;
  }

  function zoomToRegion(event, region_code, transition_duration, auto_zoom) {
    //Globe rotating
    const newLocation = regionCoords.get(region_code);
    const rotatedProjection = () =>
      d3Map.geoNaturalEarth1().rotate(newLocation);

    const path = d3Map.geoPath(rotatedProjection());

    const regionGeo = regionFeatures.get(region_code);
    const [[x0, y0], [x1, y1]] = path.bounds(regionGeo);
    // const [lat, long] = projection.invert(d3.pointer(event));
    // const centroid = [x0 + (x1 - x0) / 2, y0 + (y1 - y0) / 2];
    // const [lat, long] = projection.invert(d3.pointer(event, gCountries.node()));
    svg
      .call(() => hideTooltip(tooltip))
      .transition()
      .duration(transition_duration / 2)
      .tween("rotate", function () {
        const r = d3.interpolate([0, 0], newLocation);
        return function (t) {
          d3Map.geoNaturalEarth1().rotate(r(t));
        };
      })
      // .tween("rotate", function () {
      //   const r = d3.interpolate(rotatedProjection);
      //   return function (t) {
      //     projection.rotate(r(t));
      //   };
      // })
      // .tween("rotate", function () {
      //   return () => {
      //     projection.rotate(d3.interpolate(rotatedProjection));
      //   };
      // })
      // .transition()
      // .duration(transition_duration / 2)
      // .call(
      //   zoom.transform,
      //   d3.zoomIdentity
      //     .translate(width / 2, height / 2)
      //     .scale(
      //       Math.min(5, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
      //     )
      //     .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      //   d3.pointer(event, svg.node())
      // )
      .transition()
      .call(() => {
        gCountries.selectAll(".country").remove();
        gCountries.selectAll(".borders").remove();
        // addCountries(gCountries, projection, regionGeo);
        addCountries(gCountries, rotatedProjection(), regionGeo);
      });
    hideLegend(gLegendRegion);
    showLegend(gLegendCountry);

    isZoomed = true;
  }

  return target;
}


function _showLegend(){return(
(gLegend) => {
  gLegend.style("visibility", "visible");
}
)}

function _hideLegend(){return(
(gLegend) => {
  gLegend.style("visibility", "hidden");
}
)}

function _addCountryLegend(width,margin,iheight,legend,colorScale,useActualNumbers,number_formatter,percent_formatter){return(
(gLegend) => {
  const legendWidth = 400;
  gLegend
    .attr(
      "transform",
      `translate(${width - margin.left - legendWidth - 100}, ${iheight})`
    )
    .style("visibility", "hidden")
    .append(() =>
      legend({
        color: colorScale,
        width: legendWidth,
        // TODO: Tick values when useActualNumbers is true
        // Auto calculating tick values are a little tricky as the values are different on either side of 0 as well as across vaccines
        // tickValues: [9, 7, 5, 3, 1, 0, -10, -20, -30, -40, -50, -60],
        tickFormat: (v) =>
          useActualNumbers ? number_formatter(v) : percent_formatter(v)
      })
    );
}
)}

function _addRegionalLegend(width,margin,iheight,legend,regionColors,regions){return(
(gLegend) => {
  const legendWidth = 550;
  gLegend
    .attr(
      "transform",
      `translate(${width - margin.left - legendWidth - 100}, ${iheight})`
    )
    .append(() =>
      legend({
        color: regionColors,
        width: legendWidth,
        tickFormat: (v) => regions.get(v)
      })
    );
}
)}

function _useActualNumbers(){return(
false
)}

function _countField(useActualNumbers,valueFor){return(
(data) => {
  const fieldPrefix = useActualNumbers ? "Vaccinated" : "Coverage";
  return valueFor(data, fieldPrefix);
}
)}

function _showTooltip(callout,tooltipText){return(
(gDrawing, tooltip, x, y, d, isZoomed) => {
  // tooltip group's .call is used to display county detail.
  if (d.properties.name != "Antarctica") {
    tooltip.raise();
    tooltip
      .attr("transform", `translate(${x},${y + 10})`)
      .call(callout, tooltipText(d, isZoomed));
  }
}
)}

function _hideTooltip(callout){return(
(tooltip) => {
  tooltip.call(callout, null);
}
)}

function _tooltipText(valueFor,percent_formatter,number_formatter,regionalVaxNumbers,sel_vaccine){return(
(data, isZoomed) => {
  if (isZoomed) {
    var covChange = valueFor(data, "Coverage");
    covChange =
      covChange == null
        ? "No data"
        : percent_formatter(valueFor(data, "Coverage"));
    var numChange = valueFor(data, "Vaccinated");
    numChange =
      numChange == null
        ? "No data"
        : number_formatter(valueFor(data, "Vaccinated"));
    return `${data.properties.name}\nCount change: ${numChange}\nCoverage change: ${covChange}`;
  } else {
    if (!regionalVaxNumbers.has(data.properties.region_code)) {
      console.log(`${JSON.stringify(data.properties)}`);
      return ``;
    }
    // const regionName = regions.get(data.properties.region_code).name;
    const data2019 = regionalVaxNumbers
      .get(data.properties.region_code)
      .get("2019")
      .get(sel_vaccine)[0];
    const data2021 = regionalVaxNumbers
      .get(data.properties.region_code)
      .get("2021")
      .get(sel_vaccine)[0];
    return `${data2019.region_name}\nCount change: ${number_formatter(
      data2021.Vaccinated - data2019.Vaccinated
    )}\nCoverage change: ${percent_formatter(
      data2021.Coverage - data2019.Coverage
    )}%`;
  }
  // }
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

function _number_formatter(){return(
(number) =>
  `${Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(number)}`
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

function _colorCountry(countField,colorScale,countriesMaster,regionColors){return(
(d, isZoomed) => {
  if (isZoomed) {
    const value = countField(d);
    if (value != null) {
      return colorScale(value);
    } else {
      return "gray";
    }
  } else {
    // WHO region based coloring - not used yet
    if (countriesMaster.get(d.id)) {
      const regionCode = countriesMaster.get(d.id)[0].region_code;
      return regionColors(regionCode);
    } else {
      return "gray";
    }
  }
}
)}

function _22(geoWorld,countField){return(
geoWorld.objects.countries.geometries.map(countField)
)}

function _colorScale(d3,geoWorld,countField)
{
  const extent = d3.extent(
    geoWorld.objects.countries.geometries.map((v) => countField(v))
  );

  return d3
    .scaleDiverging()
    .domain([extent[1], 0, extent[0]])
    .interpolator(d3.interpolatePuOr)
    .nice();
}


function _valueFor(rightYear,leftYear){return(
(countryData, metric) => {
  if (
    `${metric}_${rightYear}` in countryData.properties &&
    `${metric}_${leftYear}` in countryData.properties
  ) {
    return (
      countryData.properties[`${metric}_${rightYear}`] -
      countryData.properties[`${metric}_${leftYear}`]
    );
  } else {
    return null;
  }
}
)}

function _defaultProjection(d3Map){return(
d3Map.geoNaturalEarth1()
)}

function _height(iheight,margin){return(
iheight + margin.top + margin.bottom
)}

function _iheight(d3,defaultProjection,iwidth,geoOutline)
{
  const [[x0, y0], [x1, y1]] = d3
    .geoPath(defaultProjection.fitWidth(iwidth, geoOutline))
    .bounds(geoOutline);
  const dy = Math.ceil(y1 - y0),
    l = Math.min(Math.ceil(x1 - x0), dy);
  defaultProjection
    .scale((defaultProjection.scale() * (l - 1)) / l)
    .precision(0.2);
  return dy;
}


function _iwidth(width,margin){return(
width - margin.left - margin.right
)}

function _margin(){return(
{ left: 20, top: 50, right: 300, bottom: 50 }
)}

function _regionColors(d3)
{
  const colors = [
    "#b3e2cd",
    "#fdcdac",
    "#cbd5e8",
    "#f4cae4",
    "#e6f5c9",
    "#fff2ae"
  ];
  const oldColors = [
    "#f781bf",
    "#377eb8",
    "#4daf4a",
    "#984ea3",
    "#ff7f00",
    "#a65628",
    "#e41a1c",
    "#999999"
  ];
  return d3.scaleOrdinal(colors);
}


function _31(md){return(
md`## Data`
)}

function _geoOutline(){return(
{ type: "Sphere" }
)}

function _geoGraticule(d3){return(
d3.geoGraticule10()
)}

function _geoLand(topojson,geoWorld){return(
topojson.feature(geoWorld, geoWorld.objects.land)
)}

function _geoBorders(topojson,geoWorld){return(
topojson.mesh(
  geoWorld,
  geoWorld.objects.countries,
  (a, b) => a !== b
)
)}

function _geoWorld(world_50m,countryVaxData,sel_vaccine)
{
  const missingId = [];
  const missingVaxData = [];
  const hasVaxData = [];

  world_50m.objects.countries.geometries.forEach((geo) => {
    if (typeof geo.id === "undefined" || geo.id === null) {
      missingId.push(geo.properties.name);
    } else {
      if (!countryVaxData.countryData.has(geo.id)) {
        missingVaxData.push(geo.properties.name);
      } else {
        hasVaxData.push(geo.properties.name);
        if (!geo.properties) {
          geo.properties = {};
        }

        if (countryVaxData.countryData.get(geo.id).has(sel_vaccine)) {
          const vaxData = countryVaxData.countryData
            .get(geo.id)
            .get(sel_vaccine)[0];
          geo.properties.region_code = vaxData.region_code;
          geo.properties.Coverage_2021 = vaxData.Coverage_2021;
          geo.properties.Coverage_2020 = vaxData.Coverage_2020;
          geo.properties.Coverage_2019 = vaxData.Coverage_2019;
          geo.properties.Coverage_2018 = vaxData.Coverage_2018;
          geo.properties.Coverage_2017 = vaxData.Coverage_2017;
          geo.properties.Coverage_2016 = vaxData.Coverage_2016;
          geo.properties.Coverage_2015 = vaxData.Coverage_2015;
          geo.properties.Vaccinated_2021 = vaxData.Vaccinated_2021;
          geo.properties.Vaccinated_2020 = vaxData.Vaccinated_2020;
          geo.properties.Vaccinated_2019 = vaxData.Vaccinated_2019;
          geo.properties.Vaccinated_2018 = vaxData.Vaccinated_2018;
          geo.properties.Vaccinated_2017 = vaxData.Vaccinated_2017;
          geo.properties.Vaccinated_2016 = vaxData.Vaccinated_2016;
          geo.properties.Vaccinated_2015 = vaxData.Vaccinated_2015;
          geo.properties.Target_2021 = vaxData.Target_2021;
          geo.properties.Target_2020 = vaxData.Target_2020;
          geo.properties.Target_2019 = vaxData.Target_2019;
          geo.properties.Target_2018 = vaxData.Target_2018;
          geo.properties.Target_2017 = vaxData.Target_2017;
          geo.properties.Target_2016 = vaxData.Target_2016;
          geo.properties.Target_2015 = vaxData.Target_2015;
        } else {
        }
      }
    }
  });
  // console.log(`Countries missing id in geo data: ${missingId.join(", ")}`);
  // console.log(`Countries missing vax data: ${missingVaxData.join(", ")}`);
  // console.log(`Countries with vax data: ${hasVaxData.join(", ")}`);
  return world_50m;
}


function _regionCoords(){return(
new Map([
  ["AFR", [0, 0]],
  ["AMR", [30, 0]],
  ["SEAR", [250, 0]],
  ["EUR", [300, 0]],
  ["EMR", [300, 0]],
  ["WPR", [270, 15]],
  ["REG_GLOBAL", [0, 0]]
])
)}

function _regionFeatures(d3,geoCountries)
{
  const t = [];
  const grouped = d3.group(
    geoCountries.features,
    (d) => d.properties.region_code
  );
  for (let [key, val] of grouped) {
    if (key != null) {
      t.push([key, { type: "FeatureCollection", features: val }]);
    }
  }
  return new Map(t);
}


function _geoCountries(topojson,geoWorld){return(
topojson.feature(geoWorld, geoWorld.objects.countries)
)}

function _world_50m(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)}

function _countriesMaster(FileAttachment,d3){return(
FileAttachment("countries_master@1.csv")
  .csv()
  .then((data) => {
    return d3.group(data, (d) => d.numeric_code.padStart(3, "0"));
  })
)}

function _countryVaxData(FileAttachment,d3){return(
FileAttachment(
  "unicef_national_coverage_2015_2021_pivot@4.csv"
)
  .csv()
  .then((data) => {
    const vaccines = Array.from(new Set(data.map((d) => d.Vaccine)));
    const grouped = d3.group(
      data,
      (d) => d.numeric_code.padStart(3, "0"),
      (d) => d.Vaccine
    );
    return { vaccines: vaccines, countryData: grouped };
  })
)}

function _regionalVaxNumbers(FileAttachment,d3){return(
FileAttachment("unicef_regional_coverage_2015_2021@1.csv")
  .csv()
  .then((data) => {
    const fmt = d3.timeParse("%Y");
    data.map((row) => {
      // row.Year = fmt(row.Year);
      row.Coverage = +row.Coverage;
      row.Vaccinated = +row.Vaccinated;
      row.Unvaccinated = +row.Unvaccinated;
      row.Target = +row.Target;
      row["Not Covered"] = +row["Not Covered"];
    });
    return d3.group(
      data,
      (d) => d.region_code,
      (d) => d.Year,
      (d) => d.Vaccine
    );
  })
)}

function _availYears(FileAttachment){return(
FileAttachment("unicef_regional_coverage_2015_2021@1.csv")
  .csv()
  .then((data) => {
    return [...new Set(data.map((d) => d.Year))];
  })
)}

function _45(md){return(
md`# Imports`
)}

function _d3(require){return(
require("d3@6")
)}

function _topojson(require){return(
require("topojson")
)}

function _regions(FileAttachment){return(
FileAttachment("regions_master.csv")
  .csv()
  .then(
    (regions) =>
      new Map(regions.map((region) => [region.code, region.region_name]))
  )
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/254a99fef9cfdc739794cf276a25ffce226b9d17d64789497bbed4935f1fda7d621149894d3a06e546f0e5c53beda2580db0166433ff2fac65397af1aa3627ea.json", import.meta.url), mimeType: "application/json", toString}],
    ["countries_master@1.csv", {url: new URL("./files/c21156868ca3b76151c8c30dc389be2618b191c7c7abbc5770c9f77ea0b63b2d662afbc84a6e10db0d157505efda5f924e5f90893181c4ec91155a7ba1270e72.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["unicef_national_coverage_2015_2021_pivot@4.csv", {url: new URL("./files/ea1d7ff01af5d3bc1c1ca4f024b8dd38c4309638251ace92ebd5f0fed202149dcc29af2743de308170f8ae390ab7bc6bb851629b21c6cafa2bebed979aa14694.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["unicef_regional_coverage_2015_2021@1.csv", {url: new URL("./files/becd2331310fd5cb391ed25c51d4f17e372ea3b23b1d87a90df2b0ea5cf714887c526bee621bc9ca50647f0f5018955ab55986bb76694d4c34997488e8f638c2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["regions_master.csv", {url: new URL("./files/05d199b4b5b31907d15b326d31d62754a460838de71e4432d0ae1df4512a4f8186539ed67d0fd07a71039820406527d9de6f742f0eb02e06af2c1bee3045a374.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof sel_vaccine")).define("viewof sel_vaccine", ["select","countryVaxData"], _sel_vaccine);
  main.variable(observer("sel_vaccine")).define("sel_vaccine", ["Generators", "viewof sel_vaccine"], (G, _) => G.input(_));
  main.variable(observer("viewof leftYear")).define("viewof leftYear", ["select","availYears"], _leftYear);
  main.variable(observer("leftYear")).define("leftYear", ["Generators", "viewof leftYear"], (G, _) => G.input(_));
  main.variable(observer("viewof rightYear")).define("viewof rightYear", ["select","availYears"], _rightYear);
  main.variable(observer("rightYear")).define("rightYear", ["Generators", "viewof rightYear"], (G, _) => G.input(_));
  main.variable(observer("map3")).define("map3", ["html","d3","width","height","margin","iwidth","sel_vaccine","leftYear","rightYear","defaultProjection","geoCountries","addCountryLegend","addRegionalLegend","hideTooltip","hideLegend","showLegend","d3Map","colorCountry","showTooltip","geoOutline","geoGraticule","geoLand","geoBorders","regionCoords","regionFeatures"], _map3);
  main.variable(observer("showLegend")).define("showLegend", _showLegend);
  main.variable(observer("hideLegend")).define("hideLegend", _hideLegend);
  main.variable(observer("addCountryLegend")).define("addCountryLegend", ["width","margin","iheight","legend","colorScale","useActualNumbers","number_formatter","percent_formatter"], _addCountryLegend);
  main.variable(observer("addRegionalLegend")).define("addRegionalLegend", ["width","margin","iheight","legend","regionColors","regions"], _addRegionalLegend);
  main.variable(observer("useActualNumbers")).define("useActualNumbers", _useActualNumbers);
  main.variable(observer("countField")).define("countField", ["useActualNumbers","valueFor"], _countField);
  main.variable(observer("showTooltip")).define("showTooltip", ["callout","tooltipText"], _showTooltip);
  main.variable(observer("hideTooltip")).define("hideTooltip", ["callout"], _hideTooltip);
  main.variable(observer("tooltipText")).define("tooltipText", ["valueFor","percent_formatter","number_formatter","regionalVaxNumbers","sel_vaccine"], _tooltipText);
  main.variable(observer("percent_formatter")).define("percent_formatter", _percent_formatter);
  main.variable(observer("number_formatter")).define("number_formatter", _number_formatter);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("colorCountry")).define("colorCountry", ["countField","colorScale","countriesMaster","regionColors"], _colorCountry);
  main.variable(observer()).define(["geoWorld","countField"], _22);
  main.variable(observer("colorScale")).define("colorScale", ["d3","geoWorld","countField"], _colorScale);
  main.variable(observer("valueFor")).define("valueFor", ["rightYear","leftYear"], _valueFor);
  main.variable(observer("defaultProjection")).define("defaultProjection", ["d3Map"], _defaultProjection);
  main.variable(observer("height")).define("height", ["iheight","margin"], _height);
  main.variable(observer("iheight")).define("iheight", ["d3","defaultProjection","iwidth","geoOutline"], _iheight);
  main.variable(observer("iwidth")).define("iwidth", ["width","margin"], _iwidth);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("regionColors")).define("regionColors", ["d3"], _regionColors);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("geoOutline")).define("geoOutline", _geoOutline);
  main.variable(observer("geoGraticule")).define("geoGraticule", ["d3"], _geoGraticule);
  main.variable(observer("geoLand")).define("geoLand", ["topojson","geoWorld"], _geoLand);
  main.variable(observer("geoBorders")).define("geoBorders", ["topojson","geoWorld"], _geoBorders);
  main.variable(observer("geoWorld")).define("geoWorld", ["world_50m","countryVaxData","sel_vaccine"], _geoWorld);
  main.variable(observer("regionCoords")).define("regionCoords", _regionCoords);
  main.variable(observer("regionFeatures")).define("regionFeatures", ["d3","geoCountries"], _regionFeatures);
  main.variable(observer("geoCountries")).define("geoCountries", ["topojson","geoWorld"], _geoCountries);
  main.variable(observer("world_50m")).define("world_50m", ["FileAttachment"], _world_50m);
  main.variable(observer("countriesMaster")).define("countriesMaster", ["FileAttachment","d3"], _countriesMaster);
  main.variable(observer("countryVaxData")).define("countryVaxData", ["FileAttachment","d3"], _countryVaxData);
  main.variable(observer("regionalVaxNumbers")).define("regionalVaxNumbers", ["FileAttachment","d3"], _regionalVaxNumbers);
  main.variable(observer("availYears")).define("availYears", ["FileAttachment"], _availYears);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1).derive(["projection"], main);
  main.import("d3", "d3Map", child1);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("select", child2);
  const child3 = runtime.module(define3);
  main.import("legend", child3);
  main.variable(observer("regions")).define("regions", ["FileAttachment"], _regions);
  return main;
}
