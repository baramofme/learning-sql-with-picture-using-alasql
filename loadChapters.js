function load(context, populatedAlasql){
    const ji_chap1 = require("./chap1/ji_chap1")
    const ji_chap2 = require("./chap2/ji_chap2")
    const ji_chap3 = require("./chap3/ji_chap3")

    // jihoon
    context.ji = {
        chap1: ji_chap1(populatedAlasql),
        chap2: ji_chap2(populatedAlasql),
        chap3: ji_chap3(populatedAlasql),
    }
// migol
    context.mi = {
        chap1: ji_chap1(populatedAlasql)
    }
}

module.exports = load