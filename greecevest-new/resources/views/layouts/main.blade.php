<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'GREECEVEST') — Greek Real Estate Platform</title>
    <meta name="description" content="@yield('description', 'Your all-in-one platform for Greek real estate. Properties, verified professionals, and market intelligence.')">
    <link rel="stylesheet" href="{{ asset('css/greecevest.css') }}">
    <link rel="icon" type="image/png" href="{{ asset('images/logo-icon.png') }}">
</head>
<body>

    @include('partials.navbar')

    <main style="padding-top: 5rem;">
        @yield('content')
    </main>

    @include('partials.footer')

    <script>
    // Navbar scroll effect
    (function() {
        var navbar = document.getElementById('navbar');
        function onScroll() {
            if (window.scrollY > 8) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    })();

    // Mobile menu toggle
    (function() {
        var btn = document.getElementById('mobile-menu-btn');
        var menu = document.getElementById('mobile-menu');
        var iconOpen = document.getElementById('menu-icon-open');
        var iconClose = document.getElementById('menu-icon-close');
        if (btn) {
            btn.addEventListener('click', function() {
                var isOpen = menu.classList.toggle('open');
                iconOpen.style.display = isOpen ? 'none' : 'block';
                iconClose.style.display = isOpen ? 'block' : 'none';
            });
        }
    })();

    // FAQ accordion
    (function() {
        var items = document.querySelectorAll('.faq-item');
        items.forEach(function(item) {
            var btn = item.querySelector('.faq-question');
            if (btn) {
                btn.addEventListener('click', function() {
                    var isOpen = item.classList.toggle('open');
                    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                });
            }
        });
    })();
    </script>
</body>
</html>
