/* ======================================================================
   CASE DATA
   Physics content adapted from the original presentation. Standard
   convention: v = speed of sound, vs = source speed, vo = observer speed.
   ====================================================================== */
var CASE_IMAGES = {2:"assets/slides/slide2.png",3:"assets/slides/slide3.png",4:"assets/slides/slide4.png",5:"assets/slides/slide5.png",6:"assets/slides/slide6.png",7:"assets/slides/slide7.png",8:"assets/slides/slide8.png",9:"assets/slides/slide9.png"};

var CASES = {
  1:{
    roman:"I", color:"var(--c1)",
    line1:"Stationary Source", line2:"Stationary Observer",
    glyph:[{t:'s',a:''},{t:'o',a:''}],
    title:"Source and Observer Both Stationary",
    situation:"Both the sound source and the observer remain fixed in position relative to the medium.",
    srcMove:"Stationary — v\u209B = 0",
    obsMove:"Stationary — v\u2092 = 0",
    freq:"No change — the observer hears the exact frequency the source emits.",
    wavefront:"Wavefronts spread out as perfectly concentric circles centered on the source, evenly spaced in all directions.",
    why:"With no relative motion, there is no compression or stretching of wavefronts — every wave arrives at exactly the same interval it was emitted.",
    example:"Standing still next to a ringing telephone — the pitch stays constant.",
    keyObs:"When neither side moves, f' = f. This is the baseline against which all Doppler shifts are measured.",
    formula:"f' = f — no shift",
    freqRel:"No shift — f' = f",
    note:"This null case demonstrates that relative motion is the sole cause of the Doppler effect.",
    example_v:{}
  },
  2:{
    roman:"II", color:"var(--c2)",
    line1:"Observer Approaches", line2:"Stationary Source",
    glyph:[{t:'s',a:''},{t:'o',a:'←'}],
    title:"Observer Moving Toward a Stationary Source",
    situation:"The sound source stays fixed in place while the observer walks or travels straight toward it.",
    srcMove:"Stationary — v\u209B = 0",
    obsMove:"Moving toward the source at speed v\u2092",
    freq:"Increases — the observer hears a higher pitch than the source actually produces.",
    wavefront:"Wavefronts stay evenly spaced around the stationary source; only the observer's own motion changes how often they arrive.",
    why:"Because the observer advances into the wave field, they cross more wavefronts every second than they would standing still — and more wavefronts per second means a higher perceived frequency.",
    example:"Walking briskly toward a ringing bell — it sounds slightly sharper than if you stood still beside it.",
    keyObs:"f' > f whenever the observer closes the distance, even with a source that never moves.",
    formula:"f' = f · (v + v<sub>o</sub>) / v",
    freqRel:"f' > f — pitch rises",
    note:"Valid only while v\u2092 ≪ v (subsonic observer speeds).",
    example_v:{vo:15}
  },
  3:{
    roman:"III", color:"var(--c3)",
     line1:"Observer Moves Away", line2:"from Stationary Source",
    glyph:[{t:'s',a:''},{t:'o',a:'→'}],
    title:"Observer Moving Away From a Stationary Source",
    situation:"The source is fixed while the observer retreats from it in a straight line.",
    srcMove:"Stationary — v\u209B = 0",
    obsMove:"Moving away from the source at speed v\u2092",
    freq:"Decreases — the observer hears a lower pitch than the source actually produces.",
    wavefront:"Wavefronts stay evenly spaced around the stationary source; the observer simply meets fewer of them per second while retreating.",
    why:"As the observer moves away, each successive wavefront takes a little longer to catch up to them, so fewer arrive each second — lowering the perceived frequency.",
    example:"Walking away from a chiming clock tower — the chime sounds progressively duller.",
    keyObs:"f' < f purely from the observer's own retreat — the source's note never changes.",
    formula:"f' = f · (v − v<sub>o</sub>) / v",
    freqRel:"f' < f — pitch falls",
    note:"Valid only while v\u2092 ≪ v (subsonic observer speeds).",
    example_v:{vo:15}
  },
  4:{
    roman:"IV", color:"var(--c4)",
    line1:"Source Approaches", line2:"Stationary Observer",
    glyph:[{t:'s',a:'→'},{t:'o',a:''}],
    title:"Source Moving Toward a Stationary Observer",
    situation:"The observer stays put while the source travels toward them along the line joining them.",
    srcMove:"Moving toward the observer at speed v\u209B",
    obsMove:"Stationary — v\u2092 = 0",
    freq:"Increases — the observer hears a higher pitch than the source's true frequency.",
    wavefront:"Wavefronts compress in front of the moving source, exactly where the observer stands, shortening the wavelength that reaches them.",
    why:"Each new wavefront is emitted from a position closer to the observer than the last, crowding them together in space and shortening the effective wavelength.",
    example:"An ambulance racing toward you — the siren's pitch climbs as it nears.",
    keyObs:"f' > f purely from the source's own approach — a stationary observer still hears the shift.",
    formula:"f' = f · v / (v − v<sub>s</sub>)",
    freqRel:"f' > f — pitch rises",
    note:"Valid only while v\u209B ≪ v; as v\u209B → v the formula diverges.",
    example_v:{vs:25}
  },
  5:{
    roman:"V", color:"var(--c5)",
     line1:"Source Moves Away", line2:"from Stationary Observer",
    glyph:[{t:'s',a:'←'},{t:'o',a:''}],
    title:"Source Moving Away From a Stationary Observer",
    situation:"The observer stays put while the source retreats along the same line.",
    srcMove:"Moving away from the observer at speed v\u209B",
    obsMove:"Stationary — v\u2092 = 0",
    freq:"Decreases — the observer hears a lower pitch than the source's true frequency.",
    wavefront:"Wavefronts stretch out behind the departing source, in the direction the observer stands, lengthening the wavelength that reaches them.",
    why:"Each new wavefront is emitted from a position farther from the observer than the last, spacing them out and lengthening the effective wavelength.",
    example:"The same ambulance siren dropping in pitch once it has passed and is driving away.",
    keyObs:"f' < f purely from the source's own retreat.",
    formula:"f' = f · v / (v + v<sub>s</sub>)",
    freqRel:"f' < f — pitch falls",
    note:"Valid only while v\u209B ≪ v; as v\u209B → v the formula diverges.",
    example_v:{vs:25}
  },
  6:{
    roman:"VI", color:"var(--c6)",
     line1:"Source &amp;", line2:"Observer Approach",
    glyph:[{t:'s',a:'→'},{t:'o',a:'←'}],
    title:"Source and Observer Approaching Each Other",
    situation:"Source and observer move toward one another simultaneously along the same line.",
    srcMove:"Toward the observer at speed v\u209B",
    obsMove:"Toward the source at speed v\u2092",
    freq:"Increases sharply — the strongest positive shift of the direct-approach cases.",
    wavefront:"Wavefronts compress ahead of the source even more than in Case IV, and the observer also races into them faster.",
    why:"Both effects stack: compression from the source's approach and faster wave-crossing from the observer's approach combine additively.",
    example:"Two trains approaching each other on parallel tracks, both sounding their horns.",
    keyObs:"The two independent shifts from Cases II and IV add together here.",
    formula:"f' = f · (v + v<sub>o</sub>) / (v − v<sub>s</sub>)",
    freqRel:"f' ≫ f — sharpest rise",
    note:"Assumes both speeds stay well below v and motion stays along the same straight line.",
    example_v:{vs:25,vo:15}
  },
  7:{
    roman:"VII", color:"var(--c7)",
     line1:"Source &amp;", line2:"Observer Recede",
    glyph:[{t:'s',a:'←'},{t:'o',a:'→'}],
    title:"Source and Observer Receding From Each Other",
    situation:"Source and observer move apart from one another along the same line.",
    srcMove:"Away from the observer at speed v\u209B",
    obsMove:"Away from the source at speed v\u2092",
    freq:"Decreases sharply — the strongest negative shift.",
    wavefront:"Wavefronts stretch out behind the source even more than in Case V, and the observer is also outrunning them.",
    why:"Both effects stack in the other direction: stretching from the source's retreat and slower wave-crossing from the observer's retreat combine additively.",
    example:"Two cars honking as they drive off from each other in opposite directions.",
    keyObs:"The two independent shifts from Cases III and V add together here.",
    formula:"f' = f · (v − v<sub>o</sub>) / (v + v<sub>s</sub>)",
    freqRel:"f' ≪ f — sharpest fall",
    note:"Assumes both speeds stay well below v and motion stays along the same straight line.",
    example_v:{vs:25,vo:15}
  },
  8:{
    roman:"VIII", color:"var(--c8)",
     line1:"Source Following", line2:"Observer",
    glyph:[{t:'s',a:'→'},{t:'o',a:'→'}],
    title:"Observer Followed by the Source",
    situation:"Source and observer travel in the same direction along one line, with the source trailing and closing in on the observer ahead.",
    srcMove:"Chasing forward at v\u209B, closing the gap",
    obsMove:"Moving away, ahead of the source, at v\u2092",
    freq:"Depends on the relative speeds — rises if the source gains on the observer faster than the observer can outrun the waves; no net shift if v\u209B = v\u2092.",
    wavefront:"The source's advance still compresses the field ahead of it, while the observer's own forward motion works to outrun those same wavefronts.",
    why:"The source's motion shortens the wavelength exactly as in Case IV, while the observer's motion lengthens the arrival interval exactly as in Case III — here the two effects oppose rather than add.",
    example:"A police car with siren blaring speeding up behind a car fleeing in the same lane.",
    keyObs:"Equal speeds cancel out entirely — same-direction chases don't guarantee a pitch shift.",
    formula:"f' = f · (v − v<sub>o</sub>) / (v − v<sub>s</sub>)",
    freqRel:"f' ⋚ f — depends on v\u209B vs v\u2092",
    note:"If v\u209B = v\u2092 the source–observer distance stays fixed and the net shift vanishes.",
    example_v:{vs:25,vo:15}
  },
  9:{
    roman:"IX", color:"var(--c9)",
     line1:"Observer Following", line2:"Source",
     glyph:[{t:'s',a:'←'},{t:'o',a:'←'}],
    title:"Source Followed by the Observer",
    situation:"Source and observer travel in the same direction along one line, with the observer trailing and closing in on the source ahead.",
    srcMove:"Moving away, ahead of the observer, at v\u209B",
    obsMove:"Chasing forward at v\u2092, closing the gap",
    freq:"Depends on the relative speeds — rises if the observer gains on the source faster than the source can outrun the waves.",
    wavefront:"The source's advance stretches the field behind it exactly as in Case V, while the observer's own forward motion works to catch up with those wavefronts.",
    why:"This mirrors Case VIII with the roles reversed — here it's the observer's pursuit, not the source's, that dominates whichever way the shift goes.",
    example:"A cyclist pedalling hard to catch up with an ice-cream van playing music ahead.",
    keyObs:"Equal speeds cancel out entirely, just as in Case VIII.",
    formula:"f' = f · (v + v<sub>o</sub>) / (v + v<sub>s</sub>)",
    freqRel:"f' ⋚ f — depends on v\u2092 vs v\u209B",
    note:"If v\u209B = v\u2092 the source–observer distance stays fixed and the net shift vanishes.",
    example_v:{vs:25,vo:15}
  },
  10:{
    roman:"X", color:"var(--c10)",
     line1:"Sonic Boom", line2:"",
    glyph:[{t:'s',a:'»'},{t:'o',a:''}],
    title:"Source Faster Than Sound — Shock Wave",
    situation:"The source itself travels faster than the speed of sound in the medium (v\u209B > v). Not covered in the original slide deck — included here because it's already part of the simulation.",
    srcMove:"Supersonic — v\u209B > v",
    obsMove:"Stationary",
    freq:"The usual formula breaks down entirely — wavefronts can no longer outrun the source.",
    wavefront:"Instead of spreading outward, successive wavefronts pile up into a cone-shaped shock front trailing the source, known as a Mach cone.",
    why:"Once the source outruns its own waves, every wavefront it has ever emitted is overtaken and squeezed onto the surface of a single expanding cone rather than arriving as a rising or falling pitch.",
    example:"The sonic boom heard on the ground as a fighter jet crosses the sound barrier.",
    keyObs:"The observer hears nothing as the source approaches, then a single sharp boom as the cone sweeps past.",
    formula:"sin θ = v / v<sub>s</sub>",
    freqRel:"No steady f' — shock front instead",
    note:"Only valid once v\u209B exceeds v — below Mach 1 this cone never forms.",
    example_v:{mach:true}
  }
};

var SOUND_SPEED = 340, BASE_FREQ = 500;
function computeExampleValues(c){
  var v = SOUND_SPEED, f = BASE_FREQ;
  if(c.example_v.mach){
    var vs = 450;
    var sinT = v/vs;
    var theta = Math.round(Math.asin(sinT)*180/Math.PI);
    return "v = "+v+" m/s, v\u209B = "+vs+" m/s → θ ≈ "+theta+"°";
  }
  var vs = c.example_v.vs || 0, vo = c.example_v.vo || 0;
  var fPrime;
  if(c.roman==="I") fPrime = f; // no shift — both stationary
  else if(c.roman==="II") fPrime = f*(v+vo)/v;
  else if(c.roman==="III") fPrime = f*(v-vo)/v;
  else if(c.roman==="IV") fPrime = f*v/(v-vs);
  else if(c.roman==="V") fPrime = f*v/(v+vs);
  else if(c.roman==="VI") fPrime = f*(v+vo)/(v-vs);
  else if(c.roman==="VII") fPrime = f*(v-vo)/(v+vs);
  else if(c.roman==="VIII") fPrime = f*(v-vo)/(v-vs);
  else if(c.roman==="IX") fPrime = f*(v+vo)/(v+vs);
  var parts = ["f = "+f+" Hz"];
  if(vs) parts.push("v\u209B = "+vs+" m/s");
  if(vo) parts.push("v\u2092 = "+vo+" m/s");
  parts.push("→ f' ≈ "+Math.round(fPrime)+" Hz");
  return parts.join(", ");
}
