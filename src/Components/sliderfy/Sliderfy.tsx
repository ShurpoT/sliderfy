import { useState, useCallback, useEffect, useRef, JSX } from "react";

let swipeStart: number = 0;
let isSwiping: boolean = false;

const throttle = <T extends (...args: any[]) => any>(func: T, ms: number): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;
    return function (...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastCall >= ms) {
            lastCall = now;
            return func(...args);
        }
    };
};

type AutoplayOptions = {
    delay: number;
    reverseDirection?: boolean;
};

type ISliderfy = {
    sliderfyClassName?: string;
    children: JSX.Element | JSX.Element[];

    slidesPerView?: number;
    slidesPerGroup?: number;
    spaceBetween?: number;

    allowTouchMove?: boolean;

    autoplay?: AutoplayOptions;

    vertical?: boolean;
    renderDot?: null | ((i: number, className: string) => JSX.Element);
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
        reverseDirection: false,
    },

    vertical = false,
    renderDot = null,
}: ISliderfy) => {
    if (!children) return;
    const childrenIsArray = Array.isArray(children);
    const childrenLength = childrenIsArray ? children.length : 1;

    const slidesArray = childrenIsArray
        ? [...children, ...children, ...children, ...children]
        : [children, children, children, children, children, children];

    const arrLen = slidesArray.length;
    const dotsCount = arrLen / (childrenIsArray ? 4 : 6);
    const m = Math;

    slidesPerGroup = m.max(
        1,
        m.min((slidesPerView = m.max(1, m.min(slidesPerView, m.floor(arrLen / 4 - childrenLength / 2)))), slidesPerGroup)
    );

    const [slideIndex, setSlideIndex] = useState(0);
    const autoplayInterval = useRef<any>(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const changeSlide = useCallback(
        throttle((direction: number) => {
            clearInterval(autoplayInterval.current);
            setSlideIndex((prevIndex) => (prevIndex + slidesPerGroup * direction + arrLen) % arrLen);
        }, 1000),
        [slidesPerGroup]
    );

    const generateSlides = () =>
        Array.from({ length: slidesPerView + slidesPerGroup * 2 + 2 }, (_, i) => (
            <div
                key={(slideIndex + i - slidesPerGroup + arrLen) % arrLen}
                className={`${sliderfyClassName}__slide${
                    i >= slidesPerGroup + 1 && i < slidesPerGroup + slidesPerView + 1
                        ? ` ${sliderfyClassName}__slide--active`
                        : ""
                }`}
                style={{
                    transform: `translate${vertical ? "Y" : "X"}(calc(${(i - slidesPerGroup - 1) * 100}% + ${
                        spaceBetween * (i - slidesPerGroup - 0.5)
                    }px))`,
                    [vertical ? "height" : "width"]: `calc(${100 / slidesPerView}% - ${
                        (spaceBetween * slidesPerView) / slidesPerView
                    }px)`,
                }}>
                {slidesArray[(slideIndex + i - slidesPerGroup + arrLen - 1) % arrLen].props.children}
            </div>
        ));

    const generateDots = () =>
        renderDot && (
            <ul className={`${sliderfyClassName}__dots`}>
                {Array.from({ length: dotsCount }, (_, i) =>
                    renderDot(
                        i,
                        `${sliderfyClassName}__dot${i === slideIndex % dotsCount ? ` ${sliderfyClassName}__dot--active` : ""}`
                    )
                )}
            </ul>
        );

    const generateArrows = () =>
        ["prev", "next"].map((direction, i) => {
            return (
                <div
                    key={direction}
                    className={`${sliderfyClassName}__arrow ${sliderfyClassName}__arrow--${direction}`}
                    onClick={() => changeSlide(i ? 1 : -1)}></div>
            );
        });

    useEffect(() => {
        if (autoplay.delay) {
            autoplayInterval.current = setInterval(
                () => changeSlide(autoplay.reverseDirection ? -1 : 1),
                m.max(autoplay.delay, 1000)
            );
            return () => clearInterval(autoplayInterval.current);
        }
    }, [slideIndex, autoplay]);

    useEffect(() => {
        if (allowTouchMove) {
            const disableDrag = (event: DragEvent) => event.preventDefault();

            const preventClickOnSwipe = (event: MouseEvent) => isSwiping && event.preventDefault();

            const handlePointerDown = (event: PointerEvent) => {
                isSwiping = false;
                swipeStart = vertical ? event.clientY : event.clientX;
            };

            const handlePointerUp = (event: PointerEvent) => {
                const delta = swipeStart - (vertical ? event.clientY : event.clientX);
                m.abs(delta) > 20 && (changeSlide(delta > 0 ? 1 : -1), (isSwiping = true));
            };

            const events: Array<[keyof HTMLElementEventMap, (event: any) => void]> = [
                ["click", preventClickOnSwipe],
                ["dragstart", disableDrag],
                ["pointerdown", handlePointerDown],
                ["pointerup", handlePointerUp],
            ];

            events.forEach(([e, h]) => sliderRef.current?.addEventListener(e, h));
            return () => events.forEach(([e, h]) => sliderRef.current?.removeEventListener(e, h));
        }
    }, [allowTouchMove, vertical, autoplay]);

    return (
        <div className={sliderfyClassName}>
            <div
                className={`${sliderfyClassName}__wrapper`}
                ref={sliderRef}
                style={{ touchAction: `pan-${vertical ? "x" : "y"}` }}>
                {generateSlides()}
            </div>
            {generateArrows()}
            {generateDots()}
        </div>
    );
};

export default Sliderfy;
