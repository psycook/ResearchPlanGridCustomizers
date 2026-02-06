# Research Workbench Grid Customizers

A collection of Power Apps Component Framework (PCF) grid customizer controls for the Research Workbench application. These controls provide custom cell rendering for Dataverse grids, enhancing the visual presentation of research plan data with styled badges, progress indicators, and formatted values.

## Overview

This workspace contains four PCF Virtual Controls that customize the appearance of various grid views in the Research Workbench:

| Customizer | Target Entity | Status |
|------------|---------------|--------|
| ResearchPlanRunGridCustomizer | Research Plan Runs | Implemented |
| ResearchPlanGridCustomizer | Research Plans | Implemented |
| ResearchPlanEntityGridCustomizer | Research Plan Entities | Placeholder |
| ResearchPlanEntityResultGridCustomizer | Research Plan Entity Results | Placeholder |

## Customizers

### 1. ResearchPlanRunGridCustomizer

Customizes the grid view for Research Plan Run records with enhanced visual elements.

**Customized Columns:**

- **Progress (`cra_progress`)** - Displays progress counts (e.g., "[2/5]") with color-coded icons indicating completion status
- **Percentage Complete (`cra_percentagecomplete`)** - Renders as a progress bar with gradient fill and shine effect
- **Duration (`cra_duration`)** - Shows run duration with a stopwatch icon, formatted as minutes and seconds
- **Status (`cra_researchplanrunstatus`)** - Colored status badges for: Queued, Running, Succeeded, Failed, Skipped, Cancelled
- **Date/Time fields** - Formatted with calendar icon in DD/MM/YYYY HH:MM:SS format

### 2. ResearchPlanGridCustomizer

Customizes the grid view for Research Plan records.

**Customized Columns:**

- **Plan Type (`cra_plantype`)** - Styled badges for Manual and Scheduled plans
- **Research Plan Status (`cra_researchplanstatus`)** - Colored badges for: Active, Paused, Archived
- **Execution Frequency (`cra_executionfrequency`)** - Styled badges for: Daily, Weekly, Monthly, Quarterly, Annually, Custom
- **Date/Time fields** - Formatted with calendar icon

### 3. ResearchPlanEntityGridCustomizer

Placeholder customizer for Research Plan Entity records. Ready for implementation.

### 4. ResearchPlanEntityResultGridCustomizer

Placeholder customizer for Research Plan Entity Result records. Ready for implementation.

## Technology Stack

- **Framework:** Power Apps Component Framework (PCF)
- **UI Library:** Fluent UI React v8
- **Language:** TypeScript with React

## Project Structure

Each customizer follows the same structure:

```
[CustomizerName]/
├── package.json
├── pcfconfig.json
├── tsconfig.json
├── eslint.config.mjs
├── [ControlName].pcfproj
└── [ControlName]/
    ├── ControlManifest.Input.xml
    ├── index.ts
    ├── types.ts
    └── customizers/
        ├── CellRendererOverrides.tsx
        └── CellEditorOverrides.tsx
```

## Getting Started

### Prerequisites

- Node.js
- Power Platform CLI (`pac`)

### Build a Customizer

```bash
cd ResearchPlanRunGridCustomizer
npm install
npm run build
```

### Deploy to Power Platform

```bash
pac pcf push --publisher-prefix cra
```
