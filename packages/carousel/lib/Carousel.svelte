<script>
  import Siema from 'siema';
  import {onMount, createEventDispatcher} from 'svelte';
  import classnames from '@svelty/classnames';

  let className = '';
  export {className as class};
  export let perPage = 3;
  export let perMove = 3;
  export let loop = true;
  export let autoplay = 0;
  export let duration = 200;
  export let easing = 'ease-out';
  export let startIndex = 0;
  export let draggable = true;
  export let multipleDrag = true;
  export let controls = true;
  export let dots = false;
  export let threshold = 20;
  export let rtl = false;

  const dispatch = createEventDispatcher();

  let currentIndex = startIndex;
  let siema;
  let controller;
  let timer;
  let classes;
  let isHover = false;
  let carouselElement;

  $: classes = classnames(
    className,
    'carousel'
  );
  $: setTimer(autoplay, isHover);
  $: clearTimer(isHover);
  $: pips = controller ? controller.innerElements : [];
  $: currentPerPage = controller ? controller.perPage : perPage;
  $: totalDots = controller ? Math.ceil(controller.innerElements.length / currentPerPage) : [];

  onMount(() => {
    controller = new Siema({
      selector: siema,
      perPage: typeof perPage === 'object' ? perPage : Number(perPage),
      loop,
      duration,
      easing,
      startIndex,
      draggable,
      multipleDrag,
      threshold,
      rtl,
      onChange: handleChange,
    });

    carouselElement.addEventListener('mouseover', handleMouseOver);
    carouselElement.addEventListener('mouseleave', handleMouseLeave);

    return function() {
      carouselElement.removeEventListener('mouseover', handleMouseOver);
      carouselElement.removeEventListener('mouseleave', handleMouseLeave);
      clearTimer(true);
    };
  });

  function setTimer(autoplay, isHover) {
    if (autoplay && !isHover) {
      timer = setInterval(right, autoplay);
    }
  }

  function clearTimer(isHover) {
    if (isHover) {
      autoplay && clearInterval(timer);
      controller.destroy();
    }
  }

  function handleMouseOver() {
    isHover = true;
  }

  function handleMouseLeave() {
    isHover = false;
  }

  export function isDotActive(currentIndex, dotIndex) {
    if (currentIndex < 0) currentIndex = pips.length + currentIndex;
    return currentIndex >= dotIndex * currentPerPage && currentIndex < (dotIndex * currentPerPage) + currentPerPage;
  }

  export function left() {
    controller.prev(perMove);
  }

  export function right() {
    controller.next(perMove);
  }

  export function go(index) {
    controller.goTo(index);
  }

  export function pause() {
    clearInterval(timer);
  }

  export function resume() {
    if (autoplay) {
      timer = setInterval(right, autoplay);
    }
  }

  function handleChange(event) {
    currentIndex = controller.currentSlide;
    dispatch('change', {
      currentSlide: controller.currentSlide,
      slideCount: controller.innerElements.length,
    });
  }

  function resetInterval(node, condition) {
    function handleReset(event) {
      pause();
      resume();
    }

    if (condition) {
      node.addEventListener('click', handleReset);
    }

    return {
      destroy() {
        node.removeEventListener('click', handleReset);
      },
    };
  }
</script>

<style>
  .carousel {
    position: relative;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 48px;
    height: 48px;
    top: 50%;
    z-index: 50;
    margin-top: -24px;
    border: none;
    background-color: transparent;
  }

  button:focus {
    outline: none;
  }

  .left {
    left: -48px;
  }

  .right {
    right: -48px;
  }

  .dots {
    display: flex;
    justify-content: center;
    margin: 20px 0 0 0;
    padding: 0;
    width: 100%;
    list-style-type: none;
  }

  .dots .dot {
    margin: 0 4px;
    border-radius: 100px 0 100px 0;
    width: 12px;
    height: 4px;
    background-color: rgba(219, 223, 231, 0.5);
  }

  .dots .dot-active {
    background-color: var(--blue-main);
  }
</style>

<div class={classes}>
  <div bind:this={carouselElement}>
    <div class='slides' bind:this={siema}>
      <slot></slot>
    </div>
  </div>
  {#if controls}
    <button class='left' on:click={left} use:resetInterval={autoplay} aria-label='left'>
      <slot name='left-control'></slot>
    </button>
    <button class='right' on:click={right} use:resetInterval={autoplay} aria-label='right'>
      <slot name='right-control'></slot>
    </button>
  {/if}
</div>
{#if dots}
  <ul class='dots'>
    {#each {length: totalDots} as _, i}
      <li on:click={() => go(i*currentPerPage)} on:keyup class={isDotActive(currentIndex, i) ? "dot dot-active" : "dot"}></li>
    {/each}
  </ul>
{/if}
