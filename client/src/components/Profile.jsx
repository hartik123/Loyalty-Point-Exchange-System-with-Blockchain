import React, {useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { LoyaltyContext } from '../context/LoyaltyContext';
import { shortenAddress } from '../utils/shortenAddress';
import { TextField } from '@mui/material';

const Profile = () => {

    const {currentAccount, allPoints} = useContext(LoyaltyContext);

    const ShowData = ({ textMsg }) => {
        return (
            <Typography variant="h6" gutterBottom>
                {textMsg}
            </Typography>
        )
    }


    return (
        <div className='border-4 border-blue-400 bg-blue-200 rounded-3xl'>
                  <h1 className='text-3xl font-semibold text-black text-center'>Profile</h1>
            <div style={{margin: '1em auto 0'}}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>HS</Avatar>
            </div>
            {/* <Typography variant="h4" gutterBottom>
                Hartik Suhagiya
            </Typography> */}
            {/* <ShowData textMsg="0xAb8....835cb2" /> */}
            <ShowData textMsg={`${shortenAddress(currentAccount)}`} />
            <ShowData textMsg={`Total Points: ${parseInt(allPoints.amazon)+parseInt(allPoints.flipkart)+parseInt(allPoints.myntra)}`} />
            <ShowData textMsg={`Amazon: ${allPoints.amazon}`} />
            <ShowData textMsg={`Flipkart: ${allPoints.flipkart}`} />
            <ShowData textMsg={`Myntra: ${allPoints.myntra}`} />
        </div>
    )
}

export default Profile