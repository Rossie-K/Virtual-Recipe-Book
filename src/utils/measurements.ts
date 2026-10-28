/**
 * Measurement scaling and unit conversion helpers
 */

export function formatAmount(amount: number): string {
  if (amount <= 0) return '0';
  
  // Clean rounding
  const rounded = Math.round(amount * 100) / 100;
  const whole = Math.floor(rounded);
  const frac = rounded - whole;

  const tolerance = 0.04;
  let fracString = '';

  if (Math.abs(frac - 0.25) < tolerance) fracString = '¼';
  else if (Math.abs(frac - 0.333) < tolerance) fracString = '⅓';
  else if (Math.abs(frac - 0.5) < tolerance) fracString = '½';
  else if (Math.abs(frac - 0.666) < tolerance) fracString = '⅔';
  else if (Math.abs(frac - 0.75) < tolerance) fracString = '¾';
  else if (Math.abs(frac - 0.125) < tolerance) fracString = '⅛';
  else if (frac > 0.05) fracString = frac.toFixed(2).replace(/^0/, '');

  if (whole === 0) {
    return fracString || '0';
  }
  if (!fracString) {
    return `${whole}`;
  }
  return `${whole} ${fracString}`;
}

export function scaleAmount(baseAmount: number, baseServings: number, targetServings: number): number {
  if (baseServings <= 0) return baseAmount;
  const ratio = targetServings / baseServings;
  return Math.round(baseAmount * ratio * 100) / 100;
}

export interface UnitConversion {
  value: number;
  unit: string;
}

/**
 * Converts common culinary measurements between US Imperial and Metric
 */
export function convertUnit(amount: number, unit: string, toMetric: boolean): UnitConversion {
  const normalizedUnit = unit.toLowerCase().trim();

  if (toMetric) {
    // Imperial to Metric
    if (normalizedUnit === 'cups' || normalizedUnit === 'cup') {
      return { value: Math.round(amount * 240), unit: 'ml' };
    }
    if (normalizedUnit === 'tbsp' || normalizedUnit === 'tablespoons') {
      return { value: Math.round(amount * 15), unit: 'ml' };
    }
    if (normalizedUnit === 'tsp' || normalizedUnit === 'teaspoons') {
      return { value: Math.round(amount * 5), unit: 'ml' };
    }
    if (normalizedUnit === 'oz' || normalizedUnit === 'ounces') {
      return { value: Math.round(amount * 28.35), unit: 'g' };
    }
    if (normalizedUnit === 'lbs' || normalizedUnit === 'lb' || normalizedUnit === 'pounds') {
      return { value: Math.round(amount * 453.6), unit: 'g' };
    }
  } else {
    // Metric to Imperial
    if (normalizedUnit === 'g' || normalizedUnit === 'grams') {
      if (amount >= 450) {
        return { value: Math.round((amount / 453.6) * 10) / 10, unit: 'lbs' };
      }
      return { value: Math.round((amount / 28.35) * 10) / 10, unit: 'oz' };
    }
    if (normalizedUnit === 'ml' || normalizedUnit === 'milliliters') {
      if (amount >= 240) {
        return { value: Math.round((amount / 240) * 10) / 10, unit: 'cups' };
      }
      return { value: Math.round((amount / 15) * 10) / 10, unit: 'tbsp' };
    }
  }

  return { value: amount, unit };
}
