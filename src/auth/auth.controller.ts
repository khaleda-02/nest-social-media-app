import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/Register.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post()
  login(@Body() loginDto : LoginDto) {
  }

  @Post()
  register(@Body() registerDto : RegisterDto) {
  }
}
