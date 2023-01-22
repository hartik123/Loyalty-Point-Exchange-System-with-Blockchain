import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { LoyaltyContext } from '../context/LoyaltyContext'
import ConversionRate from './ConversionRate';

const CustomerRequest = () => {

    const {customerRequestAddress, setCustomerRequestAddress, customerAddFunction } = useContext(LoyaltyContext);

    const handleUserAddress = (e) => {
        setCustomerRequestAddress(e.target.value);
    }

    return (
        <div className='flex flex-row flex-wrap' >
            <div className='border-4 border-blue-400 bg-blue-200 rounded-3xl' style={{padding:"2rem"}}>
                <div className='font-bold'>Add Customer</div>
                <TextField
                    id="standard-basic"
                    label="Your Address"
                    placeholder="Enter Your Address"
                    value={customerRequestAddress}
                    onChange={handleUserAddress}
                    variant="standard" style={{ margin: "1em 0" }} />
                <br />
                
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => customerAddFunction()} style={{ marginBottom: "1em 0" }}>
                    Place Request
                </Button>
                <br />
                <p style={{color:"red", fontSize:"bold"}}>Please only make one request for one account, as the account will not function if more than one request is made!</p>
            </div>

        </div>
    )
}

export default CustomerRequest;