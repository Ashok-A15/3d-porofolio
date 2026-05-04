import { useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress, active } = useProgress()

  return (
    <div className="loader-container" style={{ opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none' }}>
      <h1 className="neon-text-blue" style={{ fontSize: '3rem', margin: 0, fontFamily: 'Fira Code' }}>
        LOADING SYSTEM
      </h1>
      <div className="loader-bar">
        <div className="loader-progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p style={{ marginTop: '10px', fontFamily: 'Fira Code', color: '#0ff' }}>
        {Math.round(progress)}%
      </p>
    </div>
  )
}
