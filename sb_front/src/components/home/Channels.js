import React from "react";

const Channels = ({ channelInfo, error }) => {
  return (
    <>
      {error ? (
        <div>에러 발생</div>
      ) : (
        channelInfo.map((info) => (
          <div key={info.id}>
            <img src={info.profileUrl} alt="" />
            {info.name}
            구독자 수 : {info.subs}
          </div>
        ))
      )}
    </>
  );
};

export default React.memo(Channels);
