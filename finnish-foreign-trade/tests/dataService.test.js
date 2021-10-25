const dataService = require('../services/tradeDataService')
const { checkProperties } = require('./testHelper')

const data = [
  {
    keys: [
      '0-9 (2002--.) ALL GROUPS',
      'GL (2002--.) Greenland',
      '2018',
      'Imports by countries of origin'
    ],
    vals: [1559873]
  },
  {
    keys: [
      '0-9 (2002--.) ALL GROUPS',
      'GM (2002--.) Gambia',
      '2018',
      'Imports by countries of origin'
    ],
    vals: [39398]
  },
  {
    keys: [
      '0-9 (2002--.) ALL GROUPS',
      'GN (2002--.) Guinea',
      '2018',
      'Imports by countries of origin'
    ],
    vals: [28059]
  },
  {
    keys: [
      '0-9 (2002--.) ALL GROUPS',
      'GQ (2002--.) Equatorial Guinea',
      '2018',
      'Imports by countries of origin'
    ],
    vals: [2821]
  },
  {
    keys: [
      '0-9 (2002--.) ALL GROUPS',
      'GR (2002--.) Greece',
      '2018',
      'Imports by countries of origin'
    ],
    vals: [173548380]
  }
]

describe('mapTradeData', () => {
  let mappedData

  beforeAll(() => {
    mappedData = dataService.mapTradeData(data)
    console.log(mappedData)
  })

  test('return right number of data items', () => {
    expect(mappedData).toBeDefined()
    expect(mappedData.length).toEqual(data.length)
  })

  test('maps the data correctly', () => {
    mappedData.forEach(item => checkProperties(item, ['id', 'year', 'euros']))
  })
})

describe('classifyTradeData', () => {
  let mappedData
  let classifiedData

  beforeAll(() => {
    mappedData = dataService.mapTradeData(data)
    classifiedData = dataService.classifyTradeData(mappedData)
  })

  test('returns right number of data items', () => {
    expect(classifiedData).toBeDefined()
    expect(classifiedData.length).toEqual(mappedData.length)
  })

  describe('classifies the data correctly', () => {
    test('class 6', () => {
      const mockData = [
        { id: 'AA', year: 2018, euros: 5000000000 },
        { id: 'AB', year: 2018, euros: 5000000001 }
      ]
      classifiedData = dataService.classifyTradeData(mockData)
      classifiedData.forEach(item => expect(item.value).toEqual(6))
    })

    test('class 5', () => {
      const mockData = [
        { id: 'AA', year: 2018, euros: 4999999999 },
        { id: 'AB', year: 2018, euros: 1000000001 }
      ]
      classifiedData = dataService.classifyTradeData(mockData)
      classifiedData.forEach(item => expect(item.value).toEqual(5))
    })

    test('class 4', () => {
      const mockData = [
        { id: 'AA', year: 2018, euros: 999999999 },
        { id: 'AB', year: 2018, euros: 100000001 }
      ]
      classifiedData = dataService.classifyTradeData(mockData)
      classifiedData.forEach(item => expect(item.value).toEqual(4))
    })

    test('class 3', () => {
      const mockData = [
        { id: 'AA', year: 2018, euros: 99999999 },
        { id: 'AB', year: 2018, euros: 10000001 }
      ]
      classifiedData = dataService.classifyTradeData(mockData)
      classifiedData.forEach(item => expect(item.value).toEqual(3))
    })

    test('class 2', () => {
      const mockData = [
        { id: 'AA', year: 2018, euros: 9999999 },
        { id: 'AB', year: 2018, euros: 1000001 }
      ]
      classifiedData = dataService.classifyTradeData(mockData)
      classifiedData.forEach(item => expect(item.value).toEqual(2))
    })

    test('class 1', () => {
      const mockData = [{ id: 'AA', year: 2018, euros: 999999 }]
      classifiedData = dataService.classifyTradeData(mockData)
      classifiedData.forEach(item => expect(item.value).toEqual(1))
    })
  })
})
