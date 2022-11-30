<script lang='ts'>
  import classnames from '@svelty/classnames';
  import {Loading} from '@svelty/loading';

  let className = '';
  export {className as class};

  /**
   * Button type
   * @type {"primary" | "default" | "text"}
   */
  export let type = 'primary';
  /**
   * Button size
   * @type {"large" | "medium" | "small"}
   */
  export let size = 'medium';

  export let loading = false;
  export let disabled = false;
  export let block = false;

  let classes;

  $: classes = classnames(
    className,
    type,
    size,
    {
      loading: loading && !disabled,
      disabled,
      block,
    },
  );

</script>

<style>
  button {
    position: relative;
    border: 1px solid;
    text-align: center;
    outline: none;
    cursor: pointer;
    transition: 0.2s;
  }

  .primary {
    border-color: var(--blue-main);
    background: var(--blue-main);
    color: #fff;
    fill: #fff;
  }

  .primary:hover:not([disabled]) {
    border-color: var(--blue-main-hover);
    background: var(--blue-main-hover);
    color: #fff;
  }

  .primary:active:not([disabled]) {
    border-color: var(--blue-main-active);
    background: var(--blue-main-active);
    color: #fff;
  }

  .default {
    border-color: #d9d9d9;
    background: #fff;
    color: #010612;
    fill: #010612;
  }

  .default:hover:not([disabled]) {
    border-color: var(--blue-main-hover);
    background: #fff;
    color: var(--blue-main-hover);
  }

  .default:active:not([disabled]) {
    border-color: var(--blue-main-active);
    background: #fff;
    color: var(--blue-main-active);
  }

  .text {
    border: none;
    background: transparent;
    color: #010612;
    fill: #010612;
  }

  .text:hover:not([disabled]) {
    color: var(--blue-main-hover);
  }

  .text:active:not([disabled]) {
    color: var(--blue-main-active);
  }

  .large {
    border-radius: 8px;
    padding: 0 24px;
    height: 48px;
    font-size: 16px;
  }

  .medium {
    border-radius: 8px;
    padding: 0 16px;
    height: 40px;
    font-size: 14px;
  }

  .small {
    border-radius: 4px;
    padding: 0 12px;
    height: 32px;
    font-size: 14px;
  }

  .large > :global(.loading-wrap) {
    width: 16px;
    height: 16px;
  }

  .medium > :global(.loading-wrap),
  .small > :global(.loading-wrap) {
    width: 14px;
    height: 14px;
  }

  .loading {
    opacity: 0.65;
    cursor: default;
  }

  .disabled {
    border-color: #d9d9d9;
    background: rgba(0, 0, 0, 0.04);
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }

  .block {
    width: 100%;
  }

</style>

<button
  {disabled}
  class={classes}
  {...$$restProps}
  on:click
>
  {#if loading}
    <Loading />
  {/if}
  <span>
    <slot />
  </span>
</button>
