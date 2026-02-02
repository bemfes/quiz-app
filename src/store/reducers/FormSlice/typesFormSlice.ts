import { Categories, DifficultyLevels, TypesAnswer } from "../../../generalTypes"

export interface InitialState {
    numberOfQuestions: string 
    category: Categories
    difficulty: DifficultyLevels
    type: TypesAnswer,
    
}