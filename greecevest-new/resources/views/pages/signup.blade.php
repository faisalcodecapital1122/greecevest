@extends('layouts.main')

@section('title', 'Sign Up Free — GREECEVEST')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <div class="auth-logo">
            <img src="{{ asset('images/logo-greecevest.svg') }}" alt="GREECEVEST">
        </div>
        <h1 class="auth-title">Create your account</h1>
        <p class="auth-subtitle">Join GREECEVEST for free — no credit card required</p>

        <form class="auth-form" action="#" method="POST">
            @csrf
            <div class="form-group">
                <label class="form-label" for="name">Full Name</label>
                <input class="form-input" id="name" name="name" type="text" autocomplete="name" required placeholder="Your full name">
            </div>
            <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input class="form-input" id="email" name="email" type="email" autocomplete="email" required placeholder="your@email.com">
            </div>
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input class="form-input" id="password" name="password" type="password" autocomplete="new-password" required placeholder="Min. 8 characters">
            </div>
            <div class="form-group">
                <label class="form-label" for="role">I am a...</label>
                <select class="form-select" id="role" name="role">
                    <option value="">Select your role</option>
                    <option value="buyer">Buyer / Investor</option>
                    <option value="owner">Property Owner</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="professional">Professional (Lawyer, Architect, etc.)</option>
                </select>
            </div>
            <button type="submit" class="btn btn-accent btn-w-full" style="height:2.75rem;">Sign Up Free</button>
        </form>

        <p class="auth-divider" style="margin-top:1.25rem;">
            Already have an account? <a href="{{ route('login') }}">Log In</a>
        </p>
    </div>
</div>
@endsection
