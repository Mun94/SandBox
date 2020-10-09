import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Setting from '../../components/home/Setting.js';
import { settingChannel } from '../../modules/setting.js';
import { dbPost } from '../../modules/dbs.js';

const SettingContainer = () => {
  const [error, setError] = useState(null);
  const [useOnButton, setOnButton] = useState(false);

  const dispatch = useDispatch();
  const { channelId, name, categoryId } = useSelector(({ setting }) => ({
    channelId: setting.channelId,
    name: setting.name,
    categoryId: setting.categoryId,
  }));

  const onChange = useCallback(
    (e) => {
      const {
        target: { name, value },
      } = e;
      dispatch(settingChannel({ key: name, value }));
    },
    [dispatch],
  );
  const onClick = () => {
    setOnButton(true);
  };
  const onCancel = () => {
    setOnButton(false);
  };
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if ([channelId, name, categoryId].includes('')) {
        setError('빈 칸을 모두 입력하세요');
        return;
      }
      dispatch(dbPost({ channelId, name, categoryId }));
      setOnButton(false);
    },
    [channelId, name, categoryId, dispatch],
  );

  return (
    <Setting
      channelId={channelId}
      name={name}
      categoryId={categoryId}
      useOnButton={useOnButton}
      onChange={onChange}
      onSubmit={onSubmit}
      onClick={onClick}
      onCancel={onCancel}
      error={error}
    />
  );
};

export default SettingContainer;
