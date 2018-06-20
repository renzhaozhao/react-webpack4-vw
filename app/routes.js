import React from 'react'
import Loadable from 'react-loadable'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const LoadableComponent = loader => Loadable({
  loader: loader,
  loading: () => null
})

const Page1 = LoadableComponent(() => import(/* webpackChunkName: "page1" */ './containers/Page1'))
const Page2 = LoadableComponent(() => import(/* webpackChunkName: "page2" */ './containers/Page2'))
const Page3 = LoadableComponent(() => import(/* webpackChunkName: "page3" */ './containers/Page3'))

const routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Page1} />
      <Route path="/page2" component={Page2} />
      <Route path="/page3" component={Page3} />
    </Switch>
  </Router>
)

export default routes
