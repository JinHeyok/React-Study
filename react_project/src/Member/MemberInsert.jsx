import React  from "react";
import {Tag} from "../Common/DataTag";
import { Link } from "react-router-dom";


export class MemberInset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : "",
            pw : "",
            pwCheck : "",
        }
        this.OnChangeHandle = this.OnChangeHandle.bind(this);
        this.OnSubMitHandle = this.OnSubMitHandle.bind(this);
    }
    OnSubMitHandle(e){


        var id = this.state.id;
        var pw = this.state.pw;
        var pwCheck = this.state.pwCheck;

        if(id === ""){
            alert("아이디를 입력해주세요");
            this.OnFocus(e , "id");
            return false;
        }else if(pw === ""){
            alert("비밀번호를 입력해주세요");
            this.OnFocus(e , "pw");
            return false;
        }else if(pwCheck === ""){
            alert("비밀번호 확인을 입력해주세요");
            this.OnFocus(e , "pwCheck");
            return false;
        }else if(pw !== pwCheck){
            alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
            return false;
        }


        var formData = {
            id : id,
            pw : pw
        }

            var requsetOption = {
                method : "post",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(formData)
            }
            
            fetch("/api/userInsert" , requsetOption)
            .then((res) => res.json())
            .then(data => {
            if(data.affectedRows === 1){
                alert("정상적으로 등록되었습니다.");
                window.location.href = "/";
            }else{
                alert("오류가 발생했습니다. \n" , data);
            }
        });

        e.preventDefault();

    }

    OnFocus(e , id){
        Array.from(e.target).find(element => element.name === id).focus();
    }

    OnChangeHandle(e){
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name] : value
        });

    }

    render(){
        return (
            <>
                <h4>회원가입</h4>
                <form onSubmit={this.OnSubMitHandle}>
                    아이디 : <Tag tagType={"input"} type={"text"} name={"id"} placeholder={"아이디를 입력해주세요"} onChange={this.OnChangeHandle}></Tag><br />
                    비밀번호 : <Tag tagType={"input"} type={"text"} name={"pw"} placeholder={"비밀번호를 입력해주세요"} onChange={this.OnChangeHandle}></Tag><br />
                    비밀번호 확인 : <Tag tagType={"input"} type={"text"} name={"pwCheck"} placeholder={"비밀번호 확인"} onChange={this.OnChangeHandle}></Tag> <br />
                    <Tag tagType={"button"} type={"submit"} text={'전송'}></Tag>&nbsp;
                    <Link to={"/"}>{"돌아가기"}</Link>
                </form>
            </>
        )
    }

}

export default MemberInset;