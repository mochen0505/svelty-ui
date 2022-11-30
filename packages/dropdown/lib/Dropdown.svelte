<script>
  import {getContext, setContext, onDestroy} from 'svelte';
  import {writable} from 'svelte/store';
  import classnames from '@svelty/classnames';
  import {createPopperActions} from './popper';

  let className = '';
  export { className as class };
  /**
   * Menu placement
   * @type {"bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight"}
   */
  export let placement = 'bottomLeft';
  /**
   * Trigger type
   * @type {"hover" | "click"}
   */
  export let trigger = 'hover';
  export let offset = [0, 0];
  export let isOpen = false;
  export let disabled = false;

  const navContext = getContext('navContent');
  const [popperRef, popperContent] = createPopperActions();
  const popperPlacement = {
    bottom: 'bottom',
    bottomLeft: 'bottom-start',
    bottomRight: 'bottom-end',
    top: 'top',
    topLeft: 'top-start',
    topRight: 'top-end',
  }

  let component;
  let handleToggle;
  let context = writable({});
  let classes;
  let navHeight;

  setContext('dropdownContext', context);

  $: classes = classnames(
    className,
    'dropdown',
    {
      'nav-item': navContext && navContext.height,
    }
  );

  $: navHeight = navContext && navContext.height;

  $: {
    if (typeof document !== 'undefined') {
      if (isOpen) {
        ['click', 'touchstart', 'keyup'].forEach((event) =>
          document.addEventListener(event, handleDocumentClick, true),
        );
      } else {
        ['click', 'touchstart', 'keyup'].forEach((event) =>
          document.removeEventListener(event, handleDocumentClick, true),
        );
      }
    }
  }

  $: {
    context.update(() => {
      return {
        trigger,
        toggle: handleToggle,
        isOpen,
        placement: popperPlacement[placement],
        offset,
        disabled,
        popperRef: popperRef,
        popperContent: popperContent,
      };
    });
  }

  $: handleToggle = (param) => getToggleStatus(param);

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      ['click', 'touchstart', 'keyup'].forEach((event) =>
        document.removeEventListener(event, handleDocumentClick, true),
      );
    }
  });

  function getToggleStatus(param) {
    if (param === 1) {
      return isOpen = true;
    }
    if (param === 2) {
      return isOpen = false;
    }
    return isOpen = !isOpen;
  }

  function handleDocumentClick(e) {
    if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== 9))) return;

    if (
      component.contains(e.target) &&
      component !== e.target &&
      (e.type !== 'keyup' || e.which === 9)
    ) {
      return;
    }
    handleToggle();
  }

  function handleHover(e, param) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (trigger === 'hover') {
      handleToggle(param);
    }
  }

</script>

<style>
  .dropdown {
    display: inline-block;
  }
  .nav-item {
    margin-right: 36px;
    cursor: pointer;
  }
</style>

<div
  class={classes}
  {...$$restProps}
  style='height: {navHeight}px'
  bind:this={component}
  on:mouseover={(e) => handleHover(e, 1)}
  on:mouseleave={(e) => handleHover(e, 2)}
  on:focus
>
  <slot />
</div>
