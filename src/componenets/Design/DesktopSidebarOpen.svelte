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
  <rect x="125" y="6" width="1180" height="793" rx="32" fill="none" stroke="#999" stroke-width="2"/>
  <!-- Sidebar section -->
  <rect x="3" y="14" width="119" height="60" rx="15" fill="none" stroke="#FF6B35" stroke-width="3"/>

  <!-- Navigation items -->
  <rect x="9" y="113" width="103" height="41" rx="10" fill="#264DE4" stroke="#264DE4" stroke-width="2"/>
  <rect x="9" y="174" width="103" height="41" rx="10" fill="none" stroke="#888" stroke-width="2"/>
  <rect x="9" y="230" width="103" height="41" rx="10" fill="none" stroke="#888" stroke-width="2"/>

  <!-- User section -->
  <ellipse cx="61" cy="771" rx="48" ry="28" fill="none" stroke="#FF6B35" stroke-width="2"/>
 
  <!-- Header -->
  <line x1="127" y1="72" x2="1300" y2="72" stroke="#888" stroke-width="2"/>
  <!-- Icons in header -->
  <rect x="148" y="32" width="31" height="22" rx="5" fill="none" stroke="#999" stroke-width="2"/>
  <rect x="230" y="25" width="123" height="27" rx="7" fill="none" stroke="#999" stroke-width="2"/>
  <rect x="434" y="25" width="118" height="29" rx="7" fill="none" stroke="#999" stroke-width="2"/>
  <circle cx="1263" cy="43" r="28" fill="#264DE4" stroke="none"/>
  
  <!-- Content -->
  <text x="707" y="368" text-anchor="middle" font-family="system-ui" font-size="48" fill="#666">Content Area</text>
  <text x="707" y="435" text-anchor="middle" font-family="system-ui" font-size="36" fill="#999">SideBar Open</text>
  
  <!-- Footer -->
  <line x1="125" y1="750" x2="1300" y2="750" stroke="#888" stroke-width="2"/>
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
