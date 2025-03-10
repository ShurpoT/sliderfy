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

</div>
<br/>
<br/>

<div align="center">

## Props

</div>

<div align="center" >

| Name                        | Type                           | Default      | Description                                |
| --------------------------- | :----------------------------- | :----------- | :----------------------------------------- |
| `sliderfyClassName`         | `string`                       | `"sliderfy"` | Class name for the slider container.       |
| `children`                  | `JSX.Element or JSX.Element[]` | `-`          | Slide elements (single or array).          |
| `slidesPerView`             | `number`                       | `1`          | Number of slides per view.                 |
| `slidesPerGroup`            | `number`                       | `1`          | Number of slides to move at a time.        |
| `spaceBetween`              | `number`                       | `0`          | Distance between slides in px.             |
| `allowTouchMove`            | `boolean`                      | `true`       | Enable touch swipe.                        |
| `autoplay`                  | `object`                       | `null`       | Autoplay settings.                         |
| `autoplay.delay`            | `number`                       | `0`          | Delay in milliseconds for autoplay.        |
| `autoplay.reverseDirection` | `boolean`                      | `false`      | Reverse autoplay direction.                |
| `vertical`                  | `boolean`                      | `false`      | Set to `true` for vertical slider.         |
| `renderDot`                 | `null or function`             | `null`       | Function to render custom navigation dots. |

<br/>
<br/>

</div>

# Example

```npm
npm i sliderfy
```

<div align="center" >

## React

<div  style="width:700px" >

![Code](https://github.com/ShurpoT/sliderfy/blob/main/images/example/Example.png?raw=true)

</div>

## CSS

<div  style="width:700px" >

![Code](https://github.com/ShurpoT/sliderfy/blob/main/images/example/Example-css.png?raw=true)

</div>

</div>

# Result

<div align="center" >

<div  style="width:700px" >

![Code](https://github.com/ShurpoT/sliderfy/blob/main/images/result/video.gif?raw=true)

</div>

</div>
