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
        `
        ,[],
        (res) => {
            console.table(res[0])
            console.table(res[1])
        })
}

module.exports = chap1_ji