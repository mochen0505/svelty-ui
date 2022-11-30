<script>
  import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
  } from '@svelty/dropdown';

  const data = [
    'dropdown 1',
    'dropdown 2',
  ]

  let text = 'demo';

  function handleClick(item) {
    text = item;
  }
</script>

<Dropdown trigger='click'>
  <DropdownToggle>
    <div>{text}</div>
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem type='disabled'>disabled</DropdownItem>
    <DropdownItem type='divider' />
    {#each data as item}
      <DropdownItem on:click={() => handleClick(item)}>{item}</DropdownItem>
    {/each}
  </DropdownMenu>
</Dropdown>
