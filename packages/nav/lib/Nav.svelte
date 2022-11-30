<script>
  import {setContext} from 'svelte';
  import classnames from '@svelty/classnames';

  let className = '';
  export { className as class };
  export let height = 80;

  let classes;

  $: classes = classnames(
    className,
    'nav',
  );

  setContext('navContent', {
    height,
  });
</script>

<style>
  * {
    box-sizing: border-box;
  }
  .nav {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
  }
</style>

<nav class={classes} {...$$restProps}>
  <slot />
</nav>

