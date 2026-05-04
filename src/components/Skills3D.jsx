import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Billboard } from '@react-three/drei'
import * as THREE from 'three'

const skills = [
  // Programming Languages
  'C', 'C++', 'Python', 'JavaScript',
  // Web Development
  'HTML5', 'CSS3', 'React.js', 'Node.js', 'Flask', 'REST APIs',
  // Databases
  'MySQL', 'MongoDB', 'SQL',
  // Core CS
  'DSA', 'OOP', 'OS', 'DBMS', 'Networks',
  // Tools & Platforms
  'Git', 'GitHub', 'VS Code', 'Linux'
]

export default function Skills3D() {
  const groupRef = useRef()

  // Distribute skills in a 3D spherical layout using Fibonacci sphere
  const positions = useMemo(() => {
    const pos = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle in radians
    
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2 // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y) 
      const theta = phi * i 

      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      // Multiply by sphere radius
      pos.push(new THREE.Vector3(x * 2.2, y * 2.2, z * 2.2))
    }
    return pos
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <Billboard key={skill} position={positions[index]}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Text
              fontSize={0.5}
              color={index % 2 === 0 ? "#00f0ff" : "#3a86ff"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor="#050b14"
            >
              {skill}
            </Text>
          </Float>
        </Billboard>
      ))}
    </group>
  )
}
