# Learning sql with picture using alasql

## Overview

result : 책 실습 결과 저장.
reason : mysql 과 workbench 설치 안되는데 node 는 설치 가능한 환경에서 sql 도서 실습위해 alasql 을 사용

## How to

생성된 파일이 있는 곳에 alasql 패키지를 설치하고 node repl 을 실행시켜서 alasql 로 SQL 책 실습을 한다.

```bash
C:\someDir>npm i
C:\someDir>dir/w
 C 드라이브의 볼륨: OS
 볼륨 일련 번호: 2429-085C

 C:\someDir 디렉터리

[.]                 [..]
[.idea]             [node_modules]    [examples]
loadAll.js          package.json
package-lock.json   invoke_outside.js
invoke-immediately.js
               4개 파일              69,715 바이트
               4개 디렉터리  55,831,126,016 바이트 남 음

C:\someDir>npm run local
> npm run local

> learning-sql-with-picture-using-alasql@1.0.0 local C:\Users\User\WebstormProjects\learning-sql-with-picture-using-alasql
> node loadAll.js

Applier, Book, Customer, Delivery, EvalRank, EvalStudent, Eval_1, Eval_2, Inquiry, Inquiry_2019, Member, MemberType, Menu, Product, ProductOrder, RankValue, Search_1, Search_2, Student, StudentAbscence, TimeSample
>

// 직접 사용하는 방법
> console.table(alasql('select * from Book'))
┌─────────┬────┬────────────────────────┬───────────┬───────┬───────────────────────┐
│ (index) │ id │       book_name        │ publisher │ price │     release_date      │
├─────────┼────┼────────────────────────┼───────────┼───────┼───────────────────────┤
│    0    │ 1  │   '이탈리아어 입문'    │ '세계사'  │ 1200  │ '2019-11-12 00:00:00' │
│    1    │ 2  │    '프랑스어 입문'     │ '세계사'  │ 1200  │ '2019-11-14 00:00:00' │
│    2    │ 3  │ '어서오세요! 프랑스어' │ '언어사'  │  980  │ '2019-11-15 00:00:00' │
│    3    │ 4  │   '독일어 관용구집'    │ '언어사'  │  800  │ '2019-11-15 00:00:00' │
│    4    │ 5  │   'Chao! 이탈리아어'   │ '세계사'  │ 2300  │ '2019-12-01 00:00:00' │
│    5    │ 6  │  '즐거운 이탈리아어'   │ '글로벌'  │ 1500  │ '2019-12-23 00:00:00' │
└─────────┴────┴────────────────────────┴───────────┴───────┴───────────────────────┘
undefined

// exports 객체에 담긴 함수를 변수에 받아서 실행
> const {chap1} = require("./examples/invoke_outside.js")
undefined
> chap1(alasql)
┌─────────┬────┬────────────────────────┬───────────┐
│ (index) │ id │       book_name        │ publisher │
├─────────┼────┼────────────────────────┼───────────┤
│    0    │ 1  │   '이탈리아어 입문'    │ '세계사'  │
│    1    │ 2  │    '프랑스어 입문'     │ '세계사'  │
│    2    │ 3  │ '어서오세요! 프랑스어' │ '언어사'  │
│    3    │ 4  │   '독일어 관용구집'    │ '언어사'  │
│    4    │ 5  │   'Chao! 이탈리아어'   │ '세계사'  │
│    5    │ 6  │  '즐거운 이탈리아어'   │ '글로벌'  │
└─────────┴────┴────────────────────────┴───────────┘
┌─────────┬────┬────────────────────────┬───────┐
│ (index) │ id │       book_name        │ price │
├─────────┼────┼────────────────────────┼───────┤
│    0    │ 1  │   '이탈리아어 입문'    │ 1200  │
│    1    │ 2  │    '프랑스어 입문'     │ 1200  │
│    2    │ 3  │ '어서오세요! 프랑스어' │  980  │
│    3    │ 4  │   '독일어 관용구집'    │  800  │
│    4    │ 5  │   'Chao! 이탈리아어'   │ 2300  │
│    5    │ 6  │  '즐거운 이탈리아어'   │ 1500  │
└─────────┴────┴────────────────────────┴───────┘
undefined

// exports 된 함수 자체를 즉시 실행
> require("./examples/invoke-immediately.js")(alasql)
┌─────────┬────┬────────────────────────┬───────────┐
│ (index) │ id │       book_name        │ publisher │
├─────────┼────┼────────────────────────┼───────────┤
│    0    │ 1  │   '이탈리아어 입문'    │ '세계사'  │
│    1    │ 2  │    '프랑스어 입문'     │ '세계사'  │
│    2    │ 3  │ '어서오세요! 프랑스어' │ '언어사'  │
│    3    │ 4  │   '독일어 관용구집'    │ '언어사'  │
│    4    │ 5  │   'Chao! 이탈리아어'   │ '세계사'  │
│    5    │ 6  │  '즐거운 이탈리아어'   │ '글로벌'  │
└─────────┴────┴────────────────────────┴───────────┘
┌─────────┬────┬────────────────────────┬───────┐
│ (index) │ id │       book_name        │ price │
├─────────┼────┼────────────────────────┼───────┤
│    0    │ 1  │   '이탈리아어 입문'    │ 1200  │
│    1    │ 2  │    '프랑스어 입문'     │ 1200  │
│    2    │ 3  │ '어서오세요! 프랑스어' │  980  │
│    3    │ 4  │   '독일어 관용구집'    │  800  │
│    4    │ 5  │   'Chao! 이탈리아어'   │ 2300  │
│    5    │ 6  │  '즐거운 이탈리아어'   │ 1500  │
└─────────┴────┴────────────────────────┴───────┘
undefined

> .exit

C:\someDir>
```
