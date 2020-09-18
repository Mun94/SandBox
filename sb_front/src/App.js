import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './page/Home.js';
import Videos from './page/Videos.js';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/v/:channelId" component={Videos} />
        <Route
          render={({ location }) => (
            <>
              <h2>경로 에러</h2>
              <h3>{location.pathname}</h3>
            </>
          )}
        />
      </Switch>
    </>
  );
}

export default App;
