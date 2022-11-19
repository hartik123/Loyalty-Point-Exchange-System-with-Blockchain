import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { LoyaltyContext } from '../context/LoyaltyContext'

const companies = [
    {
        name: 'amazon',
        label: 'Amazon',
    },
    {
        name: 'flipkart',
        label: 'Flipkart',
    },
    {
        name: 'myntra',
        label: 'Myntra',
    }
];

const TransferPointsToFriend = () => {

    const { connectWallet, currentAccount, initialPoints, setInitialPoints, userAddress, setUserAddress, addUserTransaction, formData, setFormData, convertPointTransaction, transferFormData, setTransferFormData, transferPointTransaction, transactionRecords, allPoints, getTimeStamp } = useContext(LoyaltyContext);

    // const [receiverAddress, setReceiverAddress] = useState('');

    // const [sourceCompany, setSourceCompany] = React.useState('amazon');

    // const [companyPoints, setCompanyPoints] = useState(0);


    // const handleReceiverAddress = (e) => {
    //     setReceiverAddress(e.target.value);
    //     setTransferFormData({ ...transferFormData, receiverAddress: e.target.value });
    // }

    // const handleSourceCompanyChange = (e) => {
    //     setSourceCompany(e.target.value);
    //     setTransferFormData({ ...transferFormData, sourceCompany: e.target.value });
    // };

    // const changeCompanyPoints = (e) => {
    //     setCompanyPoints(e.target.value)
    //     setTransferFormData({ ...transferFormData, companyPoints: e.target.value });
    //     console.log(companyPoints)
    // }

    const handleTransferPoints = (e) => {
        setTransferFormData({
            ...transferFormData, [e.target.name]: e.target.value
        })
    }




    const changeTransferCompanyPoint = (percentageConvertCompanyPoint) => {
        var point;
        if (transferFormData.sourceCompany == 'amazon') {
            point = (allPoints.amazon * percentageConvertCompanyPoint) / 100;
        }
        else if (transferFormData.sourceCompany == 'flipkart') {
            point = (allPoints.flipkart * percentageConvertCompanyPoint) / 100;
        }
        else {
            point = (allPoints.myntra * percentageConvertCompanyPoint) / 100;
        }

        setTransferFormData({
            ...transferFormData, companyPoints: point
        })
    }

    const submitTransferPoint = (e) => {

        const {
            receiverAddress,
            sourceCompany,
            companyPoints
        } = transferFormData;

        e.preventDefault();

        // if (!receiverAddress || !sourceCompany || !companyPoints) return;
        console.log(transferFormData)
        if (!receiverAddress) {
            alert('Please Enter Receiver Address')
            return;
        }
        else if (!companyPoints) {
            alert('Please Enter Points to Transfer')
            return;
        }

        transferPointTransaction();
    }

    return (
        <div className='border-4 border-blue-400 bg-blue-200 rounded-3xl'>

            <div>
                <div>TransferPointsToFriend</div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField
                            id="standard-basic"
                            label="Receiver Address"
                            name="receiverAddress"
                            value={transferFormData.receiverAddress}
                            onChange={handleTransferPoints}
                            variant="standard" />
                        <br />
                        <TextField
                            id="standard-select-company"
                            select
                            label="Source Company Name"
                            name="sourceCompany"
                            value={transferFormData.sourceCompany}
                            onChange={handleTransferPoints}
                            helperText="Please select Company Name"
                        >
                            {companies.map((company) => (
                                <MenuItem key={company.name} value={company.name}>
                                    {company.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <br />

                        <TextField
                            id="standard-basic"
                            label="Company Points"
                            name="companyPoints"
                            type="number"
                            value={transferFormData.companyPoints}
                            onChange={handleTransferPoints}
                            variant="standard" />
                        <br />
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => { changeTransferCompanyPoint(25); }}>25%</Button>
                            <Button onClick={() => { changeTransferCompanyPoint(50); }}>50%</Button>
                            <Button onClick={() => { changeTransferCompanyPoint(100); }}>100%</Button>
                        </ButtonGroup>
                        <br />

                        <Button variant="contained" endIcon={<SendIcon />} onClick={submitTransferPoint}>
                            Transfer Points
                        </Button>
                    </Box>
                </div>
            </div>

        </div>

    )
}

export default TransferPointsToFriend