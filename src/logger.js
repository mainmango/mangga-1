const chalk = require('chalk')
const observatory = require('observatory').settings({
  prefix: chalk.yellow('[mangga] ')
})

module.exports = {
  add : (text) => {
    const _text = chalk.white(text)
    return observatory.add(_text)
  }
}