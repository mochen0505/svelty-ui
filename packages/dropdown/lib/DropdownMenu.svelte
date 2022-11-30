<script>
  import {getContext} from 'svelte';
  import classnames from '@svelty/classnames';

  let className = '';
  export { className as class };

  const context = getContext('dropdownContext');

  let popperOptions;
  let classes;

  $: popperOptions = {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: $context.offset || [0, 8]
        },
      },
      {
        name: 'preventOverflow',
        options: {
          altAxis: true,
        },
      },
    ],
    placement: $context.direction || 'bottom-start',
  };

  $: classes = classnames(
    className,
    'dropdown-menu',
    {
      'dropdown-menu-show': $context.isOpen
    }
  );
</script>

<style>
  .dropdown-menu {
    display: none;
    border-radius: 12px;
    padding: 8px 12px;
    background: #fff;
  }
  .dropdown-menu-show {
    display: block;
  }
</style>

<div
  class={classes}
  {...$$restProps}
  use:$context.popperContent={popperOptions}
>
  <slot />
</div>
