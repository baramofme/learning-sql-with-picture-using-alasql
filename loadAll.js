const alasql = require('alasql');
const repl = require('repl');
const 챕터명_사용자명 = require("./chap1/챕터명-사용자명")

function initDB(){

    alasql(`
        CREATE TABLE Applier
            (\`apply_id\` int, \`product\` varchar(1), \`name\` varchar(3), \`age\` int, \`apply_date\` datetime)
        ;
            
        INSERT INTO Applier
            (\`apply_id\`, \`product\`, \`name\`, \`age\`, \`apply_date\`)
        VALUES
            (1, 'A', '김보라', 25, '2019-12-10 00:00:00'),
            (2, 'A', '이하늘', 42, '2019-12-24 00:00:00'),
            (3, 'C', '박하얀', 31, '2019-12-28 00:00:00'),
            (4, 'B', '유분홍', 30, '2020-01-01 00:00:00'),
            (5, 'C', '김초록', 26, '2020-01-01 00:00:00')
        ;
        
        
        CREATE TABLE Book
            (\`id\` int, \`book_name\` varchar(11), \`publisher\` varchar(3), \`price\` int, \`release_date\` datetime)
        ;
            
        INSERT INTO Book
            (\`id\`, \`book_name\`, \`publisher\`, \`price\`, \`release_date\`)
        VALUES
            (1, '이탈리아어 입문', '세계사', 1200, '2019-11-12 00:00:00'),
            (2, '프랑스어 입문', '세계사', 1200, '2019-11-14 00:00:00'),
            (3, '어서오세요! 프랑스어', '언어사', 980, '2019-11-15 00:00:00'),
            (4, '독일어 관용구집', '언어사', 800, '2019-11-15 00:00:00'),
            (5, 'Chao! 이탈리아어', '세계사', 2300, '2019-12-01 00:00:00'),
            (6, '즐거운 이탈리아어', '글로벌', 1500, '2019-12-23 00:00:00')
        ;
        
        
        CREATE TABLE Customer
            (\`customer_id\` int, \`customer_name\` varchar(45), \`birthday\` datetime, \`membertype_id\` int)
        ;
            
        INSERT INTO Customer
            (\`customer_id\`, \`customer_name\`, \`birthday\`, \`membertype_id\`)
        VALUES
            (1, '김바람', '1984-06-24 00:00:00', 2),
            (2, '이구름', '1990-07-16 00:00:00', 1),
            (3, '박하늘', '1976-03-09 00:00:00', 2),
            (4, '강산', '1991-05-04 00:00:00', 1),
            (5, '유바다', '1993-04-21 00:00:00', 2)
        ;
        
        
        CREATE TABLE Delivery
            (\`delivery_id\` int, \`customer\` varchar(2), \`quantity\` int, \`delivery_time\` varchar(4))
        ;
            
        INSERT INTO Delivery
            (\`delivery_id\`, \`customer\`, \`quantity\`, \`delivery_time\`)
        VALUES
            (1, 'A社', 5, '1'),
            (2, 'B社', 3, '3'),
            (3, 'C社', 2, '2'),
            (4, 'D社', 8, NULL),
            (5, 'E社', 12, '1')
        ;
        
        
        CREATE TABLE Eval_1
            (\`eval_id\` int, \`student\` varchar(4), \`rank_val\` varchar(4))
        ;
            
        INSERT INTO Eval_1
            (\`eval_id\`, \`student\`, \`rank_val\`)
        VALUES
            (1, 'A001', 'B'),
            (2, 'A002', 'A'),
            (3, 'A003', 'C'),
            (4, 'A004', NULL),
            (5, 'A005', 'A')
        ;
        
        
        CREATE TABLE Eval_2
            (\`eval_id\` int, \`student\` varchar(4), \`rank_val\` varchar(1))
        ;
            
        INSERT INTO Eval_2
            (\`eval_id\`, \`student\`, \`rank_val\`)
        VALUES
            (1, 'A005', 'D'),
            (2, 'A001', 'D'),
            (3, 'A002', 'A'),
            (4, 'A006', 'B'),
            (5, 'A003', 'C')
        ;
        
        
        CREATE TABLE EvalRank
            (\`rank_val\` varchar(1), \`rank_name\` varchar(2))
        ;
            
        INSERT INTO EvalRank
            (\`rank_val\`, \`rank_name\`)
        VALUES
            ('A', '우수'),
            ('B', '양호'),
            ('C', '보통'),
            ('D', '개선')
        ;
        
        
        CREATE TABLE EvalStudent
            (\`student\` varchar(4), \`student_name\` varchar(3))
        ;
            
        INSERT INTO EvalStudent
            (\`student\`, \`student_name\`)
        VALUES
            ('A001', '이민호'),
            ('A002', '김수지'),
            ('A003', '박미래'),
            ('A004', '김미미'),
            ('A005', '이예지')
            ;
        
        CREATE TABLE Inquiry
            (\`id\` int, \`pref\` varchar(3), \`age\` int, \`star\` int)
        ;
            
        INSERT INTO Inquiry
            (\`id\`, \`pref\`, \`age\`, \`star\`)
        VALUES
            (1, '서울시', 20, 2),
            (2, '충청도', 30, 5),
            (3, '경기도', 40, 3),
            (4, '충청도', 20, 4),
            (5, '서울시', 30, 4),
            (6, '서울시', 20, 1)
        ;
        
        
        CREATE TABLE Inquiry_2019
            (\`id\` int, \`pref\` varchar(3), \`age\` int, \`star\` int)
        ;
            
        INSERT INTO Inquiry_2019
            (\`id\`, \`pref\`, \`age\`, \`star\`)
        VALUES
            (1, '서울시', 10, 4),
            (2, '충청도', 20, 3)
        ;
        
        
        CREATE TABLE Member
            (\`member_id\` int, \`member_name\` varchar(3), \`birthday\` datetime, \`tel\` varchar(13))
        ;
            
        INSERT INTO Member
            (\`member_id\`, \`member_name\`, \`birthday\`, \`tel\`)
        VALUES
            (1001, '홍길동', '1993-01-30 00:00:00', '010-8035-xxxx'),
            (1002, '심청이', '1979-07-03 00:00:00', '010-4216-xxxx'),
            (1003, '성춘향', '1978-08-25 00:00:00', '010-7925-xxxx'),
            (1004, '이몽룡', '1971-11-18 00:00:00', '070-8769-xxxx'),
            (1005, '김선달', '1991-12-29 00:00:00', '070-6758-xxxx')
        ;
        
        
        CREATE TABLE MemberType
            (\`membertype_id\` int, \`membertype\` varchar(45))
        ;
            
        INSERT INTO MemberType
            (\`membertype_id\`, \`membertype\`)
        VALUES
            (1, '보통 회원'),
            (2, '할인 회원')
        ;
        
        
        CREATE TABLE Menu
            (\`id\` int, \`menu_name\` varchar(6), \`category\` varchar(6), \`price\` int)
        ;
            
        INSERT INTO Menu
            (\`id\`, \`menu_name\`, \`category\`, \`price\`)
        VALUES
            (1, '페스카토레', 'FOOD', 1200),
            (2, '제노바페스토', 'FOOD', 1100),
            (3, '커피', 'DRINK', 500),
            (4, '젤라토', 'SWEETS', 400),
            (5, '스파게티', 'FOOD', 900),
            (6, '티라미스', 'SWEETS', 500),
            (7, '카르보나라', 'FOOD', 1200),
            (8, '오렌지주스', 'DRINK', 600),
            (9, '홍차', 'DRINK', 500)
        ;
        
        
        CREATE TABLE Product
            (\`product_id\` int, \`product_name\` varchar(20), \`stock\` int, \`price\` decimal)
        ;
            
        INSERT INTO Product
            (\`product_id\`, \`product_name\`, \`stock\`, \`price\`)
        VALUES
            (1, '약용 입욕제', 100, 70),
            (2, '약용 핸드솝', 23, 700),
            (3, '천연 아로마 입욕제', 4, 120),
            (4, '거품 목욕제', 23, 120)
        ;
        
        
        CREATE TABLE ProductOrder
            (\`order_id\` int, \`customer_id\` int, \`product_id\` int, \`quantity\` int, \`price\` decimal, \`order_time\` datetime)
        ;
            
        INSERT INTO ProductOrder
            (\`order_id\`, \`customer_id\`, \`product_id\`, \`quantity\`, \`price\`, \`order_time\`)
        VALUES
            (1, 4, 1, 12, 840, '2019-10-13 12:01:34'),
            (2, 5, 3, 5, 600, '2019-10-13 18:11:05'),
            (3, 2, 2, 2, 1400, '2019-10-14 10:43:54'),
            (4, 3, 2, 1, 700, '2019-10-15 23:15:09'),
            (5, 1, 4, 3, 360, '2019-10-15 23:37:11'),
            (6, 5, 2, 1, 700, '2019-10-16 01:23:28'),
            (7, 1, 5, 2, 300, '2019-10-18 12:42:50')
        ;
        
        
        CREATE TABLE RankValue
            (\`id\` varchar(1), \`rank_value\` int)
        ;
            
        INSERT INTO RankValue
            (\`id\`, \`rank_value\`)
        VALUES
            ('A', 4),
            ('B', 2),
            ('C', 1),
            ('D', 3),
            ('E', 5)
        ;
        
        
        CREATE TABLE Search_1
            (\`id\` int, \`val\` varchar(1))
        ;
            
        INSERT INTO Search_1
            (\`id\`, \`val\`)
        VALUES
            (1, 'A'),
            (2, 'a'),
            (3, 'A'),
            (4, 'B')
        ;
        
        
        CREATE TABLE Search_2
            (\`id\` int, \`val\` varchar(2))
        ;
            
        INSERT INTO Search_2
            (\`id\`, \`val\`)
        VALUES
            (1, '1'),
            (2, '１'),
            (3, 'A'),
            (4, 'Ａ'),
            (5, 'a'),
            (6, 'B'),
            (7, 'ab')
        ;
        
        
        CREATE TABLE Student
            (\`id\` int, \`student_name\` varchar(3), \`height\` int, \`weight\` int, \`blood_type\` varchar(2), \`birthday\` datetime)
        ;
            
        INSERT INTO Student
            (\`id\`, \`student_name\`, \`height\`, \`weight\`, \`blood_type\`, \`birthday\`)
        VALUES
            (1, '이민지', 160, 51, 'O', '1998-08-11 00:00:00'),
            (2, '김민준', 172, 65, 'A', '1999-06-08 00:00:00'),
            (3, '박서연', 158, 48, 'B', '1997-08-03 00:00:00'),
            (4, '강예은', 161, 55, 'A', '1998-01-23 00:00:00'),
            (5, '김동현', 168, 62, 'O', '1997-10-08 00:00:00'),
            (6, '이수민', 153, 42, 'AB', '1998-07-25 00:00:00')
        ;
        
        
        CREATE TABLE StudentAbscence
            (\`student_id\` int, \`absence_date\` datetime)
        ;
            
        INSERT INTO StudentAbscence
            (\`student_id\`, \`absence_date\`)
        VALUES
            (2, '2019-06-06 00:00:00'),
            (6, '2019-08-02 00:00:00'),
            (5, '2019-12-11 00:00:00'),
            (2, '2020-01-27 00:00:00'),
            (1, '2020-01-29 00:00:00'),
            (5, '2020-02-08 00:00:00')
        ;
        
        
        CREATE TABLE TimeSample
            (\`id\` int, \`regist_date\` datetime)
        ;
            
        INSERT INTO TimeSample
            (\`id\`, \`regist_date\`)
        VALUES
            (1, '2019-12-31 14:03:12'),
            (2, '2019-12-31 23:58:30'),
            (3, '2020-01-01 01:12:56'),
            (4, '2020-01-01 09:43:03'),
            (5, '2020-01-03 11:23:09')
        ;
    `,)

    // 생성된 db 에 있는 모든 테이블 목록을 보여준다.
    console.log(Object.keys(alasql.tables).sort().join(', '))

    return alasql
}

const populatedAlasql = initDB(alasql)

// Global and local scope 참조해서 repl에서 required 없이 alasql 에 바로 접근하도록 함
const local = repl.start({prompt: '>'})
local.context.alasql = populatedAlasql

// 사용자
local.context.사용자명 = {
    챕터명: {
        q1: () =>{ 챕터명_사용자명.질문1(populatedAlasql) },
        q2: () =>{ 챕터명_사용자명.질문2(populatedAlasql) }
    }
}