import React, {FC, useEffect, useState} from 'react';
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
    useToast
} from "@chakra-ui/react";
import {useFetching} from "../../hooks/useFetching";
import {ICard} from "../../models/Card";
import {baseUrl} from "../../api/config";
import ToastBtn from "./ToastHandler";

const baseImg = "https://sun9-11.userapi.com/s/v1/ig2/uSpikgYqamdT99zc-Ym2J7Jw75-uaIBkuQ4_mt3vlP5TcLS9F-hL3cIep4TMqQf06NQWLbEGk-B3yJUdz-imoe2W.jpg?size=1170x1060&quality=96&type=album";
const Cards: FC = () => {
    const [index, setIndex] = useState(0);
    const [cards, setCards] = useState<ICard[] | null>(null);
    const [fetching, isLoading, error, clearError] = useFetching(async () => {
        const response = await fetch(`${baseUrl}/cards`);
        const cards = await response.json();
        shuffle(cards)
        setCards(cards);
    });

    useEffect(() => {
        fetching();
    }, [])


    function onClick() {
        if (cards && cards.length > 0 && index < cards.length) {
            setIndex((prev) => prev + 1);
        }
    }

    const isGameEnd = index === cards?.length;
    const currentCard = isGameEnd ? cards?.[index - 1] : cards?.[index];

    const disabled = isLoading || isGameEnd;

    return (
        <Flex direction={"column"} alignItems={"center"} gap={5}>
            {isLoading && <Spinner size={"xl"}/>}
            {cards && cards.length > 0 && <>
                <Heading fontSize={"5xl"} alignSelf={"flex-start"}>{currentCard?.name}</Heading>
                {isGameEnd && <Alert status='success'>
                    <AlertIcon/>
                    <Box>
                        <p>Игра закончена!)</p>
                        <p>Обновите страницу, если хотите продолжить</p>
                    </Box>
                </Alert>}
                <Image alignSelf={"center"} boxSize={"4xl"}
                       src={currentCard?.img || baseImg}/>
                <Progress value={(index + 1) / cards.length * 100} size='xs' width={"100%"}/>

                <Divider/>
                <Text textAlign={"center"} fontSize={"4xl"}>{currentCard?.task}</Text>
            </>}
            <Flex gap={5} mb={10}>
                {isGameEnd ? <Alert status='success' mb={10}>
                        <AlertIcon/>
                        <Box>
                            <p>Игра закончена!)</p>
                            <p>Обновите страницу, если хотите продолжить</p>
                        </Box>
                    </Alert> :
                    <><ToastBtn toastOptions={{
                        title: 'Найс шот',
                        description: "Хорошо трахаешь",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    }}
                                onClick={onClick}
                                textBtn={"Сделал"}
                                buttonOptions={{size: "lg", disabled: disabled}
                                }/>
                        <ToastBtn toastOptions={{
                            title: 'Чел плох',
                            description: "Дядя Васген не простит",
                            status: 'error',
                            duration: 2000,
                            isClosable: true,
                        }} onClick={onClick} textBtn={"Не сделал"} buttonOptions={{size: "lg", disabled: disabled}}/>
                    </>}
            </Flex>
        </Flex>
    );
};


function shuffle<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


export default Cards;
