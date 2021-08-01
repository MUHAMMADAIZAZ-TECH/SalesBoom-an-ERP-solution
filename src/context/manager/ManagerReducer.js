import {
  SETINVOICETABLE,SETINVOICEDATA,SETOPENPDF,CREATE_PURCHASE,
    GET_PURCHASE_INVOICE,GET_INV_KEY,ADD_SUPLIER,GET_SUPLIERS,GET_CATEGORIES,ADD_PRODUCT,
    ADD_CUSTOMER,GET_CUSTOMER,
    CREATE_SALES,GET_SALES_INVOICE,GET_S_KEY,
    ADD_CATEGORIES,GET_PRODUCTS,DASHBOARD
} from '../Type'

export default (state, action) => {
    switch (action.type) {
        case CREATE_SALES : {
            const data = action.payload;
          return{
            ...state,SalesInvoice: data
            }
          }
          case DASHBOARD : {
            const data = action.payload;
          return{
            ...state,Dashboard: data
            }
          }
          case GET_CUSTOMER : {
            const data = action.payload;
          return{
            ...state,customersList: data
            }
          }
          case ADD_CUSTOMER : {
            const data = action.payload;
          return{
            ...state,customers: data
            }
          }
          case ADD_PRODUCT : {
            const data = action.payload;
          return{
            ...state,products: data
            }
          }
          case GET_PRODUCTS : {
            const data = action.payload;
          return{
            ...state,productList: data
            }
          }
          case ADD_CATEGORIES : {
            const data = action.payload;
          return{
            ...state,categories: data
            }
          }
          case GET_CATEGORIES : {
            const data = action.payload;
          return{
            ...state,categorieslist: data
            }
          }
          case GET_SUPLIERS : {
            const data = action.payload;
          return{
            ...state,supliersList: data
            }
          }
          case ADD_SUPLIER : {
            const data = action.payload;
          return{
            ...state,supliers: data
            }
          }
          case GET_INV_KEY : {
            const data = action.payload;
          return{
            ...state,Inv_key: data
            }
          }
          case GET_S_KEY : {
            const data = action.payload;
          return{
            ...state,S_Inv_key: data
            }
          }
          case SETINVOICETABLE : {
            const data = action.payload;
          return{
            ...state,InvoiceDetails: data
            }
          }
          case  GET_PURCHASE_INVOICE : {
            const data = action.payload;
          return{
            ...state,PurchaseInvoicesList: data
            }
          }
          case  GET_SALES_INVOICE : {
            const data = action.payload;
          return{
            ...state,SalesInvoicesList: data
            }
          }
          case CREATE_PURCHASE : {
            const data = action.payload;
          return{
            ...state,PurchaseInvoice: data
            }
          }
          case SETINVOICEDATA : {
            const data = action.payload;
          return{
            ...state,Invoicedata: data
            }
          }
          case SETOPENPDF : {
            const data = action.payload;
          return{
            ...state,openPdf: data
            }
          }
        default:    
            return state;
    }
};