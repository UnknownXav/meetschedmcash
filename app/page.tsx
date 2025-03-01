import { Button } from "@/data/components/ui/button"
import { Input } from "@/data/components/ui/input"

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Left Column: Login Form */}
        <div className="flex flex-col justify-center space-y-6">
          <img
            src="/ml-logo.png"
            alt="ML Logo"
            className="h-24 object-contain mb-8"
          />
          <div className="space-y-6 max-w-md">
            <h2 className="text-center text-4l font-bold text-gray-600">
              Please enter your credentials
            </h2>

            <form
              //onSubmit={handleSubmit}
              className="space-y-4"
            >
              <Input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                placeholder="Email or Username"
                // value={emailOrUsername}
                // onChange={(e) =>
                // 	setEmailOrUsername(
                // 		e.target.value
                // 	)
                // }
                className="w-full"
                required
              />
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                // value={password}
                // onChange={(e) =>
                // 	setPassword(
                // 		e.target.value
                // 	)
                // }
                // className="w-full"
                // required
              />
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Login
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Image (visible on md and larger screens) */}
        <div className="hidden md:block">
          <img
            src="/ml-payroll.jpg"
            alt="ML Payroll"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
