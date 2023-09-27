<script lang="ts">
  import "$lib/styles/app.scss";
</script>

<div class="content-wrapper">
  <h1>About</h1>
  <p>Built using SvelteKit.  See the code on <a href="https://github.com/elkalt/ccubed">GitHub</a>.</p>
  <p>Cities were collected from the Geonames dump and filtered to only include those with more than 50 000 population.</p>
</div>

<style lang="scss">
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  a {
    color: var(--primary);
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: var(--primary-light);
    }
  }
</style>