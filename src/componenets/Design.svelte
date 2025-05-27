<!-- Design.svelte - Design Grid Component -->
<script>
  import { onMount } from 'svelte';
  
  let mounted = false;
  
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
    <!-- Sidebar Open -->
    <div class="design-card" class:animate={mounted}>
      <div class="design-preview">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1331 824" class="design-svg">
          <!-- Outer container -->
          <rect x="10" y="10" width="1311" height="804" rx="32" fill="none" stroke="#333" stroke-width="2"/>
          <!-- Inner content area -->
          <rect x="135" y="16" width="1180" height="793" rx="32" fill="none" stroke="#333" stroke-width="2"/>
          <!-- Sidebar section -->
          <rect x="13" y="24" width="119" height="60" rx="15" fill="none" stroke="#333" stroke-width="2"/>
          <text x="72" y="49" text-anchor="middle" font-family="system-ui" font-size="16" fill="#666">Logo + Name</text>
          <!-- Navigation items -->
          <rect x="19" y="123" width="103" height="41" rx="10" fill="none" stroke="#333" stroke-width="2"/>
          <text x="70" y="148" text-anchor="middle" font-family="system-ui" font-size="20" fill="#666">Nav Link</text>
          <rect x="19" y="184" width="103" height="41" rx="10" fill="none" stroke="#333" stroke-width="2"/>
          <text x="70" y="209" text-anchor="middle" font-family="system-ui" font-size="20" fill="#666">Nav Link</text>
          <rect x="19" y="240" width="103" height="41" rx="10" fill="none" stroke="#333" stroke-width="2"/>
          <text x="70" y="265" text-anchor="middle" font-family="system-ui" font-size="20" fill="#666">Nav Link</text>
          <!-- User section -->
          <ellipse cx="71" cy="781" rx="48" ry="28" fill="none" stroke="#333" stroke-width="2"/>
          <text x="71" y="786" text-anchor="middle" font-family="system-ui" font-size="20" fill="#666">User</text>
          <!-- Header -->
          <line x1="137" y1="82" x2="1310" y2="82" stroke="#333" stroke-width="2"/>
          <rect x="158" y="42" width="31" height="22" rx="5" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="240" y="35" width="123" height="27" rx="7" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="444" y="35" width="118" height="29" rx="7" fill="none" stroke="#333" stroke-width="2"/>
          <circle cx="1273" cy="53" r="28" fill="none" stroke="#333" stroke-width="2"/>
          <text x="1273" y="58" text-anchor="middle" font-family="system-ui" font-size="16" fill="#666">AI</text>
          <!-- Content -->
          <text x="717" y="378" text-anchor="middle" font-family="system-ui" font-size="53" fill="#666">Content Area</text>
          <text x="717" y="445" text-anchor="middle" font-family="system-ui" font-size="53" fill="#666">SideBar Open</text>
          <!-- Footer -->
          <line x1="135" y1="760" x2="1310" y2="760" stroke="#333" stroke-width="2"/>
          <text x="726" y="789" text-anchor="middle" font-family="system-ui" font-size="20" fill="#666">Footer</text>
        </svg>
      </div>
      <div class="design-info">
        <h3 class="design-card-title">Sidebar Open</h3>
        <p class="design-card-description">Full navigation with logo, menu items, and user section</p>
      </div>
    </div>
    
    <!-- Sidebar Closed -->
    <div class="design-card" class:animate={mounted}>
      <div class="design-preview">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1331 824" class="design-svg">
          <!-- Outer container -->
          <rect x="10" y="10" width="1311" height="804" rx="32" fill="none" stroke="#333" stroke-width="2"/>
          <!-- Inner content area -->
          <rect x="74" y="16" width="1241" height="793" rx="32" fill="none" stroke="#333" stroke-width="2"/>
          <!-- Collapsed sidebar indicators -->
          <rect x="96" y="41" width="31" height="22" rx="5" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="167" y="37" width="123" height="27" rx="7" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="333" y="35" width="118" height="35" rx="7" fill="none" stroke="#333" stroke-width="2"/>
          <circle cx="1273" cy="53" r="28" fill="none" stroke="#333" stroke-width="2"/>
          <text x="1273" y="58" text-anchor="middle" font-family="system-ui" font-size="16" fill="#666">AI</text>
          <!-- Mini nav items -->
          <rect x="32" y="124" width="21" height="30" rx="5" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="32" y="176" width="21" height="30" rx="5" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="32" y="231" width="21" height="30" rx="5" fill="none" stroke="#333" stroke-width="2"/>
          <!-- Mini user -->
          <ellipse cx="42" cy="781" rx="24" ry="21" fill="none" stroke="#333" stroke-width="2"/>
          <ellipse cx="42" cy="58" rx="24" ry="21" fill="none" stroke="#333" stroke-width="2"/>
          <!-- Header -->
          <line x1="77" y1="82" x2="1310" y2="82" stroke="#333" stroke-width="2"/>
          <!-- Content -->
          <text x="695" y="356" text-anchor="middle" font-family="system-ui" font-size="63" fill="#666">Content Area</text>
          <text x="695" y="434" text-anchor="middle" font-family="system-ui" font-size="63" fill="#666">SideBar Closed</text>
          <!-- Footer -->
          <line x1="78" y1="764" x2="1310" y2="764" stroke="#333" stroke-width="2"/>
          <text x="726" y="789" text-anchor="middle" font-family="system-ui" font-size="20" fill="#666">Footer</text>
        </svg>
      </div>
      <div class="design-info">
        <h3 class="design-card-title">Sidebar Closed</h3>
        <p class="design-card-description">Collapsed view with icon-only navigation</p>
      </div>
    </div>
    
    <!-- Mobile View -->
    <div class="design-card" class:animate={mounted}>
      <div class="design-preview">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 631 1125" class="design-svg mobile">
          <!-- Outer container -->
          <rect x="10" y="10" width="608" height="1105" rx="32" fill="none" stroke="#333" stroke-width="2"/>
          <!-- Header -->
          <line x1="11" y1="75" x2="614" y2="75" stroke="#333" stroke-width="2"/>
          <rect x="28" y="35" width="31" height="22" rx="5" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="115" y="29" width="123" height="27" rx="7" fill="none" stroke="#333" stroke-width="2"/>
          <rect x="281" y="27" width="118" height="35" rx="7" fill="none" stroke="#333" stroke-width="2"/>
          <circle cx="577" cy="42" r="28" fill="none" stroke="#333" stroke-width="2"/>
          <text x="577" y="47" text-anchor="middle" font-family="system-ui" font-size="16" fill="#666">AI</text>
          <!-- Content -->
          <text x="321" y="467" text-anchor="middle" font-family="system-ui" font-size="62" fill="#666">Content Area</text>
          <text x="321" y="545" text-anchor="middle" font-family="system-ui" font-size="62" fill="#666">Mobile View</text>
          <!-- Footer -->
          <line x1="16" y1="1072" x2="614" y2="1072" stroke="#333" stroke-width="2"/>
          <text x="309" y="1093" text-anchor="middle" font-family="system-ui" font-size="20" fill="#666">Footer</text>
        </svg>
      </div>
      <div class="design-info">
        <h3 class="design-card-title">Mobile View</h3>
        <p class="design-card-description">Bottom sheet navigation for mobile devices</p>
      </div>
    </div>
  </div>
</div>

<style>
  .design-section {
    width: 100%;
    max-width: 1200px;
  }
  
  .design-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .design-title {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    color: white;
    margin: 0 0 1rem 0;
    background: linear-gradient(135deg, #FF3E00 0%, #264DE4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .design-subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #aaa;
    margin: 0;
    font-style: italic;
    line-height: 1.6;
  }
  
  .design-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    width: 100%;
  }
  
  .design-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(20px);
    min-width: 0; /* Prevent overflow */
  }
  
  .design-card.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .design-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 62, 0, 0.3);
    box-shadow: 0 25px 50px rgba(255, 62, 0, 0.15);
  }
  
  .design-preview {
    width: 100%;
    height: 180px;
    margin-bottom: 1.5rem;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .design-svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-width: 100%;
  }
  
  .design-svg.mobile {
    width: 35%;
    height: 85%;
    object-fit: contain;
  }
  
  .design-info {
    text-align: center;
  }
  
  .design-card-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: white;
    margin: 0 0 0.8rem 0;
  }
  
  .design-card-description {
    color: #aaa;
    margin: 0;
    line-height: 1.5;
    font-size: 0.95rem;
  }
  
  @media (max-width: 768px) {
    .design-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .design-card {
      padding: 1.2rem;
      max-width: 100%;
    }
    
    .design-preview {
      height: 200px;
    }
    
    .design-svg.mobile {
      width: 50%;
      height: 90%;
    }
  }
  
  /* Ensure proper sizing on medium screens */
  @media (min-width: 769px) and (max-width: 1024px) {
    .design-grid {
      gap: 1.5rem;
    }
    
    .design-card {
      padding: 1.2rem;
    }
    
    .design-preview {
      height: 160px;
    }
    
    .design-svg.mobile {
      width: 30%;
      height: 80%;
    }
  }
  
  /* Design card animation delays */
  .design-card:nth-child(1) { transition-delay: 0.1s; }
  .design-card:nth-child(2) { transition-delay: 0.2s; }
  .design-card:nth-child(3) { transition-delay: 0.3s; }
</style>