/* Tools-Haven.com — main.js */

'use strict'

// ── Mobile navigation ──────────────────────────────────────

const navToggle = document.querySelector('.nav-toggle')
const siteNav = document.querySelector('.site-nav')

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open')
    navToggle.setAttribute('aria-expanded', String(isOpen))
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })

  // Mobile dropdown toggles
  document.querySelectorAll('.site-nav__dropdown-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.site-nav__item--dropdown')
      if (!parent) return
      const isOpen = parent.classList.toggle('is-open')
      btn.setAttribute('aria-expanded', String(isOpen))
    })
  })

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
      siteNav.classList.remove('is-open')
      navToggle.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    }
  })

  // Close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      siteNav.classList.remove('is-open')
      navToggle.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
      navToggle.focus()
    }
  })
}

// ── Cookie banner ──────────────────────────────────────────

const COOKIE_KEY = 'ws_cookie_consent'

const cookieBanner = document.getElementById('cookieBanner')
const cookieAccept = document.getElementById('cookieAccept')
const cookieDecline = document.getElementById('cookieDecline')

// Grant consent to Google Tag Manager
function grantConsent() {
  if (typeof gtag === 'undefined') return // Silently throw if gtag fails
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })
}

if (cookieBanner) {
  const consent = localStorage.getItem(COOKIE_KEY)

  // Already accepted in a previous visit --> restore consent immediately
  if (consent === 'accepted') {
    grantConsent()
  }

  // No decision yet --> show the banner after a short delay
  if (!consent) {
    setTimeout(() => cookieBanner.classList.add('is-visible'), 1000)
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'accepted')
      cookieBanner.classList.remove('is-visible')
      grantConsent()
    })
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'declined')
      cookieBanner.classList.remove('is-visible')
    })
  }
}

// Show cookie banner on click
const cookieSettings = document.getElementById('cookieSettings')
if (cookieSettings) {
  cookieSettings.addEventListener('click', () => {
    cookieBanner.classList.add('is-visible')
  })
}

// ── Copy button ────────────────────────────────────────────

document.querySelectorAll('#copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const targetSelector = btn.getAttribute('data-copy-target')
    if (!targetSelector) return

    const target = document.querySelector(targetSelector)
    if (!target) return

    const text = target.innerText || target.textContent || ''

    try {
      await navigator.clipboard.writeText(text.trim())

      const originalHTML = btn.innerHTML
      btn.innerHTML = '<span>✓ Zkopírováno</span>'
      btn.classList.add('copy-btn--success')

      setTimeout(() => {
        btn.innerHTML = originalHTML
        btn.classList.remove('copy-btn--success')
      }, 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text.trim()
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  })
})

// ── Scroll to result ───────────────────────────────────────

const toolResult = document.getElementById('toolResult')
if (toolResult) {
  toolResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

// ── Contact form success message ───────────────────────────
// Formspree redirects back to /kontakt?success=true after submission.
// Replace the form with a success alert when that parameter is present.

const contactForm = document.querySelector('.contact-form')
if (contactForm && window.location.search.includes('success=true')) {
  contactForm.innerHTML =
    '<div class="alert alert--success">✓ Zpráva byla odeslána. Odpovíme co nejdříve, obvykle do 2 pracovních dnů.</div>'
}
