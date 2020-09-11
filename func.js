const inputNumber = document.querySelector('#input-number');
const randomNumberArray = [];
let count = 0;

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
        event.preventDefault();

        if(isNaN(inputNumberValue)) { //사용자가 문자를 입력했을 때 경고창
            alert('숫자를 입력하세요!');
            blank();
        } else if(inputNumberValue.length !== 3) {//사용자가 세자리 숫자를 입력하지 않았을 때 경고창
            alert('세자리 숫자를 입력하세요!');
            blank();
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
                result.innerHTML += '<div>' + strike + ' strike' + ball + ' ball ' + '</div>';
                userValue.innerHTML += '<div>' + inputNumberArray.join('');
            }

            startGame();
           
            count++;

            if(strike === 3) {
                alert('성공! ' + count + '번 만에 성공하셨습니다');
            } else if(count === 10) {
                alert('실패! 정답은 ' + randomNumberArray.join('') + '입니다');
                blank();
            } else if(count > 10) {
                alert('새로운 게임을 시작하세요!');
            } else {
                showResult();
                blank();
            }
        }
    }
});

//페이지 새로고침(게임 재시작)
const reloadButton = document.querySelector('.title');

reloadButton.addEventListener('click', function() {
    location.reload();
});