
import './index.css'
import FormLayout from './components/FormLayout'
import QuestionItem from './components/QuestionItem'
import QuizResults from './components/QuizResults'
import { useAppSelector } from './hooks/redux'

function App() {
  const {loading, questions} = useAppSelector(state => state.quizReducer)
  const {endQuiz} = useAppSelector(state => state.quizReducer)
  
  return (
    <>
      {!loading && questions.length === 0 && 
      <div>
        <h1 className='text-4xl font-bold mb-6'>Choose Your Quiz!</h1>
        <FormLayout/>
      </div>
      }
      {loading && <p className='text-3xl font-medium'>Loading...</p>}
      {!loading && questions.length > 0 && !endQuiz && <QuestionItem/>}
      {endQuiz && <QuizResults/>}
    </>
  )
}

export default App
