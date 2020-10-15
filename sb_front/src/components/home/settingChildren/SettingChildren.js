import React from 'react';
import styled,{css} from 'styled-components';
import palette from '../../common/palette.js';
import { MdCancel } from 'react-icons/md';

const comAnimation = set =>set && css`
  animation: setAnimation 0.3s linear forwards;

@keyframes setAnimation {
  0% {
    opacity: 25%;
  }
  100% {
    opacity: 100%;
  }
}
`

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
  height: 540px;
  background: rgba(0, 0, 0, 0.25);

  .cancelIcon {
    display: flex;
    width: 310px;
    justify-content: flex-end;
    margin-bottom: 4px;
  }

  ${comAnimation('set')}
`;


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

const AddDeleteBlock = styled.div`
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

const SettingChildren = ({children, onCancel, useQue, offClickQue}) => {
    return(
        <OnBlock>
        <div>
        <div className="cancelIcon">
          <MdCancel onClick={onCancel} />
        </div>
        <AddDeleteBlock>
        {children}
        </AddDeleteBlock>
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

export default React.memo(SettingChildren)