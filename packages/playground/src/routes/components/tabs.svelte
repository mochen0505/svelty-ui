<script>
  import {Tabs, TabPane} from '@svelty/tabs';
  import {Button} from '@svelty/button';

  let activeTab = '1';

  function handleTabChange(e) {
    activeTab = e.detail;
  }

  function changeTab() {
    activeTab = '2';
  }

</script>

<Button
  class='demo-button'
  type='primary'
  on:click={changeTab}
>
  set to tab2
</Button>

<Tabs class='my-tabs' on:change={handleTabChange} activeId={activeTab}>
  <TabPane tabId='1' defaultActive>
    <span slot='tab'>
      tab slot
    </span>
    content 1
  </TabPane>
  <TabPane tabId='2' tab='tab2'>
    content 2
  </TabPane>
  <TabPane tabId='3' tab='tab3'>
    content 3
  </TabPane>
</Tabs>
