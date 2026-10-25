import React, { useState } from 'react';
import { useGame } from '../../../app/providers/with-game';
import { useAttestation } from '../model/useAttestation';
import { AttestationModal } from './AttestationModal';

interface AttestationButtonProps {
  subjectId: string;
  subjectTitle: string;
}

export const AttestationButton = ({ subjectId, subjectTitle }: AttestationButtonProps) => {
  const { student } = useGame();
  const [isClicked, setIsClicked] = useState(false);

  const {
    isLoading,
    isOpen,
    question,
    selectedAnswer,
    isVerified,
    isCorrect,
    isSuccessfullySubmitted,
    handleOpenAttestation,
    handleSelectAnswer,
    handleClose
  } = useAttestation(subjectId, subjectTitle);

  const isPassed = student?.passedAttestationSubjectIds?.includes(subjectId) || isSuccessfullySubmitted;
  const isDisabled = isPassed || isLoading || isClicked;

  const handleClick = () => {
    if (isDisabled) return;
    setIsClicked(true);
    handleOpenAttestation();
  };

  const handleModalClose = () => {
    setIsClicked(false);
    handleClose();
  };

  return (
    <>
      <button
        type="button"
        disabled={isDisabled}
        onClick={handleClick}
        className={`px-2 py-1.5 whitespace-nowrap rounded-xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
          isPassed
            ? 'bg-emerald-500 text-white cursor-not-allowed'
            : isClicked || isLoading
            ? 'bg-rose-400 text-white opacity-60 cursor-not-allowed'
            : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs shadow-rose-500/10 active:scale-[0.97]'
        }`}
      >
        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        {isPassed ? 'Сдано ✓' : 'Сдать аттестацию'}
      </button>

      <AttestationModal
        isOpen={isOpen}
        question={question}
        subjectTitle={subjectTitle}
        selectedAnswer={selectedAnswer}
        isVerified={isVerified}
        isCorrect={isCorrect}
        isLoading={isLoading}
        onSelectAnswer={handleSelectAnswer}
        onClose={handleModalClose}
      />
    </>
  );
};
