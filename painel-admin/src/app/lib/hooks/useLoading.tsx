import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import { clamp } from 'lodash'
import styled from 'styled-components'

interface LoadingProviderProps {
  children: ReactNode
}

interface LoadingContextData {
  setLoading: (state: boolean) => void
  disableLoading: () => void
  enableLoading: () => void
  enablePermanentLoading: () => void
  disablePermanentLoading: () => void
}

const LoadingGlasspane = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
`

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 142px;
  height: 40px;
  transform: translate(-50%, -50%);
`

const LoadingDotMain = styled.span`
  @keyframes dot {
    50% {
      transform: translateX(150px);
    }
  }

  position: absolute;
  z-index: 2;
  width: 16px;
  height: 16px;
  top: 12px;
  left: 15px;
  background: #00a144;
  border-radius: 50%;
  transform: translateX(-12px);
  animation: dot 2.8s infinite;
`

const LoadingDotWrapper = styled.span`
  @keyframes dots {
    50% {
      transform: translate(0, -50%);
    }
  }

  transform: translateX(0);
  animation: dots 2.8s infinite;
  display: flex;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 1.5rem;
`

const LoadingDot = styled.span`
  display: block;
  float: left;
  width: 16px;
  height: 16px;
  background: #000;
  border-radius: 50%;
`

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
)

export function LoadingProvider({
  children
}: LoadingProviderProps): JSX.Element {
  const [loadingCount, setLoadingCount] = useState<number>(0)
  const [loadingEnabled, setLoadingEnabled] = useState<boolean>(true)
  const [permanentLoading, setPermanentLoading] = useState<boolean>(false)

  const setLoading = useCallback((state: boolean) => {
    if (state) {
      setLoadingCount((prev) => prev + 1)
    } else {
      setLoadingCount((prev) => clamp(prev - 1, 0, Infinity))
    }
  }, [])

  const disableLoading = useCallback(() => {
    setLoadingCount(0)
    setLoadingEnabled(false)
  }, [])

  const enableLoading = useCallback(() => {
    setLoadingCount(0)
    setLoadingEnabled(true)
  }, [])

  const enablePermanentLoading = useCallback(() => {
    setPermanentLoading(true)
  }, [])

  const disablePermanentLoading = useCallback(() => {
    setPermanentLoading(false)
  }, [])

  return (
    <LoadingContext.Provider
      value={{
        setLoading,
        disableLoading,
        enableLoading,
        enablePermanentLoading,
        disablePermanentLoading
      }}
    >
      <LoadingGlasspane
        style={{
          visibility:
            loadingEnabled && (loadingCount > 0 || permanentLoading)
              ? 'visible'
              : 'hidden'
        }}
      >
        <LoadingWrapper>
          <LoadingDotMain />
          <LoadingDotWrapper>
            <LoadingDot />
            <LoadingDot />
            <LoadingDot />
          </LoadingDotWrapper>
        </LoadingWrapper>
      </LoadingGlasspane>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext)
  return context
}
