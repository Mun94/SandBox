import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Category from '../../components/home/Category.js';
import { categoryKeyChannels } from '../../modules/homeChannels.js';

const CategoryContainer = () => {
  const dispatch = useDispatch();

  const onClick = useCallback(
    (e) => {
      dispatch(categoryKeyChannels({ category: e.target.value }));
    },
    [dispatch],
  );

  return <Category onClick={onClick} />;
};

export default CategoryContainer;
