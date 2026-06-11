@extends('layouts.main')

@section('title', 'Professionals — GREECEVEST')
@section('description', 'Find verified Greek real estate professionals — lawyers, architects, notaries, property managers, and more.')

@section('content')

<!-- ===== HERO ===== -->
<div class="listing-hero">
    <div style="max-width:80rem; margin:0 auto;">
        <span class="section-label">Professionals</span>
        <h1>Every Expert You Need</h1>
        <p>Eight categories of verified professionals — from legal and financial to construction, management, and lifestyle support.</p>
    </div>
</div>

<!-- ===== FILTERS ===== -->
<div class="filters-bar">
    <input class="filter-input" type="text" placeholder="Search by name or specialty...">
    <select class="filter-select">
        <option value="">All Categories</option>
        <option>Legal &amp; Financial</option>
        <option>Technical &amp; Planning</option>
        <option>Real Estate Services</option>
        <option>Development &amp; Construction</option>
        <option>Property Management</option>
        <option>Maintenance &amp; Operations</option>
        <option>Tech, Media &amp; Innovation</option>
        <option>Lifestyle &amp; Personal Support</option>
    </select>
    <select class="filter-select">
        <option value="">Any Location</option>
        <option>Athens</option>
        <option>Thessaloniki</option>
        <option>Crete</option>
        <option>Cyclades</option>
        <option>Ionian Islands</option>
    </select>
    <button class="btn btn-primary btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Search
    </button>
</div>

<!-- ===== PROFESSIONALS GRID ===== -->
<section class="section section-bg-white">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div style="margin-bottom:1.5rem;">
            <p style="font-size:0.875rem; color:var(--muted-foreground);">Showing <strong style="color:var(--foreground);">6</strong> verified professionals</p>
        </div>

        <div class="professionals-grid">
            @php
            $professionals = [
                ['name'=>'Maria Papadopoulou','photo'=>'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face','profession'=>'Real Estate Agent','location'=>'Athens, Attica','bio'=>'15+ years helping international buyers find their dream property in Greece. Specializing in Athens and island properties.','verified'=>true,'rating'=>4.9,'reviews'=>47],
                ['name'=>'Nikos Stavridis','photo'=>'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face','profession'=>'Lawyer','location'=>'Thessaloniki','bio'=>'Greek property law expert. Handles title searches, contract drafting, and Golden Visa applications.','verified'=>true,'rating'=>4.8,'reviews'=>32],
                ['name'=>'Elena Georgiou','photo'=>'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face','profession'=>'Architect','location'=>'Santorini, Cyclades','bio'=>'Award-winning architect specializing in traditional Cycladic design and modern Greek villa renovations.','verified'=>true,'rating'=>5.0,'reviews'=>21],
                ['name'=>'Dimitris Katsaros','photo'=>'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face','profession'=>'Accountant','location'=>'Athens, Attica','bio'=>'International tax specialist for foreign property investors in Greece. Expert in Greek tax law and cross-border taxation.','verified'=>true,'rating'=>4.7,'reviews'=>19],
                ['name'=>'Sofia Alexiou','photo'=>'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face','profession'=>'Property Manager','location'=>'Crete','bio'=>'Full-service property management for vacation rentals and investment properties across Crete.','verified'=>false,'rating'=>4.6,'reviews'=>14],
                ['name'=>'Kostas Marinakis','photo'=>'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face','profession'=>'Mortgage Broker','location'=>'Athens, Attica','bio'=>'Connects international buyers with Greek banks offering competitive mortgage rates. Speaks English, German, and Greek.','verified'=>true,'rating'=>4.8,'reviews'=>26],
            ];
            @endphp

            @foreach($professionals as $pro)
            <article class="pro-card">
                <div class="pro-card-body">
                    <div class="pro-header">
                        <div class="pro-avatar-wrap">
                            <img class="pro-avatar" src="{{ $pro['photo'] }}" alt="Portrait of {{ $pro['name'] }}" loading="lazy">
                            @if($pro['verified'])
                            <span class="pro-verified" aria-label="Verified professional">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="rgba(110,180,212,0.2)" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </span>
                            @endif
                        </div>
                        <div class="pro-info">
                            <h3 class="pro-name">{{ $pro['name'] }}</h3>
                            <p class="pro-profession">{{ $pro['profession'] }}</p>
                            <div class="pro-location">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                {{ $pro['location'] }}
                            </div>
                        </div>
                    </div>
                    <p class="pro-bio">{{ $pro['bio'] }}</p>
                </div>
                <div class="pro-footer">
                    <div class="pro-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span class="rating-val">{{ $pro['rating'] }}</span>
                        <span class="review-count">({{ $pro['reviews'] }})</span>
                    </div>
                    <div class="pro-btns">
                        <a href="#" class="btn btn-outline btn-sm">Profile</a>
                        <a href="{{ route('contact') }}" class="btn btn-primary btn-sm">Contact</a>
                    </div>
                </div>
            </article>
            @endforeach
        </div>
    </div>
</section>

<!-- ===== CTA ===== -->
<section class="cta-banner navy">
    <div class="cta-banner-inner">
        <h2>Are you a professional in Greek real estate?</h2>
        <p>Join GREECEVEST, get verified, and start receiving qualified leads from buyers and owners across Greece.</p>
        <a href="{{ route('signup') }}" class="btn btn-accent btn-lg">Join as a Professional</a>
    </div>
</section>

@endsection
