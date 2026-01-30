import React, { useState, useEffect } from 'react';

const sponsorshipItems = [
 // PLUG & PLAY IDEAS
 { id: 1, name: "Meet-a-Stranger Benches", price: 2500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Meet-a-Stranger-Benches.png",
  description: "Branded benches placed across the site with a simple prompt that makes meeting new people feel natural. A small idea that creates hundreds of conversations.",
  includes: ["Branded benches across site", "Conversation prompt signage", "Logo on all benches", "Social media feature"],
  tags: ["networking", "brand-awareness"] },
 
 { id: 2, name: "No Small Talk Question Cards", price: 2000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Question-Cards.png",
  description: "Branded question cards placed on tables and in lounges to spark better chats instantly. Takes networking from awkward to genuinely useful.",
  includes: ["Branded question card decks", "Placement across all lounges and tables", "Logo on every card", "Digital version for app"],
  tags: ["networking", "brand-awareness"] },
 
 { id: 3, name: '"Ask me about..." Sticker Station', price: 1800, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Sticker-Station.png",
  description: 'Attendees grab branded stickers like "Hiring", "Raising", "Marketing", "Ops", "AI". It turns the whole festival into an easy conversation starter.',
  includes: ["Branded sticker station", "Custom sticker designs", "Prime location placement", "Logo on all materials"],
  tags: ["networking", "brand-awareness"] },
 
 { id: 4, name: 'The "You Should Meet..." Wall', price: 2000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/You-Should-Meet-Wall.png",
  description: "A big intro wall featuring your brand where people post who they're looking to meet and others can write warm intros directly onto the card. Pure community energy.",
  includes: ["Large branded intro wall", "Card and pen supplies", "Prime central location", "Social media activation"],
  tags: ["networking", "brand-awareness"] },
 
 { id: 5, name: 'The "I\'m Looking For..." Board', price: 2000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Untitled-design-12.png",
  description: "A simple board bearing your brand where attendees post what they need right now (customers, hires, funding, suppliers). Creates instant relevance and real outcomes.",
  includes: ["Branded needs board", "Post-it supplies", "Central positioning", "Photography rights"],
  tags: ["networking", "lead-generation"] },
 
 { id: 6, name: "Charging Lounge", price: 10000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Charging-Lounge.png",
  description: "A branded recharge zone with seating and charging points. Always busy, high dwell time, and genuinely appreciated across both days.",
  includes: ["Branded charging zone", "Multiple charging points", "Comfortable seating", "High-traffic location", "Signage and branding"],
  tags: ["brand-awareness", "lead-generation"] },

 { id: 7, name: "Meeting Domes", price: 2000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/screenshot_2026-01-27_at_15.28.40_720.png",
  description: "Our 3.5m wooden-framed domes are premium pop-up spaces with 360-degree views, seating up to 8 people. Your business or team's base.",
  includes: ["3.5m wooden-framed dome", "Seating for up to 8", "360-degree views", "Premium private space"],
  tags: ["networking", "demos"] },

 { id: 8, name: "The Refresh Rooms Partner", price: 3500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Screenshot-2026-01-29-at-19.34.50.png",
  description: "Brand the main toilet blocks and mirrors plus 'freshen up' extras. Simple, premium, and everyone uses it.",
  includes: ["Toilet block branding", "Mirror branding", "Freshen up extras", "High repetition exposure"],
  tags: ["brand-awareness"] },

 { id: 9, name: "WIFI Sponsor", price: 15000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/wifi.jpg",
  description: "Be the brand that keeps Ideas Fest connected. The Wi-Fi Partner powers dedicated coverage across key festival zones with repeated brand exposure across both days.",
  includes: ["Wi-Fi naming rights", "Login page branding", "Signage across zones", "Repeated daily exposure"],
  tags: ["brand-awareness", "lead-generation"] },
 
 { id: 10, name: "Water Refill Point Sponsor", price: 2500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Water-Refill-Point.png",
  description: "A high-footfall, high-repetition touchpoint with your branding on something everyone uses repeatedly throughout the festival.",
  includes: ["Branded refill stations", "Sustainability messaging opportunity", "Repeat brand exposure", "Logo placement"],
  tags: ["brand-awareness"] },
 
 { id: 11, name: "Coffee Queue Sponsor", price: 1500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Coffee-Q.jpg",
  description: "The coffee queue is where people chat. Add branded queue signage and conversation prompts to own one of the busiest areas on site.",
  includes: ["Queue area branding", "Conversation prompt cards", "High dwell time location", "Brand visibility"],
  tags: ["brand-awareness", "networking"] },
 
 { id: 12, name: "Festival Lanyards/Wristbands", price: 6000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/LanyardsWristbands.png",
  description: "Your brand seen everywhere, all day. Simple, high-impact visibility that feels integrated into the event experience.",
  includes: ["Logo on 6,000 lanyards/wristbands", "Exclusive branding", "Worn by every attendee", "2-day visibility"],
  tags: ["brand-awareness"] },
 
 { id: 13, name: "Wayfinding and Map Boards", price: 3500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Wayfinding.jpg",
  description: "Be the brand that helps people find their way around. Strong visibility without needing a big build or large footprint.",
  includes: ["Logo on all map boards", "Wayfinding signage branding", "Digital map inclusion", "High-visibility placement"],
  tags: ["brand-awareness"] },
 
 { id: 14, name: "Seat Drops (Session Takeaways)", price: 1000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/seat-drop.jpg",
  description: "Branded cards placed on seats with a useful takeaway and QR code. A smart way to build recall and drive follow-up after the festival.",
  includes: ["Cards on all main stage seats", "QR code integration", "Useful takeaway content", "Post-event follow-up opportunity"],
  tags: ["lead-generation", "thought-leadership"] },
 
 { id: 15, name: "Stage Prompt Cards", price: 3500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Stage-Prompt-Cards.png",
  description: '"Turn to the person next to you..." cards that encourage interaction at key moments and are promoted by on-stage hosts. Creates hundreds of micro-connections at once.',
  includes: ["Branded interaction cards", "MC integration", "Audience engagement moments", "Brand association with connection"],
  tags: ["networking", "brand-awareness"] },
 
 { id: 16, name: "Golden Token Drop", price: 2500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Golden-Token-Drop.png",
  description: "Tokens hidden around site that unlock prizes or perks. A simple game that drives exploration, excitement and repeated brand touchpoints. Promoted via app push notifications and screen messaging.",
  includes: ["Branded golden tokens", "Prize fulfilment support", "App push notifications", "Screen messaging", "Social media buzz"],
  tags: ["brand-awareness", "lead-generation"] },
 
 { id: 17, name: "Prize Draw Drop Box + QR", price: 2000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Prize-Draw-Box.png",
  description: "An easy, compliant lead-capture mechanic that feels fun: drop a card or scan a QR to enter a prize draw.",
  includes: ["Branded entry box", "QR code setup", "GDPR-compliant data capture", "Prize announcement moment"],
  tags: ["lead-generation"] },
 
 { id: 18, name: "Photo Backdrop Wall", price: 6000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/8c924965-f0f0-48b3-ac68-6bf1522d24e7.jpg",
  description: "A co-branded photo moment that gets used all day. Creates organic social sharing and gives people a clear place to meet and take photos.",
  includes: ["Co-branded backdrop", "Prime photo location", "Social media hashtag", "Organic content creation"],
  tags: ["brand-awareness"] },
 
 { id: 19, name: 'Giant "IDEAS FEST" Sign Install', price: 8500, category: "plug-play", status: "limited", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Giant-IDEAS-FEST-Sign.png",
  description: "A landmark feature everyone gravitates towards. Your brand sits alongside the official festival backdrop and becomes part of the story.",
  includes: ["Co-branding on landmark sign", "Premium photo opportunity", "Constant foot traffic", "Social media magnet"],
  tags: ["brand-awareness"] },
 
 { id: 20, name: "Floor Decal Trail", price: 5000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Floor-Decal-Trail.png",
  description: "Branded arrows and footprints guiding people to key areas. Simple, effective, and surprisingly high visibility across the two days.",
  includes: ["Branded floor graphics", "Wayfinding integration", "High repetition visibility", "Creative design opportunity"],
  tags: ["brand-awareness"] },
 
 { id: 21, name: "Branded Deckchair Lounge", price: 5000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Deckchair-Lounge.png",
  description: "A relaxed seating area filled with branded deckchairs. A real pause point where conversations happen naturally.",
  includes: ["Branded deckchairs", "Dedicated lounge area", "High dwell time", "Natural networking spot"],
  tags: ["brand-awareness", "networking"] },
 
 { id: 22, name: "Parasols / Shade Zone", price: 7500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/ParasolsShade-Zone.png",
  description: "A branded shaded seating pocket that gives people a reason to stop, sit, chat and recharge. Easy, useful, and highly visible.",
  includes: ["Branded parasols", "Shaded seating area", "Practical value for attendees", "Strong visibility"],
  tags: ["brand-awareness"] },
 
 { id: 23, name: "Branded Picnic Tables", price: 7500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/picnic.jpg",
  description: "Your logo across a block of tables in a busy zone. It's where people eat, meet, and stay longer than you'd expect.",
  includes: ["Logo on table block", "High-traffic food area", "Extended dwell time", "Natural meeting point"],
  tags: ["brand-awareness", "networking"] },
 
 { id: 24, name: "Hosted Meet-Up Point", price: 3500, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Sign.jpg",
  description: 'A clear branded meet-up location on the map ("Meet here at 2pm"). Be the anchor point people use all day.',
  includes: ["Named location on festival map", "Branded meeting point", "App integration", "Scheduled meet-up promotion"],
  tags: ["networking", "lead-generation"] },
 
 { id: 25, name: "Entrance Arch/Welcome Banner", price: 7500, category: "plug-play", status: "limited", image: "https://ideasfest.uk/wp-content/uploads/2026/01/banner.jpg",
  description: "A simple hello moment with huge repetition. Everyone walks through it, everyone sees it, and it sets the tone.",
  includes: ["Entrance arch branding", "First impression ownership", "12,000+ walk-throughs", "Photography hotspot"],
  tags: ["brand-awareness"] },
 
 { id: 26, name: "Programme Insert/Festival Guide Feature", price: 750, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Ideas-Fest-6-1.webp",
  description: "A branded page or insert inside the guide. Great for a useful offer, tool, or message that people keep and refer back to.",
  includes: ["Full page in programme", "6,000 print distribution", "Digital guide inclusion", "Kept by attendees post-event"],
  tags: ["brand-awareness", "lead-generation"] },
 
 { id: 27, name: "Notebooks and Pens (Festival Stationery)", price: 15000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Notebooks-Pens1.png",
  description: "A practical, high-recall item attendees use immediately during sessions and keep afterwards. Simple but effective.",
  includes: ["Branded notebooks", "Branded pens", "Used throughout sessions", "Taken home by attendees"],
  tags: ["brand-awareness"] },

 // BIG FESTIVAL FEATURES
 { id: 28, name: "Networking Ferris Wheel", price: 10000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Networking-Ferris-Wheel.png",
  description: "A landmark feature where every ride pairs you with someone new plus a prompt card to kick off a proper conversation.",
  includes: ["Exclusive wheel branding", "Conversation prompt cards", "Queue area activation", "Landmark photo opportunity", "Social media content goldmine"],
  tags: ["networking", "brand-awareness", "showcase"] },
 
 { id: 29, name: "Helter Skelter Slide", price: 10000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Helter-Skelter.png",
  description: "A bold, nostalgic centrepiece that creates queues, laughs and constant photos. A guaranteed 'you had to be there' moment.",
  includes: ["Full slide branding", "Queue experience ownership", "Photo moment at base", "Unmissable festival landmark"],
  tags: ["brand-awareness", "showcase"] },
 
 { id: 30, name: "Mini Golf Course", price: 8000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/golf.jpg",
  description: "A branded 9-hole mini course designed around business themes (growth, risk, momentum). Easy, playful networking while you play.",
  includes: ["Course naming rights", "Hole-by-hole branding", "Scorecards and prizes", "Extended engagement time", "Group activity format"],
  tags: ["networking", "brand-awareness", "showcase"] },
 
 { id: 31, name: "Dodgems (Bumper Cars)", price: 15000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Dodgems.png",
  description: "A high-energy attraction that's pure fun and turns into endless social content. Sponsor branding everywhere people look.",
  includes: ["Full ride branding", "Car branding options", "Queue and arena ownership", "Video content opportunities"],
  tags: ["brand-awareness", "showcase"] },
 
 { id: 32, name: "Giant Swing Ride", price: 15000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Giant-Swing.png",
  description: "Big visual impact, big queues, big memories. Perfect for a brand wanting a show-stopping moment.",
  includes: ["Ride branding", "Skyline visibility", "Queue activation", "Photography opportunities"],
  tags: ["brand-awareness", "showcase"] },
 
 { id: 33, name: "Silent Disco", price: 7500, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/silent-disco.jpg",
  description: "Headphones, three channels, instant festival energy. Massive visual, minimal logistics, huge participation.",
  includes: ["Headphone branding", "Channel sponsorship", "DJ booth branding", "Viral content potential"],
  tags: ["brand-awareness", "showcase", "networking"] },
 
 { id: 34, name: "Outdoor Cinema/Big Screen", price: 15000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Outdoor-Cinema.png",
  description: "Night-time feature for short films, founder stories, festival highlights, or partner content that feels curated.",
  includes: ["Screen naming rights", "Content slot", "Seating area branding", "Evening programming ownership"],
  tags: ["thought-leadership", "brand-awareness", "showcase"] },
 
 { id: 35, name: "Fire Pit Circle", price: 5000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Fire-Pit-Circle.png",
  description: "A central evening gathering spot that creates the best conversations. Warm lighting, relaxed mood, naturally premium.",
  includes: ["Fire pit area branding", "Seating ownership", "Evening gathering spot", "Premium atmosphere association"],
  tags: ["networking", "brand-awareness"] },
 
 { id: 36, name: "Giant Chess/Giant Connect 4 Lawn Games", price: 3000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Giant-Chess.png",
  description: "Low cost, high engagement, always in use. Creates linger zones where people actually meet.",
  includes: ["Game set branding", "Area ownership", "Constant engagement", "Natural networking catalyst"],
  tags: ["networking", "brand-awareness"] },
 
 { id: 37, name: "Container Bar / Container DJ Booth", price: 20000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Container-Bar-DJ-Booth.png",
  description: "A stacked shipping container feature that becomes a landmark and hub for energy and meet-ups.",
  includes: ["Full container branding", "Bar/DJ activation", "Landmark status", "Evening hub ownership"],
  tags: ["brand-awareness", "showcase", "networking"] },
 
 { id: 38, name: "The Observation Tower / Viewing Platform", price: 30000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Observation-Tower.png",
  description: "A raised branded platform that gives people a festival view moment and becomes a meeting landmark.",
  includes: ["Tower/platform branding", "Unique vantage point", "Photo opportunity", "Meeting point status"],
  tags: ["brand-awareness", "showcase"] },

 // TRADITIONAL OPTIONS (for exhibitors)
 { id: 39, name: "Trading or Showcase Gazebo", price: 1750, category: "traditional", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/gazebo.jpg",
  description: "A straightforward 3m x 3m pitch for brands who want a simple, high-footfall presence on site. Ideal for sampling, selling, sign-ups and quick conversations.",
  includes: ["3m x 3m pitch space", "High-footfall location", "Sampling/selling opportunity", "Direct customer conversations"],
  tags: ["demos", "lead-generation"] },

 { id: 40, name: "Premium Exhibitor", price: 6500, category: "traditional", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Premium.jpg",
  description: "A pitch within a premium tent, designed for stronger visibility and a more elevated exhibitor setting. Perfect for brands that want to stand out.",
  includes: ["Premium tent location", "Elevated setting", "Stronger visibility", "Stand-out positioning"],
  tags: ["demos", "lead-generation", "brand-awareness"] },

 { id: 41, name: "Pavilion Sponsorship", price: 15000, category: "traditional", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/pavillion.jpg",
  description: "A 40-capacity pavilion that gives you your own dedicated gathering space at the festival. Use it for meetings, mentoring, demos, community meet-ups or relaxed hosting.",
  includes: ["40-capacity pavilion", "Dedicated gathering space", "Meeting/demo capability", "Community hosting"],
  tags: ["demos", "networking", "thought-leadership"] },

 { id: 42, name: "Stage Sponsorship", price: 30000, category: "traditional", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Stage-Sponsorship.png",
  description: "Sponsor one of our stages for high-impact brand visibility throughout the festival. Includes prominent on-stage logo placement and recognition across the festival programme.",
  includes: ["Stage naming rights", "On-stage logo placement", "Programme recognition", "High-impact visibility"],
  tags: ["brand-awareness", "thought-leadership"] },

 // SIGNATURE SPONSORSHIPS (£20k-£30k)
 { id: 43, name: "Content Studio", price: 25000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Content-Studio.jpg",
  description: "The on-site podcast and video recording space where the best conversations get captured. Founders, speakers and sponsors drop in throughout the festival to record episodes, interviews and founder stories. Your brand becomes synonymous with the content that lives long after the festival ends.",
  includes: ["Exclusive studio branding inside and out", "Logo on all recorded content", "Opportunity to host your own recording sessions", "First look at footage for your own channels", "Social media features throughout the festival", "Prime location with high footfall visibility"],
  tags: ["brand-awareness", "thought-leadership", "lead-generation"] },

 { id: 44, name: "After Dark", price: 25000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/after-dark.jpg",
  description: "When the sun goes down, the festival transforms. Own the entire evening experience across both nights - the lighting, the energy, the bars, the entertainment. This is where memories are made and conversations flow freely. Your brand becomes part of the stories people tell about 'that night at Ideas Fest'.",
  includes: ["Branding across all evening spaces and bars", "Stage mentions during evening entertainment", "Branded lighting installations", "Evening programme naming rights", "Logo on evening wristbands/tokens", "Social media takeover during evening hours", "VIP access for your team to evening events"],
  tags: ["brand-awareness", "showcase", "networking"] },

 { id: 45, name: "App Sponsor", price: 22000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/Untitled-design-43.png",
  description: "Be in every attendee's pocket for the entire festival. The Ideas Fest app is how 6,000 people navigate the schedule, connect with each other, and plan their days. Prime digital real estate with guaranteed engagement before, during and after the event.",
  includes: ["Logo on app loading screen", "Branded banner on home screen", "Push notification opportunity (x3)", "Sponsored 'suggested connections' feature", "Logo on all app-related communications", "Post-event analytics on engagement", "Branding in pre-festival app download campaign"],
  tags: ["brand-awareness", "lead-generation"] },

 // MULTI-TOUCHPOINT (£30k-£50k)
 { id: 46, name: "Premium Lounge", price: 30000, category: "big-feature", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/prem.jpg",
  description: "The go-to space for serious conversations. A beautifully designed, invite-access lounge where founders, investors and senior leaders step away from the noise to connect properly. Comfortable seating, quality refreshments, and an atmosphere that says 'this is where deals get discussed'.",
  includes: ["Full lounge branding and styling", "Curated guest list access (Premium and VIP ticket holders)", "Branded refreshments and hospitality", "Dedicated lounge host", "Networking facilitation throughout both days", "Your team's access to host private meetings", "Photography and content rights"],
  tags: ["networking", "brand-awareness", "lead-generation"] },

 // WORKSHOPS
 { id: 47, name: "Creative Workshop Sponsor", price: 4000, category: "plug-play", status: "available", image: "https://ideasfest.uk/wp-content/uploads/2026/01/creative-workshop.jpg",
  description: "Bring 30 people together for an hour of a workshop around creativity or wellness delivered by an expert practitioner we'll find within our community. Meet your ideal clients in an engaging, memorable way.",
  includes: ["30-person workshop session", "Expert practitioner sourced by Ideas Fest", "Full session branding", "Attendee list provided", "Photography and content rights", "Promotion in festival programme and app"],
  tags: ["networking", "lead-generation", "thought-leadership"] },
];

const budgetTiers = [
 { 
  min: 1000, 
  max: 1999, 
  label: "£1k - £2k",
  title: "Entry Level Opportunities",
  description: "Programme inserts, seat drops, coffee queue branding, or sticker stations. Simple but effective first steps.",
  examples: ["Programme Insert", "Seat Drops", "Coffee Queue Sponsor", "Trading Gazebo", "Sticker Station"],
  color: "from-[#93a7ff] to-[#93a7ff]",
  solidColor: "#93a7ff"
 },
 { 
  min: 2000, 
  max: 4999, 
  label: "£2k - £5k",
  title: "Small Activations",
  description: "Interactive touchpoints like question cards, intro walls, meeting domes, or prize draws. Start creating conversations.",
  examples: ["Question Cards", "You Should Meet Wall", "Meeting Domes", "Prize Draw Box", "Meet-a-Stranger Benches", "Water Refill Point", "Golden Token Drop", "Giant Chess", "Refresh Rooms", "Wayfinding & Maps", "Stage Prompt Cards", "Creative Workshop"],
  color: "from-[#6366f1] to-[#6366f1]",
  solidColor: "#6366f1"
 },
 { 
  min: 5000, 
  max: 9999, 
  label: "£5k - £10k",
  title: "Unique Plug & Play Experiences",
  description: "Own a meaningful moment. Floor trails, deckchair lounges, photo walls, lanyards, entrance arches, or the silent disco.",
  examples: ["Floor Decal Trail", "Deckchair Lounge", "Fire Pit Circle", "Lanyards/Wristbands", "Photo Backdrop", "Premium Exhibitor", "Parasols/Shade Zone", "Picnic Tables", "Entrance Arch", "Silent Disco", "Mini Golf", "Giant IDEAS FEST Sign"],
  color: "from-[#34d399] to-[#34d399]",
  solidColor: "#34d399"
 },
 { 
  min: 10000, 
  max: 19999, 
  label: "£10k - £20k",
  title: "Premium Touchpoints",
  description: "High-visibility placements like the charging lounge, ferris wheel, helter skelter, dodgems, or outdoor cinema.",
  examples: ["Charging Lounge", "Networking Ferris Wheel", "Helter Skelter", "WIFI Sponsor", "Notebooks & Pens", "Dodgems", "Giant Swing", "Outdoor Cinema", "Pavilion Sponsorship"],
  color: "from-[#fbbf24] to-[#fbbf24]",
  solidColor: "#fbbf24"
 },
 { 
  min: 20000, 
  max: 29999, 
  label: "£20k - £30k",
  title: "Signature Activations",
  description: "Landmark presence. The content studio, after dark experience, app sponsorship, or container bar - own a moment everyone remembers.",
  examples: ["Content Studio", "After Dark", "App Sponsor", "Container Bar / DJ Booth"],
  color: "from-[#f472b6] to-[#f472b6]",
  solidColor: "#f472b6"
 },
 { 
  min: 30000, 
  max: 49999, 
  label: "£30k - £50k",
  title: "Multi-Touchpoint Packages",
  description: "Major landmarks or combine several activations into a cohesive presence across the festival.",
  examples: ["Premium Lounge", "Observation Tower", "Stage Sponsorship", "Combined Packages"],
  color: "from-[#f97316] to-[#f97316]",
  solidColor: "#f97316"
 },
 { 
  min: 50000, 
  max: 999999, 
  label: "£50k+",
  title: "Headline Experiences",
  description: "Bespoke multi-touchpoint packages. Own multiple moments across the festival. Let's talk.",
  examples: ["Bespoke Combinations", "Festival-wide Presence", "Multiple Landmark Features", "Zone Takeovers", "Significant Content Opportunities", "Stage Presence", "Access to Wider 100,000 Community"],
  color: "from-[#f97316] to-[#f472b6]",
  solidColor: "#f97316"
 },
];

const sliderMarks = [1000, 2000, 5000, 10000, 20000, 30000, 50000];

const audienceOptions = [
 { id: "startups", label: "Early-stage startups and founders" },
 { id: "scaleups", label: "Scale-ups (£1M+ revenue)" },
 { id: "smes", label: "Established SMEs" },
 { id: "investors", label: "Investors and VCs" },
 { id: "corporates", label: "Corporate innovation teams" },
 { id: "service-providers", label: "Service providers and advisors" },
];

const goalOptions = [
 { id: "lead-generation", label: "Lead generation and data capture" },
 { id: "demos", label: "Product demos and trials" },
 { id: "brand-awareness", label: "Brand awareness and visibility" },
 { id: "thought-leadership", label: "Thought leadership and speaking" },
 { id: "networking", label: "Networking and relationship building" },
 { id: "showcase", label: "Showcase / experiential moment" },
];

// Past sponsors placeholder
const pastSponsors = [
 { name: "Clue", logo: "https://ideasfest.uk/wp-content/uploads/2026/01/cropped-clue-primary-logo-black.webp" },
 { name: "Sponsor 2", logo: "https://ideasfest.uk/wp-content/uploads/2026/01/images-2.png" },
 { name: "ScoreApp", logo: "https://ideasfest.uk/wp-content/uploads/2026/01/scoreapp-logo-storke-r0kluh7yicvkw9lpd1k6pd39x0ewr1fypx3i6eh1ey.png" },
 { name: "UBS", logo: "https://ideasfest.uk/wp-content/uploads/2026/01/ubs-1.svg" },
 { name: "Innovate UK", logo: "https://ideasfest.uk/wp-content/uploads/2026/01/ukri-innovate-uk-square-logo.png" },
 { name: "Join Talent", logo: "https://ideasfest.uk/wp-content/uploads/2026/01/jointalentuk_logo.jpeg" },
];

// Testimonials placeholder
const testimonials = [
 {
  quote: "We sponsor a lot of events, but Ideas Fest is the one where the conversations actually turn into relationships. The quality of the audience was exceptional, the environment made it easy to meet the right people, and the Ideas team looked after every detail. We came away with a pipeline we can genuinely attribute to the festival, plus content and brand goodwill that's hard to buy elsewhere.",
 },
 {
  quote: "Our space stayed busy, our team had back-to-back conversations, and we were introduced to exactly the sort of business leaders we'd struggle to reach through traditional marketing. The ROI wasn't just leads, it was trust, credibility, and being part of a community that people clearly care about. We're already planning how to go bigger next year.",
 },
];

// Convert slider value (0-100) to budget value
const sliderToBudget = (sliderValue) => {
 const minLog = Math.log(1000);
 const maxLog = Math.log(50000);
 return Math.round(Math.exp(minLog + (sliderValue / 100) * (maxLog - minLog)));
};

// Convert budget value to slider value (0-100)
const budgetToSlider = (budget) => {
 const minLog = Math.log(1000);
 const maxLog = Math.log(50000);
 return ((Math.log(budget) - minLog) / (maxLog - minLog)) * 100;
};

// Get position for a specific budget mark
const getMarkPosition = (budget) => {
 return budgetToSlider(budget);
};

// Calculate countdown to festival
const getCountdown = () => {
 const festival = new Date('2026-09-09T09:00:00');
 const now = new Date();
 const diff = festival - now;
 const days = Math.floor(diff / (1000 * 60 * 60 * 24));
 return days;
};

// Storage key for saving progress
const STORAGE_KEY = 'ideasfest_sponsor_progress';

export default function SponsorPortal() {
 const [step, setStep] = useState(0); // 0 = hero, 0.5 = path select, 1 = details, 2 = budget, 3 = goals, 4 = menu
 const [visitorType, setVisitorType] = useState(null); // 'exhibitor' or 'sponsor'
 const [sliderValue, setSliderValue] = useState(10);
 const [budget, setBudget] = useState(sliderToBudget(50));
 const [currentTier, setCurrentTier] = useState(null);
 const [details, setDetails] = useState({ company: '', name: '', email: '', phone: '' });
 const [selectedAudiences, setSelectedAudiences] = useState([]);
 const [selectedGoals, setSelectedGoals] = useState([]);
 const [selectedItem, setSelectedItem] = useState(null);
 const [showBespokeModal, setShowBespokeModal] = useState(false);
 const [showRequestModal, setShowRequestModal] = useState(false);
 const [requestedItem, setRequestedItem] = useState(null);
 const [activeTab, setActiveTab] = useState('plug-play');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [basket, setBasket] = useState([]);
 const [showBasket, setShowBasket] = useState(false);
 const [showExitIntent, setShowExitIntent] = useState(false);
 const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
 const [showShareModal, setShowShareModal] = useState(false);
 const [colleagueEmail, setColleagueEmail] = useState('');
 const [daysToFestival] = useState(getCountdown());

 // All items by category
 const allPlugPlayItems = sponsorshipItems.filter(item => item.category === 'plug-play');
 const allBigFeatureItems = sponsorshipItems.filter(item => item.category === 'big-feature');
 const allTraditionalItems = sponsorshipItems.filter(item => item.category === 'traditional');
 
 // Tier-filtered items (only show items within the selected tier's price range)
 const plugPlayItems = currentTier 
  ? allPlugPlayItems.filter(item => item.price >= currentTier.min && item.price <= currentTier.max)
  : allPlugPlayItems.filter(item => item.price <= budget);
 const bigFeatureItems = currentTier 
  ? allBigFeatureItems.filter(item => item.price >= currentTier.min && item.price <= currentTier.max)
  : allBigFeatureItems.filter(item => item.price <= budget);
 const traditionalItems = currentTier 
  ? allTraditionalItems.filter(item => item.price >= currentTier.min && item.price <= currentTier.max)
  : allTraditionalItems.filter(item => item.price <= budget);

 // Load saved progress on mount
 useEffect(() => {
  try {
   const saved = localStorage.getItem(STORAGE_KEY);
   if (saved) {
    const data = JSON.parse(saved);
    if (data.details) setDetails(data.details);
    if (data.budget) {
     setBudget(data.budget);
     setSliderValue(budgetToSlider(data.budget));
    }
    if (data.selectedGoals) setSelectedGoals(data.selectedGoals);
    if (data.selectedAudiences) setSelectedAudiences(data.selectedAudiences);
    if (data.basket) setBasket(data.basket);
    if (data.step && data.details?.email) setStep(data.step);
   }
  } catch (e) {
   console.log('Could not load saved progress');
  }
 }, []);

 // Save progress on changes
 useEffect(() => {
  if (details.email) {
   try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
     details,
     budget,
     selectedGoals,
     selectedAudiences,
     basket,
     step
    }));
   } catch (e) {
    console.log('Could not save progress');
   }
  }
 }, [details, budget, selectedGoals, selectedAudiences, basket, step]);

 // Exit intent detection
 useEffect(() => {
  const handleMouseLeave = (e) => {
   if (e.clientY < 10 && !hasShownExitIntent && step > 0 && step < 4 && details.email) {
    setShowExitIntent(true);
    setHasShownExitIntent(true);
   }
  };
  document.addEventListener('mouseleave', handleMouseLeave);
  return () => document.removeEventListener('mouseleave', handleMouseLeave);
 }, [hasShownExitIntent, step, details.email]);

 useEffect(() => {
  const newBudget = sliderToBudget(sliderValue);
  setBudget(newBudget);
  const tier = budgetTiers.find(t => newBudget >= t.min && newBudget <= t.max);
  setCurrentTier(tier);
 }, [sliderValue]);

 const formatBudget = (value) => {
  if (value >= 50000) return '£50k+';
  if (value >= 1000) return `£${Math.round(value / 1000)}k`;
  return `£${value}`;
 };

 const resetAllData = () => {
  if (window.confirm('This will clear all your progress and start fresh. Continue?')) {
   localStorage.removeItem(STORAGE_KEY);
   // Force a clean reload
   window.location.reload();
  }
 };

 const getStatusColor = (status) => {
  switch(status) {
   case 'available': return { backgroundColor: '#93a7ff', color: '#00003a' };
   case 'limited': return { backgroundColor: '#fbbf24', color: '#00003a' };
   case 'sold': return { backgroundColor: '#6b7280', color: 'white' };
   default: return { backgroundColor: '#6b7280', color: 'white' };
  }
 };

 const toggleAudience = (id) => {
  setSelectedAudiences(prev => 
   prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
  );
 };

 const toggleGoal = (id) => {
  setSelectedGoals(prev => 
   prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
  );
 };

 const toggleBasketItem = (item) => {
  setBasket(prev => 
   prev.find(i => i.id === item.id) 
    ? prev.filter(i => i.id !== item.id)
    : [...prev, item]
  );
 };

 const isInBasket = (itemId) => basket.some(i => i.id === itemId);

 const sendEmailNotification = async (itemName = null, basketItems = [], isColleagueShare = false, colleagueEmailAddr = '') => {
  const audienceLabels = selectedAudiences.map(id => 
   audienceOptions.find(a => a.id === id)?.label
  ).join(', ');
  
  const goalLabels = selectedGoals.map(id => 
   goalOptions.find(g => g.id === id)?.label
  ).join(', ');

  const basketList = basketItems.length > 0 
   ? basketItems.map(item => `• ${item.name}`).join('\n')
   : null;

  const emailBody = `
${isColleagueShare ? 'SHARED SHORTLIST' : 'NEW ENQUIRY'} - IDEAS FEST 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TYPE
${visitorType === 'exhibitor' ? 'EXHIBITOR / TRADER' : 'SPONSOR'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT DETAILS
Company: ${details.company}
Name: ${details.name}
Email: ${details.email}
Phone: ${details.phone}
${isColleagueShare ? `\nShared with colleague: ${colleagueEmailAddr}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUDGET
${formatBudget(budget)} (${currentTier?.title || 'Not specified'})

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHO THEY WANT TO MEET
${audienceLabels || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THEIR GOALS
${goalLabels || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${basketList ? `ITEMS THEY WANT TO DISCUSS (${basketItems.length})
${basketList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━` : ''}

${itemName && !basketList ? `SPECIFIC INTEREST
${itemName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━` : ''}

Submitted: ${new Date().toLocaleString('en-GB')}
  `.trim();

  try {
   const response = await fetch('https://usebasin.com/f/bc004b525c38', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     email: 'annabelle@ideasforums.com',
     _replyto: details.email,
     _subject: `🎪 ${isColleagueShare ? 'Shared: ' : ''}${visitorType === 'exhibitor' ? 'Exhibitor' : 'Sponsor'} Enquiry: ${details.company}${basketItems.length > 0 ? ` (${basketItems.length} items)` : itemName ? ` - ${itemName}` : ''} (${formatBudget(budget)})`,
     message: emailBody,
     visitorType: visitorType === 'exhibitor' ? 'Exhibitor / Trader' : 'Sponsor',
     company: details.company,
     name: details.name,
     contactEmail: details.email,
     phone: details.phone,
     budget: formatBudget(budget),
     budgetTier: currentTier?.title,
     audiences: audienceLabels,
     goals: goalLabels,
     basketItems: basketItems.map(i => i.name).join(', '),
     specificInterest: itemName || 'Browsing menu',
     colleagueEmail: colleagueEmailAddr || null,
    }),
   });
   return response.ok;
  } catch (error) {
   console.error('Email send failed:', error);
   return false;
  }
 };

 const handleViewMenu = async () => {
  setIsSubmitting(true);
  await sendEmailNotification();
  setIsSubmitting(false);
  setStep(4);
 };

 const isRecommended = (item) => {
  if (selectedGoals.length === 0) return false;
  return item.tags?.some(tag => selectedGoals.includes(tag));
 };

 const getRecommendedItems = () => {
  // For high budgets, only show substantial items (at least 20% of budget or £10k minimum for £50k+ budgets)
  const minPrice = budget >= 50000 ? 10000 : budget >= 20000 ? 5000 : 0;
  return sponsorshipItems
   .filter(item => isRecommended(item) && item.price <= budget && item.price >= minPrice)
   .slice(0, 6);
 };

 return (
  <div className="min-h-screen" style={{ backgroundColor: '#00003a' }}>
   
   {/* HERO SECTION - Step 0 */}
   {step === 0 && (
    <>
     {/* Hero Header */}
     <header className="relative overflow-hidden">
      {/* Video/Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#00003a]">
       {/* REPLACE: Add background video or image here */}
       <div className="absolute inset-0 bg-[#00003a]" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
       {/* Countdown Badge */}
       <div className="flex justify-center mb-8">
        <div style={{ backgroundColor: '#fbbf24' }} className="px-6 py-2 rounded-full">
         <span style={{ color: '#00003a', fontFamily: 'League Spartan, sans-serif' }} className="font-bold">
          {daysToFestival} days to go
         </span>
        </div>
       </div>

       <div className="text-center">
        <span className="font-bold tracking-widest text-sm" style={{ color: "#f97316" }}>IDEAS FEST 2026</span>
        <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
         GLASTONBURY<br />FOR BUSINESS
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         Two days where 6,000 ambitious entrepreneurs and business leaders come together for the kind of conversations you can't manufacture online and the kind of experiences and connections no other business event can provide.
        </p>
        <p className="text-lg text-white/60 mb-8" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         September 9-10, 2026 | Champneys, Tring
        </p>
       </div>

       {/* Stats Bar */}
       <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 mb-12">
        <div className="text-center">
         <p className="text-4xl md:text-5xl font-bold text-orange-500" style={{ fontFamily: 'Rammetto One, sans-serif' }}>6,000</p>
         <p className="text-white/60 text-sm mt-1">Attendees</p>
        </div>
        <div className="text-center">
         <p className="text-4xl md:text-5xl font-bold text-orange-500" style={{ fontFamily: 'Rammetto One, sans-serif' }}>2</p>
         <p className="text-white/60 text-sm mt-1">Days</p>
        </div>
        <div className="text-center">
         <p className="text-4xl md:text-5xl font-bold text-orange-500" style={{ fontFamily: 'Rammetto One, sans-serif' }}>100+</p>
         <p className="text-white/60 text-sm mt-1">Speakers</p>
        </div>
        <div className="text-center">
         <p className="text-4xl md:text-5xl font-bold text-orange-500" style={{ fontFamily: 'Rammetto One, sans-serif' }}>1</p>
         <p className="text-white/60 text-sm mt-1">Incredible Field</p>
        </div>
       </div>

       {/* CTA Button */}
       <div className="text-center">
        <button
         onClick={() => setStep(0.5)}
         className="px-12 py-5 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105"
         style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif', boxShadow: '0 10px 25px rgba(147, 167, 255, 0.3)' }}
         onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
         onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
        >
         Build Your Bespoke Menu
        </button>
        <p className="text-white/80 mt-4 text-base font-medium bg-white/10 inline-block px-4 py-2 rounded-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         💡 This is our ideas generator. We can get very bespoke, but this should give us some food for thought.
        </p>
       </div>
      </div>
     </header>

     {/* Video Section */}
     <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="aspect-video rounded-2xl overflow-hidden">
       <video 
        className="w-full h-full object-cover"
        controls
        poster="https://ideasfest.uk/wp-content/uploads/2025/10/747-Ambience-226-scaled.jpg"
       >
        <source src="https://ideasfest.uk/wp-content/uploads/2026/01/WCS-Ideas-Fest-Aftermovie.mp4" type="video/mp4" />
        Your browser does not support the video tag.
       </video>
      </div>
     </section>

     {/* Why Sponsor Section */}
     <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
       WHY SPONSORS LOVE IDEAS FEST
      </h2>
      <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'League Spartan, sans-serif' }}>
       Because it doesn't feel like an exhibition. People aren't wandering aisles collecting flyers. They're showing up to connect, learn, and be part of something.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       {[
        { title: "Genuine footfall", desc: "Activations gets real visitors, not forced traffic" },
        { title: "Warm conversations", desc: "People are open, curious, and ready to talk" },
        { title: "Brands get remembered", desc: "We design sponsorships to really add something memorable to the experience" },
        { title: "Right audience", desc: "Attendees are actively looking for opportunities and solutions" },
        { title: "Part of the story", desc: "You become woven into the festival, not just a logo" },
        { title: "Decision makers", desc: "Decision makers, founders, and ambitious leaders" },
       ].map((item, idx) => (
        <div key={idx} className="bg-white/10 rounded-2xl p-6">
         <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>{item.title}</h3>
         <p className="text-white/60" style={{ fontFamily: 'League Spartan, sans-serif' }}>{item.desc}</p>
        </div>
       ))}
      </div>
     </section>

     {/* Testimonials Placeholder */}
     <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
       WHAT PAST SPONSORS SAY
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
       {testimonials.map((testimonial, idx) => (
        <div key={idx} className="bg-white/10 rounded-2xl p-8">
         <p className="text-white/80 text-lg mb-6 italic" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          "{testimonial.quote}"
         </p>
         <p className="text-white/50 text-sm">— Ideas Fest 2025 Sponsor</p>
        </div>
       ))}
      </div>
     </section>

     {/* Past Sponsors */}
     <section className="max-w-6xl mx-auto px-4 py-16 border-t border-white/10">
      <p className="text-white/40 text-center text-sm uppercase tracking-widest mb-8">Brands who've joined us</p>
      <div className="flex flex-wrap justify-center items-center gap-8">
       {pastSponsors.map((sponsor, idx) => (
        <div key={idx} className="w-32 h-16 bg-white rounded-lg flex items-center justify-center p-2">
         <img src={sponsor.logo} alt="Ideas Fest 2025 Sponsor" className="max-w-full max-h-full object-contain" />
        </div>
       ))}
      </div>
     </section>

     {/* Image Gallery */}
     <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       {[
        "https://ideasfest.uk/wp-content/uploads/2026/01/Screenshot-2026-01-28-at-15.48.41.png",
        "https://ideasfest.uk/wp-content/uploads/2025/12/Untitled-design-39.png",
        "https://ideasfest.uk/wp-content/uploads/2025/10/747-Ambience-226-scaled.jpg",
        "https://ideasfest.uk/wp-content/uploads/2025/10/Screenshot-2025-10-16-at-21.40.18.png"
       ].map((src, idx) => (
        <div key={idx} className="aspect-square rounded-xl overflow-hidden">
         <img src={src} alt={`Ideas Fest ${idx + 1}`} className="w-full h-full object-cover" />
        </div>
       ))}
      </div>
     </section>

     {/* Bottom CTA */}
     <section className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
       READY TO BUILD YOUR BESPOKE OPTIONS?
      </h2>
      <p className="text-white/60 mb-4 max-w-xl mx-auto" style={{ fontFamily: 'League Spartan, sans-serif' }}>
       Tell us a bit about what you're looking for and we'll create a personalised menu of options.
      </p>
      <div className="mb-8">
       <span className="text-white/80 text-base font-medium bg-white/10 inline-block px-4 py-2 rounded-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>
        💡 This is our ideas generator. We can get very bespoke, but this should give us some food for thought.
       </span>
      </div>
      <div>
       <button
        onClick={() => setStep(0.5)}
        className="px-12 py-5 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105"
        style={{ backgroundColor: '#34d399', fontFamily: 'League Spartan, sans-serif', boxShadow: '0 10px 25px rgba(52, 211, 153, 0.3)' }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2cb385'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#34d399'}
       >
        Get Started
       </button>
      </div>
     </section>
    </>
   )}

   {/* PATH SELECTOR - Step 0.5 */}
   {step === 0.5 && (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
     <div className="max-w-4xl w-full">
      <div className="text-center mb-12">
       <span className="text-orange-500 font-bold tracking-widest text-sm">IDEAS FEST 2026</span>
       <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
        WHAT BRINGS YOU HERE?
       </h1>
       <p className="text-white/60 text-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>
        This helps us show you the most relevant options
       </p>
       <p className="text-white/80 mt-4 text-base font-medium bg-white/10 inline-block px-4 py-2 rounded-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>
        💡 This is our ideas generator. We can get very bespoke, but this should give us some food for thought.
       </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
       {/* Exhibitor Path */}
       <div
        className="group rounded-3xl p-8 text-left transition-all"
        style={{ backgroundColor: '#00003a', border: '2px solid #34d399' }}
       >
        <h2 className="text-2xl font-bold mb-3" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
         I WANT TO EXHIBIT OR TRADE
        </h2>
        <p className="text-white/80 mb-4 text-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         Showcase your product or service, meet potential customers, and do business with 6,000 entrepreneurs and business leaders.
        </p>
        <ul className="space-y-2 text-white/70 text-base mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         <li>✓ Exhibition stands and pods</li>
         <li>✓ Demo opportunities</li>
         <li>✓ Direct customer conversations</li>
         <li>✓ Product sampling and trials</li>
        </ul>
        <button
         onClick={() => { setVisitorType('exhibitor'); setStep(1); }}
         className="w-full py-4 text-white rounded-xl font-bold text-lg transition-all"
         style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
         onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
         onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
        >
         Explore Exhibitor Options →
        </button>
       </div>

       {/* Sponsor Path */}
       <div
        className="group rounded-3xl p-8 text-left transition-all"
        style={{ backgroundColor: '#00003a', border: '2px solid #f97316' }}
       >
        <h2 className="text-2xl font-bold mb-3" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
         I WANT TO SPONSOR
        </h2>
        <p className="text-white/80 mb-4 text-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         Build brand awareness, create memorable experiences, and position your company in front of the UK's most ambitious business community.
        </p>
        <ul className="space-y-2 text-white/70 text-base mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         <li>✓ Brand activations and experiences</li>
         <li>✓ Thought leadership opportunities</li>
         <li>✓ High-visibility placements</li>
         <li>✓ Headline festival features</li>
        </ul>
        <button
         onClick={() => { setVisitorType('sponsor'); setStep(1); }}
         className="w-full py-4 text-white rounded-xl font-bold text-lg transition-all"
         style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
         onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
         onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
        >
         Explore Sponsorship Options →
        </button>
       </div>
      </div>

      <div className="text-center mt-8">
       <button
        onClick={() => setStep(0)}
        className="px-6 py-3 text-white rounded-xl font-bold transition-all"
        style={{ backgroundColor: '#6366f1', fontFamily: 'League Spartan, sans-serif' }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5558e6'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#6366f1'}
       >
        ← Back to overview
       </button>
      </div>
     </div>
    </div>
   )}

   {/* FORM STEPS - Steps 1-4 */}
   {step >= 1 && (
    <>
     {/* Header */}
     <header className="py-8 px-6 text-center border-b border-white/10">
      <div className="flex justify-center mb-4">
       <div style={{ backgroundColor: '#fbbf24' }} className="px-6 py-2 rounded-full">
        <span style={{ color: '#00003a', fontFamily: 'League Spartan, sans-serif' }} className="font-bold">
         {daysToFestival} days to go
        </span>
       </div>
      </div>
      <div className="mb-4">
       <span className="text-orange-500 font-bold tracking-widest text-sm">IDEAS FEST 2026</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
       {visitorType === 'exhibitor' ? 'BUILD YOUR EXHIBITOR PACKAGE' : 'BUILD YOUR SPONSORSHIP'}
      </h1>
      <p className="text-lg text-white/70 mt-3 max-w-2xl mx-auto" style={{ fontFamily: 'League Spartan, sans-serif' }}>
       {visitorType === 'exhibitor' 
        ? 'Tell us what you want to achieve and we\'ll create your bespoke exhibitor menu'
        : 'Tell us what you\'re looking for and we\'ll create your bespoke menu'
       }
      </p>
      <p className="text-white/80 mt-4 text-base font-medium bg-white/10 inline-block px-4 py-2 rounded-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>
       💡 This is our ideas generator. We can get very bespoke, but this should give us some food for thought.
      </p>
     </header>

     <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
       {[
        { num: 1, label: 'Details' },
        { num: 2, label: 'Budget' },
        { num: 3, label: 'Goals' },
        { num: 4, label: 'Menu' },
       ].map((s, idx) => (
        <div key={s.num} className="flex items-center gap-2">
         <div className="flex flex-col items-center">
          <div 
           className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
           style={{ 
            backgroundColor: step >= s.num ? '#6366f1' : 'rgba(255,255,255,0.2)',
            color: step >= s.num ? 'white' : 'rgba(255,255,255,0.5)',
            fontFamily: 'League Spartan, sans-serif'
           }}
          >
           {step > s.num ? '✓' : s.num}
          </div>
          <span className="text-xs text-white/50 mt-1 hidden md:block">{s.label}</span>
         </div>
         {idx < 3 && (
          <div 
           className="w-8 md:w-16 h-1"
           style={{ backgroundColor: step > s.num ? '#6366f1' : 'rgba(255,255,255,0.2)' }}
          />
         )}
        </div>
       ))}
      </div>

      {/* Step 1: Contact Details (FIRST!) */}
      {step === 1 && (
       <div className="max-w-md mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
         LET'S START WITH YOU
        </h2>
        <p className="text-white/60 mb-8 text-center text-xl" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         {visitorType === 'exhibitor'
          ? 'So we can create your personalised exhibitor menu'
          : 'So we can create your personalised sponsorship menu'
         }
        </p>

        <div className="space-y-4">
         <input
          type="text"
          placeholder="Company Name *"
          value={details.company}
          onChange={(e) => setDetails({...details, company: e.target.value})}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#93a7ff] transition-all"
          style={{ fontFamily: 'League Spartan, sans-serif' }}
         />
         <input
          type="text"
          placeholder="Your Name *"
          value={details.name}
          onChange={(e) => setDetails({...details, name: e.target.value})}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#93a7ff] transition-all"
          style={{ fontFamily: 'League Spartan, sans-serif' }}
         />
         <input
          type="email"
          placeholder="Email Address *"
          value={details.email}
          onChange={(e) => setDetails({...details, email: e.target.value})}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#93a7ff] transition-all"
          style={{ fontFamily: 'League Spartan, sans-serif' }}
         />
         <input
          type="tel"
          placeholder="Phone Number *"
          value={details.phone}
          onChange={(e) => setDetails({...details, phone: e.target.value})}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#93a7ff] transition-all"
          style={{ fontFamily: 'League Spartan, sans-serif' }}
         />
        </div>

        <button
         onClick={() => setStep(2)}
         disabled={!details.company || !details.name || !details.email || !details.phone}
         className="w-full mt-8 px-6 py-4 disabled:bg-white/20 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all"
         style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
         onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
         onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
        >
         Continue
        </button>

        <button
         onClick={() => setStep(0.5)}
         className="w-full mt-4 px-6 py-3 bg-[#93a7ff] hover:bg-[#7b91e6] text-white rounded-xl font-bold transition-all"
         style={{ fontFamily: 'League Spartan, sans-serif' }}
        >
         ← Back
        </button>
       </div>
      )}

      {/* Step 2: Budget Slider */}
      {step === 2 && (
       <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
         WHAT'S YOUR BUDGET?
        </h2>
        <p className="text-white/60 mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         Move the slider to explore what's possible
        </p>
        
        {/* Arrow pointing right */}
        <div className="flex justify-center mb-8">
         <svg className="w-8 h-8 animate-pulse" style={{ color: '#93a7ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
         </svg>
        </div>
        
        {/* Current Budget Display */}
        <div className="mb-12">
         <div className="text-6xl md:text-7xl font-bold mb-2" style={{ color: '#f97316', fontFamily: 'Rammetto One, sans-serif' }}>
          {formatBudget(budget)}
         </div>
        </div>

        {/* Slider Container */}
        <div className="relative px-4 mb-8">
         {/* Animated drag hint */}
         {sliderValue <= 15 && (
          <div className="mb-8 text-center">
           <p className="text-white/70 text-sm mb-3 max-w-lg mx-auto" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Drag the slider along to indicate your budget and we can share activation ideas with you. At this stage this is simply so that we can show you the art of the possible.
           </p>
           <div className="flex items-center justify-center">
            <svg className="w-6 h-6 animate-pulse" style={{ color: '#93a7ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
           </div>
          </div>
         )}
         
         <div className="relative h-3 bg-white/20 rounded-full">
          <div 
           className="absolute h-full rounded-full transition-all duration-300"
           style={{ 
            width: `${sliderValue}%`,
            backgroundColor: currentTier?.solidColor || '#f97316'
           }}
          />
          
          <input
           type="range"
           min="0"
           max="100"
           value={sliderValue}
           onChange={(e) => setSliderValue(Number(e.target.value))}
           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          
          <div 
           className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-100 pointer-events-none ${sliderValue <= 15 ? 'animate-pulse' : ''}`}
           style={{ left: `calc(${sliderValue}% - 16px)`, border: `4px solid ${currentTier?.solidColor || '#6366f1'}` }}
          />
         </div>
         
         {/* Simple evenly spaced tick marks */}
         <div className="relative mt-4 flex justify-between">
          {[0, 20, 40, 60, 80, 100].map((pos) => (
           <div key={pos} className="flex flex-col items-center">
            <div style={{ backgroundColor: sliderValue >= pos ? '#6366f1' : 'rgba(255,255,255,0.3)' }} className="w-0.5 h-3" />
           </div>
          ))}
         </div>
        </div>

        {/* Tier Info Card */}
        {currentTier && (
         <div 
          className="mt-8 p-6 rounded-2xl transition-all duration-500"
          style={{ backgroundColor: currentTier.solidColor }}
         >
          <div className="text-left">
           <div className="flex items-center gap-3 mb-3">
            <span 
             className="px-3 py-1 rounded-full text-sm font-bold" 
             style={{ 
              fontFamily: 'League Spartan, sans-serif',
              backgroundColor: currentTier.solidColor === '#fbbf24' ? 'rgba(0,0,58,0.2)' : 'rgba(255,255,255,0.3)',
              color: currentTier.solidColor === '#fbbf24' ? '#00003a' : 'white'
             }}
            >
             {currentTier.label}
            </span>
            <h3 
             className="text-2xl font-bold" 
             style={{ 
              fontFamily: 'Anton, sans-serif',
              color: currentTier.solidColor === '#fbbf24' ? '#00003a' : 'white'
             }}
            >
             {currentTier.title.toUpperCase()}
            </h3>
           </div>
           <p 
            className="text-lg mb-4" 
            style={{ 
             fontFamily: 'League Spartan, sans-serif',
             color: currentTier.solidColor === '#fbbf24' ? '#00003a' : 'white'
            }}
           >
            {currentTier.description}
           </p>
           <p 
            className="text-sm mb-3" 
            style={{ 
             fontFamily: 'League Spartan, sans-serif',
             color: currentTier.solidColor === '#fbbf24' ? 'rgba(0,0,58,0.7)' : 'rgba(255,255,255,0.8)'
            }}
           >
            Ideas at this level include but are not limited to:
           </p>
           <div className="flex flex-wrap gap-2">
            {currentTier.examples.map((example, idx) => (
             <span 
              key={idx} 
              className="px-3 py-1 rounded-full text-sm" 
              style={{ 
               fontFamily: 'League Spartan, sans-serif',
               backgroundColor: currentTier.solidColor === '#fbbf24' ? 'rgba(0,0,58,0.15)' : 'rgba(255,255,255,0.3)',
               color: currentTier.solidColor === '#fbbf24' ? '#00003a' : 'white'
              }}
             >
              {example}
             </span>
            ))}
           </div>
          </div>
         </div>
        )}

        <div className="flex gap-4 mt-8">
         <button
          onClick={() => setStep(1)}
          className="flex-1 px-6 py-3 text-white rounded-xl font-bold transition-all"
          style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
         >
          ← Back
         </button>
         <button
          onClick={() => setStep(3)}
          className="flex-1 px-6 py-3 text-white rounded-xl font-bold transition-all"
          style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
         >
          Continue
         </button>
        </div>
       </div>
      )}

      {/* Step 3: Goals and Audience */}
      {step === 3 && (
       <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
         WHAT ARE YOU LOOKING TO ACHIEVE?
        </h2>
        <p className="text-white/60 mb-8 text-center" style={{ fontFamily: 'League Spartan, sans-serif' }}>
         Select all that apply and we'll highlight the best matches
        </p>

        {/* Goals */}
        <div className="mb-8">
         <h3 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>YOUR GOALS</h3>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {goalOptions.map((goal) => (
           <button
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className="p-4 rounded-xl text-left transition-all"
            style={{
             backgroundColor: selectedGoals.includes(goal.id) ? '#34d399' : '#00003a',
             border: selectedGoals.includes(goal.id) ? '2px solid #34d399' : '2px solid #93a7ff',
             color: 'white'
            }}
           >
            <span className="text-sm font-medium" style={{ fontFamily: 'League Spartan, sans-serif' }}>
             {goal.label}
            </span>
           </button>
          ))}
         </div>
        </div>

        {/* Audience */}
        <div className="mb-8">
         <h3 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>WHO DO YOU WANT TO MEET?</h3>
         <div className="grid grid-cols-2 gap-3">
          {audienceOptions.map((audience) => (
           <button
            key={audience.id}
            onClick={() => toggleAudience(audience.id)}
            className="p-4 rounded-xl text-left transition-all"
            style={{
             backgroundColor: selectedAudiences.includes(audience.id) ? '#34d399' : '#00003a',
             border: selectedAudiences.includes(audience.id) ? '2px solid #34d399' : '2px solid #93a7ff',
             color: 'white'
            }}
           >
            <span className="text-sm font-medium" style={{ fontFamily: 'League Spartan, sans-serif' }}>
             {audience.label}
            </span>
           </button>
          ))}
         </div>
        </div>

        <div className="flex gap-4 mt-8">
         <button
          onClick={() => setStep(2)}
          className="flex-1 px-6 py-3 text-white rounded-xl font-bold transition-all"
          style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
         >
          ← Back
         </button>
         <button
          onClick={handleViewMenu}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 disabled:bg-white/20 text-white rounded-xl font-bold transition-all"
          style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
          onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#7b91e6')}
          onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#93a7ff')}
         >
          {isSubmitting ? 'Loading...' : 'See Your Bespoke Menu'}
         </button>
        </div>
       </div>
      )}

      {/* Step 4: Sponsorship Catalogue */}
      {step === 4 && (
       <div>
        <div className="text-center mb-8">
         <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
          OPPORTUNITIES FOR {details.company ? details.company.toUpperCase() : 'YOUR BRAND'} AND IDEAS FEST
         </h2>
         <p className="text-white/60 mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          AKA Glastonbury for Business
         </p>
         <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#6366f1', color: 'white' }}>
           Budget: {formatBudget(budget)} {currentTier && `(${currentTier.label})`}
          </span>
          {selectedGoals.slice(0, 3).map(goalId => {
           const goal = goalOptions.find(g => g.id === goalId);
           return (
            <span key={goalId} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#34d399', color: 'white' }}>
             {goal?.label}
            </span>
           );
          })}
         </div>
        </div>

        {/* Special £50k+ Bespoke View */}
        {budget >= 50000 ? (
         <>
          {/* Bespoke Hero Banner */}
          <div 
           className="mb-8 p-8 rounded-2xl text-center"
           style={{ 
            backgroundColor: '#00003a',
            border: '3px solid #f97316'
           }}
          >
           <div className="flex flex-col items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white/30">
             <img src="https://ideasfest.uk/wp-content/uploads/2026/01/1667398606480-1.jpeg" alt="Annabelle" className="w-full h-full object-cover" />
            </div>
            <div>
             <h3 className="text-2xl font-bold mb-3" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
              LET'S BUILD SOMETHING EXTRAORDINARY
             </h3>
             <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              At this investment level, we create fully bespoke partnerships. Zone takeovers, headline stage presence, festival-wide branding, content partnerships, and experiences we haven't even imagined yet. This is where the magic happens.
             </p>
             <a
              href="https://calendly.com/annabelle-ideasforums/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: '#f97316', fontFamily: 'League Spartan, sans-serif', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)' }}
             >
              Book a Strategy Call with Annabelle
             </a>
            </div>
           </div>
          </div>

          {/* Premium Building Blocks */}
          <div className="mb-8">
           <h3 className="text-xl font-bold mb-2 text-center" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
            PREMIUM BUILDING BLOCKS
           </h3>
           <p className="text-white/60 text-center mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            These are some of our signature activations that could form part of your bespoke package
           </p>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsorshipItems.filter(item => item.price >= 10000).map((item) => {
             const inBasket = isInBasket(item.id);
             return (
              <div
               key={item.id}
               onClick={() => setSelectedItem(item)}
               className="rounded-2xl overflow-hidden cursor-pointer transition-all transform hover:scale-[1.02]"
               style={{ 
                backgroundColor: '#00003a',
                border: inBasket ? '2px solid #34d399' : '2px solid rgba(255,255,255,0.2)'
               }}
              >
               <div className="aspect-video bg-white/5 flex items-center justify-center border-b border-white/10 overflow-hidden">
                {item.image ? (
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                 <span className="text-white/30 text-sm">Image</span>
                )}
               </div>
               <div className="p-4">
                <p className="font-bold text-xl mb-1" style={{ color: '#f97316', fontFamily: 'Rammetto One, sans-serif' }}>
                 £{item.price.toLocaleString()}
                </p>
                <h4 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>{item.name}</h4>
                <p className="text-white/60 text-sm line-clamp-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>{item.description}</p>
               </div>
              </div>
             );
            })}
           </div>
          </div>

          {/* Bottom CTA */}
          <div 
           className="mt-12 p-6 rounded-2xl"
           style={{ 
            backgroundColor: '#00003a',
            border: '2px solid #34d399'
           }}
          >
           <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white/30">
             <img src="https://ideasfest.uk/wp-content/uploads/2026/01/1667398606480-1.jpeg" alt="Annabelle" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
             <h3 className="text-lg font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
              READY TO CREATE YOUR HEADLINE PARTNERSHIP?
             </h3>
             <p className="text-white/70 text-base mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Let's explore how we can make Ideas Fest 2026 unforgettable for your brand.
             </p>
             <a
              href="https://calendly.com/annabelle-ideasforums/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-white rounded-xl font-bold transition-all"
              style={{ backgroundColor: '#34d399', fontFamily: 'League Spartan, sans-serif' }}
             >
              Let's Chat
             </a>
            </div>
           </div>
          </div>
         </>
        ) : (
         <>
        {/* Recommended For You Section */}
        {selectedGoals.length > 0 && getRecommendedItems().length > 0 && (
         <div 
          className="mb-12 p-6 rounded-2xl"
          style={{
           backgroundColor: '#00003a',
           border: '2px solid #fbbf24'
          }}
         >
          <h3 className="text-xl font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
           RECOMMENDED FOR YOUR GOALS
          </h3>
          <p className="text-white/70 text-base mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
           Here are some initial ideas but the best partnerships are always completely bespoke and we really believe in the art of the possible. Let's book in a call to discuss how we can bring your brand to life at Ideas Fest.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
           {getRecommendedItems().map((item) => (
            <div 
             key={item.id}
             onClick={() => setSelectedItem(item)}
             className="rounded-xl p-4 cursor-pointer transition-all"
             style={{ 
              backgroundColor: '#00003a', 
              border: '2px solid #fbbf24'
             }}
            >
             <p className="text-white font-bold text-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>{item.name}</p>
             <p className="text-white/70 text-base mt-2 mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>{item.description?.substring(0, 80)}...</p>
             <p style={{ color: '#fbbf24', fontFamily: 'League Spartan, sans-serif' }} className="text-sm mt-1">View details →</p>
            </div>
           ))}
          </div>
         </div>
        )}

        {/* Bespoke CTA Banner */}
        <div 
         className="mb-8 p-6 rounded-2xl"
         style={{ 
          backgroundColor: '#00003a',
          border: '2px solid #f472b6'
         }}
        >
         <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white/30">
           <img src="https://ideasfest.uk/wp-content/uploads/2026/01/1667398606480-1.jpeg" alt="Annabelle" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
           <h3 className="text-xl font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
            WANT SOMETHING COMPLETELY BESPOKE?
           </h3>
           <p className="text-white/70 text-base mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Here are some initial ideas but the best partnerships are always completely bespoke and we really believe in the art of the possible. Let's book in a call to discuss how we can bring your brand to life at Ideas Fest.
           </p>
           <a
            href="https://calendly.com/annabelle-ideasforums/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-white rounded-xl font-bold transition-all"
            style={{ backgroundColor: '#f472b6', fontFamily: 'League Spartan, sans-serif' }}
           >
            Book a Call with Annabelle
           </a>
          </div>
         </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
         <button
          onClick={() => setActiveTab('plug-play')}
          className="px-6 py-3 rounded-xl font-bold transition-all"
          style={{ 
           backgroundColor: activeTab === 'plug-play' ? '#f472b6' : '#00003a',
           border: '2px solid #f472b6',
           color: 'white',
           fontFamily: 'League Spartan, sans-serif'
          }}
         >
          Plug and Play ({plugPlayItems.length})
         </button>
         <button
          onClick={() => setActiveTab('big-feature')}
          className="px-6 py-3 rounded-xl font-bold transition-all"
          style={{ 
           backgroundColor: activeTab === 'big-feature' ? '#6366f1' : '#00003a',
           border: '2px solid #6366f1',
           color: 'white',
           fontFamily: 'League Spartan, sans-serif'
          }}
         >
          Big Features ({bigFeatureItems.length})
         </button>
         <button
          onClick={() => setActiveTab('traditional')}
          className="px-6 py-3 rounded-xl font-bold transition-all"
          style={{ 
           backgroundColor: activeTab === 'traditional' ? '#34d399' : '#00003a',
           border: '2px solid #34d399',
           color: 'white',
           fontFamily: 'League Spartan, sans-serif'
          }}
         >
          Traditional Options ({traditionalItems.length})
         </button>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {(activeTab === 'plug-play' ? plugPlayItems : activeTab === 'big-feature' ? bigFeatureItems : traditionalItems).map((item, index) => {
          const recommended = isRecommended(item);
          const inBasket = isInBasket(item.id);
          return (
           <div
            key={item.id}
            onClick={() => item.status !== 'sold' && setSelectedItem(item)}
            className="relative rounded-2xl p-6 transition-all cursor-pointer transform hover:scale-102"
            style={{
             backgroundColor: '#00003a',
             border: item.status === 'sold' ? '2px solid rgba(255,255,255,0.1)' : inBasket ? '2px solid #34d399' : recommended ? '2px solid #fbbf24' : '2px solid #93a7ff',
             opacity: item.status === 'sold' ? 0.6 : 1,
             cursor: item.status === 'sold' ? 'not-allowed' : 'pointer'
            }}
           >
            {inBasket && (
             <div className="absolute -top-3 right-4 px-3 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: '#34d399' }}>
              <span className="text-white text-xs">✓</span>
              <span className="text-white text-xs font-bold">IN SHORTLIST</span>
             </div>
            )}

            {recommended && !inBasket && (
             <div className="absolute -top-3 left-4 px-3 py-1 rounded-full" style={{ backgroundColor: '#fbbf24' }}>
              <span style={{ color: '#00003a' }} className="text-xs font-bold">RECOMMENDED</span>
             </div>
            )}

            <div className="flex justify-end mb-3 mt-1">
             <span 
              className="text-xs font-bold px-2 py-1 rounded"
              style={getStatusColor(item.status)}
             >
              {item.status.toUpperCase()}
             </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
             {item.name}
            </h3>

            {/* Image placeholder */}
            <div className="aspect-video bg-white/5 rounded-lg mb-3 flex items-center justify-center border border-dashed border-white/20 overflow-hidden">
             {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
             ) : (
              <span className="text-white/30 text-xs">Image</span>
             )}
            </div>
            
            <p className="text-xl font-bold mb-3" style={{ color: '#f97316', fontFamily: 'Rammetto One, sans-serif' }}>
             {item.price ? `From £${item.price.toLocaleString()}` : 'Enquire'}
            </p>
            
            <p className="text-white/80 text-base mb-4 line-clamp-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
             {item.description}
            </p>

            {item.status !== 'sold' && (
             <p className="text-white/40 text-xs">Click to see full details →</p>
            )}
           </div>
          );
         })}
        </div>

        {/* Bottom Annabelle CTA */}
        <div 
         className="mt-12 p-6 rounded-2xl"
         style={{ 
          backgroundColor: '#00003a',
          border: '2px solid #34d399'
         }}
        >
         <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white/30">
           <img src="https://ideasfest.uk/wp-content/uploads/2026/01/1667398606480-1.jpeg" alt="Annabelle" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
           <h3 className="text-lg font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
            NOT SEEING WHAT YOU'RE LOOKING FOR?
           </h3>
           <p className="text-white/70 text-base mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            The best Ideas Fest partnerships are always bespoke. Let's have a quick chat to explore how we can create something perfect for your brand.
           </p>
           <a
            href="https://calendly.com/annabelle-ideasforums/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-white rounded-xl font-bold transition-all"
            style={{ backgroundColor: '#34d399', fontFamily: 'League Spartan, sans-serif' }}
           >
            Let's Chat
           </a>
          </div>
         </div>
        </div>
         </>
        )}

        {/* Back button */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
         <button
          onClick={() => setStep(3)}
          className="px-6 py-3 text-white rounded-xl font-bold transition-all"
          style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
         >
          ← Update Preferences
         </button>
        </div>
       </div>
      )}
     </div>
    </>
   )}

   {/* Item Detail Modal */}
   {selectedItem && (
    <div 
     className="fixed inset-0 flex items-center justify-center p-4 z-50" 
     style={{ backgroundColor: 'rgba(0, 0, 58, 0.95)' }}
     onClick={() => setSelectedItem(null)}
    >
     <div 
      className="rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      style={{ backgroundColor: '#00003a', border: '1px solid rgba(255,255,255,0.1)' }}
      onClick={(e) => e.stopPropagation()}
     >
      <div className="p-6 border-b border-white/10">
       <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 flex-wrap">
         <span 
          className="text-xs font-bold px-2 py-1 rounded"
          style={{
           backgroundColor: selectedItem.category === 'big-feature' ? 'rgba(99, 102, 241, 0.3)' : selectedItem.category === 'traditional' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(244, 114, 182, 0.3)',
           color: selectedItem.category === 'big-feature' ? '#93a7ff' : selectedItem.category === 'traditional' ? '#34d399' : '#f472b6'
          }}
         >
          {selectedItem.category === 'big-feature' ? 'BIG FEATURE' : selectedItem.category === 'traditional' ? 'TRADITIONAL' : 'PLUG AND PLAY'}
         </span>
         {isRecommended(selectedItem) && (
          <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#fbbf24', color: '#00003a' }}>
           RECOMMENDED
          </span>
         )}
         {isInBasket(selectedItem.id) && (
          <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#34d399', color: 'white' }}>
           IN SHORTLIST
          </span>
         )}
        </div>
        <button onClick={() => setSelectedItem(null)} className="text-white/50 hover:text-white text-2xl leading-none">×</button>
       </div>
       <h3 className="text-2xl font-bold mt-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
        {selectedItem.name.toUpperCase()}
       </h3>
       <p className="text-2xl font-bold mt-2" style={{ color: "#f97316", fontFamily: 'Rammetto One, sans-serif' }}>
        {selectedItem.price ? `£${selectedItem.price.toLocaleString()}` : 'Price on enquiry'}
       </p>
      </div>

      <div className="p-6">
       <p className="text-white/80 text-base mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
        {selectedItem.description}
       </p>

       <h4 className="text-sm font-bold text-white/50 uppercase tracking-wide mb-3">What's Included:</h4>
       <ul className="space-y-2 mb-6">
        {selectedItem.includes.map((item, idx) => (
         <li key={idx} className="flex items-start gap-2 text-white/80" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          <span style={{ color: '#34d399' }} className="mt-1">✓</span>
          {item}
         </li>
        ))}
       </ul>

       <div className="space-y-3">
        {/* Lock in button - mailto link */}
        <a
         href={`mailto:annabelle@ideasforums.com?subject=Ideas Fest 2026 - ${encodeURIComponent(selectedItem.name)}&body=Hi Annabelle,%0D%0A%0D%0AI'm interested in booking the ${encodeURIComponent(selectedItem.name)}.%0D%0A%0D%0APlease get in touch to discuss next steps.%0D%0A%0D%0AThanks`}
         className="block w-full py-4 text-white rounded-xl font-bold text-lg text-center transition-all"
         style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
        >
         {['Secure This Option', 'Lock This In', 'Reserve Now', 'Grab This Spot', 'Claim This One'][selectedItem.id % 5]}
        </a>
        
        {/* Book a call button */}
        <a
         href="https://calendly.com/annabelle-ideasforums/30min"
         target="_blank"
         rel="noopener noreferrer"
         className="block w-full py-4 text-white rounded-xl font-bold text-lg text-center transition-all"
         style={{ backgroundColor: '#f472b6', fontFamily: 'League Spartan, sans-serif' }}
        >
         {['Book a Call to Discuss', 'Let\'s Talk About This', 'Chat With Annabelle', 'Discuss This Option', 'Schedule a Quick Call'][selectedItem.id % 5]}
        </a>

        {/* Add to shortlist button */}
        <button
         onClick={() => toggleBasketItem(selectedItem)}
         className="w-full py-3 rounded-xl font-bold transition-all"
         style={{ 
          backgroundColor: isInBasket(selectedItem.id) ? '#34d399' : '#93a7ff', 
          color: 'white',
          fontFamily: 'League Spartan, sans-serif' 
         }}
        >
         {isInBasket(selectedItem.id) ? '✓ Added to Shortlist' : '+ Add to Shortlist'}
        </button>
       </div>
      </div>
     </div>
    </div>
   )}

   {/* Bespoke Call Modal */}
   {showBespokeModal && (
    <div 
     className="fixed inset-0 flex items-center justify-center p-4 z-50" 
     style={{ backgroundColor: 'rgba(0, 0, 58, 0.95)' }}
     onClick={() => setShowBespokeModal(false)}
    >
     <div 
      className="rounded-3xl max-w-md w-full p-8 relative"
      style={{ backgroundColor: '#00003a', border: '1px solid rgba(255,255,255,0.1)' }}
      onClick={(e) => e.stopPropagation()}
     >
      <button onClick={() => setShowBespokeModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl">×</button>
      
      <div className="text-center">
       <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(99, 102, 241, 0.3)' }}>
        <span className="text-white text-2xl font-bold">?</span>
       </div>
       <h3 className="text-2xl font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
        LET'S BUILD SOMETHING BRILLIANT
       </h3>
       <p className="text-white/70 mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
        Book a 20-minute call with Annabelle from our partnerships team to design a custom activation tailored to your brand.
       </p>

       <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
        <p className="text-white/50 text-sm mb-1">Your details:</p>
        <p className="text-white font-bold">{details.name || 'Not provided'}</p>
        <p className="text-white/70">{details.company || 'Not provided'}</p>
        <p className="text-white/70">{details.email || 'Not provided'}</p>
        <p className="text-white/70">{details.phone || 'Not provided'}</p>
        <p className="text-white/50 text-sm mt-2">Budget: {formatBudget(budget)}</p>
       </div>

       <a
        href="https://calendly.com/annabelle-ideasforums/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 text-white rounded-xl font-bold text-lg transition-all mb-3 text-center"
        style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
       >
        Book Call with Annabelle
       </a>
       <p className="text-white/50 text-sm">Or we'll be in touch within 24 hours</p>
      </div>
     </div>
    </div>
   )}

   {/* Request Confirmation Modal */}
   {showRequestModal && requestedItem && (
    <div 
     className="fixed inset-0 flex items-center justify-center p-4 z-50" 
     style={{ backgroundColor: 'rgba(0, 0, 58, 0.95)' }}
     onClick={() => setShowRequestModal(false)}
    >
     <div 
      className="rounded-3xl max-w-md w-full p-8"
      style={{ backgroundColor: '#00003a', border: '1px solid rgba(255,255,255,0.1)' }}
      onClick={(e) => e.stopPropagation()}
     >
      <div className="text-center">
       <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.3)' }}>
        <span style={{ color: '#34d399' }} className="text-2xl font-bold">✓</span>
       </div>
       <h3 className="text-2xl font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
        SHORTLIST SUBMITTED!
       </h3>
       
       {requestedItem.isBasket ? (
        <>
         <p className="text-white/70 mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          You've submitted {basket.length} item{basket.length !== 1 ? 's' : ''} for discussion:
         </p>
         <div className="bg-white/10 rounded-xl p-4 mb-6 text-left max-h-48 overflow-y-auto">
          {basket.map((item) => (
           <p key={item.id} className="text-white/80 py-1" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            • {item.name}
           </p>
          ))}
         </div>
        </>
       ) : (
        <>
         <p className="text-white/70 mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          You've expressed interest in:
         </p>
         <div className="bg-white/10 rounded-xl p-4 mb-6">
          <p className="text-white font-bold text-lg">{requestedItem.name}</p>
          <p className="font-bold text-xl mt-1" style={{ color: "#f97316", fontFamily: 'Rammetto One, sans-serif' }}>
           {requestedItem.price ? `£${requestedItem.price.toLocaleString()}` : 'Price on enquiry'}
          </p>
         </div>
        </>
       )}

       <p className="text-white/70 mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
        Our partnerships team will be in touch at <span className="text-white">{details.email}</span> within 24 hours.
       </p>

       <button
        onClick={() => { 
         setShowRequestModal(false); 
         setSelectedItem(null);
         if (requestedItem.isBasket) setBasket([]);
        }}
        className="w-full py-4 text-white rounded-xl font-bold text-lg transition-all"
        style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
       >
        {requestedItem.isBasket ? 'Done' : 'Browse More Options'}
       </button>
      </div>
     </div>
    </div>
   )}

   {/* Exit Intent Modal */}
   {showExitIntent && (
    <div 
     className="fixed inset-0 flex items-center justify-center p-4 z-50"
     style={{ backgroundColor: 'rgba(0, 0, 58, 0.95)' }}
    >
     <div 
      className="rounded-3xl max-w-md w-full p-8 relative"
      style={{ backgroundColor: '#00003a', border: '1px solid rgba(255,255,255,0.1)' }}
     >
      <button onClick={() => setShowExitIntent(false)} className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl">×</button>
      
      <div className="text-center">
       <h3 className="text-2xl font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
        BEFORE YOU GO...
       </h3>
       <p className="text-white/70 mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
        Want us to save your progress and send you a summary? We'll email you a link to pick up where you left off.
       </p>

       <button
        onClick={async () => {
         await sendEmailNotification(null, basket);
         setShowExitIntent(false);
        }}
        className="w-full py-4 text-white rounded-xl font-bold text-lg transition-all mb-3"
        style={{ backgroundColor: '#34d399', fontFamily: 'League Spartan, sans-serif' }}
       >
        Yes, save my progress
       </button>
       <button
        onClick={() => setShowExitIntent(false)}
        className="w-full py-3 text-white rounded-xl font-bold transition-all"
        style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
       >
        No thanks, I'll come back later
       </button>
      </div>
     </div>
    </div>
   )}

   {/* Share with Colleague Modal */}
   {showShareModal && (
    <div 
     className="fixed inset-0 flex items-center justify-center p-4 z-50" 
     style={{ backgroundColor: 'rgba(0, 0, 58, 0.95)' }}
     onClick={() => setShowShareModal(false)}
    >
     <div 
      className="rounded-3xl max-w-md w-full p-8 relative"
      style={{ backgroundColor: '#00003a', border: '1px solid rgba(255,255,255,0.1)' }}
      onClick={(e) => e.stopPropagation()}
     >
      <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl">×</button>
      
      <div className="text-center">
       <h3 className="text-2xl font-bold mb-2" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
        SHARE WITH A COLLEAGUE
       </h3>
       <p className="text-white/70 mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
        Send your shortlist to a colleague so they can review and add to it.
       </p>

       <input
        type="email"
        placeholder="Colleague's email address"
        value={colleagueEmail}
        onChange={(e) => setColleagueEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none transition-all mb-4"
        style={{ fontFamily: 'League Spartan, sans-serif' }}
       />

       <div className="bg-white/10 rounded-xl p-4 mb-6 text-left max-h-32 overflow-y-auto">
        <p className="text-white/50 text-sm mb-2">Sharing {basket.length} item{basket.length !== 1 ? 's' : ''}:</p>
        {basket.map((item) => (
         <p key={item.id} className="text-white/80 text-sm py-0.5">• {item.name}</p>
        ))}
       </div>

       <button
        onClick={async () => {
         if (colleagueEmail) {
          setIsSubmitting(true);
          await sendEmailNotification(null, basket, true, colleagueEmail);
          setIsSubmitting(false);
          setShowShareModal(false);
          setColleagueEmail('');
         }
        }}
        disabled={!colleagueEmail || isSubmitting}
        className="w-full py-4 disabled:bg-white/20 text-white rounded-xl font-bold text-lg transition-all"
        style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
       >
        {isSubmitting ? 'Sending...' : 'Send Shortlist'}
       </button>
      </div>
     </div>
    </div>
   )}

   {/* Floating Basket Button */}
   {step === 4 && basket.length > 0 && (
    <button
     onClick={() => setShowBasket(true)}
     className="fixed bottom-6 right-6 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-3 z-40"
     style={{ backgroundColor: '#34d399', fontFamily: 'League Spartan, sans-serif', boxShadow: '0 10px 25px rgba(52, 211, 153, 0.3)' }}
     onMouseOver={(e) => e.target.style.backgroundColor = '#2cb385'}
     onMouseOut={(e) => e.target.style.backgroundColor = '#34d399'}
    >
     <span>View Shortlist ({basket.length})</span>
    </button>
   )}

   {/* Basket Modal */}
   {showBasket && (
    <div 
     className="fixed inset-0 flex items-center justify-center p-4 z-50" 
     style={{ backgroundColor: 'rgba(0, 0, 58, 0.95)' }}
     onClick={() => setShowBasket(false)}
    >
     <div 
      className="rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      style={{ backgroundColor: '#00003a', border: '1px solid rgba(255,255,255,0.1)' }}
      onClick={(e) => e.stopPropagation()}
     >
      <div className="p-6 border-b border-white/10">
       <div className="flex justify-between items-start">
        <div>
         <h3 className="text-2xl font-bold" style={{ color: "#f97316", fontFamily: 'Anton, sans-serif' }}>
          IDEAS FEST 2026: {details.company ? details.company.toUpperCase() : 'YOUR'} SHORTLIST
         </h3>
         <p className="text-white/60 mt-1" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          {basket.length} item{basket.length !== 1 ? 's' : ''} selected
         </p>
        </div>
        <button onClick={() => setShowBasket(false)} className="text-white/50 hover:text-white text-2xl leading-none">×</button>
       </div>
      </div>

      <div className="p-6">
       {basket.length === 0 ? (
        <p className="text-white/50 text-center py-8">Your shortlist is empty</p>
       ) : (
        <div className="space-y-3 mb-6">
         {basket.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
           <div className="flex-1">
            <p className="text-white font-bold" style={{ fontFamily: 'League Spartan, sans-serif' }}>
             {item.name}
            </p>
            <p style={{ color: '#f97316' }} className="text-sm font-bold">
             {item.price ? `£${item.price.toLocaleString()}` : 'Enquire'}
            </p>
           </div>
           <button
            onClick={() => toggleBasketItem(item)}
            className="ml-4 text-white/50 hover:text-red-400 transition-colors"
           >
            ×
           </button>
          </div>
         ))}
        </div>
       )}

       {basket.length > 0 && (
        <div className="space-y-3">
         <a
          href={`mailto:annabelle@ideasforums.com?subject=Ideas Fest 2026 - Shortlist from ${encodeURIComponent(details.company || 'Interested Partner')}&body=Hi Annabelle,%0D%0A%0D%0AI'm interested in discussing the following sponsorship opportunities:%0D%0A%0D%0A${basket.map(item => `• ${item.name}`).join('%0D%0A')}%0D%0A%0D%0APlease get in touch to discuss next steps.%0D%0A%0D%0AThanks,%0D%0A${encodeURIComponent(details.name || '')}`}
          className="block w-full py-4 text-white rounded-xl font-bold text-lg transition-all text-center"
          style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
         >
          Submit Shortlist for Discussion
         </a>
         <button
          onClick={() => setShowBasket(false)}
          className="w-full py-4 text-white rounded-xl font-bold transition-all"
          style={{ backgroundColor: '#6366f1', fontFamily: 'League Spartan, sans-serif' }}
         >
          Keep Browsing
         </button>
        </div>
       )}
      </div>
     </div>
    </div>
   )}

   {/* Footer */}
   <footer className="py-8 px-6 border-t border-white/10 text-center">
    <p className="text-white/50 mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
     Questions? Get in touch:
    </p>
    <p className="text-white/70 mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
     <a href="mailto:annabelle@ideasforums.com?subject=Ideas%20Fest%20Opportunities" className="hover:text-[#fbbf24] underline" style={{ color: "#f97316" }}>annabelle@ideasforums.com</a>
    </p>
    <button
     onClick={resetAllData}
     className="px-6 py-2 rounded-xl text-white text-sm transition-all"
     style={{ backgroundColor: '#93a7ff', fontFamily: 'League Spartan, sans-serif' }}
     onMouseOver={(e) => e.target.style.backgroundColor = '#7b91e6'}
     onMouseOut={(e) => e.target.style.backgroundColor = '#93a7ff'}
    >
     Reset & Start Fresh
    </button>
   </footer>
  </div>
 );
}
