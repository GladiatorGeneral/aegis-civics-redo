'use client';

/**
 * NEURAL GLASS PANEL COMPONENT
 * React component for glass morphism UI panels
 * Integrates with the neural layer system
 */

import React, { useMemo, CSSProperties } from 'react';
import { GlassMorphismGenerator, GlassConfig } from '../neural-layers/GlassMorphismGenerator';

export type PanelIntensity = 'low' | 'medium' | 'high' | 'quantum';

export interface NeuralGlassPanelProps {
  children?: React.ReactNode;
  intensity?: PanelIntensity;
  className?: string;
  style?: CSSProperties;
  animated?: boolean;
  glow?: boolean;
  glowColor?: string;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
}

const intensityMap: Record<PanelIntensity, keyof typeof GlassMorphismGenerator.presets> = {
  low: 'light',
  medium: 'medium',
  high: 'heavy',
  quantum: 'quantum'
};

export function NeuralGlassPanel({
  children,
  intensity = 'medium',
  className = '',
  style = {},
  animated = false,
  glow = false,
  glowColor = 'var(--quantum-blue)',
  onClick,
  onHover
}: NeuralGlassPanelProps) {
  // Generate glass properties
  const glassStyles = useMemo(() => {
    const generator = new GlassMorphismGenerator();
    const presetKey = intensityMap[intensity];
    const config = GlassMorphismGenerator.presets[presetKey];
    
    if (animated) {
      config.animationSpeed = 0.002;
    }
    
    const layer = generator.generateLayer(config);
    return layer.cssProperties;
  }, [intensity, animated]);

  // Combine styles
  const combinedStyles: CSSProperties = useMemo(() => ({
    ...glassStyles,
    ...style,
    position: 'relative' as const,
    overflow: 'hidden',
    ...(glow && {
      boxShadow: `
        ${glassStyles.boxShadow},
        0 0 20px ${glowColor}40,
        0 0 40px ${glowColor}20
      `
    })
  }), [glassStyles, style, glow, glowColor]);

  return (
    <div
      className={`neural-glass-panel ${className}`}
      style={combinedStyles}
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* Shimmer effect overlay */}
      <div className="neural-glass-shimmer" />
      
      {/* Content */}
      <div className="neural-glass-content">
        {children}
      </div>
    </div>
  );
}

/**
 * NEURAL BACKGROUND COMPONENT
 * Animated background with neural network visualization
 */
export interface NeuralBackgroundProps {
  intensity?: 'low' | 'medium' | 'high' | 'quantum';
  color?: string;
  particleCount?: number;
}

export function NeuralBackground({
  intensity = 'medium',
  color = 'var(--quantum-blue)',
  particleCount = 50
}: NeuralBackgroundProps) {
  const opacityMap = {
    low: 0.3,
    medium: 0.5,
    high: 0.7,
    quantum: 1.0
  };

  const baseOpacity = opacityMap[intensity];

  return (
    <div 
      className="neural-background"
      style={{
        '--neural-color': color,
        '--neural-opacity': baseOpacity,
        '--particle-count': particleCount
      } as CSSProperties}
    >
      <div className="neural-grid-overlay" />
      <div className="neural-particles" />
      <div className="neural-glow" />
    </div>
  );
}

/**
 * NEURAL BUTTON COMPONENT
 * Futuristic button with glass morphism effects
 */
export interface NeuralButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export function NeuralButton({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  icon
}: NeuralButtonProps) {
  const sizeClasses = {
    small: 'neural-btn-sm',
    medium: 'neural-btn-md',
    large: 'neural-btn-lg'
  };

  return (
    <button
      className={`neural-button neural-button-${variant} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <span className="neural-spinner" />
      )}
      {icon && !loading && (
        <span className="neural-btn-icon">{icon}</span>
      )}
      <span className="neural-btn-text">{children}</span>
      <span className="neural-btn-glow" />
    </button>
  );
}

/**
 * NEURAL PROGRESS BAR
 * Animated progress indicator
 */
export interface NeuralProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  animated?: boolean;
}

export function NeuralProgress({
  value,
  max = 100,
  label,
  showValue = true,
  variant = 'default',
  animated = true
}: NeuralProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantColors = {
    default: 'var(--quantum-blue)',
    success: 'var(--ai-green)',
    warning: '#ffd93d',
    danger: 'var(--alert-red)'
  };

  return (
    <div className="neural-progress-container">
      {label && (
        <div className="neural-progress-label">
          <span>{label}</span>
          {showValue && <span>{percentage.toFixed(1)}%</span>}
        </div>
      )}
      <div className="neural-progress-track">
        <div
          className={`neural-progress-fill ${animated ? 'animated' : ''}`}
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${variantColors[variant]}, ${variantColors[variant]}80)`
          }}
        />
        <div className="neural-progress-glow" style={{
          left: `${percentage}%`,
          background: variantColors[variant]
        }} />
      </div>
    </div>
  );
}

/**
 * NEURAL CARD COMPONENT
 * Content card with glass morphism
 */
export interface NeuralCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerIcon?: React.ReactNode;
  intensity?: PanelIntensity;
  className?: string;
}

export function NeuralCard({
  title,
  subtitle,
  children,
  footer,
  headerIcon,
  intensity = 'medium',
  className = ''
}: NeuralCardProps) {
  return (
    <NeuralGlassPanel intensity={intensity} className={`neural-card ${className}`}>
      {(title || subtitle) && (
        <div className="neural-card-header">
          {headerIcon && <div className="neural-card-icon">{headerIcon}</div>}
          <div className="neural-card-titles">
            {title && <h3 className="neural-card-title">{title}</h3>}
            {subtitle && <p className="neural-card-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="neural-card-body">
        {children}
      </div>
      {footer && (
        <div className="neural-card-footer">
          {footer}
        </div>
      )}
    </NeuralGlassPanel>
  );
}
