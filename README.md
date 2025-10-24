# GlobStory F-Droid Package

This repository tracks everything needed to submit the `com.globstory.app`
package to F-Droid. It mirrors the structure of an `fdroiddata` fork so you can
prepare metadata, run the reproducible build locally, and open a merge request.

## Repository Layout

- `metadata/com.globstory.app.yml` — F-Droid metadata file ready for
  `fdroiddata`. Bump the `versionName`, `versionCode`, and `commit` fields when
  shipping a new release.

## Release Workflow

1. **Tag the upstream source**
   - Commit/push all changes to `https://github.com/theRAGEhero/globstory`.
   - Create an annotated tag that matches `versionName`/`versionCode` (e.g.
     `git tag -a v1.0 -m "GlobStory 1.0"` and `git push origin v1.0`).
2. **Update metadata**
   - Edit `metadata/com.globstory.app.yml` with the new version values and add a
     fresh entry under `Builds`.
3. **Verify the build recipe**
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
   export ANDROID_SDK_ROOT=/home/ale/android-sdk
   fdroid lint com.globstory.app
   fdroid checkupdates com.globstory.app
   fdroid build -v com.globstory.app
   ```
4. **Open the merge request**
   - Commit the metadata changes in your `fdroiddata` fork.
   - Push and submit an MR to <https://gitlab.com/fdroid/fdroiddata>.
   - Answer reviewer feedback; F-Droid will rebuild and sign the APK.

## Notes

- The Android sources live in
  `https://github.com/theRAGEhero/globstory-android/` under
  `android-fdroid-build/`.
- The build requires Java 11 and the standard Android SDK (`platforms` +
  `build-tools`).
- The app depends on live OpenHistoricalMap tiles and Wikimedia content, so the
  metadata declares the `NonFreeNet` anti-feature.
