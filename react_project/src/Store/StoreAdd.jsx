import React from "react";
import {Tag} from "../Tag/DataTag";
import axios from "axios";


export class StoreAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sc_index : ["상의" , "하의"],
            sp_name : "",
            sp_summary : "",
            sp_price : 0,
            sp_thumbnail : "",
            sp_thumbnailName : "",
        }
        this.ChangHandle = this.ChangHandle.bind(this);
        this.FileChange = this.FileChange.bind(this);
        this.onSubmit =this.onSubmit.bind(this);
    }

    ChangHandle(e){
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name] : value
        });

    }

    FileChange(e){
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        
        this.setState({
            sp_thumbnail : file,
            sp_thumbnailName : fileName
        });

    }

    onSubmit(e){
        const sc_index = typeof this.state.sc_index === "object" ? 1 : this.state.sc_index;
        const sp_name = this.state.sp_name;
        const sp_summary =this.state.sp_summary;
        const sp_price = this.state.sp_price;
        const sp_thumbnail =this.state.sp_thumbnail;
        const sp_thumbnailName = this.state.sp_thumbnailName;

        // console.log(sc_index);
        // console.log(sp_name);
        // console.log(sp_summary);
        // console.log(sp_price);
        // console.log(sp_thumbnail);
        // console.log(sp_thumbnailName);

        if(sc_index === "" && sc_index === 0){
            alert("상품 카테고리를 선택해주세요");
            e.preventDefault();
        }else if(sp_name === ""){
            alert("상품 이름을 입력해주세요");
            this.OnFocus(e,"sp_name");
            e.preventDefault();
        }else if(sp_summary === ""){
            alert("상품 요약을 입력해주세요");
            this.OnFocus(e , "sp_summary");
            e.preventDefault();
        }else if(sp_price === ""){
            alert("상품가격을 입력해주세요");
            this.OnFocus(e , "sp_price");
            e.preventDefault();
        }else if(sp_thumbnail === "" && sp_thumbnailName === ""){
            alert("썸네일을 등록해주세요");
            this.OnClick(e,"sp_thumbnail");
            e.preventDefault();
        }else{
            var formData = new FormData();
            
            formData.append("file" , sp_thumbnail);
            formData.append("fileName" , sp_thumbnailName);

            try {
                axios.post("/api/fileUpload" , formData)
                .then((response) => {if(response.data.code === 200){

                    formData.append("sc_index" , sc_index);
                    formData.append("sp_name" , sp_name);
                    formData.append("sp_summary" , sp_summary);
                    formData.append("sp_price" , sp_price);
                    formData.append("sp_thumbnail" , sp_thumbnailName);

                    axios.post("/api/storeInsert" , formData)
                        .then((response) => {if(response.data.code === 200){
                            console.log("test");
                            alert("등록 성공!");
                            window.location.reload();
                        }});

                }});
            } catch (error) {
                console.log(error);
            }
        }   
        e.preventDefault();

    }

    OnFocus(e , id){
        Array.from(e.target).find(element => element.name === id).focus();
    }
    OnClick(e , id){
        Array.from(e.target).find(element => element.name === id).click();
    }


    render(){
       return (<>
            <h4>상품등록페이지</h4>
            <form onSubmit={this.onSubmit}>
            상품카테고리 : <Tag tagType={"select"} name={"sc_index"} option={this.state.sc_index} onChange={this.ChangHandle}></Tag><br/>
            상품이름 : <Tag tagType ={"input"} type={"text"} name={"sp_name"} placeholder={"상품이름을 입력해주세요"} onChange={this.ChangHandle}></Tag><br/>
            상품요약 : <Tag tagType ={"input"} type={"text"} name={"sp_summary"} placeholder={"상품요약을 입력해주세요"} onChange={this.ChangHandle}></Tag><br/>
            상품가격 : <Tag tagType ={"input"} type={"text"} name={"sp_price"} placeholder={"상품 가격을 입력해주세요"} onChange={this.ChangHandle}></Tag><br/>
            상품 썸네일 : <Tag tagType={"input"} type={"file"} name={"sp_thumbnail"} onChange={this.FileChange}></Tag><br/>
            <Tag tagType={"button"} type={"submit"} text={"등록"}></Tag>
            </form>
        </>);
    }
}

export default StoreAdd;