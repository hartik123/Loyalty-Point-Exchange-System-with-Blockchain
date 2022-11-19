import React, {useState, useContext} from 'react'
import TransactionCard from '../components/TransactionCard';
import { LoyaltyContext } from '../context/LoyaltyContext';

const TransactionRecords = () => {

  const {transactionRecords} = useContext(LoyaltyContext);

  const [transactions, setTransactions] = useState([
    {
      sender_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      receiver_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      source_company_name: 'Amazon',
      destination_company_name: 'Flipkart',
      reward_points: 50,
      TimeStamp: "y4874984"
    },
    {
      sender_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      receiver_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      source_company_name: 'Amazon',
      destination_company_name: 'Flipkart',
      reward_points: 40,
      TimeStamp: "y4874984"
    },
    {
      sender_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      receiver_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      source_company_name: 'Amazon',
      destination_company_name: 'Flipkart',
      reward_points: 30,
      TimeStamp: "y4874984"
    },
    {
      sender_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      receiver_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      source_company_name: 'Amazon',
      destination_company_name: 'Flipkart',
      reward_points: 50,
      TimeStamp: "y4874984"
    },
    {
      sender_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      receiver_address: '0x9AaE6b198168bE69c97dCA9c3abB2be6b4c05Ca5',
      source_company_name: 'Amazon',
      destination_company_name: 'Flipkart',
      reward_points: 50,
      TimeStamp: "y4874984"
    }
  ]);

  return (
    <div className='bg-green-200'>
      <h1 className='text-3xl font-semibold text-black text-center'>Transaction Records</h1>
      <div className='flex flex-row flex-wrap'>
      {
        [...transactionRecords].reverse().map((transaction, index) => {
          return (
            <TransactionCard transaction={transaction} key={index}/>
          )
        }

        )
      }
      </div>
    </div>
  )
}

export default TransactionRecords;