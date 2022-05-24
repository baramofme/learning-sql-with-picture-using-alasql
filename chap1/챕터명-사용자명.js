function 질문1(alasql){
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
        `, [], resArr => {
        console.table(resArr[0])
        console.table(resArr[1])
    })
}

function 질문2(alasql){
    alasql('SELECT * FROM Book;', [], res => {
            console.table(res)
        })
}

console.log('챕터명_사용자명 로드됨')

module.exports = {
    질문1: 질문1,
    질문2: 질문2
}