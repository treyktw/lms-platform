const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-red-400 to-purple-500">
      {children}
    </div>
  );
}

export default AuthLayout;