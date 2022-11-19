import React, { useContext } from 'react'
import { shortenAddress } from '../utils/shortenAddress';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import { LoyaltyContext } from '../context/LoyaltyContext';

const TransactionCard = ({ transaction }) => {

    const { currentAccount } = useContext(LoyaltyContext);
    // const sender_address = shortenAddress(transaction.sender_address);
    // const receiver_address = shortenAddress(transaction.receiver_address);

    const send_add = transaction.sender_address
    const receive_add = transaction.receiver_address
    return (

        <div className='border-4 border-green-400 bg-green-200 rounded-2xl m-2' style={{ width: "400px" }}>

            <div className='m-3'>
                <div className='flex flex-row flex-wrap justify-between'>
                    <div>
                        <div>Sender address: {shortenAddress(transaction.sender_address)}</div>
                        <div>Destination address: {shortenAddress(transaction.receiver_address)}</div>
                    </div>
                    <div>{
                        transaction.sender_address == transaction.receiver_address
                            ? <RefreshSharpIcon />
                            : transaction.sender_address.toLowerCase() == currentAccount
                                ? <CallMadeIcon />
                                : <CallReceivedIcon />
                    }</div>
                </div>
                <div>Sender company: {transaction.source_company_name}</div>
                <div>Destination company: {transaction.destination_company_name}</div>
                <div>Company Points: {transaction.reward_points}</div>
                <div>Time Stamp: {transaction.TimeStamp}</div>
            </div>
        </div>
    )
}

export default TransactionCard