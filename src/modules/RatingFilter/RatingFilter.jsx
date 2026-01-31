import { Box, Select, MenuItem, Typography } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'

export default function RatingFilter({ allConversations, applyFilter }) {

    const [selectedRating, setSelectedRating] = useState('All Ratings')

    const handleSelectionChange = (evt) => {
        setSelectedRating(evt.target.value)
    }

    const filterConversations = useCallback(() => {
        if (selectedRating === 'All Ratings') {
            applyFilter(allConversations)
            return
        }

        const matchingConversations = allConversations.filter(conversation => {
            return conversation.chat.some(message => message.rating === selectedRating)
        })

        applyFilter(matchingConversations)
    }, [selectedRating, allConversations, applyFilter])

    useEffect(() => {
        filterConversations()
    }, [filterConversations])

    return (
        <Box mb={3}>
            <Typography fontSize={12} mb={0.5}>
                Filter by rating
            </Typography>
            <Select
                value={selectedRating}
                onChange={handleSelectionChange}
                size='small'
                sx={{ minWidth: { xs: 1, md: 160 } }}
            >
                <MenuItem value='All Ratings'>All Ratings</MenuItem>
                <MenuItem value={1}>1 Star</MenuItem>
                <MenuItem value={2}>2 Stars</MenuItem>
                <MenuItem value={3}>3 Stars</MenuItem>
                <MenuItem value={4}>4 Stars</MenuItem>
                <MenuItem value={5}>5 Stars</MenuItem>
            </Select>
        </Box>
    )
}
