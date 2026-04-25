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
    nonMatchAlpha: 0.62,
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
    nonMatchAlpha: 0.38,
    matchAlpha: 0.32,
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
    nonMatchAlpha: 0.35,
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
    nonMatchAlpha: 0.35,
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
    // heavily weighted toward white — opportunity everywhere, none connecting
    weightedColors: ['white', 'white', 'white', 'white', 'yellow', 'orange', 'darkblue'],
    nonMatchAlpha: 0.75,
    freeMode: false,
  },
  {
    step: 7,
    title: 'Try The Field',
    text: 'Change the Gravity Well and watch what starts to bend.',
    rain: true,
    allowCurve: true,
    allowAbsorption: true,
    gwColor: null,  // user-controlled
    weightedColors: null,
    nonMatchAlpha: 0.45,
    freeMode: true,
  },
]

// ─── Color Constants ──────────────────────────────────────────────────────────

const GW_OPTIONS = [
  { label: 'Dark Blue', value: 'darkblue', hex: '#1a3a6b', glow: '#2255cc' },
  { label: 'Cyan',      value: 'cyan',     hex: '#00bcd4', glow: '#00e5ff' },
  { label: 'Green',     value: 'green',    hex: '#2e7d32', glow: '#00e676' },
  { label: 'Orange',    value: 'orange',   hex: '#e65100', glow: '#ff9800' },
  { label: 'Yellow',    value: 'yellow',   hex: '#f9a825', glow: '#ffee58' },
  { label: 'White',     value: 'white',    hex: '#e0e0e0', glow: '#ffffff' },
]

const RAIN_COLORS = [
  { value: 'darkblue', hex: '#2255cc', streak: '#3a6fec' },
  { value: 'cyan',     hex: '#00bcd4', streak: '#26d9f0' },
  { value: 'green',    hex: '#00c853', streak: '#40e070' },
  { value: 'orange',   hex: '#ff6d00', streak: '#ff9533' },
  { value: 'yellow',   hex: '#ffd600', streak: '#ffe84d' },
  { value: 'white',    hex: '#e8e8e8', streak: '#ffffff' },
]

const PARTICLE_COUNT = 72
const CANVAS_HEIGHT  = 520

// ─── Particle System ──────────────────────────────────────────────────────────

function pickColor(weightedColors) {
  if (!weightedColors) return RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)]
  const val = weightedColors[Math.floor(Math.random() * weightedColors.length)]
  return RAIN_COLORS.find(c => c.value === val) ?? RAIN_COLORS[0]
}

function createParticle(canvasWidth, weightedColors) {
  return {
    id: Math.random(),
    x: (Math.random() * canvasWidth * 1.1) - (canvasWidth * 0.05),
    y: -Math.random() * CANVAS_HEIGHT * 1.2,
    speed: 1.4 + Math.random() * 1.8,
    length: 14 + Math.random() * 22,
    opacity: 0.55 + Math.random() * 0.35,
    color: pickColor(weightedColors),
    absorbed: false,
    absorbing: false,
    absorbProgress: 0,
  }
}

function resetParticle(p, canvasWidth, weightedColors, stagger = false) {
  p.id = Math.random()
  p.x = (Math.random() * canvasWidth * 1.1) - (canvasWidth * 0.05)
  p.y = stagger ? -Math.random() * CANVAS_HEIGHT * 1.2 : -Math.random() * 60
  p.speed = 1.4 + Math.random() * 1.8
  p.length = 14 + Math.random() * 22
  p.opacity = 0.55 + Math.random() * 0.35
  p.color = pickColor(weightedColors)
  p.absorbed = false
  p.absorbing = false
  p.absorbProgress = 0
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

function renderFrame({ ctx, particles, canvasWidth, canvasHeight, gwColor, auraIntensity, stepCfg, fieldStrength }) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.82)'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  const figureX = canvasWidth / 2
  const figureY = canvasHeight - 72
  const auraGw  = GW_OPTIONS.find(g => g.value === gwColor)
  const auraCol = auraGw?.glow ?? '#ffffff'
  const gwHex   = auraGw?.hex  ?? '#ffffff'

  // Aura glow
  const intensity = 0.28 + Math.min(auraIntensity * 0.18, 0.55)
  for (let r = 3; r >= 1; r--) {
    const grad = ctx.createRadialGradient(figureX, figureY - 12, 0, figureX, figureY - 12, 58 + r * 14)
    grad.addColorStop(0, hexToRgba(auraCol, intensity * (1.2 - r * 0.22)))
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(figureX, figureY - 12, 58 + r * 14, 0, Math.PI * 2)
    ctx.fill()
  }

  // Stick figure
  ctx.strokeStyle = gwHex
  ctx.lineWidth = 1.8
  ctx.shadowColor = auraCol
  ctx.shadowBlur = 8

  ctx.beginPath()
  ctx.arc(figureX, figureY - 42, 9, 0, Math.PI * 2)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(figureX, figureY - 33)
  ctx.lineTo(figureX, figureY - 8)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(figureX - 14, figureY - 26)
  ctx.lineTo(figureX + 14, figureY - 26)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(figureX, figureY - 8)
  ctx.lineTo(figureX - 11, figureY + 8)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(figureX, figureY - 8)
  ctx.lineTo(figureX + 11, figureY + 8)
  ctx.stroke()

  ctx.shadowBlur = 0

  if (!stepCfg.rain) return

  const nonMatchAlpha = stepCfg.nonMatchAlpha ?? 0.45
  const matchAlpha    = stepCfg.matchAlpha    ?? 1.0
  const curveZone     = canvasHeight * 0.55

  // Rain particles
  particles.forEach(p => {
    if (p.absorbed) return

    const isMatch = p.color.value === gwColor

    // Absorbing fade-out
    if (p.absorbing) {
      const alpha = Math.max(0, 1 - p.absorbProgress * 2.5) * p.opacity
      ctx.globalAlpha = alpha
      ctx.strokeStyle = p.color.streak
      ctx.lineWidth = 1.5
      ctx.shadowColor = p.color.hex
      ctx.shadowBlur = 6
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x, p.y - p.length * (1 - p.absorbProgress))
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
      return
    }

    // Non-matching: straight fall
    if (!isMatch) {
      ctx.globalAlpha = p.opacity * nonMatchAlpha
      ctx.strokeStyle = p.color.streak
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x, p.y - p.length)
      ctx.stroke()
      ctx.globalAlpha = 1
      return
    }

    // Matching: optionally curve toward figure
    let drawX = p.x
    if (stepCfg.allowCurve && p.y > curveZone) {
      const progress = (p.y - curveZone) / (canvasHeight - curveZone)
      const ease = progress * progress * progress
      const pull = (figureX - p.x) * ease * 0.72 * (fieldStrength / 50)
      drawX = p.x + pull
    }

    ctx.globalAlpha = p.opacity * matchAlpha
    ctx.strokeStyle = p.color.streak
    ctx.lineWidth = 1.8
    ctx.shadowColor = p.color.hex
    ctx.shadowBlur = 7
    ctx.beginPath()
    ctx.moveTo(drawX, p.y)
    ctx.lineTo(drawX, p.y - p.length)
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
  })
}

// ─── Particle Update ──────────────────────────────────────────────────────────

function updateParticles({ particles, canvasWidth, canvasHeight, gwColor, fieldStrength, stepCfg, auraIntensityRef, pulseRef }) {
  if (!stepCfg.rain) return

  const figureX   = canvasWidth / 2
  const figureY   = canvasHeight - 72
  const curveZone = canvasHeight * 0.55

  particles.forEach(p => {
    if (p.absorbed) return

    if (p.absorbing) {
      p.absorbProgress += 0.045
      if (p.absorbProgress >= 1) {
        p.absorbed = true
        resetParticle(p, canvasWidth, stepCfg.weightedColors)
      }
      return
    }

    const isMatch = p.color.value === gwColor
    let curvedX = p.x

    if (isMatch && stepCfg.allowCurve && p.y > curveZone) {
      const progress = (p.y - curveZone) / (canvasHeight - curveZone)
      const ease = progress * progress * progress
      curvedX = p.x + (figureX - p.x) * ease * 0.72 * (fieldStrength / 50)
    }

    p.y += p.speed

    if (isMatch && stepCfg.allowAbsorption) {
      const dist = Math.hypot(curvedX - figureX, p.y - figureY)
      if (dist < 28) {
        p.absorbing = true
        auraIntensityRef.current = Math.min(auraIntensityRef.current + 0.9, 6)
        pulseRef.current = 1
        return
      }
    }

    if (p.y > canvasHeight + 20) {
      resetParticle(p, canvasWidth, stepCfg.weightedColors)
    }
  })
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
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

  // Derive active gwColor: step overrides unless free mode
  const stepCfg      = STEPS[currentStep - 1]
  const activeGwColor = stepCfg.gwColor ?? gwColor
  stepCfgRef.current  = stepCfg

  // Init particles
  useEffect(() => {
    const w = canvasRef.current?.parentElement?.offsetWidth || 800
    setCanvasWidth(w)
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(w, STEPS[0].weightedColors)
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

  // Animation loop — re-runs when canvas size, gw, or field strength change
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

      auraIntensity.current = Math.max(0, auraIntensity.current - 0.035)
      pulseRef.current      = Math.max(0, pulseRef.current      - 0.06)

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

  // ── Step navigation ──────────────────────────────────────────────────────────

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

      {/* Header */}
      <div style={S.header}>
        <h1 style={S.title}>Try The Field</h1>
        <p style={S.subtitle}>See how your inner state shapes what reaches you.</p>
      </div>

      {/* Canvas */}
      <div style={S.canvasWrap}>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={CANVAS_HEIGHT}
          style={S.canvas}
        />
      </div>

      {/* Step info */}
      <div style={S.stepBox}>
        <div style={S.stepCounter}>
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={i}
              style={{
                ...S.stepDot,
                background: i + 1 === currentStep ? activeGw?.glow ?? '#fff' : '#2a2a2a',
                boxShadow: i + 1 === currentStep ? `0 0 8px ${activeGw?.glow ?? '#fff'}88` : 'none',
              }}
            />
          ))}
        </div>
        <div style={{ ...S.stepNum, color: activeGw?.glow ?? '#888' }}>
          Step {currentStep} of 7
        </div>
        <h2 style={S.stepTitle}>{stepCfg.title}</h2>
        <p style={S.stepText}>{stepCfg.text}</p>
      </div>

      {/* Navigation */}
      <div style={S.nav}>
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          style={{ ...S.navBtn, opacity: currentStep === 1 ? 0.25 : 1 }}
        >
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
          <button onClick={handleNext} style={{ ...S.navBtn, ...S.nextBtn, borderColor: activeGw?.glow ?? '#555', color: activeGw?.glow ?? '#aaa' }}>
            Next →
          </button>
        ) : (
          <span style={{ ...S.navBtn, ...S.freeModeTag, borderColor: activeGw?.glow ?? '#555', color: activeGw?.glow ?? '#aaa' }}>
            Free Mode
          </span>
        )}
      </div>

      {/* Controls — only in free mode (step 7) */}
      {stepCfg.freeMode && (
        <div style={S.controls}>
          <div style={S.controlGroup}>
            <label style={S.controlLabel}>Gravity Well</label>
            <div style={S.gwButtons}>
              {GW_OPTIONS.map(gw => (
                <button
                  key={gw.value}
                  onClick={() => handleGwChange(gw.value)}
                  aria-label={gw.label}
                  title={gw.label}
                  style={{
                    ...S.gwBtn,
                    background: gw.hex,
                    outline: gwColor === gw.value ? `2px solid ${gw.glow}` : '2px solid transparent',
                    boxShadow: gwColor === gw.value ? `0 0 10px ${gw.glow}88` : 'none',
                  }}
                />
              ))}
            </div>
            <span style={{ ...S.gwLabel, color: activeGw?.glow }}>
              {activeGw?.label}
            </span>
          </div>

          <div style={S.controlGroup}>
            <label style={S.controlLabel}>Field Strength</label>
            <input
              type="range"
              min={10}
              max={100}
              value={fieldStrength}
              onChange={e => setFieldStrength(Number(e.target.value))}
              style={S.slider}
            />
          </div>

          <div style={S.controlGroup}>
            <button onClick={() => setRunning(r => !r)} style={S.actionBtn}>
              {running ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={() => { auraIntensity.current = 0; particlesRef.current.forEach(p => resetParticle(p, canvasWidth, null, true)) }}
              style={{ ...S.actionBtn, ...S.resetBtn }}
            >
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
    color: '#666',
    letterSpacing: '0.02em',
    fontWeight: 300,
  },
  canvasWrap: {
    width: '100%',
    maxWidth: 860,
    borderRadius: 12,
    overflow: 'hidden',
    background: '#000',
    boxShadow: '0 0 60px rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.06)',
  },
  canvas: {
    display: 'block',
    width: '100%',
  },

  // Step info
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
    color: '#888',
    lineHeight: 1.7,
    margin: 0,
    fontStyle: 'italic',
    fontFamily: "'Playfair Display', serif",
  },

  // Navigation
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
    border: '1px solid #333',
    color: '#888',
    padding: '8px 18px',
    borderRadius: 6,
    fontSize: '0.8rem',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'border-color 0.2s, color 0.2s, opacity 0.2s',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  replayBtn: {
    color: '#555',
    borderColor: '#222',
    fontSize: '0.72rem',
  },
  skipBtn: {
    color: '#444',
    borderColor: '#1e1e1e',
    fontSize: '0.68rem',
    letterSpacing: '0.06em',
  },
  nextBtn: {
    fontWeight: 500,
  },
  freeModeTag: {
    fontWeight: 500,
    fontSize: '0.72rem',
    letterSpacing: '0.1em',
    cursor: 'default',
  },

  // Free-mode controls
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
    borderTop: '1px solid #151515',
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
    color: '#444',
    fontWeight: 500,
  },
  gwButtons: {
    display: 'flex',
    gap: 8,
  },
  gwBtn: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'outline 0.15s, box-shadow 0.15s',
  },
  gwLabel: {
    fontSize: '0.72rem',
    letterSpacing: '0.06em',
    fontWeight: 500,
    minHeight: '1em',
    transition: 'color 0.3s',
  },
  slider: {
    width: 140,
    accentColor: '#555',
    cursor: 'pointer',
  },
  actionBtn: {
    background: 'transparent',
    border: '1px solid #2a2a2a',
    color: '#888',
    padding: '7px 18px',
    borderRadius: 6,
    fontSize: '0.78rem',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  resetBtn: {
    marginTop: 4,
    fontSize: '0.7rem',
    color: '#444',
    borderColor: '#1a1a1a',
  },
}
