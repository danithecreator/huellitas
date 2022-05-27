export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
  const { userRoles } = currentUser
  return userRoles.includes('admin')
}
export const formatter = new Intl.NumberFormat(
  'es-CO', // idioma local
  {
    style: 'currency', // formato de divisa
    currency: 'COP',
    minimumFractionDigits: 0 // moneda elegida
  }
)
