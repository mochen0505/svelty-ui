<script>
  import {Button} from '@svelty/button';
  import {Modal} from '@svelty/modal';

  let visible = false;
  let btnWrap;

  function showModal() {
    visible = true;
  }

  function handleModalClose() {
    visible = false;
  }

</script>

<div bind:this={btnWrap}>
  <Button
    class='demo-button'
    type='primary'
    on:click={showModal}
  >
    Show Modal
  </Button>
</div>

<Modal
  {visible}
  container={btnWrap}
  on:close={handleModalClose}
>
  test
</Modal>
