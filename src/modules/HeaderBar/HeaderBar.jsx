import { Typography, Stack, IconButton, useMediaQuery } from '@mui/material'
import { Link, useOutletContext } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppThemeContext } from '../../config/AppThemeContext';
import { useContext } from 'react';

export default function HeaderBar() {

    const { handleMobileMenu } = useOutletContext();
    const isMobileView = useMediaQuery('(max-width:800px)')
    const { updateColorMode, colorMode } = useContext(AppThemeContext)

    const toggleTheme = () => {
        updateColorMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
    }

    return (
        <Stack
            component={'header'}
            p={{ xs: 2, md: 3 }}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
            >
                {isMobileView && (
                    <MenuIcon
                        onClick={() => handleMobileMenu(prev => !prev)}
                    />
                )}

                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <Typography
                        variant='h1'
                        component={'h1'}
                    >
                        Smart AI
                    </Typography>
                </Link>
            </Stack>

            <Stack
                direction={'row'}
                spacing={0.2}
                alignItems={'center'}
            >
                <Typography
                    textTransform={'capitalize'}
                    fontSize={10}
                >
                    {colorMode}
                </Typography>
                <IconButton onClick={toggleTheme}>
                    {colorMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Stack>
        </Stack>
    )
}
