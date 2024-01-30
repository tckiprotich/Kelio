'use client'
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

export default function MyApp() {
  return (
    <UserProvider>
      <ProfileClient />
    </UserProvider>
  );
}

function ProfileClient() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // <h2>{user.name}</h2>
  // <p>{user.email}</p>
  return (
    user && (
      <div>
        {/* <img src={user.picture} alt={user.name} /> */}
      </div>
    )
  );
}