import {ChakraProvider, Container, theme} from "@chakra-ui/react";
import * as React from "react"
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Header from "./components/Header/Header";
import OfferCards from "./components/OfferCards/OfferCards";
import CardsContainer from "./components/Cards/CardsContainer";

const App = () => {
    return (<ChakraProvider theme={theme}>
            <Header/>
            <Container maxW={"container.lg"} pt={5}>
                <Routes>
                    <Route path="/" element={<CardsContainer/>}/>
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
