'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Step Definitions ─────────────────────────────────────────────────────────

const STEPS = [
  {
    step: 1,
    title: 'You',
    text: 'This is you. The color around you represents your current Gravity Well.',
    rain: false,
    allowCurve: false,
    allowAbsorption: false,
    gwColor: 'darkblue',
    weightedColors: null,
    nonMatchAlpha: 0.45,
    freeMode: false,
  },
  {
    step: 2,
    title: 'The Rain',
    text: 'This is life. All kinds of experiences are always falling.',
    rain: true,
    allowCurve: false,
    allowAbsorption: false,
    gwColor: 'darkblue',
    weightedColors: null,
    nonMatchAlpha: 0.7,
    freeMode: false,
  },
  {
    step: 3,
    title: 'Most Things Pass Through',
    text: 'Most of what happens does not enter your system.',
    rain: true,
    allowCurve: false,
    allowAbsorption: false,
    gwColor: 'darkblue',
    weightedColors: null,
    nonMatchAlpha: 0.32,
    matchAlpha: 0.28,
    freeMode: false,
  },
  {
    step: 4,
    title: 'Matching Colors Bend',
    text: 'What matches your state begins to bend toward you.',
    rain: true,
    allowCurve: true,
    allowAbsorption: false,
    gwColor: 'darkblue',
    weightedColors: null,
    nonMatchAlpha: 0.28,
    freeMode: false,
  },
  {
    step: 5,
    title: 'Absorption',
    text: 'What you absorb reinforces the state you are already in.',
    rain: true,
    allowCurve: true,
    allowAbsorption: true,
    gwColor: 'darkblue',
    weightedColors: null,
    nonMatchAlpha: 0.28,
    freeMode: false,
  },
  {
    step: 6,
    title: 'Presence Is Not Connection',
    text: 'Opportunity may be present. But presence is not the same as connection.',
    rain: true,
    allowCurve: false,
    allowAbsorption: false,
    gwColor: 'darkblue',
    weightedColors: ['white', 'white', 'white', 'white', 'yellow', 'orange', 'darkblue'],
    nonMatchAlpha: 0.8,
    freeMode: false,
  },
  {
    step: 7,
    title: 'Try The Field',
    text: 'Change the Gravity Well and watch what starts to bend.',
    rain: true,
    allowCurve: true,
    allowAbsorption: true,
    gwColor: null,
    weightedColors: null,
    nonMatchAlpha: 0.38,
    freeMode: true,
  },
]

// ─── Color Constants ──────────────────────────────────────────────────────────

const GW_OPTIONS = [
  { label: 'Dark Blue', value: 'darkblue', hex: '#1E3FAA', glow: '#1E5BFF' },
  { label: 'Cyan',      value: 'cyan',     hex: '#0B8FAA', glow: '#21D4FD' },
  { label: 'Green',     value: 'green',    hex: '#15884A', glow: '#36D17C' },
  { label: 'Orange',    value: 'orange',   hex: '#BB6815', glow: '#FF9F2E' },
  { label: 'Yellow',    value: 'yellow',   hex: '#A89018', glow: '#F7D84A' },
  { label: 'White',     value: 'white',    hex: '#909090', glow: '#EAEAEA' },
]

const RAIN_COLORS = [
  { value: 'darkblue', hex: '#1533AA', streak: '#1E5BFF' },
  { value: 'cyan',     hex: '#0E96B0', streak: '#21D4FD' },
  { value: 'green',    hex: '#1A9452', streak: '#36D17C' },
  { value: 'orange',   hex: '#C07018', streak: '#FF9F2E' },
  { value: 'yellow',   hex: '#B89A20', streak: '#F7D84A' },
  { value: 'white',    hex: '#A0A0A0', streak: '#EAEAEA' },
]

// ─── Depth Layer Config ───────────────────────────────────────────────────────

const LAYERS = [
  // 0 — far: faint, thin, slow, minimal drift
  {
    speedMin: 0.26, speedMax: 0.42,
    lengthMin: 8,   lengthMax: 18,
    lineWidth: 0.65,
    glowMult: 0.07,
    opacityMin: 0.16, opacityMax: 0.32,
    driftAmpMin: 0.1, driftAmpMax: 0.35,
    driftFreqMin: 0.00025, driftFreqMax: 0.00060,
  },
  // 1 — mid: medium, moderate glow
  {
    speedMin: 0.42, speedMax: 0.62,
    lengthMin: 18,  lengthMax: 32,
    lineWidth: 1.05,
    glowMult: 0.11,
    opacityMin: 0.34, opacityMax: 0.54,
    driftAmpMin: 0.25, driftAmpMax: 0.65,
    driftFreqMin: 0.00040, driftFreqMax: 0.00085,
  },
  // 2 — near: thicker, brighter, slightly faster
  {
    speedMin: 0.62, speedMax: 0.90,
    lengthMin: 30,  lengthMax: 46,
    lineWidth: 1.6,
    glowMult: 0.16,
    opacityMin: 0.52, opacityMax: 0.76,
    driftAmpMin: 0.35, driftAmpMax: 0.85,
    driftFreqMin: 0.00055, driftFreqMax: 0.00110,
  },
]

const PARTICLE_COUNT = 30   // 10 far + 10 mid + 10 near
const CANVAS_HEIGHT  = 520
const FADE_IN_PX     = 90
const FADE_OUT_PX    = 60

// ─── Particle System ──────────────────────────────────────────────────────────

function pickColor(weightedColors) {
  if (!weightedColors) return RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)]
  const val = weightedColors[Math.floor(Math.random() * weightedColors.length)]
  return RAIN_COLORS.find(c => c.value === val) ?? RAIN_COLORS[0]
}

function layerFromIndex(i) {
  if (i < 10) return 0
  if (i < 20) return 1
  return 2
}

function layerRandom() {
  const r = Math.random()
  return r < 0.34 ? 0 : r < 0.67 ? 1 : 2
}

function buildParticle(canvasWidth, layer, weightedColors, stagger) {
  const cfg = LAYERS[layer]
  return {
    x: (Math.random() * canvasWidth * 1.06) - (canvasWidth * 0.03),
    y: stagger
      ? -Math.random() * CANVAS_HEIGHT * 1.3
      : -(cfg.lengthMax + Math.random() * 50),
    speed:      cfg.speedMin   + Math.random() * (cfg.speedMax   - cfg.speedMin),
    length:     cfg.lengthMin  + Math.random() * (cfg.lengthMax  - cfg.lengthMin),
    layer,
    baseOpacity: cfg.opacityMin + Math.random() * (cfg.opacityMax - cfg.opacityMin),
    color:      pickColor(weightedColors),
    driftPhase: Math.random() * Math.PI * 2,
    driftAmp:   cfg.driftAmpMin + Math.random() * (cfg.driftAmpMax - cfg.driftAmpMin),
    driftFreq:  cfg.driftFreqMin + Math.random() * (cfg.driftFreqMax - cfg.driftFreqMin),
    absorbed:   false,
    absorbing:  false,
    absorbProgress: 0,
  }
}

function createParticle(canvasWidth, index, weightedColors) {
  return buildParticle(canvasWidth, layerFromIndex(index), weightedColors, true)
}

function resetParticle(p, canvasWidth, weightedColors, stagger = false) {
  const layer = layerRandom()
  const cfg   = LAYERS[layer]
  p.x           = (Math.random() * canvasWidth * 1.06) - (canvasWidth * 0.03)
  p.y           = stagger ? -Math.random() * CANVAS_HEIGHT * 1.3 : -(cfg.lengthMax + Math.random() * 50)
  p.speed       = cfg.speedMin  + Math.random() * (cfg.speedMax  - cfg.speedMin)
  p.length      = cfg.lengthMin + Math.random() * (cfg.lengthMax - cfg.lengthMin)
  p.layer       = layer
  p.baseOpacity = cfg.opacityMin + Math.random() * (cfg.opacityMax - cfg.opacityMin)
  p.color       = pickColor(weightedColors)
  p.driftPhase  = Math.random() * Math.PI * 2
  p.driftAmp    = cfg.driftAmpMin + Math.random() * (cfg.driftAmpMax - cfg.driftAmpMin)
  p.driftFreq   = cfg.driftFreqMin + Math.random() * (cfg.driftFreqMax - cfg.driftFreqMin)
  p.absorbed    = false
  p.absorbing   = false
  p.absorbProgress = 0
}

// ─── Drawing Helper ───────────────────────────────────────────────────────────

function drawStreak(ctx, x, topY, bottomY, color, opacity, layer) {
  if (opacity <= 0.015) return
  const cfg = LAYERS[layer]
  ctx.lineCap = 'round'

  // Wide outer glow
  ctx.globalAlpha = Math.min(1, opacity * cfg.glowMult * 1.4)
  ctx.strokeStyle = color.streak
  ctx.lineWidth   = cfg.lineWidth + 7
  ctx.beginPath(); ctx.moveTo(x, topY); ctx.lineTo(x, bottomY); ctx.stroke()

  // Tight mid glow
  ctx.globalAlpha = Math.min(1, opacity * cfg.glowMult * 2.6)
  ctx.strokeStyle = color.streak
  ctx.lineWidth   = cfg.lineWidth + 2.5
  ctx.beginPath(); ctx.moveTo(x, topY); ctx.lineTo(x, bottomY); ctx.stroke()

  // Core — vertical gradient: transparent → bright → transparent
  const grad = ctx.createLinearGradient(x, topY, x, bottomY)
  grad.addColorStop(0,    hexToRgba(color.streak, 0))
  grad.addColorStop(0.18, hexToRgba(color.streak, opacity * 0.72))
  grad.addColorStop(0.48, hexToRgba(color.streak, opacity))
  grad.addColorStop(0.80, hexToRgba(color.streak, opacity * 0.60))
  grad.addColorStop(1,    hexToRgba(color.streak, 0))

  ctx.globalAlpha = 1
  ctx.strokeStyle = grad
  ctx.lineWidth   = cfg.lineWidth
  ctx.beginPath(); ctx.moveTo(x, topY); ctx.lineTo(x, bottomY); ctx.stroke()
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

function renderFrame({ ctx, particles, canvasWidth, canvasHeight, gwColor, auraIntensity, stepCfg, fieldStrength }) {
  // Near-full clear — gradient handles streak appearance, no heavy trails
  ctx.fillStyle = 'rgba(0,0,0,0.93)'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  const figureX = canvasWidth / 2
  const figureY = canvasHeight - 72

  // Radial vignette — darker at edges, transparent near figure
  const vig = ctx.createRadialGradient(figureX, figureY, 0, figureX, canvasHeight * 0.48, canvasWidth * 0.7)
  vig.addColorStop(0,    'rgba(0,0,0,0)')
  vig.addColorStop(0.55, 'rgba(0,0,0,0.06)')
  vig.addColorStop(1,    'rgba(0,0,0,0.45)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  const auraGw  = GW_OPTIONS.find(g => g.value === gwColor)
  const auraCol = auraGw?.glow ?? '#ffffff'
  const gwHex   = auraGw?.hex  ?? '#888888'

  // Breathing aura — slow sine pulse ~8s cycle
  const t        = performance.now()
  const breathe  = 0.5 + 0.5 * Math.sin(t * 0.00072)
  const baseI    = 0.13 + breathe * 0.055
  const intensity = baseI + Math.min(auraIntensity * 0.15, 0.42)

  // Four aura layers: wide diffuse → tight inner
  ;[
    { r: 118, as: 0.28 },
    { r: 76,  as: 0.50 },
    { r: 44,  as: 0.68 },
    { r: 20,  as: 0.38 },
  ].forEach(({ r, as }) => {
    const g = ctx.createRadialGradient(figureX, figureY - 15, 0, figureX, figureY - 15, r)
    g.addColorStop(0,   hexToRgba(auraCol, intensity * as))
    g.addColorStop(0.5, hexToRgba(auraCol, intensity * as * 0.42))
    g.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(figureX, figureY - 15, r, 0, Math.PI * 2)
    ctx.fill()
  })

  // Stick figure
  ctx.strokeStyle = gwHex
  ctx.lineWidth   = 1.8
  ctx.shadowColor = auraCol
  ctx.shadowBlur  = 12
  ctx.lineCap     = 'round'

  ctx.beginPath(); ctx.arc(figureX, figureY - 42, 9, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(figureX, figureY - 33); ctx.lineTo(figureX, figureY - 8); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(figureX - 14, figureY - 26); ctx.lineTo(figureX + 14, figureY - 26); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(figureX, figureY - 8); ctx.lineTo(figureX - 11, figureY + 8); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(figureX, figureY - 8); ctx.lineTo(figureX + 11, figureY + 8); ctx.stroke()

  ctx.shadowBlur = 0

  if (!stepCfg.rain) return

  const nonMatchAlpha = stepCfg.nonMatchAlpha ?? 0.38
  const matchAlpha    = stepCfg.matchAlpha    ?? 1.0
  const curveZone     = canvasHeight * 0.52
  const now           = performance.now()

  // Draw far → near for natural depth layering
  const sorted = [...particles].sort((a, b) => a.layer - b.layer)

  sorted.forEach(p => {
    if (p.absorbed) return

    const isMatch = p.color.value === gwColor
    const driftX  = p.driftAmp * Math.sin(p.driftPhase + now * p.driftFreq)

    let drawX = p.x + driftX
    if (isMatch && stepCfg.allowCurve && p.y > curveZone) {
      const progress = (p.y - curveZone) / (canvasHeight - curveZone)
      const ease     = progress * progress * progress
      drawX = p.x + driftX + (figureX - p.x) * ease * 0.72 * (fieldStrength / 50)
    }

    // Fade in at top, fade out at bottom
    const topFade    = Math.min(1, Math.max(0, (p.y + p.length) / FADE_IN_PX))
    const bottomFade = Math.min(1, Math.max(0, (canvasHeight - FADE_OUT_PX - p.y) / FADE_OUT_PX))
    const lifeFade   = Math.min(topFade, bottomFade)

    if (p.absorbing) {
      const absorbFade = Math.max(0, 1 - p.absorbProgress * 2.0)
      const opacity    = p.baseOpacity * absorbFade * lifeFade
      const shrink     = 1 - p.absorbProgress * 0.5
      drawStreak(ctx, drawX, p.y - p.length * shrink, p.y, p.color, opacity, p.layer)
      return
    }

    const baseAlpha = isMatch ? p.baseOpacity * matchAlpha : p.baseOpacity * nonMatchAlpha
    const opacity   = baseAlpha * lifeFade

    drawStreak(ctx, drawX, p.y - p.length, p.y, p.color, opacity, p.layer)
  })
}

// ─── Particle Update ──────────────────────────────────────────────────────────

function updateParticles({ particles, canvasWidth, canvasHeight, gwColor, fieldStrength, stepCfg, auraIntensityRef, pulseRef }) {
  if (!stepCfg.rain) return

  const figureX   = canvasWidth / 2
  const figureY   = canvasHeight - 72
  const curveZone = canvasHeight * 0.52
  const now       = performance.now()

  particles.forEach(p => {
    if (p.absorbed) return

    if (p.absorbing) {
      p.absorbProgress += 0.024  // slow, graceful fade
      if (p.absorbProgress >= 1) {
        p.absorbed = true
        resetParticle(p, canvasWidth, stepCfg.weightedColors)
      }
      return
    }

    const isMatch = p.color.value === gwColor
    const driftX  = p.driftAmp * Math.sin(p.driftPhase + now * p.driftFreq)
    let curvedX   = p.x + driftX

    if (isMatch && stepCfg.allowCurve && p.y > curveZone) {
      const progress = (p.y - curveZone) / (canvasHeight - curveZone)
      const ease     = progress * progress * progress
      curvedX = p.x + driftX + (figureX - p.x) * ease * 0.72 * (fieldStrength / 50)
    }

    p.y += p.speed

    if (isMatch && stepCfg.allowAbsorption) {
      const dist = Math.hypot(curvedX - figureX, p.y - figureY)
      if (dist < 26) {
        p.absorbing = true
        auraIntensityRef.current = Math.min(auraIntensityRef.current + 0.75, 5)
        pulseRef.current = 1
        return
      }
    }

    if (p.y > canvasHeight + p.length + 12) {
      resetParticle(p, canvasWidth, stepCfg.weightedColors)
    }
  })
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, alpha))})`
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TryTheField() {
  const canvasRef     = useRef(null)
  const particlesRef  = useRef([])
  const rafRef        = useRef(null)
  const auraIntensity = useRef(0)
  const pulseRef      = useRef(0)
  const runningRef    = useRef(true)
  const stepCfgRef    = useRef(STEPS[0])

  const [currentStep,   setCurrentStep]   = useState(1)
  const [gwColor,       setGwColor]       = useState('darkblue')
  const [fieldStrength, setFieldStrength] = useState(50)
  const [running,       setRunning]       = useState(true)
  const [canvasWidth,   setCanvasWidth]   = useState(800)

  useEffect(() => { runningRef.current = running }, [running])

  const stepCfg       = STEPS[currentStep - 1]
  const activeGwColor = stepCfg.gwColor ?? gwColor
  stepCfgRef.current  = stepCfg

  // Init particles
  useEffect(() => {
    const w = canvasRef.current?.parentElement?.offsetWidth || 800
    setCanvasWidth(w)
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
      createParticle(w, i, STEPS[0].weightedColors)
    )
  }, [])

  // Resize observer
  useEffect(() => {
    const el = canvasRef.current?.parentElement
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      setCanvasWidth(w)
      particlesRef.current.forEach(p =>
        resetParticle(p, w, stepCfgRef.current.weightedColors)
      )
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      const cfg = stepCfgRef.current
      const gw  = cfg.gwColor ?? gwColor

      if (runningRef.current) {
        updateParticles({
          particles: particlesRef.current,
          canvasWidth,
          canvasHeight: CANVAS_HEIGHT,
          gwColor: gw,
          fieldStrength,
          stepCfg: cfg,
          auraIntensityRef: auraIntensity,
          pulseRef,
        })
      }

      auraIntensity.current = Math.max(0, auraIntensity.current - 0.022)
      pulseRef.current      = Math.max(0, pulseRef.current      - 0.04)

      renderFrame({
        ctx,
        particles: particlesRef.current,
        canvasWidth,
        canvasHeight: CANVAS_HEIGHT,
        gwColor: gw,
        auraIntensity: auraIntensity.current,
        stepCfg: cfg,
        fieldStrength,
      })
    }

    loop()
    return () => cancelAnimationFrame(rafRef.current)
  }, [canvasWidth, gwColor, fieldStrength])

  // Step navigation
  const applyStep = useCallback((n, stagger = false) => {
    const cfg = STEPS[n - 1]
    auraIntensity.current = 0
    particlesRef.current.forEach(p =>
      resetParticle(p, canvasWidth, cfg.weightedColors, stagger)
    )
    setCurrentStep(n)
  }, [canvasWidth])

  const handleNext   = useCallback(() => { if (currentStep < 7) applyStep(currentStep + 1, true)  }, [currentStep, applyStep])
  const handleBack   = useCallback(() => { if (currentStep > 1) applyStep(currentStep - 1, false) }, [currentStep, applyStep])
  const handleReplay = useCallback(() => applyStep(currentStep, true),  [currentStep, applyStep])
  const handleFree   = useCallback(() => applyStep(7, true),            [applyStep])

  const handleGwChange = (val) => {
    setGwColor(val)
    auraIntensity.current = 0
  }

  const activeGw = GW_OPTIONS.find(g => g.value === activeGwColor)

  return (
    <div style={S.page}>

      <div style={S.header}>
        <h1 style={S.title}>Try The Field</h1>
        <p style={S.subtitle}>See how your inner state shapes what reaches you.</p>
      </div>

      <div style={S.canvasWrap}>
        <canvas ref={canvasRef} width={canvasWidth} height={CANVAS_HEIGHT} style={S.canvas} />
      </div>

      <div style={S.stepBox}>
        <div style={S.stepCounter}>
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} style={{
              ...S.stepDot,
              background: i + 1 === currentStep ? activeGw?.glow ?? '#fff' : '#2a2a2a',
              boxShadow:  i + 1 === currentStep ? `0 0 8px ${activeGw?.glow ?? '#fff'}88` : 'none',
            }} />
          ))}
        </div>
        <div style={{ ...S.stepNum, color: activeGw?.glow ?? '#888' }}>
          Step {currentStep} of 7
        </div>
        <h2 style={S.stepTitle}>{stepCfg.title}</h2>
        <p style={S.stepText}>{stepCfg.text}</p>
      </div>

      <div style={S.nav}>
        <button onClick={handleBack} disabled={currentStep === 1}
          style={{ ...S.navBtn, opacity: currentStep === 1 ? 0.25 : 1 }}>
          ← Back
        </button>
        <button onClick={handleReplay} style={{ ...S.navBtn, ...S.replayBtn }}>
          Replay
        </button>
        {currentStep < 7 && (
          <button onClick={handleFree} style={{ ...S.navBtn, ...S.skipBtn }}>
            Skip to Free Mode
          </button>
        )}
        {currentStep < 7 ? (
          <button onClick={handleNext}
            style={{ ...S.navBtn, ...S.nextBtn, borderColor: activeGw?.glow ?? '#555', color: activeGw?.glow ?? '#aaa' }}>
            Next →
          </button>
        ) : (
          <span style={{ ...S.navBtn, ...S.freeModeTag, borderColor: activeGw?.glow ?? '#555', color: activeGw?.glow ?? '#aaa' }}>
            Free Mode
          </span>
        )}
      </div>

      {stepCfg.freeMode && (
        <div style={S.controls}>
          <div style={S.controlGroup}>
            <label style={S.controlLabel}>Gravity Well</label>
            <div style={S.gwButtons}>
              {GW_OPTIONS.map(gw => (
                <button key={gw.value} onClick={() => handleGwChange(gw.value)}
                  aria-label={gw.label} title={gw.label}
                  style={{
                    ...S.gwBtn,
                    background: gw.glow,
                    outline:    gwColor === gw.value ? `2px solid ${gw.glow}` : '2px solid transparent',
                    boxShadow:  gwColor === gw.value ? `0 0 12px ${gw.glow}88` : 'none',
                    opacity:    gwColor === gw.value ? 1 : 0.45,
                  }} />
              ))}
            </div>
            <span style={{ ...S.gwLabel, color: activeGw?.glow }}>
              {activeGw?.label}
            </span>
          </div>

          <div style={S.controlGroup}>
            <label style={S.controlLabel}>Field Strength</label>
            <input type="range" min={10} max={100} value={fieldStrength}
              onChange={e => setFieldStrength(Number(e.target.value))}
              style={S.slider} />
          </div>

          <div style={S.controlGroup}>
            <button onClick={() => setRunning(r => !r)} style={S.actionBtn}>
              {running ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={() => {
                auraIntensity.current = 0
                particlesRef.current.forEach(p => resetParticle(p, canvasWidth, null, true))
              }}
              style={{ ...S.actionBtn, ...S.resetBtn }}>
              Reset
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = {
  page: {
    minHeight: '100vh',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '36px 20px 64px',
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    letterSpacing: '-0.01em',
    margin: 0,
    color: '#f0f0f0',
  },
  subtitle: {
    marginTop: 8,
    fontSize: '0.8rem',
    color: '#555',
    letterSpacing: '0.02em',
    fontWeight: 300,
  },
  canvasWrap: {
    width: '100%',
    maxWidth: 860,
    borderRadius: 12,
    overflow: 'hidden',
    background: '#000',
    boxShadow: '0 0 60px rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.05)',
  },
  canvas: {
    display: 'block',
    width: '100%',
  },
  stepBox: {
    marginTop: 32,
    textAlign: 'center',
    maxWidth: 560,
    width: '100%',
  },
  stepCounter: {
    display: 'flex',
    justifyContent: 'center',
    gap: 7,
    marginBottom: 14,
  },
  stepDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    display: 'inline-block',
    transition: 'background 0.3s, box-shadow 0.3s',
  },
  stepNum: {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    marginBottom: 10,
    fontWeight: 500,
    transition: 'color 0.4s',
  },
  stepTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
    fontWeight: 600,
    margin: '0 0 12px',
    color: '#f0f0f0',
    letterSpacing: '-0.01em',
  },
  stepText: {
    fontSize: '0.95rem',
    color: '#777',
    lineHeight: 1.7,
    margin: 0,
    fontStyle: 'italic',
    fontFamily: "'Playfair Display', serif",
  },
  nav: {
    marginTop: 28,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBtn: {
    background: 'transparent',
    border: '1px solid #2a2a2a',
    color: '#777',
    padding: '8px 18px',
    borderRadius: 6,
    fontSize: '0.8rem',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'border-color 0.2s, color 0.2s, opacity 0.2s',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  replayBtn: { color: '#444', borderColor: '#1e1e1e', fontSize: '0.72rem' },
  skipBtn:   { color: '#383838', borderColor: '#181818', fontSize: '0.68rem', letterSpacing: '0.06em' },
  nextBtn:   { fontWeight: 500 },
  freeModeTag: { fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.1em', cursor: 'default' },
  controls: {
    marginTop: 36,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 860,
    paddingTop: 24,
    borderTop: '1px solid #111',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  controlLabel: {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: '#3a3a3a',
    fontWeight: 500,
  },
  gwButtons: { display: 'flex', gap: 10 },
  gwBtn: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'outline 0.15s, box-shadow 0.15s, opacity 0.15s',
  },
  gwLabel: {
    fontSize: '0.72rem',
    letterSpacing: '0.06em',
    fontWeight: 500,
    minHeight: '1em',
    transition: 'color 0.3s',
  },
  slider: { width: 140, accentColor: '#444', cursor: 'pointer' },
  actionBtn: {
    background: 'transparent',
    border: '1px solid #1e1e1e',
    color: '#666',
    padding: '7px 18px',
    borderRadius: 6,
    fontSize: '0.78rem',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  resetBtn: { marginTop: 4, fontSize: '0.7rem', color: '#333', borderColor: '#181818' },
}
