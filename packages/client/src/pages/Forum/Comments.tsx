import { CommentsContainer, GoBack, GoBackContainer, Plus } from '@pages/Forum/styles';
import React, { useEffect } from 'react';
import { CreateComment, GetComments } from '@components/Forum/api/comments';
import { toFormikValidate } from 'zod-formik-adapter';
import { z } from 'zod';
import { ErrorMessage, Formik } from 'formik';
import { setSelectedTopic } from '@components/Forum/slice';
import { Comment } from '@pages/Forum/Comment';
import { GetReactions } from '@components/Forum/api/reactions';
import { selectAuthState, selectForumState } from '../../app/selectors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  BtnText,
  ColumnGap10,
  FormContainer,
  H1,
  Input,
  RowSpaceBetween,
  SubmitButton,
} from '../../styles';

export function Comments() {
  const dispatch = useAppDispatch();
  const { selectedTopic, comments } = useAppSelector(selectForumState);
  const { user } = useAppSelector(selectAuthState);

  useEffect(() => {
    if (selectedTopic) {
      dispatch(GetComments(selectedTopic.id));
      dispatch(GetReactions(selectedTopic.id));
    }
  }, [dispatch, selectedTopic]);

  return (
    <>
      <GoBackContainer onClick={() => dispatch(setSelectedTopic(null))}>
        <GoBack />
        Назад
      </GoBackContainer>
      <H1>{selectedTopic?.title}</H1>
      {comments.length
        ? (
          <CommentsContainer>
            {comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
          </CommentsContainer>
        )
        : <h2>Комментариев пока нет</h2>}
      <Formik
        initialValues={{ comment: '' }}
        validate={toFormikValidate(z.object({
          comment: z.string().min(4, 'Введите хотя бы 4 символа'),
        }))}
        onSubmit={({ comment }) => {
          if (user && selectedTopic) {
            dispatch(CreateComment({
              user,
              content: comment,
              topicId: selectedTopic.id,
              parentCommentId: null,
            }));
          }
        }}
      >
        {({
          handleSubmit,
        }) => (
          <FormContainer style={{ width: '100%' }} onSubmit={handleSubmit}>
            <RowSpaceBetween style={{ width: '100%', gap: 20, alignItems: 'start' }}>
              <ColumnGap10 style={{ width: '100%' }}>
                <Input
                  style={{ padding: 10 }}
                  placeholder="Добавить комментарий"
                  name="comment"
                />
                <ErrorMessage name="comment" />
              </ColumnGap10>
              <SubmitButton
                style={{ width: 'fit-content', padding: 10, height: 48 }}
                type="submit">
                <Plus />
                <BtnText>
                  Добавить комментарий
                </BtnText>
              </SubmitButton>
            </RowSpaceBetween>
          </FormContainer>
        )}
      </Formik>

    </>
  );
}
