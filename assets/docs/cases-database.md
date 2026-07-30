# Doppler Effect Cases Database

This file is the master database for all Doppler Effect case pages. Every webpage reads its content from this file. Case order, numbering, and titles below are fixed to match the website's existing "Explore Cases" section and must not be changed.

> **Content note:** Cases 02–09 are extracted and rewritten from the source PowerPoint presentation, with formulas visually verified against the on-slide derivations. **Case 01** (Stationary Source & Stationary Observer) and **Case 10** (Sonic Boom) do not appear anywhere in the source presentation; they were written from scratch to fill the two slots the website design requires, using standard, well-established Doppler Effect physics. They're flagged here so no one mistakes them for slide content later.

---

## Case 01

**Title:** Stationary Source & Stationary Observer

**Short Description:** The reference case: neither the source nor the observer is moving, so there is no Doppler shift at all. This is the baseline every other case is compared against.

**Detailed Explanation:** When both the source and the observer are at rest relative to the medium (air), the wavefronts emitted by the source spread out as perfectly even, evenly spaced concentric circles. The observer intercepts these wavefronts at exactly the rate they were emitted, so the frequency heard is identical to the frequency produced. There is no compression, no stretching, and no change in the rate of interception. It is the "before" picture that makes every other case's frequency shift meaningful by comparison.

**Initial Condition:** Source at rest, observer at rest, both fixed in position relative to the medium. Source emits continuously at frequency f.

**Simulation Description:**

- Source position: fixed, center of the scene.
- Observer position: fixed, at some distance from the source.
- Direction of movement: none; neither source nor observer moves.
- Wave propagation: perfectly even, concentric circular wavefronts expanding outward at the speed of sound.
- Frequency behaviour: constant; the observer intercepts wavefronts at exactly the emitted rate.
- Compression or expansion of wavefronts: none; wavefronts remain evenly spaced in every direction.
- Expected animation behaviour: uniform expanding circles with no distortion, and a static observer marker crossing wavefronts at a perfectly steady rate.

**Observation:** The observer hears exactly the true frequency of the source, with no pitch shift in either direction.

**Physical Interpretation:** With no relative motion between source and observer, there is nothing to compress the wavelength or to change the rate at which wavefronts are intercepted. The apparent frequency equals the source frequency by definition.

**Formula:**

f' = f

**Formula Variables:**

- f = original (true) frequency of sound emitted by the source
- f' = apparent frequency heard by the observer

**Formula Explanation:** With v' (effective wave speed relative to the observer) equal to V, and λₑ (effective wavelength) equal to the ordinary λ = V/f, the general relationship f' = v'/λₑ reduces directly to f' = f.

**Units:** f and f' in Hz (s⁻¹).

**Expected Frequency Change:** None (f' = f).

**Step-by-Step Working:**

1. General apparent frequency relationship: f' = v'/λₑ.
2. With the observer at rest, effective wave speed relative to observer: v' = V
(no addition or subtraction).
3. With the source at rest, effective wavelength: λₑ = V/f
(no compression or stretching).
4. Substituting: f' = V / (V/f) = f.

**Expected Result:** f' = f in every case: the pitch heard matches the pitch produced, with zero shift.

**Wavefront Behaviour:** Perfectly even and symmetric in all directions.

**Real-Life Example:** Standing still near a stationary bell or speaker, the pitch you hear is simply the true pitch of the sound, unaffected by any Doppler shift.

**Key Notes:**

- This is the trivial/reference case: substituting v₀ = 0 and Vₛ = 0 into any of the general Doppler formulas returns f' = f.
- Useful as a sanity check when verifying any other case's formula: every formula in this database should reduce to f' = f when both velocities are set to zero.

**Summary:** When neither the source nor the observer is in motion, there is no Doppler Effect: wavefronts are emitted and received at the same fixed rate, and the observer hears exactly the source's true frequency. This baseline case establishes what "no shift" looks like, making the frequency increases and decreases in every other case meaningful by comparison.

**Image Reference:** backgrounds/case1.png

---

## Case 02

**Title:** Observer Approaches Stationary Source

**Short Description:** The source stays still while the observer moves toward it, causing the observer to intercept sound waves faster than normal.

**Detailed Explanation:** Here, the observer is moving toward the source. The observer meets the sound waves faster than normal. This causes the observer to hear a higher frequency, even though the source frequency remains the same.

**Initial Condition:** Source at rest, emitting sound uniformly in all directions. Observer begins moving directly toward the source at velocity v₀.

**Simulation Description:**

- Source position: fixed, center of the scene.
- Observer position: starts at a distance from the source and moves inward.
- Direction of movement: observer moves toward the source; source does not move.
- Wave propagation: concentric circular wavefronts expand outward from the source at the speed of sound, unaffected in shape (since the source itself doesn't move).
- Frequency behaviour: as the observer advances into the oncoming wavefronts, it crosses more wavefronts per second than it would at rest.
- Compression or expansion of wavefronts: no compression occurs in the wave pattern itself (the source is stationary); the apparent compression is purely from the observer's own motion into the waves.
- Expected animation behaviour: wavefronts should render as evenly spaced expanding circles; the observer marker should visibly "meet" more wavefront lines per second than a stationary marker would.

**Observation:** The observer hears a pitch higher than the true frequency of the source.

**Physical Interpretation:** Moving into the wave increases the rate at which wavefronts reach the observer, which is perceived as a higher frequency.

**Formula:**

f' = ( (V + v₀) / V ) × f

**Formula Variables:**

- V = velocity of sound
- v₀ = velocity of observer
- f = original frequency of sound
- f' = apparent frequency

**Formula Explanation:** Apparent frequency heard is f' = v'/λ, where the effective wave speed relative to the observer is v' = v + v₀ (since v = λf, and λ is unchanged because the source is stationary).

**Units:** V and v₀ in m/s; f and f' in Hz.

**Expected Frequency Change:** Increase (f' > f).

**Step-by-Step Working:**

1. Apparent frequency heard by observer: f' = v'/λ … (i)
2. Since the observer moves toward the source, the effective wave speed is v' = v + v₀.
3. Substituting into (i): f' = (v + v₀)/λ.
4. Using v = λf (so λ = v/f): f' = (v + v₀)f/v.
5. Result: f' = ((V + v₀)/V) f.

**Expected Result:** The observer hears a frequency higher than f, increasing with observer speed v₀.

**Wavefront Behaviour:** Wavefronts remain evenly spaced (unaffected by the source, which is at rest); the observer simply crosses them at a faster rate.

**Real-Life Example:** A person running toward a stationary bell or alarm hears it at a higher pitch than someone standing still nearby.

**Key Notes:**

- Source stationary; only observer moves.
- Frequency shift comes from the observer's own motion into the wavefront pattern.
- Wavelength (λ) is unchanged; only the rate of interception changes.

**Summary:** When an observer moves toward a stationary sound source, they intercept wavefronts more frequently than if they were at rest, so the sound is heard at a higher apparent frequency than the source's true frequency. The wavelength itself is unaffected since the source does not move; the shift comes entirely from the observer's motion.

**Image Reference:** backgrounds/case2.png

---

## Case 03

**Title:** Observer Moves Away from Stationary Source

**Short Description:** The source stays still while the observer moves away from it, causing the observer to intercept sound waves less frequently than normal.

**Detailed Explanation:** Here, the source is stationary, and the observer is moving away from the source. Since the observer is moving away, they meet the sound waves less frequently than normal. This causes the apparent frequency to decrease, even though the source frequency remains the same.

**Initial Condition:** Source at rest, emitting sound uniformly. Observer begins moving directly away from the source at velocity v₀.

**Simulation Description:**

- Source position: fixed, center of the scene.
- Observer position: starts near the source and moves outward.
- Direction of movement: observer moves away from the source; source does not move.
- Wave propagation: concentric circular wavefronts expand outward from the source, unaffected in shape.
- Frequency behaviour: the observer, retreating from the source, falls behind some wavefronts that would otherwise have reached it sooner, so fewer wavefronts are intercepted per second.
- Compression or expansion of wavefronts: no change to the wave pattern itself; the reduced interception rate is due purely to the observer's own retreating motion.
- Expected animation behaviour: evenly spaced expanding circles; the observer marker should visibly cross fewer wavefront lines per second than a stationary marker would.

**Observation:** The observer hears a pitch lower than the true frequency of the source.

**Physical Interpretation:** Moving away from the wave decreases the rate at which wavefronts reach the observer, perceived as a lower frequency.

**Formula:**

f' = ( (V − v₀) / V ) × f

**Formula Variables:**

- V = velocity of sound
- v₀ = velocity of observer
- f = original frequency of sound
- f' = apparent frequency

**Formula Explanation:** The effective wave speed relative to the retreating observer is v' = v − v₀; substituting into f' = v'/λ with λ = v/f gives the result.

**Units:** V and v₀ in m/s; f and f' in Hz.

**Expected Frequency Change:** Decrease (f' < f).

**Step-by-Step Working:**

1. Apparent frequency heard by observer: f' = v'/λ … (ii)
2. Since the observer moves away from the source, the effective wave speed is v' = v − v₀.
3. Substituting into (ii): f' = (v − v₀)/λ.
4. Using λ = v/f: f' = (v − v₀)f/v.
5. Result: f' = ((V − v₀)/V) f.

**Expected Result:** The observer hears a frequency lower than f, decreasing with observer speed v₀.

**Wavefront Behaviour:** Wavefronts remain evenly spaced; the observer crosses them at a slower rate because it is retreating from them.

**Real-Life Example:** A person walking away from a ringing doorbell hears the pitch drop slightly compared to standing still beside it.

**Key Notes:**

- Source stationary; only observer moves, away from source this time.
- Frequency shift again comes purely from the observer's motion, not from any change in the source or the wavelength.

**Summary:** When an observer moves away from a stationary sound source, they intercept wavefronts less frequently than if they were at rest, so the apparent frequency drops below the source's true frequency. As in Case 02, the wavelength is unchanged since the source doesn't move; only the observer's rate of interception is affected.

**Image Reference:** backgrounds/case3.png

---

## Case 04

**Title:** Source Approaches Stationary Observer

**Short Description:** The source moves toward the observer, compressing the sound waves ahead of it and raising the apparent frequency.

**Detailed Explanation:** When the sound source moves towards a stationary observer, it creates compressed sound waves in front of it. Because these waves are closer together, the observer hears a higher frequency than the actual frequency produced by the source.

**Initial Condition:** Observer at rest. Source begins moving directly toward the observer at velocity Vₛ, emitting continuously.

**Simulation Description:**

- Source position: starts at a distance and moves toward the observer.
- Observer position: fixed.
- Direction of movement: source moves toward observer; observer does not move.
- Wave propagation: each new wavefront is emitted from a position slightly closer to the observer than the last, so wavefronts bunch together on the observer's side.
- Frequency behaviour: the observer receives wavefronts more often because they are physically closer together in space.
- Compression or expansion of wavefronts: visible compression of wavefronts on the side facing the observer's direction of approach.
- Expected animation behaviour: the wavefronts on the observer-facing side should render visibly closer together than on the opposite side, illustrating the classic "bunched circles" Doppler diagram.

**Observation:** The observer hears a pitch higher than the true frequency of the source.

**Physical Interpretation:** The moving source "catches up" slightly to its own previously emitted wavefronts, shortening the effective wavelength on the approach side.

**Formula:**

f' = ( V / (V − Vₛ) ) × f

**Formula Variables:**

- λₑ = effective wavelength
- T = time period
- Vₛ = velocity of source
- V = velocity of sound

**Formula Explanation:** From the geometry of successive wavefronts: λₑ = vT − vₛT = (v − vₛ)/f. The apparent frequency is f' = v/λₑ, which simplifies to the boxed result.

**Units:** V and Vₛ in m/s; f and f' in Hz.

**Expected Frequency Change:** Increase (f' > f).

**Step-by-Step Working:**

1. Apparent frequency heard by a stationary observer: f' = v/λₑ … (i)
2. From the wavefront diagram: λₑ = vT − vₛT
(the distance between successive wavefronts is reduced by the distance the source itself travels in one period).
3. Since T = 1/f: λₑ = (v − vₛ)/f.
4. Substituting into (i): f' = v / [(v − vₛ)/f].
5. Result: f' = (V / (V − Vₛ)) f.

**Expected Result:** The observer hears a frequency higher than f, and the effect grows sharply as Vₛ approaches V.

**Wavefront Behaviour:** Wavefronts compress (bunch closer together) in the direction the source is moving toward.

**Real-Life Example:** A fire truck's siren sounds noticeably higher-pitched as it speeds toward a stationary listener.

**Key Notes:**

- Observer stationary; only the source moves.
- This is the first case where the wavelength itself physically changes (compression), unlike Cases 02 and 03.
- As Vₛ → V, the denominator (V − Vₛ) → 0, and f' grows without bound. This is the mathematical root of Case 10's sonic boom.

**Summary:** When a sound source moves toward a stationary observer, each successive wavefront is emitted from a position closer to the observer, physically compressing the wavelengths on that side. This raises the apparent frequency heard, and the effect becomes extreme as the source's speed approaches the speed of sound itself.

**Image Reference:** backgrounds/case4.png

---

## Case 05

**Title:** Source Moves Away from Stationary Observer

**Short Description:** The source moves away from the observer, stretching the sound waves behind it and lowering the apparent frequency.

**Detailed Explanation:** When the sound source moves away from a stationary observer, the sound waves spread out and the observer receives fewer waves per second. As a result, the observer hears a lower apparent frequency than the actual frequency.

**Initial Condition:** Observer at rest. Source begins moving directly away from the observer at velocity Vₛ, emitting continuously.

**Simulation Description:**

- Source position: starts near the observer and moves away.
- Observer position: fixed.
- Direction of movement: source moves away from observer; observer does not move.
- Wave propagation: each new wavefront is emitted from a position slightly farther from the observer than the last, spreading wavefronts apart on the observer's side.
- Frequency behaviour: the observer receives wavefronts less often because they are physically farther apart in space.
- Compression or expansion of wavefronts: visible stretching (expansion) of wavefronts on the side facing the observer.
- Expected animation behaviour: wavefronts on the observer-facing side should render visibly farther apart than on the opposite side.

**Observation:** The observer hears a pitch lower than the true frequency of the source.

**Physical Interpretation:** The moving source pulls away from its previously emitted wavefronts, lengthening the effective wavelength on the receding side.

**Formula:**

f' = ( V / (V + Vₛ) ) × f

**Formula Variables:**

- λₑ = effective wavelength
- T = time period
- Vₛ = velocity of source
- V = velocity of sound

**Formula Explanation:** By the same reasoning as Case 04 but with the source retreating: λₑ = (v + vₛ)/f, and f' = v/λₑ.

**Units:** V and Vₛ in m/s; f and f' in Hz.

**Expected Frequency Change:** Decrease (f' < f).

**Step-by-Step Working:**

1. Apparent frequency heard by a stationary observer: f' = v/λₑ … (i)
2. Similarly to Case 04's geometry, but the source retreats: λₑ = (v + vₛ)/f.
3. Substituting into (i): f' = v / [(v + vₛ)/f].
4. Result: f' = (V / (V + Vₛ)) f.

**Expected Result:** The observer hears a frequency lower than f, decreasing as Vₛ increases.

**Wavefront Behaviour:** Wavefronts stretch (spread farther apart) in the direction the source is moving away from.

**Real-Life Example:** An ambulance's siren drops in pitch noticeably right after it passes a stationary listener and continues driving away.

**Key Notes:**

- Observer stationary; only the source moves, away this time.
- Wavelength physically stretches, mirroring the compression seen in Case 04.

**Summary:** When a sound source moves away from a stationary observer, successive wavefronts are emitted farther and farther from the observer, stretching the wavelength on that side. This lowers the apparent frequency heard. Together, Cases 04 and 05 describe the complete rise-then-fall pitch pattern heard as a moving vehicle passes a stationary listener.

**Image Reference:** backgrounds/case5.png

---

## Case 06

**Title:** Source & Observer Move Towards Each Other

**Short Description:** Source and observer approach each other simultaneously, combining wavefront compression with faster interception for the largest possible frequency increase.

**Detailed Explanation:** When both the source and the observer move toward each other, the observer meets sound waves much faster than normal. The waves become more compressed, so the apparent frequency becomes much higher than the actual frequency.

**Initial Condition:** Both source (velocity Vₛ) and observer (velocity v₀) move directly toward one another along the same line.

**Simulation Description:**

- Source position: moving toward the observer's initial position.
- Observer position: moving toward the source's initial position, i.e., they close distance from both ends.
- Direction of movement: source and observer move toward each other.
- Wave propagation: wavefronts compress ahead of the source (as in Case 04) and the observer additionally advances into the oncoming compressed wavefronts.
- Frequency behaviour: the two effects combine: physically compressed wavelength plus faster interception rate.
- Compression or expansion of wavefronts: strong compression on the side between the two, visibly more compressed than Case 04 alone.
- Expected animation behaviour: wavefronts bunch tightly in the region between source and observer; the gap between the two markers should close quickly with wavefronts visibly stacking up in that shrinking gap.

**Observation:** The observer hears the highest apparent frequency among all the single- and combined-approach cases.

**Physical Interpretation:** The source's motion compresses the wavelength, and the observer's motion increases the rate of interception on top of that; both effects raise the frequency together.

**Formula:**

f' = ( (V + v₀) / (V − Vₛ) ) × f

**Formula Variables:**

- V = velocity of sound
- v₀ = velocity of observer
- Vₛ = velocity of source
- f = original frequency of sound
- f' = apparent frequency
- λₑ = effective wavelength
- T = time period

**Formula Explanation:** The source moving toward the observer compresses the wavelength: λₑ = (V − Vₛ)/f. The observer moving toward the incoming waves increases the effective wave speed relative to itself: v' = V + v₀. Apparent frequency is f' = v'/λₑ.

**Units:** V, Vₛ, v₀ in m/s; f and f' in Hz.

**Expected Frequency Change:** Large increase (f' significantly > f).

**Step-by-Step Working:**

1. Source moving toward the observer compresses the wavelength: λₑ = vT − vₛT = (v − vₛ)/f.
2. Observer moving toward the incoming waves gives effective wave speed relative to observer: v' = v + v₀.
3. Apparent frequency heard: f' = v'/λₑ.
4. Substituting values: f' = (v + v₀) / [(v − vₛ)/f].
5. Result: f' = ((V + v₀)/(V − Vₛ)) f.

**Expected Result:** The apparent frequency is higher than in any single-motion case, since both effects stack.

**Wavefront Behaviour:** Wavefronts compress from the source's motion; the observer additionally advances into the compressed wavefronts, compounding the effect.

**Real-Life Example:** Two vehicles with sirens approaching each other on a highway; each driver hears an especially sharp rise in pitch compared to either vehicle alone being in motion.

**Key Notes:**

- Both source and observer move; both are approaching.
- Numerator uses "+" (observer approaching raises frequency); denominator uses "−" (source approaching raises frequency), so both signs push f' upward.
- This produces the largest frequency increase of all the "approaching" scenarios.

**Summary:** When both the source and the observer move toward each other, their individual frequency-raising effects combine: the source compresses the wavelength while the observer intercepts the compressed wavefronts even faster than normal. The result is the highest apparent frequency of any two-body approach scenario.

**Image Reference:** backgrounds/case6.png

---

## Case 07

**Title:** Source & Observer Move Away from Each Other

**Short Description:** Source and observer recede from each other simultaneously, combining wavefront stretching with slower interception for the largest possible frequency decrease.

**Detailed Explanation:** When both the source and the observer move away from each other, the observer meets sound waves slower than normal. The waves become more stretched out, so the apparent frequency becomes lower than the actual frequency.

**Initial Condition:** Both source (velocity Vₛ) and observer (velocity v₀) move directly away from one another along the same line.

**Simulation Description:**

- Source position: moving away from the observer.
- Observer position: moving away from the source.
- Direction of movement: source and observer move apart.
- Wave propagation: wavefronts stretch behind the source (as in Case 05) and the observer additionally retreats from the already-stretched wavefronts.
- Frequency behaviour: the two effects combine: physically stretched wavelength plus slower interception rate.
- Compression or expansion of wavefronts: strong stretching in the region between the two, visibly more spread out than Case 05 alone.
- Expected animation behaviour: wavefronts spread apart as source and observer separate; the gap between the two markers should widen with visibly sparser wavefronts in between.

**Observation:** The observer hears the lowest apparent frequency among all the single- and combined-recession cases.

**Physical Interpretation:** The source's motion stretches the wavelength, and the observer's motion decreases the rate of interception on top of that; both effects lower the frequency together.

**Formula:**

f' = ( (V − v₀) / (V + Vₛ) ) × f

**Formula Variables:**

- V = velocity of sound
- v₀ = velocity of observer
- Vₛ = velocity of source
- f = original frequency of sound
- f' = apparent frequency
- λₑ = effective wavelength

**Formula Explanation:** The source moving away from the observer stretches the wavelength: λₑ = (V + Vₛ)/f. The observer moving away from the waves decreases the effective wave speed relative to itself: v' = V − v₀. Apparent frequency is f' = v'/λₑ.

**Units:** V, Vₛ, v₀ in m/s; f and f' in Hz.

**Expected Frequency Change:** Large decrease (f' significantly < f).

**Step-by-Step Working:**

1. Source moving away from the observer stretches the wavelength: λₑ = vT + vₛT = (v + vₛ)/f.
2. Observer moving away from the incoming waves gives effective wave speed relative to observer: v' = v − v₀.
3. Apparent frequency heard: f' = v'/λₑ.
4. Substituting values: f' = (v − v₀) / [(v + vₛ)/f].
5. Result: f' = ((V − v₀)/(V + Vₛ)) f.

**Expected Result:** The apparent frequency is lower than in any single-motion case, since both effects stack in the same direction.

**Wavefront Behaviour:** Wavefronts stretch from the source's motion; the observer additionally retreats from the stretched wavefronts, compounding the effect.

**Real-Life Example:** Two vehicles with sirens driving apart from each other after passing; both drivers hear a sharper drop in pitch than either vehicle moving away alone would cause.

**Key Notes:**

- Both source and observer move; both are receding.
- Numerator uses "−" (observer receding lowers frequency); denominator uses "+" (source receding lowers frequency), so both signs push f' downward.
- This produces the largest frequency decrease of all the "receding" scenarios.

**Summary:** When both the source and the observer move away from each other, their individual frequency-lowering effects combine: the source stretches the wavelength while the observer intercepts the stretched wavefronts even more slowly than normal. The result is the lowest apparent frequency of any two-body recession scenario, and it is the mirror image of Case 06.

**Image Reference:** backgrounds/case7.png

---

## Case 08

**Title:** Source Following Observer

**Short Description:** The observer moves ahead while the source chases it from behind, both traveling in the same direction; the source is "following" (chasing) the observer.

**Detailed Explanation:** When the observer moves away while the source moves towards it, the sound wave and source move in the same direction, and the sound wave and observer also move in the same direction. In effect, the observer is moving ahead (away from the source) while the source moves in the same direction behind it, chasing the observer down.

**Initial Condition:** Observer moves with velocity v₀, ahead and moving away; source moves with velocity Vₛ in the same direction, chasing the observer from behind.

**Simulation Description:**

- Source position: behind, moving forward (chasing the observer, i.e., approaching it).
- Observer position: ahead, moving forward in the same direction, away from the source.
- Direction of movement: both move in the same direction along the same line.
- Wave propagation: the source moving toward the observer compresses the wavelength ahead of it (frequency-raising effect); the observer, retreating ahead, intercepts these waves more slowly (frequency-lowering effect).
- Frequency behaviour: the two effects act in opposite directions, and the net result depends on their relative magnitudes.
- Compression or expansion of wavefronts: compressed wavefronts (source approaching), but the observer is retreating from them faster than a stationary observer would.
- Expected animation behaviour: wavefronts compress in the direction of travel (source side); the observer marker, retreating ahead, should visibly widen or narrow the gap depending on the two speeds.

**Observation:** The apparent frequency depends on the balance between the source's compressing effect and the observer's slower-interception (receding) effect.

**Physical Interpretation:** The observer moves away from the incoming waves, decreasing the effective wave speed relative to it (v' = v − v₀), while the wavelength itself is compressed by the source's forward (chasing) motion (λₑ = (v − vₛ)/f).

**Formula:**

f' = ( (V − v₀) / (V − Vₛ) ) × f

**Formula Variables:**

- V = velocity of sound
- v₀ = velocity of observer
- Vₛ = velocity of source
- f = original frequency of sound
- f' = apparent frequency
- λₑ = effective wavelength

**Formula Explanation:** Effective wave speed relative to observer: v' = V − v₀ (observer retreating, moving away from the incoming waves). Effective (compressed) wavelength: λₑ = (V − Vₛ)/f (source approaching from behind). Apparent frequency: f' = v'/λₑ.

**Units:** V, Vₛ, v₀ in m/s; f and f' in Hz.

**Expected Frequency Change:** Depends on the relative magnitudes of v₀ and Vₛ; increases if Vₛ > v₀, decreases if Vₛ < v₀, unchanged if Vₛ = v₀.

**Step-by-Step Working:**

1. The observer moves away from the incoming waves, so the effective speed of waves relative to the observer decreases: v' = v − v₀.
2. The apparent wavelength (source approaching from behind): λₑ = (v − vₛ)/f.
3. Apparent frequency heard: f' = v'/λₑ.
4. Substituting values: f' = (v − v₀) / [(v − vₛ)/f].
5. Result: f' = ((V − v₀)/(V − Vₛ)) f.

**Expected Result:** A frequency shift whose direction depends on which of the two velocities (source or observer) dominates.

**Wavefront Behaviour:** Compressed by the approaching source; the observer retreats ahead of them.

**Real-Life Example:** An ambulance (source) catching up to and passing a slower-moving car (observer) traveling in the same direction and lane; the driver hears a shifting pitch that depends on the relative closing speed.

**Key Notes:**

- Both source and observer travel in the same direction; the observer leads, the source follows and gains ground, hence "Source Following Observer."
- Unlike Cases 06 and 07, the two motion effects here can partially cancel rather than always reinforcing each other.

**Summary:** In this "chasing" configuration, the observer moves ahead while the source follows behind in the same direction. The source's forward motion compresses the wavelength (a frequency-raising effect), while the observer's motion away from the oncoming waves decreases the interception rate (a frequency-lowering effect). The net apparent frequency depends on which velocity, source or observer, is larger.

**Image Reference:** backgrounds/case8.png

---

## Case 09

**Title:** Observer Following Source

**Short Description:** The source moves ahead while the observer chases it from behind, both traveling in the same direction; the observer is "following" (chasing) the source.

**Detailed Explanation:** When the source moves away while the observer moves towards it, the sound wave and source move in the opposite direction, and the sound wave and observer also move in the opposite direction. In effect, the source is moving ahead (away from the observer) while the observer moves in the same direction behind it, chasing the source down.

**Initial Condition:** Source moves with velocity Vₛ, moving away and ahead; observer moves with velocity v₀ in the same direction as the source, chasing it from behind.

**Simulation Description:**

- Source position: ahead, moving forward (away from the observer's starting point).
- Observer position: behind, moving forward in the same direction (toward where the source is heading, i.e., chasing it).
- Direction of movement: both move in the same direction along the same line.
- Wave propagation: wavefronts stretch behind the moving source (source is effectively receding from the space it just left) while the observer moves into the oncoming wavefronts from behind.
- Frequency behaviour: source motion stretches wavelength (frequency-lowering effect); observer motion toward the incoming wave increases interception rate (frequency-raising effect); the two effects work in opposite directions, but combine multiplicatively in the formula.
- Compression or expansion of wavefronts: stretched wavefronts (source receding), which the observer then moves into more quickly than it would at rest.
- Expected animation behaviour: wavefronts should render stretched apart (wider spacing) in the direction of travel; the observer marker, chasing behind, should visibly close in on the gap despite the wider wavefront spacing.

**Observation:** The apparent frequency depends on the balance between the source's stretching effect and the observer's faster-interception effect.

**Physical Interpretation:** The observer moves toward the incoming waves, so the effective wave speed relative to it increases (v' = v + v₀), while the wavelength itself is stretched by the source's forward motion (λₑ = (v + vₛ)/f).

**Formula:**

f' = ( (V + v₀) / (V + Vₛ) ) × f

**Formula Variables:**

- V = velocity of sound
- v₀ = velocity of observer
- Vₛ = velocity of source
- f = original frequency of sound
- f' = apparent frequency
- λₑ = effective wavelength

**Formula Explanation:** Effective wave speed relative to observer: v' = V + v₀ (observer moving toward the incoming waves). Effective (stretched) wavelength: λₑ = (V + Vₛ)/f (source receding ahead of the observer). Apparent frequency: f' = v'/λₑ.

**Units:** V, Vₛ, v₀ in m/s; f and f' in Hz.

**Expected Frequency Change:** Depends on the relative magnitudes of v₀ and Vₛ; increases if v₀ > Vₛ, decreases if v₀ < Vₛ, unchanged if v₀ = Vₛ.

**Step-by-Step Working:**

1. The observer moves toward the incoming waves, so effective speed of waves relative to observer: v' = v + v₀.
2. The apparent wavelength (source receding ahead): λₑ = (v + vₛ)/f.
3. Apparent frequency heard: f' = v'/λₑ.
4. Substituting values: f' = (v + v₀) / [(v + vₛ)/f].
5. Result: f' = ((V + v₀)/(V + Vₛ)) f.

**Expected Result:** A frequency shift whose direction depends on which of the two velocities (source or observer) dominates.

**Wavefront Behaviour:** Stretched by the receding source; the observer closes in on them from behind.

**Real-Life Example:** A cyclist (observer) pedaling hard to catch up to a car with its stereo playing (source) that is slowly pulling away in the same lane and direction — the sound heard shifts depending on who is closing the gap faster.

**Key Notes:**

- Both source and observer travel in the same direction; the source leads, the observer follows and gains ground, hence "Observer Following Source."
- This is the reverse configuration of Case 08, with the roles of source and observer swapped.

**Summary:** In this configuration, the source moves ahead while the observer follows behind in the same direction. The source's forward motion stretches the wavelength (a frequency-lowering effect), while the observer's motion toward the oncoming waves increases the interception rate (a frequency-raising effect). As in Case 08, the net apparent frequency depends on which velocity is larger; this pair of cases (08 and 09) together show that same-direction "chasing" motion produces a fundamentally different, condition-dependent outcome compared to the head-on approach/recession cases (06 and 07).

**Image Reference:** backgrounds/case9.png

---

## Case 10

**Title:** Sonic Boom

**Subtitle:** Source Speed > Speed of Sound

**Short Description:** When a source's speed exceeds the speed of sound itself, the source outruns its own wavefronts entirely; they can no longer form ahead of it, and instead pile up into a cone-shaped shock wave that produces a sonic boom.

**Detailed Explanation:** In every earlier case, the source's speed Vₛ was assumed to be smaller than the speed of sound V, so wavefronts could still spread out ahead of the source, just compressed closer together (see Case 04). Once Vₛ exceeds V, the source is moving faster than the sound it produces; it literally gets ahead of its own wavefronts. Rather than forming a compressed series of circles in front of the source, the wavefronts intersect and overlap along the edges of a cone trailing behind the source, called the Mach cone. All the wave energy that would normally have arrived gradually is instead concentrated along the surface of this cone, and an observer on the ground experiences it all at once as a single, sharp, loud shock, the sonic boom, as the cone sweeps past.

**Initial Condition:** Source moving in a straight line with speed Vₛ > V (supersonic), continuously emitting sound.

**Simulation Description:**

- Source position: moving forward, faster than the wavefronts it emits can travel outward from it.
- Observer position: fixed on the ground, off to the side of the source's path.
- Direction of movement: source travels forward; each new wavefront it emits starts from a position already ahead of the previous wavefront's leading edge.
- Wave propagation: since Vₛ > V, wavefronts can never spread out ahead of the source; the source is always outrunning them. The circles from each emission point overlap and their outer edges align into a V-shaped (conical, in 3D) envelope trailing the source.
- Frequency behaviour: the simple f' = fV/(V − Vₛ) formula from Case 04 is no longer physically meaningful here, since (V − Vₛ) becomes negative; this breakdown is the mathematical signal that the wave behaviour has fundamentally changed, not just intensified.
- Compression or expansion of wavefronts: extreme; wavefronts pile up exactly along the Mach cone's surface instead of spreading in front of the source at all.
- Expected animation behaviour: show a series of expanding circles from successive source positions, each new circle's center further ahead than the last; the tangent line (cone edge) connecting all the circles should be clearly visible sweeping past the observer, ideally with a distinct visual/audio cue when the cone's edge crosses the observer's position.

**Observation:** As the shock cone passes over a stationary observer, they experience a sudden loud "boom" rather than a rising-then-falling pitch; this is qualitatively different from every subsonic case in this database.

**Physical Interpretation:** At Vₛ = V, Case 04's formula shows f' → ∞ (a mathematical warning sign); once Vₛ > V, the source has physically outrun its own sound, and the compressed-wavefront model no longer applies; the wave energy is redistributed along a cone rather than continuously toward the observer.

**Formula (Mach cone half-angle):**

sin(θ) = V / Vₛ

**Formula (Mach number):**

M = Vₛ / V

**Formula Variables:**

- V = velocity of sound
- Vₛ = velocity of the source (supersonic, Vₛ > V)
- θ = half-angle of the Mach cone
- M = Mach number (ratio of source speed to the speed of sound; M > 1 for supersonic motion)

**Formula Explanation:** The Mach cone's half-angle θ is set by how much faster than sound the source is traveling: sin(θ) = V/Vₛ. As Vₛ increases well beyond V, θ shrinks; a faster object produces a narrower, more concentrated shock cone. The Mach number M = Vₛ/V is the standard way to express "how supersonic" the motion is (M = 1 is exactly the speed of sound; M = 2 is twice the speed of sound, and so on).

**Units:** V and Vₛ in m/s; θ in degrees or radians; M is dimensionless.

**Expected Frequency Change:** Not applicable in the usual sense; the subsonic apparent-frequency formulas break down at and beyond Vₛ = V. The observed effect is a single shock (boom), not a continuously shifted pitch.

**Step-by-Step Working:**

1. Start from Case 04's formula: f' = fV/(V − Vₛ).
2. As Vₛ → V, the denominator (V − Vₛ) → 0, so f' → ∞; a mathematical signal that the model is breaking down, not a literal infinite pitch.
3. For Vₛ > V, (V − Vₛ) becomes negative, which is no longer physically meaningful for a frequency; this confirms the compressed-wavefront model only holds for Vₛ < V.
4. The correct supersonic description instead considers the geometry of overlapping wavefronts
successive circles, each centered further along the source's path than the last, share a common tangent line/cone.
5. That tangent cone's half-angle is derived from the ratio of how far sound travels (V·t) to how far the source travels (Vₛ·t) in the same time t, giving sin(θ) = V/Vₛ.

**Expected Result:** A shock cone trailing the source, with half-angle θ = arcsin(V/Vₛ); an observer experiences a sudden boom as the cone's edge sweeps past, rather than a gradual pitch change.

**Wavefront Behaviour:** Wavefronts no longer spread ahead of the source at all; they overlap along the trailing Mach cone.

**Real-Life Example:** A supersonic jet produces a sonic boom heard on the ground as it passes overhead at speeds exceeding the speed of sound (roughly 343 m/s / 1,235 km/h in air at sea level and room temperature); the crack of a bullwhip is a small-scale everyday example of the tip briefly exceeding the speed of sound.

**Key Notes:**

- This case represents the physical limit referenced in Case 04's Key Notes, where Vₛ → V made the formula blow up.
- The everyday Doppler formulas used in Cases 02–09 all assume Vₛ (and v₀) stay below the speed of sound; this is the boundary condition mentioned in the Limitations section of the theory material.
- Sonic booms are a one-time, sharp event experienced as the shock cone passes, not a sustained pitch shift.

**Summary:** Case 10 sits outside the ordinary Doppler framework covered in Cases 01–09: once a source's speed exceeds the speed of sound, it is no longer possible for wavefronts to spread out ahead of it, and the simple apparent-frequency formulas break down. Instead, wave energy piles up along a trailing Mach cone, and a ground observer experiences a single sharp shock, the sonic boom, as that cone sweeps past. This case exists specifically to show what happens beyond the speed limit implicitly assumed everywhere else in this database.

**Image Reference:** backgrounds/case10.png

---

# Cross-Reference: Formula Summary

| Case | Title                                       | Formula                 |
| ---- | ------------------------------------------- | ----------------------- |
| 01   | Stationary Source & Stationary Observer     | f' = f                  |
| 02   | Observer Approaches Stationary Source       | f' = f(V + v₀)/V        |
| 03   | Observer Moves Away from Stationary Source  | f' = f(V − v₀)/V        |
| 04   | Source Approaches Stationary Observer       | f' = fV/(V − Vₛ)        |
| 05   | Source Moves Away from Stationary Observer  | f' = fV/(V + Vₛ)        |
| 06   | Source & Observer Move Towards Each Other   | f' = f(V + v₀)/(V − Vₛ) |
| 07   | Source & Observer Move Away from Each Other | f' = f(V − v₀)/(V + Vₛ) |
| 08   | Source Following Observer                   | f' = f(V − v₀)/(V − Vₛ) |
| 09   | Observer Following Source                   | f' = f(V + v₀)/(V + Vₛ) |
| 10   | Sonic Boom                                  | sin(θ) = V/Vₛ (Vₛ > V)  |

_Sanity check: every formula above collapses to f' = f (Case 01) when v₀ = 0 and Vₛ = 0._

---

# APPLICATIONS

## Real-Life Examples & Applications of the Doppler Effect

- **Ambulance Siren:** When an ambulance comes toward us, the siren sounds high-pitched, and when it moves away, the pitch decreases.

- **Train Whistles:** The sound of a moving train changes as it approaches and passes by a station, rising in pitch on approach and falling as it recedes, as described in Cases 04 and 05.

- **Radar Guns (Police):** Doppler radar is used by traffic police to measure the speed of moving vehicles. A radio wave is bounced off the moving vehicle, and the frequency shift of the reflected wave reveals the vehicle's speed.

- **Weather Forecasting:** Doppler radar is used to detect storms, wind direction, and rainfall. Meteorologists track the frequency shift of radar signals reflected off precipitation and moving air masses to map storm movement.

- **Medical Field:** Doppler ultrasound is used to measure the flow of blood in arteries and detect heart issues. Sound waves reflected off moving blood cells shift in frequency depending on the direction and speed of blood flow.

---

# LIMITATIONS

## Limitations of the Doppler Effect

- **Assumes Low Speed:** The formulas in Cases 02–09 work accurately only when the speeds of the source and observer are much smaller than the speed of sound. As shown in Case 10, once source speed exceeds the speed of sound, these formulas break down entirely and a different physical model (the Mach cone) is needed.

- **Medium Required:** The sound Doppler Effect cannot occur in a vacuum because sound needs a medium to propagate through.

- **Wind Effect:** The presence of wind can change the speed of sound relative to the ground and cause errors in Doppler-based calculations, since the formulas assume a still medium.

- **Complex Motion:** If the source or observer moves in a curved path instead of a straight line, the calculations become complicated, since the simple formulas in this database assume motion directly along the line connecting source and observer.

---

# CONCLUSION

The Doppler Effect explains a phenomenon most people experience regularly but rarely think about mathematically: why a siren's pitch rises as it approaches and falls as it passes by. At its core, the effect comes down to one idea: motion that closes the distance between a sound source and an observer increases the rate at which wavefronts are intercepted (or physically compresses them), raising the apparent frequency; motion that increases the distance does the opposite, lowering it.

Across the ten cases in this database, from the trivial no-motion baseline (Case 01), through single-body motion (Cases 02–05), combined head-on motion (Cases 06–07), same-direction "chasing" motion (Cases 08–09), and finally the supersonic breakdown of the whole model (Case 10), the same building blocks (effective wave speed relative to the observer, and effective wavelength shaped by the source's motion) combine to produce every formula. Case 10 in particular marks the edge of where this framework applies at all, making explicit the low-speed assumption implicit in every other case.

Beyond sirens and passing trains, the same underlying mathematics drives technologies as varied as police speed radar, weather-tracking radar, and medical ultrasound diagnostics, demonstrating that a phenomenon first explained by Christian Doppler in 1842 for sound waves has become a foundational tool across modern science and engineering.

---

# APPENDIX: FOLDER STRUCTURE NOTE

This file lives at:

```
docs/
    cases-database.md
```

as the single source of truth for the website's case pages, applications, and limitations content.

**Content provenance summary, for future maintainers:**

- Cases 02–09: extracted and rewritten from the source PowerPoint presentation (formulas visually verified against the on-slide derivations).
- Cases 01 and 10: written from scratch to fill the website's fixed 10-case structure, using standard Doppler Effect and sonic-boom physics, not sourced from the presentation.
- Applications, Limitations, and Theory content: extracted from the presentation's dedicated slides.
