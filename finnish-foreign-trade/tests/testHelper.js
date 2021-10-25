const checkProperties = (object, properties) => {
  properties.forEach(p => {
    expect(object).toHaveProperty(p)
  })
}

module.exports = { checkProperties: checkProperties }
