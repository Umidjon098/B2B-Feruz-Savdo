import React, { Component } from "react";
import axios from "axios";
import AgentModal from "./agentModal";
import PlanModal from "./planModal";

class CreatePlan extends Component {
  state = {
    planName: "",
    deadline: "",
    plans: [],
    products: [],
    agents: [],
    product: 0,
    quantity: 0,
    plan: 0,
    agentPlan: 0,
    agent: 0,
    creditial: "",
    creditial1: "",
    creditial2: "",
    show: false,
    show_plan: false,
    AgentPlanList: [],
    PlanList: [],
  };

  componentDidMount() {
    this.getPlans();
    this.getProducts();
    this.getAgent();
  }
  closeModalHandler = () => this.setState({ show: false });
  closePlanModalHandler = () => this.setState({ show_plan: false });
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  createPlansUser = (event) => {
    event.preventDefault();
    const url = "/api/plan/plan-list/";
    const { planName, deadline } = this.state;
    axios
      .post(url, {
        name: planName,
        deadline: deadline,
      })
      .then((data) =>
        this.setState((prevState) => ({
          plans: [
            ...prevState.plans,
            {
              ...data.data,
            },
          ],
        }))
      );
    this.setState(
      {
        creditial: "Режа муаффақиятли яратилди!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  getPlans = () => {
    const url = "/api/plan/plan-list/";
    axios(url).then((res) => this.setState({ plans: res.data }));
  };

  getProducts = () => {
    const url = "/api/product/product-list/";
    axios(url).then((res) => this.setState({ products: res.data.products }));
  };
  getAgent = () => {
    const url = "/api/user/agent-list/";
    axios(url).then((res) => this.setState({ agents: res.data }));
  };
  handlePlanItem = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCreatingPlanItem = (e) => {
    e.preventDefault();
    let data = [
      {
        product: parseInt(this.state.product),
        quantity: parseInt(this.state.quantity),
        plan: parseInt(this.state.plan),
      },
    ];
    axios.post("/api/plan/plan-item-create/", data);
    this.setState(
      {
        creditial2: "Режа элемент муаффақиятли яратилди!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial2: "",
          });
        }, 3000)
    );
  };

  createPlans = () => {
    return (
      <>
        <span>
          <label>Режа номи:</label>
          <input
            type="text"
            name="planName"
            placeholder="Режа номи"
            onChange={this.handleInput}
          />
        </span>
        <span>
          <label>Тугаш Санаси:</label>
          <input type="date" name="deadline" onChange={this.handleInput} />
        </span>
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </>
    );
  };
  createPlanItem = ({ products, plans }) => {
    return (
      <div className="form-item">
        <span>
          <label>Маҳсулот номи</label>
          <select
            name="product"
            value={this.state.product}
            onChange={this.handlePlanItem}
          >
            <option value={0}>Маҳсулот Танланг</option>
            {products.map((product) => {
              return <option value={product.id}>{product.name}</option>;
            })}
          </select>
        </span>
        <span>
          <label htmlFor="">Миқдори</label>
          <input
            name="quantity"
            onChange={this.handlePlanItem}
            value={this.state.quantity}
            type="number"
            placeholder="миқдорини киритинг"
          />
        </span>
        <span>
          <label htmlFor="">Режа номи</label>
          <select
            onChange={this.handlePlanItem}
            name="plan"
            value={this.state.plan}
          >
            <option value={0}>Режа номини танланг</option>
            {plans.map((plan) => {
              return <option value={plan.id}>{plan.name}</option>;
            })}
          </select>
        </span>
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  };
  handleAgentPlan = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCreatingAgentPlan = (e) => {
    e.preventDefault();
    let data = [
      {
        agent: this.state.agent,
        plan: this.state.agentPlan,
      },
    ];
    axios.post("/api/plan/agent-plan-list/", data);
    this.setState(
      {
        creditial1: "Режа агентга муаффақиятли бириктирилди!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial1: "",
          });
        }, 3000)
    );
  };
  setPlansToAgent = ({ plans, agents }) => {
    return (
      <>
        <span>
          <label htmlFor="">Режа:</label>
          <select
            name="agentPlan"
            value={this.state.agentPlan}
            onChange={this.handleAgentPlan}
          >
            <option value={0}>Режа танланг</option>
            {plans.map((plan) => {
              return <option value={plan.id}>{plan.name}</option>;
            })}
          </select>
        </span>
        <span>
          <label htmlFor="">Агент:</label>
          <select
            name="agent"
            value={this.state.agent}
            onChange={this.handleAgentPlan}
          >
            <option value={0}>Агент танланг</option>
            {agents.map((agent) => {
              return (
                <option value={agent.id}>
                  {agent.first_name + " " + agent.last_name}
                </option>
              );
            })}
          </select>
        </span>
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </>
    );
  };
  ShowAgentPlans = (e) => {
    const url = `/api/plan/agent-plan-detail/${e}`;
    axios(url).then((res) => this.setState({ AgentPlanList: res.data }));
  };
  ShowPlanItems = (e) => {
    const url = `/api/plan/plan-product-list/${e}`;
    axios(url).then((res) => this.setState({ PlanList: res.data }));
  };
  render() {
    const { plans, products, agents } = this.state;
    return (
      <>
        <div className="form-box">
          <h4 className="kpi">КПИ Қўйиш</h4>
          {this.state.show ? (
            <div onClick={this.closeModalHandler} className="back-drop"></div>
          ) : null}
          {this.state.show_plan ? (
            <div
              onClick={this.closePlanModalHandler}
              className="back-drop"
            ></div>
          ) : null}
          <div className="row">
            <AgentModal
              show={this.state.show}
              close={this.closeModalHandler}
              AgentPlanList={this.state.AgentPlanList}
            />
            <PlanModal
              show={this.state.show_plan}
              close={this.closePlanModalHandler}
              PlanList={this.state.PlanList}
            />
            <div className="col-md-4 col-lg-4">
              <div className="row agent-plan">
                <div className="col-md-6">
                  <ul>
                    <li>
                      <h4>Агентлар</h4>
                    </li>
                    {this.state.agents.map((agent) => {
                      return (
                        <>
                          <li
                            onClick={() =>
                              this.setState(
                                { show: true },
                                this.ShowAgentPlans(agent.id)
                              )
                            }
                          >
                            {agent.first_name + " " + agent.last_name}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul>
                    <li>
                      <h4>Режалар</h4>
                    </li>
                    {this.state.plans.map((plan) => {
                      return (
                        <li
                          onClick={() =>
                            this.setState(
                              { show_plan: true },
                              this.ShowPlanItems(plan.id)
                            )
                          }
                        >
                          {plan.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-8">
              <div className="title">
                <span>Режа Яратиш</span>
                <label className="notification">
                  {this.state.planName.length !== 0 ? this.state.creditial : ""}
                </label>
              </div>
              <form onSubmit={this.createPlansUser}>
                <div className="form-item">
                  <this.createPlans />
                </div>
                <hr />
              </form>
              <form onSubmit={this.handleCreatingPlanItem}>
                <div className="title">
                  <span>Режа элементини яратиш</span>
                  <label className="notification">
                    {this.state.creditial2}
                  </label>
                </div>
                <div className="form-item">
                  <div className="create-plan-item">
                    <this.createPlanItem products={products} plans={plans} />
                  </div>
                </div>
              </form>
              <form onSubmit={this.handleCreatingAgentPlan}>
                <hr />
                <div className="title">
                  <span>Агентга Режа қўшиш</span>
                  <label className="notification">
                    {this.state.creditial1}
                  </label>
                </div>
                <div className="form-item">
                  <this.setPlansToAgent plans={plans} agents={agents} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreatePlan;
