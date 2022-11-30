<script>
  import classnames from '@svelty/classnames';

  let className = '';
  export { className as class };

  let classes;

  $: classes = classnames(
    className,
    'breadcrumb-item'
  );
</script>

<style>
  .breadcrumb-item {
    display: flex;
  }

  .breadcrumb-content {
    cursor: pointer;
  }

  .breadcrumb-separator {
    margin: 0 8px;
  }

  .breadcrumb-item:last-child .breadcrumb-separator {
    display: none;
  }
</style>

<li class={classes} {...$$restProps}>
  <span class='breadcrumb-content' on:click on:keyup>
    <slot />
  </span>
  <span class='breadcrumb-separator'>
    >
  </span>
</li>

