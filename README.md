# sriramkofc.github.io

Personal website of Sriram Karthikeyan, AI Engineer in Sydney.

- Next.js (static export) + Tailwind CSS v4
- Original 3D hero scene built with three.js / react-three-fiber
- All content lives in `src/data/profile.ts`
- Includes the Ask Sriram chat assistant ([source](https://github.com/SriramkOfc/ask-sriram))

## Develop

```bash
npm install
npm run dev
```

## Deploy

`npm run deploy` builds the static site into `out/` and pushes it to the `main` branch, which GitHub Pages serves at https://sriramkofc.github.io. Source code lives on the `source` branch.
