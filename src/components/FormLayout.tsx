import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import FormInput from "./FormInput";
import { answerTypes, categories, difficultyLevels } from "../data/data";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  changeCategory,
  changeDifficultyLevel,
  changeNumberQuestions,
  changeTypeAnswer,
  returnToDefaultState,
} from "../store/reducers/FormSlice/FormSlice";
import { fetchQuestions } from "../store/reducers/QuizSlice/QuizSlice";
import CustomFormSelect, { Option } from "./CustomFormSelect";
import { SingleValue } from "react-select";
import { Categories, DifficultyLevels, TypesAnswer } from "../generalTypes";

const FormLayout: FC = () => {
  const [getQuiz, setGetQuiz] = useState<boolean>(false);

  const { numberOfQuestions, category, difficulty, type } = useAppSelector(
    (state) => state.formReducer,
  );

  const valueforSelectDifficulty  = useMemo(() => ({ label: difficulty.charAt(0).toUpperCase() + difficulty.slice(1), value: difficulty }), [difficulty]) 
  
  const valueforSelectCategory = useMemo(() => (categories.find(item => item.value === category) ||  { label: category, value: category }), [category])  
    
  const valueforSelectAnswerType = useMemo(() => ({ label: type.charAt(0).toUpperCase() + type.slice(1), value: type }), [type])  
    


  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getQuiz) {
      dispatch(
        fetchQuestions({
          number: numberOfQuestions,
          category: category,
          difficulty: difficulty,
          type: type,
        }),
      );
      setGetQuiz(false);
      dispatch(returnToDefaultState());
    }
  }, [getQuiz]);

  const onChangeInputNumber = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeNumberQuestions(e.target.value))
  }, [dispatch])

  function onClickButtonForm() {
    setGetQuiz(true);
  }

  const onChangeCustomSelectCategory = useCallback((selectedOption: SingleValue<Option>) => {
        const value = selectedOption?.value as Categories
        dispatch(changeCategory(value))
    }, [dispatch])


    const onChangeCustomSelectDifficultyLevel = useCallback((selectedOption: SingleValue<Option>) => {
        const value = selectedOption?.value as DifficultyLevels
        dispatch(changeDifficultyLevel(value))
    }, [dispatch])
    
    const onChangeCustomSelectTypeAnswer = useCallback((selectedOption: SingleValue<Option>) => {
        const value = selectedOption?.value as TypesAnswer
        dispatch(changeTypeAnswer(value))
    }, [dispatch])

  return (
    <form>

      <div className="mb-8 flex flex-col gap-4">
        <FormInput
          max="50"
          label="Number of questions"
          htmlFor="questions"
          id="questions"
          type="number"
          value={numberOfQuestions}
          onChange={onChangeInputNumber}
        />

        <CustomFormSelect
          value={valueforSelectCategory}
          onChange={onChangeCustomSelectCategory}
          label="Select category"
          options={categories}
          id="category-select"
          htmlFor="category-select"
        ></CustomFormSelect>

        <CustomFormSelect
          value={valueforSelectDifficulty}
          onChange={onChangeCustomSelectDifficultyLevel}
          label="Select difficulty"
          options={difficultyLevels}
          id="difficulty-select"
          htmlFor="difficulty-select"
        ></CustomFormSelect>

        <CustomFormSelect
          value={valueforSelectAnswerType}
          onChange={onChangeCustomSelectTypeAnswer}
          label="Select answer type"
          options={answerTypes}
          id="type-select"
          htmlFor="type-select"
        ></CustomFormSelect>

      </div>

      <Button
        disabled={
          numberOfQuestions && Number(numberOfQuestions) <= 50 ? false : true
        }
        className="button"
        type="button"
        onClick={onClickButtonForm}
      >
        Get Quiz
      </Button>
      
    </form>
  );
};

export default FormLayout;
