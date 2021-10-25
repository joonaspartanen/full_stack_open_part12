const axios = require('axios')
const url =
  'https://uljas.tulli.fi/uljas/graph/api.aspx?lang=en&atype=class&konv=json&ifile=/DATABASE/01%20ULKOMAANKAUPPATILASTOT/02%20SITC/ULJAS_SITC'

const fetchCountryCodes = async () => {
  axios.interceptors.response.use((res) => {
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
    const response = await axios.get(url)
    const countryCodes = extractCountryCodes(response.data)
    return countryCodes
  } catch (e) {
    console.log(e)
  }
}

const extractCountryCodes = (data) => {
  const countryCodes = data.classification.filter((a) => a.id === 'D3')
  return mapCountryCodes(countryCodes[0].class)
}

const mapCountryCodes = (data) => {
  data = removeUnwantedCountryCodes(data)
  const parenthesesRegex = / *\([^)]*\) */g
  return data.map((a) => ({
    code: a.code.toLowerCase(),
    name: a.text.replace(parenthesesRegex, ''),
  }))
}

// TODO: It might be better to exclude these already when fetching data
const removeUnwantedCountryCodes = (data) => {
  const unwantedCountryCodes = ['AA', 'QR', 'QS', 'QU', 'QV', 'QY', 'QZ']
  return data.filter((a) => !unwantedCountryCodes.includes(a.code))
}

module.exports = {
  fetchCountryCodes,
}
