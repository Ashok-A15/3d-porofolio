import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'

export default function Earth() {
  const earthRef = useRef()
  const cloudsRef = useRef()

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      earthRef.current.rotation.x = state.clock.getElapsedTime() * 0.05
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
      cloudsRef.current.rotation.x = state.clock.getElapsedTime() * 0.08
    }
  })

  return (
    <group>
      {/* Core Dark Sphere */}
      <Sphere args={[1.4, 32, 32]}>
        <meshStandardMaterial color="#050b14" />
      </Sphere>
      
      {/* Wireframe Grid (Earth surface placeholder) */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#3a86ff" 
          wireframe={true} 
          transparent 
          opacity={0.4} 
        />
      </mesh>

      {/* Outer Cyan Clouds / Grid */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          wireframe={true} 
          transparent 
          opacity={0.15} 
        />
      </mesh>
    </group>
  )
}
