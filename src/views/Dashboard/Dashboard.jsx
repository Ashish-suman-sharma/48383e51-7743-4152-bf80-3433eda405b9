import { Stack } from '@mui/material';
import WelcomeScreen from '../../modules/WelcomeScreen/WelcomeScreen';
import InputArea from '../../modules/InputArea/InputArea';
import MessageBubble from '../../modules/MessageBubble/MessageBubble';
import ReviewPopup from '../../modules/ReviewPopup/ReviewPopup';
import { useEffect, useRef, useState, useContext } from 'react';
import responseData from '../../data/responses.json';
import { useOutletContext } from "react-router-dom";
import HeaderBar from '../../modules/HeaderBar/HeaderBar';
import { AppThemeContext } from '../../config/AppThemeContext';

export default function Dashboard() {

    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const messagesContainerRef = useRef(null)
    const [messageCounter, setMessageCounter] = useState(1)
    const [activeMessageId, setActiveMessageId] = useState(null)
    const [shouldScrollToEnd, setShouldScrollToEnd] = useState(false)
    const { conversation, setConversation } = useOutletContext();
    const { colorMode } = useContext(AppThemeContext)

    const processUserQuery = (inputText) => {
        const matchingResponse = responseData.find(
            item => inputText.toLowerCase() === item.question.toLowerCase()
        )

        const responseText = matchingResponse 
            ? matchingResponse.response 
            : "Sorry, Did not understand your query!"

        const currentTimestamp = new Date()

        setConversation(prevConversation => ([
            ...prevConversation,
            {
                type: 'Human',
                text: inputText,
                time: currentTimestamp,
                id: messageCounter
            },
            {
                type: 'AI',
                text: responseText,
                time: currentTimestamp,
                id: messageCounter + 1
            }
        ]))

        setMessageCounter(prev => prev + 2)
    }

    useEffect(() => {
        messagesContainerRef.current?.lastElementChild?.scrollIntoView()
    }, [shouldScrollToEnd])

    const hasMessages = conversation.length > 0

    return (
        <Stack
            height={'100vh'}
            justifyContent={'space-between'}
            sx={{
                '@media (max-width:767px)': {
                    background: colorMode === 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : ''
                }
            }}
        >
            <HeaderBar />

            {!hasMessages && <WelcomeScreen onQuerySubmit={processUserQuery} />}

            {hasMessages && (
                <Stack
                    height={1}
                    flexGrow={0}
                    p={{ xs: 2, md: 3 }}
                    spacing={{ xs: 2, md: 3 }}
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
                    ref={messagesContainerRef}
                >
                    {conversation.map((msg, idx) => (
                        <MessageBubble
                            msgData={msg}
                            key={idx}
                            modifyMessages={setConversation}
                            selectMessageId={setActiveMessageId}
                            openReviewModal={() => setIsPopupVisible(true)}
                        />
                    ))}
                </Stack>
            )}

            <InputArea 
                onSubmitQuery={processUserQuery} 
                triggerScroll={setShouldScrollToEnd} 
                conversation={conversation} 
                resetConversation={() => setConversation([])} 
            />

            <ReviewPopup 
                isOpen={isPopupVisible} 
                modifyMessages={setConversation} 
                targetMessageId={activeMessageId} 
                closePopup={() => setIsPopupVisible(false)} 
            />
        </Stack>
    )
}
