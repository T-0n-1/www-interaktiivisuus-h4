const svg = d3.select(".canvas")
    .append("svg")
    .attr("width", 600)
    .attr("height", 600)

const margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100
}
const graphHeight = 600 - margin.top - margin.bottom
const graphWidth = 600 - margin.right - margin.left
const graph = svg.append("g")
    .attr("width", graphWidth)
    .attr("heigth", graphHeight)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

const xAxisGroup = graph.append("g")
const yAxisGroup = graph.append("g")

//d3.json("js/dogsinfi.json").then(
db.collection("dogsinfi").get().then(response => {
    var data = []

    response.docs.forEach(doc => {
        data.push(doc.data())
    })

//    data => {
const scaleY = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([graphHeight, 0])

const scaleX = d3.scaleBand()
    .domain(data.map(item => item.breed))
    .range([0, graphWidth])
    .paddingInner(0.1)

const rects = graph.selectAll("rect")
    .data(data)
    .attr("width", scaleX.bandwidth)
    .attr("height", d => graphHeight - scaleY(d.count))
    .attr("fill", "red")
    .attr("x", d => scaleX(d.breed))
    .attr("y", d => scaleY(d.count))

rects.enter()
    .append("rect")
    .attr("width", scaleX.bandwidth)
    .attr("height", d => graphHeight - scaleY(d.count))
    .attr("fill", "red")
    .attr("x", d => scaleX(d.breed))
    .attr("y", d => scaleY(d.count))

const x_axis = d3.axisBottom()
    .scale(scaleX)

const y_axis = d3.axisLeft()
    .scale(scaleY)
    .ticks(5)
    .tickFormat(d => d + " yksilöä")

xAxisGroup.call(x_axis)
    .attr("transform", `translate(0, ${graphHeight})`)
yAxisGroup.call(y_axis)

xAxisGroup.selectAll("text")
    .attr("transform", `translate(0, 10) rotate(90)`)
    .attr("text-anchor", `start`)

})