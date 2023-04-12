    const express = require('express');
    const fileUpload = require('express-fileupload');
    const bodyParser = require('body-parser');
    const app = express();
    const port = 4000;
    const cors = require("cors");
    const mysql = require("mysql");
    const db = mysql.createPool({
        host : "localhost",
        user : "root",
        password : "root",
        database : "react_project"
    });

    //요청 데이터를 받기위한 
    app.use(bodyParser.urlencoded({extended : false}));
    app.use(cors());
    app.use(fileUpload());
    app.use(express.static("files"));
    app.use(bodyParser.json());//요청온 데이터를 JSON 으로변형 
    
    
    app.get('/' , (req, res) => {
        res.send("연결 되었습니다..");
    });
    
    
    app.post('/api/userList', (req, res) => {
        db.query("SELECT * FROM store_user" , (err , data) =>{
            if(err) {
                console.log(err);
                res.send(err);
            }else{
                res.send(data);
            }
        });
    });


    app.post('/api/userLogin', (req, res) => {
        console.log(req.body);
        const id = req.body.id;
        const pw = req.body.pw;

        db.query("SELECT su_id AS id , COUNT(*) as count FROM store_user WHERE su_id = ? AND su_pw = ? " ,  [id ,pw] , (err , data) => {
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        });
    });

    app.post("/api/userInsert" , (requset, response) => {
        const id = requset.body.id;
        const pw = requset.body.pw;

        db.query("INSERT INTO store_user (su_id , su_pw) VALUES ( ? , ? );" , [id , pw] , (err , data) => {
            if(err){
                console.log(err);
                response.send(err);
            }else{
                console.log("success");
                response.send(data);
            }
        })

    });

    app.post("/api/fileUpload" , (reqesut, response) => {
        let filePath = __dirname + "/public/Resorces/Store/";
        let file = reqesut.files.file;
        let fileName = file.name;

        file.mv(filePath+fileName, (err) => {
            if(err){
                response.status(500).send({message : "파일 전송 실패" , code : 500 , error : err});
            }else{
                response.status(200).send({message : "파일 전송 성공" , code : 200 , content : "success"});
            }
        });
    });

    app.post("/api/storeInsert" , (requset , response) => {
        console.log(requset);
        const sc_index = requset.body.sc_index;
        const sp_name = requset.body.sp_name;
        const sp_summary = requset.body.sp_summary;
        const sp_price = requset.body.sp_price;
        const sp_thumbnail = requset.body.sp_thumbnail;

        db.query("INSERT INTO store_product (sc_index , sp_name , sp_summary , sp_price , sp_thumbnail) VALUES ( ? , ? , ? , ? , ?);" , [sc_index,sp_name,sp_summary,sp_price,sp_thumbnail] , (err,data) => {
            if(err){
                response.send(err);
            }else{
                response.status(200).send({message : "등록 성공" , code : 200});
            }
        })

    });

    app.post("/api/storeList" , (request, response) => {
        
        const categoryID = request.body.categoryID;

        db.query("SELECT * FROM store_product WHERE sc_index = ? AND sp_able = 1 " , [categoryID] , (err ,data) => {
            if(err){
                response.send(err);
            }else{
                response.status(200).send({message : "success" , code : 200 , list : data});
            }
        })

    });

    app.post("/api/storeDetail" , (request , response) => {
        const id = request.body.id;
        const column = [ "sp_index" , "sc_index" , "sp_name" , "sp_summary" , "sp_price", "sp_thumbnail" , "sp_image" , "sp_visit"];
        db.query("SELECT " + [...column] + " FROM store_product WHERE sp_index = ? " , [id] , (err , data) => {
            if(err){
                 response.status(500).send({message : "검색 오류 발생" , code : 500 , content : err});
            }else{
                response.status(200).send({message : "success" , code  : 200 , content : data});
            }
        });
    });


    app.post("/api/storeVisit" , (requset , response) => {
        const id = requset.body.id === 'null' ? 0 : requset.body.id;
        db.query("UPDATE store_product SET sp_visit = sp_visit + 1 WHERE sp_index = ? " , [id] , (err, data) => {
            if(err){
                response.status(500).send({message : "방문수 업데이트 오류 발생" , code : 500 , content : err});
            }else{
                response.status(200).send({message : "success" , code : 200 , content : "success"});
            }
        })

    })

    app.post("/api/storeDelete" , (request , response) => {
        const id = request.body.id;
        console.log(id);
        db.query("UPDATE store_product SET sp_able = 0 WHERE sp_index = ? " , [id] , (err , data) => {
            if(err){
                response.status(500).send({messgae : "삭제 오류 발생" , code : 500 , content : err});
            }else{
                response.status(200).send({message : "Delete Success" , code : 200 , content : data});
            }
        });

    })

    app.post("/api/categoryList" , (request , response) => {
        db.query("SELECT * FROM store_category" , (err , data) => {
            if(err){
                response.status(500).send({message : "카테고리 조회 실피" , code : 500 , content : data});
            }else{
                response.status(200).send({message : "succes" , code : 200 , content :data});
            }
        });
    });

    app.post("/api/updateStoreList" , (request , response) => {
        const categoryID = request.body.categoryID;
        db.query("SELECT * FROM store_product WHERE sc_index = ? AND sp_able = 1 " , [categoryID] , (err, data) => {
            if(err){
                response.status(500).send({message : "상품 조회 실패" , code :500 , content : err});
            }else{
                response.status(200).send({message : "success" , code : 200 , content : data});
            }
        })
    });

    app.post("/api/storeUpdate" , (request , response) => {
        const sp_index = request.body.sp_index;
        const sc_index = request.body.sc_index;
        const sp_name = request.body.sp_name;
        const sp_summary = request.body.sp_summary;
        const sp_price = request.body.sp_price;
        const sp_thumbnail = request.body.sp_thumbnail;

        db.query("UPDATE store_product SET sc_index = ? , sp_name = ? , sp_summary = ? , sp_price = ? , sp_thumbnail = ? " +
        "WHERE sp_index = ? " , [sc_index , sp_name , sp_summary, sp_price ,sp_thumbnail , sp_index] , (err , data) => {
            if(err){
                response.status(500).send({message : "수정 실패" , code : 500 , content : err});
            }else{
                response.status(200).send({message : "수정 성공" , code : 200 , content : data , status  : "success"});
            }
        })

    });

    
    app.listen(port, ()=>{
        console.log("Connection at http://localhost:"+ {port});
    });

    