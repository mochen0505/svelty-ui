<script>
  import {getContext} from 'svelte';
  import {slide} from 'svelte/transition';
  import classnames from '@svelty/classnames';

  let className = '';
  export {className as class};
  export let title = undefined;
  export let panelId = undefined;

  const {gutter, activePanelIds, setActivePanel} = getContext('panelContent');

  let panelOpen;
  let classes;

  $: classes = classnames(
    className,
    'panel-wrap',
  );

  $: updatePanelOpenStatus($activePanelIds);

  function updatePanelOpenStatus(activePanelIds) {
    if (activePanelIds.length) {
      panelOpen = activePanelIds.includes(panelId);
    } else {
      panelOpen = false;
    }
  }

  function handleClick(panelId) {
    setActivePanel(panelId);
  }

</script>

<style>
  * {
    box-sizing: border-box;;
  }

  .panel-wrap {
    border: 1px solid #e9ecef;
    border-radius: 12px;
    background: #f9fafc;
  }

  .panel-title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    border: 1px solid transparent;
    padding: 24px 30px;
    width: 100%;
    min-height: 72px;
    background: none;
    cursor: pointer;
    outline: none;
  }

  .panel-title {
    margin: 0;
    width: 100%;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: #303236;
  }

  .panel-content {
    margin-top: -8px;
    padding: 0 30px 24px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
    color: #676b72;
  }

  .animation {
    transform: rotate(180deg);
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }
</style>

<div class={classes} style={`margin-bottom: ${gutter}px`}>
  <div class='panel-title-wrap' on:click={() => handleClick(panelId)} on:keyup>
    <slot name="panel-title">
      <h3 class="panel-title">{title}</h3>
    </slot>
    <i id="icon" class={panelOpen ? 'animation iconfont' : 'iconfont'}>&#xe74d;</i>
  </div>
  {#if panelOpen}
    <div class='panel-content' transition:slide={{ duration: 250 }}>
      <slot />
    </div>
  {/if}
</div>
