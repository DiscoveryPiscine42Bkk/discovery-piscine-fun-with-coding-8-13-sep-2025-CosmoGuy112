const COOKIE_NAME = "ft_list";
const listEl = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");


function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const row = document.cookie.split("; ").find(s => s.startsWith(name + "="));
  return row ? decodeURIComponent(row.split("=").slice(1).join("=")) : null;
}


function saveToCookie() {
  const items = Array.from(listEl.querySelectorAll(".todo")).map(el => el.textContent);
  
  setCookie(COOKIE_NAME, JSON.stringify(items));
}

function addTodo(text, save = true) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.onclick = () => {
    if (confirm(`Remove this TO DO?\n\n"${text}"`)) {
      div.remove();
      saveToCookie();
    }
  };


  listEl.prepend(div);
  if (save) saveToCookie();
}

function loadFromCookie() {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return;
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) {
      for (const txt of arr) addTodo(txt, false);
    }
  } catch {}
}

window.onload = () => {
  loadFromCookie();
  newBtn.onclick = () => {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
      addTodo(text.trim());
    }
  };
};
