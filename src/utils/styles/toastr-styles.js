import { injectGlobal } from 'styled-components';

injectGlobal `
@charset "UTF-8";

/ *!
 * Animate.css -http: //daneden.me/animate
 * Versión - 3.5.2
 * Licenciado bajo la licencia MIT - http://opensource.org/licenses/MIT
 *
 * Derechos de autor (c) 2017 Daniel Eden
 * /

.animated {
  animación-duración: 1 s;
  animación-fill-mode: ambos;
}

.animated.infinite {
  animación-iteración de conteo: infinita;
}

.animated.hinge {
  animación-duración: 2s;
}

.animated.flipOutX,
.animated.flipOutY,
.animated.bounceIn,
.animated.bounceOut {
  animación-duración: .75s;
}

@keyframes rebotan {
  de, 20%, 53%, 80%, a {
    animación-timing-función: cúbico-Bezier (0.215, 0.610, 0.355, 1.000);
    transformar: translate3d (0,0,0);
  }

  40%, 43% {
    animación-timing-función: cúbico-Bezier (0.755, 0.050, 0.855, 0.060);
    transform: translate3d (0, -30px, 0);
  }

  70% {
    animación-timing-función: cúbico-Bezier (0.755, 0.050, 0.855, 0.060);
    transform: translate3d (0, -15px, 0);
  }

  90% {
    transform: translate3d (0, -4px, 0);
  }
}

.rebotar {
  animación-name: rebotar;
  transformar origen: parte inferior central;
}

@keyframes Flash {
  de, 50%, a {
    opacidad: 1;
  }

  25%, 75% {
    opacidad: 0;
  }
}

.destello {
  animación-name: flash;
}

/ * Originalmente escrito por Nick Pettit - https://github.com/nickpettit/glide * /

@keyframes pulso {
  de {
    transformar: scale3d (1, 1, 1);
  }

  50% {
    transformar: scale3d (1,05, 1,05, 1,05);
  }

  a {
    transformar: scale3d (1, 1, 1);
  }
}

.pulse {
  animación-name: pulso;
}

@keyframes RubberBand {
  de {
    transformar: scale3d (1, 1, 1);
  }

  30% {
    transformar: scale3d (1.25, 0.75, 1);
  }

  40% {
    transformar: scale3d (0.75, 1.25, 1);
  }

  50% {
    transformar: scale3d (1.15, 0.85, 1);
  }

  sesenta y cinco% {
    transformar: scale3d (0.95, 1.05, 1);
  }

  75% {
    transformar: scale3d (1.05, 0.95, 1);
  }

  a {
    transformar: scale3d (1, 1, 1);
  }
}

.banda elástica {
  animación-name: RubberBand;
}

@keyframes sacuden {
  desde, hacia {
    transform: translate3d (0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translate3d (-10px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d (10px, 0, 0);
  }
}

.sacudir {
  animación nombre: agitar;
}

@keyframes Headshake {
  0% {
    transformar: translateX (0);
  }

  6.5% {
    transform: translateX (-6px) rotateY (-9deg);
  }

  18,5% {
    transform: translateX (5px) rotateY (7deg);
  }

  31,5% {
    transform: translateX (-3px) rotateY (-5deg);
  }

  43,5% {
    transform: translateX (2px) rotateY (3deg);
  }

  50% {
    transformar: translateX (0);
  }
}

.sacudida de la cabeza {
  animación-timing-función: la facilidad en-hacia fuera;
  animación-name: Headshake;
}

@keyframes oscilar {
  20% {
    transformar: ROTATE3D (0, 0, 1, 15 grados);
  }

  40% {
    transformar: ROTATE3D (0, 0, 1, -10deg);
  }

  60% {
    transformar: ROTATE3D (0, 0, 1, 5deg);
  }

  80% {
    transformar: ROTATE3D (0, 0, 1, -5deg);
  }

  a {
    transformar: ROTATE3D (0, 0, 1, 0 grados);
  }
}

.swing {
  transformar origen: parte superior central;
  animación-name: columpio;
}

@keyframes tada {
  de {
    transformar: scale3d (1, 1, 1);
  }

  10%, 20% {
    transformar: scale3d (0.9, 0.9, 0.9) ROTATE3D (0, 0, 1, -3deg);
  }

  30%, 50%, 70%, 90% {
    transformar: scale3d (1.1, 1.1, 1.1) ROTATE3D (0, 0, 1, 3deg);
  }

  40%, 60%, 80% {
    transformar: scale3d (1.1, 1.1, 1.1) ROTATE3D (0, 0, 1, -3deg);
  }

  a {
    transformar: scale3d (1, 1, 1);
  }
}

.tada {
  animación-name: tada;
}

/ * Originalmente escrito por Nick Pettit - https://github.com/nickpettit/glide * /

@keyframes bambolean {
  de {
    transform: none;
  }

  15% {
    transformar: translate3d (-25%, 0, 0) ROTATE3D (0, 0, 1, -5deg);
  }

  30% {
    transformar: translate3d (20%, 0, 0) ROTATE3D (0, 0, 1, 3deg);
  }

  45% {
    transformar: translate3d (-15%, 0, 0) ROTATE3D (0, 0, 1, -3deg);
  }

  60% {
    transformar: translate3d (10%, 0, 0) ROTATE3D (0, 0, 1, 2 grados);
  }

  75% {
    transformar: translate3d (-5%, 0, 0) ROTATE3D (0, 0, 1, -1deg);
  }

  a {
    transform: none;
  }
}

.wobble {
  animación-name: tambalearse;
}

@keyframes gelatina {
  desde, 11,1%, a {
    transform: none;
  }

  22,2% {
    transform: skewX (-12.5deg) skewY (-12.5deg);
  }

  33,3% {
    transform: skewX (6.25deg) skewY (6.25deg);
  }

  44,4% {
    transform: skewX (-3.125deg) skewY (-3.125deg);
  }

  55,5% {
    transform: skewX (1.5625deg) skewY (1.5625deg);
  }

  66,6% {
    transform: skewX (-0.78125deg) skewY (-0.78125deg);
  }

  77,7% {
    transform: skewX (0.390625deg) skewY (0.390625deg);
  }

  88,8% {
    transform: skewX (-0.1953125deg) skewY (-0.1953125deg);
  }
}

.jello {
  animación-name: gelatina;
  transformar origen: center;
}

@keyframes bounceIn {
  de, 20%, 40%, 60%, 80%, a {
    animación-timing-función: cúbico-Bezier (0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacidad: 0;
    transform: scale3d (0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d (1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d (0.9, 0.9, 0.9);
  }

  60% {
    opacidad: 1;
    transform: scale3d (1,03, 1,03, 1,03);
  }

  80% {
    transform: scale3d (0.97, 0.97, 0.97);
  }

  a {
    opacidad: 1;
    transformar: scale3d (1, 1, 1);
  }
}

.bounceIn {
  animación-name: bounceIn;
}

@keyframes bounceInDown {
  de, 60%, 75%, 90%, a {
    animación-timing-función: cúbico-Bezier (0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacidad: 0;
    transform: translate3d (0, -3000px, 0);
  }

  60% {
    opacidad: 1;
    transform: translate3d (0, 25 píxeles, 0);
  }

  75% {
    transform: translate3d (0, -10px, 0);
  }

  90% {
    transform: translate3d (0, 5px, 0);
  }

  a {
    transform: none;
  }
}

.bounceInDown {
  animación-name: bounceInDown;
}

@keyframes bounceInLeft {
  de, 60%, 75%, 90%, a {
    animación-timing-función: cúbico-Bezier (0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacidad: 0;
    transform: translate3d (-3000px, 0, 0);
  }

  60% {
    opacidad: 1;
    transform: translate3d (25 px, 0, 0);
  }

  75% {
    transform: translate3d (-10px, 0, 0);
  }

  90% {
    transform: translate3d (5px, 0, 0);
  }

  a {
    transform: none;
  }
}

.bounceInLeft {
  animación-name: bounceInLeft;
}

@keyframes bounceInRight {
  de, 60%, 75%, 90%, a {
    animación-timing-función: cúbico-Bezier (0.215, 0.610, 0.355, 1.000);
  }

  de {
    opacidad: 0;
    transform: translate3d (3000px, 0, 0);
  }

  60% {
    opacidad: 1;
    transform: translate3d (-25px, 0, 0);
  }

  75% {
    transform: translate3d (10px, 0, 0);
  }

  90% {
    transform: translate3d (-5px, 0, 0);
  }

  a {
    transform: none;
  }
}

.bounceInRight {
  animación-name: bounceInRight;
}

@keyframes bounceInUp {
  de, 60%, 75%, 90%, a {
    animación-timing-función: cúbico-Bezier (0.215, 0.610, 0.355, 1.000);
  }

  de {
    opacidad: 0;
    transform: translate3d (0, 3000px, 0);
  }

  60% {
    opacidad: 1;
    transform: translate3d (0, -20px, 0);
  }

  75% {
    transform: translate3d (0, 10px, 0);
  }

  90% {
    transform: translate3d (0, -5px, 0);
  }

  a {
    transform: translate3d (0, 0, 0);
  }
}

.bounceInUp {
  animación-name: bounceInUp;
}

@keyframes bounceOut {
  20% {
    transform: scale3d (0.9, 0.9, 0.9);
  }

  50%, 55% {
    opacidad: 1;
    transform: scale3d (1.1, 1.1, 1.1);
  }

  a {
    opacidad: 0;
    transform: scale3d (0.3, 0.3, 0.3);
  }
}

.rebotar fuera {
  animación-name: bounceOut;
}

@keyframes bounceOutDown {
  20% {
    transform: translate3d (0, 10px, 0);
  }

  40%, 45% {
    opacidad: 1;
    transform: translate3d (0, -20px, 0);
  }

  a {
    opacidad: 0;
    transform: translate3d (0, 2000px, 0);
  }
}

.bounceOutDown {
  animación-name: bounceOutDown;
}

@keyframes bounceOutLeft {
  20% {
    opacidad: 1;
    transform: translate3d (20 píxeles, 0, 0);
  }

  a {
    opacidad: 0;
    transform: translate3d (-2000px, 0, 0);
  }
}

.bounceOutLeft {
  animación-name: bounceOutLeft;
}

@keyframes bounceOutRight {
  20% {
    opacidad: 1;
    transform: translate3d (-20px, 0, 0);
  }

  a {
    opacidad: 0;
    transform: translate3d (2000px, 0, 0);
  }
}

.bounceOutRight {
  animación-name: bounceOutRight;
}

@keyframes bounceOutUp {
  20% {
    transform: translate3d (0, -10px, 0);
  }

  40%, 45% {
    opacidad: 1;
    transform: translate3d (0, 20 píxeles, 0);
  }

  a {
    opacidad: 0;
    transform: translate3d (0, -2000px, 0);
  }
}

.bounceOutUp {
  animación-name: bounceOutUp;
}

@keyframes fadeIn {
  de {
    opacidad: 0;
  }

  a {
    opacidad: 1;
  }
}

.fundirse {
  animación-name: fadeIn;
}

@keyframes fadeInDown {
  de {
    opacidad: 0;
    transformar: translate3d (0, -100%, 0);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.fadeInDown {
  animación-name: fadeInDown;
}

@keyframes fadeInDownBig {
  de {
    opacidad: 0;
    transform: translate3d (0, -2000px, 0);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.fadeInDownBig {
  animación-name: fadeInDownBig;
}

@keyframes fadeInLeft {
  de {
    opacidad: 0;
    transformar: translate3d (-100%, 0, 0);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.fadeInLeft {
  animación-name: fadeInLeft;
}

@keyframes fadeInLeftBig {
  de {
    opacidad: 0;
    transform: translate3d (-2000px, 0, 0);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.fadeInLeftBig {
  animación-name: fadeInLeftBig;
}

@keyframes fadeInRight {
  de {
    opacidad: 0;
    transformar: translate3d (100%, 0, 0);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.fadeInRight {
  animación-name: fadeInRight;
}

@keyframes fadeInRightBig {
  de {
    opacidad: 0;
    transform: translate3d (2000px, 0, 0);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.fadeInRightBig {
  animación-name: fadeInRightBig;
}

@keyframes fadeInUp {
  de {
    opacidad: 0;
    transformar: translate3d (0, 100%, 0);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.fadeInUp {
  animación-name: fadeInUp;
}

@keyframes fadeInUpBig {
  de {
    opacidad: 0;
    transform: translate3d (0, 2000px, 0);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.fadeInUpBig {
  animación-name: fadeInUpBig;
}

@keyframes fadeOut {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
  }
}

.fadeOut {
  animación-name: fadeOut;
}

@keyframes fadeOutDown {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transformar: translate3d (0, 100%, 0);
  }
}

.fadeOutDown {
  animación-name: fadeOutDown;
}

@keyframes fadeOutDownBig {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transform: translate3d (0, 2000px, 0);
  }
}

.fadeOutDownBig {
  animación-name: fadeOutDownBig;
}

@keyframes fadeOutLeft {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transformar: translate3d (-100%, 0, 0);
  }
}

.fadeOutLeft {
  animación-name: fadeOutLeft;
}

@keyframes fadeOutLeftBig {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transform: translate3d (-2000px, 0, 0);
  }
}

.fadeOutLeftBig {
  animación-name: fadeOutLeftBig;
}

@keyframes fadeOutRight {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transformar: translate3d (100%, 0, 0);
  }
}

.fadeOutRight {
  animación-name: fadeOutRight;
}

@keyframes fadeOutRightBig {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transform: translate3d (2000px, 0, 0);
  }
}

.fadeOutRightBig {
  animación-name: fadeOutRightBig;
}

@keyframes fadeOutUp {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transformar: translate3d (0, -100%, 0);
  }
}

.fadeOutUp {
  animación-name: fadeOutUp;
}

@keyframes fadeOutUpBig {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transform: translate3d (0, -2000px, 0);
  }
}

.fadeOutUpBig {
  animación-name: fadeOutUpBig;
}

@keyframes flip {
  de {
    transformar: perspectiva (400 píxeles) ROTATE3D (0, 1, 0, -360deg);
    animación-timing-function: facilidad de salida;
  }

  40% {
    transformar: perspectiva (400 píxeles) translate3d (0, 0, 150 píxeles) ROTATE3D (0, 1, 0, -190deg);
    animación-timing-function: facilidad de salida;
  }

  50% {
    transformar: perspectiva (400 píxeles) translate3d (0, 0, 150 píxeles) ROTATE3D (0, 1, 0, -170deg);
    animación-timing-función: la facilidad en;
  }

  80% {
    transformar: perspectiva (400 píxeles) scale3d (0,95, 0,95, 0,95);
    animación-timing-función: la facilidad en;
  }

  a {
    transformar: perspectiva (400 píxeles);
    animación-timing-función: la facilidad en;
  }
}

.animated.flip {
  -webkit-cara trasera visibilidad: visible;
  cara trasera visibilidad: visible;
  animación-name: dar la vuelta;
}

@keyframes flipInX {
  de {
    transformar: perspectiva (400 píxeles) ROTATE3D (1, 0, 0, 90deg);
    animación-timing-función: la facilidad en;
    opacidad: 0;
  }

  40% {
    transformar: perspectiva (400 píxeles) ROTATE3D (1, 0, 0, -20deg);
    animación-timing-función: la facilidad en;
  }

  60% {
    transformar: perspectiva (400 píxeles) ROTATE3D (1, 0, 0, 10 grados);
    opacidad: 1;
  }

  80% {
    transformar: perspectiva (400 píxeles) ROTATE3D (1, 0, 0, -5deg);
  }

  a {
    transformar: perspectiva (400 píxeles);
  }
}

.flipInX {
  webkit-cara posterior visibilidad: visibles importante;
  la cara posterior visibilidad: visibles importante;
  animación-name: flipInX;
}

@keyframes flipInY {
  de {
    transformar: perspectiva (400 píxeles) ROTATE3D (0, 1, 0, 90deg);
    animación-timing-función: la facilidad en;
    opacidad: 0;
  }

  40% {
    transformar: perspectiva (400 píxeles) ROTATE3D (0, 1, 0, -20deg);
    animación-timing-función: la facilidad en;
  }

  60% {
    transformar: perspectiva (400 píxeles) ROTATE3D (0, 1, 0, 10 grados);
    opacidad: 1;
  }

  80% {
    transformar: perspectiva (400 píxeles) ROTATE3D (0, 1, 0, -5deg);
  }

  a {
    transformar: perspectiva (400 píxeles);
  }
}

.flipInY {
  webkit-cara posterior visibilidad: visibles importante;
  la cara posterior visibilidad: visibles importante;
  animación-name: flipInY;
}

@keyframes flipOutX {
  de {
    transformar: perspectiva (400 píxeles);
  }

  30% {
    transformar: perspectiva (400 píxeles) ROTATE3D (1, 0, 0, -20deg);
    opacidad: 1;
  }

  a {
    transformar: perspectiva (400 píxeles) ROTATE3D (1, 0, 0, 90deg);
    opacidad: 0;
  }
}

.flipOutX {
  animación-name: flipOutX;
  webkit-cara posterior visibilidad: visibles importante;
  la cara posterior visibilidad: visibles importante;
}

@keyframes flipOutY {
  de {
    transformar: perspectiva (400 píxeles);
  }

  30% {
    transformar: perspectiva (400 píxeles) ROTATE3D (0, 1, 0, -15deg);
    opacidad: 1;
  }

  a {
    transformar: perspectiva (400 píxeles) ROTATE3D (0, 1, 0, 90deg);
    opacidad: 0;
  }
}

.flipOutY {
  webkit-cara posterior visibilidad: visibles importante;
  la cara posterior visibilidad: visibles importante;
  animación-name: flipOutY;
}

@keyframes lightSpeedIn {
  de {
    transformar: translate3d (100%, 0, 0) skewX (-30deg);
    opacidad: 0;
  }

  60% {
    transformar: skewX (20deg);
    opacidad: 1;
  }

  80% {
    transformar: skewX (-5deg);
    opacidad: 1;
  }

  a {
    transform: none;
    opacidad: 1;
  }
}

.lightSpeedIn {
  animación-name: lightSpeedIn;
  animación-timing-function: facilidad de salida;
}

@keyframes lightSpeedOut {
  de {
    opacidad: 1;
  }

  a {
    transformar: translate3d (100%, 0, 0) skewX (30deg);
    opacidad: 0;
  }
}

.lightSpeedOut {
  animación-name: lightSpeedOut;
  animación-timing-función: la facilidad en;
}

@keyframes rotateIn {
  de {
    transformar origen: center;
    transformar: ROTATE3D (0, 0, 1, -200deg);
    opacidad: 0;
  }

  a {
    transformar origen: center;
    transform: none;
    opacidad: 1;
  }
}

.rotateIn {
  animación-name: rotateIn;
}

@keyframes rotateInDownLeft {
  de {
    transformar origen: parte inferior izquierda;
    transformar: ROTATE3D (0, 0, 1, -45deg);
    opacidad: 0;
  }

  a {
    transformar origen: parte inferior izquierda;
    transform: none;
    opacidad: 1;
  }
}

.rotateInDownLeft {
  animación-name: rotateInDownLeft;
}

@keyframes rotateInDownRight {
  de {
    transformar origen: abajo a la derecha;
    transformar: ROTATE3D (0, 0, 1, 45 grados);
    opacidad: 0;
  }

  a {
    transformar origen: abajo a la derecha;
    transform: none;
    opacidad: 1;
  }
}

.rotateInDownRight {
  animación-name: rotateInDownRight;
}

@keyframes rotateInUpLeft {
  de {
    transformar origen: parte inferior izquierda;
    transformar: ROTATE3D (0, 0, 1, 45 grados);
    opacidad: 0;
  }

  a {
    transformar origen: parte inferior izquierda;
    transform: none;
    opacidad: 1;
  }
}

.rotateInUpLeft {
  animación-name: rotateInUpLeft;
}

@keyframes rotateInUpRight {
  de {
    transformar origen: abajo a la derecha;
    transformar: ROTATE3D (0, 0, 1, -90deg);
    opacidad: 0;
  }

  a {
    transformar origen: abajo a la derecha;
    transform: none;
    opacidad: 1;
  }
}

.rotateInUpRight {
  animación-name: rotateInUpRight;
}

@keyframes rotateOut {
  de {
    transformar origen: center;
    opacidad: 1;
  }

  a {
    transformar origen: center;
    transformar: ROTATE3D (0, 0, 1, 200deg);
    opacidad: 0;
  }
}

.rotateOut {
  animación-name: rotateOut;
}

@keyframes rotateOutDownLeft {
  de {
    transformar origen: parte inferior izquierda;
    opacidad: 1;
  }

  a {
    transformar origen: parte inferior izquierda;
    transformar: ROTATE3D (0, 0, 1, 45 grados);
    opacidad: 0;
  }
}

.rotateOutDownLeft {
  animación-name: rotateOutDownLeft;
}

@keyframes rotateOutDownRight {
  de {
    transformar origen: abajo a la derecha;
    opacidad: 1;
  }

  a {
    transformar origen: abajo a la derecha;
    transformar: ROTATE3D (0, 0, 1, -45deg);
    opacidad: 0;
  }
}

.rotateOutDownRight {
  animación-name: rotateOutDownRight;
}

@keyframes rotateOutUpLeft {
  de {
    transformar origen: parte inferior izquierda;
    opacidad: 1;
  }

  a {
    transformar origen: parte inferior izquierda;
    transformar: ROTATE3D (0, 0, 1, -45deg);
    opacidad: 0;
  }
}

.rotateOutUpLeft {
  animación-name: rotateOutUpLeft;
}

@keyframes rotateOutUpRight {
  de {
    transformar origen: abajo a la derecha;
    opacidad: 1;
  }

  a {
    transformar origen: abajo a la derecha;
    transformar: ROTATE3D (0, 0, 1, 90deg);
    opacidad: 0;
  }
}

.rotateOutUpRight {
  animación-name: rotateOutUpRight;
}

@keyframes bisagra {
  0% {
    transformar origen: arriba a la izquierda;
    animación-timing-función: la facilidad en-hacia fuera;
  }

  20%, 60% {
    transformar: ROTATE3D (0, 0, 1, 80 grados);
    transformar origen: arriba a la izquierda;
    animación-timing-función: la facilidad en-hacia fuera;
  }

  40%, 80% {
    transformar: ROTATE3D (0, 0, 1, 60deg);
    transformar origen: arriba a la izquierda;
    animación-timing-función: la facilidad en-hacia fuera;
    opacidad: 1;
  }

  a {
    transform: translate3d (0, 700 px, 0);
    opacidad: 0;
  }
}

.hinge {
  animación-name: bisagra;
}

@keyframes jackinthebox {
  de {
    opacidad: 0;
    transformar: escala (0.1) rotate (30deg);
    transformar origen: parte inferior central;
  }

  50% {
    transformar: rotar (-10deg);
  }

  70% {
    transformar: rotate (3deg);
  }

  a {
    opacidad: 1;
    transformar: la escala (1);
  }
}

.jackInTheBox {
  animación-name: jackinthebox;
}

/ * Originalmente escrito por Nick Pettit - https://github.com/nickpettit/glide * /

@keyframes Rollin {
  de {
    opacidad: 0;
    transformar: translate3d (-100%, 0, 0) ROTATE3D (0, 0, 1, -120deg);
  }

  a {
    opacidad: 1;
    transform: none;
  }
}

.rollIn {
  animación-name: Rollin;
}

/ * Originalmente escrito por Nick Pettit - https://github.com/nickpettit/glide * /

@keyframes rollOut {
  de {
    opacidad: 1;
  }

  a {
    opacidad: 0;
    transformar: translate3d (100%, 0, 0) ROTATE3D (0, 0, 1, 120deg);
  }
}

.desenrollar {
  animación-name: rollOut;
}

@keyframes zoomIn {
  de {
    opacidad: 0;
    transform: scale3d (0.3, 0.3, 0.3);
  }

  50% {
    opacidad: 1;
  }
}

.acercarse {
  animación-name: zoomIn;
}

@keyframes zoomInDown {
  de {
    opacidad: 0;
    transformar: scale3d (0.1, 0.1, 0.1) translate3d (0, -1000px, 0);
    animación-timing-función: cúbico-Bezier (0.550, 0.055, 0.675, 0.190);
  }

  60% {
    opacidad: 1;
    transformar: scale3d (0.475, 0.475, 0.475) translate3d (0, 60 píxeles, 0);
    animación-timing-función: cúbico-Bezier (0,175, 0,885, 0,320, 1);
  }
}

.zoomInDown {
  animación-name: zoomInDown;
}

@keyframes zoomInLeft {
  de {
    opacidad: 0;
    transformar: scale3d (0.1, 0.1, 0.1) translate3d (-1000px, 0, 0);
    animación-timing-función: cúbico-Bezier (0.550, 0.055, 0.675, 0.190);
  }

  60% {
    opacidad: 1;
    transformar: scale3d (0.475, 0.475, 0.475) translate3d (10px, 0, 0);
    animación-timing-función: cúbico-Bezier (0,175, 0,885, 0,320, 1);
  }
}

.zoomInLeft {
  animación-name: zoomInLeft;
}

@keyframes zoomInRight {
  de {
    opacidad: 0;
    transformar: scale3d (0.1, 0.1, 0.1) translate3d (1000px, 0, 0);
    animación-timing-función: cúbico-Bezier (0.550, 0.055, 0.675, 0.190);
  }

  60% {
    opacidad: 1;
    transformar: scale3d (0.475, 0.475, 0.475) translate3d (-10px, 0, 0);
    animación-timing-función: cúbico-Bezier (0,175, 0,885, 0,320, 1);
  }
}

.zoomInRight {
  animación-name: zoomInRight;
}

@keyframes zoomInUp {
  de {
    opacidad: 0;
    transformar: scale3d (0.1, 0.1, 0.1) translate3d (0, 1000px, 0);
    animación-timing-función: cúbico-Bezier (0.550, 0.055, 0.675, 0.190);
  }

  60% {
    opacidad: 1;
    transformar: scale3d (0.475, 0.475, 0.475) translate3d (0, -60px, 0);
    animación-timing-función: cúbico-Bezier (0,175, 0,885, 0,320, 1);
  }
}

.zoomInUp {
  animación-name: zoomInUp;
}

@keyframes zoomOut {
  de {
    opacidad: 1;
  }

  50% {
    opacidad: 0;
    transform: scale3d (0.3, 0.3, 0.3);
  }

  a {
    opacidad: 0;
  }
}

.disminuir el zoom {
  animación-name: zoomOut;
}

@keyframes zoomOutDown {
  40% {
    opacidad: 1;
    transformar: scale3d (0.475, 0.475, 0.475) translate3d (0, -60px, 0);
    animación-timing-función: cúbico-Bezier (0.550, 0.055, 0.675, 0.190);
  }

  a {
    opacidad: 0;
    transformar: scale3d (0.1, 0.1, 0.1) translate3d (0, 2000px, 0);
    transformar origen: parte inferior central;
    animación-timing-función: cúbico-Bezier (0,175, 0,885, 0,320, 1);
  }
}

.zoomOutDown {
  animación-name: zoomOutDown;
}

@keyframes zoomOutLeft {
  40% {
    opacidad: 1;
    transformar: scale3d (0.475, 0.475, 0.475) translate3d (42px, 0, 0);
  }

  a {
    opacidad: 0;
    transform: escala (0.1) translate3d (-2000px, 0, 0);
    transformar origen: izquierdo y central;
  }
}

.zoomOutLeft {
  animación-name: zoomOutLeft;
}

@keyframes zoomOutRight {
  40% {
    opacidad: 1;
    transformar: scale3d (0.475, 0.475, 0.475) translate3d (-42px, 0, 0);
  }

  a {
    opacidad: 0;
    transform: escala (0.1) translate3d (2000px, 0, 0);
    transformar origen: derecho y central;
  }
}

.zoomOutRight {
  animación-name: zoomOutRight;
}

@keyframes zoomOutUp {
  40% {
    opacidad: 1;
    transformar: scale3d (0.475, 0.475, 0.475) translate3d (0, 60 píxeles, 0);
    animación-timing-función: cúbico-Bezier (0.550, 0.055, 0.675, 0.190);
  }

  a {
    opacidad: 0;
    transformar: scale3d (0.1, 0.1, 0.1) translate3d (0, -2000px, 0);
    transformar origen: parte inferior central;
    animación-timing-función: cúbico-Bezier (0,175, 0,885, 0,320, 1);
  }
}

.zoomOutUp {
  animación-name: zoomOutUp;
}

@keyframes slideInDown {
  de {
    transformar: translate3d (0, -100%, 0);
    visibilidad: visible;
  }

  a {
    transform: translate3d (0, 0, 0);
  }
}

.slideInDown {
  animación-name: slideInDown;
}

@keyframes slideInLeft {
  de {
    transformar: translate3d (-100%, 0, 0);
    visibilidad: visible;
  }

  a {
    transform: translate3d (0, 0, 0);
  }
}

.slideInLeft {
  animación-name: slideInLeft;
}

@keyframes slideInRight {
  de {
    transformar: translate3d (100%, 0, 0);
    visibilidad: visible;
  }

  a {
    transform: translate3d (0, 0, 0);
  }
}

.slideInRight {
  animación-name: slideInRight;
}

@keyframes slideInUp {
  de {
    transformar: translate3d (0, 100%, 0);
    visibilidad: visible;
  }

  a {
    transform: translate3d (0, 0, 0);
  }
}

.slideInUp {
  animación-name: slideInUp;
}

@keyframes slideOutDown {
  de {
    transform: translate3d (0, 0, 0);
  }

  a {
    visibility: hidden;
    transformar: translate3d (0, 100%, 0);
  }
}

.slideOutDown {
  animación-name: slideOutDown;
}

@keyframes slideOutLeft {
  de {
    transform: translate3d (0, 0, 0);
  }

  a {
    visibility: hidden;
    transformar: translate3d (-100%, 0, 0);
  }
}

.slideOutLeft {
  animación-name: slideOutLeft;
}

@keyframes slideOutRight {
  de {
    transform: translate3d (0, 0, 0);
  }

  a {
    visibility: hidden;
    transformar: translate3d (100%, 0, 0);
  }
}

.slideOutRight {
  animación-name: slideOutRight;
}

@keyframes slideOutUp {
  de {
    transform: translate3d (0, 0, 0);
  }

  a {
    visibility: hidden;
    transformar: translate3d (0, -100%, 0);
  }
}

.slideOutUp {
  animación-name: slideOutUp;
}
`
;
