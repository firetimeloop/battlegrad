import {
  CommentsContainer,
  DeleteTopicContainer,
  DeleteTopicOverlay,
  ForumTitle,
  GoBack,
  GoBackContainer,
  Plus,
} from '@pages/Forum/styles';
import React, { useEffect, useState } from 'react';
import { CreateComment, GetComments } from '@components/Forum/api/comments';
import { toFormikValidate } from 'zod-formik-adapter';
import { z } from 'zod';
import { ErrorMessage, Formik } from 'formik';
import { setSelectedTopic } from '@components/Forum/slice';
import { Comment } from '@pages/Forum/Comment';
import { GetReactions } from '@components/Forum/api/reactions';
import Modal from '@components/Modal';
import { DeleteTopic } from '@components/Forum/api/topics';
import { selectAuthState, selectForumState } from '../../app/selectors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  BorderedFormBlock,
  BtnText,
  Button,
  ColumnGap10,
  FormContainer,
  Input,
  RowSpaceBetween,
  SubmitButton,
} from '../../styles';
import { theme } from '../../theme';

export function Comments() {
  const dispatch = useAppDispatch();
  const { selectedTopic, comments } = useAppSelector(selectForumState);
  const { user } = useAppSelector(selectAuthState);
  const [deleteTopicModalOpened, setDeleteModalTopicOpened] = useState(false);

  const commentsWithoutParent = comments.filter((comment) => !comment.parentCommentId);

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
      <DeleteTopicContainer onClick={() => setDeleteModalTopicOpened(true)}>
        Удалить топик
      </DeleteTopicContainer>
      <ForumTitle>{selectedTopic?.title}</ForumTitle>
      {commentsWithoutParent.length > 0
        ? (
          <CommentsContainer id="CommentsContainer">
            {commentsWithoutParent.map((comment) => <Comment key={comment.id} comment={comment} />)}
          </CommentsContainer>
        )
        : <p style={{ margin: '100px 0', fontSize: 18 }}>Комментариев пока нет</p>}
      <Formik
        initialValues={{ comment: '' }}
        validate={toFormikValidate(z.object({
          comment: z.string().min(4, 'Введите хотя бы 4 символа'),
        }))}
        onSubmit={({ comment }, { resetForm }) => {
          if (user && selectedTopic) {
            dispatch(CreateComment({
              user,
              content: comment,
              topicId: selectedTopic.id,
              parentCommentId: null,
            })).then((res) => {
              if (res.type.includes('fulfilled')) {
                resetForm();
                const scrollable = document.getElementById('CommentsContainer');
                if (scrollable) {
                  scrollable.scrollTo({ top: scrollable.scrollHeight, behavior: 'smooth' });
                }
              }
            });
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
      {deleteTopicModalOpened && (
        <DeleteTopicOverlay>
          <Modal
            className="modal-overlay"
            isVisible={deleteTopicModalOpened}
            closeModal={() => setDeleteModalTopicOpened(false)}>
            <BorderedFormBlock>
              <ForumTitle>
                {`Удалить топик "${selectedTopic?.title}" ?`}
              </ForumTitle>
              <RowSpaceBetween style={{ marginTop: 10 }}>
                <Button style={{ padding: 10 }} onClick={() => setDeleteModalTopicOpened(false)}>
                  Отмена
                </Button>
                <SubmitButton
                  style={{
                    height: 28,
                    marginLeft: 20,
                    padding: 20,
                    background: theme!.color.background.orange,
                  }}
                  onClick={() => {
                    if (selectedTopic) {
                      dispatch(DeleteTopic(selectedTopic.id)).then((res) => {
                        if (res.type.includes('fulfilled')) {
                          dispatch(setSelectedTopic(null));
                        }
                      });
                    }
                  }}>
                  Удалить
                </SubmitButton>
              </RowSpaceBetween>
            </BorderedFormBlock>
          </Modal>
        </DeleteTopicOverlay>
      )}
    </>
  );
}
