@extends('layouts.main')

@section('title', 'Properties — GREECEVEST')
@section('description', 'Browse verified Greek real estate listings — villas, apartments, houses, and more across Greece.')

@section('content')

<!-- ===== HERO ===== -->
<div class="listing-hero">
    <div style="max-width:80rem; margin:0 auto;">
        <span class="section-label">Properties</span>
        <h1>Discover Greek Real Estate</h1>
        <p>Browse curated listings across Greece — from Athens penthouses to island villas and Cycladic retreats.</p>
    </div>
</div>

<!-- ===== FILTERS ===== -->
<div class="filters-bar">
    <input class="filter-input" type="text" placeholder="Search location...">
    <select class="filter-select">
        <option value="">All Types</option>
        <option>Villa</option>
        <option>Apartment</option>
        <option>House</option>
        <option>Land</option>
        <option>Commercial</option>
    </select>
    <select class="filter-select">
        <option value="">Any Price</option>
        <option>Up to €250k</option>
        <option>Up to €500k</option>
        <option>Up to €1M</option>
        <option>Up to €2M</option>
    </select>
    <select class="filter-select">
        <option value="">Any Size</option>
        <option>Under 100 m²</option>
        <option>100–200 m²</option>
        <option>200–400 m²</option>
        <option>400+ m²</option>
    </select>
    <button class="btn btn-primary btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Search
    </button>
</div>

<!-- ===== LISTINGS ===== -->
<section class="section section-bg-white">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div style="margin-bottom:1.5rem; display:flex; align-items:center; justify-content:space-between;">
            <p style="font-size:0.875rem; color:var(--muted-foreground);">Showing <strong style="color:var(--foreground);">6</strong> properties</p>
        </div>

        <div class="properties-grid">
            @php
            $properties = [
                ['img'=>'property-1.jpg','title'=>'Stone Villa with Panoramic Sea Views','location'=>'Kalamata, Peloponnese','price'=>'€385,000','size'=>'220 m²','beds'=>4,'baths'=>3,'plot'=>'1,200 m²','type'=>'Villa','agency'=>'Kalamata Coast Realty'],
                ['img'=>'property-2.jpg','title'=>'Modern Apartment near the Acropolis','location'=>'Athens, Attica','price'=>'€295,000','size'=>'95 m²','beds'=>2,'baths'=>1,'plot'=>'—','type'=>'Apartment','agency'=>'Acropolis Property Group'],
                ['img'=>'property-3.jpg','title'=>'Traditional Cycladic House','location'=>'Paros, Cyclades','price'=>'€210,000','size'=>'85 m²','beds'=>2,'baths'=>1,'plot'=>'350 m²','type'=>'House','agency'=>'Cyclades Island Homes'],
                ['img'=>'property-1.jpg','title'=>'Luxury Seafront Estate','location'=>'Corfu, Ionian Islands','price'=>'€1,200,000','size'=>'450 m²','beds'=>6,'baths'=>5,'plot'=>'3,500 m²','type'=>'Villa','agency'=>'Ionian Luxury Estates'],
                ['img'=>'property-2.jpg','title'=>'Renovated Neoclassical in Plaka','location'=>'Athens, Attica','price'=>'€520,000','size'=>'140 m²','beds'=>3,'baths'=>2,'plot'=>'—','type'=>'Apartment','agency'=>'Plaka Heritage Realty'],
                ['img'=>'property-3.jpg','title'=>'Whitewashed Retreat with Garden','location'=>'Naxos, Cyclades','price'=>'€175,000','size'=>'70 m²','beds'=>1,'baths'=>1,'plot'=>'280 m²','type'=>'House','agency'=>'Naxos Aegean Properties'],
            ];
            @endphp

            @foreach($properties as $p)
            <article class="property-card">
                <div class="property-img-wrap">
                    <img src="{{ asset('images/'.$p['img']) }}" alt="{{ $p['title'] }}" loading="lazy">
                    <div class="property-img-overlay"></div>
                    <span class="property-badge">{{ $p['type'] }}</span>
                    <button class="property-save-btn" aria-label="Save to favorites">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <span class="property-price">{{ $p['price'] }}</span>
                </div>
                <div class="property-body">
                    <h3 class="property-title">{{ $p['title'] }}</h3>
                    <div class="property-location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {{ $p['location'] }}
                    </div>
                    <ul class="property-specs">
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                            <span class="val">{{ $p['size'] }}</span>
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 0 4H2"/><path d="M2 12v4"/></svg>
                            <span class="val">{{ $p['beds'] }}</span> beds
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                            <span class="val">{{ $p['baths'] }}</span> baths
                        </li>
                        <li class="property-spec">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                            <span class="val">{{ $p['plot'] }}</span>
                        </li>
                    </ul>
                    <div class="property-footer">
                        <div class="property-agency">
                            <span>Listed by</span>
                            <span class="agency-name">{{ $p['agency'] }}</span>
                        </div>
                        <a href="#" class="btn btn-outline btn-sm btn-w-full">View Details</a>
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
        <h2>Can't find what you're looking for?</h2>
        <p>Create a free account and set up alerts — we'll notify you when new listings match your criteria.</p>
        <a href="{{ route('signup') }}" class="btn btn-accent btn-lg">Sign Up Free</a>
    </div>
</section>

@endsection
