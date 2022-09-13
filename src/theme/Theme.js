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
        },
        inputField: {
            backgroundColor: '#F8F8F8',
            border: '1px solid #E8E8E8',
            borderRadius: '10px',
            fontFamily: "\"system-ui\", sans-serif",
            "& label" : {
                color: 'rgb(155,154,158)',
                fontFamily: "\"system-ui\", sans-serif",
            },
            "& label.Mui-focused": {
                color: 'rgb(64,93,159)',
            },
            // "&:hover label": {
            //     color: 'rgb(26,179,148)',
            // },
            "& .MuiOutlinedInput-root": {
                '& fieldset': {
                    border: 'none',
                    fontFamily: "\"system-ui\", sans-serif",
                    borderRadius: '10px',
                },
                "&:hover fieldset": {
                    border: `2px solid #F0F0F0`,
                },
                "&.Mui-focused fieldset": {
                    border: '2px solid rgb(64,93,159)',
                    borderRadius: '10px',
                },
                borderRadius: '10px',
                borderBottom: '3px solid rgba(44,67,116, .15)',
            }
        },
        greyBorderHover: {
            "&:hover": {
                border: `2px solid #F0F0F0`,
            },
        },
        cardsStyle: {
            backgroundColor: '#F8F8F8',
            height: '150px',
            borderRadius: '10px',
            borderBottom: '3px solid rgba(44,67,116, .15)',
        }

    }
})