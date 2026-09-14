import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type JourneySceneProps = {
  active: number
  accent: string
  reducedMotion: boolean
}

const points = [
  new THREE.Vector3(-6.2, -0.8, 0),
  new THREE.Vector3(-3.5, 1.1, -0.2),
  new THREE.Vector3(-0.7, -0.1, 0.4),
  new THREE.Vector3(2.4, 1.2, -0.25),
  new THREE.Vector3(5.7, -0.5, 0.1),
]

function Track({ active, accent, reducedMotion }: JourneySceneProps) {
  const group = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.45), [])
  const road = useMemo(() => new THREE.TubeGeometry(curve, 128, 0.09, 10, false), [curve])

  useEffect(() => {
    const target = points[active]
    camera.position.set(target.x * 0.12, target.y * 0.1, 8.8)
  }, [active, camera])

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.08, 5, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.05, 5, delta)
  })

  return (
    <group ref={group}>
      <mesh geometry={road}>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.8} roughness={0.35} />
      </mesh>
      {points.map((point, index) => (
        <group position={point} key={index}>
          <mesh scale={index === active ? 1.35 : 0.82}>
            <icosahedronGeometry args={[0.23, 1]} />
            <meshStandardMaterial
              color={index === active ? accent : '#686b71'}
              emissive={index === active ? accent : '#111214'}
              emissiveIntensity={index === active ? 2.2 : 0.2}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, -0.52, -0.2]} rotation={[0.2, 0.1, 0.1]}>
            <boxGeometry args={[index === active ? 1.1 : 0.72, 0.14, 0.72]} />
            <meshStandardMaterial color={index === active ? '#32343a' : '#202226'} roughness={0.88} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function JourneyScene(props: JourneySceneProps) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 8.8], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[-4, 6, 8]} intensity={2.8} color="#fff1df" />
      <pointLight position={[3, -1, 5]} intensity={8} color={props.accent} distance={12} />
      <Track {...props} />
    </Canvas>
  )
}
