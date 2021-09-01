import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
    this.inner = this.elem.querySelector(".ribbon__inner");
    this.leftArrow = this.elem.querySelector(".ribbon__arrow_left");
    this.rightArrow = this.elem.querySelector(".ribbon__arrow_right");

    if (this.leftArrow.classList.contains("ribbon__arrow_visible")) {
      this.leftArrow.classList.remove("ribbon__arrow_visible");
    }

    this.rightArrow.classList.add("ribbon__arrow_visible");
    this.leftArrow.addEventListener("click", this.moveLeft);
    this.rightArrow.addEventListener("click", this.moveRight);
    this.inner.addEventListener("click", this.choseCategory);
  }

  moveLeft = (event) => {
    this.inner.scrollBy(-350, 0);
    this.inner.addEventListener("scroll", this.visibleArrow);
  };

  moveRight = (event) => {
    this.inner.scrollBy(350, 0);
    this.inner.addEventListener("scroll", this.visibleArrow);
  };

  visibleArrow = (event) => {
    let scrollLeft = this.inner.scrollLeft;
    let scrollWidth = this.inner.scrollWidth;
    let clientWidth = this.inner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft > 0) {
      this.leftArrow.classList.add("ribbon__arrow_visible");
    } else if (this.leftArrow.classList.contains("ribbon__arrow_visible")) {
      this.leftArrow.classList.remove("ribbon__arrow_visible");
    }

    if (scrollRight < 1) {
      if (this.rightArrow.classList.contains("ribbon__arrow_visible")) {
        this.rightArrow.classList.remove("ribbon__arrow_visible");
      }
    } else {
      this.rightArrow.classList.add("ribbon__arrow_visible");
    }
  };

  choseCategory = (event) => {
    if (!event.target.classList.contains("ribbon__item")) {
      return;
    }
    event.preventDefault();

    let chosen = this.elem.querySelectorAll(".ribbon__item_active");
    Array.from(chosen).forEach((element) => {
      if (element.classList.contains("ribbon__item_active")) {
        element.classList.remove("ribbon__item_active");
      }
    });
    event.target.classList.add("ribbon__item_active");

    let id = event.target.getAttribute("data-id");
    event.target.id = id;

    this.elem.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: event.target.id,
        bubbles: true,
      })
    );
  };

  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("ribbon");
    let html = `<button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>
  <nav class="ribbon__inner">`;
    this.categories.forEach((element, index) => {
      html =
        html +
        `<a href="#" class="ribbon__item${
          index === 0 ? " ribbon__item_active" : ""
        }" data-id="${element.id}">${element.name}</a>`;
    });
    html =
      html +
      `</nav>
  <button class="ribbon__arrow ribbon__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`;
    this.elem.innerHTML = html;
  }
}
