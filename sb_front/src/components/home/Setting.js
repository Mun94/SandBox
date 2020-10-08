import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button.js';

const Setting = ({
  channelId,
  name,
  categoryId,
  onChange,
  onSubmit,
  error,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="channelId"
          value={channelId}
          onChange={onChange}
          placeholder="input channelId"
        />
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="input name"
        />
        <select onChange={onChange} name="categoryId" value={categoryId}>
          <option>카테고리</option>
          <option value="코미디">코미디</option>
          <option value="게임">게임</option>
          <option value="영화">영화</option>
          <option value="교육">교육</option>
          <option value="일상">일상</option>
          <option value="일상,게임">일상,게임</option>
          <option value="교육,게임">교육,게임</option>
        </select>
        <Button>입력</Button>
      </form>
      {error && <>{error}</>}
    </>
  );
};

export default React.memo(Setting);
