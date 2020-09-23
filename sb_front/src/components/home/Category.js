import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button.js';

const Category = ({ onClick }) => {
  return (
    <>
      <Button value="" onClick={onClick}>
        All
      </Button>
      <Button value="23" onClick={onClick}>
        Comedy
      </Button>
      <Button value="22" onClick={onClick}>
        People/Blogs
      </Button>
      <Button value="20" onClick={onClick}>
        Gaming
      </Button>
      <Button value="1" onClick={onClick}>
        Film/Animation
      </Button>
      <Button value="24" onClick={onClick}>
        Entertainment
      </Button>
      <Button value="27" onClick={onClick}>
        Education
      </Button>
      <Button value="30" onClick={onClick}>
        Movie
      </Button>
    </>
  );
};

export default React.memo(Category);
