# FamSync Testing and Build Notes

## Android preview build

Use the preview profile from `eas.json`:

```bash
eas build --platform android --profile preview
```

This creates an internal Android build that is easier to test without App Store or Play Store release steps.

## iOS simulator-only workflow

If you do not have access to a paid Apple Developer team, prefer the iOS Simulator path:

```bash
npm run dev
```

Then press:

- `i` to open iOS Simulator
- `w` to open web

You can also run:

```bash
npx expo start --lan --clear
```

This is enough for local UI and flow testing without device provisioning.

## Physical iPhone reality check

To install signed iOS builds on a physical iPhone through Apple signing, you need:

- a paid Apple Developer account
- or membership in a paid Apple Developer team

Without that, iOS Simulator is the best supported local option.

## Recommended local sanity checks

```bash
npm install --legacy-peer-deps
npx expo-doctor
npm run typecheck
npx expo start --clear
```
