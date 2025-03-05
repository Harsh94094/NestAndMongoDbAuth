import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'efefefef',
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    const user = await this.userModel.findById(payload.sub).lean(); // Use lean() to return a plain object
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log('Validated user:', user);
    return user; // Ensure user is returned properly
  }
  
}