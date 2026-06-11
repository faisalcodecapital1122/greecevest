@extends('layouts.main')
@section('title', 'Properties — GREECEVEST')

@section('content')
@php
/* ── Raw property data ── */
$allProperties = [
  ['id'=>'1','img'=>'property-1.jpg','title'=>'Stone Villa with Panoramic Sea Views','location'=>'Kalamata, Peloponnese','region'=>'Peloponnese','price'=>'€385,000','priceNum'=>385000,'size'=>'220 m²','sizeNum'=>220,'beds'=>4,'baths'=>3,'plot'=>'1,200 m²','type'=>'Villa','agency'=>'Kalamata Coast Realty','features'=>['pool','sea_view','parking']],
  ['id'=>'2','img'=>'property-2.jpg','title'=>'Modern Apartment near the Acropolis','location'=>'Athens, Attica','region'=>'Attica','price'=>'€295,000','priceNum'=>295000,'size'=>'95 m²','sizeNum'=>95,'beds'=>2,'baths'=>1,'plot'=>'—','type'=>'Apartment','agency'=>'Acropolis Property Group','features'=>['elevator','ac']],
  ['id'=>'3','img'=>'property-3.jpg','title'=>'Traditional Cycladic House','location'=>'Paros, Cyclades','region'=>'Cyclades','price'=>'€210,000','priceNum'=>210000,'size'=>'85 m²','sizeNum'=>85,'beds'=>2,'baths'=>1,'plot'=>'350 m²','type'=>'House','agency'=>'Cyclades Island Homes','features'=>['sea_view','terrace']],
  ['id'=>'4','img'=>'property-1.jpg','title'=>'Luxury Seafront Estate','location'=>'Corfu, Ionian Islands','region'=>'Ionian Islands','price'=>'€1,200,000','priceNum'=>1200000,'size'=>'450 m²','sizeNum'=>450,'beds'=>6,'baths'=>5,'plot'=>'3,500 m²','type'=>'Villa','agency'=>'Ionian Luxury Estates','features'=>['pool','sea_view','parking','garden','gym']],
  ['id'=>'5','img'=>'property-2.jpg','title'=>'Renovated Neoclassical in Plaka','location'=>'Athens, Attica','region'=>'Attica','price'=>'€520,000','priceNum'=>520000,'size'=>'140 m²','sizeNum'=>140,'beds'=>3,'baths'=>2,'plot'=>'—','type'=>'Apartment','agency'=>'Plaka Heritage Realty','features'=>['elevator','ac','fireplace']],
  ['id'=>'6','img'=>'property-3.jpg','title'=>'Whitewashed Retreat with Garden','location'=>'Naxos, Cyclades','region'=>'Cyclades','price'=>'€175,000','priceNum'=>175000,'size'=>'70 m²','sizeNum'=>70,'beds'=>1,'baths'=>1,'plot'=>'280 m²','type'=>'House','agency'=>'Naxos Aegean Properties','features'=>['garden','terrace','sea_view']],
];

/* ── Read filters from request ── */
$q        = request('q', '');
$typeF    = strtolower(request('type', 'all'));
$regionF  = request('region', '');
$budgetF  = request('budget', 'all');
$agencyF  = request('agency', '');
$featuresF= request('features', []);
if (!is_array($featuresF)) $featuresF = [];
$sortF    = request('sort', 'recommended');
$perPage  = (int) request('perPage', 6);
$page     = max(1, (int) request('page', 1));
$viewF    = request('view', 'grid');

/* ── Filter ── */
$filtered = array_filter($allProperties, function($p) use ($q, $typeF, $regionF, $budgetF, $agencyF, $featuresF) {
  if ($q) {
    $hay = strtolower($p['title'].' '.$p['location'].' '.$p['agency']);
    if (strpos($hay, strtolower($q)) === false) return false;
  }
  if ($typeF && $typeF !== 'all') {
    if (strtolower($p['type']) !== $typeF) return false;
  }
  if ($regionF) {
    if (strtolower($p['region']) !== strtolower($regionF)) return false;
  }
  if ($budgetF && $budgetF !== 'all') {
    $n = $p['priceNum'];
    if ($budgetF === 'under200'  && $n >= 200000)  return false;
    if ($budgetF === '200to500'  && ($n < 200000 || $n > 500000)) return false;
    if ($budgetF === '500to1m'   && ($n < 500000 || $n > 1000000)) return false;
    if ($budgetF === 'over1m'    && $n <= 1000000) return false;
  }
  if ($agencyF) {
    if (strtolower($p['agency']) !== strtolower($agencyF)) return false;
  }
  if ($featuresF) {
    foreach ($featuresF as $f) {
      if (!in_array($f, $p['features'])) return false;
    }
  }
  return true;
});
$filtered = array_values($filtered);

/* ── Sort ── */
usort($filtered, function($a, $b) use ($sortF) {
  if ($sortF === 'price-asc')  return $a['priceNum'] <=> $b['priceNum'];
  if ($sortF === 'price-desc') return $b['priceNum'] <=> $a['priceNum'];
  if ($sortF === 'size-desc')  return $b['sizeNum'] <=> $a['sizeNum'];
  if ($sortF === 'beds-desc')  return $b['beds'] <=> $a['beds'];
  return 0;
});

/* ── Pagination ── */
$total      = count($filtered);
$totalPages = max(1, (int) ceil($total / $perPage));
$page       = min($page, $totalPages);
$paged      = array_slice($filtered, ($page - 1) * $perPage, $perPage);

/* ── Active filter count ── */
$activeCount = 0;
if ($q)                              $activeCount++;
if ($typeF && $typeF !== 'all')      $activeCount++;
if ($regionF)                        $activeCount++;
if ($budgetF && $budgetF !== 'all')  $activeCount++;
if ($agencyF)                        $activeCount++;
$activeCount += count($featuresF);

/* ── Build URL helper ── */
function propUrl(array $merge = [], array $remove = []) {
  $params = array_merge(request()->query(), $merge);
  foreach ($remove as $k) unset($params[$k]);
  unset($params['page']);
  if (isset($merge['page'])) $params['page'] = $merge['page'];
  return '/properties' . (count($params) ? '?'.http_build_query($params) : '');
}

/* ── Feature labels ── */
$featureLabels = [
  'pool'=>'Pool','sea_view'=>'Sea View','parking'=>'Parking','garden'=>'Garden',
  'gym'=>'Gym','terrace'=>'Terrace','ac'=>'A/C','elevator'=>'Elevator','fireplace'=>'Fireplace',
];

/* ── All agencies ── */
$allAgencies = array_unique(array_column($allProperties, 'agency'));
sort($allAgencies);
@endphp

{{-- ── HERO ── --}}
<div class="listing-hero-img">
  <img src="{{ asset('images/hero-properties.jpg') }}" alt="Properties in Greece" class="hero-bg">
  <div class="hero-overlay"></div>
  <div class="hero-content-inner">
    <h1>Find Your Perfect Property in Greece</h1>
    <p>Browse villas, apartments, and houses across Greece's most sought-after regions. Use the filters below to narrow your search.</p>
  </div>
</div>

{{-- ── STICKY FILTER BAR ── --}}
<div class="filter-bar-sticky">
  <div class="filter-bar-inner">
    <form method="GET" action="{{ route('properties') }}" id="filter-form">
      <input type="hidden" name="view" value="{{ $viewF }}">
      <div class="filter-row">

        {{-- Search input --}}
        <div class="filter-search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" name="q" value="{{ $q }}" placeholder="Search properties…" class="filter-input" id="search-input">
        </div>

        {{-- Desktop selects --}}
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;" class="hidden-sm">
          <select name="type" class="filter-select-h10" onchange="document.getElementById('filter-form').submit()">
            <option value="all"       {{ $typeF==='all' ? 'selected' : '' }}>All Types</option>
            <option value="villa"     {{ $typeF==='villa' ? 'selected' : '' }}>Villa</option>
            <option value="apartment" {{ $typeF==='apartment' ? 'selected' : '' }}>Apartment</option>
            <option value="house"     {{ $typeF==='house' ? 'selected' : '' }}>House</option>
            <option value="land"      {{ $typeF==='land' ? 'selected' : '' }}>Land</option>
          </select>

          <select name="region" class="filter-select-h10" onchange="document.getElementById('filter-form').submit()">
            <option value="">All Regions</option>
            <option value="Peloponnese"    {{ $regionF==='Peloponnese' ? 'selected' : '' }}>Peloponnese</option>
            <option value="Attica"         {{ $regionF==='Attica' ? 'selected' : '' }}>Attica</option>
            <option value="Cyclades"       {{ $regionF==='Cyclades' ? 'selected' : '' }}>Cyclades</option>
            <option value="Ionian Islands" {{ $regionF==='Ionian Islands' ? 'selected' : '' }}>Ionian Islands</option>
            <option value="Crete"          {{ $regionF==='Crete' ? 'selected' : '' }}>Crete</option>
            <option value="Rhodes"         {{ $regionF==='Rhodes' ? 'selected' : '' }}>Rhodes</option>
          </select>

          <select name="budget" class="filter-select-h10" onchange="document.getElementById('filter-form').submit()">
            <option value="all"      {{ $budgetF==='all' ? 'selected' : '' }}>Any Budget</option>
            <option value="under200" {{ $budgetF==='under200' ? 'selected' : '' }}>Under €200k</option>
            <option value="200to500" {{ $budgetF==='200to500' ? 'selected' : '' }}>€200k – €500k</option>
            <option value="500to1m"  {{ $budgetF==='500to1m' ? 'selected' : '' }}>€500k – €1M</option>
            <option value="over1m"   {{ $budgetF==='over1m' ? 'selected' : '' }}>Over €1M</option>
          </select>

          <select name="agency" class="filter-select-h10" onchange="document.getElementById('filter-form').submit()">
            <option value="">All Agencies</option>
            @foreach($allAgencies as $ag)
              <option value="{{ $ag }}" {{ $agencyF===$ag ? 'selected' : '' }}>{{ $ag }}</option>
            @endforeach
          </select>

          {{-- Features popover --}}
          <div style="position:relative;">
            <button type="button" class="filter-select-h10" id="features-btn" onclick="toggleFeaturesPopover()" style="cursor:pointer;display:flex;align-items:center;gap:0.5rem;padding-right:0.75rem;">
              Features
              @if(count($featuresF))
                <span style="display:inline-flex;align-items:center;justify-content:center;height:1.125rem;min-width:1.125rem;padding:0 0.25rem;border-radius:9999px;background:var(--accent);color:var(--accent-foreground);font-size:0.625rem;font-weight:700;">{{ count($featuresF) }}</span>
              @endif
            </button>
            <div class="popover-panel" id="features-popover" style="min-width:16rem;padding:0.875rem;">
              <p style="font-size:0.6875rem;font-weight:700;color:var(--muted-foreground);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:0.75rem;">Features</p>
              <div class="features-toggle-group" id="desktop-features-group">
                @foreach($featureLabels as $fk => $fl)
                  <button type="button"
                    class="feature-toggle-pill {{ in_array($fk, $featuresF) ? 'active' : '' }}"
                    data-feature="{{ $fk }}"
                    onclick="toggleFeature('{{ $fk }}')">{{ $fl }}</button>
                @endforeach
              </div>
            </div>
          </div>
        </div>

        {{-- Mobile filters button --}}
        <button type="button" class="mobile-filter-btn" onclick="openMobileSheet()" style="margin-left:auto;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem;"><line x1="21" y1="4" x2="14" y2="4"></line><line x1="10" y1="4" x2="3" y2="4"></line><line x1="21" y1="12" x2="12" y2="12"></line><line x1="8" y1="12" x2="3" y2="12"></line><line x1="21" y1="20" x2="16" y2="20"></line><line x1="12" y1="20" x2="3" y2="20"></line><circle cx="14" cy="4" r="2"></circle><circle cx="8" cy="12" r="2"></circle><circle cx="16" cy="20" r="2"></circle></svg>
          Filters
          @if($activeCount > 0)
            <span class="filter-count-badge">{{ $activeCount }}</span>
          @endif
        </button>

        <button type="submit" class="btn btn-primary btn-sm" style="height:2.5rem;flex-shrink:0;">Search</button>
      </div>

      {{-- Hidden feature inputs (desktop) --}}
      <div id="desktop-feature-inputs">
        @foreach($featuresF as $fv)
          <input type="hidden" name="features[]" value="{{ $fv }}" class="feature-hidden-input">
        @endforeach
      </div>

      {{-- Active filter chips --}}
      @if($activeCount > 0)
      <div class="filter-chips">
        @if($q)
          <span class="filter-chip">"{{ $q }}"
            <a href="{{ propUrl([], ['q']) }}" class="filter-chip-remove" style="text-decoration:none;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:0.75rem;height:0.75rem;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
          </span>
        @endif
        @if($typeF && $typeF !== 'all')
          <span class="filter-chip">{{ ucfirst($typeF) }}
            <a href="{{ propUrl(['type'=>'all']) }}" class="filter-chip-remove" style="text-decoration:none;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:0.75rem;height:0.75rem;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
          </span>
        @endif
        @if($regionF)
          <span class="filter-chip">{{ $regionF }}
            <a href="{{ propUrl(['region'=>'']) }}" class="filter-chip-remove" style="text-decoration:none;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:0.75rem;height:0.75rem;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
          </span>
        @endif
        @if($budgetF && $budgetF !== 'all')
          @php $bLabel = ['under200'=>'Under €200k','200to500'=>'€200k–€500k','500to1m'=>'€500k–€1M','over1m'=>'Over €1M'][$budgetF] ?? $budgetF; @endphp
          <span class="filter-chip">{{ $bLabel }}
            <a href="{{ propUrl(['budget'=>'all']) }}" class="filter-chip-remove" style="text-decoration:none;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:0.75rem;height:0.75rem;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
          </span>
        @endif
        @if($agencyF)
          <span class="filter-chip">{{ $agencyF }}
            <a href="{{ propUrl(['agency'=>'']) }}" class="filter-chip-remove" style="text-decoration:none;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:0.75rem;height:0.75rem;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
          </span>
        @endif
        @foreach($featuresF as $ff)
          @php $remaining = array_values(array_diff($featuresF, [$ff])); @endphp
          <span class="filter-chip">{{ $featureLabels[$ff] ?? $ff }}
            <a href="{{ propUrl(['features'=>$remaining]) }}" class="filter-chip-remove" style="text-decoration:none;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:0.75rem;height:0.75rem;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
          </span>
        @endforeach
        <a href="{{ route('properties') }}" class="filter-clear-all" style="text-decoration:underline;">Clear all</a>
      </div>
      @endif
    </form>
  </div>
</div>

{{-- ── MAIN CONTENT ── --}}
<div style="background:var(--surface);min-height:60vh;">
  <div style="max-width:80rem;margin:0 auto;padding:1.5rem 1rem 4rem;">

    {{-- Results / Sort Bar --}}
    <div class="results-bar">
      <p class="results-count">
        <strong>{{ $total }}</strong> {{ $total === 1 ? 'property' : 'properties' }} found
        @if($totalPages > 1)
          <span style="font-size:0.75rem;margin-left:0.375rem;">— page {{ $page }} of {{ $totalPages }}</span>
        @endif
      </p>
      <div class="results-actions">

        {{-- Sort --}}
        <form method="GET" action="{{ route('properties') }}" id="sort-form" style="display:contents;">
          @foreach(request()->except(['sort','page']) as $k => $v)
            @if(is_array($v))
              @foreach($v as $vi)<input type="hidden" name="{{ $k }}[]" value="{{ $vi }}">@endforeach
            @else
              <input type="hidden" name="{{ $k }}" value="{{ $v }}">
            @endif
          @endforeach
          <select name="sort" class="filter-select-h10" onchange="document.getElementById('sort-form').submit()" style="height:2rem;font-size:0.75rem;">
            <option value="recommended" {{ $sortF==='recommended' ? 'selected' : '' }}>Recommended</option>
            <option value="price-asc"   {{ $sortF==='price-asc'   ? 'selected' : '' }}>Price: Low–High</option>
            <option value="price-desc"  {{ $sortF==='price-desc'  ? 'selected' : '' }}>Price: High–Low</option>
            <option value="size-desc"   {{ $sortF==='size-desc'   ? 'selected' : '' }}>Largest First</option>
            <option value="beds-desc"   {{ $sortF==='beds-desc'   ? 'selected' : '' }}>Most Bedrooms</option>
          </select>
        </form>

        {{-- Per page --}}
        <form method="GET" action="{{ route('properties') }}" id="perpage-form" style="display:contents;">
          @foreach(request()->except(['perPage','page']) as $k => $v)
            @if(is_array($v))
              @foreach($v as $vi)<input type="hidden" name="{{ $k }}[]" value="{{ $vi }}">@endforeach
            @else
              <input type="hidden" name="{{ $k }}" value="{{ $v }}">
            @endif
          @endforeach
          <select name="perPage" class="filter-select-h10" onchange="document.getElementById('perpage-form').submit()" style="height:2rem;font-size:0.75rem;width:4.5rem;">
            <option value="6"  {{ $perPage===6  ? 'selected' : '' }}>6 / pg</option>
            <option value="12" {{ $perPage===12 ? 'selected' : '' }}>12 / pg</option>
            <option value="24" {{ $perPage===24 ? 'selected' : '' }}>24 / pg</option>
          </select>
        </form>

        {{-- View toggle --}}
        <div class="view-toggle">
          <a href="{{ propUrl(['view'=>'grid']) }}" class="view-toggle-btn {{ $viewF !== 'map' ? 'active' : '' }}" style="text-decoration:none;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Grid
          </a>
          <a href="{{ propUrl(['view'=>'map']) }}" class="view-toggle-btn {{ $viewF === 'map' ? 'active' : '' }}" style="text-decoration:none;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
            Map
          </a>
        </div>

        {{-- Share --}}
        <button type="button" class="btn btn-outline btn-sm" onclick="shareSearch()" style="height:2rem;font-size:0.75rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          Share
        </button>

        {{-- Save Alert --}}
        <button type="button" class="btn btn-outline btn-sm" onclick="openSaveAlertModal()" style="height:2rem;font-size:0.75rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          Save Alert
        </button>

        {{-- My Alerts --}}
        <button type="button" class="btn btn-ghost btn-sm" id="my-alerts-btn" onclick="openAlertsListModal()" style="height:2rem;font-size:0.75rem;display:none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          My Alerts
        </button>
      </div>
    </div>

    {{-- ── MAP VIEW ── --}}
    @if($viewF === 'map')
    <div style="margin-bottom:1.5rem;">
      <div class="draw-area-card">
        <div class="draw-area-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        </div>
        <div class="draw-area-text">
          <p>Draw Search Area</p>
          <span>Click and drag on the map to define a custom search boundary</span>
        </div>
        <button type="button" class="btn btn-outline btn-sm">Enable Drawing</button>
      </div>
      <div class="map-container" style="aspect-ratio:16/9;min-height:420px;">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=19.3,34.8,29.7,42.0&layer=mapnik"
          title="Greece map"
          loading="lazy"
          allowfullscreen>
        </iframe>
      </div>
    </div>
    @endif

    {{-- ── PROPERTIES GRID ── --}}
    @if(count($paged) > 0)
    <div class="properties-grid">
      @foreach($paged as $p)
      <article class="property-card">
        <div class="property-img-wrap">
          <img src="{{ asset('images/'.$p['img']) }}" alt="{{ $p['title'] }}" loading="lazy">
          <div class="property-img-overlay"></div>
          <span class="property-badge">{{ $p['type'] }}</span>
          <button type="button"
            class="property-save-btn js-fav-btn"
            data-id="{{ $p['id'] }}"
            aria-label="Save property"
            onclick="toggleFavorite('{{ $p['id'] }}', this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <span class="property-price">{{ $p['price'] }}</span>
        </div>
        <div class="property-body">
          <a href="{{ route('properties.show', $p['id']) }}" class="property-title" style="text-decoration:none;display:block;">{{ $p['title'] }}</a>
          <p class="property-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {{ $p['location'] }}
          </p>
          <div class="property-specs">
            <span class="property-spec">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span class="val">{{ $p['size'] }}</span>
            </span>
            <span class="property-spec">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span class="val">{{ $p['beds'] }} bd</span>
            </span>
            <span class="property-spec">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20"/><path d="M2 12v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4"/><path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"/></svg>
              <span class="val">{{ $p['baths'] }} ba</span>
            </span>
            @if($p['plot'] !== '—')
            <span class="property-spec">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"></polygon></svg>
              <span class="val">{{ $p['plot'] }}</span>
            </span>
            @endif
          </div>
          <div class="property-footer">
            <div class="property-agency">
              <span class="agency-name">{{ $p['agency'] }}</span>
              <a href="{{ route('properties.show', $p['id']) }}" class="btn btn-primary btn-sm" style="font-size:0.6875rem;padding:0.25rem 0.625rem;height:auto;text-decoration:none;">View Details</a>
            </div>
          </div>
        </div>
      </article>
      @endforeach
    </div>

    {{-- Pagination --}}
    @if($totalPages > 1)
    <nav class="pagination" aria-label="Property pagination">
      @if($page > 1)
        <a href="{{ propUrl(['page'=>$page-1]) }}" class="pagination-btn" style="text-decoration:none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Prev
        </a>
      @else
        <button class="pagination-btn" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Prev
        </button>
      @endif

      @for($pg = 1; $pg <= $totalPages; $pg++)
        @if($pg === $page)
          <span class="pagination-page active">{{ $pg }}</span>
        @elseif($pg === 1 || $pg === $totalPages || abs($pg - $page) <= 1)
          <a href="{{ propUrl(['page'=>$pg]) }}" class="pagination-page" style="text-decoration:none;">{{ $pg }}</a>
        @elseif(abs($pg - $page) === 2)
          <span class="pagination-dots">…</span>
        @endif
      @endfor

      @if($page < $totalPages)
        <a href="{{ propUrl(['page'=>$page+1]) }}" class="pagination-btn" style="text-decoration:none;">
          Next
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      @else
        <button class="pagination-btn" disabled>
          Next
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      @endif
    </nav>
    @endif

    @else
    {{-- ── EMPTY STATE ── --}}
    <div class="empty-state">
      <div class="empty-state-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,12 2,6"></polyline></svg>
      </div>
      <h3>No properties match your filters</h3>
      <p>Try adjusting your search criteria, or save an alert to be notified when matching listings appear.</p>
      <div class="empty-state-actions">
        <a href="{{ route('properties') }}" class="btn btn-primary" style="text-decoration:none;">Clear filters</a>
        <button type="button" class="btn btn-outline" onclick="openSaveAlertModal()">Save Alert</button>
      </div>
    </div>
    @endif

  </div>
</div>

{{-- ── CTA BANNER ── --}}
<div class="cta-banner navy">
  <div class="cta-banner-inner">
    <h2>Don't Miss Your Dream Property</h2>
    <p>Sign up free to save searches, receive instant alerts, and connect directly with verified agents across Greece.</p>
    <a href="{{ route('signup') }}" class="btn btn-accent btn-lg" style="text-decoration:none;">Sign Up Free</a>
  </div>
</div>

{{-- ── SAVE ALERT MODAL ── --}}
<div class="modal-overlay" id="save-alert-modal" onclick="closeModalOnOverlay(event,'save-alert-modal')">
  <div class="modal-dialog modal-md" onclick="event.stopPropagation()">
    <button type="button" class="modal-close-btn" onclick="closeModal('save-alert-modal')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div class="modal-header">
      <p class="modal-subtitle">Property Alert</p>
      <h2>Save This Search</h2>
    </div>
    <div class="modal-body">
      <div class="alert-filter-summary">
        <strong>Current filters:</strong><br>
        <span id="alert-filter-text" style="margin-top:0.25rem;display:block;">All properties in Greece</span>
      </div>
      <div class="modal-form-stack">
        <div>
          <label style="font-size:0.8125rem;font-weight:500;color:var(--foreground);display:block;margin-bottom:0.375rem;">Email address</label>
          <input type="email" id="alert-email" class="modal-email-input" placeholder="your@email.com" required>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-ghost" onclick="closeModal('save-alert-modal')">Cancel</button>
      <button type="button" class="btn btn-primary" onclick="saveAlert()">Create Alert</button>
    </div>
  </div>
</div>

{{-- ── MY ALERTS MODAL ── --}}
<div class="modal-overlay" id="alerts-list-modal" onclick="closeModalOnOverlay(event,'alerts-list-modal')">
  <div class="modal-dialog modal-md" onclick="event.stopPropagation()">
    <button type="button" class="modal-close-btn" onclick="closeModal('alerts-list-modal')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div class="modal-header">
      <p class="modal-subtitle">Saved Searches</p>
      <h2>My Property Alerts</h2>
    </div>
    <div class="modal-body" id="alerts-list-body"></div>
  </div>
</div>

{{-- ── MOBILE SHEET ── --}}
<div class="mobile-sheet-overlay" id="mobile-sheet-overlay" onclick="closeMobileSheet()"></div>
<div class="mobile-sheet" id="mobile-sheet">
  <div class="mobile-sheet-header">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="4" x2="14" y2="4"></line><line x1="10" y1="4" x2="3" y2="4"></line><line x1="21" y1="12" x2="12" y2="12"></line><line x1="8" y1="12" x2="3" y2="12"></line><line x1="21" y1="20" x2="16" y2="20"></line><line x1="12" y1="20" x2="3" y2="20"></line><circle cx="14" cy="4" r="2"></circle><circle cx="8" cy="12" r="2"></circle><circle cx="16" cy="20" r="2"></circle></svg>
    Filters
    <button type="button" onclick="closeMobileSheet()" style="margin-left:auto;background:none;border:none;cursor:pointer;display:flex;align-items:center;padding:0.25rem;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <form method="GET" action="{{ route('properties') }}" id="mobile-filter-form">
    <input type="hidden" name="view" value="{{ $viewF }}">
    <div class="mobile-sheet-body">
      <div class="sheet-filter-field">
        <label class="sheet-filter-label">Search</label>
        <input type="text" name="q" value="{{ $q }}" placeholder="Keywords…" class="form-input">
      </div>
      <div class="sheet-filter-field">
        <label class="sheet-filter-label">Property Type</label>
        <select name="type" class="form-select">
          <option value="all"      {{ $typeF==='all'      ? 'selected':'' }}>All Types</option>
          <option value="villa"    {{ $typeF==='villa'    ? 'selected':'' }}>Villa</option>
          <option value="apartment"{{ $typeF==='apartment'? 'selected':'' }}>Apartment</option>
          <option value="house"    {{ $typeF==='house'    ? 'selected':'' }}>House</option>
          <option value="land"     {{ $typeF==='land'     ? 'selected':'' }}>Land</option>
        </select>
      </div>
      <div class="sheet-filter-field">
        <label class="sheet-filter-label">Region</label>
        <select name="region" class="form-select">
          <option value="">All Regions</option>
          <option value="Peloponnese"    {{ $regionF==='Peloponnese'    ? 'selected':'' }}>Peloponnese</option>
          <option value="Attica"         {{ $regionF==='Attica'         ? 'selected':'' }}>Attica</option>
          <option value="Cyclades"       {{ $regionF==='Cyclades'       ? 'selected':'' }}>Cyclades</option>
          <option value="Ionian Islands" {{ $regionF==='Ionian Islands' ? 'selected':'' }}>Ionian Islands</option>
          <option value="Crete"          {{ $regionF==='Crete'          ? 'selected':'' }}>Crete</option>
        </select>
      </div>
      <div class="sheet-filter-field">
        <label class="sheet-filter-label">Budget</label>
        <select name="budget" class="form-select">
          <option value="all"      {{ $budgetF==='all'      ? 'selected':'' }}>Any Budget</option>
          <option value="under200" {{ $budgetF==='under200' ? 'selected':'' }}>Under €200k</option>
          <option value="200to500" {{ $budgetF==='200to500' ? 'selected':'' }}>€200k – €500k</option>
          <option value="500to1m"  {{ $budgetF==='500to1m'  ? 'selected':'' }}>€500k – €1M</option>
          <option value="over1m"   {{ $budgetF==='over1m'   ? 'selected':'' }}>Over €1M</option>
        </select>
      </div>
      <div class="sheet-filter-field">
        <label class="sheet-filter-label">Agency</label>
        <select name="agency" class="form-select">
          <option value="">All Agencies</option>
          @foreach($allAgencies as $ag)
            <option value="{{ $ag }}" {{ $agencyF===$ag ? 'selected':'' }}>{{ $ag }}</option>
          @endforeach
        </select>
      </div>
      <div class="sheet-filter-field">
        <label class="sheet-filter-label">Features</label>
        <div class="features-toggle-group" id="mobile-features-group">
          @foreach($featureLabels as $fk => $fl)
            <button type="button"
              class="feature-toggle-pill {{ in_array($fk, $featuresF) ? 'active':'' }}"
              data-feature="{{ $fk }}"
              onclick="toggleMobileFeature(this,'{{ $fk }}')">{{ $fl }}</button>
          @endforeach
        </div>
        <div id="mobile-feature-inputs">
          @foreach($featuresF as $fv)
            <input type="hidden" name="features[]" value="{{ $fv }}">
          @endforeach
        </div>
      </div>
    </div>
    <div class="mobile-sheet-footer">
      <a href="{{ route('properties') }}" class="btn btn-outline" style="flex:1;justify-content:center;text-align:center;text-decoration:none;">Clear All</a>
      <button type="submit" class="btn btn-primary" style="flex:2;">Apply Filters</button>
    </div>
  </form>
</div>

<script>
(function() {
  /* ── Desktop features popover ── */
  var featPopover = document.getElementById('features-popover');
  var featBtn = document.getElementById('features-btn');
  window.toggleFeaturesPopover = function() {
    featPopover.classList.toggle('open');
  };
  document.addEventListener('click', function(e) {
    if (featPopover && featPopover.classList.contains('open') &&
        !featPopover.contains(e.target) && !featBtn.contains(e.target)) {
      featPopover.classList.remove('open');
    }
  });

  /* ── Desktop feature toggle ── */
  var selectedFeatures = {!! json_encode($featuresF) !!};
  window.toggleFeature = function(key) {
    var idx = selectedFeatures.indexOf(key);
    if (idx === -1) selectedFeatures.push(key);
    else selectedFeatures.splice(idx, 1);

    // Sync hidden inputs
    var container = document.getElementById('desktop-feature-inputs');
    container.querySelectorAll('.feature-hidden-input').forEach(function(el){ el.remove(); });
    selectedFeatures.forEach(function(f) {
      var inp = document.createElement('input');
      inp.type = 'hidden'; inp.name = 'features[]';
      inp.value = f; inp.className = 'feature-hidden-input';
      container.appendChild(inp);
    });
    // Sync pill UI
    document.querySelectorAll('#desktop-features-group .feature-toggle-pill').forEach(function(p) {
      p.classList.toggle('active', selectedFeatures.indexOf(p.dataset.feature) !== -1);
    });
    document.getElementById('filter-form').submit();
  };

  /* ── Mobile sheet ── */
  window.openMobileSheet = function() {
    document.getElementById('mobile-sheet').classList.add('open');
    document.getElementById('mobile-sheet-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeMobileSheet = function() {
    document.getElementById('mobile-sheet').classList.remove('open');
    document.getElementById('mobile-sheet-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ── Mobile feature toggle ── */
  window.toggleMobileFeature = function(btn, key) {
    btn.classList.toggle('active');
    var container = document.getElementById('mobile-feature-inputs');
    var existing = container.querySelector('input[value="' + key + '"]');
    if (existing) existing.remove();
    else {
      var inp = document.createElement('input');
      inp.type = 'hidden'; inp.name = 'features[]'; inp.value = key;
      container.appendChild(inp);
    }
  };

  /* ── Favorites ── */
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

  /* ── Modals ── */
  window.closeModal = function(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  };
  window.closeModalOnOverlay = function(e, id) {
    if (e.target === document.getElementById(id)) closeModal(id);
  };

  /* ── Save Alert ── */
  window.openSaveAlertModal = function() {
    var parts = [];
    @if($q)           parts.push('Search: "{{ addslashes($q) }}"'); @endif
    @if($typeF && $typeF!=='all') parts.push('Type: {{ ucfirst($typeF) }}'); @endif
    @if($regionF)     parts.push('Region: {{ addslashes($regionF) }}'); @endif
    @if($budgetF && $budgetF!=='all')
      var bl = {under200:'Under €200k','200to500':'€200k–€500k','500to1m':'€500k–€1M',over1m:'Over €1M'};
      parts.push('Budget: ' + (bl['{{ $budgetF }}']||'{{ $budgetF }}'));
    @endif
    @if($agencyF)     parts.push('Agency: {{ addslashes($agencyF) }}'); @endif
    @if(count($featuresF)) parts.push('Features: {{ implode(', ', array_map(fn($f)=>$featureLabels[$f]??$f, $featuresF)) }}'); @endif
    document.getElementById('alert-filter-text').textContent = parts.length ? parts.join(' · ') : 'All properties in Greece';
    document.getElementById('save-alert-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.saveAlert = function() {
    var email = (document.getElementById('alert-email').value || '').trim();
    if (!email || email.indexOf('@') < 0) { alert('Please enter a valid email address.'); return; }
    var AKEY = 'greecevest:properties:alerts';
    var alerts = []; try { alerts = JSON.parse(localStorage.getItem(AKEY)||'[]'); } catch(e){}
    alerts.push({ id: Date.now(), email: email, summary: document.getElementById('alert-filter-text').textContent, url: window.location.href, created: new Date().toISOString() });
    localStorage.setItem(AKEY, JSON.stringify(alerts));
    closeModal('save-alert-modal');
    document.getElementById('my-alerts-btn').style.display = 'flex';
    showToast('Alert saved! We\'ll notify ' + email);
  };

  /* ── My Alerts ── */
  window.openAlertsListModal = function() {
    var AKEY = 'greecevest:properties:alerts';
    var alerts = []; try { alerts = JSON.parse(localStorage.getItem(AKEY)||'[]'); } catch(e){}
    var body = document.getElementById('alerts-list-body');
    if (!alerts.length) {
      body.innerHTML = '<p style="text-align:center;color:var(--muted-foreground);padding:2rem 0;">No saved alerts yet.</p>';
    } else {
      var html = '<div style="display:flex;flex-direction:column;gap:0.5rem;">';
      alerts.forEach(function(a) {
        html += '<div class="alert-item" onclick="applyAlert(\''+encodeURIComponent(a.url)+'\')">'+
          '<div class="alert-item-text">'+
          '<div class="alert-item-email">'+esc(a.email)+'</div>'+
          '<div class="alert-item-summary">'+esc(a.summary)+'</div>'+
          '</div>'+
          '<button type="button" class="alert-delete-btn" onclick="delAlert(event,'+a.id+')" title="Delete">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>'+
          '</button></div>';
      });
      html += '</div>';
      body.innerHTML = html;
    }
    document.getElementById('alerts-list-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.applyAlert = function(u) { window.location.href = decodeURIComponent(u); };
  window.delAlert = function(e, id) {
    e.stopPropagation();
    var AKEY = 'greecevest:properties:alerts';
    var alerts = []; try { alerts = JSON.parse(localStorage.getItem(AKEY)||'[]'); } catch(err){}
    alerts = alerts.filter(function(a){ return a.id !== id; });
    localStorage.setItem(AKEY, JSON.stringify(alerts));
    if (!alerts.length) document.getElementById('my-alerts-btn').style.display = 'none';
    openAlertsListModal();
  };

  /* ── Show My Alerts btn if alerts exist ── */
  (function(){
    try { var a=JSON.parse(localStorage.getItem('greecevest:properties:alerts')||'[]'); if(a.length) document.getElementById('my-alerts-btn').style.display='flex'; } catch(e){}
  })();

  /* ── Share search ── */
  window.shareSearch = function() {
    if (navigator.share) { navigator.share({ title:'Properties — GREECEVEST', url: window.location.href }); }
    else { navigator.clipboard.writeText(window.location.href).then(function(){ showToast('Link copied!'); }); }
  };

  /* ── Toast ── */
  window.showToast = function(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, { position:'fixed', bottom:'1.5rem', left:'50%', transform:'translateX(-50%)', background:'var(--primary)', color:'var(--primary-foreground)', padding:'0.75rem 1.25rem', borderRadius:'0.5rem', fontSize:'0.875rem', fontWeight:'500', zIndex:'9999', boxShadow:'0 4px 12px rgba(0,0,0,0.2)', whiteSpace:'nowrap' });
    document.body.appendChild(t);
    setTimeout(function(){ t.style.opacity='0'; t.style.transition='opacity 0.4s'; setTimeout(function(){ t.remove(); },400); }, 2600);
  };

  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
})();
</script>
@endsection
