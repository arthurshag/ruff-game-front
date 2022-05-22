import React, {FC, useEffect, useState} from 'react';
import {Button, Divider, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {useFetching} from "../../hooks/useFetching";
import {ICard} from "../../models/Card";
import {baseUrl} from "../../api/config";

const Cards: FC = () => {
    const [index, setIndex] = useState(0);
    const [cards, setCards] = useState<ICard[] | null>(null);
    const [fetching, isLoading, error, clearError] = useFetching(async () => {
        const response = await fetch(`${baseUrl}/cards`);
        const json = await response.json();
        setCards(json);
    });

    useEffect(() => {
        fetching();
    }, [])


    function onClick() {
        if (cards && cards.length > 0)
            setIndex((prev) => prev === cards.length - 1 ? 0 : prev + 1);
    }

    return (
        <Flex direction={"column"} alignItems={"center"} gap={5}>
            {cards && cards.length > 0 && <>
                <Heading fontSize={"5xl"} alignSelf={"flex-start"}>{cards[index].name}</Heading>
                <Image alignSelf={"center"} boxSize={"4xl"}
                       src={"https://sun9-25.userapi.com/s/v1/if2/R4jCdTxxkQEZzq4Pv23DNPbIkkzYIscgZE72M3glVdGk2AgyPcg5FgQqJdt4WqKtTqxA1syWFyNYDujIXuwks7Bb.jpg?size=1536x2048&quality=96&type=album"}/>
                <Divider/>
                <Text textAlign={"center"} fontSize={"4xl"}>{cards[index].task}</Text>
            </>}
            <Flex gap={5}>
                <Button size={"lg"} onClick={onClick}>
                    Сделал
                </Button>
                <Button size={"lg"} variant={"ghost"} onClick={onClick}>
                    Не сделал
                </Button>
            </Flex>
        </Flex>
    );
};

export default Cards;
