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
    let moveType;
    if (e.type === "mousedown") {
      e.preventDefault();
      this.distance.startX = e.clientX;
      moveType = "mousemove";
    } else {
      this.distance.startX = e.changedTouches[0].clientX;
      moveType = "touchmove";
    }
    this.wrapper.addEventListener(moveType, this.onMove);
  }

  onMove(e) {
    const pointerPosition = e.type === "mousemove" ? e.clientX : e.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlid(finalPosition);
  }

  onEnd(e) {
    const moveType = e.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  addEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  slidePosition(slide) {
    const margin = (this.slide.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slidesArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNav(index) {
    const last = this.slidesArray.length - 1;
    this.index = {
      prev: index ? -1 : null,
      current: index,
      next: index === last ? null : index + 1,
    };
  }

  changeSlide(index) {
    const currentSlide = this.slidesArray[index];
    this.moveSlid(currentSlide.position);
    this.slidesIndexNav(index);
    this.distance.finalPosition = currentSlide.position;
  }

  init() {
    this.bindEvents();
    this.addEvent();
    this.slidesConfig();
    return this;
  }
}
