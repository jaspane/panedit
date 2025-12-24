export function detectLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const checks = {
    cores: navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4,
    memory: (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    connection: (navigator as any).connection && (
      (navigator as any).connection.effectiveType === 'slow-2g' ||
      (navigator as any).connection.effectiveType === '2g' ||
      (navigator as any).connection.effectiveType === '3g'
    ),
  };

  const lowEndScore = Object.values(checks).filter(Boolean).length;

  return lowEndScore >= 2;
}

export function getPerformancePreference(): { enableAnimations: boolean; reducedMotion: boolean } {
  if (typeof window === 'undefined') {
    return { enableAnimations: true, reducedMotion: false };
  }

  const savedPreference = localStorage.getItem('enableAnimations');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (savedPreference !== null) {
    return {
      enableAnimations: savedPreference === 'true',
      reducedMotion,
    };
  }

  const isLowEnd = detectLowEndDevice();
  const enableAnimations = !isLowEnd && !reducedMotion;

  localStorage.setItem('enableAnimations', String(enableAnimations));

  return {
    enableAnimations,
    reducedMotion,
  };
}

export function setPerformancePreference(enableAnimations: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('enableAnimations', String(enableAnimations));
  }
}
