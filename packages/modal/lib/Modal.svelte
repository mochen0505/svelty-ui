<script lang='ts'>
  import {tick, onMount, onDestroy, createEventDispatcher} from 'svelte';
  import {fade, scale} from 'svelte/transition';
  import {quintOut} from 'svelte/easing';
  import classnames from '@svelty/classnames';
  import Portal from './Portal.svelte';

  let className = '';
  export {className as class};
  export let visible = false;
  export let width = 620;
  export let closeByEsc = false;
  export let showCloseIcon = true;
  export let container = null;
  export let beforeClose = () => true;

  const dispatch = createEventDispatcher();

  let mounted = false;
  let elm;
  let classes;

  $: classes = classnames(
    className,
    'modal'
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
      visible = false;
    }
  }

  async function onVisible() {
    await tick();
    if (!elm) return;
    let inputs = elm.querySelectorAll('input:not([type="hidden"])');
    let length = inputs.length;
    let i = 0;
    for (; i < length; i++) {
      if (inputs[i].getAttribute('autofocus')) {
        break;
      }
    }
    i < length ? inputs[i].focus() : length > 0 ? inputs[0].focus() : elm.focus();
    dispatch('open');
  }

  function onKey(e) {
    const esc = 'Escape';
    if (e.keyCode === 27 || e.key === esc || e.code === esc) {
      closeByEsc && close(esc);
    }
  }

  function onPopstate() {
    visible = false;
  }

  function handleModalClose() {
    close(null);
  }

  function enableScroll(enable) {
    if (enable) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
</script>

<style>
  .modal-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal {
    position: relative;
    max-height: calc(100vh - 3em);
    border-radius: 12px;
    background: #fff;
  }

  .modal:focus {
    outline: none;
  }

  .modal::-moz-focus-inner {
    border: 0;
  }

  .modal:-moz-focusring {
    outline: none;
  }

  .close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 20px;
    color: #9fa3ab;
    cursor: pointer;
  }

  .modal-content {
    padding: 24px
  }
</style>

<svelte:window on:keydown={onKey} on:popstate={onPopstate} />

{#if visible}
  <svelte:component this={Portal} {container}>
    <div
      transition:fade={{ duration: 100 }}
      class='modal-mask'
    >
      <div
        in:scale={{ duration: 100, easing: quintOut }}
        class={classes}
        style={`width: ${width}px`}
        tabindex='-1'
        bind:this={elm}
        {...$$restProps}
      >
        {#if showCloseIcon}
          <i class="close-icon iconfont" on:click={handleModalClose} on:keyup>&#xe747;</i>
        {/if}
        <div class='modal-content'>
          <slot />
        </div>
      </div>
    </div>
  </svelte:component>
{/if}
