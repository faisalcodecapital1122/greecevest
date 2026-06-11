@extends('layouts.main')

@section('title', 'Contact Us — GREECEVEST')
@section('description', 'Get in touch with GREECEVEST. We respond within 24 hours.')

@section('content')

<!-- ===== HEADER ===== -->
<div class="contact-header">
    <div style="max-width:80rem; margin:0 auto;">
        <span class="section-label">Contact Us</span>
        <h1>We're Here to <span class="accent">Help</span></h1>
        <p>Whether you have a question about properties or need to connect with one of our eight categories of verified professionals, reach out today.</p>
    </div>
</div>

<!-- ===== FORM + ASIDE ===== -->
<section class="section section-bg-surface">
    <div style="max-width:80rem; margin:0 auto; padding:0 1rem;">
        <div class="contact-grid">
            <!-- Form -->
            <div>
                <h2 class="contact-title">Send us a message</h2>
                <p class="contact-desc">Fill out the form and we'll get back to you within 24 hours.</p>

                <form class="contact-form" action="#" method="POST" novalidate>
                    @csrf
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="fullName">Full Name</label>
                            <input class="form-input" id="fullName" name="fullName" type="text" autocomplete="name" required placeholder="Your name">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="email">Email</label>
                            <input class="form-input" id="email" name="email" type="email" autocomplete="email" required placeholder="your@email.com">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="phone">
                                Phone <span class="optional">(optional)</span>
                            </label>
                            <input class="form-input" id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+30 XXX XXX XXXX">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="role">I am a...</label>
                            <select class="form-select" id="role" name="role">
                                <option value="">Select your role</option>
                                <option value="buyer">Buyer / Investor</option>
                                <option value="owner">Property Owner</option>
                                <option value="professional">Professional</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="message">Message</label>
                        <textarea class="form-textarea" id="message" name="message" required rows="6" placeholder="Tell us about your project or question..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-accent" style="padding: 0.625rem 2rem;">Send Message</button>
                </form>
            </div>

            <!-- Aside -->
            <aside class="contact-aside">
                <h3>Contact Information</h3>
                <div class="contact-info-list">
                    <div class="contact-info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        <div>
                            <p class="ci-label">Email</p>
                            <a href="mailto:info@greecevest.gr" class="ci-val">info@greecevest.gr</a>
                        </div>
                    </div>
                    <div class="contact-info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <div>
                            <p class="ci-label">Phone</p>
                            <p class="ci-val">+30 210 XXX XXXX</p>
                        </div>
                    </div>
                    <div class="contact-info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <div>
                            <p class="ci-label">Address</p>
                            <p class="ci-val">Athens, Greece</p>
                        </div>
                    </div>
                    <div class="contact-info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <div>
                            <p class="ci-label">Response Time</p>
                            <p class="ci-val">We respond within 24 hours</p>
                        </div>
                    </div>
                </div>

                <div class="contact-social">
                    <p>Follow us</p>
                    <div class="social-links">
                        <a href="#" aria-label="LinkedIn" class="social-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <a href="#" aria-label="Instagram" class="social-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </a>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</section>

@endsection
