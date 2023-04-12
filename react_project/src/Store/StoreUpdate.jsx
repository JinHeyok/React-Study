import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import "../Store/store.css";
import { Tag } from "../Tag/DataTag";
import axios from "axios";

export class StoreUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            categoryID : "1",
            categoryList : [],
            StoreList : [],
        }
        this.OnChage = this.OnChage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){

        console.log("렌더링");

        var formData = new FormData();

        axios.post("/api/categoryList")
        .then((response) => {this.setState({ categoryList : response.data.content})})
        .catch((error) => {console.log(error)});

        formData.append("categoryID" , this.state.categoryID)
        axios.post("/api/updateStoreList", formData)
        .then((response) => {this.setState({ StoreList :  response.data.content})})
        .catch((error) => console.log(error));
    }

    componentDidUpdate(prevProps , prevState, snapShot){
        console.log("componentDidUpdate")
        console.log("componentDidUpdate prevState : " , prevState.categoryID);
        console.log("this.state.categoryID : " , this.state.categoryID);

        if(prevState.categoryID !== this.state.categoryID){
            var formData = new FormData();

            formData.append("categoryID" , this.state.categoryID)
            axios.post("/api/updateStoreList", formData)
            .then((response) => {this.setState({ StoreList :  response.data.content})})
            .catch((error) => console.log(error));
        }


    }

    OnChage(e){
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name] : value
        });

    }


    render(){
        var categoryName = "";
        return<>
            <h4>상품 수정 페이지</h4>
            <select name={"categoryID"} onChange={this.OnChage}>
                {this.state.categoryList.map((data , index) => { 
                    return (<option key={data.sc_index} value={data.sc_index}>{data.sc_categoryName}</option>)
                })}
            </select>
            <h4>상품 리스트</h4>
            <table>
                <thead>
                    <tr>
                        <th>상품카테고리</th>
                        <th>상품인덱스</th>
                        <th>상품이름</th>
                        <th>상품요약</th>
                        <th>상품가격</th>
                        <th>상품이미지</th>
                        <th>상품방문수</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.StoreList.map((data , index) => {
                        return (
                            <tr key={data.sp_index}>
                                <td>{this.state.categoryList.map(( categoryData , categoryIndex) => { if(categoryData.sc_index === data.sc_index){ return categoryData.sc_categoryName}})}</td>
                                <td>{data.sp_index}</td>
                                <td onClick={((e) => { window.location.href = "./storeupdatedetail?id=" + data.sp_index})}>{data.sp_name}</td>
                                <td>{data.sp_summary}</td>
                                <td>{data.sp_price}</td>
                                <td><img src={"/Resorces/Store/"  + data.sp_thumbnail}></img></td>
                                <td>{data.sp_visit}</td>
                                <td><button type={"button"} onClick={() => { 

                                    var formData = new FormData();
                                    formData.append("id" , data.sp_index);

                                    axios.post("/api/storeDelete" , formData)
                                    .then((response) => {
                                        if(response.data.code === 200){
                                            console.log(response.data);
                                            window.location.reload();
                                        }else{
                                            console.log(response.data);
                                        }
                                    });

                                }}>삭제</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    }
}


export default StoreUpdate;