# Access Control Structure

## Public client website
- `/`
- `/products`
- `/design`
- `/request-quote`
- `/track-order`
- `/client/login`
- `/client/register`
- `/client/portal`

## Staff area
- `/staff/login`
- `/staff/dashboard`
- legacy internal routes like `/dashboard`, `/orders`, `/accounting` are treated as staff routes

## Admin area
- `/admin/login`
- `/admin/dashboard`

## Rules
- Client accounts can only access client routes.
- Staff accounts can only access staff and legacy internal routes.
- Admin accounts can access admin routes and internal routes.
- `/login` now redirects to `/staff/login`.
