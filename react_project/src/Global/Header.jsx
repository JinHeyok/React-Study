import React from "react";
import { Link } from "react-router-dom";
import "./../CSS/style.css";


export class Headers extends React.Component{

    constructor(props){
        super(props);
        console.log(props.option.user);
        this.state = {
            path : props.option.path,
            text : props.option.text,
            user : props.option.user,
        }
    }

    render(){
        if(this.state.user === "user" || this.state.user === null){
            return (
                <>
                <div className={"top"}>
                    <Link to="/" className={"logo"}>메인</Link>&nbsp;
                    <div className="topUtill">
                    <Link to={this.state.path}><i className="xi-log-out"></i>{this.state.text}</Link>&nbsp;
                    <Link to="/memberInsert"><i className={"xi-user-plus"}></i>회원가입</Link>&nbsp;
                    </div>
                </div>
                <div className={"gnb"}>
                    <Link to="/store" className={"active"}>스토어페이지</Link>&nbsp;
                </div>
                </>
            )
        }else if(this.state.user === "master"){
            return (
                <>
                <div className={"top"}>
                    <Link to="/" className={"logo"}>메인</Link>&nbsp;
                    <div className="topUtill">
                    <Link to={this.state.path}><i className="xi-log-out"></i>{this.state.text}</Link>&nbsp;
                    <Link to="/memberInsert"><i className={"xi-user-plus"}></i>회원가입</Link>&nbsp;
                    </div>
                </div>
                <div className={"gnb"}>
                    <Link to="/store" className={"active"}>스토어페이지</Link>&nbsp;
                    <Link to="/store/add">상품 등록</Link>&nbsp;
                    <Link to="/store/storeupdate">상품 수정</Link>
                </div>
                </>
            )
        }
    }

}

export default Headers;