import { Controller, Get, Query } from "@nestjs/common";
import { OpenWetherMapApiService } from "../../services/open-wether-map-api/open-wether-map-api.service";

@Controller("weather")
export class WeatherController {
  constructor(
    private readonly openWeatherMapApiService: OpenWetherMapApiService,
  ) {}
  @Get()
  async getWeatherDescription(@Query() params) {
    const response = await this.openWeatherMapApiService.getWeatherForecasts({
      ...params,
    });

    return response;
  }
}
