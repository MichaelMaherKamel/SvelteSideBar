<!-- Dashboard.svelte - Enhanced Card Designs with Theme Support -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Activity interface
  interface Activity {
    icon: string;
    text: string;
    time: string;
  }
  
  // Statistics interface
  interface Statistics {
    totalUsers: number;
    successRate: number;
    revenue: number;
  }
  
  let mounted = $state(false);
  
  // Dashboard data with Svelte 5 runes
  const statistics = $state<Statistics>({
    totalUsers: 2847,
    successRate: 94.7,
    revenue: 45231
  });
  
  const activities = $state<Activity[]>([
    { 
      icon: '📊', 
      text: 'Dashboard analytics updated', 
      time: '2 minutes ago' 
    },
    { 
      icon: '👥', 
      text: 'New user registered', 
      time: '5 minutes ago' 
    },
    { 
      icon: '💰', 
      text: 'Payment received', 
      time: '10 minutes ago' 
    },
    { 
      icon: '⚙️', 
      text: 'Settings updated', 
      time: '1 hour ago' 
    }
  ]);
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="page-content" class:animate={mounted}>
  <div class="page-header">
    <h1 class="page-title">Dashboard</h1>
    <p class="page-description">
      Welcome to your Dashboard! This is where you can see an overview of everything.
    </p>
  </div>
  
  <!-- Dashboard Content -->
  <div class="content-grid">
    <!-- Statistics Card -->
    <div class="statistics-card card">
      <div class="card-header">
        <h3>Statistics</h3>
        <div class="card-badge">Overview</div>
      </div>
      <div class="stat-grid">
        <div class="stat-item">
          <div class="stat-icon">👥</div>
          <span class="stat-value">{statistics.totalUsers.toLocaleString()}</span>
          <span class="stat-label">Total Users</span>
          <div class="stat-trend up">+12%</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">✅</div>
          <span class="stat-value">{statistics.successRate}%</span>
          <span class="stat-label">Success Rate</span>
          <div class="stat-trend up">+3.2%</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">💰</div>
          <span class="stat-value">${statistics.revenue.toLocaleString()}</span>
          <span class="stat-label">Revenue</span>
          <div class="stat-trend down">-1.8%</div>
        </div>
      </div>
      <div class="card-footer">
        <span>Updated just now</span>
        <button class="refresh-btn">⟳ Refresh</button>
      </div>
    </div>
    
    <!-- Recent Activity Card -->
    <div class="activity-card card">
      <div class="card-header">
        <h3>Recent Activity</h3>
        <div class="card-badge">{activities.length} New</div>
      </div>
      <div class="activity-list">
        {#each activities as activity}
          <div class="activity-item">
            <div class="activity-icon">{activity.icon}</div>
            <div class="activity-content">
              <span class="activity-text">{activity.text}</span>
              <span class="activity-time">{activity.time}</span>
            </div>
            <div class="activity-arrow">→</div>
          </div>
        {/each}
      </div>
      <div class="card-footer">
        <button class="view-all-btn">View All Activity</button>
      </div>
    </div>
    
    <!-- Performance Chart Card -->
    <div class="performance-card card">
      <div class="card-header">
        <h3>Performance</h3>
        <div class="time-filter">
          <button class="time-btn active">6M</button>
          <button class="time-btn">1Y</button>
          <button class="time-btn">All</button>
        </div>
      </div>
      <div class="performance-chart">
        <div class="chart-placeholder">
          <svg width="100%" height="160" viewBox="0 0 400 160">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:var(--primary-start)"/>
                <stop offset="100%" style="stop-color:var(--primary-end)"/>
              </linearGradient>
            </defs>
            <path d="M 20 120 Q 120 80 200 90 T 380 60" 
                  stroke="url(#chartGradient)" 
                  stroke-width="3" 
                  fill="none"/>
            <circle cx="20" cy="120" r="4" fill="var(--primary-start)"/>
            <circle cx="200" cy="90" r="4" fill="var(--primary-start)"/>
            <circle cx="380" cy="60" r="4" fill="var(--primary-end)"/>
          </svg>
        </div>
        <div class="chart-stats">
          <div class="chart-stat">
            <span class="stat-label">Current</span>
            <span class="stat-value">$42.8K</span>
          </div>
          <div class="chart-stat">
            <span class="stat-label">Change</span>
            <span class="stat-value positive">+12.4%</span>
          </div>
          <div class="chart-stat">
            <span class="stat-label">Previous</span>
            <span class="stat-value">$38.1K</span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  
  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 0;
    box-shadow: var(--card-shadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    overflow: hidden;
  }
  
  .card:hover {
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
  }
  
  .card-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
  }
  
  .card-badge {
    background: var(--primary-gradient);
    color: var(--primary-text-contrast);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }
  
  /* Statistics Card */
  .statistics-card {
    background: var(--card-bg);
  }
  
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    padding: 20px;
  }
  
  .stat-item {
    text-align: center;
    padding: 16px;
    border-radius: 12px;
    position: relative;
    background-color: var(--bg-elevated);
  }
  
  .stat-icon {
    font-size: 20px;
    margin-bottom: 8px;
    opacity: 0.8;
  }
  
  .stat-value {
    display: block;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
    color: var(--text-color);
  }
  
  .stat-label {
    display: block;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-muted);
  }
  
  .stat-trend {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
  }
  
  .stat-trend.up {
    background-color: rgba(0, 200, 83, 0.2);
    color: #00c853;
  }
  
  .stat-trend.down {
    background-color: rgba(255, 45, 85, 0.2);
    color: #ff2d55;
  }
  
  .card-footer {
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    border-top: 1px solid var(--border-color);
    color: var(--text-muted);
  }
  
  .refresh-btn {
    background: transparent;
    border: none;
    font-size: 12px;
    cursor: pointer;
    transition: color 0.2s;
    color: var(--text-muted);
  }
  
  .refresh-btn:hover {
    color: var(--primary-color);
  }
  
  /* Activity Card */
  .activity-card {
    background: var(--card-bg);
  }
  
  .activity-list {
    padding: 0 16px;
  }
  
  .activity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 8px;
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.2s;
  }
  
  .activity-item:last-child {
    border-bottom: none;
  }
  
  .activity-item:hover {
    background-color: var(--bg-elevated);
  }
  
  .activity-icon {
    font-size: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    flex-shrink: 0;
    background-color: var(--primary-muted);
  }
  
  .activity-content {
    flex: 1;
  }
  
  .activity-text {
    display: block;
    font-weight: 500;
    margin-bottom: 4px;
    color: var(--text-color);
  }
  
  .activity-time {
    display: block;
    font-size: 12px;
    color: var(--text-muted);
  }
  
  .activity-arrow {
    font-size: 18px;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    color: var(--text-muted);
  }
  
  .activity-item:hover .activity-arrow {
    opacity: 1;
    transform: translateX(4px);
  }
  
  .view-all-btn {
    background: transparent;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }
  
  .view-all-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  /* Performance Card - Full width on large screens */
  .performance-card {
    grid-column: 1 / -1; /* This makes it span the full width */
    background: var(--card-bg);
  }
  
  .time-filter {
    display: flex;
    gap: 8px;
  }
  
  .time-btn {
    background: transparent;
    border-radius: 6px;
    width: 36px;
    height: 24px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid var(--border-color);
    color: var(--text-muted);
  }
  
  .time-btn.active {
    background: var(--primary-muted);
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  .time-btn:hover:not(.active) {
    border-color: var(--text-muted);
    color: var(--text-color);
  }
  
  .performance-chart {
    padding: 0 20px 20px;
  }
  
  .chart-placeholder {
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    background-color: var(--bg-elevated);
  }
  
  .chart-stats {
    display: flex;
    justify-content: space-between;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .chart-stat {
    text-align: center;
    padding: 0 8px;
  }
  
  .chart-stat .stat-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-color);
  }
  
  .chart-stat .stat-label {
    font-size: 12px;
    margin-bottom: 4px;
    color: var(--text-muted);
  }
  
  .positive {
    color: #00c853;
  }
  
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
    
    .performance-card {
      grid-column: 1;
    }
  }
  
  @media (max-width: 768px) {
    .page-title {
      font-size: 24px;
    }
    
    .content-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .stat-grid {
      grid-template-columns: 1fr;
    }
  }
</style>