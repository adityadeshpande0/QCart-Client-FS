"use client"

import type { ReactNode } from "react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/app/store"

interface Props extends ColorModeProviderProps {
  children: ReactNode
}

export function Provider({ children, ...props }: Props) {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props}>
          {children}
        </ColorModeProvider>
      </ChakraProvider>
    </ReduxProvider>
  )
}
