import React from "react";
import styled from "styled-components";

const Img = styled.img`
  border-radius: 60%;
  width: 5rem;
  height: 5rem;
`;

const InfoBlock = styled.div`
  display: flex;
  border: 1px solid gray;
  padding: 0.5rem;
  align-items: center;
`;
const NameSubs = styled.div`
  margin-left: 1rem;
  span + span:before {
    content: "\\B7";
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }
  span::nth-child(1) {
    font-size: 1.3rem;
  }
  span:nth-child(2) {
    opacity: 50%;
  }
`;

const Channels = ({ channelInfo, error }) => {
  return (
    <>
      {error ? (
        <div>에러 발생</div>
      ) : (
        channelInfo.map((info) => (
          <InfoBlock key={info.id}>
            <Img src={info.profileUrl} alt="" />

            <NameSubs>
              <span>{info.name}</span>
              <span>{info.subs}</span>
            </NameSubs>
          </InfoBlock>
        ))
      )}
    </>
  );
};

export default React.memo(Channels);
