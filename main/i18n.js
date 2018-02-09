const fs = require('fs')
const path = require('path')
const Globalize = require('globalize')
const accepts = require('accepts')
const { DEFAULT_LANG } = require('./config')

Globalize.load(
  require('cldr-data/supplemental/likelySubtags'),
  require('cldr-data/supplemental/plurals')
)

const locales = fs
  .readdirSync(path.join(__dirname, '..', 'locales'))
  .filter((filename) => path.extname(filename) === '.json')
  .map((filename) => filename.split('.')[0])

const messages = locales
  .map((filename) => fs.readFileSync(path.join(__dirname, '..', 'locales', `${filename}.json`), 'utf8'))
  .reduce((packs, contents) => {
    const pack = JSON.parse(contents)

    return Object.assign(packs, pack)
  }, {})

Globalize.loadMessages(messages)

const GlobalizeInstances = locales.map((locale) => ({
  [locale]: (function () {
    const G = new Globalize(locale)
    const messagesFormaters = {}

    return (key, params) => {
      if (Object.keys(messagesFormaters).includes(key)) {
        return messagesFormaters[key](params)
      } else {
        messagesFormaters[key] = G.messageFormatter(key)

        return messagesFormaters[key](params)
      }
    }
  }())
})).reduce((instancesObject, instance) => Object.assign(instancesObject, instance), {})

module.exports = {
  middleware: (req, res, next) => {
    const lang = accepts(req).language(locales)
    const language = lang || DEFAULT_LANG
    res.locals.t = GlobalizeInstances[language]
    const globalize = Globalize.locale(DEFAULT_LANG)
    next()
  }
}
