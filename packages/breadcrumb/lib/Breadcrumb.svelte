<script>
  import classnames from '@svelty/classnames';

  let className = '';
  export { className as class };

  let classes;

  $: classes = classnames(
    className,
    'breadcrumb'
  );
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .breadcrumb {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #a6a6a6;
  }

  .breadcrumb-item-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<nav class={classes} {...$$restProps}>
  <ol class='breadcrumb-item-wrap'>
    <slot />
  </ol>
</nav>
