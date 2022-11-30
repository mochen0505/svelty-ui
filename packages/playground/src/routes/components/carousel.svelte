<script>
  import {Carousel} from '@svelty/carousel';

  const data = ['111', '222', '333', '444', '555'];
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .carousel-wrap {
    width: 900px;
  }

  .content-wrap {
    display: flex;
    justify-content: center;
  }

  .content {
    width: 282px;
    height: 100px;
    border: 1px solid #ececec;
    border-radius: 12px;
    background-color: #fff;
  }

  .icon {
    font-size: 36px;
  }

  .icon-left {
    transform: rotate(180deg);
  }
</style>

<div class='carousel-wrap'>
  <Carousel autoplay={1000} dots={true}>
    {#each data as item}
      <div class='content-wrap'>
        <div class='content'>
          {item}
        </div>
      </div>
    {/each}
    <i class="icon icon-left iconfont" slot='left-control'>&#xe743;</i>
    <i class="icon iconfont" slot='right-control'>&#xe743;</i>
  </Carousel>
</div>

