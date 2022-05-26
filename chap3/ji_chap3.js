function review(alasql){
    console.log(`
    /////////////
    2장 내용 복습
    /////////////
    
    1. 논리 연산자
    
       AND(&&) 논리곱 - 둘 다 참(1)일 때면 곱해서 참(1)
       OR(||) 논리합 - 둘 중 하나가 참(1)이면 합해서 참(1 이상)
       NOT(!) 부정 - 거짓(0) 이면 참(1) 로 바꾸고, 참(1 이상)은 모두 거짓(0)으로 바꿈
       XOR  베타적 논리합 - 더해서 엄밀하게 참(1)이 될 떄만 참(1), 더해서 거짓(0) 이나 1이 초과하는 참은 거짓. 
                          베타적 논리합은 둘중에 한 조건맞 맞아야 하고 둘 다 맞는 케이스는 빼고 싶을 때 씀
 
    -------------------------------------

    논리곱 - AND 사용
    
    >console.table(alasql('SELECT product_name, price >= 100, price < 150, price >= 100 AND price < 150 FROM Product'))
    ┌─────────┬──────────────────────┬──────────────┬─────────────┬──────────────────────────────┐
    │ (index) │     product_name     │ price >= 100 │ price < 150 │ price >= 100 AND price < 150 │
    ├─────────┼──────────────────────┼──────────────┼─────────────┼──────────────────────────────┤
    │    0    │    '약용 입욕제'     │    false     │    true     │            false             │
    │    1    │    '약용 핸드솝'     │     true     │    false    │            false             │
    │    2    │ '천연 아로마 입욕제' │     true     │    true     │             true             │ // AND 양쪽이 참
    │    3    │    '거품 목욕제'     │     true     │    true     │             true             │ // AND 양쪽이 참
    │    4    │   '비누 딸기100%'    │     true     │    false    │            false             │
    │    5    │  '100%우유_입욕제'   │     true     │    true     │             true             │ // AND 양쪽이 참
    └─────────┴──────────────────────┴──────────────┴─────────────┴──────────────────────────────┘
    undefined
    >console.table(alasql('SELECT product_name, price >= 100, price < 150, price >= 100 AND price < 150 FROM Product WHERE price >= 100 AND price < 150'))
    ┌─────────┬──────────────────────┬──────────────┬─────────────┬──────────────────────────────┐
    │ (index) │     product_name     │ price >= 100 │ price < 150 │ price >= 100 AND price < 150 │
    ├─────────┼──────────────────────┼──────────────┼─────────────┼──────────────────────────────┤
    │    0    │ '천연 아로마 입욕제' │     true     │    true     │             true             │
    │    1    │    '거품 목욕제'     │     true     │    true     │             true             │
    │    2    │  '100%우유_입욕제'   │     true     │    true     │             true             │
    └─────────┴──────────────────────┴──────────────┴─────────────┴──────────────────────────────┘

    AND 가 연속이면 앞에 AND 해결 후 그 결과를 다음 AND 의 앞부분 피연산자로 사용.
    
    >console.table(alasql('SELECT product_name, price >= 100 AND price < 150, stock >= 10 FROM Product'))
    ┌─────────┬──────────────────────┬──────────────────────────────┬─────────────┐
    │ (index) │     product_name     │ price >= 100 AND price < 150 │ stock >= 10 │
    ├─────────┼──────────────────────┼──────────────────────────────┼─────────────┤
    │    0    │    '약용 입욕제'     │            false             │    true     │
    │    1    │    '약용 핸드솝'     │            false             │    true     │
    │    2    │ '천연 아로마 입욕제' │             true             │    false    │
    │    3    │    '거품 목욕제'     │             true             │    true     │ // 앞선 AND 연산 결과가 뒤 연산의 피연산자로 사용
    │    4    │   '비누 딸기100%'    │            false             │    true     │
    │    5    │  '100%우유_입욕제'   │             true             │    true     │ // 앞선 AND 연산 결과가 뒤 연산의 피연산자로 사용
    └─────────┴──────────────────────┴──────────────────────────────┴─────────────┘
    undefined
    >console.table(alasql('SELECT product_name, price >= 100 AND price < 150, stock >= 10 FROM Product WHERE price >= 100 AND price < 150 AND stock >= 10'))
    ┌─────────┬───────────────────┬──────────────────────────────┬─────────────┐
    │ (index) │   product_name    │ price >= 100 AND price < 150 │ stock >= 10 │
    ├─────────┼───────────────────┼──────────────────────────────┼─────────────┤
    │    0    │   '거품 목욕제'   │             true             │    true     │
    │    1    │ '100%우유_입욕제' │             true             │    true     │
    └─────────┴───────────────────┴──────────────────────────────┴─────────────┘
    undefined
        
    -------------------------------------
    
    2. AND 연산과 NULL 
       
       0 AND NULL 은 0 이고, 그 외에 나머지는 모두 NULL 을 반환
       
    -------------------------------------
    ALASQL 에서는 NULL 대신에 undefined 가 나온다.. 끙.. 여튼 NULL 이 undefined 에 대응되는 게 맞다.
    JS 에서 NULL 은 의도를 가지고 비워놓은 것이고, undefined 는 컴파일러 내부에 값이 없는 거니까.
    테이블 내에 값이 없는 것이 NULL 이니까. JS 에서는 undefined 에 대응되는 것이 말이된다.
    
    >console.table(alasql('SELECT 0 AND NULL, 1 AND NULL, NULL AND NULL'))
    ┌─────────┬────────────┬────────────┬───────────────┐
    │ (index) │ 0 AND NULL │ 1 AND NULL │ NULL AND NULL │
    ├─────────┼────────────┼────────────┼───────────────┤
    │    0    │     0      │ undefined  │   undefined   │
    └─────────┴────────────┴────────────┴───────────────┘

    -------------------------------------
    
    3. OR 논리합 사용
    
    -------------------------------------
    >console.table(alasql('SELECT product_name, price<100, price>=150, price < 100 OR price >= 150 FROM Product'))
    ┌─────────┬──────────────────────┬─────────────┬──────────────┬─────────────────────────────┐
    │ (index) │     product_name     │ price < 100 │ price >= 150 │ price < 100 OR price >= 150 │
    ├─────────┼──────────────────────┼─────────────┼──────────────┼─────────────────────────────┤
    │    0    │    '약용 입욕제'     │    true     │    false     │            true             │  // 합이 참(1 이상)
    │    1    │    '약용 핸드솝'     │    false    │     true     │            true             │   // 합이 참(1 이상)
    │    2    │ '천연 아로마 입욕제' │    false    │    false     │            false            │
    │    3    │    '거품 목욕제'     │    false    │    false     │            false            │
    │    4    │   '비누 딸기100%'    │    false    │     true     │            true             │  // 합이 참(1 이상)
    │    5    │  '100%우유_입욕제'   │    false    │    false     │            false            │
    └─────────┴──────────────────────┴─────────────┴──────────────┴─────────────────────────────┘

    >console.table(alasql('SELECT product_name, price<100, price>=150, price < 100 OR price >= 150 FROM Product WHERE price < 100 OR price >= 150'))
    ┌─────────┬─────────────────┬─────────────┬──────────────┬─────────────────────────────┐
    │ (index) │  product_name   │ price < 100 │ price >= 150 │ price < 100 OR price >= 150 │
    ├─────────┼─────────────────┼─────────────┼──────────────┼─────────────────────────────┤
    │    0    │  '약용 입욕제'  │    true     │    false     │            true             │
    │    1    │  '약용 핸드솝'  │    false    │     true     │            true             │
    │    2    │ '비누 딸기100%' │    false    │     true     │            true             │
    └─────────┴─────────────────┴─────────────┴──────────────┴─────────────────────────────┘
    
    기계가 되는 거 같다. 어떤 요구사항도 없고, 그 요구사항을 가지고 내가 뭐 공부하는 것도 아니고. 그냥 책에 나온 대로 치고 결과보고 그래.
    -------------------------------------
       
    4. NOT 사용
       
       거짓(0) 이면 참(1)을 반환하고
       참(1이상) 이면 거짓(0)을 반환한다.
     
    -------------------------------------       
    >console.table(alasql('SELECT customer_name AS "고객이름", membertype_id AS "유형", membertype_id = 1, NOT (membertype_id = 1) FROM Customer'))
    ┌─────────┬────────────┬────────┬───────────────────┬──────────────────────────┐
    │ (index) │ '고객이름' │ '유형' │ membertype_id = 1 │ NOT((membertype_id = 1)) │
    ├─────────┼────────────┼────────┼───────────────────┼──────────────────────────┤
    │    0    │  '김바람'  │   2    │       false       │           true           │ // 유형이 1이 아닌 레코드
    │    1    │  '이구름'  │   1    │       true        │          false           │
    │    2    │  '박하늘'  │   2    │       false       │           true           │ // 유형이 1이 아닌 레코드
    │    3    │   '강산'   │   1    │       true        │          false           │
    │    4    │  '유바다'  │   2    │       false       │           true           │ // 유형이 1이 아닌 레코드
    └─────────┴────────────┴────────┴───────────────────┴──────────────────────────┘

    -------------------------------------
       
    5. XOR 사용
    
    베타적 논리합. 핵심은 더해서 1 인것만 참이고, 0이거나 1 초과면 거짓.
                 둘 중 하나만 참인 베타적인 상황만 참이고, 둘 다 참인 경우는 베타적인 상황이 아니니, 거짓으로 침.
                

    -------------------------------------
    ALASQL 은 쿼리 문에 XOR 이 예약어로 없음. 즉 수동으로 구현해야함.
    합해서 참이면서 동시에 둘 중 하나는 거짓이여야 함.
    둘중 하나는 거짓이어야 함.
    둘 다 참이면 안됨
    
    AND 로는 어려움.
    NOT(TRUE) AND NOT(TRUE) = FALSE 이거는 안될 거 같음 왜냐면.. 첫번째 FALSE 면 FALSE 임. 두 항 다 고려하지 않음.
   
    
    OR 로는 가능함
    FALSE OR FALSE = FALSE
    NOT(TRUE) OR NOT(TRUE) = FALSE
    뒤집으면 NOT(A AND B) 
    
    다 안되고..
    
    둘 중 하나는 거짓
    https://www.tutorialgateway.org/mysql-xor-operator/
    (x AND (NOT y)) OR ((NOT x) AND y)
    (앞에만 참) 합 (뒤에만 참) = 앞이나 뒤에만 참인 경우.
    둘다 참인 경우
    참 AND 거짓 = 거짓. 거짓 OR 거짓 = 거짓.
    둘다 거짓 경우
    거직 AND 참 = 거짓. 거짓 OR 거짓 = 거짓.
    
    흠.. 진짜네 둘중 하나만 참일 때 참으로 되는 조건이라서..
    
    >console.table(alasql('SELECT product_name AS "제폼명", price AS "가격", price>= 100, price<150, (price>=100 AND (NOT(price<150))) OR ((NOT(price>=100)) AND price<150) AS "price>=100 XOR price < 150" FROM Product'))
    ┌─────────┬──────────────────────┬────────┬──────────────┬─────────────┬──────────────────────────────┐
    │ (index) │       '제폼명'       │ '가격' │ price >= 100 │ price < 150 │ 'price>=100 XOR price < 150' │
    ├─────────┼──────────────────────┼────────┼──────────────┼─────────────┼──────────────────────────────┤
    │    0    │    '약용 입욕제'     │   70   │    false     │    true     │             true             │ // 베타적 상황
    │    1    │    '약용 핸드솝'     │  700   │     true     │    false    │             true             │ // 베타적 상황
    │    2    │ '천연 아로마 입욕제' │  120   │     true     │    true     │            false             │
    │    3    │    '거품 목욕제'     │  120   │     true     │    true     │            false             │
    │    4    │   '비누 딸기100%'    │  150   │     true     │    false    │             true             │ // 베타적 상황
    │    5    │  '100%우유_입욕제'   │  140   │     true     │    true     │            false             │
    └─────────┴──────────────────────┴────────┴──────────────┴─────────────┴──────────────────────────────┘

    XOR 문 세 개를 쓰려면.. 너무 복잡해져서 그만 둠....

    -------------------------------------
        
    3. XOR 과 NULL
    
    MYSQL 에서는 NULL 에 대해서 XOR 을 하면 무조건 NULL 이 된다고 함.
    NULL 이 TRUE 는 아니고 FALSE 도 아니니. TRUE/FALSE 베타적 상황이 아니긴 해.
    
    근데 ALASQL 은 NOT(NULL) 을 true 로 반환함.. 여튼 xor 이 alasql 에서 제대로 작동 안하는 거 감안할 것
    
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