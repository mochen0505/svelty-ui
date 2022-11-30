<script>
  import {getContext, onMount} from 'svelte';
  import classnames from '@svelty/classnames';

  let className = '';
  export {className as class};
  export let value = undefined;
  export let label = undefined;

  const isOptions = getContext('isOptions');
  const {size, activeVal, isMobileOrApp, isAllowClear, isShowClearOnHover, setActiveVal} = getContext('selectContent');

  let classes;

  $: classes = classnames(
    className,
    'select-option',
    {
      [`${size}`]: !$isMobileOrApp,
      'select-option-active': $activeVal === value,
    },
  );

  onMount(() => {
    if ($activeVal && $activeVal === value) {
      setActiveVal(value);
    }
  });

  function handleClear() {
    setActiveVal(undefined);
  }

</script>

<style>
  .large {
    padding: 0 20px;
  }

  .medium {
    padding: 0 16px;
  }

  .select-option {
    height: 38px;
    line-height: 38px;
    color: #303236;
    cursor: pointer;
  }

  .select-option:hover {
    background: #f8f8f8;
  }

  .select-option:active {
    color: var(--blue-main);
  }

  .select-option-active {
    color: var(--blue-main);
  }

  .select-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cross {
    margin-right: 18px;
    color: #9fa3ab;
    cursor: pointer;
    transition: transform 0.2s;
  }

</style>

{#if isOptions}
  <li class={classes}>
    <div on:click={() => setActiveVal(value)} on:keyup>
      <slot>
        {label}
      </slot>
    </div>
  </li>
{:else if $activeVal === value}
  <div class='select-wrap'>
    <slot name='custom-display'>
      <slot>
        {label}
      </slot>
    </slot>
    {#if $isAllowClear && $isShowClearOnHover}
      <i class="cross iconfont" on:click|stopPropagation={handleClear} on:keyup>&#xe6e1;</i>
    {/if}
  </div>
{/if}
