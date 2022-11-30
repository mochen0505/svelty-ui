<style>
  svg {
    display: inline-block;
    vertical-align: middle;
    -webkit-animation: loading-circle 1s infinite linear;
    animation: loading-circle 1s infinite linear;
    transform: scale(1);
    transition: transform 3s linear;
  }

  .loading-wrap {
    display: inline-block;
  }

  @keyframes loading-circle {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<span class='loading-wrap'>
  <svg class="loading-icon" viewBox="0 0 1024 1024" width='100%' height='100%'>
  <path d="M452.928 0c65.28 0 118.144 52.928 118.144 118.144v236.288a118.144 118.144 0 0 1-118.144-118.144V0z" fill-opacity=".9"></path>
  <path d="M832.256 108.16c46.144 46.144 46.144 120.96 0 167.104l-167.04 167.104a118.144 118.144 0 0 1 0-167.04l167.04-167.168z" fill-opacity=".2"></path>
  <path d="M1024 452.928c0 65.28-52.928 118.144-118.144 118.144h-236.288c0-65.28 52.864-118.144 118.144-118.144H1024z" fill-opacity=".3"></path>
  <path d="M915.84 832.256a118.144 118.144 0 0 1-167.104 0l-167.104-167.04a118.144 118.144 0 0 1 167.04 0l167.168 167.04z" fill-opacity=".4"></path>
  <path d="M571.072 1024a118.144 118.144 0 0 1-118.144-118.144v-236.288c65.28 0 118.144 52.864 118.144 118.144V1024z" fill-opacity=".5"></path>
  <path d="M191.744 915.84a118.144 118.144 0 0 1 0-167.104l167.04-167.104c46.208 46.08 46.208 120.96 0 167.04l-167.04 167.168z" fill-opacity=".6"></path>
  <path d="M0 571.072c0-65.28 52.928-118.144 118.144-118.144h236.288c0 65.28-52.864 118.144-118.144 118.144H0z" fill-opacity=".7"></path>
  <path d="M108.16 191.744a118.144 118.144 0 0 1 167.104 0l167.104 167.04a118.144 118.144 0 0 1-167.04 0L108.16 191.808z" fill-opacity=".8"></path>
</svg>
</span>
