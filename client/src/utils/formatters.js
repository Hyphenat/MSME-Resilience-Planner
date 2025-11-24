export const formatNumber = (num, decimals = 2) => {
  if (num === null || num === undefined) return '-'
  return Number(num).toFixed(decimals)
}

export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`
}

export const formatDays = (days) => {
  if (days === 1) return '1 day'
  return `${days} days`
}

export const formatRiskScore = (score) => {
  return `${formatNumber(score, 1)}/10`
}