import { FC, memo } from "react"

interface InputProps {
    type: string
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    label: string
    htmlFor: string
    id: string
    max?: string 
    min?: string
   
}

const FormInput: FC<InputProps> = memo(({ type, placeholder, onChange, value, label, htmlFor, id, max, min }) => {
    return (
        <div className="flex flex-col items-start gap-3">
            <label className="text-xl font-medium" htmlFor={htmlFor}>{label}</label>
            <input max={max} min={min} className="bg-white text-black rounded-md px-2 py-2 text-lg outline-0 w-full" id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
})

export default FormInput
