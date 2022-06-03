import { Logger } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as Joi from 'joi'
import {
  DEFAULT_BCRYPT_SALTS_NUMBER,
  DEFAULT_JWT_EXPIRES,
  DEFAULT_JWT_SECRET,
  DEFAULT_NODE_ENV,
  DEFAULT_PORT,
  DEVELOPMENT_NODE_ENV,
  PRODUCTION_NODE_ENV,
  PROVISION_NODE_ENV,
  TEST_NODE_ENV,
} from '../constants'

export interface EnvConfig {
  [key: string]: string
}

export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath))
    this.envConfig = this.validateInput(config)
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(
          DEVELOPMENT_NODE_ENV,
          PRODUCTION_NODE_ENV,
          TEST_NODE_ENV,
          PROVISION_NODE_ENV,
        )
        .default(DEFAULT_NODE_ENV),
      PORT: Joi.number().default(DEFAULT_PORT),
      JWT_SECRET: Joi.string().default(DEFAULT_JWT_SECRET),
      JWT_EXPIRES: Joi.string().default(DEFAULT_JWT_EXPIRES),
      BCRYPT_SALTS_NUMBER: Joi.number().default(DEFAULT_BCRYPT_SALTS_NUMBER),
      GOOGLE_CLIENT_ID: Joi.string().default(''),
      GOOGLE_CLIENT_SECRET: Joi.string().default(''),
      GOOGLE_REDIRECT_URL: Joi.string().default(''),
    })

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig)
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }

    Logger.log(`Loading config [${envConfig.NODE_ENV}]`)
    return validatedEnvConfig
  }

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV
  }

  get port(): number {
    return parseInt(this.envConfig.PORT, 10)
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET
  }

  get jwtExpiry(): string {
    return this.envConfig.JWT_EXPIRES
  }

  get bcryptSaltsNumber(): number {
    return parseInt(this.envConfig.BCRYPT_SALTS_NUMBER, 10)
  }

  get googleClientID(): string {
    return this.envConfig.GOOGLE_CLIENT_ID
  }

  get googleClientSecret(): string {
    return this.envConfig.GOOGLE_CLIENT_SECRET
  }

  get googleRedirectURL(): string {
    return this.envConfig.GOOGLE_REDIRECT_URL
  }
}
