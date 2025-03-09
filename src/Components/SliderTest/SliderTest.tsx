import { useState } from "react";

import Sliderfy from "../sliderfy/Sliderfy";

import "./slider_test.css";
import "./my_image_slider.css";
import "./Control_panel.css";

function Slider_Test() {
    const [isOpenControll, setIsOpenControll] = useState<boolean>(false);

    const [slidesPerViewValue, setSlidesPerViewValue] = useState<number>(1);
    const [slidesPerGroupValue, setSlidesPerGroupValue] = useState<number>(1);
    const [spaceBetweenValue, setSpaceBetweenValue] = useState<number>(0);
    const [isAllowTouchMove, setIsAllowTouchMove] = useState<boolean>(true);

    const [isVertical, setIsVertical] = useState<boolean>(true);
    const [autoplayDelay, setAutoplayDelay] = useState<number>(0);
    const [isReverseDirection, setIsReverseDirection] = useState<boolean>(false);

    const [isPagination, setIsPagination] = useState<null | true>(true);

    return (
        <>
            <button className={`open-button${isOpenControll ? " open" : ""}`} onClick={() => setIsOpenControll((prev) => !prev)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`control-panel ${isOpenControll ? " open" : ""}`}>
                <button className={`btn${isVertical ? " btn-active" : ""}`} onClick={() => setIsVertical((prev) => !prev)}>
                    Vertical
                </button>
                <button
                    className={`btn${isAllowTouchMove ? " btn-active" : ""}`}
                    onClick={() => setIsAllowTouchMove((prev) => !prev)}>
                    Allow Touch Move
                </button>
                <button
                    className={`btn${isPagination ? " btn-active" : ""}`}
                    onClick={() => setIsPagination((prev) => (prev ? null : true))}>
                    Pagination
                </button>
                <div className="control-panel__param">
                    <span>slidesPerView:</span>
                    <input value={slidesPerViewValue} onChange={(e) => setSlidesPerViewValue(+e.target.value)} type="number" />
                </div>
                <div className="control-panel__param">
                    <span>slidesPerGroup:</span>
                    <input value={slidesPerGroupValue} onChange={(e) => setSlidesPerGroupValue(+e.target.value)} type="number" />
                </div>
                <div className="control-panel__param">
                    <span>spaceBetween:</span>
                    <input value={spaceBetweenValue} onChange={(e) => setSpaceBetweenValue(+e.target.value)} type="number" />
                </div>
                <div className="control-panel__param">
                    <span>autoplay delay:</span>
                    <input value={autoplayDelay} onChange={(e) => setAutoplayDelay(+e.target.value)} step={100} type="number" />
                </div>
                {autoplayDelay ? (
                    <button
                        className={`btn${isReverseDirection ? " btn-active" : ""}`}
                        onClick={() => setIsReverseDirection((prev) => !prev)}>
                        Reverse Direction
                    </button>
                ) : null}
            </div>

            <Sliderfy
                sliderfyClassName="slider-test"
                slidesPerView={slidesPerViewValue}
                slidesPerGroup={slidesPerGroupValue}
                spaceBetween={spaceBetweenValue}
                vertical={isVertical}
                allowTouchMove={isAllowTouchMove}
                autoplay={{ delay: autoplayDelay, reverseDirection: isReverseDirection }}
                renderDot={isPagination === true ? (i, className) => <li key={i} className={className}></li> : null}>
                {Array.from({ length: 9 }, (_, i) => (
                    <div key={i}>
                        <span>0{i + 1}</span>
                    </div>
                ))}
            </Sliderfy>
            <br />
            <br />
            <br />
            <br />
            <Sliderfy
                sliderfyClassName="my-image-slider"
                slidesPerView={2}
                slidesPerGroup={1}
                spaceBetween={30}
                vertical={false}
                allowTouchMove={true}
                // autoplay={{ delay: 2000, reverseDirection: false }}
                renderDot={(i, className) => <li key={i} className={className}></li>}>
                {Array.from({ length: 9 }, (_, i) => (
                    <div key={i}>
                        <span>0{i + 1}</span>
                    </div>
                ))}
            </Sliderfy>
        </>
    );
}

export default Slider_Test;
