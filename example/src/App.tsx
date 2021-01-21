import React from 'react'

import { TemplatedPreviewUrl } from 'builderio-templated-preview-url'
import 'builderio-templated-preview-url/dist/index.css'

const editingModel = {
  examplePageUrl:
    'http://localhost:8080/{{targeting.locale.0}}{{targeting.pageURL}}'
}

const editingContentModel = {
  query: {
    toJSON: () => [
      { property: 'pageUrl', value: '/' },
      { property: 'locale', value: ['en-AU'] }
    ]
  }
}

const context = {
  designerState: {
    editingModel,
    editingContentModel
  }
}

const App = () => {
  return <TemplatedPreviewUrl context={context} />
}

export default App
