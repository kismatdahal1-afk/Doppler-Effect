/* ======================================================================
   APPLICATIONS & EXAMPLES — DATA (written in code, no runtime fetch)
   Content condensed from assets/docs/application-details.md.
   APPLICATIONS           → compact tile index (used by index.html cards)
   APPLICATION_DETAILS    → per-slug content for applications/<slug>/ pages
   Section block types:
     overview : [{label,value}]      p     : [paragraphs]
     ul / ol  : [items]              formula: [{label, tex}]
     vars     : [{tex, fallback, def}]   fact / summary : text
   ====================================================================== */
var APPLICATIONS = [
  { slug: "ambulance",         num: "01", title: "Ambulance Sirens",                      accent: "#ff4b5c", image: "assets/backgrounds/C1.png" },
  { slug: "train",             num: "02", title: "Train Whistles",                        accent: "#8b5cf6", image: "assets/backgrounds/C2.png" },
  { slug: "police-radar",      num: "03", title: "Police Radar Guns",                     accent: "#3b82f6", image: "assets/backgrounds/C3.png" },
  { slug: "weather-radar",     num: "04", title: "Doppler Radar",                     accent: "#22c55e", image: "assets/backgrounds/C4.png" },
  { slug: "medical-ultrasound",num: "05", title: "Medical Doppler Ultrasound",            accent: "#ec4899", image: "assets/backgrounds/C5.png" }
];

var APPLICATION_DETAILS = {

/* ======================================================================
   APPLICATION 01 — AMBULANCE SIRENS
   ====================================================================== */
ambulance: {
  title: "Ambulance Sirens",
  subtitle: "Emergency Transportation",
  heroDescription: "A speeding ambulance does not just carry a patient toward a hospital. It also carries a live physics demonstration, broadcasting a siren whose pitch rises as it approaches and falls as it departs, revealing in a few seconds exactly how motion reshapes the sound waves reaching your ear.",
  accent: "#ff4b5c",
  image: "../../assets/backgrounds/C1.png",
  num: "01",
  overview: [
    ["Category", "Everyday Acoustic Phenomenon"],
    ["Field", "Sound Physics and Transportation"],
    ["Wave Type", "Longitudinal Sound Wave"],
    ["Medium", "Air"],
    ["Primary Purpose", "Emergency vehicle alert and right-of-way warning"],
    ["Technology Used", "Electronic or mechanical siren, air as propagation medium"],
    ["Real-Life Importance", "Warns pedestrians and drivers of an approaching emergency vehicle, allowing time to clear the path"]
  ],
  sections: [
    { title: "Introduction", blocks: [
      { type: "p", text: [
        "An ambulance siren is a continuous, loud sound signal used to alert other road users that an emergency vehicle needs to pass quickly. The siren produces a fixed pattern of tones, yet the way we perceive it changes constantly as the vehicle moves relative to us.",
        "The pitch shift matters because it is not just a curiosity. It is a direct, audible consequence of the same physics used in radar, ultrasound, and astronomy, making it the ideal starting point for understanding wave behaviour."
      ]}
    ]},
    { title: "How the Doppler Effect Works", blocks: [
      { type: "p", text: [
        "Consider an ambulance driving toward a person standing on a footpath. Each time the siren completes one cycle of its wave, the ambulance has moved slightly closer to the observer, so each new wavefront starts its journey closer than the one before. Successive wavefronts therefore arrive more closely spaced in time than they would if the ambulance were standing still.",
        "A shorter time gap between arriving wavefronts means a higher frequency, so the observer hears a pitch higher than the siren's true frequency. Once the ambulance passes and moves away, each new wavefront starts from a position farther away, the wavefronts arrive more spread out in time, and the pitch drops below the true frequency.",
        "The siren itself never changes. Only the observer's perception changes, because the physical spacing of the wavefronts has been altered by the motion of the source."
      ]}
    ]},
    { title: "Physics Behind the Application", blocks: [
      { type: "p", text: [
        "This is a source-in-motion scenario: the siren moves through the air while the observer remains stationary on the roadside. When the source moves toward the observer, the wavefronts are physically compressed, shortening the wavelength on the approaching side. A shorter wavelength means a higher observed frequency, since the wave speed in air stays constant.",
        "When the source moves away, the wavefronts are stretched out behind it, lengthening the wavelength and lowering the observed frequency. The speed of sound in air, roughly 343 m/s at room temperature, is treated as constant, so it is the ambulance's velocity relative to this wave speed that determines how strongly the pitch shifts."
      ]}
    ]},
    { title: "Mathematical Principle", blocks: [
      { type: "formula", cards: [
        { label: "Source Approaching", tex: "f' = f \\left( \\dfrac{V}{V - V_s} \\right)", fallback: "f' = f · V / (V - Vs)" },
        { label: "Source Receding",    tex: "f' = f \\left( \\dfrac{V}{V + V_s} \\right)", fallback: "f' = f · V / (V + Vs)" }
      ]},
      { type: "vars", items: [
        { tex: "f",  fallback: "f",  def: "true frequency of the siren as produced by the source" },
        { tex: "f'", fallback: "f′", def: "apparent frequency heard by the observer" },
        { tex: "V",  fallback: "V",  def: "speed of sound in air" },
        { tex: "V_s",fallback: "Vs", def: "speed of the ambulance" }
      ]},
      { type: "p", text: [
        "These equations apply when the observer is stationary and the source moves directly toward or away along the same line. If the ambulance moves at an angle, only the component of velocity along the line joining source and observer contributes to the shift."
      ]}
    ]},
    { title: "Step-by-Step Working Process", blocks: [
      { type: "ol", items: [
        "The siren emits sound waves at a fixed, true frequency while the ambulance is in motion.",
        "As it approaches, each new wavefront originates closer to the observer, compressing the spacing between wavefronts.",
        "The compressed wavefronts reach the ear more frequently, so the apparent frequency rises and the pitch sounds higher.",
        "As the ambulance passes and moves away, each new wavefront originates farther from the observer.",
        "The stretched wavefronts reach the ear less frequently, so the apparent frequency falls and the pitch sounds lower.",
        "The observer hears a smooth transition from higher to lower pitch exactly as the ambulance passes their position."
      ]}
    ]},
    { title: "Real-Life Scenario", blocks: [
      { type: "p", text: [
        "Picture yourself standing at a bus stop on a busy street. In the distance you hear a faint, high-pitched wail that grows louder and sharper as the ambulance races toward you. As it draws level and speeds past, the pitch drops within a second or two, almost as if the siren itself had changed. The ambulance continues down the road, its siren now lower and more distant, until it fades out of earshot."
      ]}
    ]},
    { title: "Practical Importance", blocks: [
      { type: "p", text: [
        "The pitch shift carries useful information: drivers and pedestrians can often judge, even without looking, whether an emergency vehicle is approaching or moving away, and react by clearing a path or staying put.",
        "The same principle forms the physics foundation for far more advanced technology, from radar systems and medical imaging to the astronomical measurements used to study distant galaxies."
      ]}
    ]},
    { title: "Advantages", blocks: [
      { type: "ul", items: [
        "Provides an audible, easy-to-understand real-world introduction to the Doppler Effect",
        "Requires no equipment or instruments to observe or experience",
        "Helps drivers and pedestrians judge the direction of an approaching emergency vehicle",
        "Builds physical intuition that supports understanding of radar, sonar, and ultrasound",
        "Connects an abstract formula directly to a familiar everyday experience"
      ]}
    ]},
    { title: "Limitations", blocks: [
      { type: "ul", items: [
        "The pitch shift is small at low vehicle speeds and can be difficult to notice clearly",
        "Traffic noise and ambient sounds can mask the effect in busy environments",
        "The shift is strongest only when the vehicle moves directly toward or away from the observer",
        "Temperature and wind affect the actual speed of sound, introducing small inaccuracies in calculations",
        "The simple formula assumes straight-line motion and does not apply if the ambulance turns a corner nearby"
      ]}
    ]},
    { title: "Interesting Facts", blocks: [
      { type: "ul", items: [
        "Alongside train whistles, this is one of the two situations most physics textbooks use to introduce the Doppler Effect",
        "Christian Doppler, who explained the effect in 1842, was thinking primarily about the color of light from stars",
        "A siren on a highway produces a more dramatic shift than the same siren in slow city traffic",
        "Some modern emergency vehicles use two-tone or warbling sirens because a varying tone is easier to locate",
        "The same physics lets astronomers measure how fast galaxies are moving away from Earth"
      ]}
    ]},
    { title: "Where It Is Used", blocks: [
      { type: "ul", items: [
        "Emergency medical services and ambulance fleets",
        "Fire and rescue vehicles",
        "Police vehicles during pursuits or emergency response",
        "Traffic management and road safety systems",
        "Physics classrooms and demonstration kits for teaching wave motion"
      ]}
    ]},
    { title: "Related Physics Concepts", blocks: [
      { type: "ul", items: [
        "Sound waves and longitudinal wave motion",
        "Frequency and pitch perception",
        "Wavelength and wave speed",
        "Relative motion between source and observer",
        "Wave propagation through a medium"
      ]}
    ]},
    { title: "Common Misconceptions", blocks: [
      { type: "p", text: [
        "A common misconception is that the siren itself changes pitch as the ambulance drives. In reality, the siren produces the exact same frequency the entire time; only the sound wave pattern reaching the observer's ear changes because of the ambulance's motion.",
        "Another misconception is that the Doppler Effect makes the sound louder as the ambulance approaches. Loudness depends on sound intensity, which increases as the ambulance gets closer, but that is a separate phenomenon from the frequency shift. The two often happen together, which leads to the mix-up."
      ]}
    ]},
    { title: "Did You Know?", blocks: [
      { type: "fact", text: "If an ambulance could travel at the speed of sound directly toward a stationary observer, the standard Doppler formula would predict an infinite apparent frequency, a clear sign the formula breaks down and a different phenomenon, the sonic boom, takes over." }
    ]},
    { title: "Key Takeaways", blocks: [
      { type: "ul", items: [
        "The siren's true frequency never changes during the ambulance's motion",
        "The observer hears a higher pitch while the ambulance approaches and a lower pitch after it passes",
        "The shift is caused by compression of wavefronts on approach and stretching while receding",
        "A faster ambulance produces a larger, more noticeable pitch shift",
        "The effect is strongest when the ambulance moves directly toward or away from the observer",
        "This everyday example shares its physics with radar, ultrasound, and astronomical redshift"
      ]}
    ]},
    { title: "Summary", blocks: [
      { type: "summary", text: "The ambulance siren is one of the most accessible examples of the Doppler Effect, turning an ordinary moment in traffic into a clear demonstration of how motion reshapes sound waves. As the vehicle approaches, its wavefronts are compressed, raising the apparent frequency; as it moves away, they stretch out, lowering it. The siren's true frequency never changes. Only the observer's perception does, and this familiar scenario builds the intuition behind police radar, medical ultrasound, and the redshift of distant galaxies." }
    ]}
  ]
},

/* ======================================================================
   APPLICATION 02 — TRAIN WHISTLES
   ====================================================================== */
train: {
  title: "Train Whistles",
  subtitle: "Railway Travel and Station Platforms",
  heroDescription: "There are few sounds as dramatic as a train whistle sweeping past a platform, climbing to a sharp, urgent pitch as the train rushes in and then falling away into a lower, mournful tone the instant it passes, offering commuters a front-row demonstration of the Doppler Effect in a matter of seconds.",
  accent: "#8b5cf6",
  image: "../../assets/backgrounds/C2.png",
  num: "02",
  overview: [
    ["Category", "Everyday Acoustic Phenomenon"],
    ["Field", "Sound Physics and Rail Transportation"],
    ["Wave Type", "Longitudinal Sound Wave"],
    ["Medium", "Air"],
    ["Primary Purpose", "Warning signal for railway crossings, stations, and track workers"],
    ["Technology Used", "Compressed air horn or electronic train whistle"],
    ["Real-Life Importance", "Alerts people near the track of an approaching train, and offers a classic physics demonstration of frequency shift"]
  ],
  sections: [
    { title: "Introduction", blocks: [
      { type: "p", text: [
        "A train whistle is a loud warning sound used to alert people near the track, at crossings, or on platforms of a train's approach. It is one of the oldest examples used to explain the Doppler Effect, dating back to experiments performed not long after Christian Doppler first proposed the phenomenon.",
        "Because trains often move at high, fairly constant speeds along straight track, the pitch shift is usually stronger and clearer than with road vehicles, helping students connect the abstract Doppler formula to something concrete and audible."
      ]}
    ]},
    { title: "How the Doppler Effect Works", blocks: [
      { type: "p", text: [
        "Standing on a platform as an express train approaches, the whistle is the source and you are the observer. Each new wavefront is emitted from a position slightly closer to you than the one before, compressing the wavefronts ahead of the train so they arrive more frequently, and you hear a higher pitch than the whistle's true frequency.",
        "The instant the train passes your position, its velocity relative to you effectively reverses direction. Each new wavefront now starts farther away, stretching the wavefronts out, and the pitch drops below the true frequency. Because trains move quickly and pass very close to the platform, this transition is abrupt, giving the whistle its distinctive, easily noticed pitch drop."
      ]}
    ]},
    { title: "Physics Behind the Application", blocks: [
      { type: "p", text: [
        "Like the ambulance siren, this is a moving-source, stationary-observer case. Wavefront compression ahead of the train shortens the wavelength along the direction of travel, producing a higher observed frequency; after the pass, wavefront expansion lengthens the wavelength and lowers the frequency.",
        "Because trains reach higher speeds than most road vehicles and platform observers stand close to the track, the angle between the train's motion and the line to the observer changes rapidly during the pass, which is why the shift feels more sudden and dramatic than for a car passing at a greater distance."
      ]}
    ]},
    { title: "Mathematical Principle", blocks: [
      { type: "formula", cards: [
        { label: "Train Approaching", tex: "f' = f \\left( \\dfrac{V}{V - V_s} \\right)", fallback: "f' = f · V / (V - Vs)" },
        { label: "Train Receding",    tex: "f' = f \\left( \\dfrac{V}{V + V_s} \\right)", fallback: "f' = f · V / (V + Vs)" }
      ]},
      { type: "vars", items: [
        { tex: "f",  fallback: "f",  def: "true frequency of the whistle as produced on the train" },
        { tex: "f'", fallback: "f′", def: "apparent frequency heard by the observer on the platform" },
        { tex: "V",  fallback: "V",  def: "speed of sound in air" },
        { tex: "V_s",fallback: "Vs", def: "speed of the train" }
      ]},
      { type: "p", text: [
        "The formula assumes the train moves directly along the line connecting it to the observer. In practice, the strongest shift is heard just before and after the train is directly alongside the platform, since that is when the train's velocity is most closely aligned with the line to the observer."
      ]}
    ]},
    { title: "Step-by-Step Working Process", blocks: [
      { type: "ol", items: [
        "The whistle emits sound at a constant, true frequency as the train moves along the track.",
        "As the train approaches, each new wavefront is emitted closer to the observer, compressing the wavefronts ahead.",
        "The compressed wavefronts arrive more frequently, so the observer hears a pitch higher than the whistle's true frequency.",
        "As the train passes and continues down the track, each new wavefront originates farther from the observer.",
        "The stretched wavefronts arrive less frequently, so the observer hears a pitch lower than the whistle's true frequency.",
        "The result is a sharp, easily noticed drop in pitch precisely as the train passes the platform."
      ]}
    ]},
    { title: "Real-Life Scenario", blocks: [
      { type: "p", text: [
        "Picture a commuter waiting on a platform when an express train that does not stop approaches on the adjacent track. In the distance the whistle sounds thin and high, building into a sharp, insistent tone as the train draws near. The moment the train thunders past, the pitch drops abruptly, almost like a switch being flipped, settling into a lower, heavier tone that continues as the train recedes until it fades from hearing altogether."
      ]}
    ]},
    { title: "Practical Importance", blocks: [
      { type: "p", text: [
        "Train whistles serve a critical safety function, warning pedestrians, drivers at level crossings, and track workers of an approaching train that may not be immediately visible. The natural pitch shift also gives an intuitive sense of whether the train is approaching or moving away.",
        "Historically, this example played a central role in verifying the Doppler Effect itself: within years of Doppler's 1842 proposal, musicians aboard a moving train played a fixed note while platform listeners recorded the pitch, directly confirming his predictions."
      ]}
    ]},
    { title: "Advantages", blocks: [
      { type: "ul", items: [
        "Offers one of the clearest and most dramatic real-world demonstrations of the Doppler Effect",
        "Provides a strong safety function by warning people near the tracks of an approaching train",
        "Involves a fairly constant, easily estimated source speed, useful for classroom calculations",
        "Historically significant, having been used in early experimental verification of the Doppler Effect",
        "Easy to observe repeatedly at any railway station or level crossing"
      ]}
    ]},
    { title: "Limitations", blocks: [
      { type: "ul", items: [
        "The exact speed of the train is not always known precisely, limiting the accuracy of manual calculations",
        "Wind conditions along the track can alter the effective speed of sound and skew results",
        "Reflections of sound from station structures can complicate a clean observation",
        "The dramatic shift depends on standing close to the track, which is not always safe or practical",
        "Doppler calculations assume straight-line motion, which is not always exactly true on curved track"
      ]}
    ]},
    { title: "Interesting Facts", blocks: [
      { type: "ul", items: [
        "Early experimental tests in the 1840s used musicians on a moving train playing a fixed note while platform listeners recorded the pitch",
        "The pitch drop for a passing train is often more noticeable than for a car because trains are faster and pass closer",
        "Train whistles are engineered to produce a recognizable chord of frequencies, so the shifted sound stays identifiable",
        "The same physics explains why a passing race car's engine note seems to drop suddenly as it goes by",
        "Freight trains, which can be extremely long, offer an extended, sustained version of the Doppler shift"
      ]}
    ]},
    { title: "Where It Is Used", blocks: [
      { type: "ul", items: [
        "Passenger and freight railway systems",
        "Level crossing warning systems",
        "Railway safety and signaling engineering",
        "Physics classrooms and demonstration experiments",
        "Historical studies and early Doppler Effect experiments"
      ]}
    ]},
    { title: "Related Physics Concepts", blocks: [
      { type: "ul", items: [
        "Sound waves and longitudinal wave motion",
        "Frequency and pitch perception",
        "Wavelength and wave speed",
        "Relative motion between source and observer",
        "Acoustics and resonance in whistle design"
      ]}
    ]},
    { title: "Common Misconceptions", blocks: [
      { type: "p", text: [
        "Many students assume the whistle actually changes its note as the train moves. In reality, the whistle mechanism produces the same frequency throughout; the shift exists only in how the sound reaches the observer's ear.",
        "Another misconception is that the pitch changes gradually and evenly throughout the whole pass. In fact, the rate of change is fastest exactly when the train is closest to the observer, since that is when the angle between the train's velocity and the line to the observer changes most rapidly."
      ]}
    ]},
    { title: "Did You Know?", blocks: [
      { type: "fact", text: "Christian Doppler's original 1842 proposal concerned the color of light from binary stars, not sound. A few years later, scientists tested his idea with trumpeters playing a steady note on a moving train, proving the principle applied just as well to the humble train whistle as to distant starlight." }
    ]},
    { title: "Key Takeaways", blocks: [
      { type: "ul", items: [
        "The whistle's true frequency stays constant throughout the train's journey",
        "Wavefronts compress ahead of the approaching train, raising the apparent frequency",
        "Wavefronts stretch out behind the receding train, lowering the apparent frequency",
        "The shift is often sharper for trains than for road vehicles, due to higher speeds and closer proximity",
        "Early experimental verification of the Doppler Effect used exactly this scenario",
        "The standard moving-source formula applies directly, since the platform observer is stationary"
      ]}
    ]},
    { title: "Summary", blocks: [
      { type: "summary", text: "The train whistle is one of the most vivid and historically significant demonstrations of the Doppler Effect, offering platform observers a sharp shift from a high approaching pitch to a lower receding one within seconds. This happens because the whistle's wavefronts are compressed while the train approaches and stretched once it passes, even though the whistle itself never changes its true frequency. It also holds a special place in the history of physics, having been used in some of the earliest experiments to confirm Doppler's theory." }
    ]}
  ]
},

/* ======================================================================
   APPLICATION 03 — POLICE RADAR GUNS
   ====================================================================== */
"police-radar": {
  title: "Police Radar Guns",
  subtitle: "Traffic Speed Enforcement",
  heroDescription: "Every time a police officer points a radar gun at oncoming traffic, they are using the same physics that makes a siren's pitch rise and fall, except now the wave is invisible radio energy, and the shift it undergoes reveals a car's exact speed in an instant.",
  accent: "#3b82f6",
  image: "../../assets/backgrounds/C3.png",
  num: "03",
  overview: [
    ["Category", "Technology and Law Enforcement"],
    ["Field", "Radio Wave Physics and Traffic Safety"],
    ["Wave Type", "Electromagnetic Radio Wave"],
    ["Medium", "Free space (radio waves do not require a physical medium)"],
    ["Primary Purpose", "Measuring vehicle speed for traffic law enforcement"],
    ["Technology Used", "Radar transmitter and receiver, frequency shift analysis"],
    ["Real-Life Importance", "Supports road safety enforcement and discourages dangerous speeding"]
  ],
  sections: [
    { title: "Introduction", blocks: [
      { type: "p", text: [
        "A police radar gun is a handheld or vehicle-mounted device that measures speed using radio waves. It emits a beam at a known, fixed frequency toward a target car and captures the waves that reflect back off the car.",
        "It allows an officer to obtain an accurate speed reading almost instantly, without physically measuring distance and time over a stretch of road, a reliable, physics-based tool that supports fair enforcement and public safety."
      ]}
    ]},
    { title: "How the Doppler Effect Works", blocks: [
      { type: "p", text: [
        "The radar gun sends out radio waves at a precise frequency toward the moving vehicle. It acts as both the original source and, after reflection, the receiver, while the car acts as a reflecting object.",
        "A car moving toward the radar gun effectively catches the waves faster than normal and immediately re-radiates them like a moving source sending them back. This double effect, once on the way to the car and once on the way back, produces a frequency shift twice as large as a one-way shift.",
        "If the reflected wave has a higher frequency than the original, the car is approaching; if lower, it is moving away. The size of the difference is mathematically related to the car's speed, allowing the device to display its velocity almost instantly."
      ]}
    ]},
    { title: "Physics Behind the Application", blocks: [
      { type: "p", text: [
        "Radar guns use electromagnetic radio waves rather than sound, so no physical medium is required; they travel through vacuum and air alike.",
        "The moving car plays a dual role: as the wave reaches it, the car behaves like a moving observer; as the wave reflects back, it behaves like a moving source. Both shifts act in the same direction and combine, so the total shift is twice what a single reflection would produce. Because radio waves travel at the speed of light, the shift is tiny in absolute terms, but modern radar electronics detect and measure it accurately."
      ]}
    ]},
    { title: "Mathematical Principle", blocks: [
      { type: "formula", cards: [
        { label: "Reflected Radar Shift", tex: "\\Delta f = \\dfrac{2 f_0 V_c}{c}", fallback: "Δf = 2 f0 Vc / c" }
      ]},
      { type: "vars", items: [
        { tex: "f_0",  fallback: "f₀", def: "original frequency of the radio wave emitted by the radar gun" },
        { tex: "\\Delta f", fallback: "Δf", def: "frequency shift between the emitted and reflected wave" },
        { tex: "V_c",  fallback: "Vc", def: "speed of the vehicle relative to the radar gun" },
        { tex: "c",    fallback: "c",  def: "speed of light" }
      ]},
      { type: "p", text: [
        "This relationship holds because vehicle speeds are tiny compared to the speed of light, so the simplified linear form replaces the full relativistic equation. The factor of two arises because the wave is Doppler-shifted twice, once striking the moving vehicle and again as the reflection returns to the radar receiver."
      ]}
    ]},
    { title: "Step-by-Step Working Process", blocks: [
      { type: "ol", items: [
        "The radar gun emits a continuous beam of radio waves at a precisely known frequency toward the target vehicle.",
        "The waves strike the moving car, which receives them as a moving observer and then reflects them back.",
        "The reflection introduces a second Doppler shift as the wave travels back toward the radar gun.",
        "The radar gun receives the reflected wave and compares its frequency with the frequency it transmitted.",
        "The device calculates the total frequency shift between the two signals.",
        "Using the known relationship between shift, frequency, and the speed of light, the system computes and displays the vehicle's exact speed."
      ]}
    ]},
    { title: "Real-Life Scenario", blocks: [
      { type: "p", text: [
        "A police officer parked along a highway holds a radar gun aimed at oncoming traffic. Within a fraction of a second, a number appears showing the car's exact speed. The gun has silently sent out radio waves, caught the reflection off the approaching car, measured the tiny frequency shift, and converted it into a precise reading, all faster than the blink of an eye."
      ]}
    ]},
    { title: "Practical Importance", blocks: [
      { type: "p", text: [
        "Excessive speed is one of the leading contributors to traffic accidents worldwide, and the ability to measure a vehicle's speed accurately and instantly lets law enforcement address dangerous driving before it leads to a collision.",
        "Because the measurement rests on a physical frequency shift rather than a visual estimate, radar evidence is objective and consistent across officers, times, and locations, supporting fair and reliable enforcement."
      ]}
    ]},
    { title: "Advantages", blocks: [
      { type: "ul", items: [
        "Provides highly accurate, near-instantaneous speed measurements",
        "Requires no physical contact with the vehicle being measured",
        "Works reliably in a wide range of lighting and weather conditions",
        "Offers objective, physics-based evidence for traffic enforcement",
        "Can be used from a stationary position or a moving patrol vehicle"
      ]}
    ]},
    { title: "Limitations", blocks: [
      { type: "ul", items: [
        "Accuracy can be affected by interference from other radio-emitting devices",
        "The beam can reflect off multiple vehicles, confusing which car was measured",
        "Heavy rain or dense fog can slightly affect signal quality",
        "The device must be regularly calibrated to maintain accurate readings",
        "Radar detectors can alert drivers to slow down before being measured"
      ]}
    ]},
    { title: "Interesting Facts", blocks: [
      { type: "ul", items: [
        "Radar guns can measure speeds from several hundred meters away, well before the vehicle reaches the officer",
        "The word radar stands for Radio Detection and Ranging, reflecting its original use in detecting aircraft and ships",
        "The principle was first developed for military and aviation purposes before traffic enforcement",
        "The factor of two in the mathematics does not appear in one-way Doppler examples like sirens",
        "Some advanced radar guns can track multiple vehicles simultaneously and distinguish their speeds"
      ]}
    ]},
    { title: "Where It Is Used", blocks: [
      { type: "ul", items: [
        "Traffic police departments and highway patrol units",
        "School zones and residential speed monitoring programs",
        "Motorsport timing and vehicle speed verification",
        "Aviation and maritime radar systems for tracking speed and position",
        "Meteorological and scientific research involving moving object detection"
      ]}
    ]},
    { title: "Related Physics Concepts", blocks: [
      { type: "ul", items: [
        "Electromagnetic waves and radio wave propagation",
        "Frequency and wavelength of electromagnetic radiation",
        "Relative motion and reflection",
        "Reflection and re-radiation of waves from a moving surface",
        "Speed of light as a physical constant"
      ]}
    ]},
    { title: "Common Misconceptions", blocks: [
      { type: "p", text: [
        "A common misconception is that a radar gun measures distance like a tape measure. In reality, it measures a frequency shift in reflected radio waves, which is mathematically converted into a speed value.",
        "Another misconception is that radar guns use sound waves like sirens. They use radio waves, a form of electromagnetic radiation that needs no physical medium, and some believe the beam merely bounces off the car once, when in fact the moving car both receives and re-transmits the wave, doubling the shift."
      ]}
    ]},
    { title: "Did You Know?", blocks: [
      { type: "fact", text: "The shift a radar gun detects from a car at highway speed is often just a few thousand hertz out of a signal of tens of billions of hertz, yet modern electronics measure it precisely enough to calculate speed to within a fraction of a kilometer per hour." }
    ]},
    { title: "Key Takeaways", blocks: [
      { type: "ul", items: [
        "Police radar guns apply the Doppler Effect to radio waves rather than sound",
        "The moving vehicle acts first like an observer, then like a source, doubling the shift",
        "Radio waves need no physical medium and travel through free space",
        "The relationship between shift and speed involves the speed of light",
        "Environmental interference and calibration issues can affect accuracy",
        "The Doppler Effect applies to all types of waves, not only sound"
      ]}
    ]},
    { title: "Summary", blocks: [
      { type: "summary", text: "Police radar guns take the same core idea behind a changing siren pitch and apply it to invisible radio waves, using the Doppler shift of a reflected signal to measure a vehicle's exact speed in an instant. Because the moving car both intercepts and reflects the signal, the shift is effectively doubled, and this predictable relationship lets radar electronics convert a tiny frequency change into a precise, reliable speed reading, proof that the Doppler Effect is not limited to sound but applies to any wave, including the radio waves that keep roads safer every day." }
    ]}
  ]
},

/* ======================================================================
   APPLICATION 04 — WEATHER FORECASTING (DOPPLER RADAR)
   ====================================================================== */
"weather-radar": {
  title: "Weather Forecasting (Doppler Radar)",
  subtitle: "Meteorology and Storm Tracking",
  heroDescription: "High above the ground, invisible radio pulses sweep across the sky, bouncing off raindrops and swirling winds. The tiny frequency shifts hidden in the returning signals carry enough information for meteorologists to see a tornado forming inside a storm long before anyone on the ground could spot it.",
  accent: "#22c55e",
  image: "../../assets/backgrounds/C4.png",
  num: "04",
  overview: [
    ["Category", "Meteorological Technology"],
    ["Field", "Atmospheric Science and Radar Engineering"],
    ["Wave Type", "Electromagnetic Radio Wave"],
    ["Medium", "Atmosphere (radio waves travel through air and free space)"],
    ["Primary Purpose", "Detecting and measuring wind speed, storm motion, and precipitation"],
    ["Technology Used", "Doppler weather radar stations and signal processing systems"],
    ["Real-Life Importance", "Provides early warning of severe storms and tornadoes, protecting lives and property"]
  ],
  sections: [
    { title: "Introduction", blocks: [
      { type: "p", text: [
        "Doppler weather radar is a specialized radar system that detects precipitation and measures the motion of air and water droplets within storms. Unlike traditional radar, which only shows location and intensity, it adds the speed and direction of movement inside the storm itself.",
        "Severe weather can develop dangerously fast. Doppler radar gives forecasters the ability to detect the rotating wind patterns associated with tornadoes well before they become visible to the human eye, allowing earlier warnings that save lives."
      ]}
    ]},
    { title: "How the Doppler Effect Works", blocks: [
      { type: "p", text: [
        "A Doppler weather radar station sends short pulses of radio waves into the atmosphere. They strike tiny particles such as raindrops, hailstones, snowflakes, even dust and insects carried by the wind, which reflect the pulses back at a shifted frequency, exactly as a moving car reflects a police radar signal.",
        "Particles moving toward the station reflect at a higher frequency; particles moving away reflect at a lower one. By scanning across a wide area at many heights, the radar builds a three-dimensional picture of wind speed and direction through an entire storm system."
      ]}
    ]},
    { title: "Physics Behind the Application", blocks: [
      { type: "p", text: [
        "The same reflection principle used in police radar applies on a much larger scale. Because raindrops and hailstones are carried along by the wind, measuring their velocity through the Doppler shift effectively reveals the velocity of the wind itself.",
        "Modern systems rotate continuously and scan at multiple elevation angles, mapping wind velocity across a wide region at many heights. This is what allows meteorologists to identify mesocyclones, the rotating wind patterns that frequently precede tornado formation."
      ]}
    ]},
    { title: "Mathematical Principle", blocks: [
      { type: "formula", cards: [
        { label: "Weather Radar Shift", tex: "\\Delta f = \\dfrac{2 f_0 V_p \\cos\\theta}{c}", fallback: "Δf = 2 f0 Vp cosθ / c" }
      ]},
      { type: "vars", items: [
        { tex: "f_0",  fallback: "f₀", def: "original frequency of the radar pulse transmitted by the station" },
        { tex: "\\Delta f", fallback: "Δf", def: "frequency shift measured in the reflected signal" },
        { tex: "V_p",  fallback: "Vp", def: "velocity of the precipitation particle or wind-carried object" },
        { tex: "\\theta", fallback: "θ", def: "angle between the particle's motion and the direction of the radar beam" },
        { tex: "c",    fallback: "c",  def: "speed of light" }
      ]},
      { type: "p", text: [
        "The cosine term accounts for the fact that only the component of the particle's velocity directed along the radar beam contributes to the shift. Motion entirely perpendicular to the beam produces no shift at all, which is why weather radar stations scan at multiple angles to build a complete picture of wind motion throughout a storm."
      ]}
    ]},
    { title: "Step-by-Step Working Process", blocks: [
      { type: "ol", items: [
        "The station transmits short pulses of radio waves outward into the atmosphere.",
        "The pulses strike precipitation particles or other small objects carried by the wind.",
        "Particles moving toward the station reflect at a higher frequency; particles moving away, at a lower one.",
        "The receiver measures each reflected pulse's frequency against the transmitted frequency.",
        "The system converts each measured shift into the particle velocity along the beam's direction.",
        "When patterns such as strong rotation are detected, forecasters issue timely warnings to the public."
      ]}
    ]},
    { title: "Real-Life Scenario", blocks: [
      { type: "p", text: [
        "A large thunderstorm develops over a rural area on a warm, humid afternoon. On the ground it looks like an ordinary summer downpour, but the Doppler display shows something invisible from the ground: a small, tightly wound region where wind moves rapidly toward the station right beside wind moving rapidly away. This velocity couplet is the radar signature of rotation, a strong indicator that a tornado may be forming, and it triggers a warning that gives residents crucial extra minutes to seek shelter."
      ]}
    ]},
    { title: "Practical Importance", blocks: [
      { type: "p", text: [
        "Before Doppler radar, tornado warnings often relied on visual sightings by storm spotters, possible only once a tornado had already formed and become visible.",
        "With Doppler radar, meteorologists can detect the rotating wind patterns of a developing tornado minutes before touchdown, dramatically increasing warning times. Beyond tornadoes, it tracks storm movement, intensity, and rainfall rates, supporting forecasts used in agriculture, aviation, and everyday planning."
      ]}
    ]},
    { title: "Advantages", blocks: [
      { type: "ul", items: [
        "Detects rotating wind patterns associated with tornadoes before they become visible",
        "Provides continuous, real-time monitoring of storm movement and intensity",
        "Measures wind speed and direction throughout an entire storm, not just at one point",
        "Supports accurate short-term forecasting of rainfall, storms, and severe weather",
        "Covers large geographic areas from a single installation"
      ]}
    ]},
    { title: "Limitations", blocks: [
      { type: "ul", items: [
        "Radar beams travel in straight lines and can be blocked by terrain such as mountains",
        "The curvature of the earth limits detection of distant, low-altitude weather",
        "Only the velocity component along the beam is measured; some wind patterns need multiple stations",
        "Heavy precipitation can weaken or scatter the signal at longer ranges",
        "Radar detects the motion of precipitation and particles, not air itself"
      ]}
    ]},
    { title: "Interesting Facts", blocks: [
      { type: "ul", items: [
        "Doppler radar can detect rotation inside a storm several minutes before a tornado forms",
        "Some systems are sensitive enough to detect the motion of insects, dust, and even bats on a clear day",
        "Modern weather radar shares its core Doppler principle with traffic police radar guns",
        "Dual-polarization radar can help distinguish rain, hail, and snow within the same storm",
        "Doppler radar has raised average tornado warning lead times from a few minutes to well over ten in many regions"
      ]}
    ]},
    { title: "Where It Is Used", blocks: [
      { type: "ul", items: [
        "National and regional meteorological services",
        "Airports and aviation weather monitoring systems",
        "Agricultural planning and irrigation management",
        "Emergency management and disaster response coordination",
        "Scientific research into storm formation and severe weather"
      ]}
    ]},
    { title: "Related Physics Concepts", blocks: [
      { type: "ul", items: [
        "Electromagnetic waves and radar reflection",
        "Frequency shift and relative velocity",
        "Angle dependence of the Doppler shift",
        "Signal processing and radar imaging",
        "Atmospheric physics and fluid motion"
      ]}
    ]},
    { title: "Common Misconceptions", blocks: [
      { type: "p", text: [
        "Doppler weather radar does not detect tornadoes as objects. It detects the motion of precipitation particles, and meteorologists infer the presence of rotation from distinctive patterns in the wind velocity data.",
        "Radar cannot see through mountains or detect weather below its line of sight, since beams travel in straight lines and the earth curves away. And while reflectivity data helps estimate rainfall intensity, that is a separate measurement from the Doppler velocity data used to detect wind and rotation."
      ]}
    ]},
    { title: "Did You Know?", blocks: [
      { type: "fact", text: "The rotation signature that reveals a developing tornado, called the velocity couplet, can appear on radar screens several minutes before the tornado touches the ground. The same physics that determines a siren's pitch can, in the right circumstances, give people life-saving extra minutes to find shelter." }
    ]},
    { title: "Key Takeaways", blocks: [
      { type: "ul", items: [
        "Doppler weather radar measures the frequency shift of radio pulses reflecting off precipitation and wind-carried particles",
        "Only the velocity component along the radar beam contributes to the measured shift",
        "Rotating wind patterns detected by Doppler radar are a key early indicator of tornado formation",
        "Stations scan at multiple angles to build a three-dimensional picture of storm motion",
        "Terrain and the curvature of the earth limit the coverage of any single station",
        "This technology has significantly increased tornado warning times, directly saving lives"
      ]}
    ]},
    { title: "Summary", blocks: [
      { type: "summary", text: "Doppler weather radar takes the frequency-shift principle of a police radar gun and scales it up to map the invisible motion of wind and storms across entire regions. By measuring how precipitation particles reflect radio pulses at shifted frequencies, meteorologists detect the rotating wind patterns that often precede tornado formation, sometimes minutes before anything appears in the sky. From severe storm warnings to everyday forecasting, aviation safety, and agriculture, it is one of the most impactful real-world applications of the Doppler Effect." }
    ]}
  ]
},

/* ======================================================================
   APPLICATION 05 — MEDICAL DOPPLER ULTRASOUND
   ====================================================================== */
"medical-ultrasound": {
  title: "Medical Doppler Ultrasound",
  subtitle: "Diagnostic Medicine and Blood Flow Imaging",
  heroDescription: "Inside every hospital ultrasound room, sound waves too high for the human ear travel through skin and tissue, bounce off blood cells racing through veins and arteries, and return carrying a tiny frequency shift that reveals exactly how blood is moving inside the body, all without a single incision.",
  accent: "#ec4899",
  image: "../../assets/backgrounds/C5.png",
  num: "05",
  overview: [
    ["Category", "Medical Diagnostic Technology"],
    ["Field", "Medical Physics and Cardiology"],
    ["Wave Type", "Ultrasonic Sound Wave"],
    ["Medium", "Human Soft Tissue and Blood"],
    ["Primary Purpose", "Measuring the speed and direction of blood flow inside the body"],
    ["Technology Used", "Ultrasound transducer, Doppler signal processing, medical imaging display"],
    ["Real-Life Importance", "Enables non-invasive diagnosis of heart and blood vessel conditions, and monitors fetal health during pregnancy"]
  ],
  sections: [
    { title: "Introduction", blocks: [
      { type: "p", text: [
        "Doppler ultrasound is a diagnostic method used by doctors to examine blood flow in arteries, veins, and the heart, using a handheld transducer moved gently over the skin. It is used in cardiology, obstetrics, and vascular surgery, from routine checkups and pregnancy scans to the emergency diagnosis of blood clots and blocked arteries.",
        "It gives doctors real-time information about how blood is actually moving, not just static images of body structures, making it possible to detect narrowed vessels, irregular heartbeats, or reduced blood supply before serious symptoms appear."
      ]}
    ]},
    { title: "How the Doppler Effect Works", blocks: [
      { type: "p", text: [
        "The transducer sends a continuous beam of high-frequency sound waves into the body, and blood cells inside vessels and the heart act as moving reflectors. Cells moving toward the transducer reflect the waves at a higher frequency; cells moving away reflect them at a lower one.",
        "The transducer also acts as the receiver, comparing the reflected frequency with the transmitted frequency. By continuously measuring this shift, the system calculates blood flow speed and direction in real time, displayed as a moving image, a colour overlay, or an audible pulsing sound."
      ]}
    ]},
    { title: "Physics Behind the Application", blocks: [
      { type: "p", text: [
        "Ultrasound involves a moving reflector, the blood cells, and a wave that travels through soft tissue before and after reflection. Like police radar, this is a double-shift situation: the wave is shifted once on the way to the cells and again on the way back to the transducer.",
        "Blood moving toward the transducer compresses the reflected wavefronts, raising the frequency; blood moving away stretches them, lowering it. Since the speed of sound in soft tissue is fairly constant, roughly 1540 m/s, a fixed mathematical relationship reliably converts a measured shift into an accurate blood flow speed."
      ]}
    ]},
    { title: "Mathematical Principle", blocks: [
      { type: "formula", cards: [
        { label: "Ultrasound Doppler Shift", tex: "\\Delta f = \\dfrac{2 f_0 \\, v \\, \\cos\\theta}{c}", fallback: "Δf = 2 f0 v cosθ / c" }
      ]},
      { type: "vars", items: [
        { tex: "f_0",  fallback: "f₀", def: "original frequency of the ultrasound wave sent by the transducer" },
        { tex: "\\Delta f", fallback: "Δf", def: "frequency shift measured in the reflected signal" },
        { tex: "v",    fallback: "v",  def: "velocity of the moving blood cells" },
        { tex: "\\theta", fallback: "θ", def: "angle between the ultrasound beam and the direction of blood flow" },
        { tex: "c",    fallback: "c",  def: "speed of sound in human soft tissue" }
      ]},
      { type: "p", text: [
        "The angle θ matters greatly in practice: a beam aligned closely with the direction of blood flow produces a much clearer signal than one directed nearly perpendicular to it, where the shift approaches zero."
      ]}
    ]},
    { title: "Step-by-Step Working Process", blocks: [
      { type: "ol", items: [
        "The transducer is placed on the skin over the area to be examined, using a gel to improve contact.",
        "It emits a continuous beam of high-frequency sound waves into the underlying tissue.",
        "The waves reflect off moving red blood cells within vessels or the heart.",
        "Cells moving toward the transducer reflect at a higher frequency; cells moving away, at a lower one.",
        "The transducer receives the reflections and measures the frequency shift against the original signal.",
        "A processing unit converts the shift into a measurement of blood flow speed and direction, displayed as a waveform, a colour-coded overlay, or an audible sound."
      ]}
    ]},
    { title: "Real-Life Scenario", blocks: [
      { type: "p", text: [
        "A pregnant woman visits her doctor for a routine prenatal checkup. The doctor applies gel to her abdomen and moves the transducer over the baby's heart. Within seconds, a steady rhythmic sound fills the room, the unmistakable pulse of the baby's heartbeat, made audible through the Doppler shift of waves reflecting off the tiny moving heart valves and blood cells inside the fetus, confirming that blood is flowing normally, all without any invasive procedure."
      ]}
    ]},
    { title: "Practical Importance", blocks: [
      { type: "p", text: [
        "Doppler ultrasound lets doctors assess blood flow safely, quickly, and without radiation or surgery, making it suitable for repeated use, even when monitoring a pregnancy over several months.",
        "It plays a critical role in detecting blocked or narrowed arteries, blood clots, and abnormal heart valve function, often catching problems early enough for effective treatment, and it helps monitor fetal well-being throughout pregnancy."
      ]}
    ]},
    { title: "Advantages", blocks: [
      { type: "ul", items: [
        "Completely non-invasive, requiring no needles, incisions, or radiation",
        "Provides real-time information about blood flow speed and direction",
        "Safe for repeated use, including during pregnancy",
        "Helps diagnose a wide range of cardiovascular conditions early",
        "Portable and widely available in hospitals and clinics"
      ]}
    ]},
    { title: "Limitations", blocks: [
      { type: "ul", items: [
        "Signal quality depends on the angle between the beam and blood flow",
        "Deep blood vessels or dense body tissue can reduce measurement accuracy",
        "Results depend significantly on the skill and experience of the technician",
        "Similar flow patterns from different conditions are not always distinguishable",
        "Air pockets, such as in the lungs or bowel, can block the beam entirely"
      ]}
    ]},
    { title: "Interesting Facts", blocks: [
      { type: "ul", items: [
        "Doppler ultrasound can measure blood flow speeds as low as a few centimeters per second in tiny vessels",
        "The same technology that checks an unborn baby's heartbeat can detect blood clots deep in the legs",
        "Colour Doppler assigns different colours to blood moving toward and away from the transducer",
        "It was first developed for medical use in the 1950s, decades after the underlying physics was described",
        "Because it uses sound rather than radiation, it is one of the safest imaging techniques for children and pregnant patients"
      ]}
    ]},
    { title: "Where It Is Used", blocks: [
      { type: "ul", items: [
        "Hospitals and diagnostic imaging centers",
        "Cardiology departments for heart valve and blood flow assessment",
        "Obstetric and prenatal care clinics",
        "Vascular surgery units for detecting blood clots and blocked arteries",
        "Emergency medicine for rapid, non-invasive diagnosis"
      ]}
    ]},
    { title: "Related Physics Concepts", blocks: [
      { type: "ul", items: [
        "Wave reflection and echo formation",
        "Frequency, wavelength, and relative motion",
        "Acoustics and sound propagation in tissue",
        "Speed of sound in different media",
        "Signal processing and Doppler imaging"
      ]}
    ]},
    { title: "Common Misconceptions", blocks: [
      { type: "p", text: [
        "Doppler ultrasound does not produce a picture the same way a regular scan does: standard ultrasound imaging shows body structures using reflected sound intensity, while Doppler ultrasound measures motion using frequency shift; the two are often combined in one examination.",
        "It uses no radiation at all, only high-frequency sound waves, and the audible pulsing sound during an exam is not a recording of the heartbeat but a live audio representation generated from the measured frequency shift by the machine itself."
      ]}
    ]},
    { title: "Did You Know?", blocks: [
      { type: "fact", text: "The rhythmic whooshing sound heard during a fetal Doppler exam is not a microphone picking up the baby's heartbeat. It is a live audio translation of a tiny frequency shift in reflected sound waves, the same physics that makes an ambulance siren change pitch, quietly at work inside the human body." }
    ]},
    { title: "Key Takeaways", blocks: [
      { type: "ul", items: [
        "Doppler ultrasound measures blood flow by detecting the frequency shift of sound reflected off moving blood cells",
        "Blood moving toward the transducer raises the reflected frequency; blood moving away lowers it",
        "The technique involves a double shift, since the cells both receive and re-emit the wave",
        "The beam angle strongly affects measurement accuracy",
        "It is completely non-invasive, uses no radiation, and is widely used in cardiology, obstetrics, and vascular medicine"
      ]}
    ]},
    { title: "Summary", blocks: [
      { type: "summary", text: "Medical Doppler ultrasound applies the frequency-shift principle behind a changing siren pitch inside the human body, using reflected sound waves to reveal how blood flows through arteries, veins, and the heart. Because it is safe, non-invasive, and capable of real-time measurement, it has become an essential diagnostic tool in cardiology, vascular medicine, and prenatal care, from detecting a dangerous blood clot to letting expecting parents hear their baby's heartbeat." }
    ]}
  ]
}

};
