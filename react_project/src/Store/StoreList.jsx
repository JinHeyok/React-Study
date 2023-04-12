import React , {useEffect, useState}  from "react";
import axios from "axios";
import { Tag } from "../Tag/DataTag";
import "./store.css";


const categoryName = { 1 : "상의" , 2 : "하의"};

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

const StoreList = () => {

        const storeList = ProductList();
        const id = params("categoryID");

        return (<>
            <h4>상품 {categoryName[id]} 페이지</h4>
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
                            <td><button type={"button"} onClick={() => { 

                                    var formData = new FormData();
                                    formData.append("id" , data.sp_index);

                                    axios.post("/api/storeDelete" , formData)
                                    .then((response) => {
                                        if(response.data.code === 200){
                                            console.log(response.data.content);
                                            window.location.reload();
                                        }else{
                                            console.log(response.data.content);
                                        }
                                    });

                                }}>삭제</button></td>
                        </tr>
                        );
                    })}

                </tbody>
            </table>
            </>
            )
}   

export default StoreList;