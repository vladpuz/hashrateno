import vladpuz from 'eslint-config-vladpuz'

const config = vladpuz()

config.push({
  ignores: ['build'],
})

export default config
