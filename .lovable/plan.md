## Fix blank page (React Three Fiber / React 18 mismatch)

### Root cause

`@react-three/fiber@^9` and `@react-three/drei@^10` require React 19. The project is on React 18, so the fiber reconciler crashes at startup with `Cannot read properties of undefined (reading 'S')`, blanking the whole app.

### Change

Downgrade the 3D stack to versions compatible with React 18, keeping `three@0.184`:

- `@react-three/fiber`: `^9.6.1` → `^8.17.10`
- `@react-three/drei`: `^10.7.7` → `^9.114.0`
- `three` and `@types/three`: leave as-is (drei 9 / fiber 8 work with three 0.16x–0.18x)

### Steps

1. Update the two versions in `package.json`.
2. Reinstall (`bun install`) so the Vite dep cache rebuilds.
3. Verify in the preview: homepage renders, no reconciler error in console, `/a-propos` still works.

### Notes

- No component code changes expected — fiber/drei APIs used here (`Canvas`, basic meshes, OrbitControls/Float-style helpers) are stable across these versions.
- If any drei import breaks after downgrade, I'll adjust the import path in that single file.
- Alternative (not recommended now): upgrade the whole app to React 19. Larger blast radius across shadcn, Radix, framer-motion — not worth it just to fix this.