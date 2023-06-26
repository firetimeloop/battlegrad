import {
  ArrowRight,
  ForumMessageForm,
  ForumTitle,
  ListItem,
  Plus,
  TopicList,
  TopicTitle,
} from '@pages/Forum/styles';
import { setSelectedTopic } from '@components/Forum/slice';
import React from 'react';
import { toFormikValidate } from 'zod-formik-adapter';
import { ErrorMessage, Formik } from 'formik';
import Loader from '@components/Loader';
import { z } from 'zod';
import { CreateTopic, TopicThunks } from '@components/Forum/api/topics';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuthState, selectForumState } from '../../app/selectors';
import {
  BtnText,
  ColumnGap10,
  Divider,
  FormContainer,
  Input,
  LoaderBtnContainer,
  SubmitButton,
} from '../../styles';
import { LoaderSizeEnum } from '../../enum';
import { theme } from '../../theme';

export function Topics() {
  const { topics, loaders } = useAppSelector(selectForumState);
  const { user } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const isFetching = loaders[TopicThunks.Create];
  return (
    <>
      <ForumTitle>Форум</ForumTitle>
      <TopicList>
        {topics.length
          ? topics.map((topic) => (
            <ListItem
              key={topic.id}
              onClick={() => dispatch(setSelectedTopic(topic))}>
              <TopicTitle>
                {topic.title}
              </TopicTitle>
              <ArrowRight />
            </ListItem>
          ))
          : <h2>Список пуст</h2>}
      </TopicList>
      <Divider />
      <Formik
        initialValues={{ newTopic: '' }}
        validate={toFormikValidate(z.object({
          newTopic: z.string().min(4, 'Введите хотя бы 4 символа'),
        }))}
        onSubmit={({ newTopic }, { resetForm }) => {
          if (user) {
            dispatch(CreateTopic({ title: newTopic, userId: user.id })).then((res) => {
              if (res.type.includes('fulfilled')) {
                resetForm();
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
                  placeholder="Название нового топика"
                  name="newTopic"
                />
                <ErrorMessage name="newTopic" />
              </ColumnGap10>
              <SubmitButton
                type="submit"
                disabled={isFetching}>
                <Plus />
                <BtnText hidden={isFetching}>
                  Создать новый
                </BtnText>
                {isFetching && (
                  <LoaderBtnContainer>
                    <Loader color={theme!.color.white} size={LoaderSizeEnum.small} />
                  </LoaderBtnContainer>
                )}
              </SubmitButton>
            </ForumMessageForm>
          </FormContainer>
        )}
      </Formik>

    </>
  );
}
