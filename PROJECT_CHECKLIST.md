# Ghero — Implementation Checklist

## Phase 0: Documentation & Architecture
- [x] Inspect repository
- [x] Create PROJECT_REQUIREMENTS.md
- [x] Create PROJECT_CHECKLIST.md
- [x] Define database schema (Prisma)
- [x] Define API contracts / service architecture
- [x] Define authentication/session architecture
- [x] Define payment architecture (Razorpay flow)
- [x] Define admin authorization model
- [x] Define media architecture (Cloudinary)
- [x] Define email architecture (Google SMTP)
- [x] Define WhatsApp integration abstraction
- [x] Create .env.example
- [x] Create README.md

## Phase 1: Project Foundation
- [x] Initialize Next.js project with App Router
- [x] Configure TypeScript (strict mode)
- [x] Configure Tailwind CSS
- [x] Install and configure Framer Motion
- [x] Configure ESLint & Prettier
- [x] Set up Prisma with PostgreSQL
- [x] Create initial Prisma schema
- [x] Run initial migration
- [x] Create seed script
- [x] Set up project directory structure
- [x] Configure fonts (heading + body)
- [x] Set up color palette / design tokens
- [x] Create base layout components
- [x] Set up environment variable management

## Phase 2: Storefront UI

### Homepage
- [x] Hero Section component
- [x] New Arrivals section
- [x] Bestsellers section
- [x] Shop by Category section
- [x] Shop by Reels section
- [x] Testimonials section
- [x] Footer component
- [x] Header/Navigation component
- [x] Mobile navigation
- [x] Responsive design for all sections

### Shop Page
- [x] Product grid layout
- [x] Category filter
- [x] Price filter
- [x] Size filter
- [x] Color filter
- [x] Availability filter
- [x] Discount filter
- [x] Sorting (recommended, newest, price low/high, bestseller, discount)
- [x] Pagination / infinite scroll
- [x] Product count display
- [x] Empty state
- [x] Loading state (skeleton)
- [x] Responsive layout

### Category Page (/category/[slug])
- [x] Category header
- [x] Filtered product grid
- [x] All shop filters applied to category
- [x] Breadcrumbs
- [x] Subcategory filter chips (`?sub=<slug>`, dummy data)

### Search Page (/search)
- [x] Search input with suggestions/autocomplete
- [x] Search results grid
- [x] No results state
- [x] Empty search state
- [x] Loading state

### Product Detail Page (/product/[slug])
- [x] Image gallery
- [x] Video player (if available)
- [x] Product info (name, SKU, price, MRP, discount)
- [x] Size selection
- [x] Color selection
- [x] Variant selection logic
- [x] Stock availability display
- [x] Quantity selector
- [x] Add to cart button
- [x] Buy now button
- [x] Product description
- [x] Fabric details
- [x] Care instructions
- [x] Size guide
- [x] Shipping information
- [x] Return information
- [x] Responsive layout

### Cart Page (/cart)
- [x] Cart item list
- [x] Product image, name, variant
- [x] Quantity controls
- [x] Remove item
- [x] Coupon input
- [x] Price breakdown (subtotal, discount, total)
- [x] Proceed to checkout button
- [x] Empty cart state
- [x] Responsive layout

### Checkout Page (/checkout)
- [x] Address form (Full Name, Email, Phone, Address, Apartment, Area, City, State, Pincode, Country)
- [x] Form validation (Zod)
- [x] Order summary
- [x] Coupon display
- [x] Authentication gate (OTP flow)
- [x] Saved address selection (for logged-in users)
- [x] Responsive layout

### Static Pages
- [x] About page
- [x] Contact page
- [x] Privacy Policy page
- [x] Terms & Conditions page
- [x] Refund Policy page
- [x] Shipping Policy page

### UI Components (Shared)
- [x] Product card component
- [x] Button component
- [x] Input component
- [x] Select component
- [x] Modal/Dialog component
- [x] Toast notification component
- [x] Skeleton loader components
- [x] Badge component
- [x] Breadcrumb component
- [x] Pagination component
- [x] Rating/Stars component
- [x] Price display component (MRP, discount, sale price)
- [x] Image component (with Cloudinary/Next Image)
- [x] Loading spinner
- [x] Empty state component
- [x] Error state component

## Phase 3: Database & Backend

### Database Schema
- [x] User model
- [x] Session model
- [x] Address model
- [x] Category model
- [x] Subcategory model (flat label owned by Category; Product.subcategoryId optional)
- [x] Product model
- [x] ProductVariant model
- [x] ProductImage model
- [x] ProductVideo model
- [x] Cart model
- [x] CartItem model
- [x] Order model
- [x] OrderItem model
- [x] Payment model
- [x] Coupon model
- [x] CouponUsage model
- [x] HomepageHero model
- [x] HomepageCategory model
- [x] HomepageReel model
- [x] Testimonial model
- [x] EmailEvent model
- [x] WhatsAppEvent model
- [x] Add indexes (email, SKU, slug, order number, etc.)
- [x] Add unique constraints
- [x] Run migrations
- [x] Verify schema

### Backend Services
- [x] authService
- [x] productService
- [x] categoryService (incl. inline subcategory create/update/delete in one transaction)
- [x] cartService
- [x] checkoutService
- [x] orderService
- [x] paymentService
- [x] couponService
- [x] inventoryService
- [x] emailService
- [x] whatsappService
- [x] mediaService
- [x] homepageService
- [x] userService
- [x] addressService

### API Routes
- [x] Auth: POST /api/auth/send-otp
- [x] Auth: POST /api/auth/verify-otp
- [x] Auth: POST /api/auth/logout
- [x] Auth: GET /api/auth/session
- [x] Products: GET /api/products
- [x] Products: GET /api/products/[slug]
- [x] Categories: GET /api/categories
- [x] Categories: GET /api/categories/[slug]
- [x] Categories list/detail responses include visible subcategories
- [x] Search: GET /api/search
- [x] Cart: GET /api/cart
- [x] Cart: POST /api/cart/add
- [x] Cart: PUT /api/cart/update
- [x] Cart: DELETE /api/cart/remove
- [x] Cart: POST /api/cart/coupon
- [x] Cart: DELETE /api/cart/coupon
- [x] Checkout: POST /api/checkout
- [ ] Payment: POST /api/payment/create-order *(implemented; verify once Razorpay test keys are in .env)*
- [ ] Payment: POST /api/payment/verify *(implemented; verify once Razorpay test keys are in .env)*
- [x] Payment: POST /api/payment/webhook
- [x] Orders: GET /api/orders
- [x] Orders: GET /api/orders/[id]
- [x] User: GET /api/user/profile
- [x] User: PUT /api/user/profile
- [x] Addresses: GET /api/addresses
- [x] Addresses: POST /api/addresses
- [x] Addresses: PUT /api/addresses/[id]
- [x] Addresses: DELETE /api/addresses/[id]
- [x] Homepage: GET /api/homepage
- [x] Admin: All admin API routes (document each)

## Phase 4: Authentication & OTP
- [x] OTP generation (server-side, secure)
- [x] OTP storage (hashed, with expiration)
- [x] OTP validation
- [x] OTP rate limiting
- [x] OTP attempt limiting
- [x] OTP resend cooldown
- [x] Send OTP via email
- [x] Email verification flow
- [x] Auto-create account from checkout info
- [x] Recognize existing accounts
- [x] Session creation (HTTP-only cookies)
- [x] Session validation middleware
- [x] Session expiration
- [x] Logout
- [x] Protected route middleware
- [x] Admin route middleware

## Phase 5: Cart & Checkout
- [x] Add to cart (with variant)
- [x] Remove from cart
- [x] Update quantity
- [x] Server-side price recalculation
- [x] Stock validation on cart operations
- [x] Coupon application (server-side validation)
- [x] Coupon removal
- [x] Checkout form validation
- [x] Address validation
- [x] Authentication gate at checkout
- [x] Create order from checkout
- [x] Inventory reservation/validation

## Phase 6: Razorpay Payment
- [ ] Razorpay SDK integration *(implemented; verify once Razorpay test keys are in .env)*
- [ ] Create Razorpay order (server-side) *(implemented; verify once Razorpay test keys are in .env)*
- [ ] Open Razorpay checkout modal *(implemented; verify once Razorpay test keys are in .env)*
- [ ] Server-side payment verification (signature) *(implemented; verify once Razorpay test keys are in .env)*
- [x] Webhook endpoint
- [x] Webhook signature verification
- [x] Idempotency protection (no duplicate orders)
- [x] Handle successful payment
- [ ] Handle failed payment *(implemented; verify once Razorpay test keys are in .env)*
- [x] Handle cancelled payment
- [ ] Handle payment mismatch *(implemented; verify once Razorpay test keys are in .env)*
- [x] Transactional inventory deduction on payment success

## Phase 7: Orders & Inventory
- [x] Order creation with immutable snapshots
- [x] Order status workflow (PENDING → PAID → PROCESSING → SHIPPED → DELIVERED → CANCELLED)
- [x] Order listing (user)
- [x] Order detail (user)
- [x] Inventory tracking (variant-level)
- [x] Prevent negative inventory
- [x] Concurrent purchase handling
- [x] Order number generation

## Phase 8: Customer Account
- [x] Login page
- [x] Verify page (OTP input)
- [x] Account layout
- [x] Profile page (view/edit)
- [x] Orders list page
- [x] Order detail page
- [x] Addresses page (CRUD)
- [x] Default address
- [x] Logout functionality

## Phase 9: Admin Panel

### Admin Authentication
- [x] Admin login (email + password; OTP disabled for admin accounts)
- [x] Admin session
- [x] Admin middleware (server-side role check)
- [x] Admin layout (sidebar, header)

### Dashboard
- [x] Total orders metric
- [x] Total revenue metric
- [x] Paid/Pending/Shipped/Delivered order counts
- [x] Customer count
- [x] Product count
- [x] Low-stock alerts
- [x] Recent orders table
- [x] Recent customers table

### Product Management
- [x] Product list (with search, filter, pagination)
- [x] Create product form
- [x] Edit product form
- [x] Delete/archive product
- [x] Image upload (Cloudinary)
- [x] Video upload (Cloudinary)
- [x] Variant management (size, color, SKU, inventory)
- [x] Price/MRP setting
- [x] Category assignment
- [x] Subcategory assignment (dropdown filtered by chosen category; optional; server verifies it belongs to the category)
- [x] Description/fabric/care
- [x] Bestseller/New Arrival flags
- [x] Publish/Unpublish toggle

### Order Management
- [x] Order list (with search, filter, sort)
- [x] Order detail view
- [x] Change order status
- [x] Tracking URL input (mandatory for SHIPPED)
- [x] Tracking URL validation
- [x] Print invoice
- [x] Invoice template (print stylesheet)

### Customer Management
- [x] Customer list (name, email, phone, orders, spending)
- [x] Customer detail view
- [x] Customer order history
- [x] Customer profile info

### Coupon Management
- [x] Coupon list
- [x] Create coupon form
- [x] Edit coupon
- [x] Delete/deactivate coupon
- [x] Coupon fields: code, type, apply-on, usage limit, per-user limit, start/expiry, min cart, max discount, active/inactive

### Category Management
- [x] Category list
- [x] Create category
- [x] Edit category
- [x] Delete category
- [x] Category image upload
- [x] Category slug management
- [x] Add / edit / reorder / hide / delete subcategories inside the category form
- [x] Seed client's category + subcategory list

## Phase 10: Homepage CMS
- [x] Hero management (image, mobile image, heading, subheading, CTAs, visibility)
- [ ] New Arrivals config (auto/manual, count) *(currently manual via the New Arrival / Bestseller flags on each product)*
- [ ] Bestsellers config (auto/manual, count) *(currently manual via the New Arrival / Bestseller flags on each product)*
- [x] Categories display management (image, name, link, order, visibility)
- [x] Reels management (video/image, caption, product association, order, visibility)
- [x] Testimonials management (name, review, rating, image, visibility)
- [x] Homepage API to serve all CMS content

## Phase 11: Coupons
- [x] Coupon model and migration
- [x] Apply coupon API (server-side validation)
- [x] Remove coupon API
- [x] Percentage discount calculation
- [x] Flat discount calculation
- [x] Cart value vs MRP application logic
- [x] Usage tracking
- [x] Per-user usage tracking
- [x] Expiry validation
- [x] Minimum cart value validation
- [x] Maximum discount cap
- [x] Coupon code uniqueness

## Phase 12: Email Automation
- [x] Email service (Google SMTP)
- [x] Email template: OTP/Verification
- [x] Email template: Order Confirmation
- [x] Email template: Shipped (with tracking URL/CTA)
- [x] Email template: Delivered
- [x] EmailEvent tracking in database
- [x] Idempotent email sending (no duplicates)
- [x] Professional branded email design

## Phase 13: WhatsApp Integration
- [x] WhatsAppService abstraction
- [x] sendOTP() method
- [x] sendOrderConfirmation() method
- [x] sendShippingUpdate() method
- [x] sendDeliveryUpdate() method
- [x] sendCustomMessage() method
- [x] Provider configuration via env vars
- [x] Feature flag (WHATSAPP_ENABLED)
- [x] WhatsAppEvent tracking in database
- [x] Graceful fallback when disabled

## Phase 14: Security Hardening
- [x] Server-side authorization on all protected routes
- [x] Role-based access control verification
- [x] Zod validation on all inputs
- [x] Input sanitization
- [x] Secure cookie configuration
- [x] CSRF protection
- [x] Rate limiting (OTP, auth, API) *(in-memory by default; set UPSTASH_REDIS_REST_URL/TOKEN for production)*
- [x] OTP brute-force protection
- [x] HTTP security headers *(next.config.ts)*
- [x] Content Security Policy *(next.config.ts; allows Razorpay, Cloudinary)*
- [x] Secure file upload validation (MIME, size)
- [x] Razorpay signature verification *(code-verified; live check pending Razorpay test keys)*
- [x] Razorpay webhook verification *(bad signature rejected; live check pending Razorpay test keys)*
- [x] Idempotency for payments *(code-verified; live check pending Razorpay test keys)*
- [x] Idempotency for notifications
- [x] Server-side pricing validation
- [x] Server-side coupon validation
- [x] Server-side inventory validation
- [x] Secret protection (no client exposure)

## Phase 15: SEO, Performance & Accessibility

### SEO
- [x] Dynamic metadata (products, categories)
- [x] Open Graph metadata
- [x] Twitter/X metadata
- [ ] Canonical URLs
- [x] Sitemap generation *(src/app/sitemap.ts)*
- [x] robots.txt *(src/app/robots.ts)*
- [x] Product structured data (JSON-LD)
- [ ] Breadcrumb structured data

### Performance
- [ ] Next.js Image optimization
- [ ] Cloudinary transformations
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Server components optimization
- [ ] Font optimization
- [ ] Video optimization
- [ ] Caching strategy
- [ ] Database query optimization
- [ ] Bundle size analysis

### Accessibility
- [ ] Semantic HTML audit
- [ ] Keyboard navigation
- [ ] Focus states
- [ ] ARIA attributes
- [ ] Color contrast
- [ ] Alt text for images
- [ ] Accessible forms
- [ ] Accessible modals/dialogs
- [ ] Screen reader testing

## Phase 16: Testing & Production Audit

### Authentication Tests
- [ ] New email OTP flow
- [ ] Existing email OTP flow
- [ ] Invalid OTP
- [ ] Expired OTP
- [ ] Resend OTP
- [ ] OTP brute force protection
- [x] Logout

### Cart Tests
- [ ] Add to cart
- [x] Remove from cart
- [ ] Quantity update
- [ ] Out-of-stock handling
- [ ] Variant selection

### Coupon Tests
- [ ] Valid coupon application
- [ ] Expired coupon rejection
- [ ] Invalid coupon rejection
- [ ] Usage limit enforcement
- [ ] Minimum cart value check
- [ ] Percentage discount calculation
- [ ] Flat discount calculation

### Payment Tests
- [ ] Successful payment flow
- [ ] Failed payment handling
- [ ] Cancelled payment handling
- [ ] Duplicate webhook handling
- [ ] Invalid webhook rejection
- [ ] Payment amount mismatch

### Order Tests
- [ ] Order creation
- [ ] Confirmation email sent
- [ ] Shipping with tracking URL
- [ ] Shipping email sent
- [ ] Delivery email sent
- [ ] Duplicate notification prevention

### Admin Tests
- [ ] Customer cannot access admin
- [ ] Admin can access admin
- [ ] Unauthorized API rejection
- [ ] Product CRUD operations
- [ ] Customer management view
- [ ] Order management operations
- [ ] Homepage CMS operations

### Edge Case Tests
- [ ] Concurrent purchase of last item
- [ ] Coupon applied while cart changes
- [ ] Product deleted after cart addition
- [ ] Variant unavailable during checkout
- [ ] Payment success + browser disconnect
- [ ] Double webhook processing
- [ ] Page refresh after payment
- [ ] Repeated OTP requests
- [ ] Multiple wrong OTP attempts
- [ ] Ship without tracking URL (must fail)
- [ ] Invalid tracking URL
- [ ] Address modification after order
- [ ] Price change after order creation
- [ ] Coupon expiry during checkout

### Production Readiness
- [ ] All storefront pages functional
- [ ] Responsive design verified (desktop, tablet, mobile)
- [ ] All user flows complete
- [ ] Payment integration verified
- [ ] Email automation verified
- [ ] Admin panel fully functional
- [ ] Security audit passed
- [ ] Performance audit passed
- [ ] SEO audit passed
- [ ] Documentation updated
- [ ] PROJECT_REQUIREMENTS.md current
- [ ] PROJECT_CHECKLIST.md accurate
- [ ] README.md complete
- [ ] .env.example complete
