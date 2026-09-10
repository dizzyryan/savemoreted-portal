# SaveMoreTED presentation demo

Approved in conversation: React Native, Expo, and TypeScript; a local frontend demo for Android, iOS, and web presentations.

## Experience

A calm teal/cream interface with a home dashboard, welcome/introduction, scripted symptom conversation, guided gaze capture simulation, selectable sample outcomes, referral guidance, and a preliminary report. The questionnaire collects eye discomfort, pain during movement, double vision frequency, and daily-life impact using buttons. A separate presenter-controlled support preview illustrates mild, moderate, and crisis support without inferring mental-health status.

Capture walks through primary, left, right, up, down, and closed-eye illustrative positions. Feedback and completion are explicitly simulated. No camera, photos, real medical inference, authentication, backend, booking, or clinical thresholds. User-selected outcomes never derive from questionnaire answers. Incomplete sessions cannot produce a completed screening report. Outcomes include Green, Yellow, Red, and Inconclusive. Reports expose sample feature information, source labels, and questionnaire answers. Proptosis remains unvalidated and unmeasured.

Referral UI explains the example next step and opens a mock consultation-preparation flow, clearly confirming that nothing was booked or sent. Clinical copy is illustrative and requires professional review before actual use. Green never excludes TED. Inconclusive offers repeat capture. A local text report export uses a browser download on web and the OS share sheet on native, initiated by the user.

## Structure

One Expo app with reusable native components, separate screen modules, typed sample data, and explicit in-memory demo state. No persistent personal data or network calls in application code. Bundled vector illustrations use react-native-svg; no remote image/font dependencies. Responsive layout centers mobile content and expands home/report sections on desktop. Accessible button roles, readable text, safe areas, scrollable screens, and keyboard-compatible controls.

## Verification

TypeScript check; Expo web and native JS bundle exports; browser walkthrough of questionnaire, capture, all outcome/referral/report scenarios, incomplete-session protection, support preview, restart, and mobile-size layout. No migrations and no `pnpm run dev`. Native bundles do not constitute device testing.
