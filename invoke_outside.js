// var {alasql} = require("./loadAll.js");

function chap1(alasql){
    // 해당 데이터 베이스에 대해 쿼리 실행
    // 형식 db.exec('sql문', 매개변수, 콜백)
    // sql 은 세미콜론으로 구분되어 있으면 차례로 실행, 콜백 결과는 각 sql 문의 실행 결과가 담겨있음
    // 참조 https://github.com/AlaSQL/alasql/wiki/Alasql-Object
    // node 에서 여러줄 문자열은 백틱
    // 참조 https://stackoverflow.com/questions/6220420/how-do-i-do-a-multi-line-string-in-node-js
    alasql(
        `
            SELECT 
                id, book_name, publisher 
            FROM 
                Book;
                
            SELECT 
                id, book_name, price 
            FROM 
                Book;
        `
        // 매개인자 목록은 아무것도 없는 배열
        ,[],
        // 실행 결과를 받는 콜백
        (res) => {
            // 여러 SQL 문을 실행했으면 결과가 배열로 온다.
            console.table(res[0])
            console.table(res[1])
        })
}

// js require 시 내보낼 함수
// https://stackoverflow.com/a/13151726
module.exports = {chap1}