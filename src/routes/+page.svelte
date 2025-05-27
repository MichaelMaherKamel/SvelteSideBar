<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Design from '../componenets/Design.svelte';
	import GitHubIcon from '../componenets/GitHubIcon.svelte';
  
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  });
</script>

<!-- Add the GitHub icon at the top of your template -->
<GitHubIcon />

<div class="page-content">
  <div class="hero-section">
    <div class="hero-content">
      <!-- Logo and Title -->
      <div class="brand-section">
        <div class="logo-container">
          <!-- Svelte Logo -->
          <div class="logo svelte-logo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
              <path fill="#FF3E00" d="M85.95 13.231c-9.29-13.29-27.64-17.23-40.907-8.78l-23.3 14.845a26.7 26.7 0 0 0-7.922 7.66 27 27 0 0 0-2.61 4.885 26.8 26.8 0 0 0-1.546 5.32 28.1 28.1 0 0 0-.123 9.27 28 28 0 0 0 2.893 8.808 27 27 0 0 0-2.505 4.79 26.6 26.6 0 0 0-1.488 5.196 28.44 28.44 0 0 0 2.05 16.634 28.4 28.4 0 0 0 2.819 4.91C22.6 100.06 40.95 104 54.218 95.55l23.298-14.782a26.8 26.8 0 0 0 12.078-17.865 28.13 28.13 0 0 0-2.777-18.07c.496-.752.955-1.532 1.374-2.331a27 27 0 0 0 2.011-5.02 27 27 0 0 0 .618-2.634 28.6 28.6 0 0 0-.262-11.263 28.5 28.5 0 0 0-4.607-10.28"/>
              <path fill="#fff" d="M42.766 88.055a18.51 18.51 0 0 1-16.005-3.292 18.5 18.5 0 0 1-3.864-4.076 17.1 17.1 0 0 1-3.185-9.56 17 17 0 0 1 .372-3.937q.058-.273.129-.54a15 15 0 0 1 .316-1.067l.438-1.34 1.197.892a30 30 0 0 0 4.352 2.644q1.141.57 2.327 1.038 1.185.47 2.407.838l.893.26-.08.892a5.24 5.24 0 0 0 .509 2.656q.198.412.464.783a5.6 5.6 0 0 0 2.645 2.048 5.57 5.57 0 0 0 3.714.052q.187-.064.364-.144a5 5 0 0 0 .691-.366L63.714 60.99a4.8 4.8 0 0 0 1.439-1.393 4.8 4.8 0 0 0 .75-1.856q.089-.51.076-1.025a5.1 5.1 0 0 0-.456-1.992 5 5 0 0 0-.514-.888 5.6 5.6 0 0 0-2.644-2.046 5.6 5.6 0 0 0-3.342-.169 5 5 0 0 0-1.09.43q-.173.09-.338.196L48.66 57.92q-.547.346-1.118.651-.573.303-1.165.564a17 17 0 0 1-1.206.474q-.611.215-1.236.383a18.5 18.5 0 0 1-11.072-.568 18.5 18.5 0 0 1-8.762-6.792 17 17 0 0 1-1.687-2.954 17.07 17.07 0 0 1-1.216-9.997 16.07 16.07 0 0 1 7.263-10.773l23.335-14.844q.544-.346 1.112-.651.57-.304 1.159-.565t1.198-.474q.607-.215 1.23-.384a18.5 18.5 0 0 1 5.587-.57 18.53 18.53 0 0 1 10.41 3.862 18.6 18.6 0 0 1 3.863 4.078 17.1 17.1 0 0 1 2.775 6.18c.25 1.11.39 2.241.415 3.378a17 17 0 0 1-.26 3.393q-.052.276-.114.55-.06.272-.13.544-.068.273-.147.54-.076.271-.163.536l-.446 1.34-1.189-.892a30 30 0 0 0-4.363-2.666 30.5 30.5 0 0 0-4.749-1.89l-.894-.258.082-.893a5.25 5.25 0 0 0-.949-3.467 5.5 5.5 0 0 0-1.166-1.202 5.55 5.55 0 0 0-5.156-.836 6 6 0 0 0-.366.143q-.179.079-.352.17a5 5 0 0 0-.34.197l-23.306 14.82q-.428.269-.79.62-.361.353-.646.77a4.9 4.9 0 0 0-.753 1.851 5.3 5.3 0 0 0-.075 1.027c.02.688.175 1.366.456 1.994q.213.47.513.892c.322.46.712.871 1.158 1.215s.94.621 1.467.818a5.6 5.6 0 0 0 3.315.182 6 6 0 0 0 .374-.117q.184-.066.364-.144t.352-.17a5 5 0 0 0 .339-.195l8.934-5.662q.547-.352 1.12-.658a16.4 16.4 0 0 1 3.615-1.424 18.5 18.5 0 0 1 5.587-.574 18.47 18.47 0 0 1 10.41 3.86 18.5 18.5 0 0 1 3.863 4.074 17.2 17.2 0 0 1 2.773 6.181 17.1 17.1 0 0 1 .157 6.77 16.1 16.1 0 0 1-4.637 8.712 16 16 0 0 1-2.626 2.061L47.499 85.973q-.549.35-1.12.655t-1.168.566q-.594.263-1.207.477-.611.216-1.238.384"/>
            </svg>
          </div>
          
          <div class="plus-symbol">+</div>
          
          <!-- CSS Logo -->
          <div class="logo css-logo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
              <path fill="#264DE4" d="m94.175 0-8.033 89.99L50.034 100l-36.01-9.996L6 0z"/>
              <path fill="#2965F1" d="m79.265 84.26 6.864-76.9H50.087v84.989z"/>
              <path fill="#EBEBEB" d="m24.396 40.74.99 11.04h24.702V40.74zm25.692-22.342h-27.68l1.003 11.039h26.676zm-.001 62.496V69.409l-.048.013-12.294-3.32-.786-8.804H25.878l1.547 17.332 22.612 6.278z"/>
              <path fill="#fff" d="m63.642 51.779-1.281 14.316-12.312 3.323v11.484l22.63-6.271.166-1.865 2.594-29.061.27-2.964L77.7 18.398H50.05v11.039h15.555L64.599 40.74H50.05v11.038z"/>
            </svg>
          </div>
        </div>
        
        <h1 class="main-title">SvelteSideBar</h1>
        <p class="main-subtitle">The Sidebar that everyone loves nowadays</p>
      </div>
      
      <!-- Description -->
      <div class="description-section">
        <p class="description">
          Created in <strong>pure Svelte</strong> and <span class="css-highlight">native CSS</span>.<br>
          No fancy components. No fancy stylesheets used.<br>
          Just pure stuff. The Svelte one.
        </p>
      </div>
      
      <!-- Features Grid -->
      <div class="features-grid">
        <div class="feature-card" class:animate={mounted}>
          <div class="feature-icon">🚀</div>
          <h3>Pure Svelte</h3>
          <p>Built with modern Svelte 5 runes and reactive patterns</p>
        </div>
        
        <div class="feature-card" class:animate={mounted}>
          <div class="feature-icon">🎨</div>
          <h3>Native CSS</h3>
          <p>No external dependencies, just clean and efficient CSS</p>
        </div>
        
        <div class="feature-card" class:animate={mounted}>
          <div class="feature-icon">📱</div>
          <h3>Responsive</h3>
          <p>Works perfectly on desktop, tablet, and mobile devices</p>
        </div>
        
        <div class="feature-card" class:animate={mounted}>
          <div class="feature-icon">⚡</div>
          <h3>Lightweight</h3>
          <p>Minimal bundle size with maximum functionality</p>
        </div>
        
        <div class="feature-card" class:animate={mounted}>
          <div class="feature-icon">🎯</div>
          <h3>TypeScript Ready</h3>
          <p>Full TypeScript support with proper type definitions</p>
        </div>
        
        <div class="feature-card" class:animate={mounted}>
          <div class="feature-icon">🔧</div>
          <h3>Customizable</h3>
          <p>Easy to theme and adapt to your design system</p>
        </div>
      </div>
      
      <!-- Design Section -->
      <Design />
      
      <!-- CTA Section -->
      <div class="cta-section">
        <p class="cta-text">
          Experience the power of modern sidebar navigation.<br>
          Try collapsing the sidebar or switching to mobile view to see it in action!
        </p>
        
        <a href="/sidebar" class="experience-button">
          <span class="button-icon">✨</span>
          Check It Out
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .page-content {
    max-width: 100%;
    margin: 0 auto;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
  }
  
  .hero-section {
    text-align: center;
    max-width: 900px;
    padding: 2rem;
  }
  
  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }
  
  .brand-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .logo {
    width: 60px;
    height: 60px;
    transition: transform 0.3s ease;
  }
  
  .logo:hover {
    transform: scale(1.1) rotate(5deg);
  }
  
  .plus-symbol {
    font-size: 2rem;
    font-weight: bold;
    color: #666;
    user-select: none;
  }
  
  .main-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    background: linear-gradient(135deg, #FF3E00 0%, #264DE4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    letter-spacing: -0.02em;
  }
  
  .main-subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    color: #ccc;
    margin: 0;
    font-weight: 500;
  }
  
  .description-section {
    max-width: 600px;
  }
  
  .description {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.8;
    color: #aaa;
    margin: 0;
  }
  
  .description strong {
    color: #FF3E00;
    font-weight: 600;
  }
  
  .description .css-highlight {
    color: #264DE4;
    font-weight: 600;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 900px;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(20px);
  }
  
  .feature-card.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 62, 0, 0.3);
    box-shadow: 0 20px 40px rgba(255, 62, 0, 0.1);
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .feature-card h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: white;
    margin: 0 0 0.8rem 0;
  }
  
  .feature-card p {
    color: #aaa;
    margin: 0;
    line-height: 1.6;
    font-size: 0.95rem;
  }
  
  .cta-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    max-width: 600px;
  }
  
  .experience-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.5rem;
    background: linear-gradient(135deg, #FF3E00 0%, #264DE4 100%);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 62, 0, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .experience-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  .experience-button:hover::before {
    left: 100%;
  }
  
  .experience-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(255, 62, 0, 0.4);
  }
  
  .experience-button:active {
    transform: translateY(-1px);
  }
  
  .button-icon {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
  
  .cta-text {
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: #bbb;
    margin: 0;
    line-height: 1.7;
  }
  
  @media (max-width: 768px) {
    .hero-content {
      gap: 2rem;
    }
    
    .logo-container {
      gap: 1rem;
    }
    
    .logo {
      width: 45px;
      height: 45px;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .feature-card {
      padding: 1.5rem;
    }
    
    .experience-button {
      padding: 0.9rem 1.5rem;
      font-size: 1rem;
      width: auto;
      max-width: 250px;
      justify-content: center;
    }
  }
  
  /* Animation delays for staggered effect */
  .feature-card:nth-child(1) { transition-delay: 0.1s; }
  .feature-card:nth-child(2) { transition-delay: 0.2s; }
  .feature-card:nth-child(3) { transition-delay: 0.3s; }
  .feature-card:nth-child(4) { transition-delay: 0.4s; }
  .feature-card:nth-child(5) { transition-delay: 0.5s; }
  .feature-card:nth-child(6) { transition-delay: 0.6s; }
</style>