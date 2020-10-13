import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button.js';
import palette from '../../common/palette.js';
import SettingChildren from './SettingChildren.js';

import {BsFillQuestionCircleFill} from 'react-icons/bs';

const ChannelIdInput = styled.span`
position:relative;
  margin-bottom:1rem;
  width: 220px;
    height: 30px;
`
const InfoIcon = styled.span`
  position: absolute;
    color: ${palette.yellow};
    top: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
`;

const Error = styled.div`
  color: ${palette.red};
  margin-bottom: 4px;
`;

const SettingChannelAdd = ({channelId, name, categoryId, onChange, onSubmit, onCancel, onClickQue, offClickQue, error, useQue}) => {
    return (
          <form onSubmit={onSubmit}>
             <SettingChildren onCancel={onCancel} offClickQue={offClickQue} useQue={useQue}>
            <div className="title">크리에티어 추가</div>
            <ChannelIdInput>
            <input
              type="text"
              name="channelId"
              value={channelId}
              onChange={onChange}
              placeholder="채널 아이디"
            /><InfoIcon><BsFillQuestionCircleFill onClick={onClickQue}/></InfoIcon></ChannelIdInput>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="채널 이름"
            />
            <select onChange={onChange} name="categoryId" value={categoryId}>
              <option>카테고리</option>
              <option value="코미디">코미디</option>
              <option value="게임">게임</option>
              <option value="영화">영화</option>
              <option value="교육">교육</option>
              <option value="일상">일상</option>
              <option value="일상,게임">일상,게임</option>
              <option value="교육,게임">교육,게임</option>
            </select>
            {error && <Error>{error}</Error>}
            <Button>입력</Button>
            </SettingChildren>
          </form>
    )
}

export default React.memo(SettingChannelAdd)