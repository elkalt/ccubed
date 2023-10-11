<script lang="ts">
  import "$lib/styles/app.scss";
</script>

<header>
  <h1><a href="/">CCUBED</a></h1>
  <p>About</p>
</header>

<div class="content-wrapper">
  <h1>About</h1>
  <p>Built in 4 hours using SvelteKit.  See the code on <a href="https://github.com/elkalt/ccubed">GitHub</a>.</p>
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

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    padding: 1rem;
    font-size: 1.5rem;
    cursor: default;

    h1 {
      font-size: 2rem;
      padding: 0;
      margin: 0;
      
      a {
        color: var(--primary);
        text-decoration: none;
        cursor: pointer;
  
        &:hover {
          color: var(--primary-light);
        }
      }
    }

    p {
      font-size: 1.5rem;
      font-weight: 600;
      padding: 0;
      margin: 0;
    }
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