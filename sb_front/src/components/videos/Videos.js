import React from 'react';
import styled, { css } from 'styled-components';
import Responsive from '../common/Responsive.js';
import { Link } from 'react-router-dom';

const VideoBlock = styled(Responsive)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div:last-child {
    flex: none;
  }
  @media (max-width: 630px) {
    width: 600px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }
`;

const Wrapper = styled(Link)`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Title = styled.span`
  color: #f7f2f2;
`;
const Img = styled.img`
  position: relative;
`;
const Duration = styled.span`
  position: absolute;
  color: white;
  transform: translateY(159px);
  background: rgba(0, 0, 0, 0.7);
  letter-spacing: 0.5px;
`;
const Sub = styled.span`
  margin-top: 0.3rem;
  padding: 0 0.5rem;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }
`;
const View = styled.span`
  color: rgba(0, 0, 0, 0.7);
`;
const PublishedAt = styled.span`
  color: rgba(0, 0, 0, 0.7);

  ${(props) =>
    props.toYes &&
    css`
      color: #ffc200;
      animation: blink 0.8s ease-in-out infinite alternate;
      @keyframes blink {
        0% {
          opacity: 0.2;
        }
        100% {
          opacity: 1;
        }
      }
    `}
`;

const Videos = ({ videoDetail, error }) => {
  const YMD = new Date();
  const setMonth = YMD.getMonth() + 1;
  const setDate = YMD.getDate();
  const year = YMD.getFullYear();

  const month = setMonth < 10 ? '0' + setMonth : setMonth;
  const date = setDate < 10 ? '0' + setDate : setDate;

  const month1 =
    date === '01' && month === '01'
      ? '12'
      : date === '01' && month < 10
      ? '0' + Number(month - 1)
      : date === '01' && month > 10
      ? month - 1
      : month;
  const date1 =
    date > 10
      ? date - 1
      : date > 1
      ? '0' + Number(date - 1)
      : '05,07,10,12'.indexOf(month) >= 0
      ? '30'
      : month === '03'
      ? '28'
      : '31';
  const year1 = date === '01' && month === '01' ? year - 1 : year;

  const today = year + '-' + month + '-' + date;
  const yesterday = year1 + '-' + month1 + '-' + date1;

  return (
    <>
      {error ? (
        <div style={{ color: '#f7f2f2', 'text-align': 'center' }}>
          에러 발생
        </div>
      ) : (
        <VideoBlock>
          {videoDetail.map((Info) => (
            <Wrapper
              to={`/watch?video=${Info.videoId}&num=${Info.id}`}
              key={Info.id}
            >
              <Img src={Info.medium.url} alt="" />
              <Duration>{Info.duration.slice(2, 20)}</Duration>
              <Sub>
                <div>
                  {[today, yesterday].indexOf(Info.publishedAt.split('T')[0]) >=
                  0 ? (
                    <PublishedAt toYes>
                      {Info.publishedAt.split('T')[0]}
                    </PublishedAt>
                  ) : (
                    <PublishedAt>{Info.publishedAt.split('T')[0]}</PublishedAt>
                  )}
                  <View>{Info.viewCount} view</View>
                </div>
                <Title>{Info.title}</Title>
              </Sub>
            </Wrapper>
          ))}
        </VideoBlock>
      )}
    </>
  );
};

export default React.memo(Videos);
