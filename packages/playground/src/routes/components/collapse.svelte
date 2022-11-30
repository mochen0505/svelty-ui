<script>
  import {Collapse, Panel} from '@svelty/collapse';

  function handleChange(e) {
    console.log(e.detail);
  }

</script>

<style>
  .custom-panel-title {
    color: #888;
  }
</style>

<Collapse on:change={handleChange} accordion activeIds={['1']}>
  <Panel panelId='1' title='test'>
    test
  </Panel>
  <Panel panelId='2' title='test2'>
    test2
  </Panel>
  <Panel panelId='3'>
    <span slot="panel-title" class="custom-panel-title">
      custom panel title
    </span>
    <span>custom panel content</span>
  </Panel>
</Collapse>
