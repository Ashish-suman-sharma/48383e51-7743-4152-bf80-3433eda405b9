import { TextField, Box, Button, Stack, Snackbar } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function InputArea({ onSubmitQuery, triggerScroll, conversation, resetConversation }) {

    const [userInput, setUserInput] = useState('')
    const textFieldRef = useRef(null)
    const [notificationVisible, setNotificationVisible] = useState(false)

    const processSubmission = (evt) => {
        evt.preventDefault()
        onSubmitQuery(userInput)
        setUserInput('')
        triggerScroll(prev => !prev)
    }

    const storeConversation = () => {
        const storedHistory = JSON.parse(localStorage.getItem('chat')) || []
        const timestamp = new Date()
        
        localStorage.setItem('chat', JSON.stringify([
            { chat: conversation, datetime: timestamp }, 
            ...storedHistory
        ]))

        resetConversation()
        setNotificationVisible(true)
    }

    useEffect(() => {
        textFieldRef.current?.focus()
    }, [])

    const hasMessages = conversation.length > 0

    return (
        <Box flexShrink={0} px={{ xs: .5, md: 3 }} pb={{ xs: 1, md: 3 }}>
            <Box component={'form'} onSubmit={processSubmission}>
                <Stack direction={'row'} spacing={{ xs: .5, md: 2 }}>
                    <TextField
                        placeholder='Message Bot AI...'
                        sx={{
                            flex: 1,
                            bgcolor: 'primary.light',
                            borderRadius: 1,
                            '& input': {
                                fontSize: { xs: 12, md: 16 },
                                paddingLeft: { xs: 1, md: 2 },
                                paddingRight: { xs: 1, md: 2 },
                            }
                        }}
                        value={userInput}
                        onChange={(evt) => setUserInput(evt.target.value)}
                        required
                        inputRef={textFieldRef}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        sx={{
                            fontSize: { xs: 12, md: 16 },
                            '@media (max-width:767px)': {
                                minWidth: 0,
                                paddingLeft: 1.5,
                                paddingRight: 1.5
                            }
                        }}
                    >
                        Ask
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={storeConversation}
                        disabled={!hasMessages}
                        sx={{
                            fontSize: { xs: 12, md: 16 },
                            '@media (max-width:767px)': {
                                minWidth: 0,
                                paddingLeft: 1.5,
                                paddingRight: 1.5
                            }
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </Box>

            <Snackbar
                open={notificationVisible}
                message={'Conversation saved successfully.'}
                onClose={() => setNotificationVisible(false)}
                autoHideDuration={5000}
                action={
                    <Link to="/history">
                        <Button size='small'>View saved conversations</Button>
                    </Link>
                }
            />
        </Box>
    )
}
