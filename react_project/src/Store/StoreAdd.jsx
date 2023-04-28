import React from "react";
import {Tag} from "../Common/DataTag";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "react-router";


export class StoreAdd extends React.Component{
    constructor(props){
        super(props)

        var idCheck = sessionStorage.getItem("user");

        if(idCheck === "user"){
            window.location.replace("/");
        }
        
        this.state = {
            sc_index : 1,
            sp_name : "",
            sp_summary : "",
            sp_price : 0,
            sp_thumbnail : "",
            sp_thumbnailName : "",
            sp_image : [],
            sp_imageNameList : [],
            sp_imageToString : "",
            categoryList : [],
        }
        this.ChangHandle = this.ChangHandle.bind(this);
        this.FileChange = this.FileChange.bind(this);
        this.onSubmit =this.onSubmit.bind(this);
        this.OnChangeFileMultiful = this.OnChangeFileMultiful.bind(this);
        this.OnRemoveHandle = this.OnRemoveHandle.bind(this);
    }

    componentDidMount(){

        axios.post("/api/categoryList")
        .then((response) => {
            if(response.data.code === 200){
                this.setState({
                    categoryList : response.data.content,
                });
            }
       })
        .catch((error) => {console.log(error)});

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
        const extension = file.name.split(".").pop();
        const fileName = uuidv4() + '.' + extension;
        
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
        const sp_imageToString = this.state.sp_imageToString;
        const sp_imageName = this.state.sp_imageNameList;
        const sp_image = this.state.sp_image;

        // console.log(sc_index);
        // console.log(sp_name);
        // console.log(sp_summary);
        // console.log(sp_price);
        // console.log(sp_thumbnail);
        // console.log(sp_thumbnailName);
        // console.log(sp_image);
        // console.log(sp_imageName);
        // console.log(sp_imageToString);


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
                .then((response) => {});

                sp_image.forEach((data , index) => {
                    formData.append("file" , sp_image[index]);
                    formData.append("fileName" , sp_imageName[index]);
                    axios.post("/api/multiFileUpload" , formData)
                });

                formData.append("sc_index" , sc_index);
                formData.append("sp_name" , sp_name);
                formData.append("sp_summary" , sp_summary);
                formData.append("sp_price" , sp_price);
                formData.append("sp_thumbnail" , sp_thumbnailName);
                formData.append("sp_image" , sp_imageToString);

                axios.post("/api/storeInsert" , formData)
                .then((response) => {if(response.data.code === 200){
                    alert("등록 성공!");
                    window.location.reload();
                }});

            } catch (error) {
                console.log(error);
            }
        }   
        e.preventDefault();

    }

    OnChangeFileMultiful(e){

        const file = e.target.files[0];
        var imageToString = "";

        var extension = file.name.split(".").pop();
        var uuid = uuidv4() + "." + extension;
        
        this.state.sp_image.push(file);
        this.state.sp_imageNameList.push(uuid);

        this.state.sp_imageNameList.forEach((data , index) => {
            if(this.state.sp_imageNameList.length == index + 1){
                imageToString += data;
            }else{
                imageToString += data + "|";
            }
        });

        this.setState({
            sp_imageToString : imageToString,
        });

        this.state.sp_image.forEach((data , index) => {

            if(this.state.sp_image.length == index + 1){
                const render = new FileReader();
                render.readAsDataURL(data);
                render.onload = () =>{

                    const imageArea = document.querySelector(".imageTable");

                    var tr = document.createElement("tr");
                    var imgTd = document.createElement("td");
                    var buttonTd = document.createElement("td");
                    var img = document.createElement("img");
                    var button = document.createElement("button");
                    
                    tr.value = index + 1;

                    img.src = render.result;
                    button.type = "button";
                    button.textContent = "삭제";
                    button.onclick = this.OnRemoveHandle;
                    button.value = index + 1;     
                    
                    imageArea.appendChild(tr);
                    tr.appendChild(imgTd);
                    tr.appendChild(buttonTd);
                    imgTd.appendChild(img);
                    buttonTd.appendChild(button);
                }
           }
        });
    }   

    OnRemoveHandle(e){
        const target = e.target.parentNode.parentNode;
        const id = e.target.value;
        var imageString = "";
        target.remove();

        this.state.sp_image.forEach((data , index) => {
            if(id == index + 1){
                this.state.sp_image.splice(index , 1);
                this.state.sp_imageNameList.splice(index ,1);
            }
        });

        this.state.sp_imageNameList.forEach((data , index ) => {
            if(this.state.sp_imageNameList.length == index + 1){
                imageString += data;
            }else{
                imageString += data + "|";
            }
        });

        this.setState({
            sp_imageToString : imageString,
        });
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
            상품카테고리 : <select name={"sc_index"} onChange={this.ChangHandle}>
                            {this.state.categoryList.map((data , index) => {
                                return (<option key={data.sc_index} value={data.sc_index}>{data.sc_categoryName}</option>)
                            })}
                        </select><br/>
            상품이름 : <Tag tagType ={"input"} type={"text"} name={"sp_name"} placeholder={"상품이름을 입력해주세요"} onChange={this.ChangHandle}></Tag><br/>
            상품요약 : <Tag tagType ={"input"} type={"text"} name={"sp_summary"} placeholder={"상품요약을 입력해주세요"} onChange={this.ChangHandle}></Tag><br/>
            상품가격 : <Tag tagType ={"input"} type={"text"} name={"sp_price"} placeholder={"상품 가격을 입력해주세요"} onChange={this.ChangHandle}></Tag><br/>
            상품 썸네일 : <Tag tagType={"input"} type={"file"} name={"sp_thumbnail"} onChange={this.FileChange}></Tag><br/>
            상품 이미지 : <input type={"file"} name={"sp_image"} onChange={this.OnChangeFileMultiful}></input><br/>
            <p>이미지 리스트</p>
            <table>
                <thead className={"imageTable"}>
                </thead>
            </table>
            <Tag tagType={"button"} type={"submit"} text={"등록"}></Tag>
            </form>
        </>);
    }
}

export default StoreAdd;