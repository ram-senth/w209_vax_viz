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

function _useActualNumbers(){return(
false
)}

function _countField(useActualNumbers){return(
useActualNumbers
  ? "count_change_2019_to_2021"
  : "cov_change_2019_to_2021"
)}

function _map3(html,d3,width,height,margin,iwidth,sel_vaccine,geoCountries,path,colorCountry,geoOutline,geoGraticule,geoLand,geoBorders,showTooltip,hideTooltip,iheight,legend,colorScale,useActualNumbers,number_formatter,percent_formatter)
{
  const target = html`<div id="myviz">`;

  const svg = d3
    .select(target)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("display", "block");

  const g = svg
    .append("g")
    .attr("class", "gDrawing")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // .attr("clip-path", `url(${new URL("#clip", location)})`);
  // .attr("clip-path", path(outline));

  // Add the title of the plot.
  g.append("text")
    .attr("class", "chartHeader")
    .style("text-anchor", "middle")
    .attr("transform", `translate(${iwidth / 2}, ${0 - margin.top / 2})`)
    .text(`${sel_vaccine} Coverage Change between 2019 and 2021`);

  // Add tooltip and story popup at the end to keep it on top of all other layers.
  const tooltip = g.append("g").attr("class", "ttip");

  g.selectAll("path")
    .data(geoCountries.features)
    // .data(topojson.feature(world2, world2.objects.countries).features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", path)
    .style("fill", colorCountry);
  // .append("svg:title")
  // .text((d) => `${d.properties.name}: ${d.properties[countField]}`);
  g.append("path")
    .attr("id", "outline")
    .style("stroke", "#ccc")
    .style("fill", "none")
    .attr("d", `${path(geoOutline)}`);
  g.append("path")
    .style("stroke", "#ccc")
    .style("fill", "none")
    .attr("d", `${path(geoGraticule)}`);
  g.append("path")
    .style("fill", "none")
    .style("stroke", "black")
    .attr("d", path(geoLand));
  g.append("path")
    .style("stroke", "gray")
    .style("fill", "none")
    .attr("d", path(geoBorders));

  const countriesInMap = g.selectAll(".country");
  countriesInMap.on("touchmove mousemove", function (event, d) {
    const [x, y] = d3.pointer(event);
    showTooltip(g, tooltip, x, y, d);
  });
  countriesInMap.on("touchend mouseleave", () => hideTooltip(tooltip));

  // Add legend
  const legendWidth = 400;
  g.append("g")
    .style("font-size", "12px")
    .attr(
      "transform",
      `translate(${width - margin.left - legendWidth - 100}, ${iheight})`
    )
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

  return target;
}


function _showTooltip(callout,tooltipText){return(
(gDrawing, tooltip, x, y, d) => {
  // tooltip group's .call is used to display county detail.
  if (d.properties.name != "Antarctica") {
    tooltip.raise();
    tooltip
      .attr("transform", `translate(${x},${y + 10})`)
      .call(callout, tooltipText(d));
  }
}
)}

function _hideTooltip(callout){return(
(tooltip) => {
  tooltip.call(callout, null);
}
)}

function _tooltipText(percent_formatter,number_formatter){return(
(data) => {
  const covChange =
    "cov_change_2019_to_2021" in data.properties
      ? percent_formatter(data.properties.cov_change_2019_to_2021)
      : "No data";
  const numChange =
    "count_change_2019_to_2021" in data.properties
      ? number_formatter(data.properties.count_change_2019_to_2021)
      : "No data";
  return `${data.properties.name}\nCount change: ${numChange}\nCoverage change: ${covChange}`;
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

function _colorCountry(countField,colorScale){return(
(d) => {
  if (countField in d.properties) {
    return colorScale(d.properties[countField]);
  } else {
    return "gray";
  }
  // WHO region based coloring - not used yet
  // if (countriesMaster.get(d.id)) {
  //   const regionCode = countriesMaster.get(d.id)[0].region_code;
  //   return regionColors(regionCode);
  // } else {
  //   return "gray";
  // }
}
)}

function _15(geoWorld,countField){return(
geoWorld.objects.countries.geometries.map((v) => v.properties[countField])
)}

function _colorScale(d3,geoWorld,countField)
{
  const extent = d3.extent(
    geoWorld.objects.countries.geometries.map((v) => v.properties[countField])
  );

  return d3
    .scaleDiverging()
    .domain([extent[1], 0, extent[0]])
    .interpolator(d3.interpolatePuOr)
    .nice();
}


function _projection(d3Map){return(
d3Map.geoNaturalEarth1()
)}

function _path(d3Map,projection){return(
d3Map.geoPath(projection)
)}

function _height(iheight,margin){return(
iheight + margin.top + margin.bottom
)}

function _iheight(d3,projection,iwidth,geoOutline)
{
  const [[x0, y0], [x1, y1]] = d3
    .geoPath(projection.fitWidth(iwidth, geoOutline))
    .bounds(geoOutline);
  const dy = Math.ceil(y1 - y0),
    l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
  return dy;
}


function _iwidth(width,margin){return(
width - margin.left - margin.right
)}

function _margin(){return(
{ left: 20, top: 50, right: 300, bottom: 50 }
)}

function _regionColors(d3){return(
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

function _24(md){return(
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
          geo.properties.cov_change_2019_to_2021 =
            vaxData.Coverage_2021 - vaxData.Coverage_2019;
          geo.properties.cov_change_2019_to_2020 =
            vaxData.Coverage_2020 - vaxData.Coverage_2019;
          geo.properties.cov_change_2020_to_2021 =
            vaxData.Coverage_2021 - vaxData.Coverage_2020;

          geo.properties.count_change_2019_to_2021 =
            vaxData.Vaccinated_2021 - vaxData.Vaccinated_2019;
          geo.properties.count_change_2019_to_2020 =
            vaxData.Vaccinated_2020 - vaxData.Vaccinated_2019;
          geo.properties.count_change_2020_to_2021 =
            vaxData.Vaccinated_2021 - vaxData.Vaccinated_2020;
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

function _34(md){return(
md`# Imports`
)}

function _d3(require){return(
require("d3@6")
)}

function _topojson(require){return(
require("topojson")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/254a99fef9cfdc739794cf276a25ffce226b9d17d64789497bbed4935f1fda7d621149894d3a06e546f0e5c53beda2580db0166433ff2fac65397af1aa3627ea.json", import.meta.url), mimeType: "application/json", toString}],
    ["countries_master@1.csv", {url: new URL("./files/c21156868ca3b76151c8c30dc389be2618b191c7c7abbc5770c9f77ea0b63b2d662afbc84a6e10db0d157505efda5f924e5f90893181c4ec91155a7ba1270e72.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["unicef_national_coverage_2015_2021_pivot@4.csv", {url: new URL("./files/ea1d7ff01af5d3bc1c1ca4f024b8dd38c4309638251ace92ebd5f0fed202149dcc29af2743de308170f8ae390ab7bc6bb851629b21c6cafa2bebed979aa14694.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof sel_vaccine")).define("viewof sel_vaccine", ["select","countryVaxData"], _sel_vaccine);
  main.variable(observer("sel_vaccine")).define("sel_vaccine", ["Generators", "viewof sel_vaccine"], (G, _) => G.input(_));
  main.variable(observer("useActualNumbers")).define("useActualNumbers", _useActualNumbers);
  main.variable(observer("countField")).define("countField", ["useActualNumbers"], _countField);
  main.variable(observer("map3")).define("map3", ["html","d3","width","height","margin","iwidth","sel_vaccine","geoCountries","path","colorCountry","geoOutline","geoGraticule","geoLand","geoBorders","showTooltip","hideTooltip","iheight","legend","colorScale","useActualNumbers","number_formatter","percent_formatter"], _map3);
  main.variable(observer("showTooltip")).define("showTooltip", ["callout","tooltipText"], _showTooltip);
  main.variable(observer("hideTooltip")).define("hideTooltip", ["callout"], _hideTooltip);
  main.variable(observer("tooltipText")).define("tooltipText", ["percent_formatter","number_formatter"], _tooltipText);
  main.variable(observer("percent_formatter")).define("percent_formatter", _percent_formatter);
  main.variable(observer("number_formatter")).define("number_formatter", _number_formatter);
  main.variable(observer("callout")).define("callout", _callout);
  main.variable(observer("colorCountry")).define("colorCountry", ["countField","colorScale"], _colorCountry);
  main.variable(observer()).define(["geoWorld","countField"], _15);
  main.variable(observer("colorScale")).define("colorScale", ["d3","geoWorld","countField"], _colorScale);
  main.variable(observer("projection")).define("projection", ["d3Map"], _projection);
  main.variable(observer("path")).define("path", ["d3Map","projection"], _path);
  main.variable(observer("height")).define("height", ["iheight","margin"], _height);
  main.variable(observer("iheight")).define("iheight", ["d3","projection","iwidth","geoOutline"], _iheight);
  main.variable(observer("iwidth")).define("iwidth", ["width","margin"], _iwidth);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("regionColors")).define("regionColors", ["d3"], _regionColors);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("geoOutline")).define("geoOutline", _geoOutline);
  main.variable(observer("geoGraticule")).define("geoGraticule", ["d3"], _geoGraticule);
  main.variable(observer("geoLand")).define("geoLand", ["topojson","geoWorld"], _geoLand);
  main.variable(observer("geoBorders")).define("geoBorders", ["topojson","geoWorld"], _geoBorders);
  main.variable(observer("geoWorld")).define("geoWorld", ["world_50m","countryVaxData","sel_vaccine"], _geoWorld);
  main.variable(observer("geoCountries")).define("geoCountries", ["topojson","geoWorld"], _geoCountries);
  main.variable(observer("world_50m")).define("world_50m", ["FileAttachment"], _world_50m);
  main.variable(observer("countriesMaster")).define("countriesMaster", ["FileAttachment","d3"], _countriesMaster);
  main.variable(observer("countryVaxData")).define("countryVaxData", ["FileAttachment","d3"], _countryVaxData);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1).derive(["projection"], main);
  main.import("d3", "d3Map", child1);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("select", child2);
  const child3 = runtime.module(define3);
  main.import("legend", child3);
  return main;
}
