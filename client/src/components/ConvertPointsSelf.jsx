import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import { LoyaltyContext } from '../context/LoyaltyContext'
import { useEffect } from 'react';

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

const ConvertPointsSelf = () => {

    const { connectWallet, currentAccount, userAddress, setUserAddress, addUserTransaction, formData, setFormData, convertPointTransaction, allPoints } = useContext(LoyaltyContext);

    const [sourceCompany, setSourceCompany] = React.useState('amazon');

    const [destinationCompany, setDestinationCompany] = React.useState('amazon');

    // const handleSourceCompanyChange = (e) => {
    //     setSourceCompany(e.target.value);
    //     setFormData({
    //         ...formData,
    //         sourceCompany: e.target.value
    //     });
    // };

    // const handleDestinationCompanyChange = (e) => {
    //     setDestinationCompany(e.target.value);
    //     setFormData({
    //         ...formData,
    //         destinationCompany: e.target.value
    //     });
    // };

    // const changeCompanyPoints = (e) => {
    //     setCompanyPoints(e.target.value)
    //     setFormData({
    //         ...formData,
    //         companyPoints: e.target.value
    //     });
    // }

    const handleConvertPoints = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }



    const submitConvertPoint = (e) => {
        e.preventDefault();

        if (!formData.companyPoints) {
            alert('Please Enter Company Points')
        }
        convertPointTransaction();
    }

    const handleUserAddress = (e) => {
        setUserAddress(e.target.value);
    }

    const changeConvertCompanyPoint = (percentageConvertCompanyPoint) =>{
        var point;
        if(formData.sourceCompany == 'amazon'){
            point = (allPoints.amazon * percentageConvertCompanyPoint) / 100;
        }
        else if(formData.sourceCompany == 'flipkart'){
            point = (allPoints.flipkart * percentageConvertCompanyPoint) / 100;
        }
        else{
            point = (allPoints.myntra * percentageConvertCompanyPoint) / 100;
        }

        setFormData({
            ...formData, companyPoints: point
        })
    }

    return (
        <div className='border-4 border-blue-400 bg-blue-200 rounded-3xl'>
            <div>
                <div>Convert Points to Self</div>
                <br />
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
                            id="standard-select-currency"
                            select
                            label="Source Company Name"
                            name="sourceCompany"
                            value={formData.sourceCompany}
                            onChange={handleConvertPoints}
                            helperText="Please select Source Company Name"
                        >
                            {companies.map((company) => (
                                <MenuItem key={company.name} value={company.name}>
                                    {company.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="standard-select-company"
                            select
                            label="Destination Company Name"
                            name="destinationCompany"
                            value={formData.destinationCompany}
                            onChange={handleConvertPoints}
                            helperText="Please select Destination Company Name"
                        >
                            {companies.map((company) => (
                                <MenuItem key={company.name} value={company.name}>
                                    {company.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <br />

                        <div>
                        <TextField
                            id="standard-basic"
                            label="Company Points"
                            placeholder='Enter Company Point'
                            type="number"
                            name="companyPoints"
                            value={formData.companyPoints}
                            onChange={handleConvertPoints}
                            min={0}
                            variant="standard" />
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => { changeConvertCompanyPoint(25);}}>25%</Button>
                            <Button onClick={() => { changeConvertCompanyPoint(50);}}>50%</Button>
                            <Button onClick={() => { changeConvertCompanyPoint(100);}}>100%</Button>
                        </ButtonGroup>
                        </div>
                        <br />

                        <Button variant="contained" endIcon={<SendIcon />} onClick={submitConvertPoint}>
                            Convert Points
                        </Button>
                    </Box>
                </div>
            </div>

        </div>

    )
}

export default ConvertPointsSelf