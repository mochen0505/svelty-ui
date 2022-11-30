<script>
  import {getContext} from 'svelte';
  import classnames from '@svelty/classnames';

  let className = '';
  export {className as class};
  /**
   * DropdownItem type
   * @type {"disabled" | "divider" | "default"}
   */
  export let type = 'default';

  const context = getContext('dropdownContext');

  let classes;

  $: classes = classnames(
    className,
    'dropdown-item',
    {
      [`dropdown-item-${type}`]: type,
    },
  );

  function handleItemClick(e) {
    if (type === 'disabled' || type === 'divider') {
      e.preventDefault();
      return;
    }
    $context.toggle();
  }
</script>

<style>
  .dropdown-item {
    margin-bottom: 4px;
    border-radius: 8px;
    padding: 8px;
  }
  .dropdown-item:last-child {
    margin-bottom: 0;
  }
  .dropdown-item-default {
    cursor: pointer;
  }
  .dropdown-item-default:hover {
    color: #003fe6;
  }
  .dropdown-item-disabled {
    cursor: not-allowed;
  }
  .dropdown-item-divider {
    padding: 0;
    border-bottom: 1px solid #e9ecef;
  }
</style>

<div class={classes} {...$$restProps} on:click on:click={handleItemClick}>
  <slot />
</div>
