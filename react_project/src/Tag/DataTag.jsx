import React from "react";


export class Tag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tagType : props.tagType,
            type : props.type,
            name : props.name,
            class : props.class,
            placeholder : props.placeholder,
            text : props.text,
            onChange : props.onChange,
            onSubmit : props.onSubmit,
            option : props.option,
        };
    }

    render(){
        var tagType = this.state.tagType;
        var name = this.state.name;
        var placeholder = this.state.placeholder;
        var classText = this.state.class;
        var type = this.state.type;
        var text = this.state.text;
        var onChange = this.state.onChange;
        var onSubmit = this.state.onSubmit;
        var onClick = this.state.onClick;
        var option = this.state.option;
        

        if(tagType === "input"){
            return(
                <input type={type} className={classText} name={name} placeholder={placeholder} onChange={onChange}></input>
            )
        }else if(tagType === "button"){
            return(
                <button type={type} onSubmit={onSubmit} onClick={onClick}>{text}</button>
            )
        }else if(tagType === "textarea"){
            return(
                <textarea name={name}></textarea>
            )
        }else if(tagType === "select"){
            return(
                <select name={name} onChange={onChange} defaultValue={option[0]}>
                    {option.map((item, index) => {
                        return <option key={item} value={index + 1}>{item}</option>
                    })}
                </select>
            )
        }
        return(
            <h3>태그 없음</h3>
        )
    }

}