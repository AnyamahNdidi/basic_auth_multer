import jwt from "jsonwebtoken"

export const tokenGenerator = (data:any) => {
    return jwt.sign(data, "bshjkdhvuisdhvsdui", {expiresIn:"10ms"})
}