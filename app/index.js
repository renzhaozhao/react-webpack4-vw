import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Loadable from 'react-loadable'

import routes from './routes'
import './index.less'

const render = async Component => {
  await Loadable.preloadAll()
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(routes)

// 模块热替换的 API
if (module.hot) {
  module.hot.accept('./routes', () => {
    render(routes)
  })
}
