import { FC, memo } from "react"
import Select, { SingleValue, StylesConfig } from 'react-select'


export interface Option {
    label: string
    value: string
}

interface CustomFormSelectProps {
    label: string
    htmlFor: string
    id: string
    options: Option[]
    onChange: (selectedOption: SingleValue<Option>) => void
    value: Option
    
}



const customStyles: StylesConfig<Option, false> = {
  control: (base) => ({
    ...base,
    borderColor: '#d1d5db',
    boxShadow: 'none',
    borderRadius: '0.375rem',
    padding: '0.375rem 0.75rem',
    color: '#000000',
    '&:hover': { borderColor: '#9ca3af' },
  }),
   indicatorSeparator: (base) => ({
    ...base,
    display: 'none', 
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.375rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 999, 
    display: 'block' 
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? '#f9fafb' : 'white',
    color: '#000000', 
    fontSize: '18px',
    padding: '8px 12px',
    cursor: 'pointer',
    zIndex: 999,
    '&:hover': {
      backgroundColor: '#cecece', 
      
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#000000', 
    fontSize: '18px',
  }),
};

const CustomFormSelect: FC<CustomFormSelectProps> = memo(({label, htmlFor, id, onChange, options, value}) => {
    
    return (
        <div className="flex flex-col items-start gap-3">
            <label className="text-xl font-medium" htmlFor={htmlFor}>{label}</label>
            <Select className="w-full" value={value} isSearchable={false} inputId={id} options={options} onChange={onChange}
            styles={customStyles}
            >
            </Select>
        </div>
    )
})

export default CustomFormSelect
