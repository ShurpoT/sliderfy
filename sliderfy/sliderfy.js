import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from "react";
let swipeStart = 0;
let isSwiping = false;
const throttle = (func, ms) => {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      return func(...args);
    }
  };
};
const Sliderfy = ({
  sliderfyClassName = "sliderfy",
  children,
  slidesPerView = 1,
  slidesPerGroup = 1,
  spaceBetween = 0,
  transitionDuration = 1e3,
  allowTouchMove = true,
  autoplay = {
    delay: 0,
    reverseDirection: false
  },
  vertical = false,
  renderDot = null
}) => {
  const slidesArray = Array.isArray(children) ? children : [children];
  const arrLen = slidesArray.length * 4;
  const dotsCount = slidesArray.length;
  const m = Math;
  const { delay, reverseDirection } = autoplay;
  const [slideIndex, setSlideIndex] = useState(0);
  const autoplayInterval = useRef(null);
  const sliderRef = useRef(null);
  const [sliderSize, setSliderSize] = useState({ w: 0, h: 0 });
  slidesPerGroup = m.max(1, m.min(slidesPerView = m.max(1, m.min(slidesPerView, arrLen / 4 - 1)), slidesPerGroup));
  const changeSlide = useCallback(
    throttle((direction) => {
      clearInterval(autoplayInterval.current ?? void 0);
      setSlideIndex((prevIndex) => (prevIndex + slidesPerGroup * direction + arrLen) % arrLen);
      const slider = sliderRef.current;
      const parent = slider == null ? void 0 : slider.parentElement;
      if (!slider || !parent) return;
      const parentSize = vertical ? parent.clientHeight : parent.clientWidth;
      const offsetPerSlide = (parentSize - spaceBetween * slidesPerView) / slidesPerView;
      const fullOffset = (offsetPerSlide + spaceBetween) * direction * slidesPerGroup;
      slider.style.transitionDuration = "0ms";
      slider.style.transform = `translate${vertical ? "Y" : "X"}(${fullOffset}px)`;
      requestAnimationFrame(() => {
        slider.style.transitionDuration = `${transitionDuration}ms`;
        slider.style.transform = `translate${vertical ? "Y" : "X"}(0)`;
      });
    }, transitionDuration),
    [slidesPerGroup, slidesPerView, spaceBetween, vertical, sliderSize, transitionDuration]
  );
  const generateSlides = () => {
    var _a;
    const parent = (_a = sliderRef.current) == null ? void 0 : _a.parentElement;
    const parentSize = vertical ? (parent == null ? void 0 : parent.clientHeight) ?? 1 : (parent == null ? void 0 : parent.clientWidth) ?? 1;
    const slideSize = (parentSize - spaceBetween * slidesPerView) / slidesPerView / parentSize * 100;
    return Array.from({ length: slidesPerView + slidesPerGroup * 2 + 2 }, (_, i) => {
      const index = (slideIndex + i - slidesPerGroup + arrLen - 1) % arrLen;
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: `sliderfy__slide ${sliderfyClassName}__slide${i >= slidesPerGroup + 1 && i < slidesPerGroup + slidesPerView + 1 ? ` ${sliderfyClassName}__slide--active` : ""}`,
          style: {
            [vertical ? "height" : "width"]: `${slideSize}%`
          },
          children: slidesArray[index % (arrLen / 4)].props.children
        },
        index
      );
    });
  };
  const generateDots = () => renderDot && /* @__PURE__ */ jsx("ul", { className: `sliderfy__dots ${sliderfyClassName}__dots`, children: Array.from(
    { length: dotsCount },
    (_, i) => renderDot(
      i,
      `sliderfy__dot ${sliderfyClassName}__dot ${slideIndex % dotsCount === i ? `sliderfy__dot--active ${sliderfyClassName}__dot--active` : ""}`
    )
  ) });
  const generateArrows = () => ["prev", "next"].map((direction, i) => /* @__PURE__ */ jsx(
    "div",
    {
      className: `sliderfy__arrow sliderfy__arrow--${direction} ${sliderfyClassName}__arrow ${sliderfyClassName}__arrow--${direction}`,
      onClick: () => changeSlide(i ? 1 : -1)
    },
    direction
  ));
  useEffect(() => {
    if (sliderRef.current) {
      setSliderSize({
        w: sliderRef.current.clientWidth,
        h: sliderRef.current.clientHeight
      });
    }
  }, []);
  useEffect(() => {
    sliderRef.current.style.transitionDuration = `${transitionDuration}`;
    sliderRef.current.style.gap = `${spaceBetween}px`;
  }, [spaceBetween, transitionDuration]);
  useEffect(() => {
    if (delay) {
      autoplayInterval.current = setInterval(() => {
        console.log(sliderfyClassName + "	" + Math.round(Math.random() % 10 * 10));
        changeSlide(reverseDirection ? -1 : 1);
      }, Math.max(delay, transitionDuration + 200));
      return () => clearInterval(autoplayInterval.current ?? void 0);
    }
    return () => clearInterval(autoplayInterval.current ?? void 0);
  }, [delay, reverseDirection, transitionDuration, changeSlide, sliderSize, slideIndex]);
  useEffect(() => {
    const sliderEl = sliderRef.current;
    if (!allowTouchMove || !sliderEl) return;
    const disableDrag = (event) => event.preventDefault();
    const preventClickOnSwipe = (event) => isSwiping && event.preventDefault();
    const handlePointerDown = (event) => {
      isSwiping = false;
      swipeStart = vertical ? event.clientY : event.clientX;
    };
    const handlePointerUp = (event) => {
      const delta = swipeStart - (vertical ? event.clientY : event.clientX);
      if (m.abs(delta) > 20) {
        changeSlide(delta > 0 ? 1 : -1);
        isSwiping = true;
      }
    };
    const events = [
      ["click", preventClickOnSwipe],
      ["dragstart", disableDrag],
      ["pointerdown", handlePointerDown],
      ["pointerup", handlePointerUp]
    ];
    if (allowTouchMove) {
      events.forEach(([e, h]) => sliderEl == null ? void 0 : sliderEl.addEventListener(e, h));
      return () => events.forEach(([e, h]) => sliderEl == null ? void 0 : sliderEl.removeEventListener(e, h));
    }
  }, [allowTouchMove, vertical, autoplay, sliderSize, changeSlide, m]);
  if (!children) return;
  return /* @__PURE__ */ jsxs("div", { className: `sliderfy sliderfy-${vertical ? "vertical" : "horizontal"} ${sliderfyClassName}`, children: [
    /* @__PURE__ */ jsx("div", { className: `sliderfy__container ${sliderfyClassName}__container`, children: /* @__PURE__ */ jsx("div", { className: `sliderfy__wrapper ${sliderfyClassName}__wrapper`, ref: sliderRef, children: generateSlides() }) }),
    generateArrows(),
    generateDots()
  ] });
};
export {
  Sliderfy as default
};
//# sourceMappingURL=sliderfy.js.map
