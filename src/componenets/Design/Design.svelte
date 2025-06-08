<script>
  import { onMount } from 'svelte';
  import DesktopSidebarOpen from './DesktopSidebarOpen.svelte';
  import DesktopSidebarClosed from './DesktopSidebarClosed.svelte';
  import MobileView from './MobileView.svelte';
  
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  });
</script>

<!-- Design Section -->
<div class="design-section">
  <div class="design-header">
    <h2 class="design-title">Design</h2>
    <p class="design-subtitle">
      The inspiration came from the modern look sidebars nowadays
    </p>
  </div>
  
  <div class="design-grid">
    <!-- Desktop View - Sidebar Open -->
    <div class="svg-container desktop-container">
      <DesktopSidebarOpen class="desktop-svg {mounted ? 'animate' : ''}" />
    </div>
    
    <!-- Desktop View - Sidebar Closed -->
    <div class="svg-container desktop-container">
      <DesktopSidebarClosed class="desktop-svg {mounted ? 'animate' : ''}" />
    </div>
    
    <!-- Mobile View -->
    <div class="svg-container mobile-container">
      <MobileView class="mobile-svg {mounted ? 'animate' : ''}" />
    </div>
  </div>
</div>

<style>
  .design-section {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .design-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .design-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    margin: 0 0 1rem 0;
    background: linear-gradient(135deg, #FF3E00 0%, #264DE4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }
  
  .design-subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    color: #888;
    margin: 0;
    font-style: italic;
    line-height: 1.6;
    opacity: 0.8;
  }
  
  .design-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    align-items: center;
  }
  
  .svg-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .desktop-container {
    width: 100%;
    max-width: 1000px;
  }
  
  .mobile-container {
    width: 90%;
    max-width: 400px;
  }
  
  /* Base SVG styles */
  :global(.desktop-svg) {
    width: 100%;
    height: 400px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  :global(.mobile-svg) {
    width: 100%;
    height: 500px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  :global(.animate) {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Animation delays */
  .svg-container:nth-child(1) :global(.desktop-svg) { transition-delay: 0.1s; }
  .svg-container:nth-child(2) :global(.desktop-svg) { transition-delay: 0.2s; }
  .svg-container:nth-child(3) :global(.mobile-svg) { transition-delay: 0.3s; }
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .design-grid {
      gap: 1.5rem;
    }
    
    :global(.desktop-svg) {
      height: 350px;
    }
    
    :global(.mobile-svg) {
      height: 400px; /* Reduced from 450px */
    }
    
    .mobile-container {
      width: 85%;
      max-width: 380px;
    }
  }
  
  @media (max-width: 768px) {
    .design-section {
      padding: 1rem;
    }
    
    .design-grid {
      gap: 1rem; /* Reduced gap significantly */
    }
    
    :global(.desktop-svg) {
      height: 380px; /* Increased height for better clarity */
    }
    
    :global(.mobile-svg) {
      height: 360px; /* Reduced from 420px */
    }
    
    .desktop-container {
      width: 100%;
      max-width: none; /* Remove max-width constraint */
    }
    
    .mobile-container {
      width: 85%;
      max-width: 350px;
    }
  }
  
  @media (max-width: 480px) {
    .design-section {
      padding: 0.75rem; /* Reduced padding */
    }
    
    .design-grid {
      gap: 0.75rem; /* Further reduced gap */
    }
    
    :global(.desktop-svg) {
      height: 340px; /* Increased from original 280px */
    }
    
    :global(.mobile-svg) {
      height: 320px; /* Reduced from 380px */
    }
    
    .desktop-container {
      width: 100%;
    }
    
    .mobile-container {
      width: 90%;
      max-width: 320px;
    }
  }
  
  /* Extra small screens */
  @media (max-width: 360px) {
    .design-grid {
      gap: 0.5rem; /* Minimal gap */
    }
    
    :global(.desktop-svg) {
      height: 320px;
    }
    
    :global(.mobile-svg) {
      height: 300px; /* Reduced from 360px */
    }
  }
</style>
