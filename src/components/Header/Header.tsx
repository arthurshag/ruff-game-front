import React, {FC} from 'react';
import {Box, Container, Flex, Image, Text, useColorMode} from "@chakra-ui/react";
import {ColorModeSwitcher} from "../../ColorModeSwitcher";
import Logo from "./../../assets/logo.jpg";
import {Link} from "react-router-dom";

const Header: FC = () => {
    const {colorMode} = useColorMode();
    return (
        <Box as="header" bg={colorMode === "dark" ? 'gray.500' : "blue.500"} py={4}>
            <Container maxW={"container.lg"}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Link to={"/"}>
                        <Image display={"inline-block"} src={Logo} alt={"logo"} boxSize={"50px"} objectFit={"cover"}
                               verticalAlign={"middle"} mr={5}/> {"  "}
                        <Text display={"inline-block"} fontWeight={"bold"} fontSize={"xl"}
                              verticalAlign={"middle"}>Ёрш</Text>
                    </Link>
                    <Link to={"/admin"}><Text fontWeight={"bold"} fontSize={"lg"}>Предложить карты</Text></Link>
                    <ColorModeSwitcher justifySelf={"flex-end"}/>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
