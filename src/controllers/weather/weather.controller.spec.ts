import { Test, TestingModule } from "@nestjs/testing";
import { HttpModule } from "@nestjs/axios";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WeatherController } from "./weather.controller";
import { OpenWetherMapApiService } from "../../services/open-wether-map-api/open-wether-map-api.service";

describe("WeatherController", () => {
  let controller: WeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [OpenWetherMapApiService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getWeatherDescription", () => {
    it("should return description", async () => {
      const response = await controller.getWeatherDescription({
        lat: "33.44",
        lng: "-94.04",
        date: Date.now(),
      });
      expect(response.length > 0).toBe(true);
    });
    it("should return an invalid date error", async () => {
      try {
        await controller.getWeatherDescription({
          lat: "33.44",
          lng: "-94.04",
          date: undefined,
        });
      } catch (e) {
        const error = new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "The date is invalid",
          },
          HttpStatus.BAD_REQUEST,
        );
        expect(e).toEqual(error);
      }
    });
    it("should return a client error", async () => {
      try {
        await controller.getWeatherDescription({
          lat: undefined,
          lng: undefined,
          date: undefined,
        });
      } catch (e) {
        const error = new Error("Request failed with status code 400");
        expect(e).toEqual(error);
      }
    });
  });
});
