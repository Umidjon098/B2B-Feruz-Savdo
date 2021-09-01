import React, { Component } from "react";
import axios from "../../../../baseUrl"
// import "../DepartmentBudget/department.css"

class FilterByDepartment extends Component {
    state = {
        departName: [],
        activeAll: false
    }

    componentDidMount = async() => {
        let response = await axios.get("/product/department-list/");
        this.setState({
            departName: response.data.results
        })
    }

    AddActiveClass = (e) => {
        let departNameList = this.state.departName;
        let active = true;
        for (let i = 0; i < departNameList.length; i++){
            if (departNameList[i].name === e){
                departNameList[i].active = true;
                active = false;
            }
            else
                departNameList[i].active = false;
        }

        if(e === "all" && active)
            this.state.activeAll = true;
        else
            this.state.activeAll = false;

        this.setState({
            departName: departNameList
        })
    } 
    
    render () {
        const { departName, activeAll } = this.state;
        
        return (
            <div className="filter-box" style={{marginRight:"20px", whiteSpace: 'nowrap'}}>
                <span onClick={() => this.AddActiveClass("all")} className= {activeAll ? "activespan": ""} >
                Умумий ҳаражатлар
                </span>
                {departName.map((user) => {
                    return (
                        <span key={user.id} onClick={() =>this.AddActiveClass(user.name)} className= {user.active ? "activespan": ""}>
                            {user.name}
                        </span>
                    )
                })}
            </div>
        )
    }
}

export default FilterByDepartment;