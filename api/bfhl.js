const USER_FULLNAME = "lokesh_kunapuli";
const DOB = "21042004";
const EMAIL = "kunapulilokesh777@gmail.com";
const ROLL_NUMBER = "22BCE20032";

function isAlphabet(ch) {
  return /^[a-zA-Z]$/.test(ch);
}

function alternateCapsReverse(str) {
  let reversed = str.split("").reverse();
  return reversed
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body.data || [];

      let numbers = [];
      let alphabets = [];
      let specialChars = [];

      for (let item of data) {
        if (!isNaN(item)) {
          numbers.push(parseInt(item));
        } else if (isAlphabet(item)) {
          alphabets.push(item.toUpperCase());
        } else {
          specialChars.push(item);
        }
      }

      let even_numbers = numbers.filter((num) => num % 2 === 0);
      let odd_numbers = numbers.filter((num) => num % 2 !== 0);

      let sum = numbers.reduce((a, b) => a + b, 0).toString();
      let concat_string = alternateCapsReverse(alphabets.join(""));

      res.status(200).json({
        is_success: true,
        user_id: `${USER_FULLNAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        even_numbers,
        odd_numbers,
        alphabets,
        special_chars: specialChars,
        sum,
        concat_string,
      });
    } catch (err) {
      res.status(500).json({ is_success: false, error: err.message });
    }
  } else {
    res.status(200).json({
      operation_code: 1,
      message: "BFHL API working!",
    });
  }
}
