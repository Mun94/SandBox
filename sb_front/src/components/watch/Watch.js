import React from 'react';

const Watch = ({query, videoDetail}) => {
    return(
        <>
            <iframe width="480" height="270" src={`//www.youtube.com/embed/${query.video}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            {videoDetail.title}
        </>
    )
}

export default React.memo(Watch);