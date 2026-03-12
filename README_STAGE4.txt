Stage 4 patch contents:
- Logout now redirects to website instead of showing {"success":true}
- Website header becomes session-aware and lets logged-in clients continue browsing products
- Expanded client portal with orders / quotes / invoices pages
- Improved staff dashboard with stats, shortcuts, latest orders
- Improved admin dashboard with metrics, modules, latest users/orders

Apply:
1) unzip patch into project root
2) npm run build
3) pm2 restart ubcprint
