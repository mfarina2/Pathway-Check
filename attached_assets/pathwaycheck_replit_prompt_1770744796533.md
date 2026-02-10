# PathwayCheck Website - Complete Replit Build Prompt

Build a fully functional, multi-page website for PathwayCheck - a tool that helps high school baseball recruits evaluate playing-time opportunities at college programs.

## Tech Stack
- **Framework**: React with React Router for multi-page navigation
- **Styling**: Tailwind CSS (maintain the dark, baseball-themed aesthetic with gradients)
- **Form Handling**: React Hook Form
- **State Management**: React Context API or local state
- **Deployment**: Replit hosting

## Design Requirements

### Visual Style
- **Color scheme**: Dark navy/charcoal backgrounds with red (#EF4444 or similar) accent color for CTAs
- **Typography**: Modern, clean sans-serif fonts
- **Aesthetic**: Match the current design - atmospheric baseball field backgrounds with subtle overlays
- **Responsive**: Mobile-first design, fully responsive across all devices
- **Imagery**: Use baseball-themed imagery (fields, players, equipment) - you can use Unsplash API or placeholder images

## Site Structure & Pages

### 1. HOME PAGE (`/`)
**Sections:**
- **Hero Section**
  - Main headline: "See Your Playing Time Path, Make Your Best Fit"
  - Subheadline: "Evaluate playing-time opportunities before you commit. PathwayCheck turns roster uncertainty into clear metrics you can use in minutes—not months."
  - Two CTAs: "Check Your Pathway" (primary), "See How It Works" (secondary)
  - Live Preview Card showing sample metrics:
    - Projected Depth Chart: #3-#5
    - Competition Index: High
    - Timeline to First Start: Year 2
  - Stats row: "70% Transfer Due to Poor Fit | 2min To Check Your Pathway | 1 Decision You Won't Regret"

- **The Problem Section**
  - Headline: "Money's Easy to Understand. Fit Feels Like Guessing."
  - Body text about scholarship offers vs. actual playing time clarity
  - Image: Stadium or baseball field
  - Quote: "Money's easy to understand—fit feels like guessing." — Jake Martinez
  - List of issues: Over-recruiting, transfers, injuries/redshirts
  
- **The Solution Section**
  - Headline: "Turn Roster Confusion Into Crystal-Clear Pathway Metrics"
  - Three cards:
    1. **Pathway Snapshot** - Depth chart estimate, timeline to first start, roster volatility
    2. **Competition Index** - Returners vs newcomers, transfer pressure, position crowding
    3. **Verification Questions** - Role clarity, redshirt expectations, development plan checks

- **How It Works Section**
  - Headline: "Three Simple Steps to Clarity"
  - Three numbered steps with icons:
    1. Enter Your Info (position, class year, target schools)
    2. Get Your Metrics (instant pathway snapshot + competition index)
    3. Verify the Plan (use verification questions)
  - Three visual feature cards:
    - "Know Your Competition"
    - "Map Your Timeline"
    - "Ask the Right Questions"

- **CTA Section**
  - "Ready to See Your Real Path?"
  - Large CTA button
  - "Takes under 2 minutes" subtext

- **Success Stories Section**
  - Headline: "Real Players, Real Results"
  - Three testimonial cards with:
    - Player image (baseball action shots)
    - Name, position, class year
    - Quote about their experience
  - Make these REAL or clearly labeled as examples

### 2. PRICING PAGE (`/pricing`)
**Purpose**: Show pricing tiers and value proposition

**Structure:**
- Hero section: "Choose Your Pathway to Clarity"
- Pricing tiers (suggest 3 options):
  
  **Option 1: FREE TIER** (for initial validation)
  - Single school analysis
  - Basic pathway snapshot
  - 5 verification questions
  - CTA: "Try Free"
  
  **Option 2: RECRUIT PLAN** ($29-49 one-time or $9.99/month)
  - Up to 5 schools
  - Full pathway analysis
  - Competition Index
  - Complete verification questions (15+)
  - Email support
  - CTA: "Get Started" (most popular badge)
  
  **Option 3: SERIOUS COMMIT PLAN** ($99 one-time)
  - Unlimited schools
  - Priority analysis
  - School comparison tool
  - 30-min coach call prep session
  - Parent dashboard access
  - CTA: "Go Pro"

- FAQ section specific to pricing
- Money-back guarantee badge
- "Used by 500+ recruits" social proof

### 3. SAMPLE REPORT PAGE (`/sample-report`)
**Purpose**: Show exactly what users get without requiring signup

**Structure:**
- Header: "See What You'll Get - Sample Pathway Analysis"
- Fake recruit profile:
  - Name: "Michael Farina"
  - Position: 1B (First Base)
  - Class: 2026
  - Level: JV/Sophomore
  - Target School: "Florida Gators"

- **Analysis Dashboard:**
  - **Overall Competition Score**: Medium (47/100) - displayed prominently with gauge
  
  - **Key Metrics Cards:**
    - Projected Position: #2 - #4
    - Time to Start: Year 1-2
    - Roster Volatility: Stable
    - Competition Level: Medium
  
  - **School Analysis:**
    - Current roster breakdown at 1B
    - Competition Score: 47/100
    - Position depth: #1-#2
    - Projected start time: Freshman
    - Graduation timeline for players ahead
  
  - **Recommendations Section:**
    - "You're well-positioned for early playing time"
    - "Negotiate for a clear path to starting role"
    - "Always verify roster composition before committing"
    - "Ask about incoming recruits at your position"
  
  - **Verification Questions Section:**
    - 8-10 specific questions numbered:
      1. "How many players are currently ahead of me on the depth chart?"
      2. "What's your development plan for players at my position?"
      3. "How many players at my position are graduating in the next 2 years?"
      4. "What's your typical timeline for freshmen to earn playing time?"
      5. "Are there any incoming transfers or recruits at my position?"
      6. "What would I need to demonstrate to earn a starting spot?"
      7. "How do you handle redshirt decisions?"
      8. "Can I see the current roster breakdown by position and class year?"

- CTA: "Get Your Own Analysis" button
- Note: "This is a sample. Your real analysis will be customized to your position, schools, and profile."

### 4. FAQ PAGE (`/faq`)
**Categories:**

**About PathwayCheck**
- What is PathwayCheck?
- Who created PathwayCheck?
- How accurate are your projections?
- Where do you get roster data?

**Using the Tool**
- How long does it take?
- What information do I need?
- Can I analyze multiple schools?
- What if my school isn't in the database?

**For Recruits**
- When should I use PathwayCheck?
- Should I share this with coaches?
- What if the metrics show I'm "blocked"?
- Can this help me negotiate?

**For Parents**
- Can I access my son's/daughter's analysis?
- Is there a parent dashboard?
- How can I use this during visits?

**Privacy & Data**
- What data do you collect?
- Do you share data with coaches/schools?
- Is my information secure?

**Pricing & Accounts**
- Is there a free trial?
- What payment methods do you accept?
- Can I get a refund?
- Do you offer discounts for multiple users?

### 5. ABOUT PAGE (`/about`)
**Structure:**
- **Mission Section**
  - "Our Mission: Make 'Fit' As Clear As NIL"
  - Story about why PathwayCheck exists
  - The problem with roster uncertainty

- **How It Started**
  - Brief origin story (founder's experience or observation)
  - "We built PathwayCheck because..."

- **Our Approach**
  - Data-driven, transparent, recruit-first
  - Not anti-coach, but pro-clarity

- **Team Section** (if applicable)
  - Photos and bios of founders/team
  - OR "We're a small team of former players, coaches, and data analysts..."

- **Press/Recognition** (if any)
  - Logos or quotes from any media mentions

- **Contact CTA**
  - "Have questions? We're here to help."
  - Link to contact page

### 6. HOW IT WORKS PAGE (`/how-it-works`)
**Detailed walkthrough** (expand on homepage section)

- **Introduction**
  - "From Confused to Confident in Three Simple Steps"

- **Step 1: Enter Your Information**
  - Screenshot/mockup of the form
  - What we ask for and why
  - "Takes less than 2 minutes"

- **Step 2: Get Your Pathway Analysis**
  - Screenshot of results dashboard
  - Explanation of each metric:
    - Projected Depth Chart position
    - Competition Index scoring
    - Timeline to First Start
    - Roster Volatility signals
  - How we calculate these

- **Step 3: Verify With Coaches**
  - How to use verification questions
  - Best practices for coach conversations
  - Red flags to watch for

- **Video Walkthrough Section**
  - Placeholder for future demo video
  - "Watch a 2-minute walkthrough" (can add later)

- **What Makes Us Different**
  - Comparison with just "trusting the coach"
  - Why metrics matter
  - Fast, affordable, actionable

### 7. PATHWAY CHECK TOOL (`/check`)
**The actual interactive tool** - multi-step form

**Step 1: Personal Information**
- First Name*
- Last Name*
- Email Address*
- Continue button

**Step 2: Baseball Profile**
- Primary Position* (dropdown: Pitcher, Catcher, 1B, 2B, 3B, SS, LF, CF, RF, Utility)
- Class Year* (2025, 2026, 2027, 2028)
- Current Level* (Varsity Starter, Varsity Rotation, JV/Sophomore, Elite Travel Ball, Competitive Travel Ball)

**Step 3: Target Schools**
- "Add up to 5 colleges you're interested in"
- School name input field (can be simple text input or autocomplete if you add a school database)
- "+ Add another school" button
- Goals (optional): Text area - "What are your goals for playing college baseball?"
- Back button, "Get My Results" button

**Step 4: Processing/Loading Screen**
- "Analyzing your pathway..."
- Progress indicator or animation
- "Calculating competition index..."
- "Generating verification questions..."

**Step 5: Results Page** (`/results/[unique-id]`)
- Show the full analysis (similar to sample report)
- Personalized to their inputs
- For now, can use mock calculations:
  - Competition Score: Random between 30-70
  - Projected Position: Based on class year
  - Time to Start: Based on position and class
  - Recommendations: Template-based on their inputs
  - Verification Questions: Customized to their position

- "Check Another School" button
- "Download PDF" button (future feature)
- "Email Me These Results" button

### 8. BLOG/RESOURCES PAGE (`/resources`)
**Purpose**: SEO and authority building

**Structure:**
- Hero: "Recruiting Resources for Serious Players"
- Categories:
  - Recruiting Tips
  - Position Guides
  - Questions to Ask
  - Parent Resources

**Sample Article Topics** (create 3-5 simple articles):
1. "10 Questions Every Baseball Recruit Must Ask Before Committing"
2. "Understanding Depth Charts: What Coaches Won't Tell You"
3. "Red Flags: Signs You'll Be Buried on the Bench"
4. "For Parents: How to Support Without Pressuring"
5. "The Truth About Over-Recruiting in College Baseball"

Each article:
- Featured image
- Title, author, date
- 500-800 word content
- Related articles section
- CTA to check pathway

### 9. CONTACT PAGE (`/contact`)
**Structure:**
- Hero: "Get In Touch"
- Contact form:
  - Name
  - Email
  - Subject (dropdown: General Question, Technical Support, Partnership, Press, Other)
  - Message
  - Submit button
  
- Alternative contact methods:
  - Email: support@pathwaycheck.com (can be fake for now)
  - Response time: "We typically respond within 24 hours"

- FAQ section: "Before you reach out, check our FAQ"

## Navigation & Footer

### Header Navigation
- Logo (left)
- Menu items: Home, How It Works, Pricing, Sample Report, Resources, FAQ, About
- "Check Your Pathway" CTA button (right)
- Mobile: Hamburger menu

### Footer
- **Column 1: PathwayCheck**
  - Tagline: "Helping high school baseball recruits evaluate playing-time opportunities and make their best-fit college decision."
  
- **Column 2: Product**
  - The Problem
  - Solution
  - How It Works
  - Pricing

- **Column 3: Resources**
  - Recruiting Guide
  - Questions to Ask
  - FAQ
  - Blog

- **Column 4: Company**
  - About
  - Contact
  - Privacy Policy
  - Terms of Service

- **Bottom Row:**
  - "© 2024 PathwayCheck. All rights reserved."
  - "Built for recruits. Designed for clarity."

## Interactive Features & Functionality

### 1. Form Validation
- All required fields marked with *
- Email validation
- Character limits on text areas
- Error messages that are helpful

### 2. Results Generation
For MVP, use simple logic:
```
Competition Score Calculation:
- Varsity Starter + Year 2026 + Position (non-pitcher) = Score 35-45 (Low-Medium)
- JV/Sophomore + Year 2027 + Pitcher = Score 55-70 (High)
- Etc.

Projected Position:
- Based on class year: 2025 = #1-2, 2026 = #2-4, 2027 = #3-5, 2028 = #4-6

Time to Start:
- 2025 = "Freshman"
- 2026 = "Year 1-2"
- 2027 = "Year 2-3"
- 2028 = "Year 3+"
```

### 3. Smooth Scrolling
- Navigation clicks should smooth scroll to sections on single-page views
- Anchor links work properly

### 4. Loading States
- Show spinners/skeleton screens while "processing"
- Minimum 2-3 second delay on results to feel substantive

### 5. Email Collection
- Store emails in local state/log to console for now
- Can integrate with email service later (Mailchimp, ConvertKit, etc.)

### 6. Save Results
- Generate unique URL for each result (e.g., `/results/8358b09b-35d5-469d-8d8c-212484b5a8f1`)
- Store in localStorage or simple JSON for now
- User can bookmark or share link

## Additional Requirements

### Performance
- Fast page loads (<2 seconds)
- Optimized images
- Lazy loading for below-fold content

### SEO Basics
- Unique page titles and meta descriptions for each page
- Semantic HTML (proper heading hierarchy)
- Alt text on all images

### Accessibility
- Keyboard navigation works
- Proper ARIA labels
- Good color contrast
- Focus states visible

### Mobile Optimization
- Touch-friendly buttons (min 44px)
- Readable font sizes (16px minimum)
- No horizontal scrolling
- Responsive images

## Content Tone & Voice
- **Confident but not cocky**: "We help you see clearly" not "We know everything"
- **Empathetic**: Understand the pressure recruits face
- **Action-oriented**: Use strong verbs, clear CTAs
- **Honest**: Don't oversell - acknowledge limitations
- **Conversational**: Write like talking to a friend, not a sales pitch

## Placeholder Content Notes
- Use "Lorem ipsum" sparingly - write real content
- For testimonials: Either use fake names with disclaimers OR wait for real ones
- For stats (70% transfer rate): Add "[source needed]" note or remove
- For images: Use Unsplash baseball photos or clear placeholders

## File Structure Suggestion
```
/src
  /components
    - Header.jsx
    - Footer.jsx
    - Hero.jsx
    - PricingCard.jsx
    - TestimonialCard.jsx
    - FeatureCard.jsx
    - StepCard.jsx
    - ProgressBar.jsx
    - Button.jsx
    - Input.jsx
  /pages
    - Home.jsx
    - Pricing.jsx
    - SampleReport.jsx
    - FAQ.jsx
    - About.jsx
    - HowItWorks.jsx
    - PathwayCheck.jsx
    - Results.jsx
    - Resources.jsx
    - BlogPost.jsx
    - Contact.jsx
  /utils
    - calculateMetrics.js
    - generateQuestions.js
  /data
    - faqData.js
    - pricingData.js
    - testimonialsData.js
    - positionsData.js
  App.jsx
  main.jsx
```

## Priority Order for Building
1. **Phase 1**: Home page + navigation + footer (get the foundation right)
2. **Phase 2**: Pathway Check tool (the core functionality)
3. **Phase 3**: Sample Report + Results page (show the value)
4. **Phase 4**: Pricing, FAQ, How It Works (support pages)
5. **Phase 5**: About, Resources, Contact (credibility & SEO)

## Testing Checklist
- [ ] All links work
- [ ] Forms submit properly
- [ ] Mobile responsive on all pages
- [ ] Images load correctly
- [ ] No console errors
- [ ] Results generate with different inputs
- [ ] Navigation highlights active page
- [ ] CTAs are prominent and clickable
- [ ] Loading states work
- [ ] Error messages display

---

## Final Notes for Replit Agent:

**IMPORTANT**: 
- Create a REAL, functional website - not just static mockups
- All pages should be accessible via routing
- Forms should work and provide feedback
- The tool should generate actual (even if mock) results
- Make it look professional and polished
- Use the existing design aesthetic from the screenshots
- Prioritize user experience and clarity
- Make CTAs prominent and action-oriented

**When in doubt**: Keep it simple, functional, and focused on the core value proposition - helping recruits understand their playing-time pathway before they commit.

Build this as a production-ready MVP that could actually launch and acquire users.
