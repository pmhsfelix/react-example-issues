import React from 'react'
import HttpGet from './http-get'
import HttpGetSwitch from './http-get-switch'

export default () => (
  <div>
    <HttpGet
      url='http://httpbin.org/delay/5'
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
