function translate(value) {
    valueSplitted = value.split(',')
    valueJoined = valueSplitted.join(".")
    valueTranslated = Number(valueJoined)
    return valueTranslated
}

let width = (document.documentElement.clientWidth)*3
let height = document.documentElement.clientHeight
let spaceForButtons = 40

const svg = d3.select(".canvas")
.append("svg")
.attr("width", width)
.attr("height", height - spaceForButtons)

const margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100
}

const graphHeight = height - margin.top - margin.bottom - spaceForButtons
const graphWidth = width - margin.left - margin.right
const graph = svg.append("g")
    .attr("width", graphWidth)
    .attr("heigth", graphHeight)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

const xAxisGroup = graph.append("g")
const yAxisGroup = graph.append("g")

d3.json("js/measures.json").then(
    data => {
        var measureArray = []
        for (k in data) {
            object = data[k].Measures
            for (key in object) {
                if (key == 'AirPressure') {
                    object[key] = translate(object[key])
                } else if (key == 'Temp') {
                    object[key] = translate(object[key])
                } else if (key == 'Humidity') {
                    object[key] = translate(object[key])
                } else { object[key] = object[key] }
            }
        measureArray.push(object)
        }
        
        // Konsoliloki säästetty tehtävän annon vuoksi
        console.log(measureArray)
        
        data = measureArray

        var AirPressureMin = d3.min(data, d => d.AirPressure)
        var AirPressureMax = d3.max(data, d => d.AirPressure)
        var TempMin = d3.min(data, d => d.Temp)
        var TempMax = d3.max(data, d => d.Temp)
        var HumidityMin = d3.min(data, d => d.Humidity)
        var HumidityMax = d3.max(data, d => d.Humidity)

        // Konsolilokit säästetty tehtävän annon vuoksi
        console.log(AirPressureMax)
        console.log(AirPressureMin) // Korjattu kolme nolla-arvoa pois
        console.log(TempMax)
        console.log(TempMin)
        console.log(HumidityMax)
        console.log(HumidityMin)

        const scaleY = d3.scaleLinear()
            .domain([(HumidityMin-0.1), HumidityMax])
            .range([graphHeight, 0])


        const scaleX = d3.scaleBand()
            .domain(data.map(item => item.Timestamp))
            .range([0, graphWidth])
            .paddingInner(0.1)

        const rects = graph.selectAll("rect")
            .data(data)
            .attr("width", scaleX.bandwidth)
            .attr("height", d => graphHeight - scaleY(d.Humidity))
            .attr("fill", d => d.Humidity == HumidityMax ? "red" : (d.Humidity == HumidityMin ? "blue" : "green"))
            .attr("x", d => scaleX(d.Humidity))

        rects.enter()
            .append("rect")
            .attr("width", scaleX.bandwidth)
            .attr("height", d => graphHeight - scaleY(d.Humidity))
            .attr("fill", d => d.Humidity == HumidityMax ? "red" : (d.Humidity == HumidityMin ? "blue" : "green"))
            .attr("x", d => scaleX(d.Timestamp))
            .attr("y", d => scaleY(d.Humidity))

        const x_axis = d3.axisBottom()
            .scale(scaleX)

        const y_axis = d3.axisLeft()
            .scale(scaleY)
            .ticks(5)
            .tickFormat(d => d + " Humidity")

        xAxisGroup.call(x_axis)
            .attr("transform", `translate(0, ${graphHeight})`)
        yAxisGroup.call(y_axis)

        xAxisGroup.selectAll("text")
            .attr("transform", `translate(0, 10) rotate(90)`)
            .attr("text-anchor", `start`)
    }
)