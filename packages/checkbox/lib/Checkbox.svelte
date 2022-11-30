<script>
  import classnames from '@svelty/classnames';

  let className = '';
  export {className as class};
  export let checked = false;

  let classes;

  $: classes = classnames(
    className,
    'checkbox-wrap'
  );
</script>

<style>
  .checkbox-wrap {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0;
    width: 100%;
    cursor: pointer;
    user-select: none;
  }

  input {
    cursor: inherit;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
  }

  .checkbox {
    font-size: 16px;
    cursor: pointer;
  }

  .checkbox-checked {
    color: var(--blue-main);
  }

  .checkbox-unchecked {
    color: #9fa3ab;
  }

  .label-text {
    margin-left: 8px;
  }
</style>

<label class={classes}>
  <input type='checkbox' bind:checked />
  {#if checked}
    <i class="checkbox checkbox-checked iconfont">&#xe7d3;</i>
  {:else}
    <i class="checkbox checkbox-unchecked iconfont">&#xe7d4;</i>
  {/if}
  <div class='label-text'>
    <slot />
  </div>
</label>
