import { useState, useEffect, useRef } from "react";

// ============ DATA ============
const HOTELS = [
  { id: "HTL-001", name: "The Metropolitan Downtown", city: "Chicago", star: 4, rate: 289, deal: 245, amenities: ["wifi","gym","restaurant","business center","concierge","room service"], dist: 0.3, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.6, desc: "Modern hotel in the heart of the Loop with skyline views", detail: "Located steps from Millennium Park, The Metropolitan offers floor-to-ceiling windows with city views, a 24-hour fitness center, and an acclaimed farm-to-table restaurant on the lobby level.", color: "#1e3a5f", resortFee: 0, rooms: [{ type: "Standard King", price: 245, features: ["King bed","City view","Free wifi","450 sq ft"] }, { type: "Deluxe King", price: 285, features: ["King bed","Skyline view","Free wifi","550 sq ft","Lounge access"] }, { type: "Junior Suite", price: 345, features: ["King bed","Panoramic view","Living area","750 sq ft","Lounge access"] }] },
  { id: "HTL-002", name: "Lakefront Suites", city: "Chicago", star: 5, rate: 420, deal: 375, amenities: ["wifi","gym","spa","pool","restaurant","lake view","valet","room service"], dist: 1.2, sustainability: "Platinum", cancel: "Free cancellation (48h)", rating: 4.9, desc: "Luxury lakefront retreat with spa and stunning views", detail: "An award-winning luxury hotel on Lake Michigan featuring a world-class spa, infinity pool, and Michelin-starred dining. Every room offers unobstructed lake views.", color: "#0c4a6e", resortFee: 45, rooms: [{ type: "Lake View King", price: 375, features: ["King bed","Lake view","Free wifi","500 sq ft"] }, { type: "Premium Suite", price: 520, features: ["King bed","Panoramic lake view","Living room","850 sq ft","Butler service"] }, { type: "Penthouse Suite", price: 890, features: ["King bed","Wrap-around terrace","Dining room","1400 sq ft","Butler service"] }] },
  { id: "HTL-003", name: "The Wicker Park Inn", city: "Chicago", star: 3, rate: 175, deal: 155, amenities: ["wifi","cafe","bike rental","courtyard","co-working"], dist: 3.1, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.4, desc: "Boutique charm in Chicago's artsy neighborhood", detail: "A lovingly restored brownstone in the heart of Wicker Park. Walking distance to some of Chicago's best restaurants, vintage shops, and live music venues. Complimentary bikes.", color: "#0f766e", rooms: [{ type: "Cozy Queen", price: 155, features: ["Queen bed","Garden view","Free wifi","300 sq ft"] }, { type: "Artist King", price: 195, features: ["King bed","Street view","Free wifi","380 sq ft","Record player"] }, { type: "Loft Suite", price: 265, features: ["King bed","Exposed brick","Sitting area","520 sq ft"] }] },
  { id: "HTL-004", name: "Magnificent Mile Hotel", city: "Chicago", star: 4, rate: 310, deal: 265, amenities: ["wifi","gym","restaurant","concierge","shopping access","valet"], dist: 0.8, sustainability: "Gold", cancel: "Non-refundable", rating: 4.5, resortFee: 25, desc: "Steps from Michigan Avenue shopping and dining", detail: "Prime location on the Magnificent Mile with direct access to over 300 shops and restaurants. Features a rooftop terrace with panoramic city views.", color: "#b45309", rooms: [{ type: "City King", price: 265, features: ["King bed","City view","Free wifi","420 sq ft"] }, { type: "Premium King", price: 320, features: ["King bed","Mile view","Free wifi","500 sq ft","Minibar"] }, { type: "Executive Suite", price: 425, features: ["King bed","Corner views","Office area","700 sq ft","Minibar"] }] },
  { id: "HTL-005", name: "O'Hare Gateway Hotel", city: "Chicago", star: 3, rate: 135, deal: 120, amenities: ["wifi","shuttle","24h dining","business center"], dist: 14.2, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 3.8, desc: "Convenient airport hotel with free shuttle service", detail: "Ideal for early flights or late arrivals. Free 24-hour airport shuttle runs every 15 minutes. Soundproofed rooms and blackout curtains.", color: "#475569", rooms: [{ type: "Standard Queen", price: 120, features: ["Queen bed","Soundproofed","Free wifi","320 sq ft"] }, { type: "Standard King", price: 140, features: ["King bed","Soundproofed","Free wifi","350 sq ft"] }] },
  { id: "HTL-006", name: "Austin Hill Country Lodge", city: "Austin", star: 4, rate: 265, deal: 230, amenities: ["wifi","pool","live music","restaurant","fire pit","garden"], dist: 2.1, sustainability: "Gold", cancel: "Free cancellation (48h)", rating: 4.7, desc: "Hill country charm with nightly live music", detail: "A Texas original set on 5 acres of hill country landscape. Features a spring-fed pool, nightly live music on the patio, and a wood-fire restaurant.", color: "#92400e", rooms: [{ type: "Garden Room", price: 230, features: ["King bed","Garden view","Free wifi","400 sq ft"] }, { type: "Pool Casita", price: 290, features: ["King bed","Pool access","Private patio","480 sq ft"] }, { type: "Hill Country Suite", price: 380, features: ["King bed","Panoramic view","Living room","700 sq ft","Fireplace"] }] },
  { id: "HTL-007", name: "Downtown Austin Suites", city: "Austin", star: 4, rate: 295, deal: 250, amenities: ["wifi","gym","rooftop bar","restaurant","co-working"], dist: 0.5, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.5, desc: "Rooftop views of the Austin skyline on 6th Street", detail: "In the heart of the action on 6th Street. The rooftop bar is one of Austin's best-kept secrets, and the co-working lounge makes it easy to mix business with pleasure.", color: "#0369a1", rooms: [{ type: "Urban King", price: 250, features: ["King bed","City view","Free wifi","430 sq ft"] }, { type: "Skyline Suite", price: 340, features: ["King bed","Skyline view","Living area","650 sq ft","Rooftop access"] }] },
  { id: "HTL-008", name: "South Congress Boutique", city: "Austin", star: 3, rate: 195, deal: 175, amenities: ["wifi","cafe","courtyard","vintage decor","bike rental"], dist: 1.8, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.6, desc: "Quirky boutique on the iconic SoCo strip", detail: "A design-forward boutique hotel on South Congress Avenue. Each room features curated local art and vintage furnishings. The courtyard cafe serves the best breakfast tacos.", color: "#be185d", rooms: [{ type: "SoCo Queen", price: 175, features: ["Queen bed","Courtyard view","Free wifi","280 sq ft"] }, { type: "SoCo King", price: 215, features: ["King bed","Street view","Free wifi","350 sq ft","Vinyl collection"] }, { type: "Artist Suite", price: 295, features: ["King bed","Balcony","Sitting area","500 sq ft","Local art"] }] },
  // New York City
  { id: "HTL-009", name: "The Chelsea Grand", city: "New York", star: 5, rate: 550, deal: 475, amenities: ["wifi","gym","spa","restaurant","rooftop bar","concierge","valet"], dist: 0.6, sustainability: "Platinum", cancel: "Free cancellation (48h)", rating: 4.8, resortFee: 40, desc: "Landmark luxury in the heart of Chelsea", detail: "A meticulously restored 1920s building with a rooftop infinity pool overlooking the Hudson. The in-house restaurant holds a Michelin star, and the spa features a Turkish hammam.", color: "#4c1d95", rooms: [{ type: "Classic King", price: 475, features: ["King bed","City view","Free wifi","400 sq ft"] }, { type: "Grand King", price: 595, features: ["King bed","Hudson view","Free wifi","550 sq ft","Lounge access"] }, { type: "Penthouse Suite", price: 1100, features: ["King bed","Wraparound terrace","Living room","1200 sq ft","Butler service"] }] },
  { id: "HTL-010", name: "Midtown Business Hotel", city: "New York", star: 4, rate: 385, deal: 325, amenities: ["wifi","gym","restaurant","business center","concierge","room service"], dist: 0.2, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.4, desc: "Efficient elegance steps from Times Square", detail: "Purpose-built for business travelers, with soundproofed rooms, ergonomic workstations in every room, and a 24-hour business center. Two blocks from Grand Central.", color: "#1e40af", rooms: [{ type: "Business Queen", price: 325, features: ["Queen bed","Blackout curtains","Free wifi","350 sq ft","Desk"] }, { type: "Business King", price: 375, features: ["King bed","City view","Free wifi","420 sq ft","Ergonomic desk"] }, { type: "Executive Suite", price: 510, features: ["King bed","Corner office","Living area","650 sq ft","Nespresso"] }] },
  { id: "HTL-011", name: "Brooklyn Bridge Inn", city: "New York", star: 3, rate: 225, deal: 195, amenities: ["wifi","cafe","rooftop","bike rental","co-working"], dist: 3.8, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.5, desc: "Industrial-chic boutique in DUMBO", detail: "A converted warehouse in DUMBO with exposed brick, reclaimed wood, and sweeping views of the Manhattan skyline from the rooftop. The on-site cafe roasts its own beans.", color: "#78350f", rooms: [{ type: "Loft Queen", price: 195, features: ["Queen bed","Brick walls","Free wifi","320 sq ft"] }, { type: "Skyline King", price: 255, features: ["King bed","Manhattan view","Free wifi","400 sq ft","Record player"] }, { type: "Bridge Suite", price: 385, features: ["King bed","Bridge view","Living area","580 sq ft","Clawfoot tub"] }] },
  // San Francisco
  { id: "HTL-012", name: "Pacific Heights Hotel", city: "San Francisco", star: 5, rate: 495, deal: 425, amenities: ["wifi","gym","spa","restaurant","valet","concierge","garden"], dist: 1.5, sustainability: "Platinum", cancel: "Free cancellation (48h)", rating: 4.7, resortFee: 35, desc: "Victorian elegance with Golden Gate views", detail: "A beautifully preserved Victorian mansion turned luxury hotel, perched on Pacific Heights with panoramic Golden Gate Bridge views. The garden terrace restaurant is a local favorite.", color: "#7f1d1d", rooms: [{ type: "Garden King", price: 425, features: ["King bed","Garden view","Free wifi","450 sq ft"] }, { type: "Bridge View King", price: 525, features: ["King bed","Golden Gate view","Free wifi","520 sq ft","Fireplace"] }, { type: "Presidential Suite", price: 895, features: ["King bed","Panoramic views","Dining room","1100 sq ft","Butler service"] }] },
  { id: "HTL-013", name: "SoMa Tech Hub Hotel", city: "San Francisco", star: 4, rate: 345, deal: 295, amenities: ["wifi","gym","co-working","restaurant","EV charging","rooftop"], dist: 0.4, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.3, desc: "Modern base for tech travelers near Moscone", detail: "Designed for the modern traveler with gigabit wifi, standing desks in every room, and a co-working lobby that transforms into a cocktail lounge at 6 PM. Walking distance to Moscone Center.", color: "#065f46", rooms: [{ type: "Smart Queen", price: 295, features: ["Queen bed","Standing desk","Gigabit wifi","380 sq ft"] }, { type: "Smart King", price: 345, features: ["King bed","Standing desk","Gigabit wifi","440 sq ft","Dual monitors"] }, { type: "Tech Suite", price: 475, features: ["King bed","Office area","Gigabit wifi","620 sq ft","Meeting table for 4"] }] },
  { id: "HTL-014", name: "Fisherman's Wharf Lodge", city: "San Francisco", star: 3, rate: 215, deal: 185, amenities: ["wifi","cafe","bike rental","bay view","parking"], dist: 2.8, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.4, desc: "Coastal charm steps from the waterfront", detail: "A friendly, family-run lodge with bay views and sourdough bread delivered to your door each morning. Complimentary bikes and a short walk to Ghirardelli Square and Pier 39.", color: "#0e7490", rooms: [{ type: "Bay Queen", price: 185, features: ["Queen bed","Partial bay view","Free wifi","300 sq ft"] }, { type: "Harbor King", price: 235, features: ["King bed","Bay view","Free wifi","380 sq ft","Balcony"] }, { type: "Wharf Suite", price: 315, features: ["King bed","Panoramic bay view","Sitting area","500 sq ft","Balcony"] }] },
  // Miami
  { id: "HTL-015", name: "South Beach Luxe", city: "Miami", star: 5, rate: 520, deal: 445, amenities: ["wifi","pool","spa","beachfront","restaurant","nightclub","valet"], dist: 0.1, sustainability: "Gold", cancel: "Free cancellation (48h)", rating: 4.8, resortFee: 55, desc: "Art deco luxury directly on South Beach", detail: "An iconic art deco tower on Ocean Drive with a private beach club, three pools, and a basement speakeasy. The penthouse restaurant serves modern Latin fusion with ocean views.", color: "#9f1239", rooms: [{ type: "Ocean King", price: 445, features: ["King bed","Ocean view","Free wifi","480 sq ft"] }, { type: "Beach Suite", price: 620, features: ["King bed","Beachfront balcony","Living room","700 sq ft","Outdoor shower"] }, { type: "Penthouse", price: 1200, features: ["King bed","Wrap terrace","Plunge pool","1500 sq ft","Butler service"] }] },
  { id: "HTL-016", name: "Brickell Business Tower", city: "Miami", star: 4, rate: 340, deal: 285, amenities: ["wifi","gym","pool","restaurant","business center","concierge"], dist: 1.4, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.4, resortFee: 35, desc: "Sleek business hotel in the financial district", detail: "A glass tower in the Brickell financial district with a rooftop pool, full-floor gym, and direct Metromover access. Popular with business travelers for its proximity to downtown offices.", color: "#1e3a5f", rooms: [{ type: "City King", price: 285, features: ["King bed","City view","Free wifi","400 sq ft"] }, { type: "Bay View King", price: 355, features: ["King bed","Biscayne Bay view","Free wifi","480 sq ft","Minibar"] }, { type: "Corner Suite", price: 465, features: ["King bed","Panoramic views","Office area","680 sq ft","Lounge access"] }] },
  { id: "HTL-017", name: "Wynwood Art Hotel", city: "Miami", star: 3, rate: 195, deal: 165, amenities: ["wifi","cafe","gallery","courtyard","bike rental"], dist: 3.2, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.6, desc: "Immersive art experience in Wynwood", detail: "Every surface is a canvas at this Wynwood boutique hotel. Rotating murals by local artists, an on-site gallery, and rooms designed by different Miami creatives. The courtyard hosts weekly art events.", color: "#c026d3", rooms: [{ type: "Gallery Queen", price: 165, features: ["Queen bed","Art installation","Free wifi","300 sq ft"] }, { type: "Mural King", price: 210, features: ["King bed","Artist-designed","Free wifi","370 sq ft","Turntable"] }, { type: "Studio Suite", price: 295, features: ["King bed","Private gallery wall","Sitting area","520 sq ft","Balcony"] }] },
  // Denver
  { id: "HTL-018", name: "The Brown Palace", city: "Denver", star: 5, rate: 410, deal: 355, amenities: ["wifi","gym","spa","restaurant","afternoon tea","concierge","valet"], dist: 0.3, sustainability: "Gold", cancel: "Free cancellation (48h)", rating: 4.7, resortFee: 30, desc: "Historic landmark since 1892 in downtown Denver", detail: "Denver's most storied hotel, hosting presidents since Teddy Roosevelt. The nine-story atrium lobby, afternoon tea service, and award-winning steakhouse make it an institution.", color: "#713f12", rooms: [{ type: "Heritage Queen", price: 355, features: ["Queen bed","Atrium view","Free wifi","380 sq ft","Period furnishings"] }, { type: "Presidential King", price: 445, features: ["King bed","Mountain view","Free wifi","500 sq ft","Marble bath"] }, { type: "Roosevelt Suite", price: 695, features: ["King bed","Panoramic views","Parlor room","900 sq ft","Butler service"] }] },
  { id: "HTL-019", name: "RiNo District Hotel", city: "Denver", star: 4, rate: 275, deal: 235, amenities: ["wifi","gym","rooftop bar","restaurant","bike rental","co-working"], dist: 1.6, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.5, desc: "Industrial-cool in Denver's art district", detail: "A converted brewery in the River North Art District with craft cocktails on the rooftop and a ground-floor restaurant by a James Beard nominee. Walking distance to dozens of galleries and breweries.", color: "#b91c1c", rooms: [{ type: "Brew Queen", price: 235, features: ["Queen bed","District view","Free wifi","340 sq ft"] }, { type: "Craft King", price: 285, features: ["King bed","Mountain peek","Free wifi","420 sq ft","Minibar with local craft beer"] }, { type: "Brewery Suite", price: 395, features: ["King bed","Rooftop access","Living area","600 sq ft","Private bar"] }] },
  { id: "HTL-020", name: "Mile High Airport Lodge", city: "Denver", star: 3, rate: 155, deal: 130, amenities: ["wifi","shuttle","24h dining","parking","pet friendly"], dist: 12.5, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 3.9, desc: "Easy airport access with mountain views", detail: "A no-fuss lodge near Denver International with free parking and a 24-hour shuttle. Surprisingly good mountain views from the upper floors and a pet-friendly policy that extends to the lobby.", color: "#374151", rooms: [{ type: "Standard Queen", price: 130, features: ["Queen bed","Mountain view","Free wifi","310 sq ft"] }, { type: "Standard King", price: 155, features: ["King bed","Mountain view","Free wifi","350 sq ft","Desk"] }] },
  // Seattle
  { id: "HTL-021", name: "Puget Sound Grand", city: "Seattle", star: 5, rate: 465, deal: 395, amenities: ["wifi","gym","spa","restaurant","waterfront","concierge","valet"], dist: 0.8, sustainability: "Platinum", cancel: "Free cancellation (48h)", rating: 4.8, resortFee: 35, desc: "Waterfront luxury with Puget Sound views", detail: "A glass-and-timber masterpiece on the Elliott Bay waterfront. Floor-to-ceiling windows frame the Olympic Mountains, the spa uses local botanicals, and the seafood restaurant sources from Pike Place Market daily.", color: "#1e3a5f", rooms: [{ type: "Sound View King", price: 395, features: ["King bed","Puget Sound view","Free wifi","480 sq ft"] }, { type: "Olympic Suite", price: 545, features: ["King bed","Mountain + water view","Living room","720 sq ft","Soaking tub"] }, { type: "Grand Suite", price: 850, features: ["King bed","Wraparound views","Dining room","1100 sq ft","Butler service"] }] },
  { id: "HTL-022", name: "Capitol Hill Boutique", city: "Seattle", star: 3, rate: 205, deal: 175, amenities: ["wifi","cafe","vinyl lounge","courtyard","bike rental"], dist: 1.9, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.5, desc: "Eclectic boutique in Seattle's coolest neighborhood", detail: "A mid-century modern gem in Capitol Hill surrounded by the city's best coffee shops, bookstores, and live music venues. The lobby vinyl lounge has over 3,000 records.", color: "#581c87", rooms: [{ type: "Retro Queen", price: 175, features: ["Queen bed","Courtyard view","Free wifi","290 sq ft"] }, { type: "Mod King", price: 225, features: ["King bed","Street view","Free wifi","360 sq ft","Turntable"] }, { type: "Penthouse Loft", price: 325, features: ["King bed","Skyline view","Mezzanine","520 sq ft","Private deck"] }] },
  { id: "HTL-023", name: "Pioneer Square Hotel", city: "Seattle", star: 4, rate: 315, deal: 270, amenities: ["wifi","gym","restaurant","bar","concierge","room service"], dist: 0.4, sustainability: "Gold", cancel: "Non-refundable", rating: 4.3, desc: "Historic character in Seattle's oldest neighborhood", detail: "Set in a beautifully restored 1901 building in Pioneer Square with original exposed brick, tall arched windows, and a celebrated Pacific Northwest restaurant on the ground floor.", color: "#854d0e", rooms: [{ type: "Heritage King", price: 270, features: ["King bed","Square view","Free wifi","400 sq ft","Exposed brick"] }, { type: "Deluxe King", price: 335, features: ["King bed","Bay peek","Free wifi","470 sq ft","Clawfoot tub"] }, { type: "Founder's Suite", price: 465, features: ["King bed","Panoramic view","Sitting room","650 sq ft","Wet bar"] }] },
  // Chicago additions
  { id: "HTL-024", name: "The Gold Coast Residences", city: "Chicago", star: 5, rate: 480, deal: 410, amenities: ["wifi","gym","spa","pool","restaurant","concierge","valet","room service"], dist: 0.9, sustainability: "Platinum", cancel: "Free cancellation (48h)", rating: 4.8, resortFee: 40, desc: "Ultra-luxury residences on the Gold Coast", detail: "An intimate 48-suite property on the Gold Coast with personalized butler service, a rooftop heated pool, and a private art collection curated by the Art Institute of Chicago.", color: "#1e3a5f", rooms: [{ type: "Residence King", price: 410, features: ["King bed","Lake view","Free wifi","600 sq ft"] }, { type: "Grand Residence", price: 580, features: ["King bed","Panoramic view","Living room","900 sq ft","Butler service"] }, { type: "Owner's Suite", price: 950, features: ["King bed","Terrace","Dining room","1400 sq ft","Butler service"] }] },
  { id: "HTL-025", name: "River North Lofts", city: "Chicago", star: 4, rate: 275, deal: 235, amenities: ["wifi","gym","rooftop bar","restaurant","co-working","EV charging"], dist: 0.5, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.5, desc: "Industrial-chic lofts in the gallery district", detail: "Converted from a 1920s printing warehouse, these loft-style rooms feature 14-foot ceilings, original timber beams, and curated art from nearby galleries. The rooftop bar overlooks the Chicago River.", color: "#374151", rooms: [{ type: "Loft Queen", price: 235, features: ["Queen bed","River view","Free wifi","420 sq ft"] }, { type: "Loft King", price: 280, features: ["King bed","Skyline view","Free wifi","520 sq ft","Record player"] }, { type: "Penthouse Loft", price: 395, features: ["King bed","Wraparound terrace","Living area","800 sq ft","Wet bar"] }] },
  { id: "HTL-026", name: "Lincoln Park Garden Hotel", city: "Chicago", star: 3, rate: 185, deal: 160, amenities: ["wifi","garden","cafe","bike rental","parking"], dist: 2.8, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.3, desc: "Quiet garden retreat near Lincoln Park Zoo", detail: "A charming ivy-covered hotel backing onto a private garden, steps from Lincoln Park Zoo and the lakefront trail. Complimentary bikes and fresh-baked pastries each morning.", color: "#065f46", rooms: [{ type: "Garden Queen", price: 160, features: ["Queen bed","Garden view","Free wifi","320 sq ft"] }, { type: "Park King", price: 205, features: ["King bed","Park view","Free wifi","400 sq ft","Balcony"] }, { type: "Conservatory Suite", price: 285, features: ["King bed","Garden terrace","Sitting area","550 sq ft"] }] },
  { id: "HTL-027", name: "South Loop Express", city: "Chicago", star: 3, rate: 155, deal: 130, amenities: ["wifi","gym","business center","24h dining"], dist: 1.1, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.0, desc: "Smart-value base near Museum Campus", detail: "A no-frills modern hotel near Museum Campus and Soldier Field. Clean rooms with blackout curtains, a 24-hour grab-and-go cafe, and easy access to the CTA Red Line.", color: "#475569", rooms: [{ type: "Compact Queen", price: 130, features: ["Queen bed","City view","Free wifi","280 sq ft"] }, { type: "Standard King", price: 165, features: ["King bed","City view","Free wifi","340 sq ft"] }] },
  { id: "HTL-028", name: "Hyde Park Academic Hotel", city: "Chicago", star: 3, rate: 165, deal: 145, amenities: ["wifi","cafe","library","courtyard","co-working"], dist: 7.2, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.2, desc: "Scholarly charm near the University of Chicago", detail: "A Gothic Revival building in the heart of Hyde Park with a reading library, courtyard garden, and walking distance to the Museum of Science and Industry. Popular with visiting academics.", color: "#78350f", rooms: [{ type: "Scholar Queen", price: 145, features: ["Queen bed","Courtyard view","Free wifi","300 sq ft"] }, { type: "Faculty King", price: 185, features: ["King bed","Garden view","Free wifi","380 sq ft","Writing desk"] }, { type: "Dean's Suite", price: 260, features: ["King bed","Library nook","Sitting room","520 sq ft"] }] },
  // Austin additions
  { id: "HTL-029", name: "Rainey Street Hotel", city: "Austin", star: 4, rate: 310, deal: 265, amenities: ["wifi","pool","rooftop bar","restaurant","valet","gym"], dist: 0.3, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.6, desc: "Rooftop pool overlooking Lady Bird Lake", detail: "A sleek glass tower at the end of historic Rainey Street with an infinity rooftop pool, three restaurants, and walking distance to the Convention Center. The sunset views from the pool deck are unmatched.", color: "#0369a1", rooms: [{ type: "City King", price: 265, features: ["King bed","City view","Free wifi","430 sq ft"] }, { type: "Lake View King", price: 335, features: ["King bed","Lake view","Free wifi","500 sq ft","Balcony"] }, { type: "Penthouse Suite", price: 520, features: ["King bed","Panoramic view","Living room","800 sq ft","Terrace"] }] },
  { id: "HTL-030", name: "East Austin Creative", city: "Austin", star: 3, rate: 175, deal: 150, amenities: ["wifi","cafe","courtyard","bike rental","art gallery"], dist: 2.4, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.4, desc: "Artist-run hotel in East Austin's creative district", detail: "A reimagined motor court where each room is designed by a different local artist. The courtyard hosts live music on weekends, and the on-site gallery rotates monthly.", color: "#be185d", rooms: [{ type: "Artist Queen", price: 150, features: ["Queen bed","Courtyard view","Free wifi","290 sq ft"] }, { type: "Mural King", price: 195, features: ["King bed","Art installation","Free wifi","360 sq ft"] }, { type: "Gallery Suite", price: 275, features: ["King bed","Private gallery","Sitting area","480 sq ft"] }] },
  { id: "HTL-031", name: "Lakeway Resort & Spa", city: "Austin", star: 5, rate: 425, deal: 365, amenities: ["wifi","spa","pool","golf","restaurant","marina","gym"], dist: 18.5, sustainability: "Gold", cancel: "Free cancellation (48h)", rating: 4.7, resortFee: 45, desc: "Full-service lakeside resort on Lake Travis", detail: "A sprawling resort on the shores of Lake Travis with a championship golf course, full-service marina, and a spa fed by natural springs. Perfect for those who want a getaway outside the city.", color: "#92400e", rooms: [{ type: "Lake King", price: 365, features: ["King bed","Lake view","Free wifi","500 sq ft"] }, { type: "Villa Suite", price: 510, features: ["King bed","Lake terrace","Living room","750 sq ft","Fireplace"] }, { type: "Presidential Villa", price: 825, features: ["King bed","Private pool","Full kitchen","1200 sq ft","Butler service"] }] },
  // New York additions
  { id: "HTL-032", name: "Lower East Side Social", city: "New York", star: 3, rate: 245, deal: 210, amenities: ["wifi","rooftop","bar","cafe","co-working"], dist: 2.1, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.3, desc: "Hip social hotel in the heart of LES", detail: "A design-driven social hotel where the lobby doubles as a buzzy cocktail bar. Compact rooms with smart storage, a rooftop with Manhattan views, and surrounded by the best food in the city.", color: "#581c87", rooms: [{ type: "Micro Queen", price: 210, features: ["Queen bed","Street view","Free wifi","220 sq ft"] }, { type: "Social King", price: 265, features: ["King bed","City view","Free wifi","300 sq ft","Bluetooth speaker"] }, { type: "Rooftop Suite", price: 410, features: ["King bed","Skyline view","Sitting area","480 sq ft","Rooftop access"] }] },
  { id: "HTL-033", name: "SoHo Luxe", city: "New York", star: 5, rate: 620, deal: 535, amenities: ["wifi","gym","spa","restaurant","concierge","valet","room service"], dist: 1.2, sustainability: "Platinum", cancel: "Free cancellation (48h)", rating: 4.9, resortFee: 45, desc: "Intimate luxury in a landmark SoHo building", detail: "A 30-room jewel box in a cast-iron SoHo landmark. Each suite features curated mid-century furniture, a marble bathroom, and a private art collection. The basement speakeasy requires a room key.", color: "#4c1d95", rooms: [{ type: "SoHo King", price: 535, features: ["King bed","Loft view","Free wifi","450 sq ft"] }, { type: "Gallery Suite", price: 720, features: ["King bed","Art collection","Living room","650 sq ft","Soaking tub"] }, { type: "Penthouse Loft", price: 1250, features: ["King bed","Private terrace","Full kitchen","1100 sq ft","Butler service"] }] },
  { id: "HTL-034", name: "Penn Station Express", city: "New York", star: 3, rate: 195, deal: 170, amenities: ["wifi","gym","business center","24h dining"], dist: 0.1, sustainability: "Silver", cancel: "Non-refundable", rating: 3.9, desc: "No-frills efficiency steps from Penn Station", detail: "The most convenient hotel in Midtown for train travelers. Clean, modern rooms with excellent soundproofing. The 24-hour lobby cafe serves surprisingly good coffee.", color: "#475569", rooms: [{ type: "Compact Queen", price: 170, features: ["Queen bed","Blackout curtains","Free wifi","240 sq ft"] }, { type: "Standard King", price: 210, features: ["King bed","City view","Free wifi","300 sq ft","Desk"] }] },
  // San Francisco additions
  { id: "HTL-035", name: "Mission District Hotel", city: "San Francisco", star: 3, rate: 225, deal: 195, amenities: ["wifi","cafe","courtyard","mural tour","bike rental"], dist: 2.2, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.5, desc: "Colorful boutique in the heart of the Mission", detail: "A vibrant hotel surrounded by some of SF's best taquerias, murals, and coffee shops. The courtyard hosts a weekly local market, and the concierge runs neighborhood walking tours.", color: "#be185d", rooms: [{ type: "Mission Queen", price: 195, features: ["Queen bed","Courtyard view","Free wifi","310 sq ft"] }, { type: "Mural King", price: 250, features: ["King bed","Street view","Free wifi","380 sq ft","Local art"] }, { type: "Dolores Suite", price: 340, features: ["King bed","Park view","Sitting area","500 sq ft","Balcony"] }] },
  { id: "HTL-036", name: "Nob Hill Grand", city: "San Francisco", star: 5, rate: 540, deal: 460, amenities: ["wifi","gym","spa","restaurant","concierge","valet","garden"], dist: 0.6, sustainability: "Platinum", cancel: "Free cancellation (48h)", rating: 4.8, resortFee: 40, desc: "Grand dame luxury atop Nob Hill", detail: "A Beaux-Arts masterpiece with a legendary lobby, white-glove service, and panoramic views from every direction. The rooftop garden restaurant is one of the most coveted reservations in the city.", color: "#7f1d1d", rooms: [{ type: "Classic King", price: 460, features: ["King bed","City view","Free wifi","420 sq ft"] }, { type: "Bay View King", price: 575, features: ["King bed","Bay view","Free wifi","520 sq ft","Fireplace"] }, { type: "Grand Suite", price: 920, features: ["King bed","Panoramic views","Dining room","1000 sq ft","Butler service"] }] },
  { id: "HTL-037", name: "Airport Gateway Inn", city: "San Francisco", star: 3, rate: 155, deal: 135, amenities: ["wifi","shuttle","parking","24h dining","gym"], dist: 11.5, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 3.7, desc: "Convenient SFO hotel with free shuttle", detail: "Ideal for early flights or layovers. Free 24-hour airport shuttle, soundproofed rooms, and a surprisingly good diner open around the clock. BART station within walking distance.", color: "#475569", rooms: [{ type: "Standard Queen", price: 135, features: ["Queen bed","Soundproofed","Free wifi","300 sq ft"] }, { type: "Standard King", price: 160, features: ["King bed","Soundproofed","Free wifi","340 sq ft"] }] },
  // Miami additions
  { id: "HTL-038", name: "Wynwood Gallery Suites", city: "Miami", star: 4, rate: 285, deal: 245, amenities: ["wifi","pool","rooftop","restaurant","gallery","bike rental"], dist: 3.2, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.6, desc: "Art-forward hotel in the Wynwood Arts District", detail: "Every surface is a canvas at this Wynwood landmark. The rooftop pool overlooks the neighborhood's famous murals, and the lobby gallery features rotating installations from Art Basel artists.", color: "#0369a1", rooms: [{ type: "Gallery Queen", price: 245, features: ["Queen bed","Mural view","Free wifi","350 sq ft"] }, { type: "Art King", price: 310, features: ["King bed","Gallery view","Free wifi","420 sq ft","Original art"] }, { type: "Curator Suite", price: 430, features: ["King bed","Private gallery","Living room","620 sq ft","Terrace"] }] },
  { id: "HTL-039", name: "Coconut Grove Retreat", city: "Miami", star: 4, rate: 320, deal: 275, amenities: ["wifi","pool","garden","spa","restaurant","kayak rental"], dist: 5.8, sustainability: "Gold", cancel: "Free cancellation (48h)", rating: 4.7, desc: "Tropical hideaway under the banyan trees", detail: "A lush garden property tucked under ancient banyan trees in Coconut Grove. The spa uses local tropical botanicals, and complimentary kayaks launch directly into Biscayne Bay.", color: "#065f46", rooms: [{ type: "Garden King", price: 275, features: ["King bed","Garden view","Free wifi","400 sq ft"] }, { type: "Bay View King", price: 350, features: ["King bed","Bay view","Free wifi","480 sq ft","Balcony"] }, { type: "Treehouse Suite", price: 485, features: ["King bed","Canopy terrace","Living room","650 sq ft","Outdoor shower"] }] },
  { id: "HTL-040", name: "Miami Airport Hilton", city: "Miami", star: 3, rate: 145, deal: 125, amenities: ["wifi","shuttle","pool","gym","24h dining"], dist: 8.1, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 3.8, desc: "Reliable airport hotel with pool", detail: "A solid airport option with a surprising tropical pool area, free 24-hour shuttle, and soundproofed rooms. The grab-and-go market stocks Cuban coffee and pastelitos.", color: "#475569", rooms: [{ type: "Standard Queen", price: 125, features: ["Queen bed","Pool view","Free wifi","310 sq ft"] }, { type: "Standard King", price: 155, features: ["King bed","Pool view","Free wifi","350 sq ft"] }] },
  // Denver additions
  { id: "HTL-041", name: "RiNo Craft Hotel", city: "Denver", star: 4, rate: 275, deal: 235, amenities: ["wifi","rooftop","brewery","restaurant","co-working","bike rental"], dist: 1.8, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.6, desc: "Craft beer and mountain views in RiNo", detail: "A brewery-hotel hybrid in Denver's River North Art District. The rooftop deck has 270-degree mountain views, the ground floor brewery pours exclusive small-batch beers, and the rooms feature reclaimed wood from Colorado barns.", color: "#92400e", rooms: [{ type: "Craft Queen", price: 235, features: ["Queen bed","Mountain view","Free wifi","350 sq ft"] }, { type: "Brewer's King", price: 290, features: ["King bed","Skyline view","Free wifi","430 sq ft","Minibar with local craft beer"] }, { type: "Rooftop Suite", price: 410, features: ["King bed","Mountain panorama","Living area","620 sq ft","Private deck"] }] },
  { id: "HTL-042", name: "Cherry Creek Boutique", city: "Denver", star: 4, rate: 295, deal: 250, amenities: ["wifi","gym","spa","restaurant","concierge","valet"], dist: 3.5, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.5, desc: "Refined luxury in Denver's upscale shopping district", detail: "An intimate 40-room boutique in Cherry Creek surrounded by designer shops and fine dining. The in-house spa specializes in altitude-recovery treatments popular with visiting athletes.", color: "#1e3a5f", rooms: [{ type: "Boutique King", price: 250, features: ["King bed","Garden view","Free wifi","400 sq ft"] }, { type: "Cherry Suite", price: 340, features: ["King bed","Mountain view","Free wifi","520 sq ft","Soaking tub"] }, { type: "Penthouse", price: 485, features: ["King bed","Panoramic view","Living room","700 sq ft","Fireplace"] }] },
  { id: "HTL-043", name: "Union Station Hotel", city: "Denver", star: 5, rate: 420, deal: 360, amenities: ["wifi","gym","spa","restaurant","bar","concierge","valet"], dist: 0.1, sustainability: "Platinum", cancel: "Free cancellation (48h)", rating: 4.8, resortFee: 35, desc: "Landmark luxury inside Denver's Union Station", detail: "Occupying the upper floors of Denver's beautifully restored 1881 Union Station. The Cooper Lounge is the city's most iconic bar, and the location puts you at the center of everything in LoDo.", color: "#4c1d95", rooms: [{ type: "Pullman King", price: 360, features: ["King bed","LoDo view","Free wifi","450 sq ft"] }, { type: "Conductor Suite", price: 490, features: ["King bed","Mountain view","Living room","650 sq ft","Clawfoot tub"] }, { type: "Station Master Suite", price: 780, features: ["King bed","Panoramic view","Dining room","950 sq ft","Butler service"] }] },
  // Seattle additions
  { id: "HTL-044", name: "Fremont Quirky Inn", city: "Seattle", star: 3, rate: 195, deal: 170, amenities: ["wifi","cafe","courtyard","bike rental","board games"], dist: 3.2, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 4.4, desc: "Offbeat charm in Seattle's quirkiest neighborhood", detail: "Next to the Fremont Troll and surrounded by craft breweries and vintage shops. Each room has a different theme, the lobby has a wall of board games, and breakfast includes fresh donuts from the shop next door.", color: "#581c87", rooms: [{ type: "Quirky Queen", price: 170, features: ["Queen bed","Troll view","Free wifi","300 sq ft"] }, { type: "Funky King", price: 215, features: ["King bed","Canal view","Free wifi","370 sq ft","Themed decor"] }, { type: "Penthouse Treehouse", price: 305, features: ["King bed","Rooftop deck","Sitting area","480 sq ft"] }] },
  { id: "HTL-045", name: "Belltown Waterfront", city: "Seattle", star: 4, rate: 340, deal: 290, amenities: ["wifi","gym","restaurant","rooftop","concierge","EV charging"], dist: 0.3, sustainability: "Gold", cancel: "Free cancellation (24h)", rating: 4.5, desc: "Modern waterfront hotel near Pike Place", detail: "Floor-to-ceiling windows frame Elliott Bay from every room. Walking distance to Pike Place Market, the Seattle Aquarium, and the Olympic Sculpture Park. The rooftop bar serves the best espresso martini in Belltown.", color: "#0369a1", rooms: [{ type: "Bay King", price: 290, features: ["King bed","Bay view","Free wifi","420 sq ft"] }, { type: "Market Suite", price: 390, features: ["King bed","Panoramic bay view","Living area","580 sq ft","Balcony"] }, { type: "Waterfront Suite", price: 540, features: ["King bed","Wraparound views","Dining area","720 sq ft","Soaking tub"] }] },
  { id: "HTL-046", name: "SeaTac Gateway", city: "Seattle", star: 3, rate: 140, deal: 120, amenities: ["wifi","shuttle","gym","24h dining","parking"], dist: 13.5, sustainability: "Silver", cancel: "Free cancellation (24h)", rating: 3.7, desc: "Convenient airport hotel with free shuttle", detail: "A reliable airport option with free 24-hour shuttle every 10 minutes, soundproofed rooms, and a surprisingly decent restaurant. Light rail to downtown is a 5-minute walk.", color: "#475569", rooms: [{ type: "Standard Queen", price: 120, features: ["Queen bed","Soundproofed","Free wifi","290 sq ft"] }, { type: "Standard King", price: 145, features: ["King bed","Soundproofed","Free wifi","330 sq ft"] }] },
];

const TRAVELER = {
  name: "Sarah Chen",
  loyalty: { program: "HTS Platinum", tier: "Platinum" },
  preferences: { room_type: "king", floor: "high", quiet: true, max_budget: 280 },
  miles: 125453,
  recent_trips: [
    { city: "Chicago", hotel: "Marriott Magnificent Mile", rating: 4, date: "Jan 2026" },
    { city: "Austin", hotel: "Hyatt Regency", rating: 5, date: "Nov 2025" },
    { city: "Chicago", hotel: "The Metropolitan Downtown", rating: 4, date: "Sep 2025" },
    { city: "Chicago", hotel: "Lakefront Suites", rating: 5, date: "May 2025" },
  ]
};

const CITY_TAX = { Chicago: 0.172, Austin: 0.15, "New York": 0.1458, "San Francisco": 0.14, Miami: 0.13, Denver: 0.107, Seattle: 0.158 };
const PROMO_CODES = { SPRING20: { type: "percent", value: 20, label: "Spring Sale 20% Off" }, SAVE50: { type: "fixed", value: 50, label: "$50 Off Your Stay" }, HTS10: { type: "percent", value: 10, label: "HTS Member 10% Off" } };

// Curated projection of TRAVELER for the LLM prompt. This object IS the
// allowed-data boundary — fields not included here are not available to the
// model. Don't dump the raw TRAVELER object; it contains data we never want
// the model to reference (miles balance, hotel names from recent trips,
// trip dates/ratings, full name).
const LLM_TRAVELER_DATA = {
  first_name: TRAVELER.name.split(" ")[0],
  loyalty: { tier: TRAVELER.loyalty.tier, program: TRAVELER.loyalty.program },
  preferences: {
    max_budget_per_night_usd: TRAVELER.preferences.max_budget,
    room_type: TRAVELER.preferences.room_type,
    floor: TRAVELER.preferences.floor,
    quiet: TRAVELER.preferences.quiet,
  },
  recent_trip_cities: TRAVELER.recent_trips.map(t => t.city),
};

// Build a slightly inaccurate version of hotel data for the LLM prompt
// This simulates a real-world bug: the LLM's data is stale/out-of-sync with the UI
const LLM_HOTEL_DATA = HOTELS.map(h => {
  const tweaked = { id: h.id, name: h.name, city: h.city, star: h.star, deal_rate: h.deal, regular_rate: h.rate, rating: h.rating, dist_to_center_mi: h.dist, amenities: [...h.amenities], sustainability: h.sustainability, cancellation: h.cancel, description: h.desc, resort_fee: h.resortFee || 0 };
  // Introduce subtle data drift on some hotels
  if (h.id === "HTL-001") { tweaked.deal_rate = 219; tweaked.rating = 4.8; }
  if (h.id === "HTL-002") { tweaked.amenities.push("tennis court"); tweaked.resort_fee = 0; }
  if (h.id === "HTL-009") { tweaked.deal_rate = 425; tweaked.rating = 4.9; }
  if (h.id === "HTL-006") { tweaked.amenities.push("spa"); }
  if (h.id === "HTL-015") { tweaked.resort_fee = 0; tweaked.deal_rate = 395; }
  return tweaked;
});

const SYSTEM_PROMPT = `You are HTS's hotel booking assistant. You help travelers find and book hotels.

You have access to these hotels (JSON):
${JSON.stringify(LLM_HOTEL_DATA, null, 0)}

You have access to this traveler profile (JSON). This is the COMPLETE set of fields available to you about the user — do NOT invent, infer, or imply ANY other personal data (no miles balance, no past hotel names, no trip dates/ratings, no full name, no age/job/address/companions/food prefs/allergies/payment methods). If asked about a field that is not in this object, respond honestly that you don't have that info and offer to help with what you can.
${JSON.stringify(LLM_TRAVELER_DATA, null, 0)}

Today's date is ${new Date().toISOString().slice(0,10)}.

IMPORTANT RULES:
- You can ONLY recommend hotels from the list above. Never invent hotels.
- When the user tells you enough to search (at minimum a city), recommend hotels from the data.
- To show hotel cards in the UI, include a JSON block in your response wrapped in <hotels> tags with an array of hotel IDs to display, like: <hotels>["HTL-001","HTL-003"]</hotels>
- CRITICAL: Keep your text responses VERY short (1-2 sentences max). The hotel cards already show all the details — do NOT repeat hotel names, prices, ratings, or descriptions in your text. Just write a brief intro like "Here are 4 options in Chicago for your trip:" and let the cards do the work.
- ONLY recommend hotels in the city the user asked for. Never mix cities.
- When the user selects a hotel, include <detail>HTL-001</detail> to show the detail/room view. Keep your text to one sentence.
- When the user selects a room and you have all booking info, include <booking>{"hotel_id":"HTL-001","room_type":"Standard King","nights":3,"guests":2}</booking> to show the booking summary with checkout.
- The booking summary includes a guest details form and payment method selection. The user fills these in the UI — you do NOT need to ask for name, email, or payment in the chat.
- When the user confirms a booking (after filling checkout), include <confirmed/> in your response.
- Before recommending hotels, you MUST have ALL of: city, specific check-in date, length of stay (nights OR explicit check-out date), and number of guests. If ANY is missing, ASK for it before recommending. Critically: "3 nights" or "a week" without a specific check-in date is NOT enough — ask "When would you like to check in?" If the user says something vague like "next weekend" or "sometime in June", propose specific dates and confirm before recommending. Be conversational — if they give you multiple complete pieces of info at once, don't re-ask those.
- SURPRISE ME / DISCOVERY EXCEPTION: if the user explicitly asks to be surprised ("surprise me", "pick something for me", "I don't know, recommend something", "what's good?"), you may IMMEDIATELY propose a complete featured trip without asking for any details. Use the traveler profile above to make it personalized. Constraint hierarchy when selecting the hotel:
  1. HARD (never relax): hotel.deal_rate ≤ preferences.max_budget_per_night_usd. Filter out anything more expensive — no exceptions.
  2. DISCOVERY (relax only as last resort): prefer cities NOT in recent_trip_cities.
  3. NICE-TO-HAVES (relax freely): within the candidate set, prefer hotels with a room matching preferences.room_type, with high-floor / rooftop / skyline / view indicators if preferences.floor is "high", and with quiet markers ("soundproofed", "garden", "courtyard", or distance from center > 1mi) if preferences.quiet is true.
  4. RELAXATION ORDER if no candidates: drop NICE-TO-HAVES first, then DISCOVERY. NEVER relax step 1.
  Pick a check-in date 2-3 weeks from today, 3 nights, 2 guests. Pitch in ONE conversational sentence that names BOTH the hotel AND the profile reason (e.g., "You haven't been to Seattle yet, and Capitol Hill Boutique fits your $280 cap with a soundproofed king room — Jun 5–8?"). Emit <trip>{...}</trip> AND <hotels>["HTL-XYZ"]</hotels> with the one pick. Close with: "Want a different city, dates, or vibe? Just say the word." Do NOT ask follow-up questions first — deliver the surprise.
  IMPORTANT: when the user's message contains a [SURPRISE_CANDIDATES ...] block, you MUST pick the hotel from that list — the system has already pre-filtered for budget and discovery. Picking anything outside that list is a hard failure. Never mention the candidates block in your visible response — it is internal-only context.
- TRIP STATE TAG: whenever the user provides OR changes any trip detail (city, dates, nights, guests), include a <trip>{...}</trip> JSON tag with the CURRENT trip state. Fields (all optional, only include what's known): city, check_in (ISO date YYYY-MM-DD), check_out (ISO date YYYY-MM-DD), nights (integer), guests (integer). Example: <trip>{"city":"Chicago","check_in":"2026-05-22","check_out":"2026-05-25","nights":3,"guests":2}</trip>. If the user says "May 22 to May 25" you MUST emit check_in and check_out. If the user just says "3 nights" without specific dates, emit nights only. Always emit the tag when trip state changes, even if recommending hotels in the same turn.
- For a city search, include ALL relevant hotels in that city in <hotels> (typically 4-12 IDs depending on city). The system re-ranks the cards client-side based on the traveler profile (budget proximity primary, room_type / floor / quiet preferences secondary), so the order you emit them in does not matter.
- Greet the user by their first_name and acknowledge loyalty status when relevant. Use the profile fields judiciously: lean on them heavily for surprise picks, lightly for general recommendations (e.g., quietly prefer hotels near her budget when she gives you free choice), and do NOT robotically recite her preferences in every reply.
- Never use markdown formatting like **bold** or bullet points. Write in plain conversational text.`;

// ============ LLM ============
async function callLLM(messages, retries = 1) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages }),
      });
      if (!res.ok && i < retries) continue;
      const data = await res.json();
      if (data.content?.[0]?.text) return data.content[0].text;
      if (i < retries) continue;
    } catch (e) {
      if (i < retries) continue;
    }
  }
  return "I'm having trouble connecting. Please try again in a moment.";
}

function parseResponse(text) {
  const result = { text: text, hotelIds: null, detailId: null, booking: null, confirmed: false, trip: null };

  const tripMatch = text.match(/<trip>(.*?)<\/trip>/s);
  if (tripMatch) {
    try { result.trip = JSON.parse(tripMatch[1]); } catch {}
    result.text = result.text.replace(/<trip>.*?<\/trip>/s, "").trim();
  }

  const hotelsMatch = text.match(/<hotels>(.*?)<\/hotels>/s);
  if (hotelsMatch) {
    try { result.hotelIds = JSON.parse(hotelsMatch[1]); } catch {}
    result.text = result.text.replace(/<hotels>.*?<\/hotels>/s, "").trim();
  }

  const detailMatch = text.match(/<detail>(.*?)<\/detail>/s);
  if (detailMatch) {
    result.detailId = detailMatch[1].trim();
    result.text = result.text.replace(/<detail>.*?<\/detail>/s, "").trim();
  }

  const bookingMatch = text.match(/<booking>(.*?)<\/booking>/s);
  if (bookingMatch) {
    try { result.booking = JSON.parse(bookingMatch[1]); } catch {}
    result.text = result.text.replace(/<booking>.*?<\/booking>/s, "").trim();
  }

  if (text.includes("<confirmed/>")) {
    result.confirmed = true;
    result.text = result.text.replace(/<confirmed\/>/g, "").trim();
  }

  return result;
}

// ============ IMAGES & BADGES ============
const PLACEHOLDER_IMG = "#e2e8f0";

function getHotelPhoto(id) { return PLACEHOLDER_IMG; }

function getRoomPhoto(roomType) { return PLACEHOLDER_IMG; }

// ============ SURPRISE ME CANDIDATE PICKER ============
// Pre-filter hotels in JS so the LLM can never violate the budget constraint.
// LLMs are unreliable at strict numeric filtering across long arrays; this
// reduces the LLM's job to "pick one of these 5 and write a pitch."
function pickSurpriseCandidates(traveler, hotels, limit = 5) {
  const visitedCities = new Set(traveler.recent_trips.map(t => t.city));
  const budget = traveler.preferences.max_budget;
  const wantsKing = /king/i.test(traveler.preferences.room_type || "");
  const wantsHighFloor = /high/i.test(traveler.preferences.floor || "");
  const wantsQuiet = !!traveler.preferences.quiet;

  // Step 1 (HARD): budget filter
  let pool = hotels.filter(h => h.deal <= budget);
  if (pool.length === 0) return [];

  // Step 2 (DISCOVERY, soft): prefer unvisited cities — only apply if non-empty
  const discoveryPool = pool.filter(h => !visitedCities.has(h.city));
  if (discoveryPool.length > 0) pool = discoveryPool;

  // Step 3 (NICE-TO-HAVES): score
  const scored = pool.map(h => {
    let score = h.rating; // base: guest rating
    if (wantsKing && h.rooms.some(r => /king/i.test(r.type))) score += 0.4;
    if (wantsHighFloor && h.amenities.some(a => /rooftop|penthouse|skyline|view|valet/i.test(a))) score += 0.3;
    if (wantsQuiet) {
      if (h.amenities.some(a => /garden|courtyard|soundproofed|quiet/i.test(a))) score += 0.3;
      if (h.dist > 1) score += 0.2;
    }
    return { hotel: h, score };
  });
  scored.sort((a, b) => b.score - a.score);

  // Take a wider top tier then shuffle, so repeat clicks vary while staying high-quality
  const topTier = scored.slice(0, Math.max(limit * 2, 8));
  for (let i = topTier.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [topTier[i], topTier[j]] = [topTier[j], topTier[i]];
  }

  // Return a compact summary suitable for prompt injection
  return topTier.slice(0, limit).map(s => ({
    id: s.hotel.id,
    name: s.hotel.name,
    city: s.hotel.city,
    rate: s.hotel.deal,
    star: s.hotel.star,
    rating: s.hotel.rating,
    amenities: s.hotel.amenities.slice(0, 5),
    visited: visitedCities.has(s.hotel.city),
  }));
}

// Personalized ranking for city-search results — weighted holistic fit score.
// JS owns the numeric sort (the LLM can't reliably enforce numeric criteria).
//
// Budget is treated as a CONSTRAINT, not a preference: it doesn't contribute
// positive score (in-budget hotels get nothing for being in-budget), it only
// subtracts when violated. The three preferences are equally weighted and sum
// to 1.0, so an in-budget hotel matching all 3 prefs scores exactly 1.0.
const PREFERENCE_WEIGHTS = { room: 1 / 3, floor: 1 / 3, quiet: 1 / 3 };

// Shared predicates so the score and the per-card badges can't drift.
const PREF_PREDICATES = {
  // Hotel-level: any room of the right type exists
  room: (hotel, p) => !!p.room_type && hotel.rooms.some(r => new RegExp(p.room_type, "i").test(r.type) || r.features.some(f => new RegExp(p.room_type, "i").test(f))),
  floor: (hotel, p) => /high/i.test(p.floor || "") && hotel.amenities.some(a => /rooftop|penthouse|skyline|view/i.test(a)),
  quiet: (hotel, p) => !!p.quiet && (hotel.amenities.some(a => /garden|courtyard|soundproofed|quiet/i.test(a)) || hotel.dist > 1),
  // Room-level: THIS specific room is the right type (checks type AND features —
  // many "Suite" rooms have a king bed listed only in features)
  bed_in_room: (room, p) => {
    if (!p.room_type) return false;
    const re = new RegExp(p.room_type, "i");
    return re.test(room.type) || room.features.some(f => re.test(f));
  },
};

function scoreHotelForUser(hotel, preferences) {
  const W = PREFERENCE_WEIGHTS;
  let total = W.room * (PREF_PREDICATES.room(hotel, preferences) ? 1 : 0)
            + W.floor * (PREF_PREDICATES.floor(hotel, preferences) ? 1 : 0)
            + W.quiet * (PREF_PREDICATES.quiet(hotel, preferences) ? 1 : 0);
  // Over-budget penalty: subtract proportionally to how far over.
  if (hotel.deal > preferences.max_budget) {
    total -= (hotel.deal - preferences.max_budget) / preferences.max_budget;
  }
  return total;
}

// Room-level scoring. Per the user spec: start at 1, subtract over-budget
// penalty, add 1 if the bed type matches. Range: roughly -1 to 2.
function scoreRoomForUser(room, preferences) {
  let score = 1;
  if (room.price > preferences.max_budget) {
    score -= (room.price - preferences.max_budget) / preferences.max_budget;
  }
  if (PREF_PREDICATES.bed_in_room(room, preferences)) {
    score += 1;
  }
  return score;
}

// True if `item` ties or beats every other item in `allItems` by `scoreFn`.
// Returns null when we can't assess (no comparable items) — caller decides.
function isBestForUser(item, allItems, scoreFn) {
  if (!allItems || allItems.length === 0) return null;
  const maxScore = Math.max(...allItems.map(scoreFn));
  return scoreFn(item) === maxScore;
}

function getRoomPreferenceCompliance(room, preferences) {
  const items = [];
  const diff = room.price - preferences.max_budget;
  items.push({
    key: "budget",
    met: diff <= 0,
    label: diff <= 0 ? "On budget" : `$${diff} over`,
  });
  if (preferences.room_type) {
    const met = PREF_PREDICATES.bed_in_room(room, preferences);
    items.push({ key: "room", met, label: met ? `${preferences.room_type[0].toUpperCase() + preferences.room_type.slice(1)} bed` : `No ${preferences.room_type}` });
  }
  return items;
}

// Per-card compliance breakdown. Returns one entry per profile field that's
// SET (skips fields the user doesn't have a preference on). Used by the card
// badges so the user can see why a hotel ranked where it did.
function getHotelPreferenceCompliance(hotel, preferences) {
  const items = [];
  const diff = hotel.deal - preferences.max_budget;
  items.push({
    key: "budget",
    met: diff <= 0,
    label: diff <= 0 ? "On budget" : `$${diff} over`,
  });
  if (preferences.room_type) {
    const met = PREF_PREDICATES.room(hotel, preferences);
    items.push({ key: "room", met, label: met ? "King bed" : "No king" });
  }
  if (/high/i.test(preferences.floor || "")) {
    const met = PREF_PREDICATES.floor(hotel, preferences);
    items.push({ key: "floor", met, label: met ? "High floor" : "Low floor" });
  }
  if (preferences.quiet) {
    const met = PREF_PREDICATES.quiet(hotel, preferences);
    items.push({ key: "quiet", met, label: met ? "Quiet" : "Not quiet" });
  }
  return items;
}

function isReturnFavorite(hotel, traveler) {
  if (!traveler?.recent_trips?.length) return false;
  return traveler.recent_trips.some(trip =>
    trip.rating >= 5 &&
    trip.city === hotel.city &&
    trip.hotel.toLowerCase() === hotel.name.toLowerCase()
  );
}

function applySort(hotels, mode, preferences) {
  const arr = [...hotels];
  if (mode === "price") return arr.sort((a, b) => a.deal - b.deal);
  if (mode === "rating") return arr.sort((a, b) => b.rating - a.rating);
  // Personalized mode: split favorites (past 5-star stays in this city) from
  // the rest, sort each group by the weighted model, then concat. Guarantees
  // favorites top the list while preserving model order within each group.
  const favorites = arr.filter(h => isReturnFavorite(h, TRAVELER));
  const others = arr.filter(h => !isReturnFavorite(h, TRAVELER));
  const byScore = (a, b) => scoreHotelForUser(b, preferences) - scoreHotelForUser(a, preferences);
  return [...favorites.sort(byScore), ...others.sort(byScore)];
}

function roomSqFt(room) {
  for (const f of room.features) {
    const m = f.match(/(\d+)\s*sq\s*ft/i);
    if (m) return parseInt(m[1], 10);
  }
  return 0;
}

function applyRoomSort(rooms, mode, preferences) {
  const arr = [...rooms];
  if (mode === "price") return arr.sort((a, b) => a.price - b.price);
  if (mode === "size") return arr.sort((a, b) => roomSqFt(b) - roomSqFt(a));
  return arr.sort((a, b) => scoreRoomForUser(b, preferences) - scoreRoomForUser(a, preferences));
}

const HOTEL_SORT_OPTIONS = [
  { id: "preferences", label: "✦ Best for you", note: "ranked by your budget & room preferences" },
  { id: "price", label: "Price ↑", note: "lowest price first" },
  { id: "rating", label: "Rating ↓", note: "highest rated first" },
];

const ROOM_SORT_OPTIONS = [
  { id: "preferences", label: "✦ Best for you", note: "ranked by budget & bed preference" },
  { id: "price", label: "Price ↑", note: "lowest price first" },
  { id: "size", label: "Size ↓", note: "largest first" },
];

// Welcome chips, personalized from past trips. Iterates recent_trips in
// order (most recent first), one chip per unique city. If any stay in that
// city was rated > 4, include the hotel name as a hint. Always append
// "Surprise me" at the end.
function getPersonalizedQuickReplies(traveler) {
  const seen = new Set();
  const chips = [];
  for (const trip of traveler?.recent_trips || []) {
    if (seen.has(trip.city)) continue;
    seen.add(trip.city);
    const lovedStays = traveler.recent_trips.filter(t => t.city === trip.city && t.rating > 4);
    if (lovedStays.length > 0) {
      chips.push(`Back to ${trip.city} — ${lovedStays[0].hotel} again?`);
    } else {
      chips.push(`Back to ${trip.city}`);
    }
  }
  chips.push("Surprise me");
  return chips;
}

function isSurpriseRequest(text) {
  return /\b(surprise me|pick (something|one|a hotel) for me|what.?s good|recommend (something|a hotel|me)|inspire me|i don.?t know)\b/i.test(text);
}

// ============ DATE HELPERS ============
function parseISODate(s) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function getCheckInOut(nights, checkInOverride, checkOutOverride) {
  if (checkInOverride && checkOutOverride) {
    return { checkIn: checkInOverride, checkOut: checkOutOverride };
  }
  const n = nights || 3;
  if (checkInOverride) {
    const co = new Date(checkInOverride);
    co.setDate(co.getDate() + n);
    return { checkIn: checkInOverride, checkOut: co };
  }
  const ci = new Date();
  ci.setDate(ci.getDate() + 7);
  const co = new Date(ci);
  co.setDate(co.getDate() + n);
  return { checkIn: ci, checkOut: co };
}

function fmtDate(d) {
  if (!d) return "";
  const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${m[d.getMonth()]} ${d.getDate()}`;
}

function DateRange({ nights, checkIn, checkOut }) {
  if (!checkIn) return null;
  const { checkIn: ci, checkOut: co } = getCheckInOut(nights, checkIn, checkOut);
  return <span>{fmtDate(ci)} → {fmtDate(co)}</span>;
}

function getBadge(hotel, allHotels) {
  const cityHotels = allHotels || [];
  if (isReturnFavorite(hotel, TRAVELER)) return { text: "✦ Welcome back", bg: "#0f172a", color: "white" };
  if (hotel.rating >= 4.8) return { text: "Top Rated", bg: "#059669", color: "white" };
  const cheapest = cityHotels.length > 0 && cityHotels.reduce((min, h) => h.deal < min.deal ? h : min, cityHotels[0]);
  if (cheapest && hotel.id === cheapest.id) return { text: "Best Value", bg: "#2563eb", color: "white" };
  if (hotel.sustainability === "Platinum") return { text: "Eco Certified", bg: "#16a34a", color: "white" };
  if (hotel.star >= 5) return { text: "Luxury Pick", bg: "#0f766e", color: "white" };
  const pct = hotel.rate > hotel.deal ? Math.round((1 - hotel.deal / hotel.rate) * 100) : 0;
  if (pct >= 15) return { text: `Save ${pct}%`, bg: "#64748b", color: "white" };
  return null;
}

function Stars({ count }) {
  return <span style={{ color: "#f59e0b", letterSpacing: 1, fontSize: 13 }}>{"★".repeat(count)}{"☆".repeat(5-count)}</span>;
}

function BotAvatar() {
  return <div style={{ width: 32, height: 32, borderRadius: 12, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}><span style={{ color: "white", fontSize: 16 }}>✦</span></div>;
}

// ============ UI COMPONENTS ============
function PreferenceBadges({ items }) {
  if (!items?.length) return null;
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
      {items.map(item => (
        <span key={item.key} style={{
          fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4,
          background: item.met ? "#dcfce7" : "#fee2e2",
          color: item.met ? "#15803d" : "#b91c1c",
          display: "inline-flex", alignItems: "center", gap: 3,
        }}>
          <span>{item.met ? "✓" : "✗"}</span>{item.label}
        </span>
      ))}
    </div>
  );
}

function HotelCard({ hotel, nights, onSelect, allHotels }) {
  const n = nights || 3;
  const taxRate = CITY_TAX[hotel.city] || 0.12;
  const resortFees = (hotel.resortFee || 0) * n;
  const subtotal = hotel.deal * n;
  const taxes = Math.round((subtotal + resortFees) * taxRate);
  const totalWithTax = subtotal + taxes + resortFees;
  const isRefundable = !hotel.cancel.includes("Non");
  const badge = getBadge(hotel, allHotels);
  const isFavorite = isReturnFavorite(hotel, TRAVELER);
  const hasSavings = hotel.rate > hotel.deal;
  const savingsPct = hasSavings ? Math.round((1 - hotel.deal / hotel.rate) * 100) : 0;
  return (
    <div onClick={() => onSelect(hotel)} style={{ background: "white", borderRadius: 12, overflow: "hidden", border: isFavorite ? "2px solid #0f766e" : "1px solid #e5e7eb", cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s", minWidth: 260, maxWidth: 340, flex: "1 1 auto", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ width: "100%", height: 160, background: getHotelPhoto(hotel.id), backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        {badge && <div style={{ position: "absolute", top: 10, left: 10, background: badge.bg, color: badge.color, padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, zIndex: 2 }}>{badge.text}</div>}
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", color: "#fbbf24", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, zIndex: 2 }}>★ Earn 10X miles</div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#1f2937", marginBottom: 3, lineHeight: 1.3 }}>{hotel.name}</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>📍 {hotel.dist} mi from center</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <Stars count={hotel.star} />
          <span style={{ fontSize: 12, color: "#6b7280" }}>· {hotel.rating}/5</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>(~1.2k)</span>
        </div>
        {isRefundable && <div style={{ fontSize: 12, color: "#059669", fontWeight: 500, marginBottom: 2 }}>↺ Free cancellation</div>}
        {!isRefundable && <div style={{ fontSize: 12, color: "#dc2626", fontWeight: 500, marginBottom: 2 }}>Non-refundable</div>}

        {(hotel.resortFee || 0) > 0 && <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, marginBottom: 4 }}>💰 +${hotel.resortFee}/night resort fee</div>}
        <PreferenceBadges items={getHotelPreferenceCompliance(hotel, TRAVELER.preferences)} />
        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 10, marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              {hasSavings && <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>${hotel.rate}</span>}
              <span style={{ fontSize: 20, fontWeight: 700, color: "#1f2937" }}>${hotel.deal}</span>
              <span style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}>/night</span>
            </div>
            {hasSavings && <div style={{ fontSize: 11, color: "#059669", fontWeight: 600, marginTop: 1 }}>You save ${hotel.rate - hotel.deal}/night ({savingsPct}%)</div>}
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>${totalWithTax} total · incl. taxes & fees</div>
            <div style={{ fontSize: 12, color: "#92400e", fontWeight: 600, marginTop: 2 }}>or {(totalWithTax * 100).toLocaleString()} miles</div>
          </div>
          <button style={{ padding: "7px 16px", background: "#0f766e", color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#0d9488"}
            onMouseLeave={e => e.currentTarget.style.background = "#0f766e"}>Select</button>
        </div>
      </div>
    </div>
  );
}

// ============ SCROLL CAROUSEL — reusable with arrows + partial peek ============
function ScrollCarousel({ children }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  function checkArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  useEffect(() => {
    checkArrows();
    const timer = setTimeout(checkArrows, 300);
    return () => clearTimeout(timer);
  }, [children]);

  function scroll(dir) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    setTimeout(checkArrows, 400);
  }

  return (
    <div style={{ position: "relative" }}>
      {showLeft && <div onClick={() => scroll(-1)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: -14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "#374151", zIndex: 5, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>&#8249;</div>}
      <div ref={scrollRef} onScroll={checkArrows}
        style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory", paddingRight: 40 }}>
        {children}
      </div>
      {showRight && <div onClick={() => scroll(1)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: -14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "#374151", zIndex: 5, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>&#8250;</div>}
      {showRight && <div style={{ position: "absolute", top: 0, right: 0, bottom: 8, width: 40, background: "linear-gradient(to right, transparent, white)", pointerEvents: "none", zIndex: 3 }} />}
    </div>
  );
}

// ============ ROOM CARD — stateful cancellation with live price updates ============
function RoomCard({ hotel, room, nights, taxRate, onSelectRoom }) {
  const [cancelType, setCancelType] = useState("non-refundable");
  const isRefundable = cancelType === "refundable";
  const refundableExtra = Math.round(room.price * 0.08);
  const effectivePrice = isRefundable ? room.price + refundableExtra : room.price;
  const roomSubtotal = effectivePrice * nights;
  const roomFees = (hotel.resortFee || 0) * nights;
  const roomTotal = Math.round(roomSubtotal + (roomSubtotal + roomFees) * taxRate + roomFees);
  const milesEquiv = roomTotal * 100;
  const milesEarned = Math.floor(roomTotal * 5);

  function handleReserve() {
    onSelectRoom(hotel, { ...room, effectivePrice, cancelType, refundableExtra: isRefundable ? refundableExtra : 0 });
  }

  return (
    <div style={{ minWidth: 270, width: "calc(50% - 10px)", flexShrink: 0, scrollSnapAlign: "start", background: "white", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 130, background: getRoomPhoto(room.type), backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", color: "#fbbf24", padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>★ Earn 10X</div>
      </div>
      <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#1f2937", marginBottom: 4 }}>{room.type}</div>
        <div style={{ display: "flex", gap: 10, fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
          <span>🛏 {room.features[0]}</span>
          <span>📐 {room.features[3] || room.features[2]}</span>
        </div>

        <PreferenceBadges items={getRoomPreferenceCompliance(room, TRAVELER.preferences)} />

        {/* Price block */}
        <div style={{ background: "#f9fafb", borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>${effectivePrice} per night</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1f2937" }}>${roomTotal}</span>
            <span style={{ fontSize: 12, color: "#6b7280" }}>({nights} night{nights > 1 ? "s" : ""})</span>
            <span style={{ fontSize: 12, color: "#6b7280" }}>/</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#92400e" }}>{milesEquiv.toLocaleString()} mi</span>
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>Total includes fees{hotel.resortFee > 0 ? ` + $${hotel.resortFee}/nt resort fee` : ""}</div>
        </div>

        {/* Cancellation pills */}
        <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Choose cancellation policy:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
          <div onClick={() => setCancelType("non-refundable")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, border: !isRefundable ? "2px solid #0f766e" : "1px solid #e5e7eb", background: !isRefundable ? "#f0fdfa" : "white", cursor: "pointer", transition: "all 0.15s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: !isRefundable ? "5px solid #0f766e" : "2px solid #d1d5db", flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: "#1f2937" }}>Nonrefundable</span>
            </div>
            <span style={{ fontSize: 12, color: "#6b7280" }}>+$0 /night</span>
          </div>
          <div onClick={() => setCancelType("refundable")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, border: isRefundable ? "2px solid #059669" : "1px solid #e5e7eb", background: isRefundable ? "#f0fdf4" : "white", cursor: "pointer", transition: "all 0.15s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: isRefundable ? "5px solid #059669" : "2px solid #d1d5db", flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: "#1f2937" }}>Fully refundable before check-in</span>
            </div>
            <span style={{ fontSize: 12, color: "#6b7280" }}>+${refundableExtra} /night</span>
          </div>
        </div>

        {/* Earn miles */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, padding: "6px 10px", background: "#f0fdfa", borderRadius: 6, border: "1px solid #ccfbf1" }}>
          <span style={{ fontSize: 14 }}>✦</span>
          <span style={{ fontSize: 12, color: "#92400e", fontWeight: 600 }}>Earn {milesEarned.toLocaleString()} miles</span>
        </div>

        <button onClick={handleReserve} style={{ width: "100%", padding: "11px 0", background: "#0f766e", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.15s", marginTop: "auto" }}
          onMouseEnter={e => e.currentTarget.style.background = "#0d9488"}
          onMouseLeave={e => e.currentTarget.style.background = "#0f766e"}>Continue for ${effectivePrice} per night</button>
      </div>
    </div>
  );
}

function HotelDetailView({ hotel, nights, onSelectRoom, onBack, roomSortMode, onRoomSortChange }) {
  const n = nights || 3;
  const taxRate = CITY_TAX[hotel.city] || 0.12;

  return (
    <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", marginTop: 8 }}>
      <div style={{ width: "100%", height: 200, background: getHotelPhoto(hotel.id), backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px 18px 14px", background: "linear-gradient(transparent, rgba(0,0,0,0.6))", zIndex: 2 }}>
          <Stars count={hotel.star} />
          <div style={{ fontWeight: 700, fontSize: 18, color: "white", marginTop: 4 }}>{hotel.name}</div>
        </div>
        <button onClick={onBack} style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#374151", fontWeight: 600, zIndex: 2 }}>← Back</button>
      </div>

      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
              <div><div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280" }}>Check-in</div><div style={{ fontSize: 13, fontWeight: 600 }}>after 3:00 PM</div></div>
              <div><div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280" }}>Check-out</div><div style={{ fontSize: 13, fontWeight: 600 }}>before 11:00 AM</div></div>
              <div><div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280" }}>Rating</div><div style={{ fontSize: 13, fontWeight: 600 }}>{hotel.rating}/5</div></div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {hotel.amenities.map(a => <span key={a} style={{ fontSize: 11, color: "#4b5563", background: "#f3f4f6", padding: "3px 8px", borderRadius: 4 }}>✓ {a}</span>)}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.6, marginBottom: 16 }}>{hotel.detail}</div>

        <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937", marginBottom: 8 }}>Choose your room</div>
        <SortControls value={roomSortMode} onChange={onRoomSortChange} count={hotel.rooms.length} options={ROOM_SORT_OPTIONS} unit="room" />

        <ScrollCarousel>
          {applyRoomSort(hotel.rooms, roomSortMode, TRAVELER.preferences).map(room => (
            <RoomCard key={room.type} hotel={hotel} room={room} nights={n} taxRate={taxRate} onSelectRoom={onSelectRoom} />
          ))}
        </ScrollCarousel>
      </div>
    </div>
  );
}

function Section({ children, style: s }) {
  return <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px", marginBottom: 12, background: "white", ...s }}>{children}</div>;
}

function Collapsible({ title, open, toggle, children }) {
  return (
    <div style={{ borderTop: "1px solid #e5e7eb", padding: "14px 0" }}>
      <div onClick={toggle} style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#1f2937" }}>
        {title} <span style={{ color: "#9ca3af", fontSize: 18 }}>{open ? "∧" : "∨"}</span>
      </div>
      {open && <div style={{ marginTop: 10, fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{children}</div>}
    </div>
  );
}

function BookingSummary({ hotel, room, nights, guests, total, checkIn, checkOut, allHotels, onConfirm }) {
  const [step, setStep] = useState("review");
  const [guest, setGuest] = useState({ firstName: TRAVELER.name.split(" ")[0], middleName: "", lastName: TRAVELER.name.split(" ").slice(1).join(" "), email: TRAVELER.name.split(" ")[0].toLowerCase() + "." + TRAVELER.name.split(" ").slice(1).join("").toLowerCase() + "@gmail.com", phone: "", specialRequests: "" });
  const [selectedPayment, setSelectedPayment] = useState("visa_4242");
  const [useMiles, setUseMiles] = useState(false);
  const [milesAmount, setMilesAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPolicies, setShowPolicies] = useState(false);
  const [showFees, setShowFees] = useState(false);

  const taxRate = CITY_TAX[hotel.city] || 0.12;
  const perNight = room.effectivePrice || room.price;
  const isRefundableBooking = room.cancelType === "refundable";
  const subtotal = perNight * nights;
  const fees = (hotel.resortFee || 0) * nights;
  const taxable = subtotal + fees;
  const taxes = Math.round(taxable * taxRate);
  const discount = appliedPromo ? (appliedPromo.type === "percent" ? Math.round(subtotal * appliedPromo.value / 100) : Math.min(appliedPromo.value, subtotal)) : 0;
  const milesDiscount = useMiles ? Math.min(Math.floor(milesAmount / 100), subtotal + taxes + fees - discount) : 0;
  const grandTotal = subtotal + taxes + fees - discount - milesDiscount;
  const milesEarned = Math.floor(grandTotal * 5); // 5 miles per dollar spent
  const maxMilesUsable = Math.min(TRAVELER.miles, (subtotal + taxes + fees - discount) * 100);

  const PAYMENT_METHODS = [
    { id: "visa_4242", label: "Visa ····4242", sub: "Expires 08/27", icon: "💳", color: "#1a1f71" },
    { id: "amex_1001", label: "Amex ····1001", sub: "Expires 12/26", icon: "💳", color: "#006fcf" },
    { id: "apple_pay", label: "Apple Pay", sub: "sarah.chen@icloud.com", icon: "", color: "#000" },
    { id: "paypal", label: "PayPal", sub: "sarah.chen@gmail.com", icon: "🅿️", color: "#003087" },
    { id: "klarna", label: "Klarna", sub: "4 interest-free payments", icon: "🔵", color: "#ffb3c7" },
  ];

  const paymentValid = grandTotal >= 0 && selectedPayment;

  const fieldStyle = {
    width: "100%", padding: "12px 14px",
    border: "2px solid #d1d5db",
    borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", background: "white",
    transition: "border-color 0.2s",
  };
  const rules = {
    firstName: v => v.trim().length > 0,
    lastName: v => v.trim().length > 0,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: () => true, // optional
  };
  const fieldValid = (name) => rules[name] ? rules[name](guest[name] || "") : true;
  const isFormValid = ["firstName", "lastName", "email"].every(fieldValid);

  function handleBlur(name) {
    setTouched(t => ({ ...t, [name]: true }));
  }

  function handleSubmit() {
    setTouched({ firstName: true, lastName: true, email: true });
    if (isFormValid && paymentValid) onConfirm({ taxes, fees, discount, grandTotal, milesEarned, milesUsed: useMiles ? milesAmount : 0 });
  }

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    if (PROMO_CODES[code]) { setAppliedPromo(PROMO_CODES[code]); setErrors(e => ({...e, promo: false})); }
    else { setAppliedPromo(null); setErrors(e => ({...e, promo: true})); }
  }

  // paymentValid already defined above

  const field = (name) => {
    const isTouched = touched[name];
    const valid = fieldValid(name);
    const showError = isTouched && !valid;
    const showSuccess = isTouched && valid && name !== "phone";
    return {
      ...fieldStyle,
      borderColor: showError ? "#dc2626" : showSuccess ? "#059669" : "#d1d5db",
    };
  };
  const fieldStatus = (name) => {
    const isTouched = touched[name];
    const valid = fieldValid(name);
    if (!isTouched) return null;
    if (valid && name !== "phone") return <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#059669", fontSize: 16 }}>✓</span>;
    if (!valid) return <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: 16 }}>✗</span>;
    return null;
  };
  const fieldError = (name, msg) => {
    if (!touched[name] || fieldValid(name)) return null;
    return <div style={{ fontSize: 12, color: "#dc2626", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>⚠ {msg}</div>;
  };

  return (
    <div style={{ marginTop: 8, maxWidth: 600 }}>
      {/* Review step */}
      {step === "review" && (
        <div>
          <Section>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1f2937", marginBottom: 16 }}>Booking Summary</div>
            <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 80, height: 80, borderRadius: 8, background: getHotelPhoto(hotel.id), backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1f2937" }}>{hotel.name}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{room.type} · {nights} night{nights > 1 ? "s" : ""} · {guests} guest{guests > 1 ? "s" : ""}</div>
                <div style={{ fontSize: 13, color: "#0f766e", fontWeight: 500, marginTop: 3 }}>📅 <DateRange nights={nights} checkIn={checkIn} checkOut={checkOut} /></div>
                <Stars count={hotel.star} />
              </div>
            </div>
            {(() => {
              const hotelIsTop = isBestForUser(hotel, allHotels, h => scoreHotelForUser(h, TRAVELER.preferences));
              const roomIsTop = isBestForUser(room, hotel.rooms, r => scoreRoomForUser(r, TRAVELER.preferences));
              const showBest = (hotelIsTop === true && roomIsTop === true) || (hotelIsTop === null && roomIsTop === true);
              return showBest ? (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0f172a", color: "white", padding: "6px 12px", borderRadius: 16, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
                  <span>✦</span> Best for you
                </div>
              ) : null;
            })()}
            <PreferenceBadges items={getRoomPreferenceCompliance(room, TRAVELER.preferences)} />
            <div style={{ display: "grid", gap: 8, borderTop: "1px solid #f3f4f6", paddingTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280" }}>
                <span>Room ({nights}n × ${perNight})</span><span>${subtotal}</span>
              </div>
              {isRefundableBooking && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#059669" }}>
                <span>✓ Fully refundable (incl. +${room.refundableExtra}/night)</span><span></span>
              </div>}
              {!isRefundableBooking && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#dc2626" }}>
                <span>⊘ Non-refundable</span><span></span>
              </div>}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280" }}>
                <span>Taxes ({(taxRate * 100).toFixed(1)}%)</span><span>${taxes}</span>
              </div>
              {fees > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280" }}>
                <span>Resort fee ({nights}n × ${hotel.resortFee})</span><span>${fees}</span>
              </div>}
              {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#059669" }}>
                <span>{appliedPromo.label}</span><span>-${discount}</span>
              </div>}
              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, color: "#1f2937" }}>
                <span>Total</span><span>${grandTotal}</span>
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "right" }}>incl. taxes & fees</div>
            </div>
          </Section>
          {/* Miles earn callout */}
          <div style={{ padding: "12px 16px", background: "linear-gradient(135deg, #f0fdfa, #f0fdfa)", borderRadius: 10, marginBottom: 12, border: "1px solid #ccfbf1", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>✦</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e" }}>Earn up to {(subtotal * 5).toLocaleString()} Platinum miles</div>
              <div style={{ fontSize: 12, color: "#92400e" }}>You have {TRAVELER.miles.toLocaleString()} miles available · Use miles at checkout to save</div>
            </div>
          </div>
          <button onClick={() => setStep("checkout")} style={{ width: "100%", padding: "14px 0", background: "#0f766e", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Continue to checkout</button>
        </div>
      )}

      {/* Checkout step - all-in-one like the reference */}
      {step === "checkout" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <button onClick={() => setStep("review")} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#374151" }}>←</button>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1f2937" }}>Confirm and book</div>
          </div>
          <div style={{ padding: "10px 14px", background: "#f0fdfa", borderRadius: 10, marginBottom: 14, display: "flex", gap: 12, alignItems: "center", fontSize: 13, color: "#0f766e", fontWeight: 500, flexWrap: "wrap" }}>
            <span>{hotel.name}</span>
            <span>·</span>
            <span>📅 <DateRange nights={nights} checkIn={checkIn} checkOut={checkOut} /></span>
            <span>·</span>
            <span>{nights} night{nights > 1 ? "s" : ""}, {guests} guest{guests > 1 ? "s" : ""}</span>
          </div>

          {/* Who is checking in? */}
          <Section>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937", marginBottom: 14 }}>Who is checking in?</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: "#374151", marginBottom: 4, display: "block" }}>First Name <span style={{ color: "#dc2626" }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <input value={guest.firstName} onChange={e => { const v = e.target.value; setGuest(g => ({...g, firstName: v})); }} onBlur={() => handleBlur("firstName")} style={field("firstName")} />
                  {fieldStatus("firstName")}
                </div>
                {fieldError("firstName", "First name is required")}
              </div>
              <div>
                <label style={{ fontSize: 13, color: "#374151", marginBottom: 4, display: "block" }}>Last Name <span style={{ color: "#dc2626" }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <input value={guest.lastName} onChange={e => { const v = e.target.value; setGuest(g => ({...g, lastName: v})); }} onBlur={() => handleBlur("lastName")} style={field("lastName")} />
                  {fieldStatus("lastName")}
                </div>
                {fieldError("lastName", "Last name is required")}
              </div>
            </div>
          </Section>

          {/* Contact Information */}
          <Section>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937", marginBottom: 4 }}>Contact Information</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>This is used to notify you about updates or changes to your trip</div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, color: "#374151", marginBottom: 4, display: "block" }}>Phone Number</label>
              <input type="tel" value={guest.phone} onChange={e => { const v = e.target.value; setGuest(g => ({...g, phone: v})); }} onBlur={() => handleBlur("phone")} style={field("phone")} placeholder="+1" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#374151", marginBottom: 4, display: "block" }}>Email <span style={{ color: "#dc2626" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <input type="email" value={guest.email} onChange={e => { const v = e.target.value; setGuest(g => ({...g, email: v})); }} onBlur={() => handleBlur("email")} style={field("email")} />
                {fieldStatus("email")}
              </div>
              {fieldError("email", "Valid email address is required")}
            </div>
          </Section>

          {/* Pay with - modern card selector */}
          <Section>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937", marginBottom: 14 }}>Pay with</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.id} onClick={() => setSelectedPayment(pm.id)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: selectedPayment === pm.id ? "2px solid #0f766e" : "1px solid #e5e7eb", background: selectedPayment === pm.id ? "#f0fdfa" : "white", cursor: "pointer", transition: "all 0.15s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: selectedPayment === pm.id ? "6px solid #0f766e" : "2px solid #d1d5db", flexShrink: 0, transition: "all 0.15s" }} />
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{pm.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{pm.label}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{pm.sub}</div>
                  </div>
                  {pm.id === "klarna" && <span style={{ fontSize: 11, fontWeight: 600, color: "#92400e", background: "#fef3c7", padding: "2px 8px", borderRadius: 4 }}>Buy now, pay later</span>}
                </div>
              ))}
            </div>
          </Section>

          {/* Use miles */}
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: useMiles ? 14 : 0 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937" }}>Use Platinum Miles</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>{TRAVELER.miles.toLocaleString()} miles available (1 mile = $0.01)</div>
              </div>
              <div onClick={() => { setUseMiles(!useMiles); if (!useMiles) setMilesAmount(Math.min(maxMilesUsable, TRAVELER.miles)); else setMilesAmount(0); }}
                style={{ width: 44, height: 24, borderRadius: 12, background: useMiles ? "#0f766e" : "#d1d5db", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: useMiles ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </div>
            </div>
            {useMiles && (
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  <input type="range" min={0} max={maxMilesUsable} step={100} value={milesAmount}
                    onChange={e => setMilesAmount(Number(e.target.value))}
                    style={{ flex: 1, accentColor: "#0f766e" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#6b7280" }}>{milesAmount.toLocaleString()} miles</span>
                  <span style={{ color: "#059669", fontWeight: 600 }}>-${milesDiscount} off</span>
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>Remaining balance: {(TRAVELER.miles - milesAmount).toLocaleString()} miles</div>
              </div>
            )}
          </Section>

          {/* Promo code */}
          <Section>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937", marginBottom: 10 }}>Promo Code</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={promo} onChange={e => { setPromo(e.target.value); setErrors(er => ({...er, promo: false})); }} style={{ ...field("promo"), flex: 1, ...(errors.promo ? { borderColor: "#dc2626" } : {}) }} placeholder="Enter code" />
              <button onClick={applyPromo} style={{ padding: "0 18px", background: "#0f766e", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "white" }}>Apply</button>
            </div>
            {errors.promo && <div style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>Invalid promo code</div>}
            {appliedPromo && <div style={{ fontSize: 12, color: "#059669", marginTop: 4 }}>✓ {appliedPromo.label} (-${discount})</div>}
          </Section>

          {/* Important Information */}
          <Section>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937", marginBottom: 10 }}>Important Information</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, padding: "8px 12px", borderRadius: 8, background: isRefundableBooking ? "#f0fdf4" : "#fef2f2" }}>
              <span style={{ fontSize: 16 }}>{isRefundableBooking ? "✓" : "⊘"}</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: isRefundableBooking ? "#059669" : "#dc2626" }}>{isRefundableBooking ? "Fully refundable" : "Non-refundable"}</span>
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
              {isRefundableBooking
                ? "You can cancel free of charge up to 48 hours before check-in. After that, you will be charged the full amount."
                : "This rate cannot be changed or cancelled. If you cancel, you will not receive a refund."}
            </div>
            <div style={{ marginBottom: 4 }}>
              <label style={{ fontSize: 13, color: "#374151", marginBottom: 4, display: "block" }}>Special check-in instructions</label>
              <textarea value={guest.specialRequests} onChange={e => { const v = e.target.value; setGuest(g => ({...g, specialRequests: v})); }} rows={2} style={{ ...field("specialRequests"), resize: "vertical" }} placeholder="High floor, quiet room, late check-in..." />
            </div>
            <Collapsible title="Policies" open={showPolicies} toggle={() => setShowPolicies(!showPolicies)}>
              Check-in: after 3:00 PM · Check-out: before 11:00 AM. Government-issued photo ID and a credit card or cash deposit are required at check-in.
            </Collapsible>
            <Collapsible title="Fees" open={showFees} toggle={() => setShowFees(!showFees)}>
              {fees > 0 ? `Resort fee: $${hotel.resortFee} per night ($${fees} total). ` : "No resort fee. "}
              Tax rate: {(taxRate * 100).toFixed(1)}% (${taxes} total).
              {grandTotal > 0 && ` Grand total: $${grandTotal} incl. all taxes and fees.`}
            </Collapsible>
          </Section>

          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>
            By confirming this booking, you confirm that you agree to the <span style={{ color: "#0f766e", textDecoration: "underline", cursor: "pointer" }}>Privacy Notice</span> and <span style={{ color: "#0f766e", textDecoration: "underline", cursor: "pointer" }}>Terms of Service</span>.
          </div>

          {/* Order total summary */}
          <div style={{ padding: "14px 16px", background: "#f9fafb", borderRadius: 10, marginBottom: 12, border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
              <span>Subtotal ({nights}n x ${perNight})</span><span>${subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
              <span>Taxes & fees</span><span>${taxes + fees}</span>
            </div>
            {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#059669", marginBottom: 4 }}>
              <span>Promo discount</span><span>-${discount}</span>
            </div>}
            {milesDiscount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#92400e", marginBottom: 4 }}>
              <span>Miles applied ({milesAmount.toLocaleString()} mi)</span><span>-${milesDiscount}</span>
            </div>}
            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 8, marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
              <span>Total</span><span>${grandTotal}</span>
            </div>
          </div>

          {/* Miles earn callout */}
          {milesEarned > 0 && <div style={{ padding: "10px 14px", background: "linear-gradient(135deg, #f0fdfa, #f0fdfa)", borderRadius: 10, marginBottom: 12, border: "1px solid #ccfbf1", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>✦</span>
            <span style={{ fontSize: 13, color: "#92400e", fontWeight: 500 }}>You'll earn <b>{milesEarned.toLocaleString()}</b> Platinum miles with this booking</span>
          </div>}

          <button onClick={handleSubmit}
            disabled={!paymentValid || !isFormValid}
            style={{ width: "100%", padding: "16px 0", background: (paymentValid && isFormValid) ? "#0f766e" : "#d1d5db", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: (paymentValid && isFormValid) ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.15s" }}
            onMouseEnter={e => { if (paymentValid && isFormValid) e.currentTarget.style.background = "#0d9488"; }}
            onMouseLeave={e => { if (paymentValid && isFormValid) e.currentTarget.style.background = "#0f766e"; }}>
            🔒 Pay ${grandTotal} and confirm
          </button>
        </div>
      )}
    </div>
  );
}

function TripContext({ city, nights, guests, checkIn, checkOut }) {
  if (!city) return null;
  const hasDates = !!checkIn;
  return (
    <div style={{ padding: "8px 20px", background: "#f0fdfa", borderBottom: "1px solid #ccfbf1", display: "flex", gap: 16, alignItems: "center", fontSize: 13, color: "#0f766e", fontWeight: 500, flexShrink: 0, flexWrap: "wrap" }}>
      {city && <span>📍 {city}</span>}
      {hasDates && <span>📅 <DateRange nights={nights} checkIn={checkIn} checkOut={checkOut} /></span>}
      {nights && <span>🌙 {nights} night{nights > 1 ? "s" : ""}</span>}
      {guests && <span>👤 {guests} guest{guests > 1 ? "s" : ""}</span>}
    </div>
  );
}

function ConfirmationView({ hotel, room, nights, guests, total, taxes, fees, discount, grandTotal, confirmationId, milesEarned, milesUsed, checkIn, checkOut }) {
  const earnedMiles = milesEarned || Math.floor(grandTotal * 5);
  return (
    <div style={{ background: "white", border: "1px solid #ccfbf1", borderRadius: 12, overflow: "hidden", marginTop: 8 }}>
      <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", padding: "20px 18px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
        <div style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Booking Confirmed!</div>
        <div style={{ color: "#ccfbf1", fontSize: 13, marginTop: 4 }}>Confirmation #{confirmationId}</div>
      </div>
      {/* Miles earned banner */}
      <div style={{ padding: "12px 18px", background: "linear-gradient(135deg, #f0fdfa, #f0fdfa)", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #ccfbf1" }}>
        <span style={{ fontSize: 20 }}>✦</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e" }}>+{earnedMiles.toLocaleString()} Platinum miles earned!</div>
          <div style={{ fontSize: 12, color: "#92400e" }}>New balance: {(TRAVELER.miles - (milesUsed || 0) + earnedMiles).toLocaleString()} miles</div>
        </div>
      </div>
      <div style={{ padding: 18, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#52525b" }}>Hotel</span><span style={{ fontWeight: 600, color: "#18181b" }}>{hotel.name}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#52525b" }}>Room</span><span style={{ fontWeight: 600, color: "#18181b" }}>{room.type}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#52525b" }}>Dates</span><span style={{ fontWeight: 600, color: "#18181b" }}><DateRange nights={nights} checkIn={checkIn} checkOut={checkOut} /></span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#52525b" }}>Duration</span><span style={{ fontWeight: 600, color: "#18181b" }}>{nights} night{nights > 1 ? "s" : ""}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#52525b" }}>Guests</span><span style={{ fontWeight: 600, color: "#18181b" }}>{guests}</span></div>
        <div style={{ borderTop: "1px solid #e4e4e7", paddingTop: 10, display: "grid", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#71717a" }}>
            <span>Room ({nights}n x ${room.price})</span><span>${total}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#71717a" }}>
            <span>Taxes & fees</span><span>${taxes + fees}</span>
          </div>
          {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#059669" }}>
            <span>Discount</span><span>-${discount}</span>
          </div>}
          {(milesUsed || 0) > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#92400e" }}>
            <span>Miles redeemed ({milesUsed.toLocaleString()} mi)</span><span>-${Math.floor(milesUsed / 100)}</span>
          </div>}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "#0f766e", borderTop: "1px solid #e4e4e7", paddingTop: 8 }}>
            <span>Total Charged</span><span>${grandTotal}</span>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#71717a", marginTop: 6, padding: "10px 12px", background: "#f9fafb", borderRadius: 8 }}>
          {hotel.cancel} · A confirmation email has been sent to your inbox.
        </div>
      </div>
    </div>
  );
}

function SortControls({ value, onChange, count, options, unit = "property" }) {
  const active = options.find(o => o.id === value) || options[0];
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
      <div style={{ fontSize: 12, color: "#6b7280" }}>
        {count} {count === 1 ? unit : unit + "s"} · {active.note}
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {options.map(o => (
          <button key={o.id} onClick={() => onChange(o.id)} style={{
            padding: "5px 10px", borderRadius: 16, fontSize: 11, fontWeight: 600,
            border: value === o.id ? "1px solid #0f766e" : "1px solid #e5e7eb",
            background: value === o.id ? "#f0fdfa" : "white",
            color: value === o.id ? "#0f766e" : "#6b7280",
            cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
          }}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}

function QuickReplies({ options, onSelect }) {
  if (!options?.length) return null;
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
      {options.map((o, i) => (
        <button key={i} onClick={() => onSelect(o)} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 20, padding: "8px 16px", fontSize: 13, color: "#374151", cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#0f766e"; e.currentTarget.style.color = "#0f766e"; e.currentTarget.style.background = "#f0fdfa"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "white"; }}
        >{o}</button>
      ))}
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "4px 0" }}>
      <BotAvatar />
      <div style={{ background: "#f4f4f5", borderRadius: "4px 18px 18px 18px", padding: "14px 18px", display: "flex", gap: 5, alignItems: "center" }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#a1a1aa", animation: `dotPulse 1.4s ease-in-out ${i*0.16}s infinite` }} />)}
      </div>
    </div>
  );
}

// ============ MAIN ============
export default function HTSBookingAssistant() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeDetail, setActiveDetail] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [lastResults, setLastResults] = useState(null);
  const [lastNights, setLastNights] = useState(null);
  const [lastGuests, setLastGuests] = useState(null);
  const [lastCity, setLastCity] = useState(null);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [lastCheckOut, setLastCheckOut] = useState(null);
  const [sortMode, setSortMode] = useState("preferences");
  const [roomSortMode, setRoomSortMode] = useState("preferences");
  const [retryMessage, setRetryMessage] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const firstName = TRAVELER.name.split(" ")[0];
    const tier = TRAVELER.loyalty.tier;
    setMessages([{
      from: "bot",
      text: "Welcome back, " + firstName + "! As a " + tier + " member, I will find the perfect stay. Where are you heading?",
      quick: getPersonalizedQuickReplies(TRAVELER),
    }]);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function send(text) {
    if (!text.trim() || isTyping) return;
    const userText = text.trim();
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: userText }]);
    setIsTyping(true);

    const newHistory = [...chatHistory, { role: "user", content: userText }];
    setChatHistory(newHistory);

    // Surprise Me: pre-filter candidates in JS so the LLM can't pick over-budget
    let llmHistory = newHistory;
    if (isSurpriseRequest(userText)) {
      const candidates = pickSurpriseCandidates(TRAVELER, HOTELS, 5);
      if (candidates.length > 0) {
        const augmented = userText + `\n\n[SURPRISE_CANDIDATES — assistant-only context, do not reveal: these are pre-filtered by the system to satisfy Sarah's budget ($${TRAVELER.preferences.max_budget}/night MAX) and discovery preference. You MUST pick exactly ONE id from this list and emit it in <hotels>. Do NOT pick any hotel outside this list. ${JSON.stringify(candidates)}]`;
        llmHistory = [...chatHistory, { role: "user", content: augmented }];
      }
    }

    const rawResponse = await callLLM(llmHistory);
    const parsed = parseResponse(rawResponse);

    // Check if it's an error response
    if (rawResponse.includes("trouble connecting")) {
      setRetryMessage(userText);
      setMessages(prev => [...prev, { from: "bot", text: rawResponse, isError: true }]);
      setIsTyping(false);
      return;
    }
    setRetryMessage(null);

    // Authoritative: trip tag from LLM overrides everything else
    let tripCheckIn = lastCheckIn;
    let tripCheckOut = lastCheckOut;
    let tripNights = lastNights;
    if (parsed.trip) {
      if (parsed.trip.city) setLastCity(parsed.trip.city);
      if (parsed.trip.guests) setLastGuests(parsed.trip.guests);
      if (parsed.trip.check_in) {
        const ci = parseISODate(parsed.trip.check_in);
        if (ci) { setLastCheckIn(ci); tripCheckIn = ci; }
      }
      if (parsed.trip.check_out) {
        const co = parseISODate(parsed.trip.check_out);
        if (co) { setLastCheckOut(co); tripCheckOut = co; }
      }
      if (parsed.trip.nights) { setLastNights(parsed.trip.nights); tripNights = parsed.trip.nights; }
      else if (parsed.trip.check_in && parsed.trip.check_out) {
        const ci = parseISODate(parsed.trip.check_in);
        const co = parseISODate(parsed.trip.check_out);
        if (ci && co) {
          const n = Math.round((co - ci) / 86400000);
          if (n > 0) { setLastNights(n); tripNights = n; }
        }
      }
    }

    // Extract nights/guests from booking if present
    if (parsed.booking) {
      if (parsed.booking.nights) { setLastNights(parsed.booking.nights); tripNights = parsed.booking.nights; }
      if (parsed.booking.guests) setLastGuests(parsed.booking.guests);
    }

    // Fallback regex extraction from raw user text (only if no trip tag)
    if (!parsed.trip) {
      const nightsMatch = userText.match(/(\d+)\s*night/i);
      if (nightsMatch) { setLastNights(parseInt(nightsMatch[1])); tripNights = parseInt(nightsMatch[1]); }
      const guestsMatch = userText.match(/(\d+)\s*guest/i);
      if (guestsMatch) setLastGuests(parseInt(guestsMatch[1]));
      const cityNames = ["Chicago","Austin","New York","San Francisco","Miami","Denver","Seattle"];
      for (const c of cityNames) { if (userText.toLowerCase().includes(c.toLowerCase())) { setLastCity(c); break; } }
    }

    const botMsg = { from: "bot", text: parsed.text };

    if (parsed.hotelIds) {
      botMsg.hotels = parsed.hotelIds.map(id => HOTELS.find(h => h.id === id)).filter(Boolean);
      botMsg.nights = lastNights;
      setLastResults(botMsg.hotels);
    }
    if (parsed.detailId) {
      const hotel = HOTELS.find(h => h.id === parsed.detailId);
      if (hotel) { botMsg.hotelDetail = hotel; setActiveDetail(hotel); }
    }
    if (parsed.booking) {
      const hotel = HOTELS.find(h => h.id === parsed.booking.hotel_id);
      const room = hotel?.rooms.find(r => r.type === parsed.booking.room_type) || hotel?.rooms[0];
      if (hotel && room) {
        const nights = parsed.booking.nights || tripNights;
        const guests = parsed.booking.guests || lastGuests;
        botMsg.bookingData = { hotel, room, nights, guests, total: room.price * nights, checkIn: tripCheckIn, checkOut: tripCheckOut, allHotels: lastResults };
        setActiveBooking(botMsg.bookingData);
      }
    }
    if (parsed.confirmed) {
      botMsg.confirmed = true;
      setActiveBooking(null);
      setActiveDetail(null);
    }

    setChatHistory(prev => [...prev, { role: "assistant", content: rawResponse }]);
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  }

  function handleHotelClick(hotel) {
    // Client-side: show detail instantly, log to chat for context
    setActiveDetail(hotel);
    setMessages(prev => [...prev,
      { from: "user", text: `Tell me more about ${hotel.name}` },
      { from: "bot", text: hotel.detail, hotelDetail: hotel },
    ]);
    setChatHistory(prev => [...prev,
      { role: "user", content: `Tell me more about ${hotel.name} and show me the rooms` },
      { role: "assistant", content: `${hotel.detail} <detail>${hotel.id}</detail>` },
    ]);
  }

  function handleRoomSelect(hotel, room) {
    // Client-side: show checkout instantly, log to chat for context
    const nights = lastNights || 3;
    const guests = lastGuests || 2;
    const bookingData = { hotel, room, nights, guests, total: (room.effectivePrice || room.price) * nights, checkIn: lastCheckIn, checkOut: lastCheckOut, allHotels: lastResults };
    setActiveBooking(bookingData);
    setMessages(prev => [...prev,
      { from: "user", text: `I'd like the ${room.type} at ${hotel.name}` },
      { from: "bot", text: `Great choice! Here's your booking summary.`, bookingData },
    ]);
    setChatHistory(prev => [...prev,
      { role: "user", content: `I'd like the ${room.type} at ${hotel.name}` },
      { role: "assistant", content: `Great choice! <booking>{"hotel_id":"${hotel.id}","room_type":"${room.type}","nights":${nights},"guests":${guests}}</booking>` },
    ]);
  }

  function handleConfirm(pricingData) {
    // Show confirmation view instead of just sending chat
    const booking = activeBooking;
    if (booking && pricingData) {
      const confirmId = "HTS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setMessages(prev => [...prev, {
        from: "bot",
        text: "",
        confirmation: { ...booking, ...pricingData, confirmationId: confirmId },
      }]);
      setActiveBooking(null);
      setActiveDetail(null);
      setChatHistory(prev => [...prev,
        { role: "user", content: "Confirm booking" },
        { role: "assistant", content: `Booking confirmed! Confirmation #${confirmId}. <confirmed/>` }
      ]);
    } else {
      send("Yes, confirm the booking");
    }
  }

  function handleBack() {
    // Client-side: restore previous results instantly, no LLM call
    setActiveDetail(null);
    if (lastResults) {
      setMessages(prev => [...prev,
        { from: "bot", text: "Here are your options again:", hotels: lastResults, nights: lastNights },
      ]);
    }
  }

  function handleStartOver() {
    const firstName = TRAVELER.name.split(" ")[0];
    const tier = TRAVELER.loyalty.tier;
    setMessages([{
      from: "bot",
      text: "Welcome back, " + firstName + "! As a " + tier + " member, I will find the perfect stay. Where are you heading?",
      quick: getPersonalizedQuickReplies(TRAVELER),
    }]);
    setChatHistory([]);
    setActiveDetail(null);
    setActiveBooking(null);
    setLastResults(null);
    setLastNights(null);
    setLastGuests(null);
    setLastCity(null);
    setLastCheckIn(null);
    setLastCheckOut(null);
    setRetryMessage(null);
  }

  return (
    <div style={{ width: "100%", maxWidth: 860, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', system-ui, sans-serif", background: "white" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes dotPulse { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div style={{ padding: "16px 20px", background: "white", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20 }}>✦</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#1f2937" }}>HTS Booking Assistant</div>
          <div style={{ fontSize: 12, color: "#0f766e", display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0f766e" }} /> Online</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {lastResults && (
            <button onClick={handleBack} style={{ padding: "6px 12px", background: "white", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#0f766e"; e.currentTarget.style.color = "#0f766e"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}>← Back to hotels</button>
          )}
          <button onClick={handleStartOver} style={{ padding: "6px 12px", background: "white", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.color = "#dc2626"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}>↻ Start over</button>
        </div>
      </div>

      <TripContext city={lastCity} nights={lastNights} guests={lastGuests} checkIn={lastCheckIn} checkOut={lastCheckOut} />

      <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {messages.map((msg, i) => {
          const isPast = i < messages.length - 1;
          return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.from === "user" ? "flex-end" : "flex-start", animation: "fadeUp 0.3s ease", pointerEvents: isPast ? "none" : "auto", opacity: isPast ? 0.75 : 1, transition: "opacity 0.2s" }}>
            {msg.from === "bot" ? (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", maxWidth: "92%" }}>
                <BotAvatar />
                <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                  {msg.text && <div style={{ background: msg.isError ? "#fef2f2" : "white", borderRadius: "4px 18px 18px 18px", padding: "12px 16px", fontSize: 14, lineHeight: 1.6, color: msg.isError ? "#dc2626" : "#27272a", whiteSpace: "pre-line", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", border: msg.isError ? "1px solid #fecaca" : "1px solid #f4f4f5" }}>
                    {msg.text}
                    {msg.isError && retryMessage && (
                      <button onClick={() => { setRetryMessage(null); send(retryMessage); }} style={{ display: "block", marginTop: 8, padding: "6px 14px", background: "#dc2626", color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Try again</button>
                    )}
                  </div>}
                  {msg.hotels && (
                    <div style={{ width: "100%" }}>
                      <SortControls value={sortMode} onChange={setSortMode} count={msg.hotels.length} options={HOTEL_SORT_OPTIONS} unit="property" />
                      <ScrollCarousel>
                        {applySort(msg.hotels, sortMode, TRAVELER.preferences).map(h => (
                          <div key={h.id} style={{ scrollSnapAlign: "start", flexShrink: 0, width: "calc(50% - 10px)", minWidth: 280 }}>
                            <HotelCard hotel={h} nights={msg.nights || lastNights} onSelect={handleHotelClick} allHotels={msg.hotels} />
                          </div>
                        ))}
                      </ScrollCarousel>
                    </div>
                  )}
                  {msg.hotelDetail && <HotelDetailView hotel={msg.hotelDetail} nights={lastNights} onSelectRoom={handleRoomSelect} onBack={handleBack} roomSortMode={roomSortMode} onRoomSortChange={setRoomSortMode} />}
                  {msg.bookingData && <BookingSummary {...msg.bookingData} onConfirm={handleConfirm} />}
                  {msg.confirmation && <ConfirmationView {...msg.confirmation} />}
                  {msg.quick && <QuickReplies options={msg.quick} onSelect={send} />}
                </div>
              </div>
            ) : (
              <div style={{ background: "#0f172a", color: "white", borderRadius: "18px 18px 4px 18px", padding: "12px 16px", fontSize: 14, lineHeight: 1.5, maxWidth: "75%", boxShadow: "0 1px 3px rgba(79,70,229,0.2)" }}>{msg.text}</div>
            )}
          </div>
          );
        })}
        {isTyping && <TypingDots />}
      </div>

      <div style={{ padding: "12px 16px 20px", background: "white", borderTop: "1px solid #e4e4e7", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#f4f4f5", borderRadius: 14, padding: "4px 4px 4px 16px" }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)} placeholder="Tell me about your trip..." style={{ flex: 1, border: "none", background: "transparent", fontSize: 14, outline: "none", color: "#18181b", fontFamily: "inherit", padding: "10px 0" }} />
          <button onClick={() => send(input)} disabled={!input.trim() || isTyping} style={{ width: 40, height: 40, borderRadius: 12, background: input.trim() && !isTyping ? "#0f172a" : "#d4d4d8", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() && !isTyping ? "pointer" : "default", color: "white", fontSize: 18, transition: "all 0.15s" }}>↑</button>
        </div>
      </div>
    </div>
  );
}
