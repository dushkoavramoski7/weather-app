import {createTheme } from "@material-ui/core/styles";
export const theme = createTheme  ({
    common: {
        lightGrey: {
            backgroundColor: 'rgb(238,242,243)'
        },
        darkBlueGradient: {
            backgroundImage: 'linear-gradient(180deg, #182848, #4b6cb7)'
        },
        fontMain: {
            fontFamily: "\"system-ui\", sans-serif",
            fontSize: '20px'
        }

    }
})