import React, {FC, useEffect, useState} from 'react';
import {
    Alert,
    AlertIcon,
    Box, Button,
    Divider,
    Flex,
    Heading,
    Image,
    Progress,
    Spinner,
    Text,
} from "@chakra-ui/react";
import {useFetching} from "../../hooks/useFetching";
import {ICard} from "../../models/Card";
import {baseUrl} from "../../api/config";
import ToastBtn from "./ToastHandler";
import BaseImg from "./../../assets/logo.jpg";
import Cards from "./Cards";

const fetchCards = async () => {
    const response = await fetch(`${baseUrl}/cards`);
    const cards = await response.json();
    shuffle(cards);
    return cards;
}

const CardsContainer: FC = () => {
    const [index, setIndex] = useState(0);
    const [cards, setCards] = useState<ICard[] | null>(null);
    const [fetching, isLoading, error, clearError] = useFetching(async () => {
        const cards = await fetchCards();
        localStorage.setItem("cards", JSON.stringify(cards));
        localStorage.setItem("gameIsEnd", JSON.stringify(false));
        setCards(cards);
        setIndex(0);
    });

    useEffect(() => {
        const cardsString = localStorage.getItem("cards");
        const cards = cardsString && JSON.parse(cardsString);
        const gameIsEnd = localStorage.getItem("gameIsEnd") !== "false";
        const index = localStorage.getItem("index");
        if (gameIsEnd || !cards) {
            fetching();
            return;
        }

        setCards(cards as Array<ICard>);
        if (index)
            setIndex(+index);
    }, [])


    function onClickNext() {
        if (cards && cards.length > 0 && index < cards.length) {
            setIndex((prev) => prev + 1);
            localStorage.setItem("index", String(index + 1));
        }
    }

    function onClickBack() {
        if (cards && cards.length > 0 && index > 0) {
            setIndex((prev) => prev - 1);
            localStorage.setItem("index", String(index - 1));
        }
    }


    return (
        <Cards onClickNext={onClickNext} onClickBack={onClickBack} index={index} cards={cards} isLoading={isLoading}
               fetching={fetching}/>
    );
};


function shuffle<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


export default CardsContainer;
