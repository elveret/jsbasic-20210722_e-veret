import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
    document.body.append(this.elem);
  }

  setTitle = (title) => {
    document.querySelector(".modal__title").textContent = title;
  };

  setBody(modalBody) {
    let body = document.querySelector(".modal__body");
    body.insertAdjacentElement("afterbegin", modalBody);
  }

  open() {
    document.body.classList.add("is-modal-open");

    document
      .querySelector(".modal__close")
      .addEventListener("click", this.close);
    document.body.addEventListener("keydown", this.close);
  }

  close = (event) => {
    if (!event) {
      return;
    }
    if (
      (event.code === "Escape" && event.type === "keydown") ||
      (event.type === "click" &&
        event.target.classList.contains("modal__close"))
    ) {
      document
        .querySelector(".modal__close")
        .removeEventListener("click", this.close);
      document.body.removeEventListener("keydown", this.close);

      document.querySelector(".modal").remove();
      document.body.classList.remove("is-modal-open");
    }
  };

  render() {
    this.elem = createElement(
      `<div class="modal"><div class="modal__overlay"></div><div class="modal__inner"><div class="modal__header"><button type="button" class="modal__close"><img src="/assets/images/icons/cross-icon.svg" alt="close-icon" /></button><h3 class="modal__title"></h3></div><div class="modal__body"></div></div></div>`
    );
  }
}
