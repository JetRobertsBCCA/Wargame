// Veilbound Shogunate — Faction Data
(function() {
  // Faction definition
  gameData.factions.push(    {
      id: "veilbound-shogunate",
      name: "The Veilbound Shogunate",
      icon: "⛩️",
      color: "#8b5cf6",
      theme:
        "Eldritch samurai civilization, discipline-driven horror, reality-alteration through martial enlightenment",
      flavor_text:
        "The Veilbound Shogunate is an ancient warrior civilization that blends rigid samurai discipline with exposure to incomprehensible cosmic entities. Unlike factions that descend into madness through eldritch contact, the Veilbound believe madness is a failure of preparation. Through strict ritual, absolute obedience, and relentless self-denial, they train their minds and bodies to survive truths that shatter lesser beings. They are feared not for their numbers, but for their inevitability.",
      motif_description:
        "Traditional samurai armor fused with non-Euclidean geometry. Masks as sacred symbols of self-removal. Subtle reality distortions around elite warriors. Weapons that appear slightly out of phase with the world.",
      core_philosophy:
        "Perfection through the erasure of self. Order used as a gateway to the unknowable. Follows the doctrine of The Three Veils — the Veil of Flesh (illusion of the body), the Veil of Thought (lie of a sovereign mind), and the Veil of Reality (the greatest deception: that the universe operates by consistent rules). True warriors seek to pierce all three.",
      faction_bonuses: [
        "All units gain +1 morale resistance (disciplined self-denial)",
        "Enemy units suffer -1 morale when engaged in melee by Veilbound (psychological dread)",
        "Elite warriors cause minor reality distortion — adjacent enemies have 10% miss chance",
        "Commanders cannot be broken by fear or morale effects",
      ],
      playstyle_notes:
        "The Veilbound Shogunate fields armies that appear calm, sparse, and restrained — until combat begins. They emphasize precision over numbers, psychological collapse over brute destruction, and decisive engagements that feel preordained. Observers report battles that feel scripted, as though the Veilbound knew the outcome long before blades were drawn.",
      worldview: [
        "Individual identity is temporary and ultimately irrelevant.",
        "Names are tools, not truths.",
        "Death is neither failure nor release — it is merely misalignment.",
        "Victory is achieved when an enemy no longer understands how they were defeated.",
      ],
      eldritch_relationship:
        "The Veilbound do not worship eldritch entities. They regard them as Teachers, Mirrors, and Tests of worth. These beings are never named publicly. Knowledge of them is restricted by rank, and even high-ranking commanders understand only fragments of the greater truth.",
      political_structure:
        "Ruled by an inscrutable figure known as The Shrouded Shogun, beneath whom exist layered hierarchies of masked lords, commanders, and ritual warriors. Authority is absolute, but leadership is not inherited — it is endured.",
      three_veils: {
        overview:
          "The Three Veils Doctrine is the central philosophical and tactical framework of the Veilbound Shogunate. It governs personal conduct, battlefield strategy, and the use of cosmic powers. Every soldier, from the lowliest Ashigaru to the Shrouded Shogun, is trained to recognize and pierce these veils.",
        veils: [
          {
            name: "The Veil of Flesh",
            concept:
              "The body is an imperfect vessel; clinging to it is folly.",
            implications: [
              "Pain is disregarded in favor of efficiency.",
              "Injuries are tolerated if the mission continues.",
              "Mutations or minor corruption from fragments or spirit bonds are accepted as enhancements rather than deformities.",
            ],
            mechanics: [
              "Units with this understanding gain stability bonuses when in danger.",
              "High bond cavalry units can temporarily ignore damage penalties.",
            ],
            symbol:
              "Armor adorned with subtle cracks glowing with cosmic light.",
          },
          {
            name: "The Veil of Thought",
            concept:
              "The mind is not sovereign; fear, doubt, and ego are illusions.",
            implications: [
              "Ritual meditation strengthens mental resilience.",
              "Soldiers are trained to respond instinctively, relying on cosmic perception rather than conventional tactics.",
            ],
            mechanics: [
              "Units operating under high Ritual Flow gain predictive bonuses in duels or counterattacks.",
              "Corruption events are less likely to affect veterans or highly bonded riders.",
            ],
            symbol:
              "Masks featuring shifting patterns that reflect mental clarity or focus.",
          },
          {
            name: "The Veil of Reality",
            concept:
              "The universe is inconsistent and fluid; rules of cause and effect are malleable to those who understand the truth.",
            implications: [
              "Advanced warriors may perform feats that appear impossible to outsiders: phasing attacks, multi-location strikes, and battlefield manipulation.",
              "The Veilbound may willingly enter extreme transformations or summon spirit-bound entities without fear.",
            ],
            mechanics: [
              "High-level commanders and ascended units can temporarily alter movement zones or create battlefield distortions.",
              "The risk/reward system peaks here: powerful effects may destabilize units if mishandled.",
            ],
            symbol:
              "Weapons, banners, or mounts subtly shifting in impossible geometries.",
          },
        ],
        doctrine_in_practice: {
          training:
            "Every Veilbound warrior undergoes physical, mental, and ritualized training corresponding to each veil.",
          hierarchy_integration:
            "Understanding the Veils is mandatory for promotion. A failure to recognize or pierce a veil can result in ritual demotion or execution.",
          combat_philosophy:
            "Battles are fought not only with steel but with perception. Success is measured by efficiency, control of momentum, and enlightenment milestones rather than casualty counts.",
        },
        keywords: [
          "Ritualized Warfare",
          "Mental Discipline",
          "Cosmic Perception",
          "Transformation Mechanics",
          "Momentum-Based Combat",
        ],
      },
      hierarchy: {
        overview:
          "The Veilbound Shogunate is a strictly stratified society where rank is earned through mastery of the Three Veils, combat prowess, and ritual dedication. Hierarchy is fluid only in the sense that advancement must be proven through trial and cosmic alignment, not birthright.",
        ranks: [
          {
            title: "The Shrouded Shogun",
            role: "Supreme leader of the faction; both military and spiritual authority.",
            responsibilities: [
              "Oversees all military campaigns.",
              "Performs and supervises high-order rituals.",
              "Decides the fate of commanders and provinces.",
            ],
            characteristics: [
              "Cloaked in a mask that fully conceals identity.",
              "Wields a spirit-bound weapon of unknown origin.",
              "Rarely seen directly on the battlefield, appearing only in decisive moments.",
            ],
          },
          {
            title: "Masked Lords",
            role: "Regional or divisional commanders.",
            responsibilities: [
              "Manage fleets of spirit riders and infantry.",
              "Conduct advanced rituals tied to fragments or yokai.",
              "Mentor mid-ranking commanders.",
            ],
            characteristics: [
              "Elaborate masks that reflect rank and accomplishments.",
              "Often ride uniquely bonded spirit beasts.",
              "Have access to limited battlefield-altering abilities.",
            ],
          },
          {
            title: "Elite Commanders",
            role: "Mid-level officers; direct control over specific squadrons or units.",
            responsibilities: [
              "Tactical decision-making in battle.",
              "Training and bonding with mounted units.",
              "Execution of rituals that affect battlefield momentum.",
            ],
            characteristics: [
              "Masks more ornate than standard warriors, less than Masked Lords.",
              "Can unlock temporary transformations mid-battle.",
            ],
          },
          {
            title: "Ritual Captains",
            role: "Specialized officers responsible for Ritual Flow management.",
            responsibilities: [
              "Coordinate spiritual support units and ceremonies.",
              "Maintain bond levels between mounted warriors and spirit beasts.",
              "Provide battlefield buffs or manipulate enemy perception.",
            ],
            characteristics: [
              "Often carry sigils, talismans, or ceremonial banners.",
              "Do not always ride into combat; many operate from central positions.",
            ],
          },
          {
            title: "Standard Warriors",
            role: "Core infantry and support units.",
            responsibilities: [
              "Execute orders with precision.",
              "Engage in duels or standard combat missions.",
              "Generate Ritual Flow for elite units.",
            ],
            characteristics: [
              "Wear masks of simpler design.",
              "Armor reflects basic cosmic patterns but is less mutable.",
            ],
          },
          {
            title: "Initiates / Apprentices",
            role: "Low-ranking soldiers and new recruits.",
            responsibilities: [
              "Observe and learn under senior commanders.",
              "Participate in minor rituals.",
              "Prepare for full ascension through The Veils.",
            ],
            characteristics: [
              "Simplified ceremonial dress.",
              "Minimal cosmic embellishments until proven worthy.",
            ],
          },
        ],
        titles_table: [
          {
            title: "The Shrouded Shogun",
            significance: "Supreme ruler",
            notes: "Rarely seen, absolute authority",
          },
          {
            title: "Masked Lord",
            significance: "Regional/Divisional Commander",
            notes: "Mask reflects accomplishments and alignment with The Veils",
          },
          {
            title: "Elite Commander",
            significance: "Squadron leader",
            notes: "May unlock temporary transformations",
          },
          {
            title: "Ritual Captain",
            significance: "Ritual and support officer",
            notes: "Critical for bond management",
          },
          {
            title: "Starblade Samurai / Spirit Rider Captain",
            significance: "High-level unit leaders",
            notes: "Often serve as battlefield exemplars",
          },
          {
            title: "Warrior Initiate",
            significance: "New recruit",
            notes: "Must complete trials to advance",
          },
        ],
        hierarchy_notes: [
          "Advancement is based solely on demonstrated mastery of combat, ritual, and bond systems.",
          "Mask designs are living symbols of rank — patterns may subtly change as the wearer gains power or bond.",
          "Ritual authority and battlefield authority are intertwined, meaning that a competent ritualist can out-rank a stronger fighter if their abilities alter the battle's outcome.",
        ],
        keywords: [
          "Masked Hierarchy",
          "Ritual Authority",
          "Spirit Bond Command",
          "Ascension-Based Rank",
          "Combat Meritocracy",
        ],
      },
      shrouded_shogun: {
        title: "The Shrouded Shogun",
        role: "Supreme leader of the Veilbound Shogunate",
        faction_rank: "Highest authority (military, spiritual, and political)",
        aliases: [
          "The Veiled One",
          "Keeper of the Final Cut",
          "Shadow Beyond the Mask",
        ],
        summary:
          "The Shrouded Shogun is the embodiment of the Veilbound philosophy: a figure both human and alien, whose presence commands awe and terror. Rarely seen directly, the Shogun's actions shape the faction's strategy, military campaigns, and spiritual doctrine.",
        appearance: [
          "Fully masked, with the mask seemingly made from living void that subtly shifts in impossible patterns.",
          "Armor is ceremonial, black lacquer fused with starlight filaments and ink-like veins that flow as if alive.",
          "Mount: A colossal spirit beast, part dragon, part shrine, partially phasing between dimensions.",
          "Aura: Reality around the Shogun subtly bends, causing distant observers to see multiple forms or ghostly afterimages.",
        ],
        personality: [
          {
            trait: "Cold and Calculated",
            description:
              "Every action is deliberate; improvisation exists only within the bounds of ritual.",
          },
          {
            trait: "Detached Yet Observant",
            description:
              "Rarely intervenes directly in low-tier conflicts but will decisively appear in battles that matter.",
          },
          {
            trait: "Philosophical Mentor",
            description:
              "Occasionally imparts cryptic lessons to commanders and initiates.",
          },
          {
            trait: "Strategic Omniscience",
            description:
              "Known for anticipating enemy actions as if perceiving beyond the flow of time.",
          },
        ],
        abilities: [
          {
            name: "Veil Piercing",
            description:
              "Can temporarily see through all enemy tactics, giving the faction strategic foresight.",
          },
          {
            name: "Spirit Convergence",
            description:
              "Calls forth fragments and spirit beasts to the battlefield, enhancing Ritual Flow for all units.",
          },
          {
            name: "Reality Rend",
            description:
              "At high bond or critical battle moments, can perform an area-altering strike that temporarily distorts movement and visibility for enemies.",
          },
          {
            name: "Final Cut Manifestation",
            description:
              "Rarely used in full form \u2014 the Shogun may phase their weapon into multiple locations at once, symbolically severing reality.",
          },
        ],
        faction_role: [
          {
            area: "Spiritual Authority",
            detail:
              "Interprets fragments and cosmic guidance. Rituals performed under the Shogun's direction are considered flawless.",
          },
          {
            area: "Military Oversight",
            detail:
              "Approves campaigns and appoints Masked Lords and Elite Commanders based on proven mastery.",
          },
          {
            area: "Cultural Figurehead",
            detail:
              "Embodies the Veilbound's philosophy of piercing the Three Veils; often the subject of tales and lessons for new initiates.",
          },
        ],
        lore_notes: [
          "Observers from other factions often report seeing the Shogun simultaneously in multiple locations or perceiving them in two places at once.",
          "Some believe that the Shogun is not fully human, having merged partially with a cosmic entity.",
          "The true identity is unknown, even to the faction's highest ranks \u2014 only the mask remains consistent.",
        ],
        keywords: [
          "Supreme Commander",
          "Masked Authority",
          "Reality Manipulation",
          "Spirit Bond Nexus",
          "Cosmic Samurai Leader",
        ],
      },
      transformation_stages: {
        overview:
          "The Veilbound Shogunate's warriors do not remain static. Through years of ritual, combat, and cosmic exposure, soldiers evolve physically, mentally, and spiritually. This evolution is known as the Transformation Stages, representing increasing mastery of the Three Veils and deeper alignment with eldritch forces. All elite units and commanders progress through these stages over time, with each stage unlocking new abilities, tactical options, and risks.",
        stages: [
          {
            name: "The Masked",
            stage_number: 1,
            overview:
              "The entry stage for fully trained soldiers and newly promoted commanders. Soldiers maintain human form and wear masks that symbolize mastery of the Veil of Flesh.",
            physical: [
              "Traditional samurai armor, subtly enhanced with cosmic motifs.",
              "Masks display simple patterns, sometimes glowing faintly.",
              "Slight distortion around weapons or armor may hint at latent eldritch energy.",
            ],
            abilities: [
              "Standard combat skills.",
              "Minor Ritual Flow generation.",
              "Limited access to dual-stance mechanics.",
            ],
            behavior: [
              "Follow strict orders and formation.",
              "Excel in Honor Stance (defensive, disciplined).",
              "Engage in duels to train for Revelation Stance.",
            ],
          },
          {
            name: "The Unbound",
            stage_number: 2,
            overview:
              "Warriors at this stage have pierced the first two veils: Flesh and Thought. They display partial reality-warping abilities and are beginning to merge with their spirit beasts.",
            physical: [
              "Armor and masks start to shift in non-Euclidean ways.",
              "Subtle extra limbs or appendages may manifest during combat.",
              "Spirit bonds are visually evident: mounts may glow, ripple, or phase partially.",
            ],
            abilities: [
              "Access to both Honor and Revelation Stances with greater effectiveness.",
              "Enhanced mobility and reaction speed.",
              "Unlock transformation-based attacks (Ascended Charge).",
              "Moderate risk of corruption events if mismanaged.",
            ],
            behavior: [
              "Capable of independent tactical decision-making.",
              "Can perform high-level duels, flanking maneuvers, and battlefield manipulations.",
              "Begin mentoring Masked units, reinforcing morale and Ritual Flow.",
            ],
          },
          {
            name: "Hollow Lords",
            stage_number: 3,
            overview:
              "The pinnacle of Veilbound evolution, typically reserved for commanders and the most elite warriors. At this stage, warriors have pierced all Three Veils and partially fused with cosmic entities.",
            physical: [
              "Armor and masks are fully eldritch, sometimes appearing as living voids or shifting constellations.",
              "Spirit beasts may appear to merge with the rider; outlines blur between the two.",
              "Weapons appear in multiple locations or slightly out of phase with reality.",
            ],
            abilities: [
              "Maximum access to dual stance mechanics.",
              "Reality manipulation, battlefield-altering powers, and extreme momentum bonuses.",
              "Immense combat power, but unstable \u2014 mistakes may result in corruption or uncontrolled mutations.",
            ],
            behavior: [
              "Operate as force multipliers on the battlefield.",
              "Can challenge multiple enemy units simultaneously.",
              "Serve as living symbols of the Three Veils doctrine.",
            ],
          },
        ],
        progression_notes: [
          "Advancement requires combat experience, successful rituals, and bond alignment with spirit beasts.",
          "Transformation is not instantaneous; improper training can stall or corrupt growth.",
          "Players commanding these units must consider risk vs. reward \u2014 Hollow Lords are incredibly powerful but can destabilize armies if mismanaged.",
        ],
        keywords: [
          "Veilbound Transformation",
          "Spirit Bond Evolution",
          "Ascended Samurai",
          "Momentum Combat Mechanics",
          "Dual-Entity Units",
        ],
      },
      military_doctrine: {
        overview:
          "The Veilbound Shogunate's military doctrine emphasizes precision, rhythm, and ritualized violence. Unlike conventional armies that rely on overwhelming numbers or brute force, the Veilbound excel at flowing combat, manipulation of enemy perception, and momentum-based strikes. Every unit, from infantry to spirit-bound cavalry, participates in a coordinated, almost dance-like battlefield performance.",
        core_principles: [
          {
            name: "Momentum is Victory",
            details: [
              "Battles are fought like a sequence of flowing strikes.",
              "Units gain bonuses when chain actions succeed (e.g., flanking, countering, ritual completions).",
              "Loss of momentum can cause entire formations to falter.",
            ],
          },
          {
            name: "Dual-Entity Synergy",
            details: [
              "Rider and spirit beast operate as a single unit.",
              "Effective management of bond levels allows for advanced abilities, transformations, and battlefield manipulation.",
              "Separation of rider and beast, whether by terrain or enemy action, reduces effectiveness dramatically.",
            ],
          },
          {
            name: "Ritual Flow Management",
            details: [
              "Ritual units, captains, and ceremonial banners create and manage Flow.",
              "High Flow allows elite units to activate special stances or perform Ascended Charges.",
              "Mismanagement can leave critical units unable to access their abilities.",
            ],
          },
          {
            name: "Precision Over Numbers",
            details: [
              "The Veilbound rarely rely on massed infantry assaults.",
              "Battles are planned for targeted strikes, exploiting enemy weaknesses, and focusing on high-value units.",
              "Even smaller forces can overwhelm larger armies with perfect execution.",
            ],
          },
          {
            name: "Psychological Warfare",
            details: [
              "Masked and Hollow Lord units manipulate perception.",
              "Enemy units may experience fear, disorientation, or hallucinations in proximity to high-ranking Veilbound.",
              "Observers describe Veilbound attacks as inevitable, which can erode morale.",
            ],
          },
        ],
        battlefield_behavior: [
          {
            name: "Standard Engagements",
            details: [
              "Infantry forms defensive lines while supporting cavalry initiates flanking maneuvers.",
              "Ritual units maintain Flow, ensuring elite units remain empowered.",
              "Skirmishers and scouts harass enemy flanks and secure objectives.",
            ],
          },
          {
            name: "Elite Strikes",
            details: [
              "Spirit Rider Cavalry performs rapid flanking, Ascended Charges, and multi-target duels.",
              "Elite infantry execute precision duels or infiltrations to disrupt enemy formations.",
            ],
          },
          {
            name: "Momentum Exploitation",
            details: [
              "Successive actions from bonded units increase bonuses across nearby allies.",
              "Chain effects amplify speed, attack, and bond generation, creating a crescendo of devastation.",
              "When momentum is broken (failed rituals, bond loss, mispositioning), units can enter a temporary state of instability, reducing effectiveness.",
            ],
          },
          {
            name: "Transformation Integration",
            details: [
              "Stage II (Unbound) and Stage III (Hollow Lords) units serve as tactical anchors.",
              "Their transformations can shift the tide of battle but must be carefully timed to avoid friendly disruption.",
            ],
          },
        ],
        strategic_notes: [
          "Commanders must balance risk and reward: pushing transformations too early can destabilize forces; waiting too long may forfeit momentum.",
          "Terrain and positioning are critical; Veilbound units often exploit elevation, natural corridors, and lines of sight to maximize Flow.",
          "Observers from other factions often report battles as a performance rather than chaotic combat, with Veilbound forces appearing eerily synchronized.",
        ],
        keywords: [
          "Momentum-Based Combat",
          "Dual-Entity Units",
          "Ritual Flow Management",
          "Precision Warfare",
          "Psychological Manipulation",
          "Ascended Charges",
        ],
      },
      war_machines_lore: {
        overview:
          "The Veilbound Shogunate's War Machines, often referred to as Titans, are massive spirit-bound entities fused with ritual constructs. Unlike mechanical war engines, these Titans are part eldritch, part samurai tradition, reflecting the faction's core philosophy: the merging of mortal discipline with incomprehensible cosmic forces. They are few in number but battlefield-defining, capable of turning engagements through sheer presence, devastating attacks, and reality-warping abilities. War Machines are slow, costly, and difficult to maintain, requiring both Ritual Flow and elite personnel to operate effectively.",
        general_characteristics: [
          {
            trait: "Dual Nature",
            detail:
              "Majestic and divine in appearance, but their true form hints at horror and unpredictability.",
          },
          {
            trait: "Bonded Operation",
            detail:
              "Typically commanded by Stage II or Stage III warriors; the pilot and the Titan must maintain perfect synchronization.",
          },
          {
            trait: "Battlefield Impact",
            detail:
              "War Machines influence terrain, morale, and momentum; many attacks cause area-wide psychological effects.",
          },
          {
            trait: "Maintenance",
            detail:
              "Requires significant Ritual Flow and preparation before deployment; cannot be replaced quickly if destroyed.",
          },
        ],
        tactical_role: [
          "Serve as anchors for elite cavalry and infantry.",
          "Often used to control critical zones, block enemy advances, or disrupt formations.",
          "Require careful synchronization with commanders; mismanagement can render them vulnerable despite raw power.",
        ],
        keywords: [
          "Spirit-Bound Titans",
          "Dual Nature War Machines",
          "Reality-Warping Constructs",
          "Ascended Battlefield Units",
          "Ritual Flow Anchors",
        ],
      },
      signature_weapons: {
        overview:
          "The Veilbound Shogunate wields weapons that are extensions of their philosophy, designed to channel Ritual Flow, spirit bonds, and cosmic perception. These weapons are not mere tools; they are living conduits that blur the line between samurai mastery and eldritch influence. Many are only usable by Stage II (Unbound) or Stage III (Hollow Lord) warriors, and some are permanently bonded to their wielder.",
        core_traits: [
          {
            trait: "Dual-Phase Presence",
            detail:
              "Weapons often appear in multiple locations simultaneously during combat.",
          },
          {
            trait: "Ritual Channeling",
            detail:
              "Infused with cosmic energy, enabling battlefield-altering strikes.",
          },
          {
            trait: "Spirit Integration",
            detail:
              "Some weapons bond to spirit beasts, amplifying combined abilities.",
          },
          {
            trait: "Visual Manifestation",
            detail:
              "Weapons shimmer with starlight, ink-like voids, or shifting geometry.",
          },
        ],
        weapons: [
          {
            name: "Final Cut Katana",
            type: "Katana (single-handed or dual-wieldable by masters)",
            wielder: "High-ranking Hollow Lords and select commanders",
            properties:
              "Can phase partially through reality, allowing multi-location strikes.",
            lore: "Said to sever the 'fabric of causality' in rare circumstances.",
          },
          {
            name: "Nagato of the Veil",
            type: "Naginata (polearm)",
            wielder:
              "Stage II Unbound warriors specializing in momentum strikes",
            properties: "Generates shockwaves that warp enemy positioning.",
            lore: "Carved with cosmic sigils that glow when enemies are nearby.",
          },
          {
            name: "Inkblade of the Hollow",
            type: "Dual short swords",
            wielder: "Skirmishers and elite duelists",
            properties:
              "Leaves afterimages that confuse enemy perception; integrates minor fragments of the wielder's spirit.",
            lore: "Forged from the voided ink of collapsed rituals.",
          },
          {
            name: "Spirit Banner of the Star Serpent",
            type: "Ceremonial Banner/Weapon Hybrid",
            wielder: "Banner carriers, often in elite cavalry squadrons",
            properties:
              "Amplifies Ritual Flow in nearby units; occasionally animates spirit constructs.",
            lore: "Represents the Veilbound's dual nature \u2014 ceremonial and martial simultaneously.",
          },
          {
            name: "Komainu Fang Halberd",
            type: "Halberd",
            wielder: "Defensive cavalry or ritual guards",
            properties: "Can counter-charge multiple enemies; emits fear aura.",
            lore: "Designed in honor of the guardian beasts of sacred shrines.",
          },
          {
            name: "Dreampiercer Bow",
            type: "Longbow",
            wielder: "Ranged specialists and select ritualists",
            properties:
              "Arrows phase through minor obstacles and temporarily distort enemy senses.",
            lore: "Crafted with fragments of fallen celestial spirits; arrow trails shimmer like moonlight on ink.",
          },
          {
            name: "Lotus Blossom Blades",
            type: "Twin daggers",
            wielder:
              "Ritual assassins or Hollow Lords performing transformation attacks",
            properties:
              "Can temporarily summon phantom copies to strike additional targets; boosts Ritual Flow on successful kills.",
            lore: "Forged from sacred lotus petals imbued with cosmic energy.",
          },
        ],
        tactical_notes: [
          "Signature weapons are rare and unique, usually tied to unit specialization or commander rank.",
          "Proper management enhances battlefield performance; misuse may drain Ritual Flow or destabilize bonds.",
          "Many weapons gain additional abilities when wielded alongside spirit-bound cavalry or high-level Ritual Flow units.",
        ],
        keywords: [
          "Spirit-Infused Weapons",
          "Dual-Phase Arms",
          "Ritual Channeling",
          "Hollow Lord Artifacts",
          "Momentum Amplification",
        ],
      },
      cosmic_entity: {
        overview:
          "The Veilbound Shogunate does not worship in the conventional sense. Instead, they are agents and vessels of a vast, unknowable cosmic entity known only as 'The Shimmering Beyond'. This entity exists outside conventional reality, bridging dimensions and perception, and serves as both teacher and ultimate test for the faction.",
        primary_name: "The Shimmering Beyond",
        aliases: [
          "The Infinite Reflection",
          "Void of Silent Truth",
          "The Unbroken Horizon",
        ],
        nature: [
          {
            trait: "Formless",
            detail:
              "The entity has no fixed shape; glimpses suggest constantly shifting geometric and organic structures.",
          },
          {
            trait: "Reality-Warping",
            detail:
              "Its presence can bend space and time around mortal perception.",
          },
          {
            trait: "Eldritch Wisdom",
            detail:
              "It communicates through visions, rituals, and fragments, often incomprehensible without proper training.",
          },
        ],
        relationship: [
          {
            aspect: "Guidance Through Fragments",
            details: [
              "Soldiers and commanders receive fragmentary visions or objects that allow access to forbidden techniques.",
              "These fragments require interpretation; misuse can lead to corruption or disaster.",
            ],
          },
          {
            aspect: "Testing Worthiness",
            details: [
              "The entity presents challenges or illusions to ensure only the disciplined advance through the Three Veils.",
              "Hollow Lords and the Shrouded Shogun themselves are considered vessels partially aligned with the Shimmering Beyond.",
            ],
          },
          {
            aspect: "Enhancing Ritual Flow",
            details: [
              "Ritual units channel the entity's energy to empower elite units and war machines.",
              "During key battles, fragments may temporarily alter battlefield physics, increasing unpredictability.",
            ],
          },
        ],
        lore_notes: [
          "Very few outside the Veilbound understand its nature. Observers often report shifting geometry, multiple overlapping shadows, and impossible movements during its indirect influence.",
          "Some believe the entity does not distinguish between friend and foe; it simply tests, instructs, and observes.",
          "The Shrouded Shogun is rumored to have a direct alignment, allowing partial manifestation of the entity's power.",
        ],
        influence_on_philosophy: [
          "Every aspect of Veilbound doctrine, hierarchy, and military practice is a response to or preparation for the Shimmering Beyond's influence.",
          "The Three Veils doctrine itself is a codified interpretation of lessons provided by the entity, aiming to prepare warriors for cosmic truth.",
          "Rituals, combat styles, and transformations are designed to safely harness fragmentary insights without succumbing to madness.",
        ],
        keywords: [
          "Eldritch Cosmic Entity",
          "Reality-Warping Teacher",
          "Fragment-Based Power",
          "Ritual Influence",
          "Test of Worthiness",
        ],
      },
      historical_background: {
        origins:
          "The Veilbound Shogunate began as a secretive clan of samurai who discovered fragments of the Shimmering Beyond. Initially, they were scholars seeking knowledge, but exposure to eldritch energies forced them to blend martial discipline with cosmic ritual.",
        rise_to_power:
          "Through centuries, the Shogunate conquered neighboring regions by outmaneuvering armies with superior Flow manipulation and momentum chains, eventually becoming a dominant military power.",
        major_conflicts: [
          {
            name: "The Veil Wars",
            description:
              "Battles against rival clans seeking fragments of the Beyond. These grueling campaigns tested the limits of Ritual Flow warfare and forced the Shogunate to refine their Three Veils doctrine under fire.",
          },
          {
            name: "The Hollow Rebellion",
            description:
              "Early Hollow Lord experiments caused internal strife; only those loyal to the Three Veils survived. The rebellion was both a civil war and a spiritual crisis, reshaping the hierarchy permanently.",
          },
        ],
      },
      culture_philosophy: {
        overview:
          "The Veilbound Shogunate's culture is inseparable from its military doctrine. Every aspect of life — from daily training to festival celebrations — is infused with cosmic awareness and martial discipline.",
        three_veils_expanded: [
          {
            veil: "Flesh Veil",
            focus:
              "Discipline, physical mastery, and endurance. Warriors train their bodies to withstand the strain of channeling Ritual Flow and bonding with spirit beasts.",
          },
          {
            veil: "Thought Veil",
            focus:
              "Tactical acumen, strategic awareness, and momentum usage. Commanders study battlefield patterns as cosmic equations, reading Flow currents like a language.",
          },
          {
            veil: "Spirit Veil",
            focus:
              "Ritual Flow mastery, spirit beast bonding, and cosmic alignment. The highest veil connects warriors directly to the Shimmering Beyond.",
          },
        ],
        ritual_practices: [
          "Daily combat drills infused with small fragments of the Shimmering Beyond.",
          "Ceremonial duels to maintain unit cohesion and test commanders' judgment.",
          "Spirit offerings to maintain bond with War Machines and mounts.",
        ],
        symbols: [
          "Ink sigils, masks, and banners all encode fragments of eldritch truths.",
          "Celestial patterns represent alignment with Shimmering Beyond fragments.",
        ],
      },
      military_traditions: {
        battlefield_philosophy: [
          "Use precision, momentum, and Flow manipulation over brute force.",
          "Elite units and commanders operate as extensions of the cosmic fragments they wield.",
        ],
        ritual_warfare: [
          "Even small skirmishes are treated as ritualized tests, with commanders observing outcomes to determine unit evolution.",
          "War Machines (Titans) are only deployed after a proper ritual alignment, as mismanagement can warp reality or fracture Flow chains.",
        ],
        unit_naming_conventions: [
          "Names reflect cosmic alignment or martial archetypes (e.g., Moonlit Duelists, Lotus Ascetics).",
          "Elite and commander units often receive personal titles tied to deeds or cosmic visions.",
        ],
      },
      geography_strongholds: {
        overview:
          "The Veilbound Lands are mountainous regions interlaced with floating shrines, ritual towers, and Spirit Sanctuaries. The terrain itself resonates with Ritual Flow, creating natural phenomena that both protect and challenge inhabitants.",
        sacred_sites: [
          {
            name: "The Three Veils Monastery",
            description:
              "Training ground for all elite units. Perched atop an impossible peak where three mountain ridges converge, the monastery exists partially in the material world and partially within the Shimmering Beyond.",
          },
          {
            name: "Inkspire Tower",
            description:
              "Center of Ritual Flow amplification. A towering spire of living ink that serves as both library and amplifier, channeling Flow across the entire Veilbound territory.",
          },
        ],
        battlefield_features: [
          "Fog-laden valleys where Ritual Flow pools naturally, creating zones of enhanced power and unpredictable effects.",
          "Ink-filled rivers that respond to nearby Flow manipulation, forming temporary barriers or bridges.",
          "Floating shrine fragments that drift across battlefields, providing cover and Flow amplification to nearby units.",
        ],
      },
      unique_phenomena: {
        overview:
          "The Veilbound Shogunate's deep connection to the Shimmering Beyond produces supernatural battlefield effects that no other faction experiences.",
        phenomena: [
          {
            name: "Veil Storms",
            description:
              "Random reality-bending events that occur when Flow is over-accumulated on a battlefield. Terrain shifts, gravity warps, and phantom echoes of past battles manifest. Both a danger and an opportunity for skilled commanders.",
            gameplay_effect:
              "When total Ritual Flow on the battlefield exceeds a threshold, a Veil Storm triggers — randomizing terrain, buffing or debuffing units unpredictably, and potentially summoning spirit echoes.",
          },
          {
            name: "Spirit Echoes",
            description:
              "Lingering traces of fallen commanders or War Machines that can assist or disrupt battles. These echoes retain fragments of their former abilities and may act autonomously.",
            gameplay_effect:
              "When a commander or War Machine is destroyed, there is a chance a Spirit Echo persists for 1-3 turns, performing weakened versions of the original's abilities.",
          },
          {
            name: "Fragmentary Visions",
            description:
              "Players controlling commanders may receive optional vision-based quests or missions that influence unit evolution. These visions come from the Shimmering Beyond and offer risk-reward choices.",
            gameplay_effect:
              "At certain Flow thresholds, commanders receive vision cards offering bonus abilities or evolution points in exchange for completing specific battlefield objectives.",
          },
        ],
      },
      faction_keywords: [
        "Eldritch Discipline",
        "Samurai Horror",
        "Reality Manipulation",
        "Masked Hierarchy",
        "Ritualized Warfare",
        "Cosmic Enlightenment",
      ],
    });

  // Commanders
  const commanders = [
    {
      name: "The Shrouded Shogun",
      faction: "veilbound-shogunate",
      title: "Keeper of the Final Cut",
      flavor_text:
        "The embodiment of the Veilbound philosophy: a figure both human and alien, whose presence commands awe and terror. Rarely seen directly, the Shogun's actions shape the faction's strategy, military campaigns, and spiritual doctrine.",
      theme: "Supreme cosmic authority, reality manipulation",
      personality:
        "Cold and calculated, detached yet observant, philosophical mentor. Every action is deliberate; improvisation exists only within the bounds of ritual.",
      playstyle:
        "Supreme support and battlefield control, massive Ritual Flow generation, reality-altering strikes",
      base_stats: {
        Command: 10,
        Knowledge: 10,
        Leadership: 10,
        Agility: 7,
        Health: 150,
      },
      battle_stats: { ATK: 6, DEF: 5, HP: 15, MOV: 7, RNG: 6, MOR: 10 },
      points_cost: 29,
      skill_tree: {
        format: "branching",
        levels: [
          {
            level: 1,
            option_a: {
              name: "Veil Awareness",
              type: "Passive",
              description:
                "Increases detection range; +1 evasion to all units within 2 spaces.",
              effect: "+1 detection range, +1 evasion within 2 spaces",
            },
            option_b: {
              name: "Spirit Bond Initiate",
              type: "Active",
              description: "Boost Ritual Flow of one nearby unit for 1 turn.",
              effect: "+Ritual Flow to 1 target for 1 turn",
            },
          },
          {
            level: 2,
            option_a: {
              name: "Momentum Strike",
              type: "Active",
              description:
                "First attack each turn gains +10% damage, increases chain bonus by 1.",
              effect: "+10% first-attack damage, +1 chain bonus",
            },
            option_b: {
              name: "Dual Strike",
              type: "Active",
              description:
                "Can attack two adjacent enemies for minor damage (doesn't consume Flow).",
              effect: "Hit 2 adjacent enemies, no Flow cost",
            },
          },
          {
            level: 3,
            option_a: {
              name: "Flow Amplification",
              type: "Active",
              description:
                "Converts accumulated Flow into temporary bonus for nearby units (+2 Flow per 10 stored).",
              effect: "+2 Flow per 10 stored to nearby units",
            },
            option_b: {
              name: "Tactical Insight",
              type: "Passive",
              description:
                "Reveals enemy movement for next 2 turns; +5% damage on first strike against revealed units.",
              effect: "Reveal movement 2 turns, +5% vs revealed",
            },
          },
          {
            level: 4,
            option_a: {
              name: "Multi-Strike Phasing",
              type: "Active",
              description: "Attack hits up to 2 additional nearby units.",
              effect: "Cleave to 2 adjacent enemies",
            },
            option_b: {
              name: "Veil Ward",
              type: "Passive",
              description: "Nearby allies gain minor damage reduction (+5%).",
              effect: "+5% damage reduction to nearby allies",
            },
          },
          {
            level: 5,
            option_a: {
              name: "Command Overwatch",
              type: "Passive",
              description: "Allies within 3 units gain +10% attack or evasion.",
              effect: "+10% attack or evasion within range 3",
            },
            option_b: {
              name: "Hollow Resonance",
              type: "Active",
              description:
                "Sacrifice 3 Flow to temporarily increase damage of adjacent units by 15% for 1 turn.",
              effect: "-3 Flow → +15% damage to adjacent allies, 1 turn",
            },
          },
          {
            level: 6,
            option_a: {
              name: "Veil Warp",
              type: "Active",
              description:
                "Short-range teleport; attack can occur before or after teleport.",
              effect: "Teleport + attack in any order",
            },
            option_b: {
              name: "Spirit Surge",
              type: "Active",
              description:
                "Restore bond or minor health to one nearby unit; bonus if it's Shrouded Shogun Vassal.",
              effect: "Heal/bond restore, +bonus to Vassals",
            },
          },
          {
            level: 7,
            option_a: {
              name: "Reality Phase Strike",
              type: "Active",
              description:
                "Attack 2–3 enemy units in separate locations; requires 2 Flow points.",
              effect: "Multi-target strike (2-3 enemies), costs 2 Flow",
            },
            option_b: {
              name: "Aura of Determination",
              type: "Passive",
              description:
                "Adjacent units gain bonus chain progression (+1 per turn).",
              effect: "+1 chain progression/turn to adjacent allies",
            },
          },
          {
            level: 8,
            option_a: {
              name: "Shadow Momentum",
              type: "Active",
              description:
                "Temporarily double chain bonus of a chosen unit for 1 turn.",
              effect: "2× chain bonus on 1 unit for 1 turn",
            },
            option_b: {
              name: "Veil Echo",
              type: "Active",
              description: "Make one attack hit twice; minor Flow cost.",
              effect: "Double-hit attack, minor Flow cost",
            },
          },
          {
            level: 9,
            option_a: {
              name: "Spirit Convergence",
              type: "Active",
              description:
                "Convert stored Flow into +10% damage for all nearby units.",
              effect: "Flow → +10% damage to all nearby units",
            },
            option_b: {
              name: "Final Cut Manifestation",
              type: "Active",
              description:
                "Multi-location strike against isolated enemy units; consumes 3 Flow points.",
              effect: "Multi-location strike vs isolated enemies, costs 3 Flow",
            },
          },
        ],
        evolution: {
          label: "Level 10: Evolution Choice",
          chaos: {
            name: "Hollow Eclipse",
            abilities: [
              {
                name: "Reality Phase Strike+",
                type: "Active",
                description:
                  "Reality Phase Strike now hits all enemies within 2 units, 50% chance to confuse.",
                effect: "AoE within 2 units + 50% confuse",
              },
              {
                name: "Fear Aura",
                type: "Passive",
                description:
                  "Adjacent enemies suffer minor damage and -20% morale.",
                effect: "Minor damage + -20% morale to adjacent enemies",
              },
            ],
          },
          knowledge: {
            name: "Celestial Arbiter",
            abilities: [
              {
                name: "Preemptive Insight",
                type: "Active",
                description:
                  "See enemy stats in 3-unit radius; first strike gains +15% damage.",
                effect: "Reveal stats (3 range) + +15% first-strike damage",
              },
              {
                name: "Doubled Flow Generation",
                type: "Passive",
                description: "Nearby units generate double Ritual Flow.",
                effect: "2× Ritual Flow generation (nearby units)",
              },
            ],
          },
        },
      },
      signature_units: ["Shrouded Shogun Vassals"],
      strategic_notes:
        "The Shogun is extremely versatile, able to lead either fear-inducing Chaos armies or strategically precise Knowledge armies, rewarding different playstyles. Extremely expensive but battlefield-defining — deploy only in the most critical engagements.",
      tags: ["supreme", "reality-manipulation", "ritual-flow", "versatile"],
    },
    {
      name: "Masked Lord Kurohane",
      faction: "veilbound-shogunate",
      title: "The Shadow Phalanx",
      flavor_text:
        "Where Kurohane rides, shadows deepen and formations tighten. His presence turns ordinary infantry into an unbreakable wall of masked steel.",
      theme: "Infantry support, momentum disruption",
      personality:
        "Stoic, protective of subordinates, speaks in clipped commands. Values discipline above all.",
      playstyle:
        "Infantry buffs, enemy momentum disruption, mounted special attacks",
      base_stats: {
        Command: 9,
        Knowledge: 7,
        Leadership: 9,
        Agility: 6,
        Health: 120,
      },
      battle_stats: { ATK: 6, DEF: 5, HP: 12, MOV: 6, RNG: 3, MOR: 10 },
      points_cost: 26,
      level_1_deck: {
        command: ["Shadow Phalanx", "Formation Command"],
        tech: ["Momentum Disrupt", "Shield Wall Protocol"],
        fragment: ["Spirit Lance Charge"],
        tactical: ["Disciplined Advance"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Tactical Formation",
          chaos: "Dread Presence",
          tactical: "Shield Enhancement",
        },
        level_3: {
          knowledge: "Bond Reinforcement",
          chaos: "Terror Aura",
          tactical: "Infantry Mastery",
        },
        level_4: {
          knowledge: "Flow Generation",
          chaos: "Shadow Strike",
          tactical: "Phalanx Perfection",
        },
        level_5: {
          knowledge: "Oracle Insight",
          chaos: "Dread Charge",
          tactical: "Combined Defense",
        },
        level_6: {
          knowledge: "Bond Mastery",
          chaos: "Fear Cascade",
          tactical: "Momentum Control",
        },
        level_7: {
          knowledge: "Ritual Shield",
          chaos: "Nightmare Aura",
          tactical: "Iron Formation",
        },
        level_8: {
          knowledge: "Flow Amplification",
          chaos: "Void Presence",
          tactical: "Strategic Shield",
        },
        level_9: {
          knowledge: "Perfect Bond",
          chaos: "Absolute Terror",
          tactical: "Supreme Formation",
        },
        level_10: {
          knowledge: "Oracle Mask",
          chaos: "Dread Mask",
          tactical: "Balanced Lord",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Oracle Mask",
          description:
            "Increases bond generation and boosts Ritual Flow for all nearby units.",
          abilities: [
            "Enhanced Bond Generation",
            "Flow Amplification",
            "Oracle Vision",
          ],
          fragment_interaction:
            "Bond generation doubled; Ritual Flow always optimal",
          unit_synergy:
            "All infantry gain +2 defense; Ritual Flow generation increased by 50%",
        },
        chaos: {
          name: "Dread Mask",
          description:
            "Unleashes terror aura, enhances fear effects of all units under command.",
          abilities: ["Terror Cascade", "Dread Aura", "Fear Amplification"],
          fragment_interaction:
            "Fear effects spread to additional enemy units unpredictably",
          unit_synergy:
            "All units gain fear aura; enemy morale penalties doubled",
        },
        hybrid: {
          name: "Balanced Lord",
          description: "Moderate buffs to both Flow and fear effects.",
          abilities: ["Controlled Presence", "Balanced Aura", "Steady Command"],
          fragment_interaction: "Balanced enhancement with low instability",
          unit_synergy: "Infantry gain +1 defense and minor fear aura",
        },
      },
      signature_units: ["Masked Lord Retinue"],
      strategic_notes:
        "Kurohane excels at infantry-centric armies. Use him to create unbreakable defensive formations while disrupting enemy momentum.",
      tags: ["infantry-focus", "defensive", "momentum-disruption"],
    },
    {
      name: "Elite Commander Asagiri",
      faction: "veilbound-shogunate",
      title: "The Inkstep Duelist",
      flavor_text:
        "Between one heartbeat and the next, Asagiri has already struck twice. Her blade leaves trails of void-ink that linger like afterimages of death.",
      theme: "Dueling specialist, teleportation tactics",
      personality:
        "Quiet, intense, deeply focused. Communicates through action rather than words.",
      playstyle: "Duelist, teleport strikes, damage reduction aura",
      base_stats: {
        Command: 6,
        Knowledge: 8,
        Leadership: 7,
        Agility: 10,
        Health: 90,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 9, MOV: 10, RNG: 6, MOR: 9 },
      points_cost: 22,
      level_1_deck: {
        command: ["Duel Challenge"],
        tech: ["Inkstep", "Veil Ward"],
        fragment: ["Lunar Blade Activation", "Phantom Edge"],
        tactical: ["Precision Duel"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Flow Enhancement",
          chaos: "Phantom Strike",
          tactical: "Quick Step",
        },
        level_3: {
          knowledge: "Precise Cut",
          chaos: "Fear on Hit",
          tactical: "Duelist Mastery",
        },
        level_4: {
          knowledge: "Veil Shield",
          chaos: "Shadow Slash",
          tactical: "Counter Stance",
        },
        level_5: {
          knowledge: "Flow Attunement",
          chaos: "Teleport Chain",
          tactical: "Perfect Timing",
        },
        level_6: {
          knowledge: "Blade Harmony",
          chaos: "Void Cut",
          tactical: "Evasion Mastery",
        },
        level_7: {
          knowledge: "Ritual Blade",
          chaos: "Phantom Barrage",
          tactical: "Adaptive Dueling",
        },
        level_8: {
          knowledge: "Flow Mastery",
          chaos: "Shadow Storm",
          tactical: "Supreme Duelist",
        },
        level_9: {
          knowledge: "Enlightened Blade",
          chaos: "Void Duelist",
          tactical: "Perfect Form",
        },
        level_10: {
          knowledge: "Flow Adept",
          chaos: "Phantom Duelist",
          tactical: "Balanced Duelist",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Flow Adept",
          description:
            "Enhances Ritual Flow on nearby units, turning duels into Flow-generating events.",
          abilities: [
            "Flow Generation on Kill",
            "Ritual Blade Mastery",
            "Enhanced Coordination",
          ],
          fragment_interaction:
            "Successful duels generate massive Ritual Flow for nearby allies",
          unit_synergy:
            "Nearby units gain +2 Ritual Flow; dueling victories buff all allies",
        },
        chaos: {
          name: "Phantom Duelist",
          description:
            "Additional teleport attacks and fear on every hit. A nightmare in close combat.",
          abilities: ["Chain Teleport", "Fear Strike", "Phantom Barrage"],
          fragment_interaction:
            "Teleport attacks leave fear zones that persist for 2 turns",
          unit_synergy:
            "Inkblade Masters gain teleport ability; fear spreads on kills",
        },
        hybrid: {
          name: "Balanced Duelist",
          description: "Moderate teleport enhancement and Flow generation.",
          abilities: ["Controlled Blink", "Steady Flow", "Balanced Blade"],
          fragment_interaction:
            "Moderate Flow and fear effects with low instability",
          unit_synergy: "Inkblade Masters gain minor Flow bonus and evasion",
        },
      },
      signature_units: ["Inkblade Masters"],
      strategic_notes:
        "Asagiri is the premier duelist commander. Send her to eliminate enemy elites and commanders. Fragile but devastating in the right hands.",
      tags: ["duelist", "teleport", "agility"],
    },
    {
      name: "Elite Commander Hoshimaru",
      faction: "veilbound-shogunate",
      title: "The Starfall Guardian",
      flavor_text:
        "When Hoshimaru raises his banner, starlight cascades across the battlefield. His allies are shielded; his enemies are blinded.",
      theme: "Area control, protective commander",
      personality:
        "Warm, protective, inspires fierce loyalty. Leads by example and shields allies.",
      playstyle: "AoE strikes, enemy immobilization, ally buffing",
      base_stats: {
        Command: 8,
        Knowledge: 7,
        Leadership: 9,
        Agility: 6,
        Health: 110,
      },
      battle_stats: { ATK: 5, DEF: 5, HP: 11, MOV: 6, RNG: 3, MOR: 10 },
      points_cost: 23,
      level_1_deck: {
        command: ["Starfall Strike", "Ascendant Guard"],
        tech: ["Spirit Bind", "Celestial Shield"],
        fragment: ["Starlight Cascade"],
        tactical: ["Protective Formation"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Celestial Insight",
          chaos: "Void Burst",
          tactical: "Shield Mastery",
        },
        level_3: {
          knowledge: "Star Ward",
          chaos: "Dark Star",
          tactical: "Combined Guard",
        },
        level_4: {
          knowledge: "Flow Shield",
          chaos: "Star Collapse",
          tactical: "Area Protection",
        },
        level_5: {
          knowledge: "Celestial Blessing",
          chaos: "Void Star Charge",
          tactical: "Chain Bonuses",
        },
        level_6: {
          knowledge: "Bond Shield",
          chaos: "Fear Cascade",
          tactical: "Guardian Mastery",
        },
        level_7: {
          knowledge: "Flow Barrier",
          chaos: "Dark Nova",
          tactical: "Combined Arms",
        },
        level_8: {
          knowledge: "Starlight Mastery",
          chaos: "Void Eruption",
          tactical: "Supreme Guardian",
        },
        level_9: {
          knowledge: "Celestial Perfection",
          chaos: "Eclipse Storm",
          tactical: "Total Protection",
        },
        level_10: {
          knowledge: "Celestial Protector",
          chaos: "Void Star",
          tactical: "Balanced Guardian",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Celestial Protector",
          description:
            "Buffs all nearby units and increases chain bonuses. The ultimate protective commander.",
          abilities: [
            "Celestial Aura",
            "Chain Amplification",
            "Starlight Shield",
          ],
          fragment_interaction: "All protective Ritual Flow effects doubled",
          unit_synergy:
            "Spirit Dragon Cohort gains +3 charge bonus; all nearby units gain shields",
        },
        chaos: {
          name: "Void Star",
          description:
            "Gains AoE fear and damage over time aura. Protection through destruction.",
          abilities: ["Void Nova", "Fear Cascade", "Dark Star Aura"],
          fragment_interaction:
            "AoE damage warps terrain and applies persistent fear zones",
          unit_synergy:
            "Spirit Dragon Cohort gains void damage; enemies near Hoshimaru take DoT",
        },
        hybrid: {
          name: "Balanced Guardian",
          description: "Moderate buffs and AoE effects with stability.",
          abilities: ["Stable Shield", "Controlled Star", "Steady Guard"],
          fragment_interaction: "Balanced protective and offensive effects",
          unit_synergy:
            "Spirit Dragon Cohort gains +1 charge bonus and minor shield",
        },
      },
      signature_units: ["Spirit Dragon Cohort"],
      strategic_notes:
        "Hoshimaru excels at protecting elite cavalry charges. Pair him with Spirit Riders for devastating coordinated assaults under starlight shields.",
      tags: ["protective", "area-control", "cavalry-synergy"],
    },
    {
      name: "Ritual Captain Akikaze",
      faction: "veilbound-shogunate",
      title: "The Flow Surge",
      flavor_text:
        "Where Akikaze stands, the veils thin and Ritual Flow surges like a tide. Even the weakest unit becomes extraordinary under her guidance.",
      theme: "Ritual Flow mastery, support enhancement",
      personality:
        "Serene, meditative, speaks softly but with absolute certainty. The faction's most gifted ritualist.",
      playstyle:
        "Massive Ritual Flow generation, ability enhancement, defensive support",
      base_stats: {
        Command: 6,
        Knowledge: 10,
        Leadership: 8,
        Agility: 5,
        Health: 85,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 9, MOV: 5, RNG: 6, MOR: 10 },
      points_cost: 19,
      level_1_deck: {
        command: ["Ritual Surge"],
        tech: ["Spirit Barrier", "Flow Channeling"],
        fragment: ["Flow Amplification", "Ritual Cascade", "Bond Enhancement"],
        tactical: ["Defensive Ritual"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Enhanced Flow",
          chaos: "Corrupted Surge",
          tactical: "Quick Ritual",
        },
        level_3: {
          knowledge: "Flow Mastery",
          chaos: "Dark Flow",
          tactical: "Efficient Channeling",
        },
        level_4: {
          knowledge: "Perfect Ritual",
          chaos: "Unstable Surge",
          tactical: "Barrier Enhancement",
        },
        level_5: {
          knowledge: "Enlightened Flow",
          chaos: "Corrupted Channeling",
          tactical: "Multi-Target Flow",
        },
        level_6: {
          knowledge: "Sage Wisdom",
          chaos: "Dark Ritual",
          tactical: "Flow Network",
        },
        level_7: {
          knowledge: "Perfect Channeling",
          chaos: "Chaos Flow",
          tactical: "Ritual Mastery",
        },
        level_8: {
          knowledge: "Flow Legend",
          chaos: "Unstable Maximum",
          tactical: "Strategic Flow",
        },
        level_9: {
          knowledge: "Ultimate Ritual",
          chaos: "Chaos Cascade",
          tactical: "Total Enhancement",
        },
        level_10: {
          knowledge: "Enlightened Ritualist",
          chaos: "Corrupted Ritualist",
          tactical: "Balanced Ritualist",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Enlightened Ritualist",
          description:
            "Reduces cooldowns, boosts all Flow generation. The perfect support commander.",
          abilities: [
            "Perfect Flow",
            "Cooldown Reduction",
            "Enlightened Surge",
          ],
          fragment_interaction:
            "All Ritual Flow generation tripled; abilities recharge faster",
          unit_synergy:
            "Flow Adepts gain double effectiveness; all units gain bonus abilities",
        },
        chaos: {
          name: "Corrupted Ritualist",
          description:
            "Damage over time effects applied to all enemies in Flow range.",
          abilities: ["Corrupted Flow", "Dark Surge", "Poison Ritual"],
          fragment_interaction:
            "Ritual Flow becomes toxic to enemies; damaging effects spread",
          unit_synergy:
            "Flow Adepts gain offensive capabilities; enemies in range take damage",
        },
        hybrid: {
          name: "Balanced Ritualist",
          description: "Enhanced Flow with minor offensive capabilities.",
          abilities: [
            "Controlled Flow",
            "Moderate Surge",
            "Balanced Enhancement",
          ],
          fragment_interaction:
            "Moderate Flow boost with minor offensive effects",
          unit_synergy: "Flow Adepts gain +1 to all stats; minor area DoT",
        },
      },
      signature_units: ["Flow Adepts"],
      strategic_notes:
        "Akikaze is the Veilbound's primary Flow battery. Essential in armies that rely on transformations and elite abilities. Protect her at all costs.",
      tags: ["ritual-flow", "support", "enhancement"],
    },
    {
      name: "Ritual Captain Tsukihana",
      faction: "veilbound-shogunate",
      title: "The Sigil Weaver",
      flavor_text:
        "Her ink is alive. Her sigils write themselves into reality. When Tsukihana paints, the battlefield obeys.",
      theme: "Sigil warfare, terrain manipulation",
      personality:
        "Artistic, methodical, sees combat as calligraphy. Every battlefield is a canvas.",
      playstyle: "AoE projectiles, area disruption, spirit bond enhancement",
      base_stats: {
        Command: 7,
        Knowledge: 9,
        Leadership: 7,
        Agility: 6,
        Health: 90,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 9, MOV: 6, RNG: 6, MOR: 9 },
      points_cost: 20,
      level_1_deck: {
        command: ["Inkwave"],
        tech: ["Veil Sigil", "Spirit Bond Boost"],
        fragment: ["Ink Manifestation", "Sigil Cascade"],
        tactical: ["Area Disruption"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Precise Sigils",
          chaos: "Phantom Ink",
          tactical: "Quick Sigil",
        },
        level_3: {
          knowledge: "Bond Enhancement",
          chaos: "Dark Ink",
          tactical: "Sigil Mastery",
        },
        level_4: {
          knowledge: "Flow Sigils",
          chaos: "Ink Horror",
          tactical: "Area Control",
        },
        level_5: {
          knowledge: "Perfect Calligraphy",
          chaos: "Phantom Summoning",
          tactical: "Strategic Sigils",
        },
        level_6: {
          knowledge: "Sigil Network",
          chaos: "Dark Manifestation",
          tactical: "Ink Mastery",
        },
        level_7: {
          knowledge: "Flow Inscription",
          chaos: "Horror Ink",
          tactical: "Combined Sigils",
        },
        level_8: {
          knowledge: "Sigil Legend",
          chaos: "Phantom Storm",
          tactical: "Strategic Inscription",
        },
        level_9: {
          knowledge: "Ultimate Sigil",
          chaos: "Ink Nightmare",
          tactical: "Total Calligraphy",
        },
        level_10: {
          knowledge: "Sigil Master",
          chaos: "Ink Horror",
          tactical: "Balanced Weaver",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Sigil Master",
          description:
            "Stronger, more efficient Flow generation through masterful sigil work.",
          abilities: [
            "Perfect Sigils",
            "Enhanced Flow Inscription",
            "Efficient Channeling",
          ],
          fragment_interaction: "Sigils generate maximum Flow with zero waste",
          unit_synergy:
            "Ink Sigil Crafters gain double effectiveness; sigils persist longer",
        },
        chaos: {
          name: "Ink Horror",
          description:
            "Summons phantoms to fight alongside units. The ink comes alive.",
          abilities: [
            "Phantom Summoning",
            "Living Ink",
            "Horror Manifestation",
          ],
          fragment_interaction:
            "Ink constructs spawn from sigils unpredictably but fight for the Veilbound",
          unit_synergy:
            "Ink Sigil Crafters can summon phantom units; sigils become traps",
        },
        hybrid: {
          name: "Balanced Weaver",
          description: "Moderate sigil enhancement with minor summoning.",
          abilities: ["Controlled Ink", "Stable Sigils", "Minor Phantoms"],
          fragment_interaction:
            "Moderate sigil power with occasional phantom support",
          unit_synergy:
            "Ink Sigil Crafters gain +1 to all stats; minor phantom chance",
        },
      },
      signature_units: ["Ink Sigil Crafters"],
      strategic_notes:
        "Tsukihana controls the battlefield through area denial and debuffs. Use her to reshape engagements and support cavalry charges.",
      tags: ["sigil-warfare", "area-control", "debuff"],
    },
    {
      name: "Elite Commander Rengoku",
      faction: "veilbound-shogunate",
      title: "The Flame Crescent",
      flavor_text:
        "His blade draws arcs of cosmic fire. Each swing builds momentum until the battlefield erupts in a crescent of devastation.",
      theme: "Melee destruction, momentum building",
      personality:
        "Fierce, passionate, leads every charge personally. Burns with inner fire and cosmic intensity.",
      playstyle:
        "Wide melee attacks, momentum chain bonuses, teleport repositioning",
      base_stats: {
        Command: 8,
        Knowledge: 6,
        Leadership: 8,
        Agility: 8,
        Health: 105,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 11, MOV: 8, RNG: 3, MOR: 10 },
      points_cost: 22,
      level_1_deck: {
        command: ["Flame Crescent", "Momentum Surge"],
        tech: ["Veil Step", "Fire Enhancement"],
        fragment: ["Cosmic Flame Activation"],
        tactical: ["Chain Attack"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Controlled Flame",
          chaos: "Wild Fire",
          tactical: "Quick Strike",
        },
        level_3: {
          knowledge: "Precise Arc",
          chaos: "Infernal Slash",
          tactical: "Chain Mastery",
        },
        level_4: {
          knowledge: "Flow Flame",
          chaos: "Fire Storm",
          tactical: "Momentum Control",
        },
        level_5: {
          knowledge: "Celestial Fire",
          chaos: "Infernal Charge",
          tactical: "Combined Rush",
        },
        level_6: {
          knowledge: "Blade Harmony",
          chaos: "Raging Inferno",
          tactical: "Attack Mastery",
        },
        level_7: {
          knowledge: "Perfect Arc",
          chaos: "Chaos Flame",
          tactical: "Tactical Fire",
        },
        level_8: {
          knowledge: "Flow Blade",
          chaos: "Maximum Inferno",
          tactical: "Supreme Momentum",
        },
        level_9: {
          knowledge: "Flame Perfection",
          chaos: "Infernal Apex",
          tactical: "Total Chain",
        },
        level_10: {
          knowledge: "Celestial Ronin",
          chaos: "Infernal Ronin",
          tactical: "Balanced Ronin",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Celestial Ronin",
          description:
            "Enhanced speed and bonus to allied chain attacks. A precision fire master.",
          abilities: [
            "Celestial Speed",
            "Chain Amplification",
            "Perfect Flame",
          ],
          fragment_interaction:
            "Chain bonuses spread to all nearby allies; attacks are precise and devastating",
          unit_synergy: "Moonlit Duelists gain fire damage and chain bonuses",
        },
        chaos: {
          name: "Infernal Ronin",
          description:
            "Massive AoE attacks with persistent fear aura. Unstoppable in melee.",
          abilities: ["Infernal Nova", "Fear Flame", "Unstoppable Charge"],
          fragment_interaction:
            "Fire attacks leave burning terrain that damages and fears enemies",
          unit_synergy:
            "Moonlit Duelists gain fear on hit; fire damage spreads",
        },
        hybrid: {
          name: "Balanced Ronin",
          description: "Moderate fire enhancement and chain bonuses.",
          abilities: ["Steady Flame", "Controlled Chain", "Balanced Fire"],
          fragment_interaction:
            "Moderate fire and chain effects with stability",
          unit_synergy: "Moonlit Duelists gain +1 attack and minor fire damage",
        },
      },
      signature_units: ["Moonlit Duelists"],
      strategic_notes:
        "Rengoku is the Veilbound's premier offensive melee commander. Build momentum through chain attacks and unleash devastating crescendos.",
      tags: ["aggressive", "momentum", "melee"],
    },
    {
      name: "Elite Commander Yukimaru",
      faction: "veilbound-shogunate",
      title: "The Spirit Fang",
      flavor_text:
        "The pack follows Yukimaru not because they must, but because his bond with the spirit wolves is absolute. Where he rides, the hunt begins.",
      theme: "Beast mastery, cavalry command",
      personality:
        "Wild, instinctive, communicates better with beasts than humans. Fiercely loyal to the pack.",
      playstyle: "Mounted attacks, immobilization, dual-stance mastery",
      base_stats: {
        Command: 7,
        Knowledge: 6,
        Leadership: 8,
        Agility: 9,
        Health: 100,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 9, RNG: 3, MOR: 10 },
      points_cost: 22,
      level_1_deck: {
        command: ["Spirit Fang Charge", "Pack Command"],
        tech: ["Shadow Bind", "Dual Stance Mastery"],
        fragment: ["Spirit Bond Activation"],
        tactical: ["Hunt Formation"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Bond Insight",
          chaos: "Wild Frenzy",
          tactical: "Pack Tactics",
        },
        level_3: {
          knowledge: "Controlled Hunt",
          chaos: "Shadow Beast",
          tactical: "Cavalry Mastery",
        },
        level_4: {
          knowledge: "Flow Bond",
          chaos: "Feral Charge",
          tactical: "Flanking Mastery",
        },
        level_5: {
          knowledge: "Spirit Harmony",
          chaos: "Beast Summoning",
          tactical: "Combined Pack",
        },
        level_6: {
          knowledge: "Perfect Bond",
          chaos: "Shadow Pack",
          tactical: "Hunt Mastery",
        },
        level_7: {
          knowledge: "Rider Unity",
          chaos: "Feral Storm",
          tactical: "Tactical Hunt",
        },
        level_8: {
          knowledge: "Flow Rider Mastery",
          chaos: "Beast Lord",
          tactical: "Supreme Pack",
        },
        level_9: {
          knowledge: "Spirit Perfection",
          chaos: "Shadow Alpha",
          tactical: "Total Hunt",
        },
        level_10: {
          knowledge: "Flow Rider",
          chaos: "Shadow Beastmaster",
          tactical: "Balanced Hunter",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Flow Rider",
          description:
            "Enhances all Spirit Rider cavalry effectiveness. The ultimate cavalry support commander.",
          abilities: ["Cavalry Enhancement", "Flow Riding", "Perfect Bond"],
          fragment_interaction:
            "All cavalry gain bonus Ritual Flow generation while charging",
          unit_synergy:
            "Spirit Wolf Packs gain +3 attack in groups; all cavalry gain +2 speed",
        },
        chaos: {
          name: "Shadow Beastmaster",
          description:
            "Summons shadow beasts alongside units. The pack grows beyond reality.",
          abilities: [
            "Shadow Summoning",
            "Beast Frenzy",
            "Pack Multiplication",
          ],
          fragment_interaction:
            "Spirit bonds can spawn shadow copies of bonded beasts",
          unit_synergy:
            "Spirit Wolf Packs duplicate unpredictably; shadow beasts join charges",
        },
        hybrid: {
          name: "Balanced Hunter",
          description: "Moderate cavalry enhancement with minor summoning.",
          abilities: ["Controlled Pack", "Steady Bond", "Balanced Hunt"],
          fragment_interaction: "Moderate cavalry and bond enhancement",
          unit_synergy:
            "Spirit Wolf Packs gain +1 attack; minor shadow beast chance",
        },
      },
      signature_units: ["Spirit Wolf Packs"],
      strategic_notes:
        "Yukimaru is the cavalry commander of the Veilbound. Pair him with multiple Spirit Rider units for overwhelming flanking attacks.",
      tags: ["cavalry-focus", "beast-mastery", "flanking"],
    },
    {
      name: "Commander Hisame",
      faction: "veilbound-shogunate",
      title: "The Celestial Bow",
      flavor_text:
        "Her arrows are drawn from starlight and released into destiny. Each shot finds not where the enemy is, but where they will be.",
      theme: "Ranged precision, stealth detection",
      personality:
        "Patient, observant, rarely speaks. When she does, every word is as precise as her aim.",
      playstyle:
        "Long-range precision, anti-elite specialist, stealth detection",
      base_stats: {
        Command: 7,
        Knowledge: 8,
        Leadership: 7,
        Agility: 8,
        Health: 85,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 9, MOV: 8, RNG: 6, MOR: 9 },
      points_cost: 20,
      level_1_deck: {
        command: ["Celestial Bow"],
        tech: ["Spirit Arrow", "Veil Sight"],
        fragment: ["Starlight Arrow Activation", "Precision Enhancement"],
        tactical: ["Sniper Position"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Precise Shot",
          chaos: "Void Arrow",
          tactical: "Quick Aim",
        },
        level_3: {
          knowledge: "Star Guidance",
          chaos: "Fear Arrow",
          tactical: "Range Mastery",
        },
        level_4: {
          knowledge: "Flow Arrow",
          chaos: "Dark Volley",
          tactical: "Anti-Elite Training",
        },
        level_5: {
          knowledge: "Celestial Sight",
          chaos: "Void Volley",
          tactical: "Combined Fire",
        },
        level_6: {
          knowledge: "Perfect Aim",
          chaos: "Shadow Arrow",
          tactical: "Ranged Mastery",
        },
        level_7: {
          knowledge: "Flow Precision",
          chaos: "Dark Rain",
          tactical: "Tactical Shooting",
        },
        level_8: {
          knowledge: "Star Mastery",
          chaos: "Void Storm",
          tactical: "Supreme Range",
        },
        level_9: {
          knowledge: "Celestial Perfection",
          chaos: "Shadow Barrage",
          tactical: "Total Precision",
        },
        level_10: {
          knowledge: "Star Archer",
          chaos: "Void Archer",
          tactical: "Balanced Archer",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Star Archer",
          description:
            "Bonus damage and range for all allied ranged units. Unmatched precision.",
          abilities: ["Star Shot", "Range Amplification", "Guided Fire"],
          fragment_interaction:
            "All ranged attacks gain homing and bonus damage",
          unit_synergy:
            "Dreampiercer Archers gain +3 range and +2 damage; all ranged units gain accuracy",
        },
        chaos: {
          name: "Void Archer",
          description:
            "Inflicts additional fear and damage over time. Arrows become cursed projectiles.",
          abilities: ["Void Shot", "Fear Arrow", "Cursed Volley"],
          fragment_interaction:
            "Arrows leave void zones that damage and fear enemies over time",
          unit_synergy:
            "Dreampiercer Archers gain void damage; shots apply persistent DoT",
        },
        hybrid: {
          name: "Balanced Archer",
          description: "Moderate range and damage enhancement.",
          abilities: ["Steady Aim", "Controlled Shot", "Balanced Precision"],
          fragment_interaction: "Moderate range and accuracy bonuses",
          unit_synergy: "Dreampiercer Archers gain +1 range and +1 damage",
        },
      },
      signature_units: ["Dreampiercer Archers"],
      strategic_notes:
        "Hisame controls the backline. Use her to snipe enemy commanders and reveal hidden threats. Essential against stealth-heavy opponents.",
      tags: ["ranged", "precision", "anti-stealth"],
    },
    {
      name: "Commander Midorikaze",
      faction: "veilbound-shogunate",
      title: "The Lotus Bloom",
      flavor_text:
        "In the garden of war, Midorikaze is both the gardener and the poison. Her enemies wilt before they understand why.",
      theme: "Debuff specialist, area control",
      personality:
        "Calm, nurturing to allies but merciless to enemies. Sees warfare as cultivation.",
      playstyle: "Area debuffs, minor control, momentum support",
      base_stats: {
        Command: 7,
        Knowledge: 8,
        Leadership: 8,
        Agility: 6,
        Health: 95,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 6, RNG: 6, MOR: 10 },
      points_cost: 22,
      level_1_deck: {
        command: ["Lotus Bloom"],
        tech: ["Spirit Bind", "Momentum Boost"],
        fragment: ["Lotus Energy Activation", "Debuff Enhancement"],
        tactical: ["Area Suppression"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Enhanced Bloom",
          chaos: "Toxic Lotus",
          tactical: "Quick Debuff",
        },
        level_3: {
          knowledge: "Flow Bloom",
          chaos: "Phantom Spores",
          tactical: "Debuff Mastery",
        },
        level_4: {
          knowledge: "Perfect Growth",
          chaos: "Dark Lotus",
          tactical: "Area Control",
        },
        level_5: {
          knowledge: "Sage Bloom",
          chaos: "Horror Bloom",
          tactical: "Strategic Debuff",
        },
        level_6: {
          knowledge: "Flow Garden",
          chaos: "Nightmare Spores",
          tactical: "Combined Control",
        },
        level_7: {
          knowledge: "Perfect Cultivation",
          chaos: "Phantom Garden",
          tactical: "Tactical Bloom",
        },
        level_8: {
          knowledge: "Lotus Mastery",
          chaos: "Dark Garden",
          tactical: "Supreme Control",
        },
        level_9: {
          knowledge: "Ultimate Bloom",
          chaos: "Horror Garden",
          tactical: "Total Suppression",
        },
        level_10: {
          knowledge: "Lotus Sage",
          chaos: "Lotus Horror",
          tactical: "Balanced Gardener",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Lotus Sage",
          description:
            "Improves Ritual Flow and unit efficiency. The garden feeds the army.",
          abilities: ["Flow Garden", "Efficient Bloom", "Sage Cultivation"],
          fragment_interaction: "Debuffs convert into Ritual Flow for allies",
          unit_synergy:
            "Lotus Ascetics gain +3 to all stats; debuffs last longer and are stronger",
        },
        chaos: {
          name: "Lotus Horror",
          description:
            "Summons phantoms and AoE debuffs. The garden becomes a nightmare.",
          abilities: ["Phantom Bloom", "Fear Spores", "Horror Garden"],
          fragment_interaction:
            "Debuff zones spawn phantom constructs that attack enemies",
          unit_synergy:
            "Lotus Ascetics gain phantom summoning; debuffs spread to additional targets",
        },
        hybrid: {
          name: "Balanced Gardener",
          description:
            "Moderate debuff enhancement with minor Flow generation.",
          abilities: ["Controlled Growth", "Steady Bloom", "Balanced Garden"],
          fragment_interaction:
            "Moderate debuff strength with minor Flow return",
          unit_synergy:
            "Lotus Ascetics gain +1 to all stats; debuffs have minor area spread",
        },
      },
      signature_units: ["Lotus Ascetics"],
      strategic_notes:
        "Midorikaze weakens enemy forces before engagement. Position her to debuff enemy formations, then charge with cavalry.",
      tags: ["debuff", "area-control", "support"],
    },
    {
      name: "Commander Kagero",
      faction: "veilbound-shogunate",
      title: "The Shadow Phantom",
      flavor_text:
        "Kagero does not fight battles. He ends them — silently, suddenly, and with the certainty of a closing eye.",
      theme: "Stealth operations, assassination",
      personality:
        "Silent, deadly, moves like smoke. His loyalty is absolute but his methods are unsettling even to allies.",
      playstyle: "Teleport strikes, stealth, chain momentum for allies",
      base_stats: {
        Command: 6,
        Knowledge: 7,
        Leadership: 7,
        Agility: 10,
        Health: 80,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 8, MOV: 10, RNG: 3, MOR: 9 },
      points_cost: 19,
      level_1_deck: {
        command: ["Phantom Strike"],
        tech: ["Veil Shroud", "Dual Momentum"],
        fragment: ["Shadow Manifestation", "Phantom Edge"],
        tactical: ["Silent Kill"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Flow Shadow",
          chaos: "Dark Strike",
          tactical: "Quick Shadow",
        },
        level_3: {
          knowledge: "Controlled Phantom",
          chaos: "Fear Shadow",
          tactical: "Stealth Mastery",
        },
        level_4: {
          knowledge: "Flow Phase",
          chaos: "Shadow Storm",
          tactical: "Assassination Training",
        },
        level_5: {
          knowledge: "Phantom Flow",
          chaos: "Dark Assassination",
          tactical: "Combined Stealth",
        },
        level_6: {
          knowledge: "Perfect Stealth",
          chaos: "Nightmare Shadow",
          tactical: "Shadow Mastery",
        },
        level_7: {
          knowledge: "Flow Phantom",
          chaos: "Void Shadow",
          tactical: "Tactical Ghost",
        },
        level_8: {
          knowledge: "Shadow Legend",
          chaos: "Dark Phantom",
          tactical: "Supreme Stealth",
        },
        level_9: {
          knowledge: "Ultimate Phantom",
          chaos: "Shadow Nightmare",
          tactical: "Total Shadow",
        },
        level_10: {
          knowledge: "Flow Phantom",
          chaos: "Shadow Phantom",
          tactical: "Balanced Phantom",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Flow Phantom",
          description:
            "Enhances Flow generation and chain bonuses through phantom strikes.",
          abilities: [
            "Flow Generation on Kill",
            "Chain Enhancement",
            "Phantom Flow",
          ],
          fragment_interaction:
            "Kills generate massive Ritual Flow; chains spread invisibility",
          unit_synergy:
            "Silent Ink Assassins gain Flow generation; all stealth units gain chain bonuses",
        },
        chaos: {
          name: "Shadow Phantom",
          description:
            "Additional AoE damage with fear on every phantom strike.",
          abilities: ["Fear Strike", "Shadow Explosion", "Phantom Terror"],
          fragment_interaction:
            "Phantom strikes leave fear zones and shadow damage areas",
          unit_synergy:
            "Silent Ink Assassins gain AoE fear; kills trigger shadow explosions",
        },
        hybrid: {
          name: "Balanced Phantom",
          description:
            "Moderate stealth enhancement with controlled fear effects.",
          abilities: [
            "Controlled Shadow",
            "Steady Phantom",
            "Balanced Stealth",
          ],
          fragment_interaction:
            "Moderate stealth and fear effects with stability",
          unit_synergy:
            "Silent Ink Assassins gain +1 attack and minor fear effect",
        },
      },
      signature_units: ["Silent Ink Assassins"],
      strategic_notes:
        "Kagero is the Veilbound's assassination specialist. Use him to eliminate key targets before the main engagement begins.",
      tags: ["stealth", "assassination", "agility"],
    },
    {
      name: "Commander Tsuyukusa",
      faction: "veilbound-shogunate",
      title: "The Ink Current",
      flavor_text:
        "The ink flows where Tsuyukusa wills it. She reshapes the currents of battle like water reshaping stone — slowly, inevitably.",
      theme: "Repositioning, Flow enhancement, morale disruption",
      personality:
        "Fluid, adaptable, sees every battle as a flowing river. Patient and methodical.",
      playstyle:
        "Movement bonuses, minor AoE Flow boost, enemy morale reduction",
      base_stats: {
        Command: 7,
        Knowledge: 8,
        Leadership: 7,
        Agility: 7,
        Health: 90,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 9, MOV: 7, RNG: 6, MOR: 9 },
      points_cost: 21,
      level_1_deck: {
        command: ["Inkstep"],
        tech: ["Ritual Burst", "Veil Aura"],
        fragment: ["Ink Current Activation", "Flow Pulse"],
        tactical: ["Repositioning"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Flow Current",
          chaos: "Dark Ink",
          tactical: "Quick Reposition",
        },
        level_3: {
          knowledge: "Controlled Flow",
          chaos: "Corrupt Current",
          tactical: "Ink Mastery",
        },
        level_4: {
          knowledge: "Perfect Current",
          chaos: "Ink Poison",
          tactical: "Area Movement",
        },
        level_5: {
          knowledge: "Sage Current",
          chaos: "Dark Wave",
          tactical: "Strategic Ink",
        },
        level_6: {
          knowledge: "Flow River",
          chaos: "Nightmare Current",
          tactical: "Combined Reposition",
        },
        level_7: {
          knowledge: "Perfect Ink",
          chaos: "Void Current",
          tactical: "Tactical Flow",
        },
        level_8: {
          knowledge: "Current Mastery",
          chaos: "Dark Flood",
          tactical: "Supreme Ink",
        },
        level_9: {
          knowledge: "Ultimate Current",
          chaos: "Ink Collapse",
          tactical: "Total Flow",
        },
        level_10: {
          knowledge: "Ink Master",
          chaos: "Corrupt Ink",
          tactical: "Balanced Current",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Ink Master",
          description:
            "Enhances Ritual Flow and reduces cooldowns. The current carries all allies forward.",
          abilities: ["Flow Enhancement", "Cooldown Reduction", "Ink Mastery"],
          fragment_interaction:
            "All Ritual Flow doubled; abilities recharge significantly faster",
          unit_synergy:
            "Ink Sigil Crafters gain double range; all units gain repositioning bonus",
        },
        chaos: {
          name: "Corrupt Ink",
          description:
            "AoE debuff and damage over time. The ink becomes poison.",
          abilities: ["Toxic Current", "Ink Poison", "Dark Flow"],
          fragment_interaction:
            "Ink trails damage and slow enemies; debuffs persist",
          unit_synergy:
            "Ink Sigil Crafters gain DoT effects; ink zones spread corruption",
        },
        hybrid: {
          name: "Balanced Current",
          description: "Moderate Flow enhancement with minor debuff effects.",
          abilities: ["Controlled Current", "Steady Ink", "Balanced Flow"],
          fragment_interaction: "Moderate Flow and minor debuff effects",
          unit_synergy:
            "Ink Sigil Crafters gain +1 range; minor DoT on ink zones",
        },
      },
      signature_units: ["Ink Sigil Crafters"],
      strategic_notes:
        "Tsuyukusa excels at repositioning and Flow management. Use her for flexible, adaptive battle plans.",
      tags: ["repositioning", "flow-management", "debuff"],
    },
    {
      name: "Commander Hoshikami",
      faction: "veilbound-shogunate",
      title: "The Star Weaver",
      flavor_text:
        "Hoshikami's illusions are so perfect that even his allies sometimes wonder which version of reality is real. In the end, it doesn't matter — all versions serve his purpose.",
      theme: "Illusions, ranged area control, Flow amplification",
      personality:
        "Enigmatic, playful, treats warfare as a grand performance. Always smiling behind his mask.",
      playstyle:
        "Long-range area attacks, illusion creation, Flow amplification",
      base_stats: {
        Command: 7,
        Knowledge: 9,
        Leadership: 7,
        Agility: 7,
        Health: 85,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 9, MOV: 7, RNG: 6, MOR: 9 },
      points_cost: 19,
      level_1_deck: {
        command: ["Starfall Volley"],
        tech: ["Veil Phantasm", "Flow Link"],
        fragment: ["Star Energy Activation", "Illusion Weave"],
        tactical: ["Area Bombardment"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Star Precision",
          chaos: "Phantom Star",
          tactical: "Quick Volley",
        },
        level_3: {
          knowledge: "Flow Star",
          chaos: "Dark Illusion",
          tactical: "Illusion Mastery",
        },
        level_4: {
          knowledge: "Perfect Weave",
          chaos: "Horror Illusion",
          tactical: "Area Mastery",
        },
        level_5: {
          knowledge: "Celestial Link",
          chaos: "Phantom Storm",
          tactical: "Combined Illusion",
        },
        level_6: {
          knowledge: "Star Network",
          chaos: "Nightmare Weave",
          tactical: "Star Mastery",
        },
        level_7: {
          knowledge: "Perfect Flow Link",
          chaos: "Dark Star Rain",
          tactical: "Tactical Stars",
        },
        level_8: {
          knowledge: "Star Legend",
          chaos: "Phantom Rain",
          tactical: "Supreme Illusion",
        },
        level_9: {
          knowledge: "Ultimate Star",
          chaos: "Star Nightmare",
          tactical: "Total Weave",
        },
        level_10: {
          knowledge: "Star Sage",
          chaos: "Star Horror",
          tactical: "Balanced Weaver",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Star Sage",
          description:
            "Greatly enhances Ritual Flow generation and chain bonuses. The stars align for all allies.",
          abilities: [
            "Flow Amplification",
            "Chain Enhancement",
            "Star Guidance",
          ],
          fragment_interaction:
            "All Ritual Flow tripled in range; chain bonuses spread further",
          unit_synergy:
            "Celestial Slingers gain +3 range and +2 AoE; all units gain Flow boost",
        },
        chaos: {
          name: "Star Horror",
          description:
            "Illusions become semi-real, dealing actual damage. Reality becomes uncertain.",
          abilities: ["Real Illusions", "Phantom Damage", "Star Nightmare"],
          fragment_interaction:
            "Illusions deal 50% real damage; enemies cannot distinguish real from phantom",
          unit_synergy:
            "Celestial Slingers gain phantom duplicates; illusion attacks deal damage",
        },
        hybrid: {
          name: "Balanced Weaver",
          description: "Moderate illusion and Flow enhancement.",
          abilities: ["Controlled Stars", "Steady Weave", "Balanced Illusion"],
          fragment_interaction:
            "Moderate illusion effectiveness with Flow boost",
          unit_synergy:
            "Celestial Slingers gain +1 range; minor illusion effects",
        },
      },
      signature_units: ["Celestial Slingers"],
      strategic_notes:
        "Hoshikami combines ranged control with illusion warfare. Use him to confuse and overwhelm enemies at distance before cavalry closes.",
      tags: ["illusion", "ranged", "flow-amplification"],
    },
  ];
  commanders.forEach(c => gameData.commanders.push(c));

  // Units
  const units = [
    // ===================== VEILBOUND SHOGUNATE UNITS =====================
    // War Machines
    {
      name: "Shrine Dragon",
      faction: "veilbound-shogunate",
      points_cost: 14,
      role: "War Machine",
      fragment_interactions:
        "Reality-phase strikes; flame-based ritual attacks; Ritual Flow enhances AoE",
      flavor_text: "Serpentine cosmic dragon fused with shrine architecture",
      type: "War Machine",
      stats: { ATK: 7, DEF: 4, HP: 10, MOV: 8, RNG: 12, MOR: 10 },
      special: [
        'Dragon Breath (Blast: hits target + all within 2")',
        "Fly",
        "Phase Strike (melee attacks ignore DEF bonuses from cover)",
        "Fearless",
      ],
      ritual_flow: 3,
    },
    {
      name: "Walking Torii Gate",
      faction: "veilbound-shogunate",
      points_cost: 12,
      role: "War Machine",
      fragment_interactions:
        "Warps battlefield geometry; boosts nearby bond generation",
      flavor_text:
        "Colossal torii gate with phasing pillars, eyes of cosmic energy along crossbeams",
      type: "War Machine",
      stats: { ATK: 4, DEF: 5, HP: 9, MOV: 4, RNG: 1, MOR: 10 },
      special: [
        'Reality Warp (once per turn: teleport one friendly unit within 6" to any point within 6" of this model)',
        'Flow Beacon (friendly units within 3" generate +2 Ritual Flow)',
        "Fearless",
      ],
      ritual_flow: 4,
    },
    {
      name: "Komainu Guardian Colossus",
      faction: "veilbound-shogunate",
      points_cost: 13,
      role: "War Machine",
      fragment_interactions:
        "Defensive anchor; aura induces fear in enemies; Ritual Flow boosts counterattacks",
      flavor_text: "Giant lion-dog made of living starlight and ink",
      type: "War Machine",
      stats: { ATK: 6, DEF: 5, HP: 10, MOV: 5, RNG: 1, MOR: 10 },
      special: [
        'Terror Aura (enemies within 3" suffer -1 MOR)',
        "Guardian (counterattacks at full ATK when attacked in melee)",
        "Fearless",
      ],
      ritual_flow: 2,
    },
    {
      name: "Spirit Temple Walker",
      faction: "veilbound-shogunate",
      points_cost: 11,
      role: "War Machine",
      fragment_interactions:
        "Summons minor spirits; shields allies; creates terrain hazards",
      flavor_text: "Living temple with spirit-infused arms and shifting walls",
      type: "War Machine",
      stats: { ATK: 4, DEF: 5, HP: 8, MOV: 4, RNG: 1, MOR: 10 },
      special: [
        'Spirit Summon (once per turn: place a Spirit Token within 6" — acts as Light Cover and deals 1 damage to enemies who enter it)',
        'Shield Aura (friendly units within 3" gain +1 DEF)',
        "Fearless",
      ],
      ritual_flow: 3,
    },
    {
      name: "Hollow Ronin Construct",
      faction: "veilbound-shogunate",
      points_cost: 12,
      role: "War Machine",
      fragment_interactions:
        "Multi-target phasing strikes; temporary battlefield terror effect",
      flavor_text: "Shadowed samurai of immense size, half flesh, half void",
      type: "War Machine",
      stats: { ATK: 7, DEF: 4, HP: 8, MOV: 6, RNG: 1, MOR: 10 },
      special: [
        'Multi-Strike (may split ATK dice between up to 3 targets within 2")',
        "Phase (ignore Engagement — may move freely through enemy units)",
        "Terror Aura",
        "Fearless",
      ],
      ritual_flow: 1,
    },
    {
      name: "Celestial Ink Dragon",
      faction: "veilbound-shogunate",
      points_cost: 13,
      role: "War Machine",
      fragment_interactions:
        "AoE ranged attacks; obscures enemy vision; temporarily disables units",
      flavor_text: "Dragon-shaped ink cloud solidified in starlight form",
      type: "War Machine",
      stats: { ATK: 6, DEF: 4, HP: 9, MOV: 8, RNG: 16, MOR: 10 },
      special: [
        'Ink Cloud (after attacking, target area becomes obscured: -2 ATK for enemies within 2" for 1 turn)',
        "Fly",
        'Blast (hits target + all within 1")',
        "Fearless",
      ],
      ritual_flow: 2,
    },
    {
      name: "Eclipse Manta Titan",
      faction: "veilbound-shogunate",
      points_cost: 14,
      role: "War Machine",
      fragment_interactions:
        "Gliding battlefield suppression; knockback waves; airborne disruption",
      flavor_text:
        "Gigantic manta-like creature with void-black wings spanning hundreds of feet",
      type: "War Machine",
      stats: { ATK: 6, DEF: 4, HP: 10, MOV: 10, RNG: 6, MOR: 10 },
      special: [
        "Fly",
        'Knockback Wave (after moving over enemy units, each must pass MOR check or be pushed 3" and take 1 damage)',
        "Suppression (enemy units this model flew over cannot shoot this turn)",
        "Fearless",
      ],
      ritual_flow: 2,
    },
    {
      name: "Lotus Ascendant Monolith",
      faction: "veilbound-shogunate",
      points_cost: 11,
      role: "War Machine",
      fragment_interactions:
        "Buffs nearby units; blooms to release massive area attacks; amplifies Ritual Flow",
      flavor_text:
        "Towering lotus flower with living petals, pulsating with ritual energy",
      type: "War Machine",
      stats: { ATK: 3, DEF: 5, HP: 8, MOV: 3, RNG: 1, MOR: 10 },
      special: [
        'Bloom (spend 5 Ritual Flow: deal 3 damage to all enemy units within 4")',
        'Flow Beacon (friendly units within 3" generate +2 Ritual Flow)',
        "Immovable",
        "Fearless",
      ],
      ritual_flow: 5,
    },
    {
      name: "Veilbound Oni Juggernaut",
      faction: "veilbound-shogunate",
      points_cost: 15,
      role: "War Machine",
      fragment_interactions:
        "Heavy shock role; devastating melee; causes fear aura in all adjacent units",
      flavor_text:
        "Gigantic Oni armored in celestial patterns, wielding oversized weapons",
      type: "War Machine",
      stats: { ATK: 9, DEF: 4, HP: 12, MOV: 5, RNG: 1, MOR: 10 },
      special: [
        "Devastating Charge (+3 ATK dice when charging)",
        'Terror Aura (enemies within 3" suffer -2 MOR)',
        "Fearless",
        'Rampage (if this unit destroys an enemy, it may immediately charge another enemy within 4")',
      ],
    },
    {
      name: "Shrouded Throne Entity",
      faction: "veilbound-shogunate",
      points_cost: 15,
      role: "War Machine",
      fragment_interactions:
        "Battlefield-altering aura; reality distortions; amplifies all Ritual Flow-based abilities nearby",
      flavor_text:
        "Walking throne with spectral figures orbiting; pilot merges partially into it",
      type: "War Machine",
      stats: { ATK: 5, DEF: 5, HP: 12, MOV: 4, RNG: 8, MOR: 10 },
      special: [
        'Reality Distortion (all enemy units within 6" suffer -1 ATK and -1 MOV)',
        'Flow Nexus (doubles Ritual Flow generated by all friendly units within 6")',
        "Fearless",
        "Immovable",
      ],
      ritual_flow: 5,
    },
    // Veilbound Infantry
    {
      name: "Shrine Wardens",
      faction: "veilbound-shogunate",
      points_cost: 2,
      role: "Defensive",
      fragment_interactions: "Ritual Flow +1; hold objectives",
      flavor_text: "Defensive spear infantry; backbone of formations",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Stance",
        'Objective Holders (+1 DEF when within 3" of an objective marker)',
      ],
    },
    {
      name: "Veiled Ashigaru",
      faction: "veilbound-shogunate",
      points_cost: 1,
      role: "Core combat",
      fragment_interactions: "Ritual Flow +1; synergy with mounted allies",
      flavor_text:
        "Flexible infantry; basic frontline with mounted unit synergy",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 5, RNG: 1, MOR: 6 },
      special: [
        "Stance",
        "Cavalry Screen (+1 DEF when adjacent to a friendly Cavalry unit)",
      ],
    },
    {
      name: "Mask Bearers",
      faction: "veilbound-shogunate",
      points_cost: 2,
      role: "Support",
      fragment_interactions:
        "Ritual Flow +2; reduces enemy morale and corruption spread",
      flavor_text: "Defensive aura units that suppress enemy morale",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        'Dread Aura (enemies within 3" suffer -1 MOR)',
        "Non-combatant",
      ],
    },
    {
      name: "Inkblade Initiates",
      faction: "veilbound-shogunate",
      points_cost: 1,
      role: "Duelist",
      fragment_interactions: "Ritual Flow +1; minor skill boost on duels",
      flavor_text: "Beginner duelists with 1v1 focus",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 6, RNG: 1, MOR: 6 },
      special: [
        "Stance",
        "Duelist (reroll 1 die when in 1v1 melee engagement)",
      ],
    },
    {
      name: "Banner of Silent Prayer",
      faction: "veilbound-shogunate",
      points_cost: 2,
      role: "Support",
      fragment_interactions:
        "Ritual Flow +2; buffs nearby units, increases bond generation",
      flavor_text: "Support shrine unit that amplifies nearby allies",
      type: "Support",
      ritual_flow: 2,
      stats: { ATK: 0, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        'Inspiring (+1 MOR to friendly units within 3")',
        'Flow Amplifier (friendly units within 3" generate +1 Ritual Flow)',
        "Non-combatant",
      ],
    },
    {
      name: "Temple Defenders",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Defensive",
      fragment_interactions: "Ritual Flow +1; strong against shock attacks",
      flavor_text: "Shield-heavy counter units that anchor formations",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 5, HP: 3, MOV: 4, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        'Shield Wall (friendly units within 2" gain +1 DEF vs ranged)',
        "Brace (enemy Charge bonuses are negated against this unit)",
      ],
    },
    {
      name: "Starblade Samurai",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Heavy hitter",
      fragment_interactions:
        "Ritual Flow +2; extra strike damage in Revelation Stance",
      flavor_text: "High-value melee elite with devastating stance attacks",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 4, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        "Revelation Mastery (in Revelation Stance: crits on 5+ instead of 6)",
      ],
    },
    {
      name: "Oni Mask Executioners",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Elite assault",
      fragment_interactions:
        "Ritual Flow +1; terror aura, strong vs damaged enemies",
      flavor_text: "Fear-inducing elite warriors that finish wounded foes",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 6, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        "Executioner (+2 ATK dice against targets below half HP)",
        'Terror Aura (enemies within 3" suffer -1 MOR)',
      ],
    },
    {
      name: "Moonlit Duelists",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Duelist",
      fragment_interactions:
        "Ritual Flow +2; counterattack bonus, challenge enemy elites",
      flavor_text: "Expert duelists specializing in counterattacks",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 6, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        "Riposte (when attacked in melee and survives, immediately make a free 2-die counter-attack)",
        "Duelist",
      ],
    },
    {
      name: "Lotus Ascetics",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Adaptive",
      fragment_interactions:
        "Ritual Flow +2; temporary stance adaptation (offense/defense)",
      flavor_text: "Adaptive fighters who shift between combat stances",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        "Adaptive (may switch stance as a free action at ANY point during the turn, not just Movement Phase)",
      ],
    },
    {
      name: "Silent Ink Assassins",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Stealth",
      fragment_interactions:
        "Ritual Flow +1; bypass formations, minor disruption",
      flavor_text: "Teleporting assassins that bypass enemy lines",
      type: "Specialist",
      ritual_flow: 1,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 7 },
      special: [
        "Stealth",
        "Phase (ignore Engagement — move freely through enemies)",
        "Assassin (+2 ATK dice when attacking from Stealth)",
      ],
    },
    {
      name: "Kintsugi Blademasters",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Berserker",
      fragment_interactions:
        "Ritual Flow +1; bonus critical strikes when damaged",
      flavor_text: "Damage-activated elite; grow stronger as they take wounds",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 4, DEF: 4, HP: 4, MOV: 5, RNG: 1, MOR: 9 },
      special: [
        "Stance",
        "Kintsugi Rage (+1 ATK die for each HP lost)",
        "Gold-Scarred (crits on 5+ when below half HP)",
      ],
    },
    // Veilbound Cavalry
    {
      name: "Star Serpent Lancers",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Fast assault",
      fragment_interactions:
        "Ritual Flow +2; charge attack, chain momentum bonuses",
      flavor_text: "Fast flanking spirit rider cavalry with charge synergy",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 4, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 7 },
      special: [
        'Charge (+1 ATK die when charging 4"+)',
        "Momentum Chain (if this unit destroys an enemy on a charge, +2 ATK dice on next charge this game)",
      ],
    },
    {
      name: "Lunar Kitsune Riders",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Illusion",
      fragment_interactions:
        "Ritual Flow +2; mislead enemy targeting, evade detection",
      flavor_text: "Illusion cavalry that misdirects enemy attacks",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 8 },
      special: [
        "Illusion (enemy ranged attacks against this unit suffer -1 ATK die)",
        'Misdirect (once per turn: when targeted, redirect the attack to a different friendly unit within 3")',
      ],
    },
    {
      name: "Crimson Oni Riders",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Heavy shock",
      fragment_interactions: "Ritual Flow +1; disrupt formations, fear aura",
      flavor_text: "Heavy shock cavalry that breaks enemy lines with terror",
      type: "Cavalry",
      ritual_flow: 1,
      stats: { ATK: 5, DEF: 4, HP: 3, MOV: 8, RNG: 1, MOR: 8 },
      special: [
        "Charge (+2 ATK dice when charging)",
        'Terror Aura (enemies within 3" suffer -1 MOR)',
        "Formation Breaker (enemy units hit by charge lose Grid Cohesion bonuses for 1 turn)",
      ],
    },
    {
      name: "Void Crane Riders",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Aerial duelist",
      fragment_interactions: "Ritual Flow +2; bypass obstacles, dive attacks",
      flavor_text: "Aerial duelist cavalry that strikes from above",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 10, RNG: 1, MOR: 7 },
      special: [
        "Fly",
        "Dive Attack (+2 ATK dice on charge from Fly)",
        "Duelist",
      ],
    },
    {
      name: "Thunder Kirin Cavalry",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Momentum",
      fragment_interactions:
        "Ritual Flow +2; charge increases successive strike bonuses",
      flavor_text: "Momentum specialists whose charges build cascading power",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 7 },
      special: [
        "Charge (+1 ATK die)",
        "Cascading Thunder (each successive combat this unit enters in the same game adds +1 ATK die permanently, max +3)",
      ],
    },
    {
      name: "Dreambound Riders",
      faction: "veilbound-shogunate",
      points_cost: 7,
      role: "Reality-phase",
      fragment_interactions:
        "Ritual Flow +3; bypass positioning rules, minor phasing",
      flavor_text:
        "Reality-phase cavalry that ignores conventional battlefield rules",
      type: "Cavalry",
      ritual_flow: 3,
      stats: { ATK: 4, DEF: 3, HP: 3, MOV: 10, RNG: 1, MOR: 8 },
      special: [
        "Phase (ignore Engagement and terrain)",
        "Dream Step (once per game: remove from table, redeploy anywhere on the battlefield next turn)",
        "Charge (+1 ATK die)",
      ],
    },
    {
      name: "Shrine Lion Riders",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Defensive flank",
      fragment_interactions:
        "Ritual Flow +1; protect nearby units, defensive aura",
      flavor_text: "Defensive flank cavalry with protective aura",
      type: "Cavalry",
      ritual_flow: 1,
      stats: { ATK: 3, DEF: 4, HP: 3, MOV: 8, RNG: 1, MOR: 8 },
      special: [
        "Charge (+1 ATK die)",
        'Guardian Aura (friendly units within 3" gain +1 DEF)',
        "Bodyguard",
      ],
    },
    {
      name: "Ink Dragon Scouts",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Scout",
      fragment_interactions:
        "Ritual Flow +1; harassment attacks, quick movement",
      flavor_text: "Fast-response reconnaissance with harassing strikes",
      type: "Scout",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 9, RNG: 8, MOR: 7 },
      special: [
        'Scout (deploy 6" ahead)',
        'Hit-and-Run (may move 4" after attacking)',
      ],
    },
    {
      name: "Spirit Wolf Hunters",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Pack synergy",
      fragment_interactions:
        "Ritual Flow +2; attack bonus in groups, flank advantage",
      flavor_text: "Pack synergy cavalry with group attack bonuses",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 9, RNG: 1, MOR: 7 },
      special: [
        'Pack Tactics (+1 ATK die for each other Spirit Wolf Hunter unit within 3", max +3)',
        "Charge (+1 ATK die)",
      ],
    },
    {
      name: "Eclipse Manta Riders",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Aerial harassment",
      fragment_interactions:
        "Ritual Flow +2; aerial disruption, bypass terrain",
      flavor_text: "Gliding harassment cavalry that bypasses terrain obstacles",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 10, RNG: 6, MOR: 7 },
      special: [
        "Fly",
        "Suppression (enemy units this model flew over suffer -1 ATK this turn)",
        "Hit-and-Run",
      ],
    },
    // Veilbound Support
    {
      name: "Spirit Healer Monks",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Healing",
      fragment_interactions:
        "Ritual Flow +3; restore unit health, boost bonded units temporarily",
      flavor_text: "Healing and bond restoration specialists",
      type: "Support",
      ritual_flow: 3,
      stats: { ATK: 0, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Heal (restore 2 HP to adjacent friendly unit, once per turn)",
        "Non-combatant",
        'Flow Healer (spend 3 Ritual Flow: heal ALL friendly units within 4" for 1 HP)',
      ],
    },
    {
      name: "Flow Adepts",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Ritual amplification",
      fragment_interactions:
        "Ritual Flow +4; increase Ritual Flow for nearby units, enhance transformations",
      flavor_text:
        "Ritual amplification units that supercharge Flow generation",
      type: "Support",
      ritual_flow: 4,
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        'Flow Amplifier (friendly units within 3" generate +1 Ritual Flow)',
        'Ritual Surge (spend 5 Flow: one friendly unit within 6" gains +2 ATK dice this turn)',
      ],
    },
    {
      name: "Shrine Artificers",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Engineering",
      fragment_interactions:
        "Ritual Flow +2; deploy temporary barricades or small spirit constructs",
      flavor_text: "Trap and minor construct deployment specialists",
      type: "Support",
      ritual_flow: 2,
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        'Construct Spirit Wall (place Light Cover within 2")',
        'Spirit Trap (place trap token within 3": 1 damage + -1 MOV on trigger)',
      ],
    },
    {
      name: "Lantern Bearers",
      faction: "veilbound-shogunate",
      points_cost: 2,
      role: "Morale support",
      fragment_interactions:
        "Ritual Flow +1; illuminate battlefield, reduce fear effects on allies",
      flavor_text:
        "Morale and visibility support that protects allies from fear",
      type: "Support",
      ritual_flow: 1,
      stats: { ATK: 1, DEF: 3, HP: 1, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        'Lantern Light (friendly units within 4" ignore Terror Aura effects)',
        'Inspiring (+1 MOR to friendlies within 3")',
      ],
    },
    {
      name: "Ink Sigil Crafters",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Debuff",
      fragment_interactions:
        "Ritual Flow +2; apply temporary penalties to enemy units (movement or attack)",
      flavor_text:
        "Battlefield debuff specialists applying sigil-based penalties",
      type: "Support",
      ritual_flow: 2,
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 12, MOR: 7 },
      special: [
        'Sigil of Binding (target enemy unit within 12": -2 MOV next turn)',
        'Sigil of Weakness (target enemy unit within 12": -1 ATK die next turn)',
        "May use one Sigil per turn",
      ],
    },
    // Veilbound Artillery
    {
      name: "Dreampiercer Archers",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Long-range",
      fragment_interactions:
        "Ritual Flow +1; arrows bypass minor obstacles, minor enemy disorientation",
      flavor_text:
        "Long-range perception-altering archers whose arrows phase through cover",
      type: "Artillery",
      ritual_flow: 1,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 5, RNG: 20, MOR: 7 },
      special: [
        "Phase Arrows (target does not benefit from Light Cover)",
        "Disorientation (targets hit suffer -1 MOV next turn)",
      ],
    },
    {
      name: "Void Bolt Crossbowmen",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Heavy ranged",
      fragment_interactions:
        "Ritual Flow +1; bolt attacks deal high damage, can disrupt formations",
      flavor_text: "Heavy ranged unit firing void-infused bolts",
      type: "Artillery",
      ritual_flow: 1,
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 4, RNG: 16, MOR: 7 },
      special: [
        "Armor Piercing (target's DEF reduced by 1 for this attack)",
        "Heavy (cannot move and shoot same turn)",
      ],
    },
    {
      name: "Spirit Javelin Skirmishers",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Mobile ranged",
      fragment_interactions:
        "Ritual Flow +1; quick ranged attacks, bonus when retreating or flanking",
      flavor_text: "Mobile harassment specialists with spirit-infused javelins",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 6, RNG: 10, MOR: 7 },
      special: [
        "Stance",
        'Skirmish (may move 3" after making a ranged attack)',
        "Flank Bonus (+1 ATK die when attacking from flank)",
      ],
    },
    {
      name: "Celestial Slingers",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "AoE harassment",
      fragment_interactions:
        "Ritual Flow +2; hurl fragments infused with Ritual Flow for minor AoE effects",
      flavor_text: "Area harassment units hurling ritual-charged projectiles",
      type: "Artillery",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 5, RNG: 14, MOR: 7 },
      special: [
        'Blast (hits target + all within 1")',
        'Flow Infused (spend 2 Ritual Flow: Blast radius becomes 2")',
      ],
    },
    {
      name: "Shadow Marksmen",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Sniper",
      fragment_interactions:
        "Ritual Flow +2; extra damage vs commanders or unbound units, fear aura",
      flavor_text:
        "Elite snipers specializing in eliminating high-value targets",
      type: "Artillery",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 5, RNG: 22, MOR: 8 },
      special: [
        "Sharpshot (crits on 5+)",
        "Sniper (may target Commanders and Specialists regardless)",
        "Commander Hunter (+2 ATK dice when targeting enemy Commander)",
      ],
    },
    // Veilbound Specialists
    {
      name: "Ritual Captains",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Flow management",
      fragment_interactions:
        "Ritual Flow +5; enhance Ritual Flow, maintain bonds, minor battlefield manipulation",
      flavor_text:
        "Central Flow management officers critical for army coordination",
      type: "Specialist",
      ritual_flow: 5,
      stats: { ATK: 2, DEF: 4, HP: 3, MOV: 5, RNG: 1, MOR: 9 },
      special: [
        'Flow Nexus (friendly units within 4" generate +2 Ritual Flow)',
        'Ritual Command (spend 4 Flow: one friendly unit within 6" may immediately take an extra action)',
        "Commander Bond",
      ],
    },
    {
      name: "Spirit Monolith",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Area control",
      fragment_interactions:
        "Ritual Flow +4; blocks movement, alters terrain slightly, buffs nearby allies",
      flavor_text:
        "Immovable area control construct that reshapes the battlefield",
      type: "Specialist",
      ritual_flow: 4,
      stats: { ATK: 0, DEF: 6, HP: 6, MOV: 0, RNG: 1, MOR: 10 },
      special: [
        "Immovable (cannot move; placed during deployment)",
        'Zone of Power (friendly units within 3" gain +1 ATK die and +1 DEF)',
        "Blocks Movement (enemies cannot move through this unit)",
        "Non-combatant",
      ],
    },
    {
      name: "Veilbound Sigil Bearers",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Disruption",
      fragment_interactions:
        "Ritual Flow +3; apply positional penalties to enemies, minor fear effect",
      flavor_text: "Enemy disruption specialists wielding sigils of dread",
      type: "Specialist",
      ritual_flow: 3,
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        'Sigil of Dread (enemies within 4" suffer -1 ATK die)',
        "Terror Aura",
      ],
    },
    {
      name: "Phantom Ward Constructs",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Defensive",
      fragment_interactions:
        "Ritual Flow +2; stationary, reduce damage for nearby allies",
      flavor_text: "Defensive barricade constructs that shield allied units",
      type: "Support",
      ritual_flow: 2,
      stats: { ATK: 0, DEF: 5, HP: 5, MOV: 0, RNG: 1, MOR: 10 },
      special: [
        "Immovable (placed during deployment)",
        'Phantom Shield (friendly units within 2" reduce all damage by 1, minimum 0)',
        "Non-combatant",
      ],
    },
    {
      name: "Hollow Shrine Guardians",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Crowd control",
      fragment_interactions:
        "Ritual Flow +3; large AoE fear aura, slows enemies in zone",
      flavor_text:
        "Crowd control units emanating terror that slows all nearby foes",
      type: "Specialist",
      ritual_flow: 3,
      stats: { ATK: 3, DEF: 4, HP: 3, MOV: 4, RNG: 1, MOR: 9 },
      special: [
        'Terror Aura (enemies within 4" suffer -1 MOR — extended range)',
        'Slow Aura (enemies within 3" suffer -2 MOV)',
        "Fearless",
      ],
    },
    {
      name: "Ink Shadow Scouts",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Recon",
      fragment_interactions:
        "Ritual Flow +1; fast, avoid detection, minor enemy disruption",
      flavor_text: "Stealthy reconnaissance skirmishers",
      type: "Scout",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 8, RNG: 1, MOR: 7 },
      special: [
        'Scout (deploy 6" ahead)',
        "Stealth",
        'Disruption (enemies within 3" cannot benefit from Grid Cohesion)',
      ],
    },
    // Veilbound additional Infantry
    {
      name: "Moonlit Wanderers",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Hit-and-run",
      fragment_interactions:
        "Ritual Flow +1; can retreat without penalties, moderate dueling ability",
      flavor_text: "Hit-and-run melee skirmishers who fade after striking",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 6, RNG: 1, MOR: 7 },
      special: [
        "Stance",
        'Hit-and-Run (may move 4" after attacking)',
        "Free Disengage (Disengage does not cost full movement)",
      ],
    },
    {
      name: "Spirit Wolf Packs",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Group harassment",
      fragment_interactions:
        "Ritual Flow +2; synergy when used in groups, flank bonuses",
      flavor_text: "Pack synergy skirmishers that grow deadlier in numbers",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 7 },
      special: [
        "Stance",
        'Pack Tactics (+1 ATK die for each other Spirit Wolf Pack within 3", max +2)',
        "Flank Bonus (+1 ATK die from flank)",
      ],
    },
    {
      name: "Void Serpent Harriers",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Flanking",
      fragment_interactions:
        "Ritual Flow +2; moderate AoE strikes, evade frontline units",
      flavor_text: "Flanking skirmishers with area attack capability",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 7 },
      special: [
        "Stance",
        "Serpent Strike (melee hits target + 1 adjacent enemy)",
        "Phase (may move through enemy units)",
      ],
    },
    {
      name: "Lotus Phantom Assassins",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Elite skirmisher",
      fragment_interactions:
        "Ritual Flow +3; teleport short distances, bonus against high-value targets",
      flavor_text: "Elite skirmishers that teleport to strike priority targets",
      type: "Specialist",
      ritual_flow: 3,
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 8 },
      special: [
        "Phase",
        'Teleport (spend 3 Flow: immediately redeploy within 8")',
        "Assassin (+2 ATK dice vs Commanders and Specialists)",
      ],
    },
    {
      name: "Shrouded Shogun Vassals",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Personal guard",
      fragment_interactions:
        "Ritual Flow +5; only deployed with Shogun, extreme combat abilities",
      flavor_text: "The Shrouded Shogun's personal guard; unmatched in combat",
      type: "Specialist",
      ritual_flow: 5,
      stats: { ATK: 5, DEF: 5, HP: 4, MOV: 5, RNG: 1, MOR: 10 },
      special: [
        "Shogun Only (can only be taken if The Shrouded Shogun is your Commander)",
        "Bodyguard (redirect attacks from Shogun to this unit)",
        "Fearless",
        'Elite (+1 ATK die for each Vassal unit within 3")',
      ],
    },
    {
      name: "Masked Lord Retinue",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Elite protectors",
      fragment_interactions:
        "Ritual Flow +4; accompanies Masked Lords, buffs commander and nearby units",
      flavor_text: "Elite protectors bonded to their Masked Lord commander",
      type: "Specialist",
      ritual_flow: 4,
      stats: { ATK: 4, DEF: 4, HP: 3, MOV: 5, RNG: 1, MOR: 9 },
      special: [
        'Commander Bond (+1 ATK when within 6" of Commander)',
        "Bodyguard",
        "Retinue Synergy (your Commander gains +1 DEF while this unit is alive)",
      ],
    },
    {
      name: "Hollow Lord Phalanx",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Commander synergy",
      fragment_interactions:
        "Ritual Flow +3; maximizes momentum for Hollow Lord transformations",
      flavor_text:
        "Synergy unit designed to amplify Hollow Lord transformation power",
      type: "Infantry",
      ritual_flow: 3,
      stats: { ATK: 4, DEF: 4, HP: 4, MOV: 5, RNG: 1, MOR: 9 },
      special: [
        "Stance",
        "Transformation Catalyst (if Flow Pool ≥30, this unit gains +2 ATK dice and +1 DEF)",
        "Momentum Engine (generate +1 Flow for each enemy this unit damages)",
      ],
    },
    {
      name: "Spirit Dragon Cohort",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Cavalry bonus",
      fragment_interactions:
        "Ritual Flow +3; works best with Spirit Rider Cavalry, extra charge bonus",
      flavor_text:
        "Cavalry bonus unit that amplifies spirit rider charge attacks",
      type: "Cavalry",
      ritual_flow: 3,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 8 },
      special: [
        "Charge (+1 ATK die)",
        'Cavalry Amplifier (all friendly Cavalry within 3" gain +1 ATK die on charges)',
        "Dragon Bond (if adjacent to Shrine Dragon War Machine, gain +2 ATK dice)",
      ],
    },
    {
      name: "Inkblade Masters",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Commander elite melee",
      fragment_interactions:
        "Ritual Flow +2; bonus damage when adjacent to commanders, synergizes with dueling stance",
      flavor_text:
        "Commander elite melee specialists with devastating dueling prowess",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 4, DEF: 4, HP: 3, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        'Commander Bond (+2 ATK dice when within 3" of friendly Commander)',
        "Duelist",
        "Master Swordsman (reroll up to 2 missed dice per attack)",
      ],
    },

  ];
  units.forEach(u => gameData.units.push(u));

  // Fragments
  const fragments = [
    {
      name: "Spirit Thread",
      faction: "veilbound-shogunate",
      effects: "Grants +1 ATK die to an adjacent Spirit unit for one turn",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Stable and reliable; amplified by high Ritual Flow pools",
    },
    {
      name: "Ancestral Echo",
      faction: "veilbound-shogunate",
      effects: "Restores 2 HP to a wounded unit within 3\". Single use per turn",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Knowledge evolutions improve healing range; Chaos may overheal causing instability",
    },
    {
      name: "Veil Tear",
      faction: "veilbound-shogunate",
      effects: "Creates a 2\" zone of Difficult Terrain lasting 2 turns",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Chaos evolutions extend zone to 3\"; Knowledge makes it selective (allies pass freely)",
    },
    {
      name: "Phantom Mask",
      faction: "veilbound-shogunate",
      effects: "Grants Stealth to target unit until it attacks or is damaged",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Best with Shadow units; Chaos may grant stealth but also confuse allied targeting",
    },
    {
      name: "Ritual Blade",
      faction: "veilbound-shogunate",
      effects: "Target melee unit gains +2 ATK dice on next attack, then suffers 1 damage",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Chaos evolutions remove self-damage; Knowledge keeps +2 but also adds +1 DEF",
    },
    {
      name: "Flow Conduit",
      faction: "veilbound-shogunate",
      effects: "Generates +3 Ritual Flow immediately. Does not count as the turn's fragment use",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Pure Flow generation; Knowledge increases to +4, Chaos adds randomness (2d3)",
    },
    {
      name: "Yokai Summon",
      faction: "veilbound-shogunate",
      effects: "Places a Yokai token (ATK 2, DEF 2, HP 2) within 6\". Acts next turn. Lasts 3 turns",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Chaos extends Yokai lifespan to 5 turns but it may attack allies; Knowledge makes it controllable",
    },
    {
      name: "Soul Mirror",
      faction: "veilbound-shogunate",
      effects: "Reflect the next ranged attack targeting this unit back at the attacker",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Knowledge reflects at full damage; Chaos reflects at double but has 50% chance to fail",
    },
    {
      name: "Kitsune Charm",
      faction: "veilbound-shogunate",
      effects: "Force an enemy unit within 6\" to reroll its next ATK roll and take the lower result",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Pairs well with commander debuff cards; Knowledge extends to 2 attacks, Chaos extends range to 9\"",
    },
    {
      name: "Onryo Wail",
      faction: "veilbound-shogunate",
      effects: "All enemy units within 4\" must make an immediate Morale check at -1 MOR",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Devastating with Terror Aura units; Chaos increases to -2 MOR but may affect allies",
    },
    {
      name: "Celestial Ink",
      faction: "veilbound-shogunate",
      effects: "Draw 1 additional card this turn. Excess cards above hand limit discarded at end of turn",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Universal utility; Knowledge lets you choose which card to draw, Chaos draws 2 but random",
    },
    {
      name: "Void Step",
      faction: "veilbound-shogunate",
      effects: "Target unit may teleport up to 8\" in any direction. Cannot end within 1\" of enemies",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Chaos allows ending in engagement (surprise melee); Knowledge extends to 12\"",
    },
    {
      name: "Kami's Blessing",
      faction: "veilbound-shogunate",
      effects: "Target unit gains +2 MOR and Fearless until end of next turn",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Reliable morale control; Knowledge extends to 2 units, Chaos adds +1 ATK but risks overconfidence",
    },
    {
      name: "Dragon Vein Tap",
      faction: "veilbound-shogunate",
      effects: "Massive Flow surge: set your Flow Pool to maximum threshold. All Flow abilities unlock this turn",
      risk_instability: "Very High",
      activation_cost: 4,
      interaction_evolution:
        "Extremely powerful but dangerous; Chaos may cause Flow overflow (damage to all units within 6\")",
    },
    {
      name: "Shinigami Mark",
      faction: "veilbound-shogunate",
      effects: "Mark an enemy unit. All attacks against marked unit gain +1 ATK die for 2 turns",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Focus fire enabler; Knowledge extends to 3 turns, Chaos makes mark spread to adjacent enemies on kill",
    },
  ];
  fragments.forEach(f => gameData.fragments.push(f));
})();
