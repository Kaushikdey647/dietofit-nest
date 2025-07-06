import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'Login successful', user };
  }

  @Post('signup')
  async signup(@Body() body: { name: string; phone: string; email: string; password: string; role: string }) {
    const exists = await this.authService.findByEmail(body.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    const hashed = await this.authService.hashPassword(body.password);
    const user = await this.authService.createUser({ ...body, password: hashed });
    return { message: 'Signup successful', user };
  }
}
