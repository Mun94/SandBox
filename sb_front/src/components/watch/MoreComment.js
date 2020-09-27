import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button.js';

const MoreBlock = styled.div`
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
`;

const Wrapper = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  display: flex;
  flex-direction: column;
  div:nth-child(1) {
    margin-bottom: 1rem;
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
