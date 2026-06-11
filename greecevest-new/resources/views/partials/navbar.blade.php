<header class="navbar" id="navbar">
    <div class="navbar-inner">
        <!-- Logo -->
        <a href="{{ route('home') }}" class="navbar-logo" aria-label="GREECEVEST, home">
            <img src="{{ asset('images/logo-greecevest.svg') }}" alt="GREECEVEST">
        </a>

        <!-- Desktop Nav Links -->
        <nav class="navbar-links" aria-label="Main navigation">
            <a href="{{ route('properties') }}" class="nav-link {{ request()->routeIs('properties*') ? 'active' : '' }}">Properties</a>
            <a href="{{ route('professionals') }}" class="nav-link {{ request()->routeIs('professionals*') ? 'active' : '' }}">Professionals</a>
            <a href="{{ route('investment-map') }}" class="nav-link {{ request()->routeIs('investment-map') ? 'active' : '' }}">Market Intelligence</a>
            <a href="{{ route('about') }}" class="nav-link {{ request()->routeIs('about') ? 'active' : '' }}">About</a>
            <a href="{{ route('contact') }}" class="nav-link {{ request()->routeIs('contact') ? 'active' : '' }}">Contact</a>
        </nav>

        <!-- Desktop Actions -->
        <div class="navbar-actions">
            <a href="#" class="lang-toggle" aria-label="Switch to Greek">GR</a>
            <span class="nav-divider" aria-hidden="true"></span>
            <a href="{{ route('login') }}" class="btn btn-ghost btn-sm">Log In</a>
            <a href="{{ route('signup') }}" class="btn btn-accent btn-sm">Sign Up Free</a>
        </div>

        <!-- Mobile Toggle -->
        <button class="navbar-mobile-btn" id="mobile-menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
            <svg id="menu-icon-open" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <svg id="menu-icon-close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <div class="mobile-menu-inner">
            <a href="{{ route('properties') }}" class="mobile-nav-link">Properties</a>
            <a href="{{ route('professionals') }}" class="mobile-nav-link">Professionals</a>
            <a href="{{ route('investment-map') }}" class="mobile-nav-link">Market Intelligence</a>
            <a href="{{ route('about') }}" class="mobile-nav-link">About</a>
            <a href="{{ route('contact') }}" class="mobile-nav-link">Contact</a>
            <a href="#" class="mobile-lang-link">🇬🇷 Ελληνικά</a>
            <div class="mobile-menu-actions">
                <a href="{{ route('login') }}" class="btn btn-ghost btn-sm btn-w-full">Log In</a>
                <a href="{{ route('signup') }}" class="btn btn-accent btn-sm btn-w-full">Sign Up Free</a>
            </div>
        </div>
    </div>
</header>
