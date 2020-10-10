import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button.js';
import palette from '../common/palette.js';

const CategoryBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.7rem;
`;

const CategoryButton = styled(Button)`
  background: none;
  color: ${palette.white};
  height: 2rem;
  &:focus {
    background: ${palette.yellow};
    color: black;
    border-bottom: 3px solid ${palette.yellow};
  }
  &:hover {
    border-bottom: 3px solid ${palette.yellow};
  }
`;

const Category = ({ onClick }) => {
  return (
    <CategoryBlock>
      <CategoryButton value="" onClick={onClick}>
        전체
      </CategoryButton>
      <CategoryButton value="코미디" onClick={onClick}>
        코미디
      </CategoryButton>
      <CategoryButton value="게임" onClick={onClick}>
        게임
      </CategoryButton>
      <CategoryButton value="영화" onClick={onClick}>
        영화
      </CategoryButton>
      <CategoryButton value="교육" onClick={onClick}>
        교육
      </CategoryButton>
      <CategoryButton value="일상" onClick={onClick}>
        일상/취미
      </CategoryButton>
    </CategoryBlock>
  );
};

export default React.memo(Category);
