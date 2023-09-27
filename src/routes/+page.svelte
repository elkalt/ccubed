<script lang="ts">
  import '$lib/styles/app.scss'
  import type { LocationDetails } from '$lib/types/location-details';
  import { Continents, Countries, Cities } from "$lib/definitions/locations";

  let modes = ["Casual", "Normal", "Hard"]
  let currentMode: string = "Casual";
  let currentStatus: string = "menu";

  let startTime = new Date();
  let endTime = new Date();
  let time: string = "00:00";

  let currentContinents : Map<string, LocationDetails>;
  let currentCountries : Map<string, LocationDetails>;
  let currentCities : Map<string, LocationDetails>;

  let lives: number;
  let count: number;
  let previous: string;
  let repeat: boolean;
  let wrong: boolean;
  let used: {continents: string[], countries: string[], cities: string[]} = {continents: [], countries: [], cities: []};
  let inputValue: string = "";
  let inputField: HTMLInputElement;

  let populationHintAvailable: boolean;
  let locationHintAvailable: boolean;
  let showPopulationHint: boolean;
  let showLocationHint: boolean;
  let populationHint: number;
  let locationHint: string;
  let locationTypeHint: string;
  let cityHint: string;
  
  function startGame() {
    currentContinents = new Map(Continents);
    currentCountries = new Map(Countries);
    currentCities = new Map(Cities);
    populationHintAvailable = false;
    locationHintAvailable = false;
    showPopulationHint = false;
    showLocationHint = false;
    previous = "";
    time = "00:00";
    inputValue = "";
    wrong = false;
    repeat = false;
    for (let continent of used.continents) {
      currentContinents.get(continent)!.available = true;
    }
    for (let country of used.countries) {
      currentCountries.get(country)!.available = true;
    }
    for (let city of used.cities) {
      currentCities.get(city)!.available = true;
    }
    used = {continents: [], countries: [], cities: []};
    count = 0;
    if (currentMode === "Casual") {
      lives = 3;
    } else if (currentMode === "Normal") {
      lives = 2;
    } else if (currentMode === "Hard") {
      lives = 1;
    }
    startTime = new Date();
    currentStatus = "playing";

    let timerInterval = setInterval(() => {
      if (currentStatus === "playing") {
        let timeDiff = new Date().getTime() - startTime.getTime();
        let seconds = Math.floor(timeDiff / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        time = `${minutes < 10 ? "0" + minutes.toString() : minutes}:${seconds < 10 ? "0" + seconds.toString() : seconds}`;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  function checkLocation() {
    let input = inputValue;
    let inputLower = input.toLowerCase();

    let continentCheck = currentContinents.get(inputLower);
    let countryCheck = currentCountries.get(inputLower);
    let cityCheck = currentCities.get(inputLower);

    repeat = false;
    wrong = false;

    check: if (previous !== "" && input.slice(0, 1) !== previous.slice(-1).toUpperCase()) {
      wrong = true;
      break check;
    } else if (continentCheck) {
      if (!continentCheck.available) {
        repeat = true;
        break check;
      }
      continentCheck.available = false;
      used.continents.push(inputLower);
    } else if (countryCheck) {
      if (!countryCheck.available) {
        repeat = true;
        break check;
      }
      countryCheck.available = false;
      used.countries.push(inputLower);
    } else if (cityCheck) {
      if (!cityCheck.available) {
        repeat = true;
        break check;
      }
      cityCheck.available = false;
      used.cities.push(inputLower);
    } else {
      wrong = true;
    }
    
    if (wrong) {
      lives--;
      if (lives <= 0) {
        currentStatus = "finished";
        endTime = new Date();
        let timeDiff = endTime.getTime() - startTime.getTime();
        let seconds = Math.floor(timeDiff / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        time = `${minutes < 10 ? "0" + minutes.toString() : minutes}:${seconds < 10 ? "0" + seconds.toString() : seconds}`;
      }
    } else if (!repeat) {
      previous = input;
      count++;
      showPopulationHint = false;
      showLocationHint = false;
      populationHintAvailable = true;
    }
    
    inputValue = previous.slice(-1).toUpperCase();
    inputField.focus();
  }

  function getHint() {
    let startLetter = previous.slice(-1).toLowerCase();

    if (populationHintAvailable) {
      populationHint = 0;
      for (let [key, value] of currentContinents) {
        if (value.available && key.slice(0, 1) === startLetter) {
          populationHint = value.population;
          locationTypeHint = "continent";
          break;
        }
      }
      for (let [key, value] of currentCountries) {
        if (value.available && key.slice(0, 1) === startLetter && value.population > populationHint) {
          populationHint = value.population;
          locationTypeHint = "country";
          break;
        }
      }
      for (let [key, value] of currentCities) {
        if (value.available && key.slice(0, 1) === startLetter && value.population > populationHint) {
          populationHint = value.population;
          locationTypeHint = "city";
          cityHint = key;
          if (value.country) locationHintAvailable = true;
          break;
        }
      }

      populationHintAvailable = false;
      showPopulationHint = true;
    } else if (locationHintAvailable) {
      locationHint = currentCities.get(cityHint)!.country!;
      locationHintAvailable = false;
      showLocationHint = true;
    }
  }
</script>

<header>
  <h1>CCUBED</h1>
  <p>{ time }</p>
</header>

<div class="content-wrapper">
  {#if currentStatus === "menu"}
    <div class="mode-select">
      {#each modes as mode}
        <button class="mode-button"
          on:click={() => currentMode = mode}
          style:background-color={currentMode === mode ? "var(--background-dark)" : ""}>
          { mode }
        </button>
      {/each}
    </div>

    <div class="rules">
      {#if currentMode === "Casual"}
        <p>Three tries, population and location hints</p>
      {:else if currentMode === "Normal"}
        <p>Two tries, no hints</p>
      {:else if currentMode === "Hard"}
        <p>One try, no hints</p>
      {/if}
    </div>

    <button class="start-button"
      on:click={() => startGame()}>
      START
    </button>
  {:else if currentStatus === "playing"}
    <div class="play-container">
      <div class="stats">
        <p>Count: { count }</p>
        <p>Previous: { previous }</p>
        <p>Lives: { lives }</p>
      </div>
      <form class="input-container" on:submit={() => checkLocation()}>
        <!-- svelte-ignore a11y-autofocus -->
        <input type="text"
          bind:value={inputValue}
          bind:this={inputField}
          on:input={() => {if (inputValue === "") inputValue = previous.slice(-1).toUpperCase();}}
          placeholder="Enter a location"
          autofocus/>
        <input type="submit">
      </form>
      {#if currentMode === "Casual"}
        <div>
          <button class="end-button"
            on:click={() => getHint()}>
            Get hint
          </button>
        </div>
        {#if showPopulationHint}
          <p>There is a { locationTypeHint } with { populationHint } citizens that starts with the letter { previous.slice(-1).toUpperCase() }</p>
        {:else if showLocationHint}
          <p>The city is in the country { locationHint }</p>
        {/if}
      {/if}
      {#if repeat}
        <p>Already used</p>
      {:else if wrong}
        <p>Not a continent, city, or state</p>
      {/if}
    </div>
  {:else if currentStatus === "finished"}
    <div class="play-container">
      <h1>Congrats!</h1>
      <p>Time: { time }</p>
      <p>Count: { count }</p>
      <div>
        <button class="end-button"
          on:click={() => startGame()}>
          Play again
        </button>
        <button class="end-button"
          on:click={() => currentStatus = "menu"}>
          Menu
      </div>
    </div>
  {:else}
    <p>Something went wrong, please refresh the page</p>
  {/if}
</div>

<style lang="scss">
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
    }
  }

  h1 {
    padding: 0;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  .mode-select {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 1rem;
    width: 100%;

    button {
      border-top-right-radius: 0.3rem;
      border-top-left-radius: 0.3rem;
      padding: 0.5rem;
      border: 0px;
      background-color: var(--background);
      color: var(--primary);
      font-size: 1.4rem;
      font-weight: 600;
      height: 100%;
      width: 100%;
      cursor: pointer;
      border-bottom: 1px solid var(--primary);

      &:hover {
        background-color: var(--background-dark);
        color: var(--primary-light);
        border-bottom: 1px solid var(--primary-light);
      }
    }
  }

  .rules {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    p {
      font-size: 1.2rem;
      padding: 0;
      margin: 0;
    }
  }

  .start-button {
    border-radius: 0.3rem;
    padding: 0.5rem;
    background-color: var(--background);
    color: var(--primary);
    font-size: 2.5rem;
    font-weight: 600;
    height: 100%;
    cursor: pointer;
    border: 1px solid var(--primary);
    margin-top: 2.5rem;

    &:hover {
      background-color: var(--background-dark);
      color: var(--primary-light);
      border-bottom: 1px solid var(--primary-light);
    }
  }

  .end-button {
    border-radius: 0.3rem;
    padding: 0.5rem;
    background-color: var(--background);
    color: var(--primary);
    font-size: 1.5rem;
    font-weight: 600;
    height: 100%;
    cursor: pointer;
    border: 1px solid var(--primary);
    margin-top: 2.5rem;

    &:hover {
      background-color: var(--background-dark);
      color: var(--primary-light);
      border-bottom: 1px solid var(--primary-light);
    }
  }

  .play-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    width: 100%;
    height: 100%;
    gap: 2rem;

    .input-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 50%;
      
      @media (max-width: 768px) {
        width: 100%;
      }

      input[type="text"] {
        background-color: var(--background);
        color: var(--primary);
        font-size: 1.5rem;
        font-weight: 500;
        height: 100%;
        cursor: pointer;
        border: 0;
        width: 100%;
        border-bottom: 1px solid var(--primary);

        &:focus {
          outline: none;
        }
      }

      input[type="submit"] {
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        background-color: var(--background);
        color: var(--primary);
        font-size: 1.5rem;
        font-weight: 500;
        height: 100%;
        cursor: pointer;
        border: 0;
        border-bottom: 1px solid var(--primary);

        &:hover {
          background-color: var(--background-dark);
          color: var(--primary-light);
          border-bottom: 1px solid var(--primary-light);
        }
      }
    }

    .stats {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 50%;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 500;

      @media (max-width: 768px) {
        width: 100%;
        gap: 1rem;
        flex-direction: column;
      }
    }
  }
</style>