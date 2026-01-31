import { Typography, Box, Stack, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import ConversationItem from '../../modules/ConversationItem/ConversationItem'
import RatingFilter from '../../modules/RatingFilter/RatingFilter'
import HeaderBar from '../../modules/HeaderBar/HeaderBar'

export default function Archive() {

    const [savedConversations, setSavedConversations] = useState([])
    const [displayedConversations, setDisplayedConversations] = useState([])

    useEffect(() => {
        const storedData = localStorage.getItem('chat')
        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setSavedConversations(parsedData)
            setDisplayedConversations(parsedData)
        }
    }, [])

    const hasConversations = savedConversations.length > 0
    const hasFilteredResults = displayedConversations.length > 0

    return (
        <Box
            height={'100vh'}
            overflow={'hidden'}
            sx={{
                overflowY: 'auto',
                '&::-webkit-scrollbar': { width: '10px' },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                    borderRadius: '8px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(151, 133, 186,0.4)',
                    borderRadius: '8px'
                }
            }}
        >
            <HeaderBar />

            <Box p={{ xs: 2, md: 3 }}>
                <Typography variant='h2' textAlign={'center'} mb={3}>
                    Conversation History
                </Typography>

                {hasConversations && (
                    <RatingFilter 
                        allConversations={savedConversations} 
                        applyFilter={setDisplayedConversations} 
                    />
                )}

                {!hasConversations && (
                    <Typography
                        textAlign={'center'}
                        p={3}
                        bgcolor={'primary.light'}
                        borderRadius={2}
                    >
                        No saved conversations yet.
                    </Typography>
                )}

                {hasConversations && !hasFilteredResults && (
                    <Typography
                        textAlign={'center'}
                        p={3}
                        bgcolor={'primary.light'}
                        borderRadius={2}
                    >
                        No conversations match the selected filter.
                    </Typography>
                )}

                {hasFilteredResults && (
                    <Stack
                        spacing={4}
                        divider={<Divider sx={{ borderColor: 'primary.bg', opacity: 0.4 }} />}
                    >
                        {displayedConversations.map((item, idx) => (
                            <ConversationItem conversationData={item} key={idx} />
                        ))}
                    </Stack>
                )}
            </Box>
        </Box>
    )
}
