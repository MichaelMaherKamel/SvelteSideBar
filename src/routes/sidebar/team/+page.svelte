<!-- src/routes/dashboard/teams/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Team member interface
  interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: 'active' | 'away' | 'offline';
    avatar: string | null;
    joinDate: string;
    projectsCount: number;
    tasksCompleted: number;
  }
  
  let mounted = $state(false);
  
  // Teams data with Svelte 5 runes
  const teamMembers = $state<TeamMember[]>([
    {
      id: 'mem-001',
      name: 'Alex Johnson',
      email: 'alex.johnson@company.com',
      role: 'UI Designer',
      department: 'Design',
      status: 'active',
      avatar: null,
      joinDate: '2024-01-15',
      projectsCount: 5,
      tasksCompleted: 42
    },
    {
      id: 'mem-002',
      name: 'Maria Garcia',
      email: 'maria.garcia@company.com',
      role: 'Frontend Developer',
      department: 'Engineering',
      status: 'active',
      avatar: null,
      joinDate: '2023-08-22',
      projectsCount: 8,
      tasksCompleted: 67
    },
    {
      id: 'mem-003',
      name: 'David Chen',
      email: 'david.chen@company.com',
      role: 'Backend Developer',
      department: 'Engineering',
      status: 'away',
      avatar: null,
      joinDate: '2023-11-10',
      projectsCount: 6,
      tasksCompleted: 58
    },
    {
      id: 'mem-004',
      name: 'Sarah Williams',
      email: 'sarah.williams@company.com',
      role: 'Project Manager',
      department: 'Management',
      status: 'active',
      avatar: null,
      joinDate: '2024-02-05',
      projectsCount: 12,
      tasksCompleted: 89
    },
    {
      id: 'mem-005',
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      role: 'Mobile Developer',
      department: 'Engineering',
      status: 'offline',
      avatar: null,
      joinDate: '2023-12-01',
      projectsCount: 4,
      tasksCompleted: 35
    },
    {
      id: 'mem-006',
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      role: 'UX Designer',
      department: 'Design',
      status: 'active',
      avatar: null,
      joinDate: '2024-03-12',
      projectsCount: 7,
      tasksCompleted: 51
    }
  ]);
  
  // Filter states
  let searchTerm = $state<string>('');
  let departmentFilter = $state<string>('all');
  let statusFilter = $state<string>('all');
  
  // Computed: filtered team members
  const filteredMembers = $derived(
    teamMembers.filter(member => {
      // Apply search filter
      if (searchTerm && !member.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !member.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !member.role.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply department filter
      if (departmentFilter !== 'all' && member.department !== departmentFilter) return false;
      
      // Apply status filter
      if (statusFilter !== 'all' && member.status !== statusFilter) return false;
      
      return true;
    })
  );
  
  // Helper functions
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  function getStatusColor(status: string): string {
    // These colors are now expected to be defined globally as CSS variables
    switch(status) {
      case 'active': return 'var(--success-color)'; // Green (e.g., #36B37E)
      case 'away': return 'var(--warning-color)'; // Amber (e.g., #FFAB00)
      case 'offline': return 'var(--text-muted)'; // Gray (e.g., #888888)
      default: return 'var(--text-muted)';
    }
  }
  
  function getStatusText(status: string): string {
    switch(status) {
      case 'active': return 'Active';
      case 'away': return 'Away';
      case 'offline': return 'Offline';
      default: return status;
    }
  }
  
  function getDepartmentColor(department: string): string {
    // These colors are now expected to be defined globally as CSS variables
    switch(department) {
      case 'Engineering': return 'var(--info-color)'; // Blue (e.g., #4C9AFF)
      case 'Design': return 'var(--primary-color)'; // Orange (e.g., #FF3E00)
      case 'Management': return 'var(--management-department-color)'; // Custom color for management
      default: return 'var(--text-muted)';
    }
  }
  
  onMount(() => {
    mounted = true;
    // Removed theme initialization and event listeners.
    // This component now relies entirely on global CSS variables for its theme.
  });
</script>

<div class="page-content" class:animate={mounted}>
  <div class="page-header">
    <h1 class="page-title">Team Members</h1>
    <p class="page-description">
      Manage your team members and track their contributions.
    </p>
  </div>
  
  <!-- Team Stats -->
  <div class="stats-grid">
    <div class="stat-card card">
      <div class="stat-icon">👥</div>
      <div class="stat-info">
        <span class="stat-value">{teamMembers.length}</span>
        <span class="stat-label">Total Members</span>
      </div>
    </div>
    
    <div class="stat-card card">
      <div class="stat-icon">🟢</div>
      <div class="stat-info">
        <span class="stat-value">{teamMembers.filter(m => m.status === 'active').length}</span>
        <span class="stat-label">Active Now</span>
      </div>
    </div>
    
    <div class="stat-card card">
      <div class="stat-icon">📊</div>
      <div class="stat-info">
        <span class="stat-value">{teamMembers.reduce((sum, m) => sum + m.projectsCount, 0)}</span>
        <span class="stat-label">Total Projects</span>
      </div>
    </div>
    
    <div class="stat-card card">
      <div class="stat-icon">✅</div>
      <div class="stat-info">
        <span class="stat-value">{teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0)}</span>
        <span class="stat-label">Tasks Completed</span>
      </div>
    </div>
  </div>
  
  <!-- Team Toolbar -->
  <div class="toolbar-card card">
    <div class="toolbar-content">
      <div class="toolbar-left">
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search team members..." 
            bind:value={searchTerm}
            class="search-input"
          />
        </div>
      </div>
      
      <div class="toolbar-center">
        <div class="filter-buttons">
          <select bind:value={departmentFilter} class="filter-select">
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Management">Management</option>
          </select>
          
          <select bind:value={statusFilter} class="filter-select">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="away">Away</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
      
      <div class="toolbar-right">
        <button class="create-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>Add Member</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Team Members Grid -->
  <div class="members-grid">
    {#each filteredMembers as member (member.id)}
      <div class="member-card card">
        <div class="card-header">
          <div class="member-avatar">
            {#if member.avatar}
              <img src={member.avatar} alt={member.name} />
            {:else}
              <div class="avatar-placeholder">
                {member.name.charAt(0)}
              </div>
            {/if}
            <div 
              class="status-indicator"
              style="background-color: {getStatusColor(member.status)};"
            ></div>
          </div>
          
          <div 
            class="department-badge"
            style="background-color: {getDepartmentColor(member.department)}20; color: {getDepartmentColor(member.department)}; border: 1px solid {getDepartmentColor(member.department)}40;"
          >
            {member.department}
          </div>
        </div>
        
        <div class="card-body">
          <h3 class="member-name">{member.name}</h3>
          <p class="member-role">{member.role}</p>
          <p class="member-email">{member.email}</p>
          
          <div class="member-stats">
            <div class="stat-item">
              <div class="stat-icon">📅</div>
              <div class="stat-content">
                <span class="stat-label">Joined</span>
                <span class="stat-value">{formatDate(member.joinDate)}</span>
              </div>
            </div>
            
            <div class="stat-item">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <span class="stat-label">Projects</span>
                <span class="stat-value">{member.projectsCount}</span>
              </div>
            </div>
            
            <div class="stat-item">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <span class="stat-label">Tasks Done</span>
                <span class="stat-value">{member.tasksCompleted}</span>
              </div>
            </div>
          </div>
          
          <div class="member-status">
            <div 
              class="status-badge"
              style="background-color: {getStatusColor(member.status)}20; color: {getStatusColor(member.status)};"
            >
              <div class="status-dot" style="background-color: {getStatusColor(member.status)};"></div>
              {getStatusText(member.status)}
            </div>
          </div>
        </div>
        
        <div class="card-footer">
          <button class="action-btn primary">View Profile</button>
          <button class="action-btn secondary">Message</button>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Empty State -->
  {#if filteredMembers.length === 0}
    <div class="empty-state card">
      <div class="empty-content">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h3>No team members found</h3>
        <p>Try adjusting your filters or add new team members.</p>
        <button class="create-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>Add Member</span>
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Base styles */
  .page-content {
    max-width: 95%;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    /* Removed background-color and color transitions as theme classes are gone */
    transition: all 0.5s ease;
  }
  
  .page-content.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .page-header {
    margin-bottom: 32px;
  }
  
  .page-title {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: var(--text-color); /* Uses global text color variable */
  }
  
  .page-description {
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
    color: var(--text-muted); /* Uses global text muted color variable */
  }
  
  /* Card styles (consistent with other simplified pages) */
  .card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: var(--card-shadow);
  }
  
  .card:hover {
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .card-body {
    padding: 20px 24px;
  }
  
  .card-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 8px;
  }
  
  /* Stats grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }
  
  .stat-card {
    display: flex;
    align-items: center;
    padding: 20px 24px !important; /* !important to override .card padding */
    gap: 16px;
  }
  
  .stat-icon {
    font-size: 24px;
    opacity: 0.8;
    color: var(--text-color); /* Inherit from text-color */
  }
  
  .stat-info {
    display: flex;
    flex-direction: column;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    color: var(--text-color); /* Uses global text color variable */
  }
  
  .stat-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 4px;
    color: var(--text-muted); /* Uses global text muted color variable */
  }
  
  /* Toolbar */
  .toolbar-card {
    margin-bottom: 24px;
  }
  
  .toolbar-content {
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .toolbar-left {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  
  .toolbar-center {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-end;
    flex: 1;
    min-width: 0;
  }
  
  .toolbar-right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  
  .search-box {
    position: relative;
    width: 280px;
    flex-shrink: 0;
  }
  
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-muted); /* Uses global text muted color variable */
  }
  
  .search-input {
    padding: 10px 10px 10px 40px;
    border-radius: 8px;
    font-size: 14px;
    width: 100%;
    transition: all 0.2s;
    background-color: var(--input-bg); /* Uses global input bg variable */
    border: 1px solid var(--border-color); /* Uses global border color variable */
    color: var(--text-color); /* Uses global text color variable */
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-muted);
  }
  
  .filter-buttons {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  
  .filter-select {
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    background-color: var(--input-bg); /* Uses global input bg variable */
    border: 1px solid var(--border-color); /* Uses global border color variable */
    color: var(--text-color); /* Uses global text color variable */
  }
  
  .filter-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-muted);
  }
  
  .create-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--primary-gradient);
    color: var(--primary-text-contrast); /* Uses global primary text contrast variable */
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
  }
  
  .create-btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--button-shadow);
  }
  
  /* Members grid */
  .members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .member-card {
    display: flex;
    flex-direction: column;
  }
  
  .member-avatar {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--border-color); /* Uses global border color variable */
  }
  
  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-text-contrast); /* Uses global primary text contrast variable */
    font-weight: 600;
    font-size: 18px;
    background: var(--primary-gradient);
  }
  
  .status-indicator {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--card-bg); /* Uses global card background variable */
  }
  
  .department-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .member-name {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: var(--text-color); /* Uses global text color variable */
  }
  
  .member-role {
    font-size: 14px;
    margin: 0 0 4px 0;
    font-weight: 500;
    color: var(--text-muted); /* Using text-muted as a general darker gray */
  }
  
  .member-email {
    font-size: 13px;
    margin: 0 0 20px 0;
    color: var(--text-muted); /* Uses global text muted color variable */
  }
  
  .member-stats {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    background-color: var(--bg-elevated); /* Uses global elevated background variable */
  }
  
  .stat-item .stat-icon {
    font-size: 16px;
    opacity: 0.8;
    color: var(--text-color); /* Inherit from text-color */
  }
  
  .stat-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .stat-content .stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
    color: var(--text-muted); /* Uses global text muted color variable */
  }
  
  .stat-content .stat-value {
    font-size: 14px;
    font-weight: 600;
    margin-top: 2px;
    color: var(--text-color); /* Uses global text color variable */
  }
  
  .member-status {
    margin-bottom: 20px;
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  
  /* Action buttons (consistent with other simplified pages) */
  .action-btn {
    flex: 1;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .action-btn.primary {
    background: var(--primary-gradient);
    color: var(--primary-text-contrast);
    border: none;
  }
  
  .action-btn.primary:hover {
    transform: translateY(-1px);
    box-shadow: var(--button-shadow);
  }
  
  .action-btn.secondary {
    background: none; /* Changed to match Projects/Settings page */
    border: 1px solid var(--border-color); /* Uses global border color */
    color: var(--text-color); /* Uses global text color */
  }
  
  .action-btn.secondary:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  /* Empty state */
  .empty-state {
    margin-top: 32px;
    padding: 48px 0;
    text-align: center;
  }
  
  .empty-content {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .empty-icon {
    margin-bottom: 24px;
    color: var(--text-muted);
  }
  
  .empty-state h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-color);
  }
  
  .empty-state p {
    margin: 0 0 24px 0;
    color: var(--text-muted);
  }
  
  /* Responsive styles (copied as-is, adjust if needed for layout changes) */
  @media (max-width: 1200px) {
    .stats-grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
    .members-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .page-content {
      max-width: 100%;
      padding: 0 16px;
    }
    
    .page-title {
      font-size: 24px;
    }
    
    .toolbar-content {
      flex-direction: column;
      align-items: stretch;
    }
    
    .toolbar-left, .toolbar-center, .toolbar-right {
      width: 100%;
      justify-content: center;
    }
    
    .search-box {
      width: 100%;
    }
    
    .filter-buttons {
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .create-btn {
      width: 100%;
      justify-content: center;
    }
    
    .members-grid {
      grid-template-columns: 1fr;
    }
    
    .card-header {
      padding: 16px 20px;
    }
    
    .card-body {
      padding: 16px 20px;
    }
    
    .card-footer {
      padding: 12px 20px;
      flex-direction: column;
    }
    
    .action-btn {
      width: 100%;
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .page-content {
      padding: 0 12px;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .card-header {
      padding: 14px 16px;
    }
    
    .card-body {
      padding: 14px 16px;
    }
    
    .card-footer {
      padding: 10px 16px;
    }
  }
</style>