# Kavio privacy policy publication checks

Reviewed September 29, 2026 against /Volumes/XAVI/kavio.

Confirmed source evidence:
- apps/mobile/config/production.example.json: HTTPS Railway API; cloud sync, analytics, crash reporting and debug logging disabled.
- apps/mobile/lib/integrations/auth/laravel_auth_gateway.dart: name, email, password, device name; account/session endpoints and password-confirmed deletion.
- apps/mobile/lib/features/more/more_screen.dart: account deletion revokes server account and clears account records on this phone.
- docs/PHASE_1_STATUS.md: Retail is current; Pro cloud/AI and Business multi-workspace/web features are planned, not active.
- docs/PRIVATE_DIAGNOSTICS.md: optional aggregate reporting is gated off; infrastructure log and backup retention remain separate operational decisions.
- AndroidManifest.xml: biometrics, notifications, boot completed, internet; Firebase collection disabled.

Required before publication:
1. Confirm privacy contact email or designate the existing company contact form as the monitored privacy/deletion channel.
2. Confirm infrastructure log and backup retention and actual hosting/service providers.
3. Confirm submitted Android build matches the reviewed production configuration (cloud/AI/diagnostics off).
4. Confirm no sale/advertising use and intended adult/business-owner audience.
5. Link the final policy inside the app. This website change does not change the mobile app.

Policy route is implemented locally at /kavio/privacy. Draft placeholders have been replaced following the owner response below.

## Publication decision
Owner supplied technology@xnritsolutions.com and requested standard retention wording. Final text uses purpose-limited retention without an invented fixed deadline, discloses backup residuals, and offers external deletion by email. Route and footer link are ready for publication. Operational retention settings and submitted-build configuration still require owner verification; no mobile code was changed.
