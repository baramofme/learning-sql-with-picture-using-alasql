const repl = require('repl');
const initDB = require('./initDB')
const ji_chap1 = require("./chap1/ji_chap1")

const populatedAlasql = initDB()

// Global and local scope 참조해서 repl에서 required 없이 alasql 에 바로 접근하도록 함
const local = repl.start({prompt: '>'})
local.context.alasql = populatedAlasql

// jihoon
local.context.ji = {
    chap1: {
        review: () =>{ ji_chap1.review(populatedAlasql)},
        q1: () =>{ ji_chap1.q1(populatedAlasql) },
        q2: () =>{ ji_chap1.q2(populatedAlasql) },
        q3: () =>{ ji_chap1.q3(populatedAlasql) }
    }
}
// migol
local.context.mi = {
    chap1: {
        review: () =>{ ji_chap1.review(populatedAlasql)},
        q1: () =>{ ji_chap1.q1(populatedAlasql) },
        q2: () =>{ ji_chap1.q2(populatedAlasql) },
        q3: () =>{ ji_chap1.q3(populatedAlasql) }
    }
}