import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '15%',
    },
    row2: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description2: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total2: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

const InvoiceTableBlankSpace = ({rowsCount,invoice}) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map( (x, i) => 
        <View style={styles.row} key={`BR${i}`}>
             <Text style={styles.qty}>-</Text>
            <Text style={styles.description}>-</Text>
            <Text style={styles.qty}>-</Text>
            <Text style={styles.rate}>-</Text>
            <Text style={styles.rate}>-</Text>
            <Text style={styles.amount}>-</Text>
        </View>
    )
    return (
    <Fragment>{rows}
    <View style={styles.row2}>
           <Text style={styles.description2}>SubTotal</Text>
            <Text style={styles.total2}>{ invoice.invoiceSubtotal}</Text>
    </View>
    <View style={styles.row2}>
           <Text style={styles.description2}>tax {invoice.taxrate}%</Text>
            <Text style={styles.total2}>{ invoice.invoiceTaxes}</Text>
    </View>
    <View style={styles.row2}>
           <Text style={styles.description2}>Previous Balance</Text>
            <Text style={styles.total2}>{ invoice.PreviousBalance}</Text>
    </View>
    <View style={styles.row2}>
            <Text style={styles.description2}>TOTAL</Text>
            <Text style={styles.total2}>{ invoice.invoiceTotal}</Text>
            </View>
    </Fragment> )
};
  
export default InvoiceTableBlankSpace

