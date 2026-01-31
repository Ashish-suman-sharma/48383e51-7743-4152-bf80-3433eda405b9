import { Box, Stack, Typography, IconButton, Rating } from '@mui/material'
import botAvatar from '../../assets/bot.png'
import userAvatar from '../../assets/person.png'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function MessageBubble({ msgData, openReviewModal, modifyMessages, selectMessageId, isViewOnly = false }) {

    const [showRating, setShowRating] = useState(false)
    const [starValue, setStarValue] = useState(0)

    useEffect(() => {
        if (!showRating) return;
        
        modifyMessages(prevMessages => (
            prevMessages.map(msg => {
                if (msg.id === msgData.id) {
                    return { ...msg, rating: starValue || 0 }
                }
                return msg
            })
        ))
    }, [starValue, showRating, msgData.id, modifyMessages])

    const isAssistant = msgData.type === "AI"

    return (
        <Stack
            p={{ xs: 1, md: 2 }}
            boxShadow={'0 0 4px rgba(0,0,0,0.1)'}
            borderRadius={1}
            direction={'row'}
            spacing={{ xs: 1, md: 3 }}
            sx={{
                '&:hover .action-buttons': {
                    visibility: 'visible',
                    opacity: 1
                }
            }}
            bgcolor={isViewOnly ? 'primary.main' : 'primary.light'}
        >
            <Box
                component={'img'}
                src={isAssistant ? botAvatar : userAvatar}
                height={{ xs: 30, md: 68 }}
                width={{ xs: 30, md: 68 }}
                borderRadius={'50%'}
                sx={{ objectFit: 'cover' }}
                flexShrink={0}
            />
            <Box>
                <Typography
                    variant='heading'
                    fontWeight={700}
                    fontSize={{ xs: 14, md: 16 }}
                >
                    {isAssistant ? 'Smart AI' : 'You'}
                </Typography>
                <Typography fontSize={{ xs: 12, md: 16 }}>
                    {msgData.text}
                </Typography>
                <Stack
                    direction={'row'}
                    gap={2}
                    alignItems={'center'}
                    mt={1}
                >
                    <Typography
                        fontSize={{ xs: 8, md: 12 }}
                        color={'text.secondary'}
                    >
                        {format(msgData.time, 'hh:mm a')}
                    </Typography>

                    {(isAssistant && !isViewOnly) && (
                        <Stack
                            direction={'row'}
                            visibility={{ xs: 'visible', md: 'hidden' }}
                            sx={{ opacity: { xs: 1, md: 0 }, transition: 'opacity 400ms ease' }}
                            className='action-buttons'
                        >
                            <IconButton
                                size='small'
                                onClick={() => setShowRating(prev => !prev)}
                            >
                                {showRating ? <ThumbUpAltIcon fontSize='inherit' /> : <ThumbUpOffAltIcon fontSize='inherit' />}
                            </IconButton>
                            <IconButton
                                size='small'
                                onClick={() => {
                                    selectMessageId(msgData.id)
                                    openReviewModal()
                                }}
                            >
                                <ThumbDownOffAltIcon fontSize='inherit' />
                            </IconButton>
                        </Stack>
                    )}
                </Stack>

                {((showRating || msgData.rating > 0) && isAssistant) && (
                    <Box pt={{ xs: 1, md: 2 }}>
                        <Typography
                            component={'legend'}
                            fontSize={{ xs: 10, md: 12 }}
                            mb={.5}
                        >
                            {isViewOnly ? 'Rating:' : 'Rate this response:'}
                        </Typography>
                        <Rating
                            name="rating-control"
                            value={msgData.rating > 0 ? msgData.rating : starValue}
                            onChange={(evt, newVal) => setStarValue(newVal)}
                            sx={{ width: 'auto' }}
                            readOnly={isViewOnly}
                        />
                    </Box>
                )}

                {msgData.feedback && (
                    <Typography pt={1} fontSize={{ xs: 10, md: 16 }}>
                        <Box component={'span'} fontWeight={600}>Feedback:</Box>
                        <Box component={'span'}>{` ${msgData.feedback}`}</Box>
                    </Typography>
                )}
            </Box>
        </Stack>
    )
}
