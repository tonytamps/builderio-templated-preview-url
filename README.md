# builderio-templated-preview-url

> Allows the usage of template variables in the preview url of your model

[![NPM](https://img.shields.io/npm/v/builderio-templated-preview-url.svg)](https://www.npmjs.com/package/builderio-templated-preview-url) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

1. Go to Account > Plugins 
2. Add a new plugin with the URL `https://unpkg.com/builderio-templated-preview-url`
3. Save


## Usage

1. Go to Model > Editing URL
2. Enter a [mustache.js](https://github.com/janl/mustache.js/) template like `http://localhost:8080/{{targeting.locale.0}}{{{targeting.urlPath}}}`
3. Save

## License

MIT © [tonytamps](https://github.com/tonytamps)
