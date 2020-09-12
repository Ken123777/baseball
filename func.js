/*

  KEN: 자바스크립트 파일명은 func(함수?)라는 이름보다는 app.js, index.js, 혹은 baseball.js 등이 더욱 적절할것 같네요. :)

 */

const inputNumber = document.querySelector('#input-number');
const randomNumberArray = [];
let count = 0;
// KEN: 아래 변수는 게임이 종료되었는지를 판별하는 용도인것 같은데, 현재 작성한 것처럼 배열의 요소로 false 값을 넣을 필요는 없어 보입니다.
//      let gameOver = false;
//      위처럼 선언하시는게 더욱 적절할것 같네요!
let gameOver = [false];

// KEN: 함수 네이밍을 잘 해주셨네요 :)
//랜덤 세자리 숫자 만들기
function makeRandomNumber() {
    randomNumberArray[0] = Math.floor(Math.random() * 10).toString();
    randomNumberArray[1] = Math.floor(Math.random() * 10).toString();
    randomNumberArray[2] = Math.floor(Math.random() * 10).toString();
    //첫째 자리 숫자가 0일 경우, 랜덤 숫자 다시 만들기
    if(randomNumberArray[0] === '0') {
        makeRandomNumber();
    }
    //중복 숫자 거르기
    if((randomNumberArray[0] === randomNumberArray[1]) || (randomNumberArray[0] === randomNumberArray[2]) || (randomNumberArray[1] === randomNumberArray[2])) {
        makeRandomNumber();
    }
}
makeRandomNumber();


inputNumber.addEventListener('keyup', function(event) {
    let inputNumberValue = inputNumber.value;
    let inputNumberArray = inputNumberValue.split('');

    function blank() {//입력창 비우기
        inputNumber.value = '';
    }

    if(event.keyCode === 13) {
        // KEN: 아래 event.preventDefault() 는 꼭 필요한 것인가요? 필요하다면 왜 필요한지, 필요하지 않다면 어떤 경우에 사용해야 하는지 반드시 조사해보세요!
        event.preventDefault();

        if(isNaN(inputNumberValue)) { //사용자가 문자를 입력했을 때 경고창
            alert('숫자를 입력하세요!');
            blank();
        } else if(inputNumberValue.length !== 3) {//사용자가 세자리 숫자를 입력하지 않았을 때 경고창
            alert('세자리 숫자를 입력하세요!');
            blank();

        // KEN: 26번 줄에서 실행하는 로직과 굉장히 유사해 보이는데, 개선할 방법은 없을까요? 함수를 만들어보면 어떨까요?
        } else if((inputNumberArray[0] === inputNumberArray[1]) || (inputNumberArray[0] === inputNumberArray[2]) || (inputNumberArray[1] === inputNumberArray[2])) {
            alert('숫자가 중복되면 안 됩니다!');
            blank();
        } else { //각 자리 숫자가 중복되지 않는 세자리 숫자를 입력하면, 본 게임 시작
            let strike = 0;
            let ball = 0;

            function startGame() { //랜덤숫자와 사용자입력숫자 비교하기
                for(let i = 0; i < 3; i++) {
                    for(let j = 0; j < 3; j++) {
                        if(randomNumberArray[i] === inputNumberArray[j]) {
                            if(i === j) {
                                strike++;
                            } else {
                                ball++;
                            }
                        }
                    }
                }
            }
            
            function showResult() {//화면에 사용자 입력숫자와 결과 보여주기
                const userValue = document.querySelector('.user-value');
                const result = document.querySelector('.result');
                // KEN: innerHTML과 innerText 그리고 textContent의 차이는 무엇일까요?
                result.innerHTML += '<div>' + strike + ' strike ' + ball + ' ball ' + '</div>';
                userValue.innerHTML += '<div>' + inputNumberArray.join('');
            }

            startGame();
           
            count++;

            if(gameOver[0] === false) {
                if(count > 10) {
                    alert('새로운 게임을 시작하세요!');
                    blank();
                } else if(count === 10) {
                    // KEN: JavaScript Template Literal에 대해서 조사해보세요!
                    //      https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
                    alert('실패! 정답은 ' + randomNumberArray.join('') + '입니다');
                    showResult();
                    blank();
                } else if(strike === 3) {
                    alert('성공! ' + count + '번 만에 성공하셨습니다');
                    showResult();
                    blank();
                    gameOver[0] = true;
                } else {
                    showResult();
                    blank();
                }
            } else {
                alert('새로운 게임을 시작하세요!');
                blank();
            }
        }
    }
});

//페이지 새로고침(게임 재시작)
const reloadButton = document.querySelector('.title');

reloadButton.addEventListener('click', function() {
    // KEN: Page를 새로고침하지 않고 게임을 재시작할 수 있게끔 할 수는 없을까요?
    location.reload();
});