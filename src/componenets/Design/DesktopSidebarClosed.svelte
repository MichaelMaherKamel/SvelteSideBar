<script>
  let { class: className = '', ...props } = $props();
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 1320 820" 
  class="design-svg {className}" 
  {...props}
>
  <!-- Outer container -->
  <rect x="0" y="0" width="1311" height="804" rx="32" fill="none" stroke="#999" stroke-width="2"/>
  <!-- Inner content area -->
  <rect x="64" y="6" width="1241" height="793" rx="32" fill="none" stroke="#999" stroke-width="2"/>
  
  <!-- Collapsed sidebar indicators -->
  <rect x="86" y="31" width="31" height="22" rx="5" fill="none" stroke="#999" stroke-width="2"/>
  <rect x="157" y="27" width="123" height="27" rx="7" fill="none" stroke="#999" stroke-width="2"/>
  <rect x="323" y="25" width="118" height="35" rx="7" fill="none" stroke="#999" stroke-width="2"/>
  <circle cx="1263" cy="43" r="28" fill="#264DE4" stroke="none"/>
  
  <!-- Mini nav items -->
  <rect x="22" y="114" width="21" height="30" rx="5" fill="#264DE4" stroke="none"/>
  <rect x="22" y="166" width="21" height="30" rx="5" fill="none" stroke="#888" stroke-width="2"/>
  <rect x="22" y="221" width="21" height="30" rx="5" fill="none" stroke="#888" stroke-width="2"/>
  
  <!-- Mini user -->
  <ellipse cx="32" cy="771" rx="24" ry="21" fill="none" stroke="#FF6B35" stroke-width="2"/>
  <ellipse cx="32" cy="48" rx="24" ry="21" fill="#FF6B35" stroke="none"/>
  
  <!-- Header -->
  <line x1="67" y1="72" x2="1300" y2="72" stroke="#888" stroke-width="2"/>
  
  <!-- Content -->
  <text x="685" y="346" text-anchor="middle" font-family="system-ui" font-size="48" fill="#666">Content Area</text>
  <text x="685" y="424" text-anchor="middle" font-family="system-ui" font-size="36" fill="#999">SideBar Closed</text>
  
  <!-- Footer -->
  <line x1="68" y1="754" x2="1300" y2="754" stroke="#888" stroke-width="2"/>
</svg>

<style>
  .design-svg {
    width: 100%;
    height: auto;
    background: rgba(255, 255, 255, 0.02);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    cursor: pointer;
  }
  
  .design-svg:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.05);
  }
</style>
