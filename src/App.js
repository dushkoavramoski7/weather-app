import {ThemeProvider} from "@material-ui/core";
import {theme} from "./theme/Theme";
import {BrowserRouter} from "react-router-dom";
import AllRoutes from "./auth/AllRoutesConfig";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App" style={{height: '100%'}}>
                <BrowserRouter>
                    <AllRoutes/>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
