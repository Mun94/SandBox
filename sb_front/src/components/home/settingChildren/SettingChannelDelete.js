import React from 'react';
import styled from 'styled-components';
import palette from '../../common/palette.js';
import SettingChildren from './SettingChildren.js';

import {FaTrash} from 'react-icons/fa';

const ListBlock = styled.div`
margin-top:1rem;
    display:flex;
    color:${palette.black};
`;

const SettingChannelDelete = ({removeName, onChangeRemoveName, useRemoveList,onDeleteClick, onCancel}) => {
    return (
      <SettingChildren  onCancel={ onCancel}>
            <div className="title">크리에티어 제거</div>
            <input
              type="text"
              value={removeName}
              onChange={onChangeRemoveName}
              placeholder="채널 이름"
            />
            {useRemoveList.map(list => <ListBlock key={list.id}>{list.name}<FaTrash onClick={() =>onDeleteClick(list.channelId)}/></ListBlock>)}
        </SettingChildren>
    )
}

export default React.memo(SettingChannelDelete)