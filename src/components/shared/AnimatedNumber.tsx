import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function AnimatedNumber({ value, duration = 1.2, prefix = '', suffix = '' }: { value: number; duration?: number; prefix?: string; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => {
    if (value >= 1000) return `${prefix}${Math.round(v).toLocaleString()}${suffix}`
    return `${prefix}${Math.round(v)}${suffix}`
  })
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)

  useEffect(() => {
    const controls = animate(count, value, { duration })
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return () => { controls.stop(); unsub() }
  }, [value, duration, count, rounded])

  return <motion.span>{display}</motion.span>
}
