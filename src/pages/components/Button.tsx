export const Button = (props: {children?: any, disabled?: boolean, onClick?: () => void, className? : string}) => {
    return (
        <div className={`rounded select-none py-2  px-6 text-base w-fit   duration-200 flex flex-row items-center h-fit ${props.disabled? 'opacity-50 cursor-arrow' : 'bg-primary/70  hover:bg-primary cursor-pointer hover:ease-in '} select-none ease-in duration-100  ${props.className}`} onClick={() => {if (!props.disabled && props.onClick) {props.onClick()}}}>
            {props.children}
        </div>
    );
}
