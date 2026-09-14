import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type JourneySceneProps = {
  active: number
  accent: string
  reducedMotion: boolean
}

const routePoints = [
  new THREE.Vector3(-6.1, 0, 1.25),
  new THREE.Vector3(-3.4, 0, -0.85),
  new THREE.Vector3(-0.55, 0, 0.65),
  new THREE.Vector3(2.35, 0, -1.05),
  new THREE.Vector3(5.8, 0, 0.75),
]

const stopProgress = [0, 0.24, 0.5, 0.74, 1]

function Landmark({ index, point, active, accent }: {
  index: number
  point: THREE.Vector3
  active: boolean
  accent: string
}) {
  const side = index % 2 === 0 ? 1 : -1
  const position: [number, number, number] = [point.x, 0.15, point.z + side * 1.05]
  const neutral = active ? '#4b4f57' : '#292c32'
  const glow = active ? 2.8 : 0.35

  return (
    <group position={position} scale={active ? 1.08 : 0.92}>
      <mesh position={[0, -0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.66, 0.035, 8, 36]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow} />
      </mesh>

      {index === 0 && (
        <group>
          <mesh position={[0, 0.34, 0]}>
            <boxGeometry args={[0.95, 0.72, 0.82]} />
            <meshStandardMaterial color={neutral} roughness={0.82} />
          </mesh>
          <mesh position={[0, 0.78, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.72, 0.36, 4]} />
            <meshStandardMaterial color="#1a1c20" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.39, side * -0.42]}>
            <planeGeometry args={[0.42, 0.28]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow} />
          </mesh>
        </group>
      )}

      {index === 1 && (
        <group>
          <mesh position={[-0.35, 0.65, 0]}>
            <boxGeometry args={[0.46, 1.35, 0.72]} />
            <meshStandardMaterial color={neutral} roughness={0.62} />
          </mesh>
          <mesh position={[0.35, 0.95, 0]}>
            <boxGeometry args={[0.46, 1.95, 0.72]} />
            <meshStandardMaterial color="#34373e" roughness={0.62} />
          </mesh>
          {[-0.35, 0.35].map((x) => (
            <mesh key={x} position={[x, x > 0 ? 0.95 : 0.65, side * -0.37]}>
              <planeGeometry args={[0.2, x > 0 ? 1.25 : 0.78]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow * 0.8} />
            </mesh>
          ))}
        </group>
      )}

      {index === 2 && (
        <group>
          <mesh position={[0, 0.73, 0]}>
            <boxGeometry args={[0.78, 1.48, 0.28]} />
            <meshStandardMaterial color={neutral} roughness={0.52} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.73, side * -0.15]}>
            <planeGeometry args={[0.58, 1.13]} />
            <meshStandardMaterial color="#15171b" emissive={accent} emissiveIntensity={active ? 0.42 : 0.08} />
          </mesh>
          <mesh position={[0, 1.34, side * -0.16]}>
            <boxGeometry args={[0.14, 0.035, 0.025]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow} />
          </mesh>
        </group>
      )}

      {index === 3 && (
        <group>
          <mesh position={[0, 0.34, 0]}>
            <cylinderGeometry args={[0.46, 0.58, 0.72, 18]} />
            <meshStandardMaterial color={neutral} roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.88, 0]}>
            <sphereGeometry args={[0.47, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#3a3e46" roughness={0.28} metalness={0.35} />
          </mesh>
          <mesh position={[0, 0.91, 0]} rotation={[0, 0, -0.42]}>
            <torusGeometry args={[0.54, 0.025, 8, 32, Math.PI]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow} />
          </mesh>
        </group>
      )}

      {index === 4 && (
        <group>
          <mesh position={[0, 0.68, 0]}>
            <cylinderGeometry args={[0.27, 0.43, 1.38, 8]} />
            <meshStandardMaterial color={neutral} roughness={0.55} metalness={0.2} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[0.98, 0.34, 0.72]} />
            <meshStandardMaterial color="#3a3e46" roughness={0.38} />
          </mesh>
          <mesh position={[0, 1.2, side * -0.37]}>
            <planeGeometry args={[0.7, 0.16]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow} />
          </mesh>
          <mesh position={[0, 1.65, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.62, 8]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow} />
          </mesh>
        </group>
      )}
    </group>
  )
}

function FormulaCar({ curve, active, accent, reducedMotion }: {
  curve: THREE.CatmullRomCurve3
  active: number
  accent: string
  reducedMotion: boolean
}) {
  const car = useRef<THREE.Group>(null)
  const wheelRefs = useRef<THREE.Mesh[]>([])
  const progress = useRef(stopProgress[active])
  const position = useMemo(() => new THREE.Vector3(), [])
  const tangent = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    if (reducedMotion) progress.current = stopProgress[active]
  }, [active, reducedMotion])

  useFrame((_, delta) => {
    if (!car.current) return
    progress.current = reducedMotion
      ? stopProgress[active]
      : THREE.MathUtils.damp(progress.current, stopProgress[active], 2.8, delta)

    curve.getPointAt(progress.current, position)
    curve.getTangentAt(progress.current, tangent).normalize()
    car.current.position.set(position.x, position.y + 0.34, position.z)
    car.current.rotation.y = -Math.atan2(tangent.z, tangent.x)
    wheelRefs.current.forEach((wheel) => { wheel.rotation.z -= delta * 8 })
  })

  const wheelPositions: [number, number, number][] = [
    [-0.43, -0.08, -0.34], [-0.43, -0.08, 0.34],
    [0.48, -0.08, -0.31], [0.48, -0.08, 0.31],
  ]

  return (
    <group ref={car} scale={1}>
      <mesh castShadow>
        <boxGeometry args={[1.05, 0.19, 0.38]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.24} metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0.7, -0.015, 0]} castShadow>
        <boxGeometry args={[0.55, 0.1, 0.16]} />
        <meshStandardMaterial color={accent} metalness={0.35} roughness={0.28} />
      </mesh>
      <mesh position={[0.1, 0.18, 0]} scale={[0.32, 0.2, 0.24]}>
        <sphereGeometry args={[1, 16, 10]} />
        <meshStandardMaterial color="#111318" metalness={0.5} roughness={0.18} />
      </mesh>
      <mesh position={[-0.42, 0.24, 0]}>
        <boxGeometry args={[0.12, 0.34, 0.88]} />
        <meshStandardMaterial color="#17191d" roughness={0.36} />
      </mesh>
      <mesh position={[0.92, 0.02, 0]}>
        <boxGeometry args={[0.1, 0.055, 0.82]} />
        <meshStandardMaterial color="#17191d" roughness={0.36} />
      </mesh>
      {wheelPositions.map((wheelPosition, index) => (
        <mesh
          key={index}
          position={wheelPosition}
          rotation={[Math.PI / 2, 0, 0]}
          ref={(mesh) => { if (mesh) wheelRefs.current[index] = mesh }}
        >
          <cylinderGeometry args={[0.17, 0.17, 0.13, 14]} />
          <meshStandardMaterial color="#08090b" roughness={0.76} />
        </mesh>
      ))}
      <pointLight position={[0.7, 0.1, 0]} color={accent} intensity={2.5} distance={2.2} />
    </group>
  )
}

function JourneyWorld({ active, accent, reducedMotion }: JourneySceneProps) {
  const world = useRef<THREE.Group>(null)
  const { camera, size } = useThree()
  const curve = useMemo(() => new THREE.CatmullRomCurve3(routePoints, false, 'catmullrom', 0.45), [])
  const road = useMemo(() => new THREE.TubeGeometry(curve, 160, 0.22, 10, false), [curve])
  const leftRail = useMemo(() => new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(routePoints.map((point) => point.clone().add(new THREE.Vector3(0, 0.03, 0.25))), false, 'catmullrom', 0.45),
    160, 0.018, 6, false,
  ), [])
  const rightRail = useMemo(() => new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(routePoints.map((point) => point.clone().add(new THREE.Vector3(0, 0.03, -0.25))), false, 'catmullrom', 0.45),
    160, 0.018, 6, false,
  ), [])

  useEffect(() => {
    camera.lookAt(0, 0.15, 0)
  }, [camera])

  useFrame((state, delta) => {
    if (!world.current) return
    const target = routePoints[active]
    const followStrength = size.width / size.height < 1.15 ? 0.55 : 0.28
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.x * followStrength, 2.2, delta)
    camera.lookAt(camera.position.x * 0.2, 0.1, 0)
    if (!reducedMotion) {
      world.current.rotation.z = THREE.MathUtils.damp(world.current.rotation.z, -state.pointer.x * 0.012, 4, delta)
    }
  })

  return (
    <group ref={world} rotation={[-0.03, 0, 0]}>
      <mesh geometry={road} receiveShadow>
        <meshStandardMaterial color="#15171b" metalness={0.12} roughness={0.88} />
      </mesh>
      {[leftRail, rightRail].map((geometry, index) => (
        <mesh geometry={geometry} key={index}>
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.7} />
        </mesh>
      ))}
      {routePoints.map((point, index) => (
        <Landmark key={index} index={index} point={point} active={index === active} accent={accent} />
      ))}
      <FormulaCar curve={curve} active={active} accent={accent} reducedMotion={reducedMotion} />
    </group>
  )
}

export default function JourneyScene(props: JourneySceneProps) {
  return (
    <Canvas
      aria-hidden="true"
      className="journey-canvas"
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 5.8, 10.8], fov: 43 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows
    >
      <fog attach="fog" args={['#090a0c', 8.5, 18]} />
      <ambientLight intensity={0.72} />
      <hemisphereLight args={['#f2f0ea', '#090a0c', 1.15]} />
      <directionalLight position={[-3, 7, 6]} intensity={3.2} color="#fff1df" castShadow />
      <pointLight position={[3, 2, 4]} intensity={7} color={props.accent} distance={13} />
      <JourneyWorld {...props} />
    </Canvas>
  )
}
