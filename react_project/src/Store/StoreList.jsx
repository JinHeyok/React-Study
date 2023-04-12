import React , {useEffect, useState}  from "react";
import axios from "axios";
import { Tag } from "../Tag/DataTag";
import "./store.css";

function params(id){
    return new URLSearchParams(window.location.search).get(id);
}


function ProductList(){

    const [ProductList , setProductList] = useState([]);

    useEffect(() => {
        const id = params("categoryID");

        var formData = new FormData();
        formData.append("categoryID" , id);
        
        axios.post("/api/storeList", formData)
        .then((response) => {setProductList(response.data.list)});

    } , []);
        
    return ProductList;
}

function CatgoryList(){
    const[categoryList , setcategoryList] = useState([]);

    useEffect(() => {

        axios.post("/api/categoryList")
        .then((response) => {setcategoryList(response.data.content)})
        .catch((error) => {console.log(error)});

    } , []);

    return categoryList;
}


const StoreList = () => {
        const categoryList = CatgoryList();
        const storeList = ProductList();
        const id = params("categoryID");

        return (<>
            <h4>상품 {categoryList.map((data , index) => { if(data.sc_index == id ){ return (data.sc_categoryName)}})} 페이지</h4>
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
                    {storeList.map((data , index) => {
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

export default StoreList;