<script>
  import {Switch} from '@svelty/switch';

  let checked = true;

  function handleChange(e) {
    checked = !checked;
  }

  $: console.log(checked);

</script>

<Switch {checked} on:change={handleChange} />
<Switch {checked} mode='night' on:change={handleChange} />
<Switch disabled />
