<!-- src/routes/dashboard/settings/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = $state(false);
  
  // Settings state with Svelte 5 runes
  const profileSettings = $state({
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Product Manager',
    bio: 'Experienced product manager with a passion for building great user experiences.',
    avatar: null as string | null
  });
  
  const notificationSettings = $state({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    taskAssignments: true,
    teamMessages: false,
    weeklyReports: true
  });
  
  // Appearance settings now hold the preference, not the actively applied theme
  const appearanceSettings = $state({
    theme: 'dark', // Default preference; actual theme applied by global manager
    language: 'en',
    timezone: 'UTC-05:00',
    dateFormat: 'MM/DD/YYYY',
    compactMode: false
  });
  
  const securitySettings = $state({
    twoFactorEnabled: false,
    sessionTimeout: '30',
    loginAlerts: true,
    passwordChanged: '2024-03-15'
  });
  
  // Save functions
  function saveProfile() {
    // Simulate API call
    console.log('Saving profile settings:', profileSettings);
    // Show success message
  }
  
  function saveNotifications() {
    // Simulate API call
    console.log('Saving notification settings:', notificationSettings);
    // Show success message
  }
  
  function saveAppearance() {
    // Simulate API call - now only saves the preference, does not apply theme
    console.log('Saving appearance settings:', appearanceSettings);
    // Show success message
  }
  
  function saveSecurity() {
    // Simulate API call
    console.log('Saving security settings:', securitySettings);
    // Show success message
  }
  
  function changePassword() {
    // Show change password modal
    console.log('Opening change password modal');
  }
  
  function enableTwoFactor() {
    // Show 2FA setup modal
    console.log('Opening 2FA setup modal');
  }
  
  onMount(() => {
    mounted = true;
    // This component now solely displays/edits settings,
    // relying on a global system to manage and apply the actual theme.
  });
</script>

<div class="page-content" class:animate={mounted}>
  <div class="page-header">
    <h1 class="page-title">Settings</h1>
    <p class="page-description">
      Manage your account preferences and application settings.
    </p>
  </div>
  
  <div class="settings-grid">
    <!-- Profile Settings -->
    <div class="settings-card card">
      <div class="card-header">
        <h3>Profile Settings</h3>
        <div class="card-badge">Personal</div>
      </div>
      
      <div class="card-body">
        <div class="avatar-section">
          <div class="current-avatar">
            {#if profileSettings.avatar}
              <img src={profileSettings.avatar} alt="Profile" />
            {:else}
              <div class="avatar-placeholder">
                {profileSettings.name.charAt(0)}
              </div>
            {/if}
          </div>
          <div class="avatar-actions">
            <button class="change-avatar-btn">Change Avatar</button>
            <span class="avatar-help">JPG, PNG or GIF. Max size 2MB.</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" bind:value={profileSettings.name} class="form-input" />
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" bind:value={profileSettings.email} class="form-input" />
        </div>
        
        <div class="form-group">
          <label for="role">Role</label>
          <input type="text" id="role" bind:value={profileSettings.role} class="form-input" />
        </div>
        
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea id="bio" bind:value={profileSettings.bio} class="form-textarea" rows="3"></textarea>
        </div>
      </div>
      
      <div class="card-footer">
        <button class="action-btn primary" onclick={saveProfile}>Save Changes</button>
        <button class="action-btn secondary">Cancel</button>
      </div>
    </div>
    
    <!-- Notification Settings -->
    <div class="settings-card card">
      <div class="card-header">
        <h3>Notifications</h3>
        <div class="card-badge">Preferences</div>
      </div>
      
      <div class="card-body">
        <div class="settings-section">
          <h4>Email Notifications</h4>
          <div class="toggle-group">
            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" bind:checked={notificationSettings.emailNotifications} class="toggle-input" />
                <span class="toggle-slider"></span>
                <span class="toggle-text">General email notifications</span>
              </label>
            </div>
            
            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" bind:checked={notificationSettings.projectUpdates} class="toggle-input" />
                <span class="toggle-slider"></span>
                <span class="toggle-text">Project updates</span>
              </label>
            </div>
            
            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" bind:checked={notificationSettings.taskAssignments} class="toggle-input" />
                <span class="toggle-slider"></span>
                <span class="toggle-text">Task assignments</span>
              </label>
            </div>
            
            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" bind:checked={notificationSettings.weeklyReports} class="toggle-input" />
                <span class="toggle-slider"></span>
                <span class="toggle-text">Weekly reports</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-section">
          <h4>Push Notifications</h4>
          <div class="toggle-group">
            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" bind:checked={notificationSettings.pushNotifications} class="toggle-input" />
                <span class="toggle-slider"></span>
                <span class="toggle-text">Browser notifications</span>
              </label>
            </div>
            
            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" bind:checked={notificationSettings.teamMessages} class="toggle-input" />
                <span class="toggle-slider"></span>
                <span class="toggle-text">Team messages</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card-footer">
        <button class="action-btn primary" onclick={saveNotifications}>Save Changes</button>
      </div>
    </div>
    
    <!-- Appearance Settings -->
    <div class="settings-card card">
      <div class="card-header">
        <h3>Appearance</h3>
        <div class="card-badge">Display</div>
      </div>
      
      <div class="card-body">
        <div class="form-group">
          <label for="theme">Theme</label>
          <select id="theme" bind:value={appearanceSettings.theme} class="form-select">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="language">Language</label>
          <select id="language" bind:value={appearanceSettings.language} class="form-select">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="timezone">Timezone</label>
          <select id="timezone" bind:value={appearanceSettings.timezone} class="form-select">
            <option value="UTC-05:00">Eastern Time (UTC-05:00)</option>
            <option value="UTC-06:00">Central Time (UTC-06:00)</option>
            <option value="UTC-07:00">Mountain Time (UTC-07:00)</option>
            <option value="UTC-08:00">Pacific Time (UTC-08:00)</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="dateFormat">Date Format</label>
          <select id="dateFormat" bind:value={appearanceSettings.dateFormat} class="form-select">
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        
        <div class="toggle-item">
          <label class="toggle-label">
            <input type="checkbox" bind:checked={appearanceSettings.compactMode} class="toggle-input" />
            <span class="toggle-slider"></span>
            <span class="toggle-text">Compact mode</span>
          </label>
          <p class="toggle-description">Use a more compact layout to fit more content on screen.</p>
        </div>
      </div>
      
      <div class="card-footer">
        <button class="action-btn primary" onclick={saveAppearance}>Save Changes</button>
      </div>
    </div>
    
    <!-- Security Settings -->
    <div class="settings-card card">
      <div class="card-header">
        <h3>Security</h3>
        <div class="card-badge">Privacy</div>
      </div>
      
      <div class="card-body">
        <div class="security-section">
          <div class="security-item">
            <div class="security-info">
              <h4>Password</h4>
              <p>Last changed on {securitySettings.passwordChanged}</p>
            </div>
            <button class="action-btn secondary" onclick={changePassword}>Change Password</button>
          </div>
          
          <div class="security-item">
            <div class="security-info">
              <h4>Two-Factor Authentication</h4>
              <p>
                {securitySettings.twoFactorEnabled ? 'Enabled' : 'Not enabled'} - 
                Add an extra layer of security to your account
              </p>
            </div>
            <button 
              class="action-btn {securitySettings.twoFactorEnabled ? 'destructive' : 'primary'}" 
              onclick={enableTwoFactor}
            >
              {securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
            </button>
          </div>
        </div>
        
        <div class="form-group">
          <label for="sessionTimeout">Session Timeout</label>
          <select id="sessionTimeout" bind:value={securitySettings.sessionTimeout} class="form-select">
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="never">Never</option>
          </select>
        </div>
        
        <div class="toggle-item">
          <label class="toggle-label">
            <input type="checkbox" bind:checked={securitySettings.loginAlerts} class="toggle-input" />
            <span class="toggle-slider"></span>
            <span class="toggle-text">Login alerts</span>
          </label>
          <p class="toggle-description">Get notified when someone signs in to your account.</p>
        </div>
      </div>
      
      <div class="card-footer">
        <button class="action-btn primary" onclick={saveSecurity}>Save Changes</button>
      </div>
    </div>
    
    <!-- Danger Zone -->
    <div class="settings-card card danger-card">
      <div class="card-header">
        <h3>Danger Zone</h3>
      </div>
      
      <div class="card-body">
        <div class="danger-section">
          <div class="danger-item">
            <div class="danger-info">
              <h4>Export Data</h4>
              <p>Download a copy of all your data including projects, tasks, and personal information.</p>
            </div>
            <button class="action-btn secondary">Export Data</button>
          </div>
          
          <div class="danger-item">
            <div class="danger-info">
              <h4>Delete Account</h4>
              <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            <button class="action-btn destructive">Delete Account</button>
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
  
  /* Enhanced card styles */
  .card {
    border-radius: 16px;
    padding: 0;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s ease, border-color 0.3s ease;
    box-shadow: var(--card-shadow);
    overflow: hidden;
  }
  
  .card:hover {
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
  }
  
  .danger-card {
    border-color: var(--error-color);
  }
  
  .danger-card:hover {
    box-shadow: var(--danger-shadow);
  }
  
  .card-header {
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
  }
  
  .card-header h3 {
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
  
  .card-body {
    padding: 24px;
  }
  
  .card-footer {
    padding: 16px 24px;
    display: flex;
    gap: 8px;
    border-top: 1px solid var(--border-color);
  }
  
  /* Settings grid */
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  /* Avatar section */
  .avatar-section {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
    padding: 16px;
    border-radius: 12px;
    background-color: var(--bg-elevated);
  }
  
  .current-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid var(--border-color);
  }
  
  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-text-contrast);
    font-weight: 600;
    font-size: 28px;
    background: var(--primary-gradient);
  }
  
  .avatar-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .change-avatar-btn {
    background: var(--primary-gradient);
    color: var(--primary-text-contrast);
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .change-avatar-btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--button-shadow);
  }
  
  .avatar-help {
    font-size: 12px;
    color: var(--text-muted);
  }
  
  /* Form elements */
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
  }
  
  .form-input,
  .form-select,
  .form-textarea {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s;
    background-color: var(--input-bg);
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }
  
  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-muted);
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 80px;
  }
  
  /* Settings sections */
  .settings-section {
    margin-bottom: 24px;
  }
  
  .settings-section h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: var(--text-color);
  }
  
  /* Toggle elements */
  .toggle-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .toggle-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .toggle-label {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-color);
  }
  
  .toggle-input {
    display: none;
  }
  
  .toggle-slider {
    position: relative;
    width: 48px;
    height: 24px;
    border-radius: 12px;
    transition: all 0.2s;
    flex-shrink: 0;
    background-color: var(--bg-elevated);
  }
  
  .toggle-slider::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: all 0.2s;
    background-color: var(--text-muted);
  }
  
  .toggle-input:checked + .toggle-slider {
    background: var(--primary-gradient);
  }
  
  .toggle-input:checked + .toggle-slider::before {
    transform: translateX(24px);
    background-color: var(--primary-text-contrast);
  }
  
  .toggle-text {
    font-weight: 500;
  }
  
  .toggle-description {
    font-size: 12px;
    margin: 0;
    margin-left: 60px;
    color: var(--text-muted);
  }
  
  /* Security sections */
  .security-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
  }
  
  .security-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    gap: 16px;
    background-color: var(--bg-elevated);
  }
  
  .security-info {
    flex: 1;
  }
  
  .security-info h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: var(--text-color);
  }
  
  .security-info p {
    font-size: 13px;
    margin: 0;
    color: var(--text-muted);
  }
  
  /* Danger zone */
  .danger-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .danger-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    gap: 16px;
    background-color: var(--error-color)20;
    border: 1px solid var(--error-color)40;
  }
  
  .danger-info {
    flex: 1;
  }
  
  .danger-info h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: var(--destructive-text-color); /* Uses destructive text color */
  }
  
  .danger-info p {
    font-size: 13px;
    margin: 0;
    color: var(--destructive-text-color); /* Uses destructive text color */
  }
  
  /* Action buttons */
  .action-btn {
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
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
  
  /* Destructive button specific styles */
  .action-btn.destructive {
    background: var(--destructive-button-bg);
    color: var(--destructive-button-color);
    border: var(--destructive-button-border); /* Could be 'none' or a specific color */
  }
  
  .action-btn.destructive:hover {
    transform: translateY(-1px);
    background: var(--destructive-button-hover-bg);
    box-shadow: var(--destructive-button-shadow-specific);
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
  
  /* Responsive styles */
  @media (max-width: 1200px) {
    .settings-grid {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
    
    .settings-grid {
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
    
    .avatar-section {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .avatar-actions {
      align-items: center;
    }
    
    .security-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    
    .security-item button {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .page-content {
      padding: 0 12px;
    }
    
    .settings-grid {
      gap: 16px;
    }
    
    .card-header {
      padding: 14px 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    
    .card-body {
      padding: 14px 16px;
    }
    
    .card-footer {
      padding: 10px 16px;
    }
    
    .toggle-text {
      font-size: 13px;
    }
    
    .toggle-description {
      margin-left: 0;
      padding-left: 60px;
    }
    
    .danger-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .danger-item button {
      width: 100%;
      margin-top: 8px;
    }
  }
</style>