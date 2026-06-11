@extends('layouts.main')

@section('title', 'Market Intelligence — GREECEVEST')
@section('description', 'Explore Greek real estate market data, investment hotspots, and regional insights.')

@section('content')
<div class="listing-hero">
    <div style="max-width:80rem; margin:0 auto;">
        <span class="section-label">Market Intelligence</span>
        <h1>Greek Real Estate Market Map</h1>
        <p>Explore investment hotspots, market trends, and regional data across Greece.</p>
    </div>
</div>

<section class="section section-bg-surface">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem; text-align:center;">
        <div style="background:var(--card); border:1px solid var(--border); border-radius:1rem; padding:4rem 2rem; box-shadow:var(--shadow-card);">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 1.5rem;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <h2 style="font-size:1.5rem; font-weight:700; color:var(--foreground);">Interactive Investment Map</h2>
            <p style="margin-top:0.75rem; color:var(--muted-foreground); max-width:36rem; margin-left:auto; margin-right:auto;">The interactive investment map is coming soon. Create an account to get notified when it launches.</p>
            <a href="{{ route('signup') }}" class="btn btn-accent" style="margin-top:2rem;">Sign Up for Early Access</a>
        </div>
    </div>
</section>
@endsection
