const updatePreviewUrl = (previewUrl: string): void => {
  window.postMessage(
    {
      type: 'builder.updateEditorOptions',
      data: {
        data: { previewUrl }
      }
    },
    '*'
  )
}

export default updatePreviewUrl
