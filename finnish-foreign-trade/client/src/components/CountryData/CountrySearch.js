import React, { useState } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const CountrySearch = ({ handleCountryFilterChange, countryCodes }) => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  if (countryCodes === undefined) {
    return null
  }

  const countryNames = countryCodes.map((c) => ({
    title: c.name,
    key: c.code,
  }))

  const resultRenderer = ({ title }) => <div>{title}</div>

  const handleResultSelect = (e, { result }) => {
    setValue(result.title)
    handleCountryFilterChange(result.title)
  }

  const handleSearchChange = (e, { value }) => {
    setIsLoading(true)
    setValue(value)

    setIsLoading(true)
    setValue(value)

    if (value.length < 1) {
      setValue('')
      setIsLoading(false)
      setResults([])
      return
    }

    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = (result) => re.test(result.title)

    setIsLoading(false)

    const foundResults = _.filter(countryNames, isMatch)

    if (foundResults.length > 20) {
      setResults([{ title: 'Please narrow down your search.' }])
    } else {
      setResults(foundResults)
    }
    if (results.length === 1) {
      handleCountryFilterChange(results[0].title)
    }
  }

  return (
    <Search
      placeholder='Search...'
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, {
        leading: true,
      })}
      results={results}
      resultRenderer={resultRenderer}
      value={value}
    />
  )
}

export default CountrySearch
