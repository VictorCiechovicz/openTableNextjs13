'use client'
import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import AuthInputs from './AuthInputs'
import useAuth from '../../hooks/useAuth'
import { AuthenticationContext } from '../context/AuthContext'
import { Alert, CircularProgress } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

interface LoginModalProps {
  isSignin: boolean
}

export interface CreateUser {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  password: string
}

export default function AuthModal({ isSignin }: LoginModalProps) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { signin, signup } = useAuth()

  const { loading, data, error } = useContext(AuthenticationContext)

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent
  }
  const hendleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [inputs, setInputs] = useState({} as CreateUser)

  const [disable, setDisable] = useState(true)

  useEffect(() => {
    if (isSignin) {
      if (inputs.email && inputs.password) {
        return setDisable(false)
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.phone &&
        inputs.city
      ) {
        return setDisable(false)
      }
    }

    setDisable(true)
  }, [inputs])

  console.log(disable)

  const handleClick = () => {
    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password }, handleClose)
    } else {
      signup(inputs, handleClose)
    }
  }

  return (
    <div>
      <button
        className={`${renderContent(
          'bg-blue-400 text-white',
          'text-black'
        )} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent('Sign in', 'Sign up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[500px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[500px]">
              {error ? (
                <Alert severity="error" className="mb-9">
                  {error}
                </Alert>
              ) : null}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm text-black">
                  {renderContent('Sign In', 'Create Account')}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-leght text-center text-black">
                  {renderContent(
                    'Log Into Your Account',
                    'Create Your OpenTable Account'
                  )}
                </h2>
                <AuthInputs
                  data={inputs}
                  handleChangeInputs={hendleChangeInputs}
                  isSignin={isSignin}
                />
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disable}
                  onClick={handleClick}
                >
                  {renderContent('Sign In', 'Create Account')}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}
