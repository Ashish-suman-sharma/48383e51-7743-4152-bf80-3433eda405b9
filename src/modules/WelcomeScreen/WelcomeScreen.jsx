import { Box, Typography, Stack, Grid } from '@mui/material'
import botAvatar from '../../assets/bot.png'
import SuggestionTile from './SuggestionTile'

export default function WelcomeScreen({ onQuerySubmit }) {

    const quickPrompts = [
        {
            title: 'Hi, what is the weather',
            description: 'Receive instant AI-powered response'
        },
        {
            title: 'Hi, what is my location',
            description: 'Receive instant AI-powered response'
        },
        {
            title: 'Hi, what is the temperature',
            description: 'Receive instant AI-powered response'
        },
        {
            title: 'Hi, how are you',
            description: 'Receive instant AI-powered response'
        },
    ]

    return (
        <Stack height={1} justifyContent={'flex-end'} p={{ xs: 2, md: 3 }}>
            <Stack
                alignItems={'center'}
                spacing={2}
                my={5}
            >
                <Typography variant='h2'>
                    How Can I Help You Today?
                </Typography>
                <Box
                    component={'img'}
                    src={botAvatar}
                    height={{ xs: 42, md: 70 }}
                    width={{ xs: 42, md: 70 }}
                    boxShadow={4}
                    borderRadius={'50%'}
                />
            </Stack>
            <Grid container spacing={{ xs: 1, md: 3 }}>
                {quickPrompts.map(prompt => (
                    <Grid item key={prompt.title} xs={12} md={6}>
                        <SuggestionTile 
                            title={prompt.title} 
                            description={prompt.description} 
                            onSelect={onQuerySubmit} 
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}
