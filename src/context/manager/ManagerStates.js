import React, { useContext, useReducer } from 'react';
import ManagerContext from './ManagerContext';
import ManagerReducer from './ManagerReducer';
import AuthContext from '../auth/AuthContext';
import AlertContext from '../alerts/AlertContext';
import Database from '../../config/Database';
// axios
//firebase
import {
    CREATE_PURCHASE,
    SETINVOICETABLE,SETINVOICEDATA,SETOPENPDF,
    GET_PURCHASE_INVOICE,
    GET_INV_KEY,ADD_SUPLIER,GET_SUPLIERS,GET_CATEGORIES,
    ADD_CATEGORIES,
    ADD_PRODUCT,
    GET_PRODUCTS,
    ADD_CUSTOMER,GET_CUSTOMER,GET_S_KEY,
    CREATE_SALES,GET_SALES_INVOICE,
} from '../Type';
import { useEffect } from 'react';

const ManagerStates = props => {
    const initialState = {
        Inv_key: null,
        InvoiceDetails:{},
        Invoicedata:{},
        PurchaseInvoicesList: null,
        PurchaseInvoice:null,
        SalesInvoicesList: null,
        SalesInvoice:null,
        openPdf : false,
        P_Inv:null,
        supliers: null,
        supliersList: null,
        customers: null,
        customersList: null,
        categories:null,
        categorieslist: null,
        products:null,
        productList:null,
    };

    const authContext = useContext(AuthContext);
    const {
        user,
        currentDate,
        objectToArray
    } = authContext;

    const alertContext = useContext(AlertContext);
    const {
        setMessage,
        toggleLoading
    } = alertContext;

    const [state, dispatch] = useReducer(ManagerReducer, initialState);
    const InvoiceTable = (Data) =>{
        dispatch ({
          type: SETINVOICETABLE,
          payload : Data
        })
      }
    const InvoiceData = (Data) =>{
        dispatch ({
          type: SETINVOICEDATA,
          payload : Data
        })
      }
    const setOpenPdf = (Data) =>{
        dispatch ({
          type: SETOPENPDF,
          payload : Data
        })
      }
 //purchaseinvoice
    const createPurchaseInvoice = (data) => {
        console.log(data)
        Database.database().ref(`/organizations/${user.softwareHouseKey}/purchaseinvoice/${data.InvoiceNo}`).set(data)
        .then(res => {            
            setMessage('Invoice Created', 'success')
            dispatch({ type: CREATE_PURCHASE, payload: data });
        })   

    };
    const EditInvoice = (key,value) =>{
        Database.database().ref(`/organizations/${user.softwareHouseKey}/purchaseinvoice`).child(key).update(value)
            .then(res => {            
                setMessage('Project Updated', 'success')
            })
            .catch(err => setMessage(err.code, 'error'));
    }

    const deletePurchaseInvoices = (key) => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/purchaseinvoice/${key}`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const deleteAllPurchaseInvoices = (key) => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/purchaseinvoice`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const getPurchaseInvoices = async    () => {
        try {
             await Database.database().ref(`/organizations/${user.softwareHouseKey}/purchaseinvoice`).on("value", snapshot => {
                let No = []
                let p_inv = []
                let InvoiceList = []
                snapshot.forEach((item) => {
                    let key = item.key;
                    let data = item.val();
                    p_inv.push(key)
                    let num = key.split(/(\d+)/)
                    No.push(num[1])
                    InvoiceList.push({
                    id:key,
                    InvoiceNo: data.InvoiceNo,
                    ProductsDetails:data.ProductsDetails,
                    taxrate:data.taxrate,
                    invoiceTaxes:data.invoiceTaxes,
                    invoiceSubtotal: data.invoiceSubtotal,
                    invoiceTotal:data.invoiceTotal,
                    Name: data.Name,
                    Email: data.Email,
                    Phone: data.Phone,
                    Address: data.Address,
                    PaymentType: data.PaymentType,
                    PreviousBalance: data.PreviousBalance,
                    SubmissionDate: data.SubmissionDate,
                    Date: data.Date,
                    });
                
                });
                   GenrateSalesKey(p_inv,No)
                   dispatch({ type: GET_PURCHASE_INVOICE, payload: InvoiceList });
            });
            } catch (error) {
            console.log(error.message)
            }
     
    };
 //salesinvoice
 const createSalesInvoice = (data) => {
    console.log(data)
    Database.database().ref(`/organizations/${user.softwareHouseKey}/salesinvoice/${data.InvoiceNo}`).set(data)
    .then(res => {            
        setMessage('Invoice Created', 'success')
        dispatch({ type: CREATE_SALES, payload: data });
    })   

};
const EditSalesInvoice = (key,value) =>{
    Database.database().ref(`/organizations/${user.softwareHouseKey}/salesinvoice`).child(key).update(value)
        .then(res => {            
            setMessage('Project Updated', 'success')
        })
        .catch(err => setMessage(err.code, 'error'));
}

const deleteSalesInvoice = (key) => {
    Database.database().ref(`/organizations/${user.softwareHouseKey}/salesinvoice/${key}`).remove()
        .then(() => {
        setMessage('Project Deleted', 'success')
        }).catch(err => {
        setMessage('some error', 'error')
    })
}
const deleteAllSalesInvoice = (key) => {
    Database.database().ref(`/organizations/${user.softwareHouseKey}/salesinvoice`).remove()
        .then(() => {
        setMessage('Project Deleted', 'success')
        }).catch(err => {
        setMessage('some error', 'error')
    })
}
const getSalesInvoice = async    () => {
    try {
        await Database.database().ref(`/organizations/${user.softwareHouseKey}/salesinvoice`).on("value", snapshot => {
            let No = []
            let p_inv = []
            let InvoiceList = []
            snapshot.forEach((item) => {
                let key = item.key;
                let data = item.val();
                p_inv.push(key)
                let num = key.split(/(\d+)/)
                No.push(num[1])
                InvoiceList.push({
                id:key,
                InvoiceNo: data.InvoiceNo,
                ProductsDetails:data.ProductsDetails,
                taxrate:data.taxrate,
                invoiceTaxes:data.invoiceTaxes,
                invoiceSubtotal: data.invoiceSubtotal,
                invoiceTotal:data.invoiceTotal,
                Name: data.Name,
                Email: data.Email,
                Phone: data.Phone,
                Address: data.Address,
                PaymentType: data.PaymentType,
                PreviousBalance: data.PreviousBalance,
                SubmissionDate: data.SubmissionDate,
                Date: data.Date,
                });
            
            });
               GenrateSalesKey(p_inv,No)
                 dispatch({ type: GET_SALES_INVOICE, payload: InvoiceList });
        });
        } catch (error) {
        console.log(error.message)
        }
};
    //suplier
    const addSupliers = (data) => {
        console.log(data)
        Database.database().ref(`/organizations/${user.softwareHouseKey}/supliers`).push(data)
        .then(res => {            
            setMessage('Invoice Created', 'success')
            dispatch({ type: ADD_SUPLIER, payload: data });
        })   

    };
    const deleteSuplier  = (key) => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/supliers/${key}`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const EditSuplier = (key,value) =>{
        Database.database().ref(`/organizations/${user.softwareHouseKey}/supliers`).child(key).update(value)
            .then(res => {            
                setMessage('Project Updated', 'success')
            })
            .catch(err => setMessage(err.code, 'error'));
    }
    const deleteAllSupliers = () => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/supliers`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const getSupliers = async () => {
        try {
            await Database.database().ref(`/organizations/${user.softwareHouseKey}/supliers`).on("value", snapshot => {
       let Supliers = []
       snapshot.forEach((item) => {
        let key = item.key;
        let data = item.val();
        Supliers.push({
          id: key,
          Name: data.Name,
          Email: data.Email,
          Phone: data.Phone,
          Address: data.Address,
          Country: data.Country,
          City: data.City,
          PreviousBalance: data.PreviousBalance,
        });
      });
     dispatch({ type: GET_SUPLIERS, payload: Supliers });
            });
            } catch (error) {
            console.log(error.message)
            }
  
    };
    //Customer
    const addCustomers = (data) => {
        console.log(data)
        Database.database().ref(`/organizations/${user.softwareHouseKey}/customers`).push(data)
        .then(res => {            
            setMessage('Invoice Created', 'success')
            dispatch({ type: ADD_CUSTOMER, payload: data });
        })   

    };
    const deleteCustomer  = (key) => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/customers/${key}`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const EditCustomer = (key,value) =>{
        Database.database().ref(`/organizations/${user.softwareHouseKey}/customers`).child(key).update(value)
            .then(res => {            
                setMessage('Project Updated', 'success')
            })
            .catch(err => setMessage(err.code, 'error'));
    }
    const deleteAllCustomers = () => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/customers`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const getCustomers = async () => {
        try {
            await Database.database().ref(`/organizations/${user.softwareHouseKey}/customers`).on("value", snapshot => {
         let Customers = []
         snapshot.forEach((item) => {
            let key = item.key;
            let data = item.val();
            Customers.push({
              id: key,
              Name: data.Name,
              Email: data.Email,
              Phone: data.Phone,
              Address: data.Address,
              Country: data.Country,
              City: data.City,
              PreviousBalance: data.PreviousBalance,
            });
          });
         dispatch({ type: GET_CUSTOMER, payload: Customers });
            });
            } catch (error) {
            console.log(error.message)
            }
  
    };
    //category
    const addCategories = (data) => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/categories`).push(data)
        .then(res => {            
            setMessage('Invoice Created', 'success')
            dispatch({ type: ADD_CATEGORIES, payload: data });
        })   

    };
  
    const deleteCategory  = (key) => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/categories/${key}`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const EditCategory = (key,value) =>{
        Database.database().ref(`/organizations/${user.softwareHouseKey}/categories`).child(key).update(value)
            .then(res => {            
                setMessage('Project Updated', 'success')
            })
            .catch(err => setMessage(err.code, 'error'));
    }
    const deleteAllCategories = () => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/categories`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const getCategories = async () => {
        try {
            await Database.database().ref(`/organizations/${user.softwareHouseKey}/categories`).on("value", snapshot => {
            let Categories = []
            snapshot.forEach((item) => {
                let key = item.key;
                let data = item.val();
                Categories.push({
                  id: key,
                  Category: data.Category,
                  Status: data.Status,
                });
              });
             dispatch({ type: GET_CATEGORIES, payload: Categories });
           
            });
            
            } catch (error) {
            console.log(error.message)
            }
  
    };
    //products

    const AddProducts = (data) =>{
        Database.database().ref(`/organizations/${user.softwareHouseKey}/products`).push(data)
        .then(res => {            
            setMessage('Invoice Created', 'success')
            dispatch({ type: ADD_PRODUCT, payload: data });
        })  
    }
    const deleteProducts  = (key) => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/products/${key}`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const EditProducts = (key,value) =>{
        Database.database().ref(`/organizations/${user.softwareHouseKey}/products`).child(key).update(value)
            .then(res => {            
                setMessage('Project Updated', 'success')
            })
            .catch(err => setMessage(err.code, 'error'));
    }
    const deleteAllProducts = () => {
        Database.database().ref(`/organizations/${user.softwareHouseKey}/products`).remove()
            .then(() => {
            setMessage('Project Deleted', 'success')
            }).catch(err => {
            setMessage('some error', 'error')
        })
    }
    const getProducts = async () => {
        try {
            await Database.database().ref(`/organizations/${user.softwareHouseKey}/products`).on("value", snapshot => {
            let Products = []
            snapshot.forEach((item) => {
                let key = item.key;
                let data = item.val();
                Products.push({
                    id: key,
                    ProductName: data.ProductName,
                    Model: data.Model,
                    SalePrice: data.SalePrice,
                    Category: data.Category,
                    ProductDetail: data.ProductDetail,
                    Suplier: data.Suplier,
                    SuplierPrice: data.SuplierPrice
                });
              });
             dispatch({ type: GET_PRODUCTS, payload: Products });
           
            });
            
            } catch (error) {
            console.log(error.message)
            }
    };
    const GenrateInvoiceKey = (Invoice,PUR) =>{
        var InvoiceNo = 0
        const max = Math.max(...PUR);
        if(Invoice.length===0){
           InvoiceNo = "Inv-1";
        }
        if(Invoice.length>0){
          var lastitem = Invoice[Invoice.length - 1]
          const split_string = lastitem.split(/(\d+)/)
          const convert = split_string[1]
          const lastvalue = Number(convert)
          if(Invoice.length===lastvalue){
            var last = Invoice.length +1;
            InvoiceNo  = "Inv-" + last;
          }
          else if (max!==lastvalue){
            var lastnumber = max +1
           InvoiceNo = "Inv-" + lastnumber;
          }
          else{
            var lastnum = lastvalue +1;
          InvoiceNo = "Inv-" + lastnum;
          }
        }
        return  dispatch({ type: GET_INV_KEY, payload: InvoiceNo });;
     
      }
      const GenrateSalesKey = (Invoice,PUR) =>{
        var InvoiceNo = 0
        const max = Math.max(...PUR);
        if(Invoice.length===0){
           InvoiceNo = "Inv-1";
        }
        if(Invoice.length>0){
          var lastitem = Invoice[Invoice.length - 1]
          const split_string = lastitem.split(/(\d+)/)
          const convert = split_string[1]
          const lastvalue = Number(convert)
          if(Invoice.length===lastvalue){
            var last = Invoice.length +1;
            InvoiceNo  = "Inv-" + last;
          }
          else if (max!==lastvalue){
            var lastnumber = max +1
           InvoiceNo = "Inv-" + lastnumber;
          }
          else{
            var lastnum = lastvalue +1;
          InvoiceNo = "Inv-" + lastnum;
          }
        }
        return dispatch({ type: GET_S_KEY, payload: InvoiceNo });
      }
      const GetAll = () =>{
        getProducts()
        getCustomers()
        getCategories()
        getSalesInvoice()
        getPurchaseInvoices()
        getSupliers()
      }
      const DashboardCalculations = async( ) =>{
        GetAll()
        const object = {
            TotalCategory:state.categorieslist.length,
            TotalProducts:state.productList.length,
            TotalSaleInvoice:state.SalesInvoicesList.length,
            TotalPurchaseInvoice:state.PurchaseInvoicesList.length,
            TotalCustomers:state.customersList.length,
            TotalSupliers:state.supliersList.length
        }
        console.log(object)
      }
      function subtotal(items) {
        return {
           Total: items.map(({ invoiceTotal }) => invoiceTotal).reduce((invoiceTotal, i) => invoiceTotal + i, 0),
           TotalTax :items.map(({ invoiceTaxes }) => invoiceTaxes).reduce((invoiceTaxes, i) => invoiceTaxes + i, 0),
           length: items.length
        };
      }
     return (
        <ManagerContext.Provider
            value={{
                Invoicedata: state.Invoicedata,
                InvoiceDetails: state.InvoiceDetails,

                openPdf: state.openPdf,
                setOpenPdf,

                createPurchaseInvoice,
                getPurchaseInvoices,
                deleteAllPurchaseInvoices,
                deletePurchaseInvoices,
                EditInvoice,
                PurchaseInvoicesList : state.PurchaseInvoicesList,
                Inv_key: state.Inv_key,
                PurchaseInvoice: state.PurchaseInvoice,
                InvoiceData,
                InvoiceTable,
               

                supliersList: state.supliersList,
                supliers: state.supliers,
                getSupliers,
                addSupliers,
                deleteAllSupliers,
                EditSuplier,
                deleteSuplier,

                customersList: state.customersList,
                customers: state.customers,
                getCustomers,
                addCustomers,
                deleteAllCustomers,
                EditCustomer,
                deleteCustomer,

                products: state.products,
                productList: state.productList,
                AddProducts,
                EditProducts,
                deleteAllProducts,
                deleteProducts,
                getProducts,

                categories: state.categories,
                categorieslist: state.categorieslist,
                getCategories,
                addCategories,
                deleteCategory,
                deleteAllCategories,
                EditCategory,

                EditSalesInvoice,
                deleteSalesInvoice,
                createSalesInvoice,
                deleteAllSalesInvoice,
                SalesInvoice: state.SalesInvoice,
                SalesInvoicesList : state.SalesInvoicesList,
                getSalesInvoice,

                DashboardCalculations,
                state
            }}
        >
            {props.children}
        </ManagerContext.Provider>
    );
};

export default ManagerStates;
