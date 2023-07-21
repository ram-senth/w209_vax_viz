// https://observablehq.com/@ben-tanen/svg-text-and-tspan-word-wrapping@224
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# SVG \`text\` and \`tspan\` word wrapping

I always dread having to implement text wrapping for charts in d3. There is [a well documented solution](https://bl.ocks.org/mbostock/7555321) for doing this, but for some reason I always run into some issue with using \`getComputedTextLength()\` or something similar. I put this together to just have pre-made functions for text wrapping to use on Observable.

I implemented text wrapping in two ways below: (1) wrapping based on number of characters, which has its own issues (see below), and (2) wrapping based on pixel width, which uses an off-screen canvas element, inspired by [this Mike Bostock notebook](https://observablehq.com/@mbostock/fit-text-to-circle).

To get any of the text wrapping functions into a new observable notebook, just use:

\`\`\`javascript
import { wrap_text, wrap_text_nchar } from "@ben-tanen/svg-text-and-tspan-word-wrapping"
\`\`\`

---
`
)}

function _labels(){return(
[{ x: 100, y: 50, text: "Tempor labore est qui reprehenderit non consequat elit nisi."},
          { x: 100, y: 250, text: "TEMPOR LABORE EST QUI REPREHENDERIT NON CONSEQUAT ELIT NISI."},
          { x: 450, y: 150, text: "Amet nostrud reprehenderit voluptate Lorem."},
          { x: 450, y: 350, text: "Eiusmod adipisicing voluptate labore excepteur enim esse."}]
)}

function _3(md){return(
md`---

## Version #1: using text size in characters`
)}

function _n_char(slider){return(
slider({
  min: 5, 
  max: 100, 
  step: 5, 
  value: 20, 
  title: "Max number of characters per line"
})
)}

function _svg_v1(d3,DOM,width,labels,wrap_text_nchar,n_char)
{
  const svg = d3.select(DOM.svg(width, 500));
  
  // draw a number of text elements
  svg.selectAll("text")
    .data(labels).enter()
    .append("text")
    .attr("id", (d, i) => `node${i}`)
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .style("font-size", "1em")
    .style("text-anchor", "start")
    .text(d => d.text);
  
  svg.selectAll("text")
    .each(function(d, i) { wrap_text_nchar(d3.select(this), n_char) });
  
  return svg.node();
}


function _wrap_text_nchar(wrap_text_array){return(
(text_element, max_width, line_height, unit = "em") => {
  
  // use a default line_height if not provided
  if (!line_height) line_height = 1.1;
  
  // wrap the text based on how many characters per line
  const text_array = wrap_text_array(text_element.text(), max_width);
  
  // append a tspan element for each line of text_array
  text_element.text(null)
    .selectAll("tspan")
    .data(text_array).enter()
    .append("tspan")
    .attr("x", text_element.attr("x"))
    .attr("y", text_element.attr("y"))
    .attr("dy", (d, i) => `${i * line_height}${unit}`)
    .text(d => d);
}
)}

function _wrap_text_array(){return(
(text, max_width) => {
  // split the text around spaces (to get individual words)
  const words = text.split(/\s+/).reverse();
  
  // define vars to hold individual words, lines, and all lines
  let word,
      lines = [ ],
      line = [ ];
  
  // add words to a line until we exceed the max_width (in characters)
  // when we reach width, add the line to lines and start a new line
  while (word = words.pop()) {
    line.push(word);
    if (line.join(" ").length > max_width) {
      line.pop()
      lines.push(line.join(" "));
      line = [word];
    }
  }
  lines.push(line.join(" "));
  
  return lines;
}
)}

function _8(md){return(
md`The issue with this is that different letters will be different sizes (uppercase vs. lowercase letters), unless you're using a monospaced font. We can see this above with the two labels on the left, which are the same text, but the uppercase version is drawn wider.`
)}

function _9(md){return(
md`---

## Version #2: using text size in pixels`
)}

function _n_px(slider){return(
slider({
  min: 5, 
  max: 500, 
  step: 5, 
  value: 50,
  format: v => `${v}px`,
  title: "Max number of characters per line"
})
)}

function _svg_v2(d3,DOM,width,labels,wrap_text,n_px)
{
  const svg = d3.select(DOM.svg(width, 500));
  
  // draw a number of text elements
  svg.selectAll("text")
    .data(labels)
    .enter()
    .append("text")
    .attr("id", (d, i) => `node${i}`)
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .style("font-size", "1em")
    .style("text-anchor", "start")
    .text(d => d.text);
  
  svg.selectAll("text")
    .each(function(d, i) { wrap_text(d3.select(this), n_px) });
  
  return svg.node();
}


function _wrap_text(measure_width){return(
(text_element, max_width, line_height, unit = "em") => {
  // word parameters
  let words = text_element.text().split(/\s+/).reverse(),
      word,
      line = [],
      line_number = 0;
  
  // styling parameters
  const x = text_element.attr("x"),
        y = text_element.attr("y");
  if (!line_height) line_height = 1.1;
  
  // clear text_elements text
  text_element.text(null);
  
  // append first tspan element (to fill as we build the lines)
  let tspan = text_element.append("tspan")
    .attr("x", x)
    .attr("y", y)
    .attr("dy", 0);
  
  // loop through all words and make new lines when we exceed our max_width
  while (word = words.pop()) {
    line.push(word);
    tspan.text(line.join(" "));
    if (measure_width(tspan.text()) > max_width) {
      line.pop()
      tspan.text(line.join(" "));
      line = [word];
      tspan = text_element.append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", `${++line_number * line_height}${unit}`)
        .text(word);
    }
  }
}
)}

function _measure_width()
{
  const context = document.createElement("canvas").getContext("2d");
  return text => context.measureText(text).width;
}


function _14(md){return(
md` I've often had issues using \`getComputedTextLenth()\`, especially in Observable, so instead I use an off-screen canvas element to measure the width of the text. As you can see from the two left labels, it does much better for uniformity.`
)}

function _15(md){return(
md`---

## Appendix`
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("labels")).define("labels", _labels);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof n_char")).define("viewof n_char", ["slider"], _n_char);
  main.variable(observer("n_char")).define("n_char", ["Generators", "viewof n_char"], (G, _) => G.input(_));
  main.variable(observer("svg_v1")).define("svg_v1", ["d3","DOM","width","labels","wrap_text_nchar","n_char"], _svg_v1);
  main.variable(observer("wrap_text_nchar")).define("wrap_text_nchar", ["wrap_text_array"], _wrap_text_nchar);
  main.variable(observer("wrap_text_array")).define("wrap_text_array", _wrap_text_array);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof n_px")).define("viewof n_px", ["slider"], _n_px);
  main.variable(observer("n_px")).define("n_px", ["Generators", "viewof n_px"], (G, _) => G.input(_));
  main.variable(observer("svg_v2")).define("svg_v2", ["d3","DOM","width","labels","wrap_text","n_px"], _svg_v2);
  main.variable(observer("wrap_text")).define("wrap_text", ["measure_width"], _wrap_text);
  main.variable(observer("measure_width")).define("measure_width", _measure_width);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
