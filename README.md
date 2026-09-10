# SaveMoreTED — frontend concept demo

A presentation-only AI-assisted TED pre-screening concept built with **React Native, Expo, and TypeScript**. One codebase targets Android, iOS, and web.

## Run locally

Use Node.js 22.14 or newer (CI uses Node 22) and npm. Commit `package-lock.json` with dependency changes; CI uses `npm ci` for reproducible installs.

```sh
npm install
npm start
```

Use a compatible Expo Go app on Android/iOS or choose the web option. Native simulators require the corresponding platform tooling. Use `npm run web` for browser development, `npm run ios` or `npm run android` for a configured simulator/device. The implementation task does not run a development server or any migrations.

```sh
npm run typecheck
npm run build:web
npm run build:native
```

`dist/` contains the browser export. `dist-native/` contains native JavaScript/assets, **not** an APK/IPA. Native installable builds, signing, and app-store deployment are outside this demo.

## Developer checks

```sh
npm run check      # formatting, ESLint, TypeScript, unused-code/dependency checks
npm run check:all  # all checks plus web and iOS/Android JS bundle exports
```

| Command                | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| `npm run format`       | Apply Prettier formatting throughout the repository                        |
| `npm run format:check` | Fail on files that need formatting, without modifying them                 |
| `npm run lint`         | Expo/React Hooks lint rules; warnings also fail the check                  |
| `npm run lint:fix`     | Apply safe ESLint fixes; report remaining issues                           |
| `npm run typecheck`    | Strict TypeScript validation, unused locals/parameters, switch fallthrough |
| `npm run check:unused` | Knip checks unused files, exports, dependencies, and missing dependencies  |

Prettier and ESLint ignore generated exports. `.editorconfig` keeps indentation and line endings consistent. The GitHub Actions workflow runs `check`, `build:web`, and `build:native` on pushes and pull requests. It does not deploy, run migrations, or start a development server. Configure branch protection in GitHub separately if these checks should block merging.

ESLint 9 is retained for compatibility with the React plugin used by Expo; that plugin currently does not declare ESLint 10 support. Upgrade them together rather than forcing incompatible peer dependencies. `expo-system-ui` supports the existing Android light-theme setting. Over-the-air updates are explicitly disabled for this local demo.

These checks complement interactive testing; they do not validate clinical behavior or replace testing on physical devices.

## Presentation walkthrough

1. Home offers a short TED introduction and the guided eye-check entry. The three-step explanation appears when you start the check.
2. The dedicated **Chat** tab accepts typed messages and offers local scripted follow-ups for pain, double vision, and daily-life impact. Sample emotional-distress phrases illustrate mild/moderate support and a crisis pause. This is basic phrase matching, not an LLM or a validated safety detector.
3. **Eye check** collects four structured answers, then guides six illustrative gaze positions. For each position, take a simulated photo and wait for acceptance before Next becomes available. Preview a quality failure to test that a retake is required.
4. Finishing creates a dated session report. Presenter controls change the current demo outcome; no clinical scoring occurs.
5. **Reports** lists dated session reports and clearly marked fictional examples. Select one to inspect its own answers, findings, and care pathway. Select Reports again to return to the list.
6. The mock referral checklist sends nothing and books nothing. Report export is user-initiated.
7. Tabs preserve the chat transcript, questionnaire answers, and capture position during the session. Leaving capture requires checking the current photo again. Reset/reload clears session data.

`npm test` exercises the scripted symptom and distress examples, including crisis-pause behavior; it is also part of `npm run check`. It uses Node's TypeScript stripping, which may emit an experimental warning on Node 22.14.

Educational copy links to the [National Eye Institute](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/graves-eye-disease). Hong Kong support details link to [Shall We Talk's official resources](https://www.shallwetalk.hk/en/get-help/emergency-helplines/). Both were checked during this UI revision; clinical copy and escalation rules still require professional review.

## Boundaries

- Frontend only: no backend, API calls, uploads, authentication, CV/ML, calibrated measurements, real appointments, or referral integration.
- All screening outcomes and measurement values are explicitly fictional. Proptosis, motility, lid lag, and AI-assisted CAS are not assessed.
- No clinical decision rules, referral thresholds, or emergency timings have been invented. These require clinical ownership before actual use.
- Answers are held in memory only. Reset/reload clears them. User-initiated exported files persist outside the app; no encryption or production privacy guarantees are claimed.
- Camera feedback is simulated. The displayed gaze sequence is illustrative, not a validated clinical protocol.
- No remote font or image dependencies; illustration and icons are bundled SVG components.
- No migrations or `pnpm run dev`.

## Code map

- `App.tsx`: responsive shell, navigation, in-memory session state.
- `src/demo.ts`: typed sample scenarios, questions, gaze steps, text-report serialization.
- `src/ui.tsx`, `src/illustrations.tsx`: common controls and bundled artwork.
- `src/screens/`: home, introduction, questionnaire, capture, outcome, referral, and report views.
- `docs/superpowers/`: approved scope and implementation checklist.

## Verification notes

TypeScript, web export, and Android/iOS JavaScript bundle exports pass. Expo's installed SDK compatibility map reports matching dependencies. Browser walkthrough covers the scripted questionnaire, severe-support pause, capture-quality retry, all four sample outcomes, mock preparation checklist, report contents, reset, and incomplete-session handling. Layout checked at phone and desktop viewport sizes.

The in-app browser displayed the export confirmation but did not expose a completed download event, so file delivery still needs checking in a regular browser. Physical iOS/Android devices and the native share sheet have not been tested.

`npm audit` reports 10 moderate dependency entries tracing to one `uuid` advisory through Expo's Xcode/config tooling. No high or critical entries were reported. npm's proposed automatic resolution downgrades Expo to SDK 46, so it was not applied. This demo is not a production security review.
