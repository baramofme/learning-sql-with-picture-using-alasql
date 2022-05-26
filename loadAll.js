const repl = require('repl');
const initDB = require('./initDB')
const ji_chap1 = require("./chap1/ji_chap1")
const ji_chap2 = require("./chap2/ji_chap2")
const ji_chap3 = require("./chap3/ji_chap3")

const populatedAlasql = initDB()

// Global and local scope 참조해서 repl에서 required 없이 alasql 에 바로 접근하도록 함
const local = repl.start({prompt: '>'})
local.context.alasql = populatedAlasql

// jihoon
local.context.ji = {
    chap1: ji_chap1(populatedAlasql),
    chap2: ji_chap2(populatedAlasql),
    chap3: ji_chap3(populatedAlasql),
}
// migol
local.context.mi = {
    chap1: ji_chap1(populatedAlasql)
}