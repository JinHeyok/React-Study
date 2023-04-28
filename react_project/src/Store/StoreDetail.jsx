import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Params(id){
    return new URLSearchParams(window.location.search).get(id);
}


function Detail(){

    const [Product , setProduct]  = useState([]);

    useEffect(() => {
        const id = Params("id");

        var formData = new FormData();
        formData.append("id" , id);
        
        axios.post("/api/storeDetail" , formData)
        .then((response) => {setProduct(response.data.content);
            if(response.data.code === 200){
                axios.post("/api/storeVisit" , formData)
                .then((response) => { var status = response.data.content 
                    if(status === "success") {
                        console.log("Visit Update Success");
                    }else{
                        console.log("ERROR : " + status);
                    }
                });
            }else{
                console.log(response.data.content);
            }
            });
    }, [setProduct]);

    return Product;
}

function DetailContent(){
    const data = Detail();
    return(<>
        <h4>상품 상세 페이지</h4>
        <Link to={"/store/storelist?categoryID=" + data.map((data ,index) => { return data.sc_index})}>돌아가기</Link>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>상품이름</th>
                                <th>상품요약</th>
                                <th>상품가격</th>
                                <th>상품이미지</th>
                                <th>방문수</th>
                            </tr>
                            {data.map((data , index) => {
                                return(
                                    <>
                                    <tr key={data.sp_index}>
                                        <td>{data.sp_name}</td>
                                        <td>{data.sp_summary}</td>
                                        <td>{data.sp_price}</td>
                                        <td><img src={"/Resorces/Store/" + data.sp_thumbnail}></img></td>
                                        <td>{data.sp_visit}</td>
                                    </tr>
                                    <tr key={data.sp_index}>
                                        {data.sp_image.split("|").map((data , index) => {
                                            return (
                                                <>
                                                    <td><img src={"/Resorces/Store/" + data}></img></td>
                                                </>
                                            )
                                        })}
                                    </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
    </>)
}

export default DetailContent;