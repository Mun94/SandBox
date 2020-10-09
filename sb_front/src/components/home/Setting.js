import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button.js';

import { MdCancel } from 'react-icons/md';
import { BiPlusMedical } from 'react-icons/bi';

const Form = styled.form`
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7f2f2;
  width: 310px;
  height: 330px;
  button:hover {
    background: #ffc200;
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
    padding-left: 4px;
  }
  input + input {
    margin-top: 1rem;
  }
  .title {
    color: black;
    margin-bottom: 1rem;
  }
`;
const SettingBlock = styled.div`
  z-index: 30;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 100%;
  width: 760px;
  border-radius: 1rem;
  height: 550px;
  background: rgba(0, 0, 0, 0.25);

  .cancelIcon {
    display: flex;
    width: 310px;
    justify-content: flex-end;
    padding-right: 1.8rem;
    margin-bottom: 4px;
    svg:hover {
      color: #ffc200;
    }
  }

  animation: setAnimation 0.3s linear forwards;

  @keyframes setAnimation {
    0% {
      opacity: 25%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const Setting = ({
  channelId,
  name,
  categoryId,
  onChange,
  onSubmit,
  onClick,
  onCancel,
  error,
  useOnButton,
}) => {
  return (
    <>
      {useOnButton ? (
        <>
          <BiPlusMedical onClick={onClick} style={{ color: '#ffc200' }} />
          <SettingBlock>
            <div className="cancelIcon">
              <MdCancel onClick={onCancel} />
            </div>
            <Form onSubmit={onSubmit}>
              <div className="title">크리에티어 추가</div>
              <input
                type="text"
                name="channelId"
                value={channelId}
                onChange={onChange}
                placeholder="채널 아이디"
              />
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
              {error && <>{error}</>}
              <Button>입력</Button>
            </Form>
          </SettingBlock>
        </>
      ) : (
        <BiPlusMedical onClick={onClick} />
      )}
    </>
  );
};

export default React.memo(Setting);
