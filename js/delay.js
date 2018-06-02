import React from 'react'
import HttpGet from './http-get'
import HttpGetSwitch from './http-get-switch'

export default () => (
  <div>
    <HttpGet
      url='https://httpbin.org/delay/3'
      render={(result) => (
        <div>
          <HttpGetSwitch result={result}
            onJson={json => (
              <pre>
                {JSON.stringify(json, null, 2)}
              </pre>
            )}
          />
        </div>
      )} />
  </div>
)
