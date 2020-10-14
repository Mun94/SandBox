import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Setting from '../../components/home/Setting.js';
import { settingChannel, settingInitial, settingRemoveName } from '../../modules/setting.js';
import { dbPost,dbPostPatchDeleteInitial,dbDelete } from '../../modules/dbs.js';

const SettingContainer = () => {
  const [error, setError] = useState(null);
  const [useAlert, setAlert] = useState(false);
  const [useQue, setQue] = useState(false);
  const [useOnButton, setOnButton] = useState(false);
  const [useOnRemove, setOnRemove] = useState(false);
  const [useRemoveList, setRemoveList] = useState([])

  const dispatch = useDispatch();
  const { channelId, name, categoryId, dbPostStatus, dbDeleteStatus, channelInfo, removeName } = useSelector(
    ({ setting, dbs, homeChannels }) => ({
      channelId: setting.channelId,
      name: setting.name,
      categoryId: setting.categoryId,
      dbPostStatus: dbs.dbPostStatus,
      dbDeleteStatus:dbs.dbDeleteStatus,
      channelInfo: homeChannels.channelInfo,
      removeName: setting.removeName
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
  const onChangeRemoveName = useCallback(e => {
    dispatch(settingRemoveName({removeName: e.target.value}))
  },[dispatch]);

  const onClick = () => {
    setOnButton(true);
    setOnRemove(false);
  };
  const onCancel = () => {
    setOnButton(false);
    setOnRemove(false);
    setQue(false);
    setError(null);
    dispatch(settingInitial());
  };
  const onRemove = () => {
    setOnButton(false)
    setOnRemove(true);
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
      setAlert(false);
    },
    [channelId, name, categoryId, dispatch,channelInfo],
  );

useEffect(() => {
  if(removeName){
  setRemoveList(channelInfo.filter(Info => Info.name.indexOf(removeName) >=0))}
  return() => {
    setRemoveList([])
  }
},[channelInfo, removeName])

const onDeleteClick = (id) => {
  dispatch(dbDelete({channelId : id}));
  setAlert(false);
}

useEffect(() => {
    if (dbPostStatus) {
      setAlert(true);
      dispatch(settingInitial());
      setError(null);
      setOnButton(false);
    }
    if(dbDeleteStatus){
      setOnRemove(false);
      dispatch(settingInitial());
      setAlert(true);
      setError(null);
    }
    return () => {
      dispatch(dbPostPatchDeleteInitial());
      
  }
}, [dbPostStatus,dbDeleteStatus,dispatch,useAlert]);

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
      error={error}
      useAlert={useAlert}
      useQue={useQue}
      useOnRemove={useOnRemove}
      removeName={removeName}
      onChangeRemoveName={onChangeRemoveName}
      useRemoveList={useRemoveList}
      onDeleteClick={onDeleteClick}
    />
  );
};

export default SettingContainer;
