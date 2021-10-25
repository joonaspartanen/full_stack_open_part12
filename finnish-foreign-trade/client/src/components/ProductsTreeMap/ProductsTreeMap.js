import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4themes_spiritedaway from '@amcharts/amcharts4/themes/spiritedaway'
import React, { useRef, useEffect } from 'react'
import { Header } from 'semantic-ui-react'

const ProductsTreeMap = ({ sitc2Data, flow, year }) => {
  const chart = useRef(null)

  am4core.useTheme(am4themes_animated)
  am4core.useTheme(am4themes_spiritedaway)

  useEffect(() => {
    let treemap = am4core.create('products-treemap-div', am4charts.TreeMap)
    treemap.responsive.enabled = true

    treemap.data = sitc2Data['exports']
    treemap.dataFields.value = 'value'
    treemap.dataFields.name = 'group'
    treemap.dataFields.children = 'children'

    let level1 = treemap.seriesTemplates.create('1')
    let level1_column = level1.columns.template

    level1_column.tooltipText = '{group}: {value} €'
    level1.tooltip.pointerOrientation = 'down'

    treemap.legend = new am4charts.Legend()
    treemap.legend.position = 'bottom'
    treemap.legend.paddingTop = 20
    treemap.legend.itemContainers.template.tooltipText = '{group}'
    treemap.legend.labels.template.text = ''

    const level0_hoverState = treemap.seriesTemplates
      .create('0')
      .columns.template.states.create('hover')
    level0_hoverState.adapter.add('fill', fill =>
      am4core.color(am4core.colors.brighten(fill.rgb, -0.2))
    )

    const level1_hoverState = level1_column.states.create('hover')
    level1_hoverState.adapter.add('fill', fill =>
      am4core.color(am4core.colors.brighten(fill.rgb, -0.2))
    )

    treemap.maxLevels = 1

    treemap.responsive.rules.push({
      relevant: am4core.ResponsiveBreakpoints.widthXL,
      state: (target, stateId) => {
        if (target instanceof am4charts.Legend) {
          let state = target.states.create(stateId)
          state.sprite.itemContainers.template.clickable = false
          state.sprite.itemContainers.template.focusable = false
          return state
        }
        return null
      },
    })

    chart.current = treemap

    return () => {
      treemap.dispose()
    }
  }, [sitc2Data])

  useEffect(() => {
    chart.current.data = sitc2Data[flow]
  }, [sitc2Data, flow])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        paddingTop: '3em',
        paddingRight: '10vw',
        paddingLeft: '10vw',
        textAlign: 'center',
      }}>
      <Header as='h2'>
        Finnish {flow} by product category ({year})
      </Header>
      <div id='products-treemap-div' style={{ width: '100%', height: '90%' }}></div>
    </div>
  )
}

export default ProductsTreeMap
