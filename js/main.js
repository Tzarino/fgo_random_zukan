var zukan;
var zukan_length;

const randomZukanNoArr = (max) => {
  var arr = [];
  numArr = [];
  for (var i = 0; i < Object.keys(zukan).length; i++) {
    arr[i] = i + 1;
  }
  for (var j = 0, len = arr.length; j < max; j++, len--) {
    rndNum = Math.floor(Math.random() * len);
    numArr.push(arr[rndNum]);
    arr[rndNum] = arr[len - 1];
  }
  return numArr;
}

const submit = (e = null) => {
  let tb = document.getElementsByTagName("tbody")[0];
  while (tb.firstChild) {
    tb.removeChild(tb.firstChild);
  }
  let number;
  if (e == null) {
    number = document.getElementById("maxNumber").value || 1;
  } else {
    number = e.target.value;
  }
  let servant_arr = [];
  let random_numbers = randomZukanNoArr(number);
  random_numbers.map((x, i) => {
    servant = [parseInt(random_numbers[i], 10), zukan[random_numbers[i]]];
    servant_arr[i] = servant;
  })

  servant_arr.sort((key1, key2) => (
    key1[0] - key2[0]
  ))

  for (let index = 0; index < number; index++) {
    var row = tb.insertRow();
    row.insertCell().textContent = servant_arr[index][0];
    row.insertCell().textContent = servant_arr[index][1];
  }
}

document.getElementById("form").onsubmit = (e) => {
  e.preventDefault();
  submit();
}

const onLoad = async () => {
  zukan = await fetch('./zukan.json').then((data) => data.json());
  zukan_length = Object.keys(zukan).length;
  var current = document.getElementById("current");
  current.textContent = `${zukan[zukan_length]}まで。全${zukan_length}人。`
}

window.addEventListener('load', onLoad())

const elms = document.getElementsByClassName("numberButton");
Array.prototype.map.call(elms, (elm) => {
  elm.addEventListener("click", (e) => {
    e.preventDefault();
    submit(e);
  })
})