type InputWithLabelProps = {
    name: string,
    labelText: string,
    type?: string,
    value?: string | number | undefined,
    onChange: (new_value: string) => void
}

export const InputWithLabel = ({name, labelText, type, value, onChange} : InputWithLabelProps) => {
    
    const handleSubmit: React.ChangeEventHandler<HTMLInputElement> = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let new_value = e.target.value;
        await onChange(new_value);
    };

    return (
        <div>
            <label className="block mb-2 text-indigo-500" htmlFor={name}> {labelText} </label>
            <input value={value} onChange={handleSubmit}
                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" 
                type={type} name={name}/>
        </div>
    );
}