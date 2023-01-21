import * as React from 'react';
import Navbar from './components/Navbar';
import NewNavbar from './components/NewNavbar';
import CustomerRequestsView from './pages/CustomerRequestsView';
import MainPage from './pages/MainPage';
import TransactionRecords from './pages/TransactionRecords';


export default function App() {

  return (
    <>
      <Navbar />
      <MainPage />
      <div id="transactionRecords">
        <TransactionRecords />
      </div>
      <CustomerRequestsView />
    </>
  );
}