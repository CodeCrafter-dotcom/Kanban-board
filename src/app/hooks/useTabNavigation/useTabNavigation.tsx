"use client"

import { useEffect } from "react"

const myAppUtils = {
  initTabNavigation: () => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Tab") document.body.classList.add("is-keyboard")
    }
    const handlePointerdown = () => {
      document.body.classList.remove("is-keyboard")
    }
    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("pointerdown", handlePointerdown)
  }
}

export default function AppSetup() {
  useEffect(() => {
    myAppUtils.initTabNavigation()
  }, [])

  return null
}
