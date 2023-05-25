'use client'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import AuthInputs from './AuthInputs'

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
    }
    setDisable(true)
  }, [inputs])

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
          <div className="p-2 h-[500px]">
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
              >
                {renderContent('Sign In', 'Create Account')}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
