<script lang="ts">
  import { onMount } from 'svelte';
  import type { Breadcrumb, ThemeType, ThemeChangeEvent } from '$lib/index';
  
  // Props using runes
  let {
    breadcrumbs = [],
    currentPage = 'Dashboard',
    showAI = true,
    toggleSidebar,
    aiClick,
    children,
    isSidebarOpen = true
  } = $props<{
    breadcrumbs?: Breadcrumb[],
    currentPage?: string,
    showAI?: boolean,
    toggleSidebar?: () => void,
    aiClick?: () => void,
    children?: any,
    isSidebarOpen?: boolean
  }>();
  
  // Track current theme
  let currentTheme = $state<ThemeType>('dark');
  
  onMount(() => {
    // Initialize theme state from the store
    if (typeof window !== 'undefined') {
      currentTheme = window.getCurrentTheme();
      
      // Listen for theme changes
      window.addEventListener('themechange', ((e: ThemeChangeEvent) => {
        currentTheme = e.detail.theme;
      }) as EventListener);
    }
  });
  
  // Handle toggle sidebar
  function handleToggleSidebar(): void {
    if (toggleSidebar) toggleSidebar();
  }
  
  // Handle AI click
  function handleAIClick(): void {
    if (aiClick) aiClick();
  }
  
  // Toggle theme
  function toggleTheme(): void {
    if (typeof window !== 'undefined') {
      currentTheme = window.toggleTheme();
    }
  }
</script>

<div class="content-container">
  <!-- Content remains the same as before -->
  <div class="content-wrapper">
    <!-- Header area -->
    <header class="content-header">
      <div class="header-left">
        <button 
          class="toggle-sidebar-btn"
          onclick={handleToggleSidebar}
          aria-label="Toggle sidebar"
        >
          {#if isSidebarOpen}
            <!-- Icons for larger screens (lg/md) -->
            <div class="icon-set-lg-md">
              <!-- Sidebar Open Icon (indicates closing action) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-open">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M15 3v18"/>
                <path d="m10 15-3-3 3-3"/>
              </svg>
            </div>
            <!-- Icons for small screens (sm) -->
            <div class="icon-set-sm">
              <!-- X icon for small screens (sidebar is open, click to close) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                <path d="M18 6 6 18"/>
                <path d="M6 6 18 18"/>
              </svg>
            </div>
          {:else}
            <!-- Icons for larger screens (lg/md) -->
            <div class="icon-set-lg-md">
              <!-- Sidebar Closed Icon (indicates opening action) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-close">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M15 3v18"/>
                <path d="m8 9 3 3-3 3"/>
              </svg>
            </div>
            <!-- Icons for small screens (sm) -->
            <div class="icon-set-sm">
              <!-- Hamburger icon for small screens (sidebar is closed, click to open) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
                <line x1="4" y1="12" x2="20" y2="12"/>
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="18" x2="20" y2="18"/>
              </svg>
            </div>
          {/if}
        </button>
        
        <div class="header-separator"></div>
        
        <!-- Breadcrumbs -->
        <div class="breadcrumbs">
          {#if breadcrumbs && breadcrumbs.length > 0}
            {#each breadcrumbs as crumb, i}
              <span class="breadcrumb-item">
                {#if i < breadcrumbs.length - 1}
                  <a href={crumb.url || '#'} class="breadcrumb-link">{crumb.label}</a>
                  <span class="breadcrumb-separator">/</span>
                {:else}
                  <span class="breadcrumb-current">{crumb.label}</span>
                {/if}
              </span>
            {/each}
          {:else}
            <span class="breadcrumb-current">{currentPage}</span>
          {/if}
        </div>
      </div>
      
      <div class="header-right">
        <!-- AI Assistant Button -->
        {#if showAI}
          <button 
            class="ai-button btn btn-primary"
            onclick={handleAIClick}
            aria-label="AI Assistant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot">
              <path d="M12 8V4H8"/>
              <rect width="16" height="12" x="4" y="8" rx="2"/>
              <path d="M2 14h2"/>
              <path d="M20 14h2"/>
              <path d="M15 13v2"/>
              <path d="M9 13v2"/>
            </svg>
            <span>AI Assistant</span>
          </button>
        {/if}
      </div>
    </header>
    
    <!-- Scrollable content area -->
    <main class="content-body">
      {@render children?.()}
    </main>
    
    <!-- Footer area -->
    <footer class="content-footer">
      <div class="footer-left">
        <span class="copyright">© 2025 SvelteSideBar</span>
      </div>
      
      <div class="footer-right">
        <!-- Theme Toggle -->
        <button 
          class="theme-toggle" 
          onclick={toggleTheme}
          aria-label="Toggle theme"
        >
          {#if currentTheme === 'dark'}
            <!-- Sun icon for dark mode (switch to light) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          {:else}
            <!-- Moon icon for light mode (switch to dark) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          {/if}
        </button>
        
        <div class="footer-separator"></div>
        
        <a href="https://github.com/MichaelMaherKamel/SvelteSideBar" target="_blank" class="github-link" aria-label="View on GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="github-icon">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </footer>
  </div>
</div>

<style>
  /* No changes to original styles - they use your CSS variables */
  .content-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  
  .content-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: var(--bg-color);
    border-radius: 12px;
    overflow: hidden; /* Keep everything inside the rounded corners */
  }
  
  .content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background-color: var(--bg-surface);
    border-bottom: 1px solid var(--border-color);
    height: 45px; /* Exact height to match sidebar header */
    flex-shrink: 0; /* Prevent header from shrinking */
  }
  
  .header-left {
    display: flex;
    align-items: center;
  }
  
  .toggle-sidebar-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: all 0.2s;
    display: flex; /* Use flex to align child icon sets */
    align-items: center;
    justify-content: center;
  }
  
  .toggle-sidebar-btn:hover {
    background-color: var(--bg-elevated);
    color: var(--text-color);
  }
  
  .header-separator {
    width: 1px;
    height: 20px;
    background-color: var(--border-color);
    margin: 0 12px;
  }
  
  .breadcrumbs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .breadcrumb-item {
    display: flex;
    align-items: center;
    color: var(--text-muted);
    font-size: 13px;
  }
  
  .breadcrumb-link {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .breadcrumb-link:hover {
    color: var(--text-color);
    text-decoration: underline;
  }
  
  .breadcrumb-separator {
    margin: 0 8px;
    color: var(--border-color);
  }
  
  .breadcrumb-current {
    color: var(--text-color);
    font-size: 15px;
    font-weight: 500;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  /* Enhanced AI button using gradient primary */
  .ai-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--primary-gradient);
    color: var(--primary-text-contrast);
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .ai-button:hover {
    background: var(--primary-gradient-hover);
    transform: translateY(-1px);
    box-shadow: var(--button-shadow);
  }
  
  .content-body {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border-color) transparent;
  }
  
  .content-body::-webkit-scrollbar {
    width: 6px;
  }
  
  .content-body::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .content-body::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 3px;
  }
  
  .content-body::-webkit-scrollbar-thumb:hover {
    background-color: var(--border-hover);
  }
  
  .content-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background-color: var(--bg-surface);
    border-top: 1px solid var(--border-color);
    font-size: 12px;
    color: var(--text-muted);
    height: 30px; /* Exact height to match sidebar footer */
    flex-shrink: 0; /* Prevent footer from shrinking */
  }
  
  .footer-left {
    display: flex;
    align-items: center;
  }
  
  .footer-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }
  
  .theme-toggle:hover {
    color: var(--text-color);
    background-color: var(--bg-elevated);
  }
  
  .theme-icon {
    width: 16px;
    height: 16px;
  }
  
  .footer-separator {
    width: 1px;
    height: 16px;
    background-color: var(--border-color);
  }
  
  .github-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 6px;
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  .github-link:hover {
    color: var(--text-color);
    background-color: var(--bg-elevated);
    transform: translateY(-1px);
  }
  
  .github-icon {
    width: 16px;
    height: 16px;
  }
  
  /* Mobile styles using standardized breakpoints */
  /* Hide the small screen icons by default on large/medium screens */
  .icon-set-sm {
    display: none;
  }

  @media (width < 48rem) { /* This corresponds to 'sm' breakpoint */
    .content-container {
      padding: 0;
    }
    
    .content-wrapper {
      border-radius: 0;
    }
    
    .content-header {
      padding: 0 12px;
      height: 50px;
    }
    
    .content-body {
      padding: 16px;
    }
    
    .ai-button span {
      display: none;
    }
    
    .ai-button {
      padding: 8px;
    }
    
    .header-separator {
      display: none;
    }

    /* On small screens, hide the large/medium icons and show the small screen icons */
    .icon-set-lg-md {
      display: none;
    }

    .icon-set-sm {
      display: block; /* Show the hamburger/X icon */
    }
  }
  
  /* Extra small screens */
  @media (width < 30rem) {
    .content-body {
      padding: 12px;
    }
  }
</style>