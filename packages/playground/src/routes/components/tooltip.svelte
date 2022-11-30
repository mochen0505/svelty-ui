<script>
  import {Tooltip} from '@svelty/tooltip';
  import {Button} from '@svelty/button';
</script>

<div>
  <Button id='bottom'>bottom</Button>
  <Tooltip target='bottom' placement='bottom'>
    hover to show the tooltip
  </Tooltip>

  <Button id='top'>top</Button>
  <Tooltip target='top' placement='top'>
    hover to show the tooltip
  </Tooltip>

  <Button id='left'>left</Button>
  <Tooltip target='left' placement='left'>
    hover to show the tooltip
  </Tooltip>

  <Button id='right'>right</Button>
  <Tooltip target='right' placement='right'>
    hover to show the tooltip
  </Tooltip>
</div>
