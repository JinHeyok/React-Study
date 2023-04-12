import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "../Tag/DataTag";

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : "",
            pw : "",
        }
        this.OnSubmitHandle = this.OnSubmitHandle.bind(this);
        this.ChangeHandle = this.ChangeHandle.bind(this);
    }

    ChangeHandle(e){
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name] : value
        });
    }

    OnSubmitHandle(e){

        var id = this.state.id;
        var pw = this.state.pw;
        if(id === ""){
            alert("아이디를 입력해주세요");
            e.preventDefault();
        }else if(pw === ""){
            alert("비밀번호를 입력해주세요");
            e.preventDefault();
        }else{


        var formData = {
            id : id,
            pw : pw
        };
            var reqOption = {
                method : "post",
                headers : {
                    "content-type" : "application/json"
                },
                body :JSON.stringify(formData)
            }

            fetch("/api/userLogin" , reqOption)
            .then((res) => res.json())
            .then(data => {data.map((user) => {
                    if(user.count === 0){
                        alert("존재하지 않는 계정입니다.");
                        return (false);
                    }else{
                        sessionStorage.setItem("user" , user.id);
                        window.location.href = "/store";
                        return (true);
                    }
                });
            });
        }

        e.preventDefault();
    }

    render() {
        const mainTitle = "메인화면입니다.";

        return(
            <>
            <h4>{mainTitle}</h4>
            <form onSubmit={this.OnSubmitHandle}>
                아이디 : <Tag  tagType={"input"} type={"text"} name={"id"} placeholder={"아이디를 입력해주세요"} onChange={this.ChangeHandle}></Tag><br/>
                비밀번호 : <Tag tagType={"input"} type={"text"} name={"pw"} placeholder={"비밀번호를 입력해주세요"} onChange={this.ChangeHandle}></Tag><br />
                <Tag tagType={"button"} type={"submit"} text={"전송"}></Tag>&nbsp;&nbsp;
                <Link to={"/"}>{"돌아가기"}</Link>
            </form>
            
            </>
        )
    }

}

export default Login;