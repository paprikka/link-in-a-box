import "./main.css";

const toolDataUri = document.getElementById("tool-data-uri");

const state = new Proxy(
  {},
  {
    set(target, property, value) {
      target[property] = value;
      renderUpdate();
      return true;
    },
  }
);

const linkInput = document.getElementById("link-input");
const maskedLink = document.getElementById("masked-link");
const form = document.getElementById("tool-data-uri");
const preview = document.getElementById("preview");

const renderUpdate = () => {
  const link = linkInput.value;
  const linkHTML = `<a href="${link}">${link}</a>`;
  const dataUri = `data:text/html;charset=utf-8,${encodeURIComponent(
    linkHTML
  )}`;

  maskedLink.textContent = dataUri;

  preview.innerHTML = linkHTML;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

form.addEventListener("input", (event) => {
  state.link = event.target.value;
});

renderUpdate();

const copyButton = document.getElementById("copy-masked-link");
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(maskedLink.textContent);
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 1000);
});
