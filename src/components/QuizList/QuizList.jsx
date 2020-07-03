/** @jsx jsx */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { omit } from 'ramda';
import tw from 'twin.macro';

import Modal from 'components/Modal';
import { button } from 'styles';

const QuizList = ({ quizzes, onRemove, onEdit }) => {
  const [t] = useTranslation();
  const [modal, openModal] = useState(false);
  const [pendingRemove, setPendingRemove] = useState(null);

  return (
    <React.Fragment>
      <div tw="flex flex-col">
        <div tw="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div tw="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table tw="min-w-full">
              <thead>
                <tr>
                  {t('theaders', { returnObjects: true }).map((header, i) => (
                    <th
                      key={`theader-${i}`}
                      tw="px-6 py-3 border-b border-gray-200 bg-gray-100 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                      css={i === 2 ? tw`text-right` : tw`text-left`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody tw="bg-white">
                {quizzes?.map((quiz, i) => (
                  <tr key={`row-${i}`}>
                    <td tw="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-800 font-medium">
                      {quiz.title}
                    </td>
                    <td tw="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span tw="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td tw="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <button
                        type="button"
                        css={[button.primary, button.sm]}
                        tw="mr-2"
                        onClick={() => onEdit(quiz)}
                      >
                        <span tw="text-lg mr-2">✎</span>
                        {t('edit')}
                      </button>
                      <button
                        type="button"
                        css={[button.primary, button.sm]}
                        tw="mr-2"
                        onClick={() => onEdit(omit(['slug'], quiz))}
                      >
                        <span tw="text-lg mr-2">❐</span>
                        {t('duplicate')}
                      </button>
                      <button
                        type="button"
                        css={[button.danger, button.sm]}
                        onClick={() => {
                          openModal(true);
                          setPendingRemove(quiz);
                        }}
                      >
                        <span tw="text-lg mr-2">&times;</span>
                        {t('remove')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal open={modal} onClose={() => openModal(false)} small>
        <div>
          <h3 tw="mb-4">
            {t('sure_to_delete')} <strong>{pendingRemove?.title}</strong>
          </h3>
          <button
            type="button"
            css={button.primary}
            tw="mr-2"
            onClick={() => {
              openModal(false);
              setPendingRemove(null);
            }}
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            css={button.danger}
            onClick={() => {
              openModal(false);
              onRemove(pendingRemove?.slug);
              setPendingRemove(null);
            }}
          >
            {t('yes')}
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

QuizList.propTypes = {
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  quizzes: PropTypes.array,
};

export default QuizList;
