import React, { useEffect, useRef } from 'react'
import { Header } from 'semantic-ui-react'
import * as d3 from 'd3'
import './D3TradeBalanceChart.scss'
const debounce = require('lodash.debounce')

const D3TradeBalanceChart = ({ tradeBalance, darkModeActive }) => {
  const ref = useRef()

  const data = tradeBalance

  useEffect(() => {
    if (!data) {
      return
    }

    const margin = { TOP: 40, RIGHT: 40, BOTTOM: 80, LEFT: 40 }
    const padding = { TOP: 20, RIGHT: 10, BOTTOM: 20, LEFT: 10 }
    let width
    let height
    let orientation
    const colors = d3.scaleOrdinal().range(['#18447e', '#A31E0F'])
    const keys = ['imports', 'exports']
    const keyDescriptions = {
      imports: 'Total value of goods imported to Finland',
      exports: 'Total value of goods exported from Finland',
    }
    const maxValue = Math.max(d3.max(data.map(d => d.imports)), d3.max(data.map(d => d.exports)))

    // Define scale variables
    let x0
    let x1
    let y

    const tooltip = d3.select('body').append('div').attr('class', 'd3-tooltip')
    const chart = d3.select(ref.current)
    let svg

    drawChart()

    function drawChart() {
      console.log('drawing chart')
      drawChartBase()
      generateHorizontalChartScales()
      appendAxes()
      appendData()
      setOnHoverActions()
      generateLegend()
      console.log('chart ready')
    }

    d3.select(window).on('resize', debounce(onResize, 800))

    function onResize() {
      console.log('resizing')
      drawChart()
    }

    function drawChartBase() {
      width =
        Math.max(window.innerWidth, document.documentElement.clientWidth) -
        margin.RIGHT -
        margin.LEFT
      height =
        Math.max(window.innerHeight, document.documentElement.clientHeight) -
        margin.TOP -
        margin.BOTTOM
      orientation = width >= height ? 'horizontal' : 'vertical'
      console.log(`${width} x ${height}`)

      if (svg) {
        svg.remove()
      }

      svg = chart
        .append('svg')
        .attr('width', width + padding.RIGHT + padding.LEFT)
        .attr('height', height + padding.TOP + padding.BOTTOM)
        .attr(
          'viewBox',
          `0 0 ${width + padding.RIGHT + padding.LEFT} ${height + padding.TOP + padding.BOTTOM}`
        )
    }

    function filterData(data) {
      if (orientation === 'horizontal') {
        return data
      } else {
        return data.slice(0, 4)
      }
    }

    function generateHorizontalChartScales() {
      const filteredData = filterData(data)
      x0 = d3
        .scaleBand()
        .domain(filteredData.map(d => d.year).sort((a, b) => a - b))
        .rangeRound([margin.LEFT, width - margin.RIGHT])
        .paddingInner(0.1)

      x1 = d3.scaleBand().domain(keys).rangeRound([0, x0.bandwidth()]).padding(0.05)

      y = d3
        .scaleLinear()
        .domain([0, maxValue])
        .nice()
        .rangeRound([height - margin.TOP, margin.TOP])
    }

    function appendAxes() {
      const xAxis = g =>
        g
          .attr('transform', `translate(0, ${height - margin.TOP + padding.BOTTOM})`)
          .call(d3.axisBottom(x0).tickSize(0))
          .call(g => g.select('.domain').remove())
          .selectAll('text')

      const yAxis = g =>
        g
          .attr('transform', `translate(${margin.LEFT}, 0)`)
          .call(d3.axisLeft(y).ticks(null, 's').tickSizeInner(0))
          .call(g => g.select('.domain').remove())

      svg.append('g').call(xAxis)
      svg.append('g').call(yAxis)

      svg
        .append('g')
        .attr('class', 'grid')
        .call(
          d3
            .axisLeft(y)
            .tickSize(-width + margin.RIGHT + margin.LEFT)
            .tickFormat('')
        )
        .attr('transform', `translate(${margin.LEFT + padding.LEFT}, 0)`)
    }

    function appendData() {
      svg
        .append('g')
        .selectAll('g')
        .data(filterData(data))
        .join('g')
        .attr('transform', d => `translate(${x0(d.year) + padding.LEFT}, 0)`)
        .selectAll('rect')
        .data(d => keys.map(key => ({ key, value: d[key] })))
        .join('rect')
        .attr('class', 'bar')
        .attr('x', d => x1(d.key))
        .attr('width', x1.bandwidth())
        .attr('y', () => y(0))
        .transition()
        .ease(d3.easePoly)
        .duration(1500)
        .attr('y', d => y(d.value))
        .attr('height', d => y(0) - y(d.value))
        .attr('fill', d => colors(d.key))
    }

    function setOnHoverActions() {
      svg
        .selectAll('.bar')
        .on('mouseover', function (d) {
          d3.select(this)
            .transition()
            .duration(200)
            .style('fill', d3.rgb(colors(d.key)).darker(1))

          const tooltipHtml = `
          <div>
            Total ${d.key === 'imports' ? 'imports to' : 'exports from'} Finland:
            <br>
            ${d3.format(',')(d.value)}
          €</div>
          `
          showTooltip(tooltip, tooltipHtml)
        })
        .on('mouseout', function (d) {
          d3.select(this).transition().duration(200).style('fill', colors(d.key))
          hideTooltip(tooltip)
        })
        .on('mousemove', () => moveTooltip(tooltip))
    }

    const showTooltip = (tooltip, tooltipHtml) => {
      tooltip.style('display', 'block')
      tooltip.html(tooltipHtml)
    }

    const hideTooltip = tooltip => {
      tooltip.style('display', 'none')
    }

    const moveTooltip = tooltip => {
      const distanceFromRightEdge = width - d3.event.pageX
      const tooltipOffset = distanceFromRightEdge > 200 ? 30 : -220

      tooltip
        .style('left', `${d3.event.pageX + tooltipOffset}px`)
        .style('top', `${d3.event.pageY - 65}px`)
    }

    function generateLegend() {
      if (orientation === 'vertical') {
        d3.select('.legend-wrapper').remove()
        return
      }

      const legendWrapper = chart
        .append('svg')
        .attr('width', 300)
        .attr('height', 30)
        .attr('class', 'legend-wrapper')

      const legend = legendWrapper
        .selectAll('.legend')
        .data(keys)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${i * 140}, 0)`)

      legend
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 30)
        .attr('height', 30)
        .style('fill', d => colors(d))
        .on('mouseover', d => {
          const tooltipHtml = `<div>${keyDescriptions[d]}</div>`
          showTooltip(tooltip, tooltipHtml)
        })
        .on('mousemove', () => moveTooltip(tooltip))
        .on('mouseout', () => {
          tooltip.style('display', 'none')
        })

      legend
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('transform', () => 'translate(40, 20)')
        .attr('class', 'd3-legend-text')
        .text(d => d.slice(0, 1).toUpperCase() + d.slice(1))
    }
  }, [data])

  return (
    <div
      className={darkModeActive ? 'bar-chart dark-mode' : 'bar-chart'}
      style={{
        width: '100%',
        height: '100vh',
        paddingTop: '3em',
        textAlign: 'center',
      }}>
      <Header as='h2'>Finnish Trade Balance</Header>
      <div ref={ref}></div>
    </div>
  )
}

export default D3TradeBalanceChart
