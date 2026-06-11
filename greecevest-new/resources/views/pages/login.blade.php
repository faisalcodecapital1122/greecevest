@extends('layouts.main')

@section('title', 'Log In — GREECEVEST')

@section('content')
<div class="auth-page">
    <div class="auth-card">
        <div class="auth-logo">
            <img src="{{ asset('images/logo-greecevest.svg') }}" alt="GREECEVEST">
        </div>
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-subtitle">Log in to your GREECEVEST account</p>

        <form class="auth-form" action="{{ route('login') }}" method="POST">
            @csrf
            <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input class="form-input" id="email" name="email" type="email" autocomplete="email" required placeholder="your@email.com">
            </div>
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input class="form-input" id="password" name="password" type="password" autocomplete="current-password" required placeholder="••••••••">
            </div>
            <button type="submit" class="btn btn-primary btn-w-full" style="height:2.75rem;">Log In</button>
        </form>

        <p class="auth-divider" style="margin-top:1.25rem;">
            Don't have an account? <a href="{{ route('signup') }}">Sign Up Free</a>
        </p>
    </div>
</div>
@endsection
