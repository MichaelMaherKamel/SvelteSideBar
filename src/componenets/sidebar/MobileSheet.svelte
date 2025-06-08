<!-- MobileSheet.svelte - Updated with runes approach -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import UserMenu from './UserMenu.svelte';

  // Define all props using the $props() rune
  let {
    navigationItems = [],
    user = { name: 'User', email: 'user@example.com', avatar: null, role: 'Admin' },
    logo = null,
    appName = 'Dashboard',
    activeItemId = null,
    navigate,
    userMenuAction,
    close,
    userMenuToggle
  } = $props<{
    navigationItems?: any[],
    user?: { name: string, email: string, avatar: null | string, role: string },
    logo?: string | null,
    appName?: string,
    activeItemId?: string | null,
    navigate?: (data: { item: any }) => void,
    userMenuAction?: (data: { action: string }) => void,
    close?: () => void,
    userMenuToggle?: (data: { isOpen: boolean }) => void
  }>();

  let currentTheme = $state('dark');
  let sheetElement: HTMLElement;
  let userMenuOpen = $state(false);

const handleNavigation = (item: any) => {
  // 1. Scroll immediately
  requestAnimationFrame(() => {
    // Try all possible scroll containers
    const contentBody = document.querySelector('.content-body');
    const mainElement = document.querySelector('main');
    
    if (contentBody) contentBody.scrollTop = 0;
    if (mainElement) mainElement.scrollTop = 0;
    
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  });

  // 2. Navigate
  if (navigate) navigate({ item });
  
  // 3. Close the mobile sheet
  if (close) close();
};

  const handleUserMenuAction = (event: CustomEvent) => {
    // Forward user menu action to parent
    if (userMenuAction) userMenuAction({ action: event.detail.action });
    // Close sheet after action
    if (close) close();
  };

  // Track user menu state for proper event handling
  const handleUserMenuToggle = (event: CustomEvent) => {
    userMenuOpen = event.detail.isOpen;
    if (userMenuToggle) userMenuToggle({ isOpen: event.detail.isOpen });
  };

  const handleClose = () => {
    if (close) close();
  };

  // Focus management
  onMount(() => {
    // Focus the first navigation item for accessibility
    const firstNavItem = sheetElement.querySelector('.nav-link');
    if (firstNavItem) {
      (firstNavItem as HTMLElement).focus();
    }

    // Trap focus within the sheet
    const focusableElements = sheetElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If user menu is open, close it first, don't close the sheet
        if (userMenuOpen) {
          userMenuOpen = false;
          return;
        }
        // If user menu is closed, close the sheet
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            (lastFocusable as HTMLElement).focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            (firstFocusable as HTMLElement).focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div
  class="mobile-sheet"
  bind:this={sheetElement}
  transition:fly={{ y: 100, duration: 300 }}
  role="dialog"
  aria-modal="true"
  aria-label="Mobile navigation"
>
  <!-- Drag Handle -->
  <div class="drag-handle"></div>

  <!-- Sheet Header -->
  <div class="sheet-header">
    <div class="site-brand">
       <a class="brand" href="/" data-sveltekit-preload-data="off">
      <div class="site-logo">
        {#if logo}
          <img src={logo} alt={appName} class="logo" />
        {:else}
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" width="24" height="24">
              <path fill="#FF3E00" d="M85.95 13.231c-9.29-13.29-27.64-17.23-40.907-8.78l-23.3 14.845a26.7 26.7 0 0 0-7.922 7.66 27 27 0 0 0-2.61 4.885 26.8 26.8 0 0 0-1.546 5.32 28.1 28.1 0 0 0-.123 9.27 28 28 0 0 0 2.893 8.808 27 27 0 0 0-2.505 4.79 26.6 26.6 0 0 0-1.488 5.196 28.44 28.44 0 0 0 2.05 16.634 28.4 28.4 0 0 0 2.819 4.91C22.6 100.06 40.95 104 54.218 95.55l23.298-14.782a26.8 26.8 0 0 0 12.078-17.865 28.13 28.13 0 0 0-2.777-18.07c.496-.752.955-1.532 1.374-2.331a27 27 0 0 0 2.011-5.02 27 27 0 0 0 .618-2.634 28.6 28.6 0 0 0-.262-11.263 28.5 28.5 0 0 0-4.607-10.28"/>
              <path fill={currentTheme === 'dark' ? 'white' : '#333'} d="M42.766 88.055a18.51 18.51 0 0 1-16.005-3.292 18.5 18.5 0 0 1-3.864-4.076 17.1 17.1 0 0 1-3.185-9.56 17 17 0 0 1 .372-3.937q.058-.273.129-.54a15 15 0 0 1 .316-1.067l.438-1.34 1.197.892a30 30 0 0 0 4.352 2.644q1.141.57 2.327 1.038 1.185.47 2.407.838l.893.26-.08.892a5.24 5.24 0 0 0 .509 2.656q.198.412.464.783a5.6 5.6 0 0 0 2.645 2.048 5.57 5.57 0 0 0 3.714.052q.187-.064.364-.144a5 5 0 0 0 .691-.366L63.714 60.99a4.8 4.8 0 0 0 1.439-1.393 4.8 4.8 0 0 0 .75-1.856q.089-.51.076-1.025a5.1 5.1 0 0 0-.456-1.992 5 5 0 0 0-.514-.888 5.6 5.6 0 0 0-2.644-2.046 5.6 5.6 0 0 0-3.342-.169 5 5 0 0 0-1.09.43q-.173.09-.338.196L48.66 57.92q-.547.346-1.118.651-.573.303-1.165.564a17 17 0 0 1-1.206.474q-.611.215-1.236.383a18.5 18.5 0 0 1-11.072-.568 18.5 18.5 0 0 1-8.762-6.792 17 17 0 0 1-1.687-2.954 17.07 17.07 0 0 1-1.216-9.997 16.07 16.07 0 0 1 7.263-10.773l23.335-14.844q.544-.346 1.112-.651.57-.304 1.159-.565t1.198-.474q.607-.215 1.23-.384a18.5 18.5 0 0 1 5.587-.57 18.53 18.53 0 0 1 10.41 3.862 18.6 18.6 0 0 1 3.863 4.078 17.1 17.1 0 0 1 2.775 6.18c.25 1.11.39 2.241.415 3.378a17 17 0 0 1-.26 3.393q-.052.276-.114.55-.06.272-.13.544-.068.273-.147.54-.076.271-.163.536l-.446 1.34-1.189-.892a30 30 0 0 0-4.363-2.666a30.5 30.5 0 0 0-4.749-1.89l-.894-.258.082-.893a5.25 5.25 0 0 0-.949-3.467 5.5 5.5 0 0 0-1.166-1.202 5.55 5.55 0 0 0-5.156-.836 6 6 0 0 0-.366.143q-.179.079-.352.17a5 5 0 0 0-.34.197l-23.306 14.82q-.428.269-.79.62-.361.353-.646.77a4.9 4.9 0 0 0-.753 1.851 5.3 5.3 0 0 0-.075 1.027c.02.688.175 1.366.456 1.994q.213.47.513.892c.322.46.712.871 1.158 1.215s.94.621 1.467.818a5.6 5.6 0 0 0 3.315.182 6 6 0 0 0 .374-.117q.184-.066.364-.144t.352-.17a5 5 0 0 0 .339-.195l8.934-5.662q-.547-.352 1.12-.658a16.4 16.4 0 0 1 3.615-1.424 18.5 18.5 0 0 1 5.587-.574 18.47 18.47 0 0 1 10.41 3.86 18.5 18.5 0 0 1 3.863 4.074 17.2 17.2 0 0 1 2.773 6.181 17.1 17.1 0 0 1 .157 6.77 16.1 16.1 0 0 1-4.637 8.712 16 16 0 0 1-2.626 2.061L47.499 85.973q-.549.35-1.12.655t-1.168.566q-.594.263-1.207.477-.611.216-1.238.384"/>
          </svg>
        {/if}
      </div>
      <h2 class="site-name">{appName}</h2>
        </a>
    </div>
    <button
      class="close-button"
      onclick={handleClose}
      aria-label="Close navigation menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>

  <!-- Sheet Content -->
  <div class="sheet-content">
    <nav class="mobile-nav">
      <ul class="nav-list">
        {#each navigationItems as item}
          <li class="nav-item">
            <button
              class="nav-link"
              class:active={activeItemId === item.id}
              onclick={() => handleNavigation(item)}
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
              <span class="nav-label">{item.label}</span>
              {#if item.badge}
                <span class="nav-badge">{item.badge}</span>
              {/if}
            </button>
          </li>
        {/each}
      </ul>
    </nav>
  </div>

  <!-- Sheet Footer / User Menu Section -->
  <div class="sheet-footer">
    <div class="mobile-user-wrapper">
      <UserMenu
        {user}
        isOpen={true}
        position="top"
        isDropdownOpen={userMenuOpen}
        on:menuAction={handleUserMenuAction}
        on:toggle={handleUserMenuToggle}
      />
    </div>
  </div>
</div>

<style>
  .mobile-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--bg-elevated, #1f1f1f);
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    z-index: 999;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border-color, #333);
    border-bottom: none;
    transition: transform 0.3s ease;
    /* touch-action: pan-y;  <-- REMOVED as it's not needed without swipe-to-close */
  }

  .drag-handle {
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2.25rem;
    height: 0.25rem;
    background-color: var(--text-muted, rgba(255, 255, 255, 0.5));
    border-radius: 0.125rem;
    z-index: 10;
  }

  .sheet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 1.25rem;
    border-bottom: 1px solid var(--border-color, #333);
    position: relative;
  }

  .brand {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    padding-left: 5px;
    text-decoration: none;
  }

  .site-logo {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color, #3b82f6);
  }

  .logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .site-name {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color, white);
  }

  .close-button {
    background: none;
    border: none;
    color: var(--text-muted, rgba(255, 255, 255, 0.7));
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .close-button:hover {
    background-color: var(--primary-muted, rgba(255, 255, 255, 0.1));
    color: var(--primary-color, #3b82f6);
  }

  .sheet-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    scrollbar-width: thin;
    scrollbar-color: var(--border-color, #333) transparent;
  }

  .sheet-content::-webkit-scrollbar {
    width: 0.375rem;
  }

  .sheet-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .sheet-content::-webkit-scrollbar-thumb {
    background-color: var(--border-color, #333);
    border-radius: 0.1875rem;
  }

  .sheet-footer {
    padding: 1rem 1.5rem 1.5rem;
    border-top: 1px solid var(--border-color, #333);
  }

  .mobile-user-wrapper {
    /* Reset any potential conflicts and ensure full width */
    width: 100%;
  }

  .mobile-nav {
    margin-bottom: 1rem;
  }

  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.5rem;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background: none;
    border: none;
    color: var(--text-muted, rgba(255, 255, 255, 0.7));
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border-radius: 0.75rem;
    position: relative;
    text-align: left;
  }

  .nav-link:hover {
    background-color: var(--primary-muted, rgba(255, 255, 255, 0.1));
    color: var(--primary-color, #3b82f6);
  }

  .nav-link.active {
    background-color: var(--primary-muted, rgba(255, 255, 255, 0.1));
    color: var(--primary-color, #3b82f6);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .nav-icon svg {
    stroke: currentColor;
  }

  .nav-label {
    flex: 1;
    font-size: 1rem;
    font-weight: 500;
  }

  .nav-badge {
    background-color: var(--primary-color, #3b82f6);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    min-width: 1.5rem;
    text-align: center;
  }

  /* Ensure UserMenu styles work well in mobile context */
  .mobile-user-wrapper :global(.user-menu) {
    width: 100%;
  }

  .mobile-user-wrapper :global(.user-menu-button) {
    width: 100%;
    padding: 1rem;
    border-radius: 0.75rem;
  }

  .mobile-user-wrapper :global(.user-menu-button:hover) {
    background-color: var(--primary-muted, rgba(255, 255, 255, 0.1));
  }

  /* Position dropdown to appear above the footer */
  .mobile-user-wrapper :global(.dropdown-menu) {
    position: fixed;
    bottom: auto;
    top: auto;
    left: 1rem;
    right: 1rem;
    width: auto;
    min-width: 0;
  }

  .mobile-user-wrapper :global(.dropdown-menu.menu-top) {
    bottom: 8rem; /* Position above the footer */
    top: auto;
  }

  /* Ensure proper spacing for mobile */
  .mobile-user-wrapper :global(.user-details) {
    margin-left: 12px;
  }

  .mobile-user-wrapper :global(.dropdown-arrow) {
    margin-left: auto;
  }
</style>