/**
 * NEURAL GLASS MORPHISM GENERATOR
 * Physics-based material simulation
 * Real-time light refraction
 * GPU-accelerated rendering
 */

import { NeuralNoise, NeuralNoisePattern, NeuralNoiseConfig } from './NeuralNoise';

export interface GlassConfig {
  thickness: number;
  refractionIndex: number;
  transparency: number;
  blur: number;
  tint: { r: number; g: number; b: number; a: number };
  complexity: number;
  animationSpeed: number;
  zIndex: number;
}

export interface GlassBase {
  thickness: number;
  refractionIndex: number;
  transparency: number;
  dispersion: number;
}

export interface GaussianBlur {
  radius: number;
  sigma: number;
  kernel: number[];
}

export interface LightField {
  direction: { x: number; y: number; z: number };
  intensity: number;
  color: { r: number; g: number; b: number };
  refractedAngle: number;
}

export interface GlassLayer {
  thickness: number;
  refractionIndex: number;
  neuralPattern: NeuralNoisePattern;
  edgeBlur: GaussianBlur;
  lightCapture: LightField;
  cssProperties: Record<string, string>;
}

export class GlassMorphismGenerator {
  private neuralNoise: NeuralNoise;
  private defaultConfig: NeuralNoiseConfig = {
    pattern: 'consciousness_wave',
    frequency: 0.003,
    amplitude: 0.7
  };

  constructor(noiseConfig?: Partial<NeuralNoiseConfig>) {
    this.neuralNoise = new NeuralNoise({
      ...this.defaultConfig,
      ...noiseConfig
    });
  }

  /**
   * Generate a complete glass layer
   */
  generateLayer(config: GlassConfig): GlassLayer {
    // Create physics-based glass material
    const baseMaterial = this.createPhysicsMaterial(config);

    // Generate neural noise patterns
    const neuralPattern = this.neuralNoise.generatePattern({
      complexity: config.complexity,
      animationSpeed: config.animationSpeed
    });

    // Calculate light refraction
    const lightCapture = this.calculateRefraction(
      baseMaterial.thickness,
      baseMaterial.refractionIndex
    );

    // Generate edge blur based on z-depth
    const edgeBlur = this.generateDepthBlur(config.zIndex);

    // Generate CSS properties for the layer
    const cssProperties = this.generateCSSProperties(config, baseMaterial, lightCapture);

    return {
      thickness: baseMaterial.thickness,
      refractionIndex: baseMaterial.refractionIndex,
      neuralPattern,
      edgeBlur,
      lightCapture,
      cssProperties
    };
  }

  /**
   * Create physics-based material properties
   */
  private createPhysicsMaterial(config: GlassConfig): GlassBase {
    return {
      thickness: this.calculateOptimalThickness(config),
      refractionIndex: this.calculateRefractiveIndex(config),
      transparency: this.calculateTransparency(config),
      dispersion: this.calculateChromaticAberration(config)
    };
  }

  /**
   * Calculate optimal glass thickness for visual effect
   */
  private calculateOptimalThickness(config: GlassConfig): number {
    // Thickness affects blur and refraction intensity
    const baseThickness = config.thickness || 1.0;
    const complexityFactor = 1 + (config.complexity * 0.2);
    return baseThickness * complexityFactor;
  }

  /**
   * Calculate refractive index based on config
   */
  private calculateRefractiveIndex(config: GlassConfig): number {
    // Standard glass is ~1.5, we allow range for effects
    const baseIndex = config.refractionIndex || 1.5;
    return Math.max(1.0, Math.min(2.0, baseIndex));
  }

  /**
   * Calculate transparency based on config
   */
  private calculateTransparency(config: GlassConfig): number {
    // 0 = opaque, 1 = fully transparent
    return Math.max(0, Math.min(1, config.transparency || 0.8));
  }

  /**
   * Calculate chromatic aberration effect
   */
  private calculateChromaticAberration(config: GlassConfig): number {
    // Higher dispersion = more rainbow effect at edges
    const baseDispersion = 0.02;
    const thicknessFactor = config.thickness * 0.01;
    return baseDispersion + thicknessFactor;
  }

  /**
   * Calculate light refraction through the glass
   */
  private calculateRefraction(
    thickness: number,
    refractionIndex: number
  ): LightField {
    // Snell's law simulation
    const incidentAngle = Math.PI / 4; // 45 degrees
    const refractedAngle = Math.asin(
      Math.sin(incidentAngle) / refractionIndex
    );

    // Light bending creates directional blur
    const bendStrength = thickness * (incidentAngle - refractedAngle);

    return {
      direction: {
        x: Math.cos(refractedAngle),
        y: Math.sin(refractedAngle),
        z: 0.5
      },
      intensity: 1.0 - (thickness * 0.1),
      color: { r: 255, g: 255, b: 255 },
      refractedAngle
    };
  }

  /**
   * Generate depth-based blur
   */
  private generateDepthBlur(zIndex: number): GaussianBlur {
    // Deeper layers have more blur
    const baseRadius = 8;
    const depthFactor = Math.max(1, zIndex) * 0.5;
    const radius = baseRadius * depthFactor;
    const sigma = radius / 3;

    // Generate Gaussian kernel
    const kernel = this.generateGaussianKernel(radius, sigma);

    return {
      radius,
      sigma,
      kernel
    };
  }

  /**
   * Generate Gaussian blur kernel
   */
  private generateGaussianKernel(radius: number, sigma: number): number[] {
    const size = Math.ceil(radius) * 2 + 1;
    const kernel: number[] = [];
    let sum = 0;

    for (let i = 0; i < size; i++) {
      const x = i - Math.floor(size / 2);
      const value = Math.exp(-(x * x) / (2 * sigma * sigma));
      kernel.push(value);
      sum += value;
    }

    // Normalize kernel
    return kernel.map(v => v / sum);
  }

  /**
   * Generate CSS properties for the glass effect
   */
  private generateCSSProperties(
    config: GlassConfig,
    material: GlassBase,
    light: LightField
  ): Record<string, string> {
    const { tint, blur, transparency } = config;

    // Base background with tint
    const bgColor = `rgba(${tint.r}, ${tint.g}, ${tint.b}, ${tint.a * transparency})`;

    // Backdrop blur based on material thickness
    const backdropBlur = `${blur * material.thickness}px`;

    // Border glow based on light refraction
    const borderColor = `rgba(255, 255, 255, ${0.1 + light.intensity * 0.1})`;

    // Shadow based on depth
    const shadowDepth = config.zIndex * 2;
    const boxShadow = `
      0 ${shadowDepth}px ${shadowDepth * 2}px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 ${borderColor}
    `;

    // Gradient overlay for light refraction effect
    const gradient = `linear-gradient(
      ${Math.round(light.refractedAngle * 180 / Math.PI)}deg,
      rgba(255, 255, 255, ${0.1 * light.intensity}),
      transparent 50%
    )`;

    return {
      background: bgColor,
      backdropFilter: `blur(${backdropBlur}) saturate(180%)`,
      WebkitBackdropFilter: `blur(${backdropBlur}) saturate(180%)`,
      border: `1px solid ${borderColor}`,
      boxShadow: boxShadow.trim(),
      backgroundImage: gradient,
      borderRadius: '16px',
      transition: 'all 0.3s ease'
    };
  }

  /**
   * Generate preset glass styles
   */
  static presets = {
    light: {
      thickness: 0.5,
      refractionIndex: 1.4,
      transparency: 0.95,
      blur: 20,
      tint: { r: 255, g: 255, b: 255, a: 0.1 },
      complexity: 0.5,
      animationSpeed: 0,
      zIndex: 1
    } as GlassConfig,

    medium: {
      thickness: 1.0,
      refractionIndex: 1.5,
      transparency: 0.85,
      blur: 25,
      tint: { r: 255, g: 255, b: 255, a: 0.15 },
      complexity: 0.7,
      animationSpeed: 0.001,
      zIndex: 2
    } as GlassConfig,

    heavy: {
      thickness: 1.5,
      refractionIndex: 1.6,
      transparency: 0.75,
      blur: 30,
      tint: { r: 200, g: 220, b: 255, a: 0.2 },
      complexity: 0.9,
      animationSpeed: 0.002,
      zIndex: 3
    } as GlassConfig,

    quantum: {
      thickness: 2.0,
      refractionIndex: 1.8,
      transparency: 0.7,
      blur: 40,
      tint: { r: 100, g: 200, b: 255, a: 0.25 },
      complexity: 1.0,
      animationSpeed: 0.003,
      zIndex: 4
    } as GlassConfig
  };
}

// Lightweight, optional WebGL-aware generator mirroring the Phase 4 sketch.
type WebGLRendererCtor = new (options?: unknown) => unknown;

function resolveRenderer(): WebGLRendererCtor | null {
  // Prefer an existing global THREE renderer when available; otherwise, stay null without using require.
  const threeGlobal = (globalThis as unknown as { THREE?: { WebGLRenderer?: WebGLRendererCtor } }).THREE;
  return threeGlobal?.WebGLRenderer ?? null;
}

export class WebGLGlassMorphismGenerator {
  private renderer: unknown;
  private neuralNoise: NeuralNoise;

  constructor() {
    const Renderer = resolveRenderer();
    this.renderer = Renderer ? new Renderer({ antialias: true }) : null;
    this.neuralNoise = new NeuralNoise({
      pattern: 'consciousness_wave',
      frequency: 0.003,
      amplitude: 0.7
    });
  }

  generateLayer(config: GlassConfig): GlassLayer {
    const base: GlassBase = {
      thickness: config.thickness,
      refractionIndex: config.refractionIndex,
      transparency: config.transparency,
      dispersion: config.blur * 0.001
    };

    const neuralPattern = this.neuralNoise.generatePattern({
      complexity: config.complexity,
      animationSpeed: config.animationSpeed
    });

    const lightCapture: LightField = {
      direction: { x: 0, y: 0, z: 1 },
      intensity: 1 - Math.min(0.9, config.thickness * 0.05),
      color: { r: 255, g: 255, b: 255 },
      refractedAngle: Math.PI / Math.max(1.1, config.refractionIndex)
    };

    const edgeBlur: GaussianBlur = {
      radius: config.zIndex * 4,
      sigma: Math.max(1, config.zIndex * 1.25),
      kernel: [1]
    };

    return {
      thickness: base.thickness,
      refractionIndex: base.refractionIndex,
      neuralPattern,
      edgeBlur,
      lightCapture,
      cssProperties: {
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: `blur(${config.blur}px)`,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
      }
    };
  }
}
