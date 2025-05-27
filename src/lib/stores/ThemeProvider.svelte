<!-- src/lib/stores/ThemeProvider.svelte -->
<script>
  import { onMount } from 'svelte';
  import { 
    initializeWindowMethods,
    initializeTheme,
    setTheme,
    setupThemeListeners,
    setupThemeEffects
  } from './theme';
  
  onMount(() => {
    // Initialize window methods
    initializeWindowMethods();
    
    // Set initial theme
    const initialThemeValue = initializeTheme();
    setTheme(initialThemeValue);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', initialThemeValue);
    
    // Set up theme listeners for system preference changes
    const cleanupListeners = setupThemeListeners();
    
    // Set up theme effects (DOM and localStorage updates)
    const cleanupEffects = setupThemeEffects();
    
    // Clean up on component unmount
    return () => {
      cleanupListeners();
      cleanupEffects();
    };
  });
</script>

<!-- This component doesn't render anything visible itself -->