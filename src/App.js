import { CssBaseline, ThemeProvider } from "@mui/material";

import { ColorModeContext, useMode } from "./theme";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
	const [theme, colorMode] = useMode();
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<DefaultLayout />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
