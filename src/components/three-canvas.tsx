"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    // Character Group
    const character = new THREE.Group();
    scene.add(character);
    character.position.y = 0.2;

    // Head
    const headGeometry = new THREE.SphereGeometry(1, 64, 64);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc, 
      roughness: 0.6,
      metalness: 0.3,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    character.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 0.25, 0.85);
    character.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 0.25, 0.85);
    character.add(rightEye);
    
    // Pupil highlights
    const pupilGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.4, 0.28, 0.95);
    character.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.4, 0.28, 0.95);
    character.add(rightPupil);

    // Earrings
    const earringGeometry = new THREE.TorusGeometry(0.08, 0.02, 16, 100);
    const earringMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4d4d4,
        metalness: 0.9,
        roughness: 0.2
    });
    const leftEarring = new THREE.Mesh(earringGeometry, earringMaterial);
    leftEarring.position.set(-1.05, -0.1, 0);
    leftEarring.rotation.y = Math.PI / 2;
    character.add(leftEarring);

    const rightEarring = leftEarring.clone();
    rightEarring.position.set(1.05, -0.1, 0);
    character.add(rightEarring);

    const handleMouseMove = (event: MouseEvent) => {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      character.rotation.y = THREE.MathUtils.lerp(character.rotation.y, (mouse.current.x * Math.PI) / 10, 0.05);
      character.rotation.x = THREE.MathUtils.lerp(character.rotation.x, (mouse.current.y * Math.PI) / 10, 0.05);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if(currentMount && renderer.domElement){
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default ThreeCanvas;
