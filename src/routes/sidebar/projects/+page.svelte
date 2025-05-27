<!-- src/routes/dashboard/projects/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Team member interface
  interface TeamMember {
    name: string;
    role: string;
    avatar: string | null;
  }
  
  // Task count interface
  interface TaskCount {
    completed: number;
    total: number;
  }
  
  // Project interface
  interface Project {
    id: string;
    name: string;
    description: string;
    status: 'in-progress' | 'planning' | 'completed' | 'on-hold';
    progress: number;
    dueDate: string;
    team: TeamMember[];
    tasks: TaskCount;
  }
  
  let mounted = $state(false);
  
  // Projects data with Svelte 5 runes
  const projects = $state<Project[]>([
    {
      id: 'proj-001',
      name: 'Website Redesign',
      description: 'Redesign the company website with a modern look and improved UX',
      status: 'in-progress',
      progress: 65,
      dueDate: '2025-06-15',
      team: [
        { name: 'Alex Johnson', role: 'UI Designer', avatar: null },
        { name: 'Maria Garcia', role: 'Frontend Dev', avatar: null },
        { name: 'David Chen', role: 'Backend Dev', avatar: null }
      ],
      tasks: {
        completed: 18,
        total: 32
      }
    },
    {
      id: 'proj-002',
      name: 'Mobile App Development',
      description: 'Create a native mobile app for iOS and Android platforms',
      status: 'planning',
      progress: 25,
      dueDate: '2025-08-30',
      team: [
        { name: 'Sarah Williams', role: 'Project Manager', avatar: null },
        { name: 'James Wilson', role: 'Mobile Dev', avatar: null },
        { name: 'Emma Davis', role: 'UX Designer', avatar: null }
      ],
      tasks: {
        completed: 8,
        total: 40
      }
    },
    {
      id: 'proj-003',
      name: 'Product Analytics',
      description: 'Implement comprehensive analytics for user behavior tracking',
      status: 'completed',
      progress: 100,
      dueDate: '2025-05-05',
      team: [
        { name: 'Michael Brown', role: 'Data Analyst', avatar: null },
        { name: 'Sophia Martinez', role: 'Backend Dev', avatar: null }
      ],
      tasks: {
        completed: 28,
        total: 28
      }
    },
    {
      id: 'proj-004',
      name: 'Email Marketing Campaign',
      description: 'Design and implement Q2 email marketing campaign',
      status: 'on-hold',
      progress: 40,
      dueDate: '2025-07-10',
      team: [
        { name: 'Daniel Taylor', role: 'Marketing', avatar: null },
        { name: 'Olivia Wilson', role: 'Content Creator', avatar: null }
      ],
      tasks: {
        completed: 12,
        total: 24
      }
    }
  ]);
  
  // Filter states with Svelte 5 runes
  let statusFilter = $state<string>('all');
  let searchTerm = $state<string>('');
  
  // Computed: filtered projects using $derived
  const filteredProjects = $derived(
    projects.filter(project => {
      // Apply status filter
      if (statusFilter !== 'all' && project.status !== statusFilter) return false;
      
      // Apply search filter (case insensitive)
      if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
  );
  
  // Format dates to more readable format
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  // Status badge display helpers
  function getStatusText(status: string): string {
    switch(status) {
      case 'in-progress': return 'In Progress';
      case 'planning': return 'Planning';
      case 'completed': return 'Completed';
      case 'on-hold': return 'On Hold';
      default: return status;
    }
  }
  
  function getStatusColor(status: string): string {
    switch(status) {
      case 'in-progress': return 'var(--warning-color)'; // Amber
      case 'planning': return 'var(--info-color)'; // Blue
      case 'completed': return 'var(--secondary-color)'; // Green
      case 'on-hold': return 'var(--error-color)'; // Red
      default: return 'var(--text-muted)'; // Gray
    }
  }
  
  // Set status filter
  function setStatusFilter(status: string): void {
    statusFilter = status;
  }
  
  // Load projects data
  onMount(() => {
    mounted = true;
  });
</script>

<div class="page-content" class:animate={mounted}>
  <div class="page-header">
    <h1 class="page-title">Projects</h1>
    <p class="page-description">
      Manage and track all your projects in one place.
    </p>
  </div>
  
  <!-- Project Toolbar -->
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
            placeholder="Search projects..." 
            bind:value={searchTerm}
            class="search-input"
          />
        </div>
      </div>
      
      <div class="toolbar-middle">
        <div class="filter-buttons">
          <button 
            class="filter-btn" 
            class:active={statusFilter === 'all'} 
            onclick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button 
            class="filter-btn" 
            class:active={statusFilter === 'in-progress'} 
            onclick={() => setStatusFilter('in-progress')}
          >
            In Progress
          </button>
          <button 
            class="filter-btn" 
            class:active={statusFilter === 'planning'} 
            onclick={() => setStatusFilter('planning')}
          >
            Planning
          </button>
          <button 
            class="filter-btn" 
            class:active={statusFilter === 'completed'} 
            onclick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
          <button 
            class="filter-btn" 
            class:active={statusFilter === 'on-hold'} 
            onclick={() => setStatusFilter('on-hold')}
          >
            On Hold
          </button>
        </div>
      </div>
      
      <div class="toolbar-right">
        <button class="create-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>New Project</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Projects Grid -->
  <div class="projects-grid">
    {#each filteredProjects as project (project.id)}
      <div class="project-card card">
        <div class="card-header">
          <div 
            class="status-badge"
            style="background-color: {getStatusColor(project.status)}20; color: {getStatusColor(project.status)}; border: 1px solid {getStatusColor(project.status)}40;"
          >
            {getStatusText(project.status)}
          </div>
          
          <button class="menu-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>
        
        <div class="card-body">
          <h3 class="project-title">{project.name}</h3>
          <p class="project-description">{project.description}</p>
          
          <div class="project-progress">
            <div class="progress-label">
              <span>Progress</span>
              <span class="progress-value">{project.progress}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                style="width: {project.progress}%; background: linear-gradient(135deg, {getStatusColor(project.status)} 0%, {getStatusColor(project.status)}80 100%);"
              ></div>
            </div>
          </div>
          
          <div class="project-meta">
            <div class="meta-item">
              <div class="meta-icon">📅</div>
              <span>{formatDate(project.dueDate)}</span>
            </div>
            <div class="meta-item">
              <div class="meta-icon">👥</div>
              <span>{project.team.length} members</span>
            </div>
            <div class="meta-item">
              <div class="meta-icon">✅</div>
              <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
            </div>
          </div>
          
          <div class="project-team">
            {#each project.team.slice(0, 3) as member, i}
              <div class="team-avatar" style="transform: translateX(-{i * 10}px); z-index: {10 - i};">
                {#if member.avatar}
                  <img src={member.avatar} alt={member.name} />
                {:else}
                  <div class="avatar-placeholder">
                    {member.name.charAt(0)}
                  </div>
                {/if}
                <div class="avatar-tooltip">{member.name}<br/><small>{member.role}</small></div>
              </div>
            {/each}
            
            {#if project.team.length > 3}
              <div class="team-avatar more" style="transform: translateX(-30px); z-index: 1;">
                <div class="avatar-placeholder">
                  +{project.team.length - 3}
                </div>
              </div>
            {/if}
          </div>
        </div>
        
        <div class="card-footer">
          <button class="action-btn primary">View Details</button>
          <button class="action-btn secondary">Edit</button>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Empty State -->
  {#if filteredProjects.length === 0}
    <div class="empty-state card">
      <div class="empty-content">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
        </div>
        <h3>No projects found</h3>
        <p>Try adjusting your filters or create a new project.</p>
        <button class="create-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>New Project</span>
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
    color: var(--text-color);
  }
  
  .page-description {
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
    color: var(--text-muted);
  }
  
  /* Card styles */
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
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-footer {
    padding: 16px 20px;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 10px;
  }
  
  /* Toolbar styles */
  .toolbar-card {
    margin-bottom: 24px;
  }
  
  .toolbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
  }
  
  .search-box {
    position: relative;
    width: 250px;
  }
  
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }
  
  .search-input {
    width: 100%;
    padding: 8px 10px 8px 36px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--input-bg);
    color: var(--text-color);
    font-size: 14px;
    transition: all 0.2s ease;
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-muted);
  }
  
  .search-input::placeholder {
    color: var(--text-muted);
  }
  
  .filter-buttons {
    display: flex;
    gap: 8px;
  }
  
  .filter-btn {
    padding: 6px 12px;
    border-radius: 6px;
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-muted);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .filter-btn:hover {
    border-color: var(--text-color);
    color: var(--text-color);
  }
  
  .filter-btn.active {
    background-color: var(--primary-muted);
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
  
  .create-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--primary-gradient);
    color: var(--primary-text-contrast);
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .create-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--button-shadow);
  }
  
  /* Projects grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .project-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .status-badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .menu-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .menu-btn:hover {
    background-color: var(--bg-elevated);
    color: var(--text-color);
  }
  
  .project-title {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
  }
  
  .project-description {
    margin: 0 0 16px 0;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-muted);
  }
  
  .project-progress {
    margin-bottom: 16px;
  }
  
  .progress-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 12px;
    color: var(--text-muted);
  }
  
  .progress-value {
    font-weight: 600;
    color: var(--text-color);
  }
  
  .progress-bar {
    height: 6px;
    background-color: var(--bg-elevated);
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    border-radius: 3px;
  }
  
  .project-meta {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-muted);
  }
  
  .meta-icon {
    font-size: 14px;
  }
  
  .project-team {
    display: flex;
    margin-bottom: 8px;
  }
  
  .team-avatar {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--bg-elevated);
    border: 2px solid var(--card-bg);
    overflow: hidden;
  }
  
  .team-avatar:hover .avatar-tooltip {
    opacity: 1;
    transform: translateY(0);
  }
  
  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: var(--text-color);
    background: var(--primary-gradient);
    color: var(--primary-text-contrast);
  }
  
  .team-avatar.more .avatar-placeholder {
    font-size: 10px;
    background: var(--bg-elevated);
    color: var(--text-muted);
  }
  
  .avatar-tooltip {
    position: absolute;
    bottom: 38px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background-color: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 12px;
    white-space: nowrap;
    color: var(--text-color);
    opacity: 0;
    transition: all 0.2s ease;
    z-index: 100;
    pointer-events: none;
    box-shadow: var(--card-shadow);
  }
  
  .avatar-tooltip small {
    color: var(--text-muted);
  }
  
  .avatar-tooltip::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background-color: var(--bg-surface);
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }
  
  .action-btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .action-btn.primary {
    background: var(--primary-gradient);
    color: var(--primary-text-contrast);
    border: none;
    flex: 1;
  }
  
  .action-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--button-shadow);
  }
  
  .action-btn.secondary {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-color);
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
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .toolbar-content {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
    
    .toolbar-left, .toolbar-middle, .toolbar-right {
      width: 100%;
    }
    
    .search-box {
      width: 100%;
    }
    
    .filter-buttons {
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .create-btn {
      width: 100%;
      justify-content: center;
    }
    
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .project-meta {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>