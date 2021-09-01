import axios from '../../../../baseUrl';
import React, { Component } from 'react';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class dollarWarehouse extends Component {
    state = {
        is_income: true,
        izoh: "",
        miqdori: "",
        usersdata: [],
        userList: [],
        deleteItem: [],
        btn_type: "Тасдиқлаш",
        update: false,
        id: "",
        creditial: "",
        totalDollar : 0
    };
    componentDidMount() {
        this.getUsersData();
        // this.getUserList();
    }
    componentDidUpdate(prevState) {
        if (prevState !== this.state.usersdata) {
            this.getUsersData();
        }
    }
    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    createUser = (event) => {
        event.preventDefault();
        const url = "/warehouse/dollar-warehouse/";
        const { miqdori, is_income } = this.state;
        axios
           .post(url, {
                quantity : miqdori,
                is_income: is_income
           })
           .then((data) => 
               this.setState((prevState) => ({
                   usersdata: [
                       ...prevState.usersdata,
                       {
                           ...data.data,
                       },
                   ],
               }))
           );
           let incomeSum = 0, expenseSum = 0;

           this.state.usersdata.map((userdata) => {
                if (userdata.approved) 
                    incomeSum += userdata.quantity;
                else 
                    expenseSum += userdata.quantity;
           })
        this.setState({
            totalDollar: incomeSum - expenseSum
        })
        console.log(this.state.totalDollar)
        this.setState(
            {
                miqdori: "",
                is_income: "",
                creditial: "Қўшиш муваффақиятли бажарилди",
            },
            () => 
                setTimeout(() => {
                    this.setState({
                        creditial: "",
                    });
                }, 3000)
        );
    };

    getUsersData = async () => {
        const url = "/warehouse/dollar-warehouse/";
        axios(url).then((res) => this.setState({ usersdata: res.data.results }));
    }
    onExpenseDelete = (e) => {
        const url = "/warehouse/dollar-warehouse-detail/";
        axios.delete(url + e).then((response) => {
            if (response.data != null) {
                this.setState({
                    usersdata: this.state.usersdata.filter((user) => user.id != e),
                });
            }
        });
    };
    onEdit = (id) => {
        this.setState({ id });
        const url = `/warehouse/dollar-warehouse-detail/${this.state.id}`;;
        const { miqdori, is_income } = this.state;
        axios.put(url, {
            quantity: miqdori,
            is_income: is_income,
        });
        this.setState(
            {
                miqdori: "",
                is_income: "",
                btn_type:"Тасдиқлаш",
                update: false,
                creditial: "Муваффақиятли янгиланди Кутинг!",
            },
            () => 
               setTimeout(() => {
                this.setState({
                    creditial: "",
                });   
               }, 3000)
        );
    };
    onDeleteAlert = (e) => {
        confirmAlert({
            message: "Ўчириш учун тасдиқланг",
            buttons: [
                {
                    label: "Ўчириш",
                    onClick: () => this.onExpenseDelete(e),
                },
                {
                    label: "Қайтиш",
                    onClick: () => console.log(""),
                },
            ],
        });
    };

    render() {
        const { usersdata } = this.state;
        return (
            <div className="register-box">
                <div className="register-form">
                    <div className="title mb-5">
                        <h2>Доллар кирим чиқим</h2>
                    </div>
                    <form 
                      className="input-form"
                      onSubmit={this.state.update ? this.onUpdate : this.createUser}
                    >
                        <select name="is_income" onChange={this.handleInput}>
                            <option value="true">Кирим</option>
                            <option value="false">Чиким</option>
                        </select>
                        <input 
                            type="number"
                            name="miqdori"
                            placeholder="Миқдори"
                            value={this.state.miqdori}
                            required
                            onChange={this.handleInput}
                            />
                            <label className="notification">{this.state.creditial}</label>
                            <button className="btn btn-primary" type="submit">
                                {this.state.btn_type}
                            </button>
                    </form>
                </div>
                <div className="row">
                    <h3 className="ml-3">Доллар кирим чиқим</h3>
                    <div className="register-table-box table-responsive mt-5">
                            <table className="table table-striped table-hover text-center  mb-0">
                                <thead>
                                  <tr>
                                    <td scope="col">Т/Р</td>
                                    <td scope="col">Миқдори</td>
                                    <td scope="col">Чиким</td>
                                    <td scope="col">Ҳаражат куни</td>
                                    <td scope="col">Ҳаражат санаси </td>
                                    <td scope="col">Таҳрирлаш</td>
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                    usersdata.map((user, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{user.quantity} $</td>
                                                <td>{user.is_income? "Кирим": "Чиким"}</td>
                                                <td>{user.created_date.slice(0, 10)}</td>
                                                <td>{user.created_date.slice(11, 19)}</td>
                                                <td className="d-flex justify-content-center">
                                                    <i 
                                                    className="fas fa-edit"
                                                    onClick={this.onEdit.bind(this, user.id)}
                                                    ></i>
                                                    <i 
                                                        className="fas fa-trash"
                                                        onClick={this.onDeleteAlert.bind(this, user.id)}
                                                    ></i>
                                                </td>
                                            </tr>
                                    )})}
                                </tbody>
                                <div className="total-price">
                                    <span>Жами қиймати: </span>
                                    <p style={{marginRight: "10px"}}>{new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'som'}).format(this.state.totalDollar)}</p>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>  
            );
        }
    }

export default dollarWarehouse;