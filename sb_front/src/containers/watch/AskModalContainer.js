import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AskModal from '../../components/common/AskModal.js';
import Button from '../../components/common/Button.js';
import { randomCount } from '../../modules/watchDetails.js';

const AskModalContainer = () => {
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(false);
  const [key, setKey] = useState('');

  const dispatch = useDispatch();
  const { random, commentDetail } = useSelector(({ watchDetails }) => ({
    random: watchDetails.random,
    commentDetail: watchDetails.commentDetail,
  }));

  const onStart = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
    setResult(false);
    dispatch(randomCount({ random: '' }));
  };

  const onConfirm = () => {
    setResult(true);
  };

  useEffect(() => {
    dispatch(randomCount({ random: key }));
    return () => {
      setResult(false);
    };
  }, [dispatch, key]);

  const onChange = useCallback((e) => {
    setKey(e.target.value);
  }, []);

  return (
    <>
      <Button onClick={onStart}>랜덤 추첨</Button>
      {modal && (
        <AskModal
          visible={modal}
          result={result}
          title="랜덤 추첨"
          onCancel={onCancel}
          onConfirm={onConfirm}
          onChange={onChange}
          random={random}
          commentDetail={commentDetail}
        />
      )}
    </>
  );
};

export default AskModalContainer;
