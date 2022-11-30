<script>
  import {onDestroy, onMount} from 'svelte';
  import classnames from '@svelty/classnames';
  import {createPopper} from '@popperjs/core';
  import Portal from './Portal.svelte';

  let className = '';
  export {className as class};
  export let target = '';
  export let placement = 'bottom';
  export let zIndex;
  export let offset = [0, 0];
  export let padding = 0;
  let hover = false;
  let hover2 = false;
  let popperInstance;
  let targetEl;
  let tooltipEl;
  let classes;

  $: classes = classnames(
    className,
    'tooltip',
  );

  $: {
    if ((hover || hover2) && tooltipEl) {
      popperInstance = createPopper(targetEl, tooltipEl, {
        placement,
        modifiers: [
          {
            name: 'offset',
            options: {offset},
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true,
              padding: padding,
            },
          },
        ],
      });
    } else if (popperInstance) {
      popperInstance.destroy();
      popperInstance = undefined;
    }
  }

  $: if (target) {
    removeListeners();
    addListeners();
  }

  $: if (tooltipEl) {
    removeListeners2();
    addListeners2();
  }

  onMount(() => {
    addListeners();
    addListeners2();
  });

  onDestroy(() => {
    removeListeners();
    removeListeners2();
  });

  function addListeners() {

    if (target == null || target.length === 0) {
      targetEl = null;
      return;
    }
    try {
      if (target instanceof HTMLElement) {
        targetEl = target;
      }
    } catch (e) {
      // fails on SSR
    }

    if (targetEl == null) {
      try {
        targetEl = document.querySelector(`#${target}`);
      } catch (e) {
        // fails on SSR
      }
    }

    if (targetEl) {
      targetEl.addEventListener('mouseover', open);
      targetEl.addEventListener('mouseleave', close);
      targetEl.addEventListener('focus', open);
      targetEl.addEventListener('blur', close);
    }
  }

  function removeListeners() {
    if (targetEl) {
      targetEl.removeEventListener('mouseover', open);
      targetEl.removeEventListener('mouseleave', close);
      targetEl.removeEventListener('focus', open);
      targetEl.removeEventListener('blur', close);
    }
  }

  function addListeners2() {
    if (tooltipEl) {
      tooltipEl.addEventListener('mouseover', open2);
      tooltipEl.addEventListener('mouseleave', close2);
      tooltipEl.addEventListener('focus', open2);
      tooltipEl.addEventListener('blur', close2);
    }
  }

  function removeListeners2() {
    if (tooltipEl) {
      tooltipEl.removeEventListener('mouseover', open2);
      tooltipEl.removeEventListener('mouseleave', close2);
      tooltipEl.removeEventListener('focus', open2);
      tooltipEl.removeEventListener('blur', close2);
    }
  }

  function open() {
    hover = true;
  }

  function open2() {
    hover2 = true;
  }

  function close() {
    setTimeout(() => {
      hover = false;
    }, 0)
  }

  function close2() {
    hover2 = false;
  }
</script>

<style>
  .content {
    border-radius: 8px;
    padding: 16px 20px 16px 20px;
    line-height: 20px;
    max-width: 450px;
    background: #fff;
    color: #777b83;
    font-size: 14px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  }

  .arrow,
  .arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
  }

  .arrow::before {
    content: '';
    transform: rotate(45deg);
    background: #fff;
  }

  .tooltip[data-popper-placement^='top'] > .arrow {
    bottom: 4px;
  }

  .tooltip[data-popper-placement^='bottom'] > .arrow {
    top: 4px;
  }

  .tooltip[data-popper-placement^='left'] > .arrow {
    right: 4px;
  }

  .tooltip[data-popper-placement^='right'] > .arrow {
    left: 4px;
  }

  .tooltip[data-popper-placement^='top'] {
    position: absolute;
    margin-top: 10px;
    padding-bottom: 8px;
  }

  .tooltip[data-popper-placement^='bottom'] {
    position: absolute;
    margin-top: 10px;
    padding-top: 8px;
  }

  .tooltip[data-popper-placement^='left'] {
    position: absolute;
    margin-top: 10px;
    padding-right: 8px;
  }

  .tooltip[data-popper-placement^='right'] {
    position: absolute;
    margin-top: 10px;
    padding-left: 8px;
  }
</style>

{#if hover || hover2}
  <svelte:component this={Portal} zIndex={zIndex}>
    <div
      class={classes}
      bind:this={tooltipEl}
      role='tooltip'
      data-popper-placement={placement}
      style='z-index: {zIndex}'
      {...$$restProps}
    >
      <div class='arrow' data-popper-arrow />
      <div class='content'>
        <slot />
      </div>
    </div>
  </svelte:component>
{/if}
