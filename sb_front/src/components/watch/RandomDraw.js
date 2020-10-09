import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;

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

const RandomDrawBlock = styled.div`
  width: 320px;
  background: #f7f2f2;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  display: flex;
  flex-direction: column;
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
  input {
    margin-bottom: 0.8rem;
    outline: none;
    border: none;
    height: 30px;
    border-radius: 4px;
    padding-left: 4px;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.8rem;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: 0.75rem;
  }
  &:hover,
  &:focus {
    background: #ffc200;
  }
`;

const ComBlock = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 60%;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 1rem;
  }
`;

const RandomDraw = ({
  visible,
  title,
  onConfirm,
  onCancel,
  result,
  onChange,
  random,
  commentDetail,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <RandomDrawBlock>
        <h2>{title}</h2>
        <input
          type="text"
          placeholder="인원 수 입력"
          onChange={onChange}
          value={random}
        />
        <ButtonBlock>
          <StyledButton onClick={onCancel}>취소</StyledButton>
          <StyledButton onClick={onConfirm}>확인</StyledButton>
        </ButtonBlock>
        {result
          ? commentDetail
              .sort(() => Math.random() - Math.random())
              .slice(0, random)
              .map((com, index) => (
                <ComBlock key={com.id}>
                  {index + 1}
                  <img src={com.authorProfileImageUrl} alt="" />
                  {com.authorDisplayName}
                </ComBlock>
              ))
          : null}
      </RandomDrawBlock>
    </Fullscreen>
  );
};

export default React.memo(RandomDraw);
