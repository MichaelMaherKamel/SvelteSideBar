<!-- UserMenu.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';

  // Define types for the user and menu items
  interface User {
    name: string;
    email: string;
    avatar: string | null;
    role: string;
  }

  interface MenuItem {
    id: string;
    label: string;
    icon: string;
    action: () => void;
    danger?: boolean;
    type?: undefined; // Explicitly undefined for non-divider items
  }

  interface MenuDivider {
    id: string;
    type: 'divider';
  }

  type MenuItemType = MenuItem | MenuDivider;
  
  // Using $props() instead of export let for Svelte 5 runes mode
  let {
    user = { name: 'User', email: 'user@example.com', avatar: null, role: 'Admin' },
    isOpen = true,
    position = 'bottom', // 'top' or 'bottom'
    isDropdownOpen = false // Allow parent to bind to this
  } = $props<{
    user?: User,
    isOpen?: boolean,
    position?: 'top' | 'bottom',
    isDropdownOpen?: boolean
  }>();
  
  let userMenuRef: HTMLElement | null; // Explicitly type userMenuRef as HTMLElement or null
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
      removeEventListeners();
    };
  });
  
  // Click outside functionality built-in
  function handleClickOutside(event: MouseEvent) { // Type event as MouseEvent
    if (userMenuRef && !userMenuRef.contains(event.target as Node) && isDropdownOpen) { // Cast event.target to Node
      closeDropdown();
    }
  }
  
  // Handle keyboard events
  function handleKeyDown(event: KeyboardEvent) { // Type event as KeyboardEvent
    if (event.key === 'Escape' && isDropdownOpen) {
      closeDropdown();
      event.stopPropagation(); // Prevent event from bubbling up
    }
  }
  
  // Mount and unmount event listeners
  function setupEventListeners() {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
      document.addEventListener('keydown', handleKeyDown, true);
    }
  }
  
  function removeEventListeners() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    }
  }
  
  // Setup listeners when dropdown opens, cleanup when it closes using $effect
  $effect(() => {
    if (isDropdownOpen) {
      setupEventListeners();
    } else {
      removeEventListeners();
    }
  });
  
  // Trigger menuAction event for parent components
  const dispatch = createEventDispatcher();
  
  const menuItems: MenuItemType[] = [ // Type menuItems array
    {
      id: 'profile',
      label: 'View Profile',
      icon: 'user',
      action: () => handleMenuAction('profile')
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: 'settings',
      action: () => handleMenuAction('settings')
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'sliders',
      action: () => handleMenuAction('preferences')
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'help-circle',
      action: () => handleMenuAction('help')
    },
    {
      id: 'divider',
      type: 'divider'
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: 'log-out',
      action: () => handleMenuAction('logout'),
      danger: true
    }
  ];
  
  function toggleDropdown() {
    const newState = !isDropdownOpen;
    isDropdownOpen = newState;
  }
  
  function closeDropdown() {
    isDropdownOpen = false;
  }
  
  function handleMenuAction(action: string) { // Type action as string
    closeDropdown();
    dispatch('menuAction', { action });
  }
  
  function getIcon(iconName: string): string { // Type iconName as string and return type as string
    const icons: Record<string, string> = { // Type the icons object
      'user': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      'settings': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
      'sliders': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg>`,
      'help-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
      'log-out': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
      'chevron-down': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
      'chevron-up': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>` // Added chevron-up SVG
    };
    return icons[iconName] || '';
  }
</script>

<div class="user-menu" 
     bind:this={userMenuRef} 
     class:theme-light={currentTheme === 'light'} 
     class:theme-dark={currentTheme === 'dark'}>
  <!-- User Menu Button -->
  <button 
    class="user-menu-button" 
    class:open={isDropdownOpen}
    class:collapsed={!isOpen}
    onclick={toggleDropdown}
    aria-expanded={isDropdownOpen}
    aria-haspopup="true"
    title={isOpen ? '' : `${user.name} - Open user menu`}
  >
    <div class="user-info">
      <!-- KEEP: User Avatar section in main button -->
      <div class="user-avatar">
        {#if user.avatar}
          <img src={user.avatar} alt={user.name} class="avatar-image" />
        {:else}
          <div class="avatar-placeholder">
            {user.name.charAt(0).toUpperCase()}
          </div>
        {/if}
      </div>
      
      {#if isOpen}
        <div class="user-details">
          <span class="user-name">{user.name}</span>
          <!-- KEEP: User Role span in main button -->
          <span class="user-role">{user.role}</span> 
        </div>
        
        <div class="dropdown-arrow" class:rotated={isDropdownOpen}>
          <!-- CHANGED: Icon to chevron-up -->
          {@html getIcon('chevron-up')}
        </div>
      {/if}
    </div>
  </button>
  
  <!-- Dropdown Menu -->
  {#if isDropdownOpen}
    <div 
      class="dropdown-menu" 
      class:menu-top={position === 'top'}
      class:menu-bottom={position === 'bottom'}
      role="menu"
      aria-labelledby="user-menu-button"
    >
      <div class="dropdown-header">
        <!-- REMOVED: Large User Avatar from dropdown header -->
        <div class="user-info-detailed">
          <div class="user-name-large">{user.name}</div>
          <div class="user-email">{user.email}</div>
          <!-- REMOVED: User Role badge from dropdown header -->
        </div>
      </div>
      
      <div class="dropdown-content">
        {#each menuItems as item}
          {#if item.type === 'divider'}
            <div class="menu-divider" role="separator"></div>
          {:else}
            <button 
              class="menu-item" 
              class:danger={(item as MenuItem).danger} 
              onclick={(item as MenuItem).action}
              role="menuitem"
            >
              <div class="menu-icon">
                {@html getIcon((item as MenuItem).icon)}
              </div>
              <span class="menu-label">{(item as MenuItem).label}</span>
            </button>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .user-menu {
    position: relative;
    width: 100%;
    transition: color 0.3s ease;
  }
  
  /* Theme-specific styles */
  .theme-dark {
    color: white;
  }
  
  .theme-light {
    color: #333;
  }
  
  .user-menu-button {
    display: flex;
    align-items: center;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    padding: 8px 12px;
    transition: all 0.2s ease;
    text-align: left;
  }
  
  .theme-dark .user-menu-button {
    color: white;
  }
  
  .theme-light .user-menu-button {
    color: #333;
  }
  
  .theme-dark .user-menu-button:hover {
    background-color: var(--primary-muted, rgba(255, 255, 255, 0.1));
  }
  
  .theme-light .user-menu-button:hover {
    background-color: var(--primary-muted, rgba(0, 0, 0, 0.05));
  }
  
  .theme-dark .user-menu-button.open {
    background-color: var(--primary-muted, rgba(255, 255, 255, 0.1));
  }
  
  .theme-light .user-menu-button.open {
    background-color: var(--primary-muted, rgba(0, 0, 0, 0.05));
  }
  
  .user-menu-button.collapsed {
    padding: 8px;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background-color: var(--primary-color, #3b82f6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    background-color: var(--primary-color, #3b82f6);
  }
  
  .user-details {
    flex: 1;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  
  .user-name {
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }
  
  .theme-dark .user-name {
    color: white;
  }
  
  .theme-light .user-name {
    color: #333;
  }
  
  .user-role {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }
  
  .theme-dark .user-role {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .theme-light .user-role {
    color: rgba(0, 0, 0, 0.6);
  }
  
  .dropdown-arrow {
    margin-left: 8px;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }
  
  .theme-dark .dropdown-arrow {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .theme-light .dropdown-arrow {
    color: rgba(0, 0, 0, 0.6);
  }
  
  .dropdown-arrow.rotated {
    transform: rotate(180deg);
  }
  
  .dropdown-menu {
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    min-width: 280px;
    overflow: hidden;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  
  .theme-dark .dropdown-menu {
    background: var(--dropdown-bg, #1f1f1f);
    border: 1px solid var(--border-color, #333);
  }
  
  .theme-light .dropdown-menu {
    background: white;
    border: 1px solid var(--border-color, #e0e0e0);
  }
  
  .dropdown-menu.menu-bottom {
    top: calc(100% + 8px);
  }
  
  .dropdown-menu.menu-top {
    bottom: calc(100% + 8px);
  }
  
  .dropdown-header {
    padding: 16px;
    display: flex;
    align-items: center; /* Ensures content is vertically centered */
    gap: 12px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  
  .theme-dark .dropdown-header {
    border-bottom: 1px solid var(--border-color, #333);
    background: var(--dropdown-header-bg, #2a2a2a);
  }
  
  .theme-light .dropdown-header {
    border-bottom: 1px solid var(--border-color, #e0e0e0);
    background: var(--dropdown-header-bg, #f5f5f5);
  }
  
  .user-info-detailed {
    flex: 1;
    min-width: 0;
  }
  
  .user-name-large {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  .theme-dark .user-name-large {
    color: white;
  }
  
  .theme-light .user-name-large {
    color: #333;
  }
  
  .user-email {
    font-size: 0.8rem;
    margin-bottom: 4px;
  }
  
  .theme-dark .user-email {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .theme-light .user-email {
    color: rgba(0, 0, 0, 0.6);
  }
  
  .dropdown-content {
    padding: 8px 0;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 12px 16px;
    text-align: left;
    transition: background-color 0.2s ease;
    font-size: 0.9rem;
  }
  
  .theme-dark .menu-item {
    color: white;
  }
  
  .theme-light .menu-item {
    color: #333;
  }
  
  .theme-dark .menu-item:hover {
    background-color: var(--item-hover-bg, rgba(255, 255, 255, 0.1));
  }
  
  .theme-light .menu-item:hover {
    background-color: var(--item-hover-bg, rgba(0, 0, 0, 0.05));
  }
  
  .menu-item.danger {
    color: #ef4444;
  }
  
  .theme-dark .menu-item.danger:hover {
    background-color: rgba(239, 68, 68, 0.1);
  }
  
  .theme-light .menu-item.danger:hover {
    background-color: rgba(239, 68, 68, 0.05);
  }
  
  .menu-icon {
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  
  .menu-label {
    flex: 1;
  }
  
  .menu-divider {
    height: 1px;
    margin: 8px 0;
    transition: background-color 0.3s ease;
  }
  
  .theme-dark .menu-divider {
    background-color: var(--border-color, #333);
  }
  
  .theme-light .menu-divider {
    background-color: var(--border-color, #e0e0e0);
  }
  
  /* Hide collapsed state elements */
  .collapsed .user-details,
  .collapsed .dropdown-arrow {
    display: none;
  }
</style>