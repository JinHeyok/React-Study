import React from "react";
import { Link } from "react-router-dom";



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
                    <Link to="/">메인</Link>&nbsp;
                    <Link to={this.state.path}>{this.state.text}</Link>&nbsp;
                    <Link to="/store">스토어페이지</Link>&nbsp;
                    <Link to="/memberInsert">회원가입</Link>&nbsp;
                </>
            )
        }else if(this.state.user === "master"){
            return (
                <>
                    <Link to="/">메인</Link>&nbsp;
                    <Link to={this.state.path}>{this.state.text}</Link>&nbsp;
                    <Link to="/store">스토어페이지</Link>&nbsp;
                    <Link to="/memberInsert">회원가입</Link>&nbsp;
                    <Link to="/store/add">상품 등록</Link>&nbsp;
                    <Link to="/store/storeupdate">상품 수정</Link>
                </>
            )
        }
    }

}

export default Headers;