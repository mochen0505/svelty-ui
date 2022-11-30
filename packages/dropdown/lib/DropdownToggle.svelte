<script>
  import {getContext} from 'svelte';
  import classnames from '@svelty/classnames';

  let className = '';
  export { className as class };

  const context = getContext('dropdownContext');

  let classes;

  $: classes = classnames(
    className,
    'dropdown-toggle',
    {
      'dropdown-toggle-disabled': $context.disabled,
    }
  );

  function handleClick(e) {
    if ($context.disabled) {
      e.preventDefault();
      return;
    }
    if ($context.trigger === 'click') {
      $context.toggle();
    }
  }
</script>

<style>
  .dropdown-toggle {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
  }

  .dropdown-toggle-disabled {
    cursor: not-allowed;
  }

  .dropdown-icon {
    margin-left: 4px;
  }

  .animation {
    transform: rotate(180deg);
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }
</style>

<div
  class={classes}
  {...$$restProps}
  use:$context.popperRef
  on:click={handleClick}
>
  <slot />
  <i class={$context.isOpen ? 'dropdown-icon animation iconfont' : 'dropdown-icon iconfont'}>&#xe74d;</i>
</div>
