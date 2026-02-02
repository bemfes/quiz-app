import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import shuffleArray from "../../../utils";
import { fetchQuestionsArgs, InitialState, Questions, QuestionsState, ErrorPayload } from "./typesQuizSlice";




const initialState: InitialState = {
  score: 0,
  questionNumber: 0,
  endQuiz: false,
  loading: false,
  error: null,
  questions: [],
  userClick: false,
  userAnswer: null,
  userAnswersArray: [],
};


export const fetchQuestions = createAsyncThunk<
  QuestionsState[],
  fetchQuestionsArgs,
  {
    rejectValue: ErrorPayload;
  }
>(
  "fetchQuestions",
  async ({ number, category, difficulty, type }, { rejectWithValue }) => {
    try {
      const res: Response = await fetch(
        `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      return data.results.map(
        (question: Questions): QuestionsState => ({
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }),
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
      return rejectWithValue({ message: "Unknown error" });
    }
  },
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clickNextQuestion(state) {
      state.questionNumber += 1;
      state.userClick = false;
      state.userAnswer = null;
    },

    userClicked(state, action: PayloadAction<string>) {
      state.userClick = true;
      state.userAnswer = action.payload;
      state.userAnswersArray = [...state.userAnswersArray, action.payload];
      if (
        state.questions[state.questionNumber].correct_answer ===
        state.userAnswer
      ) {
        state.score += 1;
      }
    },
    endQuiz(state) {
      state.endQuiz = true;
    },
    returnToForm(state) {
      state.endQuiz = false;
      state.score = 0;
      state.questionNumber = 0;
      state.questions = [];
      state.userClick = false;
      state.userAnswer = null;
      state.userAnswersArray = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchQuestions.fulfilled,
      (state, action: PayloadAction<QuestionsState[]>) => {
        state.loading = false;
        state.questions = action.payload;
      },
    );
    builder.addCase(
      fetchQuestions.rejected,
      (state, action: ReturnType<typeof fetchQuestions.rejected>) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else state.error = "unknown error";
      },
    );
  },
});

export default quizSlice.reducer;

export const { clickNextQuestion, endQuiz, returnToForm, userClicked } =
  quizSlice.actions;
