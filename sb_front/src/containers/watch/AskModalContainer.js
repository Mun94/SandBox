import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AskModal from '../../components/common/AskModal.js';
import Button from '../../components/common/Button.js';

const AskModalContainer = () => {
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(false);
  const dispatch = useDispatch();

  const onStart = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setResult(true);
  };

  return (
    <>
      <Button onClick={onStart}>랜덤 추첨</Button>
      <AskModal
        visible={modal}
        result={result}
        title="랜덤 추첨"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default AskModalContainer;
