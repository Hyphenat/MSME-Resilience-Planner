export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateRequired = (value) => {
  return value !== undefined && value !== null && value !== ''
}

export const validateSupplier = (supplier) => {
  const errors = {}
  
  if (!validateRequired(supplier.name)) {
    errors.name = 'Supplier name is required'
  }
  
  if (supplier.leadTimeDays && supplier.leadTimeDays < 0) {
    errors.leadTimeDays = 'Lead time cannot be negative'
  }
  
  if (supplier.costPerUnit && supplier.costPerUnit < 0) {
    errors.costPerUnit = 'Cost cannot be negative'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}