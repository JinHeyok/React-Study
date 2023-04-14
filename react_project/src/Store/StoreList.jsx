import React  from "react";
import axios from "axios";
import "./../CSS/store.css";

function params(id){
    return new URLSearchParams(window.location.search).get(id);
}

export class StoreList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            storeList : [],
            categoryList : [],
            categoryID : params("categoryID"),
        }
    }
    
    componentDidMount(){
        console.log("componentDidMount");

        const id = this.state.categoryID;

        var formData = new FormData();
        formData.append("categoryID" , id);
        
        axios.post("/api/storeList", formData)
        .then((response) => {
            if(response.data.code === 200){
                console.log(response.data);
                this.setState({
                    storeList : response.data.list
                });
            }
        })
        .catch((error) => {console.log(error)})

        axios.post("/api/categoryList")
        .then((response) => {
            if(response.data.code === 200){
                this.setState({
                    categoryList : response.data.content
                });
            }
        })
        .catch((error) => {console.log(error)});

    }

    render(){
        return (<>
            <h4>상품 {this.state.categoryList.map((data , index) => { if(data.sc_index == this.state.categoryID ){ return (data.sc_categoryName)}})} 페이지</h4>
            <table>
                <tbody>
                    <tr>
                        <th>인덱스</th>
                        <th>상품이름</th>
                        <th>상품요약</th>
                        <th>상품가격</th>
                        <th>상품이미지</th>
                        <th>방문수</th>
                    </tr>
                    {this.state.storeList.map((data , index) => {
                        return (
                        <tr key={data.sp_index}>
                            <td>{data.sp_index}</td>
                            <td onClick={((e) => { window.location.href="./storedetail?id=" + data.sp_index })}>{data.sp_name}</td>
                            <td>{data.sp_summary}</td>
                            <td>{data.sp_price}</td>
                            <td><img src={"/Resorces/Store/" + data.sp_thumbnail}></img></td>
                            <td>{data.sp_visit}</td>
                        </tr>
                        );
                    })}

                </tbody>
            </table>
            </>
            )
    }
    
}


export default StoreList;