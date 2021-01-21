import React from 'react'
import { Builder } from '@builder.io/react'
import Mustache from 'mustache'

import updatePreviewUrl from './updatePreviewUrl'

type BuilderContext = any

type Props = {
  context: BuilderContext
}

export const TemplatedPreviewUrl: React.FC<Props> = ({ context }) => {
  const { editingContentModel, editingModel } = context.designerState

  React.useEffect(() => {
    if (!editingContentModel) {
      return
    }

    const targeting = editingContentModel.query
      .toJSON()
      .reduce((accum: any, q: any) => ({ ...accum, [q.property]: q.value }), {})

    const view = { targeting }

    const preCompiled = editingModel.examplePageUrl
    const previewUrl = Mustache.render(preCompiled, view)

    if (preCompiled !== previewUrl) {
      updatePreviewUrl(previewUrl)
    }
  }, [])

  return null
}

Builder.registerEditor({
  name: 'TemplatedPreviewUrl',
  component: TemplatedPreviewUrl
})
