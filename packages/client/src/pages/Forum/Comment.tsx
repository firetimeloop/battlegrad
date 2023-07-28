import {
  CommentAuthor,
  CommentAuthorAvatar,
  CommentAuthorAvatarContainer,
  CommentContainer,
  ReplyButton,
  ReplyForm,
} from '@pages/Forum/styles';
import React, { useState } from 'react';
import { Like } from '@components/Like/Like';
import { CreateReaction, DeleteReaction } from '@components/Forum/api/reactions';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { CreateComment } from '@components/Forum/api/comments';
import { ErrorMessage, Formik } from 'formik';
import { useTheme } from 'styled-components';
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
  const theme = useTheme();
  const commentReactions = reactions.filter((i) => i.commentId === comment.id);

  const userLike = commentReactions.find((i) => i.userId === user?.id);
  const related = comments.filter((i) => i.parentCommentId === comment.id);

  const onLikeClick = () => {
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
  };

  const openReply = () => setReplyInputOpened(true);
  const closeReply = () => setReplyInputOpened(false);

  return (
    <CommentContainer id={`comment-${comment.id}`}>
      <CommentAuthor>
        <CommentAuthorAvatarContainer>
          <CommentAuthorAvatar src={`${yandexBaseUrl}/resources${comment.userAvatar}`} />
        </CommentAuthorAvatarContainer>
        <h3>{comment.userDisplayName}</h3>
      </CommentAuthor>
      <RowSpaceBetween>
        <p>{comment.content}</p>
        <RowGap10>
          <Like
            liked={!!userLike}
            onClick={onLikeClick} />
          {commentReactions.length > 0 && (
            <span>
              {commentReactions.length}
            </span>
          )}
        </RowGap10>
      </RowSpaceBetween>
      {replyInputOpened
        ? (
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
                    closeReply();
                    const scrollable = document.getElementById('CommentsContainer');
                    const commentEl = document.getElementById(`comment-${comment.id}`);
                    if (scrollable && commentEl) {
                      const lastChild = commentEl.lastChild?.lastChild as HTMLDivElement;
                      if (lastChild) {
                        lastChild.scrollIntoView({ block: 'center' });
                        setTimeout(() => {
                          lastChild.style.background = theme!.colors.commentHighlight;
                          setTimeout(() => {
                            lastChild.style.background = 'none';
                          }, 1000);
                        }, 200);
                      }
                    }
                  }
                });
              }
            }}
          >
            {({
              handleSubmit, resetForm,
            }) => (
              <FormContainer onSubmit={handleSubmit}>
                <ReplyForm>
                  <ColumnGap10>
                    <Input
                      autoFocus
                      placeholder="Введите ответ"
                      name="reply"
                    />
                    <ErrorMessage name="reply" />
                  </ColumnGap10>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      resetForm();
                      closeReply();
                    }}>
                    Отмена
                  </Button>
                  <SubmitButton
                    type="submit">
                    <BtnText>
                      Отправить
                    </BtnText>
                  </SubmitButton>
                </ReplyForm>
              </FormContainer>
            )}
          </Formik>
        )
        : (
          <ReplyButton
            onClick={openReply}>
            Ответить
          </ReplyButton>
        )}
      {related.length > 0 && (
        <RepliesContainer>
          {related.map((comm) => <Comment key={comm.id} comment={comm} />)}
        </RepliesContainer>
      )}
    </CommentContainer>
  );
}
