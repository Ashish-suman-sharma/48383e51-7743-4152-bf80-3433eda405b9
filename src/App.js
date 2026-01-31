import { Outlet } from 'react-router-dom'
import { AppThemeContext } from './config/AppThemeContext';
import { useState, useEffect, useMemo } from 'react';
import NavigationPanel from './modules/NavigationPanel/NavigationPanel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { generateColorScheme } from './config/ColorScheme';
import { Grid } from '@mui/material'

function App() {

  const [colorMode, setColorMode] = useState(localStorage.getItem('appTheme') || 'light')
  const [conversation, setConversation] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const appTheme = useMemo(() => createTheme(generateColorScheme(colorMode)), [colorMode]);

  useEffect(() => {
    localStorage.setItem('appTheme', colorMode)
  }, [colorMode])

  return (
    <AppThemeContext.Provider value={{ colorMode, updateColorMode: setColorMode }}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />

        <Grid container sx={{ background: 'linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))' }}>
          <Grid
            item xs={12}
            md={2.5}
            sx={{
              bgcolor: 'primary.light',
              '@media (max-width:800px)': {
                width: '70%',
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 400ms ease',
              },
            }}
            position={{ xs: 'fixed', md: 'relative' }}
            height={'100vh'}
            zIndex={{ xs: 9999, md: 1 }}
            boxShadow={{ xs: isSidebarOpen ? 10 : 0, md: 0 }}
          >
            <NavigationPanel resetMessages={setConversation} dismissMenu={() => setIsSidebarOpen(false)} />
          </Grid>
          <Grid item xs={12} md={9.5}>
            <Outlet context={{ conversation, setConversation, handleMobileMenu: setIsSidebarOpen }} />
          </Grid>
        </Grid>

      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}

export default App;