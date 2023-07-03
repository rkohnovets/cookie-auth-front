type LoaderProps = {
    widthTailwind?: string,
    heightTailwind?: string
}

export const Loader = ({widthTailwind, heightTailwind}: LoaderProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className={`m-1 animate-spin inline-block 
            ${widthTailwind ?? "w-4"} ${heightTailwind ?? "h-4"}
            border-4 border-black border-l-transparent rounded-full`}/>
        </div>
    );
}