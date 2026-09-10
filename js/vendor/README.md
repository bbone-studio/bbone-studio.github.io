# Vendored dependencies

## three.js

- Files: `three.module.min.js`, `three.core.min.js`
- Version: r180 (`three@0.180.0`)
- Source: https://cdn.jsdelivr.net/npm/three@0.180.0/build/
- License: MIT — Copyright 2010-2025 Three.js Authors

These are served from this repository rather than a CDN so the 3D pond
background works offline and does not depend on a third-party host.

`three.module.min.js` imports `three.core.min.js`, so both files must be
kept together. To upgrade, download both files from the same version.
