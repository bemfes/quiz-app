import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Button from "./Button";
import { returnToForm } from "../store/reducers/QuizSlice/QuizSlice";

const QuizResults: FC = () => {
  const { score, questions, userAnswersArray } = useAppSelector(
    (state) => state.quizReducer,
  );
  
  const dispatch = useAppDispatch();
  function onClickReturnToQuizBtn() {
    dispatch(returnToForm());
  }

  return (
    <div>

      <p className="font-medium text-3xl mb-6">
        Your score: {score} / {questions.length}
      </p>

      <div className="mb-6 flex flex-col gap-6">
        {questions.map((question, index) => (

          <div
            className="mb-3 rounded-md border-2 flex flex-col gap-4 border-white p-5"
            key={index}
          >

            <p className="font-medium text-2xl max-sm:text-lg ">
              {question.question}
            </p>

            {question.answers.map((answer) => (
              <div
                key={answer}
                className={`bg-white max-sm:text-lg text-black rounded-md p-3 w-full text-xl font-medium ${(userAnswersArray[index] === answer && answer === question.correct_answer) || answer === question.correct_answer ? "right-answer" : ""} ${userAnswersArray[index] === answer && answer !== question.correct_answer ? "wrong-answer" : ""}`}
              >
                {answer}
              </div>

            ))}
          </div>
        ))}
      </div>

      <Button className="button" onClick={onClickReturnToQuizBtn}>
        Return to the form
      </Button>
      
    </div>
  );
};

export default QuizResults;
