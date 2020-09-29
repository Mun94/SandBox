import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './page/Home.js';
import Videos from './page/Videos.js';
import Watch from './page/Watch.js';
import ChannelInfo from './page/ChannelInfo.js';
import Button from './components/common/Button.js';
import { withRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/v/:channelId" component={Videos} />
        <Route path="/watch" component={Watch} />
        <Route path="/info/:channelId" component={ChannelInfo} />
        <Route
          render={({ location, history }) => (
            <div style={{ 'text-align': 'center', color: '#f7f2f2' }}>
              <h2>경로 에러</h2>
              <h3>{location.pathname}</h3>
              <Button onClick={() => history.push('/')}>홈으로</Button>
            </div>
          )}
        />
      </Switch>
    </>
  );
}

export default withRouter(App);
