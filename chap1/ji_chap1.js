function review(alasql){
    console.log(`
    /////////////
    1장 내용 복습
    /////////////
    
    1. 한국어로 하면 참 성질 급한 사람이 일 시키는 언어 SQL문
    
    -------------------------------------
    (열)가져와
        이_열을,기재된_순서대로 AS 별명  
    장소는
        테이블
        
    SELECT
        book_name, price, book_name  
    FROM
        Book
   -------------------------------------
    
    2. 예약어는 대소문자 가능하나 가급적 대문자, 예약어와 뒷부분 내용은 구라고 부름
    
    SELECT 구
    SELECT id, book_name, price      

    FROM 구
    FROM Book
        
    3. 쉼표나 마침표 등 사이에는 공백 필요 없고, 예약어 등에는 공백 필요
    
    SELECT book_name,price,book_name
    FROM Book
        
    4. * 는 테이블 원래 열 순서로, 그게 아니면 적어둔 순서대로 조회됨
    
    5. AS 는 결과 열의 별명을 붙인다.
        
    `)
}
function q1(alasql){
    alasql(
        `
            SELECT 
                *
            FROM 
                Member;
                
            SELECT 
                member_id,
                member_name
            FROM 
                Member;
        `, [], resArr => {
            console.log('/////////////')
            console.log('1장 1번 문제 답')
            console.log('/////////////')

            console.table(resArr[0])
            console.table(resArr[1])
    })
}

function q2(alasql){
    alasql('SELECT member_name, birthday, tel FROM Member;', [], res => {
        console.log('/////////////')
        console.log('1장 2번 문제 답')
        console.log('/////////////')
        console.table(res)
        })
}

function q3(alasql){
    alasql('SELECT member_name AS \'이름\', tel AS \'연락처\' FROM Member;', [], res => {
        console.log('/////////////')
        console.log('1장 3번 문제 답')
        console.log('/////////////')
        console.table(res)
    })
}

console.log('ji 의 chap1 로드됨')

module.exports = {
    review,
    q1,
    q2,
    q3,
}