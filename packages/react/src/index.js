import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'


import App from './app'

import './common/style/reset.css'
import './common/style/index.css'
import './common/style/iconfont.css'

import {store} from './store/index'
import {Provider} from 'smox'


ReactDom.render((
  <Provider store={ store }>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>

), document.getElementById('app'))

