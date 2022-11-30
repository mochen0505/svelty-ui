<script lang="ts">
  import {tick, onMount, onDestroy, createEventDispatcher} from 'svelte';
  import {fade, fly} from 'svelte/transition';
  import classnames from '@svelty/classnames';
  import Portal from './Portal.svelte';

  let className = '';
  export {className as class};
  export let visible = false;
  export let height = 'auto';
  export let container = document.body;
  export let maskClosable = true;
  export let title = false;
  export let autoFocus = false;
  export let fullscreen = false;
  export let beforeClose = () => true;

  const dispatch = createEventDispatcher();

  let mounted = false;
  let elm;
  let startY = 0;
  let startScrollTop = 0;
  let classes;

  $: classes = classnames(
    className,
    'popup-content-wrap'
  );

  $: if (visible) {
    mounted && enableScroll(false);
    onVisible();
  } else {
    mounted && enableScroll(true);
  }

  onMount(async () => {
    await tick();
    mounted = true;
  });
  onDestroy(() => {
    mounted && enableScroll(true);
  });

  function close(params) {
    if (beforeClose()) {
      dispatch('close', params);
    }
    visible = false;
  }

  async function onVisible() {
    await tick();
    if (!elm) {
      return;
    }
    if (autoFocus) {
      doAutoFocus();
    }
    dispatch('open');
  }

  function onPopstate() {
    visible = false;
  }

  function enableScroll(enable) {
    if (enable) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  function doAutoFocus() {
    let inputs = elm.querySelectorAll('input:not([type="hidden"])');
    let length = inputs.length;
    let i = 0;
    for (; i < length; i++) {
      if (inputs[i].getAttribute('autofocus')) {
        break;
      }
    }
    i < length ? inputs[i].focus() : length > 0 ? inputs[0].focus() : elm.focus();
  }

  function handleBackdropClick() {
    if (maskClosable) {
      close(null);
    }
  }

  // 手势触控
  function handleBodyTouch(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  function handleTouchStart(e) {
    startScrollTop = elm.scrollTop;
    startY = handleBodyTouch(e).clientY;
  }

  function calcMoveY(e) {
    return startY - handleBodyTouch(e).clientY;
  }

  function handleTouchEnd(e) {
    if (startScrollTop > 10) {
      return;
    }
    if (calcMoveY(e) < -70) {
      close(null);
    }
  }
</script>

<style>
  .drawer-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.3s ease-in-out;
  }

  .popup-content-wrap {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    transition: all 0.3s ease-in-out;
    background: #fff;
  }
  .popup-content-wrap[fullscreen='false'] {
    border-radius: 16px 16px 0px 0px;
  }

  .popup-content {
    padding: 20px;
    width: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 50px;
    color: #010612;
    box-shadow: 0px 1px 0px 0px rgba(219, 223, 231, 0.5);
  }
  .navigation-title {
    font-size: 16px;
    font-weight: bold;
  }
  .navigation-left {
    font-size: 14px;
    transform: rotate(180deg);
  }
  .header {
    padding: 12px 20px 12px;
    font-size: 16px;
    color: #010612;
    font-weight: 500;
  }
  .fix-title-top-gap {
    padding-top: 0;
  }
  .safe-area {
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
  }
</style>

<svelte:window on:popstate={onPopstate} />

{#if visible}
  <svelte:component this={Portal} {container}>
    <div transition:fade={{duration: 300}} class="drawer-mask" on:click={handleBackdropClick} on:keyup {visible} />
    <div
      tabindex="-1"
      {fullscreen}
      class={classes}
      transition:fly={{duration: 300, x: 0, y: elm.clientHeight, opacity: 1}}
      {...$$restProps}
      on:touchstart={handleTouchStart}
      on:touchend={handleTouchEnd}
    >
      {#if title}
        {#if fullscreen}
          <div class="navigation">
            <span />
            <span class="navigation-title">{title || ''}</span>
            <i class="navigation-left iconfont" on:click={close} on:keyup>&#xe747;</i>
          </div>
        {:else}
          <div class='header'>
            <span>{title}</span>
          </div>
        {/if}
      {/if}
      <div bind:this={elm} class="popup-content" class:fix-title-top-gap={!fullscreen && title} style="height: {fullscreen ? (title ? 'calc(100vh - 50px)' : '100vh') : height};">
        <slot />
      </div>
      <div class="safe-area" />
    </div>
  </svelte:component>
{/if}
