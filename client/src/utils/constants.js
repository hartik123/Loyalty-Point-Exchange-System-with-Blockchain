import abi from './Loyalty.json';

export const contractABI = abi;
export const contractAddress = '0x3a113BBdcC82aF33dcF7d3E48d9DecFCA4F38E70'

export const getTimeStamp = () => {

    const wordMonth = (intMonth) => {
        {
            switch (intMonth) {
                case 0: return 'Jan';
                case 1: return 'Feb';
                case 2: return 'Mar';
                case 3: return 'Apr';
                case 4: return 'May';
                case 5: return "Jun";
                case 6: return 'Jul';
                case 7: return 'Aug';
                case 8: return 'Sep';
                case 9: return 'Oct';
                case 10: return 'Nov';
                case 11: return 'Dec';
            }
        }
    }

    const tweleveHourFormat = (hour) => {
        const timeHour = hour % 12;
        var returnTime = '';
        if (timeHour == 0) {
            returnTime = '12';
        }
        else if (timeHour < 10) {
            returnTime = '0' + String(timeHour);
        }

        return returnTime
    }

    const formatMinutes = (minute) => {
        if (minute < 10) {
            return '0' + minute;
        }
        return minute;
    }

    const formatSeconds = (second) => {
        if (second < 10) {
            return '0' + second;
        }
        return second;
    }

    const current = new Date();

    const date = `${current.getDate()} ${wordMonth(current.getMonth())} ${current.getFullYear()}`;
    const time = `${tweleveHourFormat(current.getHours())}:${formatMinutes(current.getMinutes())}:${formatSeconds(current.getSeconds())} ${current.getHours() < 12 ? 'am' : 'pm'}`;

    return date + `${' '}` + time;
}
