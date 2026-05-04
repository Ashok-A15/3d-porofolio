import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Html, RoundedBox } from '@react-three/drei'
import { TypeAnimation } from 'react-type-animation'
import * as THREE from 'three'

export default function Contact3D() {
  const groupRef = useRef()
  const bubble1Ref = useRef()
  const bubble2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1
    }
    if (bubble1Ref.current) {
      bubble1Ref.current.rotation.z = Math.sin(t * 0.8) * 0.05
    }
    if (bubble2Ref.current) {
      bubble2Ref.current.rotation.z = Math.cos(t * 0.6) * 0.05
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} scale={1.2}>
        
        {/* Background Decorative Bubble (Wireframe) */}
        <group ref={bubble2Ref} position={[-0.8, 0.6, -0.5]} rotation={[0, 0.2, -0.1]}>
          <RoundedBox args={[1.8, 1.2, 0.2]} radius={0.15} smoothness={4}>
            <meshStandardMaterial color="#3a86ff" wireframe={true} transparent opacity={0.4} />
          </RoundedBox>
          {/* Chat Bubble Tail */}
          <mesh position={[-0.6, -0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[0.2, 0.4, 4]} />
            <meshStandardMaterial color="#3a86ff" wireframe={true} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Foreground Main Bubble (Glass/Dark Tech) */}
        <group ref={bubble1Ref} position={[0.2, -0.2, 0.2]} rotation={[0, -0.1, 0]}>
          <RoundedBox args={[2.8, 1.6, 0.15]} radius={0.2} smoothness={4}>
            <meshPhysicalMaterial 
              color="#050b14" 
              metalness={0.8}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.1}
              transparent
              opacity={0.9}
            />
          </RoundedBox>
          
          {/* Glowing Inner Border */}
          <RoundedBox args={[2.85, 1.65, 0.05]} radius={0.22} smoothness={4}>
            <meshBasicMaterial color="#00f0ff" wireframe={true} transparent opacity={0.3} />
          </RoundedBox>

          {/* Chat Bubble Tail */}
          <mesh position={[0.8, -0.9, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <coneGeometry args={[0.2, 0.6, 4]} />
            <meshPhysicalMaterial color="#050b14" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Glowing Accents on the Bubble */}
          <mesh position={[-1.2, 0.5, 0.1]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color="#ff0055" />
          </mesh>
          <mesh position={[-0.9, 0.5, 0.1]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color="#ffbd00" />
          </mesh>
          <mesh position={[-0.6, 0.5, 0.1]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>

          {/* Screen Text via HTML directly on the bubble */}
          <Html 
            transform 
            position={[0, -0.1, 0.1]} 
            scale={0.35}
            style={{ width: '400px', textAlign: 'center', pointerEvents: 'none' }}
          >
            <div style={{ 
              color: '#00f0ff', 
              fontSize: '16px', 
              fontFamily: '"Fira Code", monospace', 
              fontWeight: 'bold',
              textShadow: '0 0 15px rgba(0, 240, 255, 0.9)'
            }}>
              <TypeAnimation
                sequence={[
                  "> Initiating connection...",
                  1000,
                  "> Let's Get In Touch_",
                  2000,
                  "> Drop A Message_",
                  3000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </Html>
        </group>

      </group>
    </Float>
  )
}

