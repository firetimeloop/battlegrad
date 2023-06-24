import { ArrowRight, TopicList, TopicListItem, TopicTitle } from '@pages/Forum/styles';
import { setSelectedTopic } from '@components/Forum/slice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectForumState } from '../../app/selectors';
import { H1 } from '../../styles';

export function Topics() {
  const { topics } = useAppSelector(selectForumState);
  const dispatch = useAppDispatch();
  return (
    <>
      <H1>Форум</H1>
      <TopicList>
        {topics.length
          ? topics.map((topic) => (
            <TopicListItem
              key={topic.id}
              onClick={() => dispatch(setSelectedTopic(topic))}>
              <TopicTitle>
                {topic.title}
              </TopicTitle>
              <ArrowRight />
            </TopicListItem>
          ))
          : <h2>Список пуст</h2>}
      </TopicList>
    </>
  );
}
