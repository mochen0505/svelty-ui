<script>
  import {createEventDispatcher, setContext} from 'svelte';
  import {writable, get} from 'svelte/store';

  const dispatch = createEventDispatcher();

  let className = '';
  export {className as class};
  export let gutter = 20;
  export let accordion = false;
  export let activeIds = [];

  const activePanelIds = writable([]);

  $: activePanelIds.set(activeIds);

  function setActivePanel(panelId) {
    const arr = get(activePanelIds);
    if (arr.includes(panelId)) {
      const updatedArr = accordion ? [] : arr.filter(item => item !== panelId);
      activePanelIds.set(updatedArr);
      dispatch('change', updatedArr);
      return;
    }
    const updatedArr = accordion ? [panelId] : [...arr, panelId];
    activePanelIds.set(updatedArr);
    dispatch('change', updatedArr);
  }

  setContext('panelContent', {
    gutter,
    accordion,
    activePanelIds,
    setActivePanel: (panelId) => setActivePanel(panelId),
  });

</script>

<div class={className} {...$$restProps}>
  <slot />
</div>

