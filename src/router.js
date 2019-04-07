import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LuanchPage from './routes/launchPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/chat" exact component={IndexPage} />
        <Route path="/" exact component={LuanchPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
