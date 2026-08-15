"use client"

import { motion, useMotionValue, useReducedMotion } from "framer-motion"
import type { FC, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

export interface SmoothCursorProps {
  cursor?: ReactNode
}

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)"
const INTERACTIVE_SELECTOR =
  'a, button, summary, [role="button"], [role="link"], .cursor-pointer'
const NATIVE_CURSOR_SELECTOR =
  'input, textarea, select, [contenteditable]:not([contenteditable="false"])'

function isMousePointer(pointerType: string) {
  return pointerType === "mouse"
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={27}
      viewBox="0 0 50 54"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
}: SmoothCursorProps) {
  const prefersReducedMotion = useReducedMotion()
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const visibleRef = useRef(false)
  const interactiveRef = useRef(false)
  const nativeCursorRef = useRef(false)
  const pressedRef = useRef(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [usesNativeCursor, setUsesNativeCursor] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)

    const updateEnabled = () => {
      setIsEnabled(mediaQuery.matches)
    }

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const root = document.documentElement
    root.classList.add("smooth-cursor-active")

    const updateVisible = (nextValue: boolean) => {
      if (visibleRef.current === nextValue) return
      visibleRef.current = nextValue
      setIsVisible(nextValue)
    }

    const updateInteractive = (nextValue: boolean) => {
      if (interactiveRef.current === nextValue) return
      interactiveRef.current = nextValue
      setIsInteractive(nextValue)
    }

    const updateNativeCursor = (nextValue: boolean) => {
      if (nativeCursorRef.current === nextValue) return
      nativeCursorRef.current = nextValue
      setUsesNativeCursor(nextValue)
    }

    const updatePressed = (nextValue: boolean) => {
      if (pressedRef.current === nextValue) return
      pressedRef.current = nextValue
      setIsPressed(nextValue)
    }

    const updateTargetState = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null
      const nextUsesNativeCursor = Boolean(
        element?.closest(NATIVE_CURSOR_SELECTOR)
      )

      updateNativeCursor(nextUsesNativeCursor)
      updateInteractive(
        !nextUsesNativeCursor &&
          Boolean(element?.closest(INTERACTIVE_SELECTOR))
      )
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isMousePointer(event.pointerType)) {
        updateVisible(false)
        return
      }

      const coalescedEvents = event.getCoalescedEvents?.() ?? []
      const latestEvent = coalescedEvents.at(-1) ?? event

      cursorX.set(latestEvent.clientX)
      cursorY.set(latestEvent.clientY)
      updateTargetState(event.target)
      updateVisible(true)
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!isMousePointer(event.pointerType) || nativeCursorRef.current) return
      updatePressed(true)
    }

    const handlePointerUp = () => {
      updatePressed(false)
    }

    const hideCursor = () => {
      updateVisible(false)
      updatePressed(false)
    }

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        hideCursor()
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hideCursor()
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    window.addEventListener("pointercancel", handlePointerUp, { passive: true })
    window.addEventListener("pointerout", handlePointerOut, { passive: true })
    window.addEventListener("blur", hideCursor)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      root.classList.remove("smooth-cursor-active")
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("pointercancel", handlePointerUp)
      window.removeEventListener("pointerout", handlePointerOut)
      window.removeEventListener("blur", hideCursor)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [cursorX, cursorY, isEnabled])

  if (!isEnabled) {
    return null
  }

  const targetScale = isPressed ? 0.88 : isInteractive ? 1.12 : 1
  const targetOpacity = isVisible && !usesNativeCursor ? 1 : 0

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: targetOpacity, scale: targetScale }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.12 },
              scale: { duration: 0.12, ease: [0.16, 1, 0.3, 1] },
            }
      }
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        width: 25,
        height: 27,
        transformOrigin: "0 0",
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          width: 25,
          height: 27,
          transform: "translate(-50%, -10%)",
          transformOrigin: "50% 10%",
        }}
      >
        {cursor}
      </div>
    </motion.div>
  )
}
