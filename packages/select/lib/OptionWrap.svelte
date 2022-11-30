<script>
  import {getContext, setContext} from 'svelte';
  import {Popup} from '@svelty/popup';

  const {isShowOptions, isMobileOrApp} = getContext('selectContent');

  setContext('isOptions', true);
</script>

<style>
  .options {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    display: none;
    margin: 0;
    border-radius: 8px;
    padding: 0;
    width: 100%;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  }

  .options-h5 {
    display: none;
    margin: 0;
    border-radius: 8px;
    padding: 0;
    width: 100%;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .options-shown {
    display: inline-block;
  }

  .sv {
    /* firefox*/
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }
  .sv::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: transparent;
  }
  .sv:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .sv::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }
</style>

{#if $isMobileOrApp}
  <Popup visible={$isShowOptions}>
    <ul class="{$isShowOptions ? 'options-h5 options-shown' : 'options'} sv">
      <slot />
    </ul>
  </Popup>
{:else}
  <ul class="{$isShowOptions ? 'options options-shown' : 'options'} sv">
    <slot />
  </ul>
{/if}
