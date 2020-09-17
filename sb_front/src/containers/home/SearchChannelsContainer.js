import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchChannels } from '../../modules/channels.js';
import SearchBar from '../../components/common/SearchBar.js';

const SearchChannelsContainer = () => {
  const { keyword } = useSelector(({ Channels }) => Channels.keyword);
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e) => {
      dispatch(SearchChannels({ keyword: e.target.value }));
    },
    [dispatch],
  );

  return <SearchBar type="text" value={keyword} onChange={onChange} />;
};

export default SearchChannelsContainer;
