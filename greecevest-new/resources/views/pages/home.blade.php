@extends('layouts.main')

@section('title', 'GREECEVEST — Greek Real Estate Platform')
@section('description', 'One platform for buyers, sellers, owners, and every professional who serves them in Greek real estate.')

@section('content')

<!-- ===== HERO ===== -->
<section class="hero">
    <img src="{{ asset('images/hero-homepage.jpg') }}" alt="Modern luxury villa with infinity pool overlooking the Aegean Sea" class="hero-img">
    <div class="hero-overlay"></div>
    <div class="hero-overlay-dark"></div>

    <div class="hero-content">
        <div class="hero-inner">
            <h1 class="hero-title">
                Shaping the future of<br>
                <span class="hero-title-gradient">Greek real estate.</span>
            </h1>
            <p class="hero-subtitle">
                One platform for buyers, sellers, owners, and every professional who serves them — from legal and finance to construction, management, and lifestyle.
            </p>

            <!-- Search Bar -->
            <div class="search-bar">
                <div class="search-field">
                    <span class="search-label">Location</span>
                    <div class="search-field-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <input class="search-input" placeholder="Athens, Crete, Mykonos..." type="text">
                    </div>
                </div>
                <div class="search-field">
                    <span class="search-label">Property Type</span>
                    <select class="search-select">
                        <option value="">All Types</option>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="land">Land</option>
                        <option value="commercial">Commercial</option>
                    </select>
                </div>
                <div class="search-field">
                    <span class="search-label">Max Budget</span>
                    <select class="search-select">
                        <option value="">Any Price</option>
                        <option value="250">Up to €250k</option>
                        <option value="500">Up to €500k</option>
                        <option value="1000">Up to €1M</option>
                        <option value="2000">Up to €2M</option>
                    </select>
                </div>
                <div class="search-btn-wrap">
                    <a href="{{ route('properties') }}" class="search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Search
                    </a>
                </div>
            </div>

            <!-- CTA Buttons -->
            <div class="hero-ctas">
                <a href="{{ route('signup') }}" class="btn btn-accent btn-lg" style="border-radius:9999px; box-shadow: 0 10px 20px -6px rgba(0,0,0,0.3);">Sign Up Free</a>
                <a href="{{ route('professionals') }}" class="btn btn-hero-outline btn-lg">
                    Browse Professionals
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
            </div>

            <!-- Trust Bar -->
            <div class="trust-bar">
                <div class="trust-item">
                    <div class="trust-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <span class="trust-label">Verified Agencies</span>
                </div>
                <div class="trust-item">
                    <div class="trust-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    </div>
                    <span class="trust-label">8 Professional Categories</span>
                </div>
                <div class="trust-item">
                    <div class="trust-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <span class="trust-label">Listings Across Greece</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===== BUILT FOR EVERYONE ===== -->
<section class="section section-bg-white" style="position:relative; padding-top:0;">
    <div style="position:absolute; top:-1px; left:0; right:0; pointer-events:none; overflow:hidden; line-height:0;">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style="width:100%; height:5rem; display:block;">
            <path d="M0,0 C320,80 720,80 1080,40 C1260,20 1380,10 1440,0 L1440,0 L0,0 Z" fill="var(--primary)"/>
        </svg>
    </div>
    <div style="max-width:72rem; margin:0 auto; padding:5rem 1rem 0; position:relative; z-index:1;">

        <div class="audience-header">
            <div>
                <span class="section-label" style="font-size:0.75rem; letter-spacing:0.2em;">Who it's for</span>
                <h2 class="section-title" style="margin-top:1rem;">
                    Three audiences, one Greek property platform.
                </h2>
            </div>
            <div class="audience-header-right">
                <p class="section-desc">
                    Buyers, agents, and the wider professional network that supports Greek real estate. Each gets the tools and visibility they need, without leaving the platform.
                </p>
            </div>
        </div>

        <div class="audience-list">
            <!-- Audience 01: Buyers -->
            <article class="audience-item">
                <div class="audience-num">
                    <span class="audience-num-text">01</span>
                    <div>
                        <span class="audience-tag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            Buyers
                        </span>
                    </div>
                </div>
                <div class="audience-body">
                    <h3 class="audience-body-title">Property buyers, local and international</h3>
                    <p class="audience-body-desc">Discover verified listings, save searches, and message agents directly. Get expert help when you need it, from legal to lifestyle.</p>
                    <ul class="audience-points">
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Advanced filters and map-based search
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Saved alerts when new listings match
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Direct messaging with agencies and owners
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Connect with verified professionals on demand
                        </li>
                    </ul>
                </div>
                <div class="audience-cta">
                    <a href="{{ route('signup') }}" class="btn btn-outline" style="border-radius:9999px;">
                        Sign up as a Buyer
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                </div>
            </article>

            <!-- Audience 02: Agencies -->
            <article class="audience-item">
                <div class="audience-num">
                    <span class="audience-num-text">02</span>
                    <div>
                        <span class="audience-tag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
                            Agencies
                        </span>
                    </div>
                </div>
                <div class="audience-body">
                    <h3 class="audience-body-title">Real estate agents and brokerages</h3>
                    <p class="audience-body-desc">Reach an international, qualified audience. Manage listings, leads, and conversations from one workspace.</p>
                    <ul class="audience-points">
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            List properties with rich media and full visibility
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Receive leads pre-qualified by intent and budget
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            One dashboard for inquiries across every listing
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Stand out with a verified agency profile
                        </li>
                    </ul>
                </div>
                <div class="audience-cta">
                    <a href="{{ route('signup') }}" class="btn btn-outline" style="border-radius:9999px;">
                        List your Properties
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                </div>
            </article>

            <!-- Audience 03: Professionals -->
            <article class="audience-item">
                <div class="audience-num">
                    <span class="audience-num-text">03</span>
                    <div>
                        <span class="audience-tag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            Professionals
                        </span>
                    </div>
                </div>
                <div class="audience-body">
                    <h3 class="audience-body-title">The professionals behind every transaction</h3>
                    <p class="audience-body-desc">Lawyers, notaries, architects, engineers, surveyors, tax advisors, mortgage brokers, interior designers, contractors, property managers, relocation consultants, and insurance specialists, in one trusted directory of vetted experts.</p>
                    <ul class="audience-points">
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Be discovered by international buyers
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Build a verified profile and reputation
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Receive qualified leads directly
                        </li>
                        <li class="audience-point">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Showcase expertise across 12+ categories
                        </li>
                    </ul>
                </div>
                <div class="audience-cta">
                    <a href="{{ route('signup') }}" class="btn btn-outline" style="border-radius:9999px;">
                        Join as a Professional
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                </div>
            </article>
        </div>
    </div>
</section>

<!-- ===== PAIN POINT / SOLUTION ===== -->
<section class="section section-bg-surface">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div class="problem-solution">
            <!-- Problem -->
            <div>
                <span class="section-label">The Problem</span>
                <h2 class="problem-title">Greek Real Estate Shouldn't Feel Like a Maze</h2>
                <p class="problem-text">Listings live on dozens of sites, professionals are scattered across word of mouth and directories, and every stage of a property journey — legal, technical, construction, management — asks you to start the search from scratch.</p>
                <p class="problem-text">Whether you're buying, selling, renovating, renting out, or simply maintaining a property, the people you need are rarely in the same place.</p>
                <ul class="problem-points">
                    <li class="problem-point"><span class="dot-red"></span>Listings and professionals scattered across dozens of channels</li>
                    <li class="problem-point"><span class="dot-red"></span>No reliable way to verify credentials or track records</li>
                    <li class="problem-point"><span class="dot-red"></span>Hard to find the right specialist for each stage</li>
                    <li class="problem-point"><span class="dot-red"></span>Lack of transparency and accountability throughout</li>
                </ul>
            </div>
            <!-- Solution -->
            <div class="solution-card">
                <span class="section-label">The Solution</span>
                <h3 style="margin-top:0.75rem; font-size:1.5rem; font-weight:700; color:var(--foreground);">GREECEVEST Brings It All Together</h3>
                <p style="margin-top:1rem; color:var(--muted-foreground); line-height:1.6;">One platform where you discover properties and connect with every expert involved in a Greek property journey, across all eight service categories.</p>
                <ul class="solution-points">
                    <li class="solution-point">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Curated properties in one searchable directory
                    </li>
                    <li class="solution-point">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Eight categories of vetted professionals under one roof
                    </li>
                    <li class="solution-point">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        From legal and financial to construction, management, and lifestyle
                    </li>
                    <li class="solution-point">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        End-to-end support, from first search to long-term ownership
                    </li>
                </ul>
                <a href="{{ route('signup') }}" class="btn btn-accent" style="margin-top:2rem;">Sign Up Free</a>
            </div>
        </div>
    </div>
</section>

<!-- ===== WHAT YOU CAN DO ===== -->
<section class="section section-bg-white">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem; text-align:center;">
        <span class="section-label">What You Can Do</span>
        <h2 class="section-title" style="margin-top:0.75rem;">Everything You Need, In One Place</h2>
        <p class="section-desc" style="max-width:42rem; margin:1rem auto 0;">Use the platform however suits you. Explore listings or connect directly with a verified expert.</p>

        <div class="feature-cards">
            <div class="feature-card">
                <div class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                </div>
                <h3 class="feature-card-title">Explore Properties</h3>
                <p class="feature-card-desc">Browse curated Greek listings filtered by location, budget, and type.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 class="feature-card-title">Find Professionals</h3>
                <p class="feature-card-desc">Eight categories of verified experts — from lawyers and notaries to architects, contractors, and property managers.</p>
            </div>
        </div>
    </div>
</section>

<!-- ===== PROFESSIONAL CATEGORIES ===== -->
<section class="section section-bg-surface">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div class="text-center max-w-3xl-centered mb-12">
            <span class="section-label">Every Professional You Need</span>
            <h2 class="section-title" style="margin-top:0.75rem;">Eight Categories, One Verified Network</h2>
            <p class="section-desc" style="max-width:48rem; margin:1rem auto 0;">From legal counsel and property management to construction, technology, and lifestyle support, GREECEVEST gathers every expert involved in a Greek property journey.</p>
        </div>

        <div class="categories-grid" style="margin-top:3rem;">
            <a href="{{ route('professionals') }}" class="category-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="20" height="12" rx="2"/><path d="M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>
                <span>Legal &amp; Financial</span>
            </a>
            <a href="{{ route('professionals') }}" class="category-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="2" x2="6" y2="22"/><line x1="18" y1="11" x2="2" y2="11"/><polyline points="12 2 18 11 12 20"/></svg>
                <span>Technical &amp; Planning</span>
            </a>
            <a href="{{ route('professionals') }}" class="category-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
                <span>Real Estate Services</span>
            </a>
            <a href="{{ route('professionals') }}" class="category-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M4 20V10l8-6 8 6v10"/><rect x="9" y="13" width="6" height="7" rx="1"/></svg>
                <span>Development &amp; Construction</span>
            </a>
            <a href="{{ route('professionals') }}" class="category-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 1.41 14.14"/><path d="M4.93 4.93A10 10 0 0 0 3.52 19.07"/></svg>
                <span>Property Management</span>
            </a>
            <a href="{{ route('professionals') }}" class="category-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                <span>Maintenance &amp; Operations</span>
            </a>
            <a href="{{ route('professionals') }}" class="category-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <span>Tech, Media &amp; Innovation</span>
            </a>
            <a href="{{ route('professionals') }}" class="category-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                <span>Lifestyle &amp; Personal Support</span>
            </a>
        </div>

        <div style="margin-top:2.5rem; text-align:center;">
            <a href="{{ route('professionals') }}" style="display:inline-flex; align-items:center; gap:0.25rem; font-size:0.875rem; font-weight:600; color:var(--accent);">
                Browse all categories
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>
    </div>
</section>

<!-- ===== FEATURED PROPERTIES ===== -->
<section class="section section-bg-white">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div class="flex items-end justify-between mb-10">
            <div>
                <span class="section-label" style="font-size:0.75rem;">Featured Properties</span>
                <h2 style="margin-top:0.5rem; font-size:1.5rem; font-weight:700; color:var(--foreground);">Handpicked for You</h2>
            </div>
            <a href="{{ route('properties') }}" class="hidden-sm" style="display:none; align-items:center; gap:0.25rem; font-size:0.875rem; font-weight:500; color:var(--accent);">
                View all properties
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>

        <div class="properties-grid">
            <!-- Property 1 -->
            <article class="property-card">
                <div class="property-img-wrap">
                    <img src="{{ asset('images/property-1.jpg') }}" alt="Stone Villa with Panoramic Sea Views" loading="lazy">
                    <div class="property-img-overlay"></div>
                    <span class="property-badge">Villa</span>
                    <button class="property-save-btn" aria-label="Save to favorites">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <span class="property-price">€385,000</span>
                </div>
                <div class="property-body">
                    <h3 class="property-title">Stone Villa with Panoramic Sea Views</h3>
                    <div class="property-location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Kalamata, Peloponnese
                    </div>
                    <ul class="property-specs">
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                            <span class="val">220 m²</span>
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 0 4H2"/><path d="M2 12v4"/></svg>
                            <span class="val">4</span> beds
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                            <span class="val">3</span> baths
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                            <span class="val">1,200 m²</span>
                        </li>
                    </ul>
                    <div class="property-footer">
                        <div class="property-agency">
                            <span>Listed by</span>
                            <span class="agency-name">Kalamata Coast Realty</span>
                        </div>
                        <a href="{{ route('properties') }}" class="btn btn-outline btn-sm btn-w-full">View Details</a>
                    </div>
                </div>
            </article>

            <!-- Property 2 -->
            <article class="property-card">
                <div class="property-img-wrap">
                    <img src="{{ asset('images/property-2.jpg') }}" alt="Modern Apartment near the Acropolis" loading="lazy">
                    <div class="property-img-overlay"></div>
                    <span class="property-badge">Apartment</span>
                    <button class="property-save-btn" aria-label="Save to favorites">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <span class="property-price">€295,000</span>
                </div>
                <div class="property-body">
                    <h3 class="property-title">Modern Apartment near the Acropolis</h3>
                    <div class="property-location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Athens, Attica
                    </div>
                    <ul class="property-specs">
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                            <span class="val">95 m²</span>
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 0 4H2"/><path d="M2 12v4"/></svg>
                            <span class="val">2</span> beds
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                            <span class="val">1</span> bath
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                            <span class="val">—</span>
                        </li>
                    </ul>
                    <div class="property-footer">
                        <div class="property-agency">
                            <span>Listed by</span>
                            <span class="agency-name">Acropolis Property Group</span>
                        </div>
                        <a href="{{ route('properties') }}" class="btn btn-outline btn-sm btn-w-full">View Details</a>
                    </div>
                </div>
            </article>

            <!-- Property 3 -->
            <article class="property-card">
                <div class="property-img-wrap">
                    <img src="{{ asset('images/property-3.jpg') }}" alt="Traditional Cycladic House" loading="lazy">
                    <div class="property-img-overlay"></div>
                    <span class="property-badge">House</span>
                    <button class="property-save-btn" aria-label="Save to favorites">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <span class="property-price">€210,000</span>
                </div>
                <div class="property-body">
                    <h3 class="property-title">Traditional Cycladic House</h3>
                    <div class="property-location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Paros, Cyclades
                    </div>
                    <ul class="property-specs">
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                            <span class="val">85 m²</span>
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 0 4H2"/><path d="M2 12v4"/></svg>
                            <span class="val">2</span> beds
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                            <span class="val">1</span> bath
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                            <span class="val">350 m²</span>
                        </li>
                    </ul>
                    <div class="property-footer">
                        <div class="property-agency">
                            <span>Listed by</span>
                            <span class="agency-name">Cyclades Island Homes</span>
                        </div>
                        <a href="{{ route('properties') }}" class="btn btn-outline btn-sm btn-w-full">View Details</a>
                    </div>
                </div>
            </article>
        </div>

        <div style="margin-top:2rem; text-align:center; display:none;" class="mobile-view-all">
            <a href="{{ route('properties') }}" class="btn btn-outline">View All Properties</a>
        </div>
    </div>
</section>

<!-- ===== CTA BANNER ===== -->
<section class="cta-banner navy">
    <div class="cta-banner-inner">
        <h2>Ready to Start Your Greek Property Journey?</h2>
        <p>Create your free account today and get instant access to verified properties and trusted professionals.</p>
        <a href="{{ route('signup') }}" class="btn btn-accent btn-lg">Sign Up Free</a>
    </div>
</section>

<!-- ===== FAQ ===== -->
<section class="section section-bg-white">
    <div style="max-width:48rem; margin:0 auto; padding:0 1rem;">
        <div style="text-align:center; margin-bottom:3rem;">
            <span class="section-label">Frequently Asked Questions</span>
            <h2 class="section-title" style="margin-top:0.75rem;">Valuable Information</h2>
        </div>

        <div class="faq-list">
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false">
                    Is GREECEVEST free for property buyers?
                    <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="faq-answer"><div class="faq-answer-inner">Yes. Creating an account, browsing listed properties, and connecting with verified professionals is entirely free of charge for buyers and investors. Real estate professionals may access additional premium features through optional subscription plans.</div></div>
            </div>
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false">
                    Are foreign nationals permitted to purchase property in Greece?
                    <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="faq-answer"><div class="faq-answer-inner">In most cases, yes. EU/EEA citizens face no restrictions. Non-EU nationals may purchase property freely in the majority of Greek regions, including Athens, Thessaloniki, and the most sought-after islands. Certain border areas may require additional governmental approvals — our verified legal professionals can advise on specific requirements.</div></div>
            </div>
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false">
                    How does GREECEVEST verify its professionals?
                    <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="faq-answer"><div class="faq-answer-inner">Every professional on the platform undergoes a rigorous vetting process. We verify professional licenses, regulatory standing, qualifications, and relevant track records prior to approval. Ongoing client reviews and periodic re-verification ensure continued quality and accountability.</div></div>
            </div>
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false">
                    What is the Greek Golden Visa programme?
                    <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="faq-answer"><div class="faq-answer-inner">Greece's Golden Visa programme grants five-year renewable residency permits to non-EU nationals who invest in Greek real estate above the applicable threshold (currently €250,000 to €500,000 depending on property location). GREECEVEST connects you with experienced immigration lawyers who specialise in guiding investors through the full application process.</div></div>
            </div>
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false">
                    Is it possible to complete a property purchase remotely?
                    <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="faq-answer"><div class="faq-answer-inner">Yes. While an in-person visit is recommended, many transactions are completed entirely remotely through power of attorney arrangements. GREECEVEST helps you identify professionals experienced in managing cross-border transactions on behalf of international clients.</div></div>
            </div>
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false">
                    What types of properties are available on the platform?
                    <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="faq-answer"><div class="faq-answer-inner">The platform features a diverse portfolio including residential villas, apartments, townhouses, undeveloped land, commercial properties, and development projects across all major Greek regions — from metropolitan Athens and Thessaloniki to Santorini, Crete, Mykonos, Corfu, and beyond.</div></div>
            </div>
        </div>
    </div>
</section>

<style>
@media (min-width: 640px) {
    .mobile-view-all { display: none !important; }
    a[href*="properties"].hidden-sm { display: flex !important; }
}
</style>

@endsection
