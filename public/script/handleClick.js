const copy = () => {
  const text = document.querySelector("#shortURL").getAttribute("value");
  navigator.clipboard.writeText(text).then(() => {
    document.querySelector("#copied").style.display = "block";
  });
};

document.querySelector("#copyURL").addEventListener("click", () => {
  copy();
});

document.addEventListener("click", () => {
  document.querySelector("#copied").style.display = "none";
});
