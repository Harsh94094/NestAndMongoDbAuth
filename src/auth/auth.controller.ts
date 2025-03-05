import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @ApiBody({ schema: { type: 'object', properties: { username: { type: 'string' }, email: { type: 'string', example: "xyz5@gmail.com" }, password: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('register')
  async register(@Body() body: { email: string, username: string; password: string }) {
    return this.authService.register(body.email, body.username, body.password);
  }
 
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ schema: { type: 'object', properties: { username: { type: 'string' }, email: { type: 'string', example: "xyz5@gmail.com" }, password: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' }) 
  @Post('login')
  async login(@Body() body: { username: string; password: string, email: string}) {
    const user = await this.authService.validateUser(body.username , body.email, body.password);
    return this.authService.login(user);
  }
}