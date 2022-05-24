function chap1_ji(alasql){
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

module.exports = chap1_ji