import {ColorModeScript} from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client";
import {CreateApp} from "./App"
import * as serviceWorker from "./serviceWorker"

const container = document.getElementById("root") || document.createElement('div');
const root = ReactDOM.createRoot(container)

root.render(
    <React.StrictMode>
        <ColorModeScript/>
        <CreateApp/>
    </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()
