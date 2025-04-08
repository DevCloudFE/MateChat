<script>
  import { onMount } from "svelte";
  import Button from "./components/Button/Button.svelte";
  let expandSlotContainer;
  let slots;
  onMount(() => {
    console.log("app mounted");
  });
</script>

<h2>Button Component</h2>

<div class="demo-wrap"><Button styleType="outline-blue"></Button></div>
<div class="demo-wrap"><Button styleType="gradient-border"></Button></div>
<div class="demo-wrap">
  <Button styleType="outline-blue" {slots}></Button>
  <div id="expand-demo" bind:this={expandSlotContainer}></div>
</div>

<style lang="scss">
  .demo-wrap {
    margin: 26px;
  }
</style>
