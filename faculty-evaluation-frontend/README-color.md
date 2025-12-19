# QUY TẮC CHỈNH SỬA - THEME COLORS UPDATE

## 1. PRIMARY COLORS (Purple theme)

```
bg-indigo-x, bg-purple-x   → bg-primary-x
text-indigo-x, text-purple-x → text-primary-x
border-indigo-x           → border-primary-x

Variants: primary-dark, primary, primary-light, primary-lightest
```

## 2. TEXT COLORS

```
text-slate-800, text-slate-700  → text-text-primary
text-slate-600                  → text-text-secondary
text-slate-500, text-slate-400  → text-text-muted
```

## 3. BACKGROUND COLORS

```
bg-slate-50, bg-gray-50   → bg-background-subtle
bg-slate-100, bg-gray-100 → bg-background-subtle
bg-white                  → bg-white (GIỮ NGUYÊN)
```

## 4. BORDER COLORS

```
border-slate-200          → border-primary-light/20
border-slate-300          → border-primary-light/30
border-slate-400          → border-primary-light/40
border-indigo-x           → border-primary-x
```

## 5. STATUS COLORS - SUCCESS (Green)

```
bg-green-50, bg-emerald-50     → bg-emerald-100 (GIỮ NGUYÊN)
text-green-600, text-emerald-800 → text-success-dark
text-green-700, text-emerald-700 → text-success-dark
border-green-200, border-emerald-200 → border-success-light
```

## 6. STATUS COLORS - WARNING (Amber/Orange)

```
bg-amber-50, bg-orange-50      → bg-amber-100 (GIỮ NGUYÊN)
text-amber-800, text-orange-800 → text-warning-dark
text-amber-700, text-orange-700 → text-warning-dark
border-amber-200, border-orange-200 → border-warning-light
```

## 7. STATUS COLORS - ERROR (Red)

```
bg-red-50, bg-red-100          → bg-red-100 (GIỮ NGUYÊN)
text-red-600, text-red-800     → text-error-dark
text-red-700                   → text-error-dark
border-red-200, border-red-300 → border-error-light
```

## 8. STATUS COLORS - INFO (Blue)

```
bg-blue-50, bg-sky-50          → bg-blue-100 (GIỮ NGUYÊN)
text-blue-600, text-sky-800    → text-info-dark
text-blue-700, text-sky-700    → text-info-dark
border-blue-200, border-sky-200 → border-info-light
```

## 9. EVALUATION GRADE COLORS

```
// Badge S
text-amber-800 (trong context S) → text-grade-s

// Badge A
text-emerald-800 (trong context A) → text-grade-a

// Badge B
text-blue-800 (trong context B) → text-grade-b

// Badge C
text-slate-600 (trong context C) → text-grade-c

// Badge 済 (completed)
text-green-800 (trong context 済) → text-grade-completed
```

## 10. HOVER/FOCUS STATES

```
hover:bg-indigo-x        → hover:bg-primary-x
hover:bg-slate-100       → hover:bg-background-subtle

focus:border-indigo-x    → focus:border-primary
focus:ring-indigo-x      → focus:ring-primary-light/20
```

## 11. OPACITY - Dùng slash notation

```
bg-[color]/20   → 20% opacity
bg-[color]/30   → 30% opacity
bg-[color]/40   → 40% opacity
bg-[color]/50   → 50% opacity

KHÔNG dùng: bg-opacity-x, border-opacity-x
```

---

## ⚠️ LƯU Ý QUAN TRỌNG:

### KHÔNG THAY ĐỔI:

- `bg-white` → Giữ nguyên
- Background colors cho status: `bg-emerald-100`, `bg-amber-100`, `bg-red-100`, `bg-blue-100` → Giữ nguyên
- Tất cả `bg-orange-500` (dùng cho highlights) → Giữ nguyên

### CẦN CHÚ Ý:

- Status colors chỉ thay TEXT và BORDER, KHÔNG thay BACKGROUND
- Grade colors chỉ áp dụng trong context của badges S/A/B/C/済

---

## EXAMPLE TRANSFORMATIONS:

### Before:

```tsx
<div className="bg-slate-50 border border-slate-200">
  <h4 className="text-slate-800">Title</h4>
  <p className="text-slate-600">Content</p>
  <span className="text-emerald-800 bg-emerald-100">Success</span>
</div>
```

### After:

```tsx
<div className="bg-background-subtle border border-primary-light/20">
  <h4 className="text-text-primary">Title</h4>
  <p className="text-text-secondary">Content</p>
  <span className="text-success-dark bg-emerald-100">Success</span>
</div>
```
