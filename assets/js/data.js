/* ===== Development Exchange — mock demo data =====
   Everything here is fictional sample data used only to demonstrate
   how the matching, directory, map, team-building, and bidding
   features would behave. No real companies or people. */

window.DX_DATA = (function () {

  var JURISDICTIONS = [
    { id: "J6", county: "Inland Empire", city: "Riverside\u2013San Bernardino, CA", state: "CA", lat: 34.0400, lng: -117.4000,
      avgApprovalWeeks: 15, difficulty: "Moderate", projectsTracked: 214,
      rejectionReasons: ["Incomplete WQMP / stormwater quality documentation", "Truck circulation and queuing plan comments", "Warehouse ordinance setback and buffer non-compliance"] }
  ];

  var PROPERTY_TYPES = ["Medical Office", "Industrial/Warehouse", "Multifamily", "Retail/QSR"];

  // Phase labels, in lifecycle order — used to group both SPECIALTIES and ROLE_REQUIREMENTS.
  var PHASES = ["Predevelopment", "Design", "Financing", "Construction", "Leasing / Exit"];

  var SPECIALTIES = [
    "Land Broker", "Environmental Consultant", "Land Surveyor", "Zoning Attorney", "Appraiser", "Title Company",
    "Architect", "Civil Engineer", "Structural Engineer", "MEP Engineer", "Landscape Architect",
    "Traffic Engineer", "Fire Protection Engineer", "Geotechnical Engineer", "SWPPP Consultant", "Lighting Engineer",
    "Construction Lender", "Accountant / Tax Advisor",
    "General Contractor", "Owner's Representative",
    "Leasing Broker", "Property Manager"
  ];

  // Every role a full commercial development actually uses, grouped by phase, in build order.
  // "always" roles are auto-included whenever their condition (if any) is met.
  // "recommended" roles are surfaced separately — common, but not universal on every deal.
  var ROLE_REQUIREMENTS = [
    // --- Predevelopment / due diligence ---
    { specialty: "Land Broker", phase: "Predevelopment", always: true,
      reason: "Every project starts with site control." },
    { specialty: "Environmental Consultant", phase: "Predevelopment", always: true,
      reason: "A Phase I (and often Phase II) environmental site assessment is required before closing on most commercial land, and by nearly every construction lender." },
    { specialty: "Land Surveyor", phase: "Predevelopment", always: true,
      reason: "An ALTA/boundary survey is required before design work and title insurance can proceed." },
    { specialty: "Zoning Attorney", phase: "Predevelopment", always: true,
      reason: "Land use counsel to navigate entitlement, zoning, and any variance process." },
    { specialty: "Appraiser", phase: "Predevelopment", always: true,
      reason: "Independent valuation required for lender underwriting." },
    { specialty: "Title Company", phase: "Predevelopment", always: true,
      reason: "Title search and title insurance required to close on the land." },
    // --- Design ---
    { specialty: "Architect", phase: "Design", always: true,
      reason: "Core design lead for every property type." },
    { specialty: "Civil Engineer", phase: "Design", always: true,
      reason: "Site grading, utilities, and drainage design." },
    { specialty: "Structural Engineer", phase: "Design", always: true,
      reason: "Structural design and permitting sign-off." },
    { specialty: "MEP Engineer", phase: "Design", always: true,
      reason: "Mechanical, electrical, and plumbing systems design — a distinct discipline from civil or structural." },
    { specialty: "Landscape Architect", phase: "Design", always: true,
      reason: "Required for site plan approval in most jurisdictions." },
    { specialty: "Traffic Engineer", phase: "Design", always: true,
      reason: "A traffic impact study is a standard entitlement requirement for commercial development." },
    { specialty: "Fire Protection Engineer", phase: "Design", always: true,
      reason: "Life-safety and fire code compliance is required for commercial buildings." },
    { specialty: "Geotechnical Engineer", phase: "Design", always: true,
      reason: "Soils report required for foundation design." },
    { specialty: "SWPPP Consultant", phase: "Design", condition: "acres", threshold: 1,
      reason: "Site disturbance over 1 acre triggers a federal/state stormwater permit (SWPPP) requirement." },
    { specialty: "Lighting Engineer", phase: "Design", condition: "lighting", propertyTypes: ["Medical Office", "Retail/QSR"],
      reason: "Site and parking lighting design/photometrics typically required for this property type." },
    // --- Financing ---
    { specialty: "Construction Lender", phase: "Financing", always: true,
      reason: "Most commercial construction is debt-financed; the lender's own requirements (ESA, appraisal, survey) shape predevelopment." },
    { specialty: "Accountant / Tax Advisor", phase: "Financing", recommended: true,
      reason: "Common for cost segregation, opportunity-zone, or entity structuring guidance — often handled in-house by larger developers." },
    // --- Construction ---
    { specialty: "General Contractor", phase: "Construction", always: true,
      reason: "Builds the project once design is permitted." },
    { specialty: "Owner's Representative", phase: "Construction", recommended: true,
      reason: "Independent oversight of the GC on the developer's behalf — common, but some developers self-perform this." },
    // --- Leasing / exit ---
    { specialty: "Leasing Broker", phase: "Leasing / Exit", recommended: true,
      reason: "Engaged closer to completion to pre-lease or lease up the building — distinct from the land broker who sourced the site." },
    { specialty: "Property Manager", phase: "Leasing / Exit", recommended: true,
      reason: "Operates the asset post-stabilization — not needed if the developer plans to sell at completion." }
  ];

  function s(onTime, onBudget, responsiveness, codeFluency) {
    return { onTime: onTime, onBudget: onBudget, responsiveness: responsiveness, codeFluency: codeFluency };
  }

  var FIRMS = [
    { id: "f43", name: "Inland Empire Land Advisors", specialty: "Land Broker",
      propertyTypes: ["Multifamily", "Industrial/Warehouse", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0633, lng: -117.6509, verified: true, founded: 2008, projectsCompleted: 91,
      scores: s(88, 85, 90, 87),
      bio: "Land and site assemblage brokerage across the Inland Empire, with a focus on logistics land along the I-10/I-15 corridors and infill multifamily sites.",
      collaborators: [{ id: "f48", count: 4 }, { id: "f46", count: 3 }, { id: "f59", count: 3 }],
      individuals: [
        { name: "Elena Vasquez", title: "Principal Broker", license: "CA DRE Broker #01834562", years: 16 }
      ] },
    { id: "f44", name: "Santa Ana River Environmental", specialty: "Environmental Consultant",
      propertyTypes: ["Industrial/Warehouse", "Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 33.9806, lng: -117.3755, verified: true, founded: 2011, projectsCompleted: 78,
      scores: s(89, 86, 88, 91),
      bio: "Phase I/II environmental site assessments and CEQA-adjacent studies for Riverside and San Bernardino county development.",
      collaborators: [], individuals: [] },
    { id: "f45", name: "Citrus Belt Surveying", specialty: "Land Surveyor",
      propertyTypes: ["Multifamily", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0556, lng: -117.1825, verified: true, founded: 2003, projectsCompleted: 156,
      scores: s(92, 89, 86, 87),
      bio: "ALTA/boundary and topographic survey work across Riverside and San Bernardino counties.",
      collaborators: [], individuals: [] },
    { id: "f46", name: "Inland Land Use Law Group", specialty: "Zoning Attorney",
      propertyTypes: ["Multifamily", "Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 33.9850, lng: -117.3720, verified: true, founded: 1999, projectsCompleted: 122,
      scores: s(85, 88, 90, 96),
      bio: "Land use and entitlement counsel navigating CEQA review and city-by-city zoning — including the region's evolving warehouse ordinances — for Inland Empire developers.",
      collaborators: [{ id: "f43", count: 3 }], individuals: [] },
    { id: "f47", name: "Inland Valley Valuation Group", specialty: "Appraiser",
      propertyTypes: ["Multifamily", "Industrial/Warehouse", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.1083, lng: -117.2898, verified: true, founded: 2010, projectsCompleted: 133,
      scores: s(90, 91, 85, 88),
      bio: "MAI-designated commercial appraisal for lender underwriting across the Inland Empire.",
      collaborators: [], individuals: [] },
    { id: "f48", name: "Golden State Title & Escrow", specialty: "Title Company",
      propertyTypes: ["Multifamily", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 34.0600, lng: -117.6400, verified: true, founded: 1995, projectsCompleted: 312,
      scores: s(93, 91, 89, 86),
      bio: "Commercial title search, insurance, and closing services for Inland Empire land transactions.",
      collaborators: [{ id: "f43", count: 4 }], individuals: [] },
    { id: "f49", name: "Citrus Grove Architecture Studio", specialty: "Architect",
      propertyTypes: ["Multifamily", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 33.9825, lng: -117.3730, verified: true, founded: 2006, projectsCompleted: 97,
      scores: s(87, 84, 91, 93),
      bio: "Multifamily and mixed-use design practice serving the Inland Empire's historic downtowns — Riverside, Redlands, and Ontario.",
      collaborators: [{ id: "f51", count: 6 }, { id: "f52", count: 4 }],
      individuals: [
        { name: "Marcus Lin, AIA", title: "Principal Architect", license: "CA Architect #C31245", years: 18 },
        { name: "Sofia Reyes, AIA", title: "Multifamily Design Lead", license: "CA Architect #C38821", years: 9 }
      ] },
    { id: "f50", name: "Inland Basin Civil Engineers", specialty: "Civil Engineer",
      propertyTypes: ["Multifamily", "Industrial/Warehouse", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0922, lng: -117.4350, verified: true, founded: 2004, projectsCompleted: 118,
      scores: s(88, 87, 86, 92),
      bio: "Site civil engineering — grading, drainage, utilities — with deep experience in Ontario, Fontana, and Riverside plan check.",
      collaborators: [{ id: "f56", count: 4 }], individuals: [] },
    { id: "f51", name: "Seismic Structural Group", specialty: "Structural Engineer",
      propertyTypes: ["Multifamily", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 34.1050, lng: -117.2950, verified: true, founded: 2000, projectsCompleted: 104,
      scores: s(90, 88, 85, 94),
      bio: "Seismic and structural design for multifamily, retail, and tilt-up industrial across the Inland Empire and greater Southern California.",
      collaborators: [{ id: "f49", count: 6 }, { id: "f61", count: 5 }],
      individuals: [
        { name: "David Kim, SE", title: "Principal Structural Engineer", license: "CA SE #S5821", years: 21 }
      ] },
    { id: "f52", name: "Empire MEP Engineering", specialty: "MEP Engineer",
      propertyTypes: ["Multifamily", "Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 34.1064, lng: -117.5931, verified: true, founded: 2012, projectsCompleted: 69,
      scores: s(86, 85, 88, 89),
      bio: "Mechanical, electrical, and plumbing design for multifamily and warehouse buildings across the Inland Empire.",
      collaborators: [{ id: "f49", count: 4 }], individuals: [] },
    { id: "f53", name: "Arroyo Landscape Architecture", specialty: "Landscape Architect",
      propertyTypes: ["Multifamily", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0530, lng: -117.1900, verified: false, founded: 2017, projectsCompleted: 31,
      scores: s(84, 86, 90, 85),
      bio: "Drought-tolerant landscape design tailored to Inland Empire city water-use ordinances and site-plan review.",
      collaborators: [], individuals: [] },
    { id: "f54", name: "Inland Mobility Traffic Engineers", specialty: "Traffic Engineer",
      propertyTypes: ["Multifamily", "Industrial/Warehouse", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0680, lng: -117.6520, verified: true, founded: 2009, projectsCompleted: 87,
      scores: s(86, 87, 84, 90),
      bio: "Traffic impact, VMT, and truck circulation/queuing studies for Inland Empire entitlements.",
      collaborators: [], individuals: [] },
    { id: "f55", name: "Empire Fire & Life Safety", specialty: "Fire Protection Engineer",
      propertyTypes: ["Multifamily", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 33.9530, lng: -117.3960, verified: true, founded: 2014, projectsCompleted: 52,
      scores: s(89, 87, 90, 92),
      bio: "Fire protection and life-safety code consulting for multifamily and industrial construction across the Inland Empire.",
      collaborators: [], individuals: [] },
    { id: "f56", name: "San Andreas Geotechnical Group", specialty: "Geotechnical Engineer",
      propertyTypes: ["Multifamily", "Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 34.1200, lng: -117.2820, verified: true, founded: 2001, projectsCompleted: 145,
      scores: s(90, 89, 84, 91),
      bio: "Geotechnical investigation, liquefaction studies, and seismic hazard analysis for development across the San Andreas-adjacent Inland Empire.",
      collaborators: [{ id: "f50", count: 4 }], individuals: [] },
    { id: "f57", name: "Santa Ana Watershed Stormwater", specialty: "SWPPP Consultant",
      propertyTypes: ["Industrial/Warehouse", "Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 33.8795, lng: -117.5700, verified: true, founded: 2015, projectsCompleted: 48,
      scores: s(91, 88, 89, 87),
      bio: "SWPPP and WQMP planning with construction-phase compliance across the Santa Ana River watershed.",
      collaborators: [], individuals: [] },
    { id: "f58", name: "Route 66 Lighting Design", specialty: "Lighting Engineer",
      propertyTypes: ["Retail/QSR", "Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.1100, lng: -117.5990, verified: false, founded: 2018, projectsCompleted: 24,
      scores: s(82, 84, 91, 80),
      bio: "Site and parking photometric design for Inland Empire logistics, retail, and multifamily projects.",
      collaborators: [], individuals: [] },
    { id: "f59", name: "Inland Capital Construction Finance", specialty: "Construction Lender",
      propertyTypes: ["Multifamily", "Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 34.0650, lng: -117.6100, verified: true, founded: 2005, projectsCompleted: 167,
      scores: s(88, 92, 83, 87),
      bio: "Construction and bridge lending for multifamily and industrial development across the Inland Empire and greater Southern California.",
      collaborators: [{ id: "f43", count: 3 }], individuals: [] },
    { id: "f60", name: "Redlands CPA Partners", specialty: "Accountant / Tax Advisor",
      propertyTypes: ["Multifamily", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0570, lng: -117.1830, verified: false, founded: 2007, projectsCompleted: 88,
      scores: s(87, 89, 85, 84),
      bio: "Real estate accounting, cost segregation, and 1031/opportunity-zone structuring for Inland Empire development sponsors.",
      collaborators: [], individuals: [] },
    { id: "f61", name: "Interchange Construction Group", specialty: "General Contractor",
      propertyTypes: ["Multifamily", "Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 34.1000, lng: -117.4600, verified: true, founded: 1996, projectsCompleted: 178,
      scores: s(88, 85, 87, 89),
      bio: "General contractor with deep industrial and logistics construction experience along the Inland Empire's I-10 and I-15 corridors.",
      collaborators: [{ id: "f51", count: 5 }],
      individuals: [
        { name: "Robert Chen", title: "VP of Preconstruction", license: "CA CSLB #987654", years: 19 }
      ] },
    { id: "f62", name: "Citrus City Builders", specialty: "General Contractor",
      propertyTypes: ["Multifamily", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 33.9900, lng: -117.3800, verified: true, founded: 2010, projectsCompleted: 94,
      scores: s(85, 90, 86, 88),
      bio: "Mid-size general contractor specializing in infill multifamily construction across Riverside and San Bernardino.",
      collaborators: [], individuals: [] },
    { id: "f63", name: "Inland Development Advisory", specialty: "Owner's Representative",
      propertyTypes: ["Multifamily", "Industrial/Warehouse", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0520, lng: -117.6300, verified: true, founded: 2016, projectsCompleted: 39,
      scores: s(90, 88, 92, 87),
      bio: "Independent owner's representation and construction oversight for Inland Empire development sponsors — including first-time and out-of-area investors.",
      collaborators: [], individuals: [] },
    { id: "f64", name: "Empire Leasing Partners", specialty: "Leasing Broker",
      propertyTypes: ["Multifamily", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.1030, lng: -117.5750, verified: true, founded: 2009, projectsCompleted: 112,
      scores: s(84, 83, 91, 86),
      bio: "Landlord representation and lease-up services for newly delivered Inland Empire multifamily, retail, and industrial properties.",
      collaborators: [], individuals: [] },
    { id: "f65", name: "Pacific Asset Management Co.", specialty: "Property Manager",
      propertyTypes: ["Multifamily", "Industrial/Warehouse", "Medical Office"], jurisdictions: ["J6"],
      lat: 33.8700, lng: -117.5500, verified: true, founded: 1998, projectsCompleted: 203,
      scores: s(86, 87, 88, 85),
      bio: "Commercial and multifamily property management and asset stabilization services across the Inland Empire.",
      collaborators: [], individuals: [] },
    { id: "f66", name: "Foothill Builders", specialty: "General Contractor",
      propertyTypes: ["Multifamily", "Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 34.1210, lng: -117.2000, verified: true, founded: 2012, projectsCompleted: 63,
      scores: s(84, 89, 88, 85),
      bio: "General contractor focused on multifamily and light-industrial construction along the Inland Empire's foothill corridor.",
      collaborators: [], individuals: [] },

    { id: "f67", name: "Cactus Ridge Land Group", specialty: "Land Broker",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0975, lng: -117.5310, verified: true, founded: 2013, projectsCompleted: 64,
      scores: s(85, 84, 92, 83),
      bio: "Industrial and pad-site brokerage concentrated along the I-15 corridor through Rancho Cucamonga, Fontana, and Ontario.",
      collaborators: [{ id: "f48", count: 3 }], individuals: [] },
    { id: "f68", name: "Mission Valley Land Partners", specialty: "Land Broker",
      propertyTypes: ["Multifamily", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 33.8753, lng: -117.5664, verified: false, founded: 2019, projectsCompleted: 27,
      scores: s(82, 85, 90, 80),
      bio: "Infill and small-parcel brokerage serving Corona, Norco, and the southwest Riverside County submarkets.",
      collaborators: [], individuals: [] },

    { id: "f69", name: "Chino Basin Environmental", specialty: "Environmental Consultant",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 34.0122, lng: -117.6889, verified: true, founded: 2007, projectsCompleted: 112,
      scores: s(90, 88, 85, 89),
      bio: "Phase I and II assessments with a specialty in former agricultural and dairy parcels converting to industrial use.",
      collaborators: [{ id: "f76", count: 3 }], individuals: [] },
    { id: "f70", name: "Sierra Vista Environmental Services", specialty: "Environmental Consultant",
      propertyTypes: ["Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.1064, lng: -117.2898, verified: true, founded: 2015, projectsCompleted: 51,
      scores: s(87, 89, 91, 86),
      bio: "CEQA documentation, biological surveys, and habitat conservation plan compliance across San Bernardino County.",
      collaborators: [], individuals: [] },

    { id: "f71", name: "Foothill Boundary & Survey", specialty: "Land Surveyor",
      propertyTypes: ["Industrial/Warehouse", "Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.1233, lng: -117.3703, verified: true, founded: 2001, projectsCompleted: 187,
      scores: s(93, 90, 86, 88),
      bio: "ALTA, boundary, and construction staking across the foothill communities from Upland to Redlands.",
      collaborators: [{ id: "f75", count: 5 }], individuals: [] },
    { id: "f72", name: "Corona Precision Surveying", specialty: "Land Surveyor",
      propertyTypes: ["Retail/QSR", "Multifamily"], jurisdictions: ["J6"],
      lat: 33.8753, lng: -117.5664, verified: false, founded: 2016, projectsCompleted: 43,
      scores: s(86, 87, 92, 82),
      bio: "Topographic and boundary survey work for pad sites and small multifamily projects in southwest Riverside County.",
      collaborators: [], individuals: [] },

    { id: "f73", name: "Ontario Entitlement Counsel", specialty: "Zoning Attorney",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 34.0633, lng: -117.6509, verified: true, founded: 2004, projectsCompleted: 148,
      scores: s(88, 87, 89, 95),
      bio: "Entitlement and land-use counsel focused on warehouse and logistics approvals, including the region's evolving warehouse siting ordinances.",
      collaborators: [{ id: "f79", count: 4 }], individuals: [
        { name: "Alicia Moreno, Esq.", title: "Managing Partner", license: "CA Bar #204518", years: 22 }
      ] },
    { id: "f74", name: "San Bernardino Land Use Group", specialty: "Zoning Attorney",
      propertyTypes: ["Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.1083, lng: -117.2898, verified: true, founded: 2011, projectsCompleted: 79,
      scores: s(86, 89, 87, 92),
      bio: "Variance, density bonus, and specific-plan amendment work across San Bernardino County jurisdictions.",
      collaborators: [], individuals: [] },

    { id: "f75", name: "Redlands Civil Group", specialty: "Civil Engineer",
      propertyTypes: ["Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0556, lng: -117.1825, verified: true, founded: 2005, projectsCompleted: 134,
      scores: s(91, 88, 87, 93),
      bio: "Site civil, grading, and WQMP design with deep familiarity with Redlands and Loma Linda plan check.",
      collaborators: [{ id: "f71", count: 5 }, { id: "f80", count: 4 }], individuals: [
        { name: "Nathan Ruiz, PE", title: "Principal Civil Engineer", license: "CA PE #C68214", years: 19 }
      ] },
    { id: "f76", name: "Logistics Corridor Engineering", specialty: "Civil Engineer",
      propertyTypes: ["Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 34.0922, lng: -117.4350, verified: true, founded: 2009, projectsCompleted: 96,
      scores: s(89, 86, 88, 91),
      bio: "Large-site civil engineering for distribution and logistics development, with heavy Ontario and Fontana permit volume.",
      collaborators: [{ id: "f69", count: 3 }, { id: "f84", count: 4 }], individuals: [] },
    { id: "f77", name: "Temescal Civil Consultants", specialty: "Civil Engineer",
      propertyTypes: ["Retail/QSR", "Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 33.8300, lng: -117.5100, verified: false, founded: 2018, projectsCompleted: 38,
      scores: s(84, 88, 91, 82),
      bio: "Small-to-mid site civil work for pad sites and infill housing across Corona and Lake Elsinore.",
      collaborators: [], individuals: [] },

    { id: "f78", name: "Tilt-Up Structural Partners", specialty: "Structural Engineer",
      propertyTypes: ["Industrial/Warehouse", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0680, lng: -117.6100, verified: true, founded: 2002, projectsCompleted: 163,
      scores: s(92, 89, 86, 92),
      bio: "Concrete tilt-up and pre-engineered metal structural design for Inland Empire distribution buildings.",
      collaborators: [{ id: "f86", count: 6 }], individuals: [
        { name: "Priya Raman, SE", title: "Principal", license: "CA SE #S6104", years: 20 }
      ] },
    { id: "f79", name: "Inland Structural Design", specialty: "Structural Engineer",
      propertyTypes: ["Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 33.9825, lng: -117.3730, verified: true, founded: 2012, projectsCompleted: 71,
      scores: s(87, 86, 90, 88),
      bio: "Podium, wood-frame, and light-commercial structural engineering for Riverside-area projects.",
      collaborators: [{ id: "f73", count: 4 }], individuals: [] },

    { id: "f80", name: "Empire Mechanical Design", specialty: "MEP Engineer",
      propertyTypes: ["Medical Office", "Multifamily"], jurisdictions: ["J6"],
      lat: 34.0530, lng: -117.1900, verified: true, founded: 2008, projectsCompleted: 88,
      scores: s(88, 87, 89, 87),
      bio: "MEP design for medical office, clinic, and multifamily projects, including OSHPD-adjacent tenant work.",
      collaborators: [{ id: "f75", count: 4 }], individuals: [] },
    { id: "f81", name: "Warehouse Systems Engineering", specialty: "MEP Engineer",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 34.1000, lng: -117.4600, verified: false, founded: 2017, projectsCompleted: 42,
      scores: s(85, 88, 91, 84),
      bio: "Electrical distribution, high-bay lighting, and fire-sprinkler coordination for logistics facilities.",
      collaborators: [], individuals: [] },

    { id: "f82", name: "Inland Geotechnical Associates", specialty: "Geotechnical Engineer",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0975, lng: -117.5310, verified: true, founded: 2000, projectsCompleted: 205,
      scores: s(91, 90, 85, 92),
      bio: "Soils investigation, pavement design, and liquefaction analysis for large-footprint Inland Empire sites.",
      collaborators: [{ id: "f84", count: 5 }], individuals: [
        { name: "Wesley Cho, GE", title: "Principal Geotechnical Engineer", license: "CA GE #GE2871", years: 24 }
      ] },
    { id: "f83", name: "Santa Ana Canyon Geotechnical", specialty: "Geotechnical Engineer",
      propertyTypes: ["Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 33.9530, lng: -117.3960, verified: true, founded: 2014, projectsCompleted: 58,
      scores: s(88, 87, 90, 86),
      bio: "Geotechnical investigation and seismic hazard studies for residential and commercial infill in Riverside County.",
      collaborators: [], individuals: [] },

    { id: "f84", name: "Inland Empire Builders Group", specialty: "General Contractor",
      propertyTypes: ["Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 34.0633, lng: -117.6509, verified: true, founded: 1998, projectsCompleted: 214,
      scores: s(90, 87, 86, 90),
      bio: "Design-build general contractor specializing in distribution centers and manufacturing facilities across the I-10 corridor.",
      collaborators: [{ id: "f82", count: 5 }, { id: "f76", count: 4 }], individuals: [
        { name: "Marcus Delgado", title: "VP of Preconstruction", license: "CA CSLB #742119", years: 21 }
      ] },
    { id: "f85", name: "Redlands Construction Company", specialty: "General Contractor",
      propertyTypes: ["Medical Office", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 34.0556, lng: -117.1825, verified: true, founded: 2006, projectsCompleted: 127,
      scores: s(89, 88, 90, 87),
      bio: "Commercial general contractor delivering medical office, clinic, and retail projects across the east valley.",
      collaborators: [{ id: "f80", count: 3 }], individuals: [
        { name: "Karen Whitfield", title: "Director of Operations", license: "CA CSLB #815203", years: 17 }
      ] },
    { id: "f86", name: "Valley Commercial Construction", specialty: "General Contractor",
      propertyTypes: ["Industrial/Warehouse", "Multifamily"], jurisdictions: ["J6"],
      lat: 34.0922, lng: -117.4350, verified: true, founded: 2010, projectsCompleted: 98,
      scores: s(86, 91, 87, 85),
      bio: "Mid-size general contractor working across industrial shell, tenant improvement, and multifamily construction.",
      collaborators: [{ id: "f78", count: 6 }], individuals: [] },

    { id: "f87", name: "Inland Traffic & Mobility", specialty: "Traffic Engineer",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0680, lng: -117.6520, verified: true, founded: 2010, projectsCompleted: 93,
      scores: s(87, 88, 86, 91),
      bio: "Truck-trip generation, queuing, and VMT analysis — the studies Inland Empire warehouse approvals turn on.",
      collaborators: [], individuals: [] },

    { id: "f88", name: "Citrus Belt Landscape Design", specialty: "Landscape Architect",
      propertyTypes: ["Multifamily", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0530, lng: -117.1900, verified: true, founded: 2013, projectsCompleted: 66,
      scores: s(86, 88, 91, 87),
      bio: "Water-efficient landscape design meeting MWELO and city-specific planting requirements across the region.",
      collaborators: [], individuals: [] },

    { id: "f89", name: "Empire Stormwater Consulting", specialty: "SWPPP Consultant",
      propertyTypes: ["Industrial/Warehouse", "Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0975, lng: -117.5310, verified: true, founded: 2012, projectsCompleted: 118,
      scores: s(92, 89, 88, 90),
      bio: "SWPPP preparation, QSD services, and WQMP compliance for large-site development in the Santa Ana watershed.",
      collaborators: [{ id: "f84", count: 3 }], individuals: [] },

    { id: "f90", name: "Inland Title Services", specialty: "Title Company",
      propertyTypes: ["Industrial/Warehouse", "Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.1083, lng: -117.2898, verified: true, founded: 2003, projectsCompleted: 268,
      scores: s(90, 89, 88, 85),
      bio: "Commercial title, escrow, and closing services across Riverside and San Bernardino counties.",
      collaborators: [], individuals: [] },

    { id: "f91", name: "Pacific Inland Capital", specialty: "Construction Lender",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0633, lng: -117.6509, verified: true, founded: 2009, projectsCompleted: 142,
      scores: s(89, 91, 84, 86),
      bio: "Construction and bridge lending for Inland Empire industrial, retail, and small multifamily sponsors.",
      collaborators: [], individuals: [] },

    { id: "f92", name: "Empire Project Advisors", specialty: "Owner's Representative",
      propertyTypes: ["Medical Office", "Industrial/Warehouse"], jurisdictions: ["J6"],
      lat: 34.0556, lng: -117.1825, verified: true, founded: 2015, projectsCompleted: 47,
      scores: s(91, 89, 92, 86),
      bio: "Owner's representation for first-time and out-of-area sponsors developing their first Inland Empire project.",
      collaborators: [], individuals: [] },
    { id: "f93", name: "Ontario Design Collective", specialty: "Architect",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 34.0633, lng: -117.6509, verified: true, founded: 2009, projectsCompleted: 118,
      scores: s(89, 87, 88, 92),
      bio: "Industrial, logistics, and retail architecture with high permit volume through Ontario, Fontana, and Rancho Cucamonga.",
      collaborators: [{ id: "f78", count: 5 }, { id: "f84", count: 4 }],
      individuals: [
        { name: "Julia Fernandez, AIA", title: "Principal Architect", license: "CA Architect #C34918", years: 20 },
        { name: "Andre Whitmore, AIA", title: "Director of Industrial Studio", license: "CA Architect #C41277", years: 12 }
      ] },
    { id: "f94", name: "Redlands Architecture Workshop", specialty: "Architect",
      propertyTypes: ["Medical Office", "Retail/QSR"], jurisdictions: ["J6"],
      lat: 34.0556, lng: -117.1825, verified: true, founded: 2011, projectsCompleted: 74,
      scores: s(88, 86, 92, 90),
      bio: "Medical office, clinic, and boutique retail design, with particular fluency in Redlands' stricter design review.",
      collaborators: [{ id: "f80", count: 4 }, { id: "f85", count: 3 }],
      individuals: [
        { name: "Thomas Okonkwo, AIA", title: "Founding Principal", license: "CA Architect #C36502", years: 18 }
      ] },
    { id: "f95", name: "Riverside Housing Architects", specialty: "Architect",
      propertyTypes: ["Multifamily"], jurisdictions: ["J6"],
      lat: 33.9806, lng: -117.3755, verified: false, founded: 2017, projectsCompleted: 39,
      scores: s(84, 87, 91, 85),
      bio: "Multifamily and mixed-use specialists working density bonus and infill housing projects across Riverside County.",
      collaborators: [{ id: "f79", count: 3 }], individuals: [] },
    { id: "f96", name: "Empire Valuation Partners", specialty: "Appraiser",
      propertyTypes: ["Industrial/Warehouse", "Retail/QSR", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0975, lng: -117.5310, verified: true, founded: 2012, projectsCompleted: 176,
      scores: s(89, 90, 86, 87),
      bio: "MAI commercial appraisal with heavy industrial and logistics coverage for lender underwriting.",
      collaborators: [], individuals: [] },
    { id: "f97", name: "Inland Fire Code Consultants", specialty: "Fire Protection Engineer",
      propertyTypes: ["Industrial/Warehouse", "Multifamily", "Medical Office"], jurisdictions: ["J6"],
      lat: 34.0680, lng: -117.6100, verified: true, founded: 2016, projectsCompleted: 61,
      scores: s(90, 88, 89, 91),
      bio: "High-piled storage permits, sprinkler design review, and life-safety consulting for warehouse and residential projects.",
      collaborators: [{ id: "f84", count: 3 }], individuals: [] }
  ];

  // Sample projects used on the Bidding and Project Workspace demo pages —
  // two markets, two property types, so those pages aren't Phoenix-only.
  var SAMPLE_PROJECTS = [
  {
    id: "p01",
    name: "Citrus Grove Medical Plaza",
    propertyType: "Medical Office",
    jurisdictionId: "J6",
    sqft: 42000,
    siteAcres: 3.2,
    budgetRange: "$9.5M – $11M",
    biddingRole: "General Contractor",
    description: "A 42,000 sq ft, two-story medical office building on a 3.2-acre site in Redlands. Design and entitlements are complete; the developer is soliciting General Contractor bids for construction.",
    bids: [
      { firmId: "f85", price: 10200000, timelineWeeks: 58,
        note: "Includes owner's allowance for medical equipment rough-in; GMP contract." },
      { firmId: "f86", price: 9850000, timelineWeeks: 64,
        note: "Lowest price; longer schedule due to current backlog." },
      { firmId: "f61", price: 10650000, timelineWeeks: 52,
        note: "Fastest schedule offered; premium reflects accelerated crew staffing." },
      { firmId: "f66", price: 9950000, timelineWeeks: 60,
        note: "Competitive price with the largest completed medical-office portfolio of the four bidders." }
    ],
    // Hired team + workspace content, used on the Project Workspace demo page.
    // Covers every phase — predevelopment through leasing/exit — not just design & construction.
    team: [
      { role: "Land Broker", firmId: "f43", status: "Complete" },
      { role: "Environmental Consultant", firmId: "f70", status: "Complete" },
      { role: "Land Surveyor", firmId: "f45", status: "Complete" },
      { role: "Zoning Attorney", firmId: "f74", status: "Complete" },
      { role: "Appraiser", firmId: "f47", status: "Complete" },
      { role: "Title Company", firmId: "f48", status: "Complete" },
      { role: "Architect", firmId: "f94", status: "Complete" },
      { role: "Civil Engineer", firmId: "f75", status: "Complete" },
      { role: "Structural Engineer", firmId: "f79", status: "Complete" },
      { role: "MEP Engineer", firmId: "f80", status: "Complete" },
      { role: "Landscape Architect", firmId: "f88", status: "Complete" },
      { role: "Traffic Engineer", firmId: "f87", status: "Complete" },
      { role: "Fire Protection Engineer", firmId: "f55", status: "Complete" },
      { role: "Geotechnical Engineer", firmId: "f83", status: "Complete" },
      { role: "SWPPP Consultant", firmId: "f89", status: "In progress" },
      { role: "Lighting Engineer", firmId: "f58", status: "In progress" },
      { role: "Construction Lender", firmId: "f59", status: "Complete" },
      { role: "Accountant / Tax Advisor", firmId: "f60", status: "Complete" },
      { role: "General Contractor", firmId: null, status: "Out for bid — see Bidding" },
      { role: "Owner's Representative", firmId: "f92", status: "In progress" },
      { role: "Leasing Broker", firmId: "f64", status: "Not started" },
      { role: "Property Manager", firmId: "f65", status: "Not started" }
    ],
    timeline: [
      { phase: "Site due diligence", status: "Complete", window: "Nov – Dec 2025" },
      { phase: "Land acquisition", status: "Complete", window: "Jan – Mar 2026" },
      { phase: "Entitlement & permitting", status: "Complete", window: "Mar – Jun 2026" },
      { phase: "Design development", status: "Complete", window: "Apr – Jul 2026" },
      { phase: "Construction financing closed", status: "Complete", window: "Jun 2026" },
      { phase: "Construction bidding", status: "In progress", window: "Jul 2026" },
      { phase: "Construction", status: "Not started", window: "Sep 2026 – Nov 2027" },
      { phase: "Lease-up & stabilization", status: "Not started", window: "Dec 2027 – Jun 2028" }
    ],
    documents: [
      { name: "Phase I Environmental Site Assessment.pdf", uploadedBy: "f89", date: "2025-12-05", type: "Environmental" },
      { name: "ALTA Survey — Ironwood Parcel.pdf", uploadedBy: "f75", date: "2025-12-12", type: "Survey" },
      { name: "Appraisal Report.pdf", uploadedBy: "f83", date: "2026-01-08", type: "Financing" },
      { name: "Title Commitment.pdf", uploadedBy: "f94", date: "2026-01-10", type: "Title" },
      { name: "Traffic Impact Study.pdf", uploadedBy: "f80", date: "2026-03-01", type: "Traffic" },
      { name: "Geotechnical Report — Final.pdf", uploadedBy: "f87", date: "2026-02-02", type: "Geotech" },
      { name: "SWPPP Plan v3.pdf", uploadedBy: "f45", date: "2026-05-20", type: "Environmental" },
      { name: "Architectural Site Plan — DD Set.pdf", uploadedBy: "f94", date: "2026-06-10", type: "Design" },
      { name: "Structural Calculations.pdf", uploadedBy: "f74", date: "2026-06-18", type: "Structural" },
      { name: "MEP Design Development Set.pdf", uploadedBy: "f88", date: "2026-06-15", type: "MEP" },
      { name: "Landscape Plan.pdf", uploadedBy: "f55", date: "2026-06-20", type: "Landscape" },
      { name: "Life Safety Narrative.pdf", uploadedBy: "f58", date: "2026-06-05", type: "Fire/Life Safety" },
      { name: "Photometric Plan.pdf", uploadedBy: "f70", date: "2026-06-25", type: "Lighting" }
    ]
  },
  {
    id: "p02",
    name: "Arroyo Vista Apartments",
    propertyType: "Multifamily",
    jurisdictionId: "J6",
    sqft: 72000,
    siteAcres: 1.5,
    budgetRange: "$28M – $32M",
    biddingRole: "General Contractor",
    description: "An 80-unit multifamily development on a 1.5-acre infill site in downtown Riverside. Design and entitlements are complete; the developer is soliciting General Contractor bids for construction over a structured parking podium.",
    bids: [
      { firmId: "f61", price: 29500000, timelineWeeks: 72,
        note: "Includes structured parking podium; GMP contract." },
      { firmId: "f62", price: 28800000, timelineWeeks: 78,
        note: "Lowest price; longer schedule due to current backlog." },
      { firmId: "f66", price: 30200000, timelineWeeks: 66,
        note: "Fastest schedule offered; premium reflects accelerated crew staffing for podium construction." }
    ],
    // Multifamily doesn't trigger the Lighting Engineer requirement (see ROLE_REQUIREMENTS),
    // so unlike Ironwood, this roster has no lighting line — the taxonomy's conditional logic in action.
    team: [
      { role: "Land Broker", firmId: "f43", status: "Complete" },
      { role: "Environmental Consultant", firmId: "f44", status: "Complete" },
      { role: "Land Surveyor", firmId: "f45", status: "Complete" },
      { role: "Zoning Attorney", firmId: "f46", status: "Complete" },
      { role: "Appraiser", firmId: "f47", status: "Complete" },
      { role: "Title Company", firmId: "f48", status: "Complete" },
      { role: "Architect", firmId: "f49", status: "Complete" },
      { role: "Civil Engineer", firmId: "f50", status: "Complete" },
      { role: "Structural Engineer", firmId: "f51", status: "Complete" },
      { role: "MEP Engineer", firmId: "f52", status: "Complete" },
      { role: "Landscape Architect", firmId: "f53", status: "Complete" },
      { role: "Traffic Engineer", firmId: "f54", status: "Complete" },
      { role: "Fire Protection Engineer", firmId: "f55", status: "Complete" },
      { role: "Geotechnical Engineer", firmId: "f56", status: "Complete" },
      { role: "SWPPP Consultant", firmId: "f57", status: "In progress" },
      { role: "Construction Lender", firmId: "f59", status: "Complete" },
      { role: "Accountant / Tax Advisor", firmId: "f60", status: "Complete" },
      { role: "General Contractor", firmId: null, status: "Out for bid — see Bidding" },
      { role: "Owner's Representative", firmId: "f63", status: "In progress" },
      { role: "Leasing Broker", firmId: "f64", status: "Not started" },
      { role: "Property Manager", firmId: "f65", status: "Not started" }
    ],
    timeline: [
      { phase: "Site due diligence", status: "Complete", window: "Aug – Sep 2025" },
      { phase: "Land acquisition", status: "Complete", window: "Sep – Nov 2025" },
      { phase: "Entitlement & permitting", status: "Complete", window: "Nov 2025 – Jun 2026" },
      { phase: "Design development", status: "Complete", window: "Jan – Jun 2026" },
      { phase: "Construction financing closed", status: "Complete", window: "Jun 2026" },
      { phase: "Construction bidding", status: "In progress", window: "Jul 2026" },
      { phase: "Construction", status: "Not started", window: "Sep 2026 – Feb 2028" },
      { phase: "Lease-up & stabilization", status: "Not started", window: "Mar – Sep 2028" }
    ],
    documents: [
      { name: "Phase I Environmental Site Assessment.pdf", uploadedBy: "f44", date: "2025-08-20", type: "Environmental" },
      { name: "ALTA Survey — Arroyo Vista Parcel.pdf", uploadedBy: "f45", date: "2025-08-28", type: "Survey" },
      { name: "CEQA Initial Study.pdf", uploadedBy: "f46", date: "2025-11-10", type: "Entitlement" },
      { name: "Appraisal Report.pdf", uploadedBy: "f47", date: "2025-09-15", type: "Financing" },
      { name: "Title Commitment.pdf", uploadedBy: "f48", date: "2025-09-18", type: "Title" },
      { name: "Traffic & VMT Analysis.pdf", uploadedBy: "f54", date: "2025-12-01", type: "Traffic" },
      { name: "Geotechnical & Seismic Report.pdf", uploadedBy: "f56", date: "2025-10-05", type: "Geotech" },
      { name: "SWPPP Plan v2.pdf", uploadedBy: "f57", date: "2026-05-20", type: "Environmental" },
      { name: "Architectural Design Development Set.pdf", uploadedBy: "f49", date: "2026-05-10", type: "Design" },
      { name: "Structural Calculations.pdf", uploadedBy: "f51", date: "2026-05-25", type: "Structural" },
      { name: "MEP Design Development Set.pdf", uploadedBy: "f52", date: "2026-05-28", type: "MEP" },
      { name: "Landscape Plan.pdf", uploadedBy: "f53", date: "2026-06-01", type: "Landscape" }
    ]
  }
  ];

  // Curated bundles of firms with a confirmed shared project history — used on the
  // Packaged / Proven Teams page. Pairwise counts are pulled from FIRMS[].collaborators.
  var PACKAGED_TEAMS = [
    {
      id: "pt1", name: "I-10 Industrial Delivery Team", jurisdictionId: "J6", propertyType: "Industrial/Warehouse",
      members: ["f67", "f73", "f76", "f78", "f82", "f87", "f89", "f93", "f84"],
      description: "A nine-firm group that has repeatedly delivered distribution and logistics projects together along the Ontario\u2013Fontana corridor, from site selection through certificate of occupancy."
    },
    {
      id: "pt2", name: "Redlands Medical Office Pair", jurisdictionId: "J6", propertyType: "Medical Office",
      members: ["f94", "f80", "f85"],
      description: "An architect, MEP engineer, and general contractor with a confirmed history delivering medical office and clinic projects through Redlands design review together."
    },
    {
      id: "pt3", name: "Inland Empire Multifamily Team", jurisdictionId: "J6", propertyType: "Multifamily",
      members: ["f43", "f46", "f48", "f49", "f50", "f51", "f56", "f59", "f61"],
      description: "A nine-firm group spanning predevelopment through construction with a confirmed history delivering infill multifamily projects across the Inland Empire."
    }
  ];


  /* ===== Marketplace-layer sample data (availability, reviews, messaging, notifications) ===== */

  // Availability & responsiveness — derived deterministically from firm id so the
  // demo stays stable between loads without hand-authoring 66 entries.
  var AVAILABILITY_STATES = [
    { key: "available", label: "Accepting new projects", pill: "pill-green" },
    { key: "limited",   label: "Limited capacity",       pill: "pill-gold" },
    { key: "booked",    label: "Booked ~8 weeks out",    pill: "pill-muted" }
  ];
  FIRMS.forEach(function (f) {
    var n = parseInt(f.id.slice(1), 10);
    f.availability = AVAILABILITY_STATES[n % 7 === 0 ? 2 : (n % 3 === 0 ? 1 : 0)];
    f.responseHours = 2 + (n * 7) % 46; // avg. time to first reply, in hours
  });

  var REVIEW_AUTHORS = ["Daniel Reyes", "Priya Natarajan", "Mark Ellison", "Sofia Grant", "James Okafor", "Hannah Liu", "Victor Sandoval", "Grace Kim", "Tom Brennan", "Aisha Patel", "Carlos Medina", "Rachel Stone"];
  var REVIEW_COMPANIES = ["Citrus Grove Devco", "Crestline Partners", "Bluefield Development", "Marrow Capital", "Northgate REIT", "Halcyon Development Group", "Sable Ridge Properties", "Vantage Point Development"];
  var REVIEW_TEXTS = [
    "Delivered exactly what was scoped, on schedule. Their familiarity with the county review process saved us at least three weeks.",
    "Responsive and organized. A couple of substitutions in the submittal package, but they flagged them early and re-submitted fast.",
    "We have used them on two projects now. Strong communication, and their drawings went through plan check with minor comments only.",
    "Solid work overall. Pricing came in slightly above the initial estimate, but every change order was well documented and justified.",
    "They know this jurisdiction cold — anticipated the plan-check comments before we even submitted.",
    "Professional team, quick turnarounds, and they coordinated smoothly with our other consultants without us having to chase anyone."
  ];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function reviewsForFirm(firmId) {
    var n = parseInt(firmId.slice(1), 10);
    var count = 2 + (n % 3); // 2-4 reviews per firm
    var out = [];
    for (var i = 0; i < count; i++) {
      var seed = n * 5 + i * 11;
      var rating = 5 - (seed % 3 === 0 ? 1 : 0) - (seed % 11 === 0 ? 1 : 0); // mostly 4-5, occasional 3
      out.push({
        author: REVIEW_AUTHORS[seed % REVIEW_AUTHORS.length],
        company: REVIEW_COMPANIES[(seed + 3) % REVIEW_COMPANIES.length],
        rating: rating,
        date: MONTHS[seed % 12] + " 202" + (4 + (seed % 3)),
        text: REVIEW_TEXTS[seed % REVIEW_TEXTS.length],
        verified: seed % 4 !== 1 // most reviews tied to a confirmed platform project
      });
    }
    return out;
  }

  function ratingSummary(firmId) {
    var rs = reviewsForFirm(firmId);
    var sum = 0;
    rs.forEach(function (r) { sum += r.rating; });
    return { avg: Math.round((sum / rs.length) * 10) / 10, count: rs.length };
  }

  // Mock message threads for the signed-in demo developer ("Citrus Grove Devco").
  var CONVERSATIONS = [
    {
      id: "c1", firmId: "f94", projectId: "p01", unread: true,
      messages: [
        { from: "you",  time: "Mon 9:14 AM",  text: "Morning — the city reviewer flagged the lobby egress width on sheet A-201. Can you take a look before Thursday's resubmittal?" },
        { from: "firm", time: "Mon 9:41 AM",  text: "Saw the comment. We can widen the corridor 6 inches without touching the tenant suites — revising now." },
        { from: "firm", time: "Tue 4:22 PM",  text: "Revised A-201 and A-202 are uploaded to the document vault. Egress width now shows 44 inches clear, which satisfies their comment." }
      ]
    },
    {
      id: "c2", firmId: "f75", projectId: "p01", unread: true,
      messages: [
        { from: "you",  time: "Last Wed 2:05 PM", text: "Do we have a timeline on the updated drainage calcs for the retention basin?" },
        { from: "firm", time: "Last Wed 3:11 PM", text: "Targeting Friday. We are increasing basin capacity about 12% to get ahead of the reviewer's concern." },
        { from: "firm", time: "Fri 10:48 AM",     text: "Drainage report v3 is in the vault. Summary: basin sized for the 100-year event with 15% freeboard. Should clear the comment." }
      ]
    },
    {
      id: "c3", firmId: "f46", projectId: "p02", unread: false,
      messages: [
        { from: "firm", time: "Jul 14", text: "Heads up — the city is holding a hearing on the parking-ratio overlay next month. If it passes, Arroyo Vista's variance gets simpler." },
        { from: "you",  time: "Jul 14", text: "Good catch. Let's hold the variance filing until after the hearing then?" },
        { from: "firm", time: "Jul 15", text: "Agreed. I will calendar it and prep both versions of the filing so we can move the day after the vote." }
      ]
    },
    {
      id: "c4", firmId: "f43", projectId: null, unread: false,
      messages: [
        { from: "firm", time: "Jul 8", text: "A 4.1-acre parcel just came available off-market near the Loop 101 corridor — zoned right for medical office. Want the flyer?" },
        { from: "you",  time: "Jul 9", text: "Yes, send it over. What are they asking?" },
        { from: "firm", time: "Jul 9", text: "Flyer attached (see vault). Asking $2.9M, but there is room. Comparable trades in the submarket have been closer to $640k/acre." }
      ]
    }
  ];

  var NOTIFICATIONS = [
    { icon: "📋", text: "New bid received on Citrus Grove Medical Plaza — Valley Commercial Construction", time: "2h ago",  href: "bidding.html?project=p01", unread: true },
    { icon: "💬", text: "Redlands Architecture Workshop replied in Citrus Grove Medical Plaza",          time: "5h ago",  href: "messages.html?c=c1",      unread: true },
    { icon: "📄", text: "Drainage report v3 uploaded to the Citrus Grove document vault",         time: "1d ago",  href: "workspace.html?project=p01", unread: true },
    { icon: "⭐", text: "A firm you saved received a new 5-star review",                      time: "2d ago",  href: "saved.html",              unread: false },
    { icon: "🏛", text: "Inland Empire permitting update: median approval time in the launch cluster improved to 14 weeks", time: "3d ago", href: "jurisdictions.html?id=J6", unread: false },
    { icon: "✅", text: "Inland Empire Land Advisors completed license verification",           time: "4d ago",  href: "firm.html?id=f43",        unread: false }
  ];

  // Financials, activity feed, and bidder Q&A per sample project.
  var PROJECT_EXTRAS = {
    p01: {
      financials: {
        contracted: 10250000, paidToDate: 3690000, inEscrow: 512000,
        nextMilestone: { name: "Foundation complete", amount: 1230000, due: "Sep 12, 2026" }
      },
      activity: [
        { time: "Today 8:02 AM",  icon: "📋", text: "Valley Commercial Construction submitted a General Contractor bid" },
        { time: "Yesterday",      icon: "📄", text: "Redlands Civil Group uploaded Drainage Report v3" },
        { time: "Tue",            icon: "💬", text: "Redlands Architecture Workshop replied about the A-201 egress comment" },
        { time: "Mon",            icon: "✅", text: "County accepted the resubmitted site plan for review" },
        { time: "Last week",      icon: "💰", text: "Milestone payment released: Design development complete ($820,000)" }
      ],
      qa: [
        { q: "Is the owner open to a CM-at-risk delivery model instead of hard bid?", a: "Yes — include it as an alternate with your GMP assumptions broken out.", askedBy: "Bidding GC (anonymized)" },
        { q: "Who holds the builder's risk policy during construction?", a: "Owner-provided. Carry general liability and your subs' coverage only.", askedBy: "Bidding GC (anonymized)" },
        { q: "Can site work start before the full building permit issues?", a: "A grading-only permit is expected 6 weeks ahead of the building permit — early site packages are welcome.", askedBy: "Bidding GC (anonymized)" }
      ]
    },
    p02: {
      financials: {
        contracted: 29400000, paidToDate: 4410000, inEscrow: 1470000,
        nextMilestone: { name: "Entitlements approved", amount: 2205000, due: "Nov 3, 2026" }
      },
      activity: [
        { time: "Today 10:15 AM", icon: "🏛", text: "Variance pre-application meeting scheduled with City of Riverside Planning" },
        { time: "Yesterday",      icon: "💬", text: "Inland Land Use Law Group flagged the parking-ratio overlay hearing" },
        { time: "Wed",            icon: "📄", text: "Phase I environmental report uploaded to the vault" },
        { time: "Last week",      icon: "✅", text: "Golden State Title cleared the easement exception on parcel B" }
      ],
      qa: [
        { q: "Is prevailing wage triggered on this project?", a: "No public funds are involved — prevailing wage does not apply. Confirm with your labor counsel.", askedBy: "Bidding GC (anonymized)" },
        { q: "What is the expected podium type — Type I or Type III over concrete?", a: "Type III-A over a Type I-A podium. Structural basis of design is in the vault.", askedBy: "Bidding GC (anonymized)" }
      ]
    }
  };

  function firmById(id) {
    for (var i = 0; i < FIRMS.length; i++) { if (FIRMS[i].id === id) return FIRMS[i]; }
    return null;
  }
  function jurisdictionById(id) {
    for (var i = 0; i < JURISDICTIONS.length; i++) { if (JURISDICTIONS[i].id === id) return JURISDICTIONS[i]; }
    return null;
  }
  function projectById(id) {
    for (var i = 0; i < SAMPLE_PROJECTS.length; i++) { if (SAMPLE_PROJECTS[i].id === id) return SAMPLE_PROJECTS[i]; }
    return SAMPLE_PROJECTS[0];
  }
  function overallScore(scores) {
    return Math.round((scores.onTime + scores.onBudget + scores.responsiveness + scores.codeFluency) / 4);
  }

  // Confirmed collaboration count between two firm ids, or 0 if none on record.
  // Collaborators are stored one-directionally in the sample data, so check both ends.
  function collabCount(idA, idB) {
    var a = firmById(idA), b = firmById(idB);
    if (a && a.collaborators) {
      for (var i = 0; i < a.collaborators.length; i++) { if (a.collaborators[i].id === idB) return a.collaborators[i].count; }
    }
    if (b && b.collaborators) {
      for (var j = 0; j < b.collaborators.length; j++) { if (b.collaborators[j].id === idA) return b.collaborators[j].count; }
    }
    return 0;
  }

  return {
    JURISDICTIONS: JURISDICTIONS,
    PROPERTY_TYPES: PROPERTY_TYPES,
    PHASES: PHASES,
    SPECIALTIES: SPECIALTIES,
    ROLE_REQUIREMENTS: ROLE_REQUIREMENTS,
    FIRMS: FIRMS,
    SAMPLE_PROJECTS: SAMPLE_PROJECTS,
    PACKAGED_TEAMS: PACKAGED_TEAMS,
    firmById: firmById,
    jurisdictionById: jurisdictionById,
    projectById: projectById,
    overallScore: overallScore,
    collabCount: collabCount,
    reviewsForFirm: reviewsForFirm,
    ratingSummary: ratingSummary,
    CONVERSATIONS: CONVERSATIONS,
    NOTIFICATIONS: NOTIFICATIONS,
    PROJECT_EXTRAS: PROJECT_EXTRAS
  };
})();
