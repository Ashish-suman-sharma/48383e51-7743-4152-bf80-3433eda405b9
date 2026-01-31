import { Box, Typography, Stack } from '@mui/material'
import { format, isEqual, startOfDay, add } from 'date-fns'
import MessageBubble from '../MessageBubble/MessageBubble'

export default function ConversationItem({ conversationData }) {

    const getFormattedDate = (date) => {
        const todayStart = startOfDay(new Date())
        const dateStart = startOfDay(new Date(date))

        if (isEqual(dateStart, todayStart)) {
            return `Today's conversations`
        }
        
        if (isEqual(todayStart, add(dateStart, { days: 1 }))) {
            return `Yesterday's conversations`
        }
        
        return format(dateStart, 'do LLL yyyy')
    }

    return (
        <Box>
            <Typography fontWeight={700} mb={2}>
                {getFormattedDate(conversationData.datetime)}
            </Typography>

            <Stack spacing={{ xs: 2, md: 3 }}>
                {conversationData.chat.map((message, idx) => (
                    <MessageBubble msgData={message} isViewOnly={true} key={idx} />
                ))}
            </Stack>
        </Box>
    )
}
