import { createElement } from 'react'

const renderHtml = (tag: string, rawHTML: string) =>
  createElement(tag, { dangerouslySetInnerHTML: { __html: rawHTML } })

export default renderHtml
