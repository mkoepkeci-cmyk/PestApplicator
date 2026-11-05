// Study content, aligned with the "Termite" Terry exam prep manual (page numbers in `pages`).
// Each topic has sections; each section has items. Items power the Learn pages AND the
// flashcards (front = name, back = hook + facts). Facts marked "(extra)" go beyond the manual.

export const TOPICS = [
  {
    id: 'chemicals',
    title: 'Chemical Families',
    emoji: '🧪',
    color: '#7b4fd6',
    intro:
      'Most names carry a clue in their ending. Learn the ending, and the family (and how it works) comes with it.',
    sections: [
      {
        title: 'Synthetic Organic Poisons',
        pages: '6',
        hook: 'Man-made, and they ALL contain carbon (molecules of hydrogen, oxygen and carbon). Three families: the "forever" ones, the "-phos" ones and the "-carb" ones.',
        items: [
          {
            name: 'Chlorinated Hydrocarbons',
            hook: '🥫 The leftovers that never go bad. Among the first synthetic insecticides, notorious for VERY long residual. Most no longer used in the U.S.',
            facts: [
              'Manual examples: Chlordane, DDT, Lindane, Methoxychlor',
              'Very effective, with very long residual properties',
              'Most are no longer used in the U.S.',
            ],
            members: ['Chlordane', 'DDT', 'Lindane', 'Methoxychlor'],
          },
          {
            name: 'Organophosphates (OPs)',
            hook: '📞 "-phos / -fos / -thion" = OP. Residual products. Poisoning looks like the flu plus tight muscles and tiny pupils.',
            facts: [
              'Manual examples: Chlorpyrifos (Dursban), Diazinon, Malathion, Propetamphos (Catalyst), DDVP (Dichlorvos)',
              'DDVP is still used today in "No-Pest" and "Nuvan" pest strips and in flea collars',
              'Poisoning symptoms: flu-like, muscle tightness, pupils contracting, breathing difficulty, tremors',
              'Antidote: avoid further exposure for a period of time and/or ATROPINE',
              'Most were taken off the market in the late 1990s',
            ],
            members: ['Chlorpyrifos (Dursban)', 'Diazinon', 'Malathion', 'Propetamphos (Catalyst)', 'DDVP (Dichlorvos)'],
          },
          {
            name: 'Carbamates',
            hook: '🚗 "-carb" = carbamate. Residual products with the SAME poisoning symptoms as organophosphates.',
            facts: [
              'Manual examples: Sevin (carbaryl), Baygon (propoxur)',
              'Poison symptoms are the same as organophosphates; antidote is atropine (extra)',
              'Most were taken off the market in the late 1990s',
              'Memory trick: Baygon and Sevin = "Bay-Seven" carbs',
            ],
            members: ['Sevin (carbaryl)', 'Baygon (propoxur)'],
          },
        ],
      },
      {
        title: 'Inorganic Poisons',
        pages: '6',
        hook: '🪨 "Mineral insecticides": some were mined from the ground. NO carbon. The most common pesticides before World War II.',
        items: [
          {
            name: 'Boron compounds (boric acid, borates)',
            hook: '🧂 Like a slow stomach ache. Insects eat it while grooming.',
            facts: [
              'Inorganic: no carbon in the molecule',
              'Boric acid dusts are almost entirely boric acid',
              'Slow-acting stomach poison; long-lasting if kept dry (extra)',
            ],
            members: ['Boric acid', 'Borates'],
          },
          {
            name: 'Silica & Diatomaceous earth',
            hook: '🏜️ Sandpaper + sponge. Scratches and soaks up the bug\'s waxy coat, so it dries out.',
            facts: [
              'Both are inorganic "mineral" insecticides',
              'Desiccants: damage the waxy outer layer and the insect dehydrates (extra)',
              'Diatomaceous earth = fossilized shells of tiny algae (extra)',
            ],
            members: ['Silica', 'Diatomaceous earth'],
          },
          {
            name: 'Arsenic, Lead, Mercury, Copper',
            hook: '☠️ The "old heavy metals." No longer used in pest control.',
            facts: ['Inorganic poisons that are no longer used in pest control'],
            members: ['Arsenic', 'Lead', 'Mercury', 'Copper'],
          },
        ],
      },
      {
        title: 'Botanicals',
        pages: '7',
        hook: '🌿 The spice rack and candle shop. Made from plants, VERY short residual, and "natural" does NOT always mean safe.',
        items: [
          {
            name: 'Pyrethrum',
            hook: '🌼 Extracted from chrysanthemum flowers. THE botanical everyone tests on.',
            facts: [
              'Extracted from chrysanthemum flowers',
              'Botanical: very short residual life',
              'Often boosted with the synergists PBO or MGK 264',
            ],
            members: ['Pyrethrum'],
          },
          {
            name: 'Rotenone',
            hook: '🐟 From plant roots. Famous as a fish poison (extra).',
            facts: ['Botanical (plant-derived) insecticide', 'Very toxic to fish (extra)'],
            members: ['Rotenone'],
          },
          {
            name: 'Nicotine',
            hook: '🚬 From tobacco. Natural, but HIGHLY toxic.',
            facts: ['Botanical, but the manual specifically warns that nicotine is highly toxic', 'Proof that "natural" doesn\'t mean safe'],
            members: ['Nicotine'],
          },
          {
            name: 'Orange oil',
            hook: '🍊 From orange peels. Used to spot-treat drywood termites (extra).',
            facts: ['Botanical plant oil (d-limonene)', 'Injected into drywood termite galleries (extra)'],
            members: ['Orange oil'],
          },
          {
            name: 'Rosemary, Peppermint, Wintergreen, Clove & Thyme oils',
            hook: '🕯️ Candle-shop smells. Memory trick: "a cup of herbal tea."',
            facts: ['Five botanical plant oils from the manual\'s list of nine', 'Very short residual'],
            members: ['Rosemary oil', 'Peppermint oil', 'Oil of wintergreen', 'Clove oil', 'Thyme oil'],
          },
        ],
      },
      {
        title: 'Pyrethroids',
        pages: '7',
        hook: '🔥 "-THRIN" = pyrethroid. SYNTHETIC copies with chemical similarities to pyrethrins. They are NOT made from flowers.',
        items: [
          {
            name: 'Pyrethroids',
            hook: '🤧 Poisoning looks like an ALLERGY (runny nose, itchy eyes, rash). Antidote: FRESH AIR. Residual: none to fair.',
            facts: [
              'Manual examples: Allethrin, Resmethrin, Permethrin, Cyfluthrin, Deltamethrin, Bifenthrin',
              'Synthetic organic compounds with chemical similarities to pyrethrins',
              'Residual properties: NONE TO FAIR (so "pyrethroids have long residual" = FALSE)',
              'Poisoning symptoms: allergy-like: runny nose, itchy eyes, skin rashes',
              'Antidote: fresh air',
              'Watch out: pyrethRUM is the botanical; pyrethROIDS are man-made',
              'Very toxic to fish. Keep out of drains and gutters (extra)',
            ],
            members: ['Allethrin', 'Resmethrin', 'Permethrin', 'Cyfluthrin', 'Deltamethrin', 'Bifenthrin'],
          },
        ],
      },
      {
        title: 'Non-Repellents',
        pages: '7',
        hook: '🥷 The ninjas: UNDETECTABLE and SLOW-acting. Social insects feed and groom each other, so it spreads through the whole colony. Good residual.',
        items: [
          {
            name: 'Fipronil (Termidor)',
            hook: '🥷 Disrupts the nervous system. Brand: "Termidor."',
            facts: ['Disrupts normal function of the nervous system', 'Found in Termidor', 'Can lead to complete colony elimination'],
            members: ['Fipronil (Termidor)'],
          },
          {
            name: 'Chlorfenapyr (Phantom)',
            hook: '🔋 Energy disrupter: drains the bug\'s battery. Brand: "Phantom" (it\'s invisible to bugs).',
            facts: ['Acts as an ENERGY disrupter', 'Common product: Phantom'],
            members: ['Chlorfenapyr (Phantom)'],
          },
          {
            name: 'Imidacloprid (Premise, Temprid)',
            hook: '🧠 Acts on the insect\'s nervous system. Brands: "Premise" and "Temprid."',
            facts: ['Acts on the nervous system', 'Found in Premise and Temprid', 'A neonicotinoid, a cousin of nicotine (extra)'],
            members: ['Imidacloprid (Premise)'],
          },
          {
            name: 'Chlorantraniliprole (Altriset)',
            hook: '🔒 "Lockjaw." Paralyzes the MOUTHS of termites. No hazard to people or pets when used as directed.',
            facts: ['Paralyzes the mouths of termites, so they stop feeding', 'Used as directed, no hazard to humans or domestic animals', 'Found in Altriset termiticide'],
            members: ['Chlorantraniliprole (Altriset)'],
          },
        ],
      },
      {
        title: 'Anti-coagulants (Rodenticides)',
        pages: '7',
        hook: '🩸 Rodent baits that cause INTERNAL BLEEDING. Antidote: VITAMIN K (not atropine!).',
        items: [
          {
            name: 'Warfarin',
            hook: '🥇 The original anticoagulant rat bait.',
            facts: ['Anticoagulant rodent bait', 'Antidote: Vitamin K', 'First generation: needs several feedings (extra)'],
            members: ['Warfarin'],
          },
          {
            name: 'Bromadiolone',
            hook: '🩸 "Brom" = BROken blood vessels.',
            facts: ['Anticoagulant rodent bait', 'Antidote: Vitamin K', 'Second generation: one feeding can kill (extra)'],
            members: ['Bromadiolone'],
          },
          {
            name: 'Brodifacoum',
            hook: '⚔️ "Brod" = BROADsword. One strong hit.',
            facts: ['Anticoagulant rodent bait', 'Antidote: Vitamin K', 'Second generation; risk to owls, hawks and pets that eat poisoned rodents (extra)'],
            members: ['Brodifacoum'],
          },
          {
            name: 'Diphacinone',
            hook: '🩸 "Dip" into the bait again and again.',
            facts: ['Anticoagulant rodent bait', 'Antidote: Vitamin K', 'First generation: needs several feedings (extra)'],
            members: ['Diphacinone'],
          },
        ],
      },
    ],
  },
  {
    id: 'formulations',
    title: 'Formulations',
    emoji: '🥛',
    color: '#1f8fbf',
    intro:
      'Formulation = how the poison is packaged. Think of the kitchen: does it dissolve like sugar, sink like cocoa, or float around like boba?',
    sections: [
      {
        title: 'Liquids & powders you mix with water',
        pages: '8–9',
        hook: 'The big question: does it DISSOLVE (no stirring) or just SUSPEND (keep stirring)?',
        items: [
          {
            name: 'Emulsifiable Concentrate (EC or E)',
            abbr: 'EC',
            food: '🥗 Salad dressing / mayo',
            hook: '🥗 Technical material + solvents + emulsifiers. Turns milky. The oil can damage surfaces, so TEST first.',
            facts: [
              'Made of technical material, solvents and emulsifiers; diluted in water to application strength',
              'SOME agitation required to keep it suspended',
              'Always test before applying: the oils or solvents may damage some surfaces',
              'Once dry, residues are usually barely visible',
            ],
          },
          {
            name: 'Wettable Powder (WP)',
            abbr: 'WP',
            food: '🍫 Cocoa powder in cold milk',
            hook: '🍫 Cocoa in cold milk: never dissolves, sinks when you stop stirring. Gritty: wears out PISTON and ROLLER pumps.',
            facts: [
              'Powder coated or impregnated with the insecticide, plus wetting and dispersing agents',
              'Does NOT dissolve in water: frequent agitation usually required',
              'Heavy applications may leave visible deposits',
              'Abrasive: may cause wear on piston and roller pumps; equipment needs frequent cleaning',
            ],
          },
          {
            name: 'Soluble Powder (SP)',
            abbr: 'SP',
            food: '🧃 Kool-Aid powder in water',
            hook: '🧃 Kool-Aid: looks like a WP in the bag, but DISSOLVES into a true solution. No frequent stirring.',
            facts: [
              'May look like a wettable powder, but dissolves and forms a true solution in water',
              'Deposits are less visible than wettable powders after drying',
              'Frequent agitation NOT required',
            ],
          },
          {
            name: 'Suspension Concentrate (SC)',
            abbr: 'SC',
            food: '🥤 Bottled chocolate milk',
            hook: '🥤 Pre-mixed chocolate milk: tiny particles already in liquid. Easy to mix, little or NO agitation, stable a long time.',
            facts: [
              'Small particles suspended in oil solvents or water',
              'Easy to mix; require little or no agitation; remain stable a long time',
              'Greatly reduced inhalation hazard compared with dusts or powders (it\'s a liquid)',
              'Label clue: "Termidor SC" = suspension concentrate',
            ],
          },
          {
            name: 'Flowable Liquid (F)',
            abbr: 'F',
            food: '🥛 Smoothie that stays blended',
            hook: '🥛 A smoothie: powder already blended into liquid that stays mixed a long time. Easy to pour, dilutes great.',
            facts: [
              'Concentrated water-dispersible powders in a liquid form',
              'Powders may stay suspended for a long time',
              'Easy to handle; excellent dilution properties',
            ],
          },
          {
            name: 'Microencapsulated (ME)',
            abbr: 'ME',
            food: '🧋 Boba pearls',
            hook: '🧋 Boba pearls: pesticide inside tiny capsules. Change the shell, change the residual, speed and odor.',
            facts: [
              'Liquid or solid pesticide particles inside microcapsules, suspended in liquid (similar to an SC)',
              'Changing the capsule membrane changes residual performance, speed of action and odor',
              'Can offer a longer residual than other products',
              'Like WPs, perform well on porous AND non-porous surfaces',
              'May clog sprayers and leave a visible residue',
              'Dangerous to bees: they carry capsules home like pollen (extra)',
            ],
          },
        ],
      },
      {
        title: 'Ready to use (no mixing)',
        pages: '9–10',
        hook: 'Open and apply.',
        items: [
          {
            name: 'Dusts (D)',
            abbr: 'D',
            food: '🍩 Powdered sugar',
            hook: '🍩 Powdered sugar: ready to use, lasts a long time if DRY, but DRIFT is a major problem.',
            facts: [
              'Ready-to-use: insecticide + a (usually inert) dust diluent',
              'Boric acid dusts are almost entirely boric acid',
              'Exceptional residual if kept dry',
              'Drift is a major problem',
              'Great in wall voids and under cabinets, out of children\'s reach',
            ],
          },
          {
            name: 'Granules (G)',
            abbr: 'G',
            food: '🍚 Rice / sprinkles',
            hook: '🍚 Rice grains: insecticide on a carrier like clay, corn cobs, pecan shells or sawdust. Water-activated, longer residual than most liquids.',
            facts: [
              'Inert carrier (clay, corn cobs, pecan shells, sawdust) coated or impregnated with insecticide',
              'Ready to use; great around the exterior perimeter for crawling insects',
              'Many are water-activated',
              'Residual is longer than most liquid formulations',
            ],
          },
          {
            name: 'Baits',
            abbr: 'B',
            food: '🍪 Cookie with a secret ingredient',
            hook: '🍪 A cookie with a secret ingredient: insecticide + attractive food (sometimes pheromones). Works best when there\'s little competing food.',
            facts: [
              'Insecticide + an attractive carrier/food the target prefers; pheromones added to some',
              'Forms: gels, granules, paste, pellets, powders or liquids',
              'Work best on insects that forage widely, where there is little competing food',
              'Place out of reach of children and pets',
            ],
          },
          {
            name: 'Fumigants',
            abbr: 'FUM',
            food: '🥓 The smell of bacon filling the house',
            hook: '🥓 Bacon smell: a poisonous GAS that fills every corner. Sulfuryl fluoride = structures; aluminum phosphide = gophers.',
            facts: [
              'Pesticides that form poisonous gases when applied',
              'Almost all structural fumigations use sulfuryl fluoride (Vikane, Zythor, Master Fume): packaged as a liquid under pressure, turns back to gas when released',
              'Methyl bromide was used for structures until the late 1990s; now only for commodities and shipping containers',
              'Aluminum phosphide: TABLETS or PELLETS (not liquid) that make phosphine gas when exposed to moisture',
              'Phosphine: mainly commodity fumigation, also burrowing pests (pocket gophers, moles, voles)',
            ],
          },
        ],
      },
      {
        title: 'Helpers',
        pages: '11',
        hook: 'Not the main poison, but they change how the job turns out.',
        items: [
          {
            name: 'Insect Growth Regulators (IGRs)',
            abbr: 'IGR',
            food: '🧚 Peter Pan: never grows up',
            hook: '🧚 Peter Pan: blocks development and MOLTING of IMMATURE insects. Long residual, low toxicity. Does NOT stop adults from laying eggs.',
            facts: [
              'Block normal development and molting of immature insects',
              'Long residual control; usually low toxicity',
              'Hydroprene (Gentrol): roaches, plus drain and fruit flies, bed bugs and stored-product pests',
              'Methoprene (Precor IGR, Precor 2000): very good for fleas',
              'Memory trick: Gentrol for Germans (roaches), Precor for Pets (fleas)',
            ],
          },
          {
            name: 'Synergists',
            abbr: 'SYN',
            food: '🧂 Salt that boosts flavor',
            hook: '🧂 Salt: makes everything else stronger. PBO and MGK 264, mostly with pyrethrums and pyrethroids.',
            facts: ['Chemical additives that make products more effective', 'Piperonyl butoxide (PBO)', 'MGK 264', 'Widely used with pyrethrums and pyrethroids'],
          },
        ],
      },
    ],
  },
  {
    id: 'toxicity',
    title: 'Toxicity & Signal Words',
    emoji: '☠️',
    color: '#c0392b',
    intro: 'LD50 works like a golf score: the LOWER the number, the MORE deadly the pesticide.',
    sections: [
      {
        title: 'LD50, LC50, acute vs. chronic',
        pages: '14',
        hook: 'D = DOSE (eaten or on the skin). C = CONCENTRATION (in the air or water).',
        items: [
          {
            name: 'LD50 (Lethal Dose 50)',
            hook: '⛳ Golf score: lower number = more toxic. The DOSE (mg/kg) that kills 50% of a large group of test animals.',
            facts: [
              'Lethal dose, in mg/kg, that kills 50% of a large population of test animals',
              'Can be expressed as oral or dermal, usually as single doses: acute oral, acute dermal, inhalation',
              'Acute oral = a single dose swallowed; acute dermal = a single dose absorbed by the skin',
              'LOWER LD50 = MORE TOXIC',
            ],
          },
          {
            name: 'LC50 (Lethal Concentration 50)',
            hook: '💨 The CONCENTRATION in AIR or WATER that kills 50%. Think breathing in.',
            facts: ['Lethal concentration in air or water that kills 50% of test animals', 'Used for inhalation exposure', 'NOT "the amount in the air" for LD50: that\'s LC50'],
          },
          {
            name: 'Acute toxicity',
            hook: '⚡ Acute = A single "ouch." Rapid response, often within minutes or hours.',
            facts: ['Rapid response to a SINGLE exposure or dose', 'Often within minutes or hours'],
          },
          {
            name: 'Chronic toxicity',
            hook: '🐢 Chronic = Constant over time. REPEATED sub-lethal doses.',
            facts: ['Repeated exposures over time to sub-lethal doses', 'Being exposed over time = CHRONIC, not acute'],
          },
        ],
      },
      {
        title: 'Signal words',
        pages: '14–16',
        hook: '🚦 THREE signal words, in large letters on the front panel, right after "KEEP OUT OF REACH OF CHILDREN."',
        items: [
          {
            name: 'DANGER (Category I)',
            hook: '💀 Highly toxic. LD50 0–50 mg/kg. "A taste to a teaspoon" can kill. Always with POISON in red + skull & crossbones.',
            facts: [
              'Category I, highly toxic',
              'LD50 = 0–50 mg/kg',
              'Lethal amount: a taste to a teaspoon',
              'Any product with DANGER is followed by the word POISON in red and a skull & crossbones',
            ],
          },
          {
            name: 'WARNING (Category II)',
            hook: '🟡 Moderately toxic. LD50 50–500 mg/kg. "A teaspoon to a tablespoon" can kill.',
            facts: ['Category II, moderately toxic', 'LD50 = 50–500 mg/kg', 'Lethal amount: a teaspoon to a tablespoon', 'NO skull & crossbones on WARNING labels'],
          },
          {
            name: 'CAUTION (Category III)',
            hook: '🟢 Slightly toxic. LD50 500–5,000 mg/kg. "An ounce to more than a pint" can kill.',
            facts: ['Category III, slightly toxic (NOT moderately, and NOT extremely dangerous)', 'LD50 = 500–5,000 mg/kg', 'Lethal amount: an ounce to more than a pint'],
          },
          {
            name: 'Signal word memory trick',
            hook: '🧂 Taste → Teaspoon → Tablespoon → Ounce → Pint. Each word moves one step down the measuring cups.',
            facts: ['DANGER: taste to a teaspoon', 'WARNING: teaspoon to tablespoon', 'CAUTION: ounce to more than a pint'],
          },
        ],
      },
    ],
  },
  {
    id: 'labels',
    title: 'Labels, Storage & Disposal',
    emoji: '🏷️',
    color: '#d68a1f',
    intro: '"Always read and follow all label directions." The label is a legal document: THE LABEL IS THE LAW.',
    sections: [
      {
        title: 'The 20 parts of a label',
        pages: '15',
        hook: '📜 Know where everything lives. Try the Label Explorer to tap them apart.',
        items: [
          {
            name: 'Front panel parts',
            hook: '🪧 Name, company, net contents, EPA numbers, ingredients, kid warning, signal word.',
            facts: [
              '1 Product name · 2 Company name & address · 3 Net contents',
              '4 EPA registration number · 5 EPA establishment number · 6 Ingredient statement',
              '7 Pounds/gallon statement (liquids) · 8 Child hazard warning · 9 Signal word',
              '10 Statement of practical treatment · 11 Referral statement ("see side panel")',
            ],
          },
          {
            name: 'Side/back panel parts',
            hook: '📋 Precautions, hazards, classification, misuse, re-entry, storage, directions.',
            facts: [
              '12 Side/back-panel precautionary statements · 13 Hazards to humans & domestic animals',
              '14 Environmental hazards · 15 Physical or chemical hazards',
              '16 Statement of pesticide classification · 17 Misuse statement',
              '18 Re-entry statement · 19 Storage & disposal block · 20 Directions for use',
            ],
          },
        ],
      },
      {
        title: 'What each part tells you',
        pages: '16–18',
        hook: '🔍 Match the question to the section of the label.',
        items: [
          {
            name: 'Product (brand/trade) name & type',
            hook: '🏪 Different companies sell the SAME active ingredient under their own brand names.',
            facts: [
              'Same active ingredient can come as a liquid, granule or dust with slightly different names. Read carefully',
              'Abbreviations tell you the formulation: "Termidor SC" = suspension concentrate; G = granule; D = dust',
              'Type statement tells you what pests it\'s for (e.g., "termiticide and general pest control")',
            ],
          },
          {
            name: 'Net contents',
            hook: '⚖️ HOW MUCH is in the container. Not the % active ingredient.',
            facts: ['Dry: ounces or pounds. Liquid: ounces, pints, quarts or gallons', 'Liquids may also list pounds of active ingredient per gallon'],
          },
          {
            name: 'EPA Registration vs. Establishment No.',
            hook: '🪪 Registration = EPA registered the label. Establishment = WHERE it was made.',
            facts: ['The registration number does NOT tell you where it was made. The establishment number does'],
          },
          {
            name: 'Precautionary statement',
            hook: '🛡️ How to protect applicators, people and animals. Also called "Hazards to Humans and Domestic Animals."',
            facts: ['Warns about potential hazards to humans and animals'],
          },
          {
            name: 'Statement of Practical Treatment',
            hook: '🚑 FIRST AID. Not how much to use, not re-entry.',
            facts: [
              'Skin/clothing: remove contaminated clothing, wash with soap and water, call poison control or a doctor',
              'Eyes: flush with water for 15 minutes and get medical attention',
              'Inhaled: move to fresh air; not breathing → call 911, then artificial respiration',
              'Swallowed: call poison control or doctor; do NOT induce vomiting; give no liquids; nothing by mouth if unconscious',
              'All DANGER labels (and some WARNING/CAUTION) have a "note to physician" section, sometimes with an antidote',
            ],
          },
          {
            name: 'Environmental & Physical/Chemical hazards',
            hook: '🌎 Environmental = harm to nature. 🔥 Physical/Chemical = fire, explosion, corrosion.',
            facts: ['Watch for RESTRICTED-USE products classified that way because of environmental hazards', 'Physical/chemical examples: "Flammable! Keep from heat or open flame", "Corrosive! Store in a corrosion-resistant container"'],
          },
          {
            name: 'Classification: General vs. Restricted Use',
            hook: '🔐 EPA classifies EVERY pesticide as General Use or Restricted Use. RUP statement goes at the TOP of the front panel.',
            facts: [
              'RUP statement: for retail sale to and use only by certified applicators or persons under their direct supervision, and only for uses covered by their certification',
              'The public can NOT buy an RUP just by filling out a form',
            ],
          },
          {
            name: 'Re-entry statement',
            hook: '🚪 How long before people can go back in WITHOUT protective clothing. Ignoring it is ILLEGAL.',
            facts: ['Found on some DANGER or WARNING labels', 'It is illegal to ignore re-entry intervals'],
          },
          {
            name: 'Directions for use',
            hook: '📋 The recipe: what pests, what site, how, what equipment, how much, when and where.',
            facts: [
              'Pests controlled; crop, animal or site protected',
              'How to apply, equipment to use, how much, mixing directions',
              'Compatibility with other products; phytotoxicity, injury or staining problems',
              'Where and when to apply',
            ],
          },
        ],
      },
      {
        title: 'Conflicts of labeling (CA Section 6000)',
        pages: '18',
        hook: '⚖️ Going off-label is illegal, EXCEPT these 7 allowed deviations. Most are "LESS" or "not prohibited."',
        items: [
          {
            name: 'The 7 allowed deviations',
            hook: '🧮 Less concentrated, less rate, less often, unlisted pest, other method, mix it, more (only if UC recommends).',
            facts: [
              '1 A DECREASE in concentration of the mix (unless the label prohibits it)',
              '2 A DECREASE in dosage rate per unit treated (unless the label prohibits it)',
              '3 Applying LESS OFTEN than specified',
              '4 Treating a pest NOT listed, if the site IS on the label and it\'s not prohibited',
              '5 Any application method NOT prohibited, following other directions',
              '6 Mixing with another pesticide or fertilizer, unless prohibited',
              '7 An INCREASE in concentration ONLY if it matches current University of California published recommendations',
            ],
          },
        ],
      },
      {
        title: 'Storage & disposal',
        pages: '17',
        hook: '♻️ On EVERY label. Original container, secure and dry. Triple rinse empties.',
        items: [
          {
            name: 'Storage',
            hook: '🔒 Original container, secured dry area, no temperature extremes.',
            facts: ['Store in the original container in a secured, dry storage area', 'Avoid extremes in temperature'],
          },
          {
            name: 'Triple rinse (non-refillable containers)',
            hook: '3️⃣ Drain 10 sec → fill ¼ with water → cap → shake 10 sec → pour into tank. Do it 3 times.',
            facts: [
              'Empty remaining contents into application equipment or mix tank; drain 10 seconds',
              'Fill the container ¼ full with water and recap; shake 10 seconds',
              'Pour the rinsate into the application equipment or mix tank',
              'Repeat two more times',
              'Recycle if available; otherwise puncture and dispose in a sanitary landfill or by incineration',
              'Partly full container? Call the local solid waste agency',
              'Never reuse or refill the container',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety Equipment',
    emoji: '🦺',
    color: '#2f8f4e',
    intro: 'Protect every route of entry: DERMAL (the #1 way applicators are exposed), oral, inhalation, eyes and head.',
    sections: [
      {
        title: 'How to protect yourself',
        pages: '24',
        hook: '🧤 Dermal is the MOST COMMON exposure route for applicators.',
        items: [
          {
            name: 'Dermal (skin)',
            hook: '🧤 RUBBER, UNLINED gloves. Water-resistant boots. California requires long sleeves, long pants and socks.',
            facts: [
              'Gloves must be rubber and UNLINED; wash them after use',
              'Boots must be water resistant. No sandals or sneakers!',
              'Coveralls (follow Cal-OSHA requirements)',
              'Long-sleeve shirts are required by California code; long pants with socks',
              'ALWAYS carry a spare uniform or coveralls in case of a spill',
            ],
          },
          {
            name: 'Oral (mouth)',
            hook: '🍔 Wash hands before eating, smoking or touching your face. Proper containers only.',
            facts: [
              'Store in the original container or a properly labeled service container. Never unmarked',
              'Wash hands after handling pesticides and before eating, smoking or touching yourself',
              'Never pour products on the ground, driveways, sidewalks, streets or gutters: runoff pollutes water',
            ],
          },
          {
            name: 'Inhalation: respirators',
            hook: '😷 NIOSH-approved, when needed or required by the label. Fit-test it, bag it, store it AWAY from pesticides.',
            facts: [
              'Wear NIOSH-approved respiratory protection when needed and/or required by the label (not always required)',
              'Respirators remove solid and liquid particles from the air you breathe',
              'Fit test: positive AND negative air pressure tests to make sure it\'s sealed',
              'Leak test with banana oil or saccharin',
              'Store in tightly sealed plastic bags in a SEPARATE compartment, away from insecticides (NOT in the pesticide storage area)',
              'Wash in warm soapy water with a brush or sponge; replace cartridges as required by law',
            ],
          },
          {
            name: 'Eyes',
            hook: '🥽 Safety glasses need FRONTAL, BROW and TEMPLE protection. Reading glasses and sunglasses don\'t count.',
            facts: ['Always wear eye protection when handling or applying pesticides', 'Goggles protect from all angles and fit over eyeglasses', 'Face shields add splash protection for eyes and face'],
          },
          {
            name: 'Head',
            hook: '🧢 A cloth hat is OK if washed regularly. Hard hats protect against head injuries.',
            facts: ['Cloth hats must be washed on a regular basis', 'Wear hard hats to protect against head injuries'],
          },
        ],
      },
      {
        title: 'Storage, tanks & containers',
        pages: '25',
        hook: '🔒 Locked, posted and labeled, on the truck and at the shop.',
        items: [
          {
            name: 'Pesticide storage areas',
            hook: '🪧 "DANGER, KEEP OUT" sign readable at 25 FEET. Locked. Nothing in the truck cab, ever.',
            facts: [
              'Post a sign that says "Danger, Keep Out," readable at 25 feet',
              'Storage areas must be kept locked',
              'Truck storage boxes must be posted and LOCKED when unattended (even at the job site)',
              'No pesticides in the truck cab, not even factory-sealed ones',
            ],
          },
          {
            name: 'Spray tanks',
            hook: '🛢️ Lock on the fill hole, service container label on the tank, air-gap filler on EVERY tank.',
            facts: [
              'Fill hole cover must have a lock (locked unless you are treating)',
              'Tank must have a service container label',
              'Must have an air-gap filling device to prevent siphoning (all spray tanks)',
            ],
          },
          {
            name: 'Service container labels',
            hook: '🏷️ 5 things: Name, EPA No., Active ingredient, Signal word, Firm\'s name/address/phone. "NEAS-F."',
            facts: [
              '1 Name of pesticide',
              '2 EPA registration number',
              '3 Active ingredient',
              '4 Signal word',
              '5 Name, address and phone number of the firm responsible for the container',
            ],
          },
        ],
      },
      {
        title: 'Safety materials & spills',
        pages: '25',
        hook: '🧰 What rides on the truck, and what to do when it spills.',
        items: [
          {
            name: 'Safety materials on your truck',
            hook: '🩹 First aid kit, soap, towels, water & eyewash (if water isn\'t within 100 FEET).',
            facts: ['1 First aid kit', '2 Soap', '3 Towels', '4 Water (if not available within 100 feet)', '5 Eye wash or water (if not available within 100 feet)'],
          },
          {
            name: 'Spill kit',
            hook: '🧯 Absorbent, heavy-duty bags, broom & dustpan, caution tape. NEVER wash a spill down with water.',
            facts: [
              'Absorbent: cat litter, sawdust, sweeping compound, paper towels. Contain the spill and stop it spreading',
              'Collect into a heavy-duty trash bag (small amounts can go in household trash)',
              'Broom and dust pan; caution tape to keep people and pets out',
              'Don\'t wash spills down with water, not even on a driveway or street',
              'Spill over ONE GALLON → notify the County Agricultural Commissioner',
              'Any death or injury → notify the Structural Pest Control Board',
            ],
          },
        ],
      },
      {
        title: 'Other safety items',
        pages: '25–26',
        hook: '⚡ Electricity, ladders, light and noise.',
        items: [
          {
            name: 'Ground Fault Interrupters (GFI)',
            hook: '⚡ The BEST way to prevent electrical shock. Cuts power in a fraction of a second, even for a tiny short.',
            facts: ['Shuts off current in a fraction of a second if there is even a tiny short circuit'],
          },
          {
            name: 'Electric drill stoppers',
            hook: '🛑 Cuts the power if the drill bit touches a GROUNDED object like a pipe or conduit. Test it on a hose bib first.',
            facts: [
              'Use whenever you might strike a buried object: radiant heat pipe, water pipe, gas pipe, electrical conduit',
              'If the bit strikes a grounded object, the device shuts off the electric current',
              'Must be connected to a grounded circuit with a 3-prong plug',
              'Test before the job: run the drill and gently touch a metal object (like a hose bib). It should stop immediately',
            ],
          },
          {
            name: 'Three-prong plugs',
            hook: '🔌 Never break off the 3rd prong. Use a proper 3-prong adaptor, or the circuit may ground through YOU.',
            facts: ['The 3rd prong grounds the circuit', 'Two-hole outlet? Use a 3-prong adaptor', 'Ungrounded circuits can ground themselves through your body, which can be fatal'],
          },
          {
            name: 'Ladders',
            hook: '🪜 Right length, right weight rating, level and firm, secure the feet, 3 FEET above the roof edge.',
            facts: ['Select the correct length and weight capacity', 'Set it level on a firm foundation', 'Secure the bottom on slippery floors so it won\'t "kick out"', 'Extend 3 feet above the edge of the roof', 'Base 1 foot out per 4 feet of height (extra)'],
          },
          {
            name: 'Flashlights',
            hook: '🔦 Maybe your MOST important tool. Heavy-duty rechargeable, a backup, and a belt holder.',
            facts: ['Use a high-quality rechargeable light (keep a car charger)', 'Always carry a heavy-duty backup', 'A belt holder keeps you from losing it or dropping it through a ceiling'],
          },
          {
            name: 'Ear plugs',
            hook: '👂 Hearing loss is gradual and permanent. Wear plugs around loud tools like a roto-hammer.',
            facts: ['Once hearing is gone, it doesn\'t come back'],
          },
        ],
      },
    ],
  },
  {
    id: 'equipment',
    title: 'Application Equipment',
    emoji: '🔧',
    color: '#5b6b7a',
    intro: 'From a hand-pumped B&G to a truck rig. Know what each part does and the numbers behind it.',
    sections: [
      {
        title: 'Hand-powered applicators',
        pages: '29',
        hook: '💪 You are the motor.',
        items: [
          {
            name: 'B&G hand compressed sprayer',
            hook: '🥫 The industry standard. Stainless steel tank, solid BRASS pump/handle/wand. Best for SMALLER jobs.',
            facts: [
              'Sizes: ½, 1, 2, 3 gallon and 5 liter',
              'Many wand lengths, hand valves and application tips',
              'Stainless steel tank; solid brass pump, handle and wand. Can last a lifetime',
              'Exact placement prevents waste',
              'Best for smaller jobs (you don\'t want to keep refilling)',
            ],
          },
          {
            name: 'Birchmeier backpack sprayer',
            hook: '🎒 Heavy-duty, LIGHTWEIGHT PLASTIC. 2, 4 and 5 gallon. Larger jobs, hands free, fewer refills.',
            facts: ['Made of heavy-duty, lightweight plastic', 'Sizes: 2, 4 and 5 gallon', 'Popular for larger jobs; weight on your back, both hands free', 'Easy to maintain'],
          },
        ],
      },
      {
        title: 'Granular applicators & spreaders',
        pages: '29',
        hook: '🌱 Precise placement vs. broadcast. Either way: keep granules OFF hard surfaces.',
        items: [
          {
            name: 'Gordon\'s Spread-Rite',
            hook: '🎯 Hand-held, GRAVITY flow, adjustable. For PRECISE placement.',
            facts: ['Hand-held granule applicator; gravity flow with adjustable flow rate', 'Never leave or apply granules on concrete patios, walkways or driveways'],
          },
          {
            name: 'Hand-operated rotary applicators',
            hook: '🌀 Broadcast over LARGER areas (about 5 lb hand-held). NOT for exact placement.',
            facts: [
              'Hand-held models hold about 5 pounds; backpack or push types for bigger jobs',
              'Keep granules away from fish ponds, swimming pools, spas and fruit or vegetable gardens',
              'Sweep up granules on patios, sidewalks and driveways. They don\'t work there and can wash into storm drains',
            ],
          },
        ],
      },
      {
        title: 'Aerosols, foggers & dusters',
        pages: '29–30',
        hook: '🌫️ Small, precise tools, and most aerosols are FLAMMABLE.',
        items: [
          {
            name: 'Aerosol cans & foggers',
            hook: '🔥 Many use butane or propane propellant. Keep away from open flames.',
            facts: ['Variety of sizes and products', 'Some disposable, some refillable', 'Precise applications with special nozzles and tips', 'Flammable propellants (butane, propane): avoid open flames'],
          },
          {
            name: 'Bellows (Getz) duster',
            hook: '🪗 Holds about 4 OUNCES. Squeeze it. Small voids, cracks and crevices.',
            facts: ['Rubber body, metal caps, spring inside', 'Holds about 4 ounces of dust'],
          },
          {
            name: 'Bulb duster',
            hook: '🎈 All-rubber bulb. Squeeze it. Great for small voids, cracks and crevices.',
            facts: ['Similar to a bellows duster but bulb/balloon shaped', 'Leave room for air when filling (extra)'],
          },
          {
            name: 'Plunger (quart) duster',
            hook: '💉 About a QUART. Pull the rod out, push it in fast.',
            facts: ['Much larger capacity for larger areas'],
          },
          {
            name: 'Electric power duster',
            hook: '🌪️ A "reversed vacuum cleaner." Best for big jobs like ATTICS and SUBAREAS.',
            facts: ['Blows dust out of the hose instead of sucking it in', 'Fast and simple for large applications'],
          },
        ],
      },
      {
        title: 'Power sprayers',
        pages: '30–31',
        hook: '🚚 Less common since the late 1990s (backpacks took over); today mainly for SUBTERRANEAN TERMITE treatments.',
        items: [
          {
            name: 'Tank',
            hook: '🛢️ Polyethylene, 10–100+ gallons. 50 GALLONS or more needs a SIGHT GAUGE. Drive with it nearly EMPTY.',
            facts: ['Modern tanks are polyethylene, 10 to 100 gallons or more', 'Tanks holding 50 gallons or more must have a sight gauge for liquid level', 'Mix only what you need; never drive around with a full tank (spill risk)'],
          },
          {
            name: 'Engine / power',
            hook: '🔋 Old standard: 3–7 hp gas engines. Now: 12-VOLT electric pumps.',
            facts: ['Most companies switched to 12-volt pumps on the truck\'s electrical system or a portable battery', 'Gas engines now mainly for huge jobs like golf courses or football fields'],
          },
          {
            name: 'Hoses',
            hook: '🐍 3/8" hose: max 100 FT. ½" hose: max 250 FT.',
            facts: [
              'Inspect regularly: a worn hose can burst, injure people and contaminate the site',
              'Roll up after use; avoid kinks and pinches; don\'t mark or damage the customer\'s property',
              'Most pest control hoses are 3/8 inch ID, no longer than 100 feet (at 4 gpm, a 3/8" hose loses 80 psi per 100 ft)',
              '½ inch hoses should not exceed 250 feet',
            ],
          },
          {
            name: 'Nozzles',
            hook: '🔫 "J" gun for landscape. Sub-slab injectors & trenching rods for subterranean termites.',
            facts: ['A spray gun ("J" gun) adjusts for fan, stream or coarse spray', 'Sub-slab injectors and trenching rods are most common for subterranean termites'],
          },
          {
            name: 'Pressure regulator',
            hook: '🎚️ CONTROLS pressure (and indirectly volume). Excess goes back to the tank. Keep it at 25–30 PSI.',
            facts: [
              'Adjust the regulator to change pressure output',
              'A bypass line on the pressure side of the pump returns excess fluid to the tank',
              'Keep pressure between 25 and 30 psi for most applications; high pressure damages hoses, pumps and seals',
              'The regulator does NOT tell you the pressure. The gauge does',
            ],
          },
          {
            name: 'Pressure gauge',
            hook: '⏲️ SHOWS you the pressure. Check it often; replace it if it\'s bad.',
            facts: ['Check frequently so you know exactly how much pressure you\'re using', 'Replace defective gauges'],
          },
          {
            name: 'Surge tank',
            hook: '🫁 Small AIR chamber between the pump and control valve. Cushions piston-pump pulses.',
            facts: ['Installed in the pressure/discharge line between the pump and control valve', 'Cushions pulse peaks for an even flow at the nozzle', 'Without one, a piston pump makes the hose pulsate'],
          },
          {
            name: 'Strainers & filters',
            hook: '🫖 Keep dirt out of the pump and nozzles. Clean them REGULARLY (not once a year).',
            facts: ['Protect sprayer parts from wear; prevent clogged nozzles', 'Clean regularly; replace if damaged or deteriorated'],
          },
          {
            name: 'Flow meters',
            hook: '📏 SHOW flow rate (gpm) and how much you used. They don\'t adjust anything.',
            facts: ['Display rate of flow and total amount of chemical applied'],
          },
        ],
      },
      {
        title: 'Agitators',
        pages: '31',
        hook: '🥄 Three kinds: Mechanical, By-pass and Hydraulic (jet). Keep the mix from separating.',
        items: [
          {
            name: 'Mechanical agitation',
            hook: '🥄 Flat blades/impellers in the tank bottom, power-driven. BEST for wettable powders.',
            facts: ['Works especially well with wettable powders', 'With WPs, leave the agitator running during the application'],
          },
          {
            name: 'By-pass agitation',
            hook: '↩️ Uses the fluid returning from the pressure relief valve. Enough for EMULSIONS and SUSPENDED CONCENTRATES.',
            facts: ['Returning fluid from the relief valve stirs the tank'],
          },
          {
            name: 'Hydraulic (jet) agitation',
            hook: '🛁 Jet nozzles in the tank bottom, fed from the pressure side of the pump. Like a hot tub.',
            facts: ['High-pressure surplus flow from the pump', 'Some rigs have a switch for a separate agitation pump'],
          },
        ],
      },
      {
        title: 'Pumps',
        pages: '30–31',
        hook: '⚙️ Diaphragm = most common. Roller = cheap, no WPs. Piston = durable, needs surge tank. Centrifugal = rarely used.',
        items: [
          {
            name: 'Diaphragm pump',
            hook: '🫀 MOST COMMON in pest control. Low pressure (10–100 psi), low volume (3–10 gpm), mostly 12-volt.',
            facts: ['10–100 psi, 3–10 gpm', 'Most are 12-volt electric; easy to use, low maintenance'],
          },
          {
            name: 'Roller pump',
            hook: '🛼 Inexpensive. 8–30 gpm at 10–300 psi. WPs wear out the rollers. Best for emulsions and soluble powders.',
            facts: ['Moderate volume (8–30 gpm), low-to-moderate pressure (10–300 psi)', 'Wettable powders wear rollers rapidly', 'Best for emulsions, soluble powders and other non-abrasive formulations'],
          },
          {
            name: 'Piston pump',
            hook: '🚂 Expensive, MOST DURABLE. 2–25 gpm at 20–600 psi. Handles WPs. Pulses, so add a SURGE TANK.',
            facts: ['Medium volume (2–25 gpm), low to high pressure (20–600 psi)', 'Handles many pesticides, including wettable powders', 'Pulsating action can damage gauges, valves and fittings; install a surge tank'],
          },
          {
            name: 'Centrifugal pump',
            hook: '🌀 Spinning impeller, no metal-to-metal contact. Pool-draining pump. Mainly ag work, RARELY pest control.',
            facts: ['Impeller spins like a fan to move fluid', 'Long-lasting; handles many materials', 'Used for draining pools or flood water; mainly agriculture'],
          },
        ],
      },
    ],
  },
  {
    id: 'ipm',
    title: 'Applications, IPM & Schools',
    emoji: '🏫',
    color: '#c2477e',
    intro: 'Inspect first, fix conditions second, pesticides THIRD. Never spray first.',
    sections: [
      {
        title: 'Types of applications',
        pages: '22',
        hook: '🎯 Area (broadcast or spot), crack & crevice, void, space.',
        items: [
          {
            name: 'Area applications',
            hook: '🗺️ General/broadcast with a sprayer, or SPOT treatment of 2 SQUARE FEET or less.',
            facts: ['General or broadcast application with a manual or power sprayer', 'Spot treatment: an area of 2 square feet or less where insects are likely'],
          },
          {
            name: 'Crack & crevice treatment',
            hook: '🔍 Small amounts into cracks where insects hide or get in.',
            facts: ['Small amounts of insecticide into cracks and crevices'],
          },
          {
            name: 'Void treatment',
            hook: '🧱 Wall voids, false cabinet bottoms, ceilings. FOAMS and DUSTS work best.',
            facts: ['Areas like wall voids, false bottoms of kitchen cabinets, ceilings'],
          },
          {
            name: 'Space treatment',
            hook: '🌫️ Fogs or mists in small rooms and closets.',
            facts: ['Very fine droplets of liquid pesticide', 'Foggers, misters, aerosol generators or aerosol cans'],
          },
        ],
      },
      {
        title: 'Amounts & drift',
        pages: '23',
        hook: '📏 The label sets dilution and rate. Keep it on target.',
        items: [
          {
            name: 'Dilution & rate of application',
            hook: '🧪 Dilution = how to MIX it. Rate = how much over an AREA. Both come from the label.',
            facts: ['Always measure and mix exactly as the label says'],
          },
          {
            name: 'Reducing drift',
            hook: '💨 Drift = pesticide moving through the air to a non-target area. Wind over 10 MPH? Don\'t spray.',
            facts: ['Avoid applying when wind exceeds 10 mph', 'Reduce hose pressure; adjust nozzles for a coarser spray', 'Hold the nozzle closer to the target'],
          },
        ],
      },
      {
        title: 'Integrated Pest Management (IPM)',
        pages: '22',
        hook: '🕵️ 1 Inspect & identify → 2 Fix conditions → 3 Pesticide only if needed → 4 Monitor & evaluate.',
        items: [
          {
            name: 'Step 1: Inspect & identify',
            hook: '🔍 Identify the pest, learn its habits, and find where it gets in.',
            facts: ['Example: miss the ant nest in a flower pot and you can spray for years without solving it'],
          },
          {
            name: 'Step 2: Why are they here? Fix it',
            hook: '🧹 Sanitation first. Fix earth-to-wood contact, grade, moisture, cracks, bare wood.',
            facts: ['Make the area less attractive: sanitation, moisture, faulty grade, cracks, caulk and paint'],
          },
          {
            name: 'Step 3: Pesticides only when necessary',
            hook: '🧪 THIRD step, never first. Least-toxic product, least amount possible.',
            facts: ['IPM does NOT require pesticides on every treatment'],
          },
          {
            name: 'Step 4: Monitor & evaluate',
            hook: '📈 Follow-up inspections. Sticky traps; remove old drywood pellets and mud tubes to check results.',
            facts: ['Sticky traps (insect monitors) show if problems remain'],
          },
        ],
      },
      {
        title: 'Healthy Schools Act of California',
        pages: '23',
        hook: '🏫 K-12 public schools + public AND private day care. IPM required, pesticides last resort.',
        items: [
          {
            name: 'Who it covers & what it requires',
            hook: '🧒 K-12 public schools and public & private day care. IPM is required. Only the safest products.',
            facts: ['Covers K-12 public schools and public and private day care facilities', 'Requires integrated pest management (IPM)', 'Insecticide only as a last resort', 'Only the safest products may be used'],
          },
          {
            name: 'Notification',
            hook: '📅 List of approved products at the START of the school year. Non-approved product? Notify parents & post signs 72 HOURS ahead.',
            facts: [
              'Parents and staff get a list of approved products at the beginning of the school year',
              'Must notify parents and post signs 72 hours in advance before using non-approved products',
              'Advance notice is NOT required in emergencies',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'bugs',
    title: 'Bugs 101 (Entomology)',
    emoji: '🐜',
    color: '#8a6d1f',
    intro: 'Count the parts: body sections, legs, antennae, eyes, wings. The numbers tell you what group it\'s in.',
    sections: [
      {
        title: 'Arthropods',
        pages: '34',
        hook: '🦞 Insects, arachnids, centipedes, millipedes and crustaceans. Exoskeleton, jointed legs, segmented body. Most breathe through SPIRACLES.',
        items: [
          {
            name: 'Insects',
            hook: '🐜 3-3-1: THREE body parts, THREE pairs of legs, ONE pair of antennae.',
            facts: [
              'Body parts: head, thorax, abdomen',
              'Adults have 3 pairs of legs (many larvae have NO legs)',
              'One pair of antennae',
              'Most adults have 2 compound eyes, plus 1, 2 or 3 simple eyes between them',
              'Many winged species have 2 pairs of wings; flies and mosquitoes have only 1 pair',
              'No wings: bed bugs, silverfish, lice',
            ],
          },
          {
            name: 'Arachnids (spiders, mites, ticks, scorpions)',
            hook: '🕷️ 2-4-0: TWO body parts, FOUR pairs of legs, ZERO antennae or wings. Only simple eyes.',
            facts: [
              'Spiders: cephalothorax (head + thorax fused) and abdomen',
              'Mites: gnathosoma (mouthparts only) and idiosoma (the rest)',
              '4 pairs of legs, BUT immature ticks and mites have only 3 pairs',
              'Only simple eyes (no compound eyes); no wings, no antennae',
            ],
          },
          {
            name: 'Centipedes & millipedes',
            hook: '🐛 Worm-like, no wings. Centi = 1 pair per segment. Milli = 2 pairs per segment.',
            facts: ['Centipedes: one pair of legs per body segment', 'Millipedes: two pairs of legs per body segment', 'Centipedes can\'t fly (no wings)'],
          },
          {
            name: 'Crustaceans (pillbugs & sowbugs)',
            hook: '🦐 7 plates, 7 pairs of legs, breathe with GILLS. PILLbugs roll into a PILL; sowbugs can\'t.',
            facts: ['Small head and abdomen; large thorax with 7 overlapping plates', '7 pairs of legs (the last pair appears after the first molt)', 'Breathe through gills', 'One pair of antennae (per manual)', 'Pillbugs roll into a ball; sowbugs can\'t roll into a tight ball'],
          },
        ],
      },
      {
        title: 'Mouthparts',
        pages: '36',
        hook: '🍽️ Know the mouth, know the food, know where to look.',
        items: [
          {
            name: 'Chewing',
            hook: '🦷 Most primitive. Solid food: BEETLES, COCKROACHES, TERMITES.',
            facts: ['Insects that feed on solid food'],
          },
          {
            name: 'Rasping-sucking',
            hook: '🔪 Scrape the plant until sap flows. THRIPS ONLY.',
            facts: ['Thrips are the only insects with this mouthpart'],
          },
          {
            name: 'Piercing-sucking',
            hook: '💉 A needle into skin or plant: MOSQUITOES, BITING FLIES, FLEAS, LICE.',
            facts: ['Pierce skin or plant tissue and suck blood or sap'],
          },
          {
            name: 'Sponging',
            hook: '🧽 Mop up exposed liquids: HOUSE FLIES, BLOW FLIES, FRUIT FLIES.',
            facts: ['Feed on exposed liquids'],
          },
          {
            name: 'Siphoning',
            hook: '🥤 A long straw for nectar: MOTHS and BUTTERFLIES.',
            facts: ['Long slender tube sucks up nectar or water'],
          },
          {
            name: 'Chewing-lapping',
            hook: '👅 Chew solids AND lap nectar: some BEES and WASPS.',
            facts: ['Combination of chewing and sucking up liquids'],
          },
        ],
      },
      {
        title: 'Metamorphosis',
        pages: '36',
        hook: '🦋 How an egg becomes an adult. Four types.',
        items: [
          {
            name: 'Gradual',
            hook: '📈 Egg → Nymph → Adult. Babies look like small adults. Roaches, TERMITES, grasshoppers, BED BUGS, earwigs.',
            facts: ['3 stages: egg, nymph, adult', 'Nymphs resemble adults, live the same way, eat the same food', 'Change gradually through several molts (instars)'],
          },
          {
            name: 'Incomplete',
            hook: '💧 Egg → Naiad (in WATER) → flying adult. Dragonflies, damselflies, mayflies.',
            facts: ['Young (naiads) look and live completely differently: in water', 'Adults live on land and fly'],
          },
          {
            name: 'Complete',
            hook: '🦋 Egg → Larva → Pupa → Adult. Ants, bees, beetles, butterflies, FLEAS, flies, moths, wasps.',
            facts: ['4 stages', 'Young look completely different, live in different places and eat different food'],
          },
          {
            name: 'Without metamorphosis',
            hook: '📏 Babies are just smaller adults. Silverfish, firebrats, booklice.',
            facts: ['Grow by molting, but every stage looks the same', 'Young and adults share habits and food'],
          },
        ],
      },
      {
        title: 'Termite basics',
        pages: '40',
        hook: '🪵 Order ISOPTERA: "iso" = equal, "ptera" = wings. Two pairs of EQUAL-length wings.',
        items: [
          {
            name: 'Termites are true insects',
            hook: '🐜 3 body parts, 3 pairs of jointed legs, 1 pair of segmented antennae, 2 pairs of equal wings.',
            facts: ['About 4,000 species worldwide (about 2,600 known); about 10% are economically significant', 'Roughly 45–50 native species in the U.S.'],
          },
          {
            name: 'California\'s 4 key termites',
            hook: '🌴 Drywood, Western Subterranean, Dampwood, Formosan.',
            facts: [
              'Drywood: Incisitermes minor',
              'Western subterranean: Reticulitermes hesperus',
              'Dampwood: Zootermopsis angusticollis',
              'Formosan: Coptotermes formosanus',
            ],
          },
          {
            name: 'Termite vs. ant swarmers',
            hook: '📿 Termite antennae: BEADS on a wire, sticking STRAIGHT out. Ant antennae: ELBOWED (30–90° bend).',
            facts: ['Key structures: head (antennae, eyes, mouthparts), thorax (wings, legs, spiracles), abdomen (spiracles, cerci)'],
          },
        ],
      },
    ],
  },
]

export const topicById = (id) => TOPICS.find((t) => t.id === id)

// Every named chemical with its family, e.g. { m: 'Permethrin', fam: 'Pyrethroids' }
export function chemicalMembers() {
  const out = []
  for (const s of topicById('chemicals').sections) {
    for (const it of s.items) {
      if (!it.members) continue
      const fam = (s.title === 'Synthetic Organic Poisons' ? it.name : s.title).replace(/ \(.*\)/, '')
      for (const m of it.members) out.push({ m, fam })
    }
  }
  return out
}

// Flat list of flashcards for a topic (or all topics)
export function flashcardsFor(topicId) {
  const topics = topicId === 'all' ? TOPICS : [topicById(topicId)]
  const cards = []
  for (const t of topics) {
    for (const s of t.sections) {
      for (const it of s.items) {
        cards.push({ id: `${t.id}:${it.name}`, topic: t, section: s.title, pages: s.pages, ...it })
      }
    }
  }
  return cards
}
