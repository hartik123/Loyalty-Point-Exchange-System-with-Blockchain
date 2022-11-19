import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { LoyaltyContext } from '../context/LoyaltyContext'
import ConversionRate from './ConversionRate';

const AddUserNetwork = () => {

    const { connectWallet, currentAccount, initialPoints, setInitialPoints, userAddress, setUserAddress, addUserTransaction, formData, setFormData, convertPointTransaction } = useContext(LoyaltyContext);

    const handleUserAddress = (e) => {
        setUserAddress(e.target.value);
    }

    const changeInitialPoints = (e) => {
        setInitialPoints({ ...initialPoints, [e.target.name]: e.target.value });
    }

    return (
        <div className='flex flex-row flex-wrap'>
            <div className='border-4 border-blue-400 bg-blue-200 rounded-3xl'>
                <div>Add User</div>
                <TextField
                    id="standard-basic"
                    label="Customer's Address"
                    placeholder="Enter Customer's Address"
                    value={userAddress}
                    onChange={handleUserAddress}
                    variant="standard" style={{ margin: "1em 0" }} />
                <br />
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '15ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >


                        <br />

                        <TextField
                            id="standard-basic"
                            label="Amazon Purchase"
                            type="number"
                            placeholder="Enter Amazon Purchase Price"
                            name="amazonPoint"
                            value={initialPoints.amazonPoint}
                            onChange={changeInitialPoints}
                            min={0}
                            variant="standard" />
                        <TextField
                            id="standard-basic"
                            label="Flipkart Purchase"
                            type="number"
                            placeholder="Enter Flipkart Purchase Price"
                            name="flipkartPoint"
                            value={initialPoints.flipkartPoint}
                            onChange={changeInitialPoints}
                            min={0}
                            variant="standard" />
                        <TextField
                            id="standard-basic"
                            label="Myntra Purchase"
                            type="number"
                            placeholder="Enter Myntra Purchase Price"
                            name="myntraPoint"
                            value={initialPoints.myntraPoint}
                            onChange={changeInitialPoints}
                            min={0}
                            variant="standard" />

                        <br />
                    </Box>
                </div>
                <Button variant="contained" endIcon={<SendIcon />} onChange={handleUserAddress} onClick={() => addUserTransaction()} style={{ marginBottom: "1em 0" }}>
                    Add User
                </Button>
            </div>

            <ConversionRate />
        </div>
    )
}

export default AddUserNetwork;