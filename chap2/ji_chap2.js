function review(alasql){
    console.log(`
    /////////////
    2장 내용 복습
    /////////////
    
    1. From 으로 테이블 부터 선택하고, Where 로 행(레코드)를 필터링 하고, 그 이후에 Select 로 열을 필터링 함.
       책 후반부에 관련 내용 나옴.
       이 양놈들이.. 테이블 없이는 열 선택 못한다는 거 알면서도, 지네들 어순에 맞춰가지고 구지구지 select 문을 맨 앞에 두는 참사...
    
    -------------------------------------
    
    FROM 절로 테이블 선택
    
    >console.table(alasql('SELECT * FROM Customer'))
    ┌─────────┬─────────────┬───────────────┬───────────────────────┬───────────────┐
    │ (index) │ customer_id │ customer_name │       birthday        │ membertype_id │
    ├─────────┼─────────────┼───────────────┼───────────────────────┼───────────────┤
    │    0    │      1      │   '김바람'    │ '1984-06-24 00:00:00' │       2       │
    │    1    │      2      │   '이구름'    │ '1990-07-16 00:00:00' │       1       │
    │    2    │      3      │   '박하늘'    │ '1976-03-09 00:00:00' │       2       │
    │    3    │      4      │    '강산'     │ '1991-05-04 00:00:00' │       1       │
    │    4    │      5      │   '유바다'    │ '1993-04-21 00:00:00' │       2       │
    └─────────┴─────────────┴───────────────┴───────────────────────┴───────────────┘
    undefined

    WHERE 절로 행 선택(필터링)
    
    >console.table(alasql('SELECT * FROM Customer WHERE membertype_id = 2'))
    
    선택된(남은) 행
    ┌─────────┬─────────────┬───────────────┬───────────────────────┬───────────────┐
    │ (index) │ customer_id │ customer_name │       birthday        │ membertype_id │
    ├─────────┼─────────────┼───────────────┼───────────────────────┼───────────────┤
    │    0    │      1      │   '김바람'    │ '1984-06-24 00:00:00' │       2       │
    │    1    │      3      │   '박하늘'    │ '1976-03-09 00:00:00' │       2       │
    │    2    │      5      │   '유바다'    │ '1993-04-21 00:00:00' │       2       │
    └─────────┴─────────────┴───────────────┴───────────────────────┴───────────────┘
    
    선택되지 않은(제거된) 행
    ┌─────────┬─────────────┬───────────────┬───────────────────────┬───────────────┐
    │ (index) │ customer_id │ customer_name │       birthday        │ membertype_id │
    ├─────────┼─────────────┼───────────────┼───────────────────────┼───────────────┤
    │    1    │      2      │   '이구름'    │ '1990-07-16 00:00:00' │       1       │
    │    3    │      4      │    '강산'     │ '1991-05-04 00:00:00' │       1       │
    └─────────┴─────────────┴───────────────┴───────────────────────┴───────────────┘

    >console.table(alasql('SELECT customer_name FROM Customer WHERE membertype_id = 2'))
    
    SELECT 절로 열 선택(필터링)
    
    선택된(남은) 열
    ┌─────────┬───────────────┐
    │ (index) │ customer_name │
    ├─────────┼───────────────┤
    │    0    │   '김바람'    │
    │    1    │   '박하늘'    │
    │    2    │   '유바다'    │
    └─────────┴───────────────┘
    
    선택되지 않은(제거된) 열
    ┌─────────┬─────────────┬───────────────────────┬───────────────┐
    │ (index) │ customer_id │       birthday        │ membertype_id │
    ├─────────┼─────────────┼───────────────────────┼───────────────┤
    │    0    │      1      │ '1984-06-24 00:00:00' │       2       │
    │    1    │      3      │ '1976-03-09 00:00:00' │       2       │
    │    2    │      5      │ '1993-04-21 00:00:00' │       2       │
    └─────────┴─────────────┴───────────────────────┴───────────────┘
    
    -------------------------------------
    
    2. WHERE 구에 들어가는 연산자는 좌우 비교 후 0, 1, NULL 을 반환
       쉼표와 세미콜론과 같이 연산자 좌우에는 공백을 넣어주지 않아도 됨.
       공백은 예약어 앞뒤로만 넣는다.
       
    3. SELECT 구에 연산자를 쓸 수도 있다. 즉 SELECT 구에 표현식을 넣으면, 그 표현식에 해당하는 테이블 열을 생성하라고 받아들인다는 걸 알 수 있음.
    
    -------------------------------------
    SELECT 구에 1 != 2 와 2<2 를 넣은 결과는? 질의 문자열이 열의 헤더가 되고, 질의의 답이 필드로 채워진 레코드가 만들어진다.
    
    >console.table(alasql('SELECT 1 != 2, 2< 2, customer_name FROM Customer WHERE membertype_id = 2'))
    ┌─────────┬────────┬───────┬───────────────┐
    │ (index) │ 1 != 2 │ 2 < 2 │ customer_name │
    ├─────────┼────────┼───────┼───────────────┤
    │    0    │  true  │ false │   '김바람'    │
    │    1    │  true  │ false │   '박하늘'    │
    │    2    │  true  │ false │   '유바다'    │
    └─────────┴────────┴───────┴───────────────┘
    undefined
    -------------------------------------
       
    4. NULL 인지 아닌지 연산
       
       NULL 데이터베이스 내(필드)의 데이터 값이 존재하지 않는다. 빈 문자열, 공백 문자열, 0과는 다름.
       NULL 은 값이 아니니 NULL 연산은 일반 연산과 다르다.
       일반 연산을 일반값과 NULL 에 적용하면 모두 NULL 이 나온다.
       값이 아닌 거랑 값이랑 했으니 값이 아닌 게 나오는 게 맞다고 생각.
       
       
    -------------------------------------       
    필드(값) IS NULL  - 열에 해당하는 필드 값이 NULL 인 것
    필드(값) IS NOT NULL - 열에 해당하는 필드 값이 NULL 이 아닌 것
       
    >console.table(alasql('SELECT 1 = NULL, 1 IS NULL, NULL IS NULL, 1 != NULL, 1<> NULL, 1 < NULL'))
    ┌─────────┬───────────┬───────────┬──────────────┬───────────┬───────────┐
    │ (index) │ 1 = NULL  │ 1 IS NULL │ NULL IS NULL │ 1 != NULL │ 1 < NULL  │
    ├─────────┼───────────┼───────────┼──────────────┼───────────┼───────────┤
    │    0    │ undefined │   false   │     true     │ undefined │ undefined │
    └─────────┴───────────┴───────────┴──────────────┴───────────┴───────────┘

    <=> 연산자도 있다. ALASQL 에서 지원하지 않아서 부득이 AS 키워드를 사용함
   
    >console.table(alasql('SELECT 1 = NULL, 1 IS NULL AS \\'1 <=> NULL\\', NULL IS NULL AS \\'NULL <=> NULL\\', 1 != NULL, 1<> NULL, 1 < NULL'))
    ┌─────────┬───────────┬──────────────┬─────────────────┬───────────┬───────────┐
    │ (index) │ 1 = NULL  │ '1 <=> NULL' │ 'NULL <=> NULL' │ 1 != NULL │ 1 < NULL  │
    ├─────────┼───────────┼──────────────┼─────────────────┼───────────┼───────────┤
    │    0    │ undefined │    false     │      true       │ undefined │ undefined │
    └─────────┴───────────┴──────────────┴─────────────────┴───────────┴───────────┘
    -------------------------------------
       
    5. BOOLEAN 연산
    True 는 1, FALSE 는 0 테이블에 TINYINT(1) 이라서 1자리 정수라 다른 값도 들어가버림
    = 과 IS 를 사용할 수 있지만 좀 다름
    
    = 는 True False 를 1 과 0 으로 바꿔서 평가한다.
    IS 는 기준점 False 를 0 으로 잡고 그 외의 모든 것을 True 로 평가한다.

    -------------------------------------
    = 는 True 를 1 , False 를 0 으로 변환해서 비교하므로, 값이 딱 맞아야 함.  
   
    >console.table(alasql('SELECT 1 = 1 AS \\'1 = TRUE\\', 0 = 0 AS \\'0 = FALSE\\', 100 = 0 AS \\'100 = TRUE\\''))
    ┌─────────┬────────────┬─────────────┬──────────────┐
    │ (index) │ '1 = TRUE' │ '0 = FALSE' │ '100 = TRUE' │
    ├─────────┼────────────┼─────────────┼──────────────┤
    │    0    │    true    │    true     │    false     │
    └─────────┴────────────┴─────────────┴──────────────┘
    undefined
  
    IS 연산자는 0 만 FALSE 이고 0 외의 모든 수는 TRUE 가 나온다.
    
    >console.table(alasql('SELECT 0 IS FALSE, 1 IS TRUE, 100 IS TRUE'))
    ┌─────────┬────────────┬───────────┬─────────────┐
    │ (index) │ 0 IS FALSE │ 1 IS TRUE │ 100 IS TRUE │
    ├─────────┼────────────┼───────────┼─────────────┤
    │    0    │    true    │   true    │    true     │
    └─────────┴────────────┴───────────┴─────────────┘
    undefined
    
    IS NOT 도 당옇니 
    ┌─────────┬────────────┬───────────┬─────────────┐
    │ (index) │ 0 IS NOT TRUE │ 1 IS TRUE │ 100 IS TRUE │
    ├─────────┼────────────┼───────────┼─────────────┤
    │    0    │    true    │   true    │    true     │
    └─────────┴────────────┴───────────┴─────────────┘
    
    아 근데 ALASQL 에서 IS NOT 이 제대로 구현되지 않은 듯
    문서도 없고 
    https://github.com/AlaSQL/alasql/search?q=is+not&type=wikis
    일단 이슈 올려두었다.
    https://github.com/AlaSQL/alasql/issues/146    
   
    
    >console.table(alasql('SELECT 0 IS NOT TRUE, -1 IS NOT TRUE, 1 IS NOT TRUE'))
    ┌─────────┬────────────────┬─────────────────┬────────────────┐
    │ (index) │ 0 IS NOT(TRUE) │ -1 IS NOT(TRUE) │ 1 IS NOT(TRUE) │
    ├─────────┼────────────────┼─────────────────┼────────────────┤
    │    0    │      true      │      true       │      true      │
    └─────────┴────────────────┴─────────────────┴────────────────┘
    
    >console.table(alasql('SELECT 0 IS NOT 1, -1 IS NOT 1, 1 IS NOT 1, 100 IS NOT 1'))
    ┌─────────┬─────────────┬──────────────┬─────────────┬───────────────┐
    │ (index) │ 0 IS NOT(1) │ -1 IS NOT(1) │ 1 IS NOT(1) │ 100 IS NOT(1) │
    ├─────────┼─────────────┼──────────────┼─────────────┼───────────────┤
    │    0    │    true     │     true     │    true     │     true      │
    └─────────┴─────────────┴──────────────┴─────────────┴───────────────┘


    -------------------------------------
        
    3. 문자열 연산(검색)
    
    Where 절에서 값이 특정 문자열과 일치하는 지 일부가 포함되는 지 연산 가능
    
    = 대소문자와 단어 뒤 공백 상관없이 일치 검색
    = BINARY 대소문자 공백 정확히 일치 검색
    LIKE 문자열 뒤 공백 정확히 일치
    LIKE BINARY 대소문자 정확히 일치
    LIKE % 일부 
    
    근데 .. ALASQL 은 자바스크립트 객체로 변환된 상태라 SQL 과 문자열 연산 결과가 좀 다르다.
    MySQL 이랑 똑같은 결과를 내려고 하니까. 평가는 자바스크립트로 하고, AS 로 열 헤더 내용만 바꾸는 것이 곡예하는 거 같다. ㅋ
    
    -------------------------------------
    
    MYSQL 에서 = 연산자로 문자열 비교를 하면 다음과 같이 결과가 나온다.
    
    >console.table(alasql('select id,val as "val = \\'a\\'"from Search_1 where val LIKE "A%"'))
    ┌─────────┬────┬─────────────┐
    │ (index) │ id │ 'val = 'a'' │
    ├─────────┼────┼─────────────┤
    │    0    │ 1  │     'A'     │  // 대소문자 구분 없이
    │    1    │ 2  │     'a'     │  
    │    2    │ 3  │    'A  '    │  // 문자열 끝 공백 무시
    └─────────┴────┴─────────────┘  

    대소문자와 끝공백 무시 문제 해결하려면 BINARY 키워드를 쓰면 된다.
        
    >console.table(alasql('select id,val, val = "A" or val like "a%" as "val = \\'A\\'", val = "A" as "val = BINARY \\'A\\'"from Search_1'))
    ┌─────────┬────┬───────┬─────────────┬────────────────────┐
    │ (index) │ id │  val  │ 'val = 'A'' │ 'val = BINARY 'A'' │  // BINARY 사용하면
    ├─────────┼────┼───────┼─────────────┼────────────────────┤
    │    0    │ 1  │  'A'  │    true     │        true        │
    │    1    │ 2  │  'a'  │    true     │       false        │  // 대소문자를 무시하지 않고 구분하고
    │    2    │ 3  │ 'A  ' │    true     │       false        │  // 문자끝 공백도 무시하지 않고 구분한다.
    │    3    │ 4  │  'B'  │    false    │       false        │  // 당연히 다른 문자는 구분을 하지, BINARY 안 써도.
    └─────────┴────┴───────┴─────────────┴────────────────────┘

    LIKE 는 = 와 다른 점이, 대소문자 구분은 무시하는데, 끝문자 공백은 무시하지 않는다.
    
    >console.table(alasql('select id,val, val like "A%" or val like "a%" as "val = \\'A\\'", val like "A" or val like "a" as "val like \\'A\\'" from Search_1'))
    ┌─────────┬────┬───────┬─────────────┬────────────────┐
    │ (index) │ id │  val  │ 'val = 'A'' │ 'val like 'A'' │
    ├─────────┼────┼───────┼─────────────┼────────────────┤
    │    0    │ 1  │  'A'  │    true     │      true      │
    │    1    │ 2  │  'a'  │    true     │      true      │
    │    2    │ 3  │ 'A  ' │    true     │     false      │ // LIKE 는 일치 여부 연산 때, 끝 이후 공백을 신경쓴다.
    │    3    │ 4  │  'B'  │    false    │     false      │
    └─────────┴────┴───────┴─────────────┴────────────────┘

    >console.table(alasql('select id,val, val like "A%" or val like "a%" as "val = \\'A\\'", val like "A" or val like "a" as "val like \\'A\\'", val = "A" as "val like binary \\'A\\'" from Search_1'))
    ┌─────────┬────┬───────┬─────────────┬────────────────┬───────────────────────┐
    │ (index) │ id │  val  │ 'val = 'A'' │ 'val like 'A'' │ 'val like binary 'A'' │
    ├─────────┼────┼───────┼─────────────┼────────────────┼───────────────────────┤
    │    0    │ 1  │  'A'  │    true     │      true      │         true          │
    │    1    │ 2  │  'a'  │    true     │      true      │         false         │ // like binary 는 대소문자 신경써서 일치여부 연산한다.
    │    2    │ 3  │ 'A  ' │    true     │     false      │         false         │
    │    3    │ 4  │  'B'  │    false    │     false      │         false         │
    └─────────┴────┴───────┴─────────────┴────────────────┴───────────────────────┘
    
    -------------------------------------        
    
    4. LIKE 임의의 문자열 포함과 문자열 이스케이프
    
    문자열 일치가 아니라 일부를 포함할 경우도 검색이 가능하다.
    
    >console.table(alasql('select product_name, product_name like "약용_입__", product_name like "약용%"  from Product'))
    ┌─────────┬──────────────────────┬───────────────────────────────┬───────────────────────────┐
    │ (index) │     product_name     │ product_name LIKE '약용_입__'  │ product_name LIKE '약용%'  │
    ├─────────┼──────────────────────┼───────────────────────────────┼───────────────────────────┤
    │    0    │    '약용 입욕제'       │             true              │           true            │ // _ 는 임의의 한 글자만 포함
    │    1    │    '약용 핸드솝'       │             false             │           true            │ // % 는 임의의 0개 이상의 글자 포함
    │    2    │ '천연 아로마 입욕제'    │             false             │           false           │
    │    3    │    '거품 목욕제'       │             false             │           false           │
    └─────────┴──────────────────────┴───────────────────────────────┴───────────────────────────┘

    NOT LIKE 예시 

    >console.table(alasql('select product_name, product_name like "%용%", product_name like "%욕%", product_name not like "%제" from Product'))
    ┌─────────┬──────────────────────┬──────────────────────────┬──────────────────────────┬───────────────────────────────┐
    │ (index) │     product_name     │ product_name LIKE '%용%' │ product_name LIKE '%욕%' │ 'product_name like not '%제'' │
    ├─────────┼──────────────────────┼──────────────────────────┼──────────────────────────┼───────────────────────────────┤
    │    0    │    '약용 입욕제'     │           true           │           true           │             false             │
    │    1    │    '약용 핸드솝'     │           true           │          false           │             true              │ // 제로 끝나지 않는 유일한 레코드
    │    2    │ '천연 아로마 입욕제' │          false           │           true           │             false             │
    │    3    │    '거품 목욕제'     │          false           │           true           │             false             │
    └─────────┴──────────────────────┴──────────────────────────┴──────────────────────────┴───────────────────────────────┘

    특수문자 % 자체를 검색하려고 하면 어떻게 해야할까? 백슬래시(\) 기호로 이스케이핑 하면 된다.
        
    >console.table(alasql('select product_name from Product where product_name like "%100\\%%"'))
    ┌─────────┬───────────────────┐
    │ (index) │   product_name    │
    ├─────────┼───────────────────┤
    │    0    │  '비누 딸기100%'  │
    │    1    │ '100%우유_입욕제' │
    └─────────┴───────────────────┘


    5. 날짜와 문자열 대소 비교
    
    날짜도 대소 비교가 가능하다.
    
    >console.table(alasql('select customer_name, birthday  from Customer ORDER BY ASC')
    >console.table(alasql('SELECT customer_name, birthday FROM Customer WHERE birthday < "1990-01-01" ORDER BY birthday ASC'))
    
    birthday 오름차순 정렬                                    1990-01-01 보다 작은 날짜 레코드만 필터링
    ┌─────────┬───────────────┬───────────────────────┐   ┌─────────┬───────────────┬───────────────────────┐
    │ (index) │ customer_name │       birthday        │   │ (index) │ customer_name │       birthday        │
    ├─────────┼───────────────┼───────────────────────┤   ├─────────┼───────────────┼───────────────────────┤
    │    0    │   '박하늘'     │ '1976-03-09 00:00:00' │   │    0    │   '박하늘'     │ '1976-03-09 00:00:00' │
    │    1    │   '김바람'     │ '1984-06-24 00:00:00' │   │    1    │   '김바람'     │ '1984-06-24 00:00:00' │
    │    2    │   '이구름'     │ '1990-07-16 00:00:00' │   └─────────┴───────────────┴───────────────────────┘
    │    3    │    '강산'     │ '1991-05-04 00:00:00' │
    │    4    │   '유바다'     │ '1993-04-21 00:00:00' │
    └─────────┴───────────────┴───────────────────────┘

    문자열도 대소비교가 되는데.. MYSQL 과 JS 간 문자 체계가 달라서 결과가 다르다. 
    MYSQL a < A
    js A < a
    
    오름차순 정렬. 즉 대문자가 ASCII 체계에서 앞쪽에 위치해서.. MYSQL 과는 다른 결과가 나옴.
    
    오름차순 정렬.          소문자 b 보다 큰 문자열 필터링
    ┌─────────┬───────┐  ┌─────────┬─────┐
    │ (index) │  val  │  │ (index) │ val │
    ├─────────┼───────┤  ├─────────┼─────┤
    │    0    │  'A'  │  │    0    │ 'c' │
    │    1    │ 'A  ' │  │    1    │ 'd' │
    │    2    │  'B'  │  └─────────┴─────┘
    │    3    │  'C'  │
    │    4    │  'D'  │
    │    5    │  'a'  │
    │    6    │  'b'  │
    │    7    │  'c'  │
    │    8    │  'd'  │
    └─────────┴───────┘
    
    숫자로는 10이 4보다 크지만. 사전순(js 에서는 ascii 코드 순)으로는 '4' 가 '10' 보다 뒤에 있다.
    >console.table(alasql('SELECT 4<10, "4" < "10"'))
    ┌─────────┬────────┬────────────┐
    │ (index) │ 4 < 10 │ '4' < '10' │
    ├─────────┼────────┼────────────┤
    │    0    │  true  │   false    │
    └─────────┴────────┴────────────┘


    
    기타
    
    자꾸 이식이 안된 기능이 나와서 곤란하네~
    보니까 ALASQL 이 아니라. SQL.js(SQLite) 를 쓰는 게 나을듯.
    아래 글을 보니 둘 다 표준 SQL 을 기반으로 만들어 졌고. 
    https://www.quora.com/What-is-the-difference-between-MySQL-and-SQLite-syntax-and-keywords
    그러나 SQLITE 에서 구현되지 않은 부분이 있다고 함
    https://sqlite.org/omitted.html
    
    아래분은 w3school 에서 온라인 mysql 쿼리 연습하던데 쿼리 예시가 아주 좋다.
    https://harrydony.tistory.com/903
        
    `)
}
function q1(alasql){
    alasql(
        `
            SELECT 
                id,
                book_name,
                price
            FROM 
                Book
            WHERE
                publisher='세계사';
                
            SELECT 
                *
            FROM 
                Book
            WHERE
                book_name LIKE '%이탈리아어%'
        `, [], resArr => {
            console.log('/////////////')
            console.log('1장 1번 문제 답')
            console.log('/////////////')

            console.table(resArr[0])
            console.table(resArr[1])
    })
}

function q2(alasql){

        console.log('/////////////')
        console.log('1장 2번 문제 답')
        console.log('/////////////')
        console.log(`
        1. price 가 1000 이상
            price >= 1000
            
        2. release_date 가 '2019-11-15' 이외 => 이상/이하가 아니고?
            release_date NOT '2019-11-15'
            
            땡 => release_date <> '2019-11-15' 혹은 release_date != '2019-11-15'
             
        3. column_a 가 NULL 인 경우
           column_a IS NULL
           column_a <=> NULL
           
        4. column_b 안에 '문자열'을 포함하지 않을 경우 => 컬럼 타입가지고 하는 것도 있나?
           column_b ??
           
           땡 => NOT LIKE '%문자열%'   아 글치 포함이 LIKE '%%' 고 포함 안하는 거니 NOT LIKE 였어..
           
        나는 명확하지 않을 경우 추론 하려는 시도를 잘 안하는 거 같다. 작은 힌트를 가지고 가설을 세우고.. 이런 거 안하고 무조건 모른다고 해 ㅠㅠ 엉엉.
        이외의 => 값 바깥 범위 , 같지 않음 != , <>
        포함하지 않을 => LIKE "%%" + NOT
        `)

}

function q3(alasql){
    console.log('/////////////')
    console.log('1장 3번 문제 답')
    console.log('/////////////')

    console.log(`
    이스케이프 처리
    
    1. 가격은 \\100
    2. 1\t\'데이터2\'
    `)
}

console.log('ji 의 chap2 로드됨')

module.exports = (populatedAlasql)=> {
    // 클로저처리가 되어서 populatedAlasql 가 클로저 내부에 저장됨.
    // 리턴되는 함수가 호출될 때 부모 클로저 안에 populatedAlasql 에 접근 가능
    return {
        review: () =>{ review(populatedAlasql)},
        q1: () =>{ q1(populatedAlasql) },
        q2: () =>{ q2(populatedAlasql) },
        q3: () =>{ q3(populatedAlasql) }
    }
}