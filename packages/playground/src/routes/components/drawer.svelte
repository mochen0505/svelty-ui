<script>
  import {Button} from '@svelty/button';
  import {Drawer} from '@svelty/drawer';

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
    Show Drawer
  </Button>
</div>

<Drawer
  {visible}
  container={btnWrap}
  on:close={handleModalClose}
>
  test
</Drawer>
