import axios from 'axios'

const getCountryCodes = async () => {
  const response = await axios.get('/countries')
  return response.data
}

export default getCountryCodes
