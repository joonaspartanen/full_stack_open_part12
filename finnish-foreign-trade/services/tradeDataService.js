const axios = require('axios')
const memorycache = require('memory-cache')
const baseUrl =
  'https://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=data&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC'
const utils = require('../utils/utils')

const getClassifiedTradeData = async (year, flow) => {
  const data = await fetchTradeData('SITC1', '0-9', '=ALL', year, flow)
  const mappedData = mapTradeData(data)
  const classifiedData = classifyTradeData(mappedData)
  return classifiedData
}

const fetchTradeData = async (SITC, classification, country, year, flow) => {
  axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
      try {
        const parsedData = JSON.parse(res.data.slice(1))
        res.data = parsedData
      } catch (e) {
        console.log(e)
      }
    }
    return res
  })

  try {
    const response = await axios.get(baseUrl, {
      params: {
        [`Classification of Products ${SITC}`]: classification,
        Country: country,
        Year: year,
        Flow: flow,
        Indicators: 'V1',
      },
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const mapTradeData = data => {
  return data
    .map(a => ({
      id: a.keys[1].substring(0, 2),
      year: parseInt(a.keys[2]),
      euros: a.vals[0] === null ? 0 : a.vals[0],
    }))
    .filter(a => a.id !== 'AA')
    .map(a => updateSerbianCountryCode(a))
    .sort((a, b) => b.euros - a.euros)
}

const updateSerbianCountryCode = a => {
  return a.id === 'XS' ? { ...a, id: 'RS' } : a
}

const classifyTradeData = data => {
  return data.map(a => {
    let c = 1
    if (a.euros >= 5000000000) {
      c = 6
    } else if (a.euros >= 1000000000 && a.euros < 5000000000) {
      c = 5
    } else if (a.euros >= 100000000 && a.euros < 1000000000) {
      c = 4
    } else if (a.euros >= 10000000 && a.euros < 100000000) {
      c = 3
    } else if (a.euros >= 1000000 && a.euros < 10000000) {
      c = 2
    } else if (a.euros < 1000000) {
      c = 1
    }
    return { ...a, value: c }
  })
}

const getTradeBalanceData = async () => {
  const imports = await fetchTradeData('SITC1', '0-9', 'AA', '=FIRST*;10', '1')
  const exports = await fetchTradeData('SITC1', '0-9', 'AA', '=FIRST*;10', '2')
  const mappedImports = imports.map(a => ({
    year: parseInt(a.keys[2]),
    imports: a.vals[0],
  }))
  const mappedExports = exports.map(a => ({
    year: parseInt(a.keys[2]),
    exports: a.vals[0],
  }))
  const combinedData = mappedImports.map((a, i) => ({
    ...a,
    exports: mappedExports[i].exports,
  }))
  const result = combinedData.map(a => ({
    ...a,
    tradeBalance: a.exports - a.imports,
  }))
  return result.sort((a, b) => b.year - a.year)
}

// I don't really need SITC1 data now...
const getSITC1Data = async () => {
  const imports = await fetchTradeData('SITC1', '=ALL', 'AA', '2018', '1')
  const exports = await fetchTradeData('SITC1', '=ALL', 'AA', '2018', '2')
  const mappedImports = imports
    .sort((a, b) => b.vals - a.vals)
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ [a.keys[0].substring(12)]: a.vals[0] }))
  const mappedExports = exports
    .sort((a, b) => b.vals - a.vals)
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({ [a.keys[0].substring(12)]: a.vals[0] }))
  const finalImports = Object.assign({ flow: 'Imports' }, ...mappedImports)
  const finalExports = Object.assign({ flow: 'Exports' }, ...mappedExports)

  const result = []
  result.push(finalImports, finalExports)
  return result
}

const getSITC2Data = async (year, flow) => {
  const SITC2Array = utils.initializeSITC2Array()
  let data = await fetchTradeData('SITC2', '=ALL', 'AA', year, flow)
  data = mapDataForSITC2(data)
  data.forEach(a => {
    SITC2Array[a.SITC1].children.push(a)
  })
  return SITC2Array
}

const mapDataForSITC2 = data => {
  return data
    .filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
    .map(a => ({
      group: a.keys[0].substring(13),
      value: a.vals[0],
      SITC1: parseInt(a.keys[0].substring(0, 1)),
    }))
    .sort((a, b) => a.SITC1 - b.SITC1)
}

const getSITC2CountryData = async (country, year, flow) => {
  let data = await fetchTradeData('SITC2', '=ALL', country, year, flow)
  data = removeAllGroupsItem(data)
  data = data
    .sort((a, b) => b.vals - a.vals)
    .map(a => ({
      group: a.keys[0].substring(13),
      value: a.vals[0],
    }))
  return data
}

const removeAllGroupsItem = data => {
  return data.filter(a => a.keys[0] !== '0-9 (2002--.) ALL GROUPS')
}

const getTradePartnerRankings = async year => {
  const imports =
    memorycache.get('/imports') || (await fetchTradeData('SITC1', '0-9', '=ALL', year, '1'))
  const exports =
    memorycache.get('/exports') || (await fetchTradeData('SITC1', '0-9', '=ALL', year, '2'))

  const mappedImports = mapTradeData(imports)
  const mappedExports = mapTradeData(exports)

  const totalTrade = mappedImports
    .map(exporter => ({
      id: exporter.id,
      euros: exporter.euros + mappedExports.find(importer => importer.id === exporter.id).euros,
    }))
    .sort((a, b) => b.euros - a.euros)
    .map((country, index) => ({ rank: index + 1, ...country }))
  return totalTrade
}

module.exports = {
  mapTradeData,
  classifyTradeData,
  getTradeBalanceData,
  getClassifiedTradeData,
  getSITC1Data,
  getSITC2Data,
  getSITC2CountryData,
  getTradePartnerRankings,
}
