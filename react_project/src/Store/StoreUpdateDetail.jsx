import axios, { AxiosHeaders } from "axios";
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
            sp_imageList : [],
            sp_imageNameList : [],
            sp_imageToString  : "",
            sp_defaultImageList : "",
        }
    
        this.OnChangeHandle = this.OnChangeHandle.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.OnChageFile = this.OnChageFile.bind(this);
        this.OnChageFileMulti = this.OnChageFileMulti.bind(this);
        this.OnRemoveHandle = this.OnRemoveHandle.bind(this);
    }

    componentDidMount(){

        var formData = new FormData();
        formData.append("id", this.state.categoryID);
        
        axios.post("/api/storeDetail" , formData)
        .then((response) => {
            const data = response.data.content[0];
            var imageList = [];
            var defaultImage = "";

            if(data.sp_image !== null){
                var imageNmaeArray = data.sp_image.split("|");
                if(imageNmaeArray.length > 1){
                    for (let i = 0; i < imageNmaeArray.length; i++) {
                        imageList.push(imageNmaeArray[i]);
                    }
                }
            }
            if(data.sp_image === null || data.sp_image === ""){
                defaultImage = this.state.sp_defaultImageList;
            }else{
                defaultImage = data.sp_image;
            }
                
            this.setState({
                sp_index : data.sp_index,
                sc_index : data.sc_index,
                sp_name : data.sp_name,
                sp_summary : data.sp_summary,
                sp_thumbnailName : data.sp_thumbnail,
                sp_price : data.sp_price,
                sp_imageNameList : imageList,
                sp_imageToString : data.sp_image,
                sp_defaultImageList : defaultImage,
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

    OnChageFileMulti(e){
        const file = e.target.files;
        var imageToString = "";
        for (let i = 0; i < file.length; i++) {
            this.state.sp_imageList.push(file[i]);

            var extension = file[i].name.split(".").pop();
            var fileName = uuidv4() + '.' + extension;
            this.state.sp_imageNameList.push(fileName); 

            const render = new FileReader();
            render.readAsDataURL(file[i]);
            render.onload = () => {
                const imgArea = document.querySelector(".img_box");
                var imgTag = document.createElement("img");
                var tr = document.createElement("tr");
                var imgtd = document.createElement("td");
                var buttontd = document.createElement("td");
                var button = document.createElement("button");


                tr.className = "img_update";
                tr.value = this.state.sp_imageNameList.length - i - 1;
                imgTag.src = render.result;
                button.onclick = this.OnRemoveHandle;
                button.type = "button";
                button.textContent = "삭제";
                button.value = this.state.sp_imageNameList.length - i - 1;
                button.className = "delete_button";

                imgArea.appendChild(tr);
                tr.appendChild(imgtd);
                tr.appendChild(buttontd);
                imgtd.appendChild(imgTag);
                buttontd.appendChild(button);
            }
        }
        
        for (let j = 0; j < this.state.sp_imageNameList.length; j++) {
            if(this.state.sp_imageNameList.length !== j + 1){
                imageToString += this.state.sp_imageNameList[j] + "|";
            }else{
                imageToString += this.state.sp_imageNameList[j];
            }
        }

        this.setState({
            sp_imagList : this.state.sp_imageList,
            sp_imageNameList : this.state.sp_imageNameList,
            sp_imageToString : imageToString,
        });
    }

    OnRemoveHandle(e){
        const id = e.target.value;
        const trImg = document.querySelectorAll(".img_update");
    
        var imageToString = "";

        for (let i = 0; i < this.state.sp_imageNameList.length; i++) {
           if(i == id){
              this.state.sp_imageList.splice(i , 1);
              this.state.sp_imageNameList.splice(i , 1);
           };
        };
        
        for (let i = 0; i < this.state.sp_imageNameList.length; i++) {
            var data = this.state.sp_imageNameList[i];
            if(this.state.sp_imageNameList.length !== i + 1){
                imageToString += data + "|";
            }else{
                imageToString += data;
            }
        }

        this.setState({
            sp_imageList : this.state.sp_imageList,
            sp_imageNameList : this.state.sp_imageNameList,
            sp_imageToString : imageToString,
            sp_defaultImageList : imageToString
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
        const sp_imageList = this.state.sp_imageList;
        const sp_imageNameList = this.state.sp_imageNameList;
        const sp_imageToString = this.state.sp_imageToString;

        // e.preventDefault();
        // return false;

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

        if(sp_imageList.length !== 0){

            if(sp_imageList.length === 1){

                formData.append("file" , sp_imageList[0]);
                formData.append("fileName" , sp_imageNameList[0]);
                
                axios.post("/api/fileUpload" , formData, {headers: {'Content-Type': 'multipart/form-data', charset: 'utf-8'}})
                .then((response) => {console.log(response)})
                .catch((error) => {console.log(error)});

            }else{

                for (let i = 0; i < sp_imageList.length; i++) {
                    
                    formData.append("file" , sp_imageList[i]);
                    formData.append("fileName" , sp_imageNameList[i]);
                    
                    axios.post("/api/multiFileUpload" , formData, {headers: {'Content-Type': 'multipart/form-data', charset: 'utf-8'}})
                    .then((response) => {console.log(response)})
                    .catch((error) => {console.log(error)});
                    

                }
            }

        }

        formData.append("sp_index" , sp_index);
        formData.append("sc_index" , sc_index);
        formData.append("sp_name" , sp_name);
        formData.append("sp_summary" , sp_summary);
        formData.append("sp_price" , sp_price);
        formData.append("sp_thumbnail" , sp_thumbnailName);
        formData.append("sp_image" , sp_imageToString);

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
        <form onSubmit={this.OnSubmit} encType="multipart/form-data">
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
                <span>이미지 : </span>
                <label htmlFor="sp_thumbnail">
                    <input type={"file"} id="sp_thumbnail"name={"sp_thumbnail"} onChange={this.OnChageFileMulti} multiple></input><br/>
                </label>
                <p>이미지 리스트</p>
                <table>
                    <thead className={"img_box"}>
                    {this.state.sp_defaultImageList.split("|").map((data , index) => { 
                        if(data !== ""){
                            return (<> 
                            <tr className={"img"}> 
                                <td><img src={"/Resorces/Store/" + data}></img></td> 
                                <td><button className={"delete_button"} onClick={this.OnRemoveHandle} type={"button"} key={index} value={index}>삭제</button></td> 
                            </tr> 
                        </>) 
                        }
                    })} 
                    </thead>
                </table>
                <Tag tagType={"button"} type={"submit"} text={"수정"}></Tag>&nbsp;
                <button type="button" onClick={(e) => {window.location.href="/store/storeupdate?categoryID=" + this.state.sc_index}}>돌아가기</button>
        </form>
    </>);
    }
}

export default Detail;