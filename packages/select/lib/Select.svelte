<script>
  import {createEventDispatcher, setContext, onMount, onDestroy} from 'svelte';
  import {writable} from 'svelte/store';
  import classnames from '@svelty/classnames';
  import OptionWrap from './OptionWrap.svelte';

  const dispatch = createEventDispatcher();

  let className = '';
  export {className as class};

  export let activeValue = undefined;
  export let allowClear = false;
  export let mobileOrApp = false;
  /**
   * Button size
   * @type {"large" | "medium"}
   */
  export let size = 'medium';

  const activeVal = writable();
  const isAllowClear = writable();
  const isShowOptions = writable();
  const isMobileOrApp = writable();
  const isShowClearOnHover = writable();

  let classes;
  let showOptions = false;
  let selectEl;
  let showClearOnHover = false;

  $: classes = classnames(
    className,
    size,
    'select',
    'select-bordered'
  );
  $: activeVal.set(activeValue);
  $: isAllowClear.set(allowClear);
  $: isShowOptions.set(showOptions);
  $: isMobileOrApp.set(mobileOrApp);
  $: isShowClearOnHover.set(showClearOnHover);

  setContext('selectContent', {
    size,
    activeVal,
    isShowOptions,
    isMobileOrApp,
    isAllowClear,
    isShowClearOnHover,
    setActiveVal: (value) => {
      activeVal.set(value);
      dispatch('select', value);
    },
  });

  onMount(() => {
    document.addEventListener('click', hideOptions);
  })

  onDestroy(() => {
    document.removeEventListener('click', hideOptions);
  });

  onMount(() => {
    addListeners();
  })

  onDestroy(() => {
    removeListeners();
  });

  function hideOptions() {
    showOptions = false;
  }

  function handleShowOptions() {
    showOptions = !showOptions;
  }

  function addListeners() {
    if (selectEl) {
      selectEl.addEventListener('mouseover', showClear);
      selectEl.addEventListener('mouseleave', hideClear);
      selectEl.addEventListener('focus', showClear);
      selectEl.addEventListener('blur', hideClear);
    }
  }

  function removeListeners() {
    if (selectEl) {
      selectEl.removeEventListener('mouseover', showClear);
      selectEl.removeEventListener('mouseleave', hideClear);
      selectEl.removeEventListener('focus', showClear);
      selectEl.removeEventListener('blur', hideClear);
    }
  }

  function showClear() {
    showClearOnHover = true;
  }

  function hideClear() {
    showClearOnHover = false;
  }

</script>

<style>
  * {
    box-sizing: border-box;
  }
  .select-wrap {
    position: relative;
    cursor: pointer;
  }

  .select {
    position: relative;
    color: #303236;
  }

  .select-bordered {
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 0 10px;
  }

  .large {
    padding: 0 20px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
  }

  .medium {
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  .arrow {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    transition: transform 0.2s;
  }

  .animation {
    transform: translateY(-50%) rotate(180deg);
  }
</style>

<div class='select-wrap' on:click|stopPropagation={handleShowOptions} on:keyup bind:this={selectEl}>
  <div class={classes} {...$$restProps}>
    <slot />
    <OptionWrap>
      <slot />
    </OptionWrap>
  </div>
  <i class="{showOptions ? 'arrow animation' : 'arrow'} iconfont">&#xe74d;</i>
</div>
