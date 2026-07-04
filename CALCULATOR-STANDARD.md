# Rural Ops Tools - Calculator Standard

This document outlines the design and implementation standards for all calculators and estimators developed for the Rural Ops Tools subdomain network.

## Core Design Principles

1. **Clear Input, Transparent Output**
   - Forms must be organized logically (e.g., standard dimensional units -> modifier rates -> final aggregations).
   - All input fields must have distinct, clear labels and placeholder values.
   - Use sensible default base numbers to illustrate tool operation upon first load.

2. **Immediate Feedback**
   - Calculations should update instantly on input change when feasible (using component state).
   - Results should be isolated graphically (e.g., summary cards or highlighted metric grids).

3. **Required Components**
   - Every calculator MUST integrate the `CalculatorDisclaimer` component positioned prominently below the final results.

4. **Accessibility**
   - All inputs must have associated native HTML attributes, specific IDs, and screen-readable labels.
   - SVGs and generic icons should use `aria-hidden="true"`.

5. **Responsiveness**
   - Input forms and result panels must stack elegantly on mobile views.
   - Standardize mobile views to single-column stacking and expand dynamically to grids on larger breakpoints.

6. **Error Handling & Bounds Checking**
   - Bound numeric inputs logically (e.g., no negative widths, lengths, or thicknesses). 
   - Inform the user seamlessly if calculated outputs drift beyond typical functional sanity limits.

## Code Standards

- **State Management**: Prefer local component state (`useState`, `useReducer`) for individual calculators. 
- **Modularity**: Complex calculators should extract formula logic to pure TypeScript functions inside a generic `lib/` or `utils/` folder to maintain distinct testable logic, separate from React rendering.
- **Typing**: Strongly type all input bounds and calculation sets using TypeScript interfaces.

## Legal & Compliance

Every tool acts strictly as an informational estimator, not a professional, registered advisory model. Our users depend on the tools for scoping estimates, not definitive legal, agronomy, or architectural plans. Ensure the final disclaimer explicitly guides users to verify data locally.
