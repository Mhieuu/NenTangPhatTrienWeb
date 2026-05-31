function classicFizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

function customFizzBuzz(n, rules) {
  for (let i = 1; i <= n; i++) {
    const output = rules
      .filter((rule) => i % rule.divisor === 0)
      .map((rule) => rule.word)
      .join("");
    console.log(output || i);
  }
}

classicFizzBuzz();
customFizzBuzz(30, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
]);
