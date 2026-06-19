const COURSES = [
  // ============================================================
  // MAIN COURSE — Affiliate Marketing Mastery
  // ============================================================
  {
    id: 'affiliate-marketing-mastery',
    slug: 'affiliate-marketing-mastery',
    title: 'Affiliate Marketing Mastery: A Complete Beginner-to-Earner Course',
    description:
      'Earn in dollars promoting other people\'s products — niche selection, traffic, funnels, and your first sale.',
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
    description: 'Plan, write, and grow content that builds an audience and pays in dollars — copywriting, social, SEO, and email.',
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
    description: 'Build a purpose-driven business — validate ideas, sell digital products, manage finances, and build a brand.',
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
    description: 'Everyone starts here — digital literacy, productivity tools, and the habits every remote professional needs.',
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
    description: 'Go from zero to booked — winning profiles, portfolios, proposals that convert, and confident pricing.',
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
      'A hands-on intro to cybersecurity — networks, malware, phishing, ethical hacking, and remote career paths.',
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

  // ============================================================
  // COURSE 6 — Web Development Fundamentals
  // ============================================================
  {
    id: 'web-development-fundamentals',
    slug: 'web-development-fundamentals',
    title: 'Web Development Fundamentals: Build, Style, and Ship Real Websites',
    description:
      'A beginner-to-job-ready path through HTML, CSS, JavaScript, Git, and deployment to build real websites.',
    skillIds: ['web-development'],
    category: 'Web Development',
    estimatedHours: 20,
    modules: [
      {
        id: 'wdf-m1',
        title: 'Module 1: How the Web Actually Works',
        lessons: [
          {
            id: 'wdf-m1-l1',
            title: 'Clients, Servers, and the Request-Response Cycle',
            content: [
              'Every time you visit a website, your browser (the "client") sends a request to a server somewhere in the world, asking for a specific page; the server processes that request and sends back a response — usually an HTML file plus the CSS and JavaScript needed to display it. This back-and-forth is called the request-response cycle, and understanding it demystifies almost everything that follows in this course, because every website you will ever build is just a more sophisticated version of this same basic exchange.',
              'A URL (Uniform Resource Locator) is the address you type or click to make this request — it specifies the protocol (https://), the domain (the server\'s human-readable name, like example.com), and often a specific path (/about) pointing to a particular page or resource on that server. The protocol HTTPS is the secure, encrypted version of HTTP, and modern browsers actively warn users away from sites that don\'t use it — which is why every site you build professionally should use HTTPS by default.',
              'As a web developer, you will typically work on the "front end" (what the user sees and interacts with directly in the browser — HTML, CSS, JavaScript) and sometimes the "back end" (the server-side logic, databases, and APIs that power the front end behind the scenes). This course focuses primarily on front-end fundamentals first, since that is the fastest path to building and shipping something real, with enough back-end context (Module 6) to understand how the two connect.',
            ],
            keyTakeaways: [
              'Every website visit is a request-response cycle between a client (browser) and a server.',
              'A URL specifies the protocol, domain, and path used to locate a specific resource on a server.',
              'Front-end development (HTML/CSS/JS, what users see) and back-end development (server logic/databases) work together to power a complete website.',
            ],
          },
          {
            id: 'wdf-m1-l2',
            title: 'Setting Up Your Developer Environment',
            content: [
              'Before writing any code, you need three basic tools: a code editor (Visual Studio Code is the free, industry-standard choice, with built-in syntax highlighting and extensions for nearly every language), a modern web browser with developer tools (Chrome or Firefox both include a built-in "Inspect" panel that lets you view and debug HTML, CSS, and JavaScript live on any page), and a way to preview your work locally — either by opening an HTML file directly in your browser, or using a lightweight local server extension like "Live Server" in VS Code, which automatically refreshes the page whenever you save a change.',
              'Organizing your project files matters from day one: keep a dedicated project folder with a clear structure (typically an index.html file at the root, a css folder for stylesheets, and a js folder for scripts), since messy file organization becomes a real obstacle once a project grows beyond a single page. Get comfortable using your browser\'s developer tools early — right-click any element on any website and choose "Inspect" to see exactly how it was built, which is one of the fastest ways to learn real-world techniques from sites you admire.',
              'As your first hands-on task, install VS Code, install the Live Server extension, create a project folder with an empty index.html file, and get it displaying "Hello, World!" in your browser using Live Server\'s auto-refresh. This small exercise confirms your entire toolchain works correctly before you build anything more complex in the modules ahead.',
            ],
            keyTakeaways: [
              'A code editor (VS Code), a modern browser with dev tools, and a local preview method are the three essential setup tools.',
              'Browser developer tools let you inspect and learn from the HTML/CSS/JS of any live website.',
              'A clean, organized project folder structure (index.html, css/, js/) prevents confusion as projects grow.',
            ],
          },
        ],
        quiz: {
          id: 'wdf-m1-quiz',
          questions: [
            {
              id: 'wdf-m1-q1',
              question: 'What happens during the "request-response cycle"?',
              options: [
                'The browser deletes the website automatically',
                'The browser (client) requests a page and the server sends back a response such as HTML, CSS, and JavaScript',
                'The server requests data from the browser only',
                'Nothing is exchanged between client and server',
              ],
              correctIndex: 1,
              explanation: 'Every page load is a client request answered by a server response containing the page\'s content.',
            },
            {
              id: 'wdf-m1-q2',
              question: 'What does HTTPS provide compared to plain HTTP?',
              options: [
                'Faster loading with no other benefit',
                'An encrypted, secure connection between browser and server',
                'It removes the need for a domain name',
                'It only works for images',
              ],
              correctIndex: 1,
              explanation: 'HTTPS encrypts the connection, protecting data in transit between client and server.',
            },
            {
              id: 'wdf-m1-q3',
              question: 'Which tool lets you inspect and debug the HTML/CSS/JS of any live webpage?',
              options: ['A spreadsheet program', 'Browser developer tools', 'A word processor', 'An email client'],
              correctIndex: 1,
              explanation: 'Browser developer tools (Inspect panel) reveal the underlying code and structure of any page you visit.',
            },
          ],
        },
      },
      {
        id: 'wdf-m2',
        title: 'Module 2: HTML — Structuring Your Content',
        lessons: [
          {
            id: 'wdf-m2-l1',
            title: 'HTML Elements, Tags, and Document Structure',
            content: [
              'HTML (HyperText Markup Language) is the skeleton of every webpage — it doesn\'t make anything look pretty, but it defines what each piece of content is: a heading, a paragraph, an image, a link, or a list. Every HTML element is written as a tag, usually in an opening-and-closing pair like `<p>Your text here</p>`, and elements can nest inside one another to build up a complete page structure, much like folders nesting inside folders.',
              'Every HTML document follows the same basic skeleton: a `<!DOCTYPE html>` declaration at the very top tells the browser this is a modern HTML document, followed by an `<html>` tag wrapping everything, a `<head>` section containing metadata (like the page title and links to stylesheets) that is not directly visible to the user, and a `<body>` section containing everything the user actually sees and interacts with. Common content tags include headings (`<h1>` through `<h6>`, in decreasing importance), paragraphs (`<p>`), images (`<img>`), links (`<a>`), and lists (`<ul>` for bullet lists, `<ol>` for numbered lists, with `<li>` for each item).',
              'Semantic HTML — using tags that describe their actual purpose, like `<nav>` for navigation, `<header>` for a page header, `<main>` for the primary content, and `<footer>` for the footer — matters for two practical reasons: it helps search engines understand and rank your page correctly, and it helps screen readers make your site usable for people with visual impairments. As your assignment, build a simple one-page HTML document about yourself with a heading, two paragraphs, a list of three skills, and a link to a site you like — using semantic tags throughout.',
            ],
            keyTakeaways: [
              'HTML defines the structure and meaning of content using nested elements/tags — not visual styling.',
              'Every HTML document follows the doctype → html → head → body skeleton.',
              'Semantic tags (nav, header, main, footer) improve both SEO and accessibility for screen reader users.',
            ],
          },
          {
            id: 'wdf-m2-l2',
            title: 'Forms, Attributes, and Building a Real Page',
            content: [
              'HTML attributes add extra information to a tag without changing what the tag fundamentally is — for example, an `<img>` tag needs a `src` attribute pointing to the image file and an `alt` attribute describing the image for accessibility and for cases when the image fails to load. An `<a>` tag (a link) needs an `href` attribute specifying the destination URL, and can include a `target="_blank"` attribute to open that link in a new tab.',
              'Forms are how websites collect input from users — a `<form>` element wraps input fields like `<input type="text">` for short text, `<input type="email">` for email addresses (which browsers can auto-validate), `<textarea>` for longer text, and a `<button>` or `<input type="submit">` to send the data. Every input should have an associated `<label>` so users (and screen readers) understand exactly what each field is asking for — labeling forms correctly is one of the most overlooked basics that separates amateur pages from professional ones.',
              'For your assignment, build a simple contact page containing a heading, a short intro paragraph, and a form with labeled fields for name, email, and a message textarea, plus a submit button. Don\'t worry yet about what happens when the form is submitted (that requires back-end logic covered conceptually in Module 6) — the goal here is purely correct, accessible HTML structure.',
            ],
            keyTakeaways: [
              'Attributes (src, href, alt, type) add extra detail and behavior to HTML tags without changing their basic role.',
              'Forms collect user input using input fields, textareas, and submit buttons wrapped in a form element.',
              'Every form input should have an associated label for accessibility and clarity.',
            ],
          },
        ],
        quiz: {
          id: 'wdf-m2-quiz',
          questions: [
            {
              id: 'wdf-m2-q1',
              question: 'What is the primary purpose of HTML on a webpage?',
              options: [
                'To define visual styling like colors and fonts',
                'To define the structure and meaning of content',
                'To handle server-side database queries',
                'To compress images automatically',
              ],
              correctIndex: 1,
              explanation: 'HTML structures and labels content; visual styling is handled separately by CSS.',
            },
            {
              id: 'wdf-m2-q2',
              question: 'Why does semantic HTML (using tags like nav, header, main) matter?',
              options: [
                'It has no real benefit',
                'It improves SEO and accessibility for screen reader users',
                'It makes pages load slower',
                'It is required only for images',
              ],
              correctIndex: 1,
              explanation: 'Semantic tags help search engines and assistive technologies understand page structure correctly.',
            },
            {
              id: 'wdf-m2-q3',
              question: 'Why should every form input have an associated label?',
              options: [
                'Labels are purely decorative',
                'Labels make forms clear and accessible, including for screen reader users',
                'Labels are required by every browser to submit a form',
                'There is no reason to use labels',
              ],
              correctIndex: 1,
              explanation: 'Labels clarify what each input field is asking for, both visually and for assistive technology.',
            },
          ],
        },
      },
      {
        id: 'wdf-m3',
        title: 'Module 3: CSS — Styling and Layout',
        lessons: [
          {
            id: 'wdf-m3-l1',
            title: 'Selectors, the Box Model, and Core Properties',
            content: [
              'CSS (Cascading Style Sheets) controls how your HTML actually looks — colors, fonts, spacing, sizing, and positioning. A CSS rule consists of a selector (which HTML elements it targets) followed by curly braces containing property-value pairs, for example `p { color: blue; font-size: 16px; }` makes every paragraph blue with 16-pixel text. Selectors can target elements by tag name, by class (`.my-class`, reusable across many elements), or by ID (`#my-id`, unique to one specific element) — classes are used far more often than IDs in real-world CSS because they are reusable.',
              'The box model is the single most important concept in CSS layout: every HTML element is treated as a rectangular box made of four layers, from the inside out — content (the actual text or image), padding (space inside the border, between content and border), border (a visible or invisible edge around the padding), and margin (space outside the border, separating this box from neighboring elements). Misunderstanding the box model is the source of most early CSS frustration — for example, adding padding can unexpectedly make an element wider unless you account for it.',
              'Beyond the box model, color (using hex codes like `#0A66C2`, or named colors, or `rgb()`/`rgba()` for transparency), typography (font-family, font-size, font-weight, line-height), and background properties (background-color, background-image) round out the core toolkit you will use on nearly every project. For your assignment, take the HTML page you built in Module 2 and add a CSS stylesheet that styles the heading with a custom color and font size, adds padding and a border around the form, and sets a background color for the page.',
            ],
            keyTakeaways: [
              'CSS rules pair a selector (element, class, or ID) with property-value styling declarations.',
              'The box model — content, padding, border, margin — governs how every element is sized and spaced.',
              'Color, typography, and background properties are the core, most frequently used styling tools.',
            ],
          },
          {
            id: 'wdf-m3-l2',
            title: 'Flexbox and Modern Layout',
            content: [
              'Before Flexbox, arranging elements side by side or centering things vertically required clunky workarounds — Flexbox solved this by giving any container a simple, powerful layout system. Setting `display: flex` on a container turns its direct children into a flexible row (by default) that can be controlled with properties like `justify-content` (controls horizontal alignment/spacing — e.g., `space-between`, `center`) and `align-items` (controls vertical alignment within the row, e.g., `center`).',
              'Flexbox is ideal for one-dimensional layouts — a navigation bar with logo on the left and links on the right, a row of cards, or centering a single element perfectly both horizontally and vertically with just `display: flex; justify-content: center; align-items: center;`. CSS Grid (a closely related but more powerful tool for two-dimensional layouts — rows AND columns simultaneously) is worth knowing exists, though Flexbox alone will cover the large majority of layouts you build as a beginner.',
              'For your assignment, rebuild your page\'s structure using Flexbox: create a simple navigation bar with a site name on the left and three links on the right using `justify-content: space-between`, and arrange any three content blocks (cards, images, or sections) into a responsive row using Flexbox rather than manual positioning. This single skill — Flexbox — will solve the majority of real-world layout challenges you encounter as a working developer.',
            ],
            keyTakeaways: [
              'display: flex turns a container\'s children into a flexible, easily aligned row or column.',
              'justify-content and align-items control horizontal and vertical alignment within a flex container.',
              'Flexbox handles most one-dimensional layout needs; CSS Grid extends this to full two-dimensional layouts.',
            ],
          },
        ],
        quiz: {
          id: 'wdf-m3-quiz',
          questions: [
            {
              id: 'wdf-m3-q1',
              question: 'What are the four layers of the CSS box model, from inside to outside?',
              options: [
                'Margin, border, padding, content',
                'Content, padding, border, margin',
                'Border, content, margin, padding',
                'Padding, content, margin, border',
              ],
              correctIndex: 1,
              explanation: 'The box model goes content → padding → border → margin, from the innermost layer outward.',
            },
            {
              id: 'wdf-m3-q2',
              question: 'What does setting display: flex on a container primarily enable?',
              options: [
                'It deletes all child elements',
                'It turns the container\'s children into an easily aligned flexible row or column',
                'It disables all CSS on the page',
                'It only affects images, not text',
              ],
              correctIndex: 1,
              explanation: 'Flexbox gives a container a flexible layout system for arranging its direct children.',
            },
            {
              id: 'wdf-m3-q3',
              question: 'Which CSS selector type is reused across many elements, unlike an ID which targets only one?',
              options: ['Class selector (.my-class)', 'ID selector (#my-id)', 'There is no difference', 'Neither can be reused'],
              correctIndex: 0,
              explanation: 'Class selectors are designed to be applied to multiple elements; IDs should be unique per page.',
            },
          ],
        },
      },
      {
        id: 'wdf-m4',
        title: 'Module 4: Responsive & Mobile-First Design',
        lessons: [
          {
            id: 'wdf-m4-l1',
            title: 'Designing for Every Screen Size',
            content: [
              'More than half of all web traffic globally comes from mobile devices, which means a website that looks great on a laptop but breaks on a phone is failing the majority of its visitors — responsive design solves this by making layouts adapt fluidly to any screen size. The first practical step is adding the viewport meta tag, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, inside your `<head>` — without this single line, mobile browsers will render your page at desktop width and force users to zoom and scroll sideways.',
              'Media queries are the core tool for responsive design: a rule like `@media (max-width: 768px) { ... }` applies its enclosed CSS only when the screen is 768 pixels wide or narrower, letting you redefine layouts, font sizes, or spacing specifically for smaller screens. The "mobile-first" approach flips the traditional thinking: instead of designing for desktop and then cramming it onto mobile, you design the simple mobile layout first, then use media queries to add complexity for larger screens — this generally produces cleaner, more focused results.',
              'Combined with Flexbox\'s natural flexibility (a flex row can be told to wrap onto multiple lines with `flex-wrap: wrap`, or switch to a column layout on small screens with a media query changing `flex-direction`), responsive design becomes very achievable even as a beginner. For your assignment, add the viewport meta tag to your existing page, then add a media query that stacks your navigation links vertically and reduces your heading\'s font size when the screen width drops below 768 pixels — then resize your browser window to confirm it adapts correctly.',
            ],
            keyTakeaways: [
              'The viewport meta tag is required for mobile browsers to render a page at the correct width instead of zoomed-out desktop scale.',
              'Media queries apply CSS conditionally based on screen width, enabling layouts to adapt across devices.',
              'Mobile-first design builds the simple small-screen layout first, then adds complexity for larger screens via media queries.',
            ],
          },
          {
            id: 'wdf-m4-l2',
            title: 'Testing and Polishing Across Devices',
            content: [
              'Real responsive design is verified, not assumed — browser developer tools include a device toolbar (usually a small phone/tablet icon) that simulates how your page renders on dozens of real device sizes, from an iPhone SE to an iPad, without needing physical devices to test on. Use this constantly while building, not just at the end, since catching a broken layout early is far easier than retrofitting fixes after the entire page is built.',
              'Common responsive pitfalls worth specifically checking for include: images that overflow their container on small screens (fixed with `max-width: 100%; height: auto;` on images), text that becomes too small or too large at certain widths, navigation menus that overlap content, and buttons or links that become too small to tap accurately on a touchscreen (a minimum touch target size of roughly 44x44 pixels is the common accessibility guideline). Testing at a handful of common breakpoints — roughly 375px (small phones), 768px (tablets), and 1024px+ (desktops) — covers the large majority of real-world devices.',
              'For your final assignment in this module, open your page in the browser device toolbar, test it at phone, tablet, and desktop widths, and fix any issues you find — overflowing images, cramped text, or misaligned navigation. This habit of testing across breakpoints before considering a page "done" is a professional standard, not an optional extra.',
            ],
            keyTakeaways: [
              'Browser device toolbars let you simulate dozens of screen sizes without needing physical devices.',
              'Common responsive issues include overflowing images, oddly sized text, and touch targets that are too small.',
              'Testing at small-phone, tablet, and desktop breakpoints before calling a page "done" is standard professional practice.',
            ],
          },
        ],
        quiz: {
          id: 'wdf-m4-quiz',
          questions: [
            {
              id: 'wdf-m4-q1',
              question: 'What does the viewport meta tag do?',
              options: [
                'It blocks mobile users from visiting the site',
                'It tells mobile browsers to render the page at the device\'s actual width instead of zoomed-out desktop scale',
                'It changes the page\'s text color',
                'It has no practical effect',
              ],
              correctIndex: 1,
              explanation: 'Without the viewport meta tag, mobile browsers default to rendering at desktop width, forcing zooming and sideways scrolling.',
            },
            {
              id: 'wdf-m4-q2',
              question: 'What is the "mobile-first" approach to responsive design?',
              options: [
                'Designing only for mobile and ignoring desktop entirely',
                'Designing the simple mobile layout first, then adding complexity for larger screens via media queries',
                'Designing for desktop first and shrinking it for mobile',
                'There is no defined approach',
              ],
              correctIndex: 1,
              explanation: 'Mobile-first starts with the simplest, smallest layout and progressively enhances it for larger screens.',
            },
            {
              id: 'wdf-m4-q3',
              question: 'What tool lets you simulate different device screen sizes directly in your browser?',
              options: ['A spreadsheet', 'The browser developer tools\' device toolbar', 'A word processor', 'An email client'],
              correctIndex: 1,
              explanation: 'The device toolbar in browser dev tools simulates many real device widths for responsive testing.',
            },
          ],
        },
      },
      {
        id: 'wdf-m5',
        title: 'Module 5: JavaScript Fundamentals',
        lessons: [
          {
            id: 'wdf-m5-l1',
            title: 'Variables, Functions, and the DOM',
            content: [
              'JavaScript is the programming language that makes web pages interactive — it can respond to clicks, validate forms, update content without reloading the page, and much more. Variables store data using `let` (for values that may change) or `const` (for values that won\'t be reassigned), for example `let score = 0;` or `const siteName = "My Portfolio";`. Functions are reusable blocks of code that perform a specific task, defined with `function greet(name) { return "Hello, " + name; }` and called later with `greet("Ada")`.',
              'The DOM (Document Object Model) is JavaScript\'s live, in-memory representation of your HTML page — it lets your code find, read, and change elements after the page has loaded. `document.querySelector(".my-class")` finds the first element matching a CSS selector, `element.textContent = "New text"` changes what text it displays, and `element.style.color = "red"` changes its styling directly from JavaScript — this is the foundation of nearly every interactive feature you will build.',
              'Event listeners connect user actions to JavaScript code: `button.addEventListener("click", function() { ... })` runs the provided function every time that button is clicked. As your assignment, add a `<button>` to your existing page and use JavaScript to change a paragraph\'s text and color when that button is clicked — this single exercise combines variables, the DOM, and event listeners into your first genuinely interactive feature.',
            ],
            keyTakeaways: [
              'Variables (let/const) store data, and functions package reusable logic that can be called repeatedly.',
              'The DOM is JavaScript\'s live representation of the page, letting code find and modify HTML elements after load.',
              'Event listeners connect user actions (like clicks) to JavaScript functions, powering interactivity.',
            ],
          },
          {
            id: 'wdf-m5-l2',
            title: 'Conditionals, Loops, and Form Validation',
            content: [
              'Conditionals let your code make decisions: `if (score > 50) { ... } else { ... }` runs different code depending on whether a condition is true or false, and is the basis of almost every piece of logic in real applications — from showing an error message to deciding which content to display. Comparison operators (`>`, `<`, `===` for "equals", `!==` for "not equals") are used to build these conditions.',
              'Loops let your code repeat an action without writing it out manually each time: a `for` loop like `for (let i = 0; i < 5; i++) { console.log(i); }` runs five times, while array methods like `.forEach()` and `.map()` let you process every item in a list of data elegantly — for example, looping through an array of product names to generate HTML for each one dynamically. Arrays (`let fruits = ["apple", "banana", "mango"];`) and objects (`let user = { name: "Ada", age: 25 };`) are the two fundamental ways JavaScript organizes structured data, and you will use both constantly.',
              'A practical, common real-world use of conditionals is form validation: checking that a required field isn\'t empty, or that an email field contains an "@" symbol, before allowing a form to submit, and displaying a clear error message if validation fails. For your assignment, add JavaScript validation to the contact form you built earlier — when the submit button is clicked, check that the name and message fields aren\'t empty, and if either is empty, prevent submission and display an error message using the DOM techniques from the previous lesson.',
            ],
            keyTakeaways: [
              'Conditionals (if/else) let code branch based on whether a condition is true or false.',
              'Loops and array methods (for, forEach, map) let code repeat actions across lists of data without manual repetition.',
              'Form validation uses conditionals to check input before submission, giving users clear, immediate feedback.',
            ],
          },
        ],
        quiz: {
          id: 'wdf-m5-quiz',
          questions: [
            {
              id: 'wdf-m5-q1',
              question: 'What is the DOM?',
              options: [
                'A type of CSS file',
                'JavaScript\'s live, in-memory representation of the HTML page, used to read and change elements',
                'A database management system',
                'A web server',
              ],
              correctIndex: 1,
              explanation: 'The DOM lets JavaScript find and manipulate elements on a page after it has loaded.',
            },
            {
              id: 'wdf-m5-q2',
              question: 'What does an event listener do?',
              options: [
                'It deletes an HTML element permanently',
                'It connects a user action (like a click) to a JavaScript function that runs in response',
                'It only works with images',
                'It has no functional purpose',
              ],
              correctIndex: 1,
              explanation: 'Event listeners trigger specified code whenever a defined event (click, input, etc.) occurs.',
            },
            {
              id: 'wdf-m5-q3',
              question: 'What is a practical real-world use of conditionals shown in this module?',
              options: [
                'Styling text with colors',
                'Validating form input before allowing submission',
                'Defining the page\'s HTML structure',
                'Conditionals have no practical use',
              ],
              correctIndex: 1,
              explanation: 'Form validation checks input against conditions before allowing the form to proceed.',
            },
          ],
        },
      },
      {
        id: 'wdf-m6',
        title: 'Module 6: APIs and Dynamic Data',
        lessons: [
          {
            id: 'wdf-m6-l1',
            title: 'Fetching Data From the Outside World',
            content: [
              'An API (Application Programming Interface) is how one piece of software requests data or services from another — when a weather app shows today\'s forecast, it is fetching that data from a weather API rather than storing weather information itself. Most modern web APIs follow a REST style, exchanging data as JSON (JavaScript Object Notation, a lightweight text format that looks like `{"name": "Lagos", "temp": 29}`), and JavaScript\'s built-in `fetch()` function is the standard tool for requesting that data from inside the browser.',
              'A basic fetch request looks like `fetch("https://api.example.com/data").then(response => response.json()).then(data => console.log(data));` — this sends a request, waits for the response, converts it from JSON text into a usable JavaScript object, and then lets you work with that data (like displaying it on the page using the DOM techniques from Module 5). Many free, beginner-friendly public APIs exist for practice — weather data, random quotes, country information — letting you build genuinely dynamic pages without needing to build your own back end yet.',
              'Understanding this client-server data flow also clarifies why some features need a real back end: a contact form that actually sends an email, a login system that checks a password against a database, or any feature that must securely store data — all of these require server-side code (commonly Node.js, Python, or PHP) that the front end alone cannot safely handle. For your assignment, find one free public API (search "free public APIs" with no authentication required), and use fetch() to display its data on a simple page — for example, fetching and displaying a random quote each time a button is clicked.',
            ],
            keyTakeaways: [
              'APIs let one application request data or services from another, almost always exchanged as JSON.',
              'JavaScript\'s fetch() function is the standard tool for requesting data from an API directly in the browser.',
              'Features requiring secure storage or processing (logins, real form submissions) need server-side back-end code, not front-end JavaScript alone.',
            ],
          },
          {
            id: 'wdf-m6-l2',
            title: 'From Static Pages to Real Web Applications',
            content: [
              'A static website (everything built so far in this course) serves the same fixed HTML to every visitor; a dynamic web application changes its content based on data, user accounts, or real-time input — the difference between a digital brochure and an actual product like a social media feed or an e-commerce store. Most real-world dynamic applications follow roughly the same pattern: a front end (HTML/CSS/JS, what you\'ve learned) talks to a back end (server-side code and a database) via API requests, exactly like the fetch() pattern from the previous lesson, just now talking to a server you or your team built rather than a public API.',
              'As a front-end-focused beginner, you do not need to master back-end development to be employable or to freelance successfully — many real jobs and freelance gigs are explicitly "front-end developer" roles that only require HTML, CSS, JavaScript, and the ability to consume APIs that a back-end team already built. That said, having even a conceptual understanding of how the back end works (this lesson, plus Module 6\'s API content) makes you a significantly stronger collaborator and candidate than someone who only knows how pages look, with no sense of how data actually flows.',
              'For your assignment, write a short paragraph (for your own notes, not submitted anywhere) explaining in your own words the journey of data when a user submits a real-world login form: from the HTML form, through JavaScript validation, to an API request, to a back-end server, to a database check, and back again with a response. Being able to explain this flow clearly is a strong signal of genuine understanding, not just memorized syntax — and it is a common interview question for junior developer roles.',
            ],
            keyTakeaways: [
              'Static sites serve fixed content to everyone; dynamic applications change based on data, accounts, or real-time input.',
              'Front-end developers can build successful careers without mastering back-end development, as long as they can consume APIs competently.',
              'Being able to explain the full client-to-server-to-database data flow is a strong, interview-relevant signal of real understanding.',
            ],
          },
        ],
        quiz: {
          id: 'wdf-m6-quiz',
          questions: [
            {
              id: 'wdf-m6-q1',
              question: 'What format do most modern web APIs use to exchange data?',
              options: ['JSON', 'Microsoft Word documents', 'Printed paper', 'CSS files'],
              correctIndex: 0,
              explanation: 'JSON (JavaScript Object Notation) is the standard lightweight data format used by most REST APIs.',
            },
            {
              id: 'wdf-m6-q2',
              question: 'What is the key difference between a static website and a dynamic web application?',
              options: [
                'There is no real difference',
                'Static sites serve fixed content to everyone; dynamic apps change based on data, accounts, or input',
                'Dynamic apps cannot use HTML at all',
                'Static sites are always larger in file size',
              ],
              correctIndex: 1,
              explanation: 'Dynamic applications respond to data and user context, unlike fixed static pages.',
            },
            {
              id: 'wdf-m6-q3',
              question: 'Which JavaScript function is the standard tool for requesting data from an API?',
              options: ['alert()', 'fetch()', 'console.log()', 'document.write()'],
              correctIndex: 1,
              explanation: 'fetch() is the built-in browser function used to make HTTP requests to APIs.',
            },
          ],
        },
      },
      {
        id: 'wdf-m7',
        title: 'Module 7: Git, GitHub, and Working Like a Developer',
        lessons: [
          {
            id: 'wdf-m7-l1',
            title: 'Version Control Fundamentals',
            content: [
              'Git is a version control system that tracks every change made to your code over time, letting you save checkpoints (called "commits"), see exactly what changed and when, and revert back to an earlier version if something breaks — it is the industry-standard tool used on virtually every professional software team. GitHub is a website that hosts your Git repositories online, making it possible to back up your code, collaborate with others, and — critically for a beginner building a career — showcase your work publicly to potential clients or employers.',
              'The core Git workflow you will use constantly is: `git add` (stage the files you want to include in your next checkpoint), `git commit -m "a clear description of what changed"` (save that checkpoint with a message explaining it), and `git push` (upload your committed changes to GitHub). Writing clear, specific commit messages ("Add responsive navigation menu" rather than "fixed stuff") is a small habit that makes a large difference once you are working with others or revisiting your own old projects months later.',
              'For your assignment, create a free GitHub account, install Git on your machine, and turn your project folder from earlier modules into a Git repository: run `git init`, then `git add .`, then `git commit -m "Initial commit: basic page structure"`, then create a new repository on GitHub and push your code to it using the commands GitHub provides. Having even one real project visible on your GitHub profile is something you can link directly in job applications and freelance proposals from this point forward.',
            ],
            keyTakeaways: [
              'Git tracks changes to your code over time through commits, letting you save checkpoints and revert if needed.',
              'GitHub hosts Git repositories online, enabling backup, collaboration, and a public showcase of your work.',
              'The core workflow — git add, git commit, git push — with clear commit messages is used on virtually every professional team.',
            ],
          },
          {
            id: 'wdf-m7-l2',
            title: 'Branching and Collaborating Safely',
            content: [
              'A branch is an independent line of development within the same Git repository — the default branch (usually called `main`) holds your stable, working code, while a new branch (created with `git checkout -b feature-name`) lets you experiment with a new feature or fix without risking the stable version until you are ready to merge your changes back in. This matters enormously once you work with others, since multiple people can work on different branches simultaneously without overwriting each other\'s work.',
              'A pull request (PR) on GitHub is a formal request to merge one branch\'s changes into another, typically into `main` — it gives collaborators a chance to review the proposed changes, leave comments, and approve or request changes before anything is merged, which is the standard professional workflow at companies of every size. Even working solo, using branches and pull requests for your own practice projects builds the exact habits and vocabulary employers expect from day one of a junior role.',
              'For your assignment, create a new branch in your existing repository, make a small change (like updating your page\'s color scheme), commit it on that branch, push it to GitHub, and open a pull request to merge it into `main` — then merge it yourself, since you are working solo. This single exercise, done once deliberately, removes the intimidation factor of branches and PRs before you encounter them on a real team.',
            ],
            keyTakeaways: [
              'Branches let you develop new features or fixes independently from the stable main branch.',
              'A pull request formally proposes merging one branch into another, with room for review before changes go live.',
              'Practicing branches and pull requests solo builds the exact workflow habits expected on professional teams.',
            ],
          },
        ],
        quiz: {
          id: 'wdf-m7-quiz',
          questions: [
            {
              id: 'wdf-m7-q1',
              question: 'What does a Git commit do?',
              options: [
                'It permanently deletes old code',
                'It saves a checkpoint of your changes with a descriptive message',
                'It uploads your code to the internet automatically',
                'It has no practical function',
              ],
              correctIndex: 1,
              explanation: 'A commit captures a snapshot of staged changes along with a message describing what changed.',
            },
            {
              id: 'wdf-m7-q2',
              question: 'What is the purpose of a Git branch?',
              options: [
                'To permanently delete the main codebase',
                'To develop a new feature or fix independently without affecting the stable main branch',
                'To slow down your computer',
                'Branches serve no real purpose',
              ],
              correctIndex: 1,
              explanation: 'Branches isolate new work so the stable main branch remains unaffected until changes are ready to merge.',
            },
            {
              id: 'wdf-m7-q3',
              question: 'What does a pull request (PR) allow collaborators to do?',
              options: [
                'Immediately and permanently delete a repository',
                'Review and discuss proposed changes before merging them into another branch',
                'Nothing — PRs have no function on GitHub',
                'Only view code without any review capability',
              ],
              correctIndex: 1,
              explanation: 'Pull requests provide a structured review process before changes are merged.',
            },
          ],
        },
      },
      {
        id: 'wdf-m8',
        title: 'Module 8: Deploying and Freelancing as a Web Developer',
        lessons: [
          {
            id: 'wdf-m8-l1',
            title: 'Putting Your Site Live on the Internet',
            content: [
              'Deployment is the process of taking your code from your local machine and making it accessible on the public internet — and for static sites (HTML, CSS, JavaScript, no server-side code), this has become remarkably simple and often completely free. Platforms like Vercel, Netlify, and GitHub Pages let you connect your GitHub repository and automatically publish your site to a live URL within minutes, redeploying automatically every time you push a new commit.',
              'A custom domain name (like yourname.com instead of a free subdomain) is optional but adds professionalism for client-facing or portfolio work, and is typically inexpensive (often $10–15/year) through registrars like Namecheap or GoDaddy, then pointed at your deployment platform through simple DNS settings. For your assignment, deploy the project you have built throughout this course to Vercel, Netlify, or GitHub Pages, confirm it loads correctly on both desktop and mobile, and add the live link to your GitHub repository\'s description.',
              'Once deployed, this project becomes the first entry in your developer portfolio — a small but real, live, link-able piece of evidence that you can build and ship working software, which matters far more to early clients and employers than any certificate alone. Every project you complete from this point forward should follow this same pattern: build it, push it to GitHub, deploy it, and add it to your growing portfolio.',
            ],
            keyTakeaways: [
              'Static site deployment via Vercel, Netlify, or GitHub Pages is fast, often free, and auto-updates with every Git push.',
              'A custom domain adds professionalism for client-facing work but is optional, especially when starting out.',
              'Every completed project should be deployed and added to a growing, link-able portfolio — proof matters more than credentials alone.',
            ],
          },
          {
            id: 'wdf-m8-l2',
            title: 'Finding Your First Web Development Clients or Job',
            content: [
              'With a deployed portfolio project in hand, you have two realistic paths into paid work: freelancing (platforms like Upwork and Fiverr, or direct outreach to small local businesses that need a simple website) or applying for junior/entry-level developer roles, many of which are remote-friendly given how distributed web development teams already are. For freelancing specifically, small businesses without an existing website are often the easiest first clients — they need something simple (a landing page, a basic multi-page site) that matches exactly the skills built in this course, and they are far less demanding than enterprise clients about advanced frameworks or complex back-end systems.',
              'When pricing your first few projects, undercharging slightly to build a portfolio of real client work and testimonials is a reasonable short-term trade-off, but always charge something — free work rarely gets taken seriously and sets a difficult precedent for raising your rates later. A simple, honest pitch works well for first clients: "I build clean, mobile-friendly websites for small businesses — here is an example I built [link your deployed project], and I can have your site live within two weeks."',
              'For your final assignment in this course, write a short outreach message (3-4 sentences) you could realistically send to a local business without a website, referencing your deployed portfolio project, and identify three specific local or remote businesses you could realistically send it to this week. Completing this course is the foundation — sending that first message is what actually starts your career.',
            ],
            keyTakeaways: [
              'Freelancing through platforms or direct local outreach, and applying for remote-friendly junior roles, are the two realistic first paths to paid work.',
              'Small businesses without an existing website are often the easiest, lowest-friction first clients for a new developer.',
              'A simple, confident outreach pitch referencing a real deployed project is more persuasive than any credential alone.',
            ],
          },
        ],
        quiz: {
          id: 'wdf-m8-quiz',
          questions: [
            {
              id: 'wdf-m8-q1',
              question: 'Which platforms are mentioned for deploying a static site for free?',
              options: [
                'Only paper printing services',
                'Vercel, Netlify, and GitHub Pages',
                'Microsoft Word',
                'There are no free deployment options',
              ],
              correctIndex: 1,
              explanation: 'Vercel, Netlify, and GitHub Pages all offer free, fast static site deployment connected to GitHub.',
            },
            {
              id: 'wdf-m8-q2',
              question: 'Why are small businesses without an existing website considered good first clients?',
              options: [
                'They never need to be paid',
                'Their needs match beginner skills closely and they are less demanding about advanced frameworks',
                'They require the most advanced back-end systems',
                'There is no advantage to this type of client',
              ],
              correctIndex: 1,
              explanation: 'Simple business website needs align well with the foundational skills built throughout this course.',
            },
            {
              id: 'wdf-m8-q3',
              question: 'What does the lesson recommend regarding charging for your first projects?',
              options: [
                'Always work entirely for free indefinitely',
                'It\'s reasonable to charge less initially to build a portfolio, but always charge something',
                'Charge the highest possible rate immediately regardless of experience',
                'Pricing does not matter at all',
              ],
              correctIndex: 1,
              explanation: 'Charging something (even modestly) while building a portfolio avoids setting an unsustainable free-work precedent.',
            },
          ],
        },
      },
    ],
  },

  // ============================================================
  // COURSE 7 — UI/UX & Graphic Design
  // ============================================================
  {
    id: 'ui-ux-graphic-design',
    slug: 'ui-ux-graphic-design',
    title: 'UI/UX & Graphic Design: From First Principles to Paid Client Work',
    description:
      'Design principles, color, Figma prototyping, and branding — build a portfolio that lands paying clients.',
    skillIds: ['ui-ux-design'],
    category: 'UI/UX & Graphic Design',
    estimatedHours: 20,
    modules: [
      {
        id: 'uxd-m1',
        title: 'Module 1: Introduction to UI/UX Design',
        lessons: [
          {
            id: 'uxd-m1-l1',
            title: 'What Designers Actually Do',
            content: [
              'UI (User Interface) design and UX (User Experience) design are related but distinct disciplines: UI design is concerned with how a product looks — colors, buttons, layout, visual style — while UX design is concerned with how a product feels to use — whether it is easy to navigate, whether it solves the user\'s actual problem, and whether the overall experience is satisfying or frustrating. A beautifully designed screen (great UI) that confuses users about what to click next (poor UX) is a common and costly mistake; the best products excel at both simultaneously.',
              'Graphic design overlaps with both but is broader still, covering visual communication outside of digital interfaces too — logos, brand identity, social media graphics, posters, and marketing materials. Many working designers move fluidly between UI/UX work (designing an app or website) and graphic design work (designing a logo or Instagram post for the same client), and this course builds skills that transfer across both.',
              'The design process, regardless of which specific output you are creating, generally follows the same stages: understanding the problem and the user (research), generating and narrowing ideas (ideation), creating low-detail drafts (wireframing), building more polished, testable versions (prototyping), and refining based on feedback (iteration). Skipping straight to polished visuals without understanding the actual problem is the single most common mistake beginner designers make — this course is structured to build the underlying thinking, not just visual technique.',
            ],
            keyTakeaways: [
              'UI design focuses on how a product looks; UX design focuses on how it feels to use — both matter together.',
              'Graphic design is broader, covering visual communication beyond digital interfaces (logos, brand identity, marketing graphics).',
              'The design process — research, ideation, wireframing, prototyping, iteration — applies across nearly every type of design work.',
            ],
          },
        ],
        quiz: {
          id: 'uxd-m1-quiz',
          questions: [
            {
              id: 'uxd-m1-q1',
              question: 'What is the primary focus of UX design, as distinct from UI design?',
              options: [
                'Choosing button colors only',
                'How a product feels to use — ease of navigation and whether it solves the user\'s problem',
                'Printing physical brochures',
                'Writing backend server code',
              ],
              correctIndex: 1,
              explanation: 'UX is concerned with the overall experience and usability, while UI focuses more on visual presentation.',
            },
            {
              id: 'uxd-m1-q2',
              question: 'What is described as the most common mistake beginner designers make?',
              options: [
                'Spending too much time on research',
                'Skipping straight to polished visuals without understanding the actual problem',
                'Using too many wireframes',
                'Talking to too many users',
              ],
              correctIndex: 1,
              explanation: 'Jumping to visuals before understanding the problem and user often produces designs that look good but don\'t actually work.',
            },
            {
              id: 'uxd-m1-q3',
              question: 'Which of these is part of the general design process described in this lesson?',
              options: ['Research, ideation, wireframing, prototyping, iteration', 'Only final visual polish', 'Skipping user understanding entirely', 'Coding the back end first'],
              correctIndex: 0,
              explanation: 'The design process moves from understanding the problem through to refining a tested solution.',
            },
          ],
        },
      },
      {
        id: 'uxd-m2',
        title: 'Module 2: Design Principles & Visual Hierarchy',
        lessons: [
          {
            id: 'uxd-m2-l1',
            title: 'The Rules That Make Designs Work',
            content: [
              'Visual hierarchy is the deliberate arrangement of elements so the viewer\'s eye is guided to the most important information first — achieved primarily through size (bigger elements draw attention first), color and contrast (bright or high-contrast elements stand out against muted backgrounds), and position (elements at the top or center of a layout are typically seen first, following natural reading patterns). A homepage with twenty equally-sized, equally-colored elements gives the viewer no guidance at all about what matters most — strong hierarchy is what makes a design feel intentional rather than accidental.',
              'Several core principles repeat across almost every well-designed interface: alignment (elements should line up to invisible grid lines, creating order rather than visual chaos), consistency (similar elements should look and behave similarly throughout a product, so users don\'t have to relearn patterns on every screen), proximity (related items should be grouped close together, and unrelated items separated, so relationships are visually obvious without needing labels), and white space (empty space is not "wasted" space — it gives content room to breathe and is one of the fastest ways to make a cluttered design feel calmer and more premium).',
              'For your assignment, find two examples of the same type of webpage (e.g., two different e-commerce product pages) and analyze each using these four principles: which one has clearer hierarchy, better alignment, more visual consistency, and more effective use of white space? Write down specifically what makes the stronger one work, in terms of these named principles rather than just "it looks nicer" — training yourself to name what works is what turns vague taste into a usable design skill.',
            ],
            keyTakeaways: [
              'Visual hierarchy guides the eye to what matters most, primarily through size, color/contrast, and position.',
              'Alignment, consistency, proximity, and white space are core principles that separate intentional designs from accidental ones.',
              'Training yourself to name specifically what works (not just "it looks nice") is what turns taste into a transferable skill.',
            ],
          },
        ],
        quiz: {
          id: 'uxd-m2-quiz',
          questions: [
            {
              id: 'uxd-m2-q1',
              question: 'What does "visual hierarchy" describe?',
              options: [
                'A random arrangement of design elements',
                'The deliberate arrangement of elements to guide the viewer\'s eye to what matters most',
                'A type of color palette',
                'A coding framework',
              ],
              correctIndex: 1,
              explanation: 'Visual hierarchy uses size, color/contrast, and position to direct attention intentionally.',
            },
            {
              id: 'uxd-m2-q2',
              question: 'What does the "proximity" principle describe?',
              options: [
                'Putting all elements the same distance apart regardless of relationship',
                'Grouping related items close together and separating unrelated items',
                'Using only one color throughout a design',
                'Avoiding any white space entirely',
              ],
              correctIndex: 1,
              explanation: 'Proximity visually communicates relationships between elements through spacing.',
            },
            {
              id: 'uxd-m2-q3',
              question: 'How does this lesson describe white space?',
              options: [
                'Wasted space that should always be eliminated',
                'Empty space that gives content room to breathe and reduces visual clutter',
                'Only relevant for printed materials',
                'Something that has no impact on design quality',
              ],
              correctIndex: 1,
              explanation: 'White space is a deliberate design tool, not wasted area — it improves clarity and perceived quality.',
            },
          ],
        },
      },
      {
        id: 'uxd-m3',
        title: 'Module 3: Color Theory & Typography',
        lessons: [
          {
            id: 'uxd-m3-l1',
            title: 'Choosing Colors and Fonts With Purpose',
            content: [
              'Color carries emotional and psychological meaning that varies by context and culture, but some patterns are common enough to guide practical decisions: blue often signals trust and professionalism (common in finance and tech brands), green often signals growth, health, or money, red signals urgency or energy (and is often used in calls-to-action or sale promotions, though overuse can feel alarming), and neutral tones (black, white, gray) signal sophistication and let other accent colors stand out. A simple, reliable color system for any project uses one primary color (the dominant brand color), one or two accent colors (used sparingly for buttons and highlights), and a neutral palette (for text and backgrounds) — resist the temptation to use many colors at full saturation, which usually looks amateur rather than vibrant.',
              'Typography (the selection and arrangement of fonts) follows a similar discipline: most professional designs use no more than two font families — one for headings (which can have more personality) and one for body text (which must prioritize readability above all else). Serif fonts (with small decorative strokes, like Georgia or Times New Roman) tend to feel traditional or editorial, while sans-serif fonts (clean, no decorative strokes, like Helvetica or Inter) tend to feel modern and are generally easier to read on screens, which is why most digital interfaces default to sans-serif body text.',
              'Contrast between text and background is not just an aesthetic choice but an accessibility requirement — light gray text on a white background may look elegant but is genuinely difficult for many users to read, and accessibility guidelines (WCAG) specify minimum contrast ratios for exactly this reason. For your assignment, pick a hypothetical brand (a fictional coffee shop, fitness app, or fintech startup) and define its color system (primary, accent, neutral) and font pairing (heading font, body font), with one sentence justifying each choice based on the emotional associations covered in this lesson.',
            ],
            keyTakeaways: [
              'A reliable color system uses one primary color, one or two sparing accent colors, and a neutral palette — not many colors at full saturation.',
              'Most professional designs limit themselves to two font families: a heading font with personality and a highly readable body font.',
              'Sufficient text-to-background contrast is an accessibility requirement, not just a stylistic preference.',
            ],
          },
        ],
        quiz: {
          id: 'uxd-m3-quiz',
          questions: [
            {
              id: 'uxd-m3-q1',
              question: 'What does a reliable color system typically consist of?',
              options: [
                'As many bright colors as possible',
                'One primary color, one or two accent colors, and a neutral palette',
                'Only black and white, with no exceptions',
                'A different color scheme on every page',
              ],
              correctIndex: 1,
              explanation: 'A constrained, purposeful color system (primary, accent, neutral) avoids the amateur look of overusing saturated colors.',
            },
            {
              id: 'uxd-m3-q2',
              question: 'Why do most digital interfaces default to sans-serif fonts for body text?',
              options: [
                'Sans-serif fonts are required by law',
                'They tend to feel modern and are generally easier to read on screens',
                'They are the only fonts available digitally',
                'There is no reason for this pattern',
              ],
              correctIndex: 1,
              explanation: 'Sans-serif fonts are typically more legible on digital screens, especially at smaller sizes.',
            },
            {
              id: 'uxd-m3-q3',
              question: 'Why does text-to-background contrast matter beyond aesthetics?',
              options: [
                'It has no real importance',
                'Sufficient contrast is an accessibility requirement so text remains readable for more users',
                'High contrast is illegal in some countries',
                'Contrast only matters for printed materials',
              ],
              correctIndex: 1,
              explanation: 'Accessibility guidelines (WCAG) specify minimum contrast ratios to ensure readability for the widest range of users.',
            },
          ],
        },
      },
      {
        id: 'uxd-m4',
        title: 'Module 4: User Research & Personas',
        lessons: [
          {
            id: 'uxd-m4-l1',
            title: 'Designing for Real People, Not Guesses',
            content: [
              'Good design starts with understanding who you are actually designing for — without this, a designer is just guessing what users want, often based on their own preferences rather than the target audience\'s actual needs. User research can be as simple as a few structured conversations: ask potential users about their current process for solving the problem your product addresses, what frustrates them about existing solutions, and what an ideal outcome would look like for them — open-ended questions reveal far more than yes/no questions.',
              'A persona is a semi-fictional profile representing a key user type, built from real research patterns rather than invented from imagination: it typically includes a name, role, goals, frustrations ("pain points"), and a short scenario describing how they would use the product. Personas keep design decisions grounded — instead of asking "what do I think looks good," a team can ask "would this actually help Ada, our busy small-business-owner persona, complete her task faster?"',
              'For beginners without access to real interview subjects yet, secondary research is a legitimate starting point: reading reviews of competing products (what do users complain about? what do they love?), browsing relevant forums or social media groups where your target audience discusses their problems, and studying how successful competitor products solve similar problems. For your assignment, choose a hypothetical app idea (a budgeting app for young Nigerian professionals, for example), write one persona based on patterns you notice from real reviews or forum discussions of similar existing apps, and list three specific pain points that persona experiences with current solutions.',
            ],
            keyTakeaways: [
              'User research grounds design decisions in real needs rather than the designer\'s personal guesses or preferences.',
              'A persona is a research-based profile (goals, pain points, scenario) representing a key user type, used to keep decisions user-centered.',
              'Secondary research — reviews, forums, competitor analysis — is a legitimate starting point when direct user interviews aren\'t yet available.',
            ],
          },
        ],
        quiz: {
          id: 'uxd-m4-quiz',
          questions: [
            {
              id: 'uxd-m4-q1',
              question: 'Why is user research important before designing a product?',
              options: [
                'It is not actually important',
                'It grounds design decisions in real user needs instead of the designer\'s personal guesses',
                'It only matters for large companies',
                'It replaces the need for any visual design',
              ],
              correctIndex: 1,
              explanation: 'Without research, designers risk building based on assumptions that don\'t match actual user needs.',
            },
            {
              id: 'uxd-m4-q2',
              question: 'What is a persona in the context of UX design?',
              options: [
                'A random fictional character with no research basis',
                'A semi-fictional profile representing a key user type, built from real research patterns',
                'A type of font',
                'A coding library',
              ],
              correctIndex: 1,
              explanation: 'Personas are grounded in research findings, used to keep design decisions focused on real user needs.',
            },
            {
              id: 'uxd-m4-q3',
              question: 'What is an example of legitimate secondary research for a beginner without interview access?',
              options: [
                'Inventing user opinions without any source',
                'Reading reviews and forum discussions about similar existing products',
                'Ignoring users entirely',
                'Only asking close friends with no relevant context',
              ],
              correctIndex: 1,
              explanation: 'Reviews and forum discussions provide real, if indirect, insight into user needs and frustrations.',
            },
          ],
        },
      },
      {
        id: 'uxd-m5',
        title: 'Module 5: Wireframing & Prototyping in Figma',
        lessons: [
          {
            id: 'uxd-m5-l1',
            title: 'From Sketches to Clickable Prototypes',
            content: [
              'A wireframe is a simplified, low-detail sketch of a screen\'s layout — boxes and lines representing where content will go, deliberately stripped of color, real images, and fine visual detail so that everyone involved focuses purely on structure and flow rather than getting distracted by aesthetics too early. Wireframes can be drawn on paper in minutes, which is often the fastest way to explore several layout ideas before committing time to digital tools.',
              'Figma is the current industry-standard tool for digital design, free to start, browser-based, and built specifically for the kind of collaborative, iterative work this field requires — frames represent individual screens, and within them you place shapes, text, and images using a toolset similar to other design software but with collaboration (multiple people editing simultaneously) built in natively. Components are one of Figma\'s most powerful features: define a button or navigation bar once as a reusable component, and every place you use it stays linked, so updating the master component updates every instance automatically — this single feature is why professional teams can maintain visual consistency (Module 2) across dozens of screens without manually fixing each one.',
              'A prototype links multiple static frames together with clickable "hotspots," simulating real interaction — clicking a button on one frame jumps to another frame, letting you (and test users) click through a design as if it were a real, functioning app, before a single line of actual code is written. For your assignment, create a free Figma account, build three simple wireframe screens for a basic app idea (a home screen, a detail screen, and a confirmation screen), and link them together into a clickable prototype using Figma\'s prototype mode.',
            ],
            keyTakeaways: [
              'Wireframes are deliberately low-detail layouts that let teams focus on structure and flow before visual polish.',
              'Figma is the current industry-standard design tool, with reusable Components that maintain consistency across many screens automatically.',
              'A prototype links static frames with clickable hotspots, simulating real app interaction before any code is written.',
            ],
          },
        ],
        quiz: {
          id: 'uxd-m5-quiz',
          questions: [
            {
              id: 'uxd-m5-q1',
              question: 'Why are wireframes deliberately stripped of color and fine visual detail?',
              options: [
                'Color is too expensive to use',
                'So everyone focuses on structure and flow rather than getting distracted by aesthetics too early',
                'Wireframes cannot technically include color',
                'There is no specific reason',
              ],
              correctIndex: 1,
              explanation: 'Removing visual polish keeps early-stage feedback focused on layout and flow rather than color or imagery.',
            },
            {
              id: 'uxd-m5-q2',
              question: 'What is a key benefit of Figma\'s Components feature?',
              options: [
                'It prevents any collaboration between team members',
                'A reusable element (like a button) updates everywhere it is used when the master component is edited',
                'It only works for printed materials',
                'It removes the need for any design at all',
              ],
              correctIndex: 1,
              explanation: 'Components keep designs consistent by propagating updates from a single master element to every instance.',
            },
            {
              id: 'uxd-m5-q3',
              question: 'What does a Figma prototype simulate?',
              options: [
                'Permanent code deployment',
                'Real app interaction, by linking static frames together with clickable hotspots',
                'A spreadsheet of project costs',
                'Nothing functional',
              ],
              correctIndex: 1,
              explanation: 'Prototypes let users click through linked frames as if navigating a real, functioning application.',
            },
          ],
        },
      },
      {
        id: 'uxd-m6',
        title: 'Module 6: Designing for Mobile & Responsive Interfaces',
        lessons: [
          {
            id: 'uxd-m6-l1',
            title: 'Small Screens, Touch, and Thumb-Friendly Design',
            content: [
              'Designing for mobile screens requires different thinking than designing for desktop, primarily because of two constraints: far less screen space to work with, and touch-based interaction (fingers, not a precise mouse cursor) instead of a mouse. Touch targets (buttons, links, icons) need to be large enough to tap accurately — a widely used guideline is a minimum of 44x44 pixels — and important actions should sit within comfortable thumb reach, typically the lower half of the screen, since that is where a thumb naturally rests while holding a phone one-handed.',
              'Navigation on mobile typically uses different patterns than desktop\'s horizontal menu bars — a bottom tab bar (icons for the 3-5 most important sections, always visible at the bottom of the screen) or a hamburger menu (a collapsible menu hidden behind a three-line icon, freeing up space for content) are the two most common solutions, each with tradeoffs: bottom tabs are faster to access but take up permanent space, while hamburger menus save space but hide navigation behind an extra tap.',
              'Designing "responsively" within Figma means creating distinct layouts for distinct screen sizes (commonly a mobile frame at 375px wide, a tablet frame at 768px, and a desktop frame at 1440px) rather than assuming one design will automatically work everywhere — this mirrors the media-query thinking from web development, applied at the design stage before any code is written. For your assignment, take the prototype you built in Module 5 and create a mobile version (375px wide) of each screen, adjusting touch target sizes and choosing either a bottom tab bar or hamburger menu for navigation, with a one-sentence justification for your choice.',
            ],
            keyTakeaways: [
              'Touch targets need adequate size (commonly 44x44px minimum) and should sit within comfortable thumb reach on mobile.',
              'Bottom tab bars and hamburger menus are the two dominant mobile navigation patterns, each with real space-versus-accessibility tradeoffs.',
              'Responsive design in Figma means deliberately creating distinct layouts per screen size, mirroring how developers later implement media queries.',
            ],
          },
        ],
        quiz: {
          id: 'uxd-m6-quiz',
          questions: [
            {
              id: 'uxd-m6-q1',
              question: 'What is the commonly cited minimum size guideline for touch targets on mobile?',
              options: ['1x1 pixels', '44x44 pixels', '500x500 pixels', 'There is no guideline'],
              correctIndex: 1,
              explanation: '44x44 pixels is a widely used minimum size to ensure touch targets are accurately tappable.',
            },
            {
              id: 'uxd-m6-q2',
              question: 'What is a key tradeoff between a bottom tab bar and a hamburger menu?',
              options: [
                'There is no real tradeoff',
                'Bottom tabs are faster to access but take permanent space; hamburger menus save space but hide navigation behind a tap',
                'Hamburger menus are always faster than bottom tabs',
                'Bottom tabs cannot be used on phones',
              ],
              correctIndex: 1,
              explanation: 'Each navigation pattern balances visibility/speed against screen space differently.',
            },
            {
              id: 'uxd-m6-q3',
              question: 'What does designing "responsively" in Figma typically involve?',
              options: [
                'Designing only one screen size and assuming it works everywhere',
                'Creating distinct layouts for distinct screen sizes, such as mobile, tablet, and desktop frames',
                'Avoiding mobile design entirely',
                'Removing all touch targets',
              ],
              correctIndex: 1,
              explanation: 'Deliberately designing for each major screen size ensures the interface works well across devices.',
            },
          ],
        },
      },
      {
        id: 'uxd-m7',
        title: 'Module 7: Branding & Graphic Design Fundamentals',
        lessons: [
          {
            id: 'uxd-m7-l1',
            title: 'Logos, Brand Identity, and Marketing Graphics',
            content: [
              'A brand identity is the consistent visual system (logo, colors, typography, imagery style) that makes a company instantly recognizable across every touchpoint — a strong identity means someone could recognize a brand\'s social media post or app icon even with the name covered, purely from familiar visual cues. A logo is just one piece of this system, but it carries outsized importance because it is usually the most repeated, most visible single element — effective logos tend to be simple enough to recognize at a tiny size (like a phone\'s app icon or a website favicon) and work in a single color, since they will often be reproduced without the full color palette available.',
              'Beyond the logo, a basic brand identity package typically includes a defined color palette (Module 3), one or two brand fonts, and a simple style guide documenting how these elements should and shouldn\'t be used (minimum logo sizing, acceptable background colors, spacing rules) — this consistency is what separates a professional brand from one that looks different and disjointed every time it appears somewhere new. Common graphic design deliverables beyond logos include social media graphics (sized correctly for each platform\'s specific dimensions), business cards, flyers, and presentation templates — each applying the same visual hierarchy, color, and typography principles from earlier modules to a different format.',
              'For your assignment, design a simple logo concept and a one-page mini brand guide for a hypothetical small business (a bakery, a tutoring service, anything realistic), specifying: the logo (a simple shape or wordmark, no need for advanced illustration skill), a 3-color palette, one heading font and one body font, and two rules for how the logo should be used (e.g., minimum size, acceptable backgrounds). This single exercise mirrors a real, sellable freelance deliverable — many small businesses pay specifically for exactly this kind of compact branding package.',
            ],
            keyTakeaways: [
              'A brand identity is a consistent visual system across every touchpoint, with the logo as its most repeated, highest-visibility element.',
              'Effective logos work at tiny sizes and in a single color, since they are often reproduced without the full brand palette.',
              'A simple brand guide (palette, fonts, usage rules) is a real, sellable freelance deliverable that small businesses commonly pay for.',
            ],
          },
        ],
        quiz: {
          id: 'uxd-m7-quiz',
          questions: [
            {
              id: 'uxd-m7-q1',
              question: 'What makes a logo design effective, according to this lesson?',
              options: [
                'It must use as many colors as possible',
                'It works at a tiny size and in a single color',
                'It should never be reused anywhere',
                'It must be highly detailed and complex',
              ],
              correctIndex: 1,
              explanation: 'Logos are reproduced at many sizes and contexts, so simplicity and single-color legibility matter greatly.',
            },
            {
              id: 'uxd-m7-q2',
              question: 'What does a basic brand identity package typically include?',
              options: [
                'Only a logo, with nothing else',
                'A color palette, brand fonts, and a simple style guide documenting usage rules',
                'A complete software application',
                'Nothing beyond a company name',
              ],
              correctIndex: 1,
              explanation: 'A coherent brand identity combines the logo with consistent color, typography, and usage guidelines.',
            },
            {
              id: 'uxd-m7-q3',
              question: 'Why is a "mini brand guide" a relevant freelance skill to practice?',
              options: [
                'It has no real-world application',
                'It mirrors a real, commonly sellable freelance deliverable that small businesses pay for',
                'Only large corporations ever need branding',
                'It is purely an academic exercise with no client relevance',
              ],
              correctIndex: 1,
              explanation: 'Small businesses frequently commission exactly this kind of compact branding package from freelance designers.',
            },
          ],
        },
      },
      {
        id: 'uxd-m8',
        title: 'Module 8: Building a Portfolio & Freelancing as a Designer',
        lessons: [
          {
            id: 'uxd-m8-l1',
            title: 'Turning Skills Into Paid Design Work',
            content: [
              'A design portfolio is the single most important asset for getting hired or hired-freelance — more than a resume, more than a certificate, clients and employers want to see real, finished (or realistic case-study) work that demonstrates you can solve actual design problems. For a beginner without paid client work yet, a portfolio can legitimately be built from course projects (like the ones in this course), self-initiated concept projects (redesigning an app you personally find frustrating, with a clear "before and after" and explanation of your reasoning), or low-cost pro-bono work for a friend\'s small business in exchange for a usable case study and testimonial.',
              'Each portfolio piece should be presented as a brief case study, not just a final image: state the problem you were solving, briefly describe your process (research, wireframes, key decisions), and show the final result — this structure demonstrates your thinking, not just your aesthetic taste, which is what differentiates a hireable designer from someone who can only copy existing styles. A free portfolio site can be built using Figma\'s own portfolio/community features, a dedicated tool like Behance or Dribbble (popular specifically among designers for visual portfolios), or a simple personal website if you also have basic web development skills from this catalog\'s Web Development course.',
              'For freelancing specifically, platforms like Upwork and Fiverr work for designers exactly as they do for other skills covered elsewhere in this catalog, but design work also benefits heavily from direct, visual outreach — sending a short message to a small business with a quick, unsolicited redesign concept of their current logo or homepage (clearly labeled as a concept, not implying you were hired) is a proven, attention-grabbing way to start a conversation that other generic cold outreach rarely achieves. For your final assignment in this course, compile the projects you have built throughout this course (wireframes, prototype, brand guide) into a simple portfolio page on Behance, Dribbble, or a personal site, writing a one-paragraph case study for at least one project.',
            ],
            keyTakeaways: [
              'A portfolio of real or realistic case-study work matters more than credentials for getting hired or landing freelance clients.',
              'Strong portfolio pieces are presented as case studies — problem, process, result — not just a final polished image.',
              'Direct visual outreach (an unsolicited concept redesign) is a uniquely effective way for designers to start client conversations.',
            ],
          },
        ],
        quiz: {
          id: 'uxd-m8-quiz',
          questions: [
            {
              id: 'uxd-m8-q1',
              question: 'What is described as the single most important asset for getting hired or landing freelance design work?',
              options: [
                'A university certificate',
                'A portfolio demonstrating real or realistic design work',
                'A list of software you own',
                'None of these matter',
              ],
              correctIndex: 1,
              explanation: 'Clients and employers prioritize seeing demonstrated problem-solving ability through a portfolio.',
            },
            {
              id: 'uxd-m8-q2',
              question: 'How should each portfolio piece ideally be presented?',
              options: [
                'As a single final image with no explanation',
                'As a brief case study covering the problem, process, and result',
                'As a list of software tools used',
                'Portfolio presentation does not matter',
              ],
              correctIndex: 1,
              explanation: 'Case studies demonstrate design thinking, not just visual output, which is what differentiates hireable designers.',
            },
            {
              id: 'uxd-m8-q3',
              question: 'What outreach approach is highlighted as uniquely effective for designers?',
              options: [
                'Sending only a generic resume with no visual work attached',
                'Sending an unsolicited concept redesign of a business\'s logo or homepage',
                'Avoiding any direct contact with potential clients',
                'Waiting for clients to find you with no outreach at all',
              ],
              correctIndex: 1,
              explanation: 'A clearly labeled concept redesign demonstrates tangible skill and grabs attention more effectively than generic cold messages.',
            },
          ],
        },
      },
    ],
  },

  // ============================================================
  // COURSE 8 — AI Tools & Automation
  // ============================================================
  {
    id: 'ai-tools-automation-mastery',
    slug: 'ai-tools-automation-mastery',
    title: 'AI Tools & Automation: Build Workflows Businesses Will Pay For',
    description:
      'Prompt engineering, AI content tools, and no-code automation — build workflows you can sell to clients.',
    skillIds: ['ai-tools-automation'],
    category: 'AI Tools & Automation',
    estimatedHours: 18,
    modules: [
      {
        id: 'aia-m1',
        title: 'Module 1: Introduction to AI Tools & Automation',
        lessons: [
          {
            id: 'aia-m1-l1',
            title: 'What This Field Actually Is',
            content: [
              'AI tools and automation is the practice of using artificial intelligence and no-code/low-code platforms to do work faster, cheaper, or with less human effort than doing it entirely manually — writing content, generating images, answering customer questions, or moving data between business systems automatically. This field has exploded in demand because nearly every business, regardless of size or industry, now has repetitive tasks (data entry, follow-up emails, social media scheduling, customer support replies) that AI tools and automation platforms can handle with a fraction of the time a human would need.',
              'Two distinct but complementary skill sets make up this field: AI tool fluency (knowing which AI tool solves which problem, and how to prompt it effectively to get useful output) and automation/workflow building (connecting different tools and apps together so data and tasks flow between them without manual copying and pasting). A business that needs both — say, an AI tool that drafts customer email replies, automatically triggered whenever a new support ticket arrives — needs someone who understands both halves, which is exactly the skill set this course builds.',
              'For Nigerians and Africans entering this space, the appeal is strong: almost all of this work is done remotely, requires no expensive equipment beyond a laptop and internet connection, and the tools themselves are evolving so quickly that even six months of focused, current practice puts you ahead of most businesses still doing everything manually. This course assumes no prior technical background — only curiosity and a willingness to experiment with the tools as you go.',
            ],
            keyTakeaways: [
              'AI tools and automation use AI plus no-code platforms to handle repetitive business work faster and cheaper than manual effort.',
              'The field combines two skills: AI tool fluency (effective prompting) and automation/workflow building (connecting apps together).',
              'This work is remote-friendly, low-cost to start, and rewards staying current, since the tools and best practices evolve quickly.',
            ],
          },
        ],
        quiz: {
          id: 'aia-m1-quiz',
          questions: [
            {
              id: 'aia-m1-q1',
              question: 'What is the core value proposition of AI tools and automation for businesses?',
              options: [
                'They make tasks more complicated and expensive',
                'They handle repetitive tasks faster and cheaper than manual human effort',
                'They are only useful for very large corporations',
                'They have no real business application',
              ],
              correctIndex: 1,
              explanation: 'AI tools and automation reduce time and cost on repetitive tasks across businesses of every size.',
            },
            {
              id: 'aia-m1-q2',
              question: 'What two complementary skill sets make up this field?',
              options: [
                'Accounting and legal compliance',
                'AI tool fluency (effective prompting) and automation/workflow building (connecting apps)',
                'Graphic design and video editing only',
                'Hardware repair and networking',
              ],
              correctIndex: 1,
              explanation: 'Knowing which AI tool to use, plus how to connect tools into automated workflows, together form this skill set.',
            },
            {
              id: 'aia-m1-q3',
              question: 'Why is this field described as especially accessible to Nigerians and Africans?',
              options: [
                'It requires expensive specialized hardware',
                'It is remote-friendly, low-cost to start, and rewards staying current with fast-evolving tools',
                'It is only available in certain countries',
                'It requires an advanced computer science degree',
              ],
              correctIndex: 1,
              explanation: 'Minimal equipment requirements and the remote nature of the work make this field broadly accessible.',
            },
          ],
        },
      },
      {
        id: 'aia-m2',
        title: 'Module 2: Prompt Engineering Fundamentals',
        lessons: [
          {
            id: 'aia-m2-l1',
            title: 'Getting Useful Output From AI Models',
            content: [
              'Prompt engineering is the skill of writing instructions to an AI model that reliably produce useful, accurate, on-target output — and it matters because the exact same AI model can produce dramatically different quality results depending entirely on how the request is phrased. A vague prompt like "write about marketing" produces generic, unusable output, while a specific prompt like "write a 150-word Instagram caption for a Lagos-based skincare brand launching a vitamin C serum, targeting women aged 25-40, with a confident and friendly tone" produces something genuinely close to final, usable copy.',
              'A reliable prompt structure includes four elements: Role (tell the AI what perspective to adopt — "You are an experienced email marketer"), Context (the specific situation or background it needs — your business, audience, or goal), Task (exactly what you want produced — a list, an email, a summary, a plan), and Format (how you want the output structured — bullet points, a specific word count, a particular tone). Including all four elements consistently turns AI tools from a novelty into a genuinely reliable working tool.',
              'Iteration is just as important as the initial prompt — treating your first AI response as a draft, then giving specific feedback ("make this shorter," "add more urgency," "remove the third point and add an example instead") usually produces a far better final result than trying to perfect a single prompt on the first attempt. For your assignment, write one prompt using the Role-Context-Task-Format structure for a real task you might need (a business email, a product description, a social media post), run it in any free AI chat tool, and then iterate on the response at least twice with specific feedback.',
            ],
            keyTakeaways: [
              'Prompt engineering is the skill of phrasing AI instructions to reliably get useful, specific output rather than generic results.',
              'The Role-Context-Task-Format structure is a reliable framework for writing consistently effective prompts.',
              'Treating the first AI response as a draft and iterating with specific feedback usually beats trying to perfect one single prompt.',
            ],
          },
        ],
        quiz: {
          id: 'aia-m2-quiz',
          questions: [
            {
              id: 'aia-m2-q1',
              question: 'Why does prompt phrasing matter so much when using AI tools?',
              options: [
                'It has no real effect on output quality',
                'The same AI model can produce dramatically different quality results depending on how the request is phrased',
                'AI models ignore the prompt entirely',
                'Only the length of a prompt matters, not its content',
              ],
              correctIndex: 1,
              explanation: 'Specific, well-structured prompts consistently produce more useful output than vague ones.',
            },
            {
              id: 'aia-m2-q2',
              question: 'What does the "Role" element of the Role-Context-Task-Format structure refer to?',
              options: [
                'The exact word count required',
                'Telling the AI what perspective or expertise to adopt',
                'The desired output formatting only',
                'It refers to nothing meaningful',
              ],
              correctIndex: 1,
              explanation: 'Specifying a role helps the AI frame its response from a relevant, consistent perspective.',
            },
            {
              id: 'aia-m2-q3',
              question: 'What does this lesson recommend doing with an AI\'s first response?',
              options: [
                'Always accept it as final without changes',
                'Treat it as a draft and iterate with specific feedback',
                'Discard it and never use AI tools again',
                'Ignore the response entirely',
              ],
              correctIndex: 1,
              explanation: 'Iterative feedback typically produces a significantly better final result than a single unrefined prompt.',
            },
          ],
        },
      },
      {
        id: 'aia-m3',
        title: 'Module 3: AI Writing & Content Tools',
        lessons: [
          {
            id: 'aia-m3-l1',
            title: 'Using AI for Content at Scale',
            content: [
              'AI writing tools (general-purpose AI chat assistants, plus specialized content tools) can draft blog posts, social media captions, email sequences, product descriptions, and ad copy dramatically faster than writing everything from scratch — though the realistic, sustainable use case is "AI-assisted," not "fully automated and unsupervised," since AI-generated content still benefits significantly from human editing for accuracy, brand voice, and genuine insight that a generic model can\'t produce alone.',
              'A practical workflow for content-at-scale looks like this: use AI to generate a first draft and several headline/caption variations quickly, select and edit the strongest option to match the specific brand\'s voice and add any real, specific details only a human would know (a genuine customer story, an accurate local reference, current pricing), and use AI again afterward to repurpose that one piece of content into multiple formats — turning one blog post into five social captions, for example, multiplies output without multiplying writing time.',
              'For a business offering this as a service, the deliverable that actually sells is consistency and volume, not novelty — a small business owner who used to post once a week because writing captions felt exhausting can realistically post daily once an AI-assisted workflow is in place, and that increased consistency is what they are actually paying for. For your assignment, pick a real or hypothetical small business, and using the Role-Context-Task-Format prompting structure from Module 2, generate five different social media captions for the same product, then edit the strongest one to add a specific, believable human detail.',
            ],
            keyTakeaways: [
              'AI writing tools draft content fast, but the sustainable approach is "AI-assisted," with human editing for voice, accuracy, and specific real details.',
              'A repurposing workflow (one piece of content → multiple formats) multiplies output without multiplying writing time.',
              'For business clients, the sellable value is consistency and volume, not novelty — AI-assisted workflows let businesses post far more often.',
            ],
          },
        ],
        quiz: {
          id: 'aia-m3-quiz',
          questions: [
            {
              id: 'aia-m3-q1',
              question: 'What is the realistic, sustainable approach to using AI writing tools, according to this lesson?',
              options: [
                'Fully automated with zero human review',
                '"AI-assisted," with human editing for voice, accuracy, and specific real details',
                'Avoiding AI tools for writing entirely',
                'Using AI only for spelling correction',
              ],
              correctIndex: 1,
              explanation: 'AI-assisted workflows combine speed with human judgment for accuracy and authentic brand voice.',
            },
            {
              id: 'aia-m3-q2',
              question: 'What does a "repurposing workflow" accomplish?',
              options: [
                'It deletes original content after one use',
                'It turns one piece of content into multiple formats, multiplying output without multiplying writing time',
                'It has no practical benefit',
                'It only works for video content',
              ],
              correctIndex: 1,
              explanation: 'Repurposing extends the value of a single piece of content across several formats efficiently.',
            },
            {
              id: 'aia-m3-q3',
              question: 'What does this lesson say businesses are actually paying for when they hire AI-assisted content help?',
              options: [
                'Pure novelty with no measurable benefit',
                'Consistency and volume of content they couldn\'t sustain manually',
                'A one-time deliverable with no ongoing value',
                'Nothing of real value',
              ],
              correctIndex: 1,
              explanation: 'Businesses value the ability to post consistently and at higher volume, which AI-assisted workflows enable.',
            },
          ],
        },
      },
      {
        id: 'aia-m4',
        title: 'Module 4: AI Image, Video & Audio Generation',
        lessons: [
          {
            id: 'aia-m4-l1',
            title: 'Creating Visual and Audio Content With AI',
            content: [
              'AI image generation tools can create custom illustrations, product mockups, and marketing visuals from a text description alone, which is especially valuable for businesses that cannot afford traditional photography or illustration but still need visual content for ads, social media, or websites. Effective image prompts benefit from the same specificity principle as text prompts — describing subject, style, lighting, color palette, and composition produces far more usable results than a vague one-line description.',
              'AI video and audio tools extend this same capability further: AI video tools can generate short clips or animate still images into simple motion graphics, and AI voice/audio tools can generate natural-sounding narration in multiple languages and tones from a text script, useful for explainer videos, ads, or audiobook-style content without hiring voice actors. Sound design tools can also generate background music or sound effects matched to a video\'s mood, rounding out a complete multimedia package without needing a production studio.',
              'The realistic, sellable service built from these tools is "rapid content production" — a small business that needs five product images, a 30-second promotional video, and matching background music can realistically receive all three within a day or two using these AI tools combined, compared to weeks and significant cost using traditional production methods. For your assignment, use any free-tier AI image generation tool to create three variations of a product or brand visual for a hypothetical business, applying the specificity principle (subject, style, lighting, color) to your prompts, and note which specific details in your prompt most improved the result.',
            ],
            keyTakeaways: [
              'AI image generation creates custom visuals from text descriptions, with specificity (subject, style, lighting, composition) producing far better results.',
              'AI video and voice/audio tools extend this into motion graphics and natural narration without traditional production costs.',
              'The realistic sellable service is rapid, affordable multimedia content production — delivering in days what traditional production takes weeks to produce.',
            ],
          },
        ],
        quiz: {
          id: 'aia-m4-quiz',
          questions: [
            {
              id: 'aia-m4-q1',
              question: 'What improves the quality of AI image generation results, according to this lesson?',
              options: [
                'Keeping prompts as vague as possible',
                'Describing subject, style, lighting, color palette, and composition specifically',
                'Avoiding any description of style',
                'Using only one-word prompts',
              ],
              correctIndex: 1,
              explanation: 'Specific prompts, similar to text prompting, produce significantly more usable image results.',
            },
            {
              id: 'aia-m4-q2',
              question: 'What can AI voice/audio tools generate from a text script?',
              options: [
                'Only silence',
                'Natural-sounding narration in multiple languages and tones',
                'Physical printed materials',
                'Nothing useful',
              ],
              correctIndex: 1,
              explanation: 'AI voice tools convert scripts into spoken narration without needing human voice actors.',
            },
            {
              id: 'aia-m4-q3',
              question: 'What is the realistic, sellable service this lesson describes building from AI multimedia tools?',
              options: [
                'Slow, expensive production matching traditional studios',
                'Rapid, affordable content production delivering in days what traditional methods take weeks to produce',
                'A service with no commercial value',
                'Only academic research applications',
              ],
              correctIndex: 1,
              explanation: 'Speed and affordability compared to traditional production are the core value proposition for clients.',
            },
          ],
        },
      },
      {
        id: 'aia-m5',
        title: 'Module 5: No-Code Automation Platforms',
        lessons: [
          {
            id: 'aia-m5-l1',
            title: 'Connecting Apps Without Writing Code',
            content: [
              'No-code automation platforms (such as Zapier and Make) let you connect two or more apps together so that an action in one app automatically triggers an action in another, without writing any traditional programming code — for example, automatically saving every new email attachment to a cloud storage folder, or automatically adding every new form submission to a spreadsheet and sending a confirmation email, all without a human manually doing any of those steps.',
              'Every automation (often called a "Zap" or "Scenario," depending on the platform) follows the same basic structure: a Trigger (the event that starts the automation, like "a new form is submitted") and one or more Actions (what happens as a result, like "add a row to a spreadsheet" then "send a Slack message"). Between trigger and action, you can add filters (only continue if a certain condition is met, like "only proceed if the form\'s budget field is above $500") and data mapping (telling the automation exactly which piece of data from the trigger should populate each field in the action).',
              'Learning to think in this trigger-action structure is the core transferable skill in this module — once you can look at any repetitive business task and break it down into "what event should start this, and what should happen automatically as a result," you can build an automation for it regardless of which specific platform or apps are involved. For your assignment, create a free Zapier or Make account, and build one simple, real automation for your own use — for example, automatically saving form responses to a spreadsheet, or sending yourself an email summary when a new file appears in a folder — and document the trigger and action you used.',
            ],
            keyTakeaways: [
              'No-code platforms like Zapier and Make connect apps so actions in one trigger automatic actions in another, with no traditional coding required.',
              'Every automation follows a Trigger → (optional Filter) → Action structure, regardless of platform or specific apps involved.',
              'Learning to break any repetitive task into "what triggers it, what should happen automatically" is the core transferable automation skill.',
            ],
          },
        ],
        quiz: {
          id: 'aia-m5-quiz',
          questions: [
            {
              id: 'aia-m5-q1',
              question: 'What do no-code automation platforms like Zapier and Make let you do?',
              options: [
                'Write traditional backend code from scratch',
                'Connect apps so an action in one automatically triggers an action in another, without coding',
                'Only send emails, with no other functionality',
                'Replace the need for any software at all',
              ],
              correctIndex: 1,
              explanation: 'These platforms automate workflows between apps using a visual, no-code interface.',
            },
            {
              id: 'aia-m5-q2',
              question: 'What is the basic structure every automation follows?',
              options: [
                'Random, unstructured steps with no pattern',
                'A Trigger (the starting event) and one or more Actions (what happens as a result)',
                'Only actions, with no trigger required',
                'A structure unique to each individual platform with no common pattern',
              ],
              correctIndex: 1,
              explanation: 'Trigger-then-action is the consistent underlying structure across automation platforms.',
            },
            {
              id: 'aia-m5-q3',
              question: 'What is described as the core transferable skill in this module?',
              options: [
                'Memorizing every feature of one specific platform',
                'Breaking any repetitive task into "what triggers it, what should happen automatically"',
                'Avoiding automation entirely',
                'Writing complex programming code',
              ],
              correctIndex: 1,
              explanation: 'This trigger-action thinking transfers across platforms and tasks, making it the most valuable underlying skill.',
            },
          ],
        },
      },
      {
        id: 'aia-m6',
        title: 'Module 6: Building AI-Powered Business Workflows',
        lessons: [
          {
            id: 'aia-m6-l1',
            title: 'Combining AI and Automation Into Real Solutions',
            content: [
              'The most valuable, sellable workflows combine AI tools (Modules 2-4) with no-code automation (Module 5) into a single connected process — for example, automatically using AI to draft a personalized reply every time a new customer inquiry email arrives, then automatically sending that draft to a team member for quick approval before it goes out, removing the slowest, most repetitive part of customer response (drafting from scratch) while keeping a human in the loop for quality and judgment.',
              'A useful way to identify which workflows are worth building is to look for tasks that are repetitive (done the same way many times), time-consuming (takes meaningful time each time it\'s done), and rule-based (follows a fairly consistent, describable pattern) — tasks meeting all three criteria are strong automation candidates, while highly creative, judgment-heavy, or rarely repeated tasks are usually poor candidates for full automation. Common examples across small businesses include: lead follow-up sequences (automatically sending a series of emails to new leads), social media content calendars (AI drafts a week of captions, automation schedules them), and customer support triage (AI categorizes incoming questions, automation routes urgent ones directly to a human).',
              'For your assignment, pick a real or hypothetical small business and design (on paper, no need to build it yet) one complete AI-plus-automation workflow: identify the repetitive task, the trigger that starts it, the AI tool that handles the "thinking" part, the automation that handles the "connecting" part, and the point (if any) where a human should review before anything goes live. This kind of end-to-end workflow design, explained clearly, is exactly what you will be selling to clients in the modules ahead.',
            ],
            keyTakeaways: [
              'The most valuable workflows combine AI (for drafting/thinking) with no-code automation (for connecting and triggering) into one connected process.',
              'Strong automation candidates are tasks that are repetitive, time-consuming, and rule-based — not highly creative or rarely repeated tasks.',
              'Designing a complete workflow (trigger, AI step, automation step, human review point) is the core deliverable you will sell to clients.',
            ],
          },
        ],
        quiz: {
          id: 'aia-m6-quiz',
          questions: [
            {
              id: 'aia-m6-q1',
              question: 'What makes the most valuable, sellable workflows according to this lesson?',
              options: [
                'Using only automation with no AI involved',
                'Combining AI tools for drafting/thinking with no-code automation for connecting and triggering',
                'Using only AI with no automation at all',
                'Avoiding any human review entirely',
              ],
              correctIndex: 1,
              explanation: 'Combining AI\'s generative capability with automation\'s connective capability creates the most complete solutions.',
            },
            {
              id: 'aia-m6-q2',
              question: 'Which three criteria identify a strong automation candidate task?',
              options: [
                'Creative, rare, and unpredictable',
                'Repetitive, time-consuming, and rule-based',
                'Expensive, slow, and inconsistent',
                'None of these criteria matter',
              ],
              correctIndex: 1,
              explanation: 'Tasks that are repetitive, time-consuming, and follow a consistent pattern are the best automation candidates.',
            },
            {
              id: 'aia-m6-q3',
              question: 'Why does this lesson recommend including a human review point in some workflows?',
              options: [
                'Human review is never necessary',
                'It keeps quality and judgment in the loop even while automating the repetitive, slow parts',
                'It eliminates the value of automation entirely',
                'It is only relevant for very large companies',
              ],
              correctIndex: 1,
              explanation: 'A review point balances automation\'s speed with the judgment a fully automated system might lack.',
            },
          ],
        },
      },
      {
        id: 'aia-m7',
        title: 'Module 7: AI Chatbots & Customer Support Automation',
        lessons: [
          {
            id: 'aia-m7-l1',
            title: 'Automating the First Line of Customer Conversation',
            content: [
              'AI chatbots, built using tools that connect a language model to a business\'s website, WhatsApp, or social media inbox, can handle the high-volume, repetitive portion of customer support automatically — answering frequently asked questions (pricing, hours, shipping policies), collecting basic information before handing off to a human, and operating 24/7 without needing a human staffed around the clock. This matters enormously for small businesses that cannot afford a full-time support team but still lose customers to slow response times.',
              'Building an effective support chatbot starts with a knowledge base — a clear, organized document of the business\'s most frequently asked questions and their correct answers, which the chatbot tool is then configured to draw from when responding (this is often called connecting the bot to a custom "knowledge source"). A well-scoped chatbot should also know its own limits and hand off gracefully to a human for anything outside its knowledge base, rather than guessing or giving an unhelpful generic answer — a chatbot that confidently gives wrong information damages trust faster than no chatbot at all.',
              'For your assignment, choose a real or hypothetical small business, write out ten realistic frequently asked questions a customer might send (about pricing, delivery, returns, hours, etc.) along with accurate, concise answers, and organize this into a simple knowledge base document — this single document is the foundational deliverable behind almost every AI customer support chatbot project, regardless of which specific chatbot platform is eventually used to build it.',
            ],
            keyTakeaways: [
              'AI chatbots handle high-volume, repetitive customer support questions 24/7, which is especially valuable for small businesses without a full support team.',
              'An effective chatbot relies on a well-organized knowledge base of accurate, frequently asked questions and answers.',
              'A chatbot should hand off gracefully to a human outside its knowledge — confidently giving wrong answers damages trust faster than having no chatbot.',
            ],
          },
        ],
        quiz: {
          id: 'aia-m7-quiz',
          questions: [
            {
              id: 'aia-m7-q1',
              question: 'What kind of customer support tasks are AI chatbots well-suited to handle?',
              options: [
                'Highly complex, unique legal disputes',
                'High-volume, repetitive questions like pricing, hours, and shipping policies',
                'Tasks requiring deep personal judgment with no patterns',
                'Nothing — chatbots have no useful application',
              ],
              correctIndex: 1,
              explanation: 'Chatbots excel at handling frequently repeated, predictable questions at scale.',
            },
            {
              id: 'aia-m7-q2',
              question: 'What does an effective chatbot rely on to answer accurately?',
              options: [
                'Random guessing',
                'A well-organized knowledge base of frequently asked questions and accurate answers',
                'No information source at all',
                'Only the chatbot\'s general training with no business-specific data',
              ],
              correctIndex: 1,
              explanation: 'A structured knowledge base lets the chatbot answer business-specific questions accurately.',
            },
            {
              id: 'aia-m7-q3',
              question: 'What should a well-scoped chatbot do when asked something outside its knowledge base?',
              options: [
                'Confidently guess an answer anyway',
                'Hand off gracefully to a human rather than guessing',
                'Shut down the entire support system',
                'Repeat the same answer regardless of the question',
              ],
              correctIndex: 1,
              explanation: 'Graceful human handoff prevents the trust damage caused by confidently wrong automated answers.',
            },
          ],
        },
      },
      {
        id: 'aia-m8',
        title: 'Module 8: Selling AI Automation Services & Freelancing',
        lessons: [
          {
            id: 'aia-m8-l1',
            title: 'Turning This Skill Into Client Income',
            content: [
              'The most effective way to sell AI automation services is not by describing the technology, but by describing the specific time or money the client will save — "I can save your team 5 hours a week on customer email replies" lands far better with a business owner than "I build AI workflows," because it speaks directly to a problem they already feel rather than a tool they may not understand or care about. Identifying this pitch requires asking the right discovery questions during a first conversation: what repetitive task takes up the most time each week, how is it currently being done, and what would it be worth to get that time back.',
              'A realistic starting service menu for a beginner includes: setting up an AI-assisted content and social media workflow (Module 3), building one or two business automations (Module 5, like lead capture or follow-up emails), or building a simple FAQ chatbot (Module 7) — each of these is scoped, deliverable within days to a couple of weeks, and solves a problem most small businesses immediately recognize. Pricing can follow either a project-based model (a flat fee for a defined, scoped deliverable, which is usually easier for both you and the client to agree on when starting out) or a retainer model (an ongoing monthly fee for maintaining and improving workflows over time, which provides more stable income once you have a few satisfied clients).',
              'For your final assignment in this course, write a short, specific service offer (3-4 sentences) describing one automation or AI-assisted service you could realistically deliver this month, framed entirely around the time or money it saves a business rather than the technology itself, and identify three real local or remote businesses you could send this offer to this week. Completing the modules in this course gives you the capability — sending that first offer is what actually turns it into income.',
            ],
            keyTakeaways: [
              'Selling AI automation services works best when framed around specific time/money saved, not the underlying technology.',
              'A realistic beginner service menu includes content/social automation, business workflow automation, and simple FAQ chatbots — each scoped and deliverable quickly.',
              'Project-based pricing suits getting started; retainer pricing provides more stable income once you have satisfied repeat clients.',
            ],
          },
        ],
        quiz: {
          id: 'aia-m8-quiz',
          questions: [
            {
              id: 'aia-m8-q1',
              question: 'What does this lesson recommend emphasizing when pitching AI automation services?',
              options: [
                'Technical details about the AI model used',
                'The specific time or money the client will save',
                'The number of tools involved in the solution',
                'Nothing in particular — pitching doesn\'t matter',
              ],
              correctIndex: 1,
              explanation: 'Clients respond more to concrete savings than to technical descriptions of the underlying tools.',
            },
            {
              id: 'aia-m8-q2',
              question: 'Which of these is listed as a realistic starting service for a beginner?',
              options: [
                'Building a full enterprise ERP system from scratch',
                'Building a simple FAQ chatbot or a content/automation workflow',
                'Only offering services to Fortune 500 companies',
                'Avoiding any client work until years of experience',
              ],
              correctIndex: 1,
              explanation: 'Scoped, quickly deliverable services like FAQ chatbots or simple automations are realistic starting offers.',
            },
            {
              id: 'aia-m8-q3',
              question: 'What is the difference between project-based and retainer pricing, as described in this lesson?',
              options: [
                'They are identical pricing models',
                'Project-based is a flat fee for a defined deliverable; retainer is an ongoing monthly fee for continued maintenance/improvement',
                'Retainer pricing is only for one-time projects',
                'Project-based pricing cannot be used by beginners',
              ],
              correctIndex: 1,
              explanation: 'Project-based pricing suits a defined scope, while retainers provide ongoing income for continued work.',
            },
          ],
        },
      },
    ],
  },

  // ============================================================
  // COURSE 9 — AI Cinematic Video & Avatar Creation Mastery
  // ============================================================
  {
    id: 'ai-cinematic-video-mastery',
    slug: 'ai-cinematic-video-mastery',
    title: 'AI Cinematic Video & Avatar Creation Mastery',
    description:
      'Direct cinematic AI video with Claude/ChatGPT, Veo 3, and Grok Imagine — prompting, avatars, sound, and sales.',
    skillIds: [],
    category: 'AI Video & Creative Production',
    estimatedHours: 18,
    modules: [
      {
        id: 'cvm-m1',
        title: 'Module 1: The AI Video Revolution',
        lessons: [
          {
            id: 'cvm-m1-l1',
            title: 'How AI Video Models Actually Work',
            content: [
              'AI video generation models are trained on enormous quantities of video and learn to predict, frame by frame, what realistic motion, lighting, and physics should look like — when you give one a text prompt (or a starting image), it generates an entirely new video that did not exist before, rather than searching for and editing existing footage. This is fundamentally different from traditional video production: there is no camera, no actors, and no location — the entire scene is synthesized directly from your description.',
              'Two prompting modes matter for nearly every tool in this course: text-to-video (you describe a scene in words and the model generates motion from nothing) and image-to-video (you provide a starting image — a character, a product shot, a piece of concept art — and the model animates it into motion, often giving you far more control over the final look than text alone). Most professional AI filmmakers combine both: generating a strong still image first with an AI image tool, then animating that exact image into video, since this produces far more consistent, controllable results than text-to-video alone.',
              'Try this now as your first hands-on exercise: open any free-tier AI video tool you have access to, and generate one five-second clip from a simple text prompt describing a scene you can picture clearly (for example, "a cup of coffee steaming on a wooden table by a rainy window, morning light"). Watch closely for what the model gets right and what it gets wrong — noticing these patterns early is what separates someone who can prompt effectively from someone who is just guessing.',
            ],
            keyTakeaways: [
              'AI video models synthesize entirely new motion from a text prompt or starting image — there is no camera, actor, or real location involved.',
              'Text-to-video generates motion from words alone; image-to-video animates a specific starting image, usually with more control.',
              'Combining a strong AI-generated still image with image-to-video animation is the most reliable, professional workflow.',
            ],
          },
          {
            id: 'cvm-m1-l2',
            title: 'Mapping the Tool Landscape: Veo 3, Grok Imagine, and Beyond',
            content: [
              'This course focuses on two leading, currently prominent AI video tools, each with a distinct strength: Veo 3 (Google\'s cinematic video model) is known for strong physical realism, coherent motion, and — critically — generating native synchronized audio (dialogue, sound effects, and ambient sound) directly alongside the video itself, removing a step that used to require separate sound design entirely. Grok Imagine (xAI\'s video and image tool) is known for fast iteration, strong image-to-video animation, and dedicated avatar generation features that let you create and animate a consistent AI character across multiple scenes.',
              'Rather than treating these as competitors to pick one of, professional AI video creators commonly use them for different jobs within the same project: Veo 3 for hero shots that need maximum realism and built-in audio, Grok Imagine for fast avatar-driven content and rapid concept iteration, and general-purpose AI chat assistants (Claude and ChatGPT, covered in depth in Module 2) for writing and refining the actual prompts that drive both tools. Treating your toolkit this way — as a set of specialists, not a single do-everything tool — is the mindset that separates efficient, professional output from slow trial-and-error.',
              'For your assignment, write down, in your own words, one project idea (a 30-second product ad, a short character-driven story, anything realistic) and decide which tool from this lesson you would use for which specific shot or element, and why — this decision-making process, not any single tool\'s button-pressing, is the actual skill this course is building.',
            ],
            keyTakeaways: [
              'Veo 3 is known for physical realism and native synchronized audio generated directly alongside the video.',
              'Grok Imagine is known for fast iteration, strong image-to-video animation, and dedicated avatar generation.',
              'Professional creators treat AI video tools as specialists for different jobs within one project, not a single all-purpose tool.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m1-quiz',
          questions: [
            {
              id: 'cvm-m1-q1',
              question: 'What is the key difference between text-to-video and image-to-video generation?',
              options: [
                'They are identical in every way',
                'Text-to-video generates motion from words alone; image-to-video animates a specific starting image',
                'Image-to-video cannot use any text at all',
                'Text-to-video requires a physical camera',
              ],
              correctIndex: 1,
              explanation: 'Text-to-video starts from a written description; image-to-video starts from and animates an existing image.',
            },
            {
              id: 'cvm-m1-q2',
              question: 'What is Veo 3 specifically noted for in this lesson?',
              options: [
                'Only generating still images',
                'Physical realism and native synchronized audio generated alongside the video',
                'Avatar creation exclusively',
                'It has no distinguishing features',
              ],
              correctIndex: 1,
              explanation: 'Veo 3 is highlighted for realistic motion and built-in audio generation, removing a separate sound design step.',
            },
            {
              id: 'cvm-m1-q3',
              question: 'What mindset does this lesson recommend for using multiple AI video tools on one project?',
              options: [
                'Pick exactly one tool and never use any others',
                'Treat each tool as a specialist for different jobs within the same project',
                'Avoid using more than one tool under any circumstances',
                'Tools should never be combined',
              ],
              correctIndex: 1,
              explanation: 'Using each tool for what it does best, within a single project, is more efficient than relying on one do-everything tool.',
            },
          ],
        },
      },
      {
        id: 'cvm-m2',
        title: 'Module 2: Prompt Engineering for Cinematic Video',
        lessons: [
          {
            id: 'cvm-m2-l1',
            title: 'Writing Prompts That Direct, Not Just Describe',
            content: [
              'A weak video prompt simply describes a subject ("a woman walking on a beach"); a strong cinematic prompt directs a scene the way a film director would, specifying subject, action, setting, camera behavior, lighting, and mood in the same breath — for example: "Wide shot, a woman in a flowing red dress walks slowly along a golden-hour beach, camera tracking smoothly alongside her at eye level, warm backlighting, gentle ocean breeze moving her dress and hair, cinematic and contemplative mood." Every added, specific detail removes a decision the model would otherwise make randomly on your behalf.',
              'A reliable structure for cinematic prompts is: Shot Type (wide, medium, close-up), Subject and Action (who, doing what), Setting (where, including relevant background detail), Camera Behavior (static, tracking, panning, zooming), Lighting and Mood (golden hour, harsh fluorescent, moody and dark, bright and cheerful), and any specific audio cues if your tool supports native sound. Locking this six-part structure into a personal habit, almost like a checklist, is what turns inconsistent, lucky-guess results into consistently directed footage.',
              'Try this now: take the weak prompt "a woman walking on a beach" and rewrite it using all six elements of the structure above, then generate it in any video tool available to you and compare it against a version generated from the original weak prompt — the visible difference in quality and control is the entire point of this lesson.',
            ],
            keyTakeaways: [
              'Strong cinematic prompts direct a scene like a film director, not just describe a subject in isolation.',
              'The six-part structure — Shot Type, Subject/Action, Setting, Camera Behavior, Lighting/Mood, Audio — removes random guesswork from the model.',
              'Comparing a weak prompt against its fully directed rewrite is the fastest way to internalize why specificity matters.',
            ],
          },
          {
            id: 'cvm-m2-l2',
            title: 'Using Claude and ChatGPT as Your Co-Director',
            content: [
              'General-purpose AI chat assistants like Claude and ChatGPT are not video generators themselves, but they are exceptionally useful as a "co-director" that helps you plan, write, and refine prompts before you ever touch a video tool — describe your overall concept in plain language, and ask the assistant to expand it into a full six-part cinematic prompt using the structure from the previous lesson, or to generate five prompt variations exploring different camera angles or moods for the same scene.',
              'A genuinely powerful workflow is to paste your raw idea into Claude or ChatGPT with a prompt like: "Act as a cinematographer. Turn this rough scene idea into a detailed Veo 3 prompt using shot type, subject/action, setting, camera movement, lighting, and mood: [your rough idea]." This Role-Context-Task-Format approach (introduced in the AI Tools & Automation course, and equally useful here) consistently produces far more usable, specific prompts than writing them entirely from scratch yourself, especially when you are still building your own cinematic vocabulary.',
              'Try this now: pick a simple story beat (a character discovering something, a product reveal, an emotional reaction), describe it to Claude or ChatGPT in one casual sentence, and ask it to expand that sentence into three different fully-structured cinematic prompts — one wide establishing shot, one medium character shot, and one close-up detail shot — then save all three for use in Module 3.',
            ],
            keyTakeaways: [
              'Claude and ChatGPT act as a "co-director," helping plan and expand rough ideas into fully structured cinematic prompts.',
              'Asking an assistant to "act as a cinematographer" and apply the six-part structure produces consistently more usable prompts.',
              'Generating multiple shot variations (wide, medium, close-up) from one idea builds a reusable prompt library for later modules.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m2-quiz',
          questions: [
            {
              id: 'cvm-m2-q1',
              question: 'What distinguishes a strong cinematic prompt from a weak one?',
              options: [
                'A strong prompt is always shorter',
                'A strong prompt directs shot type, action, setting, camera behavior, lighting, and mood together',
                'A weak prompt always produces better results',
                'There is no real difference',
              ],
              correctIndex: 1,
              explanation: 'Specificity across all six structural elements gives the model clear direction instead of leaving decisions random.',
            },
            {
              id: 'cvm-m2-q2',
              question: 'What role do Claude and ChatGPT play in this video production workflow?',
              options: [
                'They generate the final video directly',
                'They act as a "co-director," helping expand rough ideas into structured cinematic prompts',
                'They have no useful role in video production',
                'They can only generate still images',
              ],
              correctIndex: 1,
              explanation: 'These assistants help plan and write effective prompts, even though they don\'t generate video themselves.',
            },
            {
              id: 'cvm-m2-q3',
              question: 'Why is asking an assistant to "act as a cinematographer" a useful prompting technique?',
              options: [
                'It has no effect on the output',
                'It frames the response from a relevant expert perspective, producing more specific, usable prompts',
                'It only works for written essays',
                'It prevents any video generation',
              ],
              correctIndex: 1,
              explanation: 'Assigning a role (Module 2 of the AI Tools course) helps the assistant generate more targeted, professional output.',
            },
          ],
        },
      },
      {
        id: 'cvm-m3',
        title: 'Module 3: Mastering Veo 3',
        lessons: [
          {
            id: 'cvm-m3-l1',
            title: "Veo 3's Capabilities and Native Audio",
            content: [
              'Veo 3\'s standout feature is native audio generation — when you describe dialogue, sound effects, or ambient sound directly in your prompt, it generates synchronized audio alongside the video itself, meaning a prompt like "a barista steams milk, the hiss of the steamer audible, soft cafe chatter in the background" produces video and matching sound in a single generation, rather than requiring you to add sound separately in editing later. This single capability can save hours of post-production work compared to silent-video tools.',
              'To prompt dialogue specifically, describe the line of speech directly in quotes within your prompt along with the speaker and their tone — for example: "A young entrepreneur looks directly at the camera and says, with confident energy, \'This is how we change the game.\'" Veo 3 performs best with clear, realistic physical scenarios and natural human motion; it is generally less reliable with highly stylized, fantastical, or physically impossible scenes, so reserve it for the shots in your project that benefit most from grounded realism.',
              'Try this now: write one Veo 3 prompt that includes a piece of spoken dialogue, a specific background sound, and the six-part cinematic structure from Module 2, then generate it if you have access, paying close attention to how well the lip movement, tone, and background sound match what you described.',
            ],
            keyTakeaways: [
              'Veo 3 generates native synchronized audio (dialogue, sound effects, ambience) directly alongside the video from a single prompt.',
              'Describing spoken dialogue in quotes, with speaker and tone, lets Veo 3 generate matching speech and lip movement.',
              'Veo 3 performs best with grounded, realistic scenarios — reserve it for shots that benefit from physical realism.',
            ],
          },
          {
            id: 'cvm-m3-l2',
            title: 'Advanced Veo 3 Prompting Techniques',
            content: [
              'Beyond the basic six-part structure, advanced Veo 3 prompting benefits from specifying lens and camera-equivalent language borrowed from real filmmaking — terms like "shot on 35mm," "shallow depth of field," "drone shot," or "handheld camera with slight shake" give the model strong, well-defined stylistic cues, since these terms appear consistently in the kind of professional footage the model was trained on. Specifying time of day and weather precisely ("overcast midday," "blue hour just after sunset") similarly produces far more controlled, predictable lighting than vague terms like "nice lighting."',
              'When a generation doesn\'t match your intent, the most efficient fix is rarely to start over from scratch — instead, isolate exactly which part failed (the camera movement, the lighting, the action) and rewrite only that specific portion of your prompt with more precise language, keeping everything else the same; this targeted-iteration approach converges on a usable result far faster than repeatedly regenerating an entire prompt from zero. Keeping a running log of which specific phrases produced which specific results — your own personal "prompt dictionary" — is one of the most valuable habits a serious AI filmmaker can build over time.',
              'Try this now: take the dialogue prompt you wrote in the previous lesson, and add one specific camera/lens term and one specific lighting/time-of-day term to it, then note (even without generating, just by reasoning through it) exactly what change you expect to see versus the original — this kind of deliberate, predictive thinking is what builds real prompting expertise faster than blind trial and error.',
            ],
            keyTakeaways: [
              'Borrowing real filmmaking language (35mm, shallow depth of field, drone shot, handheld) gives the model strong, well-defined stylistic cues.',
              'Precise time-of-day and weather terms produce far more controlled, predictable lighting than vague descriptions.',
              'Targeted iteration — fixing only the specific failed element of a prompt — converges on usable results faster than full regeneration.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m3-quiz',
          questions: [
            {
              id: 'cvm-m3-q1',
              question: 'How does Veo 3 typically generate dialogue audio?',
              options: [
                'It cannot generate dialogue at all',
                'By describing the spoken line in quotes along with speaker and tone, producing synchronized audio',
                'Only by uploading a separate pre-recorded audio file',
                'Dialogue is always added manually after generation',
              ],
              correctIndex: 1,
              explanation: 'Quoted dialogue with speaker/tone context lets Veo 3 generate matching synchronized speech.',
            },
            {
              id: 'cvm-m3-q2',
              question: 'Why does specifying filmmaking terms like "35mm" or "shallow depth of field" help Veo 3 prompts?',
              options: [
                'These terms have no effect on output',
                'They give the model strong, well-defined stylistic cues drawn from its training on real footage',
                'They only work for still images, not video',
                'They make generation slower with no quality benefit',
              ],
              correctIndex: 1,
              explanation: 'Real filmmaking terminology maps to consistent patterns in the training data, producing more predictable styling.',
            },
            {
              id: 'cvm-m3-q3',
              question: 'What is the recommended approach when a Veo 3 generation doesn\'t match your intent?',
              options: [
                'Always discard the prompt entirely and start completely from scratch',
                'Isolate and rewrite only the specific failed element of the prompt',
                'Give up on prompting entirely',
                'Generate the exact same prompt repeatedly with no changes',
              ],
              correctIndex: 1,
              explanation: 'Targeted iteration on the specific failed element converges on a usable result more efficiently than full restarts.',
            },
          ],
        },
      },
      {
        id: 'cvm-m4',
        title: 'Module 4: Grok Imagine for Video and Avatars',
        lessons: [
          {
            id: 'cvm-m4-l1',
            title: 'Generating Video and Image-to-Video With Grok Imagine',
            content: [
              'Grok Imagine is built for fast, iterative creation — it generates both still images and video, and its image-to-video mode is particularly strong for taking a single generated or uploaded image and bringing it to life with natural, controllable motion, making it an efficient choice when you already know exactly what your subject should look like and just need it moving. Because iteration is fast, it rewards a "generate many, select the best" workflow more than slower, single-shot tools do — generating three or four variations of the same prompt and picking the strongest is often faster than trying to perfect one single prompt.',
              'When animating a still image into video with Grok Imagine, your prompt should focus specifically on motion and camera behavior rather than re-describing the subject (since the subject is already fixed in the source image) — for example, given a still photo of a product on a table, a strong animation prompt might be "camera slowly orbits around the product, soft studio lighting flickers gently, product rotates slightly" rather than re-describing what the product looks like. This focus on motion-only language, once you internalize it, makes image-to-video prompting noticeably faster to write than text-to-video prompting.',
              'Try this now: generate (or find) one strong still image of a subject you want to animate, then write a motion-only prompt for it following the example above — focus entirely on camera behavior and subject movement, deliberately avoiding any re-description of what the subject looks like.',
            ],
            keyTakeaways: [
              'Grok Imagine excels at fast iteration and image-to-video animation when you already have a clear starting image.',
              'A "generate many, select the best" workflow is efficient given Grok Imagine\'s fast generation speed.',
              'Image-to-video prompts should focus on motion and camera behavior, not re-describing a subject that is already fixed in the source image.',
            ],
          },
          {
            id: 'cvm-m4-l2',
            title: 'Creating and Animating AI Avatars',
            content: [
              'An AI avatar is a consistent, reusable digital character — a virtual presenter, a branded mascot, or a stylized version of a real person — that can be animated to speak, gesture, and appear across multiple videos while maintaining the same recognizable appearance each time, which is essential for any content series, brand presence, or recurring character-driven project. Grok Imagine\'s avatar features let you generate a strong reference image of your character first, then animate that exact reference into talking, moving video, similar in principle to the image-to-video workflow from the previous lesson but optimized specifically for character performance.',
              'A strong avatar reference image should be generated with deliberate attention to features that need to stay consistent: clothing, hairstyle, facial features, and any distinctive accessories, described with enough specific detail ("a young woman with shoulder-length curly black hair, round wire-frame glasses, wearing a navy blazer") that regenerating the same description produces a recognizably similar result each time — vague descriptions produce a different-looking "character" every single generation, breaking the illusion of a consistent presenter.',
              'Try this now: write one detailed avatar description (following the specificity example above) for a hypothetical brand spokesperson or content creator persona, generate it if you have access to an avatar tool, and then write a short, separate animation prompt for that same avatar speaking a single line of dialogue — keeping the character description and the animation/dialogue instructions clearly separated, exactly as practiced in the previous lesson.',
            ],
            keyTakeaways: [
              'An AI avatar is a consistent, reusable character that can be animated across multiple videos while keeping a recognizable appearance.',
              'A strong avatar reference description specifies exact, stable features (hair, clothing, accessories) in enough detail to regenerate consistently.',
              'Separating the character\'s fixed description from each scene\'s separate animation/dialogue prompt keeps avatar work organized and consistent.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m4-quiz',
          questions: [
            {
              id: 'cvm-m4-q1',
              question: 'What should an image-to-video prompt in Grok Imagine primarily focus on?',
              options: [
                'Re-describing exactly what the subject looks like',
                'Motion and camera behavior, since the subject is already fixed in the source image',
                'Nothing — image-to-video requires no prompt at all',
                'Only the background music',
              ],
              correctIndex: 1,
              explanation: 'Since the subject is fixed, the prompt should describe how it moves and how the camera behaves, not what it looks like.',
            },
            {
              id: 'cvm-m4-q2',
              question: 'What makes an AI avatar useful for ongoing content?',
              options: [
                'It looks completely different in every single video',
                'It maintains a consistent, recognizable appearance across multiple videos',
                'It cannot be animated at all',
                'It has no practical use case',
              ],
              correctIndex: 1,
              explanation: 'Consistency across appearances is what makes an avatar usable as a recurring presenter or character.',
            },
            {
              id: 'cvm-m4-q3',
              question: 'Why does a vague avatar description cause problems?',
              options: [
                'Vague descriptions have no effect on results',
                'It produces a different-looking "character" each generation, breaking consistency',
                'Vague descriptions always produce more consistent results',
                'Avatar descriptions never need any detail',
              ],
              correctIndex: 1,
              explanation: 'Specific, stable details are needed to regenerate a recognizably similar character across multiple generations.',
            },
          ],
        },
      },
      {
        id: 'cvm-m5',
        title: 'Module 5: The Language of Cinema',
        lessons: [
          {
            id: 'cvm-m5-l1',
            title: 'Shot Types and Composition',
            content: [
              'Every shot type carries a specific emotional and informational purpose: a wide/establishing shot shows the full scene and setting, orienting the viewer to where they are; a medium shot (roughly waist-up) is the workhorse of most storytelling, balancing subject detail with surrounding context; and a close-up isolates a face or object, used specifically to convey emotion or draw attention to an important detail. Learning to specify the right shot type for the right moment — not just defaulting to the same shot repeatedly — is one of the fastest ways to make AI-generated video feel intentionally directed rather than randomly generated.',
              'Composition rules borrowed directly from photography and film apply just as strongly to AI-prompted shots: the rule of thirds (placing key subjects off-center, roughly a third of the way into the frame, rather than dead-center, generally feels more dynamic and professional) and leading the eye (using lines, lighting, or motion within the frame to direct attention exactly where you want it) can both be explicitly requested in a prompt — for example, "subject positioned in the left third of frame, soft light leading the eye toward her face."',
              'Try this now: pick any single subject (a person, a product, an animal) and write three separate prompts for the exact same subject — one wide shot, one medium shot, and one close-up — each correctly using the appropriate framing language from this lesson, and notice how differently each version would communicate the same scene.',
            ],
            keyTakeaways: [
              'Wide, medium, and close-up shots each serve a distinct storytelling purpose — orienting, balancing, or emphasizing emotion/detail.',
              'The rule of thirds and intentional eye-leading can be explicitly requested in prompts, not just left to chance.',
              'Deliberately varying shot type across a project is what makes AI-generated video feel directed rather than randomly generated.',
            ],
          },
          {
            id: 'cvm-m5-l2',
            title: 'Camera Movement and Lighting in Prompts',
            content: [
              'Camera movement adds energy and narrative meaning beyond what a static shot can convey: a slow push-in toward a subject builds tension or intimacy, a pull-back/reveal builds context or surprise, a tracking shot (camera moving alongside a moving subject) creates dynamic energy, and a static locked-off shot conveys stillness or stability — each of these should be chosen deliberately based on the emotional effect you want, then named explicitly in your prompt ("slow push-in," "smooth tracking shot alongside the subject").',
              'Lighting is equally communicative: golden hour (warm, low-angle sunlight) feels nostalgic or romantic; harsh overhead fluorescent feels clinical, sterile, or unsettling; low-key lighting (mostly dark, with strong shadows) feels dramatic or suspenseful; and high-key lighting (bright, even, minimal shadow) feels cheerful or commercial. Matching your lighting description to the actual mood of your scene — rather than defaulting to generic "nice lighting" — is one of the highest-leverage, lowest-effort improvements you can make to any prompt.',
              'Try this now: take one of the three shots you wrote in the previous lesson, and add a specific camera movement and a specific lighting description that reinforces the emotional tone you want that shot to carry — write one sentence explaining why you chose that particular combination, connecting your choice explicitly back to the mood concepts in this lesson.',
            ],
            keyTakeaways: [
              'Camera movements (push-in, pull-back, tracking, static) each carry distinct narrative and emotional meaning that should be chosen deliberately.',
              'Lighting styles (golden hour, harsh fluorescent, low-key, high-key) communicate mood and should match the scene\'s intended emotional tone.',
              'Naming specific camera movement and lighting in a prompt, rather than defaulting to generic terms, meaningfully improves output quality.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m5-quiz',
          questions: [
            {
              id: 'cvm-m5-q1',
              question: 'What is the primary purpose of a close-up shot?',
              options: [
                'To show the full setting and orient the viewer',
                'To isolate a face or object and convey emotion or important detail',
                'To replace the need for any other shot type',
                'Close-ups have no specific purpose',
              ],
              correctIndex: 1,
              explanation: 'Close-ups focus attention tightly to emphasize emotion or a specific detail.',
            },
            {
              id: 'cvm-m5-q2',
              question: 'What emotional effect does a slow push-in camera movement typically create?',
              options: [
                'Confusion with no clear effect',
                'Builds tension or intimacy',
                'Always signals the end of a scene',
                'It has the same effect as a static shot',
              ],
              correctIndex: 1,
              explanation: 'A slow push toward a subject draws the viewer in, often building emotional intensity or closeness.',
            },
            {
              id: 'cvm-m5-q3',
              question: 'Why does low-key lighting typically feel dramatic or suspenseful?',
              options: [
                'It uses bright, even lighting with no shadows',
                'It uses mostly dark tones with strong shadows',
                'Lighting has no effect on mood',
                'It is identical to high-key lighting',
              ],
              correctIndex: 1,
              explanation: 'Strong shadows and limited light create a moody, tense visual atmosphere associated with drama and suspense.',
            },
          ],
        },
      },
      {
        id: 'cvm-m6',
        title: 'Module 6: Character & Avatar Consistency',
        lessons: [
          {
            id: 'cvm-m6-l1',
            title: 'Solving the Consistency Problem',
            content: [
              'The single hardest technical challenge in AI video production is consistency — making the same character, product, or location look recognizably identical across multiple separate generations, since each generation is technically a brand-new creation with no inherent memory of previous ones. This matters enormously for any multi-shot project: a character whose face or outfit subtly shifts between shots breaks the viewer\'s sense of continuity and immediately signals "AI-generated" in a way that undermines the project\'s credibility.',
              'The most reliable consistency technique covered already in this course is image-to-video animation from one single, carefully created reference image (Module 4) — since the subject\'s exact appearance is locked into that one image and only its motion changes across generations, this approach inherently avoids the consistency problem that text-to-video re-generation introduces every time. A second technique is maintaining an extremely detailed, copy-pasted description of your character or subject (the "character bible," covered in the next lesson) that you reuse word-for-word across every related prompt, minimizing the random variation a model introduces when given even slightly different wording each time.',
              'Try this now: imagine a two-shot sequence featuring the same character (a wide shot, then a close-up), and write both prompts using the exact same word-for-word character description in each — notice how repeating identical language, rather than re-describing the character slightly differently each time, is itself a deliberate consistency technique.',
            ],
            keyTakeaways: [
              'Consistency across generations is the hardest technical challenge in AI video, since each generation has no memory of previous ones.',
              'Image-to-video animation from one fixed reference image is the most reliable consistency technique available.',
              'Reusing an identical, detailed character description word-for-word across prompts minimizes random variation between generations.',
            ],
          },
          {
            id: 'cvm-m6-l2',
            title: 'Building a Reusable Character Bible',
            content: [
              'A character bible is a single, detailed reference document describing every visually important attribute of a character or recurring subject — physical features, clothing, accessories, and even personality-driven mannerisms that might influence how they move or express emotion — written once and then reused, unedited, as the foundation of every prompt involving that character. Treating this document as fixed and non-negotiable, rather than rewriting the description slightly differently each time you need it, is what actually produces consistency in practice, not just in theory.',
              'A practical character bible entry includes: a name (even for internal use only), age range and build, specific facial features (hair color/style, eye color, any distinguishing marks), a default outfit description, and a one-sentence personality note that might inform expression or posture (e.g., "confident and warm, tends to make direct eye contact"). Storing this in a simple text document or note that you copy from for every new prompt — rather than trying to remember or improvise the description from memory — removes the single biggest source of unintended inconsistency.',
              'For your assignment, write a complete character bible entry (following the template above) for a hypothetical avatar or character you might use in a real project, then write two different scene prompts (a different setting and action for each) that both incorporate this exact character bible description word-for-word — confirming for yourself that the description transfers cleanly across different scenes.',
            ],
            keyTakeaways: [
              'A character bible is a fixed, detailed reference document for a character\'s appearance, reused unedited across every related prompt.',
              'A complete entry includes name, build, facial features, default outfit, and a personality note influencing expression or posture.',
              'Copying the exact same character bible text into every new prompt, rather than improvising from memory, is what actually produces consistency.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m6-quiz',
          questions: [
            {
              id: 'cvm-m6-q1',
              question: 'Why is consistency the hardest technical challenge in AI video production?',
              options: [
                'It is not actually a real challenge',
                'Each generation is a brand-new creation with no inherent memory of previous generations',
                'Consistency only matters for audio, not visuals',
                'AI video tools automatically guarantee perfect consistency',
              ],
              correctIndex: 1,
              explanation: 'Without a shared memory between generations, subtle variations naturally creep in unless deliberately controlled for.',
            },
            {
              id: 'cvm-m6-q2',
              question: 'What is a "character bible" in this context?',
              options: [
                'A religious text',
                'A fixed, detailed reference document describing a character\'s appearance, reused across prompts',
                'A type of video editing software',
                'A randomly generated character description used once',
              ],
              correctIndex: 1,
              explanation: 'A character bible standardizes the description used across every prompt involving that character.',
            },
            {
              id: 'cvm-m6-q3',
              question: 'Why should a character bible be reused word-for-word rather than rewritten each time?',
              options: [
                'Rewriting it each time always improves consistency',
                'Reusing identical language minimizes random variation introduced by slightly different wording',
                'It has no effect on consistency either way',
                'Word-for-word reuse is technically impossible',
              ],
              correctIndex: 1,
              explanation: 'Identical input text reduces the chance of the model introducing unintended visual differences between generations.',
            },
          ],
        },
      },
      {
        id: 'cvm-m7',
        title: 'Module 7: Storyboarding and Scene Sequencing',
        lessons: [
          {
            id: 'cvm-m7-l1',
            title: 'From Script to Storyboard',
            content: [
              'A storyboard is a sequence of simple sketches or descriptions representing each planned shot in order, created before any generation begins — its purpose is to work out story flow, pacing, and shot variety on paper (or in a simple document) where changes are free and instant, rather than discovering structural problems only after spending time and generation credits on finished AI clips. Even a rough storyboard — a numbered list with one sentence per shot describing what happens and what shot type/camera move is used — dramatically improves the coherence of the final video compared to generating shots one at a time with no overall plan.',
              'A practical storyboarding process for AI video starts with a short script or outline (even three or four sentences describing what happens), then breaking that script into individual shots, assigning each shot a shot type and rough duration (most AI video clips currently run 5-10 seconds, so a 30-second final video might require three to six separate generated shots stitched together), and noting which shots reuse the same character or location (flagging where your character bible from Module 6 needs to be applied consistently).',
              'For your assignment, write a simple four-sentence script for a short video concept (a product reveal, a brief story beat, anything realistic), then break it into a numbered shot list specifying shot type and rough action for each shot — this shot list is the direct blueprint you will generate from in the next lesson and turn into prompts using the techniques from Modules 2 and 5.',
            ],
            keyTakeaways: [
              'A storyboard works out story flow and shot variety before any generation begins, where changes are free and instant.',
              'Breaking a script into individual shots with assigned shot types and durations is the practical core of AI video storyboarding.',
              'Flagging which shots reuse the same character or location connects storyboarding directly to the consistency techniques from Module 6.',
            ],
          },
          {
            id: 'cvm-m7-l2',
            title: 'Sequencing Shots Into a Coherent Story',
            content: [
              'Shot sequencing is the deliberate ordering and pacing of your individual shots so the final video reads as one coherent story rather than a disconnected collection of clips — a common, effective pattern is establishing shot (wide, sets the scene) → medium shot (introduces the subject/action) → close-up (delivers the emotional or detail payoff), mirroring the classic wide-medium-close rhythm used throughout traditional filmmaking. Varying shot type between consecutive clips, rather than using the same framing repeatedly, is one of the simplest ways to make a sequence feel professionally edited rather than monotonous.',
              'Transitions between AI-generated clips matter just as much as the clips themselves — a hard cut (an instant change between shots) works well when the energy or location changes abruptly, while maintaining consistent lighting and color tone across consecutive shots (even when shot type changes) makes the transition feel intentional rather than jarring; this is one more reason why locking lighting language into your prompts (Module 5) pays off at the sequencing stage, not just within a single shot. As you sequence shots, also consider pacing: a sequence of all very short shots feels frenetic and energetic, while longer-held shots feel calmer and more contemplative — match this rhythm to the mood of your overall project.',
              'For your final assignment in this module, take the shot list you built in the previous lesson and write out the actual cinematic prompts for each shot (using the six-part structure from Module 2), explicitly noting consistent lighting/color language across all shots and a deliberate wide-medium-close (or similar) sequencing pattern — this complete shot-by-shot prompt set is what you would actually generate and assemble in Module 9.',
            ],
            keyTakeaways: [
              'The wide-medium-close shot sequencing pattern mirrors classic film rhythm and creates a coherent, professional-feeling video.',
              'Consistent lighting and color tone across consecutive shots makes transitions feel intentional rather than jarring.',
              'Shot duration and pacing should match the intended mood — short shots feel energetic, longer shots feel calm and contemplative.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m7-quiz',
          questions: [
            {
              id: 'cvm-m7-q1',
              question: 'What is the main purpose of storyboarding before generating any AI video?',
              options: [
                'To waste time before production',
                'To work out story flow and shot variety where changes are free, before spending time on generation',
                'Storyboarding has no real benefit for AI video',
                'To replace the need for any prompts at all',
              ],
              correctIndex: 1,
              explanation: 'Planning on paper avoids discovering structural problems only after generating expensive, time-consuming clips.',
            },
            {
              id: 'cvm-m7-q2',
              question: 'What is the classic shot sequencing pattern described in this lesson?',
              options: [
                'Close-up, then close-up, then close-up',
                'Establishing/wide shot, then medium shot, then close-up',
                'Random ordering with no pattern',
                'Only ever using one single shot type',
              ],
              correctIndex: 1,
              explanation: 'Wide-medium-close mirrors traditional filmmaking rhythm and creates coherent visual storytelling.',
            },
            {
              id: 'cvm-m7-q3',
              question: 'Why does consistent lighting/color tone across shots matter for transitions?',
              options: [
                'It has no effect on how transitions feel',
                'It makes cuts between shots feel intentional rather than jarring',
                'Lighting consistency only matters within a single shot, never across shots',
                'It is impossible to control lighting consistency in prompts',
              ],
              correctIndex: 1,
              explanation: 'Matching lighting/color language across shots smooths transitions and reinforces a unified visual style.',
            },
          ],
        },
      },
      {
        id: 'cvm-m8',
        title: 'Module 8: Sound, Voice and Music',
        lessons: [
          {
            id: 'cvm-m8-l1',
            title: 'Native Audio vs. Post-Production Sound',
            content: [
              'Some AI video tools (notably Veo 3, covered in Module 3) generate native audio directly alongside the video — dialogue, ambient sound, and sound effects all produced in the same generation step — while others (including most image-to-video tools like Grok Imagine) currently produce silent video that requires sound to be added afterward in a separate editing step. Knowing which category your chosen tool falls into changes your entire production plan: native-audio tools let you write sound directly into your cinematic prompts (Module 3), while silent-video tools require you to plan sound separately and add it during post-production (covered next in this module).',
              'When working with silent AI video clips, a simple but effective sound layering approach covers most needs: a background ambience track (room tone, outdoor sound, music bed) sets the overall mood, sound effects (footsteps, a door closing, a notification sound) reinforce specific actions visible on screen, and voiceover or music (Module 8, Lesson 2) carries the primary information or emotional through-line. Even amateur sound layering dramatically improves perceived production quality — silent or poorly-matched audio is one of the fastest ways a video reveals itself as unfinished or low-effort, regardless of how strong the visuals are.',
              'For your assignment, take one silent AI-generated clip (or imagine one based on a prompt you\'ve already written) and write out, in a simple list, the specific ambience, sound effects, and music/voiceover you would layer onto it to support the visual action — being this deliberate about sound planning, even before touching any audio software, is what separates polished AI video work from work that looks "almost there."',
            ],
            keyTakeaways: [
              'Native-audio tools like Veo 3 generate sound directly with the video; other tools like Grok Imagine produce silent video requiring separate sound addition.',
              'A simple sound layering approach — ambience, sound effects, voiceover/music — covers most silent-video sound needs.',
              'Deliberate sound planning dramatically improves perceived production quality, even before any audio editing software is used.',
            ],
          },
          {
            id: 'cvm-m8-l2',
            title: 'AI Voice and Music Tools',
            content: [
              'AI voice generation tools convert a written script into natural-sounding spoken narration in a chosen tone, accent, and language, making professional-sounding voiceover accessible without hiring a voice actor — useful for narration, explainer dialogue, or giving an avatar (Module 4) a consistent speaking voice across multiple videos. When writing a script for AI voice generation, punctuation matters more than people expect: commas and periods control pacing and breathing, and breaking long sentences into shorter ones generally produces more natural-sounding delivery than long, run-on sentences.',
              'AI music generation tools can produce custom background music or short stings matched to a described mood and genre ("upbeat corporate background music, optimistic and energetic" or "tense, minimal ambient drone for a suspenseful reveal"), removing the licensing complications and cost of using existing copyrighted music while giving you a soundtrack tailored exactly to your video\'s pacing and mood. Matching music energy to your visual pacing (Module 7) — energetic music under fast cuts, sparse or quiet music under slow, contemplative shots — is a simple alignment check that meaningfully improves how professional a finished piece feels.',
              'For your final assignment in this module, write a short voiceover script (3-4 sentences, with deliberate punctuation for pacing) for the video concept you have been developing throughout this course, and describe in one sentence the mood and genre of background music you would generate to accompany it — explicitly connecting your music choice back to the pacing and mood decisions made in Module 7.',
            ],
            keyTakeaways: [
              'AI voice tools convert scripts into natural narration, with punctuation directly controlling pacing and delivery quality.',
              'AI music generation produces custom, mood-matched soundtracks without the licensing complications of existing copyrighted music.',
              'Matching music energy to visual pacing (fast cuts with energetic music, slow shots with sparse music) improves perceived production quality.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m8-quiz',
          questions: [
            {
              id: 'cvm-m8-q1',
              question: 'What distinguishes a native-audio video tool from a silent-video tool?',
              options: [
                'There is no real distinction',
                'Native-audio tools generate sound directly with the video; silent tools require sound added separately afterward',
                'Silent tools always produce better quality video',
                'Native-audio tools cannot generate any visuals',
              ],
              correctIndex: 1,
              explanation: 'This distinction determines whether sound is planned within the prompt or added in a separate post-production step.',
            },
            {
              id: 'cvm-m8-q2',
              question: 'Why does punctuation matter when writing a script for AI voice generation?',
              options: [
                'Punctuation has no effect on AI voice output',
                'Commas and periods control pacing and breathing, affecting how natural the delivery sounds',
                'AI voice tools ignore punctuation entirely',
                'Punctuation only matters for written text, never for spoken audio',
              ],
              correctIndex: 1,
              explanation: 'Punctuation directly shapes the rhythm and naturalness of AI-generated speech.',
            },
            {
              id: 'cvm-m8-q3',
              question: 'What is a key benefit of AI-generated background music over using existing copyrighted tracks?',
              options: [
                'It removes licensing complications while matching the exact mood and pacing needed',
                'It is always lower quality than existing music',
                'It cannot be customized in any way',
                'There is no benefit at all',
              ],
              correctIndex: 0,
              explanation: 'Custom AI music avoids licensing issues and can be tailored precisely to the video\'s mood and pacing.',
            },
          ],
        },
      },
      {
        id: 'cvm-m9',
        title: 'Module 9: Editing and Post-Production',
        lessons: [
          {
            id: 'cvm-m9-l1',
            title: 'Assembling Your AI-Generated Clips',
            content: [
              'Once you have generated your individual AI video clips, assembling them into a final sequence requires a basic video editor — free, accessible options like CapCut and DaVinci Resolve (both have generous free tiers) handle everything a beginner needs: arranging clips in order on a timeline, trimming the start/end of each clip, and layering audio tracks (voiceover, music, sound effects from Module 8) underneath the visual sequence. Even simple, correctly-ordered assembly following your storyboard (Module 7) immediately elevates raw AI clips from "a pile of generated footage" to "a finished video."',
              'Trimming matters more than beginners expect: most AI-generated clips have a slightly awkward beginning or end (motion not fully settled, an unintended artifact), and trimming even half a second off the start or end of a clip often improves perceived quality significantly, since it removes the rough edges visible in raw, untrimmed generations. Basic transitions (a simple cut is usually best and most professional; cross-dissolves can work for slower, more contemplative sequences, but are easy to overuse) and consistent audio levels (your voiceover should always be clearly audible over background music, never fighting with it for attention) round out the core, non-negotiable editing basics.',
              'For your assignment, if you have access to any free video editor, import three placeholder clips (even simple smartphone clips work for practice) and assemble them in sequence, trim each one by a few frames at the start and end, and add a simple audio track underneath — if you don\'t yet have generated AI clips to work with, complete this exercise with any available footage purely to build comfort with the editing workflow itself before your first real AI project.',
            ],
            keyTakeaways: [
              'Free tools like CapCut and DaVinci Resolve handle the core editing needs of arranging, trimming, and layering audio on AI-generated clips.',
              'Trimming even small amounts off the start/end of AI clips often meaningfully improves perceived quality by removing rough edges.',
              'Simple cuts are usually the most professional transition choice; voiceover should always remain clearly audible over background music.',
            ],
          },
          {
            id: 'cvm-m9-l2',
            title: 'Color, Pacing, and Final Polish',
            content: [
              'Color grading — adjusting the overall color tone, contrast, and saturation of your assembled footage — is the step that makes AI-generated clips from different generations (and potentially different tools) feel like they belong to the same unified project, even when their raw color output varies slightly between generations; applying one consistent color preset or manual adjustment across your entire timeline is usually enough to achieve this, without needing advanced color theory knowledge. Most free editors include simple one-click color presets or basic sliders for warmth, contrast, and saturation that are more than sufficient for this purpose at a beginner level.',
              'Final pacing review means watching your fully assembled video straight through, at least once, with fresh eyes (ideally after taking a short break from editing it) specifically checking whether any section drags, whether the overall length matches the platform you\'re publishing to (short-form platforms reward videos under 30-60 seconds; other platforms tolerate longer), and whether the opening 2-3 seconds are strong enough to stop someone from scrolling past — this opening-hook check matters disproportionately, since most viewers decide whether to keep watching within the first few seconds.',
              'For your final assignment in this course\'s production modules, take the complete shot-by-shot prompt set you built in Module 7, and write a short post-production checklist (in your own words) covering trimming, color consistency, audio levels, and an opening-hook review — this checklist becomes your repeatable quality-control process for every future AI video project, not just this one course exercise.',
            ],
            keyTakeaways: [
              'Consistent color grading across all clips makes footage from different generations feel like one unified project.',
              'A final pacing review with fresh eyes catches dragging sections, length mismatches, and a weak opening hook.',
              'The first 2-3 seconds of a video matter disproportionately, since most viewers decide whether to keep watching almost immediately.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m9-quiz',
          questions: [
            {
              id: 'cvm-m9-q1',
              question: 'Why does trimming the start/end of AI-generated clips matter?',
              options: [
                'Trimming has no effect on perceived quality',
                'It removes rough edges like unsettled motion, often significantly improving perceived quality',
                'Trimming always makes a clip worse',
                'AI clips never need any trimming',
              ],
              correctIndex: 1,
              explanation: 'Removing slightly awkward beginnings/endings polishes raw AI footage noticeably.',
            },
            {
              id: 'cvm-m9-q2',
              question: 'What does consistent color grading achieve across an assembled AI video?',
              options: [
                'It makes footage from different generations feel like one unified project',
                'It has no visual effect at all',
                'It is only relevant for traditional film, never AI video',
                'It always makes footage look worse',
              ],
              correctIndex: 0,
              explanation: 'Unified color tone smooths over natural variation between separate AI generations.',
            },
            {
              id: 'cvm-m9-q3',
              question: 'Why does the opening 2-3 seconds of a video matter disproportionately?',
              options: [
                'They have no special importance',
                'Most viewers decide whether to keep watching within the first few seconds',
                'Only the final seconds of a video matter',
                'Opening seconds are always skipped automatically',
              ],
              correctIndex: 1,
              explanation: 'A weak opening causes viewers to scroll away before the rest of the video is ever seen.',
            },
          ],
        },
      },
      {
        id: 'cvm-m10',
        title: 'Module 10: Selling AI Video Services',
        lessons: [
          {
            id: 'cvm-m10-l1',
            title: 'Building a Demo Reel and Portfolio',
            content: [
              'A demo reel — a short, tightly edited compilation (60-90 seconds is usually plenty) showcasing your strongest individual shots and short sequences — is the single most persuasive asset for landing AI video clients, since it lets a potential client watch your actual capability in under two minutes rather than reading a description of it. Curate ruthlessly: a reel of five genuinely strong shots beats a reel of fifteen mediocre ones, since a demo reel is judged on its weakest moment as much as its strongest.',
              'For a beginner without paid client work yet, a portfolio can legitimately be built from self-initiated concept projects covering a range of realistic client use cases: a product showcase, a brand mascot/avatar introduction, a short narrative ad, and a social-media-style talking-avatar clip — together, this range demonstrates versatility across the most common types of paid AI video work, rather than only proving you can do one narrow thing well. Organizing your portfolio by use case (rather than just a single undifferentiated reel) also makes it far easier for a potential client to immediately see themselves in your previous work.',
              'For your assignment, using everything built across this course\'s modules (prompts, shot lists, character bibles, sound planning), produce a written production plan for one complete demo project — pick one use case (product showcase, avatar introduction, or narrative ad), and write the full set of deliverables: script, shot list, prompts, sound plan, and a one-sentence description of the finished piece — this plan is the direct blueprint for the actual demo reel piece you would produce next.',
            ],
            keyTakeaways: [
              'A tight, 60-90 second demo reel showcasing your strongest work is the most persuasive asset for landing AI video clients.',
              'A portfolio spanning multiple realistic use cases (product, avatar, narrative ad) demonstrates versatility better than one narrow reel.',
              'Organizing a portfolio by use case helps potential clients immediately see themselves in your previous work.',
            ],
          },
          {
            id: 'cvm-m10-l2',
            title: 'Pricing and Pitching AI Video Services',
            content: [
              'AI video services can realistically be priced and sold across several common deliverables: short social media ads or product videos (typically the fastest, most in-demand entry point for new clients), branded avatar creation and ongoing avatar-driven content (an attractive recurring/retainer service, since a consistent avatar requires regular new content), and full narrative short-form pieces for brands or creators wanting something more cinematic than a typical social ad. Pricing should reflect the value delivered (a usable, polished ad a client can run immediately) rather than the time spent generating, since AI tools have made production dramatically faster than traditional filming — undervaluing your work purely based on how quickly AI lets you produce it is a common, avoidable beginner mistake.',
              'When pitching, lead with the demo reel and a specific, relevant example from your portfolio matching the client\'s exact use case (show them an avatar example if they need an avatar, a product ad example if they need a product ad) rather than a generic showreel — specificity in a pitch dramatically increases conversion compared to a one-size-fits-all approach, since it lets the client immediately picture their own project in your established style. A simple, confident pitch structure works well: state the specific deliverable you can produce, reference a relevant portfolio example, name a realistic turnaround time, and propose a clear price for a defined first project.',
              'For your final assignment in this course, write a complete pitch (4-5 sentences) for one specific AI video service from this lesson, referencing a specific (even hypothetical, for now) portfolio piece matching that service, with a realistic turnaround time and price — then identify three real businesses, creators, or platforms you could realistically send this exact pitch to this month. Completing the modules in this course built the capability; sending that first pitch is what turns it into actual income.',
            ],
            keyTakeaways: [
              'Social ads, branded avatar content, and cinematic narrative pieces are the main sellable AI video service categories, each with different pricing dynamics.',
              'Pricing should reflect the value delivered to the client, not just how quickly AI tools let you produce the work.',
              'A specific pitch referencing a relevant portfolio example converts far better than a generic, one-size-fits-all showreel pitch.',
            ],
          },
        ],
        quiz: {
          id: 'cvm-m10-quiz',
          questions: [
            {
              id: 'cvm-m10-q1',
              question: 'What is described as the most persuasive asset for landing AI video clients?',
              options: [
                'A long written resume with no video examples',
                'A tight, curated demo reel showcasing your strongest work',
                'A list of software you own',
                'Nothing — clients never care about previous work',
              ],
              correctIndex: 1,
              explanation: 'A demo reel lets clients quickly see actual capability, which is more persuasive than a written description.',
            },
            {
              id: 'cvm-m10-q2',
              question: 'What does this lesson say pricing should reflect?',
              options: [
                'Only the amount of time spent generating the content',
                'The value delivered to the client, not just how quickly AI tools made production',
                'Pricing should always be as low as possible regardless of value',
                'Pricing has no real basis and should be random',
              ],
              correctIndex: 1,
              explanation: 'Value-based pricing avoids undervaluing work simply because AI accelerated production speed.',
            },
            {
              id: 'cvm-m10-q3',
              question: 'Why does a specific pitch referencing a relevant portfolio example convert better than a generic pitch?',
              options: [
                'It does not convert better — generic pitches always perform the same',
                'It lets the client immediately picture their own project in your established style',
                'Specific pitches are illegal in some markets',
                'Clients never read pitches regardless of specificity',
              ],
              correctIndex: 1,
              explanation: 'Matching the example to the client\'s exact need makes the pitch immediately relevant and credible.',
            },
          ],
        },
      },
    ],
  },
];
module.exports = { COURSES };
