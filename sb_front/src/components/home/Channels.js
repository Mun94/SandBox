import React, { useCallback } from 'react';
import styled from 'styled-components';
import { List } from 'react-virtualized';

const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  background: white;

  &:nth-child(even) {
    background: #f7f2f2;
  }
`;

const ListBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  border-radius: 60%;
  width: 4rem;
  height: 4rem;
  margin-left: 0.5rem;
`;

const NameSubs = styled.div`
  margin-left: 1rem;
  span + span:before {
    content: '\\B7';
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }
  span:nth-child(1) {
    font-size: 1.12rem;
  }
  span:nth-child(2) {
    opacity: 50%;
  }
`;

const Block = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
`;

const Channels = ({ channelInfo, error, sortBy, onChange }) => {
  if (sortBy === 'subs') {
    channelInfo.sort((a, b) => {
      if (parseInt(a.subs) > parseInt(b.subs)) return -1;
      // subs에 sortBy를 직접 넣게되면 sortBy가 인식이 안 됨.
      else if (parseInt(b.subs) > parseInt(a.subs)) return 1;
      else return 0;
    });
  } else if (sortBy === 'name') {
    channelInfo.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (b.name > a.name) return -1;
      else return 0;
    });
  } else {
    channelInfo.sort(() => {
      return Math.random() - Math.random(); // 랜덤 정렬
    });
  }

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const info = channelInfo[index];
      return (
        <InfoBlock key={key} style={style}>
          <Block>
            <Img src={info.profileUrl} alt="" />
            <NameSubs>
              <span>{info.name}</span>
              <span>{info.subs}</span>
            </NameSubs>
          </Block>
          <Icon>아이콘 자리</Icon>
        </InfoBlock>
      );
    },
    [channelInfo],
  );

  return (
    <>
      {error ? (
        <div>에러 발생</div>
      ) : (
        <>
          <select onChange={onChange}>
            <option value="">정렬</option>
            <option value="name">이름 순</option>
            <option value="subs">구독자 순</option>
          </select>
          <ListBlock>
            <List
              width={760}
              height={550}
              rowCount={channelInfo.length}
              rowHeight={110}
              rowRenderer={rowRenderer}
              style={{
                border: '2px solid rgba(0, 0, 0, 0.05)',
              }}
            />
          </ListBlock>
        </>
      )}
    </>
  );
};

export default React.memo(Channels);
