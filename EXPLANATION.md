# AI Co-Pilot Implementation Report

## AI Assistance Throughout Implementation
Cursor's AI Composer acted as the primary software architect for this assignment. Because I am learning development workflows from scratch, the AI did the heavy lifting by abstracting away complex boilerplates, structural file links, and routing setups. It generated 12 highly specialized files containing functional React components (`Sidebar.jsx`, `StatCard.jsx`), modular data structures (`mockData.js`), and responsive styles natively configured to mirror a premium academic portal.

## Manual Improvements & Security Corrections
A key operational bottleneck occurred post-generation regarding local scripts access. When running `npm install`, the Windows environment threw a red `PSSecurityException / UnauthorizedAccess` error because execution policies block third-party scripts from firing inside PowerShell by default. 

I manually intercepted this system block by debugging the terminal access restrictions. I applied a process-scoped override command (`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`) to unblock the execution boundaries safely. This allowed node dependencies to unpack successfully and enabled the development environment to compile and execute without compromising permanent machine security layers.
