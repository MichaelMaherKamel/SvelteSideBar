<script lang="ts">
  import UserMenu from './UserMenu.svelte';
  import { type NavigationItem } from '$lib';
  import { onMount } from 'svelte';

  // Define all props using the $props() rune
  let { 
    navigationItems = [], 
    user = { name: 'User', email: 'user@example.com', avatar: null, role: 'Admin' },
    logo = null,
    appName = 'Dashboard',
    isOpen = true,
    activeItemId = null,
    navigate,
    userMenuAction
  } = $props<{
    navigationItems?: NavigationItem[],
    user?: { name: string, email: string, avatar: null | string, role: string },
    logo?: string | null,
    appName?: string,
    isOpen?: boolean,
    activeItemId?: string | null,
    navigate?: (data: { item: any }) => void,
    userMenuAction?: (data: { action: string }) => void
  }>();

  // Theme state
  let currentTheme = $state('dark');
  
  onMount(() => {
    // Initialize theme state if in browser
    if (typeof window !== 'undefined') {
      currentTheme = window.getCurrentTheme();
      
      // Listen for theme changes
      window.addEventListener('themechange', ((e: CustomEvent) => {
        currentTheme = e.detail.theme;
      }) as EventListener);
    }
    
    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('themechange', ((e: CustomEvent) => {
          currentTheme = e.detail.theme;
        }) as EventListener);
      }
    };
  });

  // Handlers that call the callback props
  const handleNavigation = (item: any) => {
    // Immediately scroll to top when navigation is triggered
    scrollToTop();
    
    // Then navigate
    if (navigate) navigate({ item });
  };

  const handleUserMenuAction = (event: CustomEvent) => {
    const { action } = event.detail;
    if (userMenuAction) userMenuAction({ action });
  };
  
  // Function to scroll to top without animation
  function scrollToTop() {
    // Try to find the main content area first
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
    
    // Also try to find any element with overflow scroll in the content
    const scrollableContent = document.querySelector('[data-content-scroll]');
    if (scrollableContent) {
      scrollableContent.scrollTop = 0;
    }
    
    // Try to find the main element inside content area
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
    
    // Finally, also scroll the window to top as fallback
    window.scrollTo(0, 0);
    
    // Additional attempt to find any scrollable containers
    const allScrollables = document.querySelectorAll('*');
    allScrollables.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.overflow === 'auto' || style.overflow === 'scroll' || 
          style.overflowY === 'auto' || style.overflowY === 'scroll') {
        el.scrollTop = 0;
      }
    });
  }
</script>

<aside class="sidebar" class:open={isOpen} class:closed={!isOpen} class:theme-light={currentTheme === 'light'} class:theme-dark={currentTheme === 'dark'}>
  <!-- Logo and App Name Section -->
  <div class="sidebar-header">
    <a class="brand" href="/" data-sveltekit-preload-data="off">
      {#if logo}
        <img src={logo} alt={appName} class="logo" />
      {:else}
        <div class="logo-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" width="24" height="24">
              <path fill="#FF3E00" d="M85.95 13.231c-9.29-13.29-27.64-17.23-40.907-8.78l-23.3 14.845a26.7 26.7 0 0 0-7.922 7.66 27 27 0 0 0-2.61 4.885 26.8 26.8 0 0 0-1.546 5.32 28.1 28.1 0 0 0-.123 9.27 28 28 0 0 0 2.893 8.808 27 27 0 0 0-2.505 4.79 26.6 26.6 0 0 0-1.488 5.196 28.44 28.44 0 0 0 2.05 16.634 28.4 28.4 0 0 0 2.819 4.91C22.6 100.06 40.95 104 54.218 95.55l23.298-14.782a26.8 26.8 0 0 0 12.078-17.865 28.13 28.13 0 0 0-2.777-18.07c.496-.752.955-1.532 1.374-2.331a27 27 0 0 0 2.011-5.02 27 27 0 0 0 .618-2.634 28.6 28.6 0 0 0-.262-11.263 28.5 28.5 0 0 0-4.607-10.28"/>
              <path fill={currentTheme === 'dark' ? 'white' : '#333'} d="M42.766 88.055a18.51 18.51 0 0 1-16.005-3.292 18.5 18.5 0 0 1-3.864-4.076 17.1 17.1 0 0 1-3.185-9.56 17 17 0 0 1 .372-3.937q.058-.273.129-.54a15 15 0 0 1 .316-1.067l.438-1.34 1.197.892a30 30 0 0 0 4.352 2.644q1.141.57 2.327 1.038 1.185.47 2.407.838l.893.26-.08.892a5.24 5.24 0 0 0 .509 2.656q.198.412.464.783a5.6 5.6 0 0 0 2.645 2.048 5.57 5.57 0 0 0 3.714.052q.187-.064.364-.144a5 5 0 0 0 .691-.366L63.714 60.99a4.8 4.8 0 0 0 1.439-1.393 4.8 4.8 0 0 0 .75-1.856q.089-.51.076-1.025a5.1 5.1 0 0 0-.456-1.992 5 5 0 0 0-.514-.888 5.6 5.6 0 0 0-2.644-2.046 5.6 5.6 0 0 0-3.342-.169 5 5 0 0 0-1.09.43q-.173.09-.338.196L48.66 57.92q-.547.346-1.118.651-.573.303-1.165.564a17 17 0 0 1-1.206.474q-.611.215-1.236.383a18.5 18.5 0 0 1-11.072-.568 18.5 18.5 0 0 1-8.762-6.792 17 17 0 0 1-1.687-2.954 17.07 17.07 0 0 1-1.216-9.997 16.07 16.07 0 0 1 7.263-10.773l23.335-14.844q.544-.346 1.112-.651.57-.304 1.159-.565t1.198-.474q.607-.215 1.23-.384a18.5 18.5 0 0 1 5.587-.57 18.53 18.53 0 0 1 10.41 3.862 18.6 18.6 0 0 1 3.863 4.078 17.1 17.1 0 0 1 2.775 6.18c.25 1.11.39 2.241.415 3.378a17 17 0 0 1-.26 3.393q-.052.276-.114.55-.06.272-.13.544-.068.273-.147.54-.076.271-.163.536l-.446 1.34-1.189-.892a30 30 0 0 0-4.363-2.666a30.5 30.5 0 0 0-4.749-1.89l-.894-.258.082-.893a5.25 5.25 0 0 0-.949-3.467 5.5 5.5 0 0 0-1.166-1.202 5.55 5.55 0 0 0-5.156-.836 6 6 0 0 0-.366.143q-.179.079-.352.17a5 5 0 0 0-.34.197l-23.306 14.82q-.428.269-.79.62-.361.353-.646.77a4.9 4.9 0 0 0-.753 1.851 5.3 5.3 0 0 0-.075 1.027c.02.688.175 1.366.456 1.994q.213.47.513.892c.322.46.712.871 1.158 1.215s.94.621 1.467.818a5.6 5.6 0 0 0 3.315.182 6 6 0 0 0 .374-.117q.184-.066.364-.144t.352-.17a5 5 0 0 0 .339-.195l8.934-5.662q.547-.352 1.12-.658a16.4 16.4 0 0 1 3.615-1.424 18.5 18.5 0 0 1 5.587-.574 18.47 18.47 0 0 1 10.41 3.86 18.5 18.5 0 0 1 3.863 4.074 17.2 17.2 0 0 1 2.773 6.181 17.1 17.1 0 0 1 .157 6.77 16.1 16.1 0 0 1-4.637 8.712 16 16 0 0 1-2.626 2.061L47.499 85.973q-.549.35-1.12.655t-1.168.566q-.594.263-1.207.477-.611.216-1.238.384"/>
          </svg>
        </div>
      {/if}
      {#if isOpen}
        <span class="app-name">{appName}</span>
      {/if}
    </a>
  </div>

  <!-- Navigation Items -->
  <nav class="nav">
    <ul class="nav-list">
      {#each navigationItems as item}
        <li class="nav-item">
          <button
            class="nav-link"
            class:active={activeItemId === item.id}
            onclick={() => handleNavigation(item)}
            title={isOpen ? '' : item.label}
          >
            <div class="nav-icon">
              {#if item.id === 'dashboard'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard">
                  <rect width="7" height="9" x="3" y="3" rx="1"/>
                  <rect width="7" height="5" x="14" y="3" rx="1"/>
                  <rect width="7" height="9" x="14" y="12" rx="1"/>
                  <rect width="7" height="5" x="3" y="16" rx="1"/>
                </svg>
              {:else if item.id === 'analytics'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart">
                  <line x1="12" x2="12" y1="20" y2="10"/>
                  <line x1="18" x2="18" y1="20" y2="4"/>
                  <line x1="6" x2="6" y1="20" y2="16"/>
                </svg>
              {:else if item.id === 'projects'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder">
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                </svg>
              {:else if item.id === 'team'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              {:else if item.id === 'settings'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              {/if}
            </div>
            {#if isOpen}
              <span class="nav-label">{item.label}</span>
            {/if}
            {#if item.badge && isOpen}
              <span class="nav-badge">{item.badge}</span>
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  </nav>

  <!-- Sidebar Footer / User Menu Section -->
  <div class="sidebar-footer">
    <UserMenu
      {user}
      {isOpen}
      position="top"
      on:menuAction={handleUserMenuAction}
    />
  </div>
</aside>

<style>
  /* Disable smooth scrolling globally */
  :global(html) {
    scroll-behavior: auto !important;
  }
  
  :global(*) {
    scroll-behavior: auto !important;
  }

  .sidebar {
    height: 99svh;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  }
    
  .sidebar.open {
    width: 220px;
  }
  
  .sidebar.closed {
    width: 60px;
  }
  
  .sidebar-header {
    height: 65px;
    display: flex;
    align-items: center;
    padding: 0 0 0 15px;
  }
  
  .sidebar.closed .sidebar-header {
    padding: 0;
    justify-content: center;
  }
  
  .brand {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    padding-left: 5px;
    text-decoration: none;
  }
  
  .closed .brand {
    padding: 0;
    justify-content: center;
  }
  
  .logo-placeholder {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
  
  .app-name {
    margin-left: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .theme-dark .app-name {
    color: white;
  }
  
  .theme-light .app-name {
    color: #333;
  }
  
  .nav {
    flex: 1;
    padding: 12px 0;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .nav::-webkit-scrollbar {
    display: none;
  }
  
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  
  .nav-item {
    margin-bottom: 4px;
    padding: 0 12px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    width: 100%;
    background: none;
    border: none;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    border-radius: 6px;
    padding: 10px 12px;
    height: 40px;
    box-sizing: border-box;
    transition: all 0.2s ease;
    font-size: 0.9rem;
  }
  
  .theme-dark .nav-link {
    color: white;
  }
  
  .theme-light .nav-link {
    color: #333;
  }
  
  .theme-dark .nav-link:hover {
    background-color: var(--primary-muted);
    color: white;
  }
  
  .theme-light .nav-link:hover {
    background-color: var(--primary-muted);
    color: var(--primary-color);
  }
  
  .theme-dark .nav-link.active {
    background-color: var(--primary-muted);
    color: white;
    font-weight: 500;
  }
  
  .theme-light .nav-link.active {
    background-color: var(--primary-muted);
    color: var(--primary-color);
    font-weight: 500;
  }
  
  .nav-link.active .nav-icon {
    color: var(--primary-color);
  }
  
  .closed .nav-link {
    width: 40px;
    padding: 10px;
    border-radius: 50%;
    margin: 0 auto;
    justify-content: center;
  }
  
  .closed .nav-link.active,
  .closed .nav-link:hover {
    margin: 0 auto;
    width: 40px;
    height: 40px;
  }
  
  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: currentColor;
    transition: color 0.2s ease;
  }
  
  .nav-icon svg {
    stroke: var(--primary-color);
  }
  
  .nav-link.active .nav-icon svg {
    stroke: var(--primary-color);
  }
  
  .closed .nav-icon {
    margin: 0;
  }
  
  .nav-label {
    flex: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 12px;
  }
  
  .theme-dark .nav-label {
    color: white;
  }
  
  .theme-light .nav-label {
    color: #333;
  }
  
  .nav-badge {
    background-color: var(--primary-color);
    color: var(--primary-text-contrast);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px;
    text-align: center;
    margin-left: 8px;
  }
  
.sidebar-footer {
    display: flex;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
    min-height: 65px; /* Match header height */
    flex-shrink: 0; /* Prevent footer from shrinking */
  }
  
  .sidebar.closed .sidebar-footer {
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    min-height: 65px; /* Maintain same height */
    height: 65px;
  }
  
  /* Override the button styles for user menu in closed state */
  .sidebar.closed :global(.user-menu) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .sidebar.closed :global(.user-menu-button) {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  
  .sidebar.closed :global(.user-menu-button:hover) {
    background-color: var(--primary-muted);
  }
  
  /* Ensure the avatar stays centered */
  .sidebar.closed :global(.user-info) {
    width: auto;
    justify-content: center;
  }
  
  .sidebar.closed :global(.user-avatar) {
    margin: 0;
  }
  
  /* Hide text when collapsed */
  .closed .app-name,
  .closed .nav-label,
  .closed .nav-badge {
    display: none;
  }
  
  /* For collapsed state - perfect vertical alignment */
  .closed .brand {
    justify-content: center;
    width: 100%;
  }
  
  .closed .nav-link {
    padding: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  
  .closed .nav-icon,
  .closed .logo-placeholder {
    margin: 0;
  }
</style>