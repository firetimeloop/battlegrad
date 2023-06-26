import {
  CommentAuthor,
  CommentAuthorAvatar,
  CommentAuthorAvatarContainer,
  CommentContainer,
} from '@pages/Forum/styles';
import React, { useState } from 'react';
import { Like } from '@components/Like/Like';
import { CreateReaction, DeleteReaction } from '@components/Forum/api/reactions';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { CreateComment } from '@components/Forum/api/comments';
import { ErrorMessage, Formik } from 'formik';
import { ForumComment } from '../../interface/forum/comment';
import {
  BtnText,
  Button,
  ColumnGap10,
  FormContainer,
  Input,
  RepliesContainer,
  RowGap10,
  RowSpaceBetween,
  SubmitButton,
} from '../../styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ReactionEnum } from '../../interface/forum/reaction';
import { selectAuthState, selectForumState } from '../../app/selectors';
import { yandexBaseUrl } from '../../app/api';

interface ICommentProps {
  comment: ForumComment
}

export function Comment({ comment }: ICommentProps) {
  const dispatch = useAppDispatch();
  const [replyInputOpened, setReplyInputOpened] = useState(false);
  const { user } = useAppSelector(selectAuthState);
  const { selectedTopic, reactions, comments } = useAppSelector(selectForumState);

  const commentReactions = reactions.filter((i) => i.commentId === comment.id);

  const userLike = commentReactions.find((i) => i.userId === user?.id);
  const related = comments.filter((i) => i.parentCommentId === comment.id);

  return (
    <CommentContainer>
      <CommentAuthor>
        <CommentAuthorAvatarContainer>
          <CommentAuthorAvatar src={`${yandexBaseUrl}/resources${comment.userAvatar}`} />
        </CommentAuthorAvatarContainer>
        <h3>{comment.userDisplayName}</h3>
      </CommentAuthor>
      <RowSpaceBetween>
        <p style={{ margin: '20px 10px' }}>{comment.content}</p>
        <RowGap10>
          <Like
            liked={!!userLike}
            onClick={() => {
              if (user && selectedTopic) {
                if (userLike) {
                  dispatch(DeleteReaction(userLike.id));
                  return;
                }

                dispatch(CreateReaction({
                  user,
                  type: ReactionEnum.Like,
                  topicId: selectedTopic.id,
                  commentId: comment.id,
                }));
              }
            }} />
          {commentReactions.length > 0 && (
            <span>
              {commentReactions.length}
            </span>
          )}
        </RowGap10>
      </RowSpaceBetween>
      {replyInputOpened
        ? <div />
        : (
          <Button
            style={{ width: 'fit-content' }}
            onClick={() => setReplyInputOpened(true)}>
            Ответить
          </Button>
        )}
      {replyInputOpened && (
        <Formik
          initialValues={{ reply: '' }}
          validate={toFormikValidate(z.object({
            reply: z.string().min(4, 'Введите хотя бы 4 символа'),
          }))}
          onSubmit={({ reply }, { resetForm }) => {
            if (user && selectedTopic) {
              dispatch(CreateComment({
                user,
                content: reply,
                topicId: selectedTopic.id,
                parentCommentId: comment.id,
              })).then((res) => {
                if (res.type.includes('fulfilled')) {
                  resetForm();
                  setReplyInputOpened(false);
                }
              });
            }
          }}
        >
          {({
            handleSubmit, resetForm,
          }) => (
            <FormContainer style={{ width: '100%', marginTop: 5 }} onSubmit={handleSubmit}>
              <RowSpaceBetween style={{ width: '100%', gap: 20, alignItems: 'start' }}>
                <ColumnGap10 style={{ width: '100%' }}>
                  <Input
                    style={{ padding: 6 }}
                    placeholder="Введите ответ"
                    name="reply"
                  />
                  <ErrorMessage name="reply" />
                </ColumnGap10>
                <Button
                  type="button"
                  style={{ height: 38 }}
                  onClick={(e) => {
                    e.preventDefault();
                    resetForm();
                    setReplyInputOpened(false);
                  }}>
                  Отмена
                </Button>
                <SubmitButton
                  style={{ width: 'fit-content', padding: 6, height: 38 }}
                  type="submit">
                  <BtnText>
                    Отправить
                  </BtnText>
                </SubmitButton>
              </RowSpaceBetween>
            </FormContainer>
          )}
        </Formik>
      )}
      {related.length > 0 && (
        <RepliesContainer>
          {related.map((comm) => <Comment key={comm.id} comment={comm} />)}
        </RepliesContainer>
      )}
    </CommentContainer>
  );
}
