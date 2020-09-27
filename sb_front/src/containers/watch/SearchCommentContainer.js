import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchComment } from '../../modules/watchDetails.js';
import SearchBar from '../../components/common/SearchBar.js';

const SearchCommentContainer = () => {
  const dispatch = useDispatch();
  const { keyword } = useSelector(({ watchDetails }) => ({
    keyword: watchDetails.keyword,
  }));
  const onChange = useCallback(
    (e) => {
      dispatch(searchComment({ keyword: e.target.value }));
    },
    [dispatch],
  );

  return <SearchBar type="text" onChange={onChange} value={keyword} />;
};

export default SearchCommentContainer;
