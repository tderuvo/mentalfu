'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

const GW_OPTIONS = [
  { label: 'Dark Blue', value: 'darkblue',  hex: '#1a3a6b', glow: '#2255cc' },
  { label: 'Cyan',      value: 'cyan',       hex: '#00bcd4', glow: '#00e5ff' },
  { label: 'Green',     value: 'green',      hex: '#2e7d32', glow: '#00e676' },
  { label: 'Orange',    value: 'orange',     hex: '#e65100', glow: '#ff9800' },
  { label: 'Yellow',    value: 'yellow',     hex: '#f9a825', glow: '#ffee58' },
  { label: 'White',     value: 'white',      hex: '#e0e0e0', glow: '#ffffff' },
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
const CANVAS_HEIGHT   = 520

// ─── Particle System ──────────────────────────────────────────────────────────

function createParticle(canvasWidth, index) {
  const color = RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)]
  return {
    id: Math.random(),
    x: (Math.random() * canvasWidth * 1.1) - (canvasWidth * 0.05),
    y: -Math.random() * CANVAS_HEIGHT * 1.2,
    speed: 1.4 + Math.random() * 1.8,
    length: 14 + Math.random() * 22,
    opacity: 0.55 + Math.random() * 0.35,
    color,
    absorbed: false,
    absorbing: false,
    absorbProgress: 0,
  }
}

function resetParticle(p, canvasWidth) {
  const color = RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)]
  p.id = Math.random()
  p.x = (Math.random() * canvasWidth * 1.1) - (canvasWidth * 0.05)
  p.y = -Math.random() * 60
  p.speed = 1.4 + Math.random() * 1.8
  p.length = 14 + Math.random() * 22
  p.opacity = 0.55 + Math.random() * 0.35
  p.color = color
  p.absorbed = false
  p.absorbing = false
  p.absorbProgress = 0
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

function renderFrame({ ctx, particles, canvasWidth, canvasHeight, gwColor, auraIntensity, frameRef }) {
  // Clear with slight trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.82)'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  const figureX = canvasWidth / 2
  const figureY = canvasHeight - 72
  const auraGw  = GW_OPTIONS.find(g => g.value === gwColor)
  const auraCol = auraGw ? auraGw.glow : '#ffffff'

  // Aura glow layers
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
  const gwHex = auraGw ? auraGw.hex : '#ffffff'
  ctx.strokeStyle = gwHex
  ctx.lineWidth = 1.8
  ctx.shadowColor = auraCol
  ctx.shadowBlur = 8

  // Head
  ctx.beginPath()
  ctx.arc(figureX, figureY - 42, 9, 0, Math.PI * 2)
  ctx.stroke()

  // Body
  ctx.beginPath()
  ctx.moveTo(figureX, figureY - 33)
  ctx.lineTo(figureX, figureY - 8)
  ctx.stroke()

  // Arms
  ctx.beginPath()
  ctx.moveTo(figureX - 14, figureY - 26)
  ctx.lineTo(figureX + 14, figureY - 26)
  ctx.stroke()

  // Legs
  ctx.beginPath()
  ctx.moveTo(figureX, figureY - 8)
  ctx.lineTo(figureX - 11, figureY + 8)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(figureX, figureY - 8)
  ctx.lineTo(figureX + 11, figureY + 8)
  ctx.stroke()

  ctx.shadowBlur = 0

  // Rain particles
  particles.forEach(p => {
    if (p.absorbed) return

    const isMatch = p.color.value === gwColor

    if (p.absorbing) {
      // Fade out absorbed particle
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

    // Non-matching: straight fall, lower opacity
    if (!isMatch) {
      ctx.globalAlpha = p.opacity * 0.45
      ctx.strokeStyle = p.color.streak
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x, p.y - p.length)
      ctx.stroke()
      ctx.globalAlpha = 1
      return
    }

    // Matching: curve toward figure in lower half
    const curveZone = canvasHeight * 0.55
    let drawX = p.x

    if (p.y > curveZone) {
      const progress = (p.y - curveZone) / (canvasHeight - curveZone)
      const ease = progress * progress * progress        // cubic ease-in
      const pull = (figureX - p.x) * ease * 0.72
      drawX = p.x + pull
    }

    ctx.globalAlpha = p.opacity
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

function updateParticles({ particles, canvasWidth, canvasHeight, gwColor, fieldStrength, running, auraIntensityRef, pulseRef }) {
  const figureX = canvasWidth / 2
  const figureY = canvasHeight - 72

  particles.forEach(p => {
    if (p.absorbed) return

    if (p.absorbing) {
      p.absorbProgress += 0.045
      if (p.absorbProgress >= 1) {
        p.absorbed = true
        resetParticle(p, canvasWidth)
      }
      return
    }

    const isMatch = p.color.value === gwColor
    const curveZone = canvasHeight * 0.55

    // Curved X for matching particles
    let curvedX = p.x
    if (isMatch && p.y > curveZone) {
      const progress = (p.y - curveZone) / (canvasHeight - curveZone)
      const ease = progress * progress * progress
      const pull = (figureX - p.x) * ease * 0.72 * (fieldStrength / 50)
      curvedX = p.x + pull
    }

    p.y += p.speed

    // Check absorption (matching only, near figure)
    if (isMatch) {
      const dist = Math.hypot(curvedX - figureX, p.y - figureY)
      if (dist < 28) {
        p.absorbing = true
        auraIntensityRef.current = Math.min(auraIntensityRef.current + 0.9, 6)
        pulseRef.current = 1
        return
      }
    }

    // Recycle off-screen
    if (p.y > canvasHeight + 20) {
      resetParticle(p, canvasWidth)
    }
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TryTheField() {
  const canvasRef      = useRef(null)
  const particlesRef   = useRef([])
  const rafRef         = useRef(null)
  const auraIntensity  = useRef(0)
  const pulseRef       = useRef(0)
  const runningRef     = useRef(true)

  const [gwColor,      setGwColor]      = useState('darkblue')
  const [fieldStrength, setFieldStrength] = useState(50)
  const [running,      setRunning]      = useState(true)
  const [canvasWidth,  setCanvasWidth]  = useState(800)

  // Sync running state to ref for use inside rAF loop
  useEffect(() => { runningRef.current = running }, [running])

  // Init particles
  useEffect(() => {
    const w = canvasRef.current?.parentElement?.offsetWidth || 800
    setCanvasWidth(w)
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
      createParticle(w, i)
    )
  }, [])

  // Resize observer
  useEffect(() => {
    const el = canvasRef.current?.parentElement
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      setCanvasWidth(w)
      particlesRef.current.forEach(p => resetParticle(p, w))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frameCount = 0

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      frameCount++

      if (runningRef.current) {
        updateParticles({
          particles: particlesRef.current,
          canvasWidth,
          canvasHeight: CANVAS_HEIGHT,
          gwColor,
          fieldStrength,
          running: runningRef.current,
          auraIntensityRef: auraIntensity,
          pulseRef,
        })
      }

      // Decay aura intensity and pulse
      auraIntensity.current = Math.max(0, auraIntensity.current - 0.035)
      pulseRef.current = Math.max(0, pulseRef.current - 0.06)

      renderFrame({
        ctx,
        particles: particlesRef.current,
        canvasWidth,
        canvasHeight: CANVAS_HEIGHT,
        gwColor,
        auraIntensity: auraIntensity.current,
        frameRef: frameCount,
      })
    }

    loop()
    return () => cancelAnimationFrame(rafRef.current)
  }, [canvasWidth, gwColor, fieldStrength])

  const handleReset = useCallback(() => {
    auraIntensity.current = 0
    particlesRef.current.forEach(p => resetParticle(p, canvasWidth))
  }, [canvasWidth])

  const handleGwChange = (val) => {
    setGwColor(val)
    auraIntensity.current = 0
  }

  const activeGw = GW_OPTIONS.find(g => g.value === gwColor)

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Try The Field</h1>
        <p style={styles.subtitle}>See how your inner state shapes what reaches you.</p>
      </div>

      {/* Canvas */}
      <div style={styles.canvasWrap}>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={CANVAS_HEIGHT}
          style={styles.canvas}
        />
      </div>

      {/* Controls */}
      <div style={styles.controls}>

        {/* Gravity Well selector */}
        <div style={styles.controlGroup}>
          <label style={styles.controlLabel}>Gravity Well</label>
          <div style={styles.gwButtons}>
            {GW_OPTIONS.map(gw => (
              <button
                key={gw.value}
                onClick={() => handleGwChange(gw.value)}
                style={{
                  ...styles.gwBtn,
                  background: gw.hex,
                  outline: gwColor === gw.value
                    ? `2px solid ${gw.glow}`
                    : '2px solid transparent',
                  boxShadow: gwColor === gw.value
                    ? `0 0 10px ${gw.glow}88`
                    : 'none',
                }}
                title={gw.label}
                aria-label={gw.label}
              />
            ))}
          </div>
          <span style={{ ...styles.gwLabel, color: activeGw?.glow }}>
            {activeGw?.label}
          </span>
        </div>

        {/* Field Strength */}
        <div style={styles.controlGroup}>
          <label style={styles.controlLabel}>Field Strength</label>
          <input
            type="range"
            min={10}
            max={100}
            value={fieldStrength}
            onChange={e => setFieldStrength(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        {/* Start / Pause + Reset */}
        <div style={styles.controlGroup}>
          <button
            onClick={() => setRunning(r => !r)}
            style={styles.actionBtn}
          >
            {running ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={handleReset}
            style={{ ...styles.actionBtn, ...styles.resetBtn }}
          >
            Reset
          </button>
        </div>

      </div>

      {/* Explanation */}
      <div style={styles.explanation}>
        <p style={styles.explainLine}>All colors are falling.</p>
        <p style={styles.explainLine}>Matching colors bend toward you.</p>
        <p style={{ ...styles.explainLine, opacity: 0.5 }}>Only matching colors are absorbed.</p>
      </div>
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100vh',
    background: '#000000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 24px 60px',
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#ffffff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    letterSpacing: '-0.01em',
    margin: 0,
    color: '#f0f0f0',
  },
  subtitle: {
    marginTop: 8,
    fontSize: '0.875rem',
    color: '#888888',
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
  controls: {
    marginTop: 32,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 860,
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  controlLabel: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#555555',
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
    fontSize: '0.75rem',
    letterSpacing: '0.06em',
    fontWeight: 500,
    minHeight: '1em',
    transition: 'color 0.3s',
  },
  slider: {
    width: 140,
    accentColor: '#666',
    cursor: 'pointer',
  },
  actionBtn: {
    background: 'transparent',
    border: '1px solid #333',
    color: '#aaaaaa',
    padding: '7px 20px',
    borderRadius: 6,
    fontSize: '0.8rem',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'border-color 0.15s, color 0.15s',
  },
  resetBtn: {
    marginTop: 4,
    fontSize: '0.72rem',
    color: '#555555',
    borderColor: '#222',
  },
  explanation: {
    marginTop: 40,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  explainLine: {
    fontSize: '0.875rem',
    color: '#777777',
    letterSpacing: '0.03em',
    margin: 0,
    fontStyle: 'italic',
    fontFamily: "'Playfair Display', serif",
  },
}
