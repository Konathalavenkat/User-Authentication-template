const generateCode = (length) => {
  const number = Math.random().toString().split(".")[1].split("");
  var code = "";
  if (!length) length = 4;
  for (let i = 0; i < length; i++) {
    code += number[i];
  }
  return code;
};

module.exports = generateCode;
