import React from 'react';
import styled,{css} from 'styled-components';
import Button from '../common/Button.js';
import palette from '../common/palette.js';

import { MdCancel } from 'react-icons/md';
import {BsFillQuestionCircleFill} from 'react-icons/bs';


const common = css`
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${palette.toneDownWhite};
  width: 310px;
  height: 330px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const comAnimation = set =>set ? css`
  animation: setAnimation 0.3s linear forwards;

@keyframes setAnimation {
  0% {
    opacity: 25%;
  }
  100% {
    opacity: 100%;
  }
}
`: css`
animation: okAnimation 0.3s linear forwards;
    @keyframes okAnimation {
    0% {
      opacity: 25%;
      transform:translateY(-20px);
    }
    100% {
      transform:translateY(0);
      opacity: 100%;
    }
  }
`;

const Form = styled.form`
  ${common}

  button:hover {
    background: ${palette.yellow};
  }
  select {
    border: none;
    width: 100px;
    height: 30px;
    border-radius: 4px;
    margin: 1rem 0;
    outline: none;
  }
  input {
    outline: none;
    border: none;
    width: 220px;
    height: 30px;
    border-radius: 4px;
  }
  .title {
    color: ${palette.black};
    margin-bottom: 1rem;
  }
`;

const OnBlock = styled.div`
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 100%;
  width: 756px;
  border-radius: 1rem;
  height: 550px;
  background: rgba(0, 0, 0, 0.25);

  .cancelIcon {
    display: flex;
    width: 310px;
    justify-content: flex-end;
    margin-bottom: 4px;
  }

  ${comAnimation('set')}
`;

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

const Que = styled.div`
  ${common}
span{
  z-index:1;
  color:${palette.black};
width:224px;
}
`
const QueBlock = styled.div`
   ${comAnimation('set')}
   margin-left:4px;
`

const Error = styled.div`
  color: ${palette.red};
  margin-bottom: 4px;
`;


const SettingChannelAdd = ({channelId, name, categoryId, onChange, onSubmit, onCancel, onClickQue, offClickQue, error, useQue}) => {
    return (
        <OnBlock>
          <div>
          <div className="cancelIcon">
            <MdCancel onClick={onCancel} />
          </div>
          <Form onSubmit={onSubmit}>
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
          </Form>
          </div>
          {useQue && <QueBlock>
          <div className="cancelIcon">
            <MdCancel onClick={offClickQue} />
          </div><Que><span>youtube 사이트 각 채널 URL에 명시되어 있는 채널 ID를 말 합니다.
            <hr/>
          ex) youtube.com / channel / <span style={{color:`${palette.red}`}}>channelId</span></span>
          </Que></QueBlock>}
        </OnBlock>
    )
}

export default React.memo(SettingChannelAdd)