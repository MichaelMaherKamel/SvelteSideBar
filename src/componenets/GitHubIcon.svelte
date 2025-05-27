<!-- Enhanced GitHubIcon.svelte with Paper Fold Effect -->
<a 
  href="https://github.com/MichaelMaherKamel/SvelteSideBar" 
  target="_blank" 
  rel="noopener noreferrer"
  class="github-corner"
  aria-label="View on GitHub"
>
  <div class="paper-fold">
    <!-- Main folded corner -->
    <div class="fold-surface"></div>
    
    <!-- Shadow underneath the fold -->
    <div class="fold-shadow"></div>
    
    <!-- Crease line -->
    <div class="fold-crease"></div>
    
    <!-- Back of the paper (what shows when folded) -->
    <div class="fold-back"></div>
    
    <!-- GitHub icon -->
    <div class="github-icon">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </div>
    
    <!-- Subtle highlight on the fold edge -->
    <div class="fold-highlight"></div>
  </div>
</a>

<style>
  .github-corner {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    display: block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    width: 70px;
    height: 70px;
  }
  
  .paper-fold {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Main paper surface that gets folded */
  .fold-surface {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 70px solid rgba(255, 255, 255, 0.08);
    border-left: 70px solid transparent;
    backdrop-filter: blur(8px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: top right;
  }
  
  /* Shadow cast by the folded corner */
  .fold-shadow {
    position: absolute;
    top: 3px;
    right: -3px;
    width: 0;
    height: 0;
    border-top: 67px solid rgba(0, 0, 0, 0.15);
    border-left: 67px solid transparent;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: top right;
  }
  
  /* The back side of the folded paper */
  .fold-back {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 70px solid rgba(40, 40, 40, 0.9);
    border-left: 70px solid transparent;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: top right;
    opacity: 0;
  }
  
  /* Crease line where the paper folds */
  .fold-crease {
    position: absolute;
    top: 0;
    right: 0;
    width: 99px;
    height: 1px;
    background: linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 55%, transparent 100%);
    transform: rotate(45deg);
    transform-origin: top right;
    opacity: 0.6;
    transition: opacity 0.4s ease;
  }
  
  /* Highlight on the fold edge */
  .fold-highlight {
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 70px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
    transform: rotate(45deg);
    transform-origin: top right;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  /* GitHub icon positioning */
  .github-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(-45deg);
    z-index: 10;
  }
  
  /* Hover effects */
  .github-corner:hover .paper-fold {
    transform: perspective(200px) rotateX(5deg) rotateY(-5deg);
  }
  
  .github-corner:hover .fold-surface {
    border-top-color: rgba(255, 255, 255, 0.15);
    transform: translateZ(2px);
  }
  
  .github-corner:hover .fold-back {
    opacity: 1;
    border-top-color: rgba(60, 60, 60, 0.95);
  }
  
  .github-corner:hover .fold-shadow {
    border-top-color: rgba(0, 0, 0, 0.25);
    transform: translate(1px, 1px) translateZ(-1px);
  }
  
  .github-corner:hover .fold-crease {
    opacity: 1;
  }
  
  .github-corner:hover .fold-highlight {
    opacity: 1;
  }
  
  .github-corner:hover .github-icon {
    color: #FF3E00;
    transform: rotate(-45deg) scale(1.1) translateZ(3px);
  }
  
  /* Active state */
  .github-corner:active .paper-fold {
    transform: perspective(200px) rotateX(2deg) rotateY(-2deg);
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .github-corner {
      width: 55px;
      height: 55px;
    }
    
    .fold-surface {
      border-top: 55px solid rgba(255, 255, 255, 0.08);
      border-left: 55px solid transparent;
    }
    
    .fold-shadow {
      border-top: 52px solid rgba(0, 0, 0, 0.15);
      border-left: 52px solid transparent;
      top: 2px;
      right: -2px;
    }
    
    .fold-back {
      border-top: 55px solid rgba(40, 40, 40, 0.9);
      border-left: 55px solid transparent;
    }
    
    .fold-crease {
      width: 78px;
    }
    
    .fold-highlight {
      height: 55px;
    }
    
    .github-icon {
      top: 10px;
      right: 10px;
      width: 22px;
      height: 22px;
    }
    
    .github-icon svg {
      width: 14px;
      height: 14px;
    }
  }
  
  /* Subtle animation on load */
  @keyframes unfold {
    0% {
      transform: perspective(200px) rotateX(15deg) rotateY(-15deg);
    }
    100% {
      transform: perspective(200px) rotateX(0deg) rotateY(0deg);
    }
  }
  
  .paper-fold {
    animation: unfold 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
  }
</style>