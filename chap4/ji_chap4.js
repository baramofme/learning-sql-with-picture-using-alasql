function review(alasql){
    console.log(`
    /////////////
    4장 내용 복습
    /////////////
    
    1. SQL 문에는 실행 순서가 있다. 
    이 순서에 따라 계산 결과가 달라지므로 꼭 알아야 함.
   
    FROM 어디에 있는 
    전체 레코드에 대해
    WHERE 어떤 조건으로 레코드를 걸러낸다.
   
    GROUP BY 컬럼 명으로 테이블을 각각 묶은 뒤
    각각의 묶음 레코드에 대해
    HAVING 어떤 조건으로 레코드를 걸러낸다.
   
    전체 그리고 묶음에 대한 레코드 걸러낸 결과에 대해서
    SELECT 컬럼, 집계, 상수 등을 열로 하는 테이블을 뽑아내고
    DISTINCT 특정 열 값이 고유한 것만 남긴다.
 
 
    2. 컬럼을 중복값 없는 상태로(DISTINCT) 가져오기(SELECT) 
    
    SELECT 로 테이블이 만들어진 상태에서, 그 다음에 DISTINCT 로 중복값이 없는 테이블을 만든다.
    
    >console.table(alasql('SELECT pref FROM Inquiry ORDER BY pref ASC'))
    >console.table(alasql('SELECT DISTINCT pref FROM Inquiry'))
    ┌─────────┬──────────┐ ┌─────────┬──────────┐
    │ (index) │   pref   │ │ (index) │   pref   │
    ├─────────┼──────────┤ ├─────────┼──────────┤
    │    0    │ '경기도'   │ │    0    │ '서울시' │
    │    1    │ '서울시'   │ │    1    │ '충청도' │
    │    2    │ '서울시'   │ │    2    │ '경기도' │
    │    3    │ '서울시'   │ └─────────┴──────────┘
    │    4    │ '충청도'   │
    │    5    │ '충청도'   │
    └─────────┴──────────┘

    컬렴명을 두 개 이상 조합하면? 조합의 결과가 고유한 것만 남김.
    
    pref + age 두 개를 합쳐서 고유한 값만 남기면?
    
    경기도40 과 경기도50 그리고 서울40 은 각각이 고유한 값이 됨. 
    
    >console.table(alasql('SELECT pref, age, pref = "서울시" AND age =20 AS "조합의 중복" FROM Inquiry ORDER BY pref ASC, age ASC'))
    >console.table(alasql('SELECT DISTINCT pref, age FROM Inquiry ORDER BY pref ASC, age ASC'))
    ┌─────────┬──────────┬─────┬───────────────┐ ┌─────────┬──────────┬─────┐
    │ (index) │   pref   │ age │ '조합의 중복'   │ │ (index) │   pref   │ age │
    ├─────────┼──────────┼─────┼───────────────┤ ├─────────┼──────────┼─────┤
    │    0    │ '경기도'  │ 40  │     false     │ │    0    │ '경기도' │ 40  │
    │    1    │ '서울시'  │ 20  │     true      │ │    1    │ '서울시' │ 20  │ //  조합의 중복이 DISTINCT 됨
    │    2    │ '서울시'  │ 20  │     true      │ │    2    │ '서울시' │ 30  │
    │    3    │ '서울시'  │ 30  │     false     │ │    3    │ '충청도' │ 20  │
    │    4    │ '충청도'  │ 20  │     false     │ │    4    │ '충청도' │ 30  │
    │    5    │ '충청도'  │ 30  │     false     │ └─────────┴──────────┴─────┘
    └─────────┴──────────┴─────┴───────────────┘ 
    
     3. 함수 사용
     
     COUNT, AVG 등 주어진 레코드 묶음에 대해 결과 레코드 1 개만 리턴하는 함수.
     레코드 묶음이면 NULL 까찌 포함해서 계산하고, 특정 컬럼것만 인자로 넘기면 NULL 을 제외하고 계산한 레코드를 리턴한다.
     
     전체 레코드에 대한 계산이 이루어지는 FROM WHERE GROUP BY 에서는 사용이 불가하고,
     SELECT, HAVING ORDER BY 에서는 사용 가능하다.
     
     대상 데이터
     
     const fdata = 
     [
      { id: 1, pref: '서울시', age: 20, star: 2 , star_null: undefined},
      { id: 2, pref: '충청도', age: 30, star: 5 , star_null: undefined},
      { id: 3, pref: '경기도', age: 40, star: 3 , star_null: undefined},
      { id: 4, pref: '충청도', age: 20, star: 4 , star_null: undefined},
      { id: 5, pref: '서울시', age: 30, star: 4 , star_null: undefined},
      { id: 6, pref: '서울시', age: 20, star: 1 , star_null: undefined},
      { id: 7, pref: undefined, age: undefined, star: undefined , star_null: undefined}
    ]
    
    테이블을 넣는 방법은 아래와 같고. 직접 넣을까 하다가 
    https://github.com/AlaSQL/alasql/wiki/How-to-insert-data-into-the-table
    
    From 문에서 인자로 넣어준 데이터에 접근하는 방법을 사용함. 
    방법이 문서에 나오지는 않았는데 오류를 보니 내부적으로 $싸인으로 접근하는 거 같아서 해보니 잘됨
    https://github.com/AlaSQL/alasql/wiki/From

     
     4. SUM, MAX, MIN, AVG 사용
     
     위에서 NULL 을 추가한 fdata 에 대해서 함수를 사용해보자.
     
     함수는 주어진 묶음 레코드(열)에 대해 하나의 레코드 결과만을 반환한다.
     Null 이 있더라도, 테이블의 총 레코드 개수를 카운팅. 
     
     >console.table(alasql('SELECT COUNT(*) from $0', [fdata]))
    ┌─────────┬────┐  ┌─────────┬──────────┐
    │ (index) │ id │  │ (index) │ COUNT(*) │
    ├─────────┼────┤  ├─────────┼──────────┤
    │    0    │ 1  │  │    0    │    7     │
    │    1    │ 2  │  └─────────┴──────────┘
    │    2    │ 3  │  
    │    3    │ 4  │  
    │    4    │ 5  │  
    │    5    │ 6  │  
    │    6    │ 7  │  
    └─────────┴────┘  


    만약 특정 컬럼을 집계했는데 그 레코드에 NULL 이 있다면? NULL 을 뺀 결과를 카운팅.
     
     >console.table(alasql('SELECT COUNT(*), COUNT(age), SUM(*), SUM(age)  from $0', [fdata]))
    ┌─────────┬────┬───────────┐  ┌─────────┬──────────┬────────────┬────────┬──────────┐
    │ (index) │ id │    age    │  │ (index) │ COUNT(*) │ COUNT(age) │ SUM(*) │ SUM(age) │
    ├─────────┼────┼───────────┤  ├─────────┼──────────┼────────────┼────────┼──────────┤
    │    0    │ 1  │    20     │  │    0    │    7     │     6      │   0    │   160    │
    │    1    │ 2  │    30     │  └─────────┴──────────┴────────────┴────────┴──────────┘
    │    2    │ 3  │    40     │  
    │    3    │ 4  │    20     │  
    │    4    │ 5  │    30     │
    │    5    │ 6  │    20     │
    │    6    │ 7  │ undefined │
    └─────────┴────┴───────────┘

    SELECT 에 특정 컬럼을 추가해도, 함수가 있다면, NULL 한 줄만 나올 뿐이다.
    
    >console.table(alasql('SELECT age, COUNT(*), COUNT(age), SUM(*), SUM(age)  from $0', [fdata]))
    ┌─────────┬───────────┬──────────┬────────────┬────────┬──────────┐
    │ (index) │    age    │ COUNT(*) │ COUNT(age) │ SUM(*) │ SUM(age) │
    ├─────────┼───────────┼──────────┼────────────┼────────┼──────────┤
    │    0    │ undefined │    7     │     6      │   0    │   160    │
    └─────────┴───────────┴──────────┴────────────┴────────┴──────────┘

    SELECT * 은? 가장 첫 레코드 한 줄만 출력이 된다.

     >console.table(alasql('SELECT *, COUNT(*), COUNT(age), SUM(*), SUM(age)  from $0', [fdata]))
    ┌─────────┬──────────┬────────────┬────────┬──────────┬────┬──────────┬─────┬──────┬───────────┐
    │ (index) │ COUNT(*) │ COUNT(age) │ SUM(*) │ SUM(age) │ id │   pref   │ age │ star │ star_null │
    ├─────────┼──────────┼────────────┼────────┼──────────┼────┼──────────┼─────┼──────┼───────────┤
    │    0    │    7     │     6      │   0    │   160    │ 1  │ '서울시'  │ 20  │  2   │ undefined │
    └─────────┴──────────┴────────────┴────────┴──────────┴────┴──────────┴─────┴──────┴───────────┘

    만약 모든 레코드 값이 NULL인 열에 함수를 쓴다면?
    COUNT 함수 외에는 모두 Null 을 반환한다.

    >console.table(alasql('SELECT COUNT(star_null), MAX(star_null), MIN(star_null), AVG(star_null) FROM $0', [fdata]))
    ┌─────────┬────┬───────────┐  ┌──────────────────┬────────────────┬────────────────┬────────────────┐
    │ (index) │ id │ star_null │  │ COUNT(star_null) │ MAX(star_null) │ MIN(star_null) │ AVG(star_null) │
    ├─────────┼────┼───────────┤  ├──────────────────┼────────────────┼────────────────┼────────────────┤
    │    0    │ 1  │ undefined │  │        0         │   undefined    │   undefined    │   undefined    │
    │    1    │ 2  │ undefined │  └──────────────────┴────────────────┴────────────────┴────────────────┘
    │    2    │ 3  │ undefined │  
    │    3    │ 4  │ undefined │
    │    4    │ 5  │ undefined │
    │    5    │ 6  │ undefined │
    │    6    │ 7  │ undefined │
    └─────────┴────┴───────────┘


    5. 그롭화 - 레코드를 집약키(기준 컬럼)에 따라 묶고 각각의 그룹에 대해 함수 적용하기
    
    GROUP BY 로 묶어보기
    >console.table(alasql('SELECT pref FROM Inquiry GROUP BY pref'))

    전체 레코드를             집약키(컬럼명)으로 묶고    각가의 묶음의 결과를 하나의 레코드로 가지는 전체 레코드 반환
    ┌─────────┬──────────┐ ┌─────────┬──────────┐  ┌─────────┬──────────┐
    │ (index) │   pref   │ │ (index) │   pref   │  │ (index) │   pref   │
    ├─────────┼──────────┤ ├─────────┼──────────┤  ├─────────┼──────────┤
    │    0    │ '경기도'  │ │    0    │ '경기도'  │   │    0    │ '서울시' │
    │    1    │ '서울시'  │ └─────────┴──────────┘   │    1    │ '충청도' │
    │    2    │ '서울시'  │ ┌─────────┬──────────┐   │    2    │ '경기도' │
    │    3    │ '서울시'  │ │ (index) │   pref   │   └─────────┴──────────┘
    │    4    │ '충청도'  │ ├─────────┼──────────┤
    │    5    │ '충청도'  │ │    2    │ '서울시'  │
    └─────────┴──────────┘ │    3    │ '서울시'  │
                           └─────────┴──────────┘
                           ┌─────────┬──────────┐
                           │ (index) │   pref   │
                           ├─────────┼──────────┤
                           │    4    │ '충청도'  │ 
                           │    5    │ '충청도'  │ 
                           └─────────┴──────────
                           
    GROUP BY 로 묶인 각각의 레코드 묶음에 함수를 적용해보기   
    
    >console.table(alasql('SELECT pref, COUNT(age) FROM Inquiry GROUP BY pref ORDER BY pref'))
    전체 레코드를         컬렴명으로 각각 묶고    각각의 묶음에 대해 함수 적용   결과 모아서 보여줌
    ┌──────────┬─────┐ ┌──────────┬─────┐ ┌──────────┬────────────┐  ┌─────────┬──────────┬────────────┐
    │   pref   │ age │ │   pref   │ age │ │   pref   │ COUNT(age) │  │ (index) │   pref   │ COUNT(age) │
    ├──────────┼─────┤ ├──────────┼─────┤ ├──────────┼────────────┤  ├─────────┼──────────┼────────────┤
    │ '경기도'  │ 40  │ │ '경기도'  │ 40  │ │ '경기도'   │ 1          │  │    0    │ '경기도'  │     1      │
    │ '서울시'  │ 20  │ └──────────┴─────┘ └──────────┴─────────────┘  │    1    │ '서울시'  │     3      │
    │ '서울시'  │ 30  │ ┌──────────┬─────┐ ┌──────────┬────────────┐  │    2    │ '충청도'  │     2      │
    │ '서울시'  │ 20  │ │   pref   │ age │ │   pref   │ COUNT(age) │  └─────────┴──────────┴────────────┘
    │ '충청도'  │ 30  │ ├──────────┼─────┤ ├──────────┼────────────┤  
    │ '충청도'  │ 20  │ │ '서울시'  │ 20  │ │ '서울시'  │ 1           │  
    └──────────┴─────┘ │ '서울시'  │ 30  │ └──────────┴─────────────┘
                       └──────────┴─────┘
                       ┌──────────┬─────┐ ┌──────────┬────────────┐
                       │   pref   │ age │ │   pref   │ COUNT(age) │
                       ├──────────┼─────┤ ├──────────┼────────────┤
                       │ '충청도'  │ 30  │ │ '충청도'  │ 1           │
                       │ '충청도'  │ 20  │ └──────────┴─────────────┘
                       └──────────┴─────┘          
                     
    NULL 이 있는 레코드는? 집약키가 있는 컬럼값으로 NULL 이 있으면 NULL 이 별도의 그룹으로 묶인다.
    
    >console.table(alasql('SELECT pref, COUNT(age) FROM ? GROUP BY pref ORDER BY pref', [fdata]))
    ┌─────────┬───────────┬────────────┐
    │ (index) │   pref    │ COUNT(age) │
    ├─────────┼───────────┼────────────┤
    │    0    │ undefined │     0      │
    │    1    │ '경기도'  │     1      │
    │    2    │ '서울시'  │     3      │
    │    3    │ '충청도'  │     2      │
    └─────────┴───────────┴────────────┘

    `)
}
function q1(alasql){
    alasql(
        `
            SELECT 
                id, student_name, height, weight, (height >=160 AND weight > 60) 
            FROM 
                Student
            ORDER BY
                height >=160 AND weight > 60 DESC,
                height ASC, weight ASC
            ;
                
            SELECT 
                id, student_name, height, height >=170, weight,  weight <50, blood_type,blood_type = 'AB', (height >=170 OR weight <50 OR blood_type = 'AB') AS '모두 OR'
            FROM 
                Student
            WHERE
                height >=170
                OR weight < 50
                OR blood_type = 'AB'
            ;

            SELECT
                id, student_name, blood_type, NOT blood_type = 'A'
            FROM
                Student
            ORDER BY
                NOT blood_type = 'A' DESC
            ;

        `, [], resArr => {
            console.log('/////////////')
            console.log('1장 1번 문제 답')
            console.log('/////////////')

            console.table(resArr[0])
            console.table(resArr[1])
            console.table(resArr[2])
    })
}

function q2(alasql){

        console.log('/////////////')
        console.log('1장 2번 문제 답')
        console.log('/////////////')
        console.log(`
        1. height 가 155 이하, 또는 165 이상
           height <= 155 AND height > 165
          
           
           결과 레코드 개수 2
           
           => 땡!!! 또는 이니까 OR 인데 AND 씀.. 끙. ㅎㅎ 디테일이 부족하구만요.
            
        2. blood_type이 0 또는 weight가 60 이상 중 어느 한쪽만
            blood_type = 'o' XOR height >= 165
            
            결과 레코드 개수 1
            
            => 땡!!!!! ㅎ.. 적어가면서 해야하나보다. 눈대중으로 자꾸 틀리네.
            
            >console.table(alasql('SELECT student_name, height, blood_type, blood_type="O", height >=165, blood_type = "O" AND (NOT height >=165) OR (NOT blood_type = "O" AND height >=165) AS "blood_type = 0 XOR height >=165"
            FROM Student ORDER BY blood_type = "O" AND (NOT height >=165) OR (NOT blood_type = "O" AND height >=165) DESC'))
            ┌─────────┬──────────────┬────────┬────────────┬──────────────────┬───────────────┬───────────────────────────────────┐
            │ (index) │ student_name │ height │ blood_type │ blood_type = 'O' │ height >= 165 │ 'blood_type = 0 XOR height >=165' │
            ├─────────┼──────────────┼────────┼────────────┼──────────────────┼───────────────┼───────────────────────────────────┤
            │    0    │   '이민지'   │  160   │    'O'     │       true       │     false     │               true                │
            │    1    │   '김민준'   │  172   │    'A'     │      false       │     true      │               true                │
            │    2    │   '박서연'   │  158   │    'B'     │      false       │     false     │               false               │
            │    3    │   '강예은'   │  161   │    'A'     │      false       │     false     │               false               │
            │    4    │   '김동현'   │  168   │    'O'     │       true       │     true      │               false               │
            │    5    │   '이수민'   │  153   │    'AB'    │      false       │     false     │               false               │
            └─────────┴──────────────┴────────┴────────────┴──────────────────┴───────────────┴───────────────────────────────────┘

             
        3. height 가  155 오늘 이상 그리고 165 이하, 또는 weight 가 50이상 그리고 65 이하
           height > 155 AND height <= 165 => 이민지, 강예은, 김동현
           OR
           weight > 50 AND weight <= 65 이민지, 김진중, 강예은, 김동현
          
           // AND 우선순위가 높아서 정상적인 순저대로 연산됨.
           
           결과 레코드 개수 4
           
           => 땡... 첫번째 조건을 제대로 안 봄..
           
           >console.table(alasql('SELECT student_name, height > 155 AND height <=165, weight > 50 AND weight <= 65  FROM Student WHERE height > 155 AND height <=165 OR weight > 50 AND weight <= 65'))
            ┌─────────┬──────────────┬────────────────────────────────┬──────────────────────────────┐
            │ (index) │ student_name │ height > 155 AND height <= 165 │ weight > 50 AND weight <= 65 │
            ├─────────┼──────────────┼────────────────────────────────┼──────────────────────────────┤
            │    0    │   '이민지'   │              true              │             true             │
            │    1    │   '김민준'   │             false              │             true             │
            │    2    │   '박서연'   │              true              │            false             │
            │    3    │   '강예은'   │              true              │             true             │
            │    4    │   '김동현'   │             false              │             true             │
            └─────────┴──────────────┴────────────────────────────────┴──────────────────────────────┘

     
        `)

}

function q3(alasql){
    console.log('/////////////')
    console.log('1장 3번 문제 답')
    console.log('/////////////')

    console.log(`
    BETWEEN 과 IN 을 사용해서 SQL 문 바꾸기
    
    1. WHERE birthday BETWEEN '1998-01-01' AND '1999-12-31'
    2. WHERE blood_type IN ('A', 'B')
    `)
}

function q4(alasql){
    console.log('/////////////')
    console.log('1장 4번 문제 답')
    console.log('/////////////')

    console.log(`
    연산자 우선순위를 고려해서 BMI 결과가 제대로 나오는 식을 선택하기
    
    현재 키는 cm 를 씀.
    [체중(kg)/키(m) 의 제곱]
    
    weight / ( (height/100) * (height/100) )
    
    >console.table(alasql('SELECT student_name, height, weight, weight/((height/100)*(height/100)) AS BMI FROM Student'))
    ┌─────────┬──────────────┬────────┬────────┬────────────────────┐
    │ (index) │ student_name │ height │ weight │        BMI         │
    ├─────────┼──────────────┼────────┼────────┼────────────────────┤
    │    0    │   '이민지'   │  160   │   51   │ 19.921874999999996 │
    │    1    │   '김민준'   │  172   │   65   │ 21.971335857220122 │
    │    2    │   '박서연'   │  158   │   48   │ 19.227687870533565 │
    │    3    │   '강예은'   │  161   │   55   │ 21.218317194552675 │
    │    4    │   '김동현'   │  168   │   62   │  21.9671201814059  │
    │    5    │   '이수민'   │  153   │   42   │ 17.941817249775728 │
    └─────────┴──────────────┴────────┴────────┴────────────────────┘
 
    `)
}

function q5(alasql){
    console.log('/////////////')
    console.log('1장 5번 문제 답')
    console.log('/////////////')

    console.log(`
    1. 우선순위 : AND > OR
       - 0 AND 1 = 0
       - 0 OR 0 OR 1 = 1
       
    2. 우선순위 : () > AND > OR
       - (0 OR 0) = 0, (1 OR 1) = 1
       - 0 AND 1 = 0
       
    3. 연산자 % = MOD 나눈 나머지
       - 20 MOD 5 = 20 % 5 = 4(나머지 0)
       - 나머지 0
       
    4. 연산자 DIV = 나눈 몫
       - 30 DIV 12 = 30/12 = 2.5(나머지 0)
       - 몫 2.5
       
       => 땡 DIV 는 몫의 정수부만 반환한다고 한다. 그러니 2
       
    5. 연산자 우선순위 : 곱셉나눗셈 > 덧셈뺄셈
       - 2*3 = 6, 4*1 = 4
       - 1 + 6 - 4 = 3   
         
    `)
}

console.log('ji 의 chap4 로드됨')

module.exports = (populatedAlasql)=> {
    // 클로저처리가 되어서 populatedAlasql 가 클로저 내부에 저장됨.
    // 리턴되는 함수가 호출될 때 부모 클로저 안에 populatedAlasql 에 접근 가능
    return {
        review: () =>{ review(populatedAlasql)},
        q1: () =>{ q1(populatedAlasql) },
        q2: () =>{ q2(populatedAlasql) },
        q3: () =>{ q3(populatedAlasql) },
        q4: () =>{ q5(populatedAlasql) },
        q5: () =>{ q5(populatedAlasql) }
    }
}