import { Module } from '@nestjs/common'
import { AppController } from '@ffts/app.controller'
import { AppService } from '@ffts/app.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
