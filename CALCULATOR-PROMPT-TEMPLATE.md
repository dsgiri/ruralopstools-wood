# Storage Reusable Calculator Page Master Prompt

## 1. Purpose of this template
This master prompt template is designed to instruct AI coding agents to build consistent, launch-ready calculator pages for the **Storage — Rural Utility Cost** ecosystem. By using a standardized parameter set and strict instructions, this template ensures all future calculators adhere to the same UI/UX patterns, code architecture, and trust models established by the Grain Bin Capacity Estimator, eliminating feature creep and design fragmentation.

## 2. Design and product principles
- **Practical Tone:** Use plainspoken, outcome-driven language. Avoid marketing fluff, SaaS-isms, or exaggerated claims.
- **Immediate Utility:** Place the calculator tool "above the fold" so users can immediately begin entering data without scrolling.
- **Transparent Assumptions:** Clearly define the base formulas, industry averages, or default values used to generate the results.
- **Clear Primary Result:** Use bold typography and visual anchors for the most critical output, supporting it with secondary breakdowns.
- **No Fake Precision:** Avoid displaying excessive decimal places unless technically required; use practical rounding.
- **Mobile-First Execution:** Ensure inputs and outputs stack elegantly on small screens, maintaining large tap targets.

## 3. Shared page structure
Every calculator page must follow this strict top-to-bottom layout:
1. **Header/Hero:** Clear H1 title stating exactly what the calculator does, followed by a one-sentence benefit summary.
2. **Calculator Module (Two-Column Layout):**
   - **Input Column (Left/Top):** Form controls for user data entry.
   - **Output Column (Right/Bottom):** Real-time results panel with a visual anchor for the primary metric.
3. **Primary CTA:** A clear action button below the results (e.g., "Print Summary", "Save to Favorites").
4. **How It Works / Formulas:** A bulleted or short-text breakdown of the logic used.
5. **Definitions & Assumptions:** Brief explanations of technical terms and default variables.
6. **FAQ Section:** Dropdown accordions answering 3-4 common user questions.
7. **Related Tools:** Links to 2-3 complementary calculators within the Storage ecosystem.
8. **Disclaimer:** The standard `CalculatorDisclaimer` component.

## 4. Shared UI/UX rules
- **Form Layout:** Group related inputs logically. Use visual controls (range sliders, dropdowns, radio toggles) where appropriate to minimize typing.
- **Results Layout:** Results must update in real-time as inputs change. Use high-contrast panels or distinct borders to separate outputs from inputs.
- **Typography & Colors:** Adhere to the established warm/earth tone branding (`#3D342C`, `#5A4633`, `#8C7A6B`, `#DCD3C7`, `#E8E0D5`/`#F9F7F4`).
- **FAQ Behavior:** Use standard accessible disclosure widgets (accordions) that default to closed.
- **Supporting Content:** Keep text concise, scannable, and formatted with bullet points or bold lead-ins.
- **Footer:** Use the unified `Layout` component to inherit the standard network footer and navigation.

## 5. Shared accessibility rules
- All form inputs must have associated, explicit `<label>` elements or `aria-label` attributes.
- Use `aria-live="polite"` on the results container to announce real-time updates to screen readers.
- Ensure high color contrast (at least 4.5:1) for all text.
- Form controls must be fully navigable via keyboard (Tab/Shift+Tab, Space/Enter for toggles).
- Icons must include `aria-hidden="true"` if they are purely decorative.

## 6. Shared mobile rules
- **Stacking Order:** Inputs appear first, followed immediately by the sticky or inline results panel.
- **Tap Targets:** All interactive elements (inputs, buttons, dropdowns) must be at least 44x44px.
- **Input Types:** Use appropriate HTML5 input types (e.g., `type="number"`, `inputMode="decimal"`) to trigger the correct mobile keyboards.
- **Spacing:** Provide generous vertical padding between form groups to prevent accidental mis-taps.

## 7. Shared repository safety rules
- **Do not** modify global CSS or layout wrappers when building a single calculator.
- **Do not** introduce new UI component libraries; strictly use Tailwind CSS and existing base components.
- **Do not** add generic, unverified placeholder text—use the provided exact copy.
- **Do not** omit the `CalculatorDisclaimer` component.
- **Do not** invent new backend dependencies; logic must remain client-side.

## 8. Parameter list
Before running the master prompt, fill in the following parameters:
- `{{CALCULATOR_NAME}}`: The exact H1 title of the tool.
- `{{PAGE_SLUG}}`: The URL path (e.g., `/tools/feed-capacity`).
- `{{PRIMARY_USER_GOAL}}`: The specific problem the user is trying to solve.
- `{{INTRO_SUMMARY}}`: A 1-2 sentence description for the hero section.
- `{{INPUT_FIELDS}}`: A detailed list of required inputs, including data types, units, and default values.
- `{{OUTPUT_FIELDS}}`: A detailed list of calculated outputs, indicating the primary visual anchor.
- `{{FORMULA_LOGIC}}`: The exact mathematical formulas or business logic rules required.
- `{{ASSUMPTIONS}}`: Default constants, industry averages, or static variables used in calculations.
- `{{FAQ_TOPICS}}`: A list of 3-4 questions and answers.
- `{{RELATED_TOOLS}}`: Links to 2-3 other related sub-tools.
- `{{DISCLAIMER_NOTES}}`: Any tool-specific legal or safety warnings to append above the standard disclaimer.

## 9. Reusable master prompt template

```markdown
I am planning to implement the **{{CALCULATOR_NAME}}** page. Based on the established "Storage — Rural Utility Cost" digital calculator layout and standards, please build this page following a strict Plan-Implement-Validate (PIV) workflow.

**Context & Setup:**
- **Page Name:** {{CALCULATOR_NAME}}
- **Page Slug:** {{PAGE_SLUG}}
- **User Goal:** {{PRIMARY_USER_GOAL}}
- **Intro Summary:** {{INTRO_SUMMARY}}

**Requirements:**

1. **Architecture & UI:**
   - Use the shared `Layout` wrapper.
   - Implement a two-column desktop layout: Input Form on the left/top, Real-time Results on the right/bottom.
   - Use Tailwind CSS utilizing the approved warm/earth tone branding.
   - The calculator must update instantly upon input changes using React state.

2. **Inputs:**
   Create semantic, accessible form controls for the following fields. Use appropriate visual controls (sliders, toggles, dropdowns) where applicable:
   {{INPUT_FIELDS}}

3. **Outputs & Logic:**
   Implement the following calculations. Anchor the primary output visually.
   - **Outputs:** {{OUTPUT_FIELDS}}
   - **Formulas:** {{FORMULA_LOGIC}}
   - **Assumptions/Constants:** {{ASSUMPTIONS}}

4. **Supporting Content (Below the Fold):**
   - Add a "How It Works" section explaining the logic.
   - Add a "Definitions & Assumptions" section detailing the default variables used.

5. **Trust & Engagement:**
   - **FAQs:** Implement an accordion with these items:
     {{FAQ_TOPICS}}
   - **Related Tools:** Add cards or links to:
     {{RELATED_TOOLS}}
   - **Disclaimer:** Ensure the standard `<CalculatorDisclaimer />` is rendered at the bottom. Include these specific notes: {{DISCLAIMER_NOTES}}.

**Execution Instructions:**
- **Step 1 (Plan):** Acknowledge these parameters and confirm the component structure.
- **Step 2 (Implement):** Write the clean, client-side React/TypeScript code using only Tailwind CSS. Extract complex math to a separate utility file if necessary.
- **Step 3 (Validate):** Confirm that accessibility rules (aria-labels), mobile tap targets (>44px), and error bounds (e.g., preventing negative numbers) are properly handled.

Do not add extra features, database connections, or unrequested UI noise. Keep it practical, performant, and aligned with the Grain Bin Capacity Estimator pattern.
```

## 10. Usage instructions
1. Copy the **Reusable master prompt template** (Section 9).
2. Gather the domain knowledge required for the specific calculator.
3. Replace all `{{PARAMETER}}` placeholders with the gathered data. Ensure formulas are mathematically sound and inputs have realistic defaults.
4. Feed the completed prompt to the AI coding agent.
5. Review the agent's proposed plan (PIV Step 1) before allowing it to write code.
6. Verify the final implementation against the consistency checklist (Section 12).

## 11. Example filled-in variants

### A. Feed Storage Capacity Calculator
- **`{{CALCULATOR_NAME}}`**: Feed Storage Capacity Calculator
- **`{{PAGE_SLUG}}`**: `/tools/feed-storage`
- **`{{INPUT_FIELDS}}`**: Silo diameter (ft), Silo height (ft), Feed density (lbs/cu ft) [Default: 40], Feed rate per head (lbs/day), Herd size (count).
- **`{{OUTPUT_FIELDS}}`**: Total Capacity (Tons) [PRIMARY], Total Volume (Cu Ft), Estimated Days of Feed Available.
- **`{{FORMULA_LOGIC}}`**: Volume = π * (diameter/2)^2 * height; Total Lbs = Volume * Feed density; Tons = Total Lbs / 2000; Daily Usage = Feed rate * Herd size; Days Available = Total Lbs / Daily Usage.

### B. Equipment Storage Planner
- **`{{CALCULATOR_NAME}}`**: Equipment Storage Planner
- **`{{PAGE_SLUG}}`**: `/tools/equipment-storage`
- **`{{INPUT_FIELDS}}`**: Number of Tractors, Avg Length/Width per Tractor, Number of Implements, Avg Length/Width per Implement, Required clearance margin (ft) [Default: 4].
- **`{{OUTPUT_FIELDS}}`**: Recommended Shed Area (Sq Ft) [PRIMARY], Minimum Shed Dimensions (ft x ft).
- **`{{FORMULA_LOGIC}}`**: Base Area = Sum of (Length * Width) for all equipment; Total Area = Base Area * 1.5 (for clearance/movement); Suggest dimensions based on standard pole barn spans (e.g., 40ft width).

### C. Spoilage Risk Assessor
- **`{{CALCULATOR_NAME}}`**: Spoilage Risk Assessor
- **`{{PAGE_SLUG}}`**: `/tools/spoilage-risk`
- **`{{INPUT_FIELDS}}`**: Crop type (Dropdown), Current Moisture Content (%), Storage Temperature (°F), Expected storage duration (months).
- **`{{OUTPUT_FIELDS}}`**: Spoilage Risk Level (Low/Medium/High) [PRIMARY], Recommended maximum safe storage time, Target moisture level for safe storage.
- **`{{FORMULA_LOGIC}}`**: Lookup table combining Moisture Content vs. Temperature to determine safe allowable storage time based on standard agronomy charts.

### D. Storage Cost Analysis Matrix
- **`{{CALCULATOR_NAME}}`**: Storage Cost Analysis Matrix
- **`{{PAGE_SLUG}}`**: `/tools/storage-cost`
- **`{{INPUT_FIELDS}}`**: Total construction cost ($), Expected lifespan (years), Annual interest rate (%), Annual maintenance cost ($), Total storage capacity (bushels/tons).
- **`{{OUTPUT_FIELDS}}`**: Annualized Cost per Unit (e.g., $/bushel/year) [PRIMARY], Total Annual Ownership Cost, Break-even crop price premium required.
- **`{{FORMULA_LOGIC}}`**: Amortized annual cost = (Construction cost * Interest rate) / (1 - (1 + Interest rate)^-Lifespan); Total Annual = Amortized + Maintenance; Cost per Unit = Total Annual / Capacity.

## 12. Consistency checklist
Before approving the PR or finalizing the page, verify the following:
- [ ] **Above the Fold:** Is the H1 clear, and is the calculator immediately usable without scrolling?
- [ ] **Two-Column Layout:** Does it use the left-input/right-output pattern on desktop?
- [ ] **Real-Time Updates:** Do outputs recalculate instantly without a page reload or generic "Submit" button?
- [ ] **Visual Anchor:** Is the primary output visually distinct and prominent?
- [ ] **Mobile Usability:** Do inputs stack on top of outputs on mobile? Are tap targets at least 44px?
- [ ] **Tone:** Is the language practical and free of marketing hype?
- [ ] **Trust Elements:** Are the "How It Works", Assumptions, FAQ, and Related Tools sections populated accurately?
- [ ] **Disclaimer:** Is the `CalculatorDisclaimer` present at the bottom of the tool?
- [ ] **Accessibility:** Do all inputs have proper labels? Can the tool be navigated via keyboard?
