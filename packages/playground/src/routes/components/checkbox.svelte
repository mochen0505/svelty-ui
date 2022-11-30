<script>
  import {Checkbox} from '@svelty/checkbox';

  let checked = false;
  $: console.log(checked);
</script>

<Checkbox bind:checked>test</Checkbox>

