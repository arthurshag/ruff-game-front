import {Button, ButtonProps, useToast, UseToastOptions} from "@chakra-ui/react"
import React, {FC} from 'react';

type PropsType = {
    toastOptions: UseToastOptions | undefined,
    buttonOptions: ButtonProps,
    textBtn: string,
    onClick?: () => void
}

const ToastBtn: FC<PropsType> = ({toastOptions, buttonOptions, textBtn, onClick}) => {
    const toast = useToast();
    return (
        <Button
            onClick={() => {
                toast(toastOptions)
                onClick?.();
            }
            }
            {...buttonOptions}
        >
            {textBtn}
        </Button>
    )
}

export default ToastBtn;
