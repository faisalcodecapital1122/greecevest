@extends('layouts.main')
@section('title', 'Stone Villa with Panoramic Sea Views — GREECEVEST')

@section('content')
@php
$property = [
  'id'        => '1',
  'title'     => 'Stone Villa with Panoramic Sea Views',
  'location'  => 'Kalamata',
  'region'    => 'Peloponnese',
  'type'      => 'Villa',
  'price'     => '€385,000',
  'size'      => '220 m²',
  'bedrooms'  => 4,
  'bathrooms' => 3,
  'plotSize'  => '1,200 m²',
  'image'     => asset('images/property-1.jpg'),
  'agency'    => 'Kalamata Coast Realty',
  'features'  => ['pool','sea_view','parking','garden','fireplace','terrace','ac'],
];
$extras = [
  'yearBuilt'        => 1997,
  'energy'           => 'B+',
  'orientation'      => 'South',
  'floors'           => 2,
  'ref'              => 'GV-0001-5847',
  'listedDays'       => 12,
  'viewsThisWeek'    => 183,
  'enquiriesThisWeek'=> 7,
  'agent'            => ['name'=>'Maria Papadopoulou','role'=>'Senior Listing Agent'],
  'agencyCity'       => 'Kalamata',
  'agencyTagline'    => 'Specialist in Peloponnese coastal and rural properties for international buyers.',
];
$priceNum    = 385000;
$sizeNum     = 220;
$pricePerSqm = round($priceNum / $sizeNum);
$gallery     = array_fill(0, 6, $property['image']);
$featureLabels = [
  'pool'=>'Swimming Pool','sea_view'=>'Sea View','parking'=>'Private Parking',
  'garden'=>'Garden','fireplace'=>'Fireplace','terrace'=>'Terrace',
  'ac'=>'Air Conditioning','elevator'=>'Elevator','gym'=>'Gym',
];
$description = "Set in the heart of {$property['location']}, {$property['region']}, this villa offers {$property['size']} of refined living space across {$extras['floors']} floors. Thoughtfully oriented to the {$extras['orientation']}, the home enjoys generous natural light throughout the day and a calm, private atmosphere uncommon for the area.\n\nThe property has been carefully maintained and is delivered in move-in condition, with {$property['bedrooms']} well-proportioned bedrooms and {$property['bathrooms']} bathrooms. Living spaces flow naturally toward outdoor terraces, ideal for both quiet mornings and entertaining.\n\nA rare combination of location, character, and long-term value, this listing is well suited to discerning international buyers, full-time residents, and investors seeking a foothold in one of Greece's most sought-after regions.";

$similarProps = [
  ['id'=>'2','img'=>'property-2.jpg','title'=>'Modern Apartment near the Acropolis','location'=>'Athens, Attica','price'=>'€295,000','type'=>'Apartment','beds'=>2,'baths'=>1,'size'=>'95 m²','plot'=>'—','agency'=>'Acropolis Property Group'],
  ['id'=>'3','img'=>'property-3.jpg','title'=>'Traditional Cycladic House','location'=>'Paros, Cyclades','price'=>'€210,000','type'=>'House','beds'=>2,'baths'=>1,'size'=>'85 m²','plot'=>'350 m²','agency'=>'Cyclades Island Homes'],
  ['id'=>'4','img'=>'property-1.jpg','title'=>'Luxury Seafront Estate','location'=>'Corfu, Ionian Islands','price'=>'€1,200,000','type'=>'Villa','beds'=>6,'baths'=>5,'size'=>'450 m²','plot'=>'3,500 m²','agency'=>'Ionian Luxury Estates'],
];
@endphp

{{-- ── BREADCRUMB ── --}}
<div class="detail-breadcrumb">
  <div class="detail-breadcrumb-inner">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <a href="{{ route('home') }}">Home</a>
      <span class="breadcrumb-sep">/</span>
      <a href="{{ route('properties') }}">Properties</a>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">{{ $property['title'] }}</span>
    </nav>
    <a href="{{ route('properties') }}" class="breadcrumb-back" style="text-decoration:none;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
      All listings
    </a>
  </div>
</div>

{{-- ── MAIN ARTICLE ── --}}
<div style="background:var(--card);border:1px solid var(--border);box-shadow:var(--shadow-card);max-width:80rem;margin:1.5rem auto;overflow:hidden;">

  {{-- ── ARCHITECTURAL HEADER ── --}}
  <div class="detail-header-grid">

    {{-- Left: Title block --}}
    <div class="detail-title-block">
      <div class="detail-region-nav">
        <span class="line"></span>
        <div class="detail-region-breadcrumb">
          <span>Greece</span>
          <span class="sep">/</span>
          <span>{{ strtoupper($property['region']) }}</span>
          <span class="sep">/</span>
          <span class="location">{{ strtoupper($property['location']) }}</span>
        </div>
      </div>
      <h1 class="detail-main-title">{{ $property['title'] }}</h1>
      <p class="detail-subtitle">
        {{ $property['type'] }} · {{ $property['size'] }} · {{ $property['bedrooms'] }} bed · {{ $property['bathrooms'] }} bath
      </p>
      <div class="detail-action-btns">
        <button type="button" class="detail-action-btn" id="save-btn" onclick="toggleSave()">
          <svg class="heart" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span id="save-label">Save</span>
        </button>
        <button type="button" class="detail-action-btn" onclick="shareProperty()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          Share
        </button>
        <button type="button" class="detail-action-btn" onclick="window.print()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print
        </button>
      </div>
    </div>

    {{-- Right: Price block --}}
    <div class="detail-price-block">
      <p class="detail-price-label">Guide Price</p>
      <div class="detail-price-main">
        <span class="detail-price-value">{{ $property['price'] }}</span>
        <span class="detail-price-sqm">€{{ number_format($pricePerSqm) }} / m²</span>
      </div>
      <p class="detail-ref">Ref: {{ $extras['ref'] }}</p>
      <button type="button" class="detail-enquire-btn" onclick="openEnquiry()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,12 2,6"></polyline></svg>
        Enquire Now →
      </button>
    </div>
  </div>

  {{-- ── GALLERY ── --}}
  <div class="detail-gallery-grid">
    {{-- Main image --}}
    <div class="detail-gallery-main" onclick="openLightbox(0)" id="gallery-main-wrap">
      <img src="{{ $property['image'] }}" alt="{{ $property['title'] }}" id="gallery-main-img" loading="eager">
      <div class="gallery-nav-bar">
        <div class="gallery-nav-btns">
          <button type="button" class="gallery-nav-btn" onclick="event.stopPropagation();galleryNav(-1)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span class="gallery-counter" id="gallery-counter">1 / 6</span>
          <button type="button" class="gallery-nav-btn" onclick="event.stopPropagation();galleryNav(1)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
        <button type="button" class="gallery-view-all" onclick="event.stopPropagation();openLightbox(0)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          View All (6)
        </button>
      </div>
    </div>
    {{-- Thumbnail stack --}}
    <div class="detail-gallery-thumbs">
      <button type="button" class="gallery-thumb-btn" onclick="openLightbox(1)">
        <img src="{{ $property['image'] }}" alt="Gallery image 2" loading="lazy">
      </button>
      <button type="button" class="gallery-thumb-btn" onclick="openLightbox(2)">
        <img src="{{ $property['image'] }}" alt="Gallery image 3" loading="lazy">
        <div class="gallery-thumb-more">
          <span class="count">+4</span>
          <span>View Gallery</span>
        </div>
      </button>
    </div>
  </div>

  {{-- ── CONTENT GRID ── --}}
  <div class="detail-content-grid">

    {{-- Primary content --}}
    <div class="detail-primary">

      {{-- Description --}}
      <div class="detail-section">
        <h2 class="detail-section-title">Description</h2>
        <p class="detail-description">{{ $description }}</p>
      </div>

      {{-- Specification Data --}}
      <div class="detail-section">
        <h2 class="detail-section-title">Specification Data</h2>
        <div class="spec-grid">
          <div class="spec-cell">
            <div class="spec-cell-label">Interior</div>
            <div class="spec-cell-value">{{ $property['size'] }}</div>
            <span class="spec-cell-bar"></span>
          </div>
          <div class="spec-cell">
            <div class="spec-cell-label">Plot</div>
            <div class="spec-cell-value">{{ $property['plotSize'] }}</div>
            <span class="spec-cell-bar"></span>
          </div>
          <div class="spec-cell">
            <div class="spec-cell-label">Built</div>
            <div class="spec-cell-value">{{ $extras['yearBuilt'] }}</div>
            <span class="spec-cell-bar"></span>
          </div>
          <div class="spec-cell">
            <div class="spec-cell-label">Bedrooms</div>
            <div class="spec-cell-value">{{ $property['bedrooms'] }}</div>
            <span class="spec-cell-bar"></span>
          </div>
          <div class="spec-cell">
            <div class="spec-cell-label">Bathrooms</div>
            <div class="spec-cell-value">{{ $property['bathrooms'] }}</div>
            <span class="spec-cell-bar"></span>
          </div>
          <div class="spec-cell">
            <div class="spec-cell-label">Efficiency</div>
            <div class="spec-cell-value">Class {{ $extras['energy'] }}</div>
            <span class="spec-cell-bar"></span>
          </div>
          <div class="spec-cell">
            <div class="spec-cell-label">Orientation</div>
            <div class="spec-cell-value">{{ $extras['orientation'] }}</div>
            <span class="spec-cell-bar"></span>
          </div>
          <div class="spec-cell">
            <div class="spec-cell-label">Floors</div>
            <div class="spec-cell-value">{{ $extras['floors'] }} floors</div>
            <span class="spec-cell-bar"></span>
          </div>
          <div class="spec-cell">
            <div class="spec-cell-label">Type</div>
            <div class="spec-cell-value">{{ $property['type'] }}</div>
            <span class="spec-cell-bar"></span>
          </div>
        </div>
      </div>

      {{-- Features --}}
      <div class="detail-section">
        <h2 class="detail-section-title">Features and Amenities</h2>
        <div class="feature-list">
          @foreach($property['features'] as $feat)
          <div class="feature-item">
            <div class="feature-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 11 4 16"></polyline></svg>
            </div>
            <span>{{ $featureLabels[$feat] ?? ucwords(str_replace('_',' ',$feat)) }}</span>
          </div>
          @endforeach
        </div>
      </div>

      {{-- Location --}}
      <div class="detail-section">
        <h2 class="detail-section-title">Location</h2>
        <div class="detail-map-wrap">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=21.8,36.9,22.2,37.1&layer=mapnik&marker=36.98,22.0"
            title="Location map"
            loading="lazy"
            allowfullscreen>
          </iframe>
        </div>
        <p class="detail-map-note">
          Approximate area shown in {{ $property['location'] }}, {{ $property['region'] }}. Exact address provided upon confirmed enquiry.
        </p>
      </div>

    </div>{{-- /detail-primary --}}

    {{-- ── SIDEBAR ── --}}
    <div class="detail-sidebar">
      <div class="detail-sidebar-sticky">

        {{-- Agent card --}}
        <div class="agent-card">
          <div class="agent-avatar-row">
            <div class="agent-avatar-initials">MP</div>
            <div>
              <div class="agent-name">{{ $extras['agent']['name'] }}</div>
              <div class="agent-role">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                {{ $extras['agent']['role'] }}
              </div>
            </div>
          </div>
          <button type="button" class="agent-enquire-btn" onclick="openEnquiry()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,12 2,6"></polyline></svg>
            Enquire About This Property
          </button>
          <div class="agent-reply-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Typical reply within 4 hours
          </div>
        </div>

        {{-- Agency card --}}
        <div class="agency-card">
          <div class="agency-label">Listed by</div>
          <div class="agency-avatar-row">
            <div class="agency-initials">KC</div>
            <div style="min-width:0;">
              <div class="agency-name">{{ $property['agency'] }}</div>
              <div class="agency-location">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;margin-right:0.25rem;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {{ $extras['agencyCity'] }}, Greece
              </div>
            </div>
          </div>
          <p class="agency-tagline">{{ $extras['agencyTagline'] }}</p>
          <a href="{{ route('professionals') }}" class="agency-profile-link" style="text-decoration:none;">View Agency Profile</a>
        </div>

        {{-- Stats row --}}
        <div class="detail-stats-row">
          <div>
            Listed
            <span class="detail-stat-value">{{ $extras['listedDays'] }}d ago</span>
          </div>
          <div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Views
            <span class="detail-stat-value">{{ $extras['viewsThisWeek'] }}/wk</span>
          </div>
          <div>
            Enquiries
            <span class="detail-stat-value">{{ $extras['enquiriesThisWeek'] }}/wk</span>
          </div>
        </div>

      </div>
    </div>

  </div>{{-- /detail-content-grid --}}
</div>{{-- /main article --}}

{{-- ── SIMILAR PROPERTIES ── --}}
<div class="similar-section">
  <div class="similar-inner">
    <div class="similar-header">
      <div>
        <div class="similar-label">Further Opportunities</div>
        <h2 style="font-size:1.5rem;font-weight:700;color:var(--foreground);margin-top:0.25rem;">You May Also Consider</h2>
      </div>
      <a href="{{ route('properties') }}" class="similar-view-all" style="text-decoration:none;">View all listings →</a>
    </div>
    <div class="properties-grid">
      @foreach($similarProps as $sp)
      <article class="property-card">
        <div class="property-img-wrap">
          <img src="{{ asset('images/'.$sp['img']) }}" alt="{{ $sp['title'] }}" loading="lazy">
          <div class="property-img-overlay"></div>
          <span class="property-badge">{{ $sp['type'] }}</span>
          <button type="button" class="property-save-btn js-fav-btn" data-id="{{ $sp['id'] }}" onclick="toggleFavorite('{{ $sp['id'] }}', this)" aria-label="Save">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <span class="property-price">{{ $sp['price'] }}</span>
        </div>
        <div class="property-body">
          <a href="{{ route('properties.show', $sp['id']) }}" class="property-title" style="text-decoration:none;display:block;">{{ $sp['title'] }}</a>
          <p class="property-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {{ $sp['location'] }}
          </p>
          <div class="property-specs">
            <span class="property-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg><span class="val">{{ $sp['size'] }}</span></span>
            <span class="property-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg><span class="val">{{ $sp['beds'] }} bd</span></span>
            <span class="property-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20"/><path d="M2 12v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4"/><path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"/></svg><span class="val">{{ $sp['baths'] }} ba</span></span>
          </div>
          <div class="property-footer">
            <div class="property-agency">
              <span class="agency-name">{{ $sp['agency'] }}</span>
              <a href="{{ route('properties.show', $sp['id']) }}" class="btn btn-primary btn-sm" style="font-size:0.6875rem;padding:0.25rem 0.625rem;height:auto;text-decoration:none;">View Details</a>
            </div>
          </div>
        </div>
      </article>
      @endforeach
    </div>
  </div>
</div>

{{-- ── MOBILE STICKY CTA ── --}}
<div class="mobile-enquiry-bar">
  <div style="flex:1;min-width:0;">
    <div class="mobile-enquiry-price-label">Guide Price</div>
    <div class="mobile-enquiry-price">{{ $property['price'] }}</div>
  </div>
  <button type="button" class="mobile-enquiry-btn" onclick="openEnquiry()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,12 2,6"></polyline></svg>
    Enquire
  </button>
</div>

{{-- ── LIGHTBOX MODAL ── --}}
<div class="modal-overlay" id="lightbox-modal" onclick="closeLightboxOnOverlay(event)">
  <div class="modal-dialog modal-xl lightbox-dialog" onclick="event.stopPropagation()" style="max-width:64rem;background:var(--foreground);border-color:var(--foreground);color:var(--primary-foreground);padding:0;">
    <button type="button" class="modal-close-btn" onclick="closeLightbox()" style="top:0.75rem;right:0.75rem;z-index:10;background:rgba(255,255,255,0.15);color:#fff;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div class="lightbox-img-wrap" style="position:relative;aspect-ratio:16/10;background:#000;display:flex;align-items:center;justify-content:center;">
      <img id="lightbox-img" src="{{ $property['image'] }}" alt="Gallery" style="max-height:100%;max-width:100%;object-fit:contain;">
      <button type="button" class="lightbox-nav-btn prev" onclick="lightboxNav(-1)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <button type="button" class="lightbox-nav-btn next" onclick="lightboxNav(1)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
      <div class="lightbox-counter" id="lightbox-counter">1 / 6</div>
    </div>
    <div class="lightbox-thumbnails" id="lightbox-thumbs">
      @for($i = 0; $i < 6; $i++)
      <div class="lightbox-thumb {{ $i === 0 ? 'active' : '' }}" data-idx="{{ $i }}" onclick="lightboxGoTo({{ $i }})">
        <img src="{{ $property['image'] }}" alt="Thumbnail {{ $i+1 }}" loading="lazy">
      </div>
      @endfor
    </div>
  </div>
</div>

{{-- ── ENQUIRY MODAL ── --}}
<div class="modal-overlay" id="enquiry-modal" onclick="closeModalOnOverlay(event,'enquiry-modal')">
  <div class="modal-dialog modal-md" onclick="event.stopPropagation()">
    <button type="button" class="modal-close-btn" onclick="closeModal('enquiry-modal')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    {{-- Modal Header --}}
    <div class="modal-header">
      <p class="modal-subtitle">Enquire About</p>
      <h2>{{ $property['title'] }}</h2>
      <p class="modal-ref">Ref: {{ $extras['ref'] }} · {{ $property['price'] }}</p>
    </div>

    {{-- Agent row --}}
    <div class="modal-body">
      <div class="modal-agent-row">
        <div class="modal-agent-avatar" style="border-radius:9999px;">MP</div>
        <div>
          <div style="font-size:0.875rem;font-weight:600;color:var(--foreground);">{{ $extras['agent']['name'] }}</div>
          <div style="font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--accent);margin-top:0.125rem;">{{ $extras['agent']['role'] }}</div>
        </div>
      </div>

      <form id="enquiry-form" onsubmit="submitEnquiry(event)">
        {{-- Honeypot --}}
        <input type="text" name="company" style="display:none;" tabindex="-1" autocomplete="off">

        <div class="modal-form-stack">
          <div>
            <label style="font-size:0.8125rem;font-weight:500;color:var(--foreground);display:block;margin-bottom:0.375rem;">Full Name <span style="color:var(--destructive);">*</span></label>
            <input type="text" name="fullname" class="modal-input" placeholder="Your full name" required>
          </div>
          <div>
            <label style="font-size:0.8125rem;font-weight:500;color:var(--foreground);display:block;margin-bottom:0.375rem;">Email Address <span style="color:var(--destructive);">*</span></label>
            <input type="email" name="email" class="modal-input" placeholder="your@email.com" required>
          </div>
          <div>
            <label style="font-size:0.8125rem;font-weight:500;color:var(--foreground);display:block;margin-bottom:0.375rem;">Phone <span style="font-size:0.75rem;color:var(--muted-foreground);font-weight:400;">(optional)</span></label>
            <input type="tel" name="phone" class="modal-input" placeholder="+30 ...">
          </div>
          <div>
            <label style="font-size:0.8125rem;font-weight:500;color:var(--foreground);display:block;margin-bottom:0.375rem;">Message</label>
            <textarea name="message" class="modal-textarea" rows="4">I am interested in Ref: {{ $extras['ref'] }}.</textarea>
          </div>
          <label class="modal-checkbox-row">
            <input type="checkbox" required>
            <span>I am not a robot and this is a genuine enquiry.</span>
          </label>
          <button type="submit" class="modal-submit-btn">Submit Interest</button>
          <div class="modal-lock-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Protected by spam filtering. Reply within 4 hours.
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<script>
(function(){
  /* ── Gallery images array ── */
  var images = @json($gallery);
  var activeImage = 0;

  /* ── Gallery nav (main image) ── */
  window.galleryNav = function(dir) {
    activeImage = (activeImage + dir + images.length) % images.length;
    document.getElementById('gallery-main-img').src = images[activeImage];
    document.getElementById('gallery-counter').textContent = (activeImage + 1) + ' / ' + images.length;
  };

  /* ── Lightbox ── */
  var lbActive = 0;
  window.openLightbox = function(idx) {
    lbActive = idx || 0;
    updateLightbox();
    document.getElementById('lightbox-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeLightbox = function() {
    document.getElementById('lightbox-modal').classList.remove('open');
    document.body.style.overflow = '';
  };
  window.closeLightboxOnOverlay = function(e) {
    if (e.target === document.getElementById('lightbox-modal')) closeLightbox();
  };
  window.lightboxNav = function(dir) {
    lbActive = (lbActive + dir + images.length) % images.length;
    updateLightbox();
  };
  window.lightboxGoTo = function(idx) {
    lbActive = idx;
    updateLightbox();
  };
  function updateLightbox() {
    document.getElementById('lightbox-img').src = images[lbActive];
    document.getElementById('lightbox-counter').textContent = (lbActive + 1) + ' / ' + images.length;
    document.querySelectorAll('.lightbox-thumb').forEach(function(t, i) {
      t.classList.toggle('active', i === lbActive);
    });
  }
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('lightbox-modal').classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'Escape')     closeLightbox();
  });

  /* ── Save / favourite ── */
  var PROP_KEY = 'greecevest:saved:1';
  var isSaved = localStorage.getItem(PROP_KEY) === '1';
  var saveBtn = document.getElementById('save-btn');
  function applySaveState() {
    if (isSaved) {
      saveBtn.classList.add('saved');
      document.getElementById('save-label').textContent = 'Saved';
    } else {
      saveBtn.classList.remove('saved');
      document.getElementById('save-label').textContent = 'Save';
    }
  }
  applySaveState();
  window.toggleSave = function() {
    isSaved = !isSaved;
    localStorage.setItem(PROP_KEY, isSaved ? '1' : '');
    applySaveState();
  };

  /* ── Similar props favorites ── */
  var FAVS_KEY = 'greecevest:properties:favorites';
  function getFavs() { try { return JSON.parse(localStorage.getItem(FAVS_KEY)||'[]'); } catch(e){ return []; } }
  function setFavs(a) { localStorage.setItem(FAVS_KEY, JSON.stringify(a)); }
  document.querySelectorAll('.js-fav-btn').forEach(function(btn) {
    if (getFavs().indexOf(btn.dataset.id) !== -1) {
      btn.style.color = 'var(--accent)';
      btn.querySelector('svg').setAttribute('fill','var(--accent)');
    }
  });
  window.toggleFavorite = function(id, btn) {
    var favs = getFavs();
    var idx = favs.indexOf(id);
    if (idx === -1) {
      favs.push(id);
      btn.style.color = 'var(--accent)';
      btn.querySelector('svg').setAttribute('fill','var(--accent)');
    } else {
      favs.splice(idx,1);
      btn.style.color = '';
      btn.querySelector('svg').setAttribute('fill','none');
    }
    setFavs(favs);
  };

  /* ── Share ── */
  window.shareProperty = function() {
    if (navigator.share) { navigator.share({ title: '{{ addslashes($property['title']) }}', url: window.location.href }); }
    else { navigator.clipboard.writeText(window.location.href).then(function(){ showToast('Link copied!'); }); }
  };

  /* ── Modal helpers ── */
  window.closeModal = function(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  };
  window.closeModalOnOverlay = function(e, id) {
    if (e.target === document.getElementById(id)) closeModal(id);
  };

  /* ── Enquiry modal ── */
  window.openEnquiry = function() {
    document.getElementById('enquiry-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.submitEnquiry = function(e) {
    e.preventDefault();
    closeModal('enquiry-modal');
    showToast('Thank you! Your enquiry has been sent. Expect a reply within 4 hours.');
    e.target.reset();
  };

  /* ── Toast ── */
  window.showToast = function(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, { position:'fixed', bottom:'1.5rem', left:'50%', transform:'translateX(-50%)', background:'var(--primary)', color:'var(--primary-foreground)', padding:'0.75rem 1.25rem', borderRadius:'0.5rem', fontSize:'0.875rem', fontWeight:'500', zIndex:'9999', boxShadow:'0 4px 12px rgba(0,0,0,0.2)', whiteSpace:'nowrap', maxWidth:'90vw', textAlign:'center' });
    document.body.appendChild(t);
    setTimeout(function(){ t.style.opacity='0'; t.style.transition='opacity 0.4s'; setTimeout(function(){ t.remove(); },400); }, 3000);
  };
})();
</script>
@endsection
