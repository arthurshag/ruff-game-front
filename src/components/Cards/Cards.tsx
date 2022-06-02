import React, {FC} from 'react';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Image,
    Progress,
    Spinner,
    Text,
    UseToastOptions,
} from "@chakra-ui/react";
import {ICard} from "../../models/Card";
import ToastBtn from "./ToastHandler";
import BaseImg from "./../../assets/logo.jpg";

interface IProps {
    onClickBack: () => void;
    onClickNext: () => void;
    fetching: () => void;
    index: number;
    cards: Array<ICard> | null;
    isLoading: boolean
}

const Cards: FC<IProps> = ({onClickBack, onClickNext, isLoading, index, cards, fetching}) => {
    const isGameEnd = index === cards?.length;
    const currentCard = isGameEnd ? cards?.[index - 1] : cards?.[index];
    const disabled = isLoading || isGameEnd;
    const toastConfig = {
        duration: 2000,
        isClosable: true,
    };
    const toastSuccessConfig: UseToastOptions = {
        ...toastConfig,
        title: 'Найс шот',
        description: "Хорошо трахаешь",
        status: 'success',
    };
    const toastErrorConfig: UseToastOptions = {
        title: 'Чел плох',
        description: "Дядя Васген не простит",
        status: 'error',
        ...toastConfig
    };
    return (
        <Flex direction={"column"} alignItems={"center"} gap={[3, 5]} mb={10}>
            {isLoading && <Spinner size={"xl"}/>}
            {cards && cards.length > 0 && <>
                <Heading fontSize={["2xl", "3xl", "", "3xl"]} alignSelf={"flex-start"}>{currentCard?.name}</Heading>
                {isGameEnd && <Alert status='success'>
                    <AlertIcon/>
                    <Box>
                        <p>Игра закончена!)</p>
                        <p>Обновите страницу, если хотите продолжить</p>
                    </Box>
                </Alert>}
                <Image alignSelf={"center"} boxSize={["min", "md", "xl", "38rem"]} objectFit={"contain"}
                       src={currentCard?.img || BaseImg}/>
                <Progress value={(index + 1) / cards.length * 100} size='xs' width={"100%"}/>

                <Divider/>
                <Text textAlign={"center"} fontSize={["xl", "", "3xl"]}>{currentCard?.task}</Text>
            </>}
            <Flex gap={5}>
                {isGameEnd ? <Alert status='success' mb={10}>
                        <AlertIcon/>
                        <Box>
                            <p>Игра закончена!)</p>
                            <p>Обновите страницу, если хотите продолжить</p>
                        </Box>
                    </Alert> :
                    <><ToastBtn toastOptions={toastSuccessConfig}
                                onClick={onClickNext}
                                textBtn={"Сделал"}
                                buttonOptions={{size: "lg", disabled: disabled}
                                }/>
                        <ToastBtn toastOptions={toastErrorConfig} onClick={onClickNext} textBtn={"Не сделал"}
                                  buttonOptions={{size: "lg", disabled: disabled}}/>
                    </>}
            </Flex>
            <Flex gap={5}>
                <Button onClick={() => fetching()}>Загрузить заново</Button>
                <Button onClick={onClickBack} disabled={disabled} >Назад</Button>
            </Flex>
        </Flex>
    );
};

export default Cards;
