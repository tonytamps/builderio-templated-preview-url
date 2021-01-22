import React from 'react'
import { Builder } from '@builder.io/sdk'
import Mustache from 'mustache'

import updatePreviewUrl from './updatePreviewUrl'

type BuilderContext = any

type Props = {
  context: BuilderContext
}

async function waitForEditingContentModel(context: BuilderContext): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(!!context.designerState.editingContentModel)
  }).then((editingContentModelExists) => {
    if (!editingContentModelExists) {
      return waitForEditingContentModel(context)
    }

    return true
  })
}

export const TemplatedPreviewUrl: React.FC<Props> = ({ context }) => {
  const [ready, setReady] = React.useState(false)

  waitForEditingContentModel(context).then(() => setReady(true))

  React.useEffect(() => {
    if (!ready) {
      return
    }

    const { editingContentModel, editingModel } = context.designerState
    const targeting = editingContentModel.query
      .toJSON()
      .reduce((accum: any, q: any) => ({ ...accum, [q.property]: q.value }), {})

    const view = { targeting }

    const preCompiled = editingModel.examplePageUrl
    const previewUrl = Mustache.render(preCompiled, view)

    if (preCompiled !== previewUrl) {
      updatePreviewUrl(previewUrl)
    }
  }, [ready])

  return null
}

Builder.registerEditor({
  name: 'TemplatedPreviewUrl',
  component: TemplatedPreviewUrl
})
