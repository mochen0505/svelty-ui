<script>
  import {Select, Option} from '@svelty/select';

  const data = [{value: 1, label: 'China', flag: 'π¨π³'}, {value: 2, label: 'USA', flag: 'πΊπΈ'}];

  function handleSelect(e) {
    console.log(e.detail)
  }
</script>

<style>
  .option {
    display: flex;
  }
</style>

<Select on:select={handleSelect} activeValue={1} size='large'>
  {#each data as item}
    <Option value={item.value} label={item.label} />
  {/each}
</Select>

<Select on:select={handleSelect} activeValue={1} size='medium'>
  {#each data as item}
    <Option value={item.value} label={item.label} />
  {/each}
</Select>

<Select on:select={handleSelect} allowClear>
  {#each data as item}
    <Option value={item.value}>
      <div class='option'>
        <div>{item.flag}</div>
        <div>{item.label}</div>
      </div>
    </Option>
  {/each}
</Select>

<Select on:select={handleSelect} allowClear>
  {#each data as item}
    <Option value={item.value}>
      <div class='option' slot='custom-display'>
        <div>{item.flag}</div>
      </div>
      <div class='option'>
        <div>{item.flag}</div>
        <div>{item.label}</div>
      </div>
    </Option>
  {/each}
</Select>
