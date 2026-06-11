<footer class="footer">
    <div class="footer-inner">
        <div class="footer-grid">
            <!-- Brand -->
            <div>
                <img src="{{ asset('images/logo-greecevest.svg') }}" alt="GREECEVEST" class="footer-logo">
                <p class="footer-tagline">Your all-in-one platform for Greek real estate.</p>
            </div>

            <!-- Platform Links -->
            <div>
                <h4 class="footer-col-title">Platform</h4>
                <ul class="footer-links">
                    <li><a href="{{ route('properties') }}" class="footer-link">Properties</a></li>
                    <li><a href="{{ route('professionals') }}" class="footer-link">Professionals</a></li>
                </ul>
            </div>

            <!-- Company Links -->
            <div>
                <h4 class="footer-col-title">Company</h4>
                <ul class="footer-links">
                    <li><a href="{{ route('about') }}" class="footer-link">About</a></li>
                    <li><a href="{{ route('contact') }}" class="footer-link">Contact</a></li>
                    <li><a href="{{ route('login') }}" class="footer-link">Log In</a></li>
                    <li><a href="{{ route('signup') }}" class="footer-link">Sign Up</a></li>
                </ul>
            </div>

            <!-- Legal Links -->
            <div>
                <h4 class="footer-col-title">Legal</h4>
                <ul class="footer-links">
                    <li><a href="{{ route('privacy-policy') }}" class="footer-link">Privacy Policy</a></li>
                    <li><a href="{{ route('terms') }}" class="footer-link">Terms of Use</a></li>
                    <li><a href="{{ route('data-protection') }}" class="footer-link">Data Protection</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            &copy; {{ date('Y') }} GREECEVEST. All rights reserved.
        </div>
    </div>
</footer>
