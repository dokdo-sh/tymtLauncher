export const Button = (props: {children?: any, disabled?: boolean, onClick?: () => void, className? : string}) => {
    return (
        <div className={`rounded py-2 mx-auto px-6 text-base w-fit font-Orbitron  duration-200 flex flex-row items-center h-fit ${props.disabled? 'bg-dark-secondary' : 'bg-primary/70  hover:bg-primary cursor-pointer hover:ease-in '} select-none ease-in duration-100  ${props.className}`} onClick={() => {if (!props.disabled && props.onClick) {props.onClick()}}}>
            {props.children}
        </div>
    );
}
