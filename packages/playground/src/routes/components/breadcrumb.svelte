<script>
  import {Breadcrumb, BreadcrumbItem} from '@svelty/breadcrumb';
</script>

<Breadcrumb>
  <BreadcrumbItem on:click={() => console.log('Home')}>
    <div>Home</div>
  </BreadcrumbItem>
  <BreadcrumbItem on:click={() => console.log('Library')}>Library</BreadcrumbItem>
</Breadcrumb>
