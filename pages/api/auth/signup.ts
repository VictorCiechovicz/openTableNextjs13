import { NextApiResponse,NextApiRequest } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";


const prisma= new PrismaClient()


export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
  
  if (req.method === "POST") {
    const {firstName,email,phone,city,password} = req.body;
    const errors: string[] = []; 
    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max:20
        }),
        errorMessage: "First name is Invalid"
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "E-mail is Invalid"
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is Invalid"
      },
      {
        valid: validator.isLength(city,{min:1}),
        errorMessage: "City is Invalid"
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not strong"
  }
]

    validationSchema.forEach
      ((check) => {
        if (!check.valid) {
          errors.push(check.errorMessage);
      }
      })
    
    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }


    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      }
    });
    
    if (userWithEmail) {
      return res.status(400).json({ errorMessage:"E-mail is associated with another account" });
    };

    res.status(200).json(
      {
        hello: 'body'
      });
    
  }
  
  
};