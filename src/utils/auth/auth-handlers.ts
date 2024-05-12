import { User as iUser } from '../../api/user/user.entity'
import './jwt/jwt-strategy'
import './local/local-strategy'

declare global {
  namespace Express {
    interface User extends iUser {}
  }
}
