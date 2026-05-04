import { useRef } from 'react'
import { useGLTF, OrbitControls, Float, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function RoomModel() {
  const { scene } = useGLTF('/room.glb')
  // Restored exact layout to match user's favorite screenshot
  return (
    <primitive
      object={scene}
      scale={1.2}
      position={[1, -1.5, -1]}
      rotation={[0, -1, 0]}
    />
  )
}

export default function Experience() {
  const groupRef = useRef()

  // Slowly rotate the entire room for a dynamic background effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    }
  })

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-15 * (Math.PI / 180)}
        maxAzimuthAngle={15 * (Math.PI / 180)}
      />

      {/* Lighting to match the dark neon theme */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-2, 2, -2]} intensity={2} color="#3a86ff" />
      <pointLight position={[2, 2, 2]} intensity={1} color="#00f0ff" />

      {/* Main Room inside a float for gentle hovering */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          <RoomModel />
        </group>
      </Float>

      {/* Subtle floating particles */}
      <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#00f0ff" />
    </>
  )
}  