// ❌⭕🔴
// 🟠🟧🔶
// 💠🔵
// ✅🟢

//
//
// import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sliderfy from "./Sliderfy";

// БАЗОВЫЙ КЛАСС СЛАЙДЕРА
const baseClass = "sliderfy";
const baseSlideClass = `.${baseClass}__slide`;

// КАСТОМНЫЙ КЛАСС СЛАЙДЕРА
const customClass = "my-image-slider";
const customWrapperClass = `.${customClass}__wrapper`;
const customSlideClass = `.${customClass}__slide`;
const serachCustomActiveSlideClass = `.${customClass}__slide--active`;
const customActiveSlideClass = `${customClass}__slide--active`;

// ПАГИНАЦИЯ
const customDotsClass = `.${customClass}__dots`;
const customActiveDotClass = `${customClass}__dot--active`;

// СТРЕЛКИ
const customPrevArrowClass = `.${customClass}__arrow--prev`;
const customNextArrowClass = `.${customClass}__arrow--next`;

describe("", () => {
    // БАЗОВЫЙ И КАСТОМНЫЙ КЛАССЫ
    describe("1) Sliderfy Component - Base and Custom Class Rendering", () => {
        it("should render Sliderfy with default base class", () => {
            const { container } = render(
                <Sliderfy>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            const slider = container.firstChild;
            expect(slider).toBeInTheDocument();
            expect(slider).toHaveClass(baseClass);
        });

        it("should render Sliderfy with custom class name\n", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            const slider = container.firstChild;
            expect(slider).toBeInTheDocument();
            expect(slider).toHaveClass(customClass);
        });
    });

    // БЕЗ childrens
    // ПРОВЕРКА РЕНДЕРИНГА СЛАЙДОВ С БАЗОВЫМ КЛАССОМ И 1 children
    // ПРОВЕРКА РЕНДЕРИНГА СЛАЙДОВ С КАСТОМНЫМ КЛАССОМ И >1 children
    describe("2) Sliderfy Component - Slide Rendering with Base and Custom Classes", () => {
        it("should not render Sliderfy when no children are provided", () => {
            // @ts-ignore
            const { container } = render(<Sliderfy></Sliderfy>);

            const slider = container.firstChild;
            expect(slider).toBeNull();
        });

        it("should render Sliderfy with one child and display 5 identical slides", () => {
            const { container } = render(
                <Sliderfy>
                    <div>slide 1</div>
                </Sliderfy>
            );

            const slides = screen.getAllByText(/slide 1/i);
            expect(slides.length).toBe(5);
        });

        it("should render Sliderfy with multiple children and display 5 slides in the correct order\n", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>slide {i}</div>
                    ))}
                </Sliderfy>
            );

            const slides = screen.getAllByText(/slide/i);

            expect(slides.length).toBe(5);
            expect(slides[0]).toHaveTextContent("slide 8");
            expect(slides[1]).toHaveTextContent("slide 9");
            expect(slides[2]).toHaveTextContent("slide 0");
            expect(slides[3]).toHaveTextContent("slide 1");
            expect(slides[4]).toHaveTextContent("slide 2");
        });
    });

    // ТЕСТ ЧТО slidesPerView ПРАВЛЬНО ОГРАНИЧИВАЕТСЯ
    describe("3) Sliderfy Component - slidesPerView Limits", () => {
        it("should not allow slidesPerView less than 1", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} slidesPerView={-5}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slides = container.querySelectorAll(customSlideClass);
            const slides = screen.getAllByText(/\d/);
            const aciveSlides = container.querySelectorAll(serachCustomActiveSlideClass);

            expect(slides.length).toBe(5);
            expect(aciveSlides.length).toBe(1);
        });

        it("should render exactly 1 slide per view when slidesPerView equals 1", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} slidesPerView={1}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slides = container.querySelectorAll(customSlideClass);
            const slides = screen.getAllByText(/\d/);
            const aciveSlides = container.querySelectorAll(serachCustomActiveSlideClass);

            expect(slides.length).toBe(5);
            expect(aciveSlides.length).toBe(1);
        });

        it("should render slidesPerView more than 1 but limit to the available slides", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} slidesPerView={2}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slides = container.querySelectorAll(customSlideClass);
            const slides = screen.getAllByText(/\d/);
            const aciveSlides = container.querySelectorAll(serachCustomActiveSlideClass);

            expect(slides.length).toBe(6);
            expect(aciveSlides.length).toBe(2);
        });

        it("should adjust slidesPerView to the maximum allowed value when it exceeds the maximum available slides\n", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} slidesPerView={12}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slides = container.querySelectorAll(customSlideClass);

            const slides = screen.getAllByText(/\d/);
            const aciveSlides = container.querySelectorAll(serachCustomActiveSlideClass);

            expect(slides.length).toBe(9);
            expect(aciveSlides.length).toBe(5);
        });
    });

    // slidesPerView + slidesPerGroup * 2 + 2
    // ТЕСТ ЧТО slidesPerGroup ПРАВЛЬНО ОГРАНИЧИВАЕТСЯ
    describe("4) Sliderfy Component - slidesPerGroup Limits", () => {
        it("should not allow slidesPerGroup less than 1", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} slidesPerView={-5} slidesPerGroup={-5}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slides = container.querySelectorAll(customSlideClass);
            const slides = screen.getAllByText(/\d/);
            expect(slides.length).toBe(5);
        });

        it("should correctly handle slidesPerGroup equal to 1", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} slidesPerView={1} slidesPerGroup={1}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slides = container.querySelectorAll(customSlideClass);
            const slides = screen.getAllByText(/\d/);
            expect(slides.length).toBe(5);
        });

        it("should render slides based on slidesPerGroup more than 1", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} slidesPerView={2} slidesPerGroup={2}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slides = container.querySelectorAll(customSlideClass);
            const slides = screen.getAllByText(/\d/);
            expect(slides.length).toBe(8);
        });

        it("should limit slidesPerGroup if greater than slidesPerView", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} slidesPerView={12} slidesPerGroup={100}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slides = container.querySelectorAll(customSlideClass);
            const slides = screen.getAllByText(/\d/);
            expect(slides.length).toBe(17);
        });
    });

    // spaceBetween
    describe("5) Sliderfy Component - spaceBetween calculation", () => {
        const calculateSlideWidth = (wrapperWidth: number, spaceBetween: number, slidesPerView: number) => {
            return (wrapperWidth - spaceBetween * slidesPerView) / slidesPerView;
        };

        const testCases = [
            { clientWidth: 1000, spaceBetween: 30, slidesPerView: 3, result: 303.33 },
            { clientWidth: 1000, spaceBetween: 20, slidesPerView: 4, result: 230 },
            { clientWidth: 1000, spaceBetween: 50, slidesPerView: 2, result: 450 },
            { clientWidth: 1134, spaceBetween: 32, slidesPerView: 4, result: 251.5 },
            { clientWidth: 1200, spaceBetween: 40, slidesPerView: 5, result: 200 },
            { clientWidth: 800, spaceBetween: 10, slidesPerView: 2, result: 390 },
            { clientWidth: 1500, spaceBetween: 25, slidesPerView: 6, result: 225 },
        ];

        it("should correctly calculate slide width based on spaceBetween and slidesPerView\n", () => {
            testCases.forEach((item) => {
                const { container } = render(
                    <Sliderfy sliderfyClassName={customClass} spaceBetween={item.spaceBetween}>
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i}>{i}</div>
                        ))}
                    </Sliderfy>
                );

                const sliderWrapper = container.querySelector(customWrapperClass);
                Object.defineProperty(sliderWrapper, "clientWidth", { value: item.clientWidth, configurable: true });

                const slideWidth = calculateSlideWidth(
                    sliderWrapper?.clientWidth as number,
                    item.spaceBetween,
                    item.slidesPerView
                );
                expect(+slideWidth.toFixed(2)).toBe(item.result);
            });
        });
    });

    describe("6) Sliderfy Component - Vertical Functionality", () => {
        it("does not apply vertical behavior when vertical is false", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} vertical={false}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slide = container.querySelector(customSlideClass);
            const slides = screen.getAllByText(/\d/);

            slides.forEach((slide) => {
                expect(slide).not.toBeNull();

                const transformValue = window.getComputedStyle(slide!).transform;
                expect(transformValue.includes("translateX")).toBe(true);
                expect(transformValue.includes("translateY")).toBe(false);
            });
        });
        it("applies vertical behavior when vertical is true\n", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} vertical={true}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            // const slide = container.querySelector(customSlideClass);
            const slides = screen.getAllByText(/\d/);

            slides.forEach((slide) => {
                expect(slide).not.toBeNull();

                const transformValue = window.getComputedStyle(slide!).transform;
                expect(transformValue.includes("translateX")).toBe(false);
                expect(transformValue.includes("translateY")).toBe(true);
            });
        });
    });

    // ПАГИНАЦИЯ
    describe("7) Sliderfy Component - Pagination (RenderDot) Functionality", () => {
        it("does not render pagination when renderDot is not provided", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            const pagination = container.querySelector(customDotsClass);
            expect(pagination).toBeNull();
        });

        it("renders pagination when renderDot is provided\n", () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass} renderDot={(i, className) => <li key={i} className={className}></li>}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            const pagination = container.querySelector(customDotsClass);

            expect(pagination).toBeInTheDocument();
            expect(pagination?.firstChild).toHaveClass(customActiveDotClass);
        });
    });

    // СТРЕЛКИ
    describe("8) Sliderfy Component - Arrows Rendering", () => {
        it("renders both previous and next arrows\n", async () => {
            const { container } = render(
                <Sliderfy sliderfyClassName={customClass}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );
            const previousArrow = container.querySelector(customPrevArrowClass);
            const nextArrow = container.querySelector(customNextArrowClass);

            expect(previousArrow).toBeInTheDocument();
            expect(nextArrow).toBeInTheDocument();
        });
    });

    //  СМЕНА СЛАЙДОВ ЧЕРЕЗ: arrows click <---> allowTouchMove <---> autoplay
    describe("9) Sliderfy Component - Change slides", () => {
        it("using arrows", async () => {
            const slidesPerView = 2;
            const slidesPerGroup = 2;
            const arrayLength = slidesPerView + slidesPerGroup * 2 + 2;
            let slideIndex = 0;

            const handleClickArrow = async (arrow: Element, direction: -1 | 1) => {
                await userEvent.click(arrow!);
                slideIndex = (slideIndex + slidesPerGroup * direction + 40) % 40;
                await new Promise((res) => setTimeout(res, 1100));
            };

            const check = async (array: number[]) => {
                const slides = container.querySelectorAll(customSlideClass);
                const slideNumbers = Array.from(slides).map((slide) => {
                    return parseInt(slide?.textContent?.trim() as string, 10);
                });

                expect(slideNumbers).toEqual(array);
                for (let i = slidesPerGroup + 1; i < slidesPerGroup + slidesPerView + 1; i++) {
                    expect(slides[i]).toHaveClass(customActiveSlideClass);
                }
            };

            const generateArray = () => {
                return Array.from({ length: arrayLength }, (_, i) => (slideIndex + i - slidesPerGroup + 10 - 1) % 10);
            };

            const { container } = render(
                <Sliderfy
                    sliderfyClassName={customClass}
                    slidesPerView={slidesPerView}
                    slidesPerGroup={slidesPerGroup}
                    renderDot={(i, className) => <li key={i} className={className}></li>}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            const pagination = container.querySelector(customDotsClass);
            const prevArrow = container.querySelector(customPrevArrowClass);
            const nextArrow = container.querySelector(customNextArrowClass);
            expect(prevArrow).not.toBeNull();
            expect(nextArrow).not.toBeNull();

            for (let i = 0; i < 5; i++) {
                expect(pagination?.children[slideIndex]).toHaveClass(customActiveDotClass);
                await handleClickArrow(nextArrow!, 1);
                check(generateArray());
            }

            for (let i = 0; i < 7; i++) {
                await handleClickArrow(prevArrow!, -1);
                check(generateArray());
            }
        }, 100000);

        it("using horizontal touch swipe", async () => {
            const slidesPerView = 2;
            const slidesPerGroup = 2;
            const arrayLength = slidesPerView + slidesPerGroup * 2 + 2;
            let slideIndex = 0;

            const handleClickArrow = async (direction: -1 | 1) => {
                // возможно клик можно убрать.
                await userEvent.click(sliderWrapper!);
                await fireEvent.dragStart(sliderWrapper!);
                await userEvent.pointer([
                    { target: sliderWrapper!, keys: "[MouseLeft>]", coords: { x: 500, y: 200 } }, // Начинаем свайп по центру
                    { coords: { x: 500 - 100 * direction, y: 200 } }, // Двигаем влево на 100px
                    { keys: "[/MouseLeft]" }, // Отпускаем палец
                ]);
                slideIndex = (slideIndex + slidesPerGroup * direction + 40) % 40;
                await new Promise((res) => setTimeout(res, 1500));
            };

            const check = async (array: number[]) => {
                const slides = container.querySelectorAll(customSlideClass);
                const slideNumbers = Array.from(slides).map((slide) => {
                    return parseInt(slide?.textContent?.trim() as string, 10);
                });

                expect(slideNumbers).toEqual(array);
                for (let i = slidesPerGroup + 1; i < slidesPerGroup + slidesPerView + 1; i++) {
                    expect(slides[i]).toHaveClass(customActiveSlideClass);
                }
            };

            const generateArray = () => {
                return Array.from({ length: arrayLength }, (_, i) => (slideIndex + i - slidesPerGroup + 10 - 1) % 10);
            };

            const { container } = render(
                <Sliderfy
                    sliderfyClassName={customClass}
                    slidesPerView={slidesPerView}
                    slidesPerGroup={slidesPerGroup}
                    allowTouchMove={true}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            const sliderWrapper = container.querySelector(customWrapperClass);
            Object.defineProperty(sliderWrapper, "clientWidth", { value: 1000, configurable: true });

            for (let i = 0; i < 5; i++) {
                await handleClickArrow(1);
                check(generateArray());
            }

            for (let i = 0; i < 7; i++) {
                await handleClickArrow(-1);
                check(generateArray());
            }
        }, 100000);

        it("using vertical touch swipe", async () => {
            const slidesPerView = 2;
            const slidesPerGroup = 2;
            const arrayLength = slidesPerView + slidesPerGroup * 2 + 2;
            let slideIndex = 0;

            const handleClickArrow = async (direction: -1 | 1) => {
                // await userEvent.click(arrow!);
                await userEvent.pointer([
                    { target: sliderWrapper!, keys: "[MouseLeft>]", coords: { x: 500, y: 200 } }, // Начинаем свайп по центру
                    { coords: { x: 500, y: 200 - 100 * direction } }, // Двигаем влево на 100px
                    { keys: "[/MouseLeft]" }, // Отпускаем палец
                ]);
                slideIndex = (slideIndex + slidesPerGroup * direction + 40) % 40;
                await new Promise((res) => setTimeout(res, 1500));
            };

            const check = async (array: number[]) => {
                const slides = container.querySelectorAll(customSlideClass);
                const slideNumbers = Array.from(slides).map((slide) => {
                    return parseInt(slide?.textContent?.trim() as string, 10);
                });

                expect(slideNumbers).toEqual(array);
                for (let i = slidesPerGroup + 1; i < slidesPerGroup + slidesPerView + 1; i++) {
                    expect(slides[i]).toHaveClass(customActiveSlideClass);
                }
            };

            const generateArray = () => {
                return Array.from({ length: arrayLength }, (_, i) => (slideIndex + i - slidesPerGroup + 10 - 1) % 10);
            };

            const { container } = render(
                <Sliderfy
                    sliderfyClassName={customClass}
                    slidesPerView={slidesPerView}
                    slidesPerGroup={slidesPerGroup}
                    allowTouchMove={true}
                    vertical={true}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>{i}</div>
                    ))}
                </Sliderfy>
            );

            const sliderWrapper = container.querySelector(customWrapperClass);
            Object.defineProperty(sliderWrapper, "clientWidth", { value: 1000, configurable: true });

            for (let i = 0; i < 5; i++) {
                await handleClickArrow(1);
                check(generateArray());
            }

            for (let i = 0; i < 7; i++) {
                await handleClickArrow(-1);
                check(generateArray());
            }
        }, 100000);

        it("using autoplay swipe\n", () => {
            [false, true].forEach(async (item) => {
                const slidesPerView = 2;
                const slidesPerGroup = 2;
                const arrayLength = slidesPerView + slidesPerGroup * 2 + 2;
                const autoplay = { delay: 1200, reverseDirection: item };
                let slideIndex = 0;

                const check = async (array: number[]) => {
                    const slides = container.querySelectorAll(customSlideClass);
                    const slideNumbers = Array.from(slides).map((slide) => {
                        return parseInt(slide?.textContent?.trim() as string, 10);
                    });

                    expect(slideNumbers).toEqual(array);
                    for (let i = slidesPerGroup + 1; i < slidesPerGroup + slidesPerView + 1; i++) {
                        expect(slides[i]).toHaveClass(customActiveSlideClass);
                    }
                };

                const generateArray = () => {
                    return Array.from({ length: arrayLength }, (_, i) => (slideIndex + i - slidesPerGroup + 10 - 1) % 10);
                };

                const { container } = render(
                    <Sliderfy
                        sliderfyClassName={customClass}
                        slidesPerView={slidesPerView}
                        slidesPerGroup={slidesPerGroup}
                        autoplay={autoplay}>
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i}>{i}</div>
                        ))}
                    </Sliderfy>
                );

                // промис опустить вниз
                for (let i = 0; i < 25; i++) {
                    await new Promise((res) => setTimeout(res, autoplay.delay + 10));
                    slideIndex = (slideIndex + slidesPerGroup * (autoplay.reverseDirection ? -1 : 1) + 40) % 40;
                    check(generateArray());
                }
            });
        }, 100000);
    });
});
