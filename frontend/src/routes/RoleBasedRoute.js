const RoleBasedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !user.token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return element;
};
