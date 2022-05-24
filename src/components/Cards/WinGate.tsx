import React, {FC, useEffect, useState} from 'react';
import {Button, Divider, Flex, Heading, Image, Spinner, Text} from "@chakra-ui/react";
import {useFetching} from "../../hooks/useFetching";
import {ICard} from "../../models/Card";
import {baseUrl} from "../../api/config";

type PropsType = {
    isWin?: boolean
}

const WinGate: FC<PropsType> = ({isWin, children}) => {
    return (
        <>
            {isWin ? <>Да, выиграл</> : children}
        </>
    );
};


export default WinGate;
