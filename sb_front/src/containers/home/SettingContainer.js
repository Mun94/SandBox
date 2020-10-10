import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Setting from '../../components/home/Setting.js';
import { settingChannel, settingInitial } from '../../modules/setting.js';
import { dbPost } from '../../modules/dbs.js';

const SettingContainer = () => {
  const [error, setError] = useState(null);
  const [useAlert, setAlert] = useState(false);
  const [useOnButton, setOnButton] = useState(false);

  const dispatch = useDispatch();
  const { channelId, name, categoryId, dbPostStatus, channelInfo } = useSelector(
    ({ setting, dbs, homeChannels }) => ({
      channelId: setting.channelId,
      name: setting.name,
      categoryId: setting.categoryId,
      dbPostStatus: dbs.dbPostStatus,
      channelInfo: homeChannels.channelInfo
    }),
  );

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
    setError(null);
    dispatch(settingInitial());
  };
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if ([channelId, name, categoryId].includes('')) {
        setError('빈 칸을 모두 입력하세요');
        return;
      }
      if(channelId.length !== 24){
        setError('채널 아이디는 24자 입니다.')
        return;
      }
      if(channelInfo.filter(ch => ch.channelId === channelId)){
        setError('이미 존재하는 채널 아이디 입니다.')
        dispatch(settingInitial());
        return;
      }
      dispatch(dbPost({ channelId, name, categoryId }));
      dispatch(settingInitial());
      setOnButton(false);
    },
    [channelId, name, categoryId, dispatch,channelInfo],
  );

  useEffect(() => {
    if (dbPostStatus) {
      setAlert(true);
    }else{
      setAlert(false);
    }
  }, [dbPostStatus]);

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
      useAlert={useAlert}
    />
  );
};

export default SettingContainer;
