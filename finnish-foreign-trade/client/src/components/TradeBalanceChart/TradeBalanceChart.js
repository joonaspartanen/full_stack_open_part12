import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spiritedaway from '@amcharts/amcharts4/themes/spiritedaway'
import { Header } from 'semantic-ui-react'

const TradeBalanceChart = ({ tradeBalance }) => {
  useEffect(() => {

    am4core.useTheme(am4themes_animated)
    am4core.useTheme(am4themes_spiritedaway)

    let chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.responsive.enabled = true
    chart.rotate = true

    chart.data = tradeBalance
    chart.marginRight = '100'

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'year'
    categoryAxis.numberFormatter.numberFormat = '#'
    categoryAxis.renderer.inversed = true
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.renderer.cellStartLocation = 0.1
    categoryAxis.renderer.cellEndLocation = 0.9

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    // valueAxis.min = 0
    valueAxis.numberFormatter.numberFormat = '##.##a'
    valueAxis.numberFormatter.bigNumberPrefixes = [{ number: 1e9, suffix: 'B' }]

    let tradeBalanceSeries = chart.series.push(new am4charts.ColumnSeries())
    tradeBalanceSeries.name = 'Trade Balance'
    tradeBalanceSeries.fill = am4core.color('#2E8B57')
    tradeBalanceSeries.strokeWidth = 0
    tradeBalanceSeries.dataFields.valueY = 'tradeBalance'
    tradeBalanceSeries.dataFields.categoryX = 'year'
    tradeBalanceSeries.columns.template.height = am4core.percent(100)
    tradeBalanceSeries.sequencedInterpolation = true
    tradeBalanceSeries.columns.template.tooltipText = '{name}:\n€{valueY}'

    tradeBalanceSeries.columns.template.adapter.add('fill', (fill, target) => {
      if (target.dataItem && target.dataItem.valueY < 0) {
        return am4core.color('#800000')
      } else {
        return fill
      }
    })

    let importSeries = chart.series.push(new am4charts.ColumnSeries())
    importSeries.name = 'Imports to Finland'
    importSeries.fill = am4core.color('#63718B')
    importSeries.strokeWidth = 0
    importSeries.dataFields.valueY = 'imports'
    importSeries.dataFields.categoryX = 'year'
    importSeries.columns.template.height = am4core.percent(100)
    importSeries.sequencedInterpolation = true
    importSeries.columns.template.tooltipText = '{name}:\n€{valueY}'

    let exportSeries = chart.series.push(new am4charts.ColumnSeries())
    exportSeries.name = 'Exports from Finland'
    exportSeries.fill = am4core.color('#EBA05C')
    exportSeries.strokeWidth = 0
    exportSeries.dataFields.valueY = 'exports'
    exportSeries.dataFields.categoryX = 'year'
    exportSeries.columns.template.height = am4core.percent(100)
    exportSeries.sequencedInterpolation = true
    exportSeries.columns.template.tooltipText = '{name}:\n€{valueY}'

    /* chart.responsive.rules.push({
      relevant: am4core.ResponsiveBreakpoints.widthXL,
      state: (target, stateId) => {
        if (target instanceof am4charts.Chart) {
          let state = target.states.create(stateId)
          console.log(state)
          return state
        }

        if (target instanceof am4charts.CategoryAxis) {
          let state = target.states.create(stateId)
          console.log(state.sprite.renderer)
          return state
        }
        if (target instanceof am4charts.ValueAxis) {
          let state = target.states.create(stateId)
          console.log(state)
          //state.sprite.renderer.opposite = true
          return state
        }
        return null
      }
    }) */

    return () => {
      if (chart) {
        chart.dispose()
      }
    }
  }, [tradeBalance])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        paddingTop: '3em',
        textAlign: 'center'
      }}>
      <Header inverted as='h3'>
        Finnish Trade Balance
      </Header>
      <div id='chartdiv' style={{ width: '100%', height: '95%' }}></div>
    </div>
  )
}

export default TradeBalanceChart
