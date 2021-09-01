import { Checkbox, Button } from '@material-ui/core/';
import React from 'react';
import { Component } from 'react';
import axios from "../../../../baseUrl"
import FilterByDepartment from '../DepartmentBudget/filterByDepartment';
import FilterByTime from '../DepartmentBudget/filterByTime';

 class PaymentByAgent extends Component {
    state = {
        totalPayment: 0,
        userListId:[{
            id: 0,
            payment_type: ""
        }],
        usersdata: []
    }
    
    componentDidMount() {
        this.getPaymentList();
    }
    
    getPaymentList = async () => {
        const url = `/order/sell-order-payment/`;
        axios(url).then((res) => this.setState({usersdata: res.data['payments'].filter(res => res.approved !== true)}));
    }

    showTableRow = (e, paymentOld, id, payment_type) => {
        e.preventDefault();

        if (e.target.checked){
            let sumPayment = parseFloat(this.state.totalPayment) + parseFloat(paymentOld);
            this.setState({
                totalPayment: sumPayment
            })
         
            this.setState((prevState) => ({
                userListId: [
                    ...prevState.userListId,
                    {
                        id: id,
                        payment_type: payment_type
                    }
                ]
            }))
        }
        else {           
            let sumPayment = parseFloat(this.state.totalPayment) - parseFloat(paymentOld);
            this.setState({
                totalPayment: sumPayment
            })
            this.setState({
                userListId: this.state.userListId.filter(userId => userId.id != id)
            })
            console.log(this.state.userListId)
        }
    }
    paymentAction = () => {
        if (this.state.userListId.length !== 0){
            this.state.userListId.map((userId) => {
                    const url = `/order/sell-order-payment-detail/${userId.id}/`
                    axios.put(url, {
                        approved: "true",
                        payment_type: userId.payment_type
                    });
                    alert("Saqlandi")
            })
            this.getPaymentList();
            this.setState({
                userListId:{
                    id: 0,
                    payment_type:""
                },
                usersdata: []
            })
        }
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <FilterByDepartment/>
                    <FilterByTime 
                        //  onFilterDateSubmit={this.onFilterDateSubmit}
                        //  onSetDay={this.onSetDay}
                        //  onSetWeek={this.onSetWeek}
                        //  onSetMonth={this.onSetMonth}
                    />
                </div> 
                    
                <div className="row">
                    <div style={{width:'100%', overflow:'scroll'}}>
                        <h4 style={{color:'white', textAlign:'center'}}>Буюртмалар рўйхати</h4>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover text-center  mb-0">
                                <thead>
                                    <tr>
                                        <td scope="col">Т/Р</td>
                                        <td scope="col">Дўкон коди</td>
                                        <td scope="col">Дўкон номи</td>
                                        <td scope="col">Манзили</td>
                                        <td scope="col">Ишчи</td>
                                        <td scope="col">Ишчини номери</td>
                                        <td scope="col">ИНН</td>
                                        <td scope="col">Aгент Номи</td>
                                        <td scope="col">Тўлов сумма</td>
                                        <td scope="col">Тўлов тури</td>
                                        <td scope="col">Ҳолати</td>
                                        <td scope="col">Яратилган кун</td>
                                        <td scope="col">Жараён</td>
                                    </tr>
                                </thead>
                                <tbody> 
                                    {
                                        this.state.usersdata.map(({
                                            id,  
                                            payment_type,
                                            approved,
                                            created_date,
                                            payment,
                                            client:{name:clientName},
                                            client:{address},
                                            client:{work_phone_number},
                                            client:{market_code},
                                            client:{INN},
                                            client:{responsible_agent},
                                            client:{sale_agent:{first_name}},
                                            client:{sale_agent:{last_name}},
                                        }, index) => {
                                            if (payment_type === "cash") payment_type = "нақд пул";
                                            if (payment_type === "credit_card") payment_type = "пластик карта";
                                            if (payment_type === "money_transfer") payment_type = "пул ўтказма";
                                            return ( 
                                            <>
                                                <tr key={id} >
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{market_code}</td>
                                                    <td>{clientName}</td>
                                                    <td>{address}</td>
                                                    <td>{responsible_agent}</td>
                                                    <td>{work_phone_number}</td>
                                                    <td>{INN}</td>
                                                    <td>{first_name + " " + last_name}</td>
                                                    <td>{new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'som'}).format(payment)}</td>
                                                    <td>{payment_type}</td>
                                                    <td> {
                                                        approved?<span className="delivered">Тасдиқланган</span>:
                                                            <span className="ordered">Тасдиқланмаган</span> }
                                                    </td>
                                                    <td>{created_date.slice(0, 10)} {created_date.slice(11, 16)}</td>
                                                    <td>
                                                        <Checkbox color="primary" onChange={(e) => this.showTableRow(e, payment, id, payment_type)} />
                                                    </td>
                                                </tr>
                                            </>
                                        )})}
                                </tbody>
                                <div className="total-price" style={{width:"30%"}}>
                                    <span>Жами қиймати: </span>
                                    <p style={{marginRight: "10px"}}>{new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'som'}).format(this.state.totalPayment)}</p> 
                                    <Button style={{margin: "5px"}} color="primary" variant="outlined" onClick={() => this.paymentAction()}>Тўлов</Button>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
 }

export default PaymentByAgent