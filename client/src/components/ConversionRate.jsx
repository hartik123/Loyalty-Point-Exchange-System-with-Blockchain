import React from 'react'
import { Box } from '@mui/material'

const ConversionRate = () => {
    return (
        <div className='border-4 border-blue-400 bg-blue-200 rounded-3xl m-2'>
            <h1 className='text-3xl font-semibold text-black text-center'>Converstion Rate</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>Amazon: 1 point@2Rs purchase </div>
                <div>Flipkart: 1 point@2Rs purchase</div>
                <div>Myntra: 1 point@2Rs purchase</div>
            </Box>
        </div>
    )
}

export default ConversionRate