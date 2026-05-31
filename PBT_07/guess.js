(function playGuessNumber() {
  const secret = Math.floor(Math.random() * 100) + 1;
  const guesses = new Set();
  let attempts = 0;

  while (attempts < 7) {
    const input = prompt(`Đoán số từ 1 đến 100. Còn ${7 - attempts} lượt.`);

    if (input === null) {
      alert("Bạn đã thoát trò chơi.");
      return;
    }

    const guess = Number(input);
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      alert("Chỉ chấp nhận số nguyên từ 1 đến 100.");
      continue;
    }

    if (guesses.has(guess)) {
      alert("Bạn đã đoán số này rồi!");
      continue;
    }

    guesses.add(guess);
    attempts += 1;

    if (guess < secret) {
      alert("Cao hơn");
    } else if (guess > secret) {
      alert("Thấp hơn");
    } else {
      alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
      return;
    }
  }

  alert(`Hết lượt! Đáp án là ${secret}.`);
})();
