import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"YuGothic", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "14px",
        },
      },
    },
  },
});

export default theme;
