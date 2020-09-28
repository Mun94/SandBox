import React, { useCallback } from 'react';
import styled from 'styled-components';
import { List } from 'react-virtualized';
import SearchChannelsContainer from '../../containers/home/SearchChannelsContainer.js';
import CategoryContainer from '../../containers/home/CategoryContainer.js';
import Button from '../common/Button.js';
import { RiPlayMiniFill, RiChatSmile3Fill } from 'react-icons/ri';
import { BsQuestion } from 'react-icons/bs';
import { AiFillGift } from 'react-icons/ai';
import { RiGamepadFill } from 'react-icons/ri';
import { FaSmile, FaTelegramPlane } from 'react-icons/fa';
import { MdMovieCreation } from 'react-icons/md';
import { IoIosBook } from 'react-icons/io';

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

const SearchSelectBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.7rem;

  select {
    margin-right: 20px;
    background: #f7f2f2;
    border-radius: 3px;

    &:focus {
      outline: none;
    }
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
  margin-left: 1rem;
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
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 65%;

  Button + a,
  a + a,
  a + Button {
    margin-left: 0.2rem;
  }
  svg {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg:hover {
    border-bottom: 2px solid gray;
  }
`;

const ImgIcon = styled.div`
  position: relative;
  span {
    display: flex;
    position: absolute;
    top: 0;
    left: 77px;
    border: 0.5px solid #ffc200;
    border-radius: 5px;
  }
`;

const New = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: blink 0.8s ease-in-out infinite alternate;

  @keyframes blink {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1.3;
    }
  }
`;

const Channels = ({
  channelInfo,
  error,
  sortBy,
  onChange,
  keyword,
  dbChannel,
  category,
}) => {
  if (sortBy === 'subs') {
    channelInfo.sort((a, b) => {
      if (parseInt(a.subs) > parseInt(b.subs)) return -1;
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
  if (keyword) {
    channelInfo = channelInfo.filter(
      (channel) => channel.name.indexOf(keyword) >= 0,
    );
  }

  if (category) {
    channelInfo = channelInfo.filter(
      (channel) => channel.category.indexOf(category) >= 0,
    );
  }

  const categoryIcon = {
    코미디: <FaSmile />,
    게임: <RiGamepadFill />,
    영화: <MdMovieCreation />,
    교육: <IoIosBook />,
    일상: <FaTelegramPlane />,
    '일상,게임': (
      <>
        <FaTelegramPlane />
        <RiGamepadFill />
      </>
    ),
    '교육,게임': (
      <>
        <IoIosBook />
        <RiGamepadFill />
      </>
    ),
  };

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const info = channelInfo[index];
      return (
        <InfoBlock key={key} style={style}>
          <Block>
            <ImgIcon>
              <Img src={info.profileUrl} alt="" />
              <span>
                {dbChannel.map(
                  (db) =>
                    db.channelId === info.channelId &&
                    categoryIcon[db.categoryId],
                )}
              </span>
            </ImgIcon>
            <NameSubs>
              <span>{info.name}</span>
              <span>{info.subs / 10000}만명</span>
            </NameSubs>
          </Block>
          <Icon>
            <Button to={`/v/${info.channelId}`}>
              {dbChannel.map(
                (db) =>
                  db.channelId === info.channelId && (
                    <span key={key}>
                      {db.videoCount === info.videoCount ? (
                        <RiPlayMiniFill size="20" />
                      ) : (
                        <New>
                          <RiPlayMiniFill
                            size="20"
                            style={{ background: 'red' }}
                          />
                          new
                        </New>
                      )}
                    </span>
                  ),
              )}
            </Button>
            <Button
              href={`https://www.youtube.com/channel/${info.channelId}/store`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGift size="20" />
            </Button>
            <Button
              href={`https://www.youtube.com/channel/${info.channelId}/community`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiChatSmile3Fill size="20" />
            </Button>
            <Button to={`/info/${info.channelId}`}>
              <BsQuestion size="20" />
            </Button>
          </Icon>
        </InfoBlock>
      );
    },
    [channelInfo, dbChannel, categoryIcon],
  );

  return (
    <>
      {error ? (
        <div style={{ color: '#f7f2f2', 'text-align': 'center' }}>
          에러 발생
        </div>
      ) : (
        <>
          <SearchSelectBlock>
            <select onChange={onChange}>
              <option value="">정렬</option>
              <option value="name">이름 순</option>
              <option value="subs">구독자 순</option>
            </select>
            <SearchChannelsContainer />
          </SearchSelectBlock>
          <CategoryContainer />
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
