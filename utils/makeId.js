/**
 * Our addresses make to look like this
 * 0x
 * and then three letter sequence 8ab
 * Then it has many more characters
 * fjdlfjdlfdjkfjdklfjdeghd but we want to shorten it
 * We don't show the entire address
 * Add ... in between
 * End with four differnt characters
 * 6ghj
 */
// 0x8ab...6ghj
export const makeId = (length) => {
  let result = '';

  // Crate array of characters
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  const charactersLength = characters.length;

  // Crate a for loop until we reach given lenth
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

// makeId(3); // a8b asd 789
