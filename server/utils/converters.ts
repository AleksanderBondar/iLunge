import type { AirQuality } from '../../types/backend';
import type { AirQuality as FrontAirQuality, DangerousSubstance } from '../../types/front';

export const convertAirQuality = (airQuality: AirQuality): FrontAirQuality => {
    const dangerousSubstances = ['pm10', 'pm25', 'no2', 'so2', 'o3', 'st'] as DangerousSubstance[];
    const result = dangerousSubstances.reduce((acc, substance) => {
        const indexLevel = airQuality[`${substance}IndexLevel`];
        const calcDate = airQuality[`${substance}CalcDate`];
        const sourceDataDate = airQuality[`${substance}SourceDataDate`];
        acc[substance] = {
            lastCacheUpdate: new Date(airQuality.lastCacheUpdate).toISOString(),
            calcDate: calcDate ? new Date(calcDate).toISOString() : null,
            indexLevel: indexLevel
                ? {
                      id: indexLevel.id,
                      indexLevelName: indexLevel.indexLevelName,
                  }
                : null,
            sourceDataDate: sourceDataDate ? new Date(sourceDataDate).toISOString() : null,
        };
        return acc;
    }, {} as FrontAirQuality);
    return result;
};
