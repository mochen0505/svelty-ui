<script>
  import {Sort} from '@svelty/sort';

  function handleChange(e) {
    console.log(e.detail);
  }
</script>

<Sort initialActiveMode='desc' on:change={handleChange} />
