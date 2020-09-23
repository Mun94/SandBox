import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchChannels } from '../../modules/homeChannels.js';
import SearchBar from '../../components/common/SearchBar.js';

const SearchChannelsContainer = () => {
  const { keyword } = useSelector(({ homeChannels }) => homeChannels.keyword);
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e) => {
      dispatch(searchChannels({ keyword: e.target.value }));
    },
    [dispatch],
  );

  return <SearchBar type="text" value={keyword} onChange={onChange} />;
};

export default SearchChannelsContainer;
