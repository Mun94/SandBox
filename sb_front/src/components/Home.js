import React from "react";

const Home = ({ subscriberCount, thumbnails }) => {
  return (
    <>
      <div>
        장삐쭈 구독자 수 : {subscriberCount} <br />
        이미지 :{" "}
        <img src={thumbnails} alt="장삐쭈 이미지" title="장삐쭈 이미지" />
      </div>
    </>
  );
};

export default Home;
