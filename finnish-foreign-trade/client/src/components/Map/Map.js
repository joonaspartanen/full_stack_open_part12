import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4themes_dark from '@amcharts/amcharts4/themes/dark'
import React, { useEffect, useRef } from 'react'

const Map = ({ imports, exports, flow }) => {
  const chart = useRef(null)

  am4core.useTheme(am4themes_dark)
  am4core.useTheme(am4themes_animated)

  useEffect(() => {
    const map = am4core.create('mapdiv', am4maps.MapChart)

    map.geodata = am4geodata_worldLow
    map.projection = new am4maps.projections.Mercator()
    map.zoomControl = new am4maps.ZoomControl()
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#eee')
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1
    map.chartContainer.wheelable = false

    //Use orthographic map projection
    //map.projection = new am4maps.projections.Orthographic()
    //map.panBehavior = 'rotateLongLat'
    //const graticuleSeries = map.series.push(new am4maps.GraticuleSeries())
    //graticuleSeries.mapLines.template.line.stroke = am4core.color('#67b7dc')
    //graticuleSeries.mapLines.template.line.strokeOpacity = 0.2
    //graticuleSeries.fitExtent = false

    // The initial zoom level must be higher if using portrait view.
    if (window.innerHeight > window.innerWidth) {
      map.homeZoomLevel = 5
      map.minZoomLevel = 5
    } else {
      map.homeZoomLevel = 2
      map.minZoomLevel = 2
    }

    map.homeGeoPoint = {
      latitude: 50,
      longitude: 11,
    }

    map.maxPanOut = 0

    const prepareDataSeries = flow => {
      const baseColor = flow === 'exports' ? '#18447e' : '#a01c0c'
      const hoverColor = '#666'

      const dataSeries = new am4maps.MapPolygonSeries()
      dataSeries.name = flow.charAt(0).toUpperCase() + flow.slice(1)
      dataSeries.id = flow
      dataSeries.heatRules.push({
        property: 'fill',
        target: dataSeries.mapPolygons.template,
        min: am4core.color(baseColor).brighten(2.4),
        max: am4core.color(baseColor).brighten(-0.4),
      })
      dataSeries.useGeodata = true
      dataSeries.exclude = ['AQ', 'SJ']
      dataSeries.data = flow === 'exports' ? exports : imports

      dataSeries.tooltip.getFillFromObject = false
      dataSeries.tooltip.background.fill = am4core.color('#333')
      dataSeries.tooltip.background.fillOpacity = 0.9

      dataSeries.mapPolygons.template.tooltipHTML = `
      <div>
        Total ${
          flow === 'exports' ? 'exports from Finland to {name}' : 'imports from {name} to Finland'
        } ({year.formatNumber('#')}):
        <br>
        {euros} €
      </div>
      `
      dataSeries.tooltip.label.interactionsEnabled = true

      dataSeries.mapPolygons.template.nonScalingStroke = true
      dataSeries.mapPolygons.template.strokeWidth = 0.5

      const hoverState = dataSeries.mapPolygons.template.states.create('hover')
      hoverState.properties.fill = am4core.color(hoverColor)

      formatFinlandPolygon(dataSeries)

      return dataSeries
    }

    const formatFinlandPolygon = dataSeries => {
      map.events.on('ready', () => {
        const finland = dataSeries.getPolygonById('FI')
        finland.fill = am4core.color('#FFF')
        finland.tooltipText = ''
        finland.tooltipHTML = null
        finland.hoverable = false
      })
    }

    const exportsSeries = prepareDataSeries('exports')
    const importsSeries = prepareDataSeries('imports')
    importsSeries.hidden = true

    map.series.push(exportsSeries)
    map.series.push(importsSeries)

    console.log('map ready')

    chart.current = map

    return () => {
      map.dispose()
    }
  }, [imports, exports])

  useEffect(() => {
    const exportsSeries = chart.current.series.getIndex(0)
    const importsSeries = chart.current.series.getIndex(1)

    if (flow === 'exports') {
      exportsSeries.show()
      importsSeries.hide()
    } else {
      importsSeries.show()
      exportsSeries.hide()
    }
  }, [flow])

  return <div id='mapdiv' style={{ width: '100%', height: '100%', overflow: 'hidden' }}></div>
}

export default Map
