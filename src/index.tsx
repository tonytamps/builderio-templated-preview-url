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
    if (context.designerState.editingContentModel) {
      return resolve()
    }
    setTimeout(() => waitForEditingContentModel(context).then(resolve), 200)
  })
}

export const TemplatedPreviewUrl: React.FC<Props> = ({ context }) => {
  const [ready, setReady] = React.useState(false)
  const [targeting, setTargeting] = React.useState({})

  React.useEffect(() => {
    waitForEditingContentModel(context).then(() => setReady(true))

    const intervalId = setInterval(() => {
      const { editingContentModel } = context.designerState
      const newTargeting = editingContentModel?.query
        .toJSON()
        .reduce((accum: any, q: any) => ({ ...accum, [q.property]: q.value }), {})

      if (newTargeting) {
        setTargeting(newTargeting)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  React.useEffect(() => {
    if (!ready) {
      return
    }

    const { editingContentModel, editingModel } = context.designerState

    const preCompiled = editingModel.examplePageUrl
    const previewUrl = Mustache.render(preCompiled, { targeting })

    if (preCompiled !== previewUrl && editingContentModel.previewUrl !== previewUrl) {
      console.log(`Updating preview url: ${previewUrl}`)
      editingContentModel.previewUrl = previewUrl
      updatePreviewUrl(previewUrl)
    }
  }, [ready, targeting])

  return null
}

Builder.registerEditor({
  name: 'TemplatedPreviewUrl',
  component: TemplatedPreviewUrl
})
