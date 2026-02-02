import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState} from "./typesFormSlice";
import { Categories, DifficultyLevels, TypesAnswer } from "../../../generalTypes";

const initialState: InitialState = {
    numberOfQuestions: '4',
    category: Categories.SPORTS,
    difficulty: DifficultyLevels.EASY,
    type: TypesAnswer.MULTIPLE,
    
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        changeNumberQuestions(state, action: PayloadAction<string>) {
            state.numberOfQuestions = action.payload
        },
        changeCategory(state, action: PayloadAction<Categories>) {
            state.category = action.payload
        },
        changeDifficultyLevel(state, action: PayloadAction<DifficultyLevels>) {
            state.difficulty = action.payload
        },
        changeTypeAnswer(state, action: PayloadAction<TypesAnswer>) {
            state.type = action.payload
        },
        returnToDefaultState(state) {
            state.numberOfQuestions = '4'
            state.category = Categories.SPORTS
            state.difficulty = DifficultyLevels.EASY
            state.type = TypesAnswer.MULTIPLE
        }
        
    },
   
})

export default formSlice.reducer

export const {changeNumberQuestions, changeCategory, changeDifficultyLevel, changeTypeAnswer, returnToDefaultState} = formSlice.actions