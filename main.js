function verifierValidation(cpf, base) {
  let sum = 0;
  let mod = 0;
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
  let firstVerifier = verifierValidation(cpf, 9);
  let secondVerifier = verifierValidation(cpf, 10);

  if (cpf.length != 11) {
    return false;
  } else if (!firstVerifier && !secondVerifier) {
    return false;
  }

  return true;
}

function cpfMask() {
  let mask = '###.###.###-##';
  let input = inputEl.value.length;
  let out = mask.substring(0, 1);
  let text = mask.substring(input);

  if (text.substring(0, 1) != out) {
    inputEl.value += text.substring(0, 1);
  }
}

var submitEl = document.getElementById('action');
var inputEl = document.getElementById('cpf');
inputEl.onkeypress = cpfMask;

submitEl.onclick = () => {
	let cpf = inputEl.value.replace(/\.|-/g, '');
	let isCpfValid = cpfValid(cpf)

	document.getElementById('success').style.display = 'none';
	document.getElementById('error').style.display = 'none';

  inputEl.value = '';

  if (isCpfValid) {
    success.style.display = 'flex';

  } else {
    error.style.display = 'flex';
  }
}
