import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminService } from 'src/superadmin/superadmin.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(configServ: ConfigService, private superAdminService: SuperadminService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: configServ.get('JWT_KEY'),
        });
    }

    async validate(payload: any) {
        
        const user = await this.superAdminService.findByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        
        return user;
    }
    
}