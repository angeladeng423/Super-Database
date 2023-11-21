const mongoose = require('mongoose');

const powersSchema = new mongoose.Schema({
    hero_names: {
        type: String,
        required: true
    },
    Agility: {
        type: String
    }, 
    accHealing: {
        type: String,
        alias: "Accelerated Healing"
    }, 
    powerRing: {
        type: String,
        alias: "Lantern Power Ring"
    }, 
    dimAwareness: {
        type: String,
        alias: "Dimensional Awareness"
    }, 
    coldRes: {
        type: String,
        alias: "Cold Resistance"
    }, 
    durability: {
        type: String,
        alias: "Durability"
    }, 
    energyAbs: {
        type: String,
        alias: "Energy Absorption"
    }, 
    Flight: {
        type: String
    }, 
    dangerSense: {
        type: String,
        alias: "Danger Sense"
    }, 
    underwaterBreathing: {
        type: String,
        alias: "Underwater breathing"
    }, 
    Marksmanship: {
        type: String
    }, 
    weaponMaster: {
        type: String,
        alias: "Weapons Master"
    }, 
    powAug: {
        type: String,
        alias: "Power Augmentation"
    },
    animalAtt: {
        type: String,
        alias: "Animal Attributes"
    }, 
    Longevity: {
        type: String
    },
    Intelligence: {
        type: String
    }, 
    supStrength: {
        type: String,
        alias: "Super Strength"
    },
    Cryokinesis: {
        type: String
    }, 
    Telepathy: {
        type: String,
    },
    eneArmor: {
        type: String,
        alias: "Energy Armor"
    }, 
    eneBlasts: {
        type: String,
        alias: "Energy Blast"
    },
    Duplication: {
        type: String
    }, 
    sizeChange: {
        type: String
    },
    densCont: {
        type: String,
        alias: "Density Control"
    },
    Stamina: {
        type: String
    },
    astralTravel: {
        type: String,
        alias: "Astral Travel"
    },
    audControl: {
        type: String,
        alias: "Audio Control"
    },
    Dexterity: {
        type: String
    },
    Omnitrix: {
        type: String
    },
    supSpeed: {
        type: String,
        alias: "Super Speed"
    },
    Possession: {
        type: String
    },
    animalOriPow: {
        type: String,
        alias: "Animal Oriented Powers"
    },
    weapBasedPow: {
        type: String,
        alias: "Weapon-based Powers"
    },
    Electrokinesis: {
        type: String,
    },
    darkForceManip: {
        type: String,
        alias: "Darkforce Manipulation"
    },
    deathTouch: {
        type: String,
        alias: "Death Touch"
    },
    Teleportation: {
        type: String
    },
    enhanSen: {
        type: String,
        alias: "Enhanced Senses"
    },
    Telekinesis: {
        type: String
    },
    eneBeams: {
        type: String,
        alias: "Energy Beams"
    },
    Magic: {
        type: String
    },
    Hyperkinesis: {
        type: String,
    },
    Jump: {
        type: String,
    },
    Clairvoyance: {
        type: String,
    },
    dimTravel: {
        type: String,
        alias: "Dimensional Travel"
    },
    powSens: {
        type: String,
        alias: "Power Sense"
    },
    sizeChange: {
        type: String,
    },
    sizeChange: {
        type: String,
    },
    sizeChange: {
        type: String,
    },
    Shapeshifting: {
        type: String
    },
    PeakHumanCondition: {
        type: String,
        alias: "Peak Human Condition"
    },
    Immortality: {
        type: String
    },
    Camouflage: {
        type: String
    },
    ElementControl: {
        type: String,
        alias: "Element Control"
    },
    Phasing: {
        type: String
    },
    AstralProjection: {
        type: String,
        alias: "Astral Projection"
    },
    ElectricalTransport: {
        type: String,
        alias: "Electrical Transport"
    },
    FireControl: {
        type: String,
        alias: "Fire Control"
    },
    Projection: {
        type: String
    },
    Summoning: {
        type: String
    },
    EnhancedMemory: {
        type: String,
        alias: "Enhanced Memory"
    },
    Reflexes: {
        type: String
    },
    Invulnerability: {
        type: String
    },
    EnergyConstructs: {
        type: String,
        alias: "Energy Constructs"
    },
    ForceFields: {
        type: String,
        alias: "Force Fields"
    },
    SelfSustenance: {
        type: String,
        alias: "Self-Sustenance"
    },
    AntiGravity: {
        type: String,
        alias: "Anti-Gravity"
    },
    Empathy: {
        type: String
    },
    PowerNullifier: {
        type: String,
        alias: "Power Nullifier"
    },
    RadiationControl: {
        type: String,
        alias: "Radiation Control"
    },
    PsionicPowers: {
        type: String,
        alias: "Psionic Powers"
    },
    Elasticity: {
        type: String
    },
    SubstanceSecretion: {
        type: String,
        alias: "Substance Secretion"
    },
    ElementalTransmogrification: {
        type: String,
        alias: "Elemental Transmogrification"
    },
    TechnopathCyberpath: {
        type: String,
        alias: "Technopath/Cyberpath"
    },
    PhotographicReflexes: {
        type: String,
        alias: "Photographic Reflexes"
    },
    SeismicPower: {
        type: String,
        alias: "Seismic Power"
    },
    Animation: {
        type: String
    },
    Precognition: {
        type: String
    },
    MindControl: {
        type: String,
        alias: "Mind Control"
    },
    FireResistance: {
        type: String,
        alias: "Fire Resistance"
    },
    PowerAbsorption: {
        type: String,
        alias: "Power Absorption"
    },
    EnhancedHearing: {
        type: String,
        alias: "Enhanced Hearing"
    },
    NovaForce: {
        type: String,
        alias: "Nova Force"
    },
    Insanity: {
        type: String
    },
    Hypnokinesis: {
        type: String,
    },
    AnimalControl: {
        type: String,
        alias: "Animal Control"
    },
    NaturalArmor: {
        type: String,
        alias: "Natural Armor"
    },
    Intangibility: {
        type: String
    },
    EnhancedSight: {
        type: String,
        alias: "Enhanced Sight"
    },
    MolecularManipulation: {
        type: String,
        alias: "Molecular Manipulation"
    },
    HeatGeneration: {
        type: String,
        alias: "Heat Generation"
    },
    Adaptation: {
        type: String
    },
    Gliding: {
        type: String
    },
    PowerSuit: {
        type: String,
        alias: "Power Suit"
    },
    MindBlast: {
        type: String,
        alias: "Mind Blast"
    },
    ProbabilityManipulation: {
        type: String,
        alias: "Probability Manipulation"
    },
    GravityControl: {
        type: String,
        alias: "Gravity Control"
    },
    Regeneration: {
        type: String
    },
    LightControl: {
        type: String,
        alias: "Light Control"
    },
    Echolocation: {
        type: String
    },
    Levitation: {
        type: String
    },
    ToxinAndDiseaseControl: {
        type: String,
        alias: "Toxin and Disease Control"
    },
    Banish: {
        type: String
    },
    EnergyManipulation: {
        type: String,
    },
    EnergyResistance: {
        type: String,
        alias: "Energy Resistance"
    },
    TelepathyResistance: {
        type: String,
        alias: "Telepathy Resistance"
    },
    MolecularCombustion: {
        type: String,
        alias: "Molecular Combustion"
    },
    Omnilingualism: {
        type: String
    },
    PortalCreation: {
        type: String,
        alias: "Portal Creation"
    },
    Magnetism: {
        type: String
    },
    MindControlResistance: {
        type: String,
        alias: "Mind Control Resistance"
    },
    PlantControl: {
        type: String,
        alias: "Plant Control"
    },
    Sonar: {
        type: String
    },
    SonicScream: {
        type: String,
        alias: "Sonic Scream"
    },
    TimeManipulation: {
        type: String,
        alias: "Time Manipulation"
    },
    EnhancedTouch: {
        type: String,
        alias: "Enhanced Touch"
    },
    MagicResistance: {
        type: String,
        alias: "Magic Resistance"
    },
    Invisibility: {
        type: String
    },
    SubMariner: {
        type: String,
        alias: "Sub-Mariner"
    },
    RadiationAbsorption: {
        type: String,
        alias: "Radiation Absorption"
    },
    IntuitiveAptitude: {
        type: String,
        alias: "Intuitive aptitude"
    },
    VisionMicroscopic: {
        type: String,
        alias: "Vision - Microscopic"
    },
    Melting: {
        type: String
    },
    WindControl: {
        type: String,
        alias: "Wind Control"
    },
    SuperBreath: {
        type: String,
        alias: "Super Breath"
    },
    Wallcrawling: {
        type: String
    },
    VisionNight: {
        type: String,
        alias: "Vision - Night"
    },
    VisionInfrared: {
        type: String,
        alias: "Vision - Infrared"
    },
    GrimReaping: {
        type: String,
        alias: "Grim Reaping"
    },
    MatterAbsorption: {
        type: String,
        alias: "Matter Absorption"
    },
    TheForce: {
        type: String,
        alias: "The Force"
    },
    Resurrection: {
        type: String
    },
    Terrakinesis: {
        type: String
    },
    VisionHeat: {
        type: String,
        alias: "Vision - Heat"
    },
    Vitakinesis: {
        type: String
    },
    RadarSense: {
        type: String,
        alias: "Radar Sense"
    },
    QwardianPowerRing: {
        type: String,
        alias: "Qwardian Power Ring"
    },
    WeatherControl: {
        type: String,
        alias: "Weather Control"
    },
    VisionXRay: {
        type: String,
        alias: "Vision - X-Ray"
    },
    VisionThermal: {
        type: String,
        alias: "Vision - Thermal"
    },
    WebCreation: {
        type: String,
        alias: "Web Creation"
    },
    RealityWarping: {
        type: String,
        alias: "Reality Warping"
    },
    OdinForce: {
        type: String,
        alias: "Odin Force"
    },
    SymbioteCostume: {
        type: String,
        alias: "Symbiote Costume"
    },
    SpeedForce: {
        type: String,
        alias: "Speed Force"
    },
    PhoenixForce: {
        type: String,
        alias: "Phoenix Force"
    },
    MolecularDissipation: {
        type: String,
        alias: "Molecular Dissipation"
    },
    VisionCryo: {
        type: String,
        alias: "Vision - Cryo"
    },
    Omnipresent: {
        type: String
    },
    Omniscient: {
        type: String
    }
});

module.exports = mongoose.model('Powers', powersSchema);