import {
  CommentsBlock,
  CommentsContainer,
  DeleteTopicContainer,
  DeleteTopicOverlay,
  EmptyText,
  ForumMessageForm,
  ForumTitle,
  GoBack,
  GoBackContainer,
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

  const onGoBack = () => dispatch(setSelectedTopic(null));
  const onDeleteTopic = () => {
    if (selectedTopic) {
      dispatch(DeleteTopic(selectedTopic.id)).then((res) => {
        if (res.type.includes('fulfilled')) {
          onGoBack();
        }
      });
    }
  };
  const openDeleteModal = () => setDeleteModalTopicOpened(true);
  const closeDeleteModal = () => setDeleteModalTopicOpened(false);

  return (
    <CommentsBlock>
      <GoBackContainer onClick={onGoBack}>
        <GoBack />
        Назад
      </GoBackContainer>
      <DeleteTopicContainer onClick={openDeleteModal}>
        Удалить топик
      </DeleteTopicContainer>
      <ForumTitle>{selectedTopic?.title}</ForumTitle>
      {commentsWithoutParent.length > 0
        ? (
          <CommentsContainer id="CommentsContainer">
            {commentsWithoutParent.map((comment) => <Comment key={comment.id} comment={comment} />)}
          </CommentsContainer>
        )
        : <EmptyText>Комментариев пока нет</EmptyText>}
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
          <FormContainer onSubmit={handleSubmit}>
            <ForumMessageForm>
              <ColumnGap10>
                <Input
                  placeholder="Добавить комментарий"
                  name="comment"
                />
                <ErrorMessage name="comment" />
              </ColumnGap10>
              <SubmitButton
                type="submit">
                <BtnText>
                  Отправить
                </BtnText>
              </SubmitButton>
            </ForumMessageForm>
          </FormContainer>
        )}
      </Formik>
      {deleteTopicModalOpened && (
        <DeleteTopicOverlay>
          <Modal
            className="modal-overlay"
            isVisible={deleteTopicModalOpened}
            closeModal={closeDeleteModal}>
            <BorderedFormBlock>
              <ForumTitle>
                {`Удалить топик "${selectedTopic?.title}" ?`}
              </ForumTitle>
              <RowSpaceBetween>
                <Button onClick={closeDeleteModal}>
                  Отмена
                </Button>
                <SubmitButton
                  onClick={onDeleteTopic}>
                  Удалить
                </SubmitButton>
              </RowSpaceBetween>
            </BorderedFormBlock>
          </Modal>
        </DeleteTopicOverlay>
      )}
    </CommentsBlock>
  );
}
