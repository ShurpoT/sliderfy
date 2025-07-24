<div align="center">

[![npm version](https://img.shields.io/npm/v/sliderfy.svg)](https://www.npmjs.com/package/sliderfy)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/sliderfy)](https://bundlephobia.com/result?p=sliderfy)
[![BEM Methodology](https://img.shields.io/badge/Methodology-BEM-F2C94C)](https://en.bem.info/methodology/quick-start/)
[![Downloads](https://img.shields.io/npm/dm/sliderfy.svg)](https://www.npmjs.com/package/sliderfy)
[![License](https://img.shields.io/npm/l/sliderfy.svg)](https://opensource.org/licenses/MIT)

<!-- [![GitHub stars](https://img.shields.io/github/stars/ShurpoT/sliderfy.svg?style=social&label=Stars)](https://github.com/ShurpoT/sliderfy) -->

</div>

<div align="center">

![Sliderfy Preview](https://github.com/ShurpoT/sliderfy/blob/main/images/logos/sliderfy-bgc.png?raw=true)

</div>

<div align="center" style="font-size:20px; font-weight:700">

# Sliderfy

</div>

<div align="center" style="font-size:20px">

A lightweight, simple, and customizable React slider.

[![NPM](https://nodei.co/npm/sliderfy.png?downloads=true)](https://nodei.co/npm/sliderfy/)

</div>
<br/>
<br/>

<div align="center">

## Props

</div>

<div align="center" >

| Name                        | Type                           | Default      | Description                                      |
| --------------------------- | :----------------------------- | :----------- | :----------------------------------------------- |
| `sliderfyClassName`         | `string`                       | `"sliderfy"` | Class name for the slider container.             |
| `children`                  | `JSX.Element or JSX.Element[]` | `-`          | Slide elements (single or array).                |
| `slidesPerView`             | `number`                       | `1`          | Number of slides per view.                       |
| `slidesPerGroup`            | `number`                       | `1`          | Number of slides to move at a time.              |
| `transitionDuration`        | `number`                       | `1000`       | Duration of the slide transition in milliseconds |
| `spaceBetween`              | `number`                       | `0`          | Distance between slides in px.                   |
| `allowTouchMove`            | `boolean`                      | `true`       | Enable touch swipe.                              |
| `autoplay`                  | `object`                       | `null`       | Autoplay settings.                               |
| `autoplay.delay`            | `number`                       | `0`          | Delay in milliseconds for autoplay.              |
| `autoplay.reverseDirection` | `boolean`                      | `false`      | Reverse autoplay direction.                      |
| `vertical`                  | `boolean`                      | `false`      | Set to `true` for vertical slider.               |
| `renderDot`                 | `null or function`             | `null`       | Function to render custom navigation dots.       |

<br/>
<br/>

</div>

<!--
<div align="center" >

## React

<div  style="width:700px" >

![Code](https://github.com/ShurpoT/sliderfy/blob/main/images/example/Example.png?raw=true)

</div>

## CSS

<div  style="width:700px" >

![Code](https://github.com/ShurpoT/sliderfy/blob/main/images/example/Example-css.png?raw=true)

</div>

</div> -->

<br/>
<br/>
<br/>

<div align="center" >

# 🟥🟥🟥 Download 🟥🟥🟥

</div>

```npm
npm i sliderfy
```

<br/>
<br/>
<br/>

<div align="center" >

# 🟧🟧🟧 JSX / TSX 🟧🟧🟧

### Replace `YOUR_SLIDER` with your custom class name.

</div>

```jsx
import Sliderfy from "sliderfy";
```

```jsx
import "./sliderfy.css";
```

```jsx
<Sliderfy
    sliderfyClassName="YOUR_SLIDER"
    slidesPerView={1}
    slidesPerGroup={1}
    transitionDuration={1000}
    spaceBetween={30}
    vertical={false}
    allowTouchMove={true}
    autoplay={{ delay: 2000, reverseDirection: false }}
    renderDot={(i, className) => <li key={i} className={className}></li>}>
    {Array.from({ length: 9 }, (_, i) => (
        <div key={i}></div>
    ))}
</Sliderfy>
```

<br/>
<br/>
<br/>

<div align="center" >

# 🟦🟦🟦 CSS 🟦🟦🟦

### Replace `YOUR_SLIDER` with your custom class name.

</div>

```CSS
/* SLIDER */
.YOUR_SLIDER {}
.YOUR_SLIDER__container {
    /* overflow: visible; */

}
.YOUR_SLIDER__wrapper {}
.YOUR_SLIDER__slide {}
.YOUR_SLIDER__slide--active {}



/* ARROWS */
.YOUR_SLIDER__arrow {}
.YOUR_SLIDER__arrow--prev {}
.YOUR_SLIDER__arrow--next {}



/* PAGINATION */
.YOUR_SLIDER__dots {}
.YOUR_SLIDER__dot {}
.YOUR_SLIDER__dot--active {}

```

<br/>
<br/>
<br/>

<div align="center" >

# 🟪🟪🟪 SCSS 🟪🟪🟪

<!-- ### Replace YOUR_SLIDER with your custom class name. -->

</div>

```SCSS
/* SLIDER */
.YOUR_SLIDER {
    &__container {
        /* overflow: visible; */
    }

    &__wrapper {}

    &__slide {
        &--active {}
    }

    /* ARROWS */
    &__arrow {
        &--prev {}
        &--next {}
    }


    /* PAGINATION */
    &__dots {}
    &__dot {
        &--active {}
    }
}
```

<br/>
<br/>
<br/>
<div align="center" >

# 🟪🟪🟪 Sass 🟪🟪🟪

<!-- ### Replace YOUR_SLIDER with your custom class name. -->

</div>

```SCSS
/* SLIDER */
.YOUR_SLIDER
    &__container
        /* overflow: visible; */

    &__wrapper

    &__slide
        &--active

    /* ARROWS */
    &__arrow
        &--prev
        &--next

    /* PAGINATION */
    &__dots

    &__dot
        &--active
```

<br/>
<br/>
<br/>

<div align="center" >

# 🔥🔥🔥 Result 🔥🔥🔥

<div  style="width:700px" >

![Code](https://github.com/ShurpoT/sliderfy/blob/main/images/result/video.gif?raw=true)

</div>

</div>
