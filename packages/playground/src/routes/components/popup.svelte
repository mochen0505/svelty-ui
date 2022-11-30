<script>
  import {Button} from '@svelty/button';
  import {Popup} from '@svelty/popup';

  let visible = false;
  let visibleScrollWithHeader = false;

  function handleModalClose() {
    visible = false;
  }
</script>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    position: relative;
    word-break: break-all;
  }
</style>

<div>
  <Button class="demo-button" type="primary" on:click={() => (visible = true)}>popup</Button>
  <Button class="demo-button" type="primary" on:click={() => (visibleScrollWithHeader = true)}>popup</Button>
</div>

{#if visible}
  <Popup visible title="Popup title" on:close={handleModalClose}>
    <div class="wrap">popup</div>
  </Popup>
{/if}

{#if visibleScrollWithHeader}
  <Popup visible fullscreen title="Earn BTC" on:close={() => (visibleScrollWithHeader = false)}>
    <div class="wrap">
      test
    </div>
  </Popup>
{/if}
