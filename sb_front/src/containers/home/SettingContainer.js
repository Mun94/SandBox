import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Setting from '../../components/home/Setting.js';
import { settingChannel, settingInitial, settingRemoveButton } from '../../modules/setting.js';
import { dbPost,dbPostPatchInitial } from '../../modules/dbs.js';

const SettingContainer = () => {
  const [error, setError] = useState(null);
  const [useAlert, setAlert] = useState(false);
  const [useQue, setQue] = useState(false);
  const [useOnButton, setOnButton] = useState(false);
  const [useOnRemove, setOnRemove] = useState(false);

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

  const onClickQue = () => {
    setQue(true);
  }
  const offClickQue = () => {
    setQue(false);
  }
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
    setQue(false);
    setError(null);
    dispatch(settingInitial());
  };
  const onRemove = () => {
    setOnRemove(true);
    dispatch(settingRemoveButton({removeButtonState:true}));
  }
  const onRemoveCancel = () => {
    setOnRemove(false);
    dispatch(settingRemoveButton({removeButtonState:false}));
  }
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

      if(channelInfo.filter(ch => channelId.indexOf(ch.channelId) >= 0).length>0){
        setError('이미 존재하는 채널 아이디 입니다.')
        dispatch(settingInitial());
        return;
      }
      dispatch(dbPost({ channelId, name, categoryId }));
      dispatch(settingInitial());
      setOnButton(false);
      setAlert(false);
    },
    [channelId, name, categoryId, dispatch,channelInfo],
  );

  useEffect(() => {
    if (dbPostStatus) {
      setAlert(true);
      setError(null);
    }
    return () => {
      dispatch(dbPostPatchInitial());
    }
  }, [dbPostStatus,dispatch]);

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
      onClickQue={onClickQue}
      offClickQue={offClickQue}
      onRemove={onRemove}
      onRemoveCancel={onRemoveCancel}
      error={error}
      useAlert={useAlert}
      useQue={useQue}
      useOnRemove={useOnRemove}
    />
  );
};

export default SettingContainer;
