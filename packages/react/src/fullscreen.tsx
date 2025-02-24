import { ReactNode, RefAttributes, forwardRef, useEffect, useMemo, useRef } from 'react'
import { Root } from './root.js'
import { batch, signal } from '@preact/signals-core'
import { RootState, createPortal, useFrame, useStore, useThree } from '@react-three/fiber'
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events.js'
import { Group, PerspectiveCamera } from 'three'
import { RootProperties } from '@pmndrs/uikit/internals'
import { ComponentInternals } from './ref.js'

export const Fullscreen: (
  props: RootProperties & {
    children?: ReactNode
    attachCamera?: boolean
  } & EventHandlers &
    RefAttributes<ComponentInternals<RootProperties>>,
) => ReactNode = forwardRef((properties, ref) => {
  const store = useStore()
  const pixelSize = properties.pixelSize ?? 0.01
  const [sizeX, sizeY] = useMemo(() => {
    const { width, height } = store.getState().size
    return [signal(width * pixelSize), signal(height * pixelSize)] as const
  }, [pixelSize, store])
  useEffect(() => {
    const fn = (state: RootState) => {
      batch(() => {
        sizeX.value = state.size.width * pixelSize
        sizeY.value = state.size.height * pixelSize
      })
    }
    fn(store.getState())
    return store.subscribe(fn)
  }, [pixelSize, sizeX, sizeY, store])
  const camera = useThree((s) => s.camera)
  const groupRef = useRef<Group>(null)
  useFrame(() => {
    if (groupRef.current == null) {
      return
    }
    let distance = 1
    if (camera instanceof PerspectiveCamera) {
      distance = sizeY.peek() / (2 * Math.tan((camera.fov / 360) * Math.PI))
    }
    groupRef.current.position.z = -distance
    groupRef.current.updateMatrix()
  })
  const attachCamera = properties.attachCamera ?? true
  return (
    <>
      {attachCamera && <primitive object={camera} />}
      {createPortal(
        <group ref={groupRef} matrixAutoUpdate={false}>
          <Root ref={ref} {...properties} sizeX={sizeX} sizeY={sizeY}>
            {properties.children}
          </Root>
        </group>,
        camera,
      )}
    </>
  )
})
