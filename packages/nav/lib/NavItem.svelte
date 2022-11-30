<script>
  import {getContext} from 'svelte';
  import classnames from '@svelty/classnames';

  let className = '';
  export { className as class };

  const {height} = getContext('navContent');

  let classes;

  $: classes = classnames(
    className, 'nav-item',
  );
</script>

<style>
  .nav-item {
    display: flex;
    align-items: center;
    margin-right: 36px;
    cursor: pointer;
  }
</style>

<div class={classes} {...$$restProps} style='height: {height}px' >
  <slot />
</div>
