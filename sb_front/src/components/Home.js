import React from "react";

const Home = ({ subs, urls }) => {
  console.log(subs[0].length);

  return (
    <>
      {subs.map((sub, index) => (
        <div key={index}>{sub}</div>
      ))}
    </>
  );
};

export default Home;
