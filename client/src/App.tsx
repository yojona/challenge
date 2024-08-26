import React from 'react'
import {
  ChakraProvider,
} from "@chakra-ui/react"
import theme from './theme/default'
import Layout from './views/Layout'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
    </ChakraProvider>
  )
}

export default App
