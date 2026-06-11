@extends('layouts.main')

@section('title', 'About Us — GREECEVEST')
@section('description', 'Learn about GREECEVEST — the platform shaping the future of Greek real estate by uniting buyers, owners, and verified professionals.')

@section('content')

<!-- ===== HERO ===== -->
<section class="page-hero">
    <img src="{{ asset('images/about-hero.jpg') }}" alt="Athens skyline with the Acropolis at golden hour" class="page-hero-img">
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
        <div class="page-hero-inner">
            <span class="section-label">About Us</span>
            <h1 class="page-hero-title">
                Shaping the future of
                <span class="accent">Greek real estate.</span>
            </h1>
            <p class="page-hero-text">
                One platform uniting buyers, owners, and eight categories of verified professionals — from legal and financial to construction, property management, and lifestyle support.
            </p>
        </div>
    </div>
</section>

<!-- ===== OUR STORY ===== -->
<section class="section section-bg-surface">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div class="about-story-grid">
            <div>
                <span class="section-label">Our Story</span>
                <h2 class="story-title">Born from a real problem.</h2>
                <div class="story-text">
                    <p>GREECEVEST was born when our founder saw how tangled Greek real estate had become for everyone involved. Not only foreign buyers, but everyday Greeks selling a family home, owners managing a rental, or families planning a renovation. Finding a trusted lawyer, notary, architect, contractor, or property manager was a word-of-mouth lottery.</p>
                    <p>Listings were scattered across dozens of channels. Credentials were impossible to verify. Each stage — from search and due diligence to construction, management, and lifestyle support — lived in its own silo. Whether you were buying a villa from abroad, selling a flat in Athens, or moving in down the street, the journey was exhausting.</p>
                    <p>We built GREECEVEST to fix that. Verified properties, eight categories of vetted professionals (legal, financial, technical, construction, management, maintenance, tech, and lifestyle), and clear guidance — all in one platform for buyers, sellers, owners, movers, and the professionals who serve them.</p>
                </div>
            </div>

            <div class="story-img-wrap">
                <img src="{{ asset('images/about-story.jpg') }}" alt="A quiet neoclassical street in Plaka, Athens with the Acropolis above" loading="lazy">
                <div class="story-img-overlay"></div>
                <div class="story-badge">
                    <div class="story-badge-row">
                        <span class="year">2024</span>
                        <span class="founded">Founded in Athens</span>
                    </div>
                    <p>Built on the ground we know best, with a mission to change how people buy, sell, own, and care for Greek property.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===== MISSION + VISION ===== -->
<section class="section section-bg-accent">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div class="mission-vision">
            <span class="section-label">Our Mission</span>
            <h2 class="mission-title">
                To simplify and professionalize Greek real estate for everyone.
            </h2>
            <p style="margin-top:1rem; color:var(--muted-foreground); max-width:42rem; margin-left:auto; margin-right:auto; line-height:1.6;">
                Buyers, sellers, owners, movers, and the eight categories of professionals who serve them all deserve transparency, quality, and clarity at every step.
            </p>

            <div class="vision-card">
                <span class="section-label" style="font-size:0.75rem; letter-spacing:0.2em;">Our Vision</span>
                <p>A unified digital ecosystem where verified properties and vetted professionals — across legal, financial, technical, construction, management, maintenance, tech, and lifestyle — come together for a modern, transparent, end-to-end real estate experience.</p>
            </div>
        </div>
    </div>
</section>

<!-- ===== WHO IT'S FOR ===== -->
<section class="section section-bg-white">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div style="text-align:center; max-width:42rem; margin:0 auto;">
            <span class="section-label">Who It's For</span>
            <h2 class="section-title" style="margin-top:0.75rem;">Built for everyone in Greek property.</h2>
            <p style="margin-top:0.75rem; color:var(--muted-foreground); line-height:1.6;">Whether you're buying from abroad, selling a family home, renovating, managing a rental, or running a practice that serves any of them, GREECEVEST is built for you.</p>
        </div>

        <div class="cards-grid-3" style="margin-top:3rem;">
            <article class="icon-card">
                <div class="icon-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h3>International buyers</h3>
                <p>Discover verified properties and English-speaking professionals across all eight categories, so you can buy, build, or move to Greece with confidence from anywhere.</p>
            </article>
            <article class="icon-card">
                <div class="icon-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <h3>Local buyers, sellers &amp; owners</h3>
                <p>Greek residents finding a home, selling a flat, renovating, or managing a rental — with vetted lawyers, notaries, architects, contractors, and managers all in one place.</p>
            </article>
            <article class="icon-card">
                <div class="icon-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <h3>Property professionals</h3>
                <p>From legal and financial to construction, management, tech, and lifestyle. Reach serious clients, build trust through verified reviews, and grow your practice.</p>
            </article>
        </div>
    </div>
</section>

<!-- ===== CORE VALUES ===== -->
<section class="section section-bg-surface">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div style="text-align:center;">
            <span class="section-label">What We Stand For</span>
            <h2 class="section-title" style="margin-top:0.75rem;">Our Core Values</h2>
            <p style="margin-top:0.75rem; color:var(--muted-foreground);">The principles that guide every decision we make.</p>
        </div>

        <div class="cards-grid-4" style="margin-top:3rem;">
            <article class="icon-card">
                <div class="icon-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <h3>Transparency</h3>
                <p>Full visibility into every property, process, and professional — with no hidden surprises.</p>
            </article>
            <article class="icon-card">
                <div class="icon-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                </div>
                <h3>Quality</h3>
                <p>Every listing verified, every professional vetted across all eight categories. We hold the bar high.</p>
            </article>
            <article class="icon-card">
                <div class="icon-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                </div>
                <h3>Clarity</h3>
                <p>Complex processes made simple, with clear guidance from first search to long-term ownership.</p>
            </article>
            <article class="icon-card">
                <div class="icon-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </div>
                <h3>Connection</h3>
                <p>Bridging properties, owners, buyers, and the full network of professionals who serve them.</p>
            </article>
        </div>
    </div>
</section>

<!-- ===== CTA BANNER ===== -->
<section class="cta-banner navy">
    <div class="cta-banner-inner">
        <h2>Be part of the future of Greek real estate.</h2>
        <p>Join GREECEVEST today and experience a new standard in property investment.</p>
        <a href="{{ route('signup') }}" class="btn btn-accent btn-lg">Sign Up Free</a>
    </div>
</section>

@endsection
