import { Loader } from "./loader";
import { useState } from "react";

type ButtonWithLoaderProps = {
    text: string,
    loadingText: string,
    onClick: () => void, // или VoidFunction
    textTailwind?: string,
    bgTailwind?: string
}
const ButtonWithLoader = (props: ButtonWithLoaderProps) => {
    let [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (button: HTMLButtonElement) => {
        setIsLoading(true);
        button.disabled = true;

        await props.onClick();

        setIsLoading(false); 
        button.disabled = false;
    };

    const standardstyle = "inline-flex justify-center border border-transparent " +
        "px-4 py-2 text-sm font-medium focus:outline-none " +
        "disabled:active:bg-gray-300 disabled:bg-gray-300 " +
        "relative items-center ";

    const textstyle = (props.textTailwind ?? "text-blue-900 rounded-md") + " ";
    const bgstyle = (props.bgTailwind ?? "bg-blue-100  active:bg-blue-400  hover:bg-blue-200") + " ";

    return (
        <button type="button"
            className={standardstyle + textstyle + bgstyle}
            onClick={(e) => handleSubmit(e.target as HTMLButtonElement)}>
            {isLoading
            ? <><p className="block">{props.loadingText}</p><Loader/></>
            : <>{props.text}</>}
        </button>
    );
};

export default ButtonWithLoader;