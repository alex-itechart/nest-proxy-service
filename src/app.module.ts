import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { WeatherController } from "./controllers/weather/weather.controller";
import { OpenWetherMapApiService } from "./services/open-wether-map-api/open-wether-map-api.service";

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [WeatherController],
  providers: [OpenWetherMapApiService],
})
export class AppModule {}
