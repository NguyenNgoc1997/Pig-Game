'use strict';
// Selecting elements: Lấy các phần tử DOM
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Thiết lập mặc định
// Thiết lập hiển thị số ban đầu (score0El = 43, score1El = 24) về 0
score0El.textContent = 0;
score1El.textContent = 0;
// Ẩn xúc xắc
diceEL.classList.add('hidden');

// Tạo 1 biến cập nhật điểm số
let currentScore = 0;
// Tạo 1 biến người chơi mặc định
let activePlayer = 0;
// Tạo 1 biến lưu trữ điểm số
const scores = [0, 0];
// Tạo 1 biến playing lưu trữ trạng thái của game
let playing = true;

// Tạo chức năng next player
const nextPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Đặt điểm số hiện tại về 0
  currentScore = 0;
  // Thay đổi class CSS player active
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Thiết lập chức năng tung xúc xắc ngẫu nhiên
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Tạo xúc xắc ngẫu nhiên
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Hiển thị xúc xắc ngẫu nhiên
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    // 3. Kiểm tra xúc xắc
    if (dice !== 1) {
      // Thêm xúc xắc vào số điểm hiện tại
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      currentScore += dice;
    } else {
      // Chuyển sang người chơi tiếp theo
      nextPlayer();
    }
  }
});

// Thiết lập chức năng giữ xúc xắc ngẫu nhiên
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Cộng điểm hiện tại của người chơi đang hoạt động
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Kiểm tra điểm hiện tại >= 100
    if (scores[activePlayer] >= 100) {
      // -> Winner
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector('.dice').classList.add('hidden');
    } else {
      // -> Chuyển sang người chơi tiếp theo
      nextPlayer();
    }
  }
});

// Reset game
btnNew.addEventListener('click', e => {
  e.preventDefault;
  location.reload();
});
