'use client'
import { UserProvider, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function MyApp() {
  return (
    <UserProvider>
      <ProfileClient />
    </UserProvider>
  );
}

  const ProfileClient = withPageAuthRequired(function ProfileClient({user}) {
  const {error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData);

   // Add user.name and user.email to the data object if they are not null or undefined
   if (user && user.nickname) {
    data.nickname = user.nickname;
  }
  if (user && user.email) {
    data.email = user.email;
  }
  
    console.log(data);
    const response = await fetch('/api/mentor/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // handle error
      alert('error');
    }

    const responseData = await response.json();
    alert(responseData.message);
  
  }

  // <h2>{user.name}</h2>
  // <p>{user.email}</p>
  return (
    user && (

      <div className='mx-auto py-14 sm:mx-auto'>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0">
              <div className="relative">
                {/* <img className="h-24 w-24 rounded-full" src={user.picture} alt="" /> */}
                <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
              </div>
            </div>
            <div className="ml-5">
              <h1 className="text-2xl font-semibold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {user.nickname}
              </h1>
              <div className="flex gap-x-2 mt-1">
                <PhotoIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            </div>
            
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="pt-10 text-3xl font-semibold leading-7 text-gray-900">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Calendly Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">https://calendly.com/</span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Go to <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                        <span style={{ color: 'blue' }}>Calendly.com</span>
                      </a>, create an account, create an event then input your event url  link  above
                    </p>
                  </div>
                </div>

                

                

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                </div>




              </div>
            </div>




          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    )
  );
}
  )