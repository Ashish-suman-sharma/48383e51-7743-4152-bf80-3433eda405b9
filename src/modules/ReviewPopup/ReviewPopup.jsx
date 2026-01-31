import { Box, Stack, Typography, Modal, IconButton, TextField, Button } from '@mui/material'
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function ReviewPopup({ isOpen, closePopup, targetMessageId, modifyMessages }) {

    const [reviewText, setReviewText] = useState('')

    const modalStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        bgcolor: 'primary.bgtheme',
        boxShadow: 24,
        p: { xs: 2, md: 3 },
        maxWidth: 720,
        borderRadius: '10px'
    }

    const submitReview = (evt) => {
        evt.preventDefault()

        modifyMessages(prevMessages => (
            prevMessages.map(msg => {
                if (msg.id === targetMessageId) {
                    return { ...msg, feedback: reviewText }
                }
                return msg
            })
        ))

        setReviewText('')
        closePopup()
    }

    return (
        <Modal open={isOpen} onClose={closePopup}>
            <Box sx={modalStyles}>
                <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={{ xs: .5, md: 2 }} alignItems={'center'}>
                        <FeedbackIcon />
                        <Typography variant={'heading'} fontSize={{ xs: 14, md: 18 }}>
                            Provide Additional Feedback
                        </Typography>
                    </Stack>

                    <IconButton onClick={closePopup}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Box
                    component='form'
                    pt={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: "flex-end",
                        gap: '12px'
                    }}
                    onSubmit={submitReview}
                >
                    <TextField
                        multiline
                        rows={6}
                        sx={{ width: 1 }}
                        value={reviewText}
                        onChange={evt => setReviewText(evt.target.value)}
                        required
                    />
                    <Button variant='contained' type='submit'>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
