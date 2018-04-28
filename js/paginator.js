import React from 'react'
import parser from 'parse-link-header'

export default ({response, onChange}) => {
  const linkHeader = response && response.headers.get('Link')
  const parsed = linkHeader && parser(linkHeader)
  return (
    <div>
      <button disabled={!parsed || !parsed.prev}
        onClick={() => onChange(parsed.prev.url)} >previous</button>
      <button disabled={!parsed || !parsed.next}
        onClick={() => onChange(parsed.next.url)} >next</button>
    </div>
  )
}