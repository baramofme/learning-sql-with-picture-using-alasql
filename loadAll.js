const repl = require('repl');
const initDB = require('./initDB')
const loadChapters = require('./loadChapters')

const populatedAlasql = initDB()

// Global and local scope 참조해서 repl에서 required 없이 alasql 에 바로 접근하도록 함
local = repl.start({prompt: '>'})
local.context.alasql = populatedAlasql
local.context.context = local.context
local.context.loadAll = loadChapters
local.context.loadAll(local.context, populatedAlasql)



