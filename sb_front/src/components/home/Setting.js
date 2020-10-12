import React from 'react';
import styled,{css} from 'styled-components';

import FlashMessage from 'react-flash-message';
import palette from '../common/palette.js';
import SettingChannelAdd from './SettingChannelAdd.js';
import { BiPlusMedical } from 'react-icons/bi';
import {ImMinus} from 'react-icons/im';
import SettingChannelDelete from './SettingChannelDelete.js';

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

const SettingBlock = styled.div`
  svg:hover {
    color: ${palette.yellow};
  }
`;


const OkBlock = styled.div`
  position: absolute;
    background: ${palette.yellow};
    height: 20px;
    text-align: center;
    border-radius: 1rem;
    width: 756px;
    left:0;

    ${comAnimation()}
`

const Setting = ({
  channelId,
  name,
  categoryId,
  onChange,
  onSubmit,
  onClick,
  onCancel,
  onClickQue,
  offClickQue,
  error,
  useOnButton,
  useAlert,
  useQue,
  onRemove,
  useOnRemove,
  removeName,
  onChangeRemoveName,
  onSubmitRemoveName
}) => {
  return (
    <>
    <SettingBlock>
      { useOnButton && (
       <SettingChannelAdd channelId={channelId} name={name} categoryId={categoryId} onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onClickQue={onClickQue} offClickQue={offClickQue} error={error} useQue={useQue} />
       )}
       {useOnRemove && (<SettingChannelDelete onCancel={onCancel} error={error} onSubmitRemoveName={onSubmitRemoveName} onChangeRemoveName={onChangeRemoveName} removeName={removeName}/>
       )}
       <BiPlusMedical onClick={onClick}/>
        <ImMinus onClick={onRemove}/>
    </SettingBlock>
    {useAlert && (
    <FlashMessage duration={3500} persistOnHover={true}><OkBlock>
  성공!! 새로고침 후 적용됩니다.</OkBlock></FlashMessage>
)}
    </>
  );
};

export default React.memo(Setting);
