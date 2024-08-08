export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 2;
    return this.distance.finalPosition - this.distance.movement;
  }

  moveSlid(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  onStart(e) {
    e.preventDefault();
    this.distance.startX = e.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(e) {
    const finalPosition = this.updatePosition(e.clientX);
    this.moveSlid(finalPosition);
  }

  onEnd() {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
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
