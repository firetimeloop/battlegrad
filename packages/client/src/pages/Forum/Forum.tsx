import React, { useEffect } from 'react';
import Loader from '@components/Loader';
import { LoaderContainer } from '@components/Loader/styles';
import { GetTopics, TopicThunks } from '@components/Forum/api/topics';
import { Topics } from '@pages/Forum/Topics';
import { ForumBlock } from '@pages/Forum/styles';
import { FullScreenCenteredContainer } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectForumState } from '../../app/selectors';
import { LoaderSizeEnum } from '../../enum';

function Forum() {
  const dispatch = useAppDispatch();
  const { loaders, selectedTopic } = useAppSelector(selectForumState);

  useEffect(() => {
    const get = dispatch(GetTopics());
    return () => {
      get.abort();
    };
  }, [dispatch]);

  return (
    <FullScreenCenteredContainer>
      <ForumBlock>
        {loaders[TopicThunks.Get]
          ? (
            <LoaderContainer>
              <Loader size={LoaderSizeEnum.medium} />
            </LoaderContainer>
          )
          : (
            <>
              {!selectedTopic && <Topics />}
              {!selectedTopic && <Topics />}
            </>
          )}
      </ForumBlock>
    </FullScreenCenteredContainer>
  );
}

export default Forum;
