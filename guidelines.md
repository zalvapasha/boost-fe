# Project Guidelines — Multi-Step Blog Creation Wizard (Feature-Based)

> Minimal, readable, and easy-to-maintain Next.js project that implements a multi-step blog creation wizard. Uses **localStorage** for persistence and **Tailwind CSS** for styling. Focus on feature-based folder structure and reusable components.

---

# 1. Goal

Build a multi-step blog post creation wizard where users can:

- Enter metadata (title, author)
- Enter summary & category
- Write content
- Review & submit

After submission: save posts to `localStorage` and show them on the main blog list page with a post detail page.

---

# 2. Tech stack

- **Next.js** (any stable version; `app/` router recommended)
- **React** (functional components + hooks)
- **Tailwind CSS** for styling
- `localStorage` for persistence
- Optional tiny libs: `clsx` for class merging (optional)

---

# 3. Project structure — Feature-based (suggested)

Use features as top-level folders. Keep UI primitives and shared hooks/utilities in `shared/`.

```
src/
├─ features/
│  ├─ blogWizard/
│  │  ├─ components/
│  │  │  ├─ WizardLayout.tsx
│  │  │  ├─ Step1Metadata.tsx
│  │  │  ├─ Step2SummaryCategory.tsx
│  │  │  ├─ Step3Content.tsx
│  │  │  └─ Step4ReviewSubmit.tsx
│  │  ├─ hooks/
│  │  │  └─ useWizard.ts
│  │  ├─ types.ts
│  │  └─ index.tsx    // exported route or wrapper
│  ├─ posts/
│  │  ├─ components/
│  │  │  ├─ PostCard.tsx
│  │  │  └─ PostList.tsx
│  │  ├─ hooks/
│  │  │  └─ usePosts.ts
│  │  ├─ types.ts
│  │  └─ index.tsx    // posts page, detail page
├─ shared/
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx
│  │  └─ Textarea.tsx
│  ├─ hooks/
│  │  └─ useLocalStorage.ts
│  ├─ utils/
│  │  └─ date.ts
│  └─ constants.ts
├─ pages/ or app/
│  ├─ (routes: /, /create, /posts/[id])
└─ styles/
   └─ globals.css (Tailwind)
```

Notes:
- Keep feature boundaries narrow and cohesive.
- Each feature folder should export a small public API (components/hooks) via `index.tsx`.

---

# 4. State management strategy

- Use a local feature-level state for the wizard — `useReducer` is suggested for clarity and predictable updates.
- Persist the final posts list in `localStorage` via a shared hook `useLocalStorage<T>(key, initial)`.
- Use `useContext` only if you need wizard state available across remote subtrees (not required if wizard is self-contained).

Suggested `useWizard` responsibilities:
- hold wizard data (title, author, summary, category, content)
- provide `nextStep()`, `prevStep()` and `goToStep()`
- provide validation functions per step
- provide `submitPost()` that builds a post object, adds date, saves to posts storage

---

# 5. Validation rules (simple and required)

- Step 1: `title` (required, min 3 chars), `author` (required)
- Step 2: `summary` (required, min 10 chars), `category` (required)
- Step 3: `content` (required, min 20 chars)
- Step 4: read-only review — final confirm

Validation UX:
- Inline error messages below inputs
- Disable "Next" when validation fails
- Allow moving back anytime

---

# 6. Data model

```ts
// features/blogWizard/types.ts
export type Post = {
  id: string;                // uuid or timestamp string
  title: string;
  author: string;
  summary: string;
  category: string;          // Tech | Lifestyle | Business
  content: string;
  createdAt: string;         // ISO date
}

export type WizardData = Omit<Post, 'id' | 'createdAt'>
```

---

# 7. Persistence — `localStorage`

Shared hook `useLocalStorage<T>(key, initial)` responsibilities:
- initialize from `localStorage` on mount
- write to `localStorage` when value changes
- keep API identical to `useState` (`[value, setValue]`)

Posts hook `usePosts()` example API:
- `const { posts, addPost, getPostById, removePost } = usePosts()`
- `addPost(post)` should create `id` + `createdAt` then persist

Edge cases:
- `localStorage` unavailable (SSR in Next.js): guard with `typeof window !== 'undefined'`.
- Keep initial render consistent — prefer to render nothing until client mount or hydrate safely.

---

# 8. Pages & Routing

Routes:
- `/` — Blog home (PostList)
- `/create` — Wizard entry (WizardLayout)
- `/posts/[id]` — Post detail page

Routing notes:
- When using Next.js `app/` router: create `app/create/page.tsx`, `app/posts/[id]/page.tsx`.
- After `addPost(...)`, navigate to `/` (or the newly created post) using `useRouter().push('/' or \`/posts/${id}\`)`.

---

# 9. Reusable components

Create small, focused UI primitives in `shared/ui/`:
- `Button` — accepts `variant`, `size`, `disabled`
- `Input` — label-friendly and supports `error` text
- `Textarea` — label + char count optional
- `FormError` — small component to render field errors

Wizard layout components:
- `WizardLayout` — stepper bar, step container, back/next controls
- Each step should be its own component receiving `value`, `onChange`, `errors`

DRY: move repeated logic (e.g., field wrappers, validation helpers) into shared files.

---

# 10. Styling & Tailwind

- Use Tailwind classes directly in components.
- Keep styles minimal — focus on spacing and readable layout.
- Example utility classes for layout:
  - `max-w-3xl mx-auto p-6` for pages
  - `space-y-4` between vertical fields
  - Buttons: `px-4 py-2 rounded-lg shadow-sm` (variants via props)

Tailwind setup notes:
- Follow official Next.js + Tailwind installation.
- Keep `globals.css` for base resets and font utilities.

---

# 11. Accessibility & UX

- Use proper `label` + `id` for inputs
- Keyboard accessible buttons (enter to submit where appropriate)
- Show clear success message after submit and provide link to view the post
- Keep "Back" button visible on steps 2–4

---

# 12. Error handling & edge cases

- `localStorage` errors: wrap `JSON.parse`/`stringify` in try/catch and fallback to safe defaults
- Prevent submission if validation fails
- If SSR renders cause mismatch, conditionally render wizard only on client (use `useEffect` + mounted flag)

---

# 13. Example small code snippets

**useLocalStorage hook (conceptual)**

```ts
// shared/hooks/useLocalStorage.ts
import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {}
  }, [key, state])

  return [state, setState] as const
}
```

**addPost implementation (conceptual)**

```ts
// features/posts/hooks.ts
function addPost(data: WizardData) {
  const post: Post = {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    ...data,
  }
  setPosts(prev => [post, ...prev])
}
```

---

# 14. Evaluation checklist (map to criteria)

**Readability (50%)**
- Feature-based folders
- Short files, small components
- Clear naming: `Wizard`, `Step1Metadata`, `usePosts` etc.

**Reusability (30%)**
- `shared/ui` primitives
- `useLocalStorage` + `usePosts` hooks
- Step components accept props (`value`, `onChange`, `errors`)

**Functionality (15%)**
- Next/Back navigation implemented
- Per-step validation
- Posts persist in `localStorage`

**UX (5%)**
- Clear stepper and success message
- Responsive basics via Tailwind utilities

---

# 15. How to extend

- Replace `localStorage` with real API by implementing adapters for `usePosts`.
- Add image uploads: store image metadata and optionally use local object URLs.
- Add tags, drafts, or scheduled publish date.

---

# 16. Commit / PR conventions

- Make small, focused commits. Example messages:
  - `feat(wizard): add Step1Metadata and validation`
  - `chore: add useLocalStorage hook`
  - `fix(posts): handle localStorage parse error`

---

# 17. Minimal dev setup & run

1. `npx create-next-app@latest --ts` (or your preferred setup)
2. Install Tailwind and init per docs
3. Add the `src/` structure above
4. Start dev server: `pnpm dev` / `npm run dev`

---

# 18. Final tips

- Small components and clear prop shapes are easier for reviewers.
- Keep logic testable: isolate side-effects (localStorage) behind hooks.
- Prioritize readability over cleverness. A post creation wizard should be easy to follow from the code alone.

---

If you want, I can also generate a starter repository scaffold (file templates) following this guideline — tell me the router you prefer (`app/` or `pages/`) and I will scaffold the files.

