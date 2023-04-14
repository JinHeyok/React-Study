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
            <div className={"desc_wrap"}>
              <p>스토어 화면입니다.</p>
            </div>
            {this.state.categoryList.map((data , index) => {
            return (<>
                <div className={"subGnb"}>
                <Link to={"/store/storelist?categoryID=" + data.sc_index } className={"active"}>{data.sc_categoryName}</Link>&nbsp;
                </div>
            </>);
        })}
            </>
        );
    }
}

export default Store;
