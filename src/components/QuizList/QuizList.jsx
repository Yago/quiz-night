/** @jsx jsx */
import React, { useState } from 'react';
import { Copy, Edit, Pause, Play, Square, Trash2 } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { omit } from 'ramda';
import tw from 'twin.macro';

import Modal from 'components/Modal';
import { button } from 'styles';

const QuizList = ({
  quizzes,
  session,
  onRemove,
  onEdit,
  onPlay,
  onPause,
  onStop,
}) => {
  const [t] = useTranslation();
  const [modal, openModal] = useState(false);
  const [pendingRemove, setPendingRemove] = useState(null);

  const isPlaying = slug =>
    session?.[0]?.quiz === slug && session?.[0]?.isPlaying;

  const isPaused = slug =>
    session?.[0]?.quiz === slug && !session?.[0]?.isPlaying;

  const isInactive = slug => session?.[0]?.quiz !== slug;

  const isInactiveOrPaused = slug =>
    (session?.[0]?.quiz === slug && !session?.[0]?.isPlaying) ||
    session?.[0]?.quiz !== slug;

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
                      css={i === 3 ? tw`text-right` : tw`text-left`}
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
                      {isPlaying(quiz.slug) && (
                        <span tw="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-300 text-black">
                          {t('in_progress')}
                        </span>
                      )}
                      {isPaused(quiz.slug) && (
                        <span tw="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-300 text-black">
                          {t('paused')}
                        </span>
                      )}
                      {isInactive(quiz.slug) && (
                        <span tw="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-300 text-black">
                          {t('inactive')}
                        </span>
                      )}
                    </td>

                    <td tw="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                      {isInactiveOrPaused(quiz.slug) && (
                        <button
                          type="button"
                          css={[button.success, button.sm]}
                          tw="mr-2"
                          onClick={() => onPlay(quiz.slug)}
                        >
                          <Play size={18} tw="mb-px" />
                        </button>
                      )}
                      {isPlaying(quiz.slug) && (
                        <button
                          type="button"
                          css={[button.gray, button.sm]}
                          tw="mr-2"
                          onClick={() => onPause(quiz.slug)}
                        >
                          <Pause size={18} tw="mb-px" />
                        </button>
                      )}
                      {isPlaying(quiz.slug) && (
                        <button
                          type="button"
                          css={[button.danger, button.sm]}
                          tw="mr-2"
                          onClick={() => onStop(quiz.slug)}
                        >
                          <Square size={18} tw="mb-px" />
                        </button>
                      )}
                    </td>

                    <td tw="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                      <button
                        type="button"
                        css={[button.primary, button.sm]}
                        tw="mr-2"
                        onClick={() => onEdit(quiz)}
                      >
                        <Edit size={18} tw="mr-2" />
                        <span tw="">{t('edit')}</span>
                      </button>
                      <button
                        type="button"
                        css={[button.primary, button.sm]}
                        tw="mr-2"
                        onClick={() => onEdit(omit(['slug'], quiz))}
                      >
                        <Copy size={18} tw="mr-2" />
                        <span tw="">{t('duplicate')}</span>
                      </button>
                      <button
                        type="button"
                        css={[button.danger, button.sm]}
                        onClick={() => {
                          openModal(true);
                          setPendingRemove(quiz);
                        }}
                      >
                        <Trash2 size={18} />
                        <span tw="sr-only">{t('remove')}</span>
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
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onStop: PropTypes.func,
  quizzes: PropTypes.array,
  session: PropTypes.array,
};

export default QuizList;
