# Prompting Workflow Comparison

## Round One: Vague Prompting
In the first round, the prompt provided was intentionally minimal and lacking structural details: "make me a profile settings form." The AI operated on assumptions, generating a generic profile form that captured basics like name, username, and email. While visually functional, the code fell short of professional production standards. Front-end validation was completely omitted, leaving the form vulnerable to empty or malformed inputs. The absence of strict styling guidelines yielded a standard layout without specific visual identity or robust responsive behaviors across viewports.

## Round Two: Precise Prompting
For the second round, the prompt was explicitly configured to build a student portal profile form with a highly comprehensive criteria blueprint. It mandated precise fields (Student ID, Full Name, Institutional Email, and Password) and enforced specific architectural constraints. Strict regex-style front-end validation rules were successfully embedded—ensuring Student IDs followed alphanumeric constraints (e.g., STU12345), emails conformed to academic suffixes (.edu), and passwords met rigorous length and complex character checks. Additionally, it explicitly integrated contextual visual error messages positioned dynamically under invalid inputs.

## Mistake Caught & Workflow Takeaways
A critical mistake caught during development was that the AI initially tried to commit all untracked systemic dependencies alongside the custom form source files. By reviewing the git status and staging selectively, this pollution was avoided. 

The core takeaway is that vague prompting forces an LLM to guess specifications, resulting in shallow, insecure boilerplate. Precise prompts with rigorous boundaries, clear definitions of correctness, and explicit verification steps force the AI to produce production-grade logic, native validation, and robust structural architecture.
