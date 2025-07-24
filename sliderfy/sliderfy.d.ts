import { JSX } from 'react';
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
declare const Sliderfy: ({ sliderfyClassName, children, slidesPerView, slidesPerGroup, spaceBetween, transitionDuration, allowTouchMove, autoplay, vertical, renderDot, }: ISliderfy) => import("react/jsx-runtime").JSX.Element | undefined;
export default Sliderfy;
