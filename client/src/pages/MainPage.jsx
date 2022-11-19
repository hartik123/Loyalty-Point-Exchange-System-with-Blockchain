import React, { useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Profile from '../components/Profile';
import ConvertPointsSelf from '../components/ConvertPointsSelf';
import TransferPointsToFriend from '../components/TransferPointsToFriend';
import { LoyaltyContext } from '../context/LoyaltyContext';
import SendIcon from '@mui/icons-material/Send';
import AddUserNetwork from '../components/AddUserNetwork';
import Action from '../components/Actions';

const MainPage = () => {
    const { connectWallet, currentAccount } = useContext(LoyaltyContext);
    const [transactionType, setTransactionType] = useState('intra');

    const changeTransactionType = (type) => {
        setTransactionType(type);
        console.log(type)
    }

    return (
        <div className='bg-blue-100 h-screen'>

            {
                !currentAccount && (<Button variant="contained" endIcon={<SendIcon />} onClick={connectWallet}>
                    Connect Wallet
                </Button>)
            }
            <div className='flex flex-col flex-wrap justify-evenly md:flex-row flex-even'>
                <div className='w-1/4 text-center' id="profile">
                    {/* Profile Section */}

                    <Profile />
                </div>

                <Action />
            </div>
        </div>
    )
}

export default MainPage