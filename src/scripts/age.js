import { fetcher } from "./fetcher";

const formEl = document.querySelector(".get-age");
const btnEl = document.querySelector(".get-age__btn");
const inputEl = document.querySelector(".get-age__input");
const resultEl = document.querySelector(".get-age__result");
let abortController = new AbortController();
let timeout;


function getSuffix(years) {
  if (years % 10 === 1 && years % 100 !== 11) {
      return years + ' год';
  }
  else if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
      return years + ' года';
  }
  else {
      return years + ' лет';
  }
}

function handleSubmit(e) {
  e.preventDefault();
  getAge();
}

function getAge() {
  abortController.abort();
  abortController = new AbortController();
  if(!inputEl || !resultEl) {
    return
  }
  const users = localStorage.getItem("users");
  const names = users ? JSON.parse(users) : [];
  const name = inputEl.value ? inputEl.value.trim().toLowerCase() : "";
  if(!name) {
    return
  }

  const user = names.find(i => i.name.toLowerCase() === name);
  if(user) {
    resultEl.textContent = getSuffix(user.age);
    return
  }

  fetcher("https://api.agify.io/", {name: name}, abortController.signal)
    .then(data => {
      resultEl.textContent = data.age ? getSuffix(data.age) : "попробуйте еще раз";
      names.push({name: name, age: data.age});
      localStorage.setItem("users", JSON.stringify(names));
    })
    .catch(e => {
      resultEl.textContent = "Что-то пошло не так, попробуйте еще раз"
    });
}

export function renderAge () {
  if(!formEl || !inputEl || !btnEl || !resultEl) {
    return
  }
  formEl.addEventListener("submit", handleSubmit);
  inputEl.addEventListener("input", () => {
    if(timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => getAge(), 3000);
  });
}
