import React, { useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ConvertPointsSelf from '../components/ConvertPointsSelf';
import TransferPointsToFriend from '../components/TransferPointsToFriend';
import AddUserNetwork from '../components/AddUserNetwork';

const Action = () => {
    const [transactionType, setTransactionType] = useState('intra');

    const changeTransactionType = (type) => {
        setTransactionType(type);
        console.log(type)
    }

    return (
        <div className='bg-blue-100 h-screen'  id="transact">

            
                <div>
                    <h1 className='text-3xl font-semibold text-black text-center'>Transact</h1>

                    {/* Toggling menu */}

                    <div>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={() => { changeTransactionType('adduser'); }}>Add User <br />{'(Add User)'}</Button>
                            <Button onClick={() => { changeTransactionType('intra'); }}>Convert Reward Point <br />{'(Intra Transaction)'}</Button>
                            <Button onClick={() => { changeTransactionType('inter'); }}>Transfer Reward Point to Friend <br /> {'(Inter Transaction)'}</Button>
                        </ButtonGroup>
                    </div>

                    <br />

                    {/* Showing Add user or Left Component or Right Component Based upon Click */}

                    <div className='w-3/4 text-center'>
                        {
                            transactionType === 'adduser' ? <AddUserNetwork /> : transactionType === 'intra' ? <ConvertPointsSelf /> : <TransferPointsToFriend />
                        }
                    </div>
                </div>
            </div>
    )
}

export default Action