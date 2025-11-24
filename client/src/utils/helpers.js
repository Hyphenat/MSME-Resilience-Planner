export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getRiskColor = (score) => {
  if (score <= 3) return 'green'
  if (score <= 6) return 'yellow'
  if (score <= 8) return 'orange'
  return 'red'
}

export const getRiskLevel = (score) => {
  if (score <= 3) return 'Low'
  if (score <= 6) return 'Medium'
  if (score <= 8) return 'High'
  return 'Critical'
}

export const truncate = (str, length = 50) => {
  if (!str) return ''
  return str.length > length ? str.substring(0, length) + '...' : str
}