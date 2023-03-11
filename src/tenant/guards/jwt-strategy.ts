import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TenantService } from '../tenant.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt-tenant") {

    constructor(configServ: ConfigService, private tenantService: TenantService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: configServ.get('JWT_KEY'),
        });
    }

    // async validate(payload: any) {
        
    //     // check if user in the token actually exist
    //     // console.log(payload, "Payload ")
    //     const user = await this.tenantService.findOneByEmail(payload.email);
    //     // console.log(user, "User")
    //     if (!user) {
    //         throw new UnauthorizedException('You are not authorized to perform the operation');
    //     }
        
    //     return user;
    // }
    // async validate(payload: any) {
    //     console.log(payload, "Payload")
    //     return { ...payload};
    //   }
}