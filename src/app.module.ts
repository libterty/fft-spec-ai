import { Module } from '@nestjs/common';
import { AppController } from '@ttfs/app.controller';
import { AppService } from '@ttfs/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
