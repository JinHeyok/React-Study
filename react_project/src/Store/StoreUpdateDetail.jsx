import axios from "axios";
import React from "react";
import {Tag} from "../Common/DataTag";
import {v4 as uuidv4} from 'uuid';

const Param = (id) => {
    return new URLSearchParams(window.location.search).get(id);
}

export class Detail extends React.Component{

    constructor(props){
        super(props);
        
        var idCheck = sessionStorage.getItem("user");
        
        if(idCheck === "user"){
            window.location.replace("/");
        }

        this.state = {
            categoryID : Param("id"),
            categoryList : [],
            sp_index : 0,
            sc_index : 0,
            sp_name : "",
            sp_summary : "",
            sp_price : "",
            sp_thumbnail : "" ,
            sp_thumbnailName : "",
        }
    
        this.OnChangeHandle = this.OnChangeHandle.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.OnChageFile = this.OnChageFile.bind(this);
    }

    componentDidMount(){

        var formData = new FormData();
        formData.append("id", this.state.categoryID);
        
        axios.post("/api/storeDetail" , formData)
        .then((response) => {
            const data = response.data.content[0];
            this.setState({
                sp_index : data.sp_index,
                sc_index : data.sc_index,
                sp_name : data.sp_name,
                sp_summary : data.sp_summary,
                sp_thumbnailName : data.sp_thumbnail,
                sp_price : data.sp_price,
        })})
        .catch((error) => {console.log(error)});
        
        axios.post("/api/categoryList")
        .then((response) => {this.setState({ categoryList : response.data.content})})
        .catch((error) => {console.log(error)});

    }

    OnChangeHandle(e){
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name] : value
        });

    }

    OnChageFile(e){
        const file = e.target.files[0];
        const extension = file.name.split(".").pop();
        const fileName = uuidv4() + '.' + extension;

        this.setState({
            sp_thumbnail : file,
            sp_thumbnailName : fileName,
        });
    }

    OnSubmit(e){
        const sc_index = this.state.sc_index;
        const sp_index = this.state.sp_index;
        const sp_name = this.state.sp_name;
        const sp_summary = this.state.sp_summary;
        const sp_price = this.state.sp_price;
        const sp_thumbnail = this.state.sp_thumbnail;
        const sp_thumbnailName = this.state.sp_thumbnailName;

        var formData = new FormData();
        if(sp_thumbnail !== ""){

            formData.append("file" ,sp_thumbnail);
            formData.append("fileName" , sp_thumbnailName);

            axios.post("/api/fileUpload" , formData)
            .then((response) => {
                if(response.data.code === 200){
                    
                }else{
                    console.log(response.data.error);
                }
            })
            .catch((error) => {console.log(error)});
            
        }

        formData.append("sp_index" , sp_index);
        formData.append("sc_index" , sc_index);
        formData.append("sp_name" , sp_name);
        formData.append("sp_summary" , sp_summary);
        formData.append("sp_price" , sp_price);
        formData.append("sp_thumbnail" , sp_thumbnailName);
        
        axios.post("/api/storeUpdate" , formData)
        .then((response) => {
            const data = response.data;
            if(data.code === 200 && data.status === "success"){
            alert("수정 성공!");
            window.location.href = "/store/storeupdate?categoryID=" + this.state.sc_index;
            }else{
                console.error(data.content);
            }
        })
        .catch((error) => console.log(error));

        e.preventDefault();
    }
    

    render() {

    return (<>
        <h4>상품 수정 상세페이지</h4>
        <form onSubmit={this.OnSubmit}>
            <select value={this.state.sc_index} name={"sc_index"} onChange={this.OnChangeHandle}>
                {this.state.categoryList.map((data ,index ) => {
                    return (<option key={data.sc_index} value={data.sc_index}>{data.sc_categoryName}</option>)
                })}
            </select>
            <br/>
                <span>상품이름 : </span> <input type={"text"} name={"sp_name"} value={this.state.sp_name} onChange={this.OnChangeHandle}></input><br/>
                <span>상품요약 : </span> <input type={"text"} name={"sp_summary"} value={this.state.sp_summary} onChange={this.OnChangeHandle}></input><br/>
                <span>상품가격 : </span> <input type={"text"} name={"sp_price"} value={this.state.sp_price} onChange={this.OnChangeHandle}></input><br/>
                <span>상품이미지 : </span> 
                <label htmlFor="sp_thumbnail">
                    <input type={"file"} id="sp_thumbnail"name={"sp_thumbnail"} onChange={this.OnChageFile}></input><br/>
                    <span>파일이름 : {this.state.sp_thumbnailName}</span>
                </label><br/>
                <Tag tagType={"button"} type={"submit"} text={"수정"}></Tag>&nbsp;
                <button type="button" onClick={(e) => {window.location.href="/store/storeupdate?categoryID=" + this.state.sc_index}}>돌아가기</button>
        </form>
    </>);
    }
}

export default Detail;