import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#735da5', // your primary color
        },
        secondary: {
            main: '#735da5', // your secondary color
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-contained': {
                        color: 'white', // text color for contained buttons
                        backgroundColor: '#735da5', // background color
                    },
                    '&.MuiButton-outlined': {
                        color: '#735da5', // text color for outlined buttons
                        borderColor: '#735da5', // border color
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#735da5', // focused border color
                        },
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#735da5', // focused border color
                        },
                    },
                },
            },
        },
    },
});