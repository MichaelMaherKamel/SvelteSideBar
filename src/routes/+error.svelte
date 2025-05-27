<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="error-container">
  <div class="error-card card">
    <div class="error-icon-container">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
    </div>
    <h1 class="error-status">{page.status}</h1>
    <p class="error-message">{page.error?.message || 'An error occurred'}</p>
    <a href="/" class="error-button btn btn-primary">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      Return Home
    </a>
  </div>
</div>

<style>
  /* Base styles */
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
  }
  
  .error-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 3rem 2rem;
    border-radius: 16px;
    background: var(--card-bg);
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
  }
  
  .error-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 96px;
    height: 96px;
    margin-bottom: 1.5rem;
    border-radius: 50%;
    background: var(--primary-gradient);
    box-shadow: 0 8px 24px rgba(255, 62, 0, 0.2);
  }
  
  .error-icon {
    color: white;
    width: 48px;
    height: 48px;
  }
  
  .error-status {
    font-size: 3.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  
  .error-message {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    color: var(--text-muted);
    max-width: 90%;
  }
  
  .error-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 12px;
  }
  
  /* Breakpoints */
  @media (width < 48rem) {
    .error-card {
      padding: 2rem 1.5rem;
    }
    
    .error-icon-container {
      width: 80px;
      height: 80px;
      margin-bottom: 1rem;
    }
    
    .error-icon {
      width: 40px;
      height: 40px;
    }
    
    .error-status {
      font-size: 2.75rem;
    }
    
    .error-message {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
  }
  
  @media (width < 30rem) {
    .error-container {
      padding: 1rem 0.5rem;
    }
    
    .error-card {
      padding: 1.75rem 1rem;
    }
    
    .error-icon-container {
      width: 64px;
      height: 64px;
    }
    
    .error-icon {
      width: 32px;
      height: 32px;
    }
    
    .error-status {
      font-size: 2.25rem;
    }
  }
</style>