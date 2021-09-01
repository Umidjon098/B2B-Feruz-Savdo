import { useEffect, useState } from 'react'
import axios from '../../../../baseUrl'
import Loading from '../Loading'
import BuyOrders from './BuyOrderPayment'
import { observer } from "mobx-react";
import { globalState } from "./../../../../globalState";

function _DebtProviders() {
    const [debtProviders, setDebtProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProviders = async () => {
        setLoading(true);

        try {
            await axios.get('/order/providers-with-debt/',{
                params: {
                    term: globalState.search
                }
            }).then(response=>{
                setDebtProviders(response.data);
                setLoading(false);
                renderTable();
            })
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchProviders();
    }, [globalState.search]);
    
    const paymentOrderAction = (buyOrderPayment, clientNameFullInfo) =>{
        let {payment_type, payment } = buyOrderPayment;
        const {sellOrderId} = clientNameFullInfo;
        payment = parseFloat(payment);

        if (payment_type !== 'none' && payment){
            axios.post(`/order/buy-order-payment/`, 
                {
                    "payment_type":  payment_type,
                    "payment": payment,
                    "provider": sellOrderId
                }
            ,{
            }).then (res =>{
                  alert("Malumotlar saqlandi")
                  fetchProviders();
                  renderTable();
                }).catch(error=>{
                    console.log( {errorMessage: error.toString() });
                })
        }
    }

    function renderTable(){
        if (loading || debtProviders.length === 0) {
            return (
                <main>
                    <Loading />
                </main> 
            );
        }
            return (
                <div >
                    <BuyOrders providers={debtProviders} fetchProviders={fetchProviders} paymentOrderAction={paymentOrderAction}/>
                </div>
            )
        }
    return (
        <>
            {renderTable()}
        </>
    )
    
}

export default observer(_DebtProviders);
// export default _DebtProviders