const express = require("express");
const app = express();

app.use(express.json());

const FULL_NAME = "shreyashi_debroy";
const DOB = "28122003";
const EMAIL = "shreyashioff28@gmail.com";
const ROLL_NUMBER = "22BCE0470";

function processData(data) {
  let oddNumbers = [];
  let evenNumbers = [];
  let alphabets = [];
  let specialChars = [];
  let sum = 0;

  data.forEach(item => {
    if (!isNaN(item)) {
      let num = parseInt(item);
      if (num % 2 === 0) {
        evenNumbers.push(item.toString());
      } else {
        oddNumbers.push(item.toString());
      }
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
    } else {
      specialChars.push(item);
    }
  });

  let concatString = alphabets
    .join("")
    .split("")
    .reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  return {
    is_success: true,
    user_id: `${FULL_NAME}_${DOB}`,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers: oddNumbers,
    even_numbers: evenNumbers,
    alphabets: alphabets,
    special_characters: specialChars,
    sum: sum.toString(),
    concat_string: concatString
  };
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const result = processData(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
