<!-- src/routes/sidebar/+layout.svelte - With theme support -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { user } from '$lib/stores/user';
  let { children } = $props();
  // Import dashboard components
  import Sidebar from '../../componenets/sidebar/Sidebar.svelte';
  import Content from '../../componenets/sidebar/Content.svelte';
  import MobileSheet from '../../componenets/sidebar/MobileSheet.svelte';

  // Import types from the shared file
  import type { NavigationItem } from '$lib/index';
  
  // State using Svelte 5 runes
  let isSidebarOpen = $state(true);
  let showMobileSheet = $state(false);
  let mobileUserMenuOpen = $state(false);
  let currentTheme = $state('dark');
  
  // Navigation items - keeping your /sidebar URLs
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      url: '/sidebar',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard">
        <rect width="7" height="9" x="3" y="3" rx="1"/>
        <rect width="7" height="5" x="14" y="3" rx="1"/>
        <rect width="7" height="9" x="14" y="12" rx="1"/>
        <rect width="7" height="5" x="3" y="16" rx="1"/>
      </svg>`
    },
    {
      id: 'projects',
      label: 'Projects',
      url: '/sidebar/projects',
      badge: '3',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
      </svg>`
    },
    {
      id: 'team',
      label: 'Team',
      url: '/sidebar/team',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>`
    },
    {
      id: 'settings',
      label: 'Settings',
      url: '/sidebar/settings',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>`
    }
  ];
  
  // App details
  const appName = 'SvelteSideBar';
  const logo: string | null = null;
  
  // Breadcrumb interface
  interface Breadcrumb {
    label: string;
    url: string | null;
  }
  
  // FIXED: Better active item detection logic - using $derived.by() instead of $derived()
  const currentRoute = $derived($page.url.pathname);
  
  const activeItemId = $derived.by(() => {
    console.log('🔍 Current route:', currentRoute);
    console.log('📋 Available navigation items:', navigationItems.map(item => ({ id: item.id, url: item.url })));
    
    // Sort navigation items by URL length (longest first) to match more specific routes first
    const sortedItems = [...navigationItems].sort((a, b) => b.url.length - a.url.length);
    console.log('🔀 Sorted items:', sortedItems.map(item => ({ id: item.id, url: item.url })));
    
    // Find the first item whose URL matches the current route
    for (const item of sortedItems) {
      console.log(`🔎 Checking item "${item.id}" with URL "${item.url}" against route "${currentRoute}"`);
      
      if (currentRoute === item.url) {
        console.log('✅ EXACT MATCH found:', item.id, 'for route:', currentRoute);
        return item.id;
      }
      
      if (item.url !== '/sidebar' && currentRoute.startsWith(item.url + '/')) {
        console.log('✅ PREFIX MATCH found:', item.id, 'for route:', currentRoute);
        return item.id;
      }
    }
    
    // Default to dashboard for /sidebar base route
    console.log('🏠 No matches found, defaulting to dashboard for route:', currentRoute);
    return 'dashboard';
  });
  
  // Generate breadcrumbs based on the current route
  const breadcrumbs = $derived(generateBreadcrumbs(currentRoute));
  
  // Get current page title based on active navigation item
  const currentPage = $derived(
    navigationItems.find(item => item.id === activeItemId)?.label || 'Dashboard'
  );
  
  // Navigation handler - use SvelteKit navigation
  function handleNavigation(data: { item: NavigationItem }): void {
    const itemUrl = data.item.url;
    console.log('🚀 Navigating to:', itemUrl);
    console.log('📊 Item details:', data.item);
    goto(itemUrl);
    
    // Close mobile sheet if open
    if (showMobileSheet) {
      showMobileSheet = false;
    }
  }
  
  // User menu action handler
  function handleUserMenuAction(data: { action: string }): void {
    const { action } = data;
    
    switch (action) {
      case 'profile':
        goto('#');
        break;
      case 'settings':
        goto('#');
        break;
      case 'preferences':
        goto('#');
        break;
      case 'help':
        goto('#');
        break;
      case 'logout':
       
        break;
      default:
        console.log('Unknown user menu action:', action);
    }
  }
  
  // Generate breadcrumbs based on the current route
  function generateBreadcrumbs(route: string): Breadcrumb[] {
    if (route === '/sidebar') return [];
    
    const paths = route.split('/').filter(Boolean);
    let currentPath = '';
    
    return paths.map((path, index) => {
      currentPath += `/${path}`;
      
      // Skip the first "sidebar" segment in breadcrumbs
      if (path === 'sidebar' && index === 0) {
        return null;
      }
      
      // Find matching navigation item for proper label
      const navItem = navigationItems.find(item => item.url === currentPath);
      const label = navItem ? navItem.label : path.charAt(0).toUpperCase() + path.slice(1);
      
      return {
        label,
        url: index === paths.length - 1 ? null : currentPath
      };
    }).filter(Boolean) as Breadcrumb[];
  }
  
  // Toggle functions
  function toggleSidebar(): void {
    if (window.matchMedia('(max-width: 48rem)').matches) {
      showMobileSheet = !showMobileSheet;
    } else {
      isSidebarOpen = !isSidebarOpen;
    }
  }
  
  function closeMobileSheet(): void {
    showMobileSheet = false;
  }
  
  function handleAIClick(): void {
    // Implement AI assistant feature
    console.log('AI Assistant clicked');
  }
  
  // Keyboard handler for accessibility
  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      closeMobileSheet();
    }
  }
  
  // Handle mobile sheet overlay click
  function handleOverlayClick(): void {
    // If user menu is open in mobile, close it first
    if (mobileUserMenuOpen) {
      mobileUserMenuOpen = false;
      return;
    }
    // Otherwise close the mobile sheet
    closeMobileSheet();
  }
  
  // Track mobile user menu state
  function handleMobileUserMenuToggle(data: { isOpen: boolean }): void {
    mobileUserMenuOpen = data.isOpen;
  }
  
  onMount(() => {
    // Initial sidebar state based on screen size
    if (window.matchMedia('(max-width: 48rem)').matches) {
      isSidebarOpen = false;
    }
    
    // Initialize theme state
    if (typeof window !== 'undefined') {
      currentTheme = window.getCurrentTheme();
      
      // Listen for theme changes
      window.addEventListener('themechange', ((e: CustomEvent) => {
        currentTheme = e.detail.theme;
      }) as EventListener);
    }
    
    // Handle window resize to properly manage mobile sheet and sidebar states
    const handleResize = () => {
      const isMobile = window.matchMedia('(max-width: 48rem)').matches;
      
      if (isMobile) {
        // Switched to mobile view
        isSidebarOpen = false;
      } else {
        // Switched to desktop view
        showMobileSheet = false; // Always close mobile sheet on desktop
        mobileUserMenuOpen = false; // Close mobile user menu
        isSidebarOpen = true; // Show desktop sidebar
      }
    };
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (typeof window !== 'undefined') {
        window.removeEventListener('themechange', ((e: CustomEvent) => {
          currentTheme = e.detail.theme;
        }) as EventListener);
      }
    };
  });
</script>

<div class="dashboard-container" class:theme-light={currentTheme === 'light'} class:theme-dark={currentTheme === 'dark'}>
  <!-- Desktop Sidebar, hidden on mobile with CSS -->
  <div class="sidebar-wrapper">
    <Sidebar 
      {navigationItems} 
      user={$user}
      {logo}
      {appName}
      isOpen={isSidebarOpen}
      activeItemId={activeItemId}
      navigate={handleNavigation}
      userMenuAction={handleUserMenuAction}
    />
  </div>
  
  <!-- Main Content Area with rounded corners -->
  <main 
    class="content-area" 
    class:sidebar-open={isSidebarOpen}
    class:sidebar-closed={!isSidebarOpen}
  >
    <Content 
      breadcrumbs={breadcrumbs}
      currentPage={currentPage}
      showAI={true}
      toggleSidebar={toggleSidebar}
      aiClick={handleAIClick}
      isSidebarOpen={isSidebarOpen}
    >
      {@render children()}
    </Content>
  </main>
  
  <!-- Mobile Sheet, only shown when active -->
  {#if showMobileSheet}
    <MobileSheet 
      {navigationItems} 
      user={$user}
      {logo}
      {appName}
      activeItemId={activeItemId}
      navigate={handleNavigation}
      userMenuAction={handleUserMenuAction}
      close={closeMobileSheet}
      userMenuToggle={handleMobileUserMenuToggle}
    />
    
    <!-- Mobile Sheet Overlay -->
    <div 
      class="mobile-overlay" 
      role="button" 
      tabindex="0"
      aria-label="Close menu overlay"
      onclick={handleOverlayClick}
      onkeydown={handleKeyDown}
    ></div>
  {/if}
</div>

<style>
  .dashboard-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100svh;
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    padding: 5px;
    box-sizing: border-box;
    transition: background-color 0.3s ease;
  }
  
  /* Theme-specific styles */
  .theme-dark {
    background-color: #222;
  }
  
  .theme-light {
    background-color: #f0f2f5;
  }
  
  .sidebar-wrapper {
    position: relative;
    z-index: 100;
    display: block;
    height: 100svh;
  }
  
  .content-area {
    flex: 1;
    display: flex;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    overflow: hidden;
    height: 97svh;
    margin-top: 5px;
    margin-left: 5px;
  }
  
  .theme-dark .content-area {
    border: 2px solid #333;
  }
  
  .theme-light .content-area {
    border: 2px solid var(--border-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .sidebar-closed {
    margin-left: 0;
  }
  
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
  
  /* Hide sidebar on mobile */
  @media (width < 48rem) {
    .sidebar-wrapper {
      display: none;
    }
    
    .content-area {
      margin-left: 0;
    }
  }
  
  /* Full edge-to-edge on mobile */
  @media (width < 48rem) {
    .dashboard-container {
      padding: 5px 5px 10px 5px;
      height: 100svh;
    }
    
    .content-area {
      height: 97svh;
    }
    
    .theme-dark .content-area {
      border: 2px solid #333;
    }
    
    .theme-light .content-area {
      border: 2px solid var(--border-color);
    }
  }
</style>