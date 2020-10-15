import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChannelInfo from '../../components/channelInfo/ChannelInfo.js';
import { withRouter } from 'react-router-dom';

const ChannelInfoContainer = ({ match }) => {
  const { channelId } = match.params;

  const { channelInfo } = useSelector(({ homeChannels }) => ({
    channelInfo: homeChannels.channelInfo,
  }));

  return <ChannelInfo channelId={channelId} channelInfo={channelInfo} />;
};

export default withRouter(ChannelInfoContainer);
