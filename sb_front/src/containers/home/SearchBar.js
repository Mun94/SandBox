import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchChannels } from '../../modules/channels.js';

const SearchBar = () => {
  const { keyword } = useSelector(({ Channels }) => Channels.keyword);
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e) => {
      dispatch(SearchChannels({ keyword: e.target.value }));
    },
    [dispatch],
  );

  return (
    <form>
      <input
        type="text"
        placeholder="search.."
        value={keyword}
        onChange={onChange}
      />
    </form>
  );
};

export default SearchBar;
