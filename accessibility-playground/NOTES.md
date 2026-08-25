# Accessibility Comparison & Evaluation Notes

This document evaluates the custom components built in the playground against professional production-ready patterns found in libraries like shadcn/ui (powered by Radix UI primitives).

## 1. Modal Dialog Evaluation
Our custom modal handles basic focus trapping and the Escape key nicely. However, professional setups like shadcn manage critical deep-level accessibility gaps:
* **Background Interaction Lockout (`aria-hidden`)**: shadcn injects an `aria-hidden="true"` attribute onto the main application layout wrapper outside the active dialog. Without this, some screen readers can drift outside the visual modal back into secondary page texts.
* **Body Scroll Restraints**: shadcn strips scrolling mechanics dynamically from the document body container (`overflow: hidden`) to guarantee layout visibility cannot shift while users focus on internal options.
* **Outside Dismissal Safety**: Mouse selection routines are decoupled from underlying viewport interactions to prevent selection clipping anomalies on window dismissals.

## 2. Tabs Widget Evaluation
Our tab implementation supports basic ARIA semantic structures and sequential horizontal arrow navigating between tab headers. The main gaps compared to shadcn are:
* **Orientation Constraints**: Professional suites natively adapt keybindings automatically if components layout vertically (`ArrowUp` / `ArrowDown`), supporting a broader range of UI arrangements.
* **Dynamic Keyboard Selection Modes**: shadcn provides automatic activation switches (where moving focus changes the active panel content panel immediately) and manual options (where focus moves but content requires Enter or Space to switch panels).

## 3. Disclosure Component Evaluation
Our disclosure panel operates using standard semantic click mechanics. The primary structural advantages in a production suite like shadcn are:
* **Seamless Animation Rendering**: Animated transition cycles scale up layouts comfortably without losing keyboard index metrics or triggering flickering bugs in screen reader software.
* **Interlocking Context (Accordion Groups)**: Production configurations bind disclosure collections inside an explicit parent index tracking layer so expanding one block seamlessly collapses others.
