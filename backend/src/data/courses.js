const COURSES = [
  // ============================================================
  // MAIN COURSE — Affiliate Marketing Mastery
  // ============================================================
  {
    id: 'affiliate-marketing-mastery',
    slug: 'affiliate-marketing-mastery',
    title: 'Affiliate Marketing Mastery: A Complete Beginner-to-Earner Course',
    description:
      'A complete, practical roadmap for Nigerians who want to earn in dollars by promoting other people\'s products online — from picking a profitable niche to landing your first sale and scaling to consistent monthly income.',
    skillIds: [],
    category: 'Affiliate Marketing & Passive Income',
    estimatedHours: 18,
    modules: [
      {
        id: 'amm-m1',
        title: 'Module 1: Introduction to Affiliate Marketing',
        lessons: [
          {
            id: 'amm-m1-l1',
            title: 'What Is Affiliate Marketing?',
            content: [
              'Affiliate marketing is the business of recommending other people\'s products and earning a commission every time someone buys through your unique link. You don\'t need to create a product, manage inventory, handle customer complaints, or worry about delivery — your only job is to connect the right buyer with the right offer. This makes it one of the lowest-risk ways for a Nigerian with a smartphone and internet access to start earning in dollars, because the heavy lifting (product creation, payment processing, fulfillment) is already done by someone else.',
              'Here is how it works in six simple steps: you join an affiliate program, you get a unique tracking link for a product, you share that link with people who might be interested, an interested person clicks your link and visits the seller\'s page, that person buys the product, and the tracking system credits you with a commission — usually paid out weekly or monthly. The entire cycle runs on tracking cookies and unique codes baked into your link, so the seller always knows a sale came from you, even if the buyer takes a few days to make up their mind.',
              'Consider a real example: if a digital course sells for $100 and the commission rate is 40%, you earn $40 every single time your link leads to a sale — with zero product creation, no customer support, and no shipping. Promote that same link to ten different interested buyers across a month and you have earned $400, working only from your phone or laptop. As your first assignment, write down three products or types of products you already use, love, or believe in — because the strongest affiliate businesses start from genuine enthusiasm, not random product-hunting.',
            ],
            keyTakeaways: [
              'Affiliate marketing means earning a commission for sending buyers to someone else\'s product — no product creation, inventory, or delivery required.',
              'The core cycle is: join a program → get your link → share it → someone buys → you get paid.',
              'A $100 product at 40% commission pays you $40 per sale — commissions scale directly with how many genuine buyers you can connect to the offer.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m1-quiz',
          questions: [
            {
              id: 'amm-m1-q1',
              question: 'What is the affiliate marketer\'s main responsibility in the affiliate model?',
              options: [
                'Manufacturing the product',
                'Connecting interested buyers to the seller\'s product using a tracking link',
                'Handling customer refunds personally',
                'Shipping physical goods to customers',
              ],
              correctIndex: 1,
              explanation: 'Affiliates earn by referring buyers through a tracked link — product creation, fulfillment, and support stay with the seller.',
            },
            {
              id: 'amm-m1-q2',
              question: 'On a $100 product with a 40% commission, how much does the affiliate earn per sale?',
              options: ['$10', '$40', '$60', '$100'],
              correctIndex: 1,
              explanation: '40% of $100 is $40 — commissions are calculated as a percentage of the sale price.',
            },
            {
              id: 'amm-m1-q3',
              question: 'Why does a tracking link matter in affiliate marketing?',
              options: [
                'It makes the product page load faster',
                'It proves the sale came from your referral so you get credited the commission',
                'It is only used for decoration',
                'It replaces the need for a seller',
              ],
              correctIndex: 1,
              explanation: 'The unique link/cookie is what credits a sale to the correct affiliate, even if the buyer purchases days after clicking.',
            },
          ],
        },
      },
      {
        id: 'amm-m2',
        title: 'Module 2: Choosing a Profitable Niche',
        lessons: [
          {
            id: 'amm-m2-l1',
            title: 'The Three Rules of Niche Selection',
            content: [
              'A niche is the specific topic or audience you choose to focus on, and getting this choice right is the single biggest factor in how fast you start earning. The first rule is that your niche must solve a real problem — people open their wallets for solutions to pain, not for things that are merely "nice to know." The second rule is that it must have paying customers already; if nobody in that space is currently spending money, you will struggle to convince them to start with you. The third rule is that it should match your own interest or experience, because affiliate marketing requires months of consistent content, and you cannot fake enthusiasm for a topic you find boring forever.',
              'Profitable niches that consistently work well for Nigerian beginners include: making money online and side hustles, health and fitness, personal finance and saving/investing, software and productivity tools, relationships and self-improvement, and beauty and skincare. Each of these has hungry buyers, established affiliate programs, and a steady stream of content ideas you can create without running out of material. Notice that all of them sit at the intersection of "people actively searching for solutions" and "products already exist to solve it."',
              'For your assignment, pick one niche from the list above (or a close variant) and write down five questions your ideal audience in that niche is likely asking online right now — for example, someone in personal finance might be asking "how do I start saving in dollars from Nigeria?" These questions will become your first batch of content ideas in later modules, so be specific and think like the person you are trying to help, not like a marketer.',
            ],
            keyTakeaways: [
              'A strong niche solves a real problem, already has paying customers, and genuinely interests you.',
              'Proven beginner-friendly niches include making money online, health/fitness, personal finance, software tools, self-improvement, and beauty.',
              'Writing down your audience\'s real questions turns niche selection into a ready-made content plan.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m2-quiz',
          questions: [
            {
              id: 'amm-m2-q1',
              question: 'Which of the following is NOT one of the three rules of niche selection in this lesson?',
              options: [
                'The niche solves a real problem',
                'The niche already has paying customers',
                'The niche matches your own interest',
                'The niche must be unrelated to anything you know',
              ],
              correctIndex: 3,
              explanation: 'The lesson recommends choosing a niche that matches your interest or experience, not one unrelated to it.',
            },
            {
              id: 'amm-m2-q2',
              question: 'Why is it important that a niche already has paying customers?',
              options: [
                'It proves people in that space are willing to spend money on solutions',
                'It guarantees you will become famous',
                'It means there is no competition at all',
                'It has no real importance',
              ],
              correctIndex: 0,
              explanation: 'Existing buyers prove demand — if nobody is currently spending money in a space, convincing them to start is much harder.',
            },
            {
              id: 'amm-m2-q3',
              question: 'What is the purpose of writing down five questions your audience is asking?',
              options: [
                'To memorize them for a quiz',
                'To turn them into your first batch of content ideas',
                'To send them to competitors',
                'They serve no real purpose',
              ],
              correctIndex: 1,
              explanation: 'Audience questions map directly to content topics you will create in later modules.',
            },
          ],
        },
      },
      {
        id: 'amm-m3',
        title: 'Module 3: Finding Affiliate Programs',
        lessons: [
          {
            id: 'amm-m3-l1',
            title: 'Where to Find Products',
            content: [
              'Once you have a niche, the next step is finding products you can actually promote for commission. Global affiliate networks such as ClickBank, Digistore24, Impact, and PartnerStack host thousands of digital and physical products across nearly every niche, and they handle tracking, payment, and reporting for you — you simply sign up, get approved, and start grabbing links. These networks are especially valuable for Nigerians because many of them pay out internationally via methods like Payoneer or direct bank transfer, making it realistic to receive your commissions even outside the US or UK.',
              'Beyond the big networks, many individual software companies run their own affiliate programs directly — for example, design tool Canva and SEO tool Semrush both run well-known affiliate programs that pay recurring or one-time commissions for every paid subscriber you refer. When evaluating any program, look for four things: a commission rate that rewards your effort (ideally 20% or higher), a track record of paying affiliates on time, a product people genuinely want and would thank you for recommending, and marketing materials (banners, swipe copy, demo videos) that make your job easier.',
              'As your assignment, sign up for one affiliate network and one software affiliate program this week, get approved, and bookmark three specific products inside your chosen niche that meet the four-point checklist above. Read each product\'s sales page carefully before you promote it — you cannot convincingly recommend something you have not actually understood.',
            ],
            keyTakeaways: [
              'Affiliate networks like ClickBank, Digistore24, Impact, and PartnerStack aggregate thousands of products and handle tracking and payouts for you.',
              'Individual software programs (e.g., Canva, Semrush) often run their own direct affiliate programs with strong recurring commissions.',
              'Evaluate any offer on commission rate, payment reliability, product quality, and the marketing materials provided.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m3-quiz',
          questions: [
            {
              id: 'amm-m3-q1',
              question: 'What service do affiliate networks like ClickBank and Impact provide to affiliates?',
              options: [
                'They manufacture products for you',
                'They aggregate products, handle tracking, and process commission payouts',
                'They guarantee you will get rich in one week',
                'They write all your content for you',
              ],
              correctIndex: 1,
              explanation: 'Affiliate networks centralize many products and handle tracking/payment infrastructure so affiliates do not have to build it themselves.',
            },
            {
              id: 'amm-m3-q2',
              question: 'Which of these is an example of a software company running its own direct affiliate program?',
              options: ['A local restaurant', 'Canva', 'A government office', 'A personal blog with no products'],
              correctIndex: 1,
              explanation: 'Canva (and similarly Semrush) runs a direct affiliate program for its own paid subscriptions.',
            },
            {
              id: 'amm-m3-q3',
              question: 'Which of the following is part of the four-point checklist for evaluating an affiliate offer?',
              options: [
                'The product must be free to the buyer',
                'A commission rate that rewards your effort',
                'The seller must be based in Nigeria',
                'The product must have no sales page',
              ],
              correctIndex: 1,
              explanation: 'The checklist includes commission rate, payout reliability, product quality, and available marketing materials.',
            },
          ],
        },
      },
      {
        id: 'amm-m4',
        title: 'Module 4: Understanding Buyer Psychology',
        lessons: [
          {
            id: 'amm-m4-l1',
            title: 'Why People Buy',
            content: [
              'People rarely buy because of features — they buy because of desires. The deepest buying triggers are the wish to save time, the wish to save or make money, the wish to look good or be respected, the wish to feel secure, and the wish to belong to a group. When you understand which of these desires your product satisfies, you stop describing specifications and start speaking directly to what your audience actually wants, which is the difference between content that gets ignored and content that gets clicked.',
              'A simple, time-tested formula for structuring persuasive content is AIDA: capture Attention with a bold statement or question, build Interest by describing the problem in a way your audience recognizes immediately, create Desire by painting a vivid picture of life after the problem is solved, and prompt Action with a clear, low-friction next step — usually your affiliate link. Every piece of content you create from here forward, whether it is a video script, a social post, or an email, should pass through this four-step filter before you publish it.',
              'For your assignment, take one product you plan to promote and write a short paragraph for each AIDA stage: one attention-grabbing opening line, one sentence naming the problem, one sentence describing the desired outcome, and one direct call to action with your link. This single exercise will sharpen every piece of promotional content you create for the rest of this course.',
            ],
            keyTakeaways: [
              'Buyers act on deep desires — time, money, status, security, belonging — not on technical features.',
              'The AIDA formula (Attention, Interest, Desire, Action) structures content so it persuades rather than just informs.',
              'Every promotional piece should be checked against the four AIDA stages before publishing.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m4-quiz',
          questions: [
            {
              id: 'amm-m4-q1',
              question: 'According to this lesson, what primarily drives people to buy?',
              options: [
                'Technical specifications',
                'Deep desires like saving time, money, status, security, or belonging',
                'The color of the product packaging',
                'Random chance',
              ],
              correctIndex: 1,
              explanation: 'Buying decisions are driven by underlying desires, not feature lists.',
            },
            {
              id: 'amm-m4-q2',
              question: 'What does the "D" in the AIDA formula stand for?',
              options: ['Discount', 'Desire', 'Delivery', 'Data'],
              correctIndex: 1,
              explanation: 'AIDA stands for Attention, Interest, Desire, Action.',
            },
            {
              id: 'amm-m4-q3',
              question: 'What should the final "Action" stage of AIDA content always include?',
              options: [
                'A vague suggestion with no link',
                'A clear, low-friction next step such as your affiliate link',
                'A request for the reader\'s personal data',
                'Nothing — Action is optional',
              ],
              correctIndex: 1,
              explanation: 'The Action stage should give the reader an immediate, simple next step, typically your affiliate link.',
            },
          ],
        },
      },
      {
        id: 'amm-m5',
        title: 'Module 5: Building Your Affiliate Platform',
        lessons: [
          {
            id: 'amm-m5-l1',
            title: 'Create Your Online Presence',
            content: [
              'Before you can promote consistently, you need a home base — a platform where your audience can find and trust you. Option A is a website built with WordPress and a page builder like Elementor, which gives you full control, looks professional, and ranks on Google over time, though it takes the longest to set up. Option B is building directly on social media — TikTok, Facebook, Instagram, or YouTube — which is faster to start and lets you reach an audience immediately without any technical setup, though you depend on the platform\'s algorithm rather than owning your audience outright.',
              'Option C is a simple blog, which sits between the two: easier to launch than a full website, but still giving you owned, searchable content that keeps working for you months after you publish it. Many successful affiliates eventually combine platforms — for example, posting daily on TikTok or Instagram to build an audience quickly (Option B), while slowly building a blog or website (Option A or C) as a long-term, searchable asset that doesn\'t disappear if a social account gets restricted.',
              'For your assignment, choose one primary platform to launch on this week based on your comfort level and resources, and set it up completely: a defined niche-relevant name, a clear bio explaining who you help and how, and your affiliate links wherever the platform allows them (link-in-bio tools work well for social platforms that don\'t allow clickable links in posts).',
            ],
            keyTakeaways: [
              'A website (Option A) gives long-term control and search visibility but takes longer to build.',
              'Social media (Option B) gets you in front of an audience fastest but you don\'t own that audience.',
              'A blog (Option C) is a middle ground — relatively quick to launch while still being a lasting, searchable asset.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m5-quiz',
          questions: [
            {
              id: 'amm-m5-q1',
              question: 'What is the main advantage of building a website with WordPress and Elementor (Option A)?',
              options: [
                'It is the fastest option to launch',
                'It gives full control and long-term search visibility',
                'It requires no niche selection',
                'It guarantees viral content',
              ],
              correctIndex: 1,
              explanation: 'Websites take longer to set up but offer full control and compound search traffic over time.',
            },
            {
              id: 'amm-m5-q2',
              question: 'What is the main trade-off of building primarily on social media platforms (Option B)?',
              options: [
                'You cannot reach an audience quickly',
                'You depend on the platform\'s algorithm rather than owning your audience',
                'It costs more money than a website',
                'There is no trade-off at all',
              ],
              correctIndex: 1,
              explanation: 'Social platforms offer fast reach, but your presence depends on an algorithm and platform rules you don\'t control.',
            },
            {
              id: 'amm-m5-q3',
              question: 'Why might a successful affiliate combine social media with a blog or website?',
              options: [
                'To confuse their audience',
                'To get fast reach from social media while building a lasting, owned asset with a blog/website',
                'Because affiliate programs require it',
                'There is no strategic reason to combine them',
              ],
              correctIndex: 1,
              explanation: 'Combining fast-reach social platforms with an owned blog/website balances speed with long-term stability.',
            },
          ],
        },
      },
      {
        id: 'amm-m6',
        title: 'Module 6: Content Creation',
        lessons: [
          {
            id: 'amm-m6-l1',
            title: 'Content That Sells',
            content: [
              'Not all content converts equally — some formats are built specifically to move a viewer from curiosity to purchase. The four content types that consistently sell are educational content that teaches something useful while naturally mentioning the product, honest reviews that walk through real pros and cons, tutorials that show step-by-step how to use the product to get a specific result, and comparisons that help an undecided buyer choose between two or three options (with your recommended pick, of course, including your link).',
              'Regardless of which content type you choose, a reliable structure to follow is Problem, Solution, Proof, Call-to-Action: open by naming the exact problem your audience feels, introduce the product as the solution, back it up with proof (a screenshot, a result, a testimonial, or your own experience), and close with a direct call to action pointing to your link. This structure works whether you are writing a caption, scripting a video, or drafting an email.',
              'For your assignment, create one piece of content this week using the Problem-Solution-Proof-Call-to-Action structure, choosing whichever of the four content types (educational, review, tutorial, or comparison) feels most natural to you. Publish it on the platform you set up in the previous module, and pay attention to which type of content gets the most engagement — that data will guide what you create next.',
            ],
            keyTakeaways: [
              'Educational content, honest reviews, tutorials, and comparisons are the four content types most likely to drive affiliate sales.',
              'The Problem-Solution-Proof-Call-to-Action structure works across captions, videos, and emails alike.',
              'Publishing and tracking engagement on your first content piece tells you what to create more of.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m6-quiz',
          questions: [
            {
              id: 'amm-m6-q1',
              question: 'Which of the following is one of the four content types described as consistently driving sales?',
              options: ['Random unrelated memes', 'Honest product reviews', 'Empty motivational quotes only', 'Content with no mention of the product'],
              correctIndex: 1,
              explanation: 'Educational content, reviews, tutorials, and comparisons are the four highlighted content types.',
            },
            {
              id: 'amm-m6-q2',
              question: 'What does the "Proof" step in the Problem-Solution-Proof-Call-to-Action structure involve?',
              options: [
                'Ignoring whether the product actually works',
                'Backing up the solution with a screenshot, result, testimonial, or personal experience',
                'Repeating the problem statement again',
                'Skipping straight to the call to action',
              ],
              correctIndex: 1,
              explanation: 'Proof builds credibility by showing real evidence the solution works, before asking for action.',
            },
            {
              id: 'amm-m6-q3',
              question: 'Why is it useful to track engagement on your first published content piece?',
              options: [
                'It has no real use',
                'It tells you which content type to create more of going forward',
                'It is required by the affiliate network',
                'It guarantees an instant sale',
              ],
              correctIndex: 1,
              explanation: 'Engagement data is feedback that should guide your future content choices.',
            },
          ],
        },
      },
      {
        id: 'amm-m7',
        title: 'Module 7: Free Traffic Strategies',
        lessons: [
          {
            id: 'amm-m7-l1',
            title: 'Getting Visitors Without Ads',
            content: [
              'You do not need an advertising budget to get your first sales — free, organic traffic sources can carry a beginner a long way. Short-form video platforms like TikTok, Facebook Reels, and YouTube Shorts reward consistent posting with free reach, often putting a brand-new account in front of thousands of strangers within days if the content is genuinely useful or entertaining. Pinterest works differently but powerfully: pins behave more like searchable images that can keep sending traffic to your links for months or years after you post them, making it ideal for evergreen niches like beauty, finance, and self-improvement.',
              'SEO blogging is the slowest of these strategies to show results, often taking two to three months before Google sends meaningful traffic, but it compounds the longest — a well-optimized blog post can keep generating free visitors and sales for years with no extra effort. The realistic approach for a beginner is to pick one fast-traffic channel (short-form video or Pinterest) to generate sales sooner, while simultaneously publishing slower SEO content in the background as a long-term asset.',
              'For your assignment, choose one free traffic channel from this lesson and commit to a fixed, sustainable posting schedule — for example, three short videos a week, or two blog posts a month — and stick to it for the next 30 days without skipping. Consistency beats intensity in free traffic; five mediocre posts a week for a month will usually outperform one "perfect" post that took all month to make.',
            ],
            keyTakeaways: [
              'Short-form video (TikTok, Reels, Shorts) can deliver fast, free reach for new accounts that post consistently.',
              'Pinterest and SEO blogging act as slower-building but longer-lasting traffic sources that keep working for months or years.',
              'A realistic beginner strategy combines one fast-traffic channel with one slow, compounding channel, run on a fixed consistent schedule.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m7-quiz',
          questions: [
            {
              id: 'amm-m7-q1',
              question: 'Which traffic source is described as the slowest to show results but longest-lasting?',
              options: ['Short-form video', 'SEO blogging', 'Paid ads', 'None of these'],
              correctIndex: 1,
              explanation: 'SEO blogging often takes two to three months to gain traction but compounds for years afterward.',
            },
            {
              id: 'amm-m7-q2',
              question: 'What makes Pinterest different from typical social platforms for traffic purposes?',
              options: [
                'Pins disappear after 24 hours',
                'Pins behave like searchable images that can keep sending traffic long after posting',
                'Pinterest only works for businesses outside Nigeria',
                'Pinterest cannot link to external sites',
              ],
              correctIndex: 1,
              explanation: 'Pinterest pins function more like evergreen search results than time-limited social posts.',
            },
            {
              id: 'amm-m7-q3',
              question: 'What is the recommended beginner strategy for free traffic according to this lesson?',
              options: [
                'Only use one perfect post per month',
                'Combine one fast-traffic channel with one slow, compounding channel on a consistent schedule',
                'Avoid all video content entirely',
                'Wait until you have a budget before starting',
              ],
              correctIndex: 1,
              explanation: 'Pairing a fast channel with a slow, compounding channel — run consistently — balances quick wins with long-term growth.',
            },
          ],
        },
      },
      {
        id: 'amm-m8',
        title: 'Module 8: Email Marketing',
        lessons: [
          {
            id: 'amm-m8-l1',
            title: 'Building an Asset',
            content: [
              'Social media followers and blog visitors can vanish overnight if an algorithm changes or a platform goes down — but an email list is an asset you own outright, one that no algorithm can take from you. Tools like MailerLite and Brevo offer generous free tiers that let you collect email addresses and send automated sequences without any upfront cost, making email marketing genuinely accessible even on a zero-naira budget.',
              'The proven funnel structure is: offer a free gift (a checklist, mini-guide, or short training related to your niche) in exchange for an email address, which builds your email list; then send a short series of value emails that teach, build trust, and demonstrate your expertise; and only after trust is established, introduce the affiliate offer naturally as the logical next step for someone who has already gotten value from you for free. Promoting a paid offer too early, before any trust is built, is one of the most common reasons beginners get ignored.',
              'For your assignment, create one simple free gift related to your niche, set up a free MailerLite or Brevo account, and build a three-email welcome sequence: email one delivers the free gift, email two teaches one useful tip with no pitch, and email three introduces your affiliate recommendation as the natural next step. This is the email funnel that will run quietly in the background for the rest of your affiliate career.',
            ],
            keyTakeaways: [
              'An email list is an owned asset that survives algorithm changes and platform restrictions — unlike followers.',
              'Free tools like MailerLite and Brevo make list-building accessible at zero cost.',
              'The Free Gift → Email List → Value Emails → Affiliate Offer funnel builds trust before ever pitching.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m8-quiz',
          questions: [
            {
              id: 'amm-m8-q1',
              question: 'Why is an email list considered a more durable asset than social media followers?',
              options: [
                'Email lists are illegal to lose',
                'An email list is owned by you and cannot be taken away by an algorithm change',
                'Social media followers are always more valuable',
                'There is no real difference',
              ],
              correctIndex: 1,
              explanation: 'Unlike platform-dependent followers, an email list is directly owned and controlled by the marketer.',
            },
            {
              id: 'amm-m8-q2',
              question: 'In the funnel from this lesson, what comes immediately after someone receives the free gift?',
              options: [
                'An immediate hard sales pitch',
                'A short series of value emails that build trust',
                'Nothing — the funnel ends there',
                'A request for payment',
              ],
              correctIndex: 1,
              explanation: 'Value emails build trust before any affiliate offer is introduced.',
            },
            {
              id: 'amm-m8-q3',
              question: 'What is a common mistake beginners make with email funnels, according to this lesson?',
              options: [
                'Sending too many free gifts',
                'Pitching the paid offer too early, before any trust is built',
                'Using a free tool like MailerLite',
                'Writing emails that are too short',
              ],
              correctIndex: 1,
              explanation: 'Pitching before trust is established is a leading reason beginner email funnels underperform.',
            },
          ],
        },
      },
      {
        id: 'amm-m9',
        title: 'Module 9: Landing Pages',
        lessons: [
          {
            id: 'amm-m9-l1',
            title: 'Converting Visitors',
            content: [
              'A landing page is a focused, single-purpose page designed to do one thing: convert a visitor into a lead or a sale, with none of the distractions of a normal website (no menu, no unrelated links, no exit routes other than your call to action). For affiliate marketing, a simple landing page placed between your content and the seller\'s page can dramatically increase conversions, because it warms the visitor up and pre-sells the offer before they ever reach the seller\'s checkout.',
              'The reliable structure for a high-converting landing page is: a Headline that states the core benefit in one line, a Problem statement that mirrors exactly what your visitor is feeling, a Solution that introduces the product as the answer, a list of Benefits (not just features) that make the outcome vivid, and a single, unmistakable Call-to-Action button. For example, a headline like "Finally Save in Dollars From Nigeria — Without Needing a Foreign Bank Account" immediately signals the exact benefit a specific audience is searching for.',
              'For your assignment, build one simple landing page (free tools exist for this — many website and email platforms include a landing page builder in their free tier) for the product you have been promoting throughout this course, following the Headline-Problem-Solution-Benefits-Call-to-Action structure exactly. Send your next batch of content traffic to this landing page instead of directly to the seller\'s page, and compare your results.',
            ],
            keyTakeaways: [
              'A landing page is a single-purpose, distraction-free page built to convert, not to inform broadly.',
              'The Headline-Problem-Solution-Benefits-Call-to-Action structure is the reliable backbone of a converting landing page.',
              'Pre-selling through your own landing page before sending traffic to the seller typically increases conversion rates.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m9-quiz',
          questions: [
            {
              id: 'amm-m9-q1',
              question: 'What is the defining feature of a landing page compared to a normal website page?',
              options: [
                'It has a full navigation menu',
                'It is a focused, single-purpose page designed for one conversion goal',
                'It must contain no text at all',
                'It always sells multiple products at once',
              ],
              correctIndex: 1,
              explanation: 'Landing pages strip away distractions to focus entirely on one conversion action.',
            },
            {
              id: 'amm-m9-q2',
              question: 'In the landing page structure taught, what should follow the Problem statement?',
              options: ['Another unrelated problem', 'The Solution, introducing the product as the answer', 'A request for a five-star review', 'Nothing — the page should end there'],
              correctIndex: 1,
              explanation: 'The structure flows Headline → Problem → Solution → Benefits → Call-to-Action.',
            },
            {
              id: 'amm-m9-q3',
              question: 'Why might sending traffic to your own landing page (instead of directly to the seller) improve conversions?',
              options: [
                'It removes the affiliate link entirely',
                'It pre-sells and warms up the visitor before they reach checkout',
                'It always costs more money',
                'It has no effect on conversions',
              ],
              correctIndex: 1,
              explanation: 'A landing page warms up cold traffic, increasing the odds they convert once they reach the seller\'s page.',
            },
          ],
        },
      },
      {
        id: 'amm-m10',
        title: 'Module 10: Social Media Affiliate Selling',
        lessons: [
          {
            id: 'amm-m10-l1',
            title: 'Content-to-Commission Framework',
            content: [
              'Selling consistently on social media is rarely about one viral post — it is about a repeatable daily rhythm that keeps you visible without feeling like constant advertising. A dependable daily formula is: one educational post that teaches your audience something useful, one story (on whichever platform supports it) that feels personal and behind-the-scenes, one testimonial or proof post showing a result (yours or someone else\'s), and one direct call to action pointing followers toward your link.',
              'This 1-1-1-1 rhythm matters because audiences tune out accounts that only ever sell — mixing genuine value, personality, and proof in between your offers keeps people engaged and trusting, so that when the call-to-action post does appear, it lands on a warm, receptive audience instead of one that has learned to scroll past you.',
              'For your assignment, run this exact daily formula for one full week: one educational post, one personal story, one testimonial/proof post, and one call-to-action post, each day. At the end of the week, review which of the four post types generated the most clicks on your affiliate link, and double down on that format going forward.',
            ],
            keyTakeaways: [
              'A repeatable daily rhythm beats chasing a single viral post for consistent affiliate sales.',
              'The 1 Educational + 1 Story + 1 Testimonial + 1 Call-to-Action formula balances value with selling.',
              'Reviewing which post type drives the most clicks tells you where to focus your future content energy.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m10-quiz',
          questions: [
            {
              id: 'amm-m10-q1',
              question: 'What four post types make up the daily formula in this lesson?',
              options: [
                'Educational, Story, Testimonial, Call-to-Action',
                'Only Call-to-Action posts, repeated four times',
                'Memes, ads, reposts, and giveaways',
                'News, weather, sports, and entertainment',
              ],
              correctIndex: 0,
              explanation: 'The 1-1-1-1 formula is one Educational post, one Story, one Testimonial/proof post, and one Call-to-Action.',
            },
            {
              id: 'amm-m10-q2',
              question: 'Why does mixing value and proof posts with sales posts matter?',
              options: [
                'It has no effect on the audience',
                'It keeps the audience engaged and trusting, so call-to-action posts land better',
                'It is required by every social platform\'s rules',
                'It guarantees every post goes viral',
              ],
              correctIndex: 1,
              explanation: 'Audiences disengage from accounts that only sell; mixing in value and proof keeps trust high.',
            },
            {
              id: 'amm-m10-q3',
              question: 'What should you do at the end of a week running the daily formula?',
              options: [
                'Stop posting entirely',
                'Review which post type drove the most clicks and double down on it',
                'Delete all four post types',
                'Switch niches immediately',
              ],
              correctIndex: 1,
              explanation: 'Reviewing performance by post type tells you where to focus future content effort.',
            },
          ],
        },
      },
      {
        id: 'amm-m11',
        title: 'Module 11: Paid Advertising',
        lessons: [
          {
            id: 'amm-m11-l1',
            title: 'Scaling Faster',
            content: [
              'Once you have proven that your content and offer can generate organic sales, paid advertising on platforms like Facebook, TikTok, or Google Ads lets you scale that proven formula faster by putting it in front of far more people than organic reach alone ever could. The key word is "proven" — paid ads amplify what is already working; they rarely fix an offer or message that wasn\'t converting organically in the first place.',
              'Four metrics matter when you run paid ads: CTR (click-through rate, the percentage of viewers who click your ad), CPC (cost per click, how much each click costs you), CPA (cost per acquisition, how much you spend to get one sale or lead), and ROAS (return on ad spend, how much revenue you make back for every dollar spent). A campaign with a high CTR but a low ROAS usually means the ad is interesting but the landing page or offer isn\'t converting — so always read these numbers together, never in isolation.',
              'For your assignment, before spending a single naira or dollar on ads, write down the organic post or piece of content that has generated your best results so far, and identify exactly why it worked (the hook, the proof, the offer). Only once you can articulate that reason clearly should you consider turning that same proven content into your very first small-budget paid ad test.',
            ],
            keyTakeaways: [
              'Paid ads scale a formula that is already proven to convert organically — they rarely save a weak offer or message.',
              'CTR, CPC, CPA, and ROAS must be read together to understand whether a campaign is truly working.',
              'Identify and articulate why your best organic content worked before turning it into a paid ad.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m11-quiz',
          questions: [
            {
              id: 'amm-m11-q1',
              question: 'What is the primary role of paid advertising according to this lesson?',
              options: [
                'To fix an offer that was never converting organically',
                'To scale a formula that has already proven to convert organically',
                'To replace the need for any content at all',
                'To guarantee profit regardless of the offer',
              ],
              correctIndex: 1,
              explanation: 'Paid ads amplify what already works; they rarely rescue an unproven or poorly converting offer.',
            },
            {
              id: 'amm-m11-q2',
              question: 'What does ROAS measure?',
              options: [
                'The number of likes an ad receives',
                'How much revenue is generated for every dollar spent on ads',
                'The total follower count of an account',
                'How many people unfollowed after seeing the ad',
              ],
              correctIndex: 1,
              explanation: 'ROAS (return on ad spend) measures revenue generated per dollar of ad spend.',
            },
            {
              id: 'amm-m11-q3',
              question: 'A campaign shows a high CTR but low ROAS. What does this combination usually suggest?',
              options: [
                'The campaign is performing perfectly',
                'The ad is interesting but the landing page or offer isn\'t converting',
                'The ad has no viewers at all',
                'CTR and ROAS are unrelated metrics',
              ],
              correctIndex: 1,
              explanation: 'High clicks with low return points to a conversion problem downstream of the ad itself.',
            },
          ],
        },
      },
      {
        id: 'amm-m12',
        title: 'Module 12: Analytics and Optimization',
        lessons: [
          {
            id: 'amm-m12-l1',
            title: 'Track Everything',
            content: [
              'What gets measured gets improved — and affiliate marketing rewards anyone willing to look honestly at their own numbers instead of guessing. The four numbers worth tracking from day one are Clicks (how many people clicked your affiliate link), Leads (how many of those clicks turned into an email signup or similar action), Sales (how many leads or clicks turned into an actual purchase), and Earnings (the total commission generated from those sales).',
              'Tracking these four numbers across your different content pieces and traffic sources reveals patterns invisible to gut feeling alone — you might discover that your TikTok content generates plenty of clicks but few sales, while your email list converts at a much higher rate per click, meaning your real opportunity is to grow that email list faster rather than chasing more TikTok views.',
              'For your assignment, create a simple spreadsheet (a free Google Sheet works perfectly) with four columns — Clicks, Leads, Sales, Earnings — and one row per content piece or traffic source. Update it weekly for the next month, and at the end of that month, identify your single best-performing source and your single weakest, then make one concrete decision about where to invest more time based on what the numbers actually show.',
            ],
            keyTakeaways: [
              'The four core numbers to track are Clicks, Leads, Sales, and Earnings.',
              'Comparing these numbers across content pieces and traffic sources reveals where your real opportunities are hiding.',
              'A simple weekly spreadsheet turns vague intuition into a concrete, evidence-based decision about where to focus.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m12-quiz',
          questions: [
            {
              id: 'amm-m12-q1',
              question: 'Which four numbers does this lesson recommend tracking?',
              options: [
                'Likes, Comments, Shares, Followers',
                'Clicks, Leads, Sales, Earnings',
                'Hours worked, Coffee consumed, Posts made, Apps used',
                'Impressions, Reach, Saves, Views',
              ],
              correctIndex: 1,
              explanation: 'Clicks, Leads, Sales, and Earnings form the core tracking framework taught in this lesson.',
            },
            {
              id: 'amm-m12-q2',
              question: 'What might it mean if a traffic source generates many clicks but few sales?',
              options: [
                'That source is automatically the best one to invest in',
                'There may be a gap between attracting attention and actually converting it into sales',
                'It means the tracking system is broken',
                'It has no meaningful interpretation',
              ],
              correctIndex: 1,
              explanation: 'High clicks with low sales suggests a conversion gap worth investigating, rather than a traffic problem.',
            },
            {
              id: 'amm-m12-q3',
              question: 'What is the purpose of reviewing your tracking spreadsheet at the end of the month?',
              options: [
                'To delete the data',
                'To identify the best and weakest performing sources and make an evidence-based decision on where to focus',
                'It serves no real purpose',
                'To share it publicly online',
              ],
              correctIndex: 1,
              explanation: 'Monthly review turns raw tracked numbers into an actionable decision about where to invest effort.',
            },
          ],
        },
      },
      {
        id: 'amm-m13',
        title: 'Module 13: Advanced Affiliate Marketing',
        lessons: [
          {
            id: 'amm-m13-l1',
            title: 'Authority Building',
            content: [
              'Once your basic system is generating consistent sales, the next stage is building real authority in your niche — becoming a recognized, trusted name rather than just another link-sharer. Authority compounds your results because people buy more readily from someone they already see as credible, which means the same offer converts better for an established voice than for a brand-new, unknown account.',
              'Five growth strategies build authority over time: cultivating a community (a Facebook group, Discord, or Telegram channel where your audience gathers around you specifically), growing a newsletter that delivers consistent insight beyond just promotions, building a YouTube channel for longer-form trust-building content, publishing a short ebook that positions you as someone who has organized real expertise, and hosting webinars where you teach live and answer questions in real time.',
              'For your assignment, pick exactly one authority-building strategy from this list to begin this month, and commit to it as a medium-term project rather than a one-off — for example, launching a small community group and inviting your first 20 members personally. Authority is built through repetition and consistency over months, not through a single impressive post.',
            ],
            keyTakeaways: [
              'Authority makes the same offer convert better, because trust compounds the persuasive power of any recommendation.',
              'Community building, newsletters, YouTube, ebooks, and webinars are five proven authority-building strategies.',
              'Authority is a medium-term, consistency-driven project — choose one strategy and commit rather than spreading thin.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m13-quiz',
          questions: [
            {
              id: 'amm-m13-q1',
              question: 'Why does authority improve affiliate conversion rates?',
              options: [
                'It has no effect on conversions',
                'People buy more readily from someone they already see as credible and trusted',
                'Authority guarantees a sale every time',
                'It only matters for physical products',
              ],
              correctIndex: 1,
              explanation: 'Trust and credibility make the same recommendation more persuasive coming from an established voice.',
            },
            {
              id: 'amm-m13-q2',
              question: 'Which of the following is listed as an authority-building strategy in this lesson?',
              options: [
                'Buying fake followers',
                'Hosting webinars where you teach live and answer questions',
                'Deleting all past content',
                'Avoiding any audience interaction',
              ],
              correctIndex: 1,
              explanation: 'Webinars, alongside community building, newsletters, YouTube, and ebooks, are highlighted as authority strategies.',
            },
            {
              id: 'amm-m13-q3',
              question: 'How does this lesson describe the timeline for building authority?',
              options: [
                'It happens instantly with one viral post',
                'It is a medium-term project built through repetition and consistency over months',
                'It cannot be planned at all',
                'It only takes one day',
              ],
              correctIndex: 1,
              explanation: 'Authority compounds gradually through sustained, consistent effort rather than a single event.',
            },
          ],
        },
      },
      {
        id: 'amm-m14',
        title: 'Module 14: Legal and Ethical Marketing',
        lessons: [
          {
            id: 'amm-m14-l1',
            title: 'Building Trust',
            content: [
              'Long-term affiliate income depends entirely on trust, and trust is destroyed instantly by dishonest marketing — which is why ethical practice isn\'t just a legal requirement but a core business survival skill. Always disclose that your link is an affiliate link; most platforms and most buyers respect honesty far more than they punish it, and hiding the relationship only damages your credibility if (and when) it is discovered.',
              'Beyond disclosure, three further principles protect both your audience and your long-term income: always be truthful about what a product can and cannot do, never use fake or fabricated testimonials no matter how tempting the shortcut feels, and only ever recommend products you have genuinely used or thoroughly researched yourself. An audience that catches you recommending something you clearly never tried, or exaggerating results that aren\'t real, will stop trusting everything you say afterward — including your honest recommendations.',
              'Make it a personal standing rule, starting today, to add a simple disclosure line ("This post contains an affiliate link — I may earn a commission at no extra cost to you") to every piece of promotional content you publish, and to genuinely test or deeply research every product before you recommend it. This single habit protects the long-term value of every other strategy taught in this course.',
            ],
            keyTakeaways: [
              'Disclosing affiliate links openly builds more trust than it costs — hiding the relationship is far riskier long-term.',
              'Truthfulness about product capabilities and a ban on fake testimonials protect your credibility permanently.',
              'Only recommend products you have genuinely used or thoroughly researched — audiences can tell, and they remember.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m14-quiz',
          questions: [
            {
              id: 'amm-m14-q1',
              question: 'What does this lesson say about disclosing affiliate links?',
              options: [
                'Disclosure should always be hidden from the audience',
                'Disclosing affiliate links builds trust and is respected by most platforms and buyers',
                'Disclosure is illegal everywhere',
                'Disclosure only matters for physical products',
              ],
              correctIndex: 1,
              explanation: 'Open disclosure is presented as trust-building, not trust-damaging.',
            },
            {
              id: 'amm-m14-q2',
              question: 'What is the lesson\'s stance on fake testimonials?',
              options: [
                'They are acceptable if sales are low',
                'They should never be used, regardless of how tempting the shortcut feels',
                'They are required by affiliate networks',
                'They have no effect on trust',
              ],
              correctIndex: 1,
              explanation: 'Fake testimonials are explicitly banned as a long-term trust-destroying shortcut.',
            },
            {
              id: 'amm-m14-q3',
              question: 'According to this lesson, which products should you recommend?',
              options: [
                'Any product with the highest commission, regardless of quality',
                'Only products you have genuinely used or thoroughly researched yourself',
                'Products recommended by a single anonymous source',
                'It does not matter which products you recommend',
              ],
              correctIndex: 1,
              explanation: 'Genuine use or thorough research is the standard for ethical, sustainable recommendations.',
            },
          ],
        },
      },
      {
        id: 'amm-m15',
        title: 'Module 15: First $100 to First $1,000 Blueprint',
        lessons: [
          {
            id: 'amm-m15-l1',
            title: 'Your 90-Day Roadmap to Consistent Income',
            content: [
              'With every skill from this course in place, the final piece is a realistic timeline that turns scattered effort into a focused 90-day push. In Week 1, choose your niche, join one affiliate network and one direct program, and set up your primary platform. In Week 2, publish your first content using the Problem-Solution-Proof-Call-to-Action structure and start your free traffic channel of choice. In Week 3, set up your email funnel (free gift, value emails, affiliate offer) and your first simple landing page. In Week 4, aim explicitly for your first sale — review every piece of content and outreach against the lessons in this course, and adjust anything that isn\'t generating clicks.',
              'From Month 2 onward, the goal shifts from "first sale" to compounding: aim for $100 in monthly commissions by consistently repeating the content formula that produced your first sale, then $500 as you add a second traffic channel and begin authority-building (Module 13), and $1,000 as you introduce a small, tested paid ad budget (Module 11) behind your now-proven organic formula. Each milestone is simply "do more of what is already working," not "find something completely new."',
              'Before you consider this course complete, finish the capstone project: select your niche, join an affiliate program, build your platform, create at least 30 pieces of content, build one landing page, create one email sequence, and generate at least one real sale. As a final self-assessment, confirm honestly that you have completed every module, submitted real work for every assignment, can explain the core ideas of each module in your own words, finished the capstone project above, and have a genuinely functioning affiliate funnel running — content driving traffic, a landing page or email list capturing interest, and a tracked affiliate link converting that interest into commissions. Meeting all five of these standards means you have moved from student to working affiliate marketer, ready to scale your first $1,000 month into a sustainable income.',
            ],
            keyTakeaways: [
              'Weeks 1-4 take you from niche selection through your first content, funnel, and first sale.',
              'Months 2-3 scale through repetition, a second traffic channel, authority-building, and a tested paid ad budget — not by chasing something new.',
              'The capstone project and five-point self-assessment confirm you have a genuinely functioning affiliate funnel, not just completed lessons.',
            ],
          },
        ],
        quiz: {
          id: 'amm-m15-quiz',
          questions: [
            {
              id: 'amm-m15-q1',
              question: 'What is the primary goal explicitly set for Week 4 of the 90-day roadmap?',
              options: [
                'Choosing a niche for the first time',
                'Generating your first sale and adjusting anything that isn\'t producing clicks',
                'Launching your first paid ad campaign',
                'Writing your first ebook',
              ],
              correctIndex: 1,
              explanation: 'Week 4 is focused on converting the prior three weeks of setup into an actual first sale.',
            },
            {
              id: 'amm-m15-q2',
              question: 'How does the blueprint describe scaling from $100 to $500 to $1,000 per month?',
              options: [
                'By abandoning what worked and starting over each time',
                'By doing more of what is already working — repeating, adding channels, then adding tested paid ads',
                'By only relying on luck',
                'By skipping straight to paid ads in Week 1',
              ],
              correctIndex: 1,
              explanation: 'Each income milestone builds on repeating and scaling the proven formula, not reinventing it.',
            },
            {
              id: 'amm-m15-q3',
              question: 'What does the final self-assessment require to confirm course completion?',
              options: [
                'Only watching all the lessons without doing any assignments',
                'Completing all modules and assignments, explaining core ideas, finishing the capstone, and having a genuinely functioning affiliate funnel',
                'Spending a specific amount of money on ads',
                'Reaching exactly $1,000 in the first week',
              ],
              correctIndex: 1,
              explanation: 'The self-assessment checklist covers completed modules and assignments, understanding, the capstone project, and a working funnel.',
            },
          ],
        },
      },
    ],
  },

  // ============================================================
  // COURSE 1 — Content Creation & Digital Marketing Mastery
  // ============================================================
  {
    id: 'content-marketing-mastery',
    slug: 'content-marketing-mastery',
    title: 'Content Creation & Digital Marketing Mastery',
    description: 'Learn to plan, write, film, edit, and grow content that builds an audience and pays in dollars — from copywriting and social media strategy to SEO, email, and monetization.',
    skillIds: ['digital-marketing', 'content-writing'],
    category: 'Content & Marketing',
    estimatedHours: 20,
    modules: [
      {
        id: 'cmm-m1',
        title: 'Foundations of Content Strategy',
        lessons: [
          {
            id: 'cmm-m1-l1',
            title: 'The Kingdom of Content: Why Your Voice Matters',
            content: [
              'Every piece of content you create — a caption, a video, an email — is an opportunity to serve someone and build trust with them. Brands and creators who win online are not always the most talented; they are the most consistent and the most useful to their audience.',
              'Content creation is no longer optional for anyone who wants to earn globally. Clients pay for people who can turn a product, idea, or message into something an audience wants to stop scrolling for. That is a skill, and like any skill, it can be learned and sharpened.',
              'Before you create anything, get clear on three things: who you are serving, what transformation or value you are offering them, and why you specifically are positioned to offer it. This clarity becomes the foundation for every piece of content you make from here on.',
            ],
            keyTakeaways: [
              'Content is a service to your audience, not just self-expression.',
              'Clarity on your audience, value, and positioning comes before any tactic.',
            ],
          },
          {
            id: 'cmm-m1-l2',
            title: 'Content Pillars, Audience Avatars & The Content Flywheel',
            content: [
              'Content pillars are the 3-5 core themes you consistently create around (for example: tips, behind-the-scenes, client wins, education, personality). Pillars keep you from running out of ideas and help your audience know exactly what to expect from you.',
              'An audience avatar is a detailed picture of your one ideal viewer or reader — their goals, frustrations, and the language they use. Writing content "to one person" instead of "to everyone" makes your message sharper and more persuasive.',
              'The Content Flywheel describes how good content compounds: valuable content attracts an audience, the audience builds trust, trust drives action (sales, bookings, follows), and that momentum funds and inspires the next round of content. Creators who quit early never let the flywheel start spinning.',
            ],
            keyTakeaways: [
              'Pick 3-5 content pillars so you never run out of ideas.',
              'Write to a specific audience avatar, not a faceless crowd.',
              'Consistency is what makes the content flywheel start compounding.',
            ],
          },
        ],
        quiz: {
          id: 'cmm-m1-quiz',
          questions: [
            {
              id: 'cmm-m1-q1',
              question: 'What are content pillars?',
              options: [
                'Random topics posted whenever inspiration strikes',
                '3-5 consistent core themes you create content around',
                'A list of hashtags to use',
                'The technical settings of your camera',
              ],
              correctIndex: 1,
              explanation: 'Content pillars are a small set of consistent themes that keep your content focused and easy to plan.',
            },
            {
              id: 'cmm-m1-q2',
              question: 'What keeps the "Content Flywheel" spinning?',
              options: [
                'Posting once and hoping it goes viral',
                'Consistency that compounds trust into action over time',
                'Buying followers',
                'Copying competitors exactly',
              ],
              correctIndex: 1,
              explanation: 'The flywheel compounds through consistent valuable content building trust, which drives action and fuels more content.',
            },
            {
              id: 'cmm-m1-q3',
              question: 'Why write to an audience avatar instead of "everyone"?',
              options: [
                'It makes the content longer',
                'It is required by social media platforms',
                'It sharpens your message and makes it more persuasive',
                'It has no real effect on content quality',
              ],
              correctIndex: 2,
              explanation: 'Speaking to one specific person sharpens language and makes the content feel personally relevant, which increases persuasion.',
            },
          ],
        },
      },
      {
        id: 'cmm-m2',
        title: 'Copywriting Mastery',
        lessons: [
          {
            id: 'cmm-m2-l1',
            title: 'The Psychology of Persuasive Writing',
            content: [
              'Persuasive writing taps into how people actually make decisions: emotionally first, then justified logically. Great copy identifies a real pain point or desire and speaks to it directly before introducing any solution.',
              'Specificity builds belief. "Helped a client grow from 500 to 12,000 followers in 90 days" is far more persuasive than "helped clients grow their audience" because specific numbers and timelines feel real and verifiable.',
              'Every piece of copy should have one clear goal and one clear next action for the reader. Confused readers do not take action — clarity always outperforms cleverness.',
            ],
            keyTakeaways: [
              'People decide emotionally and justify logically — address both.',
              'Specific numbers and details make claims more believable than vague ones.',
            ],
          },
          {
            id: 'cmm-m2-l2',
            title: 'Frameworks That Convert: PAS, AIDA, StoryBrand & The 4 Ps',
            content: [
              'PAS (Problem-Agitate-Solution) names the reader\'s problem, intensifies why it matters if left unsolved, then presents your offer as the solution. It is excellent for short ads and sales pages.',
              'AIDA (Attention-Interest-Desire-Action) is a classic structure for guiding a reader step by step from a scroll-stopping hook to a clear call to action.',
              'StoryBrand positions the customer — not your brand — as the hero of the story. Your brand plays the guide who hands the hero a plan to overcome their problem. This single mindset shift makes copy instantly more customer-centered.',
              'The 4 Ps (Picture-Promise-Proof-Push) opens with a vivid picture of the desired outcome, promises a result, proves it with evidence or testimonials, then pushes the reader to act now.',
            ],
            keyTakeaways: [
              'PAS and AIDA give you reliable step-by-step copy structures.',
              'In StoryBrand, the customer is the hero and your brand is the guide.',
            ],
          },
        ],
        quiz: {
          id: 'cmm-m2-quiz',
          questions: [
            {
              id: 'cmm-m2-q1',
              question: 'What does the "A" stand for in the PAS framework?',
              options: ['Action', 'Agitate', 'Audience', 'Authority'],
              correctIndex: 1,
              explanation: 'PAS stands for Problem-Agitate-Solution: you agitate the problem before presenting the solution.',
            },
            {
              id: 'cmm-m2-q2',
              question: 'In the StoryBrand framework, who is the "hero" of the story?',
              options: ['The brand', 'The founder', 'The customer', 'The competitor'],
              correctIndex: 2,
              explanation: 'StoryBrand positions the customer as the hero, with the brand acting as the guide who helps them win.',
            },
            {
              id: 'cmm-m2-q3',
              question: 'Why does specificity (exact numbers, timelines) strengthen copy?',
              options: [
                'It makes the copy longer and more formal',
                'It makes claims feel more real and believable',
                'It is required by advertising law',
                'It has no effect on persuasion',
              ],
              correctIndex: 1,
              explanation: 'Specific details feel verifiable and concrete, which builds belief far more than vague generalities.',
            },
          ],
        },
      },
      {
        id: 'cmm-m3',
        title: 'Social Media Strategy',
        lessons: [
          {
            id: 'cmm-m3-l1',
            title: 'Choosing Your Platforms & Content Mix',
            content: [
              'You do not need to be everywhere — you need to be where your specific audience already spends time, and where the content format fits your strengths (writing, talking on camera, design, etc).',
              'A healthy content mix typically balances three types: value content (teaches or helps), connection content (personality, behind-the-scenes, story), and conversion content (offers, testimonials, calls to action). A common ratio is roughly 70% value, 20% connection, 10% conversion.',
              'Pick one or two primary platforms to master before expanding. Spreading thin across five platforms with no strategy underperforms going deep on one or two with a clear plan.',
            ],
            keyTakeaways: [
              'Choose platforms based on where your audience is, not where you personally prefer.',
              'Balance value, connection, and conversion content — don\'t only sell.',
            ],
          },
          {
            id: 'cmm-m3-l2',
            title: 'Batch Creation & Content Systems',
            content: [
              'Batching means creating multiple pieces of content in one focused session (for example, filming five short videos in one afternoon) rather than scrambling daily. This protects creative energy and consistency.',
              'A simple content calendar — even a basic spreadsheet — listing the pillar, format, and publish date for each upcoming post removes daily decision fatigue and keeps you consistent through busy weeks.',
              'Repurposing multiplies your output without multiplying your effort: one long-form piece (a blog post or long video) can be cut into multiple short clips, quotes, and captions across platforms.',
            ],
            keyTakeaways: [
              'Batching content protects consistency during busy or low-motivation weeks.',
              'Repurpose one piece of content into many formats instead of starting from scratch each time.',
            ],
          },
        ],
        quiz: {
          id: 'cmm-m3-quiz',
          questions: [
            {
              id: 'cmm-m3-q1',
              question: 'How should you choose which social platforms to focus on?',
              options: [
                'Pick the platform with the most total users worldwide',
                'Pick where your specific audience spends time and that fits your strengths',
                'Use every platform at once from day one',
                'Choose based on which app you personally enjoy most',
              ],
              correctIndex: 1,
              explanation: 'Platform choice should be driven by where your target audience already is, plus the formats that fit your strengths.',
            },
            {
              id: 'cmm-m3-q2',
              question: 'In a healthy content mix, what should make up the largest share?',
              options: ['Conversion/sales content', 'Value content that teaches or helps', 'Reposted memes', 'Paid ads'],
              correctIndex: 1,
              explanation: 'A roughly 70% value, 20% connection, 10% conversion mix keeps the relationship with your audience healthy and trust-driven.',
            },
            {
              id: 'cmm-m3-q3',
              question: 'What is the main benefit of batch creating content?',
              options: [
                'It guarantees a post will go viral',
                'It protects consistency by removing daily decision fatigue',
                'It is required by social platforms\' algorithms',
                'It eliminates the need for a content plan',
              ],
              correctIndex: 1,
              explanation: 'Batching front-loads the creative work so you stay consistent even during busy or unmotivated weeks.',
            },
          ],
        },
      },
      {
        id: 'cmm-m4',
        title: 'Short-Form Video Creation',
        lessons: [
          {
            id: 'cmm-m4-l1',
            title: 'Hook Formulas That Stop the Scroll',
            content: [
              'On short-form video, you typically have one to three seconds to earn the viewer\'s attention before they scroll past. The first line or visual — the hook — is the single most important part of the video.',
              'Strong hook patterns include: calling out the exact viewer ("If you are a freelancer struggling to find clients..."), making a bold or surprising claim, asking a curiosity-driving question, or starting mid-action so the viewer wonders what happened before.',
              'Pattern interrupts — an unexpected visual, sound, or statement — reset the viewer\'s attention partway through a video and reduce drop-off, especially in videos longer than 30 seconds.',
            ],
            keyTakeaways: [
              'You have roughly 1-3 seconds to earn attention — invest the most effort in your hook.',
              'Use pattern interrupts mid-video to keep attention from fading.',
            ],
          },
          {
            id: 'cmm-m4-l2',
            title: 'Filming on a Budget',
            content: [
              'You do not need expensive equipment to start. A smartphone with a clean lens, a stable surface or cheap tripod, and a quiet, well-lit space outperform expensive gear used carelessly.',
              'Natural light facing your face (such as near a window) is usually the most flattering and free lighting source available. Avoid backlighting where a bright window is behind you.',
              'Audio quality matters more than video quality for viewer retention — a clear voice with a cheap clip-on or earbud microphone beats a blurry-audio video shot on the best camera.',
            ],
            keyTakeaways: [
              'A smartphone, stable shot, and good natural light are enough to start professionally.',
              'Clear audio matters more to viewers than perfect visual quality.',
            ],
          },
        ],
        quiz: {
          id: 'cmm-m4-quiz',
          questions: [
            {
              id: 'cmm-m4-q1',
              question: 'Roughly how long do you have to capture a viewer\'s attention in short-form video?',
              options: ['10-15 seconds', '1-3 seconds', 'A full minute', 'There is no real time limit'],
              correctIndex: 1,
              explanation: 'Viewers decide within the first 1-3 seconds whether to keep watching, making the hook critical.',
            },
            {
              id: 'cmm-m4-q2',
              question: 'Which generally matters more for viewer retention?',
              options: ['Audio clarity over video sharpness', 'Video sharpness over audio clarity', 'Neither matters', 'Background music volume'],
              correctIndex: 0,
              explanation: 'Viewers tolerate average video quality far more than unclear or distorted audio.',
            },
            {
              id: 'cmm-m4-q3',
              question: 'What is a "pattern interrupt" used for in video editing?',
              options: [
                'Ending the video abruptly',
                'Resetting viewer attention mid-video to reduce drop-off',
                'Adding copyright watermarks',
                'Increasing video file size',
              ],
              correctIndex: 1,
              explanation: 'An unexpected visual or sound mid-video re-engages attention and lowers the chance of viewers scrolling away.',
            },
          ],
        },
      },
      {
        id: 'cmm-m5',
        title: 'Video Editing Mastery',
        lessons: [
          {
            id: 'cmm-m5-l1',
            title: 'Choosing Your Editing Tool',
            content: [
              'CapCut is a free, beginner-friendly mobile and desktop editor with built-in captions, transitions, and trending effects — an excellent starting point for short-form content.',
              'DaVinci Resolve is a free, professional-grade desktop editor with powerful color grading and audio tools, suited for creators ready to go beyond templates.',
              'Adobe Premiere Pro is the industry-standard paid tool used in many professional and agency workflows, useful once you are editing for paying clients at scale.',
            ],
            keyTakeaways: [
              'CapCut is the fastest way to start editing short-form content for free.',
              'Graduate to DaVinci Resolve or Premiere Pro as your editing needs grow.',
            ],
          },
          {
            id: 'cmm-m5-l2',
            title: 'Editing for Retention',
            content: [
              'Cut out dead air and filler words ("um," long pauses) ruthlessly — fast pacing keeps viewers watching, especially in the first few seconds.',
              'Add text overlays for key lines, since a large share of viewers watch with sound off, especially in public or on social feeds. Captions also improve accessibility and watch time.',
              'A common mistake is over-editing: too many flashy transitions, sound effects, or zooms can distract from the message. Edit in service of clarity and pacing, not just to show off effects.',
            ],
            keyTakeaways: [
              'Cut dead air aggressively to keep pacing tight.',
              'Add captions/text overlays since many viewers watch muted.',
              'Avoid over-editing — every effect should serve clarity, not distract from it.',
            ],
          },
        ],
        quiz: {
          id: 'cmm-m5-quiz',
          questions: [
            {
              id: 'cmm-m5-q1',
              question: 'Which tool is recommended as the fastest free way to start editing short-form video?',
              options: ['Adobe Premiere Pro', 'CapCut', 'DaVinci Resolve only', 'A paid agency'],
              correctIndex: 1,
              explanation: 'CapCut is free, mobile-friendly, and built specifically for fast short-form editing with templates and auto-captions.',
            },
            {
              id: 'cmm-m5-q2',
              question: 'Why are text overlays/captions important in video editing?',
              options: [
                'They are required by every platform',
                'Many viewers watch with sound off, so captions keep the message accessible',
                'They replace the need for a hook',
                'They make videos load faster',
              ],
              correctIndex: 1,
              explanation: 'A large portion of viewers watch muted, so on-screen text ensures the message still lands.',
            },
            {
              id: 'cmm-m5-q3',
              question: 'What is the common "over-editing" mistake to avoid?',
              options: [
                'Cutting out dead air',
                'Using too many flashy effects that distract from the message',
                'Adding captions',
                'Filming in good lighting',
              ],
              correctIndex: 1,
              explanation: 'Excessive transitions, zooms, and sound effects can distract viewers rather than support the message.',
            },
          ],
        },
      },
      {
        id: 'cmm-m6',
        title: 'SEO Fundamentals',
        lessons: [
          {
            id: 'cmm-m6-l1',
            title: 'Keyword Research That Drives Traffic',
            content: [
              'Keywords are the phrases people type into search engines. Good SEO starts with understanding what your audience is actually searching for, in their own words.',
              'Long-tail keywords — longer, more specific phrases like "how to price freelance graphic design for beginners" — usually have less competition and higher intent than short, broad keywords like "freelancing," making them easier to rank for.',
              'Free tools like Google\'s autocomplete, "People also ask" boxes, and YouTube\'s search bar suggestions reveal real search demand without needing paid software.',
            ],
            keyTakeaways: [
              'Long-tail, specific keywords are easier to rank for than short broad ones.',
              'Free tools like search autocomplete reveal real audience search demand.',
            ],
          },
          {
            id: 'cmm-m6-l2',
            title: 'On-Page & YouTube SEO',
            content: [
              'On-page SEO means optimizing the content itself: placing your target keyword naturally in the title, the first paragraph, headings, and image descriptions, while writing primarily for human readers, not just algorithms.',
              'YouTube is the world\'s second-largest search engine. Video titles, descriptions, and the first few words spoken in a video all influence whether YouTube recommends it for relevant searches.',
              'Search engines reward content that fully satisfies the searcher\'s intent and keeps them engaged — thin, keyword-stuffed content without real value tends to rank poorly over time.',
            ],
            keyTakeaways: [
              'Place keywords naturally in titles, headings, and the opening of content.',
              'YouTube is a major search engine in its own right — optimize titles and descriptions there too.',
            ],
          },
        ],
        quiz: {
          id: 'cmm-m6-quiz',
          questions: [
            {
              id: 'cmm-m6-q1',
              question: 'Why are long-tail keywords often easier to rank for?',
              options: [
                'They are shorter and simpler',
                'They are more specific with less competition and higher intent',
                'Search engines ignore them',
                'They never appear in search results',
              ],
              correctIndex: 1,
              explanation: 'Specific, longer phrases have less competition while still attracting highly interested searchers.',
            },
            {
              id: 'cmm-m6-q2',
              question: 'Which platform is described as the world\'s second-largest search engine?',
              options: ['Instagram', 'YouTube', 'Pinterest', 'LinkedIn'],
              correctIndex: 1,
              explanation: 'YouTube functions as a massive search engine, making video SEO (titles, descriptions) highly valuable.',
            },
            {
              id: 'cmm-m6-q3',
              question: 'Where should target keywords be placed for good on-page SEO?',
              options: [
                'Only hidden in the website code',
                'Naturally in titles, headings, and the opening of the content',
                'Repeated as many times as possible regardless of readability',
                'Only in image file names',
              ],
              correctIndex: 1,
              explanation: 'Keywords should appear naturally in key visible places while the content still reads well for humans.',
            },
          ],
        },
      },
      {
        id: 'cmm-m7',
        title: 'Email Marketing',
        lessons: [
          {
            id: 'cmm-m7-l1',
            title: 'Why Email Still Wins',
            content: [
              'Unlike social media followers, your email list is an asset you own — no algorithm change can take it away or hide your message from people who asked to hear from you.',
              'Email consistently delivers some of the highest return on investment of any marketing channel because it reaches an inbox directly rather than competing in a crowded, algorithm-controlled feed.',
              'A simple lead magnet — a free guide, checklist, or mini-course offered in exchange for an email address — is the most common way to start growing a list from scratch.',
            ],
            keyTakeaways: [
              'An email list is an owned asset, unlike rented social media followings.',
              'A lead magnet is the standard way to start collecting emails.',
            ],
          },
          {
            id: 'cmm-m7-l2',
            title: 'Sequences & List Building',
            content: [
              'A welcome sequence is a short series of automated emails sent to new subscribers that introduces who you are, delivers on your promise, and builds the relationship before ever pitching anything.',
              'Free tools like Mailchimp or MailerLite let beginners start collecting emails and sending sequences without any coding knowledge or major budget.',
              'Consistency beats frequency: a short, valuable weekly or biweekly email that people actually open outperforms daily emails that get ignored or trigger unsubscribes.',
            ],
            keyTakeaways: [
              'A welcome sequence builds trust with new subscribers before any pitch.',
              'Consistent, valuable emails beat frequent, low-value ones.',
            ],
          },
        ],
        quiz: {
          id: 'cmm-m7-quiz',
          questions: [
            {
              id: 'cmm-m7-q1',
              question: 'What is the key advantage of an email list over social media followers?',
              options: [
                'Email is free to use, social media is not',
                'It is an asset you own that isn\'t controlled by an algorithm',
                'Email has no spam filters',
                'There is no real advantage',
              ],
              correctIndex: 1,
              explanation: 'You own your email list directly, unlike followers on a platform that can change rules or visibility anytime.',
            },
            {
              id: 'cmm-m7-q2',
              question: 'What is the purpose of a welcome email sequence?',
              options: [
                'To immediately sell something to new subscribers',
                'To introduce yourself and build trust before pitching anything',
                'To remove inactive subscribers',
                'To collect payment information',
              ],
              correctIndex: 1,
              explanation: 'A welcome sequence builds the relationship and delivers value before any sales pitch.',
            },
            {
              id: 'cmm-m7-q3',
              question: 'What is a "lead magnet"?',
              options: [
                'A paid advertisement',
                'A free resource offered in exchange for an email address',
                'A type of email subject line',
                'A spam filter setting',
              ],
              correctIndex: 1,
              explanation: 'A lead magnet (guide, checklist, mini-course) incentivizes someone to share their email and join your list.',
            },
          ],
        },
      },
      {
        id: 'cmm-m8',
        title: 'Analytics & Monetization',
        lessons: [
          {
            id: 'cmm-m8-l1',
            title: 'Building Your Content Dashboard',
            content: [
              'Track a small set of meaningful metrics rather than obsessing over every number: reach (how many people saw it), engagement rate, and retention/watch time are usually the most useful for improving content.',
              'Retention — how long people actually watch or read — often matters more than raw views, because it signals whether your content delivers on its hook and keeps the audience\'s attention.',
              'Review your numbers weekly or monthly, not daily. Look for patterns across multiple pieces of content rather than reacting emotionally to any single post\'s performance.',
            ],
            keyTakeaways: [
              'Retention/watch time often matters more than raw view counts.',
              'Review metrics periodically for patterns, not obsessively after each post.',
            ],
          },
          {
            id: 'cmm-m8-l2',
            title: 'Monetization Paths',
            content: [
              'Common monetization paths include freelance services (using content as a portfolio to attract clients), digital products, brand sponsorships/partnerships, affiliate marketing, and platform creator funds.',
              'The principle "serve first, sell second" holds true across all paths: audiences who feel genuinely helped are far more likely to support a creator\'s paid offers than audiences who feel constantly sold to.',
              'Most successful creators combine two or three monetization paths rather than relying on one single income source, which builds resilience against algorithm or platform changes.',
            ],
            keyTakeaways: [
              'There are multiple monetization paths — services, products, sponsorships, affiliates.',
              '"Serve first, sell second" builds the trust that makes monetization sustainable.',
            ],
          },
        ],
        quiz: {
          id: 'cmm-m8-quiz',
          questions: [
            {
              id: 'cmm-m8-q1',
              question: 'Why does retention/watch time often matter more than raw views?',
              options: [
                'It doesn\'t matter at all',
                'It signals whether content actually holds attention and delivers on its hook',
                'Platforms ignore retention completely',
                'It is only relevant for paid ads',
              ],
              correctIndex: 1,
              explanation: 'High retention shows your content kept people engaged, which is a stronger quality signal than views alone.',
            },
            {
              id: 'cmm-m8-q2',
              question: 'What does the principle "serve first, sell second" mean?',
              options: [
                'Never sell anything',
                'Genuinely help your audience before pitching, to build trust that supports sales',
                'Sell aggressively in every post',
                'Only sell to new followers',
              ],
              correctIndex: 1,
              explanation: 'Providing real value first builds the trust that makes audiences receptive to paid offers later.',
            },
            {
              id: 'cmm-m8-q3',
              question: 'Why do successful creators often combine multiple monetization paths?',
              options: [
                'It is required by law',
                'It builds resilience against algorithm or platform changes',
                'It guarantees viral growth',
                'It reduces the need for an audience',
              ],
              correctIndex: 1,
              explanation: 'Relying on one income source is risky if a platform or algorithm changes; multiple paths add stability.',
            },
          ],
        },
      },
    ],
  },

  // ============================================================
  // COURSE 2 — Entrepreneurship & Kingdom Business Mastery
  // ============================================================
  {
    id: 'entrepreneurship-mastery',
    slug: 'entrepreneurship-mastery',
    title: 'Entrepreneurship & Kingdom Business Mastery',
    description: 'Build a purpose-driven business from the ground up — validate ideas, create and sell digital products, manage your finances, build a personal brand, and develop the mindset to sustain long-term success.',
    skillIds: ['entrepreneurship'],
    category: 'Business',
    estimatedHours: 16,
    modules: [
      {
        id: 'ebm-m1',
        title: 'Foundations of Kingdom Entrepreneurship',
        lessons: [
          {
            id: 'ebm-m1-l1',
            title: 'Why Build a Business With Purpose',
            content: [
              'Kingdom entrepreneurship is the practice of building a business as an act of stewardship and service — using your gifts to genuinely solve problems and create value, not merely to extract profit.',
              'A purpose-driven business tends to outlast a purely profit-driven one because purpose sustains motivation through the inevitable hard seasons every business goes through.',
              'Profit is not the enemy of purpose — it is the fuel. A profitable business can serve more people, employ more people, and give more, which is why financial sustainability is itself a form of stewardship.',
            ],
            keyTakeaways: [
              'Purpose and profit work together, not against each other.',
              'Purpose-driven businesses sustain motivation through hard seasons.',
            ],
          },
          {
            id: 'ebm-m1-l2',
            title: 'Biblical & Practical Foundations for Wealth',
            content: [
              'Wealth, rightly understood, is a tool for impact and stewardship rather than an end in itself — the goal is to manage resources faithfully, not to hoard them.',
              'The principle of being "faithful in little" teaches that how you manage small amounts of money, time, and opportunity now shapes whether you are trusted with larger resources later.',
              'A renewed, abundant mindset — believing there is enough opportunity and provision to go around — frees entrepreneurs to collaborate, give generously, and take healthy risks instead of operating from fear and scarcity.',
            ],
            keyTakeaways: [
              'View wealth as a tool for stewardship and impact, not an end goal.',
              'Faithfulness with small resources builds trust for greater responsibility.',
            ],
          },
        ],
        quiz: {
          id: 'ebm-m1-quiz',
          questions: [
            {
              id: 'ebm-m1-q1',
              question: 'How does Kingdom entrepreneurship differ from a purely profit-driven approach?',
              options: [
                'It ignores profit entirely',
                'It treats business as stewardship and service, with profit as fuel for impact',
                'It avoids hard work',
                'It only applies to nonprofit organizations',
              ],
              correctIndex: 1,
              explanation: 'Kingdom entrepreneurship integrates purpose and profit, viewing profit as fuel that enables greater service and impact.',
            },
            {
              id: 'ebm-m1-q2',
              question: 'What does it mean to be "faithful in little"?',
              options: [
                'Spending as little as possible',
                'How you manage small resources now shapes trust with bigger ones later',
                'Avoiding all financial risk',
                'Only starting very small businesses',
              ],
              correctIndex: 1,
              explanation: 'Faithfulness with small amounts of money, time, and opportunity builds the track record for handling larger responsibility.',
            },
            {
              id: 'ebm-m1-q3',
              question: 'What is wealth described as in this module?',
              options: [
                'An end goal to hoard',
                'A tool for stewardship and impact',
                'Something to be avoided',
                'Irrelevant to entrepreneurship',
              ],
              correctIndex: 1,
              explanation: 'Wealth is framed as a tool that, when stewarded well, enables greater service and generosity.',
            },
          ],
        },
      },
      {
        id: 'ebm-m2',
        title: 'Idea Validation & Business Models',
        lessons: [
          {
            id: 'ebm-m2-l1',
            title: 'Validating Your Business Idea Before You Build',
            content: [
              'Good business ideas often come from your own frustrations, skills people already pay you for, or problems you notice repeatedly in a community you understand well.',
              'Validation means testing whether real people will actually pay for your idea before you invest significant time or money — through customer interviews, pre-sales, or a simple landing page measuring interest.',
              'The biggest idea-stage mistake is building a full product in isolation and only then asking the market if it wants it. Talk to potential customers first; let their actual words shape the offer.',
            ],
            keyTakeaways: [
              'Validate demand with real conversations and small tests before building.',
              'Avoid building in isolation — let customer feedback shape the offer early.',
            ],
          },
          {
            id: 'ebm-m2-l2',
            title: 'The Simplified Business Model Canvas',
            content: [
              'A simplified business model canvas captures, on one page, the essentials: who your customer is, what value you provide them, how you reach and sell to them, how you make money, and what it costs you to deliver.',
              'Mapping these elements before launch forces clarity and exposes weak assumptions — for example, realizing you have no real plan for reaching customers, or that costs would outweigh revenue.',
              'The canvas is a living document — revisit and adjust it as you learn from real customers, rather than treating it as a fixed plan set in stone.',
            ],
            keyTakeaways: [
              'A one-page business model canvas clarifies customer, value, channels, revenue, and costs.',
              'Treat the canvas as a living document, updated as you learn.',
            ],
          },
        ],
        quiz: {
          id: 'ebm-m2-quiz',
          questions: [
            {
              id: 'ebm-m2-q1',
              question: 'Which is a common, reliable source of good business ideas?',
              options: [
                'Copying a random trending business with no connection to your skills',
                'Your own frustrations or skills people already pay you for',
                'Choosing the most expensive idea possible',
                'Avoiding any problem you have personal experience with',
              ],
              correctIndex: 1,
              explanation: 'Ideas rooted in your real frustrations, skills, or community knowledge tend to be more validated and sustainable.',
            },
            {
              id: 'ebm-m2-q2',
              question: 'What is the best way to validate a business idea before building it fully?',
              options: [
                'Build the complete product first, then ask for feedback',
                'Talk to potential customers and test demand early through interviews or pre-sales',
                'Skip validation and launch immediately',
                'Only ask friends and family for opinions',
              ],
              correctIndex: 1,
              explanation: 'Talking to real potential customers and testing demand early avoids wasted time building something nobody wants.',
            },
            {
              id: 'ebm-m2-q3',
              question: 'What does a simplified business model canvas help you clarify?',
              options: [
                'Only your logo and brand colors',
                'Customer, value proposition, channels, revenue, and costs',
                'Your personal daily schedule',
                'Nothing useful — it is purely decorative',
              ],
              correctIndex: 1,
              explanation: 'The canvas maps the essential building blocks of a business model on a single page.',
            },
          ],
        },
      },
      {
        id: 'ebm-m3',
        title: 'Digital Product Creation & Selling',
        lessons: [
          {
            id: 'ebm-m3-l1',
            title: 'Why Digital Products Are Powerful',
            content: [
              'Digital products (ebooks, templates, courses, presets) can be created once and sold repeatedly without the inventory, shipping, or per-unit costs of physical products, making them highly scalable.',
              'Because digital products have low marginal costs, they are accessible starting points for entrepreneurs without large capital, especially when paired with an existing audience or content presence.',
              'The most successful digital products solve one specific, painful problem extremely well rather than trying to cover everything broadly.',
            ],
            keyTakeaways: [
              'Digital products scale well because they have near-zero per-unit cost.',
              'Solve one specific problem extremely well rather than going broad.',
            ],
          },
          {
            id: 'ebm-m3-l2',
            title: 'Creating & Launching Your First Product',
            content: [
              'Start simple: a focused checklist, template, or short guide that solves one problem can be created in days and tested quickly, rather than spending months on an elaborate course nobody has asked for yet.',
              'Payment processors built for African creators — such as Paystack and Flutterwave — make it possible to accept both local and international payments without needing a foreign bank account.',
              'A successful launch usually involves building anticipation beforehand (through content and an email list), then opening sales for a limited window to create urgency and focus effort.',
            ],
            keyTakeaways: [
              'Start with a simple, focused product rather than an elaborate one.',
              'Paystack and Flutterwave allow African creators to accept local and global payments.',
            ],
          },
        ],
        quiz: {
          id: 'ebm-m3-quiz',
          questions: [
            {
              id: 'ebm-m3-q1',
              question: 'Why do digital products scale especially well?',
              options: [
                'They require large warehouses',
                'They have near-zero cost to deliver an additional copy',
                'They can only be sold once',
                'They require shipping fees',
              ],
              correctIndex: 1,
              explanation: 'Once created, a digital product can be sold repeatedly with minimal additional cost.',
            },
            {
              id: 'ebm-m3-q2',
              question: 'What is the recommended strategy for your first digital product?',
              options: [
                'Build the most comprehensive, elaborate product possible',
                'Start simple — solve one specific problem with a focused product',
                'Wait until you have thousands of followers',
                'Avoid testing the idea before building',
              ],
              correctIndex: 1,
              explanation: 'Starting simple and focused allows faster testing and iteration based on real customer feedback.',
            },
            {
              id: 'ebm-m3-q3',
              question: 'Which payment tools are highlighted as useful for African creators selling digital products?',
              options: ['Only cash on delivery', 'Paystack and Flutterwave', 'Only cryptocurrency', 'None — international sales are impossible'],
              correctIndex: 1,
              explanation: 'Paystack and Flutterwave enable African creators to accept both local and international payments easily.',
            },
          ],
        },
      },
      {
        id: 'ebm-m4',
        title: 'Bookkeeping & Financial Literacy',
        lessons: [
          {
            id: 'ebm-m4-l1',
            title: 'Understanding Your Numbers',
            content: [
              'Revenue is all the money coming into the business; expenses are money going out; profit is what remains after expenses are subtracted from revenue. Many new entrepreneurs confuse revenue with profit, leading to overspending.',
              'Cash flow tracks the timing of money moving in and out — a business can be profitable on paper but still run out of cash if payments are delayed or expenses are front-loaded.',
              'Break-even is the point where total revenue equals total costs. Knowing your break-even number tells you exactly how much you need to sell before you start making real profit.',
            ],
            keyTakeaways: [
              'Profit and cash flow are different — a profitable business can still run out of cash.',
              'Knowing your break-even point tells you the minimum needed to stop losing money.',
            ],
          },
          {
            id: 'ebm-m4-l2',
            title: 'Simple Systems for Staying on Top of Finances',
            content: [
              'Separate personal and business money from the very beginning, even with a simple second account or wallet — mixing the two makes it nearly impossible to know if the business is actually profitable.',
              'A basic spreadsheet tracking income and expenses by category, updated weekly, is enough for most early-stage entrepreneurs — complex accounting software can come later as the business grows.',
              'Build a habit of a monthly financial review: look at revenue, expenses, and profit trends over time to catch problems early and make informed decisions about pricing or spending.',
            ],
            keyTakeaways: [
              'Keep personal and business finances separate from day one.',
              'A simple weekly-updated spreadsheet is enough to start tracking finances.',
            ],
          },
        ],
        quiz: {
          id: 'ebm-m4-quiz',
          questions: [
            {
              id: 'ebm-m4-q1',
              question: 'What is the key difference between profit and cash flow?',
              options: [
                'They are exactly the same thing',
                'Profit is revenue minus expenses; cash flow is the timing of money moving in and out',
                'Cash flow only applies to large corporations',
                'Profit is irrelevant to small businesses',
              ],
              correctIndex: 1,
              explanation: 'A business can be profitable on paper yet still face cash flow problems due to payment timing.',
            },
            {
              id: 'ebm-m4-q2',
              question: 'What does "break-even" mean?',
              options: [
                'The point where you stop working',
                'The point where total revenue equals total costs',
                'The maximum profit possible',
                'A type of business loan',
              ],
              correctIndex: 1,
              explanation: 'Break-even is where revenue covers all costs exactly, with no profit or loss yet.',
            },
            {
              id: 'ebm-m4-q3',
              question: 'Why is a monthly financial review recommended?',
              options: [
                'It is legally required for all businesses',
                'It helps catch problems early and informs pricing/spending decisions',
                'It replaces the need for tracking expenses at all',
                'It has no real benefit for small businesses',
              ],
              correctIndex: 1,
              explanation: 'Regularly reviewing the numbers helps entrepreneurs spot trends and react before small issues become big problems.',
            },
          ],
        },
      },
      {
        id: 'ebm-m5',
        title: 'Personal Branding & Passive Income',
        lessons: [
          {
            id: 'ebm-m5-l1',
            title: 'Building Authority & Trust Online',
            content: [
              'In a digital business, your personal brand is often the business — people buy from people they know, like, and trust before they buy a specific product or service.',
              'Authority is built by consistently sharing useful knowledge publicly, showing your work and results, and being visible in the spaces where your audience already gathers.',
              'Authenticity outperforms perfection: audiences connect more with a real, consistent voice than with an overly polished but impersonal brand.',
            ],
            keyTakeaways: [
              'Your personal brand and your business are often inseparable online.',
              'Consistent, authentic visibility builds authority faster than polished perfection.',
            ],
          },
          {
            id: 'ebm-m5-l2',
            title: 'Designing Passive Income Streams',
            content: [
              'Passive income is misunderstood as "money for no work" — in reality, it requires significant upfront work (creating a product, system, or asset) that continues generating income with reduced ongoing effort afterward.',
              'Digital products, online courses, affiliate marketing, and licensing content are common, accessible starting points for entrepreneurs building toward passive income.',
              'Passive income streams should be built around the audience and skills you already have, rather than chasing an unrelated trend — relevance compounds results faster than novelty.',
            ],
            keyTakeaways: [
              'Passive income requires real upfront effort before it becomes "passive."',
              'Build passive income around your existing audience and skills, not random trends.',
            ],
          },
        ],
        quiz: {
          id: 'ebm-m5-quiz',
          questions: [
            {
              id: 'ebm-m5-q1',
              question: 'Why is the personal brand often described as inseparable from the business?',
              options: [
                'Because logos are unimportant',
                'Because people buy from people they know, like, and trust',
                'Because personal branding has no real effect on sales',
                'Because all businesses must be anonymous',
              ],
              correctIndex: 1,
              explanation: 'Trust in the individual behind a brand strongly influences buying decisions, especially for solo entrepreneurs and creators.',
            },
            {
              id: 'ebm-m5-q2',
              question: 'What is a common misconception about passive income?',
              options: [
                'That it requires no upfront effort at all',
                'That it always involves real estate',
                'That it is illegal',
                'That it cannot be combined with active income',
              ],
              correctIndex: 0,
              explanation: 'Passive income requires substantial upfront work; the "passive" part only comes after the asset is built.',
            },
            {
              id: 'ebm-m5-q3',
              question: 'What is recommended as an accessible starting point for passive income?',
              options: [
                'Buying expensive real estate immediately',
                'Digital products built around your existing skills and audience',
                'Random unrelated trends with no connection to your skills',
                'Avoiding any form of online presence',
              ],
              correctIndex: 1,
              explanation: 'Digital products leverage existing skills and audience relevance, making them accessible and faster to launch.',
            },
          ],
        },
      },
      {
        id: 'ebm-m6',
        title: 'Mindset, Resilience & Financial Dominion',
        lessons: [
          {
            id: 'ebm-m6-l1',
            title: 'Growth Mindset & Overcoming Limiting Beliefs',
            content: [
              'A growth mindset treats skills and abilities as things that can be developed through effort, while a fixed mindset treats them as static traits — entrepreneurs with a growth mindset persist longer through setbacks.',
              'Limiting beliefs ("I\'m not techy enough," "people like me don\'t succeed at business") are often inherited assumptions rather than facts — naming them explicitly is the first step to challenging them.',
              'Resilience is built in small repeated decisions to keep going after a setback, not in one heroic moment — every entrepreneur experiences failed launches, slow months, and rejection.',
            ],
            keyTakeaways: [
              'A growth mindset treats abilities as developable, fueling persistence.',
              'Limiting beliefs are assumptions, not facts — name them to challenge them.',
            ],
          },
          {
            id: 'ebm-m6-l2',
            title: 'Stewardship & Long-Term Vision',
            content: [
              'Stewardship means managing what you currently have — time, money, relationships, skills — responsibly and intentionally, rather than waiting for "more" before acting wisely.',
              'A written vision document, even a simple one-page outline of where you want your business and life to be in 1, 3, and 5 years, keeps daily decisions aligned with long-term direction.',
              'Financial dominion is the practice of actively directing money toward purpose — budgeting, saving, giving, and investing intentionally — rather than letting money manage you reactively.',
            ],
            keyTakeaways: [
              'Stewardship is managing what you have now intentionally, not waiting for "more."',
              'A simple written vision document keeps daily decisions aligned long-term.',
            ],
          },
        ],
        quiz: {
          id: 'ebm-m6-quiz',
          questions: [
            {
              id: 'ebm-m6-q1',
              question: 'What distinguishes a growth mindset from a fixed mindset?',
              options: [
                'A growth mindset believes abilities are static',
                'A growth mindset believes abilities can be developed through effort',
                'There is no real difference',
                'A fixed mindset only applies to athletes',
              ],
              correctIndex: 1,
              explanation: 'Growth mindset entrepreneurs view skills as developable, which fuels persistence through setbacks.',
            },
            {
              id: 'ebm-m6-q2',
              question: 'What does "stewardship" mean in this context?',
              options: [
                'Waiting until you have more resources before acting',
                'Managing what you currently have responsibly and intentionally',
                'Ignoring your finances entirely',
                'Only applies to large companies',
              ],
              correctIndex: 1,
              explanation: 'Stewardship is about intentional, responsible management of current resources, not future hypothetical ones.',
            },
            {
              id: 'ebm-m6-q3',
              question: 'What is the benefit of writing a simple long-term vision document?',
              options: [
                'It guarantees success automatically',
                'It keeps daily decisions aligned with long-term direction',
                'It is required by investors before any funding',
                'It has no real practical use',
              ],
              correctIndex: 1,
              explanation: 'A written vision serves as a reference point so daily choices stay connected to bigger long-term goals.',
            },
          ],
        },
      },
    ],
  },

  // ============================================================
  // COURSE 3 — Foundational Digital Skills
  // ============================================================
  {
    id: 'digital-skills-foundations',
    slug: 'digital-skills-foundations',
    title: 'Foundational Digital Skills',
    description: 'Everyone starts here. Build the essential digital literacy, productivity tools, research habits, cybersecurity awareness, and time-management discipline every global remote professional needs.',
    skillIds: [],
    category: 'Digital Literacy',
    estimatedHours: 12,
    modules: [
      {
        id: 'dsf-m1',
        title: 'Digital Literacy & Professional Online Presence',
        lessons: [
          {
            id: 'dsf-m1-l1',
            title: 'What Digital Literacy Really Means',
            content: [
              'Digital literacy goes beyond knowing how to use apps — it includes being able to evaluate information critically, communicate professionally online, and navigate digital tools confidently to get real work done.',
              'Employers and clients increasingly assume baseline digital literacy: comfortable typing, organizing files, joining video calls, and troubleshooting basic technical issues independently.',
              'Digital literacy is a learnable skill set, not a fixed trait — anyone can systematically build it through practice with the right tools and a structured approach, regardless of their starting point.',
            ],
            keyTakeaways: [
              'Digital literacy includes critical evaluation and professional communication, not just app usage.',
              'It is a learnable, buildable skill set — not something you either have or don\'t.',
            ],
          },
          {
            id: 'dsf-m1-l2',
            title: 'Building Your Professional Presence in One Weekend',
            content: [
              'Start with an audit: search your own name online to see what currently appears, and decide what should be updated, added, or removed to look professional to a potential client or employer.',
              'A complete, professional LinkedIn profile (photo, headline, summary, experience) and a clean email address are often the minimum baseline expected before applying for remote work or freelance gigs.',
              'Consistency matters more than perfection — posting or engaging a few times a week on a professional platform signals activity and credibility far more than a single perfect post followed by silence.',
            ],
            keyTakeaways: [
              'Audit your current online presence before building it further.',
              'Post or engage consistently (3-5x/week) rather than aiming for rare perfection.',
            ],
          },
        ],
        quiz: {
          id: 'dsf-m1-quiz',
          questions: [
            {
              id: 'dsf-m1-q1',
              question: 'What does digital literacy include beyond basic app usage?',
              options: [
                'Nothing else — it is only about using apps',
                'Critical evaluation of information and professional online communication',
                'Only knowing how to type quickly',
                'Only knowing how to use social media',
              ],
              correctIndex: 1,
              explanation: 'Digital literacy includes evaluating information critically and communicating professionally, not just operating software.',
            },
            {
              id: 'dsf-m1-q2',
              question: 'What is the recommended first step before building a professional online presence?',
              options: [
                'Immediately create accounts on every platform',
                'Audit what currently appears when you search your own name',
                'Delete all existing online accounts',
                'Hire someone else to do it for you',
              ],
              correctIndex: 1,
              explanation: 'An audit reveals what already exists online so you know what to fix, remove, or build from there.',
            },
            {
              id: 'dsf-m1-q3',
              question: 'How often should you aim to post or engage on a professional platform like LinkedIn?',
              options: ['Once a year', 'Never', 'About 3-5 times per week', 'Only when applying for a job'],
              correctIndex: 2,
              explanation: 'Consistent activity (roughly 3-5x weekly) signals credibility better than rare, perfect posts.',
            },
          ],
        },
      },
      {
        id: 'dsf-m2',
        title: 'Productivity Tools (Google Workspace, Notion, Trello)',
        lessons: [
          {
            id: 'dsf-m2-l1',
            title: 'Google Workspace as Your Free Backbone',
            content: [
              'Google Docs, Sheets, and Slides are free, cloud-based, and automatically saved, making them a reliable backbone for remote work without needing expensive software licenses.',
              'Version history in Google Docs lets you see and restore every previous edit, which is invaluable when collaborating with clients or recovering from an accidental change.',
              'Google Drive\'s sharing and permission settings (view, comment, edit) let you control exactly how collaborators and clients interact with your files, which is essential for professional remote collaboration.',
            ],
            keyTakeaways: [
              'Google Workspace tools are free, cloud-based, and auto-saved.',
              'Version history lets you recover or review past edits safely.',
            ],
          },
          {
            id: 'dsf-m2-l2',
            title: 'Notion & Trello for Organizing Your Work',
            content: [
              'Notion is a flexible all-in-one workspace for notes, databases, and project tracking — but its flexibility can overwhelm beginners, so the recommended approach is to start simple with one page or list before building complex systems.',
              'Trello organizes work visually using boards, lists, and cards based on the Kanban method — useful for tracking tasks through stages like "To Do," "In Progress," and "Done."',
              'Choosing one tool and using it consistently is more valuable than trying every productivity app available; tool-switching often wastes more time than it saves.',
            ],
            keyTakeaways: [
              'Start simple in Notion before building complex systems.',
              'Trello uses the Kanban method — visual boards moving cards through stages.',
            ],
          },
        ],
        quiz: {
          id: 'dsf-m2-quiz',
          questions: [
            {
              id: 'dsf-m2-q1',
              question: 'What does version history in Google Docs allow you to do?',
              options: [
                'Delete the document permanently',
                'See and restore previous versions of the document',
                'Change the document\'s sharing permissions',
                'Convert the document to a spreadsheet',
              ],
              correctIndex: 1,
              explanation: 'Version history tracks every change, letting you view or restore earlier versions of a document.',
            },
            {
              id: 'dsf-m2-q2',
              question: 'What is the recommended approach for beginners using Notion?',
              options: [
                'Build the most complex system possible immediately',
                'Start simple with one page or list before expanding',
                'Avoid using it at all',
                'Only use it for personal journaling',
              ],
              correctIndex: 1,
              explanation: 'Notion\'s flexibility can overwhelm beginners, so starting simple prevents wasted setup time.',
            },
            {
              id: 'dsf-m2-q3',
              question: 'What organizational method does Trello use?',
              options: ['Spreadsheet formulas', 'The Kanban method with boards, lists, and cards', 'Email threads', 'Calendar invites only'],
              correctIndex: 1,
              explanation: 'Trello is built around the Kanban method, visually tracking tasks as cards moving through list stages.',
            },
          ],
        },
      },
      {
        id: 'dsf-m3',
        title: 'Internet Research & File Management',
        lessons: [
          {
            id: 'dsf-m3-l1',
            title: 'Searching Smarter & Evaluating Sources',
            content: [
              'Search operators like quotation marks for exact phrases, the minus sign to exclude terms, and "site:" to search within one specific website dramatically improve search precision and save research time.',
              'The CRAAP test — Currency, Relevance, Authority, Accuracy, Purpose — is a simple framework for evaluating whether an online source is trustworthy before relying on it.',
              'Cross-referencing claims across at least two independent sources is a basic habit that prevents spreading misinformation, especially when researching for clients or professional work.',
            ],
            keyTakeaways: [
              'Search operators (quotes, minus sign, site:) make research faster and more precise.',
              'The CRAAP test evaluates source trustworthiness across five criteria.',
            ],
          },
          {
            id: 'dsf-m3-l2',
            title: 'The PARA Method for File Organization',
            content: [
              'PARA organizes digital files into four top-level folders: Projects (active efforts with a deadline), Areas (ongoing responsibilities with no end date), Resources (reference material), and Archives (inactive or completed items).',
              'The key distinction between Projects and Areas is that Projects have a clear finish line, while Areas are ongoing — confusing the two is the most common mistake when first applying PARA.',
              'Consistent, simple file naming conventions (such as starting with a date or project name) make files easier to find later than relying on memory or folder browsing alone.',
            ],
            keyTakeaways: [
              'PARA organizes files into Projects, Areas, Resources, and Archives.',
              'Projects have a deadline; Areas are ongoing — distinguishing them is essential to PARA.',
            ],
          },
        ],
        quiz: {
          id: 'dsf-m3-quiz',
          questions: [
            {
              id: 'dsf-m3-q1',
              question: 'What does the "site:" search operator do?',
              options: [
                'Excludes a word from search results',
                'Searches only within one specific website',
                'Searches only for exact phrases',
                'Searches only for images',
              ],
              correctIndex: 1,
              explanation: 'The "site:" operator restricts search results to one specified website or domain.',
            },
            {
              id: 'dsf-m3-q2',
              question: 'What does the CRAAP test evaluate?',
              options: [
                'File storage capacity',
                'The trustworthiness of an online source',
                'Internet connection speed',
                'Email formatting',
              ],
              correctIndex: 1,
              explanation: 'CRAAP stands for Currency, Relevance, Authority, Accuracy, and Purpose — criteria for judging source credibility.',
            },
            {
              id: 'dsf-m3-q3',
              question: 'In the PARA method, what distinguishes "Projects" from "Areas"?',
              options: [
                'Projects have a deadline/finish line; Areas are ongoing with no end date',
                'There is no real difference',
                'Areas always come before Projects alphabetically',
                'Projects are only for personal use, Areas only for work',
              ],
              correctIndex: 0,
              explanation: 'Projects are finite efforts with a clear end, while Areas represent continuous ongoing responsibilities.',
            },
          ],
        },
      },
      {
        id: 'dsf-m4',
        title: 'Online Safety & Cybersecurity',
        lessons: [
          {
            id: 'dsf-m4-l1',
            title: 'Password Security & Two-Factor Authentication',
            content: [
              'A password manager generates and stores unique, complex passwords for every account, removing the need to memorize or reuse passwords — reused passwords are one of the most common causes of account breaches.',
              'Two-factor authentication (2FA) adds a second verification step beyond your password, dramatically reducing the chance of unauthorized account access even if your password is stolen.',
              'App-based authenticators (like Google Authenticator or Authy) are generally more secure than SMS-based 2FA, since SMS codes can be intercepted through SIM-swapping attacks.',
            ],
            keyTakeaways: [
              'A password manager prevents the security risk of reused passwords.',
              'App-based 2FA is generally more secure than SMS-based 2FA.',
            ],
          },
          {
            id: 'dsf-m4-l2',
            title: 'Recognising Scams & Protecting Your Digital Footprint',
            content: [
              'Common scam warning signs include urgency ("act now or lose access"), requests for payment in gift cards or crypto, unfamiliar senders with generic greetings, and links that don\'t match the claimed sender\'s real domain.',
              'Your digital footprint is the trail of data you leave through every post, search, app, and account — both visible (your posts) and invisible (tracking data collected by services you use).',
              'Regularly reviewing app permissions, privacy settings, and what information is publicly visible on your profiles is a simple habit that meaningfully reduces your exposure to scams and data misuse.',
            ],
            keyTakeaways: [
              'Urgency, unusual payment requests, and mismatched links are classic scam warning signs.',
              'Your digital footprint includes both visible posts and invisible tracking data.',
            ],
          },
        ],
        quiz: {
          id: 'dsf-m4-quiz',
          questions: [
            {
              id: 'dsf-m4-q1',
              question: 'Why is app-based two-factor authentication generally more secure than SMS-based 2FA?',
              options: [
                'It is not actually more secure',
                'SMS codes can be intercepted through SIM-swapping attacks',
                'App-based 2FA requires no phone at all',
                'SMS-based 2FA is faster',
              ],
              correctIndex: 1,
              explanation: 'SIM-swapping attacks can intercept SMS codes, making app-based authenticators a more secure option.',
            },
            {
              id: 'dsf-m4-q2',
              question: 'Which of these is a classic scam warning sign?',
              options: [
                'A calm, no-pressure request with plenty of time to respond',
                'Urgency demanding immediate action plus unusual payment requests like gift cards',
                'A message from a known, verified colleague',
                'A link that matches the sender\'s real, verified domain',
              ],
              correctIndex: 1,
              explanation: 'Urgency combined with unusual payment demands (gift cards, crypto) is a hallmark of scam attempts.',
            },
            {
              id: 'dsf-m4-q3',
              question: 'What is a "digital footprint"?',
              options: [
                'Your physical computer hardware',
                'The trail of visible and invisible data you leave through online activity',
                'A type of antivirus software',
                'A backup file format',
              ],
              correctIndex: 1,
              explanation: 'A digital footprint includes both your visible posts and the invisible tracking data collected as you use online services.',
            },
          ],
        },
      },
      {
        id: 'dsf-m5',
        title: 'Time Management & Remote Work Discipline',
        lessons: [
          {
            id: 'dsf-m5-l1',
            title: 'The Eisenhower Matrix & Pomodoro Technique',
            content: [
              'The Eisenhower Matrix sorts tasks into four quadrants by urgency and importance. The most overlooked quadrant — "Important but Not Urgent" — contains the long-term, high-value work (skill-building, planning, relationship-building) that gets crowded out by constant urgent demands.',
              'The Pomodoro Technique structures work into focused 25-minute intervals followed by a short 5-minute break, helping maintain concentration and prevent burnout during long work sessions.',
              'Remote workers without a structured schedule often struggle more with self-discipline than with skill — these simple frameworks provide external structure that replaces an office\'s natural routine.',
            ],
            keyTakeaways: [
              '"Important but Not Urgent" tasks deserve protected time despite lacking deadlines.',
              'Pomodoro uses 25-minute focus intervals with 5-minute breaks.',
            ],
          },
          {
            id: 'dsf-m5-l2',
            title: 'Building Sustainable Habits & Avoiding Burnout',
            content: [
              'Remote work removes the natural start/end boundaries of an office, making it essential to deliberately create routines — a consistent start time, designated workspace, and clear "end of day" ritual.',
              'Rest is not the opposite of productivity — it is part of it. Scheduled breaks and full days off prevent the burnout that erodes work quality and consistency over the long term.',
              'Small, sustainable daily habits (a fixed wake time, a short planning session each morning) compound into far greater long-term consistency than occasional bursts of intense, unsustainable effort.',
            ],
            keyTakeaways: [
              'Deliberately create work boundaries that an office would otherwise provide naturally.',
              'Rest is part of sustainable productivity, not opposed to it.',
            ],
          },
        ],
        quiz: {
          id: 'dsf-m5-quiz',
          questions: [
            {
              id: 'dsf-m5-q1',
              question: 'Which Eisenhower Matrix quadrant is most commonly overlooked, despite holding high long-term value?',
              options: ['Urgent and Important', 'Important but Not Urgent', 'Urgent but Not Important', 'Not Urgent and Not Important'],
              correctIndex: 1,
              explanation: 'Important-but-not-urgent work (skill-building, planning) often gets crowded out by constant urgent demands, despite its long-term value.',
            },
            {
              id: 'dsf-m5-q2',
              question: 'How long is a standard Pomodoro focus interval?',
              options: ['5 minutes', '15 minutes', '25 minutes', '60 minutes'],
              correctIndex: 2,
              explanation: 'The Pomodoro Technique uses 25-minute focused work intervals followed by a 5-minute break.',
            },
            {
              id: 'dsf-m5-q3',
              question: 'How is rest framed in relation to productivity in this module?',
              options: [
                'Rest is the opposite of productivity and should be minimized',
                'Rest is part of sustainable productivity, preventing burnout',
                'Rest is irrelevant to remote work',
                'Rest should only happen once a year',
              ],
              correctIndex: 1,
              explanation: 'Scheduled rest prevents burnout and supports long-term consistency, making it part of productivity rather than opposed to it.',
            },
          ],
        },
      },
    ],
  },

  // ============================================================
  // COURSE 4 — Freelancing & Remote Work Mastery
  // ============================================================
  {
    id: 'freelancing-mastery',
    slug: 'freelancing-mastery',
    title: 'Freelancing & Remote Work Mastery',
    description: 'Go from zero to booked: build the freelance mindset, optimize your profiles, create a winning portfolio, pitch with proposals that convert, price with confidence, and scale gigs into a real business.',
    skillIds: ['virtual-assistance'],
    category: 'Freelancing',
    estimatedHours: 14,
    modules: [
      {
        id: 'frm-m1',
        title: 'Freelance Mindset & Niche Selection',
        lessons: [
          {
            id: 'frm-m1-l1',
            title: 'The Freelance Opportunity & Mindset Shift',
            content: [
              'Freelancing requires a fundamental mindset shift from "employee" to "business owner" — you are now responsible for finding clients, managing finances, and delivering results without a manager directing your day.',
              'Global platforms like Upwork and Fiverr have made it genuinely possible for skilled people anywhere in the world, including across Africa, to earn in dollars by serving international clients.',
              'Income inconsistency is a normal part of early freelancing, not a sign of failure — building toward more predictable income (retainers, repeat clients) takes deliberate strategy over time, covered later in this course.',
            ],
            keyTakeaways: [
              'Freelancing requires an employee-to-business-owner mindset shift.',
              'Early income inconsistency is normal, not a sign you are doing something wrong.',
            ],
          },
          {
            id: 'frm-m1-l2',
            title: 'Choosing Your Services & Niche',
            content: [
              'Niching down — focusing on a specific service for a specific type of client (e.g., "email copywriting for e-commerce brands" rather than "writing") — makes you easier to refer, market, and charge a premium for, because expertise feels more valuable than general capability.',
              'Choose a niche at the intersection of what you are skilled at, what you enjoy enough to sustain, and what clients are demonstrably willing to pay for — validated by browsing real job posts before committing.',
              'It is normal and healthy to refine your niche over your first several months of freelancing as you learn what you enjoy and what clients value most from you.',
            ],
            keyTakeaways: [
              'Niching down makes you easier to market and command higher rates.',
              'Validate your niche against real client demand, not assumptions.',
            ],
          },
        ],
        quiz: {
          id: 'frm-m1-quiz',
          questions: [
            {
              id: 'frm-m1-q1',
              question: 'What mindset shift does freelancing require compared to traditional employment?',
              options: [
                'No mindset shift is needed',
                'Shifting from employee to business owner, responsible for clients and results',
                'Becoming less responsible for outcomes',
                'Working only when a manager assigns tasks',
              ],
              correctIndex: 1,
              explanation: 'Freelancers must take on responsibilities a manager would normally handle — finding clients, managing money, and delivering results independently.',
            },
            {
              id: 'frm-m1-q2',
              question: 'Why is "niching down" recommended for new freelancers?',
              options: [
                'It makes you harder to find',
                'It makes you easier to market and supports charging premium rates',
                'It guarantees instant success',
                'It eliminates the need for a portfolio',
              ],
              correctIndex: 1,
              explanation: 'A specific niche signals expertise, which makes referrals and marketing easier and supports higher pricing.',
            },
            {
              id: 'frm-m1-q3',
              question: 'How is income inconsistency in early freelancing best understood?',
              options: [
                'As a sign of failure that means you should quit',
                'As a normal early-stage challenge that improves with strategy over time',
                'As something that never improves',
                'As irrelevant to freelancing',
              ],
              correctIndex: 1,
              explanation: 'Inconsistent income is typical early on; building retainers and repeat clients over time creates more predictability.',
            },
          ],
        },
      },
      {
        id: 'frm-m2',
        title: 'Professional Profiles & Portfolio',
        lessons: [
          {
            id: 'frm-m2-l1',
            title: 'Optimizing Upwork & Fiverr Profiles',
            content: [
              'A strong freelance profile leads with the client\'s outcome, not your job title — "I help e-commerce brands write emails that increase repeat sales" outperforms "Freelance Copywriter" as a headline.',
              'On Fiverr, gig presentation (clear thumbnail, structured description, relevant tags, and transparent pricing tiers) heavily influences whether buyers click and convert, since gigs compete visually in search results.',
              'A professional profile photo, complete skills list, and verified identity/payment details all increase trust and are often the deciding factor between two similarly priced freelancers.',
            ],
            keyTakeaways: [
              'Lead your headline with the client\'s outcome, not just your job title.',
              'On Fiverr, gig presentation (thumbnail, tags, tiers) strongly affects conversion.',
            ],
          },
          {
            id: 'frm-m2-l2',
            title: 'Building a Portfolio That Wins Jobs',
            content: [
              'A portfolio case study should follow a simple structure: the client\'s problem, what you specifically did, and the measurable result achieved — this structure is far more persuasive than simply showing a finished file.',
              'With limited paid experience, pro bono work for a local business, spec/sample projects, or personal projects can all serve as legitimate portfolio pieces while you build a track record.',
              'Quality over quantity applies strongly to portfolios — three to five excellent, well-explained pieces outperform fifteen mediocre ones that dilute the impression of your skill level.',
            ],
            keyTakeaways: [
              'Structure case studies as problem → action → measurable result.',
              'Pro bono and spec work are legitimate ways to build a portfolio with limited experience.',
            ],
          },
        ],
        quiz: {
          id: 'frm-m2-quiz',
          questions: [
            {
              id: 'frm-m2-q1',
              question: 'What heavily influences buyer clicks and conversion on Fiverr?',
              options: [
                'The freelancer\'s home country only',
                'Gig presentation — thumbnail, description, tags, and pricing tiers',
                'The time of day the gig was created',
                'Nothing — all gigs perform identically',
              ],
              correctIndex: 1,
              explanation: 'Since gigs compete visually in search results, presentation elements like thumbnails and tiers strongly affect click-through and conversion.',
            },
            {
              id: 'frm-m2-q2',
              question: 'What is the recommended structure for a portfolio case study?',
              options: [
                'Just show the finished file with no context',
                'Problem, what you did, and the measurable result',
                'A list of every tool you used',
                'Only client testimonials with no work shown',
              ],
              correctIndex: 1,
              explanation: 'A problem-action-result structure tells a persuasive story that demonstrates real value delivered.',
            },
            {
              id: 'frm-m2-q3',
              question: 'How can a freelancer with limited paid experience still build a credible portfolio?',
              options: [
                'They cannot — a portfolio requires years of paid work',
                'Through pro bono, spec, or personal projects',
                'By only listing job titles with no examples',
                'By copying someone else\'s portfolio work',
              ],
              correctIndex: 1,
              explanation: 'Pro bono, spec, and personal projects are legitimate, common ways to build an early portfolio.',
            },
          ],
        },
      },
      {
        id: 'frm-m3',
        title: 'Proposal Writing & Pitching',
        lessons: [
          {
            id: 'frm-m3-l1',
            title: 'Anatomy of a Winning Proposal',
            content: [
              'A winning proposal opens by restating the client\'s specific problem in your own words, proving you actually read and understood their job post rather than sending a generic template.',
              'The body should briefly connect your relevant experience or a similar past result directly to their specific need, followed by a clear, simple next step (a question, a call to action, or availability).',
              'The single most common mistake new freelancers make is sending the same generic proposal to every job post — clients can spot copy-paste pitches immediately and they rarely win work.',
            ],
            keyTakeaways: [
              'Open by restating the client\'s specific problem to prove genuine understanding.',
              'Generic, copy-pasted proposals are the most common reason freelancers fail to win work.',
            ],
          },
          {
            id: 'frm-m3-l2',
            title: 'Customizing Proposals That Get Responses',
            content: [
              'Spend two to three minutes researching the client or company before writing a proposal — a single specific, relevant detail referenced in your pitch dramatically increases response rates.',
              'Keep proposals concise; clients reviewing dozens of pitches respond better to a clear, scannable message than a long essay about your entire career history.',
              'For higher-ticket projects, offering a short discovery call rather than committing to scope and price immediately allows both sides to clarify needs and builds trust before a bigger commitment.',
            ],
            keyTakeaways: [
              'A few minutes of client research and one specific detail referenced can dramatically raise response rates.',
              'Discovery calls work well for higher-ticket projects before committing to scope/price.',
            ],
          },
        ],
        quiz: {
          id: 'frm-m3-quiz',
          questions: [
            {
              id: 'frm-m3-q1',
              question: 'What is the most common mistake new freelancers make in proposals?',
              options: [
                'Customizing every proposal too much',
                'Sending the same generic proposal to every job post',
                'Asking too many questions',
                'Researching the client too thoroughly',
              ],
              correctIndex: 1,
              explanation: 'Generic, copy-pasted proposals are easily spotted by clients and rarely lead to winning work.',
            },
            {
              id: 'frm-m3-q2',
              question: 'What is a strong way to open a winning proposal?',
              options: [
                'List your full resume in detail',
                'Restate the client\'s specific problem in your own words',
                'Ask for payment upfront',
                'Apologize for your lack of experience',
              ],
              correctIndex: 1,
              explanation: 'Restating the client\'s problem proves you actually understood their post, which builds immediate credibility.',
            },
            {
              id: 'frm-m3-q3',
              question: 'Why are discovery calls useful for higher-ticket projects?',
              options: [
                'They waste the client\'s time',
                'They let both sides clarify needs and build trust before a bigger commitment',
                'They are required by every freelance platform',
                'They replace the need for a proposal entirely',
              ],
              correctIndex: 1,
              explanation: 'Discovery calls allow clarity and trust-building before committing to scope and pricing on larger projects.',
            },
          ],
        },
      },
      {
        id: 'frm-m4',
        title: 'Pricing & Negotiation',
        lessons: [
          {
            id: 'frm-m4-l1',
            title: 'Choosing the Right Pricing Model',
            content: [
              'Hourly pricing is simple and transparent but can penalize efficient freelancers, since faster work means less pay for the same outcome delivered.',
              'Fixed-price pricing works well for clearly scoped, well-defined projects but carries risk if scope is not tightly documented in advance.',
              'Retainers (a fixed monthly fee for ongoing work) provide predictable income and are ideal once trust is established with a recurring client.',
              'Value-based pricing charges based on the result delivered to the client\'s business rather than hours worked, often the most profitable model — but it requires confidence, experience, and a track record of measurable results to use effectively.',
            ],
            keyTakeaways: [
              'Hourly, fixed-price, retainer, and value-based pricing each fit different situations.',
              'Value-based pricing is often most profitable but requires a track record to use confidently.',
            ],
          },
          {
            id: 'frm-m4-l2',
            title: 'Negotiating Without Undervaluing Yourself',
            content: [
              'Underpricing tends to attract more demanding, less respectful clients, since rock-bottom prices often signal desperation rather than expertise — fair pricing filters for better client relationships.',
              'Know your floor price (the lowest you can accept and still feel good about the work) before any negotiation begins, so you don\'t make a rushed, regrettable decision under pressure.',
              'When a client pushes back on price, offering to adjust scope (fewer revisions, smaller deliverable) rather than simply dropping the price preserves your rate while still being flexible.',
            ],
            keyTakeaways: [
              'Underpricing often attracts more difficult clients, not better ones.',
              'Know your floor price before negotiating, and adjust scope rather than just cutting price.',
            ],
          },
        ],
        quiz: {
          id: 'frm-m4-quiz',
          questions: [
            {
              id: 'frm-m4-q1',
              question: 'What is a downside of pure hourly pricing for skilled, efficient freelancers?',
              options: [
                'It pays too much for simple work',
                'Working faster/more efficiently means earning less for the same outcome',
                'It cannot be used on freelance platforms',
                'Clients never accept hourly pricing',
              ],
              correctIndex: 1,
              explanation: 'Hourly pricing can penalize efficiency since faster delivery of the same result yields lower pay.',
            },
            {
              id: 'frm-m4-q2',
              question: 'What tends to happen when freelancers underprice their services?',
              options: [
                'They attract more respectful, easier clients',
                'They tend to attract more demanding, difficult clients',
                'Underpricing has no effect on client behavior',
                'Underpricing always leads to more total income',
              ],
              correctIndex: 1,
              explanation: 'Very low prices often signal desperation and tend to attract clients who are harder to work with.',
            },
            {
              id: 'frm-m4-q3',
              question: 'What should you know before entering a price negotiation?',
              options: [
                'Nothing in particular — just accept whatever the client offers',
                'Your floor price — the lowest you can accept and still feel good about it',
                'Only the client\'s budget, not your own limits',
                'The exact price every competitor charges',
              ],
              correctIndex: 1,
              explanation: 'Knowing your floor price in advance prevents rushed, regrettable decisions under negotiation pressure.',
            },
          ],
        },
      },
      {
        id: 'frm-m5',
        title: 'Client Communication & Project Management',
        lessons: [
          {
            id: 'frm-m5-l1',
            title: 'Professional Communication Standards',
            content: [
              'Responding to client messages within 24 hours, even just to acknowledge receipt and give a timeline, is a widely expected professional standard that builds significant trust.',
              'Clear, proactive updates — flagging delays or questions before they become problems — prevent the majority of client misunderstandings before they escalate.',
              'Written communication (email, project management tools) should be preferred over verbal-only agreements for anything related to scope, deadlines, or pricing, since it creates a clear record both sides can reference.',
            ],
            keyTakeaways: [
              'Respond within 24 hours as a baseline professional standard.',
              'Put scope, deadlines, and pricing agreements in writing, not just verbal discussion.',
            ],
          },
          {
            id: 'frm-m5-l2',
            title: 'Preventing Scope Creep & Handling Difficult Clients',
            content: [
              'Scope creep — when a client gradually asks for more than originally agreed — is best prevented by having a clearly written scope of work from the start that both sides reference when new requests appear.',
              'When facing scope creep, calmly referencing the original written agreement and offering the additional work as a paid add-on protects your time without damaging the relationship.',
              'With genuinely difficult clients, maintaining calm, factual, written communication — and being willing to end the engagement professionally when necessary — protects your reputation and well-being better than escalating conflict.',
            ],
            keyTakeaways: [
              'A clearly written scope of work is your main defense against scope creep.',
              'Stay calm and factual in writing, and be willing to end engagements professionally if needed.',
            ],
          },
        ],
        quiz: {
          id: 'frm-m5-quiz',
          questions: [
            {
              id: 'frm-m5-q1',
              question: 'What is considered a baseline professional response time for client messages?',
              options: ['Within a week', 'Within 24 hours', 'Within a month', 'No response time matters'],
              correctIndex: 1,
              explanation: 'Responding within roughly 24 hours, even just to acknowledge and give a timeline, is a widely expected standard.',
            },
            {
              id: 'frm-m5-q2',
              question: 'What is the main defense against scope creep?',
              options: [
                'Avoiding any written agreement to stay flexible',
                'A clearly written scope of work referenced when new requests appear',
                'Always saying no to every client request',
                'Never discussing scope with the client',
              ],
              correctIndex: 1,
              explanation: 'A written scope of work gives a clear reference point to identify and address out-of-scope requests.',
            },
            {
              id: 'frm-m5-q3',
              question: 'Why should agreements about scope, deadlines, and pricing be documented in writing?',
              options: [
                'It is not necessary if you trust the client',
                'It creates a clear record both sides can reference, preventing disputes',
                'Written records are illegal in freelancing',
                'Verbal agreements are always sufficient',
              ],
              correctIndex: 1,
              explanation: 'Written records reduce misunderstandings by giving both parties a clear, referenceable agreement.',
            },
          ],
        },
      },
      {
        id: 'frm-m6',
        title: 'Contracts, Finance & Scaling',
        lessons: [
          {
            id: 'frm-m6-l1',
            title: 'Contracts, Invoicing & Getting Paid',
            content: [
              'A basic freelance contract should cover scope of work, deliverables, timeline, payment terms (amount, schedule, method), and what happens if the project is cancelled or changes significantly.',
              'Requesting a deposit (commonly 30-50%) before starting larger projects protects freelancers from doing unpaid work if a client disappears mid-project.',
              'Payment platforms such as Paystack and Flutterwave allow African freelancers to invoice and receive payment from local clients easily, while platforms like Payoneer and Wise support receiving international client payments.',
            ],
            keyTakeaways: [
              'A contract should cover scope, deliverables, timeline, and payment terms at minimum.',
              'A deposit before starting larger projects protects against non-payment risk.',
            ],
          },
          {
            id: 'frm-m6-l2',
            title: 'Scaling From Gigs to a Real Business',
            content: [
              'Scaling beyond one-off gigs typically means moving toward retainers and repeat clients, raising rates as your portfolio and confidence grow, and building referral relationships that bring in work without active searching.',
              'Documenting your processes (templates, checklists, standard onboarding messages) saves significant time as you take on more clients and makes it possible to eventually delegate or hire help.',
              'The long-term goal for many successful freelancers is building systems and, eventually, a small team or agency — transitioning from trading hours for money toward owning a scalable service business.',
            ],
            keyTakeaways: [
              'Scaling means moving toward retainers, repeat clients, and rising rates over time.',
              'Documented processes/systems make it possible to delegate and eventually build a team.',
            ],
          },
        ],
        quiz: {
          id: 'frm-m6-quiz',
          questions: [
            {
              id: 'frm-m6-q1',
              question: 'What should a basic freelance contract cover at minimum?',
              options: [
                'Only the client\'s contact information',
                'Scope of work, deliverables, timeline, and payment terms',
                'Only the freelancer\'s personal opinions about the project',
                'Nothing — verbal agreements are always sufficient',
              ],
              correctIndex: 1,
              explanation: 'A contract should clearly define scope, deliverables, timeline, and payment terms to protect both parties.',
            },
            {
              id: 'frm-m6-q2',
              question: 'Which tools are mentioned for African freelancers to invoice and receive local client payments?',
              options: ['Only cash payments', 'Paystack and Flutterwave', 'Only cryptocurrency wallets', 'There are no available tools'],
              correctIndex: 1,
              explanation: 'Paystack and Flutterwave are commonly used by African freelancers to invoice and receive payments locally.',
            },
            {
              id: 'frm-m6-q3',
              question: 'What does "scaling from gigs to a real business" typically involve?',
              options: [
                'Avoiding all repeat clients',
                'Moving toward retainers, repeat clients, rising rates, and documented systems',
                'Only taking one-off projects forever',
                'Lowering prices as you gain more experience',
              ],
              correctIndex: 1,
              explanation: 'Scaling involves building predictable income through retainers/repeat clients and creating systems that support growth.',
            },
          ],
        },
      },
    ],
  },

  // ============================================================
  // COURSE 5 — Cybersecurity Fundamentals
  // ============================================================
  {
    id: 'cybersecurity-fundamentals',
    slug: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals: Protect, Detect, and Defend',
    description:
      'A complete, hands-on introduction to cybersecurity — from how networks and attackers actually work to passwords, phishing, malware, ethical hacking basics, and the certifications and career paths that can turn this skill into global, remote income.',
    skillIds: [],
    category: 'Cybersecurity',
    estimatedHours: 16,
    modules: [
      {
        id: 'cyb-m1',
        title: 'Module 1: Why Cybersecurity Matters',
        lessons: [
          {
            id: 'cyb-m1-l1',
            title: 'The Modern Threat Landscape',
            content: [
              'Every business, government, and individual that uses the internet is a potential target — and the cost of getting security wrong is rising every year, from stolen customer data to ransomware payments that can shut a company down overnight. Cybersecurity is the practice of protecting systems, networks, and data from unauthorized access, damage, or theft, and it sits at the intersection of technology, psychology, and risk management, because most successful attacks exploit human behavior just as much as technical flaws.',
              'Three core principles, often called the CIA triad, anchor almost every security decision: Confidentiality (only authorized people can see the data), Integrity (the data has not been tampered with), and Availability (the data and systems are accessible when needed). A ransomware attack, for example, primarily violates Availability by locking you out of your own files, while a data breach primarily violates Confidentiality by exposing information to people who should never have seen it.',
              'For Nigerians and Africans entering tech, cybersecurity is one of the fastest-growing, most remote-friendly fields available — companies worldwide are short-staffed on security talent and routinely hire remote analysts, testers, and engineers regardless of location, because the work (monitoring systems, testing defenses, responding to incidents) can be done entirely online. This course builds your foundation from the ground up, with no assumed prior technical background.',
            ],
            keyTakeaways: [
              'Cybersecurity protects systems, networks, and data from unauthorized access, damage, or theft.',
              'The CIA triad — Confidentiality, Integrity, Availability — frames almost every security decision and attack.',
              'Cybersecurity is one of the most remote-friendly, globally in-demand tech fields, making it highly accessible from Nigeria.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m1-quiz',
          questions: [
            {
              id: 'cyb-m1-q1',
              question: 'What do the three letters in the CIA triad stand for?',
              options: [
                'Confidentiality, Integrity, Availability',
                'Computers, Internet, Access',
                'Control, Identity, Authorization',
                'Cybersecurity, Information, Assets',
              ],
              correctIndex: 0,
              explanation: 'The CIA triad — Confidentiality, Integrity, Availability — is the foundational model for security goals.',
            },
            {
              id: 'cyb-m1-q2',
              question: 'A ransomware attack that locks a company out of its own files primarily violates which principle?',
              options: ['Confidentiality', 'Availability', 'Integrity', 'None of the three'],
              correctIndex: 1,
              explanation: 'Locking legitimate users out of their systems/data is primarily an attack on Availability.',
            },
            {
              id: 'cyb-m1-q3',
              question: 'Why is cybersecurity considered especially accessible to Nigerians entering tech?',
              options: [
                'It requires no internet connection',
                'Much of the work can be done remotely and global demand for security talent far exceeds supply',
                'It is only available to people with engineering degrees',
                'It is not a real career field',
              ],
              correctIndex: 1,
              explanation: 'Remote-friendly roles and a global talent shortage make cybersecurity highly accessible regardless of location.',
            },
          ],
        },
      },
      {
        id: 'cyb-m2',
        title: 'Module 2: How Networks Actually Work',
        lessons: [
          {
            id: 'cyb-m2-l1',
            title: 'Networking Foundations for Security',
            content: [
              'You cannot defend a network you do not understand, so this lesson builds the minimum networking knowledge every security professional needs. Every device on the internet has an IP address (a numeric identifier, like a postal address for data), and data travels between devices in small packets, each carrying a destination address, a source address, and a piece of the overall message — much like a long letter cut into numbered envelopes and reassembled at the other end.',
              'The OSI model breaks networking into seven layers, but as a beginner you only need to grasp the practical layers: the Network layer (where IP addresses and routing live), the Transport layer (where TCP and UDP manage how reliably data is delivered), and the Application layer (where the actual programs — web browsers, email clients — operate). Ports act like numbered doors on a device: port 80 is the standard door for unencrypted web traffic, port 443 for encrypted web traffic (HTTPS), and port 22 for secure remote login (SSH) — attackers scan for open, unguarded ports the same way a burglar checks for unlocked doors.',
              'Firewalls, routers, and switches are the basic infrastructure that controls and directs this traffic: a firewall decides what traffic is allowed in or out based on rules, a router moves data between different networks, and a switch moves data between devices on the same local network. Understanding this flow — device, port, packet, firewall rule — is the lens through which almost every later module (attacks, defenses, tools) will make sense.',
            ],
            keyTakeaways: [
              'Data travels across networks in packets, each tagged with source and destination IP addresses.',
              'Ports function like numbered doors on a device — port 443 for HTTPS, port 22 for SSH, and so on — and attackers scan for open, unguarded ones.',
              'Firewalls, routers, and switches form the basic infrastructure that controls how traffic moves and what is allowed through.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m2-quiz',
          questions: [
            {
              id: 'cyb-m2-q1',
              question: 'What is the main function of an IP address?',
              options: [
                'It encrypts all data automatically',
                'It uniquely identifies a device on a network, like a postal address',
                'It blocks all incoming traffic',
                'It only matters for printers',
              ],
              correctIndex: 1,
              explanation: 'IP addresses identify devices on a network so data knows where to go.',
            },
            {
              id: 'cyb-m2-q2',
              question: 'Which port is the standard for encrypted web traffic (HTTPS)?',
              options: ['Port 21', 'Port 443', 'Port 25', 'Port 110'],
              correctIndex: 1,
              explanation: 'Port 443 is the standard port for HTTPS (encrypted web traffic); port 80 is for unencrypted HTTP.',
            },
            {
              id: 'cyb-m2-q3',
              question: 'What does a firewall do?',
              options: [
                'It physically destroys malware',
                'It decides what network traffic is allowed in or out based on rules',
                'It speeds up your internet connection',
                'It replaces the need for a router',
              ],
              correctIndex: 1,
              explanation: 'A firewall filters traffic according to security rules, allowing or blocking it accordingly.',
            },
          ],
        },
      },
      {
        id: 'cyb-m3',
        title: 'Module 3: Malware — Know Your Enemy',
        lessons: [
          {
            id: 'cyb-m3-l1',
            title: 'Types of Malicious Software',
            content: [
              'Malware (malicious software) is any program designed to harm, exploit, or gain unauthorized access to a system, and recognizing the different categories helps you understand both how attacks happen and how to defend against them. Viruses attach themselves to legitimate files and spread when those files are shared or executed; worms are self-replicating and spread across networks without needing a human to click anything; trojans disguise themselves as legitimate software while secretly performing malicious actions in the background.',
              'Ransomware encrypts a victim\'s files and demands payment (often in cryptocurrency) for the decryption key — one of the most financially destructive malware types for businesses today. Spyware quietly monitors and reports a victim\'s activity (keystrokes, browsing, even camera/microphone access) back to an attacker, while adware floods a system with unwanted advertisements, and rootkits bury themselves deep in a system to hide other malware and resist removal.',
              'In practice, most malware infections start the same way regardless of type: an unsuspecting user clicks a malicious link, opens an infected attachment, downloads pirated software, or plugs in an infected USB drive. This is why later modules on phishing and social engineering matter just as much as technical defenses — the strongest firewall in the world cannot stop an employee from clicking a convincing fake invoice.',
            ],
            keyTakeaways: [
              'Malware includes viruses, worms, trojans, ransomware, spyware, adware, and rootkits — each with a distinct method of spreading or causing harm.',
              'Ransomware encrypts files and demands payment for the decryption key, making it especially damaging to businesses.',
              'Most infections begin with human action — a clicked link, opened attachment, or infected USB — not a purely technical exploit.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m3-quiz',
          questions: [
            {
              id: 'cyb-m3-q1',
              question: 'What distinguishes a worm from a virus?',
              options: [
                'A worm cannot spread at all',
                'A worm self-replicates and spreads across networks without needing a human to click anything',
                'A worm only affects printers',
                'There is no difference',
              ],
              correctIndex: 1,
              explanation: 'Worms spread autonomously across networks, while viruses need a host file to be shared or run.',
            },
            {
              id: 'cyb-m3-q2',
              question: 'What does ransomware typically do?',
              options: [
                'It speeds up your computer',
                'It encrypts files and demands payment for the decryption key',
                'It only displays advertisements',
                'It has no real effect on files',
              ],
              correctIndex: 1,
              explanation: 'Ransomware locks victims out of their own files via encryption until a ransom is paid.',
            },
            {
              id: 'cyb-m3-q3',
              question: 'What is the most common starting point for a malware infection?',
              options: [
                'A purely technical, unavoidable exploit',
                'Human action, such as clicking a malicious link or opening an infected attachment',
                'Malware that appears with no cause at all',
                'Malware can only infect systems without internet access',
              ],
              correctIndex: 1,
              explanation: 'Most infections begin with a human action that a defender could otherwise have prevented through awareness.',
            },
          ],
        },
      },
      {
        id: 'cyb-m4',
        title: 'Module 4: Social Engineering & Phishing',
        lessons: [
          {
            id: 'cyb-m4-l1',
            title: 'Hacking the Human, Not Just the Machine',
            content: [
              'Social engineering is the manipulation of human psychology to trick someone into giving up confidential information, access, or money — and it is consistently the single most effective attack technique because it bypasses technology entirely and targets trust, urgency, fear, and authority instead. Phishing, the most common form, uses fake emails, messages, or websites that impersonate a trusted source (a bank, an employer, a delivery company) to trick the victim into clicking a malicious link or entering credentials on a fake login page.',
              'Variants worth knowing by name include spear phishing (a highly personalized attack targeting one specific person, often using real details scraped from social media), vishing (phishing conducted over a phone call), smishing (phishing via SMS text message), and pretexting (the attacker invents a believable fake scenario — "I\'m calling from IT support" — to extract information or access). Nigerian users are frequent targets of fake bank alert SMS messages and fraudulent job offers, both of which follow the exact same psychological playbook taught in this lesson.',
              'The reliable defense against social engineering is a simple habit, not a piece of software: always verify the sender through a separate, trusted channel before acting on any urgent request involving money, credentials, or sensitive data. Hover over links before clicking to see the real destination URL, check sender email addresses character by character for subtle misspellings, and treat any message that creates artificial urgency ("act now or your account will be closed") as an immediate red flag.',
            ],
            keyTakeaways: [
              'Social engineering manipulates human psychology and is the single most effective category of cyberattack.',
              'Phishing, spear phishing, vishing, smishing, and pretexting are the core variants every defender should recognize by name.',
              'Verifying requests through a separate trusted channel and treating urgency as a red flag are the most reliable human-level defenses.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m4-quiz',
          questions: [
            {
              id: 'cyb-m4-q1',
              question: 'What does social engineering primarily exploit?',
              options: [
                'Hardware failures',
                'Human psychology — trust, urgency, fear, and authority',
                'Weak encryption algorithms only',
                'Outdated operating systems exclusively',
              ],
              correctIndex: 1,
              explanation: 'Social engineering bypasses technical defenses by manipulating human behavior and decision-making.',
            },
            {
              id: 'cyb-m4-q2',
              question: 'What is "spear phishing"?',
              options: [
                'A generic mass email sent to thousands of random people',
                'A highly personalized phishing attack targeting one specific person',
                'A type of antivirus software',
                'A firewall configuration setting',
              ],
              correctIndex: 1,
              explanation: 'Spear phishing is tailored to a specific individual using personal details to increase believability.',
            },
            {
              id: 'cyb-m4-q3',
              question: 'What is the most reliable defense against social engineering described in this lesson?',
              options: [
                'Installing more antivirus software',
                'Verifying urgent requests through a separate, trusted channel before acting',
                'Ignoring all emails permanently',
                'There is no reliable defense',
              ],
              correctIndex: 1,
              explanation: 'Independently verifying a request before acting defeats most social engineering tactics, regardless of how convincing they appear.',
            },
          ],
        },
      },
      {
        id: 'cyb-m5',
        title: 'Module 5: Password & Identity Security',
        lessons: [
          {
            id: 'cyb-m5-l1',
            title: 'Protecting Access to Your Accounts',
            content: [
              'Passwords remain the most common — and most commonly broken — line of defense protecting an account. Weak passwords fail in two main ways: they are easy to guess (birthdays, names, "123456", "password") or they are reused across multiple sites, meaning a single breach on one unrelated website can expose your login on every other site where you used the same password. A strong password is long (14+ characters), unique to each account, and ideally randomly generated rather than memorable, since memorable passwords are also the easiest for attackers to guess or crack.',
              'A password manager (such as Bitwarden, 1Password, or the password manager built into most browsers) solves the practical problem of needing dozens of unique, complex passwords without memorizing them — you remember one strong master password, and the manager generates and recalls the rest. Multi-factor authentication (MFA) adds a second proof of identity beyond the password itself — typically a time-based code from an app like Google Authenticator, or a push notification to your phone — meaning that even if an attacker steals your password, they still cannot log in without also having your phone.',
              'For anyone serious about security, the priority order is: enable MFA on every account that offers it (email, banking, and social media first), switch to a password manager and let it generate unique passwords for every account, and never reuse a password across more than one service. These three habits alone prevent the overwhelming majority of account takeovers, regardless of how sophisticated the attacker is.',
            ],
            keyTakeaways: [
              'Weak passwords fail by being guessable or reused across multiple sites — a single breach can then compromise many accounts at once.',
              'Password managers let you use long, unique, randomly generated passwords for every account while only memorizing one master password.',
              'Multi-factor authentication (MFA) blocks most account takeovers even when a password is stolen, because it requires a second proof of identity.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m5-quiz',
          questions: [
            {
              id: 'cyb-m5-q1',
              question: 'Why is reusing the same password across multiple sites dangerous?',
              options: [
                'It is not actually dangerous',
                'A breach on one site can expose your login credentials on every other site using that same password',
                'It makes your password automatically longer',
                'It only affects the original site',
              ],
              correctIndex: 1,
              explanation: 'Credential reuse means a single breach can cascade into multiple compromised accounts.',
            },
            {
              id: 'cyb-m5-q2',
              question: 'What problem does a password manager solve?',
              options: [
                'It prevents you from ever needing the internet',
                'It lets you use long, unique passwords for every account without having to memorize them all',
                'It guarantees you will never be hacked',
                'It replaces the need for any password at all',
              ],
              correctIndex: 1,
              explanation: 'Password managers generate and recall unique credentials per site, removing the temptation to reuse simple passwords.',
            },
            {
              id: 'cyb-m5-q3',
              question: 'Why does multi-factor authentication (MFA) stop most account takeovers?',
              options: [
                'It makes passwords unnecessary',
                'It requires a second proof of identity, so a stolen password alone is not enough to log in',
                'It slows down your internet connection as a side effect',
                'It has no real security benefit',
              ],
              correctIndex: 1,
              explanation: 'MFA requires something beyond the password (like a phone-based code), blocking access even if the password is compromised.',
            },
          ],
        },
      },
      {
        id: 'cyb-m6',
        title: 'Module 6: Cryptography Basics',
        lessons: [
          {
            id: 'cyb-m6-l1',
            title: 'How Encryption Protects Data',
            content: [
              'Cryptography is the practice of scrambling data so that only authorized parties can read it, and it underlies nearly every secure system you use daily — from HTTPS websites to encrypted messaging apps. Encryption transforms readable "plaintext" into unreadable "ciphertext" using a mathematical algorithm and a key; decryption reverses the process, but only for someone who holds the correct key.',
              'Two broad categories matter at a foundational level: symmetric encryption uses the same key to encrypt and decrypt (fast, but the key must be shared securely between both parties beforehand), while asymmetric encryption uses a public key (which anyone can use to encrypt a message to you) paired with a private key (which only you hold, and which is the only thing that can decrypt it). HTTPS, the padlock icon you see in your browser, relies on asymmetric encryption to securely establish a connection, then switches to faster symmetric encryption for the actual data transfer — combining the strengths of both.',
              'Hashing is a related but different concept worth distinguishing clearly: a hash is a one-way fingerprint of data (you cannot reverse a hash back into the original data), which is why websites store hashed passwords instead of the actual password — even if a database is stolen, the attacker gets scrambled fingerprints, not your real password. Understanding this distinction between encryption (reversible, with a key) and hashing (irreversible, used for verification) will make every later module on web security and data protection click into place.',
            ],
            keyTakeaways: [
              'Encryption scrambles plaintext into ciphertext using a key, and can be reversed by decryption with the correct key.',
              'Symmetric encryption uses one shared key; asymmetric encryption uses a public/private key pair, and HTTPS combines both.',
              'Hashing is a one-way, irreversible fingerprint used to verify data (like stored passwords) without ever storing the original value.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m6-quiz',
          questions: [
            {
              id: 'cyb-m6-q1',
              question: 'What is the key difference between symmetric and asymmetric encryption?',
              options: [
                'Symmetric encryption uses one shared key; asymmetric encryption uses a public/private key pair',
                'They are identical in every way',
                'Asymmetric encryption cannot be used for HTTPS',
                'Symmetric encryption is never used in practice',
              ],
              correctIndex: 0,
              explanation: 'Symmetric encryption relies on one shared key, while asymmetric uses a public key for encryption and a private key for decryption.',
            },
            {
              id: 'cyb-m6-q2',
              question: 'Why do websites store hashed passwords instead of the actual password?',
              options: [
                'Hashing makes passwords load faster',
                'A hash is a one-way fingerprint, so even a stolen database does not reveal the real password',
                'Hashing is required by law in every country',
                'There is no real reason for this practice',
              ],
              correctIndex: 1,
              explanation: 'Hashing is irreversible, so a database breach exposes only scrambled fingerprints, not usable passwords.',
            },
            {
              id: 'cyb-m6-q3',
              question: 'What does the padlock icon in a browser (HTTPS) rely on to establish a secure connection?',
              options: [
                'No encryption at all',
                'Asymmetric encryption to establish the connection, then symmetric encryption for the data transfer',
                'A single password shared by all websites',
                'Hashing alone, with no encryption involved',
              ],
              correctIndex: 1,
              explanation: 'HTTPS uses asymmetric encryption to securely set up the connection, then symmetric encryption for fast ongoing data transfer.',
            },
          ],
        },
      },
      {
        id: 'cyb-m7',
        title: 'Module 7: Web Application Security',
        lessons: [
          {
            id: 'cyb-m7-l1',
            title: 'Common Vulnerabilities in Websites and Apps',
            content: [
              'Websites and web apps are among the most attacked targets online, because they are publicly accessible by design and often built quickly without security as a priority. SQL injection is one of the oldest and most damaging vulnerabilities: it happens when an application inserts unfiltered user input directly into a database query, letting an attacker type malicious code into a form field (like a login box) to manipulate the database — potentially extracting an entire user table or bypassing login entirely.',
              'Cross-Site Scripting (XSS) happens when an attacker injects malicious script into a webpage that other users then unknowingly execute in their own browser — for example, a comment field that does not sanitize input could let an attacker steal other visitors\' session cookies. Cross-Site Request Forgery (CSRF) tricks a logged-in user\'s browser into performing an unwanted action on a site they are authenticated to, by exploiting the fact that browsers automatically attach saved login credentials to requests.',
              'The common thread across nearly all web vulnerabilities is unvalidated trust in user input — every one of these attacks works because the application trusted data it should have checked first. The practical defense, even for non-developers evaluating a site\'s security, is to look for HTTPS, check whether forms behave oddly when you input unusual characters (without ever testing this on a site you don\'t own or have permission to test), and understand that responsible developers validate and sanitize every piece of input before it touches a database or gets displayed to other users.',
            ],
            keyTakeaways: [
              'SQL injection exploits unfiltered user input to manipulate or extract data directly from a database.',
              'Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) both exploit how browsers handle scripts and stored credentials.',
              'Nearly all web vulnerabilities trace back to one root cause: unvalidated trust in user input.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m7-quiz',
          questions: [
            {
              id: 'cyb-m7-q1',
              question: 'What is SQL injection?',
              options: [
                'A way to speed up a database',
                'Inserting malicious input into a query to manipulate or extract data from a database',
                'A type of antivirus software',
                'A method for encrypting passwords',
              ],
              correctIndex: 1,
              explanation: 'SQL injection exploits unfiltered input to manipulate the underlying database query.',
            },
            {
              id: 'cyb-m7-q2',
              question: 'What does Cross-Site Scripting (XSS) typically allow an attacker to do?',
              options: [
                'Physically access a server',
                'Inject malicious script that runs in other users\' browsers, potentially stealing session data',
                'Permanently shut down the internet',
                'Nothing of consequence',
              ],
              correctIndex: 1,
              explanation: 'XSS lets attackers run malicious scripts in the context of other users\' browser sessions.',
            },
            {
              id: 'cyb-m7-q3',
              question: 'What is the common root cause behind most web application vulnerabilities described in this lesson?',
              options: [
                'Too much encryption',
                'Unvalidated trust in user input',
                'Using HTTPS',
                'Having too many users',
              ],
              correctIndex: 1,
              explanation: 'SQL injection, XSS, and CSRF all stem from applications trusting input they should have validated first.',
            },
          ],
        },
      },
      {
        id: 'cyb-m8',
        title: 'Module 8: Network Defense & Security Tools',
        lessons: [
          {
            id: 'cyb-m8-l1',
            title: 'Building a Layered Defense',
            content: [
              'No single tool or control stops every attack, which is why security professionals build "defense in depth" — multiple overlapping layers, so that if one fails, another catches the threat. Firewalls (covered earlier) filter traffic at the network boundary; antivirus and endpoint detection software monitor individual devices for known malware signatures and suspicious behavior; and a VPN (Virtual Private Network) encrypts your internet traffic and masks your real IP address, protecting you especially on public or untrusted Wi-Fi networks.',
              'Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS) monitor network traffic for suspicious patterns — an IDS alerts a human analyst when something looks wrong, while an IPS can automatically block the suspicious traffic in real time. Security Information and Event Management (SIEM) tools aggregate logs from across an entire organization\'s systems into one place, so analysts can spot patterns across thousands of events that would be invisible looking at any single log alone.',
              'For a beginner building practical skill, free tools worth learning hands-on include Wireshark (captures and analyzes network traffic packet by packet), Nmap (scans networks to discover devices and open ports), and a virtual lab environment like VirtualBox running a deliberately vulnerable practice machine — always within a legal, isolated lab setup you control, never against systems you do not own or have explicit written permission to test.',
            ],
            keyTakeaways: [
              '"Defense in depth" means layering firewalls, antivirus, VPNs, and monitoring tools so no single point of failure compromises the whole system.',
              'IDS detects and alerts on suspicious traffic, while IPS can automatically block it in real time.',
              'Wireshark, Nmap, and an isolated virtual lab are foundational free tools for hands-on practice — always within systems you own or are authorized to test.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m8-quiz',
          questions: [
            {
              id: 'cyb-m8-q1',
              question: 'What does "defense in depth" mean?',
              options: [
                'Relying on a single, very strong security tool',
                'Layering multiple overlapping security controls so no single failure compromises the whole system',
                'Ignoring network security entirely',
                'Only securing physical office doors',
              ],
              correctIndex: 1,
              explanation: 'Defense in depth combines multiple layers of protection so that if one fails, others still provide coverage.',
            },
            {
              id: 'cyb-m8-q2',
              question: 'What is the difference between an IDS and an IPS?',
              options: [
                'They are exactly the same thing',
                'An IDS alerts analysts to suspicious traffic; an IPS can automatically block it in real time',
                'An IDS blocks traffic; an IPS only logs it',
                'Neither tool monitors network traffic',
              ],
              correctIndex: 1,
              explanation: 'IDS is detection/alerting; IPS adds automatic, real-time blocking of detected threats.',
            },
            {
              id: 'cyb-m8-q3',
              question: 'Where should beginners practice tools like Nmap and Wireshark?',
              options: [
                'Against any random public website',
                'Only within an isolated virtual lab or systems they own/are authorized to test',
                'Against their employer\'s production servers without permission',
                'It does not matter where you practice',
              ],
              correctIndex: 1,
              explanation: 'Scanning or testing systems without explicit authorization is illegal — practice must stay within owned or authorized lab environments.',
            },
          ],
        },
      },
      {
        id: 'cyb-m9',
        title: 'Module 9: Ethical Hacking & Penetration Testing',
        lessons: [
          {
            id: 'cyb-m9-l1',
            title: 'Thinking Like an Attacker, Legally',
            content: [
              'Ethical hacking means using the same techniques real attackers use, but with explicit written authorization, a defined scope, and the goal of finding and reporting vulnerabilities before a malicious actor does. The legal authorization is non-negotiable: testing any system without documented permission is a crime in virtually every country, regardless of your intentions — the entire profession exists because organizations formally hire testers to do this work safely and legally.',
              'A typical penetration test follows five phases: Reconnaissance (gathering public information about the target), Scanning (identifying live systems, open ports, and services using tools like Nmap), Exploitation (attempting to actually use a discovered vulnerability to gain access, within the agreed scope), Post-Exploitation (assessing what an attacker could do once inside — escalate privileges, move to other systems, access sensitive data), and Reporting (the most important deliverable — a clear, actionable writeup explaining each vulnerability, its risk level, and exactly how to fix it).',
              'A bug bounty program is a related, increasingly popular path: companies like those on HackerOne and Bugcrowd publicly invite ethical hackers to find vulnerabilities in their systems in exchange for a cash reward per valid finding, all within clearly published rules of engagement. For a beginner, the realistic entry path is: build foundational skills (Modules 1-8 of this course), practice extensively in legal lab environments (platforms like TryHackMe and HackTheBox offer beginner-friendly, fully legal practice targets), and only then attempt bug bounty programs or pursue a junior penetration testing role.',
            ],
            keyTakeaways: [
              'Ethical hacking requires explicit written authorization and a defined scope — testing without permission is illegal everywhere.',
              'A penetration test follows five phases: Reconnaissance, Scanning, Exploitation, Post-Exploitation, and Reporting — with Reporting being the most valuable deliverable to the client.',
              'Legal practice platforms (TryHackTheBox, TryHackMe) and bug bounty programs (HackerOne, Bugcrowd) offer realistic, legitimate paths into the field.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m9-quiz',
          questions: [
            {
              id: 'cyb-m9-q1',
              question: 'What makes ethical hacking legal, where the same actions by someone else would be a crime?',
              options: [
                'Nothing — it is always illegal',
                'Explicit written authorization and a clearly defined scope from the system owner',
                'Using a VPN during the test',
                'Only targeting small companies',
              ],
              correctIndex: 1,
              explanation: 'Documented permission and scope are what legally distinguish ethical hacking from a criminal intrusion.',
            },
            {
              id: 'cyb-m9-q2',
              question: 'Which phase of a penetration test is described as the most important deliverable to the client?',
              options: ['Reconnaissance', 'Scanning', 'Reporting', 'Post-Exploitation'],
              correctIndex: 2,
              explanation: 'A clear, actionable report explaining vulnerabilities and fixes is what the client actually pays for and acts on.',
            },
            {
              id: 'cyb-m9-q3',
              question: 'What is a bug bounty program?',
              options: [
                'An illegal hacking competition',
                'A program where companies pay ethical hackers a reward for legally reported, valid vulnerabilities',
                'A type of malware',
                'A government surveillance tool',
              ],
              correctIndex: 1,
              explanation: 'Bug bounty programs like those on HackerOne and Bugcrowd reward legitimate, authorized vulnerability reports.',
            },
          ],
        },
      },
      {
        id: 'cyb-m10',
        title: 'Module 10: Cloud & Mobile Security',
        lessons: [
          {
            id: 'cyb-m10-l1',
            title: 'Securing Modern, Distributed Systems',
            content: [
              'Most modern businesses run on cloud platforms (AWS, Google Cloud, Microsoft Azure) rather than physical servers, which changes the security model significantly. The "shared responsibility model" is the key concept: the cloud provider secures the underlying infrastructure (physical data centers, hardware, core network), while the customer is responsible for securing what they put on top of it — configuring access permissions correctly, encrypting their own data, and patching their own applications. Most major cloud breaches happen not because the provider failed, but because a customer misconfigured something, such as leaving a storage bucket publicly accessible by mistake.',
              'Mobile security has its own distinct concerns: apps requesting excessive permissions (a simple flashlight app asking for access to your contacts and location is a red flag), unofficial app stores and sideloaded apps that bypass official security review, and public Wi-Fi networks that can expose unencrypted mobile traffic to anyone else on the same network. Keeping a phone\'s operating system updated, only installing apps from official stores, and reviewing app permissions periodically are simple but effective mobile defenses.',
              'For Nigerians specifically, mobile banking apps and USSD codes are common attack targets — SIM-swap fraud (where an attacker convinces a mobile carrier to transfer your phone number to their SIM card, then intercepts your one-time passwords) is a real, documented threat. Defenses include using an authenticator app instead of SMS for two-factor codes where possible, setting a PIN with your mobile carrier to prevent unauthorized SIM swaps, and never sharing OTPs (one-time passwords) with anyone, including someone claiming to be from your bank.',
            ],
            keyTakeaways: [
              'The cloud "shared responsibility model" means the provider secures the infrastructure, but the customer must correctly secure their own configuration, data, and access permissions.',
              'Mobile security risks include excessive app permissions, sideloaded apps, and unencrypted public Wi-Fi traffic.',
              'SIM-swap fraud is a real, documented threat in Nigeria — authenticator apps, carrier PINs, and never sharing OTPs are key defenses.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m10-quiz',
          questions: [
            {
              id: 'cyb-m10-q1',
              question: 'In the cloud shared responsibility model, who is typically responsible for configuring access permissions correctly?',
              options: [
                'The cloud provider only',
                'The customer using the cloud service',
                'Nobody — it configures itself automatically',
                'A random third party',
              ],
              correctIndex: 1,
              explanation: 'The provider secures the infrastructure; the customer is responsible for their own configuration and data security.',
            },
            {
              id: 'cyb-m10-q2',
              question: 'What is a red flag regarding mobile app permissions?',
              options: [
                'A messaging app requesting access to contacts',
                'A simple flashlight app requesting access to contacts and location',
                'A navigation app requesting location access',
                'There are no red flags with app permissions',
              ],
              correctIndex: 1,
              explanation: 'Apps requesting permissions unrelated to their stated function are a common sign of overreach or malicious intent.',
            },
            {
              id: 'cyb-m10-q3',
              question: 'What is SIM-swap fraud?',
              options: [
                'Physically stealing a SIM card',
                'Tricking a mobile carrier into transferring a victim\'s phone number to the attacker\'s SIM to intercept OTPs',
                'A type of antivirus software',
                'A legitimate banking feature',
              ],
              correctIndex: 1,
              explanation: 'SIM-swap fraud lets attackers intercept one-time passwords by hijacking the victim\'s phone number.',
            },
          ],
        },
      },
      {
        id: 'cyb-m11',
        title: 'Module 11: Incident Response & Recovery',
        lessons: [
          {
            id: 'cyb-m11-l1',
            title: 'What to Do When an Attack Happens',
            content: [
              'No defense is perfect, so every organization needs a plan for what happens after an attack succeeds — this is called incident response, and how well it is handled often determines whether a breach is a minor disruption or a business-ending event. The standard incident response lifecycle has six phases: Preparation (having a plan, tools, and trained people ready before anything happens), Identification (recognizing that an incident is actually occurring), Containment (stopping the attack from spreading further, such as isolating an infected device from the network), Eradication (removing the malware or closing the vulnerability that caused the incident), Recovery (safely restoring affected systems to normal operation), and Lessons Learned (documenting what happened and improving defenses to prevent a repeat).',
              'Speed and discipline matter enormously during containment — disconnecting an infected machine from the network immediately can be the difference between losing one device and losing an entire company\'s data, but acting without a plan can also destroy evidence needed to understand what happened or accidentally tip off an attacker who is still active in the network. This is why "Preparation" is listed first: organizations that have already defined roles, contacts, and step-by-step procedures respond far faster and with far less damage than those improvising in the moment of a crisis.',
              'For an individual (not just an organization), a personal incident response plan is just as valuable: know in advance which numbers to call if your bank card or phone is compromised, keep backups of important files completely separate from your main device (so ransomware on your laptop cannot also encrypt your backup), and change passwords immediately and from a different, trusted device if you suspect any account has been compromised — never from the potentially compromised device itself.',
            ],
            keyTakeaways: [
              'The incident response lifecycle has six phases: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned.',
              'Fast, disciplined containment limits damage, but acting without a plan can destroy evidence or alert an attacker still active in the network.',
              'Individuals benefit from their own informal incident response plan — known emergency contacts, separate backups, and changing passwords from a trusted, separate device.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m11-quiz',
          questions: [
            {
              id: 'cyb-m11-q1',
              question: 'Which phase of incident response comes first, before any incident even occurs?',
              options: ['Recovery', 'Preparation', 'Eradication', 'Containment'],
              correctIndex: 1,
              explanation: 'Preparation — having plans, tools, and trained people ready in advance — is the foundation of effective incident response.',
            },
            {
              id: 'cyb-m11-q2',
              question: 'What does "Containment" aim to achieve during an incident?',
              options: [
                'Permanently delete all company data',
                'Stop the attack from spreading further, such as isolating an infected device',
                'Document lessons learned after the fact',
                'Restore normal operations immediately without any other steps',
              ],
              correctIndex: 1,
              explanation: 'Containment focuses on limiting the spread and impact of an ongoing incident.',
            },
            {
              id: 'cyb-m11-q3',
              question: 'Why should backups be kept separate from your main device?',
              options: [
                'It has no real benefit',
                'So ransomware on the main device cannot also encrypt or destroy the backup',
                'Separate backups are required by law',
                'It makes your main device run faster',
              ],
              correctIndex: 1,
              explanation: 'Keeping backups isolated prevents a single ransomware infection from destroying both the original and backup copies.',
            },
          ],
        },
      },
      {
        id: 'cyb-m12',
        title: 'Module 12: Careers, Certifications, and Your Next 90 Days',
        lessons: [
          {
            id: 'cyb-m12-l1',
            title: 'Turning This Course Into a Career',
            content: [
              'Cybersecurity offers multiple realistic entry-level roles for someone who has completed a foundational course like this one: a Security Operations Center (SOC) Analyst monitors alerts and logs for suspicious activity around the clock; a Penetration Tester (building on Module 9) is hired to legally attack systems and report vulnerabilities; a GRC (Governance, Risk, and Compliance) Analyst focuses on policies, audits, and regulatory requirements rather than hands-on technical attacks; and a Security Awareness Trainer teaches employees at organizations to recognize phishing and social engineering, directly applying Module 4.',
              'Industry-recognized certifications can accelerate hiring even without a four-year degree: CompTIA Security+ is the most common entry-level certification employers screen for; Certified Ethical Hacker (CEH) focuses specifically on offensive security skills; and for those leaning toward hands-on penetration testing, the OSCP (Offensive Security Certified Professional) is widely respected, though more advanced and typically pursued after some practical experience. Free practice platforms like TryHackMe and HackTheBox let you build real, demonstrable skills (and a portfolio of completed challenges) well before you can afford any paid certification exam.',
              'For your 90-day roadmap: in Days 1-30, complete this course fully, set up a free TryHackMe or HackTheBox account, and complete at least five beginner-level rooms or challenges; in Days 31-60, study toward CompTIA Security+ using free or low-cost resources, and start documenting your practice work publicly (a simple blog or LinkedIn posts about what you are learning builds visibility with recruiters); in Days 61-90, take the Security+ exam if ready, apply to entry-level SOC analyst or security internship roles (many are remote-friendly), and continue building your practice platform portfolio as ongoing proof of skill. This course is a foundation, not a finish line — the field rewards continuous, hands-on learning far more than any single credential.',
            ],
            keyTakeaways: [
              'Entry-level cybersecurity roles include SOC Analyst, Penetration Tester, GRC Analyst, and Security Awareness Trainer — each building on different modules of this course.',
              'CompTIA Security+ is the most common entry-level certification, with CEH and OSCP as respected paths for more offensive-security-focused careers.',
              'A 90-day roadmap of course completion, hands-on practice (TryHackMe/HackTheBox), certification study, and public skill documentation is a realistic path into the field.',
            ],
          },
        ],
        quiz: {
          id: 'cyb-m12-quiz',
          questions: [
            {
              id: 'cyb-m12-q1',
              question: 'Which role focuses on monitoring alerts and logs for suspicious activity?',
              options: ['GRC Analyst', 'SOC Analyst', 'Security Awareness Trainer', 'None of these'],
              correctIndex: 1,
              explanation: 'A Security Operations Center (SOC) Analyst is responsible for ongoing monitoring and alert triage.',
            },
            {
              id: 'cyb-m12-q2',
              question: 'Which certification is described as the most common entry-level credential employers screen for?',
              options: ['OSCP', 'CompTIA Security+', 'A university PhD', 'There is no common entry-level certification'],
              correctIndex: 1,
              explanation: 'CompTIA Security+ is widely recognized as a standard entry-level cybersecurity certification.',
            },
            {
              id: 'cyb-m12-q3',
              question: 'What is recommended for Days 1-30 of the 90-day roadmap?',
              options: [
                'Immediately apply for senior security roles',
                'Complete this course, set up a free practice platform account, and complete beginner challenges',
                'Take the OSCP exam first',
                'Wait without taking any action',
              ],
              correctIndex: 1,
              explanation: 'The roadmap starts with finishing the foundational course and beginning hands-on practice before pursuing certifications or jobs.',
            },
          ],
        },
      },
    ],
  },
];

module.exports = { COURSES };
