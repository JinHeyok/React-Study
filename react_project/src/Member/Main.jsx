import React, { useEffect, useState } from "react";

function UserList() {

    const [userList , setUserList] = useState([]);
    
    useEffect(() => {
        
        var reqOption = {
            method : "post",
            headers : {
                "content-type" : "application/json"
            }
        }
        
        fetch("/api/userList" , reqOption)
        .then((res) => res.json())
        .then(data =>  setUserList(data));
        return () => {
        }
        
    }, []);
        return userList;
    }


    
function Main(){
        const List = UserList();
        return(
        <>
            <p>메인화면입니다.</p>
            <table>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>패스워드</th>
                    </tr>
                </thead>
                <tbody>

            {List.map((data , index) => {
                return <tr key={data.su_index}>
                         <td>{data.su_id}</td>
                         <td>{data.su_pw}</td>
                      </tr>
            })}
                </tbody>
            </table>
        </>
        ); 
 }

 export default Main;