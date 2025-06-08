<script>
  let { class: className = '', ...props } = $props();
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 621 1095" 
  class="design-svg {className}" 
  {...props}
>
  <!-- Outer container -->
  <rect x="0" y="0" width="611" height="1085" rx="32" fill="none" stroke="#999" stroke-width="2"/>
  
  <!-- Header -->
  <line x1="1" y1="65" x2="610" y2="65" stroke="#888" stroke-width="2"/>
  <rect x="18" y="25" width="31" height="22" rx="5" fill="#FF6B35" stroke="none"/>
  <rect x="105" y="19" width="123" height="27" rx="7" fill="none" stroke="#999" stroke-width="2"/>
  <rect x="271" y="17" width="118" height="35" rx="7" fill="none" stroke="#999" stroke-width="2"/>
  <circle cx="567" cy="32" r="28" fill="#264DE4" stroke="none"/>
  
  <!-- Content -->
  <text x="305" y="457" text-anchor="middle" font-family="system-ui" font-size="48" fill="#666">Content Area</text>
  <text x="305" y="535" text-anchor="middle" font-family="system-ui" font-size="36" fill="#999">Mobile View</text>
  
  <!-- Footer -->
  <line x1="6" y1="1030" x2="604" y2="1030" stroke="#888" stroke-width="2"/>
</svg>

<style>
  .design-svg {
    width: 100%;
    height: auto;
    background: rgba(255, 255, 255, 0.02);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    
    /* Default height for large screens */
    height: 500px;
  }
  
  .design-svg:hover {
    transform: scale(1.02);
  }
  
  /* Large screens - keep original good sizing */
  @media (min-width: 1025px) {
    .design-svg {
      height: 500px;
    }
  }

  /* Tablet and below - start reducing */
  @media (max-width: 1024px) {
    .design-svg {
      height: 400px;
    }
  }
  
  @media (max-width: 768px) {
    .design-svg {
      height: 360px;
    }
  }
  
  @media (max-width: 480px) {
    .design-svg {
      height: 320px;
    }
  }
  
  @media (max-width: 360px) {
    .design-svg {
      height: 300px;
    }
  }
</style>
