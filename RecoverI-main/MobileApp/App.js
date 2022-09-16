import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './app/components/context/GlobalState'

import { StyleSheet } from 'react-native';

import ClientScreen from './app/components/screen/ClientScreen'
import OTPScreen from './app/components/screen/OTPScreen'
import Screen from './app/components/Screen';

import RecoveryScreen from './app/components/screen/RecoveryScreen';
import AuthNavigator from './app/components/navigation/AuthNavigator';
import AddMemberScreen from './app/components/screen/AddMemberScreen';
import RegisterScreen from './app/components/screen/RegisterScreen';
import LoginScreen from './app/components/screen/LoginScreen';
import { StoreProvider } from './app/components/screen/GlobalState';
import AdminHomeScreen from './app/components/screen/AdminHomeScreen';
import WelcomeScreen from './app/components/screen/WelcomeScreen';
import TransferScreen from './app/components/screen/TransferScreen';
import CashierHomeScreen from './app/components/screen/CashierHomeScreen';
import RiderHomeScreen from './app/components/screen/RiderHomeScreen';
import TopButtons from './app/components/screen/TopButtons';
import SummaryScreen from './app/components/screen/SummaryScreen';
import ClientFormScreen from './app/components/screen/ClientFormScreen';
import HomeScreen from './app/components/screen/HomeScreen';
import PaymentScreen from './app/components/screen/PaymentScreen';
import RiderAssignScreen from './app/components/screen/RiderAssignScreen';
import DetailScreen from './app/components/screen/DetailScreen';



export default function App() {
  const [Role, setRole] = useState([])
  const [ClientId, setClientId] = useState([])

  console.log(Role, "Set GolbalState Data");

  return (
    // <Screen>
    // <AddMemberScreen/>
    // <AdminHomeScreen/>
    // <CashierHomeScreen/>
    // <ClientFormScreen/>
    // <ClientScreen/>
    // <HomeScreen/>
    // <PaymentScreen/>
    // <RecoveryScreen/>
    // <RiderAssignScreen/>
    // <RiderHomeScreen/>
    // <SummaryScreen/>
    //  <TransferScreen/>

    // <DetailScreen/>


    // <WelcomeScreen/>
    //  <RegisterScreen/> 
    // <LoginScreen/>

    // <RiderHomeScreen/>
    // <OTPScreen/>
    // <TopButtons/>

    // <StoreProvider value={{ Role, setRole }}>
    //   <NavigationContainer>
    //     <AuthNavigator />
    //   </NavigationContainer>
    // </StoreProvider>

    <StoreProvider value={{ Role, setRole, ClientId, setClientId }}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </StoreProvider>


  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})