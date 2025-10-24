# GlobStory – F-Droid build

This repository contains the reproducible Android wrapper used for the GlobStory
listing on F-Droid.

## Building

```
ANDROID_SDK_ROOT=/path/to/android-sdk \
./gradlew assembleRelease
```

The project targets API level 34 and requires:

- Java 17 (e.g. OpenJDK 17)
- Android SDK Platform 34
- Android Build Tools 34.0.0

The unsigned release APK will be generated at
`app/build/outputs/apk/release/app-release-unsigned.apk`.
