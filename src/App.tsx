import {ChakraProvider, Container, theme} from "@chakra-ui/react";
import * as React from "react"
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Cards from "./components/Cards/Cards";
import Header from "./components/Header/Header";
import OfferCards from "./components/OfferCards/OfferCards";

const App = () => {
    //asd
    return (<ChakraProvider theme={theme}>
            <Header/>
            <Container maxW={"container.lg"} pt={5}>
                <Routes>
                    <Route path="/" element={<Cards/>}/>
                    <Route path="/admin" element={<OfferCards/>}/>
                </Routes>
            </Container>
        </ChakraProvider>
    );
}


export const CreateApp = () => {
    return <BrowserRouter>
        <App/>
    </BrowserRouter>
}
