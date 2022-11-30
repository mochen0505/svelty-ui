<script>
  import {onMount, onDestroy} from 'svelte';

  export let container;

  let ref;
  let portal;

  $: updateContainer(container);

  onMount(() => {
    portal = document.createElement('div');
    portal.className = 'portal';
    container.appendChild(portal);
    portal.appendChild(ref);
  });

  onDestroy(() => {
    if (typeof container !== 'undefined') {
      container.removeChild(portal);
    }
  });

  function updateContainer() {
    if (document && !container) {
      container = document.body;
    }
  }
</script>

<div bind:this={ref} {...$$restProps}>
  <slot />
</div>
