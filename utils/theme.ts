import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"YuGothic", sans-serif',
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
