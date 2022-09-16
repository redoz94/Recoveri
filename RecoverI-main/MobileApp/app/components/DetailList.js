import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';

import { DataTable } from 'react-native-paper';
import AppText from './AppText';

function DetailList({ nature, from, to, amounts,createdOn }) {

    const [date, setDate] = useState("Date");
    const [fromName, setFromName] = useState("");
    const [toName, setToName] = useState("");
    const [amount, setAmount] = useState(0,9);

    useEffect(() => {
        console.log("forCreatedOn",typeof(createdOn),createdOn);
        setDate(createdOn.substring(0,9));
        setAmount(amounts[0]);
        if(nature=='Collection'){
            forCollection();

        }else if(nature=='Internal Transfer'){
            forInternalTransfer();

        }
       

    }, [])
     function forCollection(){
        axios({

            method: "post",
            url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
            data: {
                ClientObjectId:from,
                EmployeeObjectId: to
            }

        }).then((res) => {

            console.log(res.data, "in collection API");
            setFromName(res.data.Client[0].ClientName);
            setToName(res.data.Employee[0].employeeName)

        }).catch((error) => {
            console.error(error);

        });
     }
     function forInternalTransfer(){
        //for from
        axios({

            method: "post",
            url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
            data: {
                
                EmployeeObjectId: from
            }

        }).then((res) => {

            console.log(res.data, "in Internal Transfer from API");
            setFromName(res.data.Employee[0].employeeName);
           

        }).catch((error) => {
            console.error("Error in Internal transfer from ",error);

        });
        //for to
        axios({

            method: "post",
            url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
            data: {
                
                EmployeeObjectId: to
            }

        }).then((res) => {

            console.log(res.data, "in Internal Transfer to API");
            setToName(res.data.Employee[0].employeeName)
            setDate()

        }).catch((error) => {
            console.error("Error in Internal transfer to ",error);

        });
     }
    return (
        
            <DataTable.Row style={{width: '100%'}}>
                <DataTable.Cell style={{width: 80}}>{date}</DataTable.Cell>
                <DataTable.Cell style={{width: 130}}>{nature}</DataTable.Cell>
                <DataTable.Cell style={{width: 120}}>{fromName}</DataTable.Cell>
                <DataTable.Cell style={{width: 120}}>{toName}</DataTable.Cell>
                <DataTable.Cell style={{width: 100, justifyContent: 'flex-end', paddingRight: 10 }}>{amount}</DataTable.Cell>
            </DataTable.Row>
        
        

    );
}

export default DetailList;