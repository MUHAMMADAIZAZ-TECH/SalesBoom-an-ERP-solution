import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
       flexDirection: "row",
        justifyContent: "flex-start"

    }, Container: {
        flexDirection: "row",
         justifyContent: "space-between"
 
     },
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 200
    },
    billTo: {
        width: 200,
        fontWeight:"bold",
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const BillTo = ({invoice}) => (
      <>
      <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Invoice No: {invoice.InvoiceNo}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.invoiceDate}>Date: {invoice.Date} </Text>
            </View>
      <View style={styles.Container}>
    <View>
    <View style={styles.invoiceDateContainer}>
    <Text style={styles.billTo}>Billing from,</Text>
    </View >
     <View style={styles.headerContainer}>
        <Text>ABC Production Company</Text>
    </View>
    <View style={styles.headerContainer}>
        <Text>Sharahe faisal</Text>
    </View>
    <View style={styles.headerContainer}>
        <Text>021-23434334-2</Text>
    </View>
    <View style={styles.headerContainer}>
        <Text>ABC@gmail.com</Text>
    </View>
    </View>
   <View>
   <View style={styles.invoiceDateContainer}>
    <Text style={styles.billTo}>Billing to,</Text>
    </View >
    <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>Name: {invoice.Name}</Text>
    </View >        
    <View style={styles.invoiceDateContainer}>
    <Text style={styles.label}>Address:  {invoice.Address}</Text>
    </View >
    <View style={styles.invoiceDateContainer}>
    <Text style={styles.label}>Email:  {invoice.Email} </Text>
    </View >
    <View style={styles.invoiceDateContainer}>
    <Text style={styles.label}>PaymentType:  {invoice.PaymentType}</Text>
    </View >
    <View style={styles.invoiceDateContainer}>
    <Text style={styles.label}>Phone:  {invoice.Phone}</Text>
    </View >
   </View>
      </View>
      </>
  );
  
  export default BillTo