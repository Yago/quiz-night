/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core'; // eslint-disable-line
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { indexOf, isNil, move, range, values } from 'ramda';
import tw from 'twin.macro';

import { button, form } from 'styles';

const QuizForm = ({ onSave, quiz }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, reset, getValues } = useForm();
  const [questions, setQuestions] = useState([]);
  const [slug, setSlug] = useState(null);

  const addQuestion = () => {
    setQuestions([...questions, nanoid().replace(/-/g, '')]);
  };

  const moveQuestion = (id, i) => {
    setQuestions(move(indexOf(id, questions), i, questions));
  };

  const removeQuestion = id => {
    setQuestions(questions.filter(i => i !== id));
  };

  const onSubmit = data => {
    onSave({ ...data, questions: values(data.questions) }, slug);
  };

  useEffect(() => {
    if (!isNil(quiz)) {
      setSlug(quiz.slug);
      setQuestions(quiz.questions.map(() => nanoid().replace(/-/g, '')));
    } else {
      reset();
      setSlug(null);
      setQuestions([]);
    }
  }, [quiz]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} tw="p-2">
      <div>
        <label htmlFor="title" tw="font-medium cursor-pointer">
          {t('form.title')}
        </label>
        <input
          id="title"
          name="title"
          placeholder={t('form.title')}
          defaultValue={quiz?.title}
          ref={register({ required: true })}
          css={[form.input, errors.title && form.inputError]}
          tw="mt-2"
        />
        {errors.title && (
          <div tw="text-red-600 text-sm mt-2 italic">{t('form.required')}</div>
        )}
      </div>

      <div tw="flex flex-wrap space-y-4 -mx-2">
        <div tw="mt-4 w-1/2 px-2">
          <label htmlFor="questionsDuration" tw="font-medium cursor-pointer">
            {t('form.duration')}
          </label>
          <input
            id="questionsDuration"
            name="questionsDuration"
            placeholder={t('form.duration')}
            defaultValue={quiz?.questionsDuration}
            ref={register({ required: true })}
            css={[form.input, errors.questionsDuration && form.inputError]}
            tw="mt-2"
            type="number"
          />
          {errors.questionsDuration && (
            <div tw="text-red-600 text-sm mt-2 italic">
              {t('form.required')}
            </div>
          )}
        </div>

        <div tw="mt-4 w-1/2 px-2">
          <label htmlFor="breaksDuration" tw="font-medium cursor-pointer">
            {t('form.break_duration')}
          </label>
          <input
            id="breaksDuration"
            name="breaksDuration"
            placeholder={t('form.break_duration')}
            defaultValue={quiz?.breaksDuration}
            ref={register({ required: true })}
            css={[form.input, errors.breaksDuration && form.inputError]}
            tw="mt-2"
            type="number"
          />
          {errors.breaksDuration && (
            <div tw="text-red-600 text-sm mt-2 italic">
              {t('form.required')}
            </div>
          )}
        </div>
      </div>

      {questions.map((id, i) => (
        <div key={`question-${id}`} tw="mt-6 border-t border-gray-400 pt-4">
          <div tw="flex justify-between items-center">
            <h2 tw="text-xl text-indigo-600">
              {t('form.question')}{' '}
              <select
                value={i}
                onChange={e => moveQuestion(id, e.target.value)}
              >
                {range(0, questions.length).map(j => (
                  <option key={`option-${id}-${j}`} value={j}>
                    {j + 1}
                  </option>
                ))}
              </select>
            </h2>
            <button
              type="button"
              css={[button.danger, button.sm]}
              onClick={() => removeQuestion(id)}
            >
              <span tw="text-lg mr-2">&times;</span>
              {t('remove')}
            </button>
          </div>
          {errors?.questions?.[id]?.correct && (
            <div tw="text-red-600 text-sm mt-2 italic">
              {t('form.radio_required')}
            </div>
          )}
          <div tw="mt-4">
            <label
              htmlFor={`questions[${id}].title`}
              tw="font-medium cursor-pointer"
            >
              {t('form.question_title')}
            </label>
            <input
              id={`questions[${id}].title`}
              name={`questions[${id}].title`}
              placeholder={t('form.question_title')}
              defaultValue={quiz?.questions?.[i]?.title}
              ref={register({ required: true })}
              css={[
                form.input,
                errors?.questions?.[id]?.title && form.inputError,
              ]}
              tw="mt-2"
            />
            {errors?.questions?.[id]?.title && (
              <div tw="text-red-600 text-sm mt-2 italic">
                {t('form.required')}
              </div>
            )}
          </div>

          <div tw="mt-4 flex flex-wrap space-y-4 -mx-2">
            {range(0, 4).map(j => (
              <div tw="mt-4 w-1/2 px-2" key={`answer-${id}-${j}`}>
                <label
                  htmlFor={`questions[${id}].answers[${j}]`}
                  tw="font-medium cursor-pointer"
                >
                  {t('form.answer')} #{j + 1}
                </label>
                <input
                  id={`questions[${id}].answers[${j}]`}
                  name={`questions[${id}].answers[${j}]`}
                  defaultValue={quiz?.questions?.[i]?.answers?.[j]}
                  placeholder={`${t('form.answer')} #${j + 1}`}
                  ref={register({ required: true })}
                  css={[
                    form.input,
                    errors?.questions?.[id]?.answers?.[j] && form.inputError,
                  ]}
                  tw="mt-2"
                />
                {errors?.questions?.[id]?.answers?.[j] && (
                  <div tw="text-red-600 text-sm mt-2 italic">
                    {t('form.required')}
                  </div>
                )}
                <div tw="flex items-center mt-2">
                  <input
                    id={`questions[${id}].answers[${j}].radio`}
                    type="radio"
                    name={`questions[${id}].correct`}
                    ref={register({ required: true })}
                    value={String(j)}
                    defaultChecked={
                      getValues(`questions[${id}].correct`) === String(j) ||
                      quiz?.questions?.[i]?.correct === String(j)
                    }
                    tw="mr-2"
                  />
                  <label
                    htmlFor={`questions[${id}].answers[${j}].radio`}
                    tw="cursor-pointer"
                  >
                    {t('form.correct_answer')}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div tw="mt-6">
        <button
          type="button"
          css={button.primary}
          onClick={() => addQuestion()}
        >
          <span tw="text-lg">+</span> {t('form.add_question')}
        </button>
      </div>

      <div tw="mt-6">
        <input type="submit" css={button.success} value={t('form.save')} />
      </div>
    </form>
  );
};

QuizForm.propTypes = {
  quiz: PropTypes.object,
  onSave: PropTypes.func,
};
QuizForm.defaultProps = {};

export default QuizForm;
