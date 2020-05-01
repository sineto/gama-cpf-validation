function verifierValidation(cpf, base) {
  var sum = 0;
  var mod = 0;
  for (let i = 1; i <= base; i++) {
    sum += parseInt(cpf.charAt(i-1)) * ((base + 2) - i);
    mod = (sum * 10) % 11
  }

  if (mod == 10 || mod == 11) {
    mod = 0;
  }

  if (mod != cpf.charAt(base)) {
    return false
  }

  return true;
}

function cpfValid(cpf) {
  var firstVerifier = verifierValidation(cpf, 9);
  var secondVerifier = verifierValidation(cpf, 10);

  if (cpf.length != 11) {
    return false;
  } else if (!firstVerifier && !secondVerifier) {
    return false;
  }

  return true;
}

function cpfMask() {
  var mask = '###.###.###-##';
  var input = inputEl.value.length;
  var out = mask.substring(0, 1);
  var text = mask.substring(input);

  if (text.substring(0, 1) != out) {
    inputEl.value += text.substring(0, 1);
  }
}

var inputEl = document.getElementById('cpf');
var submitEl = document.getElementById('action');
var alertDiv = document.getElementsByClassName('clean-div');
inputEl.onkeypress = cpfMask;

submitEl.onclick = () => {
  var cpf = inputEl.value.replace(/\.|-/g, '');
  var isCpfValid = cpfValid(cpf)

  document.getElementById('success').style.display = 'none';
  document.getElementById('error').style.display = 'none';
  inputEl.value = '';

  if (isCpfValid) {
    success.style.display = 'flex';
  } else {
    error.style.display = 'flex';
  }
}
