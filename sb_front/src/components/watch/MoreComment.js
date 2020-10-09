import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button.js';

const MoreBlock = styled.div`
  position: absolute;
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

const Wrapper = styled.div`
  background: #f7f2f2;
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  display: flex;
  flex-direction: column;

  div:nth-child(1) {
    margin-bottom: 1rem;
    max-height: 450px;
    overflow: scroll;
  }
  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    button:hover {
      background: #ffc200;
    }
  }
`;

const MoreComment = ({ commentDetail, useMore, onMoreCancle }) => {
  return (
    <>
      {commentDetail.map(
        (com) =>
          parseInt(com.id) === parseInt(useMore) && (
            <MoreBlock key={com.id}>
              <Wrapper>
                <div>{com.textOriginal}</div>
                <div>
                  <Button onClick={onMoreCancle}>취소</Button>
                </div>
              </Wrapper>
            </MoreBlock>
          ),
      )}
    </>
  );
};

export default React.memo(MoreComment);
