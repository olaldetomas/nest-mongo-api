import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
  })
  const configService = app.get(ConfigService)

  await app.listen(configService.port, () => {
    console.log(`App listen on port: ${configService.port}`)
  })
}
bootstrap()
