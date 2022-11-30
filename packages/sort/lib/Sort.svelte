<script>
  import {createEventDispatcher} from 'svelte';
  import classnames from '@svelty/classnames';

  let className = '';
  export {className as class};
  /**
   * Initial Active mode
   * @type {"desc" | "asc" | "default"}
   */
  export let initialActiveMode = 'default';

  const dispatch = createEventDispatcher();

  let classes;
  let currentActiveMode = initialActiveMode;

  $: classes = classnames(
    className,
    'sort-wrap',
  );

  function getClasses(activeMode) {
    switch (activeMode) {
      case 'default':
        return ['arrow iconfont', 'arrow iconfont'];
      case 'desc':
        return ['arrow iconfont', 'arrow arrow-active iconfont'];
      case 'asc':
        return ['arrow arrow-active iconfont', 'arrow iconfont'];
      default:
        return ['arrow iconfont', 'arrow iconfont'];
    }
  }

  function changeCurrentMode(initialValue) {
    switch (initialValue) {
      case 'default':
        currentActiveMode = 'desc';
        dispatch('change', 'desc');
        return;
      case 'desc':
        currentActiveMode = 'asc';
        dispatch('change', 'asc');
        return;
      case 'asc':
        currentActiveMode = 'default';
        dispatch('change', 'default');
        return;
      default:
        currentActiveMode = 'desc';
        dispatch('change', 'desc');
        return;
    }
  }

</script>

<style>
  .sort-wrap {
    display: inline-flex;
    flex-direction: column;
    cursor: pointer;
  }

  .arrow {
    line-height: 8px;
    font-size: 12px;
    color: #c5c8ce;
  }

  .arrow-active {
    color: var(--blue-main);
  }
</style>

<span class={classes} on:click={() =>changeCurrentMode(currentActiveMode)} on:keyup>
  <i class={getClasses(currentActiveMode)[0]}>&#xe74c;</i>
  <i class={getClasses(currentActiveMode)[1]}>&#xe74d;</i>
</span>
