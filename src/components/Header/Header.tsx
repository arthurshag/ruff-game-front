import React, {FC} from 'react';
import {Box, Container, Flex, Image, useColorMode} from "@chakra-ui/react";
import {ColorModeSwitcher} from "../../ColorModeSwitcher";
import Logo from "./../../assets/logo.jpg";
import {Link} from "react-router-dom";

const Header: FC = () => {
    const {colorMode} = useColorMode();
    return (
        <Box as="header" bg={colorMode === "dark" ? 'gray.500' : "blue.500"} py={4}>
            <Container maxW={"container.lg"}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Link to={"/"}><Image src={Logo} alt={"logo"} boxSize={"50px"} objectFit={"cover"}/></Link>
                    <Link to={"/admin"}>Admin</Link>
                    <ColorModeSwitcher justifySelf={"flex-end"}/>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
