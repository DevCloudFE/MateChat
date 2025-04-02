<script>
  export let label = "Default Label";
  export let onClick = () => {};
</script>

<button class="mc-button" on:click={onClick}>
  {label}
</button>

<style>
  .mc-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>