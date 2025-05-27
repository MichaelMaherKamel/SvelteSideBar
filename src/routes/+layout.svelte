<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css'; // Your existing CSS
  import ThemeProvider from '$lib/stores/ThemeProvider.svelte';
  
  // Get the children prop
  let { children } = $props();
</script>

<!-- Initialize theme system -->
<ThemeProvider />

<!-- Just render children -->
{@render children?.()}