import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt-user") {

    constructor(configServ: ConfigService, private userService: UserService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: configServ.get('JWT_KEY'),
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findByEmail(payload.email);
        // console.log(user, "User")
        if (!user) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        
        return user;
    }
    // async validate(payload: any) {
    //     console.log(payload, "Payload")
    //     return { ...payload};
    //   }
}