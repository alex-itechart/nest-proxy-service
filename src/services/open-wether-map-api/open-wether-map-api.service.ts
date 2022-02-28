import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class OpenWetherMapApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getWeatherForecasts({ lat, lng, date }): Promise<any> {
    // https://openweathermap.org/api/one-call-api
    const url = `${this.configService.get(
      "OPEN_WEATHER_MAP_API_BASE",
    )}/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&appid=${this.configService.get(
      "OPEN_WEATHER_MAP_API_APP_ID",
    )}`;

    const { data } = await firstValueFrom(this.httpService.get(url));

    //check if income date is correct
    const result = data.daily.find(({ dt }) => {
      const existedDate = new Date(dt * 1000);
      const incomeDate = new Date(date);
      return existedDate.toDateString() === incomeDate.toDateString();
    });

    if (result) {
      return result.weather[0].description;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "The date is invalid",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
