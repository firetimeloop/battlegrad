import {
  CommentAuthor,
  CommentAuthorAvatar,
  CommentAuthorAvatarContainer,
  CommentContainer,
  Plus,
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
  RowGap10,
  RowSpaceBetween,
  SubmitButton,
} from '../../styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ReactionEnum } from '../../interface/forum/reaction';
import { selectAuthState, selectForumState } from '../../app/selectors';

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
          <CommentAuthorAvatar src={comment.userAvatar} />
          <h3>{comment.userDisplayName}</h3>
        </CommentAuthorAvatarContainer>
      </CommentAuthor>
      <p>{comment.content}</p>
      <RowSpaceBetween>
        <Button onClick={() => setReplyInputOpened(true)}>Ответить</Button>
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
          {commentReactions.length && (
            <span>
              {commentReactions.length}
            </span>
          )}
        </RowGap10>
      </RowSpaceBetween>
      {replyInputOpened && (
        <Formik
          initialValues={{ reply: '' }}
          validate={toFormikValidate(z.object({
            reply: z.string().min(4, 'Введите хотя бы 4 символа'),
          }))}
          onSubmit={({ reply }) => {
            if (user && selectedTopic) {
              dispatch(CreateComment({
                user,
                content: reply,
                topicId: selectedTopic.id,
                parentCommentId: comment.id,
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
                    placeholder="Введите ответ"
                    name="reply"
                  />
                  <ErrorMessage name="reply" />
                </ColumnGap10>
                <SubmitButton
                  style={{ width: 'fit-content', padding: 10, height: 48 }}
                  type="submit">
                  <Plus />
                  <BtnText>
                    Отправить ответ
                  </BtnText>
                </SubmitButton>
              </RowSpaceBetween>
            </FormContainer>
          )}
        </Formik>
      )}

      {related.map((i) => <Comment comment={i} />)}
    </CommentContainer>
  );
}
