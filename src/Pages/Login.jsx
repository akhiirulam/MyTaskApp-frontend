export const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-green-600 to-green-200">
      <div className="w-96 rounded-md border bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-green-600">Welcome Back</h1>
          <p className="text-gray-500">Sign in to manage your tasks</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border p-2 focus:border-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border p-2 focus:border-green-600 focus:outline-none"
            />
          </div>

          <button className="mt-2 rounded-md bg-green-600 py-2 text-white hover:bg-green-700">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
