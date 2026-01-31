import { Box, Typography, Stack, IconButton } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function SuggestionTile({ title, description, onSelect }) {

    return (
        <Stack
            bgcolor={'primary.light'}
            p={{ xs: 1.2, md: 3 }}
            borderRadius={1}
            boxShadow={'0 0 12px rgba(0,0,0,0.1)'}
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
                cursor: 'pointer',
                transition: 'background 200ms ease',
                '&:hover': {
                    bgcolor: 'primary.bglight'
                },
                '&:hover .MuiIconButton-root': {
                    opacity: 1
                }
            }}
            onClick={() => onSelect(title)}
        >
            <Box>
                <Typography
                    variant='heading'
                    fontWeight={700}
                    fontSize={{ xs: 14, md: 20 }}
                >
                    {title}
                </Typography>
                <Typography
                    color={'text.secondary'}
                    fontSize={{ xs: 10, md: 16 }}
                >
                    {description}
                </Typography>
            </Box>
            <IconButton 
                size='small' 
                sx={{ 
                    opacity: 0, 
                    bgcolor: 'primary.bglight', 
                    transition: 'opacity 400ms ease' 
                }}
            >
                <ArrowUpwardIcon fontSize='inherit' />
            </IconButton>
        </Stack>
    )
}
