"use strict";
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
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
  allowTouchMove = true,
  autoplay = {
    delay: 0,
    reverseDirection: false
  },
  vertical = false,
  renderDot = null
}) => {
  if (!children) return;
  const childrenIsArray = Array.isArray(children);
  const childrenLength = childrenIsArray ? children.length : 1;
  const slidesArray = childrenIsArray ? [...children, ...children, ...children, ...children] : [children, children, children, children, children, children];
  const arrLen = slidesArray.length;
  const dotsCount = arrLen / (childrenIsArray ? 4 : 6);
  const m = Math;
  slidesPerGroup = m.max(
    1,
    m.min(slidesPerView = m.max(1, m.min(slidesPerView, m.floor(arrLen / 4 - childrenLength / 2))), slidesPerGroup)
  );
  const [slideIndex, setSlideIndex] = react.useState(0);
  const autoplayInterval = react.useRef(null);
  const sliderRef = react.useRef(null);
  const changeSlide = react.useCallback(
    throttle((direction) => {
      clearInterval(autoplayInterval.current);
      setSlideIndex((prevIndex) => (prevIndex + slidesPerGroup * direction + arrLen) % arrLen);
    }, 1e3),
    [slidesPerGroup]
  );
  const generateSlides = () => Array.from({ length: slidesPerView + slidesPerGroup * 2 + 2 }, (_, i) => /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: `${sliderfyClassName}__slide${i >= slidesPerGroup + 1 && i < slidesPerGroup + slidesPerView + 1 ? ` ${sliderfyClassName}__slide--active` : ""}`,
      style: {
        transform: `translate${vertical ? "Y" : "X"}(calc(${(i - slidesPerGroup - 1) * 100}% + ${spaceBetween * (i - slidesPerGroup - 0.5)}px))`,
        [vertical ? "height" : "width"]: `calc(${100 / slidesPerView}% - ${spaceBetween * slidesPerView / slidesPerView}px)`
      },
      children: slidesArray[(slideIndex + i - slidesPerGroup + arrLen - 1) % arrLen].props.children
    },
    (slideIndex + i - slidesPerGroup + arrLen) % arrLen
  ));
  const generateDots = () => renderDot && /* @__PURE__ */ jsxRuntime.jsx("ul", { className: `${sliderfyClassName}__dots`, children: Array.from(
    { length: dotsCount },
    (_, i) => renderDot(
      i,
      `${sliderfyClassName}__dot${i === slideIndex % dotsCount ? ` ${sliderfyClassName}__dot--active` : ""}`
    )
  ) });
  const generateArrows = () => ["prev", "next"].map((direction, i) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: `${sliderfyClassName}__arrow ${sliderfyClassName}__arrow--${direction}`,
        onClick: () => changeSlide(i ? 1 : -1)
      },
      direction
    );
  });
  react.useEffect(() => {
    if (autoplay.delay) {
      autoplayInterval.current = setInterval(
        () => changeSlide(autoplay.reverseDirection ? -1 : 1),
        m.max(autoplay.delay, 1e3)
      );
      return () => clearInterval(autoplayInterval.current);
    }
  }, [slideIndex, autoplay]);
  react.useEffect(() => {
    if (allowTouchMove) {
      const disableDrag = (event) => event.preventDefault();
      const preventClickOnSwipe = (event) => isSwiping && event.preventDefault();
      const handlePointerDown = (event) => {
        isSwiping = false;
        swipeStart = vertical ? event.clientY : event.clientX;
      };
      const handlePointerUp = (event) => {
        const delta = swipeStart - (vertical ? event.clientY : event.clientX);
        m.abs(delta) > 20 && (changeSlide(delta > 0 ? 1 : -1), isSwiping = true);
      };
      const events = [
        ["click", preventClickOnSwipe],
        ["dragstart", disableDrag],
        ["pointerdown", handlePointerDown],
        ["pointerup", handlePointerUp]
      ];
      events.forEach(([e, h]) => {
        var _a;
        return (_a = sliderRef.current) == null ? void 0 : _a.addEventListener(e, h);
      });
      return () => events.forEach(([e, h]) => {
        var _a;
        return (_a = sliderRef.current) == null ? void 0 : _a.removeEventListener(e, h);
      });
    }
  }, [allowTouchMove, vertical, autoplay]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: sliderfyClassName, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: `${sliderfyClassName}__wrapper`,
        ref: sliderRef,
        style: { touchAction: `pan-${vertical ? "x" : "y"}` },
        children: generateSlides()
      }
    ),
    generateArrows(),
    generateDots()
  ] });
};
module.exports = Sliderfy;
//# sourceMappingURL=sliderfy.cjs.js.map
