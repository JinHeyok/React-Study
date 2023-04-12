import React from "react";
import { Link } from "react-router-dom";



export class Headers extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            path : props.option.path,
            text : props.option.text
        }
    }

    render(){
        
        return (
            <>
                <Link to="/">메인</Link>&nbsp;
                <Link to={this.state.path}>{this.state.text}</Link>&nbsp;
                <Link to="/store">상품페이지</Link>&nbsp;
                <Link to="/memberInsert">회원가입</Link>&nbsp;
                <Link to="/store/add">상품 등록</Link>&nbsp;
                <Link to="/store/storeupdate">상품 수정</Link>
            </>
        )
    }

}

export default Headers;