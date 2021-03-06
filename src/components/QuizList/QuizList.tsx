/** @jsx jsx */
import React, { useState } from 'react';
import { Cast, Copy, Edit, Pause, Play, Square, Trash2 } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { isNil, omit } from 'ramda';
import tw from 'twin.macro';
import { Quiz, Session } from 'types';

import Modal from 'components/Modal';
import { button } from 'styles';

interface Props {
  onEdit(quiz: Quiz): void;
  onInit(slug: string): void;
  onPause(slug: string): void;
  onPlay(slug: string): void;
  onRemove(slug: string): void;
  onStop(slug: string): void;
  quizzes: Quiz[];
  session: Session[] | null;
}

const QuizList = ({
  quizzes,
  session,
  onRemove,
  onEdit,
  onInit,
  onPlay,
  onPause,
  onStop,
}: Props): JSX.Element => {
  const [t] = useTranslation();
  const [modal, openModal] = useState(false);
  const [pendingRemove, setPendingRemove] = useState<Quiz | null>(null);
  const current = session?.[0];

  const isReady = (slug: string) =>
    current?.quiz === slug && !current?.isStarted;
  const isPlaying = (slug: string) =>
    current?.quiz === slug && current?.isPlaying && current?.isStarted;
  const isPaused = (slug: string) =>
    current?.quiz === slug && !current?.isPlaying && current?.isStarted;
  const isInactive = (slug: string) => current?.quiz !== slug;

  const isInitiable = (slug: string) =>
    isNil(current?.quiz) && current?.quiz !== slug;
  const isPlayable = (slug: string) =>
    current?.quiz === slug && (!current?.isPlaying || !current?.isStarted);

  return (
    <React.Fragment>
      <div tw="flex flex-col">
        <div tw="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div tw="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table tw="min-w-full">
              <thead>
                <tr>
                  {(t('theaders', { returnObjects: true }) as string[]).map(
                    (header, i) => (
                      <th
                        key={`theader-${i}`}
                        tw="px-6 py-3 border-b border-gray-200 bg-gray-100 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        css={i === 3 ? tw`text-right` : tw`text-left`}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody tw="bg-white">
                {quizzes?.map((quiz, i) => (
                  <tr key={`row-${i}`}>
                    <td tw="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-800 font-medium">
                      {quiz.title}
                    </td>

                    <td tw="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {isReady(quiz.slug) && (
                        <span tw="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-black">
                          {t('ready')}
                        </span>
                      )}
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
                      {isInitiable(quiz.slug) && (
                        <button
                          type="button"
                          css={[button.yellow, button.sm]}
                          tw="mr-2"
                          onClick={() => onInit(quiz.slug)}
                        >
                          <Cast size={18} tw="mb-px" />
                        </button>
                      )}
                      {isPlayable(quiz.slug) && (
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
                      {(isReady(quiz.slug) ||
                        isPlaying(quiz.slug) ||
                        isPaused(quiz.slug)) && (
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
                        onClick={() => onEdit(omit(['slug'], quiz) as Quiz)}
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
              onRemove(pendingRemove?.slug as string);
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

export default QuizList;
