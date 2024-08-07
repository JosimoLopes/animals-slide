export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
  }

  onStart(e) {
    e.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove() {}

  onEnd() {
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }

  addEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addEvent();

    return this;
  }
}
