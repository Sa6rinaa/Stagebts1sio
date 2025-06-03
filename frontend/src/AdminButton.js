function AdminButton({ user }) {
  if (!user || user.role !== 'admin') return null

  return (
    <button onClick={() => console.log('Admin only action')}>
      Gérer les utilisateurs (admin)
    </button>
  )
}

export default AdminButton
