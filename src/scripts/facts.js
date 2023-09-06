import { fetcher } from "./fetcher";

const btnEl = document.querySelector(".get-fact__btn");
const inputEl = document.querySelector(".get-fact__input");

function setCursorAfterFirstWord(string, inputEl) {
  if(!string.length || !inputEl) {
    return
  }
  const words = string.split(' ');
  if (words.length > 0) {
      const firstWordLength = words[0].length;
      inputEl.setSelectionRange(firstWordLength, firstWordLength);
  }
}

function getFact() {
  fetcher("https://catfact.ninja/fact")
    .then(data => {
      inputEl.value = data?.fact || "Нет факта, попробуйте еще раз";
      inputEl.focus();
      setCursorAfterFirstWord(inputEl.value, inputEl)
    })
    .catch(e => {
      inputEl.value = "Что-то пошло не так, попробуйте еще раз"
    });
}

export function renderFact () {
  btnEl.addEventListener("click", getFact);
}
