"use client"

import type { ReactNode } from "react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/app/store"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/app/queryClient"
interface Props extends ColorModeProviderProps {
  children: ReactNode
}

export function Provider({ children, ...props }: Props) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider {...props}>
            {children}
          </ColorModeProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ReduxProvider>
  )
}
