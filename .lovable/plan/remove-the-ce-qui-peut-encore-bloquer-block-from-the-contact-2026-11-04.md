Remove the "Ce qui peut encore bloquer" block from the contact step of the form (campaign page and pop-up).

- In `src/components/diagnostic/DiagnosticModal.tsx`, delete the `blockers` details block (lines 341-348) and the now-unused `blockers` computation/imports if nothing else uses them.
- Scoring, qualification and GoHighLevel data are unchanged.
