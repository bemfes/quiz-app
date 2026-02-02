import { FC, ReactNode } from "react"

 
interface ButtonProps {
    children: ReactNode
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    type?: 'submit' | 'reset' | 'button' | undefined
    disabled?: boolean
    userChosen?: boolean
    correctAnswer?: string
    userAnswer?: string | null
    notChosen?: boolean
    className?: string
}

const Button: FC<ButtonProps> = ({children, onClick, type, disabled,  correctAnswer, userAnswer, userChosen, notChosen, className}) => {
    
    
    return  <button disabled={disabled} className={ ` ${className}  ${userChosen && correctAnswer === userAnswer ? 'right-answer' : ''} ${notChosen && correctAnswer === children ? 'right-answer' : ''} ${userChosen && correctAnswer !== userAnswer ? 'wrong-answer' : ''}`} type={type} onClick={onClick}>{children}</button>
     
    
}

export default Button
