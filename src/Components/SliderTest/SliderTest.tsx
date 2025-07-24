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

    const [isVertical, setIsVertical] = useState<boolean>(false);
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
            {/* <Sliderfy sliderfyClassName="slider-test" transitionDuration={1300} autoplay={{ delay: 300 }}>
                <div>slide 1</div>
            </Sliderfy> */}
            {/* <Sliderfy
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
            </Sliderfy> */}
            {/* <Sliderfy
                sliderfyClassName="slider-test"
                slidesPerView={3}
                slidesPerGroup={2}
                spaceBetween={20}
                vertical={false}
                allowTouchMove={true}
                transitionDuration={2000}
                autoplay={{ delay: 3000, reverseDirection: false }}
                renderDot={isPagination === true ? (i, className) => <li key={i} className={className}></li> : null}>
                {Array.from({ length: 9 }, (_, i) => (
                    <div key={i}>
                        <span>{i}</span>
                    </div>
                ))}
            </Sliderfy> */}
            {/* <br />
            <br />
            <br />
            <br /> */}

            <Sliderfy
                sliderfyClassName="slider-test"
                slidesPerView={slidesPerViewValue}
                slidesPerGroup={slidesPerGroupValue}
                spaceBetween={0}
                vertical={isVertical}
                allowTouchMove={true}
                transitionDuration={700}
                autoplay={{ delay: 700, reverseDirection: false }}
                renderDot={isPagination === true ? (i, className) => <li key={i} className={className}></li> : null}>
                {Array.from({ length: 9 }, (_, i) => (
                    <div key={i}>
                        <span>{i}</span>
                    </div>
                ))}
            </Sliderfy>

            {/* <Sliderfy
                sliderfyClassName="my-image-slider"
                slidesPerView={3}
                slidesPerGroup={2}
                spaceBetween={0}
                vertical={false}
                allowTouchMove={true}
                // autoplay={{ delay: 2000, reverseDirection: false }}
                renderDot={(i, className) => <li key={i} className={className}></li>}>
                {Array.from({ length: 9 }, (_, i) => (
                    <div key={i}>
                        <span>0{i + 1}</span>
                    </div>
                ))}
            </Sliderfy> */}
        </>
    );
}

export default Slider_Test;

//  <div>0</div>:0,
//  <div>1</div>:1,
//  <div>2</div>:2,
//  <div>3</div>:3,
//  <div>4</div>:4,
//  <div>5</div>:5,
//  <div>6</div>:6,
//  <div>7</div>:7,
//  <div>8</div>:8,
//  <div>9</div>:9,
//  <div>0</div>:10,
//  <div>1</div>:11,
//  <div>2</div>:12,
//  <div>3</div>:13,
//  <div>4</div>:14,
//  <div>5</div>:15,
//  <div>6</div>:16,
//  <div>7</div>:17,
//  <div>8</div>:18,
//  <div>9</div>:19
