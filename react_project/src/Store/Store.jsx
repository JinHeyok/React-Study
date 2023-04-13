import axios from "axios";
import React from "react";
import {Link} from "react-router-dom"


export class Store extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            path : props.option.path,
            text : props.option.text,
            categoryList : [],
        }
    }

    componentDidMount(){
        console.log("componentDidMount");

        axios.post("/api/categoryList")
        .then((response) => {
            if(response.data.code === 200){
                this.setState({
                    categoryList : response.data.content
                });
            }    
        })
        .catch((error) => {console.log(error)});
    }

    render(){

        return(
            <>
            <h4>스토어 화면입니다.</h4>
            {this.state.categoryList.map((data , index) => {
            return (<>
                <Link to={"/store/storelist?categoryID=" + data.sc_index }>{data.sc_categoryName}</Link>&nbsp;
            </>);
        })}
            </>
        );
    }
}

export default Store;
