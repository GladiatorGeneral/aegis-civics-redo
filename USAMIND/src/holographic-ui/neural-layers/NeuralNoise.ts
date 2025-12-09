/**
 * NEURAL NOISE GENERATOR
 * Creates organic, consciousness-inspired noise patterns
 * for glass morphism and holographic effects
 */

export interface NeuralNoiseConfig {
  pattern: 'consciousness_wave' | 'synaptic_burst' | 'quantum_foam' | 'cellular';
  frequency: number;
  amplitude: number;
  octaves?: number;
  persistence?: number;
}

export interface NeuralNoisePattern {
  data: Float32Array;
  width: number;
  height: number;
  animated: boolean;
  updateFunction?: (time: number) => Float32Array;
}

export interface PatternGenerationOptions {
  complexity: number;
  animationSpeed: number;
  colorChannels?: number;
}

export class NeuralNoise {
  private config: NeuralNoiseConfig;
  private seedX: number;
  private seedY: number;
  private permutation: number[] = [];

  constructor(config: NeuralNoiseConfig) {
    this.config = config;
    this.seedX = Math.random() * 10000;
    this.seedY = Math.random() * 10000;
    this.initializePermutation();
  }

  /**
   * Initialize permutation table for noise generation
   */
  private initializePermutation(): void {
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = i;
    }
    
    // Shuffle using Fisher-Yates
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.permutation[i], this.permutation[j]] = 
        [this.permutation[j], this.permutation[i]];
    }
    
    // Duplicate for overflow
    for (let i = 0; i < 256; i++) {
      this.permutation[256 + i] = this.permutation[i];
    }
  }

  /**
   * Generate neural noise pattern
   */
  generatePattern(options: PatternGenerationOptions): NeuralNoisePattern {
    const width = 256;
    const height = 256;
    const data = new Float32Array(width * height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = this.generateValue(
          x / width,
          y / height,
          options.complexity
        );
        data[y * width + x] = value;
      }
    }

    return {
      data,
      width,
      height,
      animated: options.animationSpeed > 0,
      updateFunction: options.animationSpeed > 0
        ? (time: number) => this.updatePattern(data, width, height, time, options)
        : undefined
    };
  }

  /**
   * Generate noise value at coordinates
   */
  private generateValue(x: number, y: number, complexity: number): number {
    switch (this.config.pattern) {
      case 'consciousness_wave':
        return this.consciousnessWave(x, y, complexity);
      case 'synaptic_burst':
        return this.synapticBurst(x, y, complexity);
      case 'quantum_foam':
        return this.quantumFoam(x, y, complexity);
      case 'cellular':
        return this.cellularPattern(x, y, complexity);
      default:
        return this.perlinNoise(x, y);
    }
  }

  /**
   * Consciousness wave pattern - smooth flowing waves
   */
  private consciousnessWave(x: number, y: number, complexity: number): number {
    const baseFreq = this.config.frequency * complexity;
    
    let value = 0;
    value += Math.sin((x + this.seedX) * baseFreq * 2 * Math.PI) * 0.5;
    value += Math.cos((y + this.seedY) * baseFreq * 2 * Math.PI) * 0.5;
    value += Math.sin((x + y) * baseFreq * Math.PI) * 0.3;
    
    // Add Perlin noise for organic feel
    value += this.perlinNoise(x * 5, y * 5) * 0.2;
    
    return (value + 1.5) / 3; // Normalize to 0-1
  }

  /**
   * Synaptic burst pattern - neural firing simulation
   */
  private synapticBurst(x: number, y: number, complexity: number): number {
    const centerX = 0.5;
    const centerY = 0.5;
    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    
    // Radial waves from center
    const radialWave = Math.sin(distance * this.config.frequency * 50) * 0.5;
    
    // Random burst points
    const burstNoise = this.perlinNoise(x * complexity * 10, y * complexity * 10);
    
    // Decay from center
    const decay = Math.exp(-distance * 3);
    
    return Math.abs((radialWave + burstNoise) * decay);
  }

  /**
   * Quantum foam pattern - tiny bubble-like structures
   */
  private quantumFoam(x: number, y: number, complexity: number): number {
    const scale = this.config.frequency * complexity * 20;
    
    // Multiple scales of cellular noise
    let value = 0;
    value += this.voronoiNoise(x * scale, y * scale) * 0.5;
    value += this.voronoiNoise(x * scale * 2, y * scale * 2) * 0.3;
    value += this.voronoiNoise(x * scale * 4, y * scale * 4) * 0.2;
    
    return value;
  }

  /**
   * Cellular pattern - organic cell-like structures
   */
  private cellularPattern(x: number, y: number, complexity: number): number {
    const scale = this.config.frequency * complexity * 10;
    return this.voronoiNoise(x * scale, y * scale);
  }

  /**
   * Basic Perlin noise implementation
   */
  private perlinNoise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    
    x -= Math.floor(x);
    y -= Math.floor(y);
    
    const u = this.fade(x);
    const v = this.fade(y);
    
    const A = this.permutation[X] + Y;
    const B = this.permutation[X + 1] + Y;
    
    return this.lerp(
      v,
      this.lerp(
        u,
        this.grad(this.permutation[A], x, y),
        this.grad(this.permutation[B], x - 1, y)
      ),
      this.lerp(
        u,
        this.grad(this.permutation[A + 1], x, y - 1),
        this.grad(this.permutation[B + 1], x - 1, y - 1)
      )
    );
  }

  /**
   * Voronoi noise for cellular patterns
   */
  private voronoiNoise(x: number, y: number): number {
    const cellX = Math.floor(x);
    const cellY = Math.floor(y);
    
    let minDist = 1.0;
    
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const neighborX = cellX + dx;
        const neighborY = cellY + dy;
        
        // Pseudo-random point in cell
        const pointX = neighborX + this.hash(neighborX, neighborY) / 256;
        const pointY = neighborY + this.hash(neighborY, neighborX) / 256;
        
        const dist = Math.sqrt(
          Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2)
        );
        
        minDist = Math.min(minDist, dist);
      }
    }
    
    return minDist;
  }

  /**
   * Simple hash function for pseudo-random values
   */
  private hash(x: number, y: number): number {
    const n = x + y * 57;
    return this.permutation[Math.abs(n) & 255];
  }

  /**
   * Fade function for Perlin noise
   */
  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  /**
   * Linear interpolation
   */
  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  /**
   * Gradient function for Perlin noise
   */
  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  /**
   * Update pattern for animation
   */
  private updatePattern(
    data: Float32Array,
    width: number,
    height: number,
    time: number,
    options: PatternGenerationOptions
  ): Float32Array {
    const newData = new Float32Array(data.length);
    const timeOffset = time * options.animationSpeed;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = this.generateValue(
          (x / width) + timeOffset,
          (y / height) + timeOffset * 0.7,
          options.complexity
        );
        newData[y * width + x] = value;
      }
    }
    
    return newData;
  }

  /**
   * Generate noise texture for WebGL
   */
  generateTexture(width: number, height: number): ImageData {
    const imageData = new ImageData(width, height);
    const pattern = this.generatePattern({
      complexity: 1,
      animationSpeed: 0
    });
    
    for (let i = 0; i < pattern.data.length; i++) {
      const value = Math.floor(pattern.data[i] * 255);
      const idx = i * 4;
      imageData.data[idx] = value;     // R
      imageData.data[idx + 1] = value; // G
      imageData.data[idx + 2] = value; // B
      imageData.data[idx + 3] = 255;   // A
    }
    
    return imageData;
  }
}
