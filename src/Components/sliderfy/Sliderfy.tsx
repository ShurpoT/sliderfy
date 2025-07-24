import { useState, useCallback, useEffect, useRef, JSX } from "react";

import "./sliderfy.css";

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

interface ISliderfy {
    sliderfyClassName?: string;
    children: JSX.Element | JSX.Element[];

    slidesPerView?: number;
    slidesPerGroup?: number;
    spaceBetween?: number;

    transitionDuration?: number;

    allowTouchMove?: boolean;

    autoplay?: AutoplayOptions;

    vertical?: boolean;
    renderDot?: null | ((i: number, className: string) => JSX.Element);
}

const Sliderfy = ({
    sliderfyClassName = "sliderfy",
    children,

    slidesPerView = 1,
    slidesPerGroup = 1,
    spaceBetween = 0,

    transitionDuration = 1000,

    allowTouchMove = true,

    autoplay = {
        delay: 0,
        reverseDirection: false,
    },

    vertical = false,
    renderDot = null,
}: ISliderfy) => {
    const slidesArray = Array.isArray(children) ? children : [children];
    const arrLen = slidesArray.length * 4;
    const dotsCount = slidesArray.length;

    const m = Math;
    const { delay, reverseDirection } = autoplay;

    const [slideIndex, setSlideIndex] = useState(0);
    const autoplayInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [sliderSize, setSliderSize] = useState({ w: 0, h: 0 });
    slidesPerGroup = m.max(1, m.min((slidesPerView = m.max(1, m.min(slidesPerView, arrLen / 4 - 1))), slidesPerGroup));

    const changeSlide = useCallback(
        throttle((direction: number) => {
            clearInterval(autoplayInterval.current ?? undefined);
            setSlideIndex((prevIndex) => (prevIndex + slidesPerGroup * direction + arrLen) % arrLen);

            const slider = sliderRef.current;
            const parent = slider?.parentElement;

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
        const parent = sliderRef.current?.parentElement;

        const parentSize = vertical ? parent?.clientHeight ?? 1 : parent?.clientWidth ?? 1;
        const slideSize = ((parentSize - spaceBetween * slidesPerView) / slidesPerView / parentSize) * 100;

        return Array.from({ length: slidesPerView + slidesPerGroup * 2 + 2 }, (_, i) => {
            const index = (slideIndex + i - slidesPerGroup + arrLen - 1) % arrLen;
            return (
                <div
                    key={index}
                    className={`sliderfy__slide ${sliderfyClassName}__slide${
                        i >= slidesPerGroup + 1 && i < slidesPerGroup + slidesPerView + 1
                            ? ` ${sliderfyClassName}__slide--active`
                            : ""
                    }`}
                    style={{
                        [vertical ? "height" : "width"]: `${slideSize}%`,
                    }}>
                    {slidesArray[index % (arrLen / 4)].props.children}
                </div>
            );
        });
    };

    const generateDots = () =>
        renderDot && (
            <ul className={`sliderfy__dots ${sliderfyClassName}__dots`}>
                {Array.from({ length: dotsCount }, (_, i) =>
                    renderDot(
                        i,
                        `sliderfy__dot ${sliderfyClassName}__dot ${
                            slideIndex % dotsCount === i ? `sliderfy__dot--active ${sliderfyClassName}__dot--active` : ""
                        }`
                    )
                )}
            </ul>
        );

    const generateArrows = () =>
        ["prev", "next"].map((direction, i) => (
            <div
                key={direction}
                className={`sliderfy__arrow sliderfy__arrow--${direction} ${sliderfyClassName}__arrow ${sliderfyClassName}__arrow--${direction}`}
                onClick={() => changeSlide(i ? 1 : -1)}>
                {direction}
            </div>
        ));

    useEffect(() => {
        if (sliderRef.current) {
            setSliderSize({
                w: sliderRef.current.clientWidth,
                h: sliderRef.current.clientHeight,
            });
        }
    }, []);

    useEffect(() => {
        sliderRef.current!.style.transitionDuration = `${transitionDuration}`;
        sliderRef.current!.style.gap = `${spaceBetween}px`;
    }, [spaceBetween, transitionDuration]);

    useEffect(() => {
        if (delay) {
            autoplayInterval.current = setInterval(() => {
                console.log(sliderfyClassName + "\t" + Math.round((Math.random() % 10) * 10));
                changeSlide(reverseDirection ? -1 : 1);
            }, Math.max(delay, transitionDuration + 200));
            return () => clearInterval(autoplayInterval.current ?? undefined);
        }
        // return () => clearInterval(autoplayInterval.current!);
        // return () => autoplayInterval.current && clearInterval(autoplayInterval.current!);
        return () => clearInterval(autoplayInterval.current ?? undefined);
    }, [delay, reverseDirection, transitionDuration, changeSlide, sliderSize, slideIndex]);

    useEffect(() => {
        const sliderEl = sliderRef.current;
        if (!allowTouchMove || !sliderEl) return;

        const disableDrag = (event: DragEvent) => event.preventDefault();

        const preventClickOnSwipe = (event: MouseEvent) => isSwiping && event.preventDefault();

        const handlePointerDown = (event: PointerEvent) => {
            isSwiping = false;
            swipeStart = vertical ? event.clientY : event.clientX;
        };

        const handlePointerUp = (event: PointerEvent) => {
            const delta = swipeStart - (vertical ? event.clientY : event.clientX);
            if (m.abs(delta) > 20) {
                changeSlide(delta > 0 ? 1 : -1);
                isSwiping = true;
            }
        };

        const events: Array<[keyof HTMLElementEventMap, (event: any) => void]> = [
            ["click", preventClickOnSwipe],
            ["dragstart", disableDrag],
            ["pointerdown", handlePointerDown],
            ["pointerup", handlePointerUp],
        ];

        if (allowTouchMove) {
            events.forEach(([e, h]) => sliderEl?.addEventListener(e, h));
            return () => events.forEach(([e, h]) => sliderEl?.removeEventListener(e, h));
        }
    }, [allowTouchMove, vertical, autoplay, sliderSize, changeSlide, m]);

    if (!children) return;
    return (
        <div className={`sliderfy sliderfy-${vertical ? "vertical" : "horizontal"} ${sliderfyClassName}`}>
            <div className={`sliderfy__container ${sliderfyClassName}__container`}>
                <div className={`sliderfy__wrapper ${sliderfyClassName}__wrapper`} ref={sliderRef}>
                    {generateSlides()}
                </div>
            </div>
            {generateArrows()}
            {generateDots()}
        </div>
    );
};

export default Sliderfy;
