import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Flex, Heading, Input, Textarea} from "@chakra-ui/react";
import {useFetching} from "../../hooks/useFetching";
import {baseUrl} from "../../api/config";


const OfferCards: FC = () => {
    const [task, setTask] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [img, setImg] = useState<string | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>("");
    const [fetching, isLoading, error, clearError] = useFetching(async () => {
        if (name === undefined || task === undefined)
            return;
        const body = JSON.stringify({name: name, task: task, img: img});

        const response = await fetch(`${baseUrl}/card`, {
            method: "POST", body: body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            setMessage("Успешно загруженно")
        } else {
            setMessage("Не удалось загрузить")
        }
    });


    function onChangeText(e: ChangeEvent<HTMLTextAreaElement>) {
        setTask(e.target.value);
        setMessage("")
    }

    function onChangeName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
        setMessage("")
    }

    function onChangeImg(e: ChangeEvent<HTMLInputElement>) {
        setImg(e.target.value);
        setMessage("")
    }

    function onSubmit() {
        fetching();
    }

    return (
        <Flex direction={"column"} alignItems={"center"} gap={5}>
            <Heading fontSize={"2xl"} textAlign={"left"} width={"100%"}>Предложить варианты карт</Heading>
            <Heading fontSize={"lg"} textAlign={"left"} width={"100%"}>Название карточки</Heading>
            <Input placeholder={"Тайтл"} onChange={onChangeName} value={name}/>
            <Heading fontSize={"lg"} textAlign={"left"} width={"100%"}>Ссылка на картинку</Heading>
            <Input placeholder={"Ссылка на картинку"} onChange={onChangeImg} value={img}/>
            <Heading fontSize={"lg"} textAlign={"left"} width={"100%"}>Задание карточки</Heading>
            <Textarea onChange={onChangeText} value={task}/>
            <Flex gap={5} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                <Heading fontSize={"lg"}>{message}</Heading>
                <Button size={"lg"} onClick={onSubmit} disabled={!(name && task)} isLoading={isLoading} justifySelf={"flex-end"}>
                    Отправить
                </Button>
            </Flex>
        </Flex>
    );
};

export default OfferCards;
