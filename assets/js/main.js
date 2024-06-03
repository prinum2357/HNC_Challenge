let DATASET = [];
let CURPROBLEM = "";

let VALUE_C = "";
let VALUE_P = "";
let VALUE_X = "";

const buttonStart = document.getElementById("buttonStart");
const tableJundgeLog = document.getElementById("tableJudgeLog");
const tbodyJundgeLog = document.getElementById("tbodyJudgeLog");
const inputValueC = document.getElementById("inputValueC");
const inputValueP = document.getElementById("inputValueP");
const inputValueX = document.getElementById("inputValueX");
const buttonJudge = document.getElementById("buttonJudge");

let FILEPATH = "./assets/data/2x";

////////////////////////////////////////////////////////////////////////////////

// テーブルの初期化
function clearTable() {
    tbodyJundgeLog.innerHTML = "";

}

async function loadData() {
    let responce = await fetch(FILEPATH);

    DATASET = (await responce.text()).replaceAll("\r", "").split("\n");

}


function genPloblem() {
    // 入力の初期化
    VALUE_C = "";
    VALUE_P = "";
    VALUE_X = "";
    inputValueC.value = "";
    inputValueP.value = "";
    inputValueX.value = "";
    inputValueC.disabled = false;
    inputValueP.disabled = false;
    inputValueX.disabled = false;
    buttonJudge.disabled = true;

    let _ploblemCount = DATASET.length;
    let _ploblemNum = Math.floor(Math.random()*(_ploblemCount));
    let _handArray = ""

    // 問題を設定
    CURPROBLEM = DATASET[_ploblemNum];
    _handArray = CURPROBLEM.split("");


    // 手札の表示
    for(let _idx in _handArray) {
        let _docHand = "localHand"+_idx;
        document.getElementById(_docHand).innerText = _handArray[_idx];

    }
}

// 入力チェック
function checkInput() {
    let buttonFlag = false;
    let inputArray = [];
    let curProblemArray = CURPROBLEM.toUpperCase().split('').sort().join('');

    inputArray = inputArray.concat(VALUE_C.split(''));
    inputArray = inputArray.concat(VALUE_P.split(''));
    inputArray = inputArray.concat(VALUE_X.split(''));
    inputArray = inputArray.sort().join('');

    // 入力チェック
    if(inputArray == curProblemArray) {
        buttonFlag = true;
    }

    // ボタンの有効化
    if(buttonFlag) {
        buttonJudge.disabled = false;

    } else {
        buttonJudge.disabled = true;

    }
}

// 判定
function judgeEquation() {
    let _c = card2Num(VALUE_C);
    let _p = card2Num(VALUE_P);
    let _x = card2Num(VALUE_X);

    if(_c == _p*_x) {
        return true;

    } else {
        return false;

    }
}

// カードから数を生成
function card2Num(card) {
    return Number(card.replaceAll('A', '1').replaceAll('T', '10').replaceAll('J', '11').replaceAll('Q', '12').replaceAll('K', '13'));
}

// テーブル追加
function addTable(collectFlag) {
    let row = tbodyJundgeLog.insertRow(0);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);

    cell0.appendChild(document.createTextNode(CURPROBLEM));
    cell0.classList.add("tablebody-text");
    cell0.classList.add("fs-5");

    cell1.appendChild(document.createTextNode(VALUE_C+" = "+VALUE_P+" × "+VALUE_X));
    cell1.classList.add("tablebody-text");
    cell1.classList.add("fs-5");

    if(collectFlag) {
        row.classList.add("table-success");
        cell2.appendChild(document.createTextNode("Correct"));
        cell2.classList.add("fs-5");

    } else {
        row.classList.add("table-danger");
        cell2.appendChild(document.createTextNode("Incorrect"));
        cell2.classList.add("fs-5");

    }
}

////////////////////////////////////////////////////////////////////////////////

// ゲームの開始
buttonStart.onclick = () => {
    clearTable();
    loadData();
    genPloblem();
    genPloblem();
 
}

// 判定可能チェック
inputValueC.addEventListener("change", (event) => {
    VALUE_C = inputValueC.value.toUpperCase();
    checkInput();

});

inputValueP.addEventListener("change", (event) => {
    VALUE_P = inputValueP.value.toUpperCase();
    checkInput();

});

inputValueX.addEventListener("change", (event) => {
    VALUE_X = inputValueX.value.toUpperCase();
    checkInput();

});

// 判定
buttonJudge.onclick = () => {
    let collectFlag = judgeEquation();
    addTable(collectFlag);
    genPloblem(CURPROBLEM);
}

// アクセス時に実行
function main() {
    loadData();
}

main();
