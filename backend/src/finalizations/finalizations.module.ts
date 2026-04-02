import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinalizationsService } from './finalizations.service';
import { FinalizationsController } from './finalizations.controller';
import { Finalization } from './entities/finalization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finalization])],
  controllers: [FinalizationsController],
  providers: [FinalizationsService],
  exports: [FinalizationsService],
})
export class FinalizationsModule {}
