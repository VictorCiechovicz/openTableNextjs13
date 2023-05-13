import { CreateUser } from './AuthModal'

interface AuthInputsProps {
  data: CreateUser
  handleChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void
  isSignin: boolean
}

export default function AuthInputs({
  data,
  handleChangeInputs,
  isSignin
}: AuthInputsProps) {
  return (
    <div>
      {isSignin ? null : (
        <div className="m-3 flex justify-between text-sm ">
          <input
            type="text"
            className="bg-white text-black  border rounedd py-3 p-2 w-[49%] "
            placeholder="First Name"
            name="firstName"
            value={data.firstName}
            onChange={handleChangeInputs}
          />
          <input
            type="text"
            className="bg-white text-black  border rounedd py-3 p-2 w-[49%] "
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={handleChangeInputs}
          />
        </div>
      )}
      <div className="m-3 flex justify-between text-sm">
        <input
          type="email"
          className="bg-white text-black  border rounedd py-3 p-2 w-full"
          placeholder="E-mail"
          name="email"
          value={data.email}
          onChange={handleChangeInputs}
        />
      </div>
      {isSignin ? null : (
        <div className="m-3 flex justify-between text-sm">
          <input
            type="text"
            className="bg-white text-black  border rounedd py-3 p-2 w-[49%] "
            placeholder="Phone"
            name="phone"
            value={data.phone}
            onChange={handleChangeInputs}
          />
          <input
            type="text"
            className="bg-white text-black  border rounedd py-3 p-2 w-[49%] "
            placeholder="City"
            name="city"
            value={data.city}
            onChange={handleChangeInputs}
          />
        </div>
      )}
      <div className="m-3 flex justify-between text-sm">
        <input
          type="password"
          className="bg-white text-black border rounedd py-3 p-2 w-full"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChangeInputs}
        />
      </div>
    </div>
  )
}
