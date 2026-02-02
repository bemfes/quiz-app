import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Button from "./Button";
import {
  clickNextQuestion,
  endQuiz,
  userClicked,
} from "../store/reducers/QuizSlice/QuizSlice";

const QuestionItem: FC = () => {
  const { questions, questionNumber, userClick, userAnswer } = useAppSelector(
    (state) => state.quizReducer,
  );

  const dispatch = useAppDispatch();

  const question = questions[questionNumber];

  function onClickNextQuestionBtn(): void {
    dispatch(clickNextQuestion());
  }

  function onClickQuestionAnswerBtn(
    e: React.MouseEvent<HTMLButtonElement>,
  ): void {
    const buttonText = e.target as HTMLButtonElement;
    const userAnswer = buttonText.textContent;
    if (userAnswer !== null) {
      dispatch(userClicked(userAnswer));

    }
  }

  function onClickEndQuizBtn() {
    dispatch(endQuiz());
  }
  return (
    <div>
      
      <p className="mb-4 font-medium text-lg">
        {questionNumber + 1} / {questions.length}
      </p>
      
      <p className="mb-6 font-medium text-2xl">{question.question}</p>

      <div className="flex flex-col gap-6 mb-6">
        {question.answers.map((answer, index) => (
          <Button
            className="quiz-button"
            userAnswer={userAnswer}
            notChosen={userClick && answer !== userAnswer}
            userChosen={userClick && answer === userAnswer}
            correctAnswer={question.correct_answer}
            key={index}
            onClick={onClickQuestionAnswerBtn}
          >
            {answer}
          </Button>
        ))}
      </div>

      {questionNumber + 1 !== questions.length ? (
        <Button
          className="button"
          disabled={userClick ? false : true}
          onClick={onClickNextQuestionBtn}
        >
          Next Question
        </Button>
      ) : (
        <Button
          className="button"
          disabled={userClick ? false : true}
          onClick={onClickEndQuizBtn}
        >
          End the Quiz
        </Button>
      )}
    </div>
  );
};

export default QuestionItem;
