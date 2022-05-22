import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Flex, Input, Textarea} from "@chakra-ui/react";
import {useFetching} from "../../hooks/useFetching";
import {baseUrl} from "../../api/config";


const OfferCards: FC = () => {
    const [task, setTask] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [fetching, isLoading, error, clearError] = useFetching(async () => {
        if (name === undefined || task === undefined)
            return;
        const body = JSON.stringify({name: name, task: task});

        const response = await fetch(`${baseUrl}/card`, {
            method: "POST", body: body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    });


    function onChangeText(e: ChangeEvent<HTMLTextAreaElement>) {
        setTask(e.target.value);
    }

    function onChangeName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function onSubmit() {
        fetching();
    }

    return (
        <Flex direction={"column"} alignItems={"center"} gap={5}>
            <Input placeholder={"Тайтл"} onChange={onChangeName} value={name}/>
            <Textarea onChange={onChangeText} value={task}/>
            <Flex gap={5}>
                <Button size={"lg"} onClick={onSubmit}>
                    Отправить
                </Button>
            </Flex>
        </Flex>
    );
};

export default OfferCards;
